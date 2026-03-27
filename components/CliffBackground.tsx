"use client";

/*
 * Pixel-art cliff scene with parallax sky, clouds, grass, cliff edge, and abyss.
 * Mobile-first: taller (h-64 min), visually rich.
 */

// Pixel cloud using box-shadow technique
function PixelCloud({ top, left, scale = 1, className = "" }: { top: number; left: string; scale?: number; className?: string }) {
  const c = "#e8e8e8";
  const w = "#ffffff";
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top,
        left,
        width: 1,
        height: 1,
        transform: `scale(${2 * scale})`,
        transformOrigin: "top left",
        boxShadow: `
          2px 0px ${w}, 3px 0px ${w}, 4px 0px ${w}, 5px 0px ${w},
          1px 1px ${w}, 2px 1px ${c}, 3px 1px ${w}, 4px 1px ${c}, 5px 1px ${w}, 6px 1px ${w},
          0px 2px ${w}, 1px 2px ${w}, 2px 2px ${w}, 3px 2px ${w}, 4px 2px ${w}, 5px 2px ${w}, 6px 2px ${w}, 7px 2px ${w},
          0px 3px ${c}, 1px 3px ${w}, 2px 3px ${w}, 3px 3px ${c}, 4px 3px ${w}, 5px 3px ${w}, 6px 3px ${c}, 7px 3px ${w},
          1px 4px ${c}, 2px 4px ${c}, 3px 4px ${c}, 4px 4px ${c}, 5px 4px ${c}, 6px 4px ${c}
        `,
        opacity: 0.9,
      }}
    />
  );
}

// Small pixel flower
function PixelFlower({ bottom, left, color }: { bottom: number; left: string; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left,
        width: 1,
        height: 1,
        transform: "scale(2)",
        transformOrigin: "bottom left",
        boxShadow: `
          1px 0px ${color},
          0px 1px ${color}, 1px 1px #ffff00, 2px 1px ${color},
          1px 2px ${color},
          1px 3px #22c55e, 1px 4px #16a34a
        `,
      }}
    />
  );
}

export default function CliffBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #4a90d9 0%, #87ceeb 40%, #b8e4f0 70%, #d4f0f8 100%)",
        }}
      />

      {/* Sun */}
      <div
        className="absolute"
        style={{
          top: 12,
          right: 24,
          width: 1,
          height: 1,
          transform: "scale(3)",
          transformOrigin: "top left",
          boxShadow: `
            2px 0px #fff7a0, 3px 0px #fff7a0, 4px 0px #fff7a0,
            1px 1px #ffee58, 2px 1px #fff9c4, 3px 1px #fff9c4, 4px 1px #fff9c4, 5px 1px #ffee58,
            0px 2px #ffee58, 1px 2px #fff9c4, 2px 2px #ffffff, 3px 2px #ffffff, 4px 2px #ffffff, 5px 2px #fff9c4, 6px 2px #ffee58,
            0px 3px #ffee58, 1px 3px #fff9c4, 2px 3px #ffffff, 3px 3px #ffffff, 4px 3px #ffffff, 5px 3px #fff9c4, 6px 3px #ffee58,
            0px 4px #ffee58, 1px 4px #fff9c4, 2px 4px #ffffff, 3px 4px #ffffff, 4px 4px #ffffff, 5px 4px #fff9c4, 6px 4px #ffee58,
            1px 5px #ffee58, 2px 5px #fff9c4, 3px 5px #fff9c4, 4px 5px #fff9c4, 5px 5px #ffee58,
            2px 6px #fff7a0, 3px 6px #fff7a0, 4px 6px #fff7a0
          `,
        }}
      />

      {/* Pixel clouds */}
      <PixelCloud top={20} left="8%" scale={1.2} className="animate-cloud-1" />
      <PixelCloud top={40} left="35%" scale={1} className="animate-cloud-2" />
      <PixelCloud top={15} left="62%" scale={0.8} className="animate-cloud-3" />

      {/* Ground - green grass (left 85%) */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: "85%",
          height: 48,
          background: "linear-gradient(180deg, #4ade80 0%, #22c55e 20%, #16a34a 60%, #15803d 100%)",
        }}
      />

      {/* Grass detail pixels along the top of ground */}
      <div
        className="absolute left-0"
        style={{ bottom: 48, width: "85%" }}
      >
        {[5, 12, 20, 28, 38, 48, 55, 65, 72, 80].map((pct, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: 0,
              left: `${pct}%`,
              width: 1,
              height: 1,
              transform: "scale(2)",
              transformOrigin: "bottom left",
              boxShadow: `
                0px -1px #4ade80, 1px -2px #4ade80, 2px -1px #22c55e,
                ${i % 2 === 0 ? "3px -3px #4ade80, 4px -1px #22c55e" : "0px -3px #22c55e"}
              `,
            }}
          />
        ))}
      </div>

      {/* Small pixel flowers */}
      <PixelFlower bottom={48} left="10%" color="#ef4444" />
      <PixelFlower bottom={48} left="25%" color="#f59e0b" />
      <PixelFlower bottom={48} left="42%" color="#ec4899" />
      <PixelFlower bottom={48} left="60%" color="#f59e0b" />
      <PixelFlower bottom={48} left="75%" color="#ef4444" />

      {/* Cliff edge - brown rock face */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "15%",
          height: "100%",
          background: "linear-gradient(180deg, transparent 0%, transparent 50%, #92400e 50%, #78350f 70%, #451a03 100%)",
        }}
      />

      {/* Cliff top - grass on cliff */}
      <div
        className="absolute right-0"
        style={{
          width: "15%",
          height: 48,
          bottom: "50%",
          background: "linear-gradient(180deg, #4ade80 0%, #22c55e 40%, #92400e 100%)",
        }}
      />

      {/* Rock face details */}
      {[55, 62, 70, 78, 85].map((pctBottom, i) => (
        <div
          key={i}
          className="absolute right-0"
          style={{
            bottom: `${100 - pctBottom}%`,
            width: 1,
            height: 1,
            transform: "scale(2)",
            transformOrigin: "top left",
            right: `${3 + (i % 3) * 4}%`,
            boxShadow: `
              0px 0px #78350f, 1px 0px #92400e, 2px 0px #78350f,
              0px 1px #451a03, 1px 1px #78350f, 2px 1px #451a03
            `,
          }}
        />
      ))}

      {/* Abyss - dark gradient at the bottom right */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "15%",
          height: "45%",
          background: "linear-gradient(180deg, #451a03 0%, #1a0a00 30%, #0a0a0a 60%, #000000 100%)",
        }}
      />

      {/* Danger zone near cliff edge */}
      <div
        className="absolute"
        style={{
          bottom: 48,
          right: "15%",
          width: "10%",
          height: 4,
          background: "linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3))",
        }}
      />
    </div>
  );
}
