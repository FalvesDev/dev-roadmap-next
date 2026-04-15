"use client";

import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";

const STREAK_KEY = "roadmap_streak_v1";
const CHECKS_KEY = "roadmap_checks_v1";

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const DAYS_PT   = ["D","S","T","Q","Q","S","S"];

function getStudiedDays(): Set<string> {
  try {
    const s = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    return new Set(s.history ?? []);
  } catch { return new Set(); }
}

function getCheckTimestamps(): Map<string, string[]> {
  // We don't have timestamps per check, so we simulate using study history
  // Returns map of date → array of item ids checked (not available; used for future expansion)
  return new Map();
}

function buildCalendarWeeks(year: number, month: number): Array<Array<{ date: string; day: number } | null>> {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: Array<Array<{ date: string; day: number } | null>> = [];
  let week: Array<{ date: string; day: number } | null> = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push({ date: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, day: d });
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

export function ActivityTimeline({ onClose }: { onClose: () => void }) {
  const [studied, setStudied] = useState<Set<string>>(new Set());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  useEffect(() => {
    setStudied(getStudiedDays());
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const weeks = buildCalendarWeeks(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    const now = new Date();
    if (viewYear === now.getFullYear() && viewMonth === now.getMonth()) return;
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const monthStudied = Array.from(studied).filter(d =>
    d.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`)
  ).length;

  // Last 52 weeks heatmap data
  const heatmapDays: Array<{ date: string; active: boolean }> = [];
  const heatStart = new Date();
  heatStart.setDate(heatStart.getDate() - 364);
  for (let i = 0; i < 365; i++) {
    const d = new Date(heatStart);
    d.setDate(heatStart.getDate() + i);
    const str = d.toISOString().slice(0, 10);
    heatmapDays.push({ date: str, active: studied.has(str) });
  }
  // Pad to multiple of 7
  const padFront = new Date(heatStart).getDay();
  const paddedHeatmap = [...Array(padFront).fill(null), ...heatmapDays];
  const heatCols: Array<Array<{ date: string; active: boolean } | null>> = [];
  for (let i = 0; i < paddedHeatmap.length; i += 7) {
    heatCols.push(paddedHeatmap.slice(i, i + 7) as Array<{ date: string; active: boolean } | null>);
  }

  const totalStudied = studied.size;
  const thisYear = Array.from(studied).filter(d => d.startsWith(String(viewYear))).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-[#222230] animate-fade-in-up overflow-hidden" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2a]">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-[#7c6af7]" />
            <h2 className="text-sm font-bold text-[#ededf4]">Histórico de atividade</h2>
          </div>
          <button onClick={onClose} className="text-[#404050] hover:text-[#9090b0] transition-colors" aria-label="Fechar histórico">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Dias no total", value: totalStudied },
              { label: `Dias em ${viewYear}`, value: thisYear },
              { label: `Dias em ${MONTHS_PT[viewMonth]}`, value: monthStudied },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl text-center py-3 border border-[#222230]" style={{ background: "#16161e" }}>
                <p className="text-xl font-bold text-[#ededf4]">{value}</p>
                <p className="text-[10px] text-[#606070] mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Year heatmap */}
          <div>
            <p className="text-[11px] font-semibold text-[#606070] uppercase tracking-widest mb-3">Últimos 12 meses</p>
            <div className="flex gap-[3px] overflow-x-auto pb-1">
              {heatCols.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-[3px]">
                  {col.map((cell, ri) => (
                    <div
                      key={ri}
                      title={cell?.date ?? ""}
                      className="w-[11px] h-[11px] rounded-[2px]"
                      style={{
                        background: !cell ? "transparent" : cell.active ? "#7c6af7" : "#1e1e2a",
                        border: cell?.date === today ? "1px solid #7c6af7" : "none",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-2 justify-end">
              <span className="text-[10px] text-[#404050]">Menos</span>
              {["#1e1e2a","#4e3ebf","#6350e8","#7c6af7","#a78bfa"].map(c => (
                <div key={c} className="w-[11px] h-[11px] rounded-[2px]" style={{ background: c }} />
              ))}
              <span className="text-[10px] text-[#404050]">Mais</span>
            </div>
          </div>

          {/* Monthly calendar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold text-[#606070] uppercase tracking-widest">
                {MONTHS_PT[viewMonth]} {viewYear}
              </p>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="px-2 py-1 rounded-lg text-xs text-[#606070] hover:text-[#9090b0] transition-colors"
                  style={{ background: "#1a1a26", border: "1px solid #252535" }} aria-label="Mês anterior">←</button>
                <button onClick={nextMonth} className="px-2 py-1 rounded-lg text-xs text-[#606070] hover:text-[#9090b0] transition-colors"
                  style={{ background: "#1a1a26", border: "1px solid #252535" }} aria-label="Próximo mês">→</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS_PT.map((d, i) => (
                <div key={i} className="text-center text-[10px] font-semibold text-[#404050]">{d}</div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
                {week.map((cell, di) => {
                  if (!cell) return <div key={di} />;
                  const isStudied = studied.has(cell.date);
                  const isToday = cell.date === today;
                  return (
                    <div
                      key={di}
                      title={isStudied ? `${cell.date} — estudou` : cell.date}
                      className="aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: isStudied ? "#7c6af720" : isToday ? "#1e1e2a" : "transparent",
                        color: isStudied ? "#a78bfa" : isToday ? "#6060a0" : "#404050",
                        border: isToday ? "1px solid #7c6af740" : "1px solid transparent",
                      }}
                    >
                      {isStudied ? "✓" : cell.day}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
