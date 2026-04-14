"use client";

import { useEffect, useState } from "react";
import { phases } from "@/lib/roadmap-data";

const STORAGE_KEY = "roadmap_checks_v1";

export function ProgressStats() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function load() {
      try { setChecks(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")); }
      catch { setChecks({}); }
    }
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const all = phases.flatMap((p) => p.cards.flatMap((c) => c.items));
  const total = all.length;
  const done = all.filter((i) => checks[i.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const stats = [
    { label: "Fases",      value: "5",    sub: "do zero ao júnior",  color: "#7c6af7" },
    { label: "Duração",    value: "9",    sub: "meses (1–2h/dia)",   color: "#3b82f6" },
    { label: "Progresso",  value: `${pct}%`, sub: `${done} de ${total} itens`, color: "#10b981" },
    { label: "Projetos",   value: "3+",   sub: "para o portfólio",   color: "#f59e0b" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="bg-[#16161e] border border-[#222228] rounded-xl p-4 card-hover animate-fade-in-up"
          style={{ animationDelay: `${i * 0.07}s`, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#909098] mb-2">{s.label}</p>
          <p className="text-2xl font-bold mb-0.5" style={{ color: s.color, textShadow: `0 0 20px ${s.color}40` }}>{s.value}</p>
          <p className="text-[11px] text-[#808098]">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
