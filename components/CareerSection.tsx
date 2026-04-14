import type React from "react";
import {
  TrendingUp, Search, Users, MessageSquare,
  Globe, BookOpen, Filter, Bell, UserCheck, Link2,
  type LucideIcon,
} from "lucide-react";

const salaries = [
  { role: "Júnior (0–2 anos)",  clt: "R$ 2.500–5.000",  pj: "R$ 3.500–7.000",  color: "#6d5ef5" },
  { role: "Pleno (2–5 anos)",   clt: "R$ 6.000–12.000", pj: "R$ 9.000–17.000", color: "#3b82f6" },
  { role: "Sênior (5+ anos)",   clt: "R$ 15.000–25.000",pj: "R$ 20.000–40.000",color: "#10b981" },
  { role: "Remoto Internacional", clt: "USD 40k–80k/ano", pj: "USD 60k–120k/ano", color: "#f59e0b" },
];

const recruiterItems = [
  "GitHub ativo com projetos deployados — o portfólio fala mais que o currículo.",
  "README bem escrito em cada projeto (prints, como rodar, tecnologias usadas).",
  "Consistência de commits — mostrar que você realmente trabalhou no projeto.",
  "Projeto Full-stack completo: frontend + backend + banco + deploy.",
  "Sem código copiado de tutorial sem entender — isso aparece na entrevista técnica.",
  "LinkedIn atualizado com skills reais e projetos linkados.",
];

const whereToLook = [
  { label: "LinkedIn Jobs",       icon: Globe,     note: "principal canal no Brasil" },
  { label: "Gupy",                icon: Search,    note: "startups e empresas médias" },
  { label: "Programathor",        icon: Globe,     note: "100% tech, filtra por stack" },
  { label: "Wellfound (AngelList)",icon: Globe,    note: "startups globais com remoto" },
  { label: "Remote.com / We Work Remotely", icon: Globe, note: "vagas remotas internacionais" },
  { label: "GitHub Jobs / Discord servidores", icon: Globe,  note: "comunidades de tech BR" },
];

const softSkills = [
  {
    title: "Comunicação escrita",
    desc: "Saber escrever bem num PR, Slack ou email mostra maturidade. Contextualize perguntas, descreva o problema antes de pedir ajuda.",
  },
  {
    title: "Autonomia investigativa",
    desc: "Antes de perguntar, tente: Google, documentação oficial, Stack Overflow. Mostre o que você tentou. Isso é altamente valorizado.",
  },
  {
    title: "Code review com empatia",
    desc: "Dar e receber feedback sem ego. Criticar código, não pessoa. Sugerir com contexto ('o que acha de...') em vez de impor.",
  },
  {
    title: "Entregar o que prometeu",
    desc: "Comprometer com datas realistas e cumprir vale mais que ser o mais rápido. Se algo atrasa, comunique antes — nunca depois.",
  },
];

const communities = [
  { name: "Rocketseat Discord",   href: "https://discord.gg/rocketseat",  note: "maior comunidade dev BR" },
  { name: "Dev.to BR",            href: "https://dev.to",                  note: "escrita técnica, networking" },
  { name: "PodProgramar",         href: "https://podprogramar.com.br",     note: "podcast semanal" },
  { name: "LinkedIn (grupos tech)",href: "https://linkedin.com",           note: "visibilidade profissional" },
  { name: "Reprograma / He4rt",   href: "https://reprograma.com.br",       note: "comunidades inclusivas" },
  { name: "Python Brasil (Telegram)", href: "https://t.me/pythonbrasil",   note: "comunidade ativa de Python" },
];

