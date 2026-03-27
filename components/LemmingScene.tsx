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
      className={`relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 transition-all duration-500 ${
        justSaved ? "border-2 border-green-400/60" : "border-2 border-gray-700/50"
      }`}
      style={{
        height: "clamp(300px, 55vh, 480px)",
        boxShadow: justSaved
          ? "0 0 30px rgba(34,197,94,0.2), 0 25px 50px -12px rgba(0,0,0,0.5)"
          : "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}
    >
      <CliffBackground progress={progress} />
      <Lemming state={state} progress={progress} />

      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
        <div
          className="h-full transition-all duration-1000 ease-linear"
          style={{
            width: `${progress * 100}%`,
            background: progress > 0.85
              ? "linear-gradient(90deg, #22c55e, #f59e0b, #ef4444)"
              : progress > 0.65
              ? "linear-gradient(90deg, #22c55e, #f59e0b)"
              : "#22c55e",
          }}
        />
        {/* Danger zone marker */}
        <div
          className="absolute top-0 h-full"
          style={{
            left: "85%",
            width: "15%",
            background: "rgba(239,68,68,0.15)",
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}
