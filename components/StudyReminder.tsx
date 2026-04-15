"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, Check, X } from "lucide-react";

const REMINDER_KEY = "roadmap_reminder_v1";
const CHECKS_KEY   = "roadmap_checks_v1";
const STREAK_KEY   = "roadmap_streak_v1";
const TOTAL        = 95;

interface ReminderConfig {
  enabled: boolean;
  hour: number;   // 0-23
  minute: number; // 0 or 30
  lastNotified: string; // YYYY-MM-DD
}

function loadConfig(): ReminderConfig {
  try {
    const s = JSON.parse(localStorage.getItem(REMINDER_KEY) || "{}");
    return { enabled: s.enabled ?? false, hour: s.hour ?? 20, minute: s.minute ?? 0, lastNotified: s.lastNotified ?? "" };
  } catch {
    return { enabled: false, hour: 20, minute: 0, lastNotified: "" };
  }
}

function saveConfig(c: ReminderConfig) {
  try { localStorage.setItem(REMINDER_KEY, JSON.stringify(c)); } catch { /* ignore */ }
}

function buildMessage(): string {
  try {
    const checks: Record<string, boolean> = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    const streak = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
    const done    = Object.values(checks).filter(Boolean).length;
    const pct     = Math.round((done / TOTAL) * 100);
    const cs: number = streak.currentStreak ?? 0;

    if (cs >= 7)   return `🔥 ${cs} dias de streak! Continue hoje — você está em ${pct}% do roadmap.`;
    if (cs >= 1)   return `Dia ${cs} de streak — estude pelo menos 1 item hoje! ${pct}% completo.`;
    if (done > 0)  return `Você está em ${pct}% do roadmap. Hora de estudar!`;
    return "Que tal estudar algo hoje no Dev Roadmap?";
  } catch {
    return "Hora de estudar! Abra o Dev Roadmap.";
  }
}

function scheduleNotification(config: ReminderConfig) {
  if (!config.enabled || Notification.permission !== "granted") return;
  const now = new Date();
  const target = new Date();
  target.setHours(config.hour, config.minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1); // schedule for tomorrow if already passed

  const ms = target.getTime() - now.getTime();
  const today = now.toISOString().slice(0, 10);

  // Don't re-notify if already sent today
  if (config.lastNotified === today && target.getDate() !== now.getDate() + 1) return;

  setTimeout(() => {
    const cfg = loadConfig();
    const t = new Date().toISOString().slice(0, 10);
    if (!cfg.enabled || cfg.lastNotified === t) return;
    new Notification("Dev Roadmap — hora de estudar! 📚", {
      body: buildMessage(),
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: "dev-roadmap-study",
    });
    saveConfig({ ...cfg, lastNotified: t });
  }, ms);
}

export function StudyReminder() {
  const [config, setConfig]   = useState<ReminderConfig | null>(null);
  const [perm, setPerm]       = useState<NotificationPermission>("default");
  const [open, setOpen]       = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    if (typeof Notification !== "undefined") setPerm(Notification.permission);
    const c = loadConfig();
    setConfig(c);
    if (c.enabled && Notification.permission === "granted") scheduleNotification(c);
  }, []);

  const requestPerm = useCallback(async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPerm(result);
    return result;
  }, []);

  async function toggle() {
    if (!config) return;
    if (!config.enabled) {
      const p = perm === "granted" ? "granted" : await requestPerm();
      if (p !== "granted") return;
      const next = { ...config, enabled: true };
      setConfig(next);
      saveConfig(next);
      scheduleNotification(next);
    } else {
      const next = { ...config, enabled: false };
      setConfig(next);
      saveConfig(next);
    }
  }

  function updateTime(hour: number, minute: number) {
    if (!config) return;
    const next = { ...config, hour, minute };
    setConfig(next);
    saveConfig(next);
    if (next.enabled && perm === "granted") scheduleNotification(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function sendTest() {
    if (perm !== "granted") return;
    new Notification("Dev Roadmap — hora de estudar! 📚", {
      body: buildMessage(),
      icon: "/icon-192.png",
      tag: "dev-roadmap-test",
    });
  }

  if (!config) return null;

  const timeLabel = `${String(config.hour).padStart(2, "0")}:${String(config.minute).padStart(2, "0")}`;
  const active    = config.enabled && perm === "granted";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Configurar lembrete de estudo"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
        style={{
          background: active ? "#7c6af720" : "#1a1a28",
          color:      active ? "#a78bfa" : "#9090b0",
          border:     `1px solid ${active ? "#7c6af740" : "#252535"}`,
        }}
      >
        {active ? <Bell size={12} /> : <BellOff size={12} />}
        {active ? `Lembrete ${timeLabel}` : "Lembrete"}
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 w-64 rounded-xl border border-[#222230] p-4 z-50 animate-fade-in"
          style={{ background: "#13131a", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-[#ededf4]">Lembrete diário</p>
            <button onClick={() => setOpen(false)} className="text-[#404050] hover:text-[#9090b0]" aria-label="Fechar"><X size={14} /></button>
          </div>

          {perm === "denied" ? (
            <p className="text-[11px] text-[#ef4444] leading-relaxed">
              Notificações bloqueadas pelo browser. Habilite em Configurações → Notificações para este site.
            </p>
          ) : (
            <>
              {/* Toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#909098]">Ativar lembrete</span>
                <button
                  onClick={toggle}
                  className="relative w-9 h-5 rounded-full transition-all"
                  style={{ background: active ? "#7c6af7" : "#252535" }}
                  aria-checked={active}
                  role="switch"
                  aria-label="Ativar ou desativar lembrete"
                >
                  <span className="absolute top-0.5 transition-all rounded-full w-4 h-4 bg-white"
                    style={{ left: active ? "calc(100% - 18px)" : "2px" }} />
                </button>
              </div>

              {/* Time picker */}
              <div className="mb-3">
                <p className="text-[10px] text-[#606070] mb-1.5">Horário do lembrete</p>
                <div className="grid grid-cols-4 gap-1">
                  {[7, 9, 12, 18, 20, 21, 22, 23].map(h => (
                    <button
                      key={h}
                      onClick={() => updateTime(h, 0)}
                      className="py-1 rounded-lg text-[11px] font-medium transition-all"
                      style={{
                        background: config.hour === h && config.minute === 0 ? "#7c6af720" : "#16161e",
                        color:      config.hour === h && config.minute === 0 ? "#a78bfa" : "#606070",
                        border:     `1px solid ${config.hour === h && config.minute === 0 ? "#7c6af740" : "#1e1e2a"}`,
                      }}
                    >
                      {String(h).padStart(2, "0")}h
                    </button>
                  ))}
                </div>
              </div>

              {saved && (
                <p className="text-[11px] text-[#34d399] flex items-center gap-1 mb-2">
                  <Check size={11} /> Salvo!
                </p>
              )}

              {active && (
                <button onClick={sendTest}
                  className="w-full text-[11px] text-[#606070] hover:text-[#9090b0] py-1 transition-colors">
                  Enviar notificação de teste
                </button>
              )}

              <p className="text-[10px] text-[#404050] mt-2 leading-relaxed">
                Notificações funcionam mesmo com a aba fechada (enquanto o browser estiver aberto).
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
