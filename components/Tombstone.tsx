"use client";

import { type Lemming } from "@/lib/types";

interface TombstoneProps {
  lemming: Lemming;
}

export default function Tombstone({ lemming }: TombstoneProps) {
  const born = new Date(lemming.born_at);
  const died = lemming.died_at ? new Date(lemming.died_at) : new Date();
  const daysSurvived = Math.max(0, Math.floor((died.getTime() - born.getTime()) / 86400000));

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center hover:border-gray-700 transition-colors">
      <div className="text-2xl mb-1">&#129702;</div>
      <div className="pixel-font text-white text-xs truncate">
        {lemming.name}
      </div>
      <div className="pixel-font text-gray-600 mt-1" style={{ fontSize: 8 }}>
        {daysSurvived}d survived
      </div>
      {lemming.streak > 0 && (
        <div className="pixel-font text-yellow-600 mt-0.5" style={{ fontSize: 8 }}>
          &#128293; {lemming.streak}
        </div>
      )}
    </div>
  );
}
