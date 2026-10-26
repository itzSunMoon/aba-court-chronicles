import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">League</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About ABA</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">History</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Competition</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/matches" className="hover:text-foreground transition-colors">Matches</Link></li>
              <li><Link to="/standings" className="hover:text-foreground transition-colors">Standings</Link></li>
              <li><Link to="/playoffs" className="hover:text-foreground transition-colors">Playoffs</Link></li>
              <li><Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link to="/teams" className="hover:text-foreground transition-colors">Teams</Link></li>
              <li><Link to="/archive" className="hover:text-foreground transition-colors">Archive</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Social</h3>
            <div className="flex gap-2">
              <a href="https://discord.gg/gECqspjwzp" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="p-2 rounded-lg glass hover:bg-primary/20 hover:scale-110 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-6 text-xs text-muted-foreground leading-relaxed">
              The premier basketball league across Asia.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center font-black text-white text-xs">
              ABA
            </div>
            <span className="text-xs text-muted-foreground">© 2026 Asia Basketball Association. All Rights Reserved.</span>
          </div>
          <div className="text-xs text-muted-foreground">Made with passion across Asia</div>
        </div>
      </div>
    </footer>
  );
}