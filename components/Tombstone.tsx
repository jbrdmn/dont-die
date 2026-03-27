"use client";

import { type Lemming } from "@/lib/types";

interface TombstoneProps {
  lemming: Lemming;
}

export default function Tombstone({ lemming }: TombstoneProps) {
  const bornDate = new Date(lemming.born_at).toLocaleDateString();
  const diedDate = lemming.died_at
    ? new Date(lemming.died_at).toLocaleDateString()
    : "???";

  // Calculate days survived
  const born = new Date(lemming.born_at);
  const died = lemming.died_at ? new Date(lemming.died_at) : new Date();
  const daysSurvived = Math.floor(
    (died.getTime() - born.getTime()) / 86400000
  );

  return (
    <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
      <div className="text-3xl mb-2">🪦</div>
      <div className="pixel-font text-white font-bold text-sm truncate">
        {lemming.name}
      </div>
      <div className="pixel-font text-gray-500 text-[10px] mt-1">
        {bornDate} - {diedDate}
      </div>
      <div className="pixel-font text-gray-400 text-xs mt-2">
        {daysSurvived} {daysSurvived === 1 ? "day" : "days"} survived
      </div>
      <div className="pixel-font text-yellow-500 text-xs mt-1">
        🔥 {lemming.streak} streak
      </div>
    </div>
  );
}
