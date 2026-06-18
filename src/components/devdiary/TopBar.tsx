import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function TopBar({ right }: { right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 glass-card border-x-0 border-t-0">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span
            className="size-7 rounded-full"
            style={{
              background:
                "conic-gradient(from 140deg, var(--indigo-glow), var(--emerald-glow), var(--amber-glow), var(--indigo-glow))",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.4), 0 0 18px color-mix(in oklab, var(--indigo-glow) 40%, transparent)",
            }}
          />
          <span className="font-medium tracking-[0.24em] text-sm text-foreground/90 group-hover:text-foreground transition-colors">
            DEV DIARY
          </span>
        </Link>
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
