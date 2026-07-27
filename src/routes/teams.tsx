import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TeamCard } from "@/components/TeamCard";
import { teams } from "@/lib/mock-data";

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

  const east = teams.filter((t) => t.conference === "East");
  const west = teams.filter((t) => t.conference === "West");

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Clubs</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Teams</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">12 clubs. 8 nations. One league.</p>

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
      </section>
    </PageShell>
  );
}