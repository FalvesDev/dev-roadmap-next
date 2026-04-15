export interface QuizQuestion {
  id: string;
  phase: number; // 0-indexed
  question: string;
  options: string[];
  correct: number; // index of correct option
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  // ── FASE 0: Fundamentos ──
  { id: "q0-1",  phase: 0, question: "Qual a diferença entre uma lista e uma tupla em Python?",
    options: ["Listas são imutáveis, tuplas são mutáveis", "Tuplas são imutáveis, listas são mutáveis", "Ambas são mutáveis", "Não há diferença prática"],
    correct: 1, explanation: "Tuplas são imutáveis (não podem ser alteradas após criação), o que as torna mais rápidas e seguras para dados constantes." },

  { id: "q0-2",  phase: 0, question: "O que é um virtual environment no Python?",
    options: ["Um IDE para Python", "Um ambiente isolado com dependências próprias por projeto", "Um servidor de desenvolvimento", "Uma versão especial do Python"],
    correct: 1, explanation: "venv cria uma cópia isolada do Python com seu próprio pip, evitando conflitos de versão entre projetos." },

  { id: "q0-3",  phase: 0, question: "Qual o resultado de `bool([])` em Python?",
    options: ["True", "False", "None", "Erro"],
    correct: 1, explanation: "Listas vazias, strings vazias, 0 e None são todos falsy em Python. bool([]) retorna False." },

  { id: "q0-4",  phase: 0, question: "O que é o operador `:=` (walrus operator) em Python?",
    options: ["Comparação de igualdade", "Atribuição dentro de expressões", "Divisão inteira", "Unpacking"],
    correct: 1, explanation: "O walrus operator (:=) permite atribuir uma variável e usá-la dentro de uma expressão, como `while chunk := f.read(1024)`." },

  { id: "q0-5",  phase: 0, question: "Qual estrutura de dados Python garante unicidade dos elementos?",
    options: ["list", "tuple", "set", "dict"],
    correct: 2, explanation: "Sets armazenam apenas valores únicos e oferecem operações matemáticas de conjuntos (união, interseção etc.)." },

  { id: "q0-6",  phase: 0, question: "O que faz `*args` em uma definição de função Python?",
    options: ["Multiplica argumentos", "Recebe argumentos nomeados como dicionário", "Recebe argumentos posicionais variáveis como tupla", "Define argumento obrigatório"],
    correct: 2, explanation: "*args captura qualquer número de argumentos posicionais extras como uma tupla dentro da função." },

  // ── FASE 1: Intermediário ──
  { id: "q1-1",  phase: 1, question: "O que é um decorator em Python?",
    options: ["Um tipo de classe especial", "Uma função que modifica outra função", "Um módulo de formatação visual", "Uma anotação de tipo"],
    correct: 1, explanation: "Decorators são funções que recebem outra função como argumento e retornam uma nova função com comportamento adicionado." },

  { id: "q1-2",  phase: 1, question: "Qual a principal vantagem de usar `async/await` em Python?",
    options: ["Execução paralela em múltiplos núcleos", "Concorrência cooperativa para operações de I/O", "Maior velocidade de cálculo matemático", "Redução de uso de memória"],
    correct: 1, explanation: "async/await usa concorrência cooperativa — ideal para I/O (HTTP, banco de dados) onde o programa espera respostas externas." },

  { id: "q1-3",  phase: 1, question: "O que é `__slots__` em uma classe Python?",
    options: ["Lista de métodos privados", "Restrição dos atributos permitidos, reduzindo uso de memória", "Decorador para métodos estáticos", "Controle de herança múltipla"],
    correct: 1, explanation: "__slots__ define explicitamente os atributos de uma classe, evitando o __dict__ por instância e reduzindo memória em classes com muitas instâncias." },

  { id: "q1-4",  phase: 1, question: "Em TypeScript, qual a diferença entre `interface` e `type`?",
    options: ["Não há diferença", "Interfaces suportam declaration merging; types suportam unions e mapped types", "Types são mais performáticos", "Interfaces só funcionam com classes"],
    correct: 1, explanation: "Interfaces podem ser abertas (declaration merging). Types são mais expressivos (unions, mapped types, template literals). Use interface para APIs públicas, type para transformações de tipo." },

  { id: "q1-5",  phase: 1, question: "O que é `keyof T` em TypeScript?",
    options: ["Retorna o número de chaves de T", "Cria uma union type com as chaves de T", "Verifica se uma chave existe em T", "Remove chaves de T"],
    correct: 1, explanation: "keyof T produz uma union literal com todas as chaves do tipo T: keyof {a: 1, b: 2} resulta em 'a' | 'b'." },

  { id: "q1-6",  phase: 1, question: "O que significa SQL ser uma linguagem declarativa?",
    options: ["Você define o que quer, não como buscar", "Você escreve passo a passo como os dados são buscados", "Só funciona com dados declarados previamente", "É executada linha por linha"],
    correct: 0, explanation: "Em SQL você descreve O QUÊ quer (SELECT * FROM orders WHERE total > 100), e o banco decide o COMO (query planner escolhe o algoritmo)." },

  // ── FASE 2: Backend ──
  { id: "q2-1",  phase: 2, question: "O que é injeção de dependência no FastAPI?",
    options: ["Instalar dependências via pip", "Declarar parâmetros que o framework resolve automaticamente", "Importar módulos externos", "Configurar variáveis de ambiente"],
    correct: 1, explanation: "Com Depends(), o FastAPI resolve e injeta automaticamente dependências (DB session, auth, configs) nos endpoints." },

  { id: "q2-2",  phase: 2, question: "Qual HTTP status code indica recurso criado com sucesso?",
    options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
    correct: 1, explanation: "201 Created é o código semântico correto após um POST que cria um recurso. 200 é para leituras e atualizações bem-sucedidas." },

  { id: "q2-3",  phase: 2, question: "O que é JWT e onde NÃO deve ser armazenado no browser?",
    options: ["JSON Widget Token; não salvar em cookies", "JSON Web Token; não salvar em localStorage por risco de XSS", "Java Web Token; não salvar em sessionStorage", "JSON Wrapper Type; não salvar em IndexedDB"],
    correct: 1, explanation: "localStorage é acessível a qualquer script da página — um ataque XSS pode roubar o token. Use cookies HttpOnly para maior segurança." },

  { id: "q2-4",  phase: 2, question: "O que é um índice de banco de dados e qual seu custo?",
    options: ["Backup automático; sem custo", "Estrutura que acelera leituras; tem custo em escrita e espaço", "Chave primária; custo em memória", "View materializada; custo em CPU"],
    correct: 1, explanation: "Índices aceleram SELECTs mas têm overhead em INSERT/UPDATE/DELETE (o índice precisa ser atualizado) e ocupam espaço em disco." },

  { id: "q2-5",  phase: 2, question: "O que é uma migration de banco de dados?",
    options: ["Mover o banco para outro servidor", "Script versionado que altera o schema de forma controlada", "Backup incremental dos dados", "Replicação entre bancos"],
    correct: 1, explanation: "Migrations (Alembic, Flyway etc.) permitem evoluir o schema do banco de forma rastreável, reversível e reproducível em diferentes ambientes." },

  { id: "q2-6",  phase: 2, question: "Qual a diferença entre autenticação e autorização?",
    options: ["São sinônimos", "Autenticação verifica quem você é; autorização verifica o que pode fazer", "Autorização verifica quem você é; autenticação verifica o que pode fazer", "Autenticação é server-side; autorização é client-side"],
    correct: 1, explanation: "AuthN (authentication) = identidade (login/senha, JWT). AuthZ (authorization) = permissões (admin pode deletar, user não pode)." },

  // ── FASE 3: Frontend ──
  { id: "q3-1",  phase: 3, question: "O que é o Virtual DOM no React?",
    options: ["Um DOM criado por extensões do browser", "Uma representação em memória do DOM real para calcular diffs eficientes", "O DOM quando o JavaScript está desabilitado", "Uma API para manipular o DOM sem React"],
    correct: 1, explanation: "O Virtual DOM é uma árvore de objetos JS que espelha o DOM. O React calcula as diferenças (reconciliation) e aplica só as mudanças necessárias no DOM real." },

  { id: "q3-2",  phase: 3, question: "Quando usar `useCallback` no React?",
    options: ["Sempre que criar uma função dentro de um componente", "Para memorizar funções passadas como props a componentes memorizados", "Para substituir useState", "Para chamar funções assíncronas"],
    correct: 1, explanation: "useCallback evita recriar funções a cada render — útil quando a função é passada como prop para um filho com React.memo(), evitando re-renders desnecessários." },

  { id: "q3-3",  phase: 3, question: "O que é Server-Side Rendering (SSR)?",
    options: ["Renderização feita no servidor a cada requisição, enviando HTML pronto", "JavaScript rodando no servidor", "Cache de páginas no servidor", "API de servidor sem front-end"],
    correct: 0, explanation: "SSR gera o HTML no servidor para cada request. O browser recebe HTML completo — melhor para SEO e first paint. Contrasta com CSR (renderização no client)." },

  { id: "q3-4",  phase: 3, question: "O que é o hook `useReducer` e quando preferi-lo a `useState`?",
    options: ["É igual ao useState mas mais verboso", "Gerencia estado complexo com transições explícitas via actions", "Reduz o número de componentes", "Substitui useContext"],
    correct: 1, explanation: "useReducer (state, action) => newState é preferível quando o estado tem múltiplos sub-valores interligados ou quando a lógica de atualização é complexa." },

  { id: "q3-5",  phase: 3, question: "O que é CSS-in-JS?",
    options: ["JavaScript dentro de arquivos CSS", "Estilos definidos em JavaScript, com escopo automático por componente", "Framework CSS para JavaScript", "CSS pré-processado com Babel"],
    correct: 1, explanation: "Bibliotecas como styled-components e Emotion permitem definir estilos como objetos JS ou template literals, colocados junto ao componente com escopo isolado." },

  { id: "q3-6",  phase: 3, question: "O que é Code Splitting?",
    options: ["Dividir o código em múltiplos arquivos para organização", "Carregar apenas o código necessário para a página atual (lazy loading)", "Separar lógica de UI e dados", "Comprimir o bundle final"],
    correct: 1, explanation: "Code splitting (dynamic import, React.lazy) divide o bundle em chunks menores. O browser carrega apenas o código necessário, melhorando o tempo de carregamento inicial." },

  // ── FASE 4: Produção ──
  { id: "q4-1",  phase: 4, question: "O que é uma Docker image?",
    options: ["Um container em execução", "Um template imutável com tudo para rodar a aplicação", "Um arquivo de configuração", "Um volume de dados persistente"],
    correct: 1, explanation: "A image é o blueprint imutável (código + dependências + runtime). O container é a instância em execução da image." },

  { id: "q4-2",  phase: 4, question: "O que é CI/CD?",
    options: ["Client/Server Development", "Integração contínua (testes automáticos) + entrega contínua (deploy automático)", "Cloud Infrastructure and Deployment", "Code Inspection e Code Delivery"],
    correct: 1, explanation: "CI: cada push roda testes/lint automaticamente. CD: se CI passou, faz deploy automaticamente para staging/produção." },

  { id: "q4-3",  phase: 4, question: "O que é idempotência em APIs REST?",
    options: ["A API não tem estado", "Executar a mesma operação N vezes dá o mesmo resultado que 1 vez", "A API responde com o mesmo formato", "Autenticação via token fixo"],
    correct: 1, explanation: "PUT, DELETE e GET são idempotentes: chamar DELETE /users/1 múltiplas vezes tem o mesmo efeito final (usuário deletado). Isso permite retry seguro sem efeitos colaterais." },

  { id: "q4-4",  phase: 4, question: "O que é um reverse proxy?",
    options: ["Um proxy que esconde o cliente", "Servidor intermediário que roteia requests para serviços internos, adicionando SSL/cache", "Um banco de dados distribuído", "Uma CDN"],
    correct: 1, explanation: "Nginx/Caddy como reverse proxy recebem requests externos e os encaminham para serviços internos — centralizando SSL, load balancing, rate limiting e cache." },

  { id: "q4-5",  phase: 4, question: "O que é um ambiente de staging?",
    options: ["Servidor de desenvolvimento local", "Réplica da produção para testes finais antes do deploy real", "Servidor de backups", "Ambiente de CI para testes unitários"],
    correct: 1, explanation: "Staging é um espelho da produção onde o código passa por testes de integração e QA antes de chegar aos usuários reais." },

  { id: "q4-6",  phase: 4, question: "O que são variáveis de ambiente e por que usá-las?",
    options: ["Variáveis globais do JavaScript", "Configurações externas ao código para separar secrets de lógica", "Variáveis que mudam conforme o sistema operacional", "Cache de configurações do banco"],
    correct: 1, explanation: "Variáveis de ambiente (DATABASE_URL, SECRET_KEY) ficam fora do código-fonte, permitindo diferentes configs por ambiente (dev/staging/prod) sem alterar o código." },
];

export const phaseTitles = [
  "Fase 1 — Fundamentos",
  "Fase 2 — Intermediário",
  "Fase 3 — Backend & APIs",
  "Fase 4 — Frontend",
  "Fase 5 — Produção & Deploy",
];
