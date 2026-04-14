"use client";

import { useState, useMemo } from "react";
import { articles, allTags } from "@/lib/articles-data";
import type { ArticleTag } from "@/lib/articles-data";

const typeIcon: Record<string, string> = {
  article: "📄",
  video: "🎥",
  docs: "📚",
  book: "📖",
  course: "🎓",
  tool: "🔧",
};

const typeColor: Record<string, string> = {
  article: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  video: "bg-red-500/15 text-red-400 border-red-500/30",
  docs: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  book: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  course: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  tool: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
};

const levelColor: Record<string, string> = {
  "iniciante": "text-emerald-400",
  "intermediário": "text-amber-400",
  "avançado": "text-red-400",
};

export function ArticlesSection() {
  const [activeTag, setActiveTag] = useState<ArticleTag | "all">("all");
  const [langFilter, setLangFilter] = useState<"all" | "pt" | "en">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (activeTag !== "all" && !a.tags.includes(activeTag)) return false;
      if (langFilter !== "all" && a.lang !== langFilter) return false;
      if (freeOnly && !a.free) return false;
      if (search) {
        const q = search.toLowerCase();
        return a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeTag, langFilter, freeOnly, search]);

  return (
    <section id="artigos" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Leituras & Recursos</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-500/20 text-violet-400">
          {filtered.length} itens
        </span>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-4 mb-5 space-y-3">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">🔍</span>
          <input
            type="text"
            placeholder="Buscar recurso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-[#2e2e2e] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#555] focus:outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActiveTag(tag.value as ArticleTag | "all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                activeTag === tag.value
                  ? "bg-violet-600 text-white"
                  : "bg-[#222] text-[#888] hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Extra filters row */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-1.5">
            {(["all", "pt", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                  langFilter === l
                    ? "border-violet-500 bg-violet-500/20 text-violet-300"
                    : "border-[#2e2e2e] text-[#666] hover:text-white"
                }`}
              >
                {l === "all" ? "🌐 Todos" : l === "pt" ? "🇧🇷 PT-BR" : "🇺🇸 EN"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFreeOnly(!freeOnly)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors border ${
              freeOnly
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                : "border-[#2e2e2e] text-[#666] hover:text-white"
            }`}
          >
            {freeOnly ? "✓" : ""} Só gratuitos
          </button>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[#555]">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-sm">Nenhum recurso encontrado para esse filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((article) => (
            <a
              key={article.id}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-4 hover:border-violet-500/50 transition-all hover:-translate-y-0.5 duration-200 block"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{typeIcon[article.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#777] leading-relaxed mb-2.5 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${typeColor[article.type]}`}>
                      {article.type.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-semibold ${levelColor[article.level]}`}>
                      {article.level}
                    </span>
                    <span className="text-[10px] text-[#555]">
                      {article.lang === "pt" ? "🇧🇷 PT-BR" : "🇺🇸 EN"}
                    </span>
                    {article.free ? (
                      <span className="text-[10px] text-emerald-500 font-semibold">GRÁTIS</span>
                    ) : (
                      <span className="text-[10px] text-amber-500 font-semibold">PAGO</span>
                    )}
                  </div>
                </div>
                <span className="text-[#555] group-hover:text-violet-400 transition-colors text-lg flex-shrink-0">↗</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
