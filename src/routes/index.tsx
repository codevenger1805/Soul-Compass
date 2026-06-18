import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { MoodOrb } from "@/components/devdiary/MoodOrb";
import { useEntries, groupByChapter, formatDateLabel, type Entry } from "@/components/devdiary/data";
import { ArrowUpRight, Mic, Camera, Sparkles, TreeDeciduous, Mail, Activity } from "lucide-react";

function greetingFor(hour: number) {
  if (hour < 5) return "Late night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEV DIARY — Who are you becoming?" },
      { name: "description", content: "A premium reflection infrastructure. Capture, reflect, and discover the patterns that shape who you are becoming." },
      { property: "og:title", content: "DEV DIARY — Who are you becoming?" },
      { property: "og:description", content: "Not a journaling app. A personal growth operating system." },
    ],
  }),
  component: Home,
});

function Home() {
  const { entries } = useEntries();
  const today = entries.slice(0, 3);
  const chapters = useMemo(() => groupByChapter(entries), [entries]);
  const insights = useMemo(() => deriveInsights(entries), [entries]);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ name: string; age: number } | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("devdiary:profile");
      if (!raw) {
        navigate({ to: "/auth" });
        return;
      }
      setProfile(JSON.parse(raw));
    } catch {
      navigate({ to: "/auth" });
    }
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, [navigate]);

  if (!profile) return null;

  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeLabel = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  const greeting = greetingFor(now.getHours());

  return (
    <div className="relative min-h-screen pb-36">
      <AmbientBackground />
      <TopBar
        right={
          <button
            onClick={() => {
              try { localStorage.removeItem("devdiary:profile"); } catch {}
              navigate({ to: "/auth" });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-foreground/80 hover:text-white transition-colors"
          >
            Reset
          </button>
        }
      />

      <main className="mx-auto max-w-5xl px-5 sm:px-8 pt-8 sm:pt-14 space-y-20 sm:space-y-28">
        {/* Hero */}
        <section className="grid place-items-center text-center space-y-10 animate-rise-in">
          <div className="text-eyebrow text-foreground/60">{dateLabel} · {timeLabel}</div>
          <MoodOrb
            size={280}
            mood={entries[0]?.mood ?? "Begin"}
            caption={entries.length === 0 ? "Awaiting first light" : "Today's state"}
            hue={entries[0]?.hue ?? "indigo"}
          />
          <div className="space-y-5 max-w-xl">
            <h1 className="text-display text-4xl sm:text-6xl text-white text-balance leading-[1.05]">
              {greeting}, {profile.name}.<br />Who are you becoming today?
            </h1>
            <p className="text-muted-foreground text-balance">
              {entries.length === 0
                ? `At ${profile.age}, this is the day your story starts recording itself. Capture a single honest sentence.`
                : `${entries.length} ${entries.length === 1 ? "entry" : "entries"} so far. Every reflection is a quiet vote for who you're becoming.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <PrimaryCTA to="/capture">Begin tonight's entry</PrimaryCTA>
            <GhostCTA to="/timeline">Open the timeline</GhostCTA>
          </div>
        </section>

        {/* Daily capture preview */}
        <section className="space-y-5 animate-rise-in">
          <SectionHeading eyebrow="Daily Capture" trailing="Tonight's prompt" />
          <div className="glass-card-strong rounded-3xl p-7 sm:p-10 space-y-8 relative overflow-hidden">
            <div
              className="absolute -top-32 -right-32 size-72 rounded-full opacity-50 animate-glow-drift"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--indigo-glow) 50%, transparent), transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div className="relative space-y-3">
              <p className="text-eyebrow text-foreground/50">Evening reflection</p>
              <p className="text-display text-2xl sm:text-3xl text-white/95 leading-snug text-balance">
                "What did you do today that the version of you from a year ago
                wouldn't have dared?"
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5 relative">
              <ChipGroup label="Energy" options={["low", "soft", "even", "high", "lit"]} active={2} />
              <ChipGroup label="Mood" options={["heavy", "tender", "calm", "focused", "radiant"]} active={3} />
              <div className="ml-auto flex items-center gap-2">
                <IconBtn aria="Add voice"><Mic className="size-4" /></IconBtn>
                <IconBtn aria="Add photo"><Camera className="size-4" /></IconBtn>
                <Link
                  to="/capture"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-background px-5 py-2.5 text-sm font-medium shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--indigo-glow)_55%,transparent)] hover:translate-y-[-1px] transition-transform"
                >
                  Reflect <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Signature features */}
        <section className="space-y-5 animate-rise-in">
          <SectionHeading eyebrow="Signature surfaces" trailing="Built to feel alive" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureTile
              to="/galaxy"
              icon={<Sparkles className="size-4" />}
              label="Memory Galaxy"
              meta={`${entries.length} ${entries.length === 1 ? "node" : "nodes"}`}
              accent="indigo"
            >
              <GalaxyMini />
            </FeatureTile>
            <FeatureTile
              to="/growth"
              icon={<TreeDeciduous className="size-4" />}
              label="Growth Tree"
              meta={entries.length === 0 ? "Seed" : "Growing"}
              accent="emerald"
            >
              <TreeMini />
            </FeatureTile>
            <FeatureTile
              to="/heatmap"
              icon={<Activity className="size-4" />}
              label="Life Heatmap"
              meta="Patterns"
              accent="amber"
            >
              <HeatmapMini />
            </FeatureTile>
            <FeatureTile
              to="/letters"
              icon={<Mail className="size-4" />}
              label="Letters to Future Self"
              meta="In transit"
              accent="violet"
            >
              <LettersMini />
            </FeatureTile>
          </div>
        </section>

        {/* Insights */}
        {insights.length > 0 && (
          <section className="space-y-5 animate-rise-in">
            <SectionHeading eyebrow="Reflection engine" trailing="What you are showing yourself" />
            <div className="grid md:grid-cols-3 gap-4">
              {insights.map((i) => (
                <div key={i.title} className="glass-card rounded-3xl p-6 space-y-3 hover:bg-white/[0.05] transition-colors">
                  <p className="text-eyebrow text-accent">{i.label}</p>
                  <p className="text-display text-xl text-white/95 leading-snug text-balance">
                    {i.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Current chapter + recent */}
        <section className="space-y-6 animate-rise-in">
          <div className="flex items-end justify-between">
            <SectionHeading eyebrow={entries.length === 0 ? "Your chapters" : "Recent moments"} />
            {chapters[0] && (
              <span className="text-display text-lg text-white/85">{chapters[0].name}</span>
            )}
          </div>
          {entries.length === 0 ? (
            <div className="glass-card rounded-3xl p-8 text-center space-y-3">
              <p className="text-display text-xl text-white/90">No entries yet.</p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                The first one is always the hardest. After that, the orb starts to listen.
              </p>
              <Link
                to="/capture"
                className="inline-flex items-center gap-2 rounded-full bg-white text-background px-5 py-2.5 text-sm font-medium hover:translate-y-[-1px] transition-transform"
              >
                Write the first entry <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {today.map((e) => (
                  <Link
                    key={e.id}
                    to="/timeline"
                    className="glass-card rounded-2xl p-5 sm:p-6 flex items-center gap-5 group hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="text-eyebrow text-foreground/45 tabular-nums w-16 shrink-0">
                      {formatDateLabel(e.date)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{e.title}</h4>
                      {e.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{e.excerpt}</p>
                      )}
                    </div>
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{
                        background: `var(--${e.hue}-glow)`,
                        boxShadow: `0 0 14px var(--${e.hue}-glow)`,
                      }}
                    />
                  </Link>
                ))}
              </div>
              {chapters.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {chapters.map((c) => (
                    <span key={c.name} className="text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-white/10">
                      {c.name} <span className="opacity-50">· {c.items.length}</span>
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Manifesto */}
        <section className="text-center max-w-2xl mx-auto space-y-4 pt-8 animate-rise-in">
          <p className="text-eyebrow text-foreground/40">The promise</p>
          <p className="text-display text-2xl sm:text-3xl text-white/90 leading-snug text-balance">
            Most apps help you write down what happened.<br />
            DEV DIARY helps you understand who you are becoming.
          </p>
        </section>
      </main>

      <MobileDock />
    </div>
  );
}

function SectionHeading({ eyebrow, trailing }: { eyebrow: string; trailing?: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-eyebrow text-foreground/55">{eyebrow}</h2>
      {trailing && <span className="text-xs text-muted-foreground">{trailing}</span>}
    </div>
  );
}

function PrimaryCTA({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to as any}
      className="inline-flex items-center gap-2 rounded-full bg-white text-background px-6 py-3 text-sm font-medium shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--indigo-glow)_55%,transparent)] hover:translate-y-[-1px] transition-transform"
    >
      {children} <ArrowUpRight className="size-4" />
    </Link>
  );
}

function GhostCTA({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to as any}
      className="inline-flex items-center gap-2 rounded-full glass-card px-6 py-3 text-sm font-medium text-foreground/90 hover:bg-white/[0.06] transition-colors"
    >
      {children}
    </Link>
  );
}

function ChipGroup({ label, options, active }: { label: string; options: string[]; active: number }) {
  return (
    <div className="space-y-2">
      <p className="text-eyebrow text-foreground/45">{label}</p>
      <div className="flex gap-1.5">
        {options.map((o, i) => (
          <span
            key={o}
            className={
              i === active
                ? "px-2.5 py-1 rounded-full text-[11px] bg-white text-background"
                : "px-2.5 py-1 rounded-full text-[11px] border border-white/10 text-foreground/70"
            }
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

function IconBtn({ children, aria }: { children: React.ReactNode; aria: string }) {
  return (
    <button
      aria-label={aria}
      className="size-10 rounded-full glass-card grid place-items-center text-foreground/80 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}

function FeatureTile({
  to,
  icon,
  label,
  meta,
  accent,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  meta: string;
  accent: "indigo" | "emerald" | "amber" | "violet";
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to as any}
      className="group relative glass-card rounded-3xl p-5 aspect-square flex flex-col justify-between overflow-hidden hover:bg-white/[0.05] transition-colors"
    >
      <div
        className="absolute -inset-12 opacity-50 group-hover:opacity-80 transition-opacity"
        style={{
          background: `radial-gradient(circle at 70% 30%, color-mix(in oklab, var(--${accent}-glow) 30%, transparent), transparent 60%)`,
          filter: "blur(30px)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="size-8 rounded-full grid place-items-center text-background"
          style={{ background: `var(--${accent}-glow)` }}
        >
          {icon}
        </span>
        <ArrowUpRight className="size-4 text-foreground/40 group-hover:text-foreground transition-colors" />
      </div>
      <div className="relative flex-1 grid place-items-center py-2">{children}</div>
      <div className="relative">
        <div className="text-white font-medium text-sm leading-tight">{label}</div>
        <div className="text-eyebrow text-foreground/45 mt-1">{meta}</div>
      </div>
    </Link>
  );
}

function GalaxyMini() {
  const nodes = [
    { t: 18, l: 22, s: 6, h: "amber" },
    { t: 36, l: 70, s: 4, h: "indigo" },
    { t: 56, l: 30, s: 8, h: "emerald" },
    { t: 70, l: 65, s: 3, h: "violet" },
    { t: 50, l: 50, s: 10, h: "indigo" },
  ];
  return (
    <div className="relative w-full h-full">
      {nodes.map((n, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: `${n.t}%`,
            left: `${n.l}%`,
            width: n.s,
            height: n.s,
            background: `var(--${n.h}-glow)`,
            boxShadow: `0 0 ${n.s * 2}px var(--${n.h}-glow)`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function TreeMini() {
  const bars = [12, 22, 32, 48, 36, 20];
  return (
    <div className="flex items-end gap-1.5 h-full pb-1">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-full"
          style={{
            height: `${h}px`,
            background: `color-mix(in oklab, var(--emerald-glow) ${30 + h}%, transparent)`,
            boxShadow: i === 3 ? "0 0 10px var(--emerald-glow)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

function HeatmapMini() {
  const cells = Array.from({ length: 25 });
  return (
    <div className="grid grid-cols-5 gap-1">
      {cells.map((_, i) => {
        const intensity = ((i * 37) % 100) / 100;
        return (
          <span
            key={i}
            className="size-2.5 rounded-[2px]"
            style={{
              background: `color-mix(in oklab, var(--amber-glow) ${intensity * 80}%, transparent)`,
            }}
          />
        );
      })}
    </div>
  );
}

function LettersMini() {
  return (
    <div className="relative w-20 h-12">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-x-0 h-12 rounded-md glass-card-strong"
          style={{
            transform: `translateY(${i * -4}px) rotate(${(i - 1) * 4}deg)`,
            borderColor: i === 0 ? "color-mix(in oklab, var(--violet-glow) 50%, transparent)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

type Insight = { label: string; title: string; detail: string };

function deriveInsights(entries: Entry[]): Insight[] {
  if (entries.length < 3) return [];
  const insights: Insight[] = [];

  // Most frequent mood
  const moodCounts = new Map<string, number>();
  for (const e of entries) moodCounts.set(e.mood, (moodCounts.get(e.mood) ?? 0) + 1);
  const topMood = [...moodCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topMood) {
    insights.push({
      label: "Dominant tone",
      title: `${topMood[0]} colours most of what you write`,
      detail: `${topMood[1]} of your ${entries.length} entries lean ${topMood[0].toLowerCase()}.`,
    });
  }

  // Recurring tag
  const tagCounts = new Map<string, number>();
  for (const e of entries) for (const t of e.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  const topTag = [...tagCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topTag && topTag[1] >= 2) {
    insights.push({
      label: "Recurring theme",
      title: `"${topTag[0]}" keeps returning`,
      detail: `It appears across ${topTag[1]} entries — a thread worth pulling on.`,
    });
  }

  // Average energy
  const avgEnergy = entries.reduce((s, e) => s + e.energy, 0) / entries.length;
  insights.push({
    label: "Energy signature",
    title: `Your reflections average ${avgEnergy.toFixed(1)} / 5`,
    detail: avgEnergy >= 3.5
      ? "You tend to write when something is alive in you. Notice what feeds that."
      : "You write most honestly from quieter places. That's a craft, not a deficit.",
  });

  return insights.slice(0, 3);
}
