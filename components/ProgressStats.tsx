"use client";

import { useEffect, useState } from "react";
import { phases } from "@/lib/roadmap-data";

const STORAGE_KEY = "roadmap_checks_v1";
const STREAK_KEY = "roadmap_streak_v1";

interface StreakData { totalDays: number; currentStreak: number; }

export function ProgressStats() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState<StreakData>({ totalDays: 0, currentStreak: 0 });

  useEffect(() => {
    function load() {
      try { setChecks(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")); } catch {}
      try { setStreak(JSON.parse(localStorage.getItem(STREAK_KEY) || "{}")); } catch {}
    }
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const all = phases.flatMap((p) => p.cards.flatMap((c) => c.items));
  const total = all.length;
  const done = all.filter((i) => checks[i.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  // Completion estimate
  let estimate = "";
  if (done > 0 && streak.totalDays > 0) {
    const pace = done / streak.totalDays; // items per study day
    const remaining = total - done;
    const daysLeft = Math.ceil(remaining / pace);
    const weeksLeft = Math.ceil(daysLeft / 5); // assuming ~5 study days/week
    if (weeksLeft <= 1) estimate = "~1 semana";
    else if (weeksLeft < 52) estimate = `~${weeksLeft} sem.`;
    else estimate = ">1 ano";
  }

  // Find current active phase
  let activePhaseLabel = "Fase 1";
  for (let i = phases.length - 1; i >= 0; i--) {
    const phaseItems = phases[i].cards.flatMap((c) => c.items);
    const phaseDone = phaseItems.filter((it) => checks[it.id]).length;
    if (phaseDone > 0) {
      // check if complete
      if (phaseDone === phaseItems.length && i < phases.length - 1) {
        activePhaseLabel = `Fase ${i + 2}`;
      } else {
        activePhaseLabel = `Fase ${i + 1}`;
      }
      break;
    }
  }

  const stats = [
    { label: "Progresso",   value: `${pct}%`,      sub: `${done} de ${total} itens`,    color: "#10b981" },
    { label: "Fase atual",  value: activePhaseLabel, sub: done > 0 ? "em andamento" : "não iniciada", color: "#7c6af7" },
    { label: "Dias estudados", value: `${streak.totalDays}`, sub: `${streak.currentStreak} dias seguidos`, color: "#3b82f6" },
    {
      label: estimate ? "Para concluir" : "Duração",
      value: estimate || "9",
      sub: estimate ? "no seu ritmo atual" : "meses (1–2h/dia)",
      color: "#f59e0b",
    },
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
