import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/matches", label: "Matches" },
  { to: "/standings", label: "Standings" },
  { to: "/playoffs", label: "Playoffs" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/teams", label: "Teams" },
  { to: "/archive", label: "Archive" },
];

const socials = [
  { icon: MessageCircle, href: "https://discord.gg/gECqspjwzp", label: "Discord" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center font-black text-white text-sm shadow-glow group-hover:scale-110 transition-transform">
            ABA
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-bold text-sm tracking-tight">ABA</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Asia Basketball</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-white/5 transition-colors"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground rounded-lg bg-white/10" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="p-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-white/5 transition-all hover:scale-110"
            >
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-white/5 animate-fade-up">
          <nav className="flex flex-col p-4 gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-white/10"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 mt-2 border-t border-white/10">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="p-2 rounded-lg hover:bg-white/10">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}