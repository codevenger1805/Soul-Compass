import { cn } from "@/lib/utils";

interface MoodOrbProps {
  size?: number;
  mood?: string;
  caption?: string;
  hue?: "indigo" | "emerald" | "amber" | "violet";
  className?: string;
}

const hueMap = {
  indigo: ["var(--indigo-glow)", "var(--violet-glow)"],
  emerald: ["var(--emerald-glow)", "var(--indigo-glow)"],
  amber: ["var(--amber-glow)", "var(--violet-glow)"],
  violet: ["var(--violet-glow)", "var(--indigo-glow)"],
};

export function MoodOrb({
  size = 240,
  mood = "Calm",
  caption = "Current state",
  hue = "indigo",
  className,
}: MoodOrbProps) {
  const [c1, c2] = hueMap[hue];
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      {/* halo */}
      <div
        className="absolute inset-0 rounded-full animate-orb-breathe"
        style={{
          background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${c1} 55%, transparent) 0%, color-mix(in oklab, ${c2} 25%, transparent) 55%, transparent 75%)`,
          filter: "blur(40px)",
        }}
      />
      {/* outer ring glow */}
      <div
        className="absolute rounded-full animate-orb-breathe"
        style={{
          inset: "8%",
          background: `conic-gradient(from 120deg, ${c1}, ${c2}, ${c1})`,
          filter: "blur(18px)",
          opacity: 0.7,
        }}
      />
      {/* the orb */}
      <div
        className="relative rounded-full overflow-hidden grid place-items-center animate-orb-breathe"
        style={{
          width: "72%",
          height: "72%",
          background: `radial-gradient(circle at 30% 28%, color-mix(in oklab, white 75%, transparent), color-mix(in oklab, ${c1} 80%, transparent) 38%, color-mix(in oklab, ${c2} 90%, transparent) 80%, oklch(0.18 0.04 270) 100%)`,
          boxShadow: `inset -20px -30px 60px rgba(0,0,0,0.45), inset 18px 24px 50px color-mix(in oklab, white 18%, transparent), 0 30px 80px -10px color-mix(in oklab, ${c1} 35%, transparent)`,
        }}
      >
        {/* specular highlight */}
        <span
          className="absolute"
          style={{
            top: "12%",
            left: "20%",
            width: "32%",
            height: "22%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(6px)",
          }}
        />
        {/* inner caption */}
        <div className="relative text-center px-4">
          <div className="text-eyebrow text-white/70">{caption}</div>
          <div className="text-display text-white text-4xl sm:text-5xl mt-1 drop-shadow">
            {mood}
          </div>
        </div>
      </div>
    </div>
  );
}
