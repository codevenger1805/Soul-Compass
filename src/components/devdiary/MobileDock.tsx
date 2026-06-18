import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, Plus, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/timeline", icon: Compass, label: "Timeline" },
  { to: "/capture", icon: Plus, label: "Capture", primary: true },
  { to: "/galaxy", icon: Sparkles, label: "Galaxy" },
  { to: "/profile", icon: User, label: "You" },
] as const;

export function MobileDock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[min(94vw,28rem)]"
    >
      <div className="glass-card-strong rounded-full px-3 py-2 flex items-center justify-between shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {items.map(({ to, icon: Icon, label, primary }) => {
          const active = pathname === to;
          if (primary) {
            return (
              <Link key={to} to={to} aria-label={label} className="-mt-8">
                <span
                  className="grid place-items-center size-14 rounded-full text-background ring-4 ring-background/60"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, white, color-mix(in oklab, var(--indigo-glow) 70%, white) 60%, var(--indigo-glow) 100%)",
                    boxShadow:
                      "0 18px 40px -10px color-mix(in oklab, var(--indigo-glow) 60%, transparent)",
                  }}
                >
                  <Icon className="size-6" strokeWidth={2.2} />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} />
              <span
                className={cn(
                  "size-1 rounded-full transition-all",
                  active ? "bg-accent shadow-[0_0_8px_var(--emerald-glow)]" : "bg-transparent",
                )}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
