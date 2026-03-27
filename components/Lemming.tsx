"use client";

export type LemmingState = "walking" | "sleeping" | "panic" | "falling";

interface LemmingProps {
  state: LemmingState;
  progress: number; // 0-1
}

export default function Lemming({ state, progress }: LemmingProps) {
  const leftPercent = state === "sleeping" ? 5 : Math.min(progress * 90, 90);
  const isPanic = progress > 0.9 && state === "walking";
  const actualState = isPanic ? "panic" : state;

  return (
    <div
      className="absolute bottom-8 transition-all duration-1000 ease-linear"
      style={{ left: `${leftPercent}%` }}
    >
      <div className={`lemming-sprite lemming-${actualState}`}>
        {actualState === "walking" && (
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-bounce-slow" />
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full" />
            <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-black rounded-full" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-green-600 rounded-b" />
            {/* Tiny legs walking */}
            <div className="absolute -bottom-2 left-1 w-1.5 h-2 bg-green-600 animate-walk-left" />
            <div className="absolute -bottom-2 right-1.5 w-1.5 h-2 bg-green-600 animate-walk-right" />
          </div>
        )}
        {actualState === "sleeping" && (
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full" />
            <div className="absolute top-1.5 left-1 w-2 h-0.5 bg-black" />
            <div className="absolute top-1.5 right-1.5 w-2 h-0.5 bg-black" />
            <span className="absolute -top-4 -right-2 text-xs animate-pulse pixel-font">
              z z z
            </span>
          </div>
        )}
        {actualState === "panic" && (
          <div className="w-8 h-8 relative animate-shake">
            <div className="absolute inset-0 bg-yellow-400 rounded-full" />
            <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-black rounded-full" />
            </div>
            <div className="absolute top-0.5 right-1 w-2 h-2 bg-white rounded-full">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-black rounded-full" />
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-yellow-600 rounded-full" />
            <span className="absolute -top-5 left-0 text-xs text-red-500 animate-pulse pixel-font font-bold">
              !!
            </span>
            <div className="absolute -bottom-2 left-1 w-1.5 h-2 bg-yellow-600 animate-walk-fast-left" />
            <div className="absolute -bottom-2 right-1.5 w-1.5 h-2 bg-yellow-600 animate-walk-fast-right" />
          </div>
        )}
        {actualState === "falling" && (
          <div className="w-8 h-8 relative animate-fall">
            <div className="absolute inset-0 bg-red-400 rounded-full" />
            <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-white rounded-full">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-black rounded-full" />
            </div>
            <div className="absolute top-0.5 right-1 w-2 h-2 bg-white rounded-full">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-black rounded-full" />
            </div>
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full" />
          </div>
        )}
      </div>
      {state !== "falling" && (
        <div className="text-center text-[10px] pixel-font mt-1 text-white drop-shadow-md">
          {actualState === "panic" ? "HELP!" : ""}
        </div>
      )}
    </div>
  );
}
