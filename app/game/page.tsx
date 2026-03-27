"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  // Show falling animation in scene before death screen
  const [showDeathScreen, setShowDeathScreen] = useState(false);

  useEffect(() => {
    if (justDied && !showDeathScreen) {
      const timer = setTimeout(() => setShowDeathScreen(true), 2800);
      return () => clearTimeout(timer);
    }
  }, [justDied, showDeathScreen]);

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

  if (justDied && showDeathScreen) {
    return (
      <DeathAnimation
        lemmingName={lemming?.name ?? "Your lemming"}
        streak={lemming?.streak ?? 0}
        bornAt={lemming?.born_at ?? ""}
        diedAt={lemming?.died_at ?? ""}
        onCreateNew={() => {
          setJustDied(false);
          setShowDeathScreen(false);
          router.push("/name-your-lemming");
        }}
      />
    );
  }

  if (!lemming) return null;

  const isUrgent = msRemaining < 3600000;

  return (
    <main className="flex-1 flex flex-col bg-gray-950 overflow-hidden">
      {/* Top bar: name + streak */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              background: savedToday ? "#22c55e" : isUrgent ? "#ef4444" : "#f59e0b",
              boxShadow: savedToday
                ? "0 0 6px #22c55e"
                : isUrgent
                ? "0 0 8px #ef4444"
                : "0 0 6px #f59e0b",
            }}
          />
          <h1 className="pixel-font text-white text-sm truncate">
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
            justDied={justDied}
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
