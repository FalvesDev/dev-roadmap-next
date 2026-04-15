export interface ProjectTask {
  id: string;
  label: string;
  hint?: string;
}

export interface GuidedProject {
  phase: number;        // 1–5
  phaseColor: string;
  title: string;
  subtitle: string;
  goal: string;
  duration: string;
  stack: string[];
  deliverables: ProjectTask[];
  readmeTips: string[];
  stretchGoals: string[];
}

export const guidedProjects: GuidedProject[] = [
  {
    phase: 1,
    phaseColor: "#7c6af7",
    title: "Ferramenta CLI em Python",
    subtitle: "Seu primeiro projeto real com lógica, arquivos e terminal",
    goal: "Construir uma ferramenta de linha de comando que resolva um problema real e funcione do início ao fim sem travar.",
    duration: "1–2 semanas",
    stack: ["Python 3.12", "argparse ou click", "os / pathlib", "json ou csv"],
    deliverables: [
      { id: "p1-1", label: "Aceitar argumentos pela linha de comando (--help funcional)", hint: "Use argparse ou click para criar uma CLI profissional" },
      { id: "p1-2", label: "Ler e escrever em pelo menos um arquivo (txt, csv ou json)", hint: "Pratique open(), pathlib.Path e with statements" },
      { id: "p1-3", label: "Tratar erros com mensagens úteis ao usuário (try/except)", hint: "FileNotFoundError, ValueError — nunca deixe o Python mostrar o traceback cru" },
      { id: "p1-4", label: "README explicando o que faz, como instalar e exemplos de uso", hint: "Inclua pelo menos 3 exemplos de comandos com output esperado" },
      { id: "p1-5", label: "Repositório no GitHub com .gitignore configurado", hint: "Ignore __pycache__, .env, *.pyc" },
      { id: "p1-6", label: "Pelo menos 1 função testável com pytest", hint: "Mesmo uma função simples já demonstra que você sabe testar" },
    ],
    readmeTips: [
      "## O que faz\nFerramenta CLI para [descreva em 1 linha].\n\n## Instalação\n```bash\npip install -r requirements.txt\n```\n\n## Uso\n```bash\npython main.py --input arquivo.csv --output resultado.json\n```",
    ],
    stretchGoals: [
      "Publicar no PyPI como pacote instalável com pip install",
      "Adicionar modo interativo com prompt_toolkit ou questionary",
      "Criar Makefile com comandos comuns (test, lint, run)",
    ],
  },
  {
    phase: 2,
    phaseColor: "#3b82f6",
    title: "Automação com Python + Dados",
    subtitle: "Processar dados reais, gerar relatório e agendar execução",
    goal: "Criar um script que busca dados de uma fonte real (API pública ou arquivo), processa e gera um relatório útil automaticamente.",
    duration: "2–3 semanas",
    stack: ["Python 3.12", "requests", "pandas (opcional)", "json / csv", "schedule ou cron"],
    deliverables: [
      { id: "p2-1", label: "Consumir uma API pública com requests (ex: GitHub, OpenWeather, PokeAPI)", hint: "Use requests.get(), verifique status_code, parse o JSON" },
      { id: "p2-2", label: "Processar e filtrar os dados (ordenar, agrupar, calcular métricas)", hint: "Funções puras que recebem lista e retornam lista — fáceis de testar" },
      { id: "p2-3", label: "Salvar resultado em CSV ou JSON com timestamp no nome do arquivo", hint: "f'relatorio_{datetime.now().strftime(\"%Y%m%d_%H%M\")}.csv'" },
      { id: "p2-4", label: "Tratamento de erros de rede (timeout, 404, rate limit)", hint: "requests.exceptions.RequestException, retry com backoff" },
      { id: "p2-5", label: "Logging em vez de print() no código de produção", hint: "import logging — LOG_LEVEL configurável por variável de ambiente" },
      { id: "p2-6", label: "Testes cobrindo pelo menos as funções de processamento", hint: "Mock as chamadas de API com unittest.mock.patch" },
      { id: "p2-7", label: "README com instruções e exemplo de output gerado", hint: "Inclua print de terminal ou CSV de exemplo no README" },
    ],
    readmeTips: [
      "## O que faz\nBusca [dados] da API do [serviço] e gera relatório em CSV com [métricas].\n\n## Output de exemplo\n```\ndata,item,valor\n2025-01-15,Python,⭐ 62.8k\n2025-01-15,TypeScript,⭐ 43.1k\n```",
    ],
    stretchGoals: [
      "Dashboard simples com matplotlib ou plotly exportando PNG",
      "Enviar relatório por email com smtplib",
      "Agendar com GitHub Actions (cron job gratuito)",
    ],
  },
  {
    phase: 3,
    phaseColor: "#8b5cf6",
    title: "API REST com FastAPI + PostgreSQL",
    subtitle: "Backend real com autenticação, banco e documentação automática",
    goal: "Construir uma API REST completa com CRUD, autenticação JWT, banco de dados relacional e testes automatizados.",
    duration: "3–4 semanas",
    stack: ["Python 3.12", "FastAPI", "PostgreSQL", "SQLAlchemy / SQLModel", "JWT (python-jose)", "pytest", "Docker"],
    deliverables: [
      { id: "p3-1", label: "CRUD completo para pelo menos 2 entidades (ex: users + posts)", hint: "GET /items, POST /items, PUT /items/{id}, DELETE /items/{id}" },
      { id: "p3-2", label: "Autenticação JWT: register, login, token refresh", hint: "Hash de senha com bcrypt, token expirável, rota protegida com Depends" },
      { id: "p3-3", label: "Banco de dados PostgreSQL com migrations (Alembic)", hint: "Nunca faça alter table manual — use alembic revision + upgrade" },
      { id: "p3-4", label: "Validação de dados com Pydantic (schemas separados para create/update/response)", hint: "UserCreate != UserResponse — nunca expor campos de senha na response" },
      { id: "p3-5", label: "Testes com pytest cobrindo happy path e casos de erro", hint: "TestClient do FastAPI + banco de teste separado com fixtures" },
      { id: "p3-6", label: "Docker Compose com API + banco rodando com um comando", hint: "docker-compose up --build deve subir tudo sem configuração manual" },
      { id: "p3-7", label: "Swagger UI documentado e funcional em /docs", hint: "Adicione description, summary e exemplos nos endpoints" },
      { id: "p3-8", label: "Variáveis de ambiente em .env (nunca secrets no código)", hint: "python-dotenv + .env.example no repo (nunca o .env real)" },
    ],
    readmeTips: [
      "## Endpoints\n| Método | Rota | Auth | Descrição |\n|--------|------|------|-----------|\n| POST | /auth/register | — | Cria usuário |\n| POST | /auth/login | — | Retorna JWT |\n| GET | /items | ✓ | Lista itens |\n\n## Rodando localmente\n```bash\ndocker-compose up --build\n# API em http://localhost:8000/docs\n```",
    ],
    stretchGoals: [
      "Deploy no Railway ou Render com PostgreSQL gerenciado",
      "Rate limiting com slowapi",
      "WebSocket para notificações em tempo real",
    ],
  },
  {
    phase: 4,
    phaseColor: "#10b981",
    title: "Aplicação Full-Stack",
    subtitle: "Frontend React + TypeScript consumindo sua própria API",
    goal: "Criar uma aplicação completa com interface, consumo de API, autenticação no frontend e deploy de ambas as partes.",
    duration: "4–5 semanas",
    stack: ["React 18 + TypeScript", "Next.js ou Vite", "Tailwind CSS", "React Query ou SWR", "FastAPI (backend)", "Vercel + Railway"],
    deliverables: [
      { id: "p4-1", label: "Login e registro com JWT armazenado de forma segura (httpOnly cookie ou memory)", hint: "Nunca salvar JWT em localStorage — use httpOnly cookie ou memory" },
      { id: "p4-2", label: "Pelo menos 3 telas distintas com roteamento (Next.js App Router ou React Router)", hint: "/, /login, /dashboard no mínimo — layout compartilhado" },
      { id: "p4-3", label: "Listagem com busca e filtro em tempo real (debounced)", hint: "useDebounce hook + useQuery do React Query para cache automático" },
      { id: "p4-4", label: "Formulário com validação client-side e server-side (Zod + React Hook Form)", hint: "Erros da API aparecem no campo correto, não como alert" },
      { id: "p4-5", label: "Loading states, empty states e error boundaries tratados na UI", hint: "Skeleton loading, mensagem vazia amigável, fallback de erro" },
      { id: "p4-6", label: "Deploy: frontend na Vercel, backend no Railway", hint: "Configure CORS no FastAPI para o domínio Vercel, variáveis de ambiente em ambos" },
      { id: "p4-7", label: "TypeScript strict mode sem erros ou any implícito", hint: "tsconfig: strict: true — resolva todos os erros, não use any como atalho" },
    ],
    readmeTips: [
      "## Demo\n🔗 [Ver app ao vivo](https://meu-projeto.vercel.app)\n\n## Arquitetura\n```\nfrontend/     — Next.js + TypeScript (Vercel)\nbackend/      — FastAPI + PostgreSQL (Railway)\n```\n\n## Screenshots\n[Adicione 2–3 prints das principais telas]",
    ],
    stretchGoals: [
      "Dark/light mode com Tailwind e persistência",
      "Upload de imagens com presigned URLs (S3 ou Cloudflare R2)",
      "Testes E2E com Playwright ou Cypress",
    ],
  },
  {
    phase: 5,
    phaseColor: "#f59e0b",
    title: "Projeto de Portfólio Final",
    subtitle: "Aplicação production-ready que vai para o LinkedIn e currículo",
    goal: "Construir algo que resolva um problema real, com qualidade de produção: testes, CI/CD, monitoramento básico e documentação exemplar.",
    duration: "4–6 semanas",
    stack: ["Stack da sua escolha", "Docker + Docker Compose", "GitHub Actions (CI/CD)", "PostgreSQL", "Redis (opcional)", "Sentry ou Datadog (opcional)"],
    deliverables: [
      { id: "p5-1", label: "Resolve um problema real que você pode explicar em 30 segundos", hint: "Se você precisar de mais de 30 segundos para explicar, o escopo está muito grande" },
      { id: "p5-2", label: "CI/CD com GitHub Actions: roda tests + deploy automático no push", hint: "Workflow: install → lint → test → build → deploy. Badge verde no README" },
      { id: "p5-3", label: "Coverage de testes ≥ 70% nas partes críticas (auth, regras de negócio)", hint: "pytest-cov para Python, Vitest para TypeScript" },
      { id: "p5-4", label: "README.md com demo, arquitetura, como rodar e decisões técnicas", hint: "Seção 'Decisões técnicas' = por que escolheu X e não Y. Impressiona em entrevistas" },
      { id: "p5-5", label: "Variáveis de ambiente documentadas em .env.example", hint: "Todo segredo que o projeto precisa deve estar neste arquivo (sem os valores)" },
      { id: "p5-6", label: "Logs estruturados em produção (não print(), JSON logging)", hint: "structlog (Python) ou pino (Node) — logs que você consegue buscar depois" },
      { id: "p5-7", label: "URL pública funcionando há pelo menos 1 semana antes de colocar no currículo", hint: "Teste os fluxos principais antes de qualquer entrevista. Nada pior que demo quebrado" },
      { id: "p5-8", label: "Post no LinkedIn ou dev.to explicando o que aprendeu construindo", hint: "Não precisa ser perfeito. 'Construí X e aprendi Y' já demonstra capacidade de reflexão" },
    ],
    readmeTips: [
      "## O problema que resolvo\n[1–2 frases claras, sem jargão técnico]\n\n## Demo ao vivo\n🔗 https://...\n\n## Stack\n| Camada | Tecnologia | Por quê |\n|--------|-----------|--------|\n| Backend | FastAPI | ... |\n\n## Decisões técnicas\n- **Por que PostgreSQL e não MongoDB**: ...\n- **Por que React Query e não Redux**: ...\n\n## Como rodar localmente\n```bash\ngit clone ...\ncp .env.example .env\ndocker-compose up --build\n```",
    ],
    stretchGoals: [
      "Apresentar o projeto em meetup local ou gravando um vídeo de 5 min",
      "Escrever artigo técnico sobre um problema que resolveu",
      "Contribuir com uma issue no repositório de uma dependência que usou",
    ],
  },
];
