import type { NewsArticle } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group glass rounded-2xl overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all">
      <div className="aspect-[16/10] overflow-hidden bg-muted relative">
        {article.video ? (
          <iframe
            src={`https://www.youtube.com/embed/${article.video}`}
            title={article.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </>
        )}
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider pointer-events-none">
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <div className="text-[11px] text-muted-foreground uppercase tracking-widest">
          {new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <h3 className="mt-2 font-bold leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
        <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}