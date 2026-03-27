-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Lemmings table
CREATE TABLE lemmings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) <= 20),
  streak integer NOT NULL DEFAULT 0,
  last_saved_date date,
  is_alive boolean NOT NULL DEFAULT true,
  born_at timestamptz NOT NULL DEFAULT now(),
  died_at timestamptz
);

-- One living lemming per user
CREATE UNIQUE INDEX one_alive_per_user ON lemmings (user_id) WHERE is_alive = true;

-- Index for graveyard queries
CREATE INDEX idx_lemmings_dead ON lemmings (died_at DESC) WHERE is_alive = false;

-- Graveyard view
CREATE VIEW graveyard AS
  SELECT * FROM lemmings WHERE is_alive = false ORDER BY died_at DESC;

-- RPC: Save lemming
CREATE OR REPLACE FUNCTION save_lemming(p_lemming_id uuid)
RETURNS lemmings
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_lemming public.lemmings;
  v_today date := CURRENT_DATE;
BEGIN
  SELECT * INTO v_lemming FROM public.lemmings
    WHERE id = p_lemming_id AND is_alive = true;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Lemming not found or dead';
  END IF;

  -- Verify ownership
  IF v_lemming.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Not your lemming';
  END IF;

  -- Same day = no-op
  IF v_lemming.last_saved_date = v_today THEN
    RETURN v_lemming;
  END IF;

  -- Calculate streak
  IF v_lemming.last_saved_date = v_today - 1 THEN
    -- Consecutive day
    v_lemming.streak := v_lemming.streak + 1;
  ELSE
    -- Gap or first save
    v_lemming.streak := 1;
  END IF;

  UPDATE public.lemmings
    SET last_saved_date = v_today, streak = v_lemming.streak
    WHERE id = p_lemming_id;

  v_lemming.last_saved_date := v_today;
  RETURN v_lemming;
END;
$$;

-- RPC: Check and kill lemming (client-side death detection)
CREATE OR REPLACE FUNCTION check_and_kill_lemming(p_lemming_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  v_lemming public.lemmings;
  v_yesterday date := CURRENT_DATE - 1;
BEGIN
  SELECT * INTO v_lemming FROM public.lemmings
    WHERE id = p_lemming_id AND is_alive = true;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Kill if last save was before yesterday (or never saved)
  IF v_lemming.last_saved_date IS NULL OR v_lemming.last_saved_date < v_yesterday THEN
    UPDATE public.lemmings
      SET is_alive = false, died_at = now()
      WHERE id = p_lemming_id;
  END IF;
END;
$$;

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lemmings ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Lemmings: users can read their own
CREATE POLICY "Users can view own lemmings"
  ON lemmings FOR SELECT
  USING (auth.uid() = user_id);

-- Lemmings: users can insert their own
CREATE POLICY "Users can create lemmings"
  ON lemmings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Lemmings: users can update their own (via RPC)
CREATE POLICY "Users can update own lemmings"
  ON lemmings FOR UPDATE
  USING (auth.uid() = user_id);

-- Graveyard: everyone can read
GRANT SELECT ON graveyard TO anon, authenticated;
