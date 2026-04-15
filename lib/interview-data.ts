export type InterviewCategory = "python" | "js" | "sql" | "git" | "soft";
export type InterviewDifficulty = "easy" | "medium" | "hard";

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  question: string;
  answer: string;
  tip?: string;
}

export const categoryMeta: Record<InterviewCategory, { label: string; color: string }> = {
  python:  { label: "Python",           color: "#4b8bbe" },
  js:      { label: "JS / TypeScript",  color: "#f7df1e" },
  sql:     { label: "SQL & Bancos",     color: "#10b981" },
  git:     { label: "Git & Workflow",   color: "#f97316" },
  soft:    { label: "Comportamental",   color: "#8b5cf6" },
};

export const interviewQuestions: InterviewQuestion[] = [
  // ── PYTHON ──────────────────────────────────────────────
  {
    id: "py-i1",
    category: "python",
    difficulty: "easy",
    question: "Qual a diferença entre lista, tupla e set em Python?",
    answer:
      "Lista (list): mutável, ordenada, permite duplicatas. Use quando precisa adicionar/remover elementos.\n\n" +
      "Tupla (tuple): imutável, ordenada, permite duplicatas. Use para dados que não devem mudar.\n\n" +
      "Set (set): mutável, desordenado, sem duplicatas. Use para checar pertencimento rápido ou remover duplicatas.\n\n" +
      "nomes = ['Ana', 'Bob', 'Ana']  # lista: ['Ana', 'Bob', 'Ana']\n" +
      "coord = (10.5, -23.4)          # tupla: imutável\n" +
      "unicos = {1, 2, 2, 3}          # set: {1, 2, 3}",
    tip: "Entrevistadores adoram essa pergunta. Mencione imutabilidade da tupla e performance do set para buscas.",
  },
  {
    id: "py-i2",
    category: "python",
    difficulty: "easy",
    question: "O que são *args e **kwargs?",
    answer:
      "*args captura argumentos posicionais extras como tupla.\n" +
      "**kwargs captura argumentos nomeados extras como dict.\n\n" +
      "def saudacao(*args, **kwargs):\n" +
      "    for nome in args:\n" +
      "        print(f'Oi, {nome}')\n" +
      "    for k, v in kwargs.items():\n" +
      "        print(f'{k}: {v}')\n\n" +
      "saudacao('Ana', 'Bob', cidade='SP', remoto=True)\n" +
      "# Oi, Ana / Oi, Bob / cidade: SP / remoto: True",
  },
  {
    id: "py-i3",
    category: "python",
    difficulty: "easy",
    question: "Diferença entre `is` e `==` em Python?",
    answer:
      "== compara VALOR (conteúdo).\nis compara IDENTIDADE (mesmo objeto na memória).\n\n" +
      "a = [1, 2, 3]\n" +
      "b = [1, 2, 3]\n" +
      "print(a == b)   # True  — mesmo valor\n" +
      "print(a is b)   # False — objetos diferentes na memória\n\n" +
      "c = a\n" +
      "print(a is c)   # True  — mesma referência\n\n" +
      "Regra: use 'is' APENAS para comparar com None: if x is None:",
    tip: "Erro clássico: usar 'is' para comparar strings ou números grandes. CPython faz cache de inteiros pequenos (-5 a 256), então 'is' pode parecer funcionar — mas não confie nisso.",
  },
  {
    id: "py-i4",
    category: "python",
    difficulty: "medium",
    question: "O que é um decorator? Escreva um exemplo simples.",
    answer:
      "Um decorator é uma função que ENVOLVE outra função para adicionar comportamento sem modificá-la.\n" +
      "É açúcar sintático para composição de funções.\n\n" +
      "def log_chamada(func):\n" +
      "    def wrapper(*args, **kwargs):\n" +
      "        print(f'Chamando {func.__name__}')\n" +
      "        resultado = func(*args, **kwargs)\n" +
      "        print(f'Finalizado {func.__name__}')\n" +
      "        return resultado\n" +
      "    return wrapper\n\n" +
      "@log_chamada\n" +
      "def somar(a, b):\n" +
      "    return a + b\n\n" +
      "somar(2, 3)\n" +
      "# Chamando somar\n" +
      "# Finalizado somar\n\n" +
      "Decorators embutidos comuns: @property, @staticmethod, @classmethod, @functools.cache",
    tip: "Em FastAPI você usa decorators o tempo todo: @app.get('/rota'). Conhecer o mecanismo por baixo impressiona.",
  },
  {
    id: "py-i5",
    category: "python",
    difficulty: "medium",
    question: "O que é list comprehension? Quando usar?",
    answer:
      "Sintaxe compacta para criar listas a partir de iteráveis.\n" +
      "Mais legível e geralmente mais rápida que um for tradicional.\n\n" +
      "# Tradicional\n" +
      "quadrados = []\n" +
      "for n in range(10):\n" +
      "    if n % 2 == 0:\n" +
      "        quadrados.append(n ** 2)\n\n" +
      "# Comprehension\n" +
      "quadrados = [n**2 for n in range(10) if n % 2 == 0]\n" +
      "# [0, 4, 16, 36, 64]\n\n" +
      "Use quando a lógica cabe em uma linha.\n" +
      "Para lógica complexa, prefira for explícito — legibilidade > brevidade.",
  },
  {
    id: "py-i6",
    category: "python",
    difficulty: "medium",
    question: "O que são generators e quando usar?",
    answer:
      "Generators são funções que usam 'yield' para retornar valores UM POR VEZ,\n" +
      "sem carregar tudo na memória.\n\n" +
      "def contar_ate(n):\n" +
      "    i = 0\n" +
      "    while i < n:\n" +
      "        yield i   # pausa aqui, devolve i\n" +
      "        i += 1\n\n" +
      "for num in contar_ate(1_000_000):\n" +
      "    print(num)  # só 1 número na memória por vez\n\n" +
      "Use quando processar arquivos grandes, streams de dados ou sequências infinitas.\n" +
      "range() é um generator nativo.",
    tip: "Mencione que (x for x in lista) é um generator expression, diferente de [x for x in lista] que cria a lista inteira.",
  },
  {
    id: "py-i7",
    category: "python",
    difficulty: "medium",
    question: "Como funciona herança em Python? O que é super()?",
    answer:
      "Herança permite que uma classe filha reutilize e estenda o comportamento da classe pai.\n\n" +
      "class Animal:\n" +
      "    def __init__(self, nome):\n" +
      "        self.nome = nome\n\n" +
      "    def falar(self):\n" +
      "        return '...'\n\n" +
      "class Cachorro(Animal):\n" +
      "    def __init__(self, nome, raca):\n" +
      "        super().__init__(nome)   # chama __init__ do pai\n" +
      "        self.raca = raca\n\n" +
      "    def falar(self):\n" +
      "        return 'Au!'\n\n" +
      "d = Cachorro('Rex', 'Labrador')\n" +
      "print(d.falar())   # Au!\n" +
      "print(d.nome)      # Rex\n\n" +
      "super() é crucial para não duplicar código do pai, especialmente em herança múltipla.",
  },
  {
    id: "py-i8",
    category: "python",
    difficulty: "hard",
    question: "Explique o perigo de default mutable arguments em Python.",
    answer:
      "O bug clássico de entrevista — a lista default é criada UMA SÓ VEZ para toda a vida da função:\n\n" +
      "# ERRADO\n" +
      "def adicionar(item, lista=[]):\n" +
      "    lista.append(item)\n" +
      "    return lista\n\n" +
      "print(adicionar(1))  # [1]\n" +
      "print(adicionar(2))  # [1, 2]  ← surpreendente! lista persiste entre chamadas\n\n" +
      "# CERTO — usar None como sentinela\n" +
      "def adicionar(item, lista=None):\n" +
      "    if lista is None:\n" +
      "        lista = []\n" +
      "    lista.append(item)\n" +
      "    return lista\n\n" +
      "Regra: NUNCA use objeto mutável (list, dict, set) como valor default de argumento.",
    tip: "Esse é um dos bugs favoritos de entrevistadores. Mencionar espontaneamente impressiona muito.",
  },

  // ── JAVASCRIPT / TYPESCRIPT ──────────────────────────────
  {
    id: "js-i1",
    category: "js",
    difficulty: "easy",
    question: "Diferença entre let, const e var?",
    answer:
      "var: escopo de FUNÇÃO, hoisting, pode ser redeclarado. Evite.\n\n" +
      "let: escopo de BLOCO, sem hoisting visível, pode ser reatribuído.\n\n" +
      "const: escopo de bloco, não pode ser REATRIBUÍDO — mas o conteúdo de objetos/arrays pode mudar.\n\n" +
      "const user = { nome: 'Ana' };\n" +
      "user.nome = 'Bob';  // OK — muda propriedade, não a referência\n" +
      "user = {};          // Erro — reatribuição proibida\n\n" +
      "Regra prática: use const por padrão, let quando precisar reatribuir, nunca var.",
  },
  {
    id: "js-i2",
    category: "js",
    difficulty: "medium",
    question: "O que é closure em JavaScript?",
    answer:
      "Uma closure é uma função que LEMBRA do escopo onde foi criada,\n" +
      "mesmo após esse escopo ter encerrado.\n\n" +
      "function criarContador() {\n" +
      "  let count = 0;\n" +
      "  return function() {\n" +
      "    count++;\n" +
      "    return count;\n" +
      "  };\n" +
      "}\n\n" +
      "const contador = criarContador();\n" +
      "contador(); // 1\n" +
      "contador(); // 2 — count persiste!\n\n" +
      "Closures são a base de hooks do React (useState guarda estado entre renders),\n" +
      "módulos e funções de ordem superior.",
    tip: "Entender closure explica como useState funciona internamente. Mencione isso e o entrevistador vai gostar.",
  },
  {
    id: "js-i3",
    category: "js",
    difficulty: "medium",
    question: "Como funciona o event loop em JavaScript?",
    answer:
      "JS é single-threaded. O event loop gerencia como código assíncrono é executado:\n\n" +
      "1. Call Stack: executa código síncrono, função por função\n" +
      "2. Web APIs: setTimeout, fetch, etc. rodam fora da stack (browser/Node)\n" +
      "3. Microtask Queue: Promises resolvidas — executadas ANTES do Task Queue\n" +
      "4. Task Queue: callbacks de setTimeout, setInterval esperam aqui\n\n" +
      "console.log('1');\n" +
      "setTimeout(() => console.log('2'), 0);\n" +
      "Promise.resolve().then(() => console.log('3'));\n" +
      "console.log('4');\n" +
      "// Saída: 1, 4, 3, 2\n\n" +
      "Promises (microtasks) têm prioridade sobre setTimeout (macrotask), mesmo com delay 0.",
    tip: "A ordem 1→4→3→2 é a pergunta favorita de entrevistadores. Saiba de cor.",
  },
  {
    id: "js-i4",
    category: "js",
    difficulty: "medium",
    question: "O que é async/await e como funciona com Promises?",
    answer:
      "async/await é açúcar sintático para trabalhar com Promises de forma legível.\n\n" +
      "// Com Promise\n" +
      "fetch('/api/user')\n" +
      "  .then(res => res.json())\n" +
      "  .then(data => console.log(data))\n" +
      "  .catch(err => console.error(err));\n\n" +
      "// Com async/await — equivalente, mais legível\n" +
      "async function buscarUser() {\n" +
      "  try {\n" +
      "    const res = await fetch('/api/user');\n" +
      "    const data = await res.json();\n" +
      "    console.log(data);\n" +
      "  } catch (err) {\n" +
      "    console.error(err);\n" +
      "  }\n" +
      "}\n\n" +
      "await só pode ser usado dentro de funções async.\n" +
      "Uma função async SEMPRE retorna uma Promise.",
  },
  {
    id: "js-i5",
    category: "js",
    difficulty: "easy",
    question: "Interface vs Type no TypeScript — qual a diferença?",
    answer:
      "interface: extensível com extends, reabre com declaração duplicada,\n" +
      "melhor para contratos de objetos.\n\n" +
      "type: mais flexível, suporta unions/intersections, não reabre.\n\n" +
      "interface User {\n" +
      "  nome: string;\n" +
      "}\n" +
      "interface User {\n" +
      "  idade: number; // merge automático!\n" +
      "}\n\n" +
      "type Status = 'ativo' | 'inativo';  // union — só com type\n" +
      "type Admin = User & { role: string };  // intersection\n\n" +
      "Regra prática: interface para objetos e classes; type para unions e aliases.",
    tip: "Na maioria dos casos são intercambiáveis. O que importa é ser consistente no projeto.",
  },
  {
    id: "js-i6",
    category: "js",
    difficulty: "medium",
    question: "O que são React Hooks? Explique useState e useEffect.",
    answer:
      "Hooks são funções que permitem usar estado e ciclo de vida em componentes funcionais.\n\n" +
      "useState — gerencia estado local:\n" +
      "const [count, setCount] = useState(0);\n" +
      "// count = valor atual; setCount = função para atualizar\n\n" +
      "useEffect — executa efeitos colaterais (fetch, subscriptions, timers):\n" +
      "useEffect(() => {\n" +
      "  fetch('/api/data').then(...);\n\n" +
      "  return () => {\n" +
      "    // cleanup: roda antes do próximo efeito ou unmount\n" +
      "  };\n" +
      "}, [dependencia]); // [] = só na montagem\n\n" +
      "Array vazio [] = executa uma vez.\n" +
      "Sem array = executa em TODO render.\n" +
      "Com deps = executa quando deps mudarem.",
    tip: "O array de dependências é onde a maioria tropeça. Prepare um exemplo de bug causado por dep errada.",
  },

  // ── SQL ──────────────────────────────────────────────────
  {
    id: "sql-i1",
    category: "sql",
    difficulty: "easy",
    question: "Diferença entre INNER JOIN, LEFT JOIN e RIGHT JOIN?",
    answer:
      "INNER JOIN: retorna apenas linhas com correspondência em AMBAS as tabelas.\n\n" +
      "LEFT JOIN: retorna todas as linhas da tabela ESQUERDA + correspondências da direita.\n" +
      "Sem correspondência → NULL.\n\n" +
      "RIGHT JOIN: o inverso do LEFT JOIN.\n\n" +
      "-- Só pedidos de clientes cadastrados\n" +
      "SELECT * FROM pedidos\n" +
      "INNER JOIN clientes ON pedidos.cliente_id = clientes.id;\n\n" +
      "-- Todos os clientes, com ou sem pedido\n" +
      "SELECT * FROM clientes\n" +
      "LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;\n\n" +
      "Na prática: LEFT JOIN é o mais usado. RIGHT JOIN pode ser reescrito como LEFT JOIN invertendo as tabelas.",
  },
  {
    id: "sql-i2",
    category: "sql",
    difficulty: "easy",
    question: "O que é chave primária e chave estrangeira?",
    answer:
      "Chave primária (PRIMARY KEY): identifica unicamente cada linha.\n" +
      "Não pode ser NULL nem duplicada.\n\n" +
      "Chave estrangeira (FOREIGN KEY): referencia a chave primária de outra tabela.\n\n" +
      "CREATE TABLE usuarios (\n" +
      "  id SERIAL PRIMARY KEY,\n" +
      "  nome TEXT NOT NULL\n" +
      ");\n\n" +
      "CREATE TABLE pedidos (\n" +
      "  id SERIAL PRIMARY KEY,\n" +
      "  usuario_id INT REFERENCES usuarios(id),  -- FK\n" +
      "  total DECIMAL(10,2)\n" +
      ");\n\n" +
      "FK garante integridade referencial: não dá para criar pedido com usuario_id inexistente.",
  },
  {
    id: "sql-i3",
    category: "sql",
    difficulty: "medium",
    question: "Diferença entre WHERE e HAVING?",
    answer:
      "WHERE filtra linhas ANTES do agrupamento.\n" +
      "HAVING filtra grupos DEPOIS do GROUP BY.\n\n" +
      "-- WHERE: filtra antes de agrupar\n" +
      "SELECT departamento, COUNT(*) as total\n" +
      "FROM funcionarios\n" +
      "WHERE salario > 3000\n" +
      "GROUP BY departamento;\n\n" +
      "-- HAVING: filtra depois de agrupar\n" +
      "SELECT departamento, COUNT(*) as total\n" +
      "FROM funcionarios\n" +
      "GROUP BY departamento\n" +
      "HAVING COUNT(*) > 5;  -- só depto com mais de 5 pessoas\n\n" +
      "Regra: WHERE com colunas simples, HAVING com funções de agregação (COUNT, SUM, AVG).",
  },
  {
    id: "sql-i4",
    category: "sql",
    difficulty: "medium",
    question: "O que são índices e por que eles importam?",
    answer:
      "Índices são estruturas de dados que aceleram buscas em colunas, similar a um índice de livro.\n\n" +
      "-- Sem índice: full table scan (lê linha por linha)\n" +
      "SELECT * FROM usuarios WHERE email = 'ana@email.com';\n\n" +
      "-- Com índice: busca direta\n" +
      "CREATE INDEX idx_email ON usuarios(email);\n\n" +
      "Trade-off:\n" +
      "  Leituras (SELECT): ficam muito mais rápidas\n" +
      "  Escritas (INSERT/UPDATE/DELETE): ficam um pouco mais lentas\n\n" +
      "Crie índices em colunas usadas em WHERE, JOIN e ORDER BY.",
    tip: "Mencionar o trade-off leitura vs escrita demonstra entendimento real de banco de dados.",
  },
  {
    id: "sql-i5",
    category: "sql",
    difficulty: "medium",
    question: "O que é uma transação em banco de dados?",
    answer:
      "Uma transação agrupa operações em uma unidade atômica — TUDO acontece ou NADA acontece.\n\n" +
      "BEGIN;\n" +
      "  UPDATE contas SET saldo = saldo - 100 WHERE id = 1;\n" +
      "  UPDATE contas SET saldo = saldo + 100 WHERE id = 2;\n" +
      "COMMIT;  -- confirma as duas operações\n" +
      "-- Se der erro: ROLLBACK desfaz tudo\n\n" +
      "Propriedades ACID:\n" +
      "  A — Atomicidade: tudo ou nada\n" +
      "  C — Consistência: banco sempre em estado válido\n" +
      "  I — Isolamento: transações paralelas não se interferem\n" +
      "  D — Durabilidade: dados confirmados persistem mesmo após falha",
    tip: "Mencionar ACID sem que peçam é um sinal forte de maturidade técnica.",
  },

  // ── GIT ──────────────────────────────────────────────────
  {
    id: "git-i1",
    category: "git",
    difficulty: "easy",
    question: "O que é um branch e por que usar?",
    answer:
      "Um branch é uma LINHA PARALELA de desenvolvimento — cópia isolada do código\n" +
      "onde você pode trabalhar sem afetar a versão principal.\n\n" +
      "git checkout -b feature/login   # cria e muda para novo branch\n" +
      "# ... desenvolve e faz commits ...\n" +
      "git checkout main\n" +
      "git merge feature/login         # integra de volta\n\n" +
      "Por que usar:\n" +
      "- Desenvolver features sem quebrar o main\n" +
      "- Trabalhar em paralelo com outros devs\n" +
      "- Isolar bugfixes e rollbacks\n\n" +
      "Fluxo padrão: main (produção) ← develop ← feature/*",
  },
  {
    id: "git-i2",
    category: "git",
    difficulty: "medium",
    question: "Diferença entre git merge e git rebase?",
    answer:
      "merge: combina dois branches criando um MERGE COMMIT.\n" +
      "Preserva histórico completo, não reescreve nada.\n\n" +
      "rebase: reescreve os commits do branch atual como se tivessem\n" +
      "nascido do branch destino. Histórico linear e limpo.\n\n" +
      "# Merge — preserva contexto, cria commit extra\n" +
      "git checkout main\n" +
      "git merge feature/login\n\n" +
      "# Rebase — histórico linear, sem merge commit\n" +
      "git checkout feature/login\n" +
      "git rebase main\n\n" +
      "Regra: merge para integrar features, rebase para atualizar seu branch com mudanças do main.",
    tip: "NUNCA faça rebase de branches públicos compartilhados — reescreve histórico e quebra o repo dos outros.",
  },
  {
    id: "git-i3",
    category: "git",
    difficulty: "medium",
    question: "Como desfazer um commit? Diferença entre reset e revert?",
    answer:
      "git revert: cria um NOVO COMMIT que desfaz as mudanças.\n" +
      "Seguro para uso em branches compartilhados.\n\n" +
      "git reset: move o HEAD para um commit anterior. Pode ser destrutivo.\n\n" +
      "# Seguro — cria commit de reversão (use em main/shared)\n" +
      "git revert abc1234\n\n" +
      "# Soft reset — desfaz commit, mantém mudanças staged\n" +
      "git reset --soft HEAD~1\n\n" +
      "# Hard reset — desfaz commit E descarta mudanças (CUIDADO!)\n" +
      "git reset --hard HEAD~1\n\n" +
      "Use revert em produção. reset --soft para ajustar commits locais não publicados.",
    tip: "NUNCA use git reset --hard em código já publicado (pushed). Vai causar conflitos para todo o time.",
  },
  {
    id: "git-i4",
    category: "git",
    difficulty: "easy",
    question: "O que é git stash e quando usar?",
    answer:
      "git stash salva temporariamente suas mudanças não commitadas para\n" +
      "você mudar de contexto sem perder o trabalho.\n\n" +
      "# Situação: trabalhando em feature, veio urgência no main\n" +
      "git stash           # salva mudanças em pilha temporária\n" +
      "git checkout main\n" +
      "# ... corrige o bug ...\n" +
      "git checkout feature/minha-feature\n" +
      "git stash pop       # restaura as mudanças salvas\n\n" +
      "Comandos úteis:\n" +
      "  git stash list   — ver todos os stashes\n" +
      "  git stash pop    — restaura e remove da pilha\n" +
      "  git stash apply  — restaura mas mantém na pilha",
  },

  // ── SOFT SKILLS / COMPORTAMENTAL ─────────────────────────
  {
    id: "soft-i1",
    category: "soft",
    difficulty: "easy",
    question: "\"Me fale sobre um projeto que você desenvolveu.\"",
    answer:
      "Use a estrutura STAR (Situação, Tarefa, Ação, Resultado):\n\n" +
      "Situação: contexto do projeto\n" +
      "Tarefa: o que você precisava resolver\n" +
      "Ação: o que você fez (tecnologias, decisões técnicas)\n" +
      "Resultado: o que entregou, o que aprendeu\n\n" +
      'Exemplo:\n"Desenvolvi uma API REST com FastAPI para gerenciar tarefas.\n' +
      "Situação: queria um projeto para aprender. Tarefa: precisava de autenticação e CRUD completo.\n" +
      "Ação: implementei JWT, PostgreSQL via SQLAlchemy, containerizei com Docker.\n" +
      'Resultado: está em produção no Railway, aprendi sobre segurança de APIs e escrevi testes com pytest."\n\n' +
      "Tenha esse script de 60–90 segundos ensaiado mas natural.",
    tip: "Tenha o link do repositório na mão. Entrevistadores frequentemente pedem para ver o código na hora.",
  },
  {
    id: "soft-i2",
    category: "soft",
    difficulty: "easy",
    question: "\"Por que você quer trabalhar como desenvolvedor?\"",
    answer:
      "Evite respostas genéricas: 'gosto de tecnologia', 'mercado paga bem'.\n" +
      "Seja específico sobre o que te atrai NO PROCESSO.\n\n" +
      "O que funciona:\n" +
      "- Mencionar algo concreto que você construiu e a satisfação de ver funcionar\n" +
      "- Falar sobre resolução de problemas — não apenas codificar\n" +
      "- Mostrar que você já está praticando (projetos, estudos)\n\n" +
      "O que não funciona:\n" +
      "- Falar só sobre salário ou estabilidade\n" +
      "- Dizer que é 'apaixonado por tecnologia' sem exemplos\n\n" +
      "Seja honesto. Se começou pelo mercado de trabalho, tudo bem —\n" +
      "desde que demonstre que realmente se engajou com o aprendizado.",
  },
  {
    id: "soft-i3",
    category: "soft",
    difficulty: "medium",
    question: "\"Como você lida quando trava num problema técnico?\"",
    answer:
      "O que os entrevistadores querem ouvir: que você tem PROCESSO, não que nunca trava.\n\n" +
      "Resposta que funciona:\n" +
      "1. Leitura cuidadosa da mensagem de erro antes de qualquer coisa\n" +
      "2. Isolamento — reduzir o problema ao menor reprodutível possível\n" +
      "3. Pesquisa: documentação oficial, Stack Overflow, GitHub Issues\n" +
      "4. Se 30–45 min sem progresso: pede ajuda contextualizando o que tentou\n\n" +
      "Exemplo de resposta:\n" +
      "'Quando tavo, releio o erro com calma e verifico o que exatamente está falhando.\n" +
      "Depois isolo — tento reproduzir em um arquivo separado.\n" +
      "Se não resolvo em ~40 minutos, busco ajuda mas já vou com o que tentei documentado.\n" +
      "Aprendi que pedir ajuda BEM é tão importante quanto resolver sozinho.'\n\n" +
      "Demonstrar que você pede ajuda com contexto é muito valorizado em times.",
    tip: "Entrevistadores temem contratar quem desiste rápido OU quem fica dias travado sem falar. Mostre o meio-termo.",
  },
  {
    id: "soft-i4",
    category: "soft",
    difficulty: "medium",
    question: "\"Qual sua maior fraqueza como desenvolvedor?\"",
    answer:
      "Clichês a evitar: 'Sou perfeccionista demais', 'Trabalho muito'.\n\n" +
      "O que funciona: ser genuíno sobre uma fraqueza REAL + mostrar consciência + plano de melhoria.\n\n" +
      "Exemplos honestos para iniciantes:\n\n" +
      "'Ainda fico lento em debugging de código legado que não escrevi.\n" +
      "Tenho trabalhado nisso lendo codebases open-source.'\n\n" +
      "'Tendo a querer entender tudo antes de começar, atrasando o início.\n" +
      "Estou aprendendo a começar com o que tenho e iterar.'\n\n" +
      "'Testes ainda não são naturais para mim — sempre escrevo depois, não antes.\n" +
      "Estou praticando TDD em projetos pessoais.'\n\n" +
      "Honestidade + plano de melhoria transforma fraqueza em prova de maturidade.",
  },
  {
    id: "soft-i5",
    category: "soft",
    difficulty: "easy",
    question: "\"Você tem alguma pergunta para nós?\"",
    answer:
      "NUNCA diga 'não' — demonstra falta de interesse ou preparo.\n\n" +
      "Perguntas que impressionam:\n" +
      "- 'Como é o processo de onboarding para alguém entrando agora?'\n" +
      "- 'Qual é o maior desafio técnico que o time enfrenta hoje?'\n" +
      "- 'Como o time faz code review? Tem cultura de feedback?'\n" +
      "- 'O que diferencia os devs que crescem rápido aqui dos que não crescem?'\n\n" +
      "Evite perguntar sobre salário/benefícios antes de receber uma oferta.\n\n" +
      "Prepare 3–4 perguntas. Se uma já foi respondida, diga:\n" +
      "'Essa já foi respondida, mas gostaria de saber sobre...' — mostra que você estava ouvindo.",
    tip: "Fazer boas perguntas pode salvar uma entrevista que não foi bem. É sua última chance de causar impressão.",
  },
];
