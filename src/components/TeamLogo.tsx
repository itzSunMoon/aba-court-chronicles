type Props = { abbr: string; color: string; size?: number; className?: string; logo?: string; alt?: string };

export function TeamLogo({ abbr, color, size = 48, className = "", logo, alt }: Props) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={alt ?? `${abbr} logo`}
        loading="lazy"
        className={`rounded-xl object-contain bg-white/[0.03] shrink-0 p-1 ${className}`}
        style={{ width: size, height: size, boxShadow: `0 4px 20px ${color}40`, background: "#0D0D0D" }}
      />
    );
  }
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl font-bold text-white shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, #0D0D0D)`,
        boxShadow: `0 4px 20px ${color}40`,
        fontSize: size * 0.32,
        letterSpacing: "-0.02em",
      }}
    >
      {abbr}
    </div>
  );
}