import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { useLetters } from "@/components/devdiary/data";
import { ArrowLeft, Plus, X } from "lucide-react";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "Letters to Future Self — DEV DIARY" },
      { name: "description", content: "Write a letter you'll only read at a future date." },
    ],
  }),
  component: LettersPage,
});

const presets: { label: string; addMonths: number }[] = [
  { label: "1 week", addMonths: 0 },
  { label: "1 month", addMonths: 1 },
  { label: "6 months", addMonths: 6 },
  { label: "1 year", addMonths: 12 },
  { label: "5 years", addMonths: 60 },
];

function defaultArrival(addMonths: number, addDays = 0) {
  const d = new Date();
  if (addMonths) d.setMonth(d.getMonth() + addMonths);
  if (addDays) d.setDate(d.getDate() + addDays);
  return d.toISOString().slice(0, 10);
}

function LettersPage() {
  const { letters, add, remove } = useLetters();
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("Future me");
  const [preview, setPreview] = useState("");
  const [arrival, setArrival] = useState(defaultArrival(0, 7));

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!preview.trim()) return;
    add({ to: to.trim() || "Future me", preview: preview.trim(), arrival });
    setPreview("");
    setTo("Future me");
    setArrival(defaultArrival(0, 7));
    setOpen(false);
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
      <main className="mx-auto max-w-3xl px-5 sm:px-8 pt-10 space-y-12">
        <header className="space-y-3 max-w-2xl">
          <p className="text-eyebrow text-foreground/55">Letters to Future Self</p>
          <h1 className="text-display text-4xl sm:text-5xl text-white leading-tight text-balance">
            Mail something to who you haven't become yet.
          </h1>
          <p className="text-muted-foreground">
            Sealed until the date you choose. The version of you that opens it is the only one who can.
          </p>
        </header>

        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full glass-card-strong rounded-3xl p-6 flex items-center gap-4 hover:bg-white/[0.06] transition-colors text-left"
        >
          <span className="size-12 rounded-full grid place-items-center text-background" style={{ background: "var(--amber-glow)" }}>
            {open ? <X className="size-5" /> : <Plus className="size-5" />}
          </span>
          <div>
            <p className="text-white font-medium">{open ? "Close" : "Write a new letter"}</p>
            <p className="text-sm text-muted-foreground">1 week · 1 month · 6 months · 1 year · 5 years</p>
          </div>
        </button>

        {open && (
          <form onSubmit={handleSave} className="glass-card-strong rounded-3xl p-6 space-y-5">
            <div className="space-y-2">
              <p className="text-eyebrow text-foreground/55">To</p>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Future me in 6 months"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30"
              />
            </div>
            <div className="space-y-2">
              <p className="text-eyebrow text-foreground/55">Letter</p>
              <textarea
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                placeholder="Dear future me…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30 resize-none min-h-[160px]"
              />
            </div>
            <div className="space-y-2">
              <p className="text-eyebrow text-foreground/55">Arrives on</p>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setArrival(p.addMonths ? defaultArrival(p.addMonths) : defaultArrival(0, 7))}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-foreground/80 hover:bg-white/5"
                  >
                    {p.label}
                  </button>
                ))}
                <input
                  type="date"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground/80 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!preview.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-white text-background px-5 py-2.5 text-sm font-medium hover:translate-y-[-1px] transition-transform disabled:opacity-40 disabled:hover:translate-y-0"
              >
                Seal letter
              </button>
            </div>
          </form>
        )}

        {letters.length === 0 ? (
          <div className="glass-card rounded-3xl p-10 text-center space-y-3">
            <p className="text-display text-xl text-white/90">No letters in flight yet.</p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              When you write one, it disappears until its arrival date — even from you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {letters.map((l, i) => {
              const arrivesAt = new Date(l.arrival);
              const arrivedLabel = arrivesAt.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
              return (
                <article key={l.id} className="relative glass-card rounded-3xl p-6 overflow-hidden">
                  <div
                    className="absolute -inset-20 opacity-40"
                    style={{
                      background: `radial-gradient(circle at ${i % 2 === 0 ? "20%" : "80%"} 30%, color-mix(in oklab, var(--violet-glow) 35%, transparent), transparent 60%)`,
                      filter: "blur(40px)",
                    }}
                  />
                  <div className="relative flex items-start gap-5">
                    <div className="size-12 rounded-2xl glass-card-strong grid place-items-center text-white/80 shrink-0">✉</div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="text-eyebrow text-foreground/55">{l.to}</p>
                      <p className="text-display text-lg text-white/90 italic leading-snug">"{l.preview.slice(0, 140)}{l.preview.length > 140 ? "…" : ""}"</p>
                      <p className="text-xs text-muted-foreground">Sealed · arrives {arrivedLabel}</p>
                    </div>
                    <button
                      onClick={() => remove(l.id)}
                      aria-label="Delete letter"
                      className="relative size-8 rounded-full glass-card grid place-items-center text-foreground/60 hover:text-white hover:bg-white/10"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <MobileDock />
    </div>
  );
}
