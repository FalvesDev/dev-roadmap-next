# Dev Roadmap — Python & TypeScript

> Plataforma pessoal de estudos para ir do zero ao dev júnior em 9 meses.  
> Next.js 16 · Tailwind CSS v4 · TypeScript · persistência local sem backend.

---

## O que é

Um dashboard interativo de aprendizado construído para quem está começando do zero e quer se tornar desenvolvedor júnior com Python e TypeScript. Toda a jornada em um só lugar: módulos semanais com checklist, explicações detalhadas por tópico, recursos curados por módulo, trilha de carreira e dicas de mercado de trabalho.

Não é um curso. É o mapa de guerra pessoal.

---

## Funcionalidades

| Área | O que tem |
|---|---|
| **Módulos** | 5 fases · 20 módulos · 88 tópicos com checklist interativo |
| **Explicações** | Cada tópico tem: o que é, por que importa, como funciona, exemplo de código e dica prática |
| **Recursos por módulo** | 50+ artigos, vídeos, docs e ferramentas curados e linkados diretamente no módulo relevante |
| **Progresso** | Donuts SVG por fase, barras de progresso, breakdown por dificuldade — persistido no localStorage |
| **Carreira** | Salários reais 2025 BR, o que recrutadores olham, comunidades, soft skills, guia de portfólio |
| **LinkedIn** | Busca boolean com 5 queries prontas para estágio/júnior, dicas de perfil, alertas, template de DM para recrutadores |
| **Dicas** | Semana ideal de estudos, mapa de conceitos Python/TS/CS/Web, dicas honestas anti-tutorial-hell |
| **Busca global** | `Ctrl+K` — busca em tempo real por tópicos e recursos |
| **Sidebar** | Navegação fixa com scroll spy automático |

---

## Stack

```
Next.js 16.2   App Router, Server + Client Components
TypeScript 5   tipagem estrita em todo o projeto
Tailwind v4    @import "tailwindcss" — sintaxe nova, não misture com v3
lucide-react   ícones consistentes em toda a UI
localStorage   persistência do checklist — zero backend, funciona offline
SVG puro       donuts de progresso sem biblioteca de gráficos
```

---

## Rodando localmente

**Pré-requisitos:** Node.js 20 LTS · npm 10+

```bash
git clone <url-do-repo>
cd dev-roadmap-next

npm install
npm run dev
```

Acesse `http://localhost:3000`

```bash
# Build de produção
npm run build
npm start
```

---

## Estrutura do projeto

```
dev-roadmap-next/
├── app/
│   ├── globals.css           Tailwind v4 + keyframes (fadeInUp, accordion, card-hover)
│   ├── layout.tsx
│   └── page.tsx              Composição de todas as seções
│
├── components/
│   ├── Sidebar.tsx           Navegação lateral fixa com scroll spy
│   ├── StickyProgress.tsx    Barra de progresso global no topo ao rolar
│   ├── ProgressStats.tsx     4 cards: fases, duração, % concluído, projetos
│   ├── ProgressCharts.tsx    Donuts SVG por fase + barras + breakdown por dificuldade
│   ├── ModuleSection.tsx     Núcleo do app: módulos, checklist, recursos, explicações
│   ├── ArticlesSection.tsx   Todos os artigos com filtro por tag
│   ├── ResourceGrid.tsx      Cards de recursos organizados por categoria
│   ├── CareerSection.tsx     Mercado de trabalho, LinkedIn search, soft skills
│   ├── TipsSection.tsx       Dicas honestas, semana ideal, mapa de conceitos
│   ├── GlobalSearch.tsx      Modal Ctrl+K com busca em tempo real
│   └── SearchTrigger.tsx     Botão de busca no hero
│
└── lib/
    ├── roadmap-data.ts       Fonte de dados: fases, módulos, recursos, dicas, semana
    ├── articles-data.ts      50+ artigos com tags, tipo, nível e idioma
    └── topic-descriptions.ts Explicações detalhadas por ID de tópico
```

---

## As 5 fases

```
Fase 1  Fundamentos Absolutos       4–6 semanas
        Terminal & Ambiente · Git & GitHub · Python Básico · Lógica

Fase 2  Programação Intermediária   6–8 semanas
        OOP · Testes (pytest) · Async & Concorrência · HTTP & REST

Fase 3  TypeScript & Web            4–6 semanas
        TypeScript Core · Node.js · HTML & CSS · React

Fase 4  Backend & Banco de Dados    6–8 semanas
        FastAPI · PostgreSQL · Docker & Deploy · Segurança

Fase 5  Portfólio & Empregabilidade 4–6 semanas
        GitHub Portfolio · Entrevistas · Clean Code · Soft Skills
```

---

## Deploy na Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU_USER/dev-roadmap-next)

1. Fork/clone o repositório
2. Conecte ao Vercel (`vercel.com/new`)
3. Deploy automático — nenhuma variável de ambiente necessária

---

## Notas técnicas

**Sem backend** — o estado do checklist vive no `localStorage`. Zero infra, funciona offline, dado permanece entre sessões.

**Sem biblioteca de gráficos** — donuts são SVG puro com `stroke-dasharray`. Sem Chart.js, Recharts ou D3 para algo tão simples.

**Tailwind v4** — usa `@import "tailwindcss"` em vez de `@tailwind base/components/utilities`. Não misture as sintaxes.

**`"use client"` mínimo** — só onde há estado React ou efeitos (checklist, busca, scroll spy). Todo o resto são Server Components.

---

## Personalizando

Todos os dados ficam em `lib/` — sem tocar em componentes:

```ts
// Editar fases, módulos e tópicos do checklist
lib/roadmap-data.ts

// Adicionar ou remover artigos e recursos
lib/articles-data.ts

// Expandir explicações de cada tópico
lib/topic-descriptions.ts
```

---

## Licença

Uso pessoal. Adapte à vontade para o seu próprio roadmap.
