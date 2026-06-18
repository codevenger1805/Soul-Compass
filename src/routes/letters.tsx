import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { futureLetters } from "@/components/devdiary/data";
import { ArrowLeft, Plus } from "lucide-react";

export const Route = createFileRoute("/letters")({
  head: () => ({
    meta: [
      { title: "Letters to Future Self — DEV DIARY" },
      { name: "description", content: "Write a letter you'll only read at a future date." },
    ],
  }),
  component: LettersPage,
});

function LettersPage() {
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

        <button className="w-full glass-card-strong rounded-3xl p-6 flex items-center gap-4 hover:bg-white/[0.06] transition-colors">
          <span className="size-12 rounded-full grid place-items-center text-background" style={{ background: "var(--amber-glow)" }}>
            <Plus className="size-5" />
          </span>
          <div className="text-left">
            <p className="text-white font-medium">Write a new letter</p>
            <p className="text-sm text-muted-foreground">1 week · 1 month · 6 months · 1 year · 5 years</p>
          </div>
        </button>

        <div className="space-y-4">
          {futureLetters.map((l, i) => (
            <article
              key={l.id}
              className="relative glass-card rounded-3xl p-6 overflow-hidden"
            >
              <div
                className="absolute -inset-20 opacity-40"
                style={{
                  background: `radial-gradient(circle at ${i % 2 === 0 ? "20%" : "80%"} 30%, color-mix(in oklab, var(--violet-glow) 35%, transparent), transparent 60%)`,
                  filter: "blur(40px)",
                }}
              />
              <div className="relative flex items-start gap-5">
                <div className="size-12 rounded-2xl glass-card-strong grid place-items-center text-white/80 shrink-0">
                  ✉
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-eyebrow text-foreground/55">{l.to}</p>
                  <p className="text-display text-lg text-white/90 italic leading-snug">"{l.preview}"</p>
                  <p className="text-xs text-muted-foreground">Sealed · arrives {l.arrival}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-6 text-center space-y-2">
          <p className="text-display text-xl text-white">Time Capsule</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Lock a memory now — graduation, the first job, the morning the baby came home — and
            open it on a chosen day.
          </p>
        </div>
      </main>
      <MobileDock />
    </div>
  );
}
