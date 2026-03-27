"use client";

interface CountdownTimerProps {
  countdown: string;
  msRemaining: number;
}

export default function CountdownTimer({
  countdown,
  msRemaining,
}: CountdownTimerProps) {
  const isUrgent = msRemaining < 3600000; // < 1 hour
  const isDanger = msRemaining < 600000; // < 10 min

  return (
    <div className="text-center">
      <div className="text-xs pixel-font text-gray-400 mb-1">
        TIME UNTIL DEATH
      </div>
      <div
        className={`text-3xl sm:text-4xl pixel-font font-bold tabular-nums ${
          isDanger
            ? "text-red-500 animate-pulse"
            : isUrgent
            ? "text-orange-400"
            : "text-white"
        }`}
      >
        {countdown}
      </div>
    </div>
  );
}
