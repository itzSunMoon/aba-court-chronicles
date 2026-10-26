import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { TeamLogo } from "@/components/TeamLogo";
import { archive, getArchivedTeam } from "@/lib/mock-data";
import { Globe } from "lucide-react";

export const Route = createFileRoute("/archive/")({
  head: () => ({
    meta: [
      { title: "Archive — ABA" },
      { name: "description", content: "Every champion the league has crowned." },
    ],
  }),
  component: ArchivePage,
});

function Team({ slug, size }: { slug: string; size: number }) {
  const t = getArchivedTeam(slug)?.team;
  if (!t) return null;
  return (
    <>
      <TeamLogo abbr={t.abbr} color={t.color} logo={t.logo} size={size} />
      <span className="truncate">{t.name}</span>
    </>
  );
}

function ArchivePage() {
  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight uppercase">Archive</h1>
            <div className="text-sm text-muted-foreground">Every champion the league has crowned.</div>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 glass rounded-xl overflow-hidden">
          {archive.map((r) => (
            <div key={r.code} className="border-r border-white/5 last:border-r-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="text-sm">
                  <span className="font-bold tracking-widest mr-2">{r.code}</span>
                  <span className="text-muted-foreground">{r.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{r.seasons.length}</span>
              </div>
              {r.seasons.map((s) => (
                <Link
                  key={s.label}
                  to="/archive/$season"
                  params={{ season: s.id }}
                  className="block p-5 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="font-bold">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.title}</div>
                  </div>
                  <div className="mt-4 pb-4 border-b border-white/5">
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Champion</div>
                    <div className="flex items-center gap-3 font-bold text-lg">
                      <Team slug={s.champion} size={48} />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-muted-foreground">2</span>
                      <Team slug={s.second} size={22} />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-muted-foreground">3</span>
                      <Team slug={s.third} size={22} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
