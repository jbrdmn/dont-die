"use client";

interface CountdownTimerProps {
  countdown: string;
  msRemaining: number;
}

function formatReadable(ms: number): string {
  if (ms <= 0) return "0s";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function CountdownTimer({
  msRemaining,
}: CountdownTimerProps) {
  const isUrgent = msRemaining < 3600000;
  const isDanger = msRemaining < 600000;

  const readable = formatReadable(msRemaining);
  const pct = Math.round((msRemaining / 86400000) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg
            width="10" height="10" viewBox="0 0 24 24" fill="none"
            className={isDanger ? "text-red-500" : isUrgent ? "text-orange-400" : "text-gray-500"}
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span
            className={`pixel-font tabular-nums ${
              isDanger
                ? "text-red-500 animate-urgent-pulse"
                : isUrgent
                ? "text-orange-400"
                : "text-gray-400"
            }`}
            style={{
              fontSize: 9,
              ...(isDanger ? { textShadow: "0 0 12px rgba(239,68,68,0.4)" } : {}),
            }}
          >
            {readable} remaining
          </span>
        </div>
        <span
          className={`pixel-font ${isDanger ? "text-red-500" : "text-gray-600"}`}
          style={{ fontSize: 8 }}
        >
          {pct}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
            isDanger ? "animate-urgent-pulse" : ""
          }`}
          style={{
            width: `${100 - pct}%`,
            background: isDanger
              ? "#ef4444"
              : isUrgent
              ? "linear-gradient(90deg, #22c55e, #f59e0b, #ef4444)"
              : "linear-gradient(90deg, #22c55e, #3b82f6)",
          }}
        />
      </div>
    </div>
  );
}
