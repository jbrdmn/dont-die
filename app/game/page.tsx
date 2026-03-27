"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LemmingScene from "@/components/LemmingScene";
import SaveButton from "@/components/SaveButton";
import CountdownTimer from "@/components/CountdownTimer";
import StreakCounter from "@/components/StreakCounter";
import DeathAnimation from "@/components/DeathAnimation";
import { useGameClock } from "@/hooks/useGameClock";
import { useLemming } from "@/hooks/useLemming";

export default function GamePage() {
  const router = useRouter();
  const { progress, countdown, msRemaining } = useGameClock();
  const {
    lemming,
    loading,
    savedToday,
    justSaved,
    justDied,
    setJustDied,
    saveLemming,
  } = useLemming();

  useEffect(() => {
    if (!loading && !lemming && !justDied) {
      router.push("/name-your-lemming");
    }
  }, [loading, lemming, justDied, router]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-gray-950">
        <div className="pixel-font text-gray-500 animate-urgent-pulse text-sm">
          Loading...
        </div>
      </main>
    );
  }

  if (justDied) {
    return (
      <DeathAnimation
        lemmingName={lemming?.name ?? "Your lemming"}
        streak={lemming?.streak ?? 0}
        onCreateNew={() => {
          setJustDied(false);
          router.push("/name-your-lemming");
        }}
      />
    );
  }

  if (!lemming) return null;

  return (
    <main className="flex-1 flex flex-col bg-gray-950 overflow-hidden">
      {/* Top bar: name + streak */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: savedToday ? "#22c55e" : "#ef4444",
              boxShadow: savedToday
                ? "0 0 6px #22c55e"
                : "0 0 6px #ef4444",
            }}
          />
          <h1 className="pixel-font text-white text-sm sm:text-base truncate max-w-[140px]">
            {lemming.name}
          </h1>
        </div>
        <StreakCounter streak={lemming.streak} />
      </div>

      {/* Scene - the hero */}
      <div className="flex-1 flex items-center px-3">
        <div className="w-full max-w-2xl mx-auto">
          <LemmingScene
            progress={progress}
            savedToday={savedToday}
            isAlive={lemming.is_alive}
            justDied={false}
          />
        </div>
      </div>

      {/* Bottom area: timer + save */}
      <div className="px-4 pb-4 pt-2 space-y-3">
        <CountdownTimer countdown={countdown} msRemaining={msRemaining} />

        <SaveButton
          onSave={saveLemming}
          disabled={savedToday || !lemming.is_alive}
          savedToday={savedToday}
        />

        {justSaved && (
          <div className="text-center pixel-font text-green-400 animate-urgent-pulse" style={{ fontSize: 10 }}>
            Safe! See you tomorrow.
          </div>
        )}

        <div className="text-center pt-1 pb-1">
          <a
            href="/graveyard"
            className="pixel-font text-gray-700 hover:text-gray-500 transition-colors"
            style={{ fontSize: 8 }}
          >
            GRAVEYARD
          </a>
        </div>
      </div>
    </main>
  );
}
