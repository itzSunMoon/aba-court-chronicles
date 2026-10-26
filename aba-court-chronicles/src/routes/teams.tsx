import { createFileRoute, Outlet, useMatches, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronUp, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PageShell } from "@/components/layout/PageShell";
import { TeamCard } from "@/components/TeamCard";
import { TeamLogo } from "@/components/TeamLogo";
import { teams, pastSeasons, type ArchivedTeam } from "@/lib/mock-data";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams — ABA" },
      { name: "description", content: "Meet the 12 clubs of the Asia Basketball Association." },
      { property: "og:title", content: "Teams — ABA" },
      { property: "og:description", content: "Meet the 12 clubs of the Asia Basketball Association." },
    ],
  }),
  component: TeamsLayout,
});

function TeamsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId.startsWith("/teams/$"));
  if (isChild) return <Outlet />;

  return <TeamsPage />;
}

function TeamsPage() {
  const [tab, setTab] = useState<string>("current");
  const [open, setOpen] = useState(false);
  const season = pastSeasons.find((s) => s.id === tab);
  const seasonOptions = [
    { id: "current", label: "SEASON 1", active: true },
    ...pastSeasons.map((s) => ({ id: s.id, label: s.label, active: false })),
  ];
  const current = seasonOptions.find((s) => s.id === tab)!;

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Clubs</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Teams</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">12 clubs. One league.</p>

        <div className="mt-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="glass rounded-xl flex items-center gap-3 pr-4 overflow-hidden text-left">
              <span className="font-semibold">{current.label}</span>
              <ChevronUp className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "" : "rotate-180"}`} />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 glass border-white/10 p-0">
              <div className="px-4 pt-4 pb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Season</div>
              <div className="pb-3">
                {seasonOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setTab(s.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                      tab === s.id ? "bg-white/5 text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{s.label}</span>
                    {s.active ? (
                      <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Active</span>
                    ) : tab === s.id ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : null}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {tab === "current" ? (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((t) => <TeamCard key={t.id} team={t} />)}
          </div>
        ) : season ? (
          <>
            <p className="mt-8 text-sm text-muted-foreground">{season.description}</p>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {season.teams.map((t) => (
                <ArchivedTeamCard key={t.name} team={t} />
              ))}
            </div>
          </>
        ) : null}
      </section>
    </PageShell>
  );
}

function ArchivedTeamCard({ team }: { team: ArchivedTeam }) {
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
        <TeamLogo abbr={team.abbr} color={team.color} logo={team.logo} size={64} className="group-hover:scale-110 transition-transform" />
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Record</div>
          <div className="font-bold tabular-nums">{team.wins}-{team.losses}</div>
        </div>
      </div>
      <h3 className="relative text-lg font-bold">{team.name}</h3>
      <div className="relative mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{team.note}</div>
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