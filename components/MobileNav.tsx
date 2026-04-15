"use client";

import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeProvider";

function openSearch() {
  document.dispatchEvent(new CustomEvent("open-search"));
}

export function MobileNav() {
  return (
    <>
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ background: "#14141c", borderBottom: "1px solid #26263a" }}
      >
        {/* Logo */}
        <a href="#overview" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6d5ef5, #9b87fa)" }}
          >
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M2 8V2l6 3-6 3z" fill="white" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#eeeef6] leading-none tracking-tight">Dev Roadmap</p>
            <p className="text-[9px] leading-none mt-0.5" style={{ color: "#8080a0" }}>Python · TypeScript</p>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={openSearch}
            aria-label="Buscar"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
            style={{ background: "#1a1a28", color: "#606070", border: "1px solid #252535" }}
          >
            <Search size={13} />
            <span className="hidden xs:inline text-[11px]">Buscar</span>
          </button>
          <ThemeToggle compact />
        </div>
      </header>

      {/* Spacer */}
      <div className="lg:hidden h-14" />
    </>
  );
}
