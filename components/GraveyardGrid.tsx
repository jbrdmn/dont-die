"use client";

import { type Lemming } from "@/lib/types";
import Tombstone from "./Tombstone";

interface GraveyardGridProps {
  lemmings: Lemming[];
}

export default function GraveyardGrid({ lemmings }: GraveyardGridProps) {
  if (lemmings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🌿</div>
        <p className="pixel-font text-gray-500">
          No dead lemmings yet. The graveyard is peaceful...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {lemmings.map((l) => (
        <Tombstone key={l.id} lemming={l} />
      ))}
    </div>
  );
}
