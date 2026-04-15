"use client";

import { useState, useEffect } from "react";
import { X, Lock } from "lucide-react";
import { achievements, type AchievementState } from "@/lib/achievements-data";

const CHECKS_KEY   = "roadmap_checks_v1";
const STREAK_KEY   = "roadmap_streak_v1";
const NOTES_KEY    = "roadmap_notes_v1";
const POMO_KEY     = "roadmap_pomodoro_v1";
const PROJECTS_KEY = "roadmap_projects_v1";
const TOTAL_ITEMS  = 95;

// Rough phase lengths for phase completion detection
const PHASE_SIZES = [16, 18, 22, 21, 18]; // must sum to TOTAL_ITEMS (95)

function buildState(): AchievementState {
  try {
    const checks: Record<string, boolean> = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const notes: Record<string, string> = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    const pomo = JSON.parse(localStorage.getItem(POMO_KEY) || "{}");
    const projects: Record<string, boolean> = JSON.parse(localStorage.getItem(PROJECTS_KEY) || "{}");

    const totalChecked = Object.values(checks).filter(Boolean).length;
    const notesCount = Object.values(notes).filter((n) => n && (n as string).trim()).length;
    const pomodorosTotal = pomo.totalSessions ?? 0;
    const projectTasksDone = Object.values(projects).filter(Boolean).length;

    // Count completed phases by IDs — IDs are like "p0-0", "p0-1", "p1-0" etc.
    let phasesCompleted = 0;
    let offset = 0;
    for (let ph = 0; ph < PHASE_SIZES.length; ph++) {
      const size = PHASE_SIZES[ph];
      let doneInPhase = 0;
      for (let i = offset; i < offset + size; i++) {
        if (checks[`check-${i}`]) doneInPhase++;
      }
      if (doneInPhase >= size) phasesCompleted++;
      offset += size;
    }

    return {
      totalChecked,
      totalItems: TOTAL_ITEMS,
      currentStreak: streak.currentStreak ?? 0,
      bestStreak: streak.bestStreak ?? 0,
      totalStudyDays: streak.totalDays ?? 0,
      pomodorosTotal,
      notesCount,
      phasesCompleted,
      projectTasksDone,
      flashcardSessions: 0,
    };
  } catch {
    return {
      totalChecked: 0, totalItems: TOTAL_ITEMS,
      currentStreak: 0, bestStreak: 0, totalStudyDays: 0,
      pomodorosTotal: 0, notesCount: 0, phasesCompleted: 0,
      projectTasksDone: 0, flashcardSessions: 0,
    };
  }
}

export function AchievementsPanel({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<AchievementState | null>(null);

  useEffect(() => {
    setState(buildState());
  }, []);

  if (!state) return null;

  const unlocked = achievements.filter((a) => a.check(state));
  const locked   = achievements.filter((a) => !a.check(state));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border border-[#222230] animate-fade-in-up overflow-hidden" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2a]">
          <div>
            <h2 className="text-sm font-bold text-[#ededf4]">Conquistas</h2>
            <p className="text-[11px] text-[#606070] mt-0.5">
              {unlocked.length} / {achievements.length} desbloqueadas
            </p>
          </div>
          <button onClick={onClose} className="text-[#404050] hover:text-[#9090b0] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3 border-b border-[#1a1a22]">
          <div className="h-1.5 rounded-full bg-[#1e1e2a] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(unlocked.length / achievements.length) * 100}%`,
                background: "linear-gradient(90deg, #7c6af7, #a78bfa)",
              }}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {/* Unlocked */}
          {unlocked.length > 0 && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#404050] mb-2">Desbloqueadas</p>
              {unlocked.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl px-4 py-3 border" style={{ background: a.color + "0e", borderColor: a.color + "30" }}>
                  <span className="text-2xl leading-none">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: a.color }}>{a.title}</p>
                    <p className="text-xs text-[#707080] mt-0.5">{a.description}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: a.color + "20", color: a.color }}>✓</span>
                </div>
              ))}
            </>
          )}

          {/* Locked */}
          {locked.length > 0 && (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#303038] mt-4 mb-2">Bloqueadas</p>
              {locked.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl px-4 py-3 border border-[#1e1e2a] opacity-50">
                  <span className="text-2xl leading-none grayscale">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#606070]">{a.title}</p>
                    <p className="text-xs text-[#404050] mt-0.5">{a.description}</p>
                  </div>
                  <Lock size={13} className="text-[#303038]" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Small widget for inline display (sidebar/hero)
export function AchievementsBadge({ onClick }: { onClick: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const s = buildState();
    setCount(achievements.filter((a) => a.check(s)).length);
  }, []);

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
      style={{ background: "#1a1a28", color: "#9090b0", border: "1px solid #252535" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c0c0d8"; (e.currentTarget as HTMLElement).style.borderColor = "#7c6af740"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9090b0"; (e.currentTarget as HTMLElement).style.borderColor = "#252535"; }}
    >
      🏅 Conquistas
      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: "#7c6af720", color: "#a78bfa" }}>
        {count}/{achievements.length}
      </span>
    </button>
  );
}
