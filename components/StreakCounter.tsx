"use client";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  if (streak === 0) {
    return (
      <div className="pixel-font text-gray-600 text-xs">
        day 1
      </div>
    );
  }

  return (
    <div className="pixel-font text-yellow-400 text-sm flex items-center gap-1">
      <span style={{ fontSize: 16 }}>&#128293;</span>
      {streak}
    </div>
  );
}
