"use client";

export type LemmingState = "walking" | "sleeping" | "panic" | "falling";

interface LemmingProps {
  state: LemmingState;
  progress: number;
}

const G = "#22c55e";  // green hair
const GD = "#16a34a"; // dark green
const S = "#ffcc99";  // skin
const SD = "#e8a060"; // skin shadow
const B = "#3b82f6";  // blue robe
const BD = "#2563eb"; // dark blue
const BL = "#60a5fa"; // light blue highlight
const W = "#ffffff";
const K = "#000000";

// Frame 1 - walking, right foot forward
const walk1 = `
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
  3px 12px ${SD},4px 12px ${SD},9px 12px ${SD},10px 12px ${SD}
`;

// Frame 2 - walking, left foot forward
const walk2 = `
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
  3px 11px ${SD},4px 11px ${SD},7px 11px ${SD},8px 11px ${SD},
  2px 12px ${SD},3px 12px ${SD},8px 12px ${SD},9px 12px ${SD}
`;

const sleepPixels = `
  0 4px ${G},0 6px ${G},0 8px ${G},
  1px 3px ${G},1px 4px ${GD},1px 5px ${G},1px 6px ${GD},1px 7px ${G},1px 8px ${GD},1px 9px ${G},
  2px 3px ${G},2px 4px ${G},2px 5px ${G},2px 6px ${G},2px 7px ${G},2px 8px ${G},2px 9px ${G},
  3px 3px ${S},3px 4px ${S},3px 5px ${S},3px 6px ${S},3px 7px ${S},3px 8px ${S},3px 9px ${S},
  4px 3px ${S},4px 4px ${S},4px 5px ${K},4px 6px ${S},4px 7px ${K},4px 8px ${S},4px 9px ${S},
  5px 2px ${B},5px 3px ${BL},5px 4px ${B},5px 5px ${B},5px 6px ${B},5px 7px ${B},5px 8px ${B},5px 9px ${B},5px 10px ${B},
  6px 2px ${BD},6px 3px ${B},6px 4px ${BD},6px 5px ${B},6px 6px ${B},6px 7px ${BD},6px 8px ${B},6px 9px ${BD},6px 10px ${B},
  7px 3px ${B},7px 4px ${B},7px 5px ${BD},7px 6px ${B},7px 7px ${B},7px 8px ${B},7px 9px ${B},
  8px 4px ${BD},8px 5px ${B},8px 6px ${BD},8px 7px ${B},8px 8px ${BD},
  9px 4px ${SD},9px 5px ${SD},9px 8px ${SD},9px 7px ${SD}
`;

const panicPixels = `
  4px 0 ${G},6px 0 ${G},8px 0 ${G},
  3px 1px ${G},4px 1px ${GD},5px 1px ${G},6px 1px ${GD},7px 1px ${G},8px 1px ${GD},9px 1px ${G},
  3px 2px ${G},4px 2px ${G},5px 2px ${G},6px 2px ${G},7px 2px ${G},8px 2px ${G},9px 2px ${G},
  3px 3px ${S},4px 3px ${S},5px 3px ${S},6px 3px ${S},7px 3px ${S},8px 3px ${S},9px 3px ${S},
  3px 4px ${W},4px 4px ${K},5px 4px ${W},6px 4px ${S},7px 4px ${W},8px 4px ${K},9px 4px ${W},
  3px 5px ${S},4px 5px ${S},5px 5px ${K},6px 5px ${K},7px 5px ${K},8px 5px ${S},9px 5px ${S},
  3px 6px ${B},4px 6px ${B},5px 6px ${BL},6px 6px ${B},7px 6px ${B},8px 6px ${B},9px 6px ${B},
  2px 7px ${B},3px 7px ${B},4px 7px ${B},5px 7px ${BD},6px 7px ${B},7px 7px ${BD},8px 7px ${B},9px 7px ${B},10px 7px ${B},
  2px 8px ${BD},3px 8px ${B},4px 8px ${B},5px 8px ${B},6px 8px ${BD},7px 8px ${B},8px 8px ${B},9px 8px ${B},10px 8px ${BD},
  3px 9px ${BD},4px 9px ${B},5px 9px ${BD},6px 9px ${B},7px 9px ${BD},8px 9px ${B},9px 9px ${BD},
  4px 10px ${B},5px 10px ${B},6px 10px ${BD},7px 10px ${B},8px 10px ${B}
`;

const panicLegsA = `4px 11px ${SD},5px 11px ${SD},8px 11px ${SD},9px 11px ${SD},3px 12px ${SD},10px 12px ${SD}`;
const panicLegsB = `3px 11px ${SD},4px 11px ${SD},9px 11px ${SD},10px 11px ${SD},2px 12px ${SD},11px 12px ${SD}`;

