"use client";

import { useEffect, useState } from "react";
import { PenLine, X, Search, Trash2 } from "lucide-react";
import { phases } from "@/lib/roadmap-data";

const NOTES_KEY = "roadmap_notes_v1";

interface NoteEntry {
  itemId: string;
  itemLabel: string;
  cardTitle: string;
  phaseTitle: string;
  phaseColor: string;
  text: string;
}

const PHASE_COLORS = ["#7c6af7","#3b82f6","#8b5cf6","#10b981","#f59e0b"];

function buildNoteEntries(notes: Record<string, string>): NoteEntry[] {
  const entries: NoteEntry[] = [];
  phases.forEach((phase, pi) => {
    phase.cards.forEach(card => {
      card.items.forEach(item => {
        const text = notes[item.id];
        if (text && text.trim()) {
          entries.push({
            itemId: item.id,
            itemLabel: item.label,
            cardTitle: card.title.replace(/^\S+\s/, ""),
            phaseTitle: phase.title.replace(/^\S+\s/, ""),
            phaseColor: PHASE_COLORS[pi],
            text: text.trim(),
          });
        }
      });
    });
  });
  return entries;
}

export function NotesDashboard({ onClose }: { onClose: () => void }) {
  const [notes, setNotes]     = useState<Record<string, string>>({});
  const [search, setSearch]   = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    try { setNotes(JSON.parse(localStorage.getItem(NOTES_KEY) || "{}")); } catch {}
  }, []);

  const saveNote = (id: string, text: string) => {
    const next = { ...notes, [id]: text };
    setNotes(next);
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  const deleteNote = (id: string) => {
    const next = { ...notes };
    delete next[id];
    setNotes(next);
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
  };

  const entries = buildNoteEntries(notes);
  const filtered = search
    ? entries.filter(e =>
        e.itemLabel.toLowerCase().includes(search.toLowerCase()) ||
        e.text.toLowerCase().includes(search.toLowerCase()) ||
        e.cardTitle.toLowerCase().includes(search.toLowerCase())
      )
    : entries;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] animate-fade-in"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl animate-scale-in max-h-[88vh] flex flex-col"
        style={{ background: "#13131a", border: "1px solid #222230", borderRadius: "20px", overflow: "hidden" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e28] flex-shrink-0">
          <div className="flex items-center gap-2">
            <PenLine size={14} color="#7c6af7" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#dcdce4]">Minhas anotações</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: "#1e1e2a", color: "#7c6af7", border: "1px solid #2a2a38" }}>
              {entries.length}
            </span>
          </div>
          <button onClick={onClose} style={{ color: "#606070" }}><X size={14} /></button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-[#1e1e28] flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#1a1a26", border: "1px solid #252535" }}>
            <Search size={12} color="#606070" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar nas anotações..."
              className="flex-1 text-xs bg-transparent outline-none text-[#c0c0d0] placeholder-[#484858]"
            />
          </div>
        </div>

        {/* Notes list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <PenLine size={32} color="#2a2a38" strokeWidth={1} className="mb-3" />
              <p className="text-sm text-[#484858]">
                {entries.length === 0 ? "Nenhuma anotação ainda." : "Nenhuma anotação corresponde à busca."}
              </p>
              {entries.length === 0 && (
                <p className="text-xs text-[#383840] mt-1">Clique no ícone ✏️ ao lado de qualquer item do checklist.</p>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#1a1a22]">
              {filtered.map(entry => (
                <div key={entry.itemId} className="px-5 py-4 hover:bg-[#161620] transition-colors">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded"
                          style={{ background: `${entry.phaseColor}18`, color: entry.phaseColor, border: `1px solid ${entry.phaseColor}30` }}
                        >
                          {entry.phaseTitle}
                        </span>
                        <span className="text-[9px] text-[#606070]">{entry.cardTitle}</span>
                      </div>
                      <p className="text-xs font-medium text-[#c0c0d0] leading-snug">{entry.itemLabel}</p>
                    </div>
                    <button
                      onClick={() => deleteNote(entry.itemId)}
                      className="p-1.5 rounded-md flex-shrink-0 transition-colors"
                      style={{ color: "#484858" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#ef4444"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#484858"}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Note text */}
                  {editing === entry.itemId ? (
                    <textarea
                      autoFocus
                      className="w-full text-xs rounded-lg px-3 py-2 resize-none outline-none"
                      style={{
                        background: "#141420",
                        border: "1px solid #7c6af760",
                        color: "#c0c0d0",
                        minHeight: "80px",
                        lineHeight: "1.6",
                      }}
                      defaultValue={entry.text}
                      onBlur={e => { saveNote(entry.itemId, e.target.value); setEditing(null); }}
                    />
                  ) : (
                    <p
                      className="text-xs text-[#a0a0b0] leading-relaxed cursor-pointer rounded-lg px-3 py-2 transition-colors"
                      style={{ background: "#111118", border: "1px solid #1e1e28" }}
                      onClick={() => setEditing(entry.itemId)}
                    >
                      {entry.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
