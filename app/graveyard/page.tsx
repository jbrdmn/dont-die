"use client";

import GraveyardGrid from "@/components/GraveyardGrid";
import { useGraveyard } from "@/hooks/useGraveyard";

export default function GraveyardPage() {
  const { dead, loading } = useGraveyard();

  return (
    <main className="flex-1 p-4 sm:p-6 max-w-2xl mx-auto w-full bg-gray-950">
      <div className="space-y-6">
        <div className="text-center space-y-3 pt-6">
          <h1
            className="pixel-font text-gray-400 text-base sm:text-xl tracking-wider"
            style={{ textShadow: "0 0 20px rgba(107,114,128,0.2)" }}
          >
            THE GRAVEYARD
          </h1>
          <p className="pixel-font text-gray-700" style={{ fontSize: 8 }}>
            They weren&apos;t saved in time.
          </p>
        </div>

        {loading ? (
          <div className="text-center pixel-font text-gray-600 text-xs animate-urgent-pulse py-12">
            ...
          </div>
        ) : (
          <GraveyardGrid lemmings={dead} />
        )}

        <div className="text-center pb-6">
          <a
            href="/"
            className="pixel-font text-gray-700 hover:text-gray-500 transition-colors"
            style={{ fontSize: 8 }}
          >
            &larr; BACK
          </a>
        </div>
      </div>
    </main>
  );
}
