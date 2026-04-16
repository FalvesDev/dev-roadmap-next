"use client";

import { useEffect, useState } from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import { phases } from "@/lib/roadmap-data";
import { useLayout } from "@/components/LayoutContext";
import { useSiteTheme } from "@/components/SiteThemeContext";

const STORAGE_KEY = "roadmap_checks_v1";

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

export function StickyProgress() {
  const [checks,   setChecks]   = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const { leftOpen, rightOpen, toggleLeft, toggleRight } = useLayout();
  const { theme } = useSiteTheme();

  useEffect(() => {
    const load = () => setChecks(loadChecks());
    load();
    const interval     = setInterval(load, 1500);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { clearInterval(interval); window.removeEventListener("scroll", handleScroll); };
  }, []);

  const allItems  = phases.flatMap(p => p.cards.flatMap(c => c.items));
  const totalAll  = allItems.length;
  const totalDone = allItems.filter(i => checks[i.id]).length;
  const pct       = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  const phaseStats = phases.map(p => {
    const items = p.cards.flatMap(c => c.items);
    const done  = items.filter(i => checks[i.id]).length;
    const ppct  = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
    return { ...p, ppct, done, total: items.length };
  });

  /* Positioning is handled by .sticky-progress-bar CSS class + CSS vars --lsw / --rsw
     set by LayoutContext. No JS-based desktop detection needed. */
  return (
    <div
      className="sticky-progress-bar"
      style={{
        transform: scrolled ? "translateY(0)" : "translateY(-100%)",
        opacity:   scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
        transition: "transform 280ms ease, opacity 280ms ease",
      }}
    >
      {/* ── Main HUD bar ── */}
      <div
        className="flex items-stretch"
        style={{
          background: theme.bgPanel === "#0c0c18"
            ? "rgba(6,6,16,0.97)"
            : "rgba(28,20,16,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${theme.accentBorder}`,
          boxShadow: `0 4px 32px rgba(0,0,0,0.5), 0 1px 0 ${theme.accentBorder}`,
          height: "52px",
        }}
      >
        {/* Left sidebar toggle */}
        <button
          onClick={toggleLeft}
          className="hidden lg:flex items-center justify-center flex-shrink-0 transition-all duration-150"
          style={{
            width: "52px",
            borderRight: `1px solid ${theme.border}`,
            color: leftOpen ? theme.accentLight : theme.textMuted,
            background: leftOpen ? theme.accentDim : "transparent",
          }}
          title={leftOpen ? "Colapsar sidebar" : "Expandir sidebar"}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = theme.accentDim;
            (e.currentTarget as HTMLElement).style.color = theme.accentHover;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = leftOpen ? theme.accentDim : "transparent";
            (e.currentTarget as HTMLElement).style.color = leftOpen ? theme.accentLight : theme.textMuted;
          }}
        >
          <PanelLeft size={16} />
        </button>

        {/* Identity */}
        <div
          className="hidden lg:flex items-center px-4 flex-shrink-0"
          style={{ borderRight: `1px solid ${theme.border}` }}
        >
          <span className="mono-label" style={{ color: theme.accent, letterSpacing: "0.15em" }}>
            DEV ROADMAP
          </span>
        </div>

        {/* Center */}
        <div className="flex-1 flex items-center gap-4 px-4 min-w-0">

          <span
            className="font-black tabular-nums flex-shrink-0"
            style={{ fontSize: "1.25rem", color: pct > 0 ? theme.textPrimary : theme.textDim, lineHeight: 1 }}
          >
            {pct}%
          </span>

          <div
            className="flex-shrink-0 rounded-full overflow-hidden"
            style={{ width: "120px", height: "6px", background: "rgba(255,255,255,0.07)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${pct}%`,
                background: theme.gradientAccent,
                boxShadow: pct > 0 ? `0 0 10px ${theme.glowColor}` : "none",
              }}
            />
          </div>

          <span className="mono-label flex-shrink-0" style={{ color: theme.textMuted }}>
            {totalDone}/{totalAll}
          </span>

          <div className="hidden lg:block w-px h-5 flex-shrink-0" style={{ background: theme.border }} />

          {/* Phase pills */}
          <div className="hidden lg:flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto scrollbar-none">
            {phaseStats.map(p => (
              <a
                key={p.id}
                href="#checklist"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0 transition-all duration-150"
                style={{
                  background:     p.ppct > 0 ? `${p.color}12` : "rgba(255,255,255,0.03)",
                  border:         `1px solid ${p.ppct > 0 ? `${p.color}30` : theme.border}`,
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = p.ppct > 0 ? `${p.color}55` : theme.borderStrong}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = p.ppct > 0 ? `${p.color}30` : theme.border}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: p.ppct === 100 ? theme.success : p.ppct > 0 ? p.color : theme.textDim,
                    boxShadow:  p.ppct > 0 ? `0 0 5px ${p.ppct === 100 ? theme.success : p.color}` : "none",
                  }}
                />
                <span className="mono-label" style={{ color: p.ppct > 0 ? (p.ppct === 100 ? theme.success : p.color) : theme.textMuted }}>
                  {p.title.replace(/^\S+\s/, "").split(" ")[0]}
                </span>
                <span className="mono-label tabular-nums" style={{ color: p.ppct > 0 ? (p.ppct === 100 ? theme.success : p.color) : theme.textDim }}>
                  {p.ppct}%
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right panel toggle */}
        <button
          onClick={toggleRight}
          className="hidden lg:flex items-center justify-center flex-shrink-0 transition-all duration-150"
          style={{
            width: "52px",
            borderLeft: `1px solid ${theme.border}`,
            color: rightOpen ? theme.accentLight : theme.textMuted,
            background: rightOpen ? theme.accentDim : "transparent",
          }}
          title={rightOpen ? "Fechar ferramentas" : "Abrir ferramentas"}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = theme.accentDim;
            (e.currentTarget as HTMLElement).style.color = theme.accentHover;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = rightOpen ? theme.accentDim : "transparent";
            (e.currentTarget as HTMLElement).style.color = rightOpen ? theme.accentLight : theme.textMuted;
          }}
        >
          <PanelRight size={16} />
        </button>
      </div>

      {/* Fill line */}
      <div className="h-[2px]" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: theme.gradientAccent, opacity: 0.7 }}
        />
      </div>
    </div>
  );
}
