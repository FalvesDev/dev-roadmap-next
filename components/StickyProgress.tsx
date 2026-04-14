"use client";

import { useEffect, useState } from "react";
import { phases } from "@/lib/roadmap-data";

const STORAGE_KEY = "roadmap_checks_v1";

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

export function StickyProgress() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const load = () => setChecks(loadChecks());
    load();
    const interval = setInterval(load, 1500);
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const allItems = phases.flatMap((p) => p.cards.flatMap((c) => c.items));
  const totalDone = allItems.filter((i) => checks[i.id]).length;
  const totalAll = allItems.length;
  const pct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Bar */}
      <div className="h-[2px] bg-[#1c1c1f]">
        <div
          className="h-full bg-[#6d5ef5] transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {/* Strip */}
      <div className="bg-[#0c0c0e]/95 backdrop-blur-sm border-b border-[#1c1c1f] lg:pl-56 px-4 py-1.5 flex items-center gap-4">
        <span className="text-[10px] font-medium" style={{ color: "#909098" }}>
          {pct}% concluído
        </span>
        <span className="text-[9px] text-[#909098]">{totalDone}/{totalAll} tópicos</span>
        <div className="hidden md:flex flex-1 items-center gap-3 ml-2">
          {phases.map((p) => {
            const items = p.cards.flatMap((c) => c.items);
            const done = items.filter((i) => checks[i.id]).length;
            const ppct = items.length > 0 ? Math.round((done / items.length) * 100) : 0;
            return (
              <div key={p.id} className="hidden lg:flex items-center gap-1.5 flex-1">
                <span className="text-[9px] text-[#909098] whitespace-nowrap max-w-[52px] truncate">
                  {p.title.replace(/^\S+\s/, "")}
                </span>
                <div className="flex-1 h-0.5 bg-[#1c1c1f] rounded-full overflow-hidden min-w-4">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${ppct}%`, background: p.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
