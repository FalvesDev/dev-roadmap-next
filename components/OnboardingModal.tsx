"use client";

import { useState, useEffect } from "react";
import { Code2, Database, Globe, BarChart2, ChevronRight, Clock, Zap } from "lucide-react";
import { useLearningPath, type LearningPath, pathMeta } from "@/components/PathSelector";

const STORAGE_KEY = "roadmap_onboarded_v1";
const CHECKS_KEY  = "roadmap_checks_v1";

function isNewUser() {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return false;
    const checks = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    return Object.keys(checks).length === 0;
  } catch { return false; }
}

const hoursOptions = [
  { value: "1",  label: "~1h/dia",   sub: "ritmo tranquilo (~14 meses)" },
  { value: "2",  label: "~2h/dia",   sub: "ritmo recomendado (~9 meses)" },
  { value: "3",  label: "3h+/dia",   sub: "ritmo intenso (~6 meses)" },
];

const pathIcons = { fullstack: Code2, backend: Database, frontend: Globe, data: BarChart2 };

export function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [hours, setHours] = useState("2");
  const { setPath } = useLearningPath();

  useEffect(() => {
    if (isNewUser()) setShow(true);
  }, []);

  const finish = (path: LearningPath) => {
    setPath(path);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ path, hours, date: new Date().toISOString().slice(0, 10) }));
    setShow(false);
    document.getElementById("checklist")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-md animate-scale-in"
        style={{ background: "#13131a", border: "1px solid #222230", borderRadius: "20px", overflow: "hidden" }}
      >
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pt-5 pb-1">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="rounded-full transition-all duration-300"
              style={{
                width: step === s ? "20px" : "6px",
                height: "6px",
                background: step === s ? "#7c6af7" : "#2a2a38",
              }}
            />
          ))}
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#7c6af720] border border-[#7c6af730] flex items-center justify-center mx-auto mb-3">
                  <Zap size={20} color="#7c6af7" strokeWidth={1.5} />
                </div>
                <h2 className="text-lg font-bold text-[#ededf4] mb-1">Bem-vindo ao Dev Roadmap</h2>
                <p className="text-sm text-[#909098]">2 perguntas rápidas para personalizar sua trilha.</p>
              </div>

              <p className="text-xs font-semibold text-[#c0c0d0] mb-3">Quanto tempo você tem por dia?</p>
              <div className="space-y-2 mb-6">
                {hoursOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setHours(opt.value)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                    style={{
                      background: hours === opt.value ? "#7c6af718" : "#1a1a26",
                      border: `1px solid ${hours === opt.value ? "#7c6af750" : "#252535"}`,
                    }}
                  >
                    <div className="text-left">
                      <p className="text-sm font-semibold" style={{ color: hours === opt.value ? "#b0a8f7" : "#c0c0d0" }}>
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-[#909098]">{opt.sub}</p>
                    </div>
                    <Clock size={14} color={hours === opt.value ? "#7c6af7" : "#484858"} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: "#7c6af7", color: "#fff", boxShadow: "0 0 20px #7c6af730" }}
              >
                Próximo <ChevronRight size={14} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-[#ededf4] mb-1">Qual é seu foco?</h2>
                <p className="text-sm text-[#909098]">Isso vai destacar os módulos mais relevantes para você.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {(Object.entries(pathMeta) as [LearningPath, typeof pathMeta[LearningPath]][]).map(([key, meta]) => {
                  const Icon = pathIcons[key];
                  return (
                    <button
                      key={key}
                      onClick={() => finish(key)}
                      className="flex flex-col items-start gap-2 p-4 rounded-xl text-left transition-all duration-150 group"
                      style={{ background: "#1a1a26", border: "1px solid #252535" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${meta.color}12`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${meta.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#1a1a26";
                        (e.currentTarget as HTMLElement).style.borderColor = "#252535";
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${meta.color}20` }}
                      >
                        <Icon size={14} color={meta.color} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#d0d0d8]">{meta.label}</p>
                        <p className="text-[10px] text-[#707080] leading-snug mt-0.5">{meta.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => finish("fullstack")}
                className="w-full py-2 text-xs text-[#606070] hover:text-[#909098] transition-colors"
              >
                Pular e explorar tudo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
