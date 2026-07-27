export type Team = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  abbr: string;
  coach: string;
  arena: string;
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
  { id: "1", slug: "tokyo-thunder", name: "Tokyo Thunder", city: "Tokyo", country: "Japan", abbr: "TOK", coach: "Hiroshi Tanaka", arena: "Shibuya Dome", color: "#7B2EFF", color2: "#0D0D0D", wins: 28, losses: 6, pf: 3421, pa: 3010, streak: "W7", conference: "East" },
  { id: "2", slug: "seoul-serpents", name: "Seoul Serpents", city: "Seoul", country: "South Korea", abbr: "SEO", coach: "Min-jun Park", arena: "Gangnam Arena", color: "#9B4DFF", color2: "#1a0033", wins: 26, losses: 8, pf: 3380, pa: 3100, streak: "W3", conference: "East" },
  { id: "3", slug: "manila-mavericks", name: "Manila Mavericks", city: "Manila", country: "Philippines", abbr: "MNL", coach: "Jose Cruz", arena: "Pasay Coliseum", color: "#6B1FEF", color2: "#0D0D0D", wins: 24, losses: 10, pf: 3290, pa: 3150, streak: "W2", conference: "East" },
  { id: "4", slug: "shanghai-sharks", name: "Shanghai Sharks", city: "Shanghai", country: "China", abbr: "SHA", coach: "Wei Chen", arena: "Pudong Center", color: "#8A3FFF", color2: "#0D0D0D", wins: 22, losses: 12, pf: 3210, pa: 3180, streak: "L1", conference: "East" },
  { id: "5", slug: "taipei-tigers", name: "Taipei Tigers", city: "Taipei", country: "Taiwan", abbr: "TPE", coach: "Lin Wei", arena: "Taipei Arena", color: "#A855F7", color2: "#0D0D0D", wins: 20, losses: 14, pf: 3150, pa: 3170, streak: "W1", conference: "East" },
  { id: "6", slug: "osaka-orbit", name: "Osaka Orbit", city: "Osaka", country: "Japan", abbr: "OSA", coach: "Kenji Sato", arena: "Namba Hall", color: "#7B2EFF", color2: "#0D0D0D", wins: 17, losses: 17, pf: 3050, pa: 3080, streak: "L2", conference: "East" },
  { id: "7", slug: "jakarta-jaguars", name: "Jakarta Jaguars", city: "Jakarta", country: "Indonesia", abbr: "JKT", coach: "Budi Santoso", arena: "Senayan Arena", color: "#7B2EFF", color2: "#0D0D0D", wins: 25, losses: 9, pf: 3350, pa: 3120, streak: "W4", conference: "West" },
  { id: "8", slug: "bangkok-blaze", name: "Bangkok Blaze", city: "Bangkok", country: "Thailand", abbr: "BKK", coach: "Somchai Thongdee", arena: "Rajamangala Court", color: "#8A3FFF", color2: "#0D0D0D", wins: 23, losses: 11, pf: 3280, pa: 3160, streak: "W2", conference: "West" },
  { id: "9", slug: "singapore-slam", name: "Singapore Slam", city: "Singapore", country: "Singapore", abbr: "SGP", coach: "Wei Ming Lee", arena: "Kallang Stadium", color: "#6B1FEF", color2: "#0D0D0D", wins: 21, losses: 13, pf: 3200, pa: 3170, streak: "L1", conference: "West" },
  { id: "10", slug: "mumbai-monsoon", name: "Mumbai Monsoon", city: "Mumbai", country: "India", abbr: "MUM", coach: "Rajesh Kumar", arena: "Mumbai Dome", color: "#9B4DFF", color2: "#0D0D0D", wins: 19, losses: 15, pf: 3120, pa: 3180, streak: "W1", conference: "West" },
  { id: "11", slug: "beijing-phoenix", name: "Beijing Phoenix", city: "Beijing", country: "China", abbr: "BEI", coach: "Zhang Wei", arena: "Wukesong Arena", color: "#A855F7", color2: "#0D0D0D", wins: 15, losses: 19, pf: 3000, pa: 3100, streak: "L3", conference: "West" },
  { id: "12", slug: "hanoi-hornets", name: "Hanoi Hornets", city: "Hanoi", country: "Vietnam", abbr: "HAN", coach: "Nguyen Van", arena: "My Dinh Arena", color: "#7B2EFF", color2: "#0D0D0D", wins: 12, losses: 22, pf: 2900, pa: 3200, streak: "L4", conference: "West" },
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
      homeScore: 85 + ((i * 7) % 30), awayScore: 80 + ((i * 11) % 30),
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
};

export const news: NewsArticle[] = [
  { id: "n1", title: "Tokyo Thunder extend win streak to 7 games", date: "2026-07-25", summary: "The reigning champions continue their dominant run with a statement road win against Shanghai.", category: "Recap", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800" },
  { id: "n2", title: "ABA announces expansion talks with two new cities", date: "2026-07-22", summary: "The league is in advanced discussions to add franchises in Kuala Lumpur and Dubai for the 2027 season.", category: "League", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800" },
  { id: "n3", title: "All-Star Weekend voting opens next month", date: "2026-07-20", summary: "Fans across Asia will get to select the starters for the ABA All-Star Game in Singapore.", category: "Events", image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800" },
  { id: "n4", title: "Mavericks' rookie sensation drops 40 in win", date: "2026-07-18", summary: "Manila's first-round pick is redefining rookie expectations across the league.", category: "Players", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800" },
  { id: "n5", title: "Playoffs picture heats up as season winds down", date: "2026-07-15", summary: "Just three games separate the 4th and 9th seeds in the East. Every night matters.", category: "Standings", image: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=800" },
  { id: "n6", title: "Global broadcast deal reaches 40 territories", date: "2026-07-12", summary: "ABA games are now available in more countries than ever before.", category: "Business", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800" },
];

export const sponsors = [
  "Nike", "Adidas", "Under Armour", "Wilson", "Spalding", "Gatorade", "Red Bull", "Samsung", "Sony", "Toyota",
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