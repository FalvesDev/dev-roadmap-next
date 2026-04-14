export function StudyPath() {
  const months = [
    {
      period: "Mês 1–2",
      color: "#7c6af7",
      bg: "bg-violet-500/10 border-violet-500/30",
      title: "Fundações",
      items: [
        { week: "Sem 1–2", focus: "Terminal, VSCode, Git básico", task: "Criar conta GitHub, fazer primeiros commits" },
        { week: "Sem 3–4", focus: "Python: tipos, listas, dicts, funções", task: "Resolver 10 exercícios no Exercism.io" },
        { week: "Sem 5–6", focus: "Python: OOP, erros, arquivos", task: "Mini projeto: CRUD de contatos no terminal" },
        { week: "Sem 7–8", focus: "Git avançado, branches, PR", task: "Abrir 1 PR no seu próprio repositório" },
      ],
    },
    {
      period: "Mês 3–4",
      color: "#3b82f6",
      bg: "bg-blue-500/10 border-blue-500/30",
      title: "Lógica & APIs",
      items: [
        { week: "Sem 9–10", focus: "Algoritmos básicos, recursão, O(n)", task: "5 problemas fáceis no LeetCode" },
        { week: "Sem 11–12", focus: "HTTP, REST, consumir APIs", task: "Criar script Python que consome uma API pública" },
        { week: "Sem 13–14", focus: "Testes com pytest, TDD básico", task: "Adicionar testes ao projeto de contatos" },
        { week: "Sem 15–16", focus: "JavaScript básico, async/await", task: "Projeto: node script com fetch de API" },
      ],
    },
    {
      period: "Mês 5–6",
      color: "#10b981",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      title: "TypeScript & Frontend",
      items: [
        { week: "Sem 17–18", focus: "TypeScript: tipos, interfaces, generics", task: "Migrar o script JS para TypeScript" },
        { week: "Sem 19–20", focus: "HTML, CSS, Flexbox/Grid", task: "Clonar uma tela simples (ex: perfil GitHub)" },
        { week: "Sem 21–22", focus: "React: componentes, props, hooks", task: "App de lista de tarefas com React + TS" },
        { week: "Sem 23–24", focus: "React: fetch, router, formulários", task: "Consumir API pública e exibir dados" },
      ],
    },
    {
      period: "Mês 7–9",
      color: "#f59e0b",
      bg: "bg-amber-500/10 border-amber-500/30",
      title: "Backend & Portfólio",
      items: [
        { week: "Sem 25–28", focus: "FastAPI, PostgreSQL, ORM, JWT auth", task: "API completa com autenticação e CRUD" },
        { week: "Sem 29–30", focus: "Docker, deploy no Railway/Render", task: "Deploy da sua API no ar com domínio" },
        { week: "Sem 31–32", focus: "Full-stack: React frontend + API própria", task: "App completo deployado e no GitHub" },
        { week: "Sem 33–36", focus: "LeetCode, entrevistas, LinkedIn", task: "30 problemas LeetCode + perfil atualizado" },
      ],
    },
  ];

  return (
    <section id="plano" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Plano de Estudos Detalhado</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-500/20 text-violet-400">
          semana a semana
        </span>
      </div>

      <div className="space-y-4">
        {months.map((month) => (
          <div key={month.period} className={`border rounded-xl overflow-hidden ${month.bg}`}>
            {/* Header */}
            <div
              className="px-5 py-3.5 flex items-center gap-3"
              style={{ borderBottom: `1px solid ${month.color}30` }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: month.color }}
              />
              <span className="text-sm font-bold text-white">{month.period}</span>
              <span className="text-xs text-[#888]">— {month.title}</span>
            </div>

            {/* Weeks */}
            <div className="divide-y divide-white/5">
              {month.items.map((item, i) => (
                <div key={i} className="px-5 py-3.5 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 hover:bg-white/5 transition-colors">
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: month.color }}
                    >
                      {item.week}
                    </span>
                    <p className="text-sm font-medium text-white mt-0.5">{item.focus}</p>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <span className="text-[#555] text-sm flex-shrink-0">→</span>
                    <p className="text-sm text-[#888]">
                      <span className="text-[#555] text-xs font-medium">TAREFA: </span>
                      {item.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
