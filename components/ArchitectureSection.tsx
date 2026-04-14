import {
  Globe, Wifi, Server, Database, Layers, GitBranch,
  Zap, Shield, Box, ArrowRight, type LucideIcon,
} from "lucide-react";

interface Topic {
  title: string;
  what: string;
  why: string;
  tags: string[];
}

interface TopicGroup {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  topics: Topic[];
}

const groups: TopicGroup[] = [
  {
    id: "internet",
    icon: Globe,
    color: "#3b82f6",
    title: "Como a Internet Funciona",
    subtitle: "O que acontece entre você digitar uma URL e a página aparecer.",
    topics: [
      {
        title: "DNS — Domain Name System",
        what: "Serviço que traduz nomes legíveis (google.com) em endereços IP (142.250.80.46). É a agenda telefônica da internet.",
        why: "Entender DNS te ajuda a debugar problemas de domínio, configurar servidores e entender latência de rede.",
        tags: ["DNS", "IP", "Resolver", "TTL"],
      },
      {
        title: "HTTP & HTTPS",
        what: "Protocolo de comunicação entre browsers e servidores. HTTP/1.1 → HTTP/2 → HTTP/3. HTTPS adiciona TLS para criptografar o tráfego.",
        why: "Toda API que você consome usa HTTP. Saber métodos, headers, status codes e caching é fundamental para backend.",
        tags: ["GET/POST/PUT/DELETE", "Headers", "Status Codes", "TLS", "HTTP/2"],
      },
      {
        title: "TCP/IP — O protocolo de transporte",
        what: "TCP garante entrega ordenada e confiável de pacotes. IP é o endereçamento. Juntos formam a base da internet.",
        why: "TCP vs UDP é decisão arquitetural importante (streaming usa UDP, APIs usam TCP). Afeta performance e confiabilidade.",
        tags: ["TCP", "UDP", "IP", "Handshake", "Pacotes", "Portas"],
      },
      {
        title: "Como o Browser Funciona",
        what: "URL → DNS lookup → TCP connection → HTTP request → HTML parsing → CSS/JS load → Render tree → Layout → Paint → Composite.",
        why: "Entender o pipeline de render é essencial para performance web. Critical rendering path determina o quão rápida é a página.",
        tags: ["DOM", "CSSOM", "Render Tree", "Layout", "Paint", "Reflow"],
      },
      {
        title: "WebSockets & SSE",
        what: "WebSockets: conexão bidirecional persistente entre cliente e servidor. SSE: stream de eventos unidirecional do servidor.",
        why: "Para chats, dashboards em tempo real, notificações push e multiplayer. Alternativa mais eficiente que polling.",
        tags: ["ws://", "ws.send()", "onmessage", "EventSource", "Long Polling"],
      },
      {
        title: "Cookies, Sessions & JWT",
        what: "Cookies: dado no browser vinculado ao domínio. Session: estado no servidor. JWT: token autocontido com claims assinados.",
        why: "Autenticação é um dos tópicos mais críticos em web. Você vai implementar login em toda API que construir.",
        tags: ["Set-Cookie", "HttpOnly", "SameSite", "JWT", "Bearer", "Refresh Token"],
      },
    ],
  },
  {
    id: "arquitetura",
    icon: Layers,
    color: "#8b5cf6",
    title: "Arquitetura de Software",
    subtitle: "Como estruturar sistemas que crescem sem virar um caos.",
    topics: [
      {
        title: "MVC — Model View Controller",
        what: "Padrão que separa dados (Model), apresentação (View) e lógica de negócio (Controller). Base de Django, Rails, Laravel.",
        why: "É o padrão de arquitetura mais ensinado e usado. Entender MVC te ajuda a ler e contribuir em qualquer codebase.",
        tags: ["Model", "View", "Controller", "Django MVT", "Separation of Concerns"],
      },
      {
        title: "REST vs GraphQL vs gRPC",
        what: "REST: recursos via HTTP. GraphQL: query flexível, cliente decide o que recebe. gRPC: RPC binário de alta performance.",
        why: "Cada projeto usa um. REST é o padrão para maioria. GraphQL para frontends complexos. gRPC para microservices.",
        tags: ["Endpoints", "Schema", "Resolver", "Protobuf", "Over-fetching"],
      },
      {
        title: "Monolito vs Microservices",
        what: "Monolito: tudo em um processo. Microservices: serviços independentes comunicando via API. Cada um tem trade-offs reais.",
        why: "Júnior geralmente trabalha em monolitos. Mas precisa entender microservices para crescer na carreira.",
        tags: ["Deploy único", "Escalabilidade", "Latência de rede", "Service Mesh", "Docker"],
      },
      {
        title: "Clean Architecture & SOLID",
        what: "Estrutura de código em camadas (entities → use cases → adapters → frameworks). Dependências apontam para dentro.",
        why: "Código testável, substituível e manutenível a longo prazo. Evita o 'big ball of mud' que paralisa times.",
        tags: ["Entities", "Use Cases", "Adapters", "Dependency Inversion", "Ports & Adapters"],
      },
      {
        title: "Event-Driven Architecture",
        what: "Componentes comunicam via eventos/mensagens em vez de chamadas diretas. Usa filas (RabbitMQ, Kafka, SQS).",
        why: "Sistemas modernos e escaláveis usam eventos. Entender esse padrão é diferencial para vagas sênior.",
        tags: ["Publisher", "Subscriber", "Queue", "Kafka", "RabbitMQ", "Event Bus"],
      },
      {
        title: "12 Factor App",
        what: "Metodologia com 12 boas práticas para apps SaaS: config em env vars, logs como streams, processos stateless.",
        why: "É o guia de como construir apps prontos para cloud. Seguido por praticamente todo time de devops moderno.",
        tags: ["Env vars", "Stateless", "Config", "Logs", "Disposability", "Dev/Prod parity"],
      },
    ],
  },
  {
    id: "banco",
    icon: Database,
    color: "#10b981",
    title: "Bancos de Dados — Por Dentro",
    subtitle: "Como dados são armazenados, indexados e recuperados eficientemente.",
    topics: [
      {
        title: "SQL vs NoSQL — Quando usar cada",
        what: "SQL: dados relacionais com schema fixo, ACID, JOINs. NoSQL: documentos, chave-valor, grafos, colunares. Cada um tem casos de uso.",
        why: "Escolher o banco errado custa caro. PostgreSQL para maioria dos casos, MongoDB/Redis para casos específicos.",
        tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "Cassandra"],
      },
      {
        title: "Indexes — A mágica de queries rápidas",
        what: "Estrutura de dados auxiliar (geralmente B-Tree) que acelera buscas sem varrer toda a tabela. Trade-off: velocidade de leitura vs escrita.",
        why: "Uma query sem index em tabela com 1M rows pode ser 100x mais lenta que com index. Imprescindível para performance.",
        tags: ["B-Tree", "Hash Index", "EXPLAIN ANALYZE", "Covering Index", "Composite Index"],
      },
      {
        title: "ACID & Transações",
        what: "Atomicity: tudo ou nada. Consistency: estado válido. Isolation: transações não se interferem. Durability: persiste após commit.",
        why: "Sem transações, um pagamento poderia debitar sem creditar. É a base de qualquer sistema financeiro ou crítico.",
        tags: ["BEGIN", "COMMIT", "ROLLBACK", "Isolation Level", "Deadlock", "MVCC"],
      },
      {
        title: "N+1 Query Problem",
        what: "Bug de performance onde você faz 1 query para listar e N queries para buscar detalhes de cada item. Mata produção.",
        why: "Todo dev que usa ORM já cometeu esse erro. Identificar e resolver com eager loading é habilidade obrigatória.",
        tags: ["ORM", "Eager Loading", "select_related", "JOIN", "DataLoader"],
      },
      {
        title: "Caching — Redis e estratégias",
        what: "Armazenar resultados de queries ou computações em memória para evitar re-trabalho. Redis, Memcached, cache em processo.",
        why: "Cache bem aplicado reduz latência em 10-100x e load no banco. É uma das ferramentas mais impactantes de performance.",
        tags: ["Redis", "Cache Miss", "TTL", "Invalidation", "Write-through", "LRU"],
      },
    ],
  },
  {
    id: "infra",
    icon: Server,
    color: "#f59e0b",
    title: "Infraestrutura & Cloud",
    subtitle: "Do código no seu laptop ao servidor que atende milhões de usuários.",
    topics: [
      {
        title: "IaaS, PaaS e SaaS",
        what: "IaaS: você gerencia VM e SO (AWS EC2). PaaS: você entrega código, plataforma cuida do resto (Railway, Heroku). SaaS: produto pronto.",
        why: "Como júnior, você vai usar PaaS (Railway, Render, Vercel). Mas precisa entender a camada abaixo para debugar.",
        tags: ["AWS", "GCP", "Azure", "Railway", "Render", "Vercel", "Fly.io"],
      },
      {
        title: "CI/CD — Integração e Deploy Contínuos",
        what: "CI: todo push roda testes automaticamente. CD: se testes passam, deploy acontece automaticamente. GitHub Actions implementa ambos.",
        why: "Times modernos não fazem deploy manual. Saber configurar CI/CD básico te diferencia muito como júnior.",
        tags: ["GitHub Actions", "Pipeline", "Build", "Test", "Deploy", "Artifact"],
      },
      {
        title: "Containers vs VMs",
        what: "VM: sistema operacional completo virtualizado. Container: processo isolado compartilhando o kernel do host. Docker usa containers.",
        why: "Containers são mais leves, iniciam em segundos e garantem paridade entre dev e produção. Docker é obrigatório.",
        tags: ["Docker", "Kernel", "Namespace", "cgroups", "Image", "Container Registry"],
      },
      {
        title: "Load Balancer & Reverse Proxy",
        what: "Load balancer distribui tráfego entre múltiplas instâncias. Reverse proxy (Nginx, Caddy) fica na frente do app server.",
        why: "Para escalar horizontalmente e ter zero downtime em deploys. Nginx é encontrado em praticamente todo servidor.",
        tags: ["Nginx", "Round Robin", "Sticky Session", "Health Check", "SSL Termination"],
      },
      {
        title: "Observabilidade — Logs, Métricas e Traces",
        what: "Logs: eventos textuais. Métricas: valores numéricos ao longo do tempo. Traces: rastreio de uma requisição entre serviços.",
        why: "Sem observabilidade, você não sabe o que está quebrando em produção. Essencial para qualquer app sério.",
        tags: ["Structured Logs", "Prometheus", "Grafana", "OpenTelemetry", "Sentry", "Datadog"],
      },
    ],
  },
  {
    id: "logica",
    icon: Zap,
    color: "#ef4444",
    title: "Treino de Lógica de Programação",
    subtitle: "Como e onde praticar para chegar bem nas entrevistas técnicas.",
    topics: [
      {
        title: "Por onde começar: Arrays e Strings",
        what: "80% dos problemas de entrevista envolvem arrays e strings. Domine: dois ponteiros, sliding window, prefix sum e hashmaps.",
        why: "São os padrões mais frequentes em entrevistas de empresas brasileiras e internacionais.",
        tags: ["Two Pointers", "Sliding Window", "HashMap", "Prefix Sum", "In-place"],
      },
      {
        title: "Recursão e Backtracking",
        what: "Recursão: função que chama a si mesma com caso base. Backtracking: recursão que desfaz escolhas quando bate em beco sem saída.",
        why: "Problemas de árvore, permutações e combinações são resolvidos com recursão. Fundamental para entender algoritmos avançados.",
        tags: ["Base Case", "Call Stack", "Memoização", "N-Queens", "Permutations", "Subsets"],
      },
      {
        title: "Estruturas de Dados essenciais",
        what: "Stack (LIFO), Queue (FIFO), LinkedList, HashTable, Binary Tree, Heap, Graph. Cada uma é otimizada para um tipo de operação.",
        why: "A escolha da estrutura de dados certa muda um algoritmo O(n²) para O(n log n). É o que diferencia um dev bom.",
        tags: ["Stack", "Queue", "HashMap", "BST", "Heap", "Adjacency List"],
      },
      {
        title: "Big-O — Análise de complexidade",
        what: "Notação que descreve como o tempo/memória cresce com o tamanho da entrada. O(1) > O(log n) > O(n) > O(n log n) > O(n²).",
        why: "Toda entrevista técnica pergunta sobre complexidade. Código que funciona mas é O(n²) em 10M items vai explodir.",
        tags: ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)", "Space Complexity"],
      },
      {
        title: "Dynamic Programming — Desmistificado",
        what: "Técnica para problemas com subestrutura ótima e subproblemas sobrepostos. Resolva subproblemas uma vez, salve o resultado.",
        why: "DP aparece bastante em entrevistas intermediárias/sênior. Entender memoização e tabulação muda tudo.",
        tags: ["Memoização", "Tabulação", "Fibonacci", "Knapsack", "Longest Common Subsequence"],
      },
      {
        title: "Como praticar com qualidade",
        what: "Regra dos 20 min: se não resolver em 20 min, veja a solução, ENTENDA, codifique do zero sem olhar. Repita no dia seguinte.",
        why: "Maratona de LeetCode sem entender nada é inútil. Qualidade > quantidade. 3 problemas entendidos > 20 copiados.",
        tags: ["Neetcode", "LeetCode", "Grind 75", "Anki para padrões", "Mock Interviews"],
      },
    ],
  },
];

