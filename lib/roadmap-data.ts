export type Difficulty = "easy" | "medium" | "hard";

export interface CheckItem {
  id: string;
  label: string;
  meta: string;
  difficulty: Difficulty;
}

export interface ChecklistCard {
  title: string;
  subtitle: string;
  items: CheckItem[];
}

export interface Phase {
  id: string;
  number: string;
  duration: string;
  title: string;
  description: string;
  color: string;
  topics: string[];
  cards: ChecklistCard[];
}

export interface Resource {
  type: "free" | "paid" | "book" | "ptbr" | "en" | "idea";
  label: string;
  href?: string;
}

export interface ResourceCard {
  title: string;
  items: Resource[];
}

export const phases: Phase[] = [
  {
    id: "f1",
    number: "Fase 1",
    duration: "4–6 semanas",
    title: "🏗 Fundamentos Absolutos",
    description:
      "Base que todo dev precisa. Sem isso, tudo mais vai desmoronar. Não pule esta fase.",
    color: "#7c6af7",
    topics: ["Lógica", "Terminal", "Git", "Python básico", "Tipos"],
    cards: [
      {
        title: "🖥 Terminal & Ambiente",
        subtitle: "Configurar seu campo de batalha antes de qualquer coisa",
        items: [
          { id: "f1-1", label: "Instalar Python 3.12+ e Node 20 LTS", meta: "python.org + nodejs.org", difficulty: "easy" },
          { id: "f1-2", label: "Configurar VSCode com extensões (Python, ESLint, Prettier)", meta: "MS Python, Pylance, ESLint, GitLens", difficulty: "easy" },
          { id: "f1-3", label: "Aprender comandos básicos do terminal (ls, cd, mkdir, rm)", meta: "PowerShell ou WSL2/bash no Windows", difficulty: "easy" },
          { id: "f1-4", label: "Criar virtualenv e entender ambientes virtuais Python", meta: "python -m venv + pip", difficulty: "easy" },
          { id: "f1-5", label: "Entender PATH e variáveis de ambiente", meta: "Conceito crítico mas ignorado", difficulty: "medium" },
        ],
      },
      {
        title: "🔀 Git & GitHub",
        subtitle: "Controle de versão é inegociável no mercado",
        items: [
          { id: "f1-6", label: "Entender o que é Git e por que usar", meta: "Snapshots, linha do tempo, branches", difficulty: "easy" },
          { id: "f1-7", label: "Comandos: init, add, commit, push, pull, clone", meta: "Workflow básico diário", difficulty: "easy" },
          { id: "f1-8", label: "Criar conta GitHub e primeiro repositório", meta: "Foto, bio e README no perfil", difficulty: "easy" },
          { id: "f1-9", label: "Branches, merge e pull requests", meta: "main/feature-x, merge, PR básico", difficulty: "medium" },
          { id: "f1-10", label: "Entender .gitignore e boas práticas de commit", meta: "Conventional Commits (feat:, fix:, docs:)", difficulty: "easy" },
        ],
      },
      {
        title: "🐍 Python — Básico",
        subtitle: "A linguagem mais legível e versátil para começar",
        items: [
          { id: "f1-11", label: "Tipos primitivos: int, float, str, bool, None", meta: "type(), conversões, imutabilidade", difficulty: "easy" },
          { id: "f1-12", label: "Estruturas de dados: list, dict, tuple, set", meta: "Operações, métodos, quando usar cada um", difficulty: "easy" },
          { id: "f1-13", label: "Controle de fluxo: if/elif/else, for, while", meta: "break, continue, range(), enumerate()", difficulty: "easy" },
          { id: "f1-14", label: "Funções: def, args, kwargs, return, escopo", meta: "Parâmetros default, *args, **kwargs", difficulty: "medium" },
          { id: "f1-15", label: "Manipulação de strings e f-strings", meta: "split, join, strip, replace, formatação", difficulty: "easy" },
          { id: "f1-16", label: "Leitura e escrita de arquivos (open, with)", meta: "read, write, CSV básico", difficulty: "easy" },
        ],
      },
      {
        title: "🧮 Lógica de Programação",
        subtitle: "Pensar como programador antes de decorar sintaxe",
        items: [
          { id: "f1-17", label: "Decomposição de problemas", meta: "Quebrar problema grande em partes menores", difficulty: "medium" },
          { id: "f1-18", label: "Pseudocódigo e fluxogramas", meta: "Planejar antes de codar", difficulty: "easy" },
          { id: "f1-19", label: "Recursão — o que é e quando usar", meta: "factorial, fibonacci como exemplos", difficulty: "medium" },
          { id: "f1-20", label: "Complexidade básica: O(n), O(1), O(n²)", meta: "Só o conceito intuitivo por agora", difficulty: "medium" },
        ],
      },
    ],
  },
  {
    id: "f2",
    number: "Fase 2",
    duration: "6–8 semanas",
    title: "🧠 Programação Intermediária",
    description:
      "Estrutura de dados, OOP, erros, testes. Onde a maioria dos devs se separa dos bons devs.",
    color: "#3b82f6",
    topics: ["OOP", "Algoritmos", "Testes", "Async", "APIs"],
    cards: [
      {
        title: "🏛 OOP — Orientação a Objetos",
        subtitle: "Entender OOP é obrigatório em qualquer empresa",
        items: [
          { id: "f2-1", label: "Classes, objetos, atributos e métodos", meta: "__init__, self, instância vs classe", difficulty: "medium" },
          { id: "f2-2", label: "Herança, polimorfismo e encapsulamento", meta: "Os 4 pilares na prática", difficulty: "medium" },
          { id: "f2-3", label: "Métodos especiais: __str__, __repr__, __eq__", meta: "dunder methods / magic methods", difficulty: "medium" },
          { id: "f2-4", label: "Composição vs Herança (prefer composition)", meta: "Princípio que todo júnior ignora", difficulty: "hard" },
          { id: "f2-5", label: "Dataclasses e typing no Python", meta: "@dataclass, Optional, List, Dict", difficulty: "medium" },
        ],
      },
      {
        title: "🧪 Testes",
        subtitle: "Quem não testa não tem confiança para deployar",
        items: [
          { id: "f2-6", label: "O que são testes e tipos (unit, integration)", meta: "Por que testar desde o início", difficulty: "easy" },
          { id: "f2-7", label: "pytest — escrever e rodar testes em Python", meta: "assert, fixtures, parametrize", difficulty: "medium" },
          { id: "f2-8", label: "TDD básico — Red, Green, Refactor", meta: "Ciclo de desenvolvimento guiado por testes", difficulty: "medium" },
          { id: "f2-9", label: "Mocks e stubs — isolar dependências", meta: "unittest.mock, patch", difficulty: "hard" },
        ],
      },
      {
        title: "⚡ Async & Concorrência",
        subtitle: "Essencial para APIs e aplicações modernas",
        items: [
          { id: "f2-10", label: "Diferença entre síncrono e assíncrono", meta: "Blocking vs non-blocking I/O", difficulty: "medium" },
          { id: "f2-11", label: "asyncio, async/await em Python", meta: "event loop, coroutines, await", difficulty: "hard" },
          { id: "f2-12", label: "Promises e async/await em JavaScript/TS", meta: "then/catch, async/await, try/catch", difficulty: "medium" },
        ],
      },
      {
        title: "🌐 HTTP & APIs REST",
        subtitle: "A lingua franca da web moderna",
        items: [
          { id: "f2-13", label: "O que é HTTP, request/response, status codes", meta: "200, 201, 400, 401, 404, 500", difficulty: "easy" },
          { id: "f2-14", label: "Verbos HTTP: GET, POST, PUT, PATCH, DELETE", meta: "Quando usar cada um", difficulty: "easy" },
          { id: "f2-15", label: "JSON — estrutura, parse, stringify", meta: "json.loads / json.dumps em Python", difficulty: "easy" },
          { id: "f2-16", label: "Consumir APIs com requests (Python) e fetch (JS)", meta: "headers, auth, error handling", difficulty: "medium" },
          { id: "f2-17", label: "Usar Postman ou Insomnia para testar APIs", meta: "Ferramenta fundamental no dia a dia", difficulty: "easy" },
        ],
      },
    ],
  },
  {
    id: "f3",
    number: "Fase 3",
    duration: "4–6 semanas",
    title: "📘 TypeScript & Web",
    description:
      "Entra TypeScript de verdade. HTML, CSS básico, DOM, React primeiro contato.",
    color: "#7c6af7",
    topics: ["TypeScript", "Node.js", "HTML/CSS", "React"],
    cards: [
      {
        title: "📘 TypeScript Core",
        subtitle: "JS com superpoderes — padrão da indústria hoje",
        items: [
          { id: "f3-1", label: "JavaScript básico: var/let/const, arrays, objetos", meta: "Precisa de JS antes de TS", difficulty: "easy" },
          { id: "f3-2", label: "TypeScript: tipos básicos, interface, type", meta: "string, number, boolean, array, union", difficulty: "medium" },
          { id: "f3-3", label: "Generics em TypeScript", meta: "T, extends, constraints", difficulty: "hard" },
          { id: "f3-4", label: "tsconfig.json e compilação", meta: "strict mode, target, moduleResolution", difficulty: "medium" },
          { id: "f3-5", label: "ES Modules: import/export", meta: "default vs named exports", difficulty: "easy" },
        ],
      },
      {
        title: "🌳 Node.js & npm/pnpm",
        subtitle: "Runtime JavaScript no servidor",
        items: [
          { id: "f3-6", label: "O que é Node.js e como funciona", meta: "Event loop, non-blocking I/O", difficulty: "medium" },
          { id: "f3-7", label: "npm/pnpm: instalar, package.json, scripts", meta: "install, run, build, devDependencies", difficulty: "easy" },
          { id: "f3-8", label: "Módulos built-in: fs, path, http", meta: "Leitura de arquivos, paths, servidor básico", difficulty: "medium" },
          { id: "f3-9", label: "Criar servidor HTTP básico com Node puro", meta: "Antes de usar Express, entenda o básico", difficulty: "medium" },
        ],
      },
      {
        title: "🎨 HTML & CSS (mínimo necessário)",
        subtitle: "Não precisa ser designer, mas precisa entender",
        items: [
          { id: "f3-10", label: "HTML semântico: section, header, nav, main", meta: "Acessibilidade e SEO básico", difficulty: "easy" },
          { id: "f3-11", label: "CSS: box model, flexbox, grid", meta: "80% do que você vai usar", difficulty: "medium" },
          { id: "f3-12", label: "Responsivo: media queries básicas", meta: "Mobile first", difficulty: "medium" },
        ],
      },
      {
        title: "⚛️ React — Primeiro contato",
        subtitle: "Framework mais demandado do mercado",
        items: [
          { id: "f3-13", label: "O que é JSX/TSX e como funciona", meta: "Sintaxe, expressões, condicional", difficulty: "medium" },
          { id: "f3-14", label: "Componentes funcionais e props", meta: "Criar, reutilizar, tipar props com TS", difficulty: "medium" },
          { id: "f3-15", label: "Hooks: useState, useEffect", meta: "State, side effects, dependências", difficulty: "medium" },
          { id: "f3-16", label: "Fetching de dados com useEffect + fetch/axios", meta: "Loading states, error handling", difficulty: "medium" },
          { id: "f3-17", label: "React Router v6 — navegação básica", meta: "Route, Link, useParams", difficulty: "medium" },
        ],
      },
    ],
  },
  {
    id: "f4",
    number: "Fase 4",
    duration: "6–8 semanas",
    title: "⚙️ Backend & Banco de Dados",
    description:
      "FastAPI, Express, PostgreSQL, ORMs, autenticação. O coração do trabalho real.",
    color: "#10b981",
    topics: ["FastAPI", "Express", "SQL", "ORM", "JWT", "Docker"],
    cards: [
      {
        title: "🐍 FastAPI (Python Backend)",
        subtitle: "O framework Python mais moderno para APIs",
        items: [
          { id: "f4-1", label: "Criar API com rotas GET, POST, PUT, DELETE", meta: "@app.get, @app.post, path params, query params", difficulty: "medium" },
          { id: "f4-2", label: "Pydantic para validação de dados", meta: "BaseModel, Field, validators", difficulty: "medium" },
          { id: "f4-3", label: "Dependências e middleware", meta: "Depends(), CORS, auth middleware", difficulty: "hard" },
          { id: "f4-4", label: "Autenticação JWT", meta: "Bearer tokens, OAuth2 flow básico", difficulty: "hard" },
        ],
      },
      {
        title: "🗄 Banco de Dados",
        subtitle: "Todo app precisa persistir dados. Aprenda direito.",
        items: [
          { id: "f4-5", label: "SQL básico: SELECT, INSERT, UPDATE, DELETE", meta: "WHERE, ORDER BY, LIMIT, JOINs simples", difficulty: "medium" },
          { id: "f4-6", label: "Modelagem: tabelas, PKs, FKs, relacionamentos", meta: "1:1, 1:N, N:M — diagramas ER", difficulty: "medium" },
          { id: "f4-7", label: "SQLAlchemy ou Prisma (ORM)", meta: "Nunca escrever SQL cru em produção", difficulty: "hard" },
          { id: "f4-8", label: "PostgreSQL — instalar, conectar, CRUD", meta: "Banco relacional mais usado em startups", difficulty: "medium" },
          { id: "f4-9", label: "Migrações de banco (Alembic ou Prisma migrate)", meta: "Versionar schema do banco", difficulty: "hard" },
        ],
      },
      {
        title: "🐳 Docker & Deploy Básico",
        subtitle: "Não saber Docker em 2026 é problemático",
        items: [
          { id: "f4-10", label: "O que é Docker e por que containers", meta: "VM vs container, portabilidade", difficulty: "medium" },
          { id: "f4-11", label: "Dockerfile para app Python e Node", meta: "FROM, RUN, COPY, CMD, EXPOSE", difficulty: "medium" },
          { id: "f4-12", label: "docker-compose para múltiplos serviços", meta: "app + banco + redis juntos", difficulty: "hard" },
          { id: "f4-13", label: "Deploy no Railway, Render ou Fly.io", meta: "Gratuitos para projetos pequenos/portfólio", difficulty: "medium" },
        ],
      },
      {
        title: "🔐 Segurança Básica",
        subtitle: "Um júnior que sabe de segurança vale muito mais",
        items: [
          { id: "f4-14", label: "OWASP Top 10 — os principais ataques", meta: "SQL Injection, XSS, CSRF, IDOR", difficulty: "medium" },
          { id: "f4-15", label: "Nunca expor secrets no código", meta: ".env, python-dotenv, .gitignore", difficulty: "easy" },
          { id: "f4-16", label: "Hashing de senhas com bcrypt", meta: "Nunca salvar senha em texto puro", difficulty: "easy" },
          { id: "f4-17", label: "HTTPS e certificados (conceito)", meta: "TLS, Let's Encrypt, HSTS", difficulty: "medium" },
        ],
      },
    ],
  },
  {
    id: "f5",
    number: "Fase 5",
    duration: "4–6 semanas",
    title: "🚀 Portfólio & Empregabilidade",
    description:
      "Projetos reais, GitHub bem montado, LinkedIn técnico, prep para entrevistas.",
    color: "#f59e0b",
    topics: ["Projetos", "README", "Deploy", "Entrevistas"],
    cards: [
      {
        title: "💼 Portfólio no GitHub",
        subtitle: "Seu portfólio fala mais que seu currículo",
        items: [
          { id: "f5-1", label: "README.md profissional no perfil GitHub", meta: "Foto, bio, skills, projetos em destaque", difficulty: "easy" },
          { id: "f5-2", label: "Projeto 1: CLI tool em Python", meta: "Ex: gerador de senhas, conversor de arquivos", difficulty: "medium" },
          { id: "f5-3", label: "Projeto 2: API REST com FastAPI + PostgreSQL", meta: "Auth, CRUD completo, testes, Dockerfile", difficulty: "hard" },
          { id: "f5-4", label: "Projeto 3: Full-stack com React + TypeScript + API", meta: "Frontend consome sua própria API", difficulty: "hard" },
          { id: "f5-5", label: "README perfeito em cada projeto", meta: "Demo GIF, como rodar, techs usadas", difficulty: "easy" },
        ],
      },
      {
        title: "🎯 Entrevistas Técnicas",
        subtitle: "Praticar problemas é diferente de saber codar",
        items: [
          { id: "f5-6", label: "50 problemas fáceis no LeetCode", meta: "Arrays, strings, hash maps", difficulty: "medium" },
          { id: "f5-7", label: "Perguntas comportamentais (STAR method)", meta: '"Me fale sobre um desafio que você superou..."', difficulty: "easy" },
          { id: "f5-8", label: "System design básico — o que saber", meta: "Load balancer, cache, DB, CDN conceitos", difficulty: "hard" },
          { id: "f5-9", label: "Preparar perguntas para fazer ao entrevistador", meta: "Mostra interesse e maturidade", difficulty: "easy" },
        ],
      },
      {
        title: "🧹 Clean Code",
        subtitle: "Código que outros conseguem entender e manter",
        items: [
          { id: "f5-10", label: "Nomes que revelam intenção", meta: "get_user() > getu(), is_active > flag", difficulty: "easy" },
          { id: "f5-11", label: "Funções pequenas e com único propósito (SRP)", meta: "Single Responsibility Principle", difficulty: "medium" },
          { id: "f5-12", label: "DRY — Don't Repeat Yourself", meta: "Mas cuidado com abstração prematura", difficulty: "medium" },
          { id: "f5-13", label: "Linters: Black, Ruff, ESLint, Prettier", meta: "Automatizar estilo de código", difficulty: "easy" },
        ],
      },
      {
        title: "🌍 Soft Skills que Importam",
        subtitle: "O que separa um dev bom de um dev que avança",
        items: [
          { id: "f5-14", label: "Saber fazer boas perguntas (com contexto)", meta: '"Tentei X, Y e Z. O erro é... Qual seria..."', difficulty: "medium" },
          { id: "f5-15", label: "Documentar o seu trabalho", meta: "READMEs, comentários úteis, ADRs", difficulty: "easy" },
          { id: "f5-16", label: "Dar e receber code review", meta: "Feedbacks construtivos sem ego", difficulty: "medium" },
          { id: "f5-17", label: "Inglês técnico para documentação", meta: "Ler docs em inglês é obrigatório", difficulty: "medium" },
        ],
      },
    ],
  },
];

