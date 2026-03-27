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

  const display = isDanger
    ? String(Math.ceil(msRemaining / 1000))
    : countdown;

  return (
    <div className="text-center space-y-1">
      <div
        className={`pixel-font font-bold tabular-nums tracking-wider ${
          isDanger
            ? "text-red-500 animate-danger-shake text-xl"
            : isUrgent
            ? "text-orange-400 animate-urgent-pulse text-lg"
            : "text-gray-300 text-base"
        }`}
        style={isDanger ? { textShadow: "0 0 20px rgba(239,68,68,0.5)" } : undefined}
      >
        {display}
      </div>
      <div
        className={`pixel-font ${isDanger ? "text-red-500/60" : "text-gray-600"}`}
        style={{ fontSize: 7 }}
      >
        {isDanger ? "SECONDS LEFT" : "UNTIL MIDNIGHT UTC"}
      </div>
    </div>
  );
}
