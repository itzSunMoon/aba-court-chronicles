type Props = { abbr: string; color: string; size?: number; className?: string };

export function TeamLogo({ abbr, color, size = 48, className = "" }: Props) {
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