export const resourceCards: ResourceCard[] = [
  {
    title: "🐍 Para Python",
    items: [
      { type: "free", label: "Documentação Oficial Python", href: "https://docs.python.org/3/tutorial/" },
      { type: "free", label: "roadmap.sh/python", href: "https://roadmap.sh/python" },
      { type: "paid", label: "Python Crash Course (livro — Matthes)" },
      { type: "free", label: "Real Python (tutoriais)", href: "https://realpython.com" },
      { type: "free", label: "FastAPI Docs (tutorial oficial)", href: "https://fastapi.tiangolo.com" },
    ],
  },
  {
    title: "📘 Para TypeScript",
    items: [
      { type: "free", label: "TypeScript Handbook Oficial", href: "https://www.typescriptlang.org/docs/" },
      { type: "free", label: "roadmap.sh/typescript", href: "https://roadmap.sh/typescript" },
      { type: "free", label: "React Docs (nova versão)", href: "https://react.dev" },
      { type: "paid", label: "Matt Pocock — Total TypeScript" },
      { type: "free", label: "Execute Program (TypeScript)", href: "https://www.executeprogram.com" },
    ],
  },
  {
    title: "🧠 CS & Algoritmos",
    items: [
      { type: "free", label: "LeetCode (problemas)", href: "https://leetcode.com" },
      { type: "free", label: "CS50 Harvard (base completa)", href: "https://cs50.harvard.edu" },
      { type: "book", label: "Clean Code — Robert C. Martin" },
      { type: "free", label: "roadmap.sh (todos os paths)", href: "https://roadmap.sh" },
      { type: "free", label: "Missing Semester (MIT) — terminal", href: "https://missing.csail.mit.edu" },
    ],
  },
  {
    title: "🛠 Ferramentas",
    items: [
      { type: "free", label: "GitHub — portfólio obrigatório", href: "https://github.com" },
      { type: "free", label: "Postman — testar APIs", href: "https://www.postman.com" },
      { type: "free", label: "TablePlus — visualizar banco", href: "https://tableplus.com" },
      { type: "free", label: "Docker Desktop (Windows)" },
      { type: "free", label: "VSCode + extensões (grátis)" },
    ],
  },
  {
    title: "🎥 Canais & Comunidade",
    items: [
      { type: "ptbr", label: "Filipe Deschamps (YouTube)" },
      { type: "ptbr", label: "Rocketseat (grátis + pago)" },
      { type: "en", label: "Fireship (YouTube) — conteúdo rápido" },
      { type: "en", label: "Theo (t3.gg) — TypeScript/React" },
      { type: "ptbr", label: "Dev.to BR + Discord Rocketseat" },
    ],
  },
  {
    title: "🚀 Projetos para Portfólio",
    items: [
      { type: "idea", label: "API de tarefas (To-Do) com auth JWT" },
      { type: "idea", label: "CLI de linha de comando para algo útil" },
      { type: "idea", label: "Clone de API pública (ex: pokedex)" },
      { type: "idea", label: "Full-stack: blog ou e-commerce simples" },
      { type: "idea", label: "Bot Discord/Telegram com Python" },
    ],
  },
];

