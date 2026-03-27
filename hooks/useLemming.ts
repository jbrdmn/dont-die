"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { type Lemming } from "@/lib/types";
import { shouldBeDead, isSavedToday } from "@/lib/game-logic";

export function useLemming() {
  const [lemming, setLemming] = useState<Lemming | null>(null);
  const [loading, setLoading] = useState(true);
  const [justSaved, setJustSaved] = useState(false);
  const [justDied, setJustDied] = useState(false);
  const supabase = createClient();

  const fetchLemming = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("lemmings")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_alive", true)
      .maybeSingle();

    if (data && data.is_alive && shouldBeDead(data.last_saved_date)) {
      // Kill it client-side
      await supabase.rpc("check_and_kill_lemming", {
        p_lemming_id: data.id,
      });
      setJustDied(true);
      setLemming({ ...data, is_alive: false, died_at: new Date().toISOString() });
    } else {
      setLemming(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchLemming();
  }, [fetchLemming]);

  const saveLemming = useCallback(async () => {
    if (!lemming) return;
    if (isSavedToday(lemming.last_saved_date)) return;

    const { data } = await supabase.rpc("save_lemming", {
      p_lemming_id: lemming.id,
    });

    if (data) {
      setLemming(data);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 3000);
    } else {
      // Refetch to get updated state
      await fetchLemming();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 3000);
    }
  }, [lemming, supabase, fetchLemming]);

  const createLemming = useCallback(
    async (name: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("lemmings")
        .insert({
          user_id: user.id,
          name: name.slice(0, 20),
          streak: 0,
          is_alive: true,
          born_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (data) {
        setLemming(data);
        setJustDied(false);
      }
    },
    [supabase]
  );

  const savedToday = lemming ? isSavedToday(lemming.last_saved_date) : false;

  return {
    lemming,
    loading,
    savedToday,
    justSaved,
    justDied,
    setJustDied,
    saveLemming,
    createLemming,
    refetch: fetchLemming,
  };
}
