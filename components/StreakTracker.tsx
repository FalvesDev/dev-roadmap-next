"use client";

import { useState, useEffect, useCallback } from "react";
import { Flame, Trophy, ChevronDown } from "lucide-react";

interface StreakData {
  lastDate: string;
  currentStreak: number;
  bestStreak: number;
  history: string[];
  totalDays: number;
}

const STORAGE_KEY = "roadmap_streak_v1";

function todayStr()     { return new Date().toISOString().slice(0, 10); }
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadData(): StreakData {
  try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) return JSON.parse(raw); } catch {}
  return { lastDate: "", currentStreak: 0, bestStreak: 0, history: [], totalDays: 0 };
}
function saveData(d: StreakData) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }

function getLast35Days(): string[] {
  return Array.from({ length: 35 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (34 - i));
    return d.toISOString().slice(0, 10);
  });
}

export function StreakTracker() {
  const [data, setData]           = useState<StreakData | null>(null);
  const [justMarked, setJustMarked] = useState(false);
  const [showMap, setShowMap]     = useState(false);

  useEffect(() => { setData(loadData()); }, []);

  const studiedToday = data?.history.includes(todayStr()) ?? false;

  const markToday = useCallback(() => {
    const today     = todayStr();
    const yesterday = yesterdayStr();
    setData((prev) => {
      const d = prev ?? { lastDate: "", currentStreak: 0, bestStreak: 0, history: [], totalDays: 0 };
      if (d.history.includes(today)) return d;
      const newHistory       = [...d.history, today];
      const continuedStreak  = d.lastDate === yesterday || d.lastDate === today;
      const newStreak        = continuedStreak ? d.currentStreak + 1 : 1;
      const updated: StreakData = {
        lastDate: today, currentStreak: newStreak,
        bestStreak: Math.max(d.bestStreak, newStreak),
        history: newHistory, totalDays: d.totalDays + 1,
      };
      saveData(updated);
      return updated;
    });
    setJustMarked(true);
    setTimeout(() => setJustMarked(false), 2000);
  }, []);

  if (!data) return null;

  const streakColor = data.currentStreak >= 7 ? "#f97316" : data.currentStreak >= 3 ? "#f59e0b" : "#7c6af7";
  const days35 = getLast35Days();

  return (
    <div
      className="rounded-xl p-5 animate-fade-in-up"
      style={{ background: "#0e0e1c", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={14} color={streakColor} strokeWidth={1.5} />
          <h3 className="text-sm font-bold" style={{ color: "#dcdce4" }}>Sequência de estudos</h3>
        </div>
        {data.currentStreak >= 7 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "#2a1a00", color: "#f97316", border: "1px solid #f9741625" }}>
            🔥 Em chamas!
          </span>
        )}
      </div>

      {/* Compact stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { val: data.currentStreak, label: "seguidos",  color: streakColor,  icon: null },
          { val: data.bestStreak,    label: "recorde",   color: "#f59e0b",    icon: <Trophy size={11} color="#f59e0b" /> },
          { val: data.totalDays,     label: "total",     color: "#a0a0b0",    icon: null },
        ].map(({ val, label, color, icon }) => (
          <div key={label} className="text-center px-2 py-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center justify-center gap-1 mb-0.5">
              {icon}
              <p className="text-xl font-black tabular-nums leading-none" style={{ color }}>{val}</p>
            </div>
            <p className="text-[9px] mono-label" style={{ color: "#505068" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Mark today button */}
      <button
        onClick={markToday}
        disabled={studiedToday}
        className="w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 mb-3"
        style={{
          background:  studiedToday ? "rgba(34,197,94,0.08)"  : `${streakColor}18`,
          color:       studiedToday ? "#4a8a5a"               : justMarked ? "#10b981" : streakColor,
          border:      `1px solid ${studiedToday ? "rgba(34,197,94,0.2)" : `${streakColor}35`}`,
          cursor:      studiedToday ? "default" : "pointer",
        }}
      >
        {studiedToday ? "✓ Registrado hoje" : justMarked ? "🎉 +1 dia!" : "Marcar hoje como estudado"}
      </button>

      {/* Heatmap toggle */}
      <button
        onClick={() => setShowMap(v => !v)}
        className="flex items-center gap-1.5 w-full transition-colors"
        style={{ color: "#404060" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7060a0"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#404060"}
      >
        <ChevronDown
          size={11}
          style={{ transition: "transform 0.2s", transform: showMap ? "rotate(180deg)" : "rotate(0deg)" }}
        />
        <span className="mono-label">últimos 35 dias</span>
      </button>

      {showMap && (
        <div
          className="grid gap-[3px] mt-2 animate-fade-in"
          style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
        >
          {days35.map((day) => {
            const studied = data.history.includes(day);
            const isToday = day === todayStr();
            return (
              <div
                key={day}
                title={day}
                className="rounded-[3px] aspect-square"
                style={{
                  background: studied ? streakColor : isToday ? "#1e1e2a" : "#111118",
                  opacity: studied ? 1 : 0.55,
                  outline: isToday ? `1px solid ${streakColor}50` : "none",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
