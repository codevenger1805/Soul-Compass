import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/devdiary/AmbientBackground";
import { TopBar } from "@/components/devdiary/TopBar";
import { MoodOrb } from "@/components/devdiary/MoodOrb";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — DEV DIARY" },
      { name: "description", content: "Sign in to your DEV DIARY." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <TopBar
        right={
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="size-4" /> Home
          </Link>
        }
      />
      <main className="mx-auto max-w-md px-6 pt-12 pb-24 space-y-8">
        <div className="text-center space-y-6">
          <MoodOrb size={160} mood="Welcome" caption="Begin" hue="indigo" />
          <div className="space-y-2">
            <h1 className="text-display text-3xl text-white leading-tight">
              Step into your own attention.
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to continue your diary. Your entries stay yours.
            </p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="glass-card-strong rounded-3xl p-6 space-y-4">
          <button
            type="button"
            className="w-full rounded-xl glass-card py-3 text-sm font-medium text-foreground/90 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            Continue with Google
          </button>
          <div className="flex items-center gap-3 text-xs text-foreground/40">
            <div className="h-px flex-1 bg-white/10" />
            or with email
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-foreground/40 outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-white text-background py-3 text-sm font-medium hover:translate-y-[-1px] transition-transform shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--indigo-glow)_55%,transparent)]"
          >
            Continue
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Forgot password? <span className="underline underline-offset-4">Reset it</span>
          </p>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to keep being honest with yourself.
        </p>
      </main>
    </div>
  );
}
