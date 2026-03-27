"use client";

export type LemmingState = "walking" | "sleeping" | "panic" | "falling";

interface LemmingProps {
  state: LemmingState;
  progress: number; // 0-1
}

/*
 * CSS box-shadow pixel art lemming inspired by the classic Lemmings game.
 * Each pixel is a 1px box-shadow, scaled up. The sprite is roughly 12x16 logical pixels.
 * Colors: green hair (#22c55e), skin (#ffcc99), blue robe (#3b82f6), dark blue (#1d4ed8)
 */

const GREEN = "#22c55e";
const DARK_GREEN = "#16a34a";
const SKIN = "#ffcc99";
const SKIN_DARK = "#f0a060";
const BLUE = "#3b82f6";
const DARK_BLUE = "#1d4ed8";
const WHITE = "#ffffff";
const BLACK = "#000000";
const EYE = "#000000";

// Walking frame - green spiky hair, skin face, blue robe, tiny legs
const walkingPixels = `
  /* Hair - spiky green */
  3px 0px ${GREEN}, 5px 0px ${GREEN}, 7px 0px ${GREEN}, 9px 0px ${GREEN},
  2px 1px ${GREEN}, 3px 1px ${DARK_GREEN}, 4px 1px ${GREEN}, 5px 1px ${DARK_GREEN},
  6px 1px ${GREEN}, 7px 1px ${DARK_GREEN}, 8px 1px ${GREEN}, 9px 1px ${DARK_GREEN}, 10px 1px ${GREEN},
  2px 2px ${GREEN}, 3px 2px ${GREEN}, 4px 2px ${GREEN}, 5px 2px ${GREEN},
  6px 2px ${GREEN}, 7px 2px ${GREEN}, 8px 2px ${GREEN}, 9px 2px ${GREEN}, 10px 2px ${GREEN},
  /* Face */
  3px 3px ${SKIN}, 4px 3px ${SKIN}, 5px 3px ${SKIN}, 6px 3px ${SKIN},
  7px 3px ${SKIN}, 8px 3px ${SKIN}, 9px 3px ${SKIN},
  3px 4px ${SKIN}, 4px 4px ${EYE}, 5px 4px ${SKIN}, 6px 4px ${SKIN},
  7px 4px ${SKIN}, 8px 4px ${EYE}, 9px 4px ${SKIN},
  3px 5px ${SKIN}, 4px 5px ${SKIN}, 5px 5px ${SKIN}, 6px 5px ${SKIN_DARK},
  7px 5px ${SKIN}, 8px 5px ${SKIN}, 9px 5px ${SKIN},
  /* Blue robe body */
  3px 6px ${BLUE}, 4px 6px ${BLUE}, 5px 6px ${BLUE}, 6px 6px ${BLUE},
  7px 6px ${BLUE}, 8px 6px ${BLUE}, 9px 6px ${BLUE},
  2px 7px ${BLUE}, 3px 7px ${BLUE}, 4px 7px ${DARK_BLUE}, 5px 7px ${BLUE},
  6px 7px ${BLUE}, 7px 7px ${BLUE}, 8px 7px ${DARK_BLUE}, 9px 7px ${BLUE}, 10px 7px ${BLUE},
  2px 8px ${BLUE}, 3px 8px ${BLUE}, 4px 8px ${BLUE}, 5px 8px ${DARK_BLUE},
  6px 8px ${BLUE}, 7px 8px ${DARK_BLUE}, 8px 8px ${BLUE}, 9px 8px ${BLUE}, 10px 8px ${BLUE},
  3px 9px ${BLUE}, 4px 9px ${BLUE}, 5px 9px ${BLUE}, 6px 9px ${BLUE},
  7px 9px ${BLUE}, 8px 9px ${BLUE}, 9px 9px ${BLUE},
  3px 10px ${DARK_BLUE}, 4px 10px ${BLUE}, 5px 10px ${DARK_BLUE}, 6px 10px ${BLUE},
  7px 10px ${DARK_BLUE}, 8px 10px ${BLUE}, 9px 10px ${DARK_BLUE},
  4px 11px ${BLUE}, 5px 11px ${BLUE}, 6px 11px ${BLUE},
  7px 11px ${BLUE}, 8px 11px ${BLUE}
`;

