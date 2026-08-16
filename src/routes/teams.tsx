import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { TeamCard } from "@/components/TeamCard";
import { TeamLogo } from "@/components/TeamLogo";
import { teams, pastSeasons } from "@/lib/mock-data";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Teams — ABA" },
      { name: "description", content: "Meet the 12 clubs of the Asia Basketball Association across 8 nations." },
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
  const east = teams.filter((t) => t.conference === "East");
  const west = teams.filter((t) => t.conference === "West");
  const season = pastSeasons.find((s) => s.id === tab);

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Clubs</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Teams</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">12 clubs. 8 nations. One league.</p>

        <div className="mt-8 inline-flex flex-wrap gap-1 p-1 rounded-xl glass">
          {[{ id: "current", label: "Current Season" }, ...pastSeasons.map((s) => ({ id: s.id, label: s.label }))].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                tab === t.id ? "bg-gradient-primary text-white shadow-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "current" ? (
          <>
            <div className="mt-12">
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Eastern Conference</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {east.map((t) => <TeamCard key={t.id} team={t} />)}
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Western Conference</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {west.map((t) => <TeamCard key={t.id} team={t} />)}
              </div>
            </div>
          </>
        ) : season ? (
          <div className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{season.label} — Archived Teams</h2>
            <p className="text-sm text-muted-foreground mb-6">{season.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {season.teams.map((t) => (
                <div key={t.name} className="glass rounded-2xl p-6 flex items-center gap-4">
                  <TeamLogo abbr={t.abbr} color={t.color} size={56} />
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t.note}</div>
                    <div className="text-xs tabular-nums text-muted-foreground">{t.wins}-{t.losses}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}