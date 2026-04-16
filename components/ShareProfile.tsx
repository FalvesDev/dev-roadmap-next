"use client";

import { useState, useEffect } from "react";
import { X, Link2, Check } from "lucide-react";

const CHECKS_KEY = "roadmap_checks_v1";
const STREAK_KEY = "roadmap_streak_v1";
const PATH_KEY   = "roadmap_path_v1";
const TOTAL      = 95;

function buildShareURL(): string {
  try {
    const checks: Record<string, boolean> = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const path   = localStorage.getItem(PATH_KEY) ?? "";

    const done    = Object.values(checks).filter(Boolean).length;
    const pct     = Math.round((done / TOTAL) * 100);
    const cs      = streak.currentStreak ?? 0;
    const best    = streak.bestStreak ?? 0;
    const days    = streak.totalDays ?? 0;

    const params = new URLSearchParams({
      pct:  String(pct),
      done: String(done),
      cs:   String(cs),
      best: String(best),
      days: String(days),
      path: path,
    });
    return `${window.location.origin}${window.location.pathname}?share=1&${params.toString()}`;
  } catch {
    return window.location.href;
  }
}

function getShareText(pct: number, streak: number): string {
  const base = "Estou no Dev Roadmap Python & TypeScript";
  if (pct >= 100) return base + " — completei 100% do roadmap!";
  if (pct >= 50)  return base + ` — já completei ${pct}% do caminho para dev júnior! ${streak >= 7 ? `🔥 ${streak} dias de streak!` : ""}`;
  return base + ` — ${pct}% completo no meu estudo de Python & TypeScript`;
}

export function ShareProfile({ onClose }: { onClose: () => void }) {
  const [url, setUrl]       = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats]   = useState({ pct: 0, done: 0, streak: 0, best: 0, days: 0, path: "" });

  useEffect(() => {
    try {
      const checks: Record<string, boolean> = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
      const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
      const path   = localStorage.getItem(PATH_KEY) ?? "";
      const done   = Object.values(checks).filter(Boolean).length;
      setStats({
        pct:    Math.round((done / TOTAL) * 100),
        done,
        streak: streak.currentStreak ?? 0,
        best:   streak.bestStreak ?? 0,
        days:   streak.totalDays ?? 0,
        path,
      });
      setUrl(buildShareURL());
    } catch { /* ignore */ }
  }, []);

  function copy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const shareText = getShareText(stats.pct, stats.streak);
  const twitterURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText + "\n\n" + url);
  const linkedinURL = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);

  const pathLabels: Record<string, string> = {
    fullstack: "Full-stack",
    backend: "Back-end",
    frontend: "Front-end",
    data: "Data Science",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-md rounded-2xl border border-[#222230] p-6 animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#404050] hover:text-[#9090b0] transition-colors" aria-label="Fechar">
          <X size={18} />
        </button>

        <h2 className="text-sm font-bold text-[#ededf4] mb-1">Compartilhar perfil</h2>
        <p className="text-xs text-[#606070] mb-5">Mostre seu progresso para amigos e recrutadores.</p>

        {/* Preview card */}
        <div className="rounded-xl border border-[#7c6af730] p-4 mb-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1530, #13131a)" }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: "#7c6af7", transform: "translate(30%, -30%)" }} />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c6af7] mb-2">Dev Roadmap 2026</p>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-3xl font-bold text-[#ededf4]">{stats.pct}%</span>
            <span className="text-xs text-[#606070] mb-1">{stats.done}/{TOTAL} itens completos</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#1e1e2a] overflow-hidden mb-3">
            <div className="h-full rounded-full" style={{ width: `${stats.pct}%`, background: "linear-gradient(90deg, #7c6af7, #a78bfa)" }} />
          </div>
          <div className="flex gap-3 flex-wrap">
            {stats.streak > 0 && (
              <span className="text-[11px] text-[#f97316]">🔥 {stats.streak} dias de streak</span>
            )}
            {stats.days > 0 && (
              <span className="text-[11px] text-[#60a5fa]">📅 {stats.days} dias estudados</span>
            )}
            {stats.path && (
              <span className="text-[11px] text-[#a78bfa]">🎯 Trilha {pathLabels[stats.path] ?? stats.path}</span>
            )}
          </div>
        </div>

        {/* URL copy */}
        <div className="flex gap-2 mb-4">
          <input
            readOnly
            value={url}
            className="flex-1 text-xs px-3 py-2 rounded-lg bg-[#16161e] border border-[#252535] text-[#606070] outline-none truncate"
            aria-label="Link de compartilhamento"
          />
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white transition-all shrink-0"
            style={{ background: copied ? "#34d399" : "#7c6af7" }}
            aria-label="Copiar link"
          >
            {copied ? <Check size={12} /> : <Link2 size={12} />}
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* Social */}
        <div className="flex gap-2">
          <a href={twitterURL} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: "#1a1a26", color: "#60a5fa", border: "1px solid #1e3a5f" }}>
            𝕏 Twitter / X
          </a>
          <a href={linkedinURL} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all"
            style={{ background: "#1a1a26", color: "#3b82f6", border: "1px solid #1e3358" }}>
            in LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
