import { conceptGroups } from "@/lib/roadmap-data";

const colorMap: Record<string, string> = {
  purple: "border-violet-500/50 text-violet-400 bg-violet-500/10 hover:bg-violet-500/20",
  blue: "border-blue-500/50 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20",
  violet: "border-violet-400/50 text-violet-300 bg-violet-400/10 hover:bg-violet-400/20",
  amber: "border-amber-500/50 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20",
};

export function ConceptMap() {
  return (
    <section id="conceitos" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Mapa de Conceitos</h2>
      </div>
      <div className="bg-[#1a1a1a] border border-[#2e2e2e] rounded-xl p-6 space-y-6">
        {conceptGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#666] mb-3">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-default transition-colors ${colorMap[group.color]}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
