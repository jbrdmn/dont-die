"use client";

import { type Lemming } from "@/lib/types";
import Tombstone from "./Tombstone";

interface GraveyardGridProps {
  lemmings: Lemming[];
}

export default function GraveyardGrid({ lemmings }: GraveyardGridProps) {
  if (lemmings.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="pixel-font text-gray-700 text-sm">
          Empty.
        </div>
        <p className="pixel-font text-gray-800" style={{ fontSize: 8 }}>
          No lemmings have died yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {lemmings.map((l) => (
        <Tombstone key={l.id} lemming={l} />
      ))}
    </div>
  );
}
