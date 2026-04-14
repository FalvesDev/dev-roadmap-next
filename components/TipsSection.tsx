import { tips, weekDays, conceptGroups } from "@/lib/roadmap-data";

const tipBorder: Record<string, string> = {
  success: "#10b981",
  warn:    "#f59e0b",
  danger:  "#ef4444",
  default: "#7c6af7",
};
const tipBg: Record<string, string> = {
  success: "#0d2b1e",
  warn:    "#2a2010",
  danger:  "#2a1515",
  default: "#1a1428",
};

const groupColors: Record<string, { bg: string; text: string; border: string }> = {
  purple: { bg: "#1a1428", text: "#a78bfa", border: "#2e2240" },
  blue:   { bg: "#0f1e38", text: "#60a5fa", border: "#1a3050" },
  violet: { bg: "#1a1428", text: "#c084fc", border: "#2e1e48" },
  amber:  { bg: "#2a1e0a", text: "#fbbf24", border: "#3a2c10" },
};

export function TipsSection() {
  return (
    <section id="dicas" className="mb-16 space-y-12">

      {/* ── Honest Tips ── */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Dicas honestas</h2>
          <p className="text-sm text-[#8f8f9a] leading-relaxed">
            O que realmente importa para aprender e avançar na carreira.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip) => {
            const border = tipBorder[tip.type] ?? tipBorder.default;
            const bg     = tipBg[tip.type]     ?? tipBg.default;
            return (
              <div
                key={tip.title}
                className="rounded-xl p-5 border card-hover"
                style={{ background: bg, borderColor: `${border}30`, borderLeftColor: border, borderLeftWidth: "2px" }}
              >
                <h3 className="text-sm font-semibold mb-2" style={{ color: border }}>{tip.title}</h3>
                <p className="text-sm text-[#9898a8] leading-relaxed">{tip.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Weekly Study Schedule ── */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Semana ideal de estudos</h2>
          <p className="text-sm text-[#8f8f9a] leading-relaxed">
            ~10h por semana, distribuídas para maximizar retenção e evitar burnout.
          </p>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((d) => (
            <div
              key={d.day}
              className="bg-[#16161e] border border-[#222228] rounded-xl p-3 flex flex-col items-center gap-2 card-hover"
            >
              <p className="text-[10px] font-bold text-[#9090a0] uppercase tracking-widest">{d.day}</p>
              <p className="text-xl font-bold text-[#7c6af7]">{d.hours}</p>
              <p className="text-[10px] text-[#9898a8] text-center leading-tight">{d.focus}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#9090a0] mt-3 text-center">
          Substitua LeetCode por revisão de conteúdo nas primeiras semanas de cada fase.
        </p>
      </div>

      {/* ── Concept Map ── */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Mapa de conceitos</h2>
          <p className="text-sm text-[#9090a0] leading-relaxed">
            Tudo que você vai dominar ao longo das 5 fases. Guarde para referência.
          </p>
        </div>
        <div className="space-y-5">
          {conceptGroups.map((group) => {
            const c = groupColors[group.color] ?? groupColors.purple;
            const labelClean = group.label.replace(/^\S+\s/, "");
            return (
              <div key={group.label} className="bg-[#16161e] border border-[#222228] rounded-xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: c.text }}>
                  {labelClean}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-md font-medium border"
                      style={{ background: c.bg, color: c.text, borderColor: c.border }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
