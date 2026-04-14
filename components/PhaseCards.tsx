import { phases } from "@/lib/roadmap-data";

export function PhaseCards() {
  return (
    <section id="fases" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Fases do Roadmap</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-500/20 text-violet-400">
          5 etapas
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {phases.map((phase) => (
          <a
            key={phase.id}
            href={`#checklist`}
            className="group bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-5 hover:border-violet-500/60 transition-all hover:-translate-y-1 duration-200 block"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#888]">
                {phase.number}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#222] text-[#888]">
                {phase.duration}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">{phase.title}</h3>
            <p className="text-xs text-[#888] leading-relaxed mb-4">{phase.description}</p>
            <div className="h-1 bg-[#2e2e2e] rounded-full mb-3">
              <div
                className="h-1 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ width: "0%", background: phase.color }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {phase.topics.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded bg-[#222] text-[#666]"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
        {/* Bonus card */}
        <div className="bg-[#1a1a1a] border border-dashed border-[#2e2e2e] rounded-xl p-5 opacity-60">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Bônus</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#222] text-[#888]">ongoing</span>
          </div>
          <h3 className="text-base font-bold text-white mb-2">🔁 Mindset Contínuo</h3>
          <p className="text-xs text-[#888] leading-relaxed mb-4">
            Clean Code, Code Review, Open Source, comunidade. O que separa ok de excelente.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Clean Code", "Code Review", "OSS"].map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#222] text-[#666]">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
