"use client";

import CliffBackground from "./CliffBackground";
import Lemming, { type LemmingState } from "./Lemming";

interface LemmingSceneProps {
  progress: number;
  savedToday: boolean;
  isAlive: boolean;
  justDied: boolean;
}

export default function LemmingScene({
  progress,
  savedToday,
  isAlive,
  justDied,
}: LemmingSceneProps) {
  let state: LemmingState = "walking";
  if (!isAlive || justDied) state = "falling";
  else if (savedToday) state = "sleeping";
  else if (progress > 0.85) state = "panic";

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border-2 border-gray-700/50 shadow-2xl shadow-black/50"
      style={{ height: "clamp(280px, 50vh, 420px)" }}
    >
      <CliffBackground />
      <Lemming state={state} progress={progress} />

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}
