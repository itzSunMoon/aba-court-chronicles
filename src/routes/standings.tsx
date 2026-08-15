import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TeamLogo } from "@/components/TeamLogo";
import { teams } from "@/lib/mock-data";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/standings")({
  head: () => ({
    meta: [
      { title: "Standings — ABA" },
      { name: "description", content: "Live ABA league standings, win percentage, points, and playoff positioning." },
      { property: "og:title", content: "Standings — ABA" },
      { property: "og:description", content: "Live ABA league standings and playoff positioning." },
    ],
  }),
  component: StandingsPage,
});

function StandingsPage() {
  const sorted = [...teams].sort((a, b) => (b.wins / (b.wins + b.losses)) - (a.wins / (a.wins + a.losses)));
  const leader = sorted[0];
  const leaderPct = leader.wins / (leader.wins + leader.losses);

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">2026 Season</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Standings</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Top 8 teams advance to the ABA Playoffs. Highlighted rows show current playoff position.</p>

        <div className="mt-10 glass-strong rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="text-left py-4 px-4 font-semibold">#</th>
                  <th className="text-left py-4 px-4 font-semibold">Team</th>
                  <th className="text-right py-4 px-3 font-semibold">W</th>
                  <th className="text-right py-4 px-3 font-semibold">L</th>
                  <th className="text-right py-4 px-3 font-semibold">PCT</th>
                  <th className="text-right py-4 px-3 font-semibold">GB</th>
                  <th className="text-right py-4 px-3 font-semibold">PF</th>
                  <th className="text-right py-4 px-3 font-semibold">PA</th>
                  <th className="text-right py-4 px-4 font-semibold">Streak</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((t, i) => {
                  const pct = t.wins / (t.wins + t.losses);
                  const gb = ((leader.wins - t.wins) + (t.losses - leader.losses)) / 2;
                  const inPlayoff = i < 8;
                  return (
                    <tr
                      key={t.id}
                      className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${inPlayoff ? "bg-primary/5" : ""}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold tabular-nums ${inPlayoff ? "text-primary" : "text-muted-foreground"}`}>{i + 1}</span>
                          {inPlayoff && <span className="w-1 h-4 rounded-full bg-gradient-primary" />}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Link to="/teams/$slug" params={{ slug: t.slug }} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <TeamLogo abbr={t.abbr} color={t.color} size={32} />
                          <div>
                            <div className="font-semibold">{t.name}</div>
                            <div className="text-[10px] text-muted-foreground whitespace-pre-wrap">{t.city}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="text-right px-3 tabular-nums font-semibold">{t.wins}</td>
                      <td className="text-right px-3 tabular-nums text-muted-foreground">{t.losses}</td>
                      <td className="text-right px-3 tabular-nums">{pct.toFixed(3).replace(/^0/, "")}</td>
                      <td className="text-right px-3 tabular-nums text-muted-foreground">{gb === 0 ? "—" : gb.toFixed(1)}</td>
                      <td className="text-right px-3 tabular-nums text-muted-foreground">{t.pf}</td>
                      <td className="text-right px-3 tabular-nums text-muted-foreground">{t.pa}</td>
                      <td className="text-right px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${
                          t.streak.startsWith("W") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}>{t.streak}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-primary/40" /> Playoff position (top 8)
          </span>
          <span>Leader: {leader.name} ({(leaderPct * 100).toFixed(1)}%)</span>
        </div>
      </section>
    </PageShell>
  );
}