export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[15%] -left-[15%] h-[60vmax] w-[60vmax] rounded-full opacity-70 animate-glow-drift"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--indigo-glow) 45%, transparent) 0%, color-mix(in oklab, var(--violet-glow) 22%, transparent) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div className="absolute -bottom-[20%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full opacity-60 animate-glow-drift"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--emerald-glow) 30%, transparent) 0%, transparent 65%)",
          filter: "blur(90px)",
          animationDelay: "-6s",
        }}
      />
      <div className="absolute top-1/2 left-1/3 h-[28vmax] w-[28vmax] -translate-x-1/2 rounded-full opacity-40 animate-glow-drift"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--amber-glow) 22%, transparent) 0%, transparent 60%)",
          filter: "blur(100px)",
          animationDelay: "-12s",
        }}
      />

      {/* subtle starfield */}
      <Stars />

      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="absolute inset-0">
      {stars.map((i) => {
        const top = (i * 53) % 100;
        const left = (i * 91) % 100;
        const size = (i % 3) + 1;
        const delay = (i % 7) * 0.4;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 6px rgba(255,255,255,0.55)",
            }}
          />
        );
      })}
    </div>
  );
}
