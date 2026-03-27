"use client";

interface DeathAnimationProps {
  lemmingName: string;
  streak: number;
  onCreateNew: () => void;
}

export default function DeathAnimation({
  lemmingName,
  streak,
  onCreateNew,
}: DeathAnimationProps) {
  return (
    <main className="flex-1 flex items-center justify-center bg-gray-950 p-4">
      <div className="max-w-sm w-full text-center space-y-8">
        {/* Skull with glow */}
        <div className="relative inline-block">
          <div
            className="text-7xl animate-bounce"
            style={{ filter: "drop-shadow(0 0 20px rgba(239,68,68,0.4))" }}
          >
            &#128128;
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="pixel-font text-red-500 text-lg" style={{ textShadow: "0 0 20px rgba(239,68,68,0.3)" }}>
            DEAD
          </h2>
          <p className="pixel-font text-gray-400 text-xs leading-relaxed">
            <span className="text-white">{lemmingName}</span> walked off the cliff.
          </p>
          {streak > 0 && (
            <p className="pixel-font text-gray-600" style={{ fontSize: 9 }}>
              survived {streak} {streak === 1 ? "day" : "days"}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            onClick={onCreateNew}
            className="w-full pixel-font bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-6 py-4 rounded-2xl text-sm transition-all border border-gray-700 hover:border-gray-600 touch-manipulation active:scale-[0.97]"
          >
            TRY AGAIN
          </button>
        </div>

        <a
          href="/graveyard"
          className="pixel-font text-gray-700 hover:text-gray-500 transition-colors inline-block"
          style={{ fontSize: 8 }}
        >
          VISIT GRAVEYARD
        </a>
      </div>
    </main>
  );
}
