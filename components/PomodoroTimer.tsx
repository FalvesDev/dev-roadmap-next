"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";

const STREAK_KEY = "roadmap_streak_v1";
const POMODORO_KEY = "roadmap_pomodoro_v1";

interface PomodoroStats {
  todaySessions: number;
  totalSessions: number;
  lastDate: string;
}

function loadStats(): PomodoroStats {
  try {
    return JSON.parse(localStorage.getItem(POMODORO_KEY) || "{}");
  } catch {
    return { todaySessions: 0, totalSessions: 0, lastDate: "" };
  }
}

function saveSession() {
  const today = new Date().toISOString().slice(0, 10);
  const s = loadStats();
  const todaySessions = s.lastDate === today ? (s.todaySessions ?? 0) + 1 : 1;
  localStorage.setItem(
    POMODORO_KEY,
    JSON.stringify({ todaySessions, totalSessions: (s.totalSessions ?? 0) + 1, lastDate: today })
  );

  // mark streak day
  try {
    const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    if (streak.lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);
      const current = streak.lastDate === yStr ? (streak.currentStreak ?? 0) + 1 : 1;
      const best = Math.max(current, streak.bestStreak ?? 0);
      const history: string[] = streak.history ?? [];
      if (!history.includes(today)) history.push(today);
      localStorage.setItem(
        STREAK_KEY,
        JSON.stringify({ lastDate: today, currentStreak: current, bestStreak: best, history, totalDays: history.length })
      );
    }
  } catch { /* ignore */ }
}

const WORK_MINS = 25;
const BREAK_MINS = 5;

export function PomodoroTimer({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [seconds, setSeconds] = useState(WORK_MINS * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [stats, setStats] = useState<PomodoroStats>({ todaySessions: 0, totalSessions: 0, lastDate: "" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const playBeep = useCallback(() => {
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch { /* ignore */ }
  }, []);

  const switchMode = useCallback((nextMode: "work" | "break") => {
    setMode(nextMode);
    setSeconds(nextMode === "work" ? WORK_MINS * 60 : BREAK_MINS * 60);
    setRunning(false);
    playBeep();
  }, [playBeep]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            if (mode === "work") {
              saveSession();
              setSessions((n) => n + 1);
              setStats(loadStats());
              switchMode("break");
            } else {
              switchMode("work");
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode, switchMode]);

  function reset() {
    setRunning(false);
    setSeconds(mode === "work" ? WORK_MINS * 60 : BREAK_MINS * 60);
  }

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const total = mode === "work" ? WORK_MINS * 60 : BREAK_MINS * 60;
  const progress = 1 - seconds / total;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (1 - progress);

  const accent = mode === "work" ? "#7c6af7" : "#34d399";
  const bgAccent = mode === "work" ? "#1a1530" : "#0d2018";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-sm rounded-2xl border border-[#222230] p-8 text-center animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#404050] hover:text-[#9090b0] transition-colors">
          <X size={18} />
        </button>

        {/* Mode toggle */}
        <div className="flex justify-center gap-2 mb-6">
          {(["work", "break"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setRunning(false); setMode(m); setSeconds(m === "work" ? WORK_MINS * 60 : BREAK_MINS * 60); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: mode === m ? bgAccent : "#1a1a26",
                color: mode === m ? accent : "#606070",
                border: `1px solid ${mode === m ? accent + "40" : "#252535"}`,
              }}
            >
              {m === "work" ? <BookOpen size={12} /> : <Coffee size={12} />}
              {m === "work" ? "Foco 25min" : "Pausa 5min"}
            </button>
          ))}
        </div>

        {/* Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="140" height="140" className="-rotate-90">
              <circle cx="70" cy="70" r={radius} fill="none" stroke="#1e1e2a" strokeWidth="8" />
              <circle
                cx="70" cy="70" r={radius} fill="none"
                stroke={accent} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dash}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-mono font-bold text-[#ededf4]">{mins}:{secs}</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: accent }}>
                {mode === "work" ? "foco" : "pausa"}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: accent, color: "#fff" }}
          >
            {running ? <Pause size={15} /> : <Play size={15} />}
            {running ? "Pausar" : "Iniciar"}
          </button>
          <button
            onClick={reset}
            className="p-2.5 rounded-xl text-[#606070] hover:text-[#9090b0] transition-colors"
            style={{ background: "#1a1a26", border: "1px solid #252535" }}
          >
            <RotateCcw size={15} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: "Hoje",        value: stats.todaySessions  ?? 0 },
            { label: "Esta sessão", value: sessions },
            { label: "Total",       value: stats.totalSessions ?? 0 },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg py-2 px-1" style={{ background: "#1a1a26", border: "1px solid #252535" }}>
              <p className="text-lg font-bold text-[#ededf4]">{value}</p>
              <p className="text-[10px] text-[#606070]">{label}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#404050] mt-4">
          Cada pomodoro concluído conta como dia de estudo no streak
        </p>
      </div>
    </div>
  );
}
