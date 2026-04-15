"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { phases } from "@/lib/roadmap-data";
import { articles } from "@/lib/articles-data";
import { resourceCards } from "@/lib/roadmap-data";
import { X, Search } from "lucide-react";

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

  for (const a of articles) {
    results.push({
      id: `art-${a.id}`,
      title: a.title,
      subtitle: a.description,
      category: `Leituras · ${a.tags[0]}`,
      href: a.href,
    });
  }

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

  const openSearch = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") closeSearch();
    };
    const eventHandler = () => openSearch();

    window.addEventListener("keydown", keyHandler);
    document.addEventListener("open-search", eventHandler as EventListener);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      document.removeEventListener("open-search", eventHandler as EventListener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        onClick={closeSearch}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in"
        style={{ background: "#13131a", border: "1px solid #2a2a3a", boxShadow: "0 24px 64px rgba(0,0,0,0.7)" }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #1e1e2a" }}>
          <Search size={15} style={{ color: "#606070", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar tópico, artigo ou ferramenta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm focus:outline-none"
            style={{ color: "#ededf4" }}
          />
          <button
            onClick={closeSearch}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-colors"
            style={{ background: "#1e1e2a", border: "1px solid #2a2a38", color: "#606070" }}
          >
            <X size={10} /> ESC
          </button>
        </div>

        {/* Results */}
        {query ? (
          <div className="max-h-72 overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm" style={{ color: "#606070" }}>
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
                    onClick={closeSearch}
                    className="flex items-start gap-3 px-4 py-3 transition-colors group"
                    style={{ borderBottom: "1px solid #1a1a22" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1a1a26"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <span className="text-sm mt-0.5 flex-shrink-0" style={{ color: r.href ? "#7c6af7" : "#606070" }}>
                      {r.href ? "↗" : "→"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate transition-colors" style={{ color: "#dcdce4" }}>
                        {r.title}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "#606070" }}>{r.subtitle}</p>
                    </div>
                    <span className="text-[10px] flex-shrink-0 mt-1" style={{ color: "#484858" }}>
                      {r.category}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 py-5 text-center text-xs" style={{ color: "#505060" }}>
            Digite para buscar entre {index.length} itens do roadmap
            <div className="flex items-center justify-center gap-3 mt-3">
              {["Python OOP", "Docker", "React Hooks", "FastAPI"].map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-2.5 py-1 rounded-md text-[11px] transition-colors"
                  style={{ background: "#1a1a26", border: "1px solid #252535", color: "#7c6af7" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-2 flex items-center gap-4" style={{ borderTop: "1px solid #1a1a22", background: "#111118" }}>
          <span className="text-[10px]" style={{ color: "#484858" }}>
            <kbd className="px-1 rounded" style={{ background: "#1e1e2a", border: "1px solid #2a2a38" }}>↑↓</kbd> navegar
          </span>
          <span className="text-[10px]" style={{ color: "#484858" }}>
            <kbd className="px-1 rounded" style={{ background: "#1e1e2a", border: "1px solid #2a2a38" }}>↵</kbd> abrir
          </span>
          <span className="text-[10px]" style={{ color: "#484858" }}>
            <kbd className="px-1 rounded" style={{ background: "#1e1e2a", border: "1px solid #2a2a38" }}>Esc</kbd> fechar
          </span>
        </div>
      </div>
    </div>
  );
}
