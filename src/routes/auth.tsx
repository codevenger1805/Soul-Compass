import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { MoodOrb } from "@/components/devdiary/MoodOrb";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Welcome — DEV DIARY" },
      { name: "description", content: "Begin your DEV DIARY." },
    ],
  }),
  component: OnboardPage,
});

function OnboardPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const canStart = name.trim().length > 0 && Number(age) > 0;

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!canStart) return;
    try {
      localStorage.setItem(
        "devdiary:profile",
        JSON.stringify({ name: name.trim(), age: Number(age) }),
      );
    } catch {}
    navigate({ to: "/" });
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <main className="mx-auto max-w-md px-6 pt-20 pb-24 space-y-10">
        <div className="text-center space-y-6">
          <MoodOrb size={160} mood="Welcome" caption="Begin" hue="indigo" />
          <div className="space-y-3">
            <h1 className="text-display text-3xl text-white leading-tight text-balance">
              Before we begin, who are you?
            </h1>
            <p className="text-muted-foreground text-sm">
              Just a name and an age. No accounts. No friction.
            </p>
          </div>
        </div>

        <form onSubmit={handleStart} className="glass-card-strong rounded-3xl p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.18em] text-foreground/50">Your name</label>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.18em] text-foreground/50">Your age</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="27"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30"
            />
          </div>
          <button
            type="submit"
            disabled={!canStart}
            className="w-full rounded-xl bg-white text-background py-3 text-sm font-medium hover:translate-y-[-1px] transition-transform shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--indigo-glow)_55%,transparent)] disabled:opacity-40 disabled:hover:translate-y-0 inline-flex items-center justify-center gap-2"
          >
            Get started <ArrowRight className="size-4" />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Stored only on this device. Your reflections stay yours.
        </p>
      </main>
    </div>
  );
}
