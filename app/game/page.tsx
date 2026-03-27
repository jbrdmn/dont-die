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

  // If no lemming exists and not dead, redirect to naming
  useEffect(() => {
    if (!loading && !lemming && !justDied) {
      router.push("/name-your-lemming");
    }
  }, [loading, lemming, justDied, router]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="pixel-font text-gray-400 animate-urgent-pulse">
          Loading...
        </div>
      </main>
    );
  }

  // Dead lemming — show death + new lemming form
  if (justDied) {
    return (
      <>
        <main className="flex-1 flex items-center justify-center p-3">
          <div className="max-w-lg w-full space-y-6">
            <LemmingScene
              progress={1}
              savedToday={false}
              isAlive={false}
              justDied={true}
            />
          </div>
        </main>
        <DeathAnimation
          lemmingName={lemming?.name ?? "Your lemming"}
          streak={lemming?.streak ?? 0}
          onCreateNew={async () => {
            setJustDied(false);
            router.push("/name-your-lemming");
          }}
        />
      </>
    );
  }

  if (!lemming) return null;

  return (
    <main className="flex-1 flex flex-col min-h-full p-3 sm:p-4 pb-28">
      <div className="max-w-lg w-full mx-auto flex flex-col flex-1 gap-4">
        {/* Lemming name */}
        <div className="text-center pt-2">
          <h1 className="pixel-font text-white text-base sm:text-lg">
            {lemming.name}
          </h1>
        </div>

        {/* Scene - hero element, takes most space */}
        <LemmingScene
          progress={progress}
          savedToday={savedToday}
          isAlive={lemming.is_alive}
          justDied={false}
        />

        {/* Stats row */}
        <div className="flex justify-between items-start gap-2">
          <StreakCounter streak={lemming.streak} />
          <CountdownTimer countdown={countdown} msRemaining={msRemaining} />
        </div>

        {/* Just saved feedback */}
        {justSaved && (
          <div className="text-center pixel-font text-green-400 text-xs animate-urgent-pulse">
            Your lemming is safe! See you tomorrow.
          </div>
        )}

        {/* Footer link */}
        <div className="text-center mt-auto pt-2">
          <a
            href="/graveyard"
            className="pixel-font text-gray-600 hover:text-gray-400 underline"
            style={{ fontSize: 9 }}
          >
            Visit the Graveyard
          </a>
        </div>
      </div>

      {/* Sticky save button at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-50">
        <div className="max-w-lg mx-auto">
          <SaveButton
            onSave={saveLemming}
            disabled={savedToday || !lemming.is_alive}
            savedToday={savedToday}
          />
        </div>
      </div>
    </main>
  );
}
