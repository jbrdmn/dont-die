"use client";

import { useState } from "react";

interface NameFormProps {
  onSubmit: (name: string) => void;
}

const randomNames = [
  "Blinky", "Stumpy", "Wobble", "Dash", "Nugget",
  "Pickle", "Beans", "Sprout", "Ziggy", "Noodle",
  "Muffin", "Pepper", "Gizmo", "Turbo", "Waffle",
  "Biscuit", "Chompy", "Fizz", "Pebble", "Sparky",
  "Tofu", "Boots", "Crumble", "Doodle", "Flip",
];

const G = "#22c55e";
const GD = "#16a34a";
const S = "#ffcc99";
const SD = "#e8a060";
const B = "#3b82f6";
const BD = "#2563eb";
const BL = "#60a5fa";
const K = "#000000";

const standingPixels = `
  4px 0 ${G},6px 0 ${G},8px 0 ${G},
  3px 1px ${G},4px 1px ${GD},5px 1px ${G},6px 1px ${GD},7px 1px ${G},8px 1px ${GD},9px 1px ${G},
  3px 2px ${G},4px 2px ${G},5px 2px ${G},6px 2px ${G},7px 2px ${G},8px 2px ${G},9px 2px ${G},
  3px 3px ${S},4px 3px ${S},5px 3px ${S},6px 3px ${S},7px 3px ${S},8px 3px ${S},9px 3px ${S},
  3px 4px ${S},4px 4px ${K},5px 4px ${S},6px 4px ${S},7px 4px ${S},8px 4px ${K},9px 4px ${S},
  3px 5px ${S},4px 5px ${S},5px 5px ${S},6px 5px ${SD},7px 5px ${S},8px 5px ${S},9px 5px ${S},
  3px 6px ${B},4px 6px ${B},5px 6px ${BL},6px 6px ${B},7px 6px ${B},8px 6px ${B},9px 6px ${B},
  2px 7px ${B},3px 7px ${B},4px 7px ${B},5px 7px ${BD},6px 7px ${B},7px 7px ${BD},8px 7px ${B},9px 7px ${B},10px 7px ${B},
  2px 8px ${BD},3px 8px ${B},4px 8px ${B},5px 8px ${B},6px 8px ${BD},7px 8px ${B},8px 8px ${B},9px 8px ${B},10px 8px ${BD},
  3px 9px ${BD},4px 9px ${B},5px 9px ${BD},6px 9px ${B},7px 9px ${BD},8px 9px ${B},9px 9px ${BD},
  4px 10px ${B},5px 10px ${B},6px 10px ${BD},7px 10px ${B},8px 10px ${B},
  4px 11px ${SD},5px 11px ${SD},8px 11px ${SD},9px 11px ${SD},
  4px 12px ${SD},5px 12px ${SD},8px 12px ${SD},9px 12px ${SD}
`;

export default function NameForm({ onSubmit }: NameFormProps) {
  const [name, setName] = useState("");

  const randomize = () => {
    setName(randomNames[Math.floor(Math.random() * randomNames.length)]);
  };

  return (
    <div className="space-y-6 text-center max-w-sm mx-auto">
      <h1 className="pixel-font text-white text-base sm:text-lg tracking-wider">
        NAME YOUR LEMMING
      </h1>

      <div className="space-y-3">
        {/* Lemming sprite */}
        <div className="flex justify-center" style={{ height: 52 }}>
          <div style={{ width: 1, height: 1, transform: "scale(4)", transformOrigin: "top left", boxShadow: standingPixels }} />
        </div>

        <p className="pixel-font text-gray-500" style={{ fontSize: 8, lineHeight: "1.8" }}>
          Give your lemming a name.
          <br />
          They&apos;ll need something to put on the tombstone.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onSubmit(name.trim());
        }}
        className="space-y-3"
      >
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl pixel-font text-white text-center text-sm focus:border-green-500/60 focus:outline-none focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-700"
            autoFocus
          />
          <button
            type="button"
            onClick={randomize}
            className="px-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl transition-colors touch-manipulation active:scale-95"
            title="Random name"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full pixel-font bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:text-gray-700 text-white px-6 py-3 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.97] border border-green-500/40 disabled:border-gray-700 flex items-center justify-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M8 5v14l11-7z" />
          </svg>
          BEGIN JOURNEY
        </button>
      </form>

      <p className="pixel-font text-gray-700" style={{ fontSize: 7 }}>
        They have 24 hours. The clock starts now.
      </p>
    </div>
  );
}
