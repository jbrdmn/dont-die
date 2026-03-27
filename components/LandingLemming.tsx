"use client";

/*
 * A small pixel-art lemming that walks across the landing page on loop.
 * Uses the same box-shadow pixel art technique as the game Lemming.
 */

const GREEN = "#22c55e";
const DARK_GREEN = "#16a34a";
const SKIN = "#ffcc99";
const SKIN_DARK = "#f0a060";
const BLUE = "#3b82f6";
const DARK_BLUE = "#1d4ed8";
const EYE = "#000000";

const bodyPixels = `
  3px 0px ${GREEN}, 5px 0px ${GREEN}, 7px 0px ${GREEN}, 9px 0px ${GREEN},
  2px 1px ${GREEN}, 3px 1px ${DARK_GREEN}, 4px 1px ${GREEN}, 5px 1px ${DARK_GREEN},
  6px 1px ${GREEN}, 7px 1px ${DARK_GREEN}, 8px 1px ${GREEN}, 9px 1px ${DARK_GREEN}, 10px 1px ${GREEN},
  2px 2px ${GREEN}, 3px 2px ${GREEN}, 4px 2px ${GREEN}, 5px 2px ${GREEN},
  6px 2px ${GREEN}, 7px 2px ${GREEN}, 8px 2px ${GREEN}, 9px 2px ${GREEN}, 10px 2px ${GREEN},
  3px 3px ${SKIN}, 4px 3px ${SKIN}, 5px 3px ${SKIN}, 6px 3px ${SKIN},
  7px 3px ${SKIN}, 8px 3px ${SKIN}, 9px 3px ${SKIN},
  3px 4px ${SKIN}, 4px 4px ${EYE}, 5px 4px ${SKIN}, 6px 4px ${SKIN},
  7px 4px ${SKIN}, 8px 4px ${EYE}, 9px 4px ${SKIN},
  3px 5px ${SKIN}, 4px 5px ${SKIN}, 5px 5px ${SKIN}, 6px 5px ${SKIN_DARK},
  7px 5px ${SKIN}, 8px 5px ${SKIN}, 9px 5px ${SKIN},
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

const leftLeg = `4px 12px ${SKIN_DARK}, 5px 12px ${SKIN_DARK}, 4px 13px ${SKIN_DARK}`;
const rightLeg = `7px 12px ${SKIN_DARK}, 8px 12px ${SKIN_DARK}, 8px 13px ${SKIN_DARK}`;

export default function LandingLemming() {
  const scale = 3;
  return (
    <div
      className="absolute animate-landing-walk animate-walk-bob"
      style={{ top: "50%", transform: "translateY(-50%)" }}
    >
      <div style={{ width: 13 * scale, height: 14 * scale, position: "relative" }}>
        <div
          style={{
            width: 1,
            height: 1,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            boxShadow: bodyPixels,
          }}
        />
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
            boxShadow: leftLeg,
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
            boxShadow: rightLeg,
          }}
        />
      </div>
    </div>
  );
}
