"use client";

interface CountdownTimerProps {
  countdown: string;
  msRemaining: number;
}

export default function CountdownTimer({
  countdown,
  msRemaining,
}: CountdownTimerProps) {
  const isUrgent = msRemaining < 3600000;
  const isDanger = msRemaining < 600000;

  return (
    <div className="text-center">
      <div
        className={`pixel-font font-bold tabular-nums text-2xl sm:text-3xl ${
          isDanger
            ? "text-red-500 animate-danger-shake"
            : isUrgent
            ? "text-orange-400 animate-urgent-pulse"
            : "text-gray-300"
        }`}
        style={isDanger ? { textShadow: "0 0 12px rgba(239,68,68,0.5)" } : undefined}
      >
        {countdown}
      </div>
      <div
        className="pixel-font text-gray-600 mt-1"
        style={{ fontSize: 8 }}
      >
        {isDanger ? "SECONDS TO LIVE" : "UNTIL MIDNIGHT UTC"}
      </div>
    </div>
  );
}
