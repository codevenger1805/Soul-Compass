import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { MoodOrb } from "@/components/devdiary/MoodOrb";
import { useEntries, type Hue, type MoodName } from "@/components/devdiary/data";
import { ArrowLeft, Hash } from "lucide-react";

export const Route = createFileRoute("/capture")({
  head: () => ({
    meta: [
      { title: "Daily Capture — DEV DIARY" },
      { name: "description", content: "Capture today: title, content, mood, energy, tags." },
    ],
  }),
  component: CapturePage,
});

const moods: { name: MoodName; hue: Hue }[] = [
  { name: "Heavy", hue: "violet" },
  { name: "Tender", hue: "amber" },
  { name: "Calm", hue: "indigo" },
  { name: "Focused", hue: "indigo" },
  { name: "Curious", hue: "emerald" },
  { name: "Radiant", hue: "emerald" },
];

function CapturePage() {
  const navigate = useNavigate();
  const { add } = useEntries();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(moods[3]);
  const [energy, setEnergy] = useState(3);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [chapter, setChapter] = useState("");

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  function commitTag() {
    const t = tagInput.trim().replace(/^#/, "");
    if (!t) return;
    if (!tags.includes(t)) setTags([...tags, t]);
    setTagInput("");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;
    add({
      title: title.trim() || "Untitled moment",
      excerpt: body.trim(),
      mood: mood.name,
      energy,
      tags,
      chapter: chapter.trim() || undefined,
      hue: mood.hue,
    });
    navigate({ to: "/timeline" });
  }

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

        <form onSubmit={handleSave} className="glass-card-strong rounded-3xl p-6 sm:p-8 space-y-7">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give this moment a name"
            className="w-full bg-transparent text-display text-2xl sm:text-3xl text-white placeholder:text-foreground/30 outline-none"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
                <button
                  type="button"
                  key={t}
                  onClick={() => setTags(tags.filter((x) => x !== t))}
                  className="px-2.5 py-1 rounded-full bg-white/5 text-xs text-foreground/80 border border-white/10 hover:bg-white/10"
                >
                  #{t} ×
                </button>
              ))}
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1">
                <Hash className="size-3 text-foreground/40" />
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); commitTag(); }
                  }}
                  onBlur={commitTag}
                  placeholder="add tag"
                  className="bg-transparent text-xs outline-none w-24 text-foreground/80 placeholder:text-foreground/30"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-eyebrow text-foreground/55">Chapter (optional)</p>
            <input
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. The early startup years"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30"
            />
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-white/5">
            <button
              type="submit"
              disabled={!canSave}
              className="inline-flex items-center gap-2 rounded-full bg-white text-background px-6 py-3 text-sm font-medium hover:translate-y-[-1px] transition-transform shadow-[0_16px_40px_-12px_color-mix(in_oklab,var(--indigo-glow)_55%,transparent)] disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Seal this entry
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-muted-foreground max-w-sm mx-auto">
          Entries are private and stored on this device.
        </p>
      </main>
      <MobileDock />
    </div>
  );
}
