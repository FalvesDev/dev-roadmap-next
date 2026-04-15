# Dev Roadmap — Python & TypeScript

> Plataforma completa e gratuita para ir do zero ao desenvolvedor júnior em 9 meses.  
> Open source · 100% local · Sem backend · Sem cadastro.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## O que é

Um dashboard de estudos interativo e gamificado que guia o desenvolvedor do zero até o nível júnior com Python e TypeScript. Tudo funciona no browser, sem conta, sem servidor — progresso salvo em `localStorage`.

---

## Features

### Aprendizado Estruturado
| Feature | Descrição |
|---|---|
| **Checklist de 95 itens** | 5 fases, semana a semana, com explicações detalhadas em cada item |
| **Projetos guiados** | 5 projetos práticos (CLI → Automação → FastAPI → Full-stack → Portfolio) com checklist de entregáveis |
| **Quiz por fase** | 30 questões de múltipla escolha, desbloqueadas ao completar 80% de cada fase |
| **Flashcards** | Sessões de revisão com 10 questões aleatórias, por categoria, com resultado ao final |
| **Desafio do dia** | 1 conceito do glossário ou questão de quiz por dia, rotacionando pela data |
| **Glossário técnico** | 45+ termos (Python, TypeScript, SQL, HTTP/REST, Git, Geral) com exemplos de código |

### Acompanhamento de Progresso
| Feature | Descrição |
|---|---|
| **Streak diário** | Heatmap de 35 dias, streak atual e melhor streak, botão "Estudei hoje" |
| **Meta semanal** | Define X horas/semana, dots de presença diária, barra de conclusão |
| **Timer Pomodoro** | Sessões 25/5 min com ring SVG animado, beep via WebAudio API, integrado ao streak |
| **Estatísticas** | Progresso por fase, estimativa de conclusão baseada no ritmo de estudo |
| **Gráficos** | Barras de progresso por categoria, distribuição de tópicos |
| **Histórico de atividade** | Calendário mensal navegável + heatmap de 52 semanas estilo GitHub |

### Engajamento & Gamificação
| Feature | Descrição |
|---|---|
| **Conquistas (badges)** | 16 badges desbloqueáveis: streaks, % concluído, fases, pomodoros, notas, projetos |
| **PhaseCompleteModal** | Modal de troféu ao concluir cada fase (uma vez por fase) |
| **NextStepWidget** | Sempre mostra o próximo item não concluído em tempo real |
| **Notas por item** | Anotações inline em qualquer item do checklist com indicador visual |
| **Flag para revisão** | Marca itens para revisar mais tarde com ícone de bandeira |
| **Onboarding** | Fluxo de 2 etapas para novos usuários: horas/dia + trilha de aprendizado |

### Personalização
| Feature | Descrição |
|---|---|
| **Trilhas de aprendizado** | 4 trilhas: Full-stack, Back-end, Front-end, Data Science |
| **Dark / Light mode** | Toggle com persistência, sem flash inicial |
| **i18n PT-BR / EN** | Toggle 🌐, strings de UI traduzidas |
| **Resetar fase** | Reinicia checklist de uma fase individualmente |

### Ferramentas
| Feature | Descrição |
|---|---|
| **Busca global** | Pesquisa em tempo real por módulos, artigos, recursos, entrevistas, glossário |
| **Exportar PNG** | Gera imagem 560×280 do progresso para compartilhar (Canvas API) |
| **Certificado** | Canvas 900×636px com nome personalizado, disponível ao atingir 100% |
| **Compartilhar perfil** | URL com progresso encodado + botões Twitter/X e LinkedIn |
| **Backup / Restore JSON** | Exporta e importa todos os dados do app (11 keys do localStorage) |
| **Atalhos de teclado** | `Cmd+K` busca, `P` pomodoro, `F` flashcards, `N` notas, `Q` quiz, `?` atalhos |
| **PWA** | Instalável no Android/iOS/Desktop via manifest.json |
| **Tab dinâmica** | Título da aba com 🔥 streak quando ≥ 3 dias |

### Conteúdo
| Seção | Volume |
|---|---|
| Checklist de módulos | 95 itens em 5 fases |
| Artigos & Vídeos | 60+ recursos curados |
| Links curados | 50+ ferramentas e referências |
| Perguntas de entrevista | 26 questões em 5 categorias |
| Projetos guiados | 5 projetos com entregáveis detalhados |
| Glossário | 45+ termos técnicos |
| Quiz | 30 questões em 5 fases |
| Arquitetura & Redes | 6 grupos temáticos incluindo Arq. de Computadores |
| Trilha de carreira | Currículo, portfólio, entrevistas, mercado BR/EUA |

---

## Tech Stack

