"use client";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="text-center flex-1">
      <div className="pixel-font text-gray-500 mb-1" style={{ fontSize: 8 }}>
        STREAK
      </div>
      <div className="pixel-font font-bold text-yellow-400 text-2xl sm:text-3xl">
        <span className="mr-1" role="img" aria-label="fire">
          🔥
        </span>
        {streak}
        <span className="text-sm ml-1 text-yellow-500">
          {streak === 1 ? "day" : "days"}
        </span>
      </div>
    </div>
  );
}
