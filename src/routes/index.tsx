import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { MatchCard } from "@/components/MatchCard";
import { NewsCard } from "@/components/NewsCard";
import { TeamCard } from "@/components/TeamCard";
import { TeamLogo } from "@/components/TeamLogo";
import { matches, news, teams, featuredMatch, partners, getTeamById } from "@/lib/mock-data";
import { ArrowRight, Play, Trophy, Calendar } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ABA — The Future of Asian Basketball" },
      { name: "description", content: "Live matches, standings, playoffs, and the elite teams of the Asia Basketball Association." },
      { property: "og:title", content: "ABA — The Future of Asian Basketball" },
      { property: "og:description", content: "Live matches, standings, playoffs, and the elite teams of the Asia Basketball Association." },
    ],
  }),
  component: Home,
});

function Home() {
  const recent = matches.filter((m) => m.status === "final").slice(-6).reverse();
  const fmHome = getTeamById(featuredMatch.homeId);
  const fmAway = getTeamById(featuredMatch.awayId);
  const topTeams = [...teams].sort((a, b) => b.wins - a.wins).slice(0, 6);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-hero -mt-16 pt-16">
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
            style={{ objectPosition: "95% center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-[120px] animate-pulse-glow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              STRESS TEST 3 · Playoff Race
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
              ABA <br />
              Asian <br />
              <span className="text-gradient">Basketball</span> <br />
              <span style={{ background: "linear-gradient(135deg, #f0d9ff, #d670ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                Association
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Experience the best Robasketball league across Asia. Elite teams. 50 nations. One trophy.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/matches"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-transform"
              >
                <Play className="w-4 h-4 fill-current" /> View Matches
              </Link>
              <Link
                to="/standings"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass hover:bg-white/10 font-semibold transition-all hover:scale-105"
              >
                <Trophy className="w-4 h-4" /> Standings
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 max-w-md gap-8">
              {[
                { v: "12", l: "Teams" },
                { v: "50", l: "Nations" },
                { v: "24", l: "Games" },
              ].map((s) => (
                <div key={s.l} className="whitespace-nowrap">
                  <div className="text-3xl md:text-4xl font-black text-gradient whitespace-nowrap">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured match */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading eyebrow="Next up" title="Featured Match" />
        <div className="mt-10 relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-[100px]" />
          <div className="relative grid md:grid-cols-3 items-center gap-8">
            <div className="text-center md:text-right">
              <TeamLogo abbr={fmHome.abbr} color={fmHome.color} size={120} className="mx-auto md:ml-auto md:mr-0 animate-float" />
              <h3 className="mt-4 text-2xl font-bold">{fmHome.name}</h3>
              <div className="text-sm text-muted-foreground">{fmHome.wins}-{fmHome.losses} · Home</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">VS</div>
              <div className="mt-4 text-3xl md:text-4xl font-black">
                {new Date(featuredMatch.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" /> {featuredMatch.time}
              </div>
              <div className="mt-3 flex justify-center gap-6 text-xs">
                <div>
                  <div className="text-muted-foreground uppercase tracking-wider text-[10px]">Captain</div>
                  <div className="font-semibold">{fmHome.captain}</div>
                </div>
                <div>
                  <div className="text-muted-foreground uppercase tracking-wider text-[10px]">Vice Capt</div>
                  <div className="font-semibold">{fmHome.viceCaptain}</div>
                </div>
              </div>
              <Link
                to="/matches"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-transform"
              >
                Match Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="text-center md:text-left">
              <TeamLogo abbr={fmAway.abbr} color={fmAway.color} size={120} className="mx-auto md:mr-auto md:ml-0 animate-float" />
              <h3 className="mt-4 text-2xl font-bold">{fmAway.name}</h3>
              <div className="text-sm text-muted-foreground">{fmAway.wins}-{fmAway.losses} · Away</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeading eyebrow="Recent action" title="Latest Results" linkTo="/matches" linkLabel="All matches" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>

      {/* News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading eyebrow="League news" title="Stories from the court" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.slice(0, 3).map((n) => <NewsCard key={n.id} article={n} />)}
        </div>
      </section>

      {/* Featured teams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeading eyebrow="Contenders" title="Featured Teams" linkTo="/teams" linkLabel="All teams" />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTeams.map((t) => <TeamCard key={t.id} team={t} />)}
        </div>
      </section>

      {/* Sponsors */}
      <section className="mt-20 py-12 border-y border-white/5 overflow-hidden">
        <div className="text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Official Partners
        </div>
        <div className="relative">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...sponsors, ...sponsors].map((s, i) => (
              <div key={i} className="text-2xl font-black text-muted-foreground/60 hover:text-foreground transition-colors">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SectionHeading({ eyebrow, title, linkTo, linkLabel }: { eyebrow: string; title: string; linkTo?: string; linkLabel?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">{eyebrow}</div>
        <h2 className="mt-2 text-3xl md:text-5xl font-black tracking-tight">{title}</h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
          {linkLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