// Legs are separate for animation
const leftLegPixels = `4px 12px ${SKIN_DARK}, 5px 12px ${SKIN_DARK}, 4px 13px ${SKIN_DARK}`;
const rightLegPixels = `7px 12px ${SKIN_DARK}, 8px 12px ${SKIN_DARK}, 8px 13px ${SKIN_DARK}`;

// Sleeping - lying on side
const sleepingPixels = `
  /* Hair horizontal */
  0px 5px ${GREEN}, 0px 3px ${GREEN}, 0px 7px ${GREEN},
  1px 3px ${GREEN}, 1px 4px ${DARK_GREEN}, 1px 5px ${GREEN}, 1px 6px ${DARK_GREEN}, 1px 7px ${GREEN},
  2px 3px ${GREEN}, 2px 4px ${GREEN}, 2px 5px ${GREEN}, 2px 6px ${GREEN}, 2px 7px ${GREEN},
  /* Face */
  3px 3px ${SKIN}, 3px 4px ${SKIN}, 3px 5px ${SKIN}, 3px 6px ${SKIN}, 3px 7px ${SKIN},
  4px 3px ${SKIN}, 4px 4px ${SKIN}, 4px 5px ${SKIN}, 4px 6px ${SKIN}, 4px 7px ${SKIN},
  /* Closed eyes - horizontal dashes */
  4px 4px ${EYE}, 4px 6px ${EYE},
  /* Blue robe body - horizontal */
  5px 2px ${BLUE}, 5px 3px ${BLUE}, 5px 4px ${BLUE}, 5px 5px ${BLUE},
  5px 6px ${BLUE}, 5px 7px ${BLUE}, 5px 8px ${BLUE},
  6px 2px ${BLUE}, 6px 3px ${DARK_BLUE}, 6px 4px ${BLUE}, 6px 5px ${BLUE},
  6px 6px ${BLUE}, 6px 7px ${DARK_BLUE}, 6px 8px ${BLUE},
  7px 3px ${BLUE}, 7px 4px ${BLUE}, 7px 5px ${DARK_BLUE}, 7px 6px ${BLUE}, 7px 7px ${BLUE},
  8px 3px ${DARK_BLUE}, 8px 4px ${BLUE}, 8px 5px ${BLUE}, 8px 6px ${BLUE}, 8px 7px ${DARK_BLUE},
  /* Tiny legs curled up */
  9px 3px ${SKIN_DARK}, 9px 4px ${SKIN_DARK}, 9px 7px ${SKIN_DARK}, 9px 6px ${SKIN_DARK}
`;

