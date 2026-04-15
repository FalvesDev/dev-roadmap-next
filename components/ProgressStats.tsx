"use client";

import { useEffect, useState } from "react";
import { phases } from "@/lib/roadmap-data";

const STORAGE_KEY = "roadmap_checks_v1";
const STREAK_KEY  = "roadmap_streak_v1";

interface StreakData { totalDays: number; currentStreak: number; }

export function ProgressStats() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState<StreakData>({ totalDays: 0, currentStreak: 0 });

  useEffect(() => {
    function load() {
      try { setChecks(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")); } catch {}
      try { setStreak(JSON.parse(localStorage.getItem(STREAK_KEY)  || "{}")); } catch {}
    }
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const all   = phases.flatMap((p) => p.cards.flatMap((c) => c.items));
  const total = all.length;
  const done  = all.filter((i) => checks[i.id]).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

  let estimate = "";
  if (done > 0 && streak.totalDays > 0) {
    const pace      = done / streak.totalDays;
    const remaining = total - done;
    const weeksLeft = Math.ceil(Math.ceil(remaining / pace) / 5);
    if      (weeksLeft <= 1)  estimate = "~1 sem.";
    else if (weeksLeft < 52)  estimate = `~${weeksLeft} sem.`;
    else                      estimate = ">1 ano";
  }

  let activePhaseLabel = "Fase 1";
  for (let i = phases.length - 1; i >= 0; i--) {
    const phaseItems = phases[i].cards.flatMap((c) => c.items);
    const phaseDone  = phaseItems.filter((it) => checks[it.id]).length;
    if (phaseDone > 0) {
      activePhaseLabel = phaseDone === phaseItems.length && i < phases.length - 1
        ? `Fase ${i + 2}`
        : `Fase ${i + 1}`;
      break;
    }
  }

  const stats: { label: string; value: string; sub: string; color: string; icon: string }[] = [
    { label: "Progresso",      value: `${pct}%`,        sub: `${done} de ${total} itens`,              color: "#10b981", icon: "▸" },
    { label: "Fase atual",     value: activePhaseLabel, sub: done > 0 ? "em andamento" : "não iniciada", color: "#7c3aed", icon: "◈" },
    { label: "Dias estudados", value: `${streak.totalDays}`,
                                                         sub: `${streak.currentStreak} dias seguidos`,   color: "#3b82f6", icon: "◉" },
    {
      label: estimate ? "Para concluir" : "Duração",
      value: estimate || "9mo",
      sub:   estimate ? "no seu ritmo atual" : "1–2h por dia",
      color: "#f59e0b",
      icon:  "◆",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="stat-card rounded-xl p-4 animate-fade-in-up"
          style={{ animationDelay: `${i * 0.07}s` }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-between mb-3">
            <p className="mono-label" style={{ color: "#404060" }}>{s.label}</p>
            <span className="text-[11px]" style={{ color: `${s.color}60` }}>{s.icon}</span>
          </div>
          {/* Big number */}
          <p
            className="text-[1.8rem] font-black leading-none tabular-nums mb-1"
            style={{ color: s.color, textShadow: `0 0 24px ${s.color}40` }}
          >
            {s.value}
          </p>
          <p className="text-[11px] leading-snug" style={{ color: "#606080" }}>{s.sub}</p>

          {/* Progress bar for "Progresso" card */}
          {s.label === "Progresso" && (
            <div className="mt-3 h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, #10b98188, #10b981)`,
                  boxShadow: pct > 0 ? "0 0 8px #10b98160" : "none",
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
