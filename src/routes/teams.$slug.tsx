import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TeamLogo } from "@/components/TeamLogo";
import { MatchCard } from "@/components/MatchCard";
import { getTeam, matches, roster } from "@/lib/mock-data";
import { ArrowLeft, Trophy, Users, Building2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/teams/$slug")({
  loader: ({ params }) => {
    const team = getTeam(params.slug);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.team.name} — ABA` },
      { name: "description", content: `${loaderData.team.name} team profile. Roster, schedule, and season stats.` },
      { property: "og:title", content: `${loaderData.team.name} — ABA` },
      { property: "og:description", content: `${loaderData.team.name} — ABA team profile.` },
    ] : [{ title: "Team — ABA" }],
  }),
  component: TeamProfile,
});

function TeamProfile() {
  const { team } = Route.useLoaderData();
  const teamMatches = matches.filter((m) => m.homeId === team.id || m.awayId === team.id);
  const recent = teamMatches.filter((m) => m.status === "final").slice(-3);
  const upcoming = teamMatches.filter((m) => m.status === "scheduled").slice(0, 3);
  const winPct = (team.wins / (team.wins + team.losses) * 100).toFixed(1);

  return (
    <PageShell>
      {/* Banner */}
      <section
        className="relative pt-20 pb-16 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${team.color}30, transparent 60%), linear-gradient(180deg, oklch(0.13 0.02 285), oklch(0.1 0.02 285))` }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30" style={{ background: team.color }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/teams" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> All Teams
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <TeamLogo abbr={team.abbr} color={team.color} size={140} className="animate-float" />
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">{team.conference} Conference</div>
              <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">{team.name}</h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <Stat label="Record" value={`${team.wins}-${team.losses}`} />
                <Stat label="Win %" value={`${winPct}%`} />
                <Stat label="Streak" value={team.streak} />
                <Stat label="PF" value={team.pf.toString()} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {/* Roster */}
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Roster</h2>
            <div className="mt-6 glass rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-white/10">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Player</th>
                    <th className="text-left py-3 px-4">Pos</th>
                    <th className="text-left py-3 px-4">Height</th>
                    <th className="text-right py-3 px-4">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {roster.map((p) => (
                    <tr key={p.number} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                      <td className="py-3 px-4 tabular-nums font-bold text-primary">{p.number}</td>
                      <td className="py-3 px-4 font-semibold">{p.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{p.position}</td>
                      <td className="py-3 px-4 text-muted-foreground tabular-nums">{p.height}</td>
                      <td className="py-3 px-4 text-right tabular-nums text-muted-foreground">{p.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent games */}
          {recent.length > 0 && (
            <div>
              <h2 className="text-2xl font-black flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Recent Games</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {recent.map((m) => <MatchCard key={m.id} match={m} />)}
              </div>
            </div>
          )}

          {/* Upcoming schedule */}
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-2xl font-black flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" /> Upcoming Schedule</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Head Coach</h3>
            <div className="mt-2 text-xl font-bold">{team.coach}</div>
          </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2"><Building2 className="w-3 h-3" /> Arena</h3>
              <div className="mt-2 text-xl font-bold">{team.arena}</div>
            </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Season Record</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-3xl font-black text-primary tabular-nums">{team.wins}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Wins</div>
              </div>
              <div>
                <div className="text-3xl font-black text-muted-foreground tabular-nums">{team.losses}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Losses</div>
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Gallery</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${["1546519638-68e109498ffc", "1519861531473-9200262188bf", "1504450758481-7338eba7524a", "1608245449230-4ac19066d2d0"][i]}?w=300&q=70`}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass px-4 py-2 rounded-lg">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-bold tabular-nums">{value}</div>
    </div>
  );
}