export function ArchitectureSection() {
  return (
    <section id="arquitetura" className="mb-16">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#ececf0] mb-1">Arquitetura & Fundamentos</h2>
        <p className="text-sm text-[#9090a0] leading-relaxed max-w-2xl mb-4">
          O que a maioria dos cursos não ensina mas toda empresa espera que você saiba.
          Internet, redes, sistemas, bancos de dados e como treinar lógica de verdade.
        </p>
        {/* Âncora temporal para iniciantes */}
        <div className="flex items-start gap-3 bg-[#1a1a10] border border-[#2e2e18] rounded-lg px-4 py-3 max-w-2xl">
          <span className="text-base flex-shrink-0">💡</span>
          <div>
            <p className="text-xs font-semibold text-[#d4c870] mb-0.5">Esta seção é referência — não precisa ler tudo agora</p>
            <p className="text-xs text-[#a0a070] leading-relaxed">
              Iniciantes: leia <strong className="text-[#d4c870]">Como a Internet Funciona</strong> e <strong className="text-[#d4c870]">Treino de Lógica</strong> agora.
              Volte às seções de Arquitetura de Software, Banco de Dados e Infra quando chegar às <strong className="text-[#d4c870]">Fases 3–5</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}

function GroupCard({ group }: { group: TopicGroup }) {
  const Icon = group.icon;
  return (
    <div className="bg-[#16161e] border border-[#222228] rounded-xl overflow-hidden card-hover animate-fade-in-up">
      {/* Header */}
      <div
        className="px-6 py-5 border-b border-[#1e1e26]"
        style={{ background: `linear-gradient(135deg, ${group.color}08 0%, transparent 60%)` }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${group.color}15`, border: `1px solid ${group.color}25` }}
          >
            <Icon size={16} style={{ color: group.color }} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#dcdce4]">{group.title}</h3>
            <p className="text-xs text-[#9090a0] mt-0.5">{group.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Topics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {group.topics.map((topic, i) => (
          <div
            key={topic.title}
            className="px-5 py-4 border-b border-r-0 md:border-r border-[#1e1e26] last:border-b-0"
            style={{
              borderBottomColor: i >= group.topics.length - (group.topics.length % 2 === 0 ? 2 : 1) ? "transparent" : undefined,
            }}
          >
            <div className="flex items-start gap-2 mb-2">
              <ArrowRight size={12} style={{ color: group.color }} className="flex-shrink-0 mt-1" strokeWidth={2} />
              <p className="text-xs font-semibold text-[#d0d0dc]">{topic.title}</p>
            </div>
            <p className="text-xs text-[#9898a8] leading-relaxed mb-2 pl-[18px]">{topic.what}</p>
            <div className="pl-[18px] mb-2">
              <span className="text-[9px] font-semibold text-[#9090a0] uppercase tracking-wider">Por que importa: </span>
              <span className="text-[11px] text-[#808092]">{topic.why}</span>
            </div>
            <div className="flex flex-wrap gap-1 pl-[18px]">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: `${group.color}10`, color: `${group.color}cc`, border: `1px solid ${group.color}18` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
