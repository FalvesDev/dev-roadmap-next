import { Layers, BrainCircuit, Braces, Settings2, Briefcase, type LucideIcon } from "lucide-react";

const phases: {
  num: string; title: string; Icon: LucideIcon; color: string;
  duration: string; skills: string[]; milestone: string;
}[] = [
  {
    num: "01", title: "Fundamentos", Icon: Layers,      color: "#6d5ef5",
    duration: "4–6 semanas",
    skills: ["Terminal & CLI", "Git & GitHub", "Python básico", "Lógica"],
    milestone: "CLI funcionando",
  },
  {
    num: "02", title: "Programação",  Icon: BrainCircuit, color: "#3b82f6",
    duration: "6–8 semanas",
    skills: ["OOP & Classes", "Algoritmos", "Testes (pytest)", "HTTP & REST"],
    milestone: "API consumida",
  },
  {
    num: "03", title: "TypeScript",   Icon: Braces,       color: "#8b5cf6",
    duration: "4–6 semanas",
    skills: ["JavaScript", "TypeScript", "Node.js", "React"],
    milestone: "App no ar",
  },
  {
    num: "04", title: "Backend",      Icon: Settings2,    color: "#10b981",
    duration: "6–8 semanas",
    skills: ["FastAPI", "SQL & PostgreSQL", "Docker", "Auth JWT"],
    milestone: "API deployada",
  },
  {
    num: "05", title: "Portfólio",    Icon: Briefcase,    color: "#f59e0b",
    duration: "4–6 semanas",
    skills: ["3 projetos GitHub", "LeetCode", "LinkedIn", "README"],
    milestone: "Pronto para emprego",
  },
];

export function PhaseTimeline() {
  return (
    <section id="timeline" className="mb-12">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-[#ededf0]">Sequência das fases</h2>
      </div>
      <p className="text-sm text-[#6b6b75] mb-8 leading-relaxed">
        Cinco fases em sequência. Uma fase só começa quando a anterior está dominada.
      </p>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative flex items-start gap-3">
          {/* Connecting line */}
          <div className="absolute top-[27px] left-[28px] right-[28px] h-px bg-[#242428]" />

          {phases.map((phase) => {
            const Icon = phase.Icon;
            return (
              <div key={phase.num} className="flex-1 flex flex-col items-center relative z-10">
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-[#242428] bg-[#16161a] flex-shrink-0"
                >
                  <Icon size={20} style={{ color: phase.color }} strokeWidth={1.5} />
                </div>

                {/* Card */}
                <div className="w-full bg-[#16161a] border border-[#242428] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#ededf0]">{phase.title}</span>
                    <span className="text-[9px] text-[#545460]">{phase.duration}</span>
                  </div>

                  <ul className="space-y-1.5 mb-3">
                    {phase.skills.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#333338] flex-shrink-0" />
                        <span className="text-[11px] text-[#8a8a96]">{s}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-[#222226]">
                    <p className="text-[10px] text-[#6b6b75]">
                      <span style={{ color: phase.color }} className="font-medium">Meta — </span>
                      {phase.milestone}
                    </p>
                  </div>
                </div>

                <p className="mt-2.5 text-[9px] font-semibold tracking-[0.18em] uppercase text-[#333338]">
                  fase {phase.num}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-5 px-1">
          <span className="text-[10px] text-[#545460]">Começa aqui</span>
          <span className="text-[10px] text-[#545460]">cada fase leva ~2 meses</span>
          <span className="text-[10px] text-[#545460]">Dev júnior</span>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-0">
        {phases.map((phase, i) => {
          const Icon = phase.Icon;
          return (
            <div key={phase.num} className="flex gap-4">
              <div className="flex flex-col items-center w-10 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#242428] bg-[#16161a] flex-shrink-0">
                  <Icon size={16} style={{ color: phase.color }} strokeWidth={1.5} />
                </div>
                {i < phases.length - 1 && (
                  <div className="w-px flex-1 my-1 bg-[#242428] min-h-4" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="bg-[#16161a] border border-[#242428] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#ededf0]">{phase.title}</span>
                    <span className="text-[9px] text-[#545460]">{phase.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {phase.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-[#222226] text-[#8a8a96] border border-[#333338]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#6b6b75] border-t border-[#222226] pt-2">
                    <span style={{ color: phase.color }} className="font-medium">Meta — </span>
                    {phase.milestone}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
