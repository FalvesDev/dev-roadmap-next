"use client";

export function SearchTrigger() {
  function openSearch() {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
    );
  }

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4">
      <p className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-3">
        Busca Rápida
      </p>
      <button
        onClick={openSearch}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-[#0a0a0a] border border-[#222] rounded-lg cursor-pointer hover:border-[#333] transition-colors group"
      >
        <span className="text-[#555]">🔍</span>
        <span className="flex-1 text-xs text-[#444] group-hover:text-[#666] text-left">
          Buscar tópico...
        </span>
        <kbd className="text-[9px] bg-[#1a1a1a] border border-[#2a2a2a] px-1.5 py-0.5 rounded text-[#444]">
          Ctrl K
        </kbd>
      </button>
      <div className="mt-3 space-y-1.5">
        {["Python OOP", "Docker basics", "React Hooks", "FastAPI JWT"].map((q) => (
          <a
            key={q}
            href="#artigos"
            className="block text-xs text-[#555] hover:text-violet-400 transition-colors py-1 border-b border-[#1a1a1a] last:border-0"
          >
            → {q}
          </a>
        ))}
      </div>
    </div>
  );
}
