import { Link } from "@tanstack/react-router";
import type { Team } from "@/lib/mock-data";
import { TeamLogo } from "./TeamLogo";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      to="/teams/$slug"
      params={{ slug: team.slug }}
      className="group relative glass rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow transition-all block overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${team.color}30, transparent 60%)` }}
      />
      <div className="relative flex items-start justify-between mb-6">
        <TeamLogo abbr={team.abbr} color={team.color} size={64} className="group-hover:scale-110 transition-transform" />
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Record</div>
          <div className="font-bold tabular-nums">{team.wins}-{team.losses}</div>
        </div>
      </div>
      <h3 className="relative text-lg font-bold">{team.name}</h3>
      <div className="relative text-sm text-muted-foreground mt-1">{team.city}, {team.country}</div>
      <div className="relative mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Captain</div>
          <div className="font-medium truncate">{team.captain}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-[10px] uppercase tracking-wider">Vice Capt</div>
          <div className="font-medium truncate">{team.viceCaptain}</div>
        </div>
      </div>
      <div className="relative mt-4 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform inline-block">
        View Team →
      </div>
    </Link>
  );
}