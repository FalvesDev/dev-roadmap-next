"use client";

import { useState, useEffect, useCallback } from "react";
import { Flame, Calendar, Trophy } from "lucide-react";

interface StreakData {
  lastDate: string;       // "YYYY-MM-DD"
  currentStreak: number;
  bestStreak: number;
  history: string[];      // array of "YYYY-MM-DD"
  totalDays: number;
}

const STORAGE_KEY = "roadmap_streak_v1";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function loadData(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lastDate: "", currentStreak: 0, bestStreak: 0, history: [], totalDays: 0 };
}

function saveData(d: StreakData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}

// Generate last 35 days for the mini calendar
function getLast35Days(): string[] {
  const days: string[] = [];
  for (let i = 34; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export function StreakTracker() {
  const [data, setData] = useState<StreakData | null>(null);
  const [justMarked, setJustMarked] = useState(false);

  useEffect(() => {
    setData(loadData());
  }, []);

  const studiedToday = data?.history.includes(todayStr()) ?? false;

  const markToday = useCallback(() => {
    const today = todayStr();
    const yesterday = yesterdayStr();

    setData((prev) => {
      const d = prev ?? { lastDate: "", currentStreak: 0, bestStreak: 0, history: [], totalDays: 0 };

      if (d.history.includes(today)) return d; // already marked

      const newHistory = [...d.history, today];
      const continuedStreak = d.lastDate === yesterday || d.lastDate === today;
      const newStreak = continuedStreak ? d.currentStreak + 1 : 1;
      const newBest = Math.max(d.bestStreak, newStreak);

      const updated: StreakData = {
        lastDate: today,
        currentStreak: newStreak,
        bestStreak: newBest,
        history: newHistory,
        totalDays: d.totalDays + 1,
      };
      saveData(updated);
      return updated;
    });
    setJustMarked(true);
    setTimeout(() => setJustMarked(false), 2000);
  }, []);

  if (!data) return null;

  const days35 = getLast35Days();
  const streakColor = data.currentStreak >= 7 ? "#f97316" : data.currentStreak >= 3 ? "#f59e0b" : "#6d5ef5";

  return (
    <div
      className="rounded-xl p-5 card-hover animate-fade-in-up"
      style={{ background: "#16161e", border: "1px solid #222228" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={14} color={streakColor} strokeWidth={1.5} />
          <h3 className="text-sm font-semibold text-[#dcdce4]">Sequência de estudos</h3>
        </div>
        {data.currentStreak >= 7 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "#2a1a00", color: "#f97316", border: "1px solid #f9741630" }}>
            🔥 Em chamas!
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center">
          <p className="text-2xl font-bold tabular-nums" style={{ color: streakColor }}>
            {data.currentStreak}
          </p>
          <p className="text-[10px] text-[#707080] mt-0.5">dias seguidos</p>
        </div>
        <div className="text-center border-x border-[#1e1e28]">
          <div className="flex items-center justify-center gap-1">
            <Trophy size={12} color="#f59e0b" />
            <p className="text-2xl font-bold tabular-nums text-[#f59e0b]">{data.bestStreak}</p>
          </div>
          <p className="text-[10px] text-[#707080] mt-0.5">recorde</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold tabular-nums text-[#a0a0b0]">{data.totalDays}</p>
          <p className="text-[10px] text-[#707080] mt-0.5">total de dias</p>
        </div>
      </div>

      {/* Mini heatmap — last 35 days in 5 rows × 7 cols */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Calendar size={11} color="#606070" />
          <p className="text-[10px] text-[#606070]">últimos 35 dias</p>
        </div>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
        >
          {days35.map((day) => {
            const studied = data.history.includes(day);
            const isToday = day === todayStr();
            return (
              <div
                key={day}
                title={day}
                className="rounded-sm aspect-square"
                style={{
                  background: studied
                    ? streakColor
                    : isToday
                    ? "#1e1e2a"
                    : "#13131a",
                  opacity: studied ? 1 : 0.6,
                  outline: isToday ? `1px solid ${streakColor}60` : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={markToday}
        disabled={studiedToday}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
        style={{
          background: studiedToday
            ? "#1a2a1a"
            : justMarked
            ? "#10b98120"
            : `${streakColor}20`,
          color: studiedToday ? "#4a7a4a" : justMarked ? "#10b981" : streakColor,
          border: `1px solid ${studiedToday ? "#1e3a1e" : `${streakColor}40`}`,
          cursor: studiedToday ? "default" : "pointer",
        }}
      >
        {studiedToday
          ? "✓ Registrado hoje"
          : justMarked
          ? "🎉 +1 dia!"
          : "Estudei hoje"}
      </button>

      {!studiedToday && data.currentStreak > 0 && (
        <p className="text-[10px] text-center text-[#606070] mt-2">
          Marque hoje para manter sua sequência de {data.currentStreak} dias
        </p>
      )}
    </div>
  );
}
