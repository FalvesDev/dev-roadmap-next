"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { phases } from "@/lib/roadmap-data";
import { articles } from "@/lib/articles-data";
import { resourceCards } from "@/lib/roadmap-data";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  href?: string;
  section?: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Checklist items
  for (const phase of phases) {
    for (const card of phase.cards) {
      for (const item of card.items) {
        results.push({
          id: `check-${item.id}`,
          title: item.label,
          subtitle: item.meta,
          category: `${phase.number} · ${card.title}`,
          section: "#checklist",
        });
      }
    }
  }

  // Articles
  for (const a of articles) {
    results.push({
      id: `art-${a.id}`,
      title: a.title,
      subtitle: a.description,
      category: `Leituras · ${a.tags[0]}`,
      href: a.href,
    });
  }

  // Resources
  for (const card of resourceCards) {
    for (const item of card.items) {
      if (item.href) {
        results.push({
          id: `res-${item.label}`,
          title: item.label,
          subtitle: card.title,
          category: "Recursos",
          href: item.href,
        });
      }
    }
  }

  return results;
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, index]);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
        className="flex items-center gap-2.5 px-3 py-2 bg-[#1a1a1a] border border-[#2e2e2e] rounded-lg text-sm text-[#666] hover:border-[#444] hover:text-[#aaa] transition-colors w-full max-w-xs"
      >
        <span>🔍</span>
        <span className="flex-1 text-left">Buscar tópico ou recurso...</span>
        <kbd className="text-[10px] bg-[#222] border border-[#333] px-1.5 py-0.5 rounded text-[#555]">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => { setOpen(false); setQuery(""); }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#111] border border-[#2e2e2e] rounded-2xl shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2e2e2e]">
          <span className="text-[#555] text-lg">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar tópico, artigo ou ferramenta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#555] focus:outline-none"
          />
          <kbd
            onClick={() => { setOpen(false); setQuery(""); }}
            className="text-[10px] bg-[#222] border border-[#333] px-1.5 py-0.5 rounded text-[#666] cursor-pointer hover:text-white transition-colors"
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        {query && (
          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-[#555] text-sm">
                Nenhum resultado para &quot;{query}&quot;
              </div>
            ) : (
              <div className="py-1">
                {results.map((r) => (
                  <a
                    key={r.id}
                    href={r.href ?? r.section ?? "#"}
                    target={r.href ? "_blank" : undefined}
                    rel={r.href ? "noopener noreferrer" : undefined}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
                  >
                    <span className="text-base mt-0.5 flex-shrink-0">
                      {r.href ? "↗" : "→"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white group-hover:text-violet-300 transition-colors truncate font-medium">
                        {r.title}
                      </p>
                      <p className="text-xs text-[#666] truncate mt-0.5">{r.subtitle}</p>
                    </div>
                    <span className="text-[10px] text-[#555] flex-shrink-0 mt-1 group-hover:text-[#888]">
                      {r.category}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="px-4 py-6 text-center text-[#555] text-xs">
            Digite para buscar entre {index.length} itens do roadmap
          </div>
        )}
      </div>
    </div>
  );
}