// Panic pixels - same as walking but with wide open eyes and open mouth
const panicPixels = `
  /* Hair - spiky green */
  3px 0px ${GREEN}, 5px 0px ${GREEN}, 7px 0px ${GREEN}, 9px 0px ${GREEN},
  2px 1px ${GREEN}, 3px 1px ${DARK_GREEN}, 4px 1px ${GREEN}, 5px 1px ${DARK_GREEN},
  6px 1px ${GREEN}, 7px 1px ${DARK_GREEN}, 8px 1px ${GREEN}, 9px 1px ${DARK_GREEN}, 10px 1px ${GREEN},
  2px 2px ${GREEN}, 3px 2px ${GREEN}, 4px 2px ${GREEN}, 5px 2px ${GREEN},
  6px 2px ${GREEN}, 7px 2px ${GREEN}, 8px 2px ${GREEN}, 9px 2px ${GREEN}, 10px 2px ${GREEN},
  /* Face */
  3px 3px ${SKIN}, 4px 3px ${SKIN}, 5px 3px ${SKIN}, 6px 3px ${SKIN},
  7px 3px ${SKIN}, 8px 3px ${SKIN}, 9px 3px ${SKIN},
  /* Wide eyes */
  3px 4px ${WHITE}, 4px 4px ${EYE}, 5px 4px ${WHITE}, 6px 4px ${SKIN},
  7px 4px ${WHITE}, 8px 4px ${EYE}, 9px 4px ${WHITE},
  /* Open mouth */
  3px 5px ${SKIN}, 4px 5px ${SKIN}, 5px 5px ${BLACK}, 6px 5px ${BLACK},
  7px 5px ${BLACK}, 8px 5px ${SKIN}, 9px 5px ${SKIN},
  /* Blue robe body */
  3px 6px ${BLUE}, 4px 6px ${BLUE}, 5px 6px ${BLUE}, 6px 6px ${BLUE},
  7px 6px ${BLUE}, 8px 6px ${BLUE}, 9px 6px ${BLUE},
  2px 7px ${BLUE}, 3px 7px ${BLUE}, 4px 7px ${DARK_BLUE}, 5px 7px ${BLUE},
  6px 7px ${BLUE}, 7px 7px ${BLUE}, 8px 7px ${DARK_BLUE}, 9px 7px ${BLUE}, 10px 7px ${BLUE},
  2px 8px ${BLUE}, 3px 8px ${BLUE}, 4px 8px ${BLUE}, 5px 8px ${DARK_BLUE},
  6px 8px ${BLUE}, 7px 8px ${DARK_BLUE}, 8px 8px ${BLUE}, 9px 8px ${BLUE}, 10px 8px ${BLUE},
  3px 9px ${BLUE}, 4px 9px ${BLUE}, 5px 9px ${BLUE}, 6px 9px ${BLUE},
  7px 9px ${BLUE}, 8px 9px ${BLUE}, 9px 9px ${BLUE},
  3px 10px ${DARK_BLUE}, 4px 10px ${BLUE}, 5px 10px ${DARK_BLUE}, 6px 10px ${BLUE},
  7px 10px ${DARK_BLUE}, 8px 10px ${BLUE}, 9px 10px ${DARK_BLUE},
  4px 11px ${BLUE}, 5px 11px ${BLUE}, 6px 11px ${BLUE},
  7px 11px ${BLUE}, 8px 11px ${BLUE}
`;

const fallingPixels = `
  /* Hair */
  3px 0px ${GREEN}, 5px 0px ${GREEN}, 7px 0px ${GREEN}, 9px 0px ${GREEN},
  2px 1px ${GREEN}, 3px 1px ${GREEN}, 4px 1px ${GREEN}, 5px 1px ${GREEN},
  6px 1px ${GREEN}, 7px 1px ${GREEN}, 8px 1px ${GREEN}, 9px 1px ${GREEN}, 10px 1px ${GREEN},
  2px 2px ${GREEN}, 3px 2px ${GREEN}, 4px 2px ${GREEN}, 5px 2px ${GREEN},
  6px 2px ${GREEN}, 7px 2px ${GREEN}, 8px 2px ${GREEN}, 9px 2px ${GREEN}, 10px 2px ${GREEN},
  /* Face - scared */
  3px 3px ${SKIN}, 4px 3px ${SKIN}, 5px 3px ${SKIN}, 6px 3px ${SKIN},
  7px 3px ${SKIN}, 8px 3px ${SKIN}, 9px 3px ${SKIN},
  3px 4px ${WHITE}, 4px 4px ${EYE}, 5px 4px ${WHITE}, 6px 4px ${SKIN},
  7px 4px ${WHITE}, 8px 4px ${EYE}, 9px 4px ${WHITE},
  4px 5px ${SKIN}, 5px 5px ${SKIN}, 6px 5px ${BLACK}, 7px 5px ${SKIN}, 8px 5px ${SKIN},
  /* Arms out */
  1px 7px ${SKIN_DARK}, 2px 7px ${SKIN_DARK},
  10px 7px ${SKIN_DARK}, 11px 7px ${SKIN_DARK},
  /* Robe */
  3px 6px ${BLUE}, 4px 6px ${BLUE}, 5px 6px ${BLUE}, 6px 6px ${BLUE},
  7px 6px ${BLUE}, 8px 6px ${BLUE}, 9px 6px ${BLUE},
  3px 7px ${BLUE}, 4px 7px ${DARK_BLUE}, 5px 7px ${BLUE},
  6px 7px ${BLUE}, 7px 7px ${BLUE}, 8px 7px ${DARK_BLUE}, 9px 7px ${BLUE},
  3px 8px ${BLUE}, 4px 8px ${BLUE}, 5px 8px ${DARK_BLUE},
  6px 8px ${BLUE}, 7px 8px ${DARK_BLUE}, 8px 8px ${BLUE}, 9px 8px ${BLUE},
  4px 9px ${BLUE}, 5px 9px ${BLUE}, 6px 9px ${BLUE}, 7px 9px ${BLUE}, 8px 9px ${BLUE},
  /* Legs spread */
  3px 10px ${SKIN_DARK}, 4px 10px ${SKIN_DARK},
  8px 10px ${SKIN_DARK}, 9px 10px ${SKIN_DARK},
  2px 11px ${SKIN_DARK}, 10px 11px ${SKIN_DARK}
`;

