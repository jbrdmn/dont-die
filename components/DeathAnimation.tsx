"use client";

interface DeathAnimationProps {
  lemmingName: string;
  streak: number;
  bornAt: string;
  diedAt: string;
  onCreateNew: () => void;
}

function PixelSkull() {
  const W = "#ffffff";
  const G = "#9ca3af";
  const D = "#4b5563";
  const K = "#000000";
  const R = "#ef4444";

  return (
    <div
      className="inline-block"
      style={{
        width: 1,
        height: 1,
        transform: "scale(6)",
        transformOrigin: "top left",
        boxShadow: `
          3px 0 ${W},4px 0 ${W},5px 0 ${W},6px 0 ${W},7px 0 ${W},
          2px 1px ${W},3px 1px ${W},4px 1px ${W},5px 1px ${W},6px 1px ${W},7px 1px ${W},8px 1px ${W},
          1px 2px ${W},2px 2px ${W},3px 2px ${G},4px 2px ${W},5px 2px ${W},6px 2px ${W},7px 2px ${G},8px 2px ${W},9px 2px ${W},
          1px 3px ${W},2px 3px ${K},3px 3px ${K},4px 3px ${W},5px 3px ${W},6px 3px ${W},7px 3px ${K},8px 3px ${K},9px 3px ${W},
          1px 4px ${W},2px 4px ${K},3px 4px ${R},4px 4px ${W},5px 4px ${W},6px 4px ${W},7px 4px ${R},8px 4px ${K},9px 4px ${W},
          1px 5px ${W},2px 5px ${W},3px 5px ${W},4px 5px ${W},5px 5px ${D},6px 5px ${W},7px 5px ${W},8px 5px ${W},9px 5px ${W},
          2px 6px ${W},3px 6px ${W},4px 6px ${D},5px 6px ${W},6px 6px ${D},7px 6px ${W},8px 6px ${W},
          3px 7px ${G},4px 7px ${K},5px 7px ${G},6px 7px ${K},7px 7px ${G},
          4px 8px ${D},5px 8px ${D},6px 8px ${D}
        `,
      }}
    />
  );
}

export default function DeathAnimation({
  lemmingName,
  streak,
  bornAt,
  diedAt,
  onCreateNew,
}: DeathAnimationProps) {
  const born = bornAt ? new Date(bornAt) : null;
  const died = diedAt ? new Date(diedAt) : new Date();
  const daysSurvived = born
    ? Math.max(0, Math.floor((died.getTime() - born.getTime()) / 86400000))
    : 0;

  return (
    <main className="flex-1 flex items-center justify-center bg-gray-950 p-4">
      <div className="max-w-sm w-full text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
        {/* Pixel skull */}
        <div className="relative inline-block" style={{ width: 60, height: 54 }}>
          <div
            className="animate-bounce"
            style={{ filter: "drop-shadow(0 0 30px rgba(239,68,68,0.3))" }}
          >
            <PixelSkull />
          </div>
        </div>

        <div className="space-y-4">
          <h2
            className="pixel-font text-red-500 text-xl tracking-wider"
            style={{ textShadow: "0 0 30px rgba(239,68,68,0.4)" }}
          >
            DEAD
          </h2>
          <p className="pixel-font text-gray-400 text-xs leading-relaxed">
            <span className="text-white">{lemmingName}</span>
            <br />
            walked off the cliff.
          </p>
          <div className="pixel-font text-gray-600 space-y-1" style={{ fontSize: 9 }}>
            {daysSurvived > 0 && (
              <p>survived {daysSurvived} {daysSurvived === 1 ? "day" : "days"}</p>
            )}
            {streak > 0 && (
              <p>best streak: {streak}</p>
            )}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={onCreateNew}
            className="w-full pixel-font bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-6 py-3 rounded-xl text-xs transition-all border border-gray-700 hover:border-gray-600 touch-manipulation active:scale-[0.97]"
          >
            TRY AGAIN
          </button>

          <a
            href="/graveyard"
            className="pixel-font text-gray-700 hover:text-gray-500 transition-colors inline-block"
            style={{ fontSize: 8 }}
          >
            VISIT GRAVEYARD
          </a>
        </div>
      </div>
    </main>
  );
}