export function CareerSection() {
  return (
    <section id="mercado" className="mb-16">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Mercado de trabalho</h2>
        <p className="text-sm text-[#8f8f9a] leading-relaxed">
          O que você precisa saber para conseguir seu primeiro emprego como dev.
        </p>
      </div>

      <div className="space-y-6">

        {/* Salaries */}
        <Card icon={TrendingUp} title="Salários reais (2025, Brasil)" iconColor="#10b981">
          <div className="space-y-3">
            {salaries.map((s) => (
              <div key={s.role} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#c8c8d0]">{s.role}</p>
                </div>
                <div className="flex gap-4 text-right flex-shrink-0">
                  <div>
                    <p className="text-[9px] text-[#909098] font-medium">CLT</p>
                    <p className="text-xs font-semibold text-[#a0a0aa]">{s.clt}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#909098] font-medium">PJ</p>
                    <p className="text-xs font-semibold" style={{ color: s.color }}>{s.pj}</p>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-[#9898a8] pt-2 border-t border-[#1e1e28]">
              Valores variam por empresa, cidade e stack. Remote internacional paga 3–5× mais.
            </p>
          </div>
        </Card>

        {/* What recruiters look for */}
        <Card icon={Search} title="O que recrutadores realmente olham" iconColor="#6d5ef5">
          <ul className="space-y-2.5">
            {recruiterItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[10px] font-bold text-[#9898a8] mt-0.5 tabular-nums flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-[#a8a8b4] leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Where to look */}
          <Card icon={Globe} title="Onde encontrar vagas" iconColor="#3b82f6">
            <ul className="space-y-2.5">
              {whereToLook.map((w) => {
                const Icon = w.icon;
                return (
                  <li key={w.label} className="flex items-center gap-2.5">
                    <Icon size={12} className="text-[#9898a8] flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#c0c0c8] truncate">{w.label}</p>
                      <p className="text-[10px] text-[#909098]">{w.note}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Communities */}
          <Card icon={Users} title="Comunidades BR para entrar agora" iconColor="#f59e0b">
            <ul className="space-y-2.5">
              {communities.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2e2e38] mt-1.5 flex-shrink-0 group-hover:bg-[#f59e0b] transition-colors" />
                    <div>
                      <p className="text-xs font-medium text-[#c0c0c8] group-hover:text-[#f59e0b] transition-colors">{c.name}</p>
                      <p className="text-[10px] text-[#909098]">{c.note}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Soft skills */}
        <Card icon={MessageSquare} title="Soft skills que valem mais que stack" iconColor="#8b5cf6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {softSkills.map((s) => (
              <div key={s.title} className="bg-[#111118] border border-[#1e1e28] rounded-lg p-4">
                <p className="text-xs font-semibold text-[#d0d0d8] mb-1.5">{s.title}</p>
                <p className="text-xs text-[#9a9aaa] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Portfolio guide */}
        <Card icon={BookOpen} title="Portfólio que impressiona recrutadores" iconColor="#06b6d4">
          <div className="space-y-3">
            {[
              {
                label: "Projeto 1 — CLI em Python",
                desc: "Gerador de senhas, conversor de arquivos, CLI de produtividade. Simples mas funcional.",
                tag: "Fase 1",
              },
              {
                label: "Projeto 2 — API REST completa",
                desc: "FastAPI + PostgreSQL + JWT + testes + Dockerfile. README com como rodar, endpoints documentados.",
                tag: "Fase 4",
              },
              {
                label: "Projeto 3 — Full-stack",
                desc: "React + TypeScript consumindo sua própria API. Deploy frontend na Vercel, backend no Railway.",
                tag: "Fase 4–5",
              },
              {
                label: "README do perfil GitHub",
                desc: "Foto, bio, skills em badges, projetos em destaque. Contribuições verdes no gráfico mostram atividade.",
                tag: "Sempre",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-[9px] font-semibold px-2 py-1 rounded bg-[#1a1a28] text-[#909098] border border-[#252535] flex-shrink-0 mt-px whitespace-nowrap">
                  {item.tag}
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#c8c8d4]">{item.label}</p>
                  <p className="text-xs mt-0.5 leading-relaxed text-[#909098]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* LinkedIn section */}
        <LinkedInSection />

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   LinkedIn Job Search — full sub-section
───────────────────────────────────────────────────────── */

const booleanExamples = [
  {
    title: "Estágio dev — mais abrangente",
    query: `"estágio" OR "estagio" OR "intern" (desenvolvedor OR "dev" OR programador OR "software") Python OR TypeScript OR React`,
    note: "Cobre variações ortográficas e inglês. Funciona tanto no LinkedIn Jobs quanto na busca geral.",
  },
  {
    title: "Júnior backend Python",
    query: `("junior" OR "júnior" OR "jr") ("desenvolvedor backend" OR "backend developer" OR "software engineer") Python (FastAPI OR Django OR Flask)`,
    note: "Filtra nível claramente. Use aspas para garantir que a frase apareça exata.",
  },
  {
    title: "Fullstack remoto — Brasil",
    query: `("full stack" OR fullstack OR "full-stack") (React OR "Next.js") Python remote OR remoto -senior -sênior`,
    note: "O sinal - exclui resultados. Assim você tira vagas sênior que aparecem junto.",
  },
  {
    title: "Qualquer dev júnior — remoto",
    query: `("dev júnior" OR "desenvolvedor júnior" OR "junior developer" OR "junior engineer") remote OR remoto OR "home office"`,
    note: "Ótimo para varrer todas as stacks e não se limitar só a Python/TS.",
  },
  {
    title: "Estágio tech São Paulo / Remoto",
    query: `(estágio OR estagio OR trainee) (tecnologia OR "software" OR TI OR "dev") ("São Paulo" OR "São Paulo (Remoto)" OR remoto OR híbrido)`,
    note: "Útil para filtrar geolocalização. No LinkedIn, combine com o filtro de cidade.",
  },
];

const linkedinTips = [
  {
    icon: UserCheck,
    title: "Perfil que aparece nas buscas",
    items: [
      "Headline: 'Desenvolvedor Python | TypeScript | Buscando estágio/júnior' — palavras-chave que recrutadores buscam.",
      "Seção 'Sobre': 3-4 linhas. Quem você é, o que domina, o que busca. Sem floreios.",
      "Skills: adicione Python, TypeScript, React, FastAPI, Docker, Git, SQL. Peça endorsements para amigos.",
      "URL personalizada: linkedin.com/in/seunome — mais profissional no currículo.",
      "Foto e banner: foto com boa iluminação, banner com tema de tech (pode ser simples).",
    ],
  },
  {
    icon: Bell,
    title: "Alertas de vaga que funcionam",
    items: [
      "Faça a busca com a query boolean → clique em 'Criar alerta' → recebe email diário ou semanal.",
      "Configure: Tipo = Estágio ou Trainee ou Tempo integral, Nível = Estágio ou Júnior.",
      "Abra Notificações → ative 'Vagas que correspondem ao seu perfil' para sugestões automáticas.",
      "Ative 'Open to Work' (visível só para recrutadores) nas configurações de perfil.",
      "Salve filtros diferentes: um para estágio, um para júnior, um para remoto.",
    ],
  },
  {
    icon: Filter,
    title: "Filtros poderosos no LinkedIn Jobs",
    items: [
      "Nível de experiência: Estágio / Entry level / Júnior — use sempre, elimina 90% do ruído.",
      "Tipo de emprego: Estágio, Tempo integral — marque os dois para maximizar resultados.",
      "Local: cidade ou 'Remote' — para remoto no BR, tente 'Brazil' como local + filtro 'Remote'.",
      "Publicado: últimas 24h ou última semana — candidatos mais rápidos têm vantagem.",
      "Empresa: filtre por tamanho — startups (11-200) contratam mais júnior do que big techs.",
    ],
  },
  {
    icon: Link2,
    title: "Networking que abre portas",
    items: [
      "Conecte com devs da empresa alvo antes de candidatar. Uma conexão já aumenta visibilidade.",
      "Comente com substância nos posts de CTOs e tech leads — não só 'ótimo post'.",
      "Siga empresas de interesse: você recebe notificações de vagas antes de aparecer na busca.",
      "Mensagem direta a recrutadores: curta, direta — 'Olá [nome], vi a vaga X, tenho [skill Y], posso enviar portfólio?'",
      "Participe de grupos do LinkedIn: 'Desenvolvedores Python Brasil', 'React Devs BR'.",
    ],
  },
];

const candidatureScript = `Olá [Nome do Recrutador],

Encontrei a vaga de [Cargo] na [Empresa] e acredito que posso contribuir.

Tenho experiência com [Tech 1] e [Tech 2], com projetos no GitHub em:
→ [link projeto 1] — [1 linha do que faz]
→ [link projeto 2] — [1 linha do que faz]

Posso enviar o currículo ou conversar em 15 min quando for conveniente?

Obrigado(a),
[Seu nome]`;

function LinkedInSection() {
  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card icon={Globe} title="LinkedIn: encontrar vagas com busca boolean" iconColor="#0a66c2">
        <div className="space-y-4">
          <div className="bg-[#0a1520] border border-[#0a3050] rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3b82f6] mb-2">
              O que é busca boolean?
            </p>
            <p className="text-sm text-[#a0a8b8] leading-relaxed">
              Operadores lógicos que refinam qualquer busca — no LinkedIn Jobs, Google, e outros sites.
              São 4 operadores: <span className="text-[#60a5fa] font-mono font-semibold">AND</span>,{" "}
              <span className="text-[#60a5fa] font-mono font-semibold">OR</span>,{" "}
              <span className="text-[#60a5fa] font-mono font-semibold">NOT</span> (ou sinal{" "}
              <span className="text-[#ef4444] font-mono font-semibold">-</span>),{" "}
              <span className="text-[#a78bfa] font-mono font-semibold">"aspas"</span> para frase exata e{" "}
              <span className="text-[#a78bfa] font-mono font-semibold">(parênteses)</span> para agrupar.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {[
                { op: "OR",      ex: "Python OR TypeScript",       desc: "uma coisa ou outra",       color: "#10b981" },
                { op: "AND",     ex: "React AND TypeScript",       desc: "as duas ao mesmo tempo",   color: "#3b82f6" },
                { op: '""',      ex: '"dev júnior"',               desc: "frase exata",              color: "#a78bfa" },
                { op: "-",       ex: "-senior -pleno",             desc: "exclui este termo",        color: "#ef4444" },
              ].map((item) => (
                <div key={item.op} className="bg-[#111820] border border-[#1a2840] rounded-lg p-2.5">
                  <p className="text-sm font-bold font-mono mb-1" style={{ color: item.color }}>{item.op}</p>
                  <p className="text-[10px] font-mono text-[#9898a8] mb-1">{item.ex}</p>
                  <p className="text-[10px] text-[#707080]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-[#9090a0] mb-3">
              Queries prontas para copiar e usar
            </p>
            <div className="space-y-3">
              {booleanExamples.map((ex) => (
                <div key={ex.title} className="bg-[#111118] border border-[#1e1e28] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[#c0c0d0] mb-2">{ex.title}</p>
                  <pre className="text-[11px] text-[#a0c8ff] bg-[#090f1c] border border-[#1a2840] rounded-md p-3 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono mb-2">
                    {ex.query}
                  </pre>
                  <p className="text-[11px] text-[#9090a0] leading-relaxed">{ex.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Tips grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linkedinTips.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-[#16161e] border border-[#222228] rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <Icon size={14} color="#3b82f6" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-[#dcdce4]">{section.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[9px] font-bold text-[#3b82f6] mt-0.5 tabular-nums flex-shrink-0 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-[#a8a8b8] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Message template */}
      <Card icon={MessageSquare} title="Mensagem direta para recrutador — template" iconColor="#8b5cf6">
        <div className="space-y-3">
          <p className="text-xs text-[#9090a0] leading-relaxed">
            Mensagens diretas têm taxa de resposta 3× maior que candidaturas passivas. Personalize o template abaixo:
          </p>
          <pre className="text-[12px] text-[#c8d8f0] bg-[#090f1c] border border-[#1a2840] rounded-lg p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
            {candidatureScript}
          </pre>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "Seja específico — não mande a mesma mensagem para 50 pessoas.",
              "Máximo 5 linhas — recrutadores não leem paredes de texto.",
              "Sempre inclua um link direto do projeto — não peça para buscarem.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 text-[11px] text-[#9090a0] w-full">
                <span className="text-[#8b5cf6] flex-shrink-0 mt-px">→</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </Card>

    </div>
  );
}

function Card({
  icon: Icon,
  title,
  iconColor,
  children,
}: {
  icon: LucideIcon;
  title: string;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#16161e] border border-[#222228] rounded-xl p-5">
      <div className="flex items-center gap-2.5 mb-5">
        <Icon size={14} color={iconColor} strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-[#dcdce4]">{title}</h3>
      </div>
      {children}
    </div>
  );
}
