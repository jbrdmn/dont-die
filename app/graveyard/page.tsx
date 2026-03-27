"use client";

import GraveyardGrid from "@/components/GraveyardGrid";
import { useGraveyard } from "@/hooks/useGraveyard";

export default function GraveyardPage() {
  const { dead, loading } = useGraveyard();

  return (
    <main className="flex-1 p-3 sm:p-6 max-w-4xl mx-auto w-full">
      <div className="space-y-6">
        <div className="text-center space-y-2 pt-2">
          <h1 className="text-xl sm:text-3xl pixel-font text-gray-300">
            THE GRAVEYARD
          </h1>
          <p className="pixel-font text-gray-600" style={{ fontSize: 9 }}>
            Here lie the lemmings that weren&apos;t saved in time.
          </p>
        </div>

        {loading ? (
          <div className="text-center pixel-font text-gray-500 animate-urgent-pulse">
            Loading the dead...
          </div>
        ) : (
          <GraveyardGrid lemmings={dead} />
        )}

        <div className="text-center pb-4">
          <a
            href="/"
            className="pixel-font text-gray-600 hover:text-gray-400 text-xs underline"
          >
            &larr; Back to the living
          </a>
        </div>
      </div>
    </main>
  );
}