export const weekDays = [
  { day: "Seg", hours: "1.5h", focus: "Teoria + leitura de docs" },
  { day: "Ter", hours: "1.5h", focus: "Exercícios práticos" },
  { day: "Qua", hours: "2h", focus: "Projeto pessoal / portfólio" },
  { day: "Qui", hours: "1.5h", focus: "LeetCode / lógica" },
  { day: "Sex", hours: "1.5h", focus: "Revisão + novos conceitos" },
  { day: "Sáb", hours: "2h", focus: "Projeto + tutorial" },
  { day: "Dom", hours: "0.5h", focus: "Review semana + planejamento" },
];

export const conceptGroups = [
  {
    label: "🧠 Ciência da Computação (base universal)",
    color: "purple",
    items: ["Tipos de dados", "Estruturas de dados", "Algoritmos", "Complexidade O(n)", "Recursão", "Memória (stack/heap)", "Concorrência", "Design Patterns"],
  },
  {
    label: "🐍 Python específico",
    color: "blue",
    items: ["List comprehension", "Generators", "Decorators", "Context managers", "asyncio", "pip/Poetry", "FastAPI", "SQLAlchemy", "pytest", "Pydantic"],
  },
  {
    label: "📘 TypeScript específico",
    color: "violet",
    items: ["Type system", "Interfaces", "Generics", "Utility Types", "Narrowing", "Decorators", "Node.js", "React + TS", "Zod", "Prisma"],
  },
  {
    label: "🌐 Web & Infra",
    color: "amber",
    items: ["HTTP/HTTPS", "REST APIs", "GraphQL (bônus)", "WebSockets", "OAuth2 / JWT", "Docker", "PostgreSQL", "Redis (bônus)", "CI/CD básico", "GitHub Actions"],
  },
];

