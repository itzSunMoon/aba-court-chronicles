export type Team = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  abbr: string;
  coach: string;
  arena: string;
  captain: string;
  viceCaptain: string;
  color: string;
  color2: string;
  wins: number;
  losses: number;
  pf: number;
  pa: number;
  streak: string;
};

export const teams: Team[] = [
  { id: "1", slug: "tokyo-thunder", name: "T1", city: "", country: "", abbr: "T1", coach: "Hiroshi Tanaka", arena: "Shibuya Dome", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "2", slug: "seoul-serpents", name: "T2", city: "", country: "", abbr: "T2", coach: "Min-jun Park", arena: "Gangnam Arena", captain: "unknown", viceCaptain: "random", color: "#9B4DFF", color2: "#1a0033", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "3", slug: "manila-mavericks", name: "T3", city: "", country: "", abbr: "T3", coach: "Jose Cruz", arena: "Pasay Coliseum", captain: "unknown", viceCaptain: "random", color: "#6B1FEF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "4", slug: "shanghai-sharks", name: "T4", city: "", country: "", abbr: "T4", coach: "Wei Chen", arena: "Pudong Center", captain: "unknown", viceCaptain: "random", color: "#8A3FFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "5", slug: "taipei-tigers", name: "T5", city: "", country: "", abbr: "T5", coach: "Lin Wei", arena: "Taipei Arena", captain: "unknown", viceCaptain: "random", color: "#A855F7", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "6", slug: "osaka-orbit", name: "T6", city: "", country: "", abbr: "T6", coach: "Kenji Sato", arena: "Namba Hall", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "7", slug: "jakarta-jaguars", name: "T7", city: "", country: "", abbr: "T7", coach: "Budi Santoso", arena: "Senayan Arena", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "8", slug: "bangkok-blaze", name: "T8", city: "", country: "", abbr: "T8", coach: "Somchai Thongdee", arena: "Rajamangala Court", captain: "unknown", viceCaptain: "random", color: "#8A3FFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "9", slug: "singapore-slam", name: "T9", city: "", country: "", abbr: "T9", coach: "Wei Ming Lee", arena: "Kallang Stadium", captain: "unknown", viceCaptain: "random", color: "#6B1FEF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "10", slug: "mumbai-monsoon", name: "T10", city: "", country: "", abbr: "T10", coach: "Rajesh Kumar", arena: "Mumbai Dome", captain: "unknown", viceCaptain: "random", color: "#9B4DFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "11", slug: "beijing-phoenix", name: "T11", city: "", country: "", abbr: "T11", coach: "Zhang Wei", arena: "Wukesong Arena", captain: "unknown", viceCaptain: "random", color: "#A855F7", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
  { id: "12", slug: "hanoi-hornets", name: "T12", city: "", country: "", abbr: "T12", coach: "Nguyen Van", arena: "My Dinh Arena", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-" },
];

export const getTeam = (slug: string) => teams.find((t) => t.slug === slug);


export type ArchivedTeam = { slug: string; name: string; abbr: string; color: string; logo?: string; wins: number; losses: number; note: string; captain: string; viceCaptain: string };
export type PastSeason = { id: string; label: string; description: string; teams: ArchivedTeam[] };

const st3Named: { name: string; abbr: string; slug: string; logo?: string }[] = [
  { name: "Yara Yara Phonk Squad", abbr: "YYP", slug: "st3-yara-yara-phonk-squad", logo: "/logos/yara-yara-phonk-squad.png" },
  { name: "Revelation", abbr: "REV", slug: "st3-revelation", logo: "/logos/revelation.png" },
  { name: "Recoil", abbr: "RCL", slug: "st3-recoil", logo: "/logos/recoil.png" },
  { name: "Saint RENE", abbr: "SRN", slug: "st3-saint-rene", logo: "/logos/saint-rene.png" },
  { name: "Nutella", abbr: "NUT", slug: "st3-nutella", logo: "/logos/nutella.png" },
  { name: "Shuhoku", abbr: "SHU", slug: "st3-shuhoku", logo: "/logos/shuhoku.png" },
  { name: "Bading Badongs", abbr: "BDB", slug: "st3-bading-badongs", logo: "/logos/bading-badongs.png" },
  { name: "Honey Popcorn", abbr: "HNY", slug: "st3-honey-popcorn", logo: "/logos/honey-popcorn.png" },
  { name: "Clownfish", abbr: "CLF", slug: "st3-clownfish", logo: "/logos/clownfish.png" },
  { name: "WELCOME TO AUSTRALIA ( Draft )", abbr: "WTA", slug: "st3-welcome-to-australia", logo: "/logos/welcome-to-australia.png" },
  { name: "G.O.M", abbr: "GOM", slug: "st3-gom", logo: "/logos/gom.png" },
  { name: "Beijing Ducks", abbr: "DUCKS", slug: "st3-beijing-ducks", logo: "/logos/beijing-ducks.png" },
  { name: "Duke University", abbr: "DUKE", slug: "st3-duke-university", logo: "/logos/duke-university.png" },
];

export const pastSeasons: PastSeason[] = [
  {
    id: "st3",
    label: "ST3",
    description: "Previous season — Stress Test 3 rosters.",
    teams: st3Named.map((t, i) => ({
      ...t,
      color: ["#7B2EFF", "#9B4DFF", "#6B1FEF", "#8A3FFF", "#A855F7"][i % 5],
      wins: 0,
      losses: 0,
      note: "ST3",
      captain: "unknown",
      viceCaptain: "random",
    })),
  },
];

export const getArchivedTeam = (slug: string) => {
  for (const s of pastSeasons) {
    const t = s.teams.find((x) => x.slug === slug);
    if (t) return { season: s, team: t };
  }
  return undefined;
};

export const getTeamById = (id: string) => teams.find((t) => t.id === id)!;

export type Match = {
  id: string;
  homeId: string;
  awayId: string;
  date: string;
  time: string;
  arena: string;
  status: "scheduled" | "live" | "final";
  homeScore?: number;
  awayScore?: number;
  quarter?: string;
};

function makeMatches(): Match[] {
  const list: Match[] = [];
  const arenas = teams.map((t) => t.arena);
  const today = new Date("2026-07-27");
  // 20 completed
  for (let i = 0; i < 20; i++) {
    const h = teams[i % 12], a = teams[(i + 5) % 12];
    const d = new Date(today); d.setDate(d.getDate() - (20 - i));
    list.push({
      id: `m${i}`, homeId: h.id, awayId: a.id,
      date: d.toISOString().slice(0, 10), time: "19:30", arena: h.arena,
      status: "final",
      homeScore: 0, awayScore: 0,
    });
  }
  // 2 live
  for (let i = 0; i < 2; i++) {
    const h = teams[(i * 3) % 12], a = teams[(i * 3 + 4) % 12];
    list.push({
      id: `ml${i}`, homeId: h.id, awayId: a.id,
      date: today.toISOString().slice(0, 10), time: "20:00", arena: h.arena,
      status: "live",
      homeScore: 62 + i * 3, awayScore: 58 + i * 5, quarter: "Q3 04:12",
    });
  }
  // 20 upcoming
  for (let i = 0; i < 20; i++) {
    const h = teams[(i + 2) % 12], a = teams[(i + 7) % 12];
    const d = new Date(today); d.setDate(d.getDate() + i + 1);
    list.push({
      id: `mu${i}`, homeId: h.id, awayId: a.id,
      date: d.toISOString().slice(0, 10), time: ["18:00", "19:30", "20:00"][i % 3], arena: arenas[i % arenas.length],
      status: "scheduled",
    });
  }
  return list;
}

export const matches = makeMatches();

export const featuredMatch = matches.find((m) => m.status === "scheduled")!;

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  image: string;
  video?: string;
  tiktok?: string;
};

export const news: NewsArticle[] = [
  { id: "n1", title: "GFX Made by CH332Y", date: "2026-07-27", summary: "Insanely good gfx made by CH332Y show support and love to his creations, and dm him for custom gfx", category: "Recap", image: "/gfx-ch332y.jpg" },
  { id: "n2", title: "Practical Basketball coming out on July 30th 3:00 AM GMT+ 8", date: "2026-07-22", summary: "The league is in advanced discussions to add franchises in Kuala Lumpur and Dubai for the 2027 season.", category: "League", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800", video: "C2CyFaZ4dOc" },
  { id: "n3", title: "ABA (Asia Basketball Association) Tiktok Advertisement", date: "2026-07-20", summary: "Made by Shion and uploaded by pbchino / rafa", category: "Events", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800", tiktok: "7667589592316448021" },
  { id: "n4", title: "Mavericks' rookie sensation drops 40 in win", date: "2026-07-18", summary: "The Mavericks' first-round pick is redefining rookie expectations across the league.", category: "Players", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800" },
  { id: "n5", title: "Playoffs picture heats up as season winds down", date: "2026-07-15", summary: "Just three games separate the 4th and 9th seeds in the East. Every night matters.", category: "Standings", image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800" },
  { id: "n6", title: "Global broadcast deal reaches 40 territories", date: "2026-07-12", summary: "ABA games are now available in more countries than ever before.", category: "Business", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" },
];

export const partners = [
  { name: "NBL", url: "https://discord.gg/nbl" },
  { name: "NVL", url: "https://discord.gg/DbKuk2DMya" },
  { name: "AVL", url: "https://discord.gg/WxWYDCt9tT" },
  { name: "CVR: ASIA", url: "https://discord.gg/TyfDzSPhRz" },
  { name: "EVL", url: "https://discord.gg/8Np7pP9csv" },
  { name: "RoBox", url: "https://discord.gg/vaHVUzZVyk" },
  { name: "CBU", url: "https://discord.gg/RNNxVWvxJf" },
  { name: "La Lega", url: "https://discord.gg/HGYhbtXbVr" },
];

export type Player = { number: number; name: string; position: string; rank: string; price: number };
export const roster: Player[] = [
  { number: 1, name: "Player 1", position: "PG", rank: "C-", price: 50 },
  { number: 2, name: "Player 2", position: "SG", rank: "C", price: 70 },
  { number: 3, name: "Player 3", position: "SF", rank: "C+", price: 90 },
  { number: 4, name: "Player 4", position: "PF", rank: "B-", price: 110 },
  { number: 5, name: "Player 5", position: "C", rank: "B", price: 130 },
  { number: 6, name: "Player 6", position: "PG", rank: "B+", price: 150 },
  { number: 7, name: "Player 7", position: "SG", rank: "A-", price: 170 },
  { number: 8, name: "Player 8", position: "SF", rank: "A", price: 190 },
  { number: 9, name: "Player 9", position: "PF", rank: "A+", price: 210 },
  { number: 10, name: "Player 10", position: "C", rank: "S+", price: 250 },
];

export type BracketMatch = { team1: string; team2: string; score1: number; score2: number; winner: string; games: string };
export const bracket = {
  quarterfinals: [
    { team1: "1", team2: "8", score1: 4, score2: 1, winner: "1", games: "4-1" },
    { team1: "4", team2: "5", score1: 4, score2: 2, winner: "4", games: "4-2" },
    { team1: "3", team2: "6", score1: 4, score2: 3, winner: "3", games: "4-3" },
    { team1: "2", team2: "7", score1: 2, score2: 4, winner: "7", games: "2-4" },
  ],
  semifinals: [
    { team1: "1", team2: "4", score1: 4, score2: 2, winner: "1", games: "4-2" },
    { team1: "3", team2: "7", score1: 1, score2: 4, winner: "7", games: "1-4" },
  ],
  finals: [
    { team1: "1", team2: "7", score1: 3, score2: 2, winner: "", games: "3-2 (live)" },
  ],
} as const;
// ---- Leaderboard (placeholder players/teams; replace with real data) ----
export type LbPlayer = {
  id: number; name: string; pos: string; teamId: string; team: string; gp: number;
  pts: number; fgm: number; fga: number; tpm: number; tpa: number; ftm: number; fta: number;
  ast: number; stl: number; bk: number; orb: number; drb: number; reb: number; tov: number; fls: number;
};
export const LB_POSITIONS = ["PG", "SG", "SF", "PF", "C"] as const;

function seeded(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildLeaderboard(): LbPlayer[] {
  const rows: LbPlayer[] = [];
  for (let i = 0; i < 120; i++) {
    const r = seeded(i + 1), p = i % 5, pos = LB_POSITIONS[p];
    const gp = 10 + Math.floor(r() * 13);
    const fga = Math.round(gp * (6 + r() * 9));
    const fgm = Math.round(fga * (0.34 + r() * 0.2));
    const tpa = Math.round(fga * (p === 4 ? 0.05 : 0.2 + r() * 0.25));
    const tpm = Math.min(fgm, Math.round(tpa * (0.22 + r() * 0.2)));
    const fta = Math.round(gp * (1.5 + r() * 4));
    const ftm = Math.round(fta * (0.6 + r() * 0.3));
    const orb = Math.round(gp * (0.3 + (p + r()) * 0.35));
    const drb = Math.round(gp * (1 + (p + r()) * 0.7));
    rows.push({
      id: i + 1, name: `Player ${i + 1}`, pos, teamId: String((i % 12) + 1), team: `T${(i % 12) + 1}`, gp,
      pts: 2 * (fgm - tpm) + 3 * tpm + ftm, fgm, fga, tpm, tpa, ftm, fta,
      ast: Math.round(gp * (4.2 - p * 0.8 + r() * 1.5)), stl: Math.round(gp * (1.6 - p * 0.2 + r() * 0.5)),
      bk: Math.round(gp * (0.1 + p * 0.35 + r() * 0.4)), orb, drb, reb: orb + drb,
      tov: Math.round(gp * (1 + r() * 2)), fls: Math.round(gp * (1 + r() * 2)),
    });
  }
  return rows;
}
export const leaderboard = buildLeaderboard();

// ---- Archive (league history) ----
export type ArchiveSeason = { id: string; banner: string; label: string; title: string; champion: string; second: string; third: string };
export const archive: { code: string; name: string; seasons: ArchiveSeason[] }[] = [
  {
    code: "ABA",
    name: "Asia Basketball Association",
    seasons: [
      {
        id: "st3",
        banner: "/archive/st3-champion.jpg",
        label: "ST3",
        title: "Stress Test 3",
        champion: "st3-yara-yara-phonk-squad",
        second: "st3-duke-university",
        third: "st3-revelation",
      },
    ],
  },
];

// Placeholder champion roster + awards for the archive season page (replace with real data)
export const archiveRoster = Array.from({ length: 14 }, (_, i) => ({
  number: i + 1,
  name: `Player ${i + 1}`,
  pos: ["PG", "SG", "SF", "PF", "C"][i % 5],
}));
export const archiveAwards: { title: string; player: number }[] = [
  { title: "Most Valuable Player", player: 0 },
  { title: "Finals MVP", player: 1 },
  { title: "Offensive Player of the Season", player: 2 },
  { title: "Defensive Player of the Season", player: 3 },
  { title: "Best Playmaker", player: 0 },
  { title: "Best Point Guard", player: 0 },
  { title: "Best Shooting Guard", player: 1 },
  { title: "Best Small Forward", player: 2 },
  { title: "Best Power Forward", player: 3 },
  { title: "Best Center", player: 4 },
];

// ST3 champions roster (Yara Yara Phonk Squad) — Roblox usernames
export const championRoster: { username: string; id: number; pos: string }[] = [
  { username: "hofneedle", id: 11371686663, pos: "PG" },
  { username: "KrisRizzesThePaint", id: 11342458563, pos: "C" },
  { username: "dudeiforgotme", id: 1391716164, pos: "SF" },
  { username: "meatbollsensei", id: 1601428976, pos: "PG" },
  { username: "las_kun", id: 479239973, pos: "PF" },
  { username: "noobbutnooblolwow", id: 2437960896, pos: "SG" },
  { username: "Inviolate", id: 52474988, pos: "PF" },
];
