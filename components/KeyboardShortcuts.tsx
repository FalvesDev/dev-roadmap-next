"use client";

import { useEffect, useState } from "react";
import { X, Keyboard } from "lucide-react";

const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
const mod = isMac ? "⌘" : "Ctrl";

const shortcuts = [
  { keys: [`${mod}`, "K"],  description: "Abrir busca global" },
  { keys: ["P"],             description: "Iniciar / pausar Pomodoro" },
  { keys: ["?"],             description: "Mostrar atalhos" },
  { keys: ["F"],             description: "Abrir flashcards" },
  { keys: ["N"],             description: "Minhas notas" },
  { keys: ["Q"],             description: "Quiz" },
  { keys: ["Esc"],           description: "Fechar modal aberto" },
];

export function KeyboardShortcuts({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-sm rounded-2xl border border-[#222230] p-6 animate-fade-in-up"
        style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#404050] hover:text-[#9090b0] transition-colors" aria-label="Fechar">
          <X size={18} />
        </button>
        <div className="flex items-center gap-2 mb-5">
          <Keyboard size={15} className="text-[#7c6af7]" />
          <h2 className="text-sm font-bold text-[#ededf4]">Atalhos de teclado</h2>
        </div>
        <div className="space-y-2">
          {shortcuts.map(({ keys, description }) => (
            <div key={description} className="flex items-center justify-between gap-4">
              <span className="text-xs text-[#909098]">{description}</span>
              <div className="flex items-center gap-1 shrink-0">
                {keys.map((k, i) => (
                  <span key={i}>
                    <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold"
                      style={{ background: "#1e1e2a", color: "#c0c0d8", border: "1px solid #303040", boxShadow: "0 1px 0 #404050" }}>
                      {k}
                    </kbd>
                    {i < keys.length - 1 && <span className="text-[10px] text-[#404050] mx-0.5">+</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#404050] mt-5 text-center">Os atalhos funcionam fora de campos de texto</p>
      </div>
    </div>
  );
}

// Hook that wires up global keyboard shortcuts
export function useKeyboardShortcuts(handlers: {
  onSearch?: () => void;
  onPomodoro?: () => void;
  onFlashcards?: () => void;
  onNotes?: () => void;
  onQuiz?: () => void;
  onShortcuts?: () => void;
  onClose?: () => void;
}) {
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const inInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target as HTMLElement).isContentEditable;

      // Cmd/Ctrl+K always works
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handlers.onSearch?.();
        return;
      }

      if (e.key === "Escape") { handlers.onClose?.(); return; }
      if (inInput) return;

      switch (e.key.toLowerCase()) {
        case "p": handlers.onPomodoro?.(); break;
        case "f": handlers.onFlashcards?.(); break;
        case "n": handlers.onNotes?.(); break;
        case "q": handlers.onQuiz?.(); break;
        case "?": handlers.onShortcuts?.(); break;
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [handlers]);
}
