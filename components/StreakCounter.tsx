"use client";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="text-center">
      <div className="text-xs pixel-font text-gray-400 mb-1">STREAK</div>
      <div className="text-3xl sm:text-4xl pixel-font font-bold text-yellow-400">
        {streak}
        <span className="text-lg ml-1">
          {streak === 1 ? "day" : "days"}
        </span>
      </div>
    </div>
  );
}
