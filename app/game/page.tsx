"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LemmingScene from "@/components/LemmingScene";
import SaveButton from "@/components/SaveButton";
import CountdownTimer from "@/components/CountdownTimer";
import SpeechBubble from "@/components/SpeechBubble";
import DeathAnimation from "@/components/DeathAnimation";
import { useGameClock } from "@/hooks/useGameClock";
import { useLemming } from "@/hooks/useLemming";
import { createClient } from "@/lib/supabase/client";

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

  const [showDeathScreen, setShowDeathScreen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  const handleSave = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate(50);
    saveLemming();
  }, [saveLemming]);

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }, [router]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center bg-gray-950">
        <div className="pixel-font text-gray-600 animate-urgent-pulse" style={{ fontSize: 10 }}>
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
  const isPanic = progress > 0.85;

  return (
    <main className="flex-1 flex flex-col bg-gray-950 overflow-hidden">
      {/* Header */}
      <div className="px-3 pt-3 space-y-2">
        {/* Title + menu */}
        <div className="flex items-center justify-between px-1">
          <h1
            className="pixel-font text-white text-lg tracking-wider"
            style={{ textShadow: "0 0 20px rgba(239,68,68,0.15)" }}
          >
            DON&apos;T DIE
          </h1>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="pixel-font text-gray-600 hover:text-gray-400 transition-colors px-1"
              style={{ fontSize: 14 }}
            >
              &#8942;
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-2 z-50 bg-gray-900 border border-gray-800 rounded-xl py-1 min-w-[120px] shadow-xl">
                  <a
                    href="/graveyard"
                    className="block px-4 py-2 pixel-font text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    style={{ fontSize: 8 }}
                  >
                    GRAVEYARD
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 pixel-font text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    style={{ fontSize: 8 }}
                  >
                    SIGN OUT
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-gray-900/60 border border-gray-800/50 rounded-xl px-3 py-2.5 flex items-center justify-between">
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
            <span className="pixel-font text-gray-300 truncate" style={{ fontSize: 10 }}>
              {lemming.name}&apos;s Journey
            </span>
          </div>
          <div className="flex items-center gap-2">
            {lemming.streak > 0 ? (
              <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-2 py-1">
                <span style={{ fontSize: 10 }}>&#128293;</span>
                <span className="pixel-font text-yellow-400" style={{ fontSize: 8 }}>{lemming.streak}</span>
              </div>
            ) : (
              <div className="pixel-font text-gray-600 bg-gray-800/50 rounded-lg px-2 py-1" style={{ fontSize: 7 }}>
                day 1
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Speech bubble */}
      <div className="px-4 pt-2">
        <SpeechBubble savedToday={savedToday} isPanic={isPanic} />
      </div>

      {/* Scene */}
      <div className="flex-1 flex items-center px-3">
        <div className="w-full max-w-2xl mx-auto">
          <LemmingScene
            progress={progress}
            savedToday={savedToday}
            isAlive={lemming.is_alive}
            justDied={justDied}
            justSaved={justSaved}
          />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-3 pb-3 pt-2">
        <div className="bg-gray-900/60 border border-gray-800/50 rounded-xl px-4 py-3 space-y-3">
          <CountdownTimer countdown={countdown} msRemaining={msRemaining} />
          <SaveButton
            onSave={handleSave}
            disabled={savedToday || !lemming.is_alive}
            savedToday={savedToday}
            justSaved={justSaved}
            lemmingName={lemming.name}
          />
        </div>

        {/* Footer */}
        <p className="text-center pixel-font text-gray-800 mt-2" style={{ fontSize: 6 }}>
          No actual lemmings were harmed. Your negligence, however, is noted.
        </p>
      </div>
    </main>
  );
}
