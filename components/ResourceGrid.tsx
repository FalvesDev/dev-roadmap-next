import { resourceCards } from "@/lib/roadmap-data";
import type { Resource } from "@/lib/roadmap-data";

const typeBadge: Record<Resource["type"], string> = {
  free: "bg-emerald-500/15 text-emerald-400",
  paid: "bg-amber-500/15 text-amber-400",
  book: "bg-violet-500/15 text-violet-400",
  ptbr: "bg-blue-500/15 text-blue-400",
  en: "bg-slate-500/20 text-slate-400",
  idea: "bg-pink-500/15 text-pink-400",
};

const typeLabel: Record<Resource["type"], string> = {
  free: "FREE",
  paid: "PAGO",
  book: "LIVRO",
  ptbr: "PT-BR",
  en: "EN",
  idea: "IDEIA",
};

export function ResourceGrid() {
  return (
    <section id="recursos" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-[#ececf0]">Recursos Recomendados</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-500/20 text-violet-400">
          curadoria
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {resourceCards.map((card) => (
          <div key={card.title} className="bg-[#16161e] border border-[#222228] rounded-xl p-5 card-hover">
            <h3 className="text-sm font-semibold text-[#dcdce4] mb-4">{card.title}</h3>
            <div className="space-y-0">
              {card.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[#2a2a2a] last:border-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${typeBadge[item.type]}`}>
                    {typeLabel[item.type]}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-xs text-[#a0a0b0] truncate">{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
