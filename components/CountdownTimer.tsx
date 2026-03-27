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

  // Show raw seconds in danger mode for drama
  const display = isDanger
    ? String(Math.ceil(msRemaining / 1000))
    : countdown;

  return (
    <div className="text-center">
      <div
        className={`pixel-font font-bold tabular-nums ${
          isDanger
            ? "text-red-500 animate-danger-shake text-3xl sm:text-4xl"
            : isUrgent
            ? "text-orange-400 animate-urgent-pulse text-2xl sm:text-3xl"
            : "text-gray-400 text-xl sm:text-2xl"
        }`}
        style={isDanger ? { textShadow: "0 0 20px rgba(239,68,68,0.5)" } : undefined}
      >
        {display}
      </div>
      <div
        className={`pixel-font mt-1 ${isDanger ? "text-red-600" : "text-gray-700"}`}
        style={{ fontSize: 8 }}
      >
        {isDanger ? "SECONDS LEFT" : "UNTIL MIDNIGHT UTC"}
      </div>
    </div>
  );
}
