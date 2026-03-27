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
      className="relative w-full rounded-xl overflow-hidden border-4 border-gray-800 shadow-xl image-rendering-pixelated"
      style={{ height: "clamp(256px, 45vw, 384px)" }}
    >
      <CliffBackground />
      <Lemming state={state} progress={progress} />
    </div>
  );
}
