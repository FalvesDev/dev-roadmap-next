"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { phases } from "@/lib/roadmap-data";
import { descriptions } from "@/lib/topic-descriptions";
import type { CheckItem } from "@/lib/roadmap-data";

const STORAGE_KEY = "roadmap_checks_v1";

const difficultyConfig = {
  easy:   { label: "fácil",   className: "text-[#545460] bg-[#222226] border border-[#333338]" },
  medium: { label: "médio",   className: "text-[#78716c] bg-[#1c1814] border border-[#2d2620]" },
  hard:   { label: "difícil", className: "text-[#7f5c5c] bg-[#1c1414] border border-[#2d1f1f]" },
};

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveChecks(checks: Record<string, boolean>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
}

export function ChecklistSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => { setChecks(loadChecks()); }, []);

  function toggle(id: string) {
    const next = { ...checks, [id]: !checks[id] };
    setChecks(next);
    saveChecks(next);
  }

  const phase = phases[activeTab];

  return (
    <section id="checklist" className="mb-12">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-[#ededf0]">Checklist de aprendizado</h2>
      </div>
      <p className="text-sm text-[#6b6b75] mb-6 leading-relaxed">
        Clique em qualquer item para ler a explicação completa do conceito.
        Clique no checkbox para marcar como concluído.
      </p>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6 flex-wrap border-b border-[#222226] pb-4">
        {phases.map((p, i) => {
          const items = p.cards.flatMap(c => c.items);
          const done  = items.filter(it => checks[it.id]).length;
          const pct   = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
          const isActive = activeTab === i;
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(i)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[#1e1e23] text-[#ededf0] border border-[#2e2e35]"
                  : "text-[#6b6b75] hover:text-[#b0b0ba] hover:bg-[#181820] border border-transparent"
              }`}
            >
              {p.number}
              {pct > 0 && (
                <span className={`ml-1.5 text-[9px] font-semibold ${isActive ? "text-[#6d5ef5]" : "text-[#545460]"}`}>
                  {pct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {phase.cards.map((card) => {
          const total = card.items.length;
          const done  = card.items.filter((it) => checks[it.id]).length;
          return (
            <div key={card.title} className="bg-[#16161a] border border-[#242428] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[#222226] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-[#ededf0]">{card.title}</h3>
                  <p className="text-[11px] text-[#6b6b75] mt-0.5">{card.subtitle}</p>
                </div>
                <span className="text-[10px] text-[#545460] shrink-0 ml-2 tabular-nums">{done}/{total}</span>
              </div>
              <div className="h-px bg-[#222226]">
                <div
                  className="h-px bg-[#6d5ef5] transition-all duration-500"
                  style={{ width: total > 0 ? `${(done / total) * 100}%` : "0%" }}
                />
              </div>
              <div>
                {card.items.map((item) => (
                  <CheckRow
                    key={item.id}
                    item={item}
                    checked={!!checks[item.id]}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CheckRow({ item, checked, onToggle }: {
  item: CheckItem;
  checked: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  const diff = difficultyConfig[item.difficulty];
  const desc = descriptions[item.id];

  return (
    <div className="border-b border-[#202024] last:border-0">
      <div className="flex items-start gap-3 px-4 py-3 group hover:bg-[#17171c] transition-colors">
        {/* Checkbox */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all ${
            checked
              ? "bg-[#16a34a] border-[#16a34a]"
              : "border-[#333338] hover:border-[#545460] bg-transparent"
          }`}
        >
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
              <path d="M1.5 5L4 7.5L8.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Text */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setOpen(!open)}>
          <p className={`text-sm leading-snug transition-colors ${
            checked ? "line-through text-[#545460]" : "text-[#dedee2] group-hover:text-[#ededf0]"
          }`}>
            {item.label}
          </p>
          <p className="text-[11px] text-[#545460] mt-0.5">{item.meta}</p>
        </div>

        {/* Right badges */}
        <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${diff.className}`}>
            {diff.label}
          </span>
          {desc && (
            <button
              onClick={() => setOpen(!open)}
              className="w-5 h-5 flex items-center justify-center rounded text-[#545460] hover:text-[#8a8a96] hover:bg-[#222226] transition-colors"
              aria-label="Expandir explicação"
            >
              <ChevronDown
                size={12}
                strokeWidth={2}
                className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Expanded description */}
      {open && desc && (
        <div className="px-4 pb-5 pt-1 bg-[#121218] border-t border-[#202024]">
          <div className="pt-4 space-y-4">
            <DescBlock label="O que é" color="#6d5ef5" text={desc.what} />
            <DescBlock label="Por que importa" color="#f59e0b" text={desc.why} />
            <DescBlock label="Como funciona" color="#16a34a" text={desc.how} />
            {desc.example && (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3b82f6] mb-2">Exemplo</p>
                <pre className="text-[11px] text-[#93c5fd] bg-[#0a0f1a] border border-[#1e2d3d] rounded-lg p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
                  {desc.example}
                </pre>
              </div>
            )}
            {desc.tip && (
              <div className="flex gap-3 bg-[#111108] border border-[#2a2510] rounded-lg px-3 py-2.5">
                <span className="text-xs text-[#ca8a04] flex-shrink-0 mt-px font-semibold">Dica</span>
                <p className="text-xs text-[#a8935c] leading-relaxed">{desc.tip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DescBlock({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ color }}>
        {label}
      </p>
      <p className="text-sm text-[#b0b0ba] leading-relaxed">{text}</p>
    </div>
  );
}
