"use client";

import { useState, useEffect } from "react";
import {
  lemmingProgress,
  msUntilMidnightUTC,
  formatCountdown,
} from "@/lib/game-logic";

export function useGameClock() {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState("24:00:00");
  const [msRemaining, setMsRemaining] = useState(86400000);

  useEffect(() => {
    function tick() {
      setProgress(lemmingProgress());
      const ms = msUntilMidnightUTC();
      setMsRemaining(ms);
      setCountdown(formatCountdown(ms));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { progress, countdown, msRemaining };
}
