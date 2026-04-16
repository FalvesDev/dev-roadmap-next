"use client";

import { useEffect, useState } from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import { phases } from "@/lib/roadmap-data";
import { useLayout } from "@/components/LayoutContext";

const STORAGE_KEY = "roadmap_checks_v1";

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

export function StickyProgress() {
  const [checks,  setChecks]  = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const { leftOpen, rightOpen, toggleLeft, toggleRight } = useLayout();

  useEffect(() => {
    const load = () => setChecks(loadChecks());
    load();
    const interval    = setInterval(load, 1500);
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { clearInterval(interval); window.removeEventListener("scroll", handleScroll); };
  }, []);

  const allItems = phases.flatMap(p => p.cards.flatMap(c => c.items));
  const totalAll  = allItems.length;
  const totalDone = allItems.filter(i => checks[i.id]).length;
  const pct       = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Progress bar */}
      <div className="h-[3px]" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #7c3aed, #a855f7)",
            boxShadow: pct > 0 ? "0 0 8px rgba(124,58,237,0.6)" : "none",
          }}
        />
      </div>

      {/* Control strip */}
      <div
        className="flex items-center gap-3 px-3 py-1.5"
        style={{ background: "rgba(6,6,16,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Left toggle (desktop only) */}
        <button
          onClick={toggleLeft}
          className="hidden lg:flex items-center justify-center p-1.5 rounded-md transition-all duration-150 flex-shrink-0"
          style={{ color: leftOpen ? "#7c3aed" : "#505065", background: leftOpen ? "rgba(124,58,237,0.1)" : "transparent" }}
          title={leftOpen ? "Colapsar sidebar" : "Expandir sidebar"}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a78bfa"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = leftOpen ? "#7c3aed" : "#505065"}
        >
          <PanelLeft size={13} />
        </button>

        {/* Progress info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="mono-label flex-shrink-0" style={{ color: "#7c3aed" }}>{pct}%</span>
          <span className="mono-label flex-shrink-0" style={{ color: "#404060" }}>{totalDone}/{totalAll}</span>

          {/* Phase mini bars — desktop only */}
          <div className="hidden lg:flex flex-1 items-center gap-2 min-w-0">
            {phases.map(p => {
              const items = p.cards.flatMap(c => c.items);
              const done  = items.filter(i => checks[i.id]).length;
              const ppct  = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
              return (
                <div key={p.id} className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="mono-label whitespace-nowrap max-w-[48px] truncate hidden xl:block" style={{ color: "#404060" }}>
                    {p.title.replace(/^\S+\s/, "")}
                  </span>
                  <div
                    className="flex-1 h-[3px] rounded-full overflow-hidden min-w-[20px]"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${ppct}%`,
                        background: p.color,
                        boxShadow: ppct > 0 ? `0 0 4px ${p.color}80` : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right toggle (desktop only) */}
        <button
          onClick={toggleRight}
          className="hidden lg:flex items-center justify-center p-1.5 rounded-md transition-all duration-150 flex-shrink-0"
          style={{ color: rightOpen ? "#7c3aed" : "#505065", background: rightOpen ? "rgba(124,58,237,0.1)" : "transparent" }}
          title={rightOpen ? "Fechar ferramentas" : "Abrir ferramentas"}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a78bfa"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = rightOpen ? "#7c3aed" : "#505065"}
        >
          <PanelRight size={13} />
        </button>
      </div>
    </div>
  );
}
