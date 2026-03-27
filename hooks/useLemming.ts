"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { type Lemming } from "@/lib/types";
import { isSavedToday } from "@/lib/game-logic";

export function useLemming() {
  const [lemming, setLemming] = useState<Lemming | null>(null);
  const [loading, setLoading] = useState(true);
  const [justSaved, setJustSaved] = useState(false);
  const [justDied, setJustDied] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  const fetchLemming = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("lemmings")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_alive", true)
      .maybeSingle();

    if (data) {
      // Let the server-side RPC decide if the lemming should die
      // Only check for lemmings that have been saved before and the save is stale
      const needsDeathCheck =
        data.last_saved_date !== null &&
        data.last_saved_date < new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);

      if (needsDeathCheck) {
        await supabase.rpc("check_and_kill_lemming", {
          p_lemming_id: data.id,
        });
        // Re-fetch to see if it was killed
        const { data: fresh } = await supabase
          .from("lemmings")
          .select("*")
          .eq("id", data.id)
          .single();

        if (fresh && !fresh.is_alive) {
          setJustDied(true);
          setLemming(fresh);
        } else {
          setLemming(fresh);
        }
      } else {
        setLemming(data);
      }
    } else {
      setLemming(null);
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
    } else {
      await fetchLemming();
    }
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
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
