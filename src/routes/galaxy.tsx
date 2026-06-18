import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { entries } from "@/components/devdiary/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/galaxy")({
  head: () => ({
    meta: [
      { title: "Memory Galaxy — DEV DIARY" },
      { name: "description", content: "Every memory becomes a floating node. Navigate your life as a constellation." },
    ],
  }),
  component: GalaxyPage,
});

function GalaxyPage() {
  const nodes = useMemo(() => {
    // expand entries into a denser starfield, anchoring to real moments
    const arr: { id: string; cx: number; cy: number; r: number; hue: string; label?: string; energy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      const seed = i * 9301 + 49297;
      const cx = (seed % 100) + ((i * 13) % 7) - 3;
      const cy = ((seed * 7) % 100) + ((i * 19) % 5);
      const e = entries[i % entries.length];
      arr.push({
        id: `n${i}`,
        cx: Math.max(4, Math.min(96, cx)),
        cy: Math.max(6, Math.min(94, cy)),
        r: 1 + ((i * 3) % 4),
        hue: e.hue,
        label: i % 11 === 0 ? e.title : undefined,
        energy: e.energy,
      });
    }
    return arr;
  }, []);

  return (
    <div className="relative min-h-screen pb-36">
      <AmbientBackground />
      <TopBar
        right={
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="size-4" /> Home
          </Link>
        }
      />
      <main className="mx-auto max-w-5xl px-5 sm:px-8 pt-10 space-y-8">
        <header className="space-y-3 max-w-2xl">
          <p className="text-eyebrow text-foreground/55">Memory Galaxy</p>
          <h1 className="text-display text-4xl sm:text-5xl text-white leading-tight text-balance">
            Your life, as a constellation.
          </h1>
          <p className="text-muted-foreground">
            Each star is a memory. Bright ones carried more energy. Pull, drift, return.
          </p>
        </header>

        <div className="glass-card-strong rounded-[2rem] relative aspect-[4/3] overflow-hidden">
          {/* nebulas */}
          <div className="absolute inset-0" style={{
            background:
              "radial-gradient(circle at 25% 30%, color-mix(in oklab, var(--indigo-glow) 35%, transparent) 0%, transparent 50%), radial-gradient(circle at 75% 70%, color-mix(in oklab, var(--emerald-glow) 25%, transparent) 0%, transparent 55%), radial-gradient(circle at 60% 20%, color-mix(in oklab, var(--amber-glow) 18%, transparent) 0%, transparent 45%)",
            filter: "blur(20px)",
          }} />

          {/* faint connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
            {nodes.slice(0, 30).map((n, i) => {
              const m = nodes[(i + 4) % nodes.length];
              return (
                <line
                  key={n.id}
                  x1={n.cx} y1={n.cy} x2={m.cx} y2={m.cy}
                  stroke="white" strokeWidth="0.08" vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* nodes */}
          {nodes.map((n, i) => (
            <span
              key={n.id}
              className="absolute rounded-full animate-twinkle"
              style={{
                top: `${n.cy}%`,
                left: `${n.cx}%`,
                width: n.r * 2,
                height: n.r * 2,
                transform: "translate(-50%, -50%)",
                background: `var(--${n.hue}-glow)`,
                boxShadow: `0 0 ${n.r * 6}px var(--${n.hue}-glow)`,
                animationDelay: `${(i % 7) * 0.4}s`,
              }}
              title={n.label}
            />
          ))}

          {/* labelled stars */}
          {nodes.filter((n) => n.label).slice(0, 5).map((n) => (
            <div
              key={`l-${n.id}`}
              className="absolute pointer-events-none"
              style={{ top: `${n.cy}%`, left: `${n.cx}%`, transform: "translate(12px, -10px)" }}
            >
              <span className="block w-px h-4 bg-white/30 ml-1" />
              <span className="text-[10px] text-white/70 whitespace-nowrap pl-2">
                {n.label}
              </span>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>142 memories · 4 chapters</span>
            <span className="flex items-center gap-3">
              <Legend hue="indigo" label="focus" />
              <Legend hue="emerald" label="growth" />
              <Legend hue="amber" label="tender" />
              <Legend hue="violet" label="heavy" />
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-md mx-auto">
          A full 3D Memory Galaxy with WebGL navigation is in the next sky.
        </p>
      </main>
      <MobileDock />
    </div>
  );
}

function Legend({ hue, label }: { hue: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="size-2 rounded-full"
        style={{ background: `var(--${hue}-glow)`, boxShadow: `0 0 8px var(--${hue}-glow)` }}
      />
      {label}
    </span>
  );
}
