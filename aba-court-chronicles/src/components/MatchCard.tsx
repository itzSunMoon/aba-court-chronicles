import { Link } from "@tanstack/react-router";
import { getTeamById, type Match } from "@/lib/mock-data";
import { TeamLogo } from "./TeamLogo";


export function MatchCard({ match }: { match: Match }) {
  const home = getTeamById(match.homeId);
  const away = getTeamById(match.awayId);
  const isLive = match.status === "live";
  const isFinal = match.status === "final";
  const homeWon = isFinal && (match.homeScore ?? 0) > (match.awayScore ?? 0);

  return (
    <div className="glass rounded-2xl p-5 hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-glow group">
      <div className="flex items-center justify-between mb-4">
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Live · {match.quarter}
          </span>
        ) : isFinal ? (
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Final · {new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {new Date(match.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        )}
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{match.time}</span>
      </div>

      <div className="space-y-3">
        <div className={`flex items-center justify-between ${isFinal && !homeWon ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-3 min-w-0">
            <TeamLogo abbr={home.abbr} color={home.color} size={40} />
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{home.name}</div>
              <div className="text-[10px] text-muted-foreground">{home.wins}-{home.losses}</div>
            </div>
          </div>
          {(isLive || isFinal) && (
            <div className="text-2xl font-bold tabular-nums">{match.homeScore}</div>
          )}
        </div>

        <div className={`flex items-center justify-between ${isFinal && homeWon ? "opacity-50" : ""}`}>
          <div className="flex items-center gap-3 min-w-0">
            <TeamLogo abbr={away.abbr} color={away.color} size={40} />
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate">{away.name}</div>
              <div className="text-[10px] text-muted-foreground">{away.wins}-{away.losses}</div>
            </div>
          </div>
          {(isLive || isFinal) && (
            <div className="text-2xl font-bold tabular-nums">{match.awayScore}</div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-muted-foreground text-[9px] uppercase tracking-wider">Captain</div>
            <div className="font-medium">{home.captain}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-[9px] uppercase tracking-wider">Vice Capt</div>
            <div className="font-medium">{home.viceCaptain}</div>
          </div>
        </div>
        <Link to="/matches" className="text-primary font-semibold hover:underline">
          {isLive ? "Watch Live" : "Details →"}
        </Link>
      </div>
    </div>
  );
}