import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { MoodOrb } from "@/components/devdiary/MoodOrb";
import { ArrowLeft, Mic, Camera, Hash } from "lucide-react";

export const Route = createFileRoute("/capture")({
  head: () => ({
    meta: [
      { title: "Daily Capture — DEV DIARY" },
      { name: "description", content: "Capture today: title, content, mood, energy, tags, voice notes and photos." },
    ],
  }),
  component: CapturePage,
});

const moods = [
  { name: "Heavy", hue: "violet" as const },
  { name: "Tender", hue: "amber" as const },
  { name: "Calm", hue: "indigo" as const },
  { name: "Focused", hue: "indigo" as const },
  { name: "Curious", hue: "emerald" as const },
  { name: "Radiant", hue: "emerald" as const },
];

function CapturePage() {
  const [mood, setMood] = useState(moods[3]);
  const [energy, setEnergy] = useState(3);
  const [tags, setTags] = useState<string[]>(["startup"]);
  const [tagInput, setTagInput] = useState("");

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

      <main className="mx-auto max-w-2xl px-5 sm:px-8 pt-8 space-y-10">
        <header className="text-center space-y-6">
          <MoodOrb size={180} mood={mood.name} caption="Tonight" hue={mood.hue} />
          <h1 className="text-display text-3xl sm:text-4xl text-white text-balance leading-tight">
            What is this moment teaching you?
          </h1>
        </header>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass-card-strong rounded-3xl p-6 sm:p-8 space-y-7"
        >
          <input
            placeholder="Give this moment a name"
            className="w-full bg-transparent text-display text-2xl sm:text-3xl text-white placeholder:text-foreground/30 outline-none"
          />
          <textarea
            placeholder="Write freely. Nothing here will be graded."
            className="w-full bg-transparent text-base leading-relaxed text-foreground/90 placeholder:text-foreground/30 outline-none resize-none min-h-[180px]"
          />

          <div className="space-y-3">
            <p className="text-eyebrow text-foreground/55">Mood</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((m) => {
                const active = m.name === mood.name;
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setMood(m)}
                    className={
                      active
                        ? "px-3.5 py-1.5 rounded-full text-sm text-background"
                        : "px-3.5 py-1.5 rounded-full text-sm border border-white/10 text-foreground/80 hover:bg-white/5"
                    }
                    style={
                      active
                        ? { background: `var(--${m.hue}-glow)`, boxShadow: `0 0 18px color-mix(in oklab, var(--${m.hue}-glow) 50%, transparent)` }
                        : undefined
                    }
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <p className="text-eyebrow text-foreground/55">Energy</p>
              <span className="text-xs text-muted-foreground tabular-nums">{energy}/5</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-[10px] text-foreground/40 uppercase tracking-widest">
              <span>low</span><span>soft</span><span>even</span><span>high</span><span>lit</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-eyebrow text-foreground/55">Tags</p>
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-foreground/80 border border-white/10">
                  #{t}
                </span>
              ))}
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1">
                <Hash className="size-3 text-foreground/40" />
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      setTags([...tags, tagInput.trim()]);
                      setTagInput("");
                    }
                  }}
                  placeholder="add tag"
                  className="bg-transparent text-xs outline-none w-20 text-foreground/80 placeholder:text-foreground/30"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <IconCircle label="Voice"><Mic className="size-4" /></IconCircle>
              <IconCircle label="Photo"><Camera className="size-4" /></IconCircle>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-white text-background px-6 py-3 text-sm font-medium hover:translate-y-[-1px] transition-transform shadow-[0_16px_40px_-12px_color-mix(in_oklab,var(--indigo-glow)_55%,transparent)]"
            >
              Seal this entry
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-muted-foreground max-w-sm mx-auto">
          Entries are private by default. The reflection engine learns from your patterns,
          never from your words.
        </p>
      </main>
      <MobileDock />
    </div>
  );
}

function IconCircle({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="size-11 rounded-full glass-card grid place-items-center text-foreground/80 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}
