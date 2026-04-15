"use client";

export function HeroCTA() {
  return (
    <a
      href="#checklist"
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-150 shine-on-hover cta-glow"
      style={{
        background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #8b5cf6 100%)",
        color: "#fff",
        letterSpacing: "0.01em",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path d="M3 7.5h9M7.5 3l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Começar pela Fase 1
    </a>
  );
}
