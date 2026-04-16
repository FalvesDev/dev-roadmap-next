"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X, Share2 } from "lucide-react";
import { phases } from "@/lib/roadmap-data";

const CHECKS_KEY = "roadmap_checks_v1";
const STREAK_KEY = "roadmap_streak_v1";

interface ExportData {
  pct: number;
  done: number;
  total: number;
  streak: number;
  activePhase: string;
  phaseColor: string;
  date: string;
}

function gatherData(): ExportData {
  let checks: Record<string, boolean> = {};
  let streakData: { currentStreak?: number } = {};
  try { checks = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}"); } catch {}
  try { streakData = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}"); } catch {}

  const all = phases.flatMap((p) => p.cards.flatMap((c) => c.items));
  const total = all.length;
  const done = all.filter((i) => checks[i.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const PHASE_COLORS = ["#7c6af7", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];
  let activePhaseIdx = 0;
  for (let i = phases.length - 1; i >= 0; i--) {
    const items = phases[i].cards.flatMap((c) => c.items);
    if (items.some((it) => checks[it.id])) { activePhaseIdx = i; break; }
  }

  return {
    pct, done, total,
    streak: streakData.currentStreak ?? 0,
    activePhase: `Fase ${activePhaseIdx + 1}`,
    phaseColor: PHASE_COLORS[activePhaseIdx],
    date: new Date().toLocaleDateString("pt-BR"),
  };
}

function drawCard(canvas: HTMLCanvasElement, data: ExportData) {
  const dpr = window.devicePixelRatio || 1;
  const W = 560, H = 280;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = "#13131a";
  roundRect(ctx, 0, 0, W, H, 16);
  ctx.fill();

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, `${data.phaseColor}12`);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, W, H, 16);
  ctx.fill();

  // Border
  ctx.strokeStyle = "#222230";
  ctx.lineWidth = 1;
  roundRect(ctx, 0.5, 0.5, W - 1, H - 1, 16);
  ctx.stroke();

  // Left accent bar
  ctx.fillStyle = data.phaseColor;
  roundRect(ctx, 20, 20, 3, H - 40, 2);
  ctx.fill();

  // Logo / branding
  ctx.fillStyle = "#6d5ef5";
  roundRect(ctx, 36, 22, 20, 20, 5);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 10px monospace";
  ctx.fillText("▶", 41, 36);

  ctx.fillStyle = "#eeeef6";
  ctx.font = "bold 13px -apple-system, system-ui, sans-serif";
  ctx.fillText("Dev Roadmap", 62, 36);

  ctx.fillStyle = "#909098";
  ctx.font = "10px -apple-system, system-ui, sans-serif";
  ctx.fillText("Python · TypeScript · 2026", 62, 52);

  // Phase badge
  ctx.fillStyle = `${data.phaseColor}20`;
  roundRect(ctx, 36, 70, 80, 22, 6);
  ctx.fill();
  ctx.strokeStyle = `${data.phaseColor}40`;
  ctx.lineWidth = 1;
  roundRect(ctx, 36, 70, 80, 22, 6);
  ctx.stroke();
  ctx.fillStyle = data.phaseColor;
  ctx.font = "bold 10px -apple-system, system-ui, sans-serif";
  ctx.fillText(data.activePhase, 52, 85);

  // Big percentage
  ctx.fillStyle = data.phaseColor;
  ctx.font = `bold 72px -apple-system, system-ui, sans-serif`;
  ctx.fillText(`${data.pct}%`, 36, 185);

  ctx.fillStyle = "#909098";
  ctx.font = "12px -apple-system, system-ui, sans-serif";
  ctx.fillText(`${data.done} de ${data.total} tópicos concluídos`, 36, 210);

  // Progress bar
  const barX = 36, barY = 225, barW = 300, barH = 6;
  ctx.fillStyle = "#1e1e28";
  roundRect(ctx, barX, barY, barW, barH, 3);
  ctx.fill();
  if (data.pct > 0) {
    const fillW = (data.pct / 100) * barW;
    const barGrad = ctx.createLinearGradient(barX, 0, barX + fillW, 0);
    barGrad.addColorStop(0, data.phaseColor);
    barGrad.addColorStop(1, `${data.phaseColor}99`);
    ctx.fillStyle = barGrad;
    roundRect(ctx, barX, barY, fillW, barH, 3);
    ctx.fill();
  }

  // Stats column
  const statsX = W - 160;

  // Streak
  ctx.fillStyle = "#1e1e2a";
  roundRect(ctx, statsX, 70, 130, 64, 10);
  ctx.fill();
  ctx.fillStyle = data.streak >= 7 ? "#f97316" : data.streak >= 3 ? "#f59e0b" : "#7c6af7";
  ctx.font = "bold 28px -apple-system, system-ui, sans-serif";
  ctx.fillText(`${data.streak}🔥`, statsX + 14, 112);
  ctx.fillStyle = "#909098";
  ctx.font = "10px -apple-system, system-ui, sans-serif";
  ctx.fillText("dias de sequência", statsX + 14, 128);

  // Date
  ctx.fillStyle = "#484858";
  ctx.font = "10px -apple-system, system-ui, sans-serif";
  ctx.fillText(data.date, statsX + 14, H - 24);

  // watermark
  ctx.fillStyle = "#1e1e28";
  ctx.font = "9px monospace";
  ctx.fillText("roadmap.dev", W - 90, H - 24);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function ExportProgress({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<ExportData | null>(null);

  useEffect(() => {
    const d = gatherData();
    setData(d);
    if (canvasRef.current) drawCard(canvasRef.current, d);
  }, []);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `dev-roadmap-progresso-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg animate-scale-in"
        style={{ background: "#13131a", border: "1px solid #222230", borderRadius: "20px", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e28]">
          <div className="flex items-center gap-2">
            <Share2 size={14} color="#7c6af7" strokeWidth={1.5} />
            <h2 className="text-sm font-semibold text-[#dcdce4]">Exportar progresso</h2>
          </div>
          <button onClick={onClose} style={{ color: "#606070" }}>
            <X size={14} />
          </button>
        </div>

        <div className="p-5">
          {/* Canvas preview */}
          <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid #222228" }}>
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>

          {data && (
            <p className="text-xs text-[#909098] text-center mb-4">
              {data.pct}% · {data.activePhase} · {data.streak} dias de streak
            </p>
          )}

          <button
            onClick={download}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            style={{ background: "#7c6af720", color: "#7c6af7", border: "1px solid #7c6af740" }}
          >
            <Download size={14} />
            Baixar como PNG
          </button>
          <p className="text-[10px] text-[#484858] text-center mt-2">
            Cole no LinkedIn, Twitter ou no README do seu perfil GitHub
          </p>
        </div>
      </div>
    </div>
  );
}
