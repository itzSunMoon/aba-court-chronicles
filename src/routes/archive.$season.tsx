import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TeamLogo } from "@/components/TeamLogo";
import { archive, archiveAwards, archiveRoster, championRoster, getArchivedTeam } from "@/lib/mock-data";
import { getRobloxProfiles } from "@/lib/roblox";
import { ChevronLeft, Trophy } from "lucide-react";

export const Route = createFileRoute("/archive/$season")({
  loader: async ({ params }) => {
    const season = archive.flatMap((r) => r.seasons).find((s) => s.id === params.season);
    if (!season) throw notFound();
    return { season, roblox: await getRobloxProfiles() };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.season.label ?? "Season"} — ABA Archive` }],
  }),
  component: SeasonPage,
});

function Place({ slug, rank, size = 28 }: { slug: string; rank: string; size?: number }) {
  const t = getArchivedTeam(slug)?.team;
  if (!t) return null;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-[11px] font-bold tracking-widest text-muted-foreground">{rank}</span>
      <TeamLogo abbr={t.abbr} color={t.color} logo={t.logo} size={size} />
      <span className="font-semibold">{t.name}</span>
    </div>
  );
}

function Avatar({ n, size = 56 }: { n: number; size?: number }) {
  return (
    <div
      className="rounded-full bg-gradient-primary flex items-center justify-center font-bold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.28 }}
    >
      P{n}
    </div>
  );
}

function SeasonPage() {
  const { season, roblox } = Route.useLoaderData();
  const champ = getArchivedTeam(season.champion)?.team;
  const firstTeam = archiveRoster.slice(0, 5);
  const secondTeam = archiveRoster.slice(5, 10);

  return (
    <PageShell>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/archive" className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-3.5 h-3.5" /> All Seasons
        </Link>
        <div className="mt-4 flex items-end justify-between border-b border-white/10 pb-3">
          <h1 className="text-2xl font-extrabold tracking-tight">{season.label}</h1>
          <span className="text-xs text-muted-foreground">{season.title}</span>
        </div>

        <div className="mt-4 relative rounded-lg overflow-hidden border border-white/10 bg-black">
          <img src={season.banner} alt={`${champ?.name} champions`} className="w-full h-auto block" />
          {champ && (
            <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-1 py-3 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Champion</span>
              <span className="inline-flex items-center gap-2 font-extrabold">
                <TeamLogo abbr={champ.abbr} color={champ.color} logo={champ.logo} size={24} /> {champ.name}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 py-3 border-y border-white/10 flex items-center justify-between flex-wrap gap-3">
          <Place slug={season.second} rank="2ND" />
          <Place slug={season.third} rank="3RD" />
        </div>

        <h2 className="mt-10 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Individual Awards</h2>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {archiveAwards.map((a) => {
            const p = archiveRoster[a.player];
            return (
              <div key={a.title} className="glass rounded-lg p-4 text-center flex flex-col items-center gap-3">
                <div className="text-[10px] font-extrabold uppercase tracking-wider h-8 flex items-center">{a.title}</div>
                <Avatar n={p.number} size={64} />
                <div>
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.pos} · {champ?.abbr}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-x-6">
          {[
            { title: "First Team", players: firstTeam },
            { title: "Second Team", players: secondTeam },
          ].map((tm) => (
            <div key={tm.title}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">{tm.title}</h2>
              <div className="mt-3 space-y-2">
                {tm.players.map((p) => (
                  <div key={p.number} className="glass rounded-lg px-4 py-3 flex items-center gap-4">
                    <Avatar n={p.number} size={36} />
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{p.pos} · {champ?.abbr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-[11px] font-bold uppercase tracking-[0.25em] text-primary flex items-center gap-2">
          <Trophy className="w-3.5 h-3.5" /> Champions Roster
        </h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {championRoster.map((p) => {
            const r = roblox[String(p.id)];
            const display = r?.displayName || p.username;
            return (
              <a
                key={p.id}
                href={`https://www.roblox.com/users/${p.id}/profile`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-white/10 border-b-[3px] border-b-pink-400 bg-[oklch(0.1_0.02_285)] hover:-translate-y-1 transition-transform"
              >
                {r?.avatar ? (
                  <img src={r.avatar} alt={`${p.username} Roblox avatar`} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white/10">
                    {p.username[0].toUpperCase()}
                  </div>
                )}
                <span className="absolute top-2 left-2 rounded-full bg-black/60 backdrop-blur px-2 py-0.5 text-[10px] font-bold tracking-wider">
                  {p.pos}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="font-bold text-sm truncate">{display}</div>
                  {display.toLowerCase() !== p.username.toLowerCase() && (
                    <div className="text-[11px] text-muted-foreground truncate">@{p.username}</div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
