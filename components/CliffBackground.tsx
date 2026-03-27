"use client";

function PixelCloud({
  top,
  left,
  s = 1,
  cls = "",
}: {
  top: string;
  left: string;
  s?: number;
  cls?: string;
}) {
  const w = "#fff";
  const c = "#e0e8f0";
  return (
    <div
      className={cls}
      style={{
        position: "absolute",
        top,
        left,
        width: 1,
        height: 1,
        transform: `scale(${3 * s})`,
        transformOrigin: "top left",
        boxShadow: `
          2px 0 ${w},3px 0 ${w},4px 0 ${w},5px 0 ${w},
          1px 1px ${w},2px 1px ${c},3px 1px ${w},4px 1px ${c},5px 1px ${w},6px 1px ${w},
          0 2px ${w},1px 2px ${w},2px 2px ${w},3px 2px ${w},4px 2px ${w},5px 2px ${w},6px 2px ${w},7px 2px ${w},
          0 3px ${c},1px 3px ${w},2px 3px ${w},3px 3px ${c},4px 3px ${w},5px 3px ${w},6px 3px ${c},7px 3px ${w},
          1px 4px ${c},2px 4px ${c},3px 4px ${c},4px 4px ${c},5px 4px ${c},6px 4px ${c}
        `,
      }}
    />
  );
}