- **Framework**: [Next.js 16.2](https://nextjs.org) (App Router, Turbopack, static export)
- **Linguagem**: TypeScript 5
- **Estilização**: Tailwind CSS v4 + CSS Variables + keyframe animations
- **Ícones**: [Lucide React](https://lucide.dev)
- **Persistência**: localStorage (sem backend, sem banco)
- **Gráficos/Imagens**: HTML5 Canvas API nativo
- **Áudio**: Web Audio API nativo (beep do Pomodoro)

---

## Rodando localmente

```bash
git clone https://github.com/FalvesDev/dev-roadmap-next.git
cd dev-roadmap-next
npm install
npm run dev
```

Abre em `http://localhost:3000`.

```bash
npm run build   # build de produção
npm run start   # servir o build
```

---

## Deploy

### Vercel (recomendado)

1. Faça fork do repositório
2. Importe em [vercel.com/new](https://vercel.com/new)
3. Clique em **Deploy** — zero configuração necessária

O projeto é um app Next.js padrão sem variáveis de ambiente ou banco de dados, então o deploy é imediato.

### Netlify / Cloudflare Pages

```bash
npm run build
# Faça upload da pasta .next (ou configure o build command: npm run build)
```

---

## Estrutura do projeto

```
dev-roadmap-next/
├── app/
│   ├── layout.tsx           # Providers: I18n, Theme, Path + skip-to-content
│   ├── page.tsx             # Página principal com todos os modais e keyboard shortcuts
│   └── globals.css          # Tailwind v4, dark/light mode, animações, a11y
├── components/              # 42+ componentes React client-side
│   ├── ModuleSection.tsx    # Checklist principal (95 itens, 5 fases)
│   ├── ProjectsSection.tsx  # Projetos guiados com entregáveis
│   ├── InterviewSection.tsx # Prep para entrevistas técnicas
│   ├── GlossarySection.tsx  # Glossário técnico interativo
│   ├── PomodoroTimer.tsx    # Timer Pomodoro com WebAudio
│   ├── AchievementsPanel.tsx# 16 badges de conquistas
│   ├── Certificate.tsx      # Certificado de conclusão em Canvas
│   ├── DailyChallenge.tsx   # Desafio do dia (quiz ou conceito)
│   ├── KeyboardShortcuts.tsx# Atalhos de teclado + hook global
│   ├── ActivityTimeline.tsx # Heatmap e calendário de atividade
│   ├── ShareProfile.tsx     # Compartilhamento com URL encodada
│   ├── BackupRestore.tsx    # Export/import JSON completo
│   └── ...
├── lib/
│   ├── interview-data.ts    # 26 questões de entrevista
│   ├── projects-data.ts     # 5 projetos guiados
│   ├── glossary-data.ts     # 45+ termos do glossário
│   ├── quiz-data.ts         # 30 questões de quiz em 5 fases
│   ├── achievements-data.ts # 16 badges com lógica de desbloqueio
│   └── i18n.ts              # Traduções PT-BR / EN
└── public/
    └── manifest.json        # PWA manifest
```

---

## localStorage Keys

Todos os dados ficam no browser do usuário — nunca saem do dispositivo:

| Key | Conteúdo |
|---|---|
| `roadmap_checks_v1` | Itens do checklist marcados |
| `roadmap_notes_v1` | Notas por item |
| `roadmap_streak_v1` | Streak, histórico de dias estudados |
| `roadmap_path_v1` | Trilha de aprendizado selecionada |
| `roadmap_theme_v1` | Tema dark/light |
| `roadmap_projects_v1` | Tarefas de projetos guiados |
| `roadmap_pomodoro_v1` | Sessões Pomodoro (hoje, total) |
| `roadmap_weekly_goal_v1` | Meta semanal em horas |
| `roadmap_celebrated_v1` | Fases já celebradas (evita modal repetido) |
| `roadmap_onboarded_v1` | Flag de onboarding concluído |
| `roadmap_locale_v1` | Idioma selecionado (pt/en) |

---

## Atalhos de Teclado

| Atalho | Ação |
|---|---|
| `Cmd/Ctrl + K` | Abrir busca global |
| `P` | Iniciar / pausar Pomodoro |
| `F` | Abrir flashcards |
| `N` | Minhas notas |
| `Q` | Quiz |
| `?` | Ver todos os atalhos |
| `Esc` | Fechar modal aberto |

---

## Contribuindo

Issues e PRs são bem-vindos!

1. Fork o repositório
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Commit: `git commit -m "feat: minha feature"`
4. Push: `git push origin feat/minha-feature`
5. Abra um Pull Request

Ideias de melhoria estão documentadas em [`melhorias e futuras features.md`](./melhorias%20e%20futuras%20features.md).

---

## Licença

[MIT](LICENSE) — use, modifique e distribua livremente.

---

<p align="center">Feito com 💜 para a comunidade dev brasileira</p>
