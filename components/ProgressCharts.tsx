"use client";

import { useEffect, useState } from "react";
import { phases } from "@/lib/roadmap-data";

const STORAGE_KEY = "roadmap_checks_v1";

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

function clean(s: string) {
  return s.replace(/^\S+\s/, "");
}

function DonutRing({
  pct,
  color,
  size = 80,
  stroke = 7,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#232327" strokeWidth={stroke} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 4px ${color}60)` }}
      />
    </svg>
  );
}

export function ProgressCharts() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = () => setChecks(loadChecks());
    load();
    const interval = setInterval(load, 1500);
    return () => clearInterval(interval);
  }, []);

  const allItems = phases.flatMap((p) => p.cards.flatMap((c) => c.items));
  const totalDone = allItems.filter((i) => checks[i.id]).length;
  const totalAll = allItems.length;
  const overallPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  const phaseStats = phases.map((p) => {
    const items = p.cards.flatMap((c) => c.items);
    const done = items.filter((i) => checks[i.id]).length;
    const total = items.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { ...p, done, total, pct };
  });

  const activeIdx = phaseStats.findIndex((p) => p.pct < 100);

  const diffStats = [
    { diff: "easy",   label: "Fáceis",   color: "#16a34a", track: "#1a2e1f" },
    { diff: "medium", label: "Médios",   color: "#ca8a04", track: "#2a2210" },
    { diff: "hard",   label: "Difíceis", color: "#dc2626", track: "#2a1515" },
  ] as const;

  return (
    <section id="progresso" className="mb-12">
      <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-[#e8e8f0]">Seu progresso</h2>
        <div className="flex items-center gap-1.5 text-[10px] text-[#909098] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] glow-dot" />
          ao vivo
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Overall donut */}
        <div className="bg-[#141416] border border-[#242428] rounded-xl p-6 flex flex-col items-center justify-center gap-4 card-hover animate-fade-in-up">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#909098]">
            Total concluído
          </p>
          <div className="relative">
            <DonutRing pct={overallPct} color="#6d5ef5" size={110} stroke={10} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#e8e8f0] leading-none">{overallPct}%</span>
              <span className="text-[9px] text-[#909098] mt-0.5">{totalDone}/{totalAll}</span>
            </div>
          </div>
          {overallPct === 0 && (
            <p className="text-[10px] text-[#909098] text-center">Marque itens no checklist para começar</p>
          )}
          {overallPct > 0 && overallPct < 100 && (
            <p className="text-[10px] text-[#909098]">Faltam {totalAll - totalDone} tópicos</p>
          )}
          {overallPct === 100 && (
            <p className="text-[10px] text-[#16a34a] font-semibold">Roadmap completo!</p>
          )}
        </div>

        {/* Phase rings + bars */}
        <div className="md:col-span-2 bg-[#141416] border border-[#242428] rounded-xl p-5 card-hover animate-fade-in-up stagger-1">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#909098] mb-5">
            Por fase
          </p>

          {/* Mini donuts */}
          <div className="flex justify-around gap-2 mb-5 flex-wrap">
            {phaseStats.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-1.5">
                <div className="relative inline-flex items-center justify-center">
                  <DonutRing pct={p.pct} color={p.color} size={60} stroke={5} />
                  <span className="absolute text-[10px] font-semibold" style={{ color: p.pct > 0 ? p.color : "#808090" }}>{p.pct}%</span>
                </div>
                <span className="text-[9px] text-center max-w-[56px] leading-tight text-[#909098]">
                  {clean(p.title)}
                </span>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="space-y-3">
            {phaseStats.map((p, i) => (
              <div key={p.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color, boxShadow: `0 0 4px ${p.color}80` }} />
                    <span className="text-xs text-[#b0b0bc]">{clean(p.title)}</span>
                    {i === activeIdx && totalDone < totalAll && (
                      <span className="text-[9px] px-1.5 py-px rounded bg-[#1e1c30] text-[#8b7cf8] border border-[#2e2a4a]">
                        atual
                      </span>
                    )}
                    {p.pct === 100 && (
                      <span className="text-[9px] text-[#16a34a]">concluída</span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium tabular-nums" style={{ color: p.pct > 0 ? p.color : "#606070" }}>
                    {p.done}/{p.total}
                  </span>
                </div>
                <div className="h-1.5 bg-[#222226] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${p.pct}%`,
                      background: p.color,
                      boxShadow: p.pct > 0 ? `0 0 6px ${p.color}60` : "none",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="grid grid-cols-3 gap-3">
        {diffStats.map(({ diff, label, color, track }, i) => {
          const items = allItems.filter((it) => it.difficulty === diff);
          const done = items.filter((it) => checks[it.id]).length;
          const pct = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
          return (
            <div key={diff} className="bg-[#141416] border border-[#242428] rounded-xl p-4 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-[#909098]">{label}</span>
                <span className="text-[10px] font-semibold" style={{ color: pct > 0 ? color : "#606070" }}>{pct}%</span>
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: pct > 0 ? color : "#707080" }}>
                {done}
                <span className="text-sm font-normal text-[#909098]">/{items.length}</span>
              </p>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: track }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color, boxShadow: pct > 0 ? `0 0 4px ${color}60` : "none" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
