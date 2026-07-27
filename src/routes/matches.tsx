import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { MatchCard } from "@/components/MatchCard";
import { matches } from "@/lib/mock-data";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Matches — ABA" },
      { name: "description", content: "Full ABA schedule: today's games, upcoming fixtures, and completed results." },
      { property: "og:title", content: "Matches — ABA" },
      { property: "og:description", content: "Full ABA schedule: today's games, upcoming fixtures, and completed results." },
    ],
  }),
  component: MatchesPage,
});

type Filter = "today" | "upcoming" | "completed" | "all";

function MatchesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const today = "2026-07-27";

  const filtered = useMemo(() => {
    switch (filter) {
      case "today": return matches.filter((m) => m.date === today);
      case "upcoming": return matches.filter((m) => m.status === "scheduled");
      case "completed": return matches.filter((m) => m.status === "final").reverse();
      default: return matches;
    }
  }, [filter]);

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: matches.length },
    { id: "today", label: "Today", count: matches.filter((m) => m.date === today).length },
    { id: "upcoming", label: "Upcoming", count: matches.filter((m) => m.status === "scheduled").length },
    { id: "completed", label: "Completed", count: matches.filter((m) => m.status === "final").length },
  ];

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Schedule</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Matches</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Every ABA game across all 12 teams. Filter by day, upcoming, or completed.</p>

        <div className="mt-10 flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === c.id
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "glass hover:bg-white/10"
              }`}
            >
              {c.label} <span className="opacity-60 ml-1">{c.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => <MatchCard key={m.id} match={m} />)}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center py-16 glass rounded-2xl text-muted-foreground">No matches in this view.</div>
        )}
      </section>
    </PageShell>
  );
}