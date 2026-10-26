import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { TeamLogo } from "@/components/TeamLogo";
import { getTeamById, leaderboard, LB_POSITIONS, type LbPlayer } from "@/lib/mock-data";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Trophy, ArrowDown, ArrowUp } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — ABA" },
      { name: "description", content: "Player stat leaders across the Asia Basketball Association." },
    ],
  }),
  component: LeaderboardPage,
});

type Key = keyof LbPlayer | "fgp" | "tpp" | "ftp";
type Col = { key: Key; label: string; group: string; pct?: boolean };

const COLS: Col[] = [
  { key: "gp", label: "GP", group: "Season" },
  { key: "pts", label: "PTS", group: "Season" },
  { key: "fgm", label: "FGM", group: "Field Goals" },
  { key: "fga", label: "FGA", group: "Field Goals" },
  { key: "fgp", label: "FG%", group: "Field Goals", pct: true },
  { key: "tpm", label: "3PM", group: "3-Pointers" },
  { key: "tpa", label: "3PA", group: "3-Pointers" },
  { key: "tpp", label: "3P%", group: "3-Pointers", pct: true },
  { key: "ftm", label: "FTM", group: "Free Throws" },
  { key: "fta", label: "FTA", group: "Free Throws" },
  { key: "ftp", label: "FT%", group: "Free Throws", pct: true },
  { key: "ast", label: "AST", group: "Playmaking" },
  { key: "stl", label: "STL", group: "Playmaking" },
  { key: "bk", label: "BK", group: "Playmaking" },
  { key: "orb", label: "ORB", group: "Rebounds" },
  { key: "drb", label: "DRB", group: "Rebounds" },
  { key: "reb", label: "REB", group: "Rebounds" },
  { key: "tov", label: "TOV", group: "Other" },
  { key: "fls", label: "FLS", group: "Other" },
];

const TABS: { id: string; label: string; keys: Key[] | null }[] = [
  { id: "overview", label: "Overview", keys: null },
  { id: "scoring", label: "Scoring", keys: ["gp", "pts", "fgm", "fga", "fgp", "tpm", "tpa", "tpp", "ftm", "fta", "ftp"] },
  { id: "rebounding", label: "Rebounding", keys: ["gp", "orb", "drb", "reb"] },
  { id: "playmaking", label: "Playmaking", keys: ["gp", "ast", "tov"] },
  { id: "defense", label: "Defense", keys: ["gp", "stl", "bk", "fls"] },
];

const PAGE = 50;
const val = (p: LbPlayer, k: Key): number => {
  if (k === "fgp") return p.fga ? p.fgm / p.fga : -1;
  if (k === "tpp") return p.tpa ? p.tpm / p.tpa : -1;
  if (k === "ftp") return p.fta ? p.ftm / p.fta : -1;
  return p[k] as number;
};
const show = (p: LbPlayer, c: Col) => {
  const v = val(p, c.key);
  return c.pct ? (v < 0 ? "—" : (v * 100).toFixed(1) + "%") : String(v);
};

function LeaderboardPage() {
  const [tab, setTab] = useState("overview");
  const [pos, setPos] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "pts", dir: -1 });
  const [page, setPage] = useState(0);

  const keys = TABS.find((t) => t.id === tab)?.keys ?? null;
  const cols = keys ? COLS.filter((c) => keys.includes(c.key)) : COLS;

  const rows = useMemo(() => {
    const f = leaderboard.filter(
      (p) => (pos === "All" || p.pos === pos) && p.name.toLowerCase().includes(q.toLowerCase()),
    );
    return [...f].sort((a, b) => (val(a, sort.key) - val(b, sort.key)) * sort.dir || a.id - b.id);
  }, [pos, q, sort]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const cur = Math.min(page, pages - 1);
  const slice = rows.slice(cur * PAGE, cur * PAGE + PAGE);
  const rankOf = (p: LbPlayer) => rows.indexOf(p) + 1;

  const onSort = (k: Key) => {
    setSort((s) => (s.key === k ? { key: k, dir: (s.dir * -1) as 1 | -1 } : { key: k, dir: -1 }));
    setPage(0);
  };

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Leaderboard</h1>
              <div className="text-sm text-muted-foreground">ABA · Stress Test 3</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{leaderboard.length} players</span>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg glass font-semibold text-sm hover:bg-white/10">
              See all-time <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 flex-wrap border-b border-white/10">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  tab === t.id ? "border-primary text-foreground font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 pb-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-xs font-semibold text-muted-foreground mr-2">Position</span>
              {["All", ...LB_POSITIONS].map((p) => (
                <button
                  key={p}
                  onClick={() => { setPos(p); setPage(0); }}
                  className={`px-2.5 py-1 rounded-md font-medium ${pos === p ? "text-foreground font-bold underline underline-offset-8 decoration-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 text-sm">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(0); }}
                placeholder="Find a player..."
                className="bg-transparent outline-none w-40 placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 glass rounded-xl overflow-hidden">
          <div className="overflow-auto max-h-[70vh]">
            <table className="w-full text-sm tabular-nums border-collapse">
              <thead className="sticky top-0 z-10 bg-[oklch(0.15_0.025_285)]">
                <tr className="text-[11px] uppercase font-bold">
                  <th className="px-3 py-2 text-left">#</th>
                  <th className="px-3 py-2 text-left">Player</th>
                  <th className="px-3 py-2 text-left">Pos</th>
                  <th className="px-3 py-2 text-left">Team</th>
                  {cols.map((c, i) => (
                    <th
                      key={c.key}
                      onClick={() => onSort(c.key)}
                      className={`px-3 py-2 text-right cursor-pointer hover:text-primary ${sort.key === c.key ? "text-primary" : ""} ${i === 0 || cols[i - 1].group !== c.group ? "border-l border-white/10" : ""}`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {c.label}
                        {sort.key === c.key && (sort.dir === -1 ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slice.map((p) => {
                  const t = getTeamById(p.teamId);
                  const rank = rankOf(p);
                  return (
                    <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                      <td className={`px-3 py-3 ${rank <= 3 ? "font-bold" : "text-muted-foreground"}`}>{rank}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold shrink-0">
                            P{p.id}
                          </div>
                          <span className="font-semibold whitespace-nowrap">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-bold text-muted-foreground">{p.pos}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <TeamLogo abbr={t.abbr} color={t.color} size={28} />
                          <span>{p.team}</span>
                        </div>
                      </td>
                      {cols.map((c, i) => (
                        <td
                          key={c.key}
                          className={`px-3 py-3 text-right ${c.key === "pts" ? "font-bold" : ""} ${i === 0 || cols[i - 1].group !== c.group ? "border-l border-white/10" : ""}`}
                        >
                          {show(p, c)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {slice.length === 0 && <div className="py-16 text-center text-muted-foreground">No players found.</div>}
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-sm text-muted-foreground">
            <span>{rows.length ? `${cur * PAGE + 1}–${cur * PAGE + slice.length} of ${rows.length}` : "0 of 0"}</span>
            <div className="flex items-center gap-3">
              <button disabled={cur === 0} onClick={() => setPage(cur - 1)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md glass disabled:opacity-40">
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span>Page {cur + 1} of {pages}</span>
              <button disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md glass text-foreground font-semibold disabled:opacity-40">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
