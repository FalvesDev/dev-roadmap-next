"use client";

import { useState, useRef, useEffect } from "react";
import { X, Download, Award } from "lucide-react";

const CHECKS_KEY = "roadmap_checks_v1";
const STREAK_KEY = "roadmap_streak_v1";
const TOTAL      = 95;

function getProgress(): { done: number; pct: number; streak: number; days: number } {
  try {
    const checks: Record<string, boolean> = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const done = Object.values(checks).filter(Boolean).length;
    return { done, pct: Math.round((done / TOTAL) * 100), streak: streak.currentStreak ?? 0, days: streak.totalDays ?? 0 };
  } catch {
    return { done: 0, pct: 0, streak: 0, days: 0 };
  }
}

function drawCertificate(canvas: HTMLCanvasElement, name: string, progress: ReturnType<typeof getProgress>) {
  const W = 900, H = 636;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#0d0d12";
  ctx.fillRect(0, 0, W, H);

  // Outer border gradient frame
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#7c6af7");
  grad.addColorStop(0.5, "#a78bfa");
  grad.addColorStop(1, "#6d5ef5");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 3;
  roundRect(ctx, 16, 16, W - 32, H - 32, 20);
  ctx.stroke();

  // Inner subtle border
  ctx.strokeStyle = "#1e1e2a";
  ctx.lineWidth = 1;
  roundRect(ctx, 28, 28, W - 56, H - 56, 14);
  ctx.stroke();

  // Top accent band
  const topGrad = ctx.createLinearGradient(0, 0, W, 0);
  topGrad.addColorStop(0, "#7c6af720");
  topGrad.addColorStop(0.5, "#a78bfa18");
  topGrad.addColorStop(1, "#6d5ef720");
  ctx.fillStyle = topGrad;
  roundRectTop(ctx, 28, 28, W - 56, 80, 14);
  ctx.fill();

  // Corner decorations
  drawCornerDots(ctx, W, H);

  // Header label
  ctx.fillStyle = "#9090b0";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText("CERTIFICADO DE CONCLUSÃO · DEV ROADMAP 2026", W / 2, 72);

  // Trophy / seal
  ctx.font = "72px serif";
  ctx.textAlign = "center";
  ctx.fillText("🏆", W / 2, 200);

  // Main title
  ctx.fillStyle = "#ededf4";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText("Parabéns pelo seu empenho,", W / 2, 270);

  // Name
  ctx.fillStyle = "#a78bfa";
  ctx.font = "bold 44px sans-serif";
  ctx.fillText(name || "Desenvolvedor(a)", W / 2, 330);

  // Decorative line under name
  const lineGrad = ctx.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0);
  lineGrad.addColorStop(0, "transparent");
  lineGrad.addColorStop(0.5, "#7c6af7");
  lineGrad.addColorStop(1, "transparent");
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 200, 345);
  ctx.lineTo(W / 2 + 200, 345);
  ctx.stroke();

  // Description
  ctx.fillStyle = "#909098";
  ctx.font = "16px sans-serif";
  ctx.fillText("completou o Dev Roadmap Python & TypeScript 2026", W / 2, 385);
  ctx.fillText("cobrindo Python, TypeScript, FastAPI, React, Docker e PostgreSQL", W / 2, 408);

  // Stats row
  const stats = [
    { label: "Itens completos", value: `${progress.done}/${TOTAL}` },
    { label: "Progresso",       value: `${progress.pct}%` },
    { label: "Dias de estudo",  value: String(progress.days) },
  ];
  const statW = 180, statH = 70, statY = 445;
  const startX = W / 2 - (stats.length * statW) / 2 - (stats.length - 1) * 10;
  stats.forEach((s, i) => {
    const x = startX + i * (statW + 20);
    ctx.fillStyle = "#16161e";
    roundRectFill(ctx, x, statY, statW, statH, 10, "#16161e");
    ctx.strokeStyle = "#252535";
    ctx.lineWidth = 1;
    roundRect(ctx, x, statY, statW, statH, 10);
    ctx.stroke();

    ctx.fillStyle = "#a78bfa";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(s.value, x + statW / 2, statY + 30);
    ctx.fillStyle = "#606070";
    ctx.font = "11px sans-serif";
    ctx.fillText(s.label, x + statW / 2, statY + 50);
  });

  // Date
  ctx.fillStyle = "#404050";
  ctx.font = "12px monospace";
  ctx.textAlign = "center";
  const dateStr = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  ctx.fillText(dateStr, W / 2, H - 36);
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

function roundRectFill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string) {
  roundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}

function roundRectTop(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCornerDots(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const corners = [[44, 44], [W - 44, 44], [44, H - 44], [W - 44, H - 44]];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = "#7c6af740";
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7c6af7";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.stroke();
  });
}

export function Certificate({ onClose }: { onClose: () => void }) {
  const [name, setName]       = useState("");
  const [progress]            = useState(getProgress);
  const [generated, setGenerated] = useState(false);
  const canvasRef             = useRef<HTMLCanvasElement>(null);

  function generate() {
    if (!canvasRef.current || !name.trim()) return;
    drawCertificate(canvasRef.current, name.trim(), progress);
    setGenerated(true);
  }

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `certificado-dev-roadmap-${name.trim().replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  const isComplete = progress.pct >= 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative w-full max-w-lg rounded-2xl border border-[#222230] p-6 animate-fade-in-up" style={{ background: "#13131a", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#404050] hover:text-[#9090b0] transition-colors" aria-label="Fechar certificado">
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Award size={16} className="text-[#fbbf24]" />
          <h2 className="text-sm font-bold text-[#ededf4]">Certificado de conclusão</h2>
        </div>
        <p className="text-xs text-[#606070] mb-5">
          {isComplete
            ? "Parabéns! Você completou 100% do roadmap. Gere seu certificado personalizado."
            : `Você está em ${progress.pct}% do roadmap. O certificado fica disponível ao atingir 100%.`
          }
        </p>

        {!isComplete && (
          <div className="rounded-xl border border-[#252535] p-4 mb-4">
            <div className="flex justify-between text-xs text-[#606070] mb-2">
              <span>Progresso atual</span>
              <span>{progress.done}/{TOTAL} itens</span>
            </div>
            <div className="h-2 rounded-full bg-[#1e1e2a] overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${progress.pct}%`, background: "linear-gradient(90deg, #7c6af7, #a78bfa)" }} />
            </div>
            <p className="text-[11px] text-[#404050] mt-2">Faltam {TOTAL - progress.done} itens para desbloquear o certificado.</p>
          </div>
        )}

        {isComplete && (
          <>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#9090b0] mb-1.5">Seu nome no certificado</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={name}
                onChange={e => { setName(e.target.value); setGenerated(false); }}
                className="w-full px-3 py-2 rounded-lg text-sm bg-[#16161e] border border-[#252535] text-[#ededf4] placeholder-[#404050] outline-none focus:border-[#7c6af740]"
                aria-label="Nome para o certificado"
              />
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {generated && canvasRef.current && (
              <div className="mb-4 rounded-xl overflow-hidden border border-[#252535]">
                <img
                  src={canvasRef.current.toDataURL()}
                  alt="Preview do certificado"
                  className="w-full"
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={generate}
                disabled={!name.trim()}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: name.trim() ? "#7c6af7" : "#252535", color: name.trim() ? "#fff" : "#404050" }}
              >
                {generated ? "Regenerar" : "Gerar certificado"}
              </button>
              {generated && (
                <button
                  onClick={download}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all"
                  style={{ background: "#34d399" }}
                >
                  <Download size={13} /> Baixar PNG
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
