import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/heatmap")({
  head: () => ({
    meta: [
      { title: "Life Heatmap — DEV DIARY" },
      { name: "description", content: "Visualize your most emotional, most productive, and most reflective periods across months and years." },
    ],
  }),
  component: HeatmapPage,
});

function HeatmapPage() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const years = [2024, 2025, 2026];

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
      <main className="mx-auto max-w-4xl px-5 sm:px-8 pt-10 space-y-10">
        <header className="space-y-3 max-w-2xl">
          <p className="text-eyebrow text-foreground/55">Life Heatmap</p>
          <h1 className="text-display text-4xl sm:text-5xl text-white leading-tight text-balance">
            Where your life was loud, where it was quiet.
          </h1>
          <p className="text-muted-foreground">
            Three years of energy mapped at a glance. Hover any cell to read what you wrote.
          </p>
        </header>

        <div className="glass-card-strong rounded-3xl p-6 overflow-x-auto">
          <div className="min-w-[680px] space-y-4">
            {years.map((y) => (
              <div key={y} className="flex items-center gap-4">
                <span className="text-eyebrow text-foreground/55 w-12 tabular-nums">{y}</span>
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {months.map((m, i) => {
                    const seed = (y * 31 + i * 13) % 100;
                    const intensity = seed / 100;
                    const hue = seed % 3 === 0 ? "amber" : seed % 3 === 1 ? "indigo" : "emerald";
                    return (
                      <div key={m} className="flex flex-col gap-1">
                        {Array.from({ length: 4 }).map((_, w) => {
                          const cellSeed = (y * 7 + i * 11 + w * 3) % 100;
                          const ci = cellSeed / 100;
                          return (
                            <span
                              key={w}
                              className="h-3 rounded-[3px]"
                              style={{
                                background: `color-mix(in oklab, var(--${hue}-glow) ${Math.round(ci * intensity * 100)}%, transparent)`,
                                outline: ci > 0.85 ? `1px solid color-mix(in oklab, var(--${hue}-glow) 60%, transparent)` : undefined,
                              }}
                              title={`${m} ${y}`}
                            />
                          );
                        })}
                        <span className="text-[9px] text-foreground/40 text-center mt-1">{m}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Marker label="Loudest period" value="Oct 2025 — Berlin" hue="amber" />
          <Marker label="Most reflective" value="Spring 2024" hue="indigo" />
          <Marker label="Quietest" value="Aug 2024" hue="emerald" />
        </div>
      </main>
      <MobileDock />
    </div>
  );
}

function Marker({ label, value, hue }: { label: string; value: string; hue: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-2">
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full" style={{ background: `var(--${hue}-glow)`, boxShadow: `0 0 8px var(--${hue}-glow)` }} />
        <p className="text-eyebrow text-foreground/55">{label}</p>
      </div>
      <p className="text-display text-lg text-white">{value}</p>
    </div>
  );
}
