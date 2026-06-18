import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { useEntries } from "@/components/devdiary/data";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/galaxy")({
  head: () => ({
    meta: [
      { title: "Memory Galaxy — DEV DIARY" },
      { name: "description", content: "Every memory becomes a floating node." },
    ],
  }),
  component: GalaxyPage,
});

function GalaxyPage() {
  const { entries } = useEntries();

  const nodes = useMemo(() => {
    return entries.map((e, i) => {
      const seed = (i + 1) * 9301 + 49297;
      const cx = Math.max(6, Math.min(94, (seed % 100)));
      const cy = Math.max(8, Math.min(92, ((seed * 7) % 100)));
      return {
        id: e.id,
        cx,
        cy,
        r: 2 + e.energy,
        hue: e.hue,
        label: e.title,
        energy: e.energy,
      };
    });
  }, [entries]);

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
          <div className="absolute inset-0" style={{
            background:
              "radial-gradient(circle at 25% 30%, color-mix(in oklab, var(--indigo-glow) 35%, transparent) 0%, transparent 50%), radial-gradient(circle at 75% 70%, color-mix(in oklab, var(--emerald-glow) 25%, transparent) 0%, transparent 55%), radial-gradient(circle at 60% 20%, color-mix(in oklab, var(--amber-glow) 18%, transparent) 0%, transparent 45%)",
            filter: "blur(20px)",
          }} />

          {nodes.length > 1 && (
            <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
              {nodes.slice(0, Math.min(nodes.length, 30)).map((n, i) => {
                const m = nodes[(i + 1) % nodes.length];
                return (
                  <line
                    key={n.id}
                    x1={n.cx} y1={n.cy} x2={m.cx} y2={m.cy}
                    stroke="white" strokeWidth="0.08" vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
          )}

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

          {nodes.length === 0 && (
            <div className="absolute inset-0 grid place-items-center text-center px-8">
              <div className="space-y-4 max-w-sm">
                <Sparkles className="size-6 text-white/70 mx-auto" />
                <p className="text-display text-xl text-white/90">An empty sky, waiting for stars.</p>
                <p className="text-sm text-muted-foreground">
                  Each entry you write becomes a star here. Capture one to light the first.
                </p>
                <Link
                  to="/capture"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-background px-5 py-2.5 text-sm font-medium"
                >
                  Begin capturing
                </Link>
              </div>
            </div>
          )}

          {nodes.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{nodes.length} {nodes.length === 1 ? "memory" : "memories"}</span>
              <span className="flex items-center gap-3">
                <Legend hue="indigo" label="focus" />
                <Legend hue="emerald" label="growth" />
                <Legend hue="amber" label="tender" />
                <Legend hue="violet" label="heavy" />
              </span>
            </div>
          )}
        </div>
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
