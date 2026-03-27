"use client";

function PixelCloud({
  top,
  left,
  s = 1,
  cls = "",
  opacity = 1,
}: {
  top: string;
  left: string;
  s?: number;
  cls?: string;
  opacity?: number;
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
        opacity,
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

// Lerp between two hex colors
function lerpColor(a: string, b: string, t: number): string {
  const parse = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bl.toString(16).padStart(2, "0")}`;
}

// Sky colors based on time of day (progress 0-1, midnight to midnight)
function getSkyColors(progress: number) {
  // Night: 0.0-0.2, Dawn: 0.2-0.35, Day: 0.35-0.65, Sunset: 0.65-0.8, Night: 0.8-1.0
  const night = { top: "#0a0e1a", mid: "#141830", bot: "#1a1f3a" };
  const dawn = { top: "#1a3a5c", mid: "#4a6a8f", bot: "#e8a060" };
  const day = { top: "#1a3a5c", mid: "#5ba3d9", bot: "#b8e4f0" };
  const sunset = { top: "#1a2040", mid: "#8b4513", bot: "#e85d3a" };

  let skyTop: string, skyMid: string, skyBot: string;

  if (progress < 0.2) {
    // Deep night
    skyTop = night.top;
    skyMid = night.mid;
    skyBot = night.bot;
  } else if (progress < 0.35) {
    // Dawn transition
    const t = (progress - 0.2) / 0.15;
    skyTop = lerpColor(night.top, dawn.top, t);
    skyMid = lerpColor(night.mid, dawn.mid, t);
    skyBot = lerpColor(night.bot, dawn.bot, t);
  } else if (progress < 0.45) {
    // Dawn to day
    const t = (progress - 0.35) / 0.1;
    skyTop = lerpColor(dawn.top, day.top, t);
    skyMid = lerpColor(dawn.mid, day.mid, t);
    skyBot = lerpColor(dawn.bot, day.bot, t);
  } else if (progress < 0.65) {
    // Full day
    skyTop = day.top;
    skyMid = day.mid;
    skyBot = day.bot;
  } else if (progress < 0.8) {
    // Sunset
    const t = (progress - 0.65) / 0.15;
    skyTop = lerpColor(day.top, sunset.top, t);
    skyMid = lerpColor(day.mid, sunset.mid, t);
    skyBot = lerpColor(day.bot, sunset.bot, t);
  } else if (progress < 0.9) {
    // Sunset to night
    const t = (progress - 0.8) / 0.1;
    skyTop = lerpColor(sunset.top, night.top, t);
    skyMid = lerpColor(sunset.mid, night.mid, t);
    skyBot = lerpColor(sunset.bot, night.bot, t);
  } else {
    // Deep night approaching midnight
    skyTop = night.top;
    skyMid = night.mid;
    skyBot = night.bot;
  }

  return { skyTop, skyMid, skyBot };
}

interface CliffBackgroundProps {
  progress?: number;
}

export default function CliffBackground({ progress = 0.5 }: CliffBackgroundProps) {
  const { skyTop, skyMid, skyBot } = getSkyColors(progress);

  // Stars visible at night (progress < 0.25 or > 0.75)
  const starsOpacity = progress < 0.25
    ? 1 - progress / 0.25
    : progress > 0.75
    ? (progress - 0.75) / 0.25
    : 0;

  // Sun visible during day, moon at night
  const sunOpacity = progress > 0.25 && progress < 0.75
    ? Math.min(1, Math.min((progress - 0.25) / 0.1, (0.75 - progress) / 0.1))
    : 0;

  // Cloud opacity dims at night
  const cloudOpacity = progress < 0.2 || progress > 0.85
    ? 0.3
    : progress < 0.3
    ? 0.3 + ((progress - 0.2) / 0.1) * 0.7
    : progress > 0.75
    ? 0.3 + ((0.85 - progress) / 0.1) * 0.7
    : 1;

  // Ground gets darker at night
  const isNight = progress < 0.25 || progress > 0.8;
  const groundDarken = isNight ? 0.4 : 1;

  return (
    <div className="absolute inset-0 overflow-hidden select-none">
      {/* Dynamic sky */}
      <div
        className="absolute inset-0 transition-colors duration-[3000ms]"
        style={{
          background: `linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 50%, ${skyBot} 100%)`,
        }}
      />

      {/* Stars — visible at night */}
      {[
        [8, 5], [22, 12], [45, 3], [67, 8], [82, 14],
        [35, 18], [55, 6], [15, 20], [75, 2], [90, 10],
        [12, 8], [40, 15], [60, 4], [28, 2], [72, 18],
        [50, 10], [85, 6], [18, 14], [95, 12], [5, 16],
      ].map(([l, t], i) => (
        <div
          key={i}
          className={`absolute rounded-full ${i % 5 === 0 ? "animate-twinkle" : i % 5 === 1 ? "animate-twinkle-delay" : ""}`}
          style={{
            left: `${l}%`,
            top: `${t}%`,
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            background: i % 7 === 0 ? "#ffd700" : "#fff",
            opacity: starsOpacity * (0.3 + (i % 4) * 0.2),
          }}
        />
      ))}

      {/* Moon — visible at night */}
      {starsOpacity > 0 && (
        <div
          className="absolute"
          style={{
            top: "8%",
            right: "15%",
            width: 1,
            height: 1,
            opacity: starsOpacity * 0.9,
            transform: "scale(3)",
            transformOrigin: "top left",
            boxShadow: `
              2px 0 #e8e8f0,3px 0 #e8e8f0,4px 0 #e8e8f0,
              1px 1px #e8e8f0,2px 1px #fff,3px 1px #fff,4px 1px #e8e8f0,5px 1px #e8e8f0,
              1px 2px #e8e8f0,2px 2px #fff,3px 2px #fff,4px 2px #fff,5px 2px #e8e8f0,
              1px 3px #e8e8f0,2px 3px #fff,3px 3px #e8e8f0,4px 3px #fff,5px 3px #e8e8f0,
              2px 4px #e8e8f0,3px 4px #e8e8f0,4px 4px #e8e8f0
            `,
            filter: "drop-shadow(0 0 12px rgba(200,200,255,0.4))",
          }}
        />
      )}

      {/* Sun glow — visible during day */}
      {sunOpacity > 0 && (
        <>
          <div
            className="absolute"
            style={{
              top: "8%",
              right: "12%",
              width: 40,
              height: 40,
              borderRadius: "50%",
              opacity: sunOpacity,
              background:
                "radial-gradient(circle, rgba(255,247,160,0.9) 0%, rgba(255,238,88,0.4) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute"
            style={{
              top: "8%",
              right: "12%",
              marginTop: 8,
              marginRight: 8,
              width: 1,
              height: 1,
              opacity: sunOpacity,
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
        </>
      )}

      {/* Clouds */}
      <PixelCloud top="15%" left="5%" s={1.4} cls="animate-cloud-1" opacity={cloudOpacity} />
      <PixelCloud top="25%" left="30%" s={1} cls="animate-cloud-2" opacity={cloudOpacity} />
      <PixelCloud top="12%" left="60%" s={0.9} cls="animate-cloud-3" opacity={cloudOpacity} />
      <PixelCloud top="30%" left="78%" s={0.7} cls="animate-cloud-1" opacity={cloudOpacity * 0.8} />

      {/* Distant mountains */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: "84%",
          height: "45%",
          opacity: groundDarken,
          background:
            "linear-gradient(180deg, transparent 0%, transparent 20%, #2d5a3d 20%, #1a4a2e 50%, #16a34a 80%, #22c55e 90%, #4ade80 95%, #22c55e 100%)",
        }}
      />

      {/* Rolling hills */}
      <div
        className="absolute left-0"
        style={{ bottom: "25%", width: "84%", height: "10%", borderRadius: "50% 50% 0 0", background: "#1a6b30", opacity: groundDarken }}
      />
      <div
        className="absolute"
        style={{ bottom: "23%", left: "20%", width: "50%", height: "8%", borderRadius: "50% 50% 0 0", background: "#1f7a38", opacity: groundDarken }}
      />

      {/* Main ground */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: "84%",
          height: "25%",
          opacity: groundDarken,
          background:
            "linear-gradient(180deg, #4ade80 0%, #22c55e 15%, #16a34a 50%, #15803d 80%, #0f5c2e 100%)",
        }}
      />

      {/* Night overlay on ground */}
      {isNight && (
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: "84%",
            height: "25%",
            background: "rgba(0,5,15,0.4)",
          }}
        />
      )}

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
            opacity: groundDarken,
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
            opacity: groundDarken,
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

      {/* === CLIFF === */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "16%",
          height: "28%",
          background:
            "linear-gradient(180deg, #8b4513 0%, #a0522d 8%, #8b4513 20%, #6b3a1f 40%, #4a2810 65%, #2d1a0a 85%, #0a0a0a 100%)",
        }}
      />

      {/* Grass on cliff top */}
      <div
        className="absolute right-0"
        style={{
          bottom: "25%",
          width: "16%",
          height: "3%",
          opacity: groundDarken,
          background: "linear-gradient(180deg, #4ade80 0%, #22c55e 60%, #8b4513 100%)",
        }}
      />

      {/* Rock textures */}
      {[
        [3, 4], [7, 8], [12, 3], [16, 10], [20, 6],
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

      {/* Abyss */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "16%",
          height: "25%",
          background:
            "linear-gradient(180deg, #3d2010 0%, #1a0a00 20%, #0a0503 50%, #000 100%)",
        }}
      />

      {/* Danger cracks */}
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
    </div>
  );
}
