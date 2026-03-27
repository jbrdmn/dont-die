"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LemmingScene from "@/components/LemmingScene";
import SaveButton from "@/components/SaveButton";
import CountdownTimer from "@/components/CountdownTimer";
import StreakCounter from "@/components/StreakCounter";
import DeathAnimation from "@/components/DeathAnimation";
import NameForm from "@/components/NameForm";
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
    createLemming,
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
        <div className="pixel-font text-gray-400 animate-pulse">Loading...</div>
      </main>
    );
  }

  // Dead lemming — show death + new lemming form
  if (justDied) {
    return (
      <>
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-lg w-full space-y-8">
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
            // The DeathAnimation has its own name input, but we need to get the name
            // Let's redirect to name page
            setJustDied(false);
            router.push("/name-your-lemming");
          }}
        />
      </>
    );
  }

  if (!lemming) return null;

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full space-y-6">
        {/* Lemming name */}
        <div className="text-center">
          <h1 className="pixel-font text-white text-lg sm:text-xl">
            {lemming.name}
          </h1>
        </div>

        {/* Scene */}
        <LemmingScene
          progress={progress}
          savedToday={savedToday}
          isAlive={lemming.is_alive}
          justDied={false}
        />

        {/* Stats row */}
        <div className="flex justify-between items-start">
          <StreakCounter streak={lemming.streak} />
          <CountdownTimer countdown={countdown} msRemaining={msRemaining} />
        </div>

        {/* Save button */}
        <div className="text-center">
          <SaveButton
            onSave={saveLemming}
            disabled={savedToday || !lemming.is_alive}
            savedToday={savedToday}
          />
        </div>

        {/* Just saved feedback */}
        {justSaved && (
          <div className="text-center pixel-font text-green-400 text-sm animate-bounce">
            Your lemming is safe! See you tomorrow.
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-4">
          <a
            href="/graveyard"
            className="pixel-font text-gray-600 hover:text-gray-400 text-[10px] underline"
          >
            Visit the Graveyard
          </a>
        </div>
      </div>
    </main>
  );
}
