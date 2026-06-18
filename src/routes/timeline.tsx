import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { entries, chapters } from "@/components/devdiary/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Life Timeline — DEV DIARY" },
      { name: "description", content: "Revisit days, weeks, months and years as a vertical river of moments grouped by chapters." },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
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
      <main className="mx-auto max-w-3xl px-5 sm:px-8 pt-10 space-y-12">
        <header className="space-y-3">
          <p className="text-eyebrow text-foreground/55">Life Timeline</p>
          <h1 className="text-display text-4xl sm:text-5xl text-white leading-tight text-balance">
            A river of moments, gathered into chapters.
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Scroll through your becoming. Each chapter holds the weather of a season of your life.
          </p>
          <div className="flex flex-wrap gap-2 pt-3">
            {chapters.map((c, i) => (
              <span
                key={c.id}
                className={
                  i === 0
                    ? "text-xs px-3 py-1.5 rounded-full bg-white text-background"
                    : "text-xs px-3 py-1.5 rounded-full border border-white/10 text-muted-foreground"
                }
              >
                {c.name}
              </span>
            ))}
          </div>
        </header>

        <div className="relative pl-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          <ul className="space-y-6">
            {entries.map((e) => (
              <li key={e.id} className="relative">
                <span
                  className="absolute -left-[22px] top-3 size-3.5 rounded-full ring-2 ring-background"
                  style={{
                    background: `var(--${e.hue}-glow)`,
                    boxShadow: `0 0 12px var(--${e.hue}-glow)`,
                  }}
                />
                <article className="glass-card rounded-3xl p-6 space-y-3 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-eyebrow text-foreground/45">{e.dateLabel} · {e.mood}</span>
                    <span className="text-eyebrow text-foreground/35">Energy {e.energy}/5</span>
                  </div>
                  <h2 className="text-display text-2xl text-white leading-snug">{e.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{e.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {e.tags.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 text-foreground/70">
                        #{t}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <MobileDock />
    </div>
  );
}
