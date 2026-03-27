"use client";

import GraveyardGrid from "@/components/GraveyardGrid";
import { useGraveyard } from "@/hooks/useGraveyard";

export default function GraveyardPage() {
  const { dead, loading } = useGraveyard();

  return (
    <main className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto w-full">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl pixel-font text-gray-300">
            🪦 THE GRAVEYARD 🪦
          </h1>
          <p className="pixel-font text-gray-600 text-[10px]">
            Here lie the lemmings that weren&apos;t saved in time.
          </p>
        </div>

        {loading ? (
          <div className="text-center pixel-font text-gray-500 animate-pulse">
            Loading the dead...
          </div>
        ) : (
          <GraveyardGrid lemmings={dead} />
        )}

        <div className="text-center">
          <a
            href="/"
            className="pixel-font text-gray-600 hover:text-gray-400 text-xs underline"
          >
            ← Back to the living
          </a>
        </div>
      </div>
    </main>
  );
}
