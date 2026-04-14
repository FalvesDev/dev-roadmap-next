import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    num: "1",
    title: "Leia a sequência das fases",
    desc: "Entenda o caminho completo. São 5 fases, cada uma com um objetivo claro.",
    href: "#timeline",
  },
  {
    num: "2",
    title: "Siga a jornada passo a passo",
    desc: "Cada bloco na ordem certa, com tempo estimado. Comece do topo.",
    href: "#flow",
  },
  {
    num: "3",
    title: "Consulte as trilhas de aprendizado",
    desc: "Antes de avançar em qualquer tópico, verifique o que você precisa já saber.",
    href: "#deptree",
  },
  {
    num: "4",
    title: "Use o checklist para estudar",
    desc: "Clique em qualquer item para ler a explicação completa do conceito. Marque conforme for aprendendo.",
    href: "#checklist",
  },
  {
    num: "5",
    title: "Encontre os materiais de estudo",
    desc: "Artigos, vídeos, docs e ferramentas curadas para cada tópico. Use a busca ou filtre por categoria.",
    href: "#artigos",
  },
];

export function GettingStarted() {
  return (
    <section id="comecar" className="mb-12">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-[#ededf0]">Como usar este roadmap</h2>
      </div>
      <p className="text-sm text-[#6b6b75] mb-6 leading-relaxed">
        Primeira vez aqui? Siga os cinco passos abaixo na ordem.
      </p>

      <div className="space-y-2">
        {steps.map((step) => (
          <a
            key={step.num}
            href={step.href}
            className="group flex items-start gap-4 px-4 py-4 rounded-xl border border-[#242428] bg-[#16161a] hover:border-[#333338] hover:bg-[#17171c] transition-colors block"
          >
            <div className="w-6 h-6 rounded-md bg-[#1e1e23] border border-[#333338] flex items-center justify-center text-xs font-semibold text-[#6b6b75] flex-shrink-0 mt-px">
              {step.num}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#dedee2] group-hover:text-[#ededf0] transition-colors leading-snug">
                {step.title}
              </p>
              <p className="text-xs text-[#6b6b75] mt-1 leading-relaxed">{step.desc}</p>
            </div>
            <ArrowUpRight
              size={14}
              className="text-[#545460] group-hover:text-[#6d5ef5] transition-colors flex-shrink-0 mt-1"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
