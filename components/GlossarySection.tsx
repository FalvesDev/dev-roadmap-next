"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { glossaryTerms, categoryMeta, type GlossaryCategory } from "@/lib/glossary-data";

function TermCard({ term, expanded, onToggle }: {
  term: typeof glossaryTerms[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  const meta = categoryMeta[term.category];
  return (
    <div
      className="rounded-xl border transition-all duration-150 cursor-pointer"
      style={{
        background: expanded ? "#16161e" : "#13131a",
        borderColor: expanded ? meta.color + "40" : "#222230",
      }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: meta.color + "18", color: meta.color }}
          >
            {meta.label}
          </span>
          <span className="text-sm font-semibold text-[#ededf4] truncate">{term.term}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:block text-xs text-[#606070] truncate max-w-[200px]">{term.short}</span>
          {expanded ? <ChevronUp size={14} className="text-[#606070]" /> : <ChevronDown size={14} className="text-[#606070]" />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <p className="text-sm text-[#a0a0b0] leading-relaxed mb-3">{term.detail}</p>
          {term.example && (
            <pre className="text-xs rounded-lg p-3 overflow-x-auto leading-relaxed" style={{ background: "#0d0d12", color: "#c0c0d8", border: "1px solid #252535" }}>
              {term.example}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export function GlossarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return glossaryTerms.filter((t) => {
      const matchCat = activeCategory === "all" || t.category === activeCategory;
      const matchQ = !q || t.term.toLowerCase().includes(q) || t.short.toLowerCase().includes(q) || t.detail.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, activeCategory]);

  const categories: Array<{ key: GlossaryCategory | "all"; label: string; color: string }> = [
    { key: "all", label: "Todos", color: "#9090b0" },
    ...Object.entries(categoryMeta).map(([k, v]) => ({ key: k as GlossaryCategory, label: v.label, color: v.color })),
  ];

  return (
    <section id="glossario">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <h2 className="text-base font-bold text-[#ededf4] flex-1">Glossário técnico</h2>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#404050]" />
          <input
            type="text"
            placeholder="Buscar termo…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-[#16161e] border border-[#252535] text-[#c0c0d8] placeholder-[#404050] outline-none focus:border-[#7c6af740] w-56"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all"
            style={{
              background: activeCategory === key ? color + "20" : "#1a1a26",
              color: activeCategory === key ? color : "#606070",
              border: `1px solid ${activeCategory === key ? color + "50" : "#252535"}`,
            }}
          >
            {label}
            {key !== "all" && (
              <span className="ml-1 opacity-60">
                ({glossaryTerms.filter((t) => t.category === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[11px] text-[#404050] mb-4">
        {filtered.length} {filtered.length === 1 ? "termo" : "termos"}
        {search && ` para "${search}"`}
      </p>

      {/* Terms list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-[#606070] text-center py-8">Nenhum termo encontrado.</p>
        ) : (
          filtered.map((t) => (
            <TermCard
              key={t.id}
              term={t}
              expanded={expandedId === t.id}
              onToggle={() => setExpandedId(expandedId === t.id ? null : t.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