export default function CliffBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1a3a5c 0%, #2d6a9f 25%, #5ba3d9 50%, #87ceeb 75%, #b8e4f0 100%)",
        }}
      />

      {/* Stars */}
      {[
        [8, 5], [22, 12], [45, 3], [67, 8], [82, 14],
        [35, 18], [55, 6], [15, 20], [75, 2], [90, 10],
      ].map(([l, t], i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${l}%`,
            top: `${t}%`,
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            background: "#fff",
            opacity: 0.12 + (i % 4) * 0.08,
          }}
        />
      ))}

      {/* Sun glow */}
      <div
        className="absolute"
        style={{
          top: "8%",
          right: "12%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,247,160,0.9) 0%, rgba(255,238,88,0.4) 50%, transparent 70%)",
        }}
      />
      {/* Sun pixel body */}
      <div
        className="absolute"
        style={{
          top: "8%",
          right: "12%",
          marginTop: 8,
          marginRight: 8,
          width: 1,
          height: 1,
          transform: "scale(3)",
          transformOrigin: "top left",
          boxShadow: `
            1px 0 #fff9c4,2px 0 #fff9c4,3px 0 #fff9c4,
            0 1px #ffee58,1px 1px #fffde7,2px 1px #fff,3px 1px #fffde7,4px 1px #ffee58,
            0 2px #ffee58,1px 2px #fff,2px 2px #fff,3px 2px #fff,4px 2px #ffee58,
            0 3px #ffee58,1px 3px #fffde7,2px 3px #fff,3px 3px #fffde7,4px 3px #ffee58,
            1px 4px #fff9c4,2px 4px #fff9c4,3px 4px #fff9c4
          `,
        }}
      />

      {/* Clouds */}
      <PixelCloud top="15%" left="5%" s={1.4} cls="animate-cloud-1" />
      <PixelCloud top="25%" left="30%" s={1} cls="animate-cloud-2" />
      <PixelCloud top="12%" left="60%" s={0.9} cls="animate-cloud-3" />
      <PixelCloud top="30%" left="78%" s={0.7} cls="animate-cloud-1" />

      {/* Distant mountains */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: "45%",
          background:
            "linear-gradient(180deg, transparent 0%, transparent 20%, #2d5a3d 20%, #1a4a2e 50%, #16a34a 80%, #22c55e 90%, #4ade80 95%, #22c55e 100%)",
        }}
      />

      {/* Rolling hills */}
      <div
        className="absolute left-0"
        style={{ bottom: "25%", width: "84%", height: "10%", borderRadius: "50% 50% 0 0", background: "#1a6b30" }}
      />
      <div
        className="absolute"
        style={{ bottom: "23%", left: "20%", width: "50%", height: "8%", borderRadius: "50% 50% 0 0", background: "#1f7a38" }}
      />

      {/* Main ground */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: "84%",
          height: "25%",
          background:
            "linear-gradient(180deg, #4ade80 0%, #22c55e 15%, #16a34a 50%, #15803d 80%, #0f5c2e 100%)",
        }}
      />

      {/* Grass tufts */}
      {[3, 8, 14, 21, 27, 34, 40, 47, 53, 59, 66, 72, 78].map((pct, i) => (
        <div
          key={`grass-${i}`}
          className="absolute"
          style={{
            bottom: "25%",
            left: `${pct}%`,
            width: 1,
            height: 1,
            transform: `scale(${2 + (i % 2)})`,
            transformOrigin: "bottom left",
            boxShadow: `
              0 -1px #4ade80,1px -2px #22c55e,2px -1px #4ade80,
              ${i % 3 === 0 ? "3px -3px #4ade80,0 -3px #22c55e,4px -1px #16a34a" : "1px -3px #4ade80"}
            `,
          }}
        />
      ))}

      {/* Flowers */}
      {[
        ["8%", "#ef4444"], ["18%", "#fbbf24"], ["32%", "#ec4899"],
        ["45%", "#8b5cf6"], ["58%", "#ef4444"], ["68%", "#fbbf24"], ["78%", "#ec4899"],
      ].map(([left, color], i) => (
        <div
          key={`flower-${i}`}
          className="absolute"
          style={{
            bottom: "25%",
            left: left as string,
            width: 1,
            height: 1,
            transform: "scale(2)",
            transformOrigin: "bottom left",
            boxShadow: `
              1px 0 ${color},
              0 1px ${color},1px 1px #ffff00,2px 1px ${color},
              1px 2px ${color},
              1px 3px #22c55e,1px 4px #16a34a,1px 5px #15803d
            `,
          }}
        />
      ))}

      {/* === CLIFF EDGE === */}
      {/* Cliff face */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "16%",
          height: "100%",
          background:
            "linear-gradient(180deg, transparent 0%, transparent 72%, #6b3a1f 72%, #8b4513 74%, #a0522d 76%, #8b4513 80%, #6b3a1f 85%, #4a2810 90%, #2d1a0a 95%, #0a0a0a 100%)",
        }}
      />

      {/* Grass on cliff top */}
      <div
        className="absolute right-0"
        style={{
          bottom: "25%",
          width: "16%",
          height: "3%",
          background: "linear-gradient(180deg, #4ade80 0%, #22c55e 60%, #8b4513 100%)",
        }}
      />

      {/* Rock textures */}
      {[
        [30, 4], [35, 8], [42, 3], [48, 10], [55, 6],
        [62, 2], [68, 9], [75, 5], [82, 7], [88, 3],
      ].map(([yOff, xOff], i) => (
        <div
          key={`rock-${i}`}
          className="absolute"
          style={{
            bottom: `${yOff}%`,
            right: `${xOff}%`,
            width: i % 2 === 0 ? 4 : 3,
            height: 2,
            background: i % 3 === 0 ? "#5a3015" : i % 3 === 1 ? "#7a4a25" : "#4a2810",
            borderRadius: 1,
          }}
        />
      ))}

      {/* Abyss below cliff */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "16%",
          height: "25%",
          background:
            "linear-gradient(180deg, #3d2010 0%, #1a0a00 20%, #0a0503 50%, #000 100%)",
        }}
      />

      {/* Danger cracks on ground near edge */}
      <div
        className="absolute"
        style={{
          bottom: "25%",
          right: "16%",
          width: "6%",
          height: 4,
          background:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(239,68,68,0.3) 3px, rgba(239,68,68,0.3) 6px)",
        }}
      />

      {/* Warning sign */}
      <div
        className="absolute"
        style={{
          bottom: "25%",
          right: "18%",
          width: 1,
          height: 1,
          transform: "scale(2)",
          transformOrigin: "bottom left",
          boxShadow: `
            0 -8px #8b4513,0 -7px #8b4513,0 -6px #8b4513,0 -5px #8b4513,0 -4px #8b4513,0 -3px #8b4513,0 -2px #8b4513,0 -1px #8b4513,
            -3px -12px #dc2626,-2px -12px #dc2626,-1px -12px #dc2626,0 -12px #dc2626,1px -12px #dc2626,2px -12px #dc2626,3px -12px #dc2626,
            -3px -11px #dc2626,-2px -11px #fff,-1px -11px #fff,0 -11px #fff,1px -11px #fff,2px -11px #fff,3px -11px #dc2626,
            -3px -10px #dc2626,-2px -10px #dc2626,-1px -10px #dc2626,0 -10px #dc2626,1px -10px #dc2626,2px -10px #dc2626,3px -10px #dc2626,
            -3px -9px #b91c1c,-2px -9px #b91c1c,-1px -9px #b91c1c,0 -9px #b91c1c,1px -9px #b91c1c,2px -9px #b91c1c,3px -9px #b91c1c
          `,
        }}
      />

      {/* Edge shadow - darkening at cliff lip */}
      <div
        className="absolute"
        style={{
          bottom: "25%",
          right: "14.5%",
          width: "2%",
          height: "25%",
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.3))",
        }}
      />
    </div>
  );
}
