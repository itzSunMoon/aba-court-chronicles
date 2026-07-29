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
  conference: "East" | "West";
};

export const teams: Team[] = [
  { id: "1", slug: "tokyo-thunder", name: "T1", city: "Tokyo", country: "Japan", abbr: "T1", coach: "Hiroshi Tanaka", arena: "Shibuya Dome", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "East" },
  { id: "2", slug: "seoul-serpents", name: "T2", city: "Seoul", country: "South Korea", abbr: "T2", coach: "Min-jun Park", arena: "Gangnam Arena", captain: "unknown", viceCaptain: "random", color: "#9B4DFF", color2: "#1a0033", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "East" },
  { id: "3", slug: "manila-mavericks", name: "T3", city: "Manila", country: "Philippines", abbr: "T3", coach: "Jose Cruz", arena: "Pasay Coliseum", captain: "unknown", viceCaptain: "random", color: "#6B1FEF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "East" },
  { id: "4", slug: "shanghai-sharks", name: "T4", city: "Shanghai", country: "China", abbr: "T4", coach: "Wei Chen", arena: "Pudong Center", captain: "unknown", viceCaptain: "random", color: "#8A3FFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "East" },
  { id: "5", slug: "taipei-tigers", name: "T5", city: "Taipei", country: "Taiwan", abbr: "T5", coach: "Lin Wei", arena: "Taipei Arena", captain: "unknown", viceCaptain: "random", color: "#A855F7", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "East" },
  { id: "6", slug: "osaka-orbit", name: "T6", city: "Osaka", country: "Japan", abbr: "T6", coach: "Kenji Sato", arena: "Namba Hall", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "East" },
  { id: "7", slug: "jakarta-jaguars", name: "T7", city: "Jakarta", country: "Indonesia", abbr: "T7", coach: "Budi Santoso", arena: "Senayan Arena", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "West" },
  { id: "8", slug: "bangkok-blaze", name: "T8", city: "Bangkok", country: "Thailand", abbr: "T8", coach: "Somchai Thongdee", arena: "Rajamangala Court", captain: "unknown", viceCaptain: "random", color: "#8A3FFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "West" },
  { id: "9", slug: "singapore-slam", name: "T9", city: "Singapore", country: "Singapore", abbr: "T9", coach: "Wei Ming Lee", arena: "Kallang Stadium", captain: "unknown", viceCaptain: "random", color: "#6B1FEF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "West" },
  { id: "10", slug: "mumbai-monsoon", name: "T10", city: "Mumbai", country: "India", abbr: "T10", coach: "Rajesh Kumar", arena: "Mumbai Dome", captain: "unknown", viceCaptain: "random", color: "#9B4DFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "West" },
  { id: "11", slug: "beijing-phoenix", name: "T11", city: "Beijing", country: "China", abbr: "T11", coach: "Zhang Wei", arena: "Wukesong Arena", captain: "unknown", viceCaptain: "random", color: "#A855F7", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "West" },
  { id: "12", slug: "hanoi-hornets", name: "T12", city: "Hanoi", country: "Vietnam", abbr: "T12", coach: "Nguyen Van", arena: "My Dinh Arena", captain: "unknown", viceCaptain: "random", color: "#7B2EFF", color2: "#0D0D0D", wins: 0, losses: 0, pf: 0, pa: 0, streak: "-", conference: "West" },
];

export const getTeam = (slug: string) => teams.find((t) => t.slug === slug);
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
};

export const news: NewsArticle[] = [
  { id: "n1", title: "GFX Made by CH332Y", date: "2026-07-27", summary: "Insanely good gfx made by CH332Y show support and love to his creations, and dm him for custom gfx", category: "Recap", image: "/gfx-ch332y.jpg" },
  { id: "n2", title: "Practical Basketball coming out on July 30th 3:00 AM GMT+ 8", date: "2026-07-22", summary: "The league is in advanced discussions to add franchises in Kuala Lumpur and Dubai for the 2027 season.", category: "League", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800", video: "C2CyFaZ4dOc" },
  { id: "n3", title: "All-Star Weekend voting opens next month", date: "2026-07-20", summary: "Fans across Asia will get to select the starters for the ABA All-Star Game in Singapore.", category: "Events", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800" },
  { id: "n4", title: "Mavericks' rookie sensation drops 40 in win", date: "2026-07-18", summary: "Manila's first-round pick is redefining rookie expectations across the league.", category: "Players", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800" },
  { id: "n5", title: "Playoffs picture heats up as season winds down", date: "2026-07-15", summary: "Just three games separate the 4th and 9th seeds in the East. Every night matters.", category: "Standings", image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800" },
  { id: "n6", title: "Global broadcast deal reaches 40 territories", date: "2026-07-12", summary: "ABA games are now available in more countries than ever before.", category: "Business", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" },
];

export const sponsors = [
  "TBD", "TBD", "TBD", "TBD", "TBD", "TBD", "TBD", "TBD", "TBD", "TBD",
];

export type Player = { number: number; name: string; position: string; height: string; age: number };
export const roster: Player[] = [
  { number: 3, name: "Kenji Yamamoto", position: "PG", height: "6'2\"", age: 27 },
  { number: 7, name: "Marcus Lin", position: "SG", height: "6'5\"", age: 25 },
  { number: 11, name: "Ravi Patel", position: "SF", height: "6'7\"", age: 29 },
  { number: 14, name: "Chen Wei", position: "PF", height: "6'9\"", age: 26 },
  { number: 21, name: "Andre Cruz", position: "C", height: "7'0\"", age: 28 },
  { number: 5, name: "Daichi Sato", position: "PG", height: "6'0\"", age: 23 },
  { number: 9, name: "Hyun-woo Kim", position: "SG", height: "6'4\"", age: 24 },
  { number: 15, name: "Aditya Rao", position: "SF", height: "6'6\"", age: 22 },
  { number: 23, name: "Somsak Wong", position: "PF", height: "6'8\"", age: 27 },
  { number: 32, name: "Tao Zhang", position: "C", height: "6'11\"", age: 30 },
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