export default function Lemming({ state, progress }: LemmingProps) {
  const leftPercent = state === "sleeping" ? 5 : Math.min(progress * 85, 85);
  const isPanic = progress > 0.85 && state === "walking";
  const actualState = isPanic ? "panic" : state;

  const scale = 3;

  return (
    <div
      className="absolute transition-all duration-1000 ease-linear"
      style={{
        left: `${leftPercent}%`,
        bottom: actualState === "sleeping" ? "28px" : "32px",
      }}
    >
      {actualState === "walking" && (
        <div className="animate-walk-bob" style={{ width: 13 * scale, height: 14 * scale }}>
          {/* Main body */}
          <div
            style={{
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: walkingPixels,
            }}
          />
          {/* Left leg - animated */}
          <div
            className="animate-walk-legs-a"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: leftLegPixels,
            }}
          />
          {/* Right leg - animated opposite */}
          <div
            className="animate-walk-legs-b"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: rightLegPixels,
            }}
          />
        </div>
      )}

      {actualState === "sleeping" && (
        <div style={{ width: 10 * scale, height: 11 * scale, position: "relative" }}>
          <div
            style={{
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: sleepingPixels,
            }}
          />
          {/* Z's floating up */}
          <span
            className="absolute pixel-font text-white animate-zzz"
            style={{ top: -16, right: -8, fontSize: 8 }}
          >
            z
          </span>
          <span
            className="absolute pixel-font text-white animate-zzz-delay"
            style={{ top: -24, right: -16, fontSize: 10 }}
          >
            z
          </span>
          <span
            className="absolute pixel-font text-white animate-zzz-delay2"
            style={{ top: -34, right: -22, fontSize: 12 }}
          >
            z
          </span>
        </div>
      )}

      {actualState === "panic" && (
        <div className="animate-shake" style={{ width: 13 * scale, height: 14 * scale }}>
          <div
            style={{
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: panicPixels,
            }}
          />
          {/* Panic legs - fast */}
          <div
            className="animate-walk-legs-a"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: leftLegPixels,
            }}
          />
          <div
            className="animate-walk-legs-b"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: rightLegPixels,
            }}
          />
          {/* Exclamation */}
          <span
            className="absolute pixel-font text-red-500 animate-urgent-pulse"
            style={{ top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 10 }}
          >
            !!
          </span>
        </div>
      )}

      {actualState === "falling" && (
        <div className="animate-fall-tumble" style={{ width: 13 * scale, height: 12 * scale }}>
          <div
            style={{
              width: 1,
              height: 1,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              boxShadow: fallingPixels,
            }}
          />
        </div>
      )}

      {actualState !== "falling" && actualState === "panic" && (
        <div className="text-center pixel-font mt-1 text-red-400" style={{ fontSize: 8 }}>
          HELP!
        </div>
      )}
    </div>
  );
}
