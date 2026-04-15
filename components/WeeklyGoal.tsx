"use client";

import { useState, useEffect } from "react";
import { Target, ChevronDown } from "lucide-react";

const GOAL_KEY = "roadmap_weekly_goal_v1";
const POMODORO_KEY = "roadmap_pomodoro_v1";

interface GoalData {
  hoursPerWeek: number;
}

function getWeekKey(): string {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

function getWeekDates(): string[] {
  const today = new Date();
  const day = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

function getStudiedDays(): string[] {
  try {
    const streak = JSON.parse(localStorage.getItem("roadmap_streak_v1") || "{}");
    return streak.history ?? [];
  } catch {
    return [];
  }
}

function getPomodorosThisWeek(weekDates: string[]): number {
  try {
    const pomo = JSON.parse(localStorage.getItem(POMODORO_KEY) || "{}");
    if (pomo.lastDate && weekDates.includes(pomo.lastDate)) {
      return pomo.todaySessions ?? 0;
    }
  } catch { /* ignore */ }
  return 0;
}

export function WeeklyGoal() {
  const [goal, setGoal] = useState<GoalData>({ hoursPerWeek: 10 });
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("10");
  const [studiedDays, setStudiedDays] = useState<string[]>([]);
  const [pomodoros, setPomodoros] = useState(0);
  const weekDates = getWeekDates();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(GOAL_KEY) || "{}");
      if (saved.hoursPerWeek) {
        setGoal(saved);
        setInput(String(saved.hoursPerWeek));
      }
    } catch { /* ignore */ }
    setStudiedDays(getStudiedDays());
    setPomodoros(getPomodorosThisWeek(weekDates));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function save() {
    const h = Math.max(1, Math.min(40, parseInt(input) || 10));
    const g = { hoursPerWeek: h };
    setGoal(g);
    localStorage.setItem(GOAL_KEY, JSON.stringify(g));
    setEditing(false);
  }

  const weekStudied = weekDates.filter((d) => studiedDays.includes(d)).length;
  // Estimate: each studied day = goal/5 hours; each pomodoro = 25min
  const hoursFromDays = weekStudied * (goal.hoursPerWeek / 5);
  const hoursFromPomodoros = pomodoros * (25 / 60);
  const hoursLogged = Math.max(hoursFromDays, hoursFromPomodoros);
  const pct = Math.min(1, hoursLogged / goal.hoursPerWeek);

  const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="rounded-xl border border-[#222230] p-4 bg-[#13131a]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-[#7c6af7]" />
          <span className="text-xs font-semibold text-[#c0c0d8]">Meta semanal</span>
        </div>
        <button
          onClick={() => setEditing((e) => !e)}
          className="flex items-center gap-1 text-[10px] text-[#606070] hover:text-[#9090b0] transition-colors"
        >
          {goal.hoursPerWeek}h/sem <ChevronDown size={10} />
        </button>
      </div>

      {editing && (
        <div className="flex gap-2 mb-3 animate-fade-in">
          <input
            type="number"
            min={1} max={40}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-20 px-2 py-1 rounded-lg text-xs bg-[#16161e] border border-[#7c6af740] text-[#ededf4] outline-none"
            autoFocus
          />
          <span className="text-xs text-[#606070] self-center">horas / semana</span>
          <button
            onClick={save}
            className="ml-auto px-2.5 py-1 rounded-lg text-xs font-medium text-white transition-colors"
            style={{ background: "#7c6af7" }}
          >
            Salvar
          </button>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-[#606070] mb-1.5">
          <span>{hoursLogged.toFixed(1)}h registradas</span>
          <span>{Math.round(pct * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#1e1e2a] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct * 100}%`,
              background: pct >= 1 ? "#34d399" : "linear-gradient(90deg, #7c6af7, #a78bfa)",
            }}
          />
        </div>
      </div>

      {/* Day dots */}
      <div className="grid grid-cols-7 gap-1">
        {weekDates.map((d, i) => {
          const studied = studiedDays.includes(d);
          const isToday = d === today;
          const isPast = d < today;
          return (
            <div key={d} className="flex flex-col items-center gap-1">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-semibold transition-all"
                style={{
                  background: studied ? "#7c6af720" : isToday ? "#1e1e2a" : "transparent",
                  border: isToday ? "1px solid #7c6af740" : "1px solid transparent",
                  color: studied ? "#a78bfa" : isPast ? "#303038" : "#404050",
                }}
              >
                {studied ? "✓" : "·"}
              </div>
              <span className="text-[9px] text-[#404050]">{dayLabels[i]}</span>
            </div>
          );
        })}
      </div>

      {pct >= 1 && (
        <p className="text-center text-[11px] mt-3 font-medium" style={{ color: "#34d399" }}>
          Meta da semana concluída!
        </p>
      )}
    </div>
  );
}
