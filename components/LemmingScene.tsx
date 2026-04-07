"use client";

import CliffBackground from "./CliffBackground";
import Lemming, { type LemmingState } from "./Lemming";

interface LemmingSceneProps {
  progress: number;
  savedToday: boolean;
  isAlive: boolean;
  justDied: boolean;
  justSaved?: boolean;
}

export default function LemmingScene({
  progress,
  savedToday,
  isAlive,
  justDied,
  justSaved,
}: LemmingSceneProps) {
  let state: LemmingState = "walking";
  if (!isAlive || justDied) state = "falling";
  else if (savedToday) state = "sleeping";
  else if (progress > 0.85) state = "panic";

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden transition-all duration-500 ${
        justSaved ? "border border-green-400/40" : "border border-gray-700/40"
      }`}
      style={{
        height: "clamp(220px, 35vh, 320px)",
        boxShadow: justSaved
          ? "0 0 20px rgba(34,197,94,0.15), 0 10px 30px -8px rgba(0,0,0,0.4)"
          : "0 10px 30px -8px rgba(0,0,0,0.4)",
      }}
    >
      <CliffBackground progress={progress} />
      <Lemming state={state} progress={progress} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
