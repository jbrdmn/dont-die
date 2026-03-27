"use client";

const G = "#22c55e";
const GD = "#16a34a";
const S = "#ffcc99";
const SD = "#e8a060";
const B = "#3b82f6";
const BD = "#2563eb";
const BL = "#60a5fa";
const K = "#000000";

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

export default function LandingLemming() {
  const sc = 3;
  return (
    <div className="absolute animate-landing-walk" style={{ top: "50%", transform: "translateY(-50%)" }}>
      <div style={{ width: 13 * sc, height: 13 * sc, position: "relative" }}>
        <div className="animate-walk-frame1" style={{ width: 1, height: 1, transform: `scale(${sc})`, transformOrigin: "top left", boxShadow: walk1 }} />
        <div className="animate-walk-frame2" style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1, transform: `scale(${sc})`, transformOrigin: "top left", boxShadow: walk2 }} />
      </div>
    </div>
  );
}
