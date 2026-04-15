"use client";

import { Search } from "lucide-react";

export function SearchTrigger() {
  function openSearch() {
    document.dispatchEvent(new CustomEvent("open-search"));
  }

  return (
    <button
      onClick={openSearch}
      aria-label="Buscar tópico (Ctrl K)"
      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all"
      style={{ background: "#111118", border: "1px solid #1e1e2a", color: "#505060" }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#7c6af740";
        el.style.color = "#9090b0";
        el.style.background = "#16161e";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#1e1e2a";
        el.style.color = "#505060";
        el.style.background = "#111118";
      }}
    >
      <Search size={12} />
      <span className="flex-1 text-left">Buscar tópico...</span>
      <kbd
        className="text-[9px] px-1.5 py-0.5 rounded"
        style={{ background: "#1a1a24", border: "1px solid #252535", color: "#3a3a4a" }}
      >
        ⌃K
      </kbd>
    </button>
  );
}
