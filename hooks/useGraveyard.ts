"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { type Lemming } from "@/lib/types";

export function useGraveyard() {
  const [dead, setDead] = useState<Lemming[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("graveyard")
        .select("*")
        .order("died_at", { ascending: false })
        .limit(100);
      setDead(data ?? []);
      setLoading(false);
    }
    fetch();
  }, [supabase]);

  return { dead, loading };
}