const fallingPixels = `
  4px 0 ${G},6px 0 ${G},8px 0 ${G},
  3px 1px ${G},4px 1px ${G},5px 1px ${G},6px 1px ${G},7px 1px ${G},8px 1px ${G},9px 1px ${G},
  3px 2px ${G},4px 2px ${G},5px 2px ${G},6px 2px ${G},7px 2px ${G},8px 2px ${G},9px 2px ${G},
  3px 3px ${S},4px 3px ${S},5px 3px ${S},6px 3px ${S},7px 3px ${S},8px 3px ${S},9px 3px ${S},
  3px 4px ${W},4px 4px ${K},5px 4px ${W},6px 4px ${S},7px 4px ${W},8px 4px ${K},9px 4px ${W},
  4px 5px ${S},5px 5px ${S},6px 5px ${K},7px 5px ${S},8px 5px ${S},
  0 7px ${SD},1px 7px ${SD},
  11px 7px ${SD},12px 7px ${SD},
  3px 6px ${B},4px 6px ${B},5px 6px ${B},6px 6px ${B},7px 6px ${B},8px 6px ${B},9px 6px ${B},
  2px 7px ${B},3px 7px ${B},4px 7px ${BD},5px 7px ${B},6px 7px ${B},7px 7px ${B},8px 7px ${BD},9px 7px ${B},10px 7px ${B},
  3px 8px ${B},4px 8px ${B},5px 8px ${BD},6px 8px ${B},7px 8px ${BD},8px 8px ${B},9px 8px ${B},
  4px 9px ${B},5px 9px ${B},6px 9px ${B},7px 9px ${B},8px 9px ${B},
  2px 10px ${SD},3px 10px ${SD},9px 10px ${SD},10px 10px ${SD},
  1px 11px ${SD},10px 11px ${SD}
`;

export default function Lemming({ state, progress }: LemmingProps) {
  const leftPercent = state === "sleeping" ? 5 : Math.min(progress * 82, 82);
  const isPanic = progress > 0.85 && state === "walking";
  const actual = isPanic ? "panic" : state;
  const sc = 4;

  return (
    <div
      className="absolute transition-all duration-1000 ease-linear"
      style={{
        left: `${leftPercent}%`,
        bottom: actual === "sleeping" ? "24%" : "25%",
      }}
    >
      {actual === "walking" && (
        <div style={{ width: 13 * sc, height: 13 * sc, position: "relative" }}>
          {/* Two-frame animation via CSS */}
          <div
            className="animate-walk-frame1"
            style={{
              width: 1, height: 1,
              transform: `scale(${sc})`, transformOrigin: "top left",
              boxShadow: walk1,
            }}
          />
          <div
            className="animate-walk-frame2"
            style={{
              position: "absolute", top: 0, left: 0,
              width: 1, height: 1,
              transform: `scale(${sc})`, transformOrigin: "top left",
              boxShadow: walk2,
            }}
          />
        </div>
      )}

      {actual === "sleeping" && (
        <div style={{ width: 10 * sc, height: 11 * sc, position: "relative" }}>
          <div
            style={{
              width: 1, height: 1,
              transform: `scale(${sc})`, transformOrigin: "top left",
              boxShadow: sleepPixels,
            }}
          />
          <span className="absolute pixel-font text-white animate-zzz" style={{ top: -12, right: -4, fontSize: 10, opacity: 0.8 }}>z</span>
          <span className="absolute pixel-font text-white animate-zzz-delay" style={{ top: -22, right: -12, fontSize: 13, opacity: 0.6 }}>z</span>
          <span className="absolute pixel-font text-white animate-zzz-delay2" style={{ top: -34, right: -18, fontSize: 16, opacity: 0.4 }}>Z</span>
        </div>
      )}

      {actual === "panic" && (
        <div className="animate-shake" style={{ width: 13 * sc, height: 13 * sc, position: "relative" }}>
          <div
            style={{
              width: 1, height: 1,
              transform: `scale(${sc})`, transformOrigin: "top left",
              boxShadow: panicPixels,
            }}
          />
          {/* Fast alternating legs */}
          <div className="animate-panic-legs-a" style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1, transform: `scale(${sc})`, transformOrigin: "top left", boxShadow: panicLegsA }} />
          <div className="animate-panic-legs-b" style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1, transform: `scale(${sc})`, transformOrigin: "top left", boxShadow: panicLegsB }} />
          <span className="absolute pixel-font text-red-500 animate-urgent-pulse" style={{ top: -20, left: "50%", transform: "translateX(-50%)", fontSize: 12, textShadow: "0 0 8px rgba(239,68,68,0.6)" }}>!!</span>
        </div>
      )}

      {actual === "falling" && (
        <div className="animate-fall-tumble" style={{ width: 13 * sc, height: 12 * sc }}>
          <div
            style={{
              width: 1, height: 1,
              transform: `scale(${sc})`, transformOrigin: "top left",
              boxShadow: fallingPixels,
            }}
          />
        </div>
      )}
    </div>
  );
}
