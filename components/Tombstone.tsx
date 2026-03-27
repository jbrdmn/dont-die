"use client";

import { type Lemming } from "@/lib/types";

interface TombstoneProps {
  lemming: Lemming;
}

function PixelTombstoneIcon() {
  const S = "#6b7280"; // stone
  const SL = "#9ca3af"; // stone light
  const SD = "#4b5563"; // stone dark
  return (
    <div
      className="inline-block"
      style={{
        width: 1,
        height: 1,
        transform: "scale(3)",
        transformOrigin: "top left",
        boxShadow: `
          2px 0 ${SL},3px 0 ${SL},4px 0 ${SL},
          1px 1px ${S},2px 1px ${SL},3px 1px ${SL},4px 1px ${S},5px 1px ${S},
          1px 2px ${S},2px 2px ${S},3px 2px ${S},4px 2px ${S},5px 2px ${SD},
          1px 3px ${S},2px 3px ${SD},3px 3px ${SD},4px 3px ${S},5px 3px ${SD},
          1px 4px ${S},2px 4px ${S},3px 4px ${S},4px 4px ${S},5px 4px ${SD},
          1px 5px ${SD},2px 5px ${S},3px 5px ${S},4px 5px ${SD},5px 5px ${SD},
          0 6px ${SD},1px 6px ${SD},2px 6px ${S},3px 6px ${S},4px 6px ${SD},5px 6px ${SD},6px 6px ${SD}
        `,
      }}
    />
  );
}

export default function Tombstone({ lemming }: TombstoneProps) {
  const born = new Date(lemming.born_at);
  const died = lemming.died_at ? new Date(lemming.died_at) : new Date();
  const daysSurvived = Math.max(0, Math.floor((died.getTime() - born.getTime()) / 86400000));

  return (
    <div className="bg-gray-900/60 border border-gray-800/60 rounded-xl p-3 text-center hover:border-gray-700 transition-colors group">
      <div className="mb-2" style={{ height: 21 }}>
        <PixelTombstoneIcon />
      </div>
      <div className="pixel-font text-gray-300 text-xs truncate group-hover:text-white transition-colors">
        {lemming.name}
      </div>
      <div className="pixel-font text-gray-600 mt-1" style={{ fontSize: 8 }}>
        {daysSurvived}d
      </div>
      {lemming.streak > 0 && (
        <div className="pixel-font text-yellow-700 mt-0.5" style={{ fontSize: 8 }}>
          &#128293; {lemming.streak}
        </div>
      )}
    </div>
  );
}
