"use client";

export function HeroCTA() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <a
        href="#checklist"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
        style={{ background: "#7c6af7", color: "#fff", boxShadow: "0 0 20px #7c6af730" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#6d5ef5"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#7c6af7"; }}
      >
        Começar pela Fase 1
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <span className="text-xs text-[#909098]">ou explore pelo sidebar →</span>
    </div>
  );
}
