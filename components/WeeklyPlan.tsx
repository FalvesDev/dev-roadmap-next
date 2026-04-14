import { weekDays } from "@/lib/roadmap-data";

export function WeeklyPlan() {
  return (
    <section id="semana" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Semana Ideal de Estudos</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-500/20 text-violet-400">
          ~10h/semana
        </span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
        {weekDays.map((d) => (
          <div
            key={d.day}
            className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-4 text-center"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-2">
              {d.day}
            </p>
            <p className="text-2xl font-black text-white">{d.hours}</p>
            <p className="text-[11px] text-[#666] mt-1.5 leading-tight">{d.focus}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
