export interface Lemming {
  id: string;
  user_id: string;
  name: string;
  streak: number;
  last_saved_date: string | null;
  is_alive: boolean;
  born_at: string;
  died_at: string | null;
}

export interface Profile {
  id: string;
  created_at: string;
}
