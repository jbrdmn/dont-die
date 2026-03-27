"use client";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  if (streak === 0) {
    return (
      <div className="pixel-font text-gray-600" style={{ fontSize: 9 }}>
        day 1
      </div>
    );
  }

  return (
    <div className="pixel-font text-yellow-400 text-xs flex items-center gap-1">
      <span style={{ fontSize: 14 }}>&#128293;</span>
      <span>{streak}d</span>
    </div>
  );
}
