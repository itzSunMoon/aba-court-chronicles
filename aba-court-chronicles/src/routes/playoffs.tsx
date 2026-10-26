import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TeamLogo } from "@/components/TeamLogo";
import { bracket, getTeamById } from "@/lib/mock-data";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/playoffs")({
  head: () => ({
    meta: [
      { title: "Playoffs — ABA" },
      { name: "description", content: "The 2026 ABA Playoffs bracket. Follow every series on the road to the ABA Finals." },
      { property: "og:title", content: "Playoffs — ABA" },
      { property: "og:description", content: "Follow every series on the road to the ABA Finals." },
    ],
  }),
  component: PlayoffsPage,
});

type Series = { team1: string; team2: string; score1: number; score2: number; winner: string; games: string };

function SeriesCard({ s, highlight = false }: { s: Series; highlight?: boolean }) {
  const t1 = getTeamById(s.team1);
  const t2 = getTeamById(s.team2);
  const w1 = s.winner === s.team1;
  const w2 = s.winner === s.team2;
  return (
    <div className={`glass rounded-xl p-4 min-w-[220px] transition-all hover:border-primary/40 ${highlight ? "shadow-glow border-primary/40" : ""}`}>
      <Row team={t1} score={s.score1} won={w1} dim={!!s.winner && !w1} />
      <div className="h-px bg-white/10 my-2" />
      <Row team={t2} score={s.score2} won={w2} dim={!!s.winner && !w2} />
      <div className="mt-3 text-[10px] uppercase tracking-widest text-center text-muted-foreground">{s.games}</div>
    </div>
  );
}

function Row({ team, score, won, dim }: { team: ReturnType<typeof getTeamById>; score: number; won: boolean; dim: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-2 ${dim ? "opacity-40" : ""}`}>
      <div className="flex items-center gap-2 min-w-0">
        <TeamLogo abbr={team.abbr} color={team.color} size={28} />
        <span className="font-semibold text-sm truncate">{team.abbr}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`tabular-nums font-bold ${won ? "text-primary" : ""}`}>{score}</span>
        {won && <Trophy className="w-3 h-3 text-primary" />}
      </div>
    </div>
  );
}

function PlayoffsPage() {
  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Postseason</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Playoffs 2026</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Best-of-7 series across four rounds. One trophy.</p>

        <div className="mt-12 overflow-x-auto pb-6">
          <div className="min-w-[1000px] grid grid-cols-4 gap-8 items-stretch">
            <BracketCol title="Quarterfinals">
              {bracket.quarterfinals.map((s, i) => <SeriesCard key={i} s={s} />)}
            </BracketCol>
            <BracketCol title="Semifinals" pad>
              {bracket.semifinals.map((s, i) => <SeriesCard key={i} s={s} />)}
            </BracketCol>
            <BracketCol title="Conference Finals" pad2>
              <SeriesCard s={bracket.finals[0]} highlight />
            </BracketCol>
            <BracketCol title="ABA Finals" pad2>
              <div className="glass-strong rounded-2xl p-6 text-center animate-pulse-glow">
                <Trophy className="w-10 h-10 mx-auto text-primary" />
                <div className="mt-3 text-[10px] uppercase tracking-widest text-primary font-bold">Championship</div>
                <div className="mt-2 text-lg font-black">TBD</div>
                <div className="mt-1 text-xs text-muted-foreground">Best of 7</div>
              </div>
            </BracketCol>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function BracketCol({ title, children, pad, pad2 }: { title: string; children: React.ReactNode; pad?: boolean; pad2?: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4 text-center">{title}</div>
      <div className={`flex flex-col justify-around flex-1 gap-6 ${pad ? "py-8" : ""} ${pad2 ? "py-20" : ""}`}>{children}</div>
    </div>
  );
}