export const tips = [
  { type: "success", title: "O que realmente funciona", text: "Construir projetos reais > assistir tutoriais infinitamente. Cada vez que você travar num bug por 2 horas, você aprende mais que 10 vídeos. O desconforto é o aprendizado." },
  { type: "warn", title: "Tutorial Hell — o inimigo oculto", text: "Fazer 50 cursos sem nunca codar do zero é uma ilusão de progresso. Regra: para cada 1h de tutorial, gaste 2h codando sem assistir. Se não conseguir, volte ao tutorial." },
  { type: "danger", title: "Erros que atrasam anos", text: "Tentar aprender tudo ao mesmo tempo. Ficar trocando de linguagem. Ignorar Git. Não ler documentação oficial. Não escrever testes. Não praticar inglês técnico." },
  { type: "default", title: "Como aprender eficientemente", text: "Técnica Feynman: explique o que aprendeu como se ensinasse alguém. Se não conseguir, você não entendeu. Escreva posts, grave vídeos, ajude no Stack Overflow." },
  { type: "success", title: "A sequência importa muito", text: "Python antes de TypeScript. Lógica antes de framework. Terminal antes de GUI tools. Princípios antes de ferramentas. Fundamentos ruins = teto de vidro na carreira." },
  { type: "warn", title: "Consistência > Intensidade", text: "1h por dia por 1 ano = ~365h = resultado real. 10h num fim de semana por mês = burnout. Crie uma rotina sustentável. O cérebro consolida conhecimento durante o sono." },
];
