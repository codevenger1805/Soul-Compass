import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MobileDock } from "@/components/devdiary/MobileDock";
import { TopBar } from "@/components/devdiary/TopBar";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/growth")({
  head: () => ({
    meta: [
      { title: "Growth Tree — DEV DIARY" },
      { name: "description", content: "A living symbol of your reflection consistency, depth and milestones." },
    ],
  }),
  component: GrowthPage,
});

function GrowthPage() {
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
          <p className="text-eyebrow text-foreground/55">Growth Tree</p>
          <h1 className="text-display text-4xl sm:text-5xl text-white leading-tight text-balance">
            Not a streak. A living thing.
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Your tree grows from reflection depth, honesty, and the way you return to yourself —
            not from how many days you ticked a box.
          </p>
        </header>

        <div className="glass-card-strong rounded-[2rem] p-8 sm:p-12">
          <Tree />
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 mt-8">
            <Stat label="Season" value="Spring 03" />
            <Stat label="Depth" value="0.84" />
            <Stat label="Returns" value="142" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Symbol title="Roots" detail="6 months of consistent return. Your roots reach a chapter ago." />
          <Symbol title="Canopy" detail="Reflection depth widening. You're writing in second and third drafts now." />
          <Symbol title="A new branch" detail="Began naming what you want, not just what happened." />
          <Symbol title="Loss of a leaf" detail="The 'always-on productivity' branch is quietly pruning itself." />
        </div>
      </main>
      <MobileDock />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-eyebrow text-foreground/45">{label}</p>
      <p className="text-display text-2xl text-white mt-1">{value}</p>
    </div>
  );
}

function Symbol({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-2">
      <p className="text-display text-lg text-white">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
    </div>
  );
}

function Tree() {
  return (
    <div className="relative mx-auto" style={{ width: "min(100%, 360px)", aspectRatio: "1 / 1.1" }}>
      {/* glow */}
      <div
        className="absolute inset-0 animate-glow-drift"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, color-mix(in oklab, var(--emerald-glow) 30%, transparent) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <svg viewBox="0 0 200 220" className="relative w-full h-full">
        <defs>
          <linearGradient id="trunk" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.12 90)" />
            <stop offset="100%" stopColor="oklch(0.35 0.08 60)" />
          </linearGradient>
          <radialGradient id="leaf" cx="50%" cy="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.16 165)" />
            <stop offset="100%" stopColor="oklch(0.4 0.12 165)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* canopy clouds */}
        <circle cx="100" cy="70" r="55" fill="url(#leaf)" />
        <circle cx="65" cy="85" r="32" fill="url(#leaf)" opacity="0.8" />
        <circle cx="135" cy="85" r="38" fill="url(#leaf)" opacity="0.85" />
        <circle cx="100" cy="45" r="28" fill="url(#leaf)" opacity="0.7" />

        {/* trunk */}
        <path
          d="M100 200 C 98 170, 102 150, 100 120 C 96 100, 110 90, 100 70"
          stroke="url(#trunk)" strokeWidth="6" fill="none" strokeLinecap="round"
        />
        {/* branches */}
        <path d="M100 130 C 80 120, 70 100, 60 95" stroke="url(#trunk)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M100 110 C 120 105, 130 90, 140 88" stroke="url(#trunk)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M100 150 C 115 145, 125 135, 130 130" stroke="url(#trunk)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* roots */}
        <path d="M100 200 C 90 208, 75 212, 60 214" stroke="url(#trunk)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M100 200 C 110 208, 125 212, 140 214" stroke="url(#trunk)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M100 200 L 100 218" stroke="url(#trunk)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* fireflies */}
        {[
          [70, 60], [125, 50], [110, 80], [55, 100], [150, 110], [90, 100],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="oklch(0.95 0.14 90)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
