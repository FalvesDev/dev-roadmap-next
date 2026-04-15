"use client";

import { useState, useRef } from "react";
import { X, Download, Upload, AlertTriangle, CheckCircle } from "lucide-react";

const ALL_KEYS = [
  "roadmap_checks_v1",
  "roadmap_notes_v1",
  "roadmap_streak_v1",
  "roadmap_path_v1",
  "roadmap_theme_v1",
  "roadmap_projects_v1",
  "roadmap_celebrated_v1",
  "roadmap_onboarded_v1",
  "roadmap_review_v1",
  "roadmap_pomodoro_v1",
  "roadmap_weekly_goal_v1",
];

function exportJSON() {
  const backup: Record<string, unknown> = {
    version: 1,
    exportedAt: new Date().toISOString(),
  };
  for (const key of ALL_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      backup[key] = raw ? JSON.parse(raw) : null;
    } catch {
      backup[key] = null;
    }
  }
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `dev-roadmap-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function BackupRestore({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const data = JSON.parse(text);
        if (!data.version || !data.exportedAt) throw new Error("Arquivo inválido");
        const date = new Date(data.exportedAt).toLocaleString("pt-BR");
        setPreview(`Backup de ${date}`);
        setStatus("idle");
        setErrorMsg("");
        // Store parsed data for restore
        (fileRef.current as unknown as { _parsed: unknown })._parsed = data;
      } catch {
        setStatus("error");
        setErrorMsg("Arquivo inválido — certifique-se de usar um backup exportado por este app.");
      }
    };
    reader.readAsText(file);
  }

  function doRestore() {
    try {
      const data = (fileRef.current as unknown as { _parsed: Record<string, unknown> })._parsed;
      if (!data) return;
      for (const key of ALL_KEYS) {
        if (data[key] !== null && data[key] !== undefined) {
          localStorage.setItem(key, JSON.stringify(data[key]));
        }
      }
      setStatus("success");
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setStatus("error");
      setErrorMsg("Erro ao restaurar. Tente novamente.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-md rounded-2xl border border-[#222230] p-6 animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#404050] hover:text-[#9090b0] transition-colors">
          <X size={18} />
        </button>

        <h2 className="text-sm font-bold text-[#ededf4] mb-1">Backup & Restore</h2>
        <p className="text-xs text-[#606070] mb-6">Salve ou restaure todo seu progresso, notas e configurações.</p>

        {/* Export */}
        <div className="rounded-xl border border-[#222230] p-4 mb-3">
          <div className="flex items-start gap-3">
            <Download size={15} className="text-[#7c6af7] mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#c0c0d8] mb-0.5">Exportar progresso</p>
              <p className="text-[11px] text-[#606070] mb-3">Baixa um arquivo .json com todos os dados do app.</p>
              <button
                onClick={exportJSON}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
                style={{ background: "#7c6af7" }}
              >
                Baixar JSON
              </button>
            </div>
          </div>
        </div>

        {/* Import */}
        <div className="rounded-xl border border-[#222230] p-4">
          <div className="flex items-start gap-3">
            <Upload size={15} className="text-[#34d399] mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#c0c0d8] mb-0.5">Restaurar backup</p>
              <p className="text-[11px] text-[#606070] mb-3">
                Isso substituirá todo o progresso atual pelo arquivo.
              </p>

              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
                style={{ background: "#1a1a26", color: "#9090b0", border: "1px solid #252535" }}>
                <Upload size={11} /> Escolher arquivo
                <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFile} />
              </label>

              {preview && status !== "error" && (
                <p className="text-[11px] text-[#a78bfa] mt-2">{preview}</p>
              )}

              {preview && status !== "success" && status !== "error" && (
                <div className="mt-3 p-3 rounded-lg border border-[#f9731630] bg-[#f9731608]">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle size={12} className="text-[#f97316] mt-0.5 shrink-0" />
                    <p className="text-[11px] text-[#f97316]">O progresso atual será substituído. Esta ação não pode ser desfeita.</p>
                  </div>
                  <button
                    onClick={doRestore}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
                    style={{ background: "#f97316" }}
                  >
                    Confirmar restauração
                  </button>
                </div>
              )}

              {status === "success" && (
                <div className="mt-3 flex items-center gap-2 text-[#34d399]">
                  <CheckCircle size={13} />
                  <span className="text-xs font-medium">Restaurado! Recarregando…</span>
                </div>
              )}

              {status === "error" && (
                <p className="text-[11px] text-[#ef4444] mt-2">{errorMsg}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
