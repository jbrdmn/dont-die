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
    <div className="text-center flex-1">
      <div className="pixel-font text-gray-500 mb-1" style={{ fontSize: 8 }}>
        TIME UNTIL DEATH
      </div>
      <div
        className={`pixel-font font-bold tabular-nums text-2xl sm:text-3xl ${
          isDanger
            ? "text-red-500 animate-danger-shake"
            : isUrgent
            ? "text-orange-400 animate-urgent-pulse"
            : "text-white"
        }`}
      >
        {countdown}
      </div>
      {isDanger && (
        <div className="pixel-font text-red-400 mt-1 animate-urgent-pulse" style={{ fontSize: 7 }}>
          HURRY!
        </div>
      )}
    </div>
  );
}
