// Descrições educativas para cada item do checklist.
// Cada descrição ensina o conceito de forma clara e direta.

export const descriptions: Record<string, {
  what: string;
  why: string;
  how: string;
  example?: string;
  tip?: string;
}> = {

  // ═══════════════════════════════════════════════
  // FASE 1 — FUNDAMENTOS
  // ═══════════════════════════════════════════════

  "f1-1": {
    what: "Python e Node.js são os dois runtimes que você vai usar. Python 3.12+ é a versão atual com melhorias de performance e mensagens de erro melhores. Node 20 LTS (Long Term Support) significa que tem suporte garantido por anos — sempre prefira versões LTS em produção.",
    why: "Sem o runtime instalado, nenhum código roda. Parece óbvio, mas muito iniciante perde horas com versões erradas ou conflitos entre Python 2 e 3.",
    how: "Baixe o instalador oficial do python.org (marque 'Add to PATH') e nodejs.org. No terminal, verifique: `python --version` e `node --version`. Se retornar a versão, está funcionando.",
    example: "python --version → Python 3.12.3\nnode --version → v20.11.0",
    tip: "No Windows, use `py` em vez de `python` se tiver conflito. Para evitar problemas futuros, considere instalar o WSL2 (Windows Subsystem for Linux) — muitos tutoriais assumem Linux/Mac.",
  },

  "f1-2": {
    what: "VSCode (Visual Studio Code) é um editor de código gratuito da Microsoft que se tornou o padrão da indústria. Ele é extensível via plugins — por padrão é simples, mas com extensões vira uma IDE poderosa.",
    why: "O editor certo economiza horas. Extensões como Pylance fazem análise de tipo em tempo real (avisa erros antes de rodar o código), ESLint detecta bugs no JS/TS, GitLens mostra quem alterou cada linha do código.",
    how: "Instale as extensões: 'Python' (Microsoft), 'Pylance', 'ESLint', 'Prettier', 'GitLens', 'Thunder Client' (testa APIs direto no VSCode). Use Ctrl+Shift+P para abrir o Command Palette — daqui você acessa tudo.",
    example: "Extensões essenciais:\n• Python (ms-python.python)\n• Pylance\n• ESLint\n• Prettier\n• GitLens\n• Error Lens (mostra erros inline)",
    tip: "Configure o autoformat ao salvar: Settings → Format On Save. Assim o código fica formatado automaticamente sempre que você salva, sem pensar nisso.",
  },

  "f1-3": {
    what: "O terminal (ou shell) é a interface de linha de comando onde você digita comandos para o sistema operacional. No Windows, você tem o PowerShell, o CMD, e idealmente o WSL2 (bash no Linux). A maioria dos tutoriais e ferramentas de dev assume que você sabe usar o terminal.",
    why: "Git, npm, Python, Docker, deploy — tudo passa pelo terminal. Um dev que não se sente confortável no terminal perde produtividade o tempo todo. É uma habilidade que você usa centenas de vezes por dia.",
    how: "Comandos fundamentais: `ls` (listar arquivos), `cd pasta/` (entrar em pasta), `cd ..` (voltar), `mkdir nome` (criar pasta), `rm arquivo` (deletar), `cat arquivo` (ver conteúdo), `pwd` (mostrar onde você está).",
    example: "cd ~/projetos\nmkdir meu-projeto\ncd meu-projeto\nls -la",
    tip: "No Windows, instale o Windows Terminal (da Microsoft Store) e configure o WSL2 com Ubuntu. Isso te dá um bash real que funciona igual ao Mac/Linux — evita 90% dos problemas de compatibilidade.",
  },

  "f1-4": {
    what: "Um ambiente virtual (virtualenv) é uma instalação isolada do Python para cada projeto. Sem isso, todos os seus projetos compartilham os mesmos pacotes — e aí um projeto que precisa da versão X de uma biblioteca quebra outro que precisa da versão Y.",
    why: "É a diferença entre projetos que 'funcionam na minha máquina' e projetos profissionais. Todo projeto Python sério usa virtualenv ou ferramentas similares (Poetry, conda). É um sinal imediato de maturidade quando um dev usa isso.",
    how: "Criar: `python -m venv venv`. Ativar no Windows: `venv\\Scripts\\activate`. Ativar no Mac/Linux: `source venv/bin/activate`. Quando ativo, o terminal mostra `(venv)` no início. Instalar pacotes: `pip install fastapi`. Salvar dependências: `pip freeze > requirements.txt`.",
    example: "# Fluxo completo:\npython -m venv venv\nsource venv/bin/activate   # ou venv\\Scripts\\activate\npip install requests\npip freeze > requirements.txt",
    tip: "Nunca commite a pasta `venv/` no Git. Sempre adicione `venv/` ao `.gitignore`. Quem clonar o projeto instala as dependências com `pip install -r requirements.txt`.",
  },

  "f1-5": {
    what: "PATH é uma variável de ambiente do sistema operacional que lista as pastas onde o terminal procura por executáveis. Quando você digita `python`, o sistema percorre as pastas do PATH em ordem até encontrar um arquivo chamado 'python'. Variáveis de ambiente são configurações do sistema disponíveis para todos os processos.",
    why: "Problemas com PATH são a causa número 1 de 'comando não encontrado' e 'versão errada sendo executada'. Entender isso resolve horas de frustração. Também é fundamental para segredos da aplicação (API keys, senhas de banco).",
    how: "Ver PATH atual: `echo $PATH` (Mac/Linux) ou `$env:Path` (PowerShell). Adicionar ao PATH permanentemente no Windows: Painel de Controle → Sistema → Variáveis de Ambiente. Para variáveis de app, use arquivos `.env` com python-dotenv.",
    example: "# Arquivo .env (NUNCA commite no git)\nDATABASE_URL=postgresql://localhost/mydb\nSECRET_KEY=minha-chave-secreta\nAPI_KEY=xyz123\n\n# Python: carregar com dotenv\nfrom dotenv import load_dotenv\nimport os\nload_dotenv()\nkey = os.getenv('API_KEY')",
    tip: "Nunca coloque senhas ou API keys diretamente no código. Sempre use variáveis de ambiente. Se você commitar uma chave no GitHub, considere-a comprometida — bots escaneiam repositórios públicos em segundos.",
  },

  "f1-6": {
    what: "Git é um sistema de controle de versão distribuído criado por Linus Torvalds (criador do Linux). Ele registra cada mudança no seu código como um 'snapshot' chamado commit. Você pode voltar para qualquer ponto da história, trabalhar em paralelo em branches diferentes, e colaborar com outras pessoas sem sobrescrever o trabalho delas.",
    why: "Trabalhar sem Git é como escrever um documento sem Ctrl+Z. É impossível colaborar em equipe sem controle de versão. Em 100% das empresas de tecnologia, Git é obrigatório. GitHub é onde seu portfólio fica — é seu currículo técnico.",
    how: "Git opera em três áreas: Working Directory (seus arquivos), Staging Area (o que vai no próximo commit), e Repository (histórico de commits). O fluxo é: modificar arquivo → `git add arquivo` → `git commit -m 'mensagem'`.",
    example: "# Fluxo básico do dia a dia:\ngit status                    # ver o que mudou\ngit add src/app.py            # preparar arquivo\ngit commit -m 'feat: add login' # salvar snapshot\ngit push origin main          # enviar para GitHub",
    tip: "Faça commits pequenos e frequentes. Um commit deve representar uma mudança lógica — não um dia inteiro de trabalho. Mensagens como 'WIP' ou 'fix stuff' são inúteis. Use: 'feat: add user login', 'fix: resolve null pointer in auth'.",
  },

  "f1-7": {
    what: "Os seis comandos essenciais do Git: `init` cria um repositório novo, `add` move arquivos para a staging area, `commit` salva um snapshot com mensagem, `push` envia commits para o servidor remoto (GitHub), `pull` baixa e integra mudanças do remoto, `clone` copia um repositório remoto para sua máquina.",
    why: "Esses comandos são o vocabulário mínimo. Você vai usá-los dezenas de vezes por dia. Não há como trabalhar profissionalmente sem dominar cada um.",
    how: "`git init` — dentro da pasta do projeto. `git add .` — adiciona tudo (cuidado). `git add arquivo.py` — adiciona arquivo específico (melhor). `git commit -m 'mensagem'` — salva. `git push origin main` — envia ao GitHub. `git pull` — atualiza local com o remoto.",
    example: "# Iniciando projeto novo:\ngit init\ngit add README.md\ngit commit -m 'first commit'\ngit remote add origin https://github.com/user/repo.git\ngit push -u origin main",
    tip: "Use `git status` antes de qualquer operação para ver o estado atual. Use `git log --oneline` para ver o histórico resumido. Use `git diff` para ver exatamente o que mudou antes de commitar.",
  },

  "f1-8": {
    what: "GitHub é uma plataforma de hospedagem de repositórios Git com funcionalidades de colaboração (Issues, Pull Requests, Actions). Para um dev júnior, o perfil GitHub É o portfólio — recrutadores técnicos olham isso antes do currículo.",
    why: "Seu GitHub mostra consistência (quantos dias você commitou), qualidade de código (como você estrutura projetos), e comunicação técnica (seus READMEs e descrições). Um perfil vazio ou com apenas forks sem contribuição própria não impressiona ninguém.",
    how: "Crie conta em github.com. Configure foto e bio. Crie um repositório especial com o mesmo nome do seu usuário — esse repositório tem um README que aparece na sua página de perfil. Pin seus melhores projetos.",
    example: "# Perfil: github.com/seu-usuario\n# Repositório: github.com/seu-usuario/seu-usuario\n# README.md desse repo aparece no seu perfil\n\n# Exemplo de bio útil:\n# 'Backend dev | Python & TypeScript\n# Building: [link do projeto]\n# Learning: FastAPI, PostgreSQL'",
    tip: "Contribua todo dia, mesmo que seja só uma linha. O 'contribution graph' (os quadradinhos verdes) é visível para todos. Consistência por 3 meses impressiona mais que um projeto incrível que você fez uma vez.",
  },

  "f1-9": {
    what: "Branch é uma linha independente de desenvolvimento. Imagine o histórico de commits como uma árvore: `main` é o tronco, branches são galhos. Você cria um branch para trabalhar em uma feature sem afetar o código principal. Quando termina, faz um merge (junta os galhos). Pull Request (PR) é o processo formal de pedir pra juntar seu branch ao main — com revisão de código.",
    why: "Em equipe, todo mundo trabalhando direto no main seria um caos. Branches permitem que 5 desenvolvedores trabalhem em 5 features ao mesmo tempo sem se atrapalhar. PRs garantem que código seja revisado antes de ir para produção.",
    how: "Criar branch: `git checkout -b feature/login`. Trabalhar normalmente (add, commit). Enviar: `git push origin feature/login`. No GitHub, abrir Pull Request. Após aprovação: merge no main.",
    example: "# Fluxo de feature branch:\ngit checkout main\ngit pull                          # atualizar main\ngit checkout -b feature/cadastro  # criar branch\n# ... trabalhar, fazer commits ...\ngit push origin feature/cadastro  # enviar\n# Abrir PR no GitHub",
    tip: "Nomeie branches de forma descritiva: `feature/user-auth`, `fix/login-bug`, `chore/update-deps`. Evite nomes como `minha-branch` ou `teste`. Delete branches após o merge — um repo com 50 branches mortas é difícil de manter.",
  },

  "f1-10": {
    what: ".gitignore é um arquivo que lista o que o Git deve ignorar — não versionar. Arquivos de build, dependências (node_modules), ambientes virtuais (venv), arquivos de configuração local e especialmente SEGREDOS (.env) nunca devem ir para o repositório. Conventional Commits é uma convenção de mensagens de commit com prefixos: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.",
    why: "Commitar `node_modules` (que pode ter 500MB) ou um arquivo `.env` com senhas são erros graves e comuns de iniciantes. O .gitignore previne isso. Conventional Commits tornam o histórico legível e permitem geração automática de changelogs.",
    how: "Crie `.gitignore` na raiz do projeto. GitHub tem templates prontos para Python, Node, etc. Conventional Commits: `feat: adiciona endpoint de login`, `fix: corrige validação de email`, `docs: atualiza README`, `refactor: extrai função de autenticação`.",
    example: "# .gitignore para Python + Node:\nvenv/\n__pycache__/\n*.pyc\n.env\nnode_modules/\n.next/\ndist/\n.DS_Store\n\n# Commits convencionais:\ngit commit -m 'feat: add user registration endpoint'\ngit commit -m 'fix: handle null email in validation'\ngit commit -m 'docs: add API documentation'",
    tip: "Use gitignore.io para gerar .gitignore automaticamente — só digitar as tecnologias do projeto. Para mensagens de commit, pense: 'Este commit vai...' — a mensagem deve completar essa frase.",
  },

  "f1-11": {
    what: "Python tem tipos primitivos imutáveis (int, float, str, bool, None) e estruturas mutáveis (list, dict, set, tuple). Imutável significa que você não pode modificar o objeto — você cria um novo. Isso tem implicações importantes em performance e semântica do código.",
    why: "Entender tipos evita bugs sutis. Saber que strings são imutáveis explica por que `s = s + 'x'` em loop é lento (cria nova string toda vez). Saber que listas são mutáveis explica por que passar uma lista para função e modificá-la dentro muda a original.",
    how: "`type(valor)` retorna o tipo. Conversões: `int('42')`, `str(42)`, `float('3.14')`, `bool(0)` → False. None é o 'nada' do Python — equivale ao null de outras linguagens. Comparação: `x is None` (não `x == None`).",
    example: "# Tipos e conversões:\nx = 42          # int\ny = 3.14        # float\ns = 'hello'     # str\nb = True        # bool\nn = None        # NoneType\n\nprint(type(x))  # <class 'int'>\nprint(int('10') + 5)  # 15\nprint(bool(0), bool(''))  # False False\nprint(bool(1), bool('a'))  # True True",
    tip: "Em Python, strings com aspas simples e duplas são equivalentes. Use aspas simples por convenção, exceto quando a string contém apóstrofes. f-strings (`f'Olá {nome}'`) são a forma moderna e mais rápida de formatar strings — prefira sempre.",
  },

  "f1-12": {
    what: "Python tem quatro estruturas de dados nativas principais: **list** (lista ordenada, mutável, aceita duplicatas), **dict** (pares chave-valor, ordenado desde Python 3.7), **tuple** (lista imutável, use para dados que não devem mudar), **set** (coleção sem duplicatas, sem ordem — ótimo para verificar pertencimento).",
    why: "Escolher a estrutura certa é questão de performance e clareza. Busca em set é O(1) (instantânea), em list é O(n) (varia com tamanho). Dict é a estrutura mais usada em Python — entender seus métodos é essencial.",
    how: "List: `[1, 2, 3]`. Dict: `{'nome': 'Ana', 'idade': 25}`. Tuple: `(1, 2, 3)`. Set: `{1, 2, 3}`. Operações de dict: `.keys()`, `.values()`, `.items()`, `.get(chave, default)`. List: `.append()`, `.extend()`, `.pop()`, `.sort()`.",
    example: "# Quando usar cada um:\nnotas = [9.5, 8.0, 7.5]          # list: ordem importa\nusuario = {'nome': 'Ana', 'id': 1} # dict: chave-valor\ncoordenadas = (lat, lon)           # tuple: imutável\nemails_vistos = set()              # set: sem duplicatas\n\n# dict.get evita KeyError:\nidade = usuario.get('idade', 0)    # retorna 0 se não existir\n\n# verificação em set é O(1):\nif email in emails_vistos:  # muito mais rápido que em list\n    pass",
    tip: "Use `dict.get(chave, valor_default)` em vez de `dict[chave]` quando a chave pode não existir — evita KeyError. Para verificar se algo existe em uma coleção grande, prefira sempre set em vez de list.",
  },

  "f1-13": {
    what: "`if/elif/else` controla qual bloco de código executa com base em condições. `for` itera sobre qualquer objeto iterável (listas, strings, dicts, ranges). `while` repete enquanto uma condição for verdadeira. `break` sai do loop imediatamente, `continue` pula para a próxima iteração.",
    why: "São as estruturas de controle fundamentais de qualquer programa. Sem elas, código executa de cima para baixo sem decisões — o que não resolve nenhum problema real.",
    how: "`range(5)` gera 0,1,2,3,4. `range(1, 6)` gera 1,2,3,4,5. `enumerate(lista)` dá índice e valor juntos. `zip(lista1, lista2)` itera duas listas ao mesmo tempo. Condições: `and`, `or`, `not`, `in`, `is`.",
    example: "# enumerate — quando precisa do índice:\nfrutas = ['maçã', 'banana', 'uva']\nfor i, fruta in enumerate(frutas):\n    print(f'{i}: {fruta}')  # 0: maçã, 1: banana...\n\n# Compreensão de lista (pythônico):\nquadrados = [x**2 for x in range(10)]\npares = [x for x in range(20) if x % 2 == 0]\n\n# Evitar while infinito:\nmax_tentativas = 3\ntentativas = 0\nwhile tentativas < max_tentativas:\n    tentativas += 1",
    tip: "Prefira `for item in lista` a `for i in range(len(lista))` — é mais Pythônico. Use `enumerate` quando precisar do índice. Evite `while True` sem um `break` bem definido.",
  },

  "f1-14": {
    what: "Funções são blocos de código reutilizáveis definidos com `def`. Parâmetros são os inputs, `return` define o output. **Escopo**: variáveis criadas dentro de uma função só existem lá (escopo local). `*args` captura argumentos posicionais extras como tuple. `**kwargs` captura argumentos nomeados extras como dict.",
    why: "Funções são a unidade básica de abstração. Código sem funções vira spaghetti impossível de manter. Entender escopo previne bugs sutis onde variáveis se sobrescrevem sem você perceber.",
    how: "Parâmetros default: `def saudar(nome, formal=False)`. Ordem importa: não misture parâmetros sem default antes dos com default errado. Type hints: `def soma(a: int, b: int) -> int:` — boa prática, não obrigatório.",
    example: "# Funções com diferentes tipos de parâmetros:\ndef criar_usuario(nome: str, email: str, admin: bool = False) -> dict:\n    return {'nome': nome, 'email': email, 'admin': admin}\n\n# *args e **kwargs:\ndef log(*mensagens, nivel='INFO'):\n    for msg in mensagens:\n        print(f'[{nivel}] {msg}')\n\nlog('Usuário criado', 'Email enviado', nivel='DEBUG')\n\n# Função como valor (first-class):\noperacoes = {'soma': lambda a, b: a + b}\nresultado = operacoes['soma'](3, 4)  # 7",
    tip: "Funções devem fazer UMA coisa e fazê-la bem. Se você precisar usar 'e' para descrever o que uma função faz ('busca o usuário E envia email'), ela está fazendo coisas demais — separe em duas funções.",
  },

  "f1-15": {
    what: "Strings em Python são sequências imutáveis de caracteres Unicode. F-strings (formatted string literals) permitem inserir expressões diretamente na string com `f'...'`. São a forma mais moderna, legível e performática de formatar strings.",
    why: "Manipulação de strings é onipresente — validação de dados, formatação de outputs, parsing de arquivos. f-strings tornaram código Python muito mais legível em comparação com `.format()` ou concatenação com `+`.",
    how: "Principais métodos: `.strip()` remove espaços, `.split()` divide em lista, `.join()` une lista em string, `.replace()` substitui, `.upper()`/`.lower()` muda case, `.startswith()`/`.endswith()` verifica prefixo/sufixo, `.find()` busca posição.",
    example: "# f-strings (use sempre):\nnome = 'Ana'\nidade = 25\nprint(f'Olá, {nome}! Você tem {idade} anos.')\nprint(f'Próximo ano: {idade + 1}')  # expressões funcionam\nprint(f'Preço: R$ {preco:.2f}')     # formatação de float\n\n# Métodos úteis:\nemail = '  usuario@email.com  '\nemail = email.strip().lower()  # 'usuario@email.com'\n\ncsv_line = 'Ana,25,SP'\nnome, idade, estado = csv_line.split(',')\n\npalavras = ['Python', 'é', 'incrível']\nfrase = ' '.join(palavras)  # 'Python é incrível'",
    tip: "Use `.strip()` sempre ao processar input do usuário — espaços extras causam bugs de comparação invisíveis. Para checar se string está vazia: `if not string:` em vez de `if string == '':`.",
  },

  "f1-16": {
    what: "Arquivos são abertos com `open(caminho, modo)`. O context manager `with` garante que o arquivo seja fechado automaticamente, mesmo se ocorrer um erro. Modos: `'r'` leitura, `'w'` escrita (sobrescreve), `'a'` append (adiciona ao final), `'rb'`/`'wb'` para binários.",
    why: "Todo programa real lida com arquivos — logs, configurações, dados. Não usar `with` e esquecer de fechar arquivos é uma fonte de vazamento de recursos. CSV é o formato mais comum para dados tabulares.",
    how: "`.read()` lê tudo como string. `.readlines()` retorna lista de linhas. `.write(string)` escreve. Para CSV use o módulo `csv` nativo ou `pandas` para dados maiores.",
    example: "# Ler arquivo:\nwith open('dados.txt', 'r', encoding='utf-8') as f:\n    conteudo = f.read()\n\n# Iterar linha por linha (eficiente para arquivos grandes):\nwith open('log.txt', 'r') as f:\n    for linha in f:\n        print(linha.strip())\n\n# CSV nativo:\nimport csv\nwith open('usuarios.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row['nome'], row['email'])\n\n# Escrever:\nwith open('output.txt', 'w', encoding='utf-8') as f:\n    f.write('Resultado: 42\\n')",
    tip: "Sempre especifique `encoding='utf-8'` ao abrir arquivos de texto — evita erros com acentos no Windows. Para arquivos JSON, use `import json` com `json.load(f)` e `json.dump(dados, f, indent=2, ensure_ascii=False)`.",
  },

  "f1-17": {
    what: "Decomposição é a habilidade de pegar um problema grande e complexo e quebrá-lo em subproblemas menores e resolvíveis. É a habilidade fundamental do pensamento computacional — mais importante que qualquer sintaxe de linguagem.",
    why: "Todo dev sênior passa mais tempo pensando no problema do que digitando código. Iniciantes tentam resolver tudo de uma vez e se perdem. A decomposição é o que permite resolver problemas complexos sistematicamente.",
    how: "Quando receber um problema: 1) Entenda completamente antes de codar. 2) Liste as etapas necessárias em linguagem natural. 3) Identifique as menores unidades (funções). 4) Implemente de baixo pra cima.",
    example: "# Problema: 'Criar sistema de login'\n# Decomposição:\n# 1. Receber email e senha do usuário\n# 2. Validar formato do email\n# 3. Buscar usuário no banco pelo email\n# 4. Se não encontrar: retornar erro 'usuário não existe'\n# 5. Comparar senha com hash armazenado\n# 6. Se inválida: retornar erro 'senha incorreta'\n# 7. Gerar token JWT\n# 8. Retornar token\n\n# Cada item vira uma função",
    tip: "Se você não consegue explicar o problema em 5 passos simples, você ainda não entendeu o problema. Nunca comece a codar sem esse entendimento. Papel e caneta ainda são as melhores ferramentas de design.",
  },

  "f1-18": {
    what: "Pseudocódigo é escrever a lógica de um algoritmo em linguagem natural estruturada, sem se preocupar com sintaxe. Fluxograma é a representação visual do mesmo — usando símbolos padronizados (retângulo para ação, losango para decisão, seta para fluxo).",
    why: "Planejar antes de codar economiza tempo. É muito mais rápido reescrever pseudocódigo do que código real. Também facilita comunicação com não-programadores e com sua equipe.",
    how: "Pseudocódigo usa INICIO/FIM, SE/SENÃO/FIMSE, PARA/FIMPARA, ENQUANTO/FIMENQUANTO, LEIA, ESCREVA. Ferramentas de fluxograma: draw.io (gratuito), Lucidchart, Mermaid (text-to-diagram).",
    example: "# Pseudocódigo de busca binária:\nINICIO\n  RECEBER lista_ordenada, valor_buscado\n  inicio = 0, fim = tamanho(lista) - 1\n  ENQUANTO inicio <= fim\n    meio = (inicio + fim) / 2\n    SE lista[meio] == valor: RETORNAR meio\n    SE lista[meio] < valor: inicio = meio + 1\n    SENAO: fim = meio - 1\n  RETORNAR -1  # não encontrado\nFIM",
    tip: "Mermaid é uma ferramenta incrível: você escreve diagramas em texto e ele renderiza automaticamente. GitHub renderiza Mermaid em Markdown! Adicionar fluxogramas no README do projeto impressiona muito.",
  },

  "f1-19": {
    what: "Recursão é quando uma função chama a si mesma. Toda função recursiva tem dois elementos obrigatórios: **caso base** (quando para) e **caso recursivo** (quando chama a si mesma). Internamente, usa a call stack — uma pilha de chamadas de função. Se não tiver caso base, estoura o stack (StackOverflowError).",
    why: "Alguns problemas são naturalmente recursivos: árvores, grafos, sistemas de arquivos, algoritmos divide-and-conquer. Entender recursão é fundamental para entender estruturas de dados avançadas.",
    how: "Pense assim: 'Se eu soubesse resolver o problema para N-1, como resolvo para N?' O caso base é o menor problema que você sabe resolver diretamente.",
    example: "# Factorial recursivo:\ndef factorial(n: int) -> int:\n    # Caso base: problema trivial\n    if n <= 1:\n        return 1\n    # Caso recursivo: reduz o problema\n    return n * factorial(n - 1)\n\n# Como funciona factorial(4):\n# factorial(4) = 4 * factorial(3)\n#             = 4 * 3 * factorial(2)\n#             = 4 * 3 * 2 * factorial(1)\n#             = 4 * 3 * 2 * 1 = 24\n\n# Fibonacci (versão simples):\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)",
    tip: "Recursão tem overhead por causa das chamadas na stack. Para problemas com muitas chamadas repetidas (como Fibonacci), use memoização: `@functools.lru_cache()`. Sempre teste o caso base primeiro.",
  },

  "f1-20": {
    what: "Big O Notation descreve como o tempo ou espaço de um algoritmo cresce conforme o input cresce. O(1) é constante — não importa o tamanho do input, o tempo é o mesmo. O(n) é linear — dobra o input, dobra o tempo. O(n²) é quadrático — dobra o input, quadruplica o tempo. O(log n) é logarítmico — muito eficiente.",
    why: "Um algoritmo O(n²) num array de 1 milhão de itens executa 1 trilhão de operações. O mesmo problema em O(n log n) executa 20 milhões. A diferença entre produção que funciona e produção que cai é frequentemente a complexidade do algoritmo.",
    how: "Regras práticas: loop simples = O(n). Loop dentro de loop = O(n²). Dividir o problema pela metade a cada passo = O(log n). Busca em dict/set Python = O(1). Busca em list Python = O(n).",
    example: "# O(n) — cresce com o tamanho da lista:\ndef encontrar_max(lista):\n    maximo = lista[0]\n    for item in lista:  # percorre 1x\n        if item > maximo:\n            maximo = item\n    return maximo\n\n# O(n²) — evite para inputs grandes:\ndef tem_duplicatas(lista):\n    for i in range(len(lista)):\n        for j in range(i+1, len(lista)):  # loop dentro de loop!\n            if lista[i] == lista[j]:\n                return True\n    return False\n\n# O(n) — usando set:\ndef tem_duplicatas_eficiente(lista):\n    return len(lista) != len(set(lista))  # set remove duplicatas",
    tip: "No dia a dia, a intuição mais importante é: evite loops dentro de loops para inputs grandes. Quando precisar verificar 'isso está na coleção?', use set ou dict (O(1)) em vez de list (O(n)).",
  },

  // ═══════════════════════════════════════════════
  // FASE 2 — INTERMEDIÁRIO
  // ═══════════════════════════════════════════════

  "f2-1": {
    what: "Uma **classe** é um molde para criar objetos. Um **objeto** (instância) é uma cópia criada a partir desse molde com seus próprios dados. **Atributos** são as variáveis do objeto (dados). **Métodos** são as funções do objeto (comportamentos). `__init__` é o construtor — executado automaticamente ao criar um objeto. `self` é a referência ao próprio objeto dentro da classe.",
    why: "OOP permite modelar o mundo real em código. Em vez de funções soltas manipulando dados, você agrupa dados e comportamentos relacionados. Quase todo código profissional usa OOP — frameworks, ORMs, APIs.",
    how: "Atributos de instância vivem em `self` e são únicos por objeto. Atributos de classe são compartilhados por todos os objetos. Métodos recebem `self` como primeiro parâmetro automaticamente.",
    example: "class ContaBancaria:\n    banco = 'Banco XYZ'  # atributo de classe\n    \n    def __init__(self, titular: str, saldo: float = 0):\n        self.titular = titular  # atributo de instância\n        self._saldo = saldo     # _ = convenção 'privado'\n    \n    def depositar(self, valor: float) -> None:\n        if valor > 0:\n            self._saldo += valor\n    \n    def saldo(self) -> float:\n        return self._saldo\n\nconta = ContaBancaria('Ana', 1000)\nconta.depositar(500)\nprint(conta.saldo())  # 1500",
    tip: "Prefixo `_` indica 'uso interno' por convenção (não é realmente privado em Python). Prefixo `__` ativa name mangling — Python renomeia o atributo internamente para `_Classe__atributo`. Use `_` para a maioria dos casos.",
  },

  "f2-2": {
    what: "Os 4 pilares da OOP: **Encapsulamento** — esconder detalhes internos, expor só o necessário. **Herança** — classe filha herda atributos e métodos da classe pai. **Polimorfismo** — objetos de tipos diferentes respondendo ao mesmo método de formas diferentes. **Abstração** — trabalhar com conceitos de alto nível sem se preocupar com implementação.",
    why: "Sem esses princípios, código OOP vira procedural com classes decorativas. Herança permite reuso. Polimorfismo permite escrever código genérico que funciona com múltiplos tipos. Encapsulamento previne uso indevido da API interna.",
    how: "`class Cachorro(Animal):` — Cachorro herda de Animal. `super().__init__()` chama o construtor do pai. Polimorfismo: se Cachorro e Gato ambos têm `.fazer_som()`, código pode chamar `animal.fazer_som()` sem saber o tipo específico.",
    example: "class Animal:\n    def __init__(self, nome: str):\n        self.nome = nome\n    \n    def fazer_som(self) -> str:\n        raise NotImplementedError  # abstração\n\nclass Cachorro(Animal):\n    def fazer_som(self) -> str:\n        return 'Au!'\n\nclass Gato(Animal):\n    def fazer_som(self) -> str:\n        return 'Miau!'\n\n# Polimorfismo: mesmo código, comportamentos diferentes\nanimais: list[Animal] = [Cachorro('Rex'), Gato('Luna')]\nfor animal in animais:\n    print(f'{animal.nome}: {animal.fazer_som()}')",
    tip: "Prefira **composição** a herança profunda. Herança com mais de 2 níveis vira um pesadelo de manutenção. Em vez de `class Gerente(Funcionario(Pessoa))`, considere injetar dependências via composição.",
  },

  "f2-3": {
    what: "Dunder methods (double underscore) ou magic methods são métodos especiais do Python que definem como objetos se comportam com operadores e funções nativas. `__str__` define o que `print(obj)` mostra. `__repr__` define representação técnica (para debugging). `__eq__` define como `==` funciona. `__len__` define `len(obj)`. `__add__` define `obj1 + obj2`.",
    why: "Sem `__str__`, imprimir um objeto mostra `<Objeto 0x7f...>` — inútil. Com dunders, seus objetos se comportam como tipos nativos do Python — integra naturalmente com o ecossistema.",
    how: "`__repr__` deve retornar uma string que, se executada, recria o objeto. Regra: `__repr__` para devs, `__str__` para usuários finais. Se só implementar um, implemente `__repr__`.",
    example: "from dataclasses import dataclass\nfrom datetime import date\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n    estoque: int = 0\n    \n    def __str__(self) -> str:\n        return f'{self.nome} - R$ {self.preco:.2f}'\n    \n    def __repr__(self) -> str:\n        return f'Produto(nome={self.nome!r}, preco={self.preco})'\n    \n    def __eq__(self, other) -> bool:\n        if not isinstance(other, Produto):\n            return False\n        return self.nome == other.nome\n    \n    def __add__(self, other: 'Produto') -> int:\n        # Soma de estoque (exemplo)\n        return self.estoque + other.estoque",
    tip: "@dataclass (Python 3.7+) gera automaticamente `__init__`, `__repr__` e `__eq__` baseados nos atributos declarados. Use para classes simples de dados — economiza muito código boilerplate.",
  },

  "f2-4": {
    what: "**Herança** cria acoplamento forte: mudar a classe pai quebra as filhas. **Composição** significa que uma classe TEM instâncias de outras classes em vez de SER uma subclasse delas. O princípio é: 'prefira composição a herança'. Herança modela 'é um' (Cachorro É um Animal). Composição modela 'tem um' (Carro TEM um Motor).",
    why: "Hierarquias de herança profundas são frágeis — mudanças no topo quebram tudo abaixo. Composição é mais flexível: você pode trocar componentes em runtime, testar partes isoladamente, e combinar comportamentos sem o 'problema do diamante'.",
    how: "Em vez de `class Logger(Database, EmailSender)`, faça `class UserService` que recebe `logger` e `email_sender` como parâmetros (injeção de dependência). Isso também facilita testes — você injeta mocks.",
    example: "# Herança: problemático\nclass GerenciadorDeArquivo(Logger, ValidadorDeSchema, Notificador):\n    pass  # difícil de entender, testar e manter\n\n# Composição: muito melhor\nclass GerenciadorDeArquivo:\n    def __init__(\n        self,\n        logger: Logger,         # injeção de dependência\n        validador: Validador,\n        notificador: Notificador\n    ):\n        self._logger = logger\n        self._validador = validador\n        self._notificador = notificador\n    \n    def processar(self, arquivo):\n        self._validador.validar(arquivo)\n        self._logger.log(f'Processando {arquivo}')\n        self._notificador.notificar('arquivo processado')",
    tip: "A regra de ouro: use herança quando a relação 'é um' é genuína e estável. Use composição quando há incerteza, quando comportamentos são intercambiáveis, ou quando precisa de testabilidade.",
  },

  "f2-5": {
    what: "`@dataclass` é um decorador que gera automaticamente `__init__`, `__repr__`, `__eq__` e opcionalmente `__hash__` baseado em campos declarados. O módulo `typing` oferece anotações de tipo: `Optional[str]` (pode ser None), `List[int]`, `Dict[str, Any]`, `Union[str, int]`. Python 3.10+ permite `str | None` em vez de `Optional[str]`.",
    why: "Type hints não são obrigatórios em Python, mas tornam o código muito mais legível e seguro. IDEs usam as anotações para mostrar erros antes de rodar. Pydantic (framework de validação) se baseia inteiramente em type hints.",
    how: "`@dataclass(frozen=True)` cria objetos imutáveis. `field(default_factory=list)` para campos com valor default mutável. Use `Optional[Tipo]` quando um campo pode ser None.",
    example: "from dataclasses import dataclass, field\nfrom typing import Optional\n\n@dataclass\nclass Usuario:\n    nome: str\n    email: str\n    idade: Optional[int] = None\n    tags: list[str] = field(default_factory=list)\n    ativo: bool = True\n    \n    def esta_ativo(self) -> bool:\n        return self.ativo\n\n# Python gera automaticamente:\n# __init__(self, nome, email, idade=None, tags=None, ativo=True)\n# __repr__ e __eq__\n\nuser = Usuario('Ana', 'ana@email.com', 25, ['admin', 'editor'])\nprint(user)  # Usuario(nome='Ana', email='ana@email.com', ...)",
    tip: "Para projetos com APIs, use Pydantic (BaseModel) em vez de dataclass — tem validação automática, serialização JSON, e integra perfeitamente com FastAPI. Mas entenda dataclasses primeiro, são mais simples.",
  },

  "f2-6": {
    what: "**Testes unitários** verificam uma função ou classe isoladamente. **Testes de integração** verificam como múltiplos componentes funcionam juntos. **Testes end-to-end (E2E)** simulam o usuário real no sistema completo. A pirâmide de testes prega: muitos testes unitários (rápidos, baratos), alguns de integração, poucos E2E (lentos, caros).",
    why: "Sem testes, cada mudança no código pode quebrar algo sem você saber. Com testes, você refatora com confiança. Empresas sérias exigem cobertura de testes. TDD (Test-Driven Development) é uma prática que aumenta a qualidade do design do código.",
    how: "Um bom teste segue o padrão **AAA**: **Arrange** (preparar dados), **Act** (executar a função), **Assert** (verificar resultado). Cada teste deve testar UMA coisa específica e ter um nome descritivo.",
    example: "# Padrão AAA:\ndef test_calcular_desconto_com_cupom_valido():\n    # Arrange\n    produto = Produto(nome='Notebook', preco=3000.0)\n    cupom = Cupom(codigo='DESC10', percentual=10)\n    \n    # Act\n    preco_final = calcular_desconto(produto, cupom)\n    \n    # Assert\n    assert preco_final == 2700.0\n\ndef test_calcular_desconto_sem_cupom():\n    produto = Produto(nome='Mouse', preco=100.0)\n    preco_final = calcular_desconto(produto, cupom=None)\n    assert preco_final == 100.0",
    tip: "Nomeie testes assim: `test_[o_que_testa]_[contexto]_[resultado_esperado]`. Ex: `test_login_com_senha_errada_retorna_401`. Testes bem nomeados documentam o comportamento esperado — são especificações executáveis.",
  },

  "f2-7": {
    what: "pytest é o framework de testes padrão do Python. Ele descobre automaticamente funções que começam com `test_` e arquivos que começam com `test_`. **Fixtures** são funções que preparam e limpam o ambiente de teste — evitam repetição de setup. `parametrize` executa o mesmo teste com múltiplos inputs.",
    why: "pytest tem sintaxe muito mais limpa que o unittest nativo. Mensagens de erro claras, plugins poderosos (coverage, mock, async), e integra com CI/CD. É o padrão de mercado.",
    how: "Instalar: `pip install pytest pytest-cov`. Rodar: `pytest`. Com cobertura: `pytest --cov=src`. `@pytest.fixture` marca uma função como fixture. `conftest.py` é um arquivo especial onde fixtures compartilhadas ficam.",
    example: "import pytest\nfrom src.auth import criar_usuario, fazer_login\n\n# Fixture: prepara dados reutilizáveis\n@pytest.fixture\ndef usuario_teste():\n    usuario = criar_usuario('teste@email.com', 'senha123')\n    yield usuario  # 'yield' permite cleanup depois\n    # cleanup aqui se necessário\n\n# Parametrize: testa múltiplos casos\n@pytest.mark.parametrize('email,valido', [\n    ('user@email.com', True),\n    ('invalido', False),\n    ('', False),\n    ('a@b.c', True),\n])\ndef test_validacao_email(email, valido):\n    assert validar_email(email) == valido\n\n# Usando fixture:\ndef test_login_com_credenciais_corretas(usuario_teste):\n    resultado = fazer_login(usuario_teste.email, 'senha123')\n    assert resultado.token is not None",
    tip: "Execute `pytest -v` para output verboso (mostra cada teste). `pytest -k 'login'` executa só testes com 'login' no nome. `pytest --tb=short` dá tracebacks mais curtos. Configure `pytest.ini` na raiz do projeto.",
  },

  "f2-8": {
    what: "TDD (Test-Driven Development) é um ciclo de 3 etapas: **Red** — escreva um teste que falha (o código ainda não existe). **Green** — escreva o código mínimo para o teste passar. **Refactor** — melhore o código mantendo os testes passando. O insight fundamental: você escreve o teste ANTES do código.",
    why: "TDD força você a pensar na interface da função antes de implementá-la — resulta em APIs melhores. Também garante 100% de cobertura por definição. Devs que praticam TDD escrevem código mais modular e testável.",
    how: "1. Escreva `test_` que chama função que não existe ainda. 2. Execute — veja falhar. 3. Implemente o mínimo. 4. Execute — veja passar. 5. Refatore. 6. Repita.",
    example: "# Passo 1: Escrever o teste (ANTES da implementação)\ndef test_calcular_imc_normal():\n    resultado = calcular_imc(peso=70, altura=1.75)\n    assert resultado == pytest.approx(22.86, abs=0.01)\n    assert classificar_imc(resultado) == 'Normal'\n\n# Passo 2: Executar → FALHA (função não existe)\n\n# Passo 3: Implementar o mínimo:\ndef calcular_imc(peso: float, altura: float) -> float:\n    return peso / (altura ** 2)\n\ndef classificar_imc(imc: float) -> str:\n    if imc < 18.5: return 'Abaixo do peso'\n    if imc < 25: return 'Normal'\n    if imc < 30: return 'Sobrepeso'\n    return 'Obesidade'\n\n# Passo 4: Executar → PASSA\n# Passo 5: Refatorar se necessário",
    tip: "Não precisa fazer TDD puro 100% do tempo para se beneficiar. Mesmo escrever testes logo após implementar (em vez de nunca) já melhora muito a qualidade. Comece com TDD em funções de lógica de negócio.",
  },

  "f2-9": {
    what: "Mocks substituem dependências reais (banco de dados, APIs externas, email) por objetos falsos controlados em testes. **Mock** grava chamadas e pode configurar retornos. **Stub** retorna valores predefinidos. **Spy** monitora chamadas sem alterar comportamento. O objetivo é isolar a unidade testada das suas dependências.",
    why: "Testes que chamam banco real ou API externa são lentos, instáveis (API pode estar fora) e difíceis de configurar. Mocks tornam testes rápidos, deterministicos e independentes de infraestrutura.",
    how: "`unittest.mock.patch` substitui temporariamente um objeto. `MagicMock()` cria um objeto falso que aceita qualquer chamada. `mock.return_value` define o que a função retorna. `mock.assert_called_once_with()` verifica se foi chamada corretamente.",
    example: "from unittest.mock import patch, MagicMock\nfrom src.email_service import enviar_email_boas_vindas\n\ndef test_enviar_email_ao_criar_usuario():\n    # Substitui o envio real de email por mock\n    with patch('src.email_service.smtp.sendmail') as mock_send:\n        mock_send.return_value = True\n        \n        resultado = enviar_email_boas_vindas('ana@email.com')\n        \n        # Verifica que foi chamado com os parâmetros corretos\n        mock_send.assert_called_once()\n        args = mock_send.call_args[0]\n        assert 'ana@email.com' in str(args)\n        assert resultado is True",
    tip: "Quando seu código é difícil de mockar (muitas dependências ocultas), isso é sinal de que o design está ruim. Código bem testável naturalmente tem injeção de dependências — você passa as dependências como parâmetros.",
  },

  "f2-10": {
    what: "**Código síncrono**: cada operação espera a anterior terminar antes de começar. **Código assíncrono**: operações de I/O (rede, disco) não bloqueiam — enquanto espera resposta, o programa faz outras coisas. **Blocking I/O**: a thread fica parada esperando. **Non-blocking I/O**: a thread registra uma callback e continua executando.",
    why: "Um servidor web síncrono atendendo 1000 usuários simultâneos precisaria de 1000 threads. Threads são caras. Código assíncrono permite que uma thread única atenda milhares de conexões — é como Node.js e Python/FastAPI escalam.",
    how: "Analogia: fazer café síncrono = colocar água, ficar olhando ferver, depois colocar o pó. Fazer café assíncrono = colocar água, ir fazer outra coisa, voltar quando apitar. I/O (rede, disco) é o 'apitar'.",
    example: "# Síncrono (blocking) — LENTO para I/O:\nimport requests\nimport time\n\nstart = time.time()\nurls = ['https://api1.com', 'https://api2.com', 'https://api3.com']\nfor url in urls:\n    response = requests.get(url)  # bloqueia até responder\nprint(f'{time.time() - start:.1f}s')  # ~3s (sequencial)\n\n# Assíncrono (non-blocking) — RÁPIDO:\nimport asyncio\nimport httpx\n\nasync def fetch_all(urls):\n    async with httpx.AsyncClient() as client:\n        tasks = [client.get(url) for url in urls]\n        results = await asyncio.gather(*tasks)  # paralelo!\n    return results\n# ~1s (todas as requisições ao mesmo tempo)",
    tip: "Use código assíncrono quando seu programa passa muito tempo esperando I/O (chamadas de rede, leitura de arquivos, banco de dados). Para cálculos intensivos de CPU, assíncrono não ajuda — use multiprocessing.",
  },

  "f2-11": {
    what: "asyncio é a biblioteca de programação assíncrona do Python. **coroutine** é uma função definida com `async def` que pode ser pausada com `await`. **event loop** é o loop central que gerencia quais coroutines rodam. `await` pausa a coroutine atual e cede controle ao event loop, que pode rodar outra coroutine enquanto espera.",
    why: "FastAPI, o framework Python mais moderno, é totalmente assíncrono. Entender asyncio é obrigatório para usar FastAPI corretamente e para qualquer código Python de alta performance com I/O.",
    how: "`async def` define uma coroutine. Só pode usar `await` dentro de `async def`. `asyncio.run()` roda a coroutine principal. `asyncio.gather()` roda múltiplas coroutines em paralelo.",
    example: "import asyncio\nimport httpx\n\nasync def buscar_usuario(client: httpx.AsyncClient, user_id: int):\n    response = await client.get(f'https://api.com/users/{user_id}')\n    return response.json()\n\nasync def main():\n    async with httpx.AsyncClient() as client:\n        # Busca 5 usuários em paralelo:\n        usuarios = await asyncio.gather(\n            *[buscar_usuario(client, i) for i in range(1, 6)]\n        )\n        print(f'Encontrados: {len(usuarios)} usuários')\n\nasyncio.run(main())",
    tip: "Cuidado: misturar código síncrono bloqueante dentro de async def trava o event loop inteiro. Use `asyncio.to_thread()` para rodar funções síncronas bloqueantes sem travar. Bibliotecas async: httpx (não requests), asyncpg (não psycopg2).",
  },

  "f2-12": {
    what: "JavaScript é single-threaded mas usa o **event loop** para lidar com operações assíncronas. **Promise** representa um valor que estará disponível no futuro (pendente, resolvido ou rejeitado). **async/await** é sintaxe que torna Promises legíveis como código síncrono. `await` pausa a execução da função async até a Promise resolver.",
    why: "JavaScript moderno é quase inteiramente baseado em async/await. Toda operação de I/O em Node.js (banco, arquivo, rede) retorna Promise. Não entender isso leva a callback hell, race conditions e bugs difíceis de debugar.",
    how: "`.then()` e `.catch()` são a API de Promises. `async/await` é syntax sugar por cima. Sempre use `try/catch` com await. `Promise.all()` executa várias Promises em paralelo.",
    example: "// Promises (forma antiga mas importante entender):\nfetch('https://api.github.com/users/torvalds')\n  .then(response => response.json())\n  .then(data => console.log(data.name))\n  .catch(error => console.error('Erro:', error));\n\n// async/await (forma moderna, prefira sempre):\nasync function buscarUsuario(username: string) {\n  try {\n    const response = await fetch(`https://api.github.com/users/${username}`);\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Erro ao buscar usuário:', error);\n    throw error;  // relança para o chamador tratar\n  }\n}",
    tip: "Nunca esqueça de `await` uma Promise — sem await, você tem o objeto Promise, não o valor. Erro comum: `const dados = fetch(url)` (errado) vs `const dados = await fetch(url)` (certo).",
  },

  "f2-13": {
    what: "HTTP (HyperText Transfer Protocol) é o protocolo que define como clientes e servidores se comunicam na web. Cada comunicação tem um **request** (pedido do cliente) e um **response** (resposta do servidor). O request tem: método (GET/POST...), URL, headers (metadados), e opcionalmente body (dados). O response tem: status code, headers, e body.",
    why: "HTTP é a base da web moderna. APIs REST, GraphQL, WebSockets — tudo começa aqui. Entender HTTP é entender como a internet funciona de verdade, não só na superfície.",
    how: "Status codes por família: 2xx = sucesso (200 OK, 201 Created, 204 No Content), 3xx = redirecionamento, 4xx = erro do cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found), 5xx = erro do servidor (500 Internal Server Error, 503 Service Unavailable).",
    example: "# Anatomia de um request HTTP:\n# GET /api/users/42 HTTP/1.1\n# Host: api.meusite.com\n# Authorization: Bearer eyJhbG...\n# Content-Type: application/json\n\n# Resposta:\n# HTTP/1.1 200 OK\n# Content-Type: application/json\n# {\n#   'id': 42,\n#   'nome': 'Ana',\n#   'email': 'ana@email.com'\n# }\n\n# Status codes que você vai usar todo dia:\n# 200 OK — sucesso genérico\n# 201 Created — recurso criado com sucesso\n# 400 Bad Request — dados inválidos enviados\n# 401 Unauthorized — não autenticado\n# 403 Forbidden — autenticado mas sem permissão\n# 404 Not Found — recurso não existe\n# 422 Unprocessable Entity — validação falhou\n# 500 Internal Server Error — bug no servidor",
    tip: "Use http.cat para memorizar status codes de forma divertida. Nunca retorne 200 com mensagem de erro no body — use o status code correto. Isso quebra todo cliente que depende do status.",
  },

  "f2-14": {
    what: "Os verbos HTTP (métodos) definem a intenção da operação. **GET**: buscar dados (sem body, idempotente — chamar 10x tem mesmo efeito que 1x). **POST**: criar recurso (com body, não idempotente). **PUT**: substituir recurso completo. **PATCH**: atualizar parcialmente. **DELETE**: remover. **Idempotência**: chamar múltiplas vezes tem o mesmo efeito que chamar uma vez.",
    why: "Usar o verbo errado não é só estético — quebra cache HTTP, viola contratos de API, confunde clientes. GET cacheável, POST não é. DELETE com body é considerado má prática.",
    how: "Regra REST: `GET /usuarios` (listar), `GET /usuarios/42` (buscar um), `POST /usuarios` (criar), `PUT /usuarios/42` (substituir), `PATCH /usuarios/42` (atualizar campos), `DELETE /usuarios/42` (deletar).",
    example: "# API REST bem estruturada:\n\n# GET /api/posts          → lista todos os posts\n# GET /api/posts/123      → busca post #123\n# POST /api/posts         → cria novo post\n# PUT /api/posts/123      → substitui post #123 completamente\n# PATCH /api/posts/123    → atualiza só titulo do post #123\n# DELETE /api/posts/123   → deleta post #123\n\n# PATCH request body (parcial):\n# { 'titulo': 'Novo título' }  ← só o que muda\n\n# PUT request body (completo):\n# { 'titulo': '...', 'conteudo': '...', 'autor': '...' }",
    tip: "POST para ações que não são CRUD: `POST /api/usuarios/42/ativar`, `POST /api/pagamentos/123/estornar`. Para operações que não cabem em GET/POST/PUT/PATCH/DELETE, use POST com nome de ação na URL.",
  },

  "f2-15": {
    what: "JSON (JavaScript Object Notation) é o formato de troca de dados mais usado na web. É texto puro, legível por humanos, e suportado nativamente por todos os browsers e a maioria das linguagens. Estrutura: objetos `{}`, arrays `[]`, strings `''`, números, booleanos e null.",
    why: "Praticamente toda API moderna usa JSON. Saber serializar (Python → JSON) e desserializar (JSON → Python) é tão básico quanto saber ler e escrever arquivos.",
    how: "Python: `json.dumps()` converte dict para string JSON. `json.loads()` converte string JSON para dict. `json.dump()` escreve em arquivo. `json.load()` lê de arquivo. Cuidado: JSON só aceita strings como chaves (não números).",
    example: "import json\n\n# Python dict → JSON string:\nusuario = {'nome': 'Ana', 'idade': 25, 'ativo': True, 'tags': ['admin']}\njson_str = json.dumps(usuario, ensure_ascii=False, indent=2)\nprint(json_str)\n# {\n#   'nome': 'Ana',\n#   'idade': 25,\n#   'ativo': true,\n#   'tags': ['admin']\n# }\n\n# JSON string → Python dict:\ndados = json.loads(json_str)\nprint(dados['nome'])  # 'Ana'\n\n# Lendo/escrevendo arquivo:\nwith open('config.json', 'w') as f:\n    json.dump(usuario, f, indent=2, ensure_ascii=False)\n\nwith open('config.json', 'r') as f:\n    config = json.load(f)",
    tip: "Use `ensure_ascii=False` ao serializar para preservar caracteres especiais (acentos). `indent=2` torna o JSON legível por humanos. Para datas, JSON não tem tipo Date — serialize como string ISO 8601: `'2024-01-15T10:30:00Z'`.",
  },

  "f2-16": {
    what: "**requests** é a biblioteca Python para fazer requisições HTTP. **httpx** é a alternativa moderna com suporte a async. **fetch** é a API nativa do browser para HTTP. Conceitos importantes: **headers** (metadados — Content-Type, Authorization), **timeout** (tempo máximo de espera), **retry** (tentar novamente em falha).",
    why: "Consumir APIs externas é parte do dia a dia — autenticação OAuth, pagamentos, envio de email, notificações push. Saber lidar com erros, timeouts e autenticação é essencial.",
    how: "Sempre configure timeout — sem isso, seu código pode travar indefinidamente. Verifique `response.ok` ou `response.raise_for_status()`. Parse o body com `.json()`. Para auth Bearer: `headers={'Authorization': f'Bearer {token}'}`.",
    example: "import requests\n\n# GET básico com tratamento de erro:\ndef buscar_repo_github(usuario: str, repo: str) -> dict:\n    url = f'https://api.github.com/repos/{usuario}/{repo}'\n    headers = {\n        'Accept': 'application/vnd.github.v3+json',\n        'Authorization': f'Bearer {GITHUB_TOKEN}',\n    }\n    \n    response = requests.get(url, headers=headers, timeout=10)\n    response.raise_for_status()  # lança exceção se 4xx/5xx\n    return response.json()\n\n# POST com body JSON:\ndef criar_issue(titulo: str, corpo: str) -> dict:\n    response = requests.post(\n        'https://api.github.com/repos/user/repo/issues',\n        headers={'Authorization': f'Bearer {TOKEN}'},\n        json={'title': titulo, 'body': corpo},  # json= serializa e seta Content-Type\n        timeout=10\n    )\n    response.raise_for_status()\n    return response.json()",
    tip: "Use `response.raise_for_status()` sempre — ele lança `requests.HTTPError` para status 4xx e 5xx automaticamente. Sem isso você pode achar que a chamada funcionou quando na verdade retornou 404.",
  },

  "f2-17": {
    what: "Postman e Insomnia são ferramentas GUI para fazer e testar requisições HTTP sem precisar escrever código. Você configura URL, método, headers, body e visualiza a resposta formatada. Permitem salvar coleções de requests, criar variáveis de ambiente (para tokens, URLs base), e gerar documentação automática.",
    why: "Antes de integrar uma API no código, você precisa entendê-la. Testar manualmente no Postman é 10x mais rápido que debugar via código. Também é essencial para testar sua própria API durante o desenvolvimento.",
    how: "Postman tem workspaces, collections e environments. Thunder Client (extensão do VSCode) faz o mesmo sem sair do editor. Para APIs com auth JWT: configure o token em 'Authorization → Bearer Token' e o Postman envia o header automaticamente.",
    example: "# Exemplo de request no Postman:\n# Method: POST\n# URL: http://localhost:8000/api/auth/login\n# Headers:\n#   Content-Type: application/json\n# Body (raw JSON):\n# {\n#   'email': 'admin@email.com',\n#   'senha': 'minhasenha'\n# }\n#\n# Resposta esperada (200 OK):\n# {\n#   'token': 'eyJhbG...',\n#   'usuario': { 'id': 1, 'nome': 'Admin' }\n# }\n\n# Depois, use o token em requests autenticados:\n# Authorization: Bearer eyJhbG...",
    tip: "Configure 'Environments' no Postman: `dev` com `base_url=http://localhost:8000` e `prod` com URL de produção. Armazene tokens como variáveis de ambiente e referencie com `{{token}}`. Facilita testar em diferentes ambientes.",
  },

  // ═══════════════════════════════════════════════
  // FASE 3 — TYPESCRIPT & WEB
  // ═══════════════════════════════════════════════

  "f3-1": {
    what: "JavaScript é a única linguagem nativa dos browsers. **var** tem escopo de função e hoisting (problemático). **let** tem escopo de bloco (use para variáveis). **const** é imutável por referência (use para tudo mais). Arrow functions (`=>`) herdam `this` do contexto pai. Destructuring desestrutura arrays e objetos.",
    why: "Você precisa entender JS antes de TypeScript — TS é uma camada sobre JS. Todos os conceitos de JS (closures, prototype, event loop, DOM) existem embaixo do TypeScript.",
    how: "Prefira `const` por padrão, `let` quando precisar reatribuir, nunca `var`. Arrow functions para callbacks. Template literals (backticks) para strings com expressões. Optional chaining `?.` para acessar propriedades que podem ser null.",
    example: "// Prefer const/let, nunca var\nconst nome = 'Ana';  // imutável\nlet contador = 0;    // mutável\n\n// Arrow function\nconst dobrar = (n: number) => n * 2;\nconst soma = (a: number, b: number) => a + b;\n\n// Destructuring\nconst { nome, idade } = usuario;\nconst [primeiro, ...resto] = array;\n\n// Optional chaining — evita TypeError\nconst cidade = usuario?.endereco?.cidade ?? 'Não informado';\n\n// Spread\nconst novoUsuario = { ...usuario, nome: 'Carlos' };\nconst novaLista = [...lista, novoItem];",
    tip: "JavaScript tem coerção de tipo implícita que causa bugs: `'5' + 3 = '53'` mas `'5' - 3 = 2`. Use `===` (comparação estrita) NUNCA `==`. TypeScript elimina a maioria desses problemas — mais um motivo para aprendê-lo.",
  },

  "f3-2": {
    what: "TypeScript adiciona tipagem estática ao JavaScript. **type** define um alias de tipo. **interface** define a forma de um objeto (extensível via declaration merging). Union types (`|`) permitem múltiplos tipos. Literal types restringem a valores específicos. **never** representa tipo impossível. O compilador checa tipos em build time — bugs que seriam descobertos em runtime viram erros de compilação.",
    why: "TypeScript é obrigatório em 90% das empresas hoje. Código TS tem menos bugs, melhor autocomplete, e refatoração segura. Com TS, você sabe exatamente o que uma função aceita e retorna sem ler a implementação.",
    how: "`interface` para objetos que podem ser estendidos. `type` para unions, intersections, e aliases. `as const` torna todos os valores literais. `satisfies` verifica tipo sem perder informação de tipo específico.",
    example: "// Tipos básicos e union:\ntype Status = 'ativo' | 'inativo' | 'pendente';\ntype ID = string | number;\n\n// Interface extensível:\ninterface Usuario {\n  id: number;\n  nome: string;\n  email: string;\n  status: Status;\n}\n\ninterface Admin extends Usuario {\n  permissoes: string[];\n}\n\n// Type com utility types:\ntype UsuarioSemSenha = Omit<Usuario, 'senha'>;\ntype CriarUsuario = Pick<Usuario, 'nome' | 'email'>;\ntype UsuarioParcial = Partial<Usuario>;\n\n// Função tipada:\nfunction buscarUsuario(id: number): Promise<Usuario | null> {\n  return fetch(`/api/users/${id}`).then(r => r.json());\n}",
    tip: "Ative `'strict': true` no tsconfig.json — isso habilita todas as checagens importantes. Sem strict mode, TypeScript é 'molinho' demais. Com strict, você aprende TypeScript de verdade.",
  },

  "f3-3": {
    what: "Generics permitem criar funções, classes e interfaces que funcionam com múltiplos tipos sem perder a informação de tipo. `<T>` é um tipo paramétrico — você substitui T pelo tipo real ao usar. Pense em generics como 'templates' ou 'funções de tipo'. **Constraints** com `extends` restringem o tipo genérico.",
    why: "Sem generics, você teria que escrever `buscarPorId` separado para Usuario, Produto, Pedido... Com generics, uma função serve para todos. São a base de todos os Utility Types (Partial, Required, Pick, Omit).",
    how: "`function identidade<T>(valor: T): T { return valor; }`. O TypeScript infere `T` automaticamente na maioria dos casos. Use `<T extends object>` para aceitar só objetos. `<K extends keyof T>` para aceitar só chaves de T.",
    example: "// Generic simples:\nfunction primeiroDe<T>(lista: T[]): T | undefined {\n  return lista[0];\n}\nconst num = primeiroDe([1, 2, 3]);  // tipo: number | undefined\nconst str = primeiroDe(['a', 'b']); // tipo: string | undefined\n\n// Generic com constraint:\nfunction buscarPorId<T extends { id: number }>(\n  lista: T[],\n  id: number\n): T | undefined {\n  return lista.find(item => item.id === id);\n}\n\n// Utility types usam generics internamente:\ntype Partial<T> = { [K in keyof T]?: T[K] };\ntype Required<T> = { [K in keyof T]-?: T[K] };\ntype Readonly<T> = { readonly [K in keyof T]: T[K] };\ntype Pick<T, K extends keyof T> = { [P in K]: T[P] };",
    tip: "Não force generics onde não precisam. Se a função só trabalha com strings, não use `<T extends string>` — só use `string`. Generics adicionam complexidade — só use quando há genuíno reuso de tipo.",
  },

  "f3-4": {
    what: "tsconfig.json configura o compilador TypeScript. `target` define para qual versão JS compilar (ES2020, ES2022). `module` define o sistema de módulos (ESNext, CommonJS). `strict` habilita todas as checagens rigorosas. `outDir` é onde o JS compilado vai. `rootDir` é onde o TS source fica. `paths` configura aliases de import.",
    why: "Um tsconfig mal configurado resulta em código que compila mas tem comportamentos inesperados. `strict: true` é não-negociável — sem ele você perde metade dos benefícios do TypeScript.",
    how: "Para projetos Node.js: `target: ES2020, module: CommonJS`. Para projetos frontend moderno: `target: ES2020, module: ESNext`. Next.js gera o tsconfig automaticamente. Sempre inclua `strict: true`.",
    example: "// tsconfig.json típico para Node.js/backend:\n{\n  'compilerOptions': {\n    'target': 'ES2020',\n    'module': 'CommonJS',\n    'lib': ['ES2020'],\n    'outDir': './dist',\n    'rootDir': './src',\n    'strict': true,              // Obrigatório!\n    'esModuleInterop': true,     // Compatibilidade de imports\n    'skipLibCheck': true,        // Mais rápido\n    'forceConsistentCasingInFileNames': true,\n    'resolveJsonModule': true,\n    'paths': {\n      '@/*': ['./src/*']         // aliases de import\n    }\n  },\n  'include': ['src/**/*'],\n  'exclude': ['node_modules', 'dist']\n}",
    tip: "Para projetos novos, gere o tsconfig com `npx tsc --init` e depois ative `strict: true`. Se herdar projeto com strict desativado, ative gradualmente — começa pelos arquivos novos.",
  },

  "f3-5": {
    what: "ES Modules é o sistema de módulos padrão do JavaScript moderno. `export` expõe valores de um arquivo. `import` consome de outro. **Named exports** exportam múltiplos valores pelo nome. **Default export** exporta um valor principal. Cada arquivo é um módulo com seu próprio escopo — variáveis não 'vazam' para outros arquivos.",
    why: "Módulos são a base da organização de código. Sem módulos, todo JavaScript global colide. Com módulos, você organiza código em arquivos com responsabilidades claras e importa só o que precisa.",
    how: "Named: `export function soma()` / `import { soma } from './math'`. Default: `export default class App` / `import App from './App'`. Re-export: `export { soma } from './math'`. Barrel: `index.ts` que re-exporta múltiplos módulos.",
    example: "// math.ts — named exports\nexport function soma(a: number, b: number): number {\n  return a + b;\n}\nexport function subtrair(a: number, b: number): number {\n  return a - b;\n}\nexport const PI = 3.14159;\n\n// app.ts — import seletivo (tree-shakeable)\nimport { soma, PI } from './math';\n\n// usuario.ts — default export\nexport default class UsuarioService {\n  buscar(id: number) { ... }\n}\n\n// main.ts — import default\nimport UsuarioService from './usuario';\n\n// index.ts — barrel (re-exporta tudo)\nexport { soma, subtrair } from './math';\nexport { default as UsuarioService } from './usuario';",
    tip: "Prefira named exports a default exports — facilitam refatoração (você renomeia na exportação e o IDE refatora todos os imports automaticamente). Default exports são renomeados livremente na importação, o que pode causar inconsistências.",
  },

  // ═══════════════════════════════════════════════
  // FASE 4 — BACKEND & BANCO
  // ═══════════════════════════════════════════════

  "f4-1": {
    what: "FastAPI é um framework Python moderno para criar APIs. Usa **decoradores** de rotas (`@app.get`, `@app.post`) para mapear URLs a funções. **Path parameters** são partes variáveis da URL (`/users/{id}`). **Query parameters** são filtros na query string (`/users?page=2&limit=10`). O FastAPI gera documentação automática (Swagger UI) em `/docs`.",
    why: "FastAPI é o framework Python mais performático e moderno. Usa Python type hints para validação automática, gera documentação interativa, e é 100% async. É o padrão atual para APIs Python.",
    how: "Instale: `pip install fastapi uvicorn[standard]`. Rode: `uvicorn main:app --reload`. A aplicação fica em `localhost:8000`. Docs automáticas em `localhost:8000/docs`.",
    example: "from fastapi import FastAPI, HTTPException, Query\nfrom pydantic import BaseModel\n\napp = FastAPI(title='Minha API', version='1.0.0')\n\nclass ProdutoInput(BaseModel):\n    nome: str\n    preco: float\n    estoque: int = 0\n\n# Path parameter:\n@app.get('/produtos/{produto_id}')\nasync def buscar_produto(produto_id: int):\n    produto = db.get(produto_id)\n    if not produto:\n        raise HTTPException(status_code=404, detail='Produto não encontrado')\n    return produto\n\n# Query parameters:\n@app.get('/produtos')\nasync def listar_produtos(\n    page: int = Query(1, ge=1),\n    limit: int = Query(10, le=100),\n    busca: str | None = None\n):\n    return db.buscar(page=page, limit=limit, busca=busca)\n\n# POST com body tipado:\n@app.post('/produtos', status_code=201)\nasync def criar_produto(produto: ProdutoInput):\n    return db.criar(produto)",
    tip: "Sempre use HTTPException com status codes corretos — não retorne 200 com `{'erro': 'mensagem'}`. FastAPI tem validação automática de tipos com Pydantic — se o input não bater com o schema, retorna 422 automaticamente.",
  },

  "f4-2": {
    what: "Pydantic é a biblioteca de validação de dados do Python. `BaseModel` define um schema com type hints que são automaticamente validados. Se você enviar `idade='vinte'` onde o tipo é `int`, Pydantic tenta converter e falha com erro claro. `Field()` adiciona metadados e validações customizadas.",
    why: "FastAPI usa Pydantic por baixo — cada modelo que você define para request/response é um modelo Pydantic. Entender Pydantic é entender como FastAPI valida dados. Também é usado para configurações (pydantic-settings).",
    how: "Herda de `BaseModel`. Use `Field(...)` para obrigatório, `Field(default)` para opcional. `@validator` (v1) ou `@field_validator` (v2) para validação customizada. `.model_dump()` converte para dict.",
    example: "from pydantic import BaseModel, Field, field_validator, EmailStr\nfrom datetime import datetime\n\nclass CriarUsuario(BaseModel):\n    nome: str = Field(min_length=2, max_length=100)\n    email: EmailStr  # valida formato de email automaticamente\n    senha: str = Field(min_length=8)\n    idade: int | None = Field(None, ge=0, le=150)\n    \n    @field_validator('nome')\n    @classmethod\n    def nome_sem_numeros(cls, v: str) -> str:\n        if any(c.isdigit() for c in v):\n            raise ValueError('Nome não pode conter números')\n        return v.strip().title()\n\n# FastAPI usa automaticamente:\n# POST /usuarios com body { 'nome': 'Ana', 'email': 'a@b.com', 'senha': '...' }\n# Pydantic valida → FastAPI retorna 422 se inválido",
    tip: "Use Pydantic v2 (versão atual) — é muito mais rápido e tem API melhor. Separe modelos de input (CriarUsuario) de output (UsuarioResponse) — nunca retorne senha na resposta. `UsuarioResponse = Omit<Usuario, 'senha_hash'>`.",
  },

  "f4-5": {
    what: "SQL (Structured Query Language) é a linguagem para interagir com bancos de dados relacionais. **SELECT** busca dados. **INSERT INTO** insere novos registros. **UPDATE** modifica registros existentes. **DELETE** remove registros. **WHERE** filtra resultados. **JOIN** combina dados de múltiplas tabelas baseado em uma relação.",
    why: "Mesmo usando ORM, você precisa entender SQL para debugar queries lentas, entender o que o ORM está gerando, e escrever queries complexas que o ORM não suporta bem.",
    how: "SELECT: `SELECT col1, col2 FROM tabela WHERE condição ORDER BY col LIMIT 10`. INSERT: `INSERT INTO tabela (col1, col2) VALUES (val1, val2)`. UPDATE: `UPDATE tabela SET col=val WHERE id=X`. DELETE: `DELETE FROM tabela WHERE id=X` — SEMPRE use WHERE!",
    example: "-- Busca com filtros, ordenação e paginação:\nSELECT u.id, u.nome, u.email, COUNT(p.id) as total_pedidos\nFROM usuarios u\nLEFT JOIN pedidos p ON p.usuario_id = u.id\nWHERE u.ativo = true\n  AND u.criado_em >= '2024-01-01'\nGROUP BY u.id, u.nome, u.email\nHAVING COUNT(p.id) > 0\nORDER BY total_pedidos DESC\nLIMIT 20 OFFSET 0;\n\n-- INSERT com retorno:\nINSERT INTO usuarios (nome, email, senha_hash)\nVALUES ('Ana', 'ana@email.com', '$2b$12$...')\nRETURNING id, nome, criado_em;\n\n-- UPDATE seguro:\nUPDATE usuarios\nSET nome = 'Ana Silva', atualizado_em = NOW()\nWHERE id = 42\nRETURNING id, nome;",
    tip: "NUNCA faça `DELETE FROM tabela` sem WHERE — isso apaga TUDO. Mesmo cuidado com UPDATE. Em produção, execute SELECTS antes dos DELETEs/UPDATEs para confirmar quais registros serão afetados. Sempre use transações para operações críticas.",
  },

  "f4-10": {
    what: "Docker cria contêineres — ambientes isolados que empacotam o código com todas as suas dependências (runtime, bibliotecas, configurações). Um contêiner roda igual em qualquer máquina. **Imagem** é o template imutável (como uma classe). **Contêiner** é uma instância rodando da imagem (como um objeto). **Dockerfile** define como construir a imagem.",
    why: "'Funciona na minha máquina' deixa de ser problema. Docker garante que dev, staging e produção rodem exatamente o mesmo ambiente. É o padrão de deploy em toda empresa de tecnologia.",
    how: "`docker build -t nome .` constrói imagem do Dockerfile no diretório atual. `docker run -p 8000:8000 nome` roda um contêiner mapeando portas. `docker ps` lista contêineres rodando. `docker logs id` mostra logs.",
    example: "# Dockerfile para FastAPI:\nFROM python:3.12-slim\n\n# Criar usuário não-root (segurança)\nRUN adduser --disabled-password appuser\n\nWORKDIR /app\n\n# Instalar dependências primeiro (cache de layers)\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copiar código\nCOPY . .\n\n# Mudar para usuário não-root\nUSER appuser\n\n# Expor porta e definir comando\nEXPOSE 8000\nCMD ['uvicorn', 'main:app', '--host', '0.0.0.0', '--port', '8000']",
    tip: "Ordene os comandos do Dockerfile do menos ao mais frequentemente alterado — Docker cacheia cada layer. Copie requirements.txt ANTES do código — assim, ao alterar código, o `pip install` ainda fica cacheado.",
  },

  // ═══════════════════════════════════════════════
  // FASE 5 — PORTFÓLIO
  // ═══════════════════════════════════════════════

  "f5-1": {
    what: "O README do perfil do GitHub aparece na sua página pública quando você cria um repositório com o mesmo nome do seu usuário. É seu cartão de visitas para recrutadores e outros devs. Um bom README de perfil tem: foto/avatar, bio técnica, tecnologias em que trabalha, projetos em destaque, e possivelmente stats do GitHub.",
    why: "Muitos recrutadores técnicos começam a avaliação pelo GitHub. Um perfil vazio ou sem README passa impressão de descuido. Um perfil bem feito, mesmo de júnior, passa seriedade e interesse.",
    how: "Crie repositório `github.com/seu-usuario/seu-usuario`. O README.md desse repo aparece no seu perfil. Use badges de tecnologia de shields.io. GitHub Stats de github-readme-stats. Pin seus 6 melhores repositórios.",
    example: "# README do perfil — elementos essenciais:\n\n## Olá! Sou [Seu Nome] 👋\n\nDev em formação | Python & TypeScript\n\n### Stack principal:\n🐍 Python · 📘 TypeScript · ⚡ FastAPI · ⚛️ React\n\n### Projetos em destaque:\n- [API de Tarefas](link) — FastAPI + PostgreSQL + Docker\n- [App de Notas](link) — React + TypeScript + Vite\n\n### Aprendendo atualmente:\n- 🔐 Segurança em APIs\n- 🐳 Kubernetes básico\n\n![GitHub Stats](https://github-readme-stats.vercel.app/api?username=SEU_USER)",
    tip: "Seja honesto sobre seu nível — recrutadores preferem 'Aprendendo FastAPI' a 'Especialista FastAPI' quando não é verdade. Contribuições verdes consistentes > um projeto perfeito feito há 6 meses sem mais nada.",
  },

  "f5-6": {
    what: "Entrevistas técnicas para júnior geralmente têm: problemas de algoritmos (LeetCode), coding challenge (implementar feature em tempo real), revisão de código existente, e perguntas conceituais. LeetCode easy-medium é o nível esperado para júnior. Você não precisa resolver todos — precisa resolver com raciocínio claro e código limpo.",
    why: "Coding interviews são uma habilidade separada de ser bom programador. Você pode ser excelente dev e ir mal sem prática específica. 50 problemas fáceis bem resolvidos > 500 problemas decorados.",
    how: "Categorias prioritárias: arrays/strings (30% das perguntas), hash maps (20%), linked lists (10%), trees (10%), sorting (10%). Pratique EXPLICAR seu raciocínio em voz alta enquanto resolve — é como a entrevista funciona.",
    example: "# Abordagem para entrevistas:\n# 1. Leia o problema com calma (não code imediatamente)\n# 2. Pergunte sobre edge cases: array vazio? Números negativos?\n# 3. Explique sua abordagem antes de codar\n# 4. Comece com solução ingênua (O(n²))\n# 5. Otimize (hash map pode transformar em O(n))\n# 6. Teste com exemplos do enunciado + edge cases\n\n# Two Sum (problema clássico):\ndef two_sum(nums: list[int], target: int) -> list[int]:\n    seen = {}  # {valor: índice}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:  # O(1) com hash map\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
    tip: "No LeetCode, foque em entender o PADRÃO, não decorar a solução. Dois Ponteiros, Sliding Window, Hash Map, BFS/DFS, Backtracking — são ~10 padrões que resolvem 80% dos problemas.",
  },

  "f5-10": {
    what: "Clean Code é o conjunto de práticas que tornam código legível, manutenível e extensível. A regra mais importante: **nomes revelam intenção**. Um nome bom elimina a necessidade de comentário. `calcularDescontoParaClienteVip(preco)` não precisa de comentário. `calc(p)` precisaria de parágrafo.",
    why: "Você lê código muito mais do que escreve. Código que outros (ou você mesmo em 6 meses) não consegue entender não tem valor — tem custo. Empresas perdem tempo e dinheiro com código difícil de manter.",
    how: "Variáveis: substantivos descritivos. Funções: verbos que descrevem ação. Classes: substantivos. Evite abreviações exceto as universais (id, url, dto). Booleanos: `is_active`, `has_permission`, `can_delete`.",
    example: "# ❌ Código ruim:\ndef proc(d, f=0.1):\n    r = d['p'] * (1 - f)\n    if d['t'] == 'vip':\n        r = r * 0.9\n    return r\n\n# ✅ Código limpo:\nVIP_DISCOUNT = 0.10\nDEFAULT_DISCOUNT = 0.10\n\ndef calcular_preco_final(\n    produto: dict,\n    desconto_base: float = DEFAULT_DISCOUNT\n) -> float:\n    preco_com_desconto = produto['preco'] * (1 - desconto_base)\n    \n    cliente_e_vip = produto.get('tipo_cliente') == 'vip'\n    if cliente_e_vip:\n        preco_com_desconto *= (1 - VIP_DISCOUNT)\n    \n    return preco_com_desconto",
    tip: "Se você sentiu necessidade de escrever um comentário explicando O QUE o código faz, renomeie as variáveis até o comentário ser desnecessário. Comentários bons explicam O PORQUÊ — decisões de negócio, workarounds, algoritmos não-óbvios.",
  },

  // ═══════════════════════════════════════════════
  // FASE 3 — restantes (Node, HTML/CSS, React)
  // ═══════════════════════════════════════════════

  "f3-6": {
    what: "Node.js é um runtime que executa JavaScript fora do browser, usando o motor V8 do Chrome. O ponto central é o **event loop**: Node roda em uma única thread, mas delega operações de I/O (rede, disco) ao sistema operacional e continua processando outras coisas. Quando o I/O termina, o callback é colocado na fila e executado.",
    why: "Entender o event loop explica por que Node.js consegue atender milhares de conexões simultâneas com uma única thread. Também explica por que código bloqueante (como loops pesados de CPU) trava tudo — porque bloqueia essa thread única.",
    how: "O event loop tem fases: timers (setTimeout/setInterval), I/O callbacks, idle/prepare, poll (aguarda I/O), check (setImmediate), close callbacks. `process.nextTick()` executa antes da próxima fase. Microtasks (Promises) executam entre cada fase.",
    example: "// Exemplo de não-bloqueante vs bloqueante:\nconst fs = require('fs');\n\n// ✅ Não-bloqueante — não trava o event loop:\nfs.readFile('arquivo.txt', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\nconsole.log('Isso executa ANTES de ler o arquivo!');\n\n// ✅ Versão moderna com promises:\nconst { readFile } = require('fs/promises');\nasync function ler() {\n  const data = await readFile('arquivo.txt', 'utf8');\n  console.log(data);\n}",
    tip: "Node.js NÃO é bom para tarefas de CPU intensiva (machine learning, processamento de imagem pesado). Para isso, use Python ou workers. Node brilha em I/O: servidores web, APIs, proxies, real-time com WebSockets.",
  },

  "f3-7": {
    what: "npm (Node Package Manager) é o gerenciador de pacotes do Node.js e o maior registry de pacotes open-source do mundo. `package.json` é o manifesto do projeto — lista nome, versão, scripts e dependências. `dependencies` são pacotes necessários em produção. `devDependencies` são só para desenvolvimento (TypeScript, ESLint, Jest). `package-lock.json` trava as versões exatas instaladas.",
    why: "Gerenciar dependências é uma das habilidades mais práticas do dia a dia. Saber a diferença entre `--save` e `--save-dev`, entender semantic versioning (`^`, `~`), e saber ler o package.json é essencial em qualquer projeto JS/TS.",
    how: "`npm install pacote` instala e salva em dependencies. `npm install pacote --save-dev` salva em devDependencies. `npm run script` executa scripts do package.json. `npm update` atualiza pacotes dentro das restrições de versão.",
    example: '// package.json típico:\n{\n  "name": "meu-projeto",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "ts-node src/index.ts",\n    "build": "tsc",\n    "start": "node dist/index.js",\n    "test": "jest",\n    "lint": "eslint src/**/*.ts"\n  },\n  "dependencies": {\n    "express": "^4.18.0",\n    "prisma": "^5.0.0"\n  },\n  "devDependencies": {\n    "typescript": "^5.0.0",\n    "@types/express": "^4.17.0",\n    "jest": "^29.0.0"\n  }\n}',
    tip: "Use pnpm em vez de npm — é mais rápido, economiza espaço em disco (symlinks em vez de copiar pacotes) e tem melhor resolução de dependências. Instale: `npm install -g pnpm`. Depois use `pnpm install` no lugar de `npm install`.",
  },

  "f3-8": {
    what: "Node.js tem módulos built-in (nativos) que não precisam de instalação: `fs` para sistema de arquivos, `path` para manipular caminhos de forma cross-platform, `http`/`https` para servidor HTTP básico, `os` para informações do sistema, `crypto` para operações criptográficas, `stream` para processar dados em fluxo.",
    why: "Antes de usar Express ou Fastify, entender o módulo `http` nativo te faz compreender o que esses frameworks fazem por baixo. Também é importante quando você quer fazer algo simples sem adicionar dependência.",
    how: "`require('fs')` em CommonJS ou `import { readFile } from 'fs/promises'` em ESM. `path.join()` une partes de caminho corretamente em qualquer SO. `path.resolve()` retorna caminho absoluto. `__dirname` é o diretório do arquivo atual.",
    example: "import { readFile, writeFile } from 'fs/promises';\nimport path from 'path';\nimport { createServer } from 'http';\n\n// path.join garante separadores corretos no Windows/Mac/Linux:\nconst configPath = path.join(__dirname, '..', 'config', 'app.json');\nconst config = JSON.parse(await readFile(configPath, 'utf-8'));\n\n// Servidor HTTP nativo (sem Express):\nconst server = createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ message: 'Hello World' }));\n});\nserver.listen(3000, () => console.log('Servidor na porta 3000'));",
    tip: "Sempre use `path.join()` ou `path.resolve()` para montar caminhos de arquivo — nunca concatene strings com `/` ou `\\`. O código vai quebrar no Windows se você usar `/` hardcoded.",
  },

  "f3-9": {
    what: "Criar um servidor HTTP sem frameworks mostra exatamente o que acontece por baixo do Express. O módulo `http` do Node recebe um callback com `req` (IncomingMessage — o pedido) e `res` (ServerResponse — a resposta). Você lê a URL, método e body do req, processa, e escreve a resposta no res.",
    why: "Express, Fastify e Koa são abstrações sobre o `http` nativo. Entender o nativo te dá base para debugar problemas, entender performance, e não ser refém de framework. Em lambdas e serverless, às vezes você trabalha direto no nível baixo.",
    how: "`req.url` tem o caminho. `req.method` tem o verbo HTTP. Body é um stream — precisa ser lido com eventos `data` e `end`. `res.writeHead(statusCode, headers)` define status e headers. `res.end(body)` envia a resposta.",
    example: "import { createServer, IncomingMessage, ServerResponse } from 'http';\n\nasync function lerBody(req: IncomingMessage): Promise<string> {\n  return new Promise((resolve) => {\n    let body = '';\n    req.on('data', chunk => body += chunk);\n    req.on('end', () => resolve(body));\n  });\n}\n\nconst server = createServer(async (req, res) => {\n  const { url, method } = req;\n\n  if (method === 'GET' && url === '/ping') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ pong: true }));\n    return;\n  }\n\n  res.writeHead(404);\n  res.end('Not Found');\n});\n\nserver.listen(3000);",
    tip: "Depois de fazer isso uma vez manualmente, você vai entender imediatamente por que Express existe. Frameworks eliminam esse boilerplate repetitivo e adicionam roteamento, middleware e tratamento de erros.",
  },

  "f3-10": {
    what: "HTML semântico significa usar a tag certa para o conteúdo certo — não apenas `<div>` para tudo. Tags semânticas: `<header>` (cabeçalho), `<nav>` (navegação), `<main>` (conteúdo principal), `<section>` (seção temática), `<article>` (conteúdo independente), `<aside>` (conteúdo lateral), `<footer>` (rodapé). Cada tag comunica o papel daquele bloco.",
    why: "Semântica melhora SEO (Google entende melhor a página), acessibilidade (leitores de tela navegam por landmarks semânticos), e manutenibilidade (outros devs entendem a estrutura). `<div>` não tem significado — use só quando não há tag semântica adequada.",
    how: "Estrutura básica de página: `<header>` com logo e nav, `<main>` com o conteúdo principal, `<footer>` com links e copyright. Dentro do main: `<section>` para agrupamentos temáticos, `<article>` para conteúdo standalone (posts, cards).",
    example: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Meu Site</title>\n</head>\n<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/sobre">Sobre</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id="hero">\n      <h1>Título principal</h1>\n      <p>Descrição do site.</p>\n    </section>\n\n    <section id="posts">\n      <article>\n        <h2>Post 1</h2>\n        <p>Conteúdo...</p>\n      </article>\n    </section>\n  </main>\n\n  <footer>\n    <p>&copy; 2025 Meu Site</p>\n  </footer>\n</body>\n</html>',
    tip: "Use apenas UM `<h1>` por página — é o título principal. A hierarquia `h1 → h2 → h3` deve ser lógica, não pulada. Imagens sempre com `alt` descritivo. Botões que fazem ação: `<button>`. Links que navegam: `<a href>`. Nunca use `<div onclick>` onde deveria ser `<button>`.",
  },

  "f3-11": {
    what: "CSS Box Model define que todo elemento é uma caixa com: **content** (conteúdo), **padding** (espaço interno), **border** (borda) e **margin** (espaço externo). **Flexbox** é para layout em uma dimensão (linha ou coluna) — perfeito para alinhar itens. **CSS Grid** é para layout em duas dimensões (linhas E colunas) — perfeito para páginas inteiras.",
    why: "Flexbox e Grid resolvem 95% dos problemas de layout. Antes deles, devs usavam floats e position hacks que eram frágeis e difíceis. Entender Box Model explica por que elementos têm tamanhos inesperados.",
    how: "Flexbox: `display: flex` no container. `justify-content` alinha no eixo principal. `align-items` alinha no eixo cruzado. `gap` define espaçamento. Grid: `display: grid; grid-template-columns: repeat(3, 1fr)` cria 3 colunas iguais.",
    example: "/* Flexbox — barra de navegação */\n.navbar {\n  display: flex;\n  justify-content: space-between; /* logo à esq, links à dir */\n  align-items: center;            /* centraliza verticalmente */\n  padding: 0 24px;\n  gap: 16px;\n}\n\n/* Grid — layout de cards */\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n/* Box model — box-sizing: border-box é essencial */\n*, *::before, *::after {\n  box-sizing: border-box; /* padding e border incluídos no width */\n}\n\n.card {\n  width: 300px;\n  padding: 24px;  /* NÃO expande pra 348px com border-box */\n  border: 1px solid #ddd;\n  border-radius: 8px;\n}",
    tip: "Adicione `box-sizing: border-box` globalmente sempre — sem isso, padding e border expandem o elemento além do width declarado, causando layouts quebrados. Use Flexbox para componentes (navbar, cards, forms) e Grid para o layout da página inteira.",
  },

  "f3-12": {
    what: "Design responsivo significa que o layout se adapta a diferentes tamanhos de tela. **Media queries** aplicam CSS condicionalmente baseado na largura da viewport. **Mobile-first** é a abordagem onde você estiliza mobile primeiro e usa `min-width` para adicionar estilos conforme a tela cresce — é mais fácil e mais performático.",
    why: "Mais de 60% do tráfego web é mobile. Um site que não funciona no celular perde a maioria dos usuários. Em entrevistas técnicas, responsividade básica é esperada em qualquer frontend.",
    how: "Breakpoints comuns: `640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl). Com Tailwind: prefixos `sm:`, `md:`, `lg:`. Com CSS puro: `@media (min-width: 768px) { ... }`. A meta tag viewport é obrigatória: `<meta name='viewport' content='width=device-width, initial-scale=1'>`.",
    example: "/* Mobile first — começa com mobile, adiciona para telas maiores */\n.container {\n  padding: 16px;          /* mobile */\n  display: flex;\n  flex-direction: column;  /* coluna no mobile */\n  gap: 16px;\n}\n\n@media (min-width: 768px) {\n  .container {\n    padding: 32px;          /* tablet+ */\n    flex-direction: row;    /* linha no tablet */\n  }\n}\n\n@media (min-width: 1280px) {\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;         /* centraliza no desktop */\n  }\n}\n\n/* Tailwind equivalente: */\n/* className=\"flex flex-col md:flex-row gap-4 p-4 md:p-8\" */",
    tip: "Use `max-width` com `margin: 0 auto` para limitar a largura do conteúdo em telas grandes — texto com 100% de largura em monitor 4K é ilegível. Boas práticas: `max-width: 1200px` para containers principais, `max-width: 65ch` para parágrafos de texto.",
  },

  "f3-13": {
    what: "JSX (JavaScript XML) é a extensão de sintaxe do React que permite escrever HTML dentro do JavaScript. TSX é o mesmo para TypeScript. O compilador transforma JSX em chamadas `React.createElement()`. Expressões JavaScript ficam entre `{}`. Condicional: `{condicao && <Componente />}` ou ternário `{condicao ? <A /> : <B />}`. Listas: `.map()` com `key` obrigatório.",
    why: "JSX parece estranho no início mas é poderoso — você tem todo o poder do JavaScript para gerar UI dinamicamente. A alternativa (templates HTML separados) é menos flexível e mais verbosa.",
    how: "Diferenças do HTML: `class` vira `className`, `for` vira `htmlFor`, eventos em camelCase (`onClick`, `onChange`), estilos inline como objeto (`style={{ color: 'red' }}`). Todo JSX retorna um único elemento raiz — use `<>...</>` (Fragment) quando precisar de múltiplos elementos sem wrapper.",
    example: "// TSX básico:\ninterface CardProps {\n  titulo: string;\n  descricao: string;\n  ativo?: boolean;\n}\n\nfunction Card({ titulo, descricao, ativo = true }: CardProps) {\n  return (\n    <div className={`card ${ativo ? 'card--ativo' : 'card--inativo'}`}>\n      <h2>{titulo}</h2>\n      <p>{descricao}</p>\n      {ativo && <span className=\"badge\">Ativo</span>}\n    </div>\n  );\n}\n\n// Renderizando lista:\nconst itens = ['Python', 'TypeScript', 'React'];\nfunction Lista() {\n  return (\n    <ul>\n      {itens.map((item) => (\n        <li key={item}>{item}</li>  // key obrigatório!\n      ))}\n    </ul>\n  );\n}",
    tip: "A prop `key` em listas deve ser única e ESTÁVEL — não use o índice do array como key quando a lista pode ser reordenada ou filtrada. Use IDs dos dados. Key incorreta causa bugs de renderização difíceis de debugar.",
  },

  "f3-14": {
    what: "Componentes funcionais são funções JavaScript/TypeScript que recebem `props` e retornam JSX. Props (properties) são os dados passados de componente pai para filho — como argumentos de função. Em TypeScript, você define uma interface para tipar as props. Componentes devem ser **puros**: dado o mesmo input (props), sempre retornam o mesmo output.",
    why: "Componentização é o superpoder do React. Você cria blocos reutilizáveis e combina para formar interfaces complexas. Um `Button` bem feito pode ser usado em 50 lugares do app com variações via props.",
    how: "Convenção: nome começa com letra maiúscula (`Button`, não `button`). Props são somente leitura — nunca modifique props diretamente. Para comunicação filho→pai, passe funções como props (callbacks). `children` é uma prop especial que representa o conteúdo entre tags.",
    example: "// Componente com props tipadas:\ninterface ButtonProps {\n  label: string;\n  variant?: 'primary' | 'secondary' | 'danger';\n  disabled?: boolean;\n  onClick: () => void;  // callback para o pai\n  children?: React.ReactNode;\n}\n\nfunction Button({\n  label, variant = 'primary', disabled = false, onClick, children\n}: ButtonProps) {\n  const classes = {\n    primary: 'bg-blue-600 text-white',\n    secondary: 'bg-gray-200 text-gray-800',\n    danger: 'bg-red-600 text-white',\n  };\n\n  return (\n    <button\n      className={`px-4 py-2 rounded ${classes[variant]}`}\n      disabled={disabled}\n      onClick={onClick}\n    >\n      {children ?? label}\n    </button>\n  );\n}\n\n// Uso:\n<Button label=\"Salvar\" onClick={() => salvar()} />\n<Button variant=\"danger\" onClick={deletar}>Deletar conta</Button>",
    tip: "Mantenha componentes pequenos e focados. Um componente com mais de 100 linhas provavelmente está fazendo coisas demais — quebre em sub-componentes. Regra: se você precisou dar scroll para ver o return(), o componente é grande demais.",
  },

  "f3-15": {
    what: "`useState` gerencia estado local do componente — dados que mudam ao longo do tempo e disparam re-renderização. `useEffect` executa efeitos colaterais (chamadas de API, subscriptions, manipulação de DOM) após renderização. O array de dependências controla quando o efeito reexecuta: `[]` = só uma vez, `[valor]` = sempre que `valor` muda, sem array = toda renderização.",
    why: "Estado é o coração de qualquer UI interativa. Sem useState, a tela seria estática. useEffect é onde você sincroniza o componente com o mundo externo (banco de dados, APIs, localStorage). São os hooks mais usados do React.",
    how: "`const [estado, setEstado] = useState(valorInicial)` — desestruturação de array. Nunca modifique estado diretamente (`estado.push(item)` — errado). Sempre use o setter (`setEstado([...estado, item])`). useEffect retorna uma função de cleanup opcional.",
    example: "import { useState, useEffect } from 'react';\n\nfunction BuscaUsuario({ userId }: { userId: number }) {\n  const [usuario, setUsuario] = useState<Usuario | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [erro, setErro] = useState<string | null>(null);\n\n  useEffect(() => {\n    // Roda quando userId muda:\n    let cancelado = false;  // evita atualizar estado após unmount\n\n    async function buscar() {\n      setLoading(true);\n      setErro(null);\n      try {\n        const res = await fetch(`/api/users/${userId}`);\n        if (!res.ok) throw new Error('Usuário não encontrado');\n        const data = await res.json();\n        if (!cancelado) setUsuario(data);\n      } catch (e) {\n        if (!cancelado) setErro(String(e));\n      } finally {\n        if (!cancelado) setLoading(false);\n      }\n    }\n\n    buscar();\n    return () => { cancelado = true; };  // cleanup\n  }, [userId]);  // re-executa quando userId muda\n\n  if (loading) return <p>Carregando...</p>;\n  if (erro) return <p>Erro: {erro}</p>;\n  return <p>{usuario?.nome}</p>;\n}",
    tip: "O erro mais comum com useEffect é esquecer dependências no array — isso causa bugs onde o efeito usa valores desatualizados. Instale o ESLint plugin `eslint-plugin-react-hooks` — ele detecta dependências faltando automaticamente.",
  },

  "f3-16": {
    what: "Fetching de dados em React envolve: disparar a requisição (geralmente no useEffect ou em um evento), gerenciar estados de loading/erro/sucesso, e atualizar a UI. `fetch` é a API nativa do browser. `axios` é uma biblioteca que adiciona interceptors, timeout automático, e melhor tratamento de erros.",
    why: "Quase todo app React precisa buscar dados de uma API. Gerenciar loading states corretamente é o que separa UIs profissionais de amadores — mostrar um spinner enquanto carrega, e uma mensagem de erro quando falha, é UX básica.",
    how: "Para projetos simples: `fetch` com `useEffect`. Para projetos sérios: use SWR ou TanStack Query — eles adicionam cache, revalidação automática, paginação, e evitam waterfalls de requests.",
    example: "// Hook customizado para fetch reutilizável:\nfunction useApi<T>(url: string) {\n  const [data, setData] = useState<T | null>(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState<Error | null>(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(res => {\n        if (!res.ok) throw new Error(`HTTP ${res.status}`);\n        return res.json();\n      })\n      .then(setData)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Uso:\nfunction ListaPosts() {\n  const { data: posts, loading, error } = useApi<Post[]>('/api/posts');\n\n  if (loading) return <Spinner />;\n  if (error) return <Erro mensagem={error.message} />;\n  return <ul>{posts?.map(p => <li key={p.id}>{p.titulo}</li>)}</ul>;\n}",
    tip: "Para produção, use TanStack Query (antigo React Query) — ele gerencia cache, deduplica requests, refetch em foco de janela, e tem DevTools. É a biblioteca padrão para data fetching em apps React sérios.",
  },

  "f3-17": {
    what: "React Router v6 é a biblioteca de roteamento mais usada no React. Permite criar Single Page Applications (SPA) onde a navegação acontece no cliente sem recarregar a página. `<Routes>` e `<Route>` definem os caminhos. `<Link>` e `<NavLink>` criam links sem reload. `useNavigate` navega programaticamente. `useParams` acessa parâmetros da URL.",
    why: "Sem roteamento, uma SPA tem apenas uma URL — não dá para compartilhar links, o botão voltar não funciona, e o SEO é ruim. React Router resolve todos esses problemas.",
    how: "Envolva o app com `<BrowserRouter>`. Defina rotas com `<Route path='/caminho' element={<Componente />} />`. Use `<Outlet>` para layouts aninhados. `useParams()` retorna `{ id: '42' }` para a rota `/usuarios/:id`.",
    example: "import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to='/'>Home</Link>\n        <Link to='/usuarios'>Usuários</Link>\n      </nav>\n\n      <Routes>\n        <Route path='/' element={<Home />} />\n        <Route path='/usuarios' element={<ListaUsuarios />} />\n        <Route path='/usuarios/:id' element={<DetalheUsuario />} />\n        <Route path='*' element={<PaginaNaoEncontrada />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nfunction DetalheUsuario() {\n  const { id } = useParams();  // { id: '42' } para /usuarios/42\n  const { data: usuario } = useApi(`/api/users/${id}`);\n  return <div>{usuario?.nome}</div>;\n}",
    tip: "Se estiver usando Next.js, você NÃO precisa de React Router — Next tem seu próprio sistema de roteamento baseado em arquivos (App Router). React Router é para SPAs criadas com Vite ou Create React App.",
  },

  // ═══════════════════════════════════════════════
  // FASE 4 — restantes
  // ═══════════════════════════════════════════════

  "f4-3": {
    what: "Dependências em FastAPI (`Depends()`) são funções que são executadas automaticamente antes do handler da rota. Servem para autenticação, validação, acesso ao banco, logging. **Middleware** é código que intercepta todas as requisições antes de chegar nas rotas — perfeito para CORS, logging global, autenticação.",
    why: "Sem injeção de dependências, você repete verificação de autenticação em cada rota. Com `Depends()`, você escreve uma vez e reutiliza. É um dos recursos mais poderosos do FastAPI.",
    how: "`Depends(funcao)` injeta o retorno da função na rota. Dependências podem ter dependências — FastAPI resolve a cadeia automaticamente. `app.add_middleware()` adiciona middleware.",
    example: "from fastapi import FastAPI, Depends, HTTPException, status\nfrom fastapi.middleware.cors import CORSMiddleware\n\napp = FastAPI()\n\n# Middleware CORS — permite frontend de outro domínio:\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=['http://localhost:3000'],\n    allow_methods=['*'],\n    allow_headers=['*'],\n)\n\n# Dependência de autenticação:\nasync def usuario_autenticado(token: str = Depends(oauth2_scheme)):\n    usuario = verificar_token(token)\n    if not usuario:\n        raise HTTPException(status_code=401, detail='Token inválido')\n    return usuario\n\n# Rota protegida — autentica automaticamente:\n@app.get('/perfil')\nasync def meu_perfil(usuario = Depends(usuario_autenticado)):\n    return usuario\n\n# Dependência de banco de dados:\nasync def get_db():\n    db = SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n\n@app.get('/usuarios')\nasync def listar(db = Depends(get_db)):\n    return db.query(Usuario).all()",
    tip: "Use `Depends()` para tudo que se repete: autenticação, acesso ao banco, rate limiting, validações de permissão. É muito mais limpo que checar essas coisas dentro de cada handler.",
  },

  "f4-4": {
    what: "JWT (JSON Web Token) é um padrão para transmitir informações entre partes de forma segura como JSON assinado. Um JWT tem 3 partes separadas por pontos: **Header** (algoritmo), **Payload** (dados do usuário — claims), **Signature** (assinatura que garante integridade). O servidor assina com uma chave secreta — qualquer alteração invalida o token. **Access token** tem vida curta (15min–1h). **Refresh token** tem vida longa (7–30 dias) para gerar novos access tokens.",
    why: "JWT é o padrão de autenticação stateless mais usado em APIs REST. Diferente de sessions, o servidor não precisa guardar estado — o token contém todas as informações necessárias. Essencial para APIs que servem mobile e SPAs.",
    how: "Fluxo: usuário envia email+senha → servidor valida → cria JWT com `{'sub': user_id, 'exp': timestamp}` → retorna token → cliente guarda e envia em cada request no header `Authorization: Bearer <token>`.",
    example: "from datetime import datetime, timedelta\nfrom jose import JWTError, jwt\nfrom passlib.context import CryptContext\n\nSECRET_KEY = 'sua-chave-secreta-muito-longa'\nALGORITHM = 'HS256'\nACCESS_TOKEN_EXPIRE = timedelta(minutes=30)\n\npwd_context = CryptContext(schemes=['bcrypt'])\n\ndef criar_token(dados: dict) -> str:\n    payload = dados.copy()\n    payload['exp'] = datetime.utcnow() + ACCESS_TOKEN_EXPIRE\n    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)\n\ndef verificar_token(token: str) -> dict | None:\n    try:\n        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])\n    except JWTError:\n        return None\n\n@app.post('/login')\nasync def login(form: LoginForm, db = Depends(get_db)):\n    usuario = db.query(Usuario).filter_by(email=form.email).first()\n    if not usuario or not pwd_context.verify(form.senha, usuario.senha_hash):\n        raise HTTPException(401, 'Credenciais inválidas')\n    token = criar_token({'sub': str(usuario.id)})\n    return {'access_token': token, 'token_type': 'bearer'}",
    tip: "NUNCA guarde informações sensíveis no payload do JWT — ele é apenas codificado em Base64, não criptografado. Qualquer pessoa pode decodificar o payload. A assinatura garante integridade (que não foi alterado), não confidencialidade.",
  },

  "f4-6": {
    what: "Modelagem relacional é o processo de projetar como os dados serão organizados em tabelas e como elas se relacionam. **Chave Primária (PK)** identifica unicamente cada registro. **Chave Estrangeira (FK)** referencia a PK de outra tabela, criando a relação. Tipos de relações: **1:1** (um usuário tem um perfil), **1:N** (um usuário tem muitos pedidos), **N:M** (muitos produtos em muitos pedidos — requer tabela intermediária).",
    why: "Uma modelagem ruim de banco de dados é tecnicamente a maior causa de problemas de performance e bugs em aplicações. Consertar modelagem em produção com dados é doloroso. Projetar bem desde o início economiza meses.",
    how: "Regras básicas de normalização: cada tabela representa uma entidade. Cada coluna representa um atributo da entidade. Não repita dados entre tabelas — use FKs. Ferramentas: dbdiagram.io para criar diagramas ER visualmente.",
    example: "-- Exemplo de modelagem 1:N e N:M:\n\nCREATE TABLE usuarios (\n  id SERIAL PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  criado_em TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE produtos (\n  id SERIAL PRIMARY KEY,\n  nome VARCHAR(200) NOT NULL,\n  preco DECIMAL(10,2) NOT NULL,\n  estoque INT DEFAULT 0\n);\n\n-- Pedido: 1 usuário tem N pedidos (1:N)\nCREATE TABLE pedidos (\n  id SERIAL PRIMARY KEY,\n  usuario_id INT NOT NULL REFERENCES usuarios(id),\n  total DECIMAL(10,2) NOT NULL,\n  status VARCHAR(50) DEFAULT 'pendente',\n  criado_em TIMESTAMP DEFAULT NOW()\n);\n\n-- Tabela intermediária para N:M (pedido tem N produtos):\nCREATE TABLE pedido_itens (\n  pedido_id INT REFERENCES pedidos(id),\n  produto_id INT REFERENCES produtos(id),\n  quantidade INT NOT NULL,\n  preco_unitario DECIMAL(10,2) NOT NULL,\n  PRIMARY KEY (pedido_id, produto_id)\n);",
    tip: "Sempre adicione `created_at` e `updated_at` em todas as tabelas — você vai precisar no futuro para auditorias e debugging. Use `DEFAULT NOW()` no banco, não no código da aplicação.",
  },

  "f4-7": {
    what: "ORM (Object-Relational Mapper) mapeia tabelas do banco para classes Python/TypeScript, e linhas para objetos. Você escreve código orientado a objetos e o ORM gera o SQL. **SQLAlchemy** é o ORM mais poderoso para Python — tem dois modos: Core (SQL mais explícito) e ORM (mais abstrato). **Prisma** é o ORM moderno para TypeScript — gera tipos automaticamente a partir do schema.",
    why: "ORMs previnem SQL injection automaticamente (queries parametrizadas), tornam o código mais legível, e permitem trocar de banco sem reescrever queries. O trade-off é performance — queries complexas às vezes precisam de SQL raw.",
    how: "SQLAlchemy: defina modelos como classes com `Base`, use `Session` para operações. Prisma: defina schema em `schema.prisma`, rode `prisma generate` para gerar tipos TypeScript, use `prisma.$transaction()` para operações atômicas.",
    example: "# SQLAlchemy ORM (Python):\nfrom sqlalchemy import Column, Integer, String, ForeignKey\nfrom sqlalchemy.orm import relationship, Session\nfrom database import Base\n\nclass Usuario(Base):\n    __tablename__ = 'usuarios'\n    id = Column(Integer, primary_key=True)\n    nome = Column(String(100), nullable=False)\n    email = Column(String(255), unique=True, nullable=False)\n    pedidos = relationship('Pedido', back_populates='usuario')\n\n# CRUD com SQLAlchemy:\ndef criar_usuario(db: Session, nome: str, email: str) -> Usuario:\n    usuario = Usuario(nome=nome, email=email)\n    db.add(usuario)\n    db.commit()\n    db.refresh(usuario)  # carrega o id gerado\n    return usuario\n\ndef buscar_usuarios(db: Session, skip=0, limit=100):\n    return db.query(Usuario)\\\n             .offset(skip)\\\n             .limit(limit)\\\n             .all()",
    tip: "O problema N+1 é o bug mais comum com ORMs: buscar 100 usuários e fazer 100 queries para os pedidos de cada um. Use `joinedload()` (SQLAlchemy) ou `include` (Prisma) para carregar relacionamentos em uma query só.",
  },

  "f4-8": {
    what: "PostgreSQL é o banco de dados relacional mais avançado e popular em startups e empresas de tecnologia. Suporta JSON nativo (`jsonb`), arrays, full-text search, e extensões como PostGIS (geoespacial) e pgvector (vetores para IA). É open-source, ACID-compliant, e tem performance excelente.",
    why: "PostgreSQL é a escolha padrão em 2025 para novos projetos. MySQL é popular mas tem menos features. SQLite é ótimo para desenvolvimento local mas não para produção com concorrência. Saber Postgres te prepara para praticamente qualquer empresa.",
    how: "Instale localmente com Docker: `docker run -e POSTGRES_PASSWORD=senha -p 5432:5432 postgres`. Conecte com TablePlus ou DBeaver para visualizar dados. String de conexão: `postgresql://usuario:senha@localhost:5432/banco`.",
    example: "-- Comandos essenciais:\n-- Criar banco e usuário:\nCREATE DATABASE meuprojeto;\nCREATE USER devuser WITH PASSWORD 'senha';\nGRANT ALL PRIVILEGES ON DATABASE meuprojeto TO devuser;\n\n-- Índices para performance:\nCREATE INDEX idx_usuarios_email ON usuarios(email);\nCREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);\n\n-- JSONB para dados flexíveis:\nCREATE TABLE configs (\n  id SERIAL PRIMARY KEY,\n  usuario_id INT REFERENCES usuarios(id),\n  dados JSONB NOT NULL DEFAULT '{}'\n);\n\n-- Buscar dentro do JSONB:\nSELECT * FROM configs WHERE dados->>'tema' = 'escuro';\n\n-- Full text search nativo:\nSELECT * FROM posts\nWHERE to_tsvector('portuguese', titulo || ' ' || conteudo)\n      @@ plainto_tsquery('portuguese', 'python fastapi');",
    tip: "Sempre crie índices nas colunas usadas em WHERE, JOIN e ORDER BY. Uma query que varre a tabela inteira (full table scan) em produção com milhões de registros é lenta demais. Use `EXPLAIN ANALYZE` para ver o plano de execução de uma query.",
  },

  "f4-9": {
    what: "Migrations são versionamento do schema do banco de dados — cada migration é um arquivo que descreve uma mudança (criar tabela, adicionar coluna, criar índice). **Alembic** é o sistema de migrations do SQLAlchemy. **Prisma Migrate** é o sistema do Prisma. Migrations têm `up` (aplica a mudança) e `down` (reverte). São commitadas no Git junto com o código.",
    why: "Sem migrations, alterar o banco em produção é manual, propício a erros, e impossível de coordenar em equipe. Com migrations, você tem um histórico auditável de como o banco evoluiu, e pode aplicar ou reverter mudanças de forma reproduzível.",
    how: "Alembic: `alembic init migrations` inicia. `alembic revision --autogenerate -m 'criar tabela usuarios'` cria migration baseado nos modelos. `alembic upgrade head` aplica todas as migrations pendentes.",
    example: "# Fluxo com Alembic:\n# 1. Modificar modelo SQLAlchemy (adicionar coluna)\nclass Usuario(Base):\n    __tablename__ = 'usuarios'\n    id = Column(Integer, primary_key=True)\n    nome = Column(String)\n    telefone = Column(String)  # <- nova coluna\n\n# 2. Gerar migration automaticamente:\n# $ alembic revision --autogenerate -m 'add telefone to usuarios'\n\n# Migration gerada (em migrations/versions/abc123_add_telefone.py):\ndef upgrade():\n    op.add_column('usuarios',\n        sa.Column('telefone', sa.String(), nullable=True)\n    )\n\ndef downgrade():\n    op.drop_column('usuarios', 'telefone')\n\n# 3. Aplicar:\n# $ alembic upgrade head\n\n# Prisma equivalente:\n# $ prisma migrate dev --name add-telefone",
    tip: "NUNCA edite uma migration que já foi aplicada em produção. Se precisar corrigir, crie uma nova migration que faz a correção. Trate migrations como commits — imutáveis após publicados.",
  },

  "f4-11": {
    what: "Um Dockerfile é um script com instruções para construir uma imagem Docker. Cada instrução cria uma **layer** que é cacheada. `FROM` define a imagem base. `WORKDIR` define o diretório de trabalho. `COPY` copia arquivos. `RUN` executa comandos durante o build. `ENV` define variáveis de ambiente. `EXPOSE` documenta a porta (não abre de verdade). `CMD` define o comando padrão ao iniciar o container.",
    why: "O Dockerfile é a receita reproducível do seu ambiente. Qualquer pessoa pode pegar o Dockerfile e construir uma imagem idêntica, em qualquer máquina, sem 'funciona na minha máquina'.",
    how: "Boas práticas: use imagens oficiais `-slim` ou `-alpine` (menores). Copie `requirements.txt` ANTES do código fonte — o `pip install` fica em cache e não reexecuta quando só o código muda. Use usuário não-root para segurança.",
    example: "# Dockerfile otimizado para Python/FastAPI:\nFROM python:3.12-slim\n\n# Criar usuário sem privilégios (segurança):\nRUN groupadd -r app && useradd -r -g app app\n\nWORKDIR /app\n\n# Instalar dependências primeiro (cache de layers):\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Copiar código depois (invalida cache só quando código muda):\nCOPY . .\n\n# Mudar ownership e usar usuário sem privilégios:\nRUN chown -R app:app /app\nUSER app\n\n# Variáveis de ambiente padrão:\nENV PYTHONUNBUFFERED=1 \\\n    PYTHONDONTWRITEBYTECODE=1\n\nEXPOSE 8000\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8000\"]",
    tip: "Use `.dockerignore` para excluir arquivos do contexto de build: `venv/`, `__pycache__/`, `.git/`, `.env`. Sem isso, o build context é enorme e lento. `.dockerignore` funciona igual ao `.gitignore`.",
  },

  "f4-12": {
    what: "Docker Compose orquestra múltiplos containers que trabalham juntos, definidos em um arquivo `docker-compose.yml`. Cada serviço é um container. Eles se comunicam pelo nome do serviço como hostname. `volumes` persistem dados além do ciclo de vida do container. `depends_on` define a ordem de inicialização.",
    why: "Seu app completo provavelmente precisa de: app + banco de dados + cache (Redis) + worker. Subir cada container manualmente seria tedioso. Com `docker compose up`, tudo sobe junto com um comando.",
    how: "`docker compose up` sobe todos os serviços. `docker compose up --build` reconstrói imagens. `docker compose down` para e remove. `docker compose logs -f servico` mostra logs em tempo real. `docker compose exec servico bash` abre terminal no container.",
    example: "# docker-compose.yml completo:\nservices:\n  api:\n    build: .\n    ports:\n      - '8000:8000'\n    environment:\n      DATABASE_URL: postgresql://postgres:senha@db:5432/meuprojeto\n      REDIS_URL: redis://cache:6379\n    depends_on:\n      db:\n        condition: service_healthy\n    volumes:\n      - .:/app  # monta código local (hot reload em dev)\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: meuprojeto\n      POSTGRES_USER: postgres\n      POSTGRES_PASSWORD: senha\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n\n  cache:\n    image: redis:7-alpine\n    ports:\n      - '6379:6379'\n\nvolumes:\n  postgres_data:",
    tip: "Use `healthcheck` no serviço do banco para garantir que ele está pronto antes do app tentar conectar. Sem isso, o app sobe antes do banco estar disponível e dá erro de conexão.",
  },

  "f4-13": {
    what: "Railway, Render e Fly.io são plataformas de deploy modernas com planos gratuitos generosos. **Railway** tem a melhor DX (developer experience) — conecta ao GitHub, detecta o tipo de projeto automaticamente, e provisiona banco de dados com um clique. **Render** é ótimo para deploy de Docker. **Fly.io** tem mais controle e é ótimo para edge computing.",
    why: "Deploy é onde o projeto vira algo real. Um projeto no portfólio com link funcionando é infinitamente mais impressionante que código só no GitHub. Recrutadores clicam em demos — poucos leem código.",
    how: "Railway: crie conta, conecte GitHub, clique em 'New Project', selecione o repositório. Railway detecta Python/Node automaticamente, configura variáveis de ambiente, e dá um domínio `.railway.app`. Banco PostgreSQL: clique em 'Add Service → Database → PostgreSQL'.",
    example: "# Variáveis de ambiente necessárias no Railway:\n# DATABASE_URL — Railway injeta automaticamente ao conectar o banco\n# SECRET_KEY — gere com: python -c 'import secrets; print(secrets.token_hex(32))'\n# ALLOWED_ORIGINS — URL do seu frontend\n\n# railway.json (opcional, para configurações extras):\n{\n  \"build\": {\n    \"builder\": \"DOCKERFILE\"\n  },\n  \"deploy\": {\n    \"startCommand\": \"uvicorn main:app --host 0.0.0.0 --port $PORT\",\n    \"healthcheckPath\": \"/health\",\n    \"restartPolicyType\": \"ON_FAILURE\"\n  }\n}\n\n# Endpoint de health check (boas práticas):\n@app.get('/health')\nasync def health():\n    return {'status': 'ok'}",
    tip: "Sempre crie um endpoint `/health` na sua API — plataformas de deploy usam isso para saber se o app está funcionando. Também adicione um endpoint `/` com informações básicas da API (nome, versão) — facilita debugging.",
  },

  "f4-14": {
    what: "OWASP Top 10 são as 10 vulnerabilidades mais críticas em aplicações web. As principais: **Injection** (SQL, NoSQL, OS injection — dados do usuário interpretados como código). **Broken Authentication** (senhas fracas, tokens não expiram). **XSS** (Cross-Site Scripting — injeção de JavaScript malicioso). **IDOR** (Insecure Direct Object Reference — acessar recursos de outros usuários mudando o ID na URL). **CSRF** (Cross-Site Request Forgery — ações indesejadas em nome do usuário autenticado).",
    why: "Aplicações com vulnerabilidades causam vazamentos de dados, perda de dinheiro, e responsabilidade legal. Um júnior que conhece OWASP Top 10 e escreve código defensivo vale muito mais que um que ignora segurança.",
    how: "Prevenção de SQL Injection: NUNCA concatene inputs do usuário em SQL — use queries parametrizadas ou ORM. XSS: escape dados do usuário ao renderizar HTML. IDOR: sempre verifique se o usuário autenticado tem permissão para o recurso solicitado.",
    example: "# SQL Injection — o que NÃO fazer:\n# ❌ VULNERÁVEL:\nquery = f\"SELECT * FROM users WHERE email = '{email}'\"\n# Se email = \"' OR '1'='1\", retorna TODOS os usuários!\n\n# ✅ SEGURO — query parametrizada:\nquery = \"SELECT * FROM users WHERE email = :email\"\ndb.execute(query, {\"email\": email})\n\n# IDOR — sempre verificar ownership:\n# ❌ VULNERÁVEL:\n@app.delete('/pedidos/{pedido_id}')\nasync def deletar_pedido(pedido_id: int):\n    db.delete(pedido_id)  # qualquer um pode deletar qualquer pedido!\n\n# ✅ SEGURO:\n@app.delete('/pedidos/{pedido_id}')\nasync def deletar_pedido(pedido_id: int, usuario = Depends(auth)):\n    pedido = db.get(pedido_id)\n    if pedido.usuario_id != usuario.id:\n        raise HTTPException(403, 'Sem permissão')\n    db.delete(pedido)",
    tip: "A mentalidade correta de segurança: nunca confie em dados do usuário. Valide e sanitize tudo que vem de fora — URL, body, headers, cookies. Internamente, sempre verifique permissões antes de operações em dados de outros usuários.",
  },

  "f4-15": {
    what: "Secrets são credenciais que concedem acesso a recursos protegidos: senhas de banco, API keys, tokens de serviços externos, chaves criptográficas. A regra fundamental é: **nunca commitar secrets no Git**. Uma vez no repositório — mesmo que deletado depois — pode ter sido indexado por bots que escaneiam commits.",
    why: "Repositórios públicos com secrets expostos são varridos por bots automatizados em menos de 1 minuto. Já houve casos de contas AWS com cobranças de dezenas de milhares de dólares porque uma chave foi exposta no GitHub.",
    how: "Use arquivo `.env` para desenvolvimento local. Adicione `.env` ao `.gitignore` ANTES do primeiro commit. Em produção, use variáveis de ambiente da plataforma (Railway, Render, AWS). Use `python-dotenv` para carregar em Python, `dotenv` package em Node.",
    example: "# .env (NUNCA commitar):\nDATABASE_URL=postgresql://user:senha@localhost/db\nSECRET_KEY=chave-super-secreta-aqui\nSTRIPE_SECRET_KEY=sk_test_...\nSENDGRID_API_KEY=SG....\n\n# .gitignore (adicione ANTES do primeiro commit):\n.env\n.env.local\n.env.production\n*.key\nsecrets/\n\n# Python — carregar com dotenv:\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()  # carrega .env automaticamente\n\nDATABASE_URL = os.getenv('DATABASE_URL')\nif not DATABASE_URL:\n    raise ValueError('DATABASE_URL não configurada!')\n\n# TypeScript — com dotenv:\nimport 'dotenv/config';\nconst dbUrl = process.env.DATABASE_URL!;",
    tip: "Se você acidentalmente commitou um secret, não basta deletar o arquivo e commitar novamente — o secret ainda aparece no histórico. Você PRECISA: revogar/rotacionar o secret imediatamente, depois use `git filter-branch` ou BFG Repo Cleaner para reescrever o histórico.",
  },

  "f4-16": {
    what: "Hashing de senha é o processo de transformar uma senha em uma string irreversível. Ao autenticar, você aplica o mesmo algoritmo na senha fornecida e compara com o hash armazenado. **bcrypt** adiciona um salt aleatório a cada hash — dois usuários com a mesma senha têm hashes diferentes. Isso previne rainbow table attacks.",
    why: "Guardar senhas em texto puro é um crime de negligência. Se o banco for comprometido, todas as senhas ficam expostas. Com bcrypt, mesmo com acesso ao banco, o atacante precisaria de bilhões de anos para quebrar senhas fortes.",
    how: "Python: `passlib` com bcrypt. `pwd_context.hash(senha)` cria o hash. `pwd_context.verify(senha, hash)` verifica. O parâmetro `rounds` (ou `work_factor`) controla a lentidão — padrão 12 é bom equilíbrio entre segurança e velocidade.",
    example: "from passlib.context import CryptContext\n\n# Configurar contexto de hashing:\npwd_context = CryptContext(\n    schemes=['bcrypt'],\n    deprecated='auto'\n)\n\ndef hash_senha(senha: str) -> str:\n    return pwd_context.hash(senha)  # inclui salt automático\n\ndef verificar_senha(senha: str, hash: str) -> bool:\n    return pwd_context.verify(senha, hash)\n\n# Uso no cadastro:\n@app.post('/usuarios')\nasync def criar_usuario(dados: CriarUsuario, db = Depends(get_db)):\n    # Nunca salve dados.senha diretamente!\n    usuario = Usuario(\n        nome=dados.nome,\n        email=dados.email,\n        senha_hash=hash_senha(dados.senha)  # ← correto\n    )\n    db.add(usuario)\n    db.commit()\n    return UsuarioResponse.from_orm(usuario)\n\n# Uso no login:\ndef autenticar(email: str, senha: str, db) -> Usuario | None:\n    usuario = db.query(Usuario).filter_by(email=email).first()\n    if not usuario or not verificar_senha(senha, usuario.senha_hash):\n        return None  # mensagem genérica — não diga qual está errado\n    return usuario",
    tip: "Nunca use MD5 ou SHA1 para senhas — são rápidos demais e foram quebrados. Use bcrypt, scrypt ou Argon2. Retorne a mesma mensagem de erro para 'usuário não encontrado' e 'senha incorreta' — não revelar qual é o problema é segurança por obscuridade válida.",
  },

  "f4-17": {
    what: "HTTPS é HTTP com TLS (Transport Layer Security) — uma camada de criptografia que protege os dados em trânsito entre cliente e servidor. O TLS usa certificados para autenticar o servidor. **Let's Encrypt** é uma autoridade certificadora gratuita e automática. **HSTS** (HTTP Strict Transport Security) força o browser a sempre usar HTTPS.",
    why: "Sem HTTPS, qualquer pessoa na mesma rede pode interceptar e modificar o tráfego (man-in-the-middle). Senhas, tokens, dados pessoais — tudo visível. Navegadores marcam sites HTTP como 'não seguro'. Google penaliza sites sem HTTPS no ranking.",
    how: "Em desenvolvimento: use `localhost` (browsers tratam como seguro). Em produção: plataformas como Railway, Render e Vercel provisionam HTTPS automaticamente via Let's Encrypt. Para servidores próprios: use Certbot (Let's Encrypt) ou Caddy (configura HTTPS automaticamente).",
    example: "# FastAPI — headers de segurança recomendados:\nfrom fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware\nfrom fastapi.middleware.trustedhost import TrustedHostMiddleware\n\n# Em produção:\napp.add_middleware(HTTPSRedirectMiddleware)  # redireciona HTTP → HTTPS\napp.add_middleware(\n    TrustedHostMiddleware,\n    allowed_hosts=['meusite.com', '*.meusite.com']\n)\n\n# Middleware para headers de segurança:\n@app.middleware('http')\nasync def security_headers(request, call_next):\n    response = await call_next(request)\n    response.headers['Strict-Transport-Security'] = 'max-age=31536000'\n    response.headers['X-Content-Type-Options'] = 'nosniff'\n    response.headers['X-Frame-Options'] = 'DENY'\n    return response",
    tip: "NUNCA desabilite verificação de certificado SSL no código de produção (`verify=False` em requests). É um anti-padrão que elimina toda a proteção do HTTPS. Se você está tendo problemas de certificado em desenvolvimento, use `http://localhost` ou configure um certificado local com mkcert.",
  },

  // ═══════════════════════════════════════════════
  // FASE 5 — restantes
  // ═══════════════════════════════════════════════

  "f5-2": {
    what: "Uma CLI (Command Line Interface) tool é um programa que roda no terminal e aceita argumentos. É um projeto perfeito para iniciante porque demonstra: lógica de programação, manipulação de arquivos, tratamento de erros, e publicação no pip. Exemplos: gerador de senhas fortes, conversor de CSV pra JSON, renomeador em lote de arquivos, cliente de API simples.",
    why: "CLIs são projetos pequenos o suficiente para terminar, mas completos o suficiente para mostrar habilidades reais. São fáceis de demonstrar — qualquer recrutador pode rodar no terminal. E existem usuários reais para ferramentas úteis.",
    how: "Use `argparse` (nativo) ou `click`/`typer` (mais ergonômico). `typer` é particularmente elegante — usa type hints para definir argumentos automaticamente. Empacote com `pyproject.toml` para distribuição via pip.",
    example: "# CLI com Typer — gerador de senhas:\nimport typer\nimport secrets\nimport string\n\napp = typer.Typer(help='Gerador de senhas seguras')\n\n@app.command()\ndef gerar(\n    comprimento: int = typer.Option(16, '--tamanho', '-t', help='Tamanho da senha'),\n    sem_simbolos: bool = typer.Option(False, '--sem-simbolos', '-s'),\n    quantidade: int = typer.Option(1, '--qtd', '-q'),\n):\n    '''\n    Gera senhas seguras e criptograficamente fortes.\n    '''\n    alfabeto = string.ascii_letters + string.digits\n    if not sem_simbolos:\n        alfabeto += string.punctuation\n\n    for _ in range(quantidade):\n        senha = ''.join(secrets.choice(alfabeto) for _ in range(comprimento))\n        typer.echo(senha)\n\nif __name__ == '__main__':\n    app()\n\n# Uso:\n# python senha.py --tamanho 32 --qtd 5\n# python senha.py -t 20 -s  (sem símbolos)",
    tip: "Coloque o projeto no GitHub com README mostrando como instalar (`pip install .`) e exemplos de uso. Adicione um GIF animado do terminal no README usando `asciinema` — captura o terminal e gera uma animação que roda no browser.",
  },

  "f5-3": {
    what: "Uma API REST completa de portfólio deve ter: autenticação JWT, operações CRUD com banco de dados real, validação de dados com Pydantic, testes automatizados, Dockerfile funcional, e documentação automática. Este projeto demonstra que você entende o ciclo completo de desenvolvimento backend.",
    why: "É o projeto mais importante do portfólio backend. Recrutadores que avaliam devs júniors buscam exatamente isso: consegue criar uma API que funciona de verdade, com autenticação, banco, e código organizado?",
    how: "Estruture o projeto em módulos: `routers/` (endpoints), `models/` (SQLAlchemy), `schemas/` (Pydantic), `services/` (lógica de negócio), `core/` (config, security). Siga o padrão Repository para abstrair o banco.",
    example: "# Estrutura recomendada do projeto:\n# api/\n# ├── main.py              (app FastAPI, routers, middleware)\n# ├── core/\n# │   ├── config.py        (settings com pydantic-settings)\n# │   └── security.py      (JWT, hashing)\n# ├── routers/\n# │   ├── auth.py          (login, registro, refresh)\n# │   └── tarefas.py       (CRUD de tarefas)\n# ├── models/\n# │   └── models.py        (SQLAlchemy models)\n# ├── schemas/\n# │   └── schemas.py       (Pydantic schemas)\n# ├── services/\n# │   └── tarefa_service.py (lógica de negócio)\n# ├── tests/\n# │   ├── conftest.py       (fixtures)\n# │   └── test_tarefas.py   (testes)\n# ├── Dockerfile\n# ├── docker-compose.yml\n# ├── requirements.txt\n# └── README.md            (com exemplos de uso da API)",
    tip: "Adicione um arquivo `requests.http` ou coleção do Postman no repositório com exemplos de todas as chamadas da API. Isso mostra profissionalismo e facilita para recrutadores testarem. No README, coloque o link do `/docs` da API deployada.",
  },

  "f5-4": {
    what: "Um projeto full-stack integra frontend e backend desenvolvidos por você. O frontend React consome a API FastAPI que você criou. Demonstra que você entende o sistema completo: autenticação de ponta a ponta, gerenciamento de estado no frontend, CORS, deploy de múltiplos serviços.",
    why: "A maioria das vagas júnior quer desenvolvedores que entendem o sistema inteiro, mesmo sendo especialista em um lado. Um projeto full-stack no portfólio prova que você sabe como as peças se conectam.",
    how: "Frontend em Vite+React+TypeScript ou Next.js. Configure CORS na API para aceitar requests do domínio do frontend. Guarde o JWT no localStorage (simples) ou cookie httpOnly (mais seguro). Use React Query para gerenciar o estado do servidor.",
    example: "// Serviço de API no frontend (TypeScript):\nconst API_URL = process.env.NEXT_PUBLIC_API_URL;\n\nexport async function login(email: string, senha: string) {\n  const res = await fetch(`${API_URL}/auth/login`, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ email, senha }),\n  });\n  if (!res.ok) throw new Error('Credenciais inválidas');\n  const { access_token } = await res.json();\n  localStorage.setItem('token', access_token);\n  return access_token;\n}\n\nexport async function buscarTarefas() {\n  const token = localStorage.getItem('token');\n  const res = await fetch(`${API_URL}/tarefas`, {\n    headers: { 'Authorization': `Bearer ${token}` },\n  });\n  if (res.status === 401) {\n    localStorage.removeItem('token');\n    window.location.href = '/login';\n  }\n  return res.json();\n}",
    tip: "Deploy separado: API no Railway (ou Render), frontend na Vercel. Configure a variável de ambiente `NEXT_PUBLIC_API_URL` na Vercel apontando para a URL da API no Railway. Isso demonstra que você sabe trabalhar com ambientes separados.",
  },

  "f5-5": {
    what: "Um README de portfólio é a porta de entrada do projeto. Deve responder em 30 segundos: O que é? Para que serve? Como rodo? Quais tecnologias usa? Tem um demo ao vivo? Elementos essenciais: título e descrição clara, badges de tecnologia, screenshot/GIF do projeto funcionando, instrução de instalação, e link do deploy.",
    why: "Projetos sem README passam impressão de abandono ou amadorismo. Um README bem feito faz o projeto parecer mais profissional do que é. Recrutadores julgam pelo README antes de olhar qualquer linha de código.",
    how: "Use o template: título → badges → descrição (1 parágrafo) → screenshot/demo → features → stack → como rodar → variáveis de ambiente → testes → deploy. Ferramentas: shields.io para badges, Carbon para screenshots de código bonitas.",
    example: "# 📝 API de Tarefas\n\n[![Python](https://img.shields.io/badge/Python-3.12-blue)]()\n[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)]()\n[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)]()\n\nAPI REST completa para gerenciamento de tarefas com autenticação JWT.\n\n## 🚀 Demo\n**API:** https://api-tarefas.railway.app/docs\n\n## ✨ Features\n- ✅ Autenticação com JWT (access + refresh token)\n- ✅ CRUD completo de tarefas por usuário\n- ✅ Paginação e filtros\n- ✅ Testes automatizados (90% coverage)\n- ✅ Deploy com Docker\n\n## 🛠 Stack\n- **Backend:** FastAPI, SQLAlchemy, Pydantic\n- **Banco:** PostgreSQL\n- **Auth:** JWT (python-jose, passlib)\n- **Deploy:** Docker, Railway\n\n## ⚡ Como rodar\n```bash\ngit clone https://github.com/user/api-tarefas\ncd api-tarefas\ncp .env.example .env  # configure as variáveis\ndocker compose up\n```\nAcesse: http://localhost:8000/docs",
    tip: "Instale o `readme-so` ou use o site readme.so para gerar o template visualmente. Adicione um arquivo `.env.example` com os nomes das variáveis mas sem os valores — serve como documentação do que precisa configurar.",
  },

  "f5-7": {
    what: "Perguntas comportamentais avaliam soft skills: como você trabalha em equipe, resolve conflitos, lida com pressão, aprende com erros. O método **STAR** estrutura suas respostas: **Situation** (contexto), **Task** (sua responsabilidade), **Action** (o que você fez especificamente), **Result** (o resultado mensurável). Perguntas comuns: 'Me fale sobre um desafio técnico', 'Como você aprende coisas novas', 'Me dê um exemplo de colaboração em equipe'.",
    why: "Técnica excepcional com comportamental ruim perde a vaga para técnica boa com comportamental excelente. Empresas contratam pessoas, não algoritmos. Habilidade de comunicação é tão valorizada quanto habilidade técnica.",
    how: "Prepare 5-6 histórias STAR que cobrem: desafio superado, erro cometido e aprendizado, trabalho em equipe, iniciativa própria, aprendizado rápido de tecnologia nova. Adapte a mesma história para diferentes perguntas.",
    example: "# Pergunta: 'Me fale sobre um projeto técnico desafiador'\n\n# ❌ Resposta fraca:\n'Eu fiz uma API com FastAPI e foi difícil mas aprendi muito.'\n\n# ✅ Resposta STAR:\n'Em um projeto pessoal de portfólio (Situation), eu precisava\nimplementar autenticação JWT segura do zero (Task). Eu estudei\na RFC do JWT, implementei o fluxo completo de access + refresh\ntoken com rotação automática, e escrevi testes para todos os\ncasos de edge case incluindo tokens expirados e manipulados\n(Action). O resultado foi uma API com autenticação production-ready\nque uso como referência em novos projetos, e aprendi como\nbibliotecas como NextAuth funcionam internamente (Result).'",
    tip: "Grave-se respondendo perguntas em vídeo e assista depois — é constrangedor mas é o feedback mais honesto que existe. Fale devagar, não diga 'hm' e 'né' a cada frase. Praticar em voz alta 10x é diferente de ensaiar mentalmente.",
  },

  "f5-8": {
    what: "System Design é a disciplina de projetar sistemas escaláveis. Para júnior, o esperado é entender os conceitos básicos: **Load Balancer** (distribui tráfego entre múltiplos servidores). **Cache** (Redis — reduz queries ao banco). **CDN** (serve assets estáticos do ponto geograficamente mais próximo). **Banco de dados** (quando usar relacional vs NoSQL). **Filas** (RabbitMQ, SQS — para operações assíncronas como envio de email).",
    why: "Mesmo como júnior, entender esses conceitos em alto nível demonstra maturidade técnica. Você não precisa implementar um sistema de 1 bilhão de usuários, mas precisa entender por que Twitter não usa um único servidor.",
    how: "Estude o básico de cada componente: o que é, quando usar, trade-offs. Para entrevistas de júnior: explique como você tornaria sua API mais rápida com cache Redis, ou como enviaria emails sem travar a requisição usando filas.",
    example: "# Exemplo de resposta para 'Como você escalaria sua API de tarefas?'\n\n# Nível 1 — para júnior:\n'Primeiro eu adicionaria cache com Redis nas\nqueries mais frequentes (busca de tarefas do usuário).\nDepois moveria operações lentas (envio de email)\npara uma fila com Celery para não bloquear\na requisição do usuário. O banco PostgreSQL\nsuporta read replicas para escalar leituras.'\n\n# Arquitetura básica que vale entender:\n#\n# Cliente → CDN → Load Balancer\n#                      ↓\n#               [API Server 1]\n#               [API Server 2]  → Cache (Redis)\n#               [API Server 3]     → Banco Principal\n#                                  → Banco Replica (leituras)\n#                      ↓\n#               [Queue (Celery)]\n#               [Worker Emails]",
    tip: "Para júnior, o livro 'System Design Interview' de Alex Xu tem os primeiros capítulos acessíveis e cobrem os conceitos essenciais. Mas não se estresse — system design complexo é mais cobrado em entrevistas de pleno/sênior.",
  },

  "f5-9": {
    what: "Fazer perguntas ao entrevistador é esperado e valorizado — demonstra curiosidade, maturidade, e interesse genuíno na empresa. Boas perguntas são sobre: como funciona o processo de desenvolvimento (ritmo, code review), tecnologias e desafios técnicos do time, cultura de aprendizado, expectativas para o primeiro mês.",
    why: "A entrevista é uma via de mão dupla — você também está avaliando se a empresa é um bom lugar para trabalhar. Além disso, fazer perguntas boas cria uma conversa real e te diferencia de candidatos que só respondem passivamente.",
    how: "Prepare 4-5 perguntas com antecedência. Algumas sempre funcionam: 'Como é o processo de code review do time?', 'Qual foi o maior desafio técnico que o time enfrentou recentemente?', 'Como funciona o onboarding de novos devs?', 'Quais tecnologias vocês estão explorando para o futuro?'.",
    example: "# ✅ Boas perguntas para entrevista:\n\n1. 'Como é o processo de code review aqui?\n   Quanto tempo geralmente leva um PR ser mergeado?'\n\n2. 'Qual é o maior desafio técnico que o time está\n   enfrentando agora?'\n\n3. 'Como é o processo de onboarding?\n   Em quanto tempo um dev novo está commitando código?'\n\n4. 'Como o time decide as tecnologias a adotar?\n   Existe liberdade para propor melhorias?'\n\n5. 'Quais são as expectativas para os primeiros\n   30/60/90 dias nessa posição?'\n\n# ❌ Perguntas ruins (parecem só interesse em benefícios):\n# 'Quantas férias tenho?'\n# 'Posso trabalhar home office todo dia?'\n# (guarde essas para depois de receber a oferta)",
    tip: "Nunca diga 'não tenho perguntas' — é visto como desinteresse. Se as perguntas que preparou foram respondidas durante a entrevista, diga: 'Você cobriu bastante coisa que eu ia perguntar, mas fiquei curioso sobre...' e improvise com base no que foi discutido.",
  },

  "f5-11": {
    what: "Single Responsibility Principle (SRP) — o S do SOLID — diz que uma classe/função deve ter apenas um motivo para mudar. Na prática: funções fazem uma coisa, classes representam um conceito. Se você precisar de 'e' para descrever o que algo faz ('valida E salva E envia email'), está violando SRP.",
    why: "Código que mistura responsabilidades é difícil de testar (você precisa mockar muito), difícil de reutilizar (não dá para usar só parte dele), e difícil de manter (uma mudança em uma responsabilidade pode quebrar outra).",
    how: "Separe: lógica de negócio (o que fazer), acesso a dados (como persistir), e apresentação (como exibir). Uma função que busca do banco, processa e formata para resposta tem 3 responsabilidades — separe em 3 funções.",
    example: "# ❌ Função com múltiplas responsabilidades:\ndef processar_pedido(pedido_id: int, db, email_service):\n    # Responsabilidade 1: buscar do banco\n    pedido = db.query(Pedido).get(pedido_id)\n    # Responsabilidade 2: lógica de negócio\n    if pedido.total > 1000:\n        desconto = pedido.total * 0.1\n        pedido.total -= desconto\n    # Responsabilidade 3: persistir\n    db.commit()\n    # Responsabilidade 4: notificar\n    email_service.enviar_confirmacao(pedido)\n    return pedido\n\n# ✅ Responsabilidades separadas:\ndef calcular_desconto(pedido: Pedido) -> float:\n    return pedido.total * 0.1 if pedido.total > 1000 else 0\n\nclass PedidoRepository:\n    def buscar(self, id: int) -> Pedido: ...\n    def atualizar(self, pedido: Pedido) -> None: ...\n\nclass PedidoService:\n    def __init__(self, repo: PedidoRepository, notif: Notificador):\n        self._repo = repo\n        self._notif = notif\n\n    def processar(self, pedido_id: int) -> Pedido:\n        pedido = self._repo.buscar(pedido_id)\n        pedido.desconto = calcular_desconto(pedido)\n        self._repo.atualizar(pedido)\n        self._notif.confirmar(pedido)\n        return pedido",
    tip: "Um bom teste de SRP: se você precisa inicializar 5 mocks para testar uma função, ela tem responsabilidades demais. Funções que você consegue testar com 0 ou 1 mock tendem a ter responsabilidade única.",
  },

  "f5-12": {
    what: "DRY (Don't Repeat Yourself) significa que cada pedaço de conhecimento deve ter uma representação única e autoritativa no sistema. Código duplicado é problemático porque mudanças precisam ser feitas em múltiplos lugares — e inevitavelmente um lugar é esquecido. Mas cuidado: **abstração prematura** é o oposto e também é problemático — criar abstrações para código que só aparece duas vezes.",
    why: "Code duplication multiplica bugs: você corrige em um lugar e esquece o outro. Também viola o princípio de ter uma única fonte de verdade. Dito isso, a regra dos 3 é prática: duplique uma vez, na segunda duplicação, abstraia.",
    how: "Extração de função: código repetido vira uma função. Extração de constante: valor mágico repetido vira uma constante nomeada. Extração de componente (React): UI repetida vira componente. Utility functions: operações comuns em arquivo `utils/`.",
    example: "# ❌ DRY violado — validação repetida em 3 rotas:\n@app.post('/usuarios')\nasync def criar_usuario(dados: dict):\n    if not dados.get('email') or '@' not in dados['email']:\n        raise HTTPException(400, 'Email inválido')\n    ...\n\n@app.post('/newsletter')\nasync def inscrever(dados: dict):\n    if not dados.get('email') or '@' not in dados['email']:\n        raise HTTPException(400, 'Email inválido')  # duplicado!\n    ...\n\n# ✅ DRY respeitado — validação centralizada:\nfrom pydantic import BaseModel, EmailStr\n\nclass ComEmail(BaseModel):  # abstração reutilizável\n    email: EmailStr         # Pydantic valida automaticamente\n\n@app.post('/usuarios')\nasync def criar_usuario(dados: ComEmail):\n    ...  # email já validado pelo schema\n\n@app.post('/newsletter')\nasync def inscrever(dados: ComEmail):\n    ...  # mesma validação, sem repetição",
    tip: "A regra prática: se você copiou e colou código pela segunda vez, pare e extraia para uma função ou constante. Se só tem dois lugares iguais, talvez seja cedo demais para abstrair — use julgamento. Código um pouco repetido é melhor que abstração errada.",
  },

  "f5-13": {
    what: "Linters analisam o código estaticamente (sem executar) para encontrar erros, problemas de estilo e más práticas. **Black** formata Python automaticamente com zero configuração — opinionado por design. **Ruff** é um linter Python extremamente rápido (escrito em Rust) que substitui flake8, isort e outros. **ESLint** analisa JavaScript/TypeScript. **Prettier** formata JS/TS/CSS/JSON automaticamente.",
    why: "Linters detectam bugs reais antes de rodar o código (variáveis não usadas, imports faltando, comparações sempre verdadeiras). Formatters eliminam debates de estilo no code review — o time inteiro escreve código com a mesma formatação automaticamente.",
    how: "Python: instale `ruff` e `black`. Configure no `pyproject.toml`. TypeScript: instale `eslint` e `prettier`, configure `.eslintrc` e `.prettierrc`. Integre com o editor (VSCode formata ao salvar) e com CI (bloqueia PR se lint falhar).",
    example: "# pyproject.toml — configuração completa Python:\n[tool.ruff]\nline-length = 88\nselect = [\n    'E',   # pycodestyle\n    'F',   # pyflakes\n    'I',   # isort (ordenação de imports)\n    'N',   # naming conventions\n    'UP',  # pyupgrade (syntax moderna)\n]\nignore = ['E501']  # ignore line too long (black cuida disso)\n\n[tool.black]\nline-length = 88\ntarget-version = ['py312']\n\n# .eslintrc.js — TypeScript:\nmodule.exports = {\n  extends: [\n    'eslint:recommended',\n    'plugin:@typescript-eslint/recommended',\n    'prettier'  // desativa regras que conflitam com prettier\n  ],\n  rules: {\n    '@typescript-eslint/no-unused-vars': 'error',\n    '@typescript-eslint/explicit-function-return-type': 'warn',\n  }\n};",
    tip: "Configure o VSCode para formatar ao salvar com Black/Prettier automaticamente: Settings → Format On Save. Adicione linting ao CI/CD: um `ruff check .` no GitHub Actions que falha o PR se houver problemas. Isso mantém o código limpo sem depender de disciplina individual.",
  },

  "f5-14": {
    what: "Saber pedir ajuda é uma habilidade técnica — não é fraqueza. A diferença entre um júnior que irrita a equipe e um que é adorado está em COMO pergunta. Uma boa pergunta inclui: contexto (o que você está tentando fazer), o que você já tentou, o erro exato (mensagem completa, não 'deu erro'), e a hipótese do que pode ser.",
    why: "Perguntar sem pesquisar primeiro desperdiça tempo do sênior e passa impressão de preguiça. Mas também: ficar travado por horas sem pedir ajuda quando alguém poderia resolver em 5 minutos desperdiça o tempo da empresa.",
    how: "Regra dos 30 minutos: tente resolver sozinho por 30 minutos. Se não chegou a lugar nenhum, pergunte. Ao perguntar: inclua o que tentou, o erro exato, e o código relevante. No Slack/Discord: use thread para não poluir o canal.",
    example: "# ❌ Pergunta ruim:\n'Oi, minha API não tá funcionando, o que pode ser?'\n\n# ✅ Pergunta boa:\n'Oi! Estou com problema ao configurar JWT no FastAPI.\nO que tentei: segui a documentação oficial e o tutorial X.\nO erro que aparece:\n  jose.exceptions.JWTError: Signature verification failed\n\nMeu código de verificação:\n  def verificar_token(token: str):\n      return jwt.decode(token, SECRET_KEY, algorithms=[ALGO])\n\nMinha hipótese: acho que pode ser a SECRET_KEY\nbeing different between when I sign and verify.\nJá confirmei que a variável de ambiente está carregada.\nAlguém já viu esse erro?'",
    tip: "O processo de escrever uma boa pergunta frequentemente resolve o problema antes de enviar — você organiza o pensamento e percebe o que estava errando. É chamado de 'rubber duck debugging': explicar o problema para um pato de borracha (ou qualquer pessoa/coisa).",
  },

  "f5-15": {
    what: "Documentação de software abrange: **README** (como instalar e usar o projeto), **comentários no código** (o PORQUÊ de decisões não óbvias), **docstrings** (o que uma função faz, parâmetros e retorno), **ADR** (Architecture Decision Records — registro de decisões arquiteturais importantes), e **changelogs** (o que mudou em cada versão).",
    why: "Código sem documentação é um ativo que se deprecia — ninguém consegue manter ou evoluir. Bons comentários explicam decisões que não são óbvias pelo código. Docstrings aparecem no autocomplete do IDE e em geradores de documentação automática.",
    how: "Python: use docstrings no formato Google ou NumPy. FastAPI gera documentação automática a partir das docstrings das rotas. TypeScript: use JSDoc para documentar funções públicas. Regra: comente o PORQUÊ, não o O QUÊ (o código já mostra o que faz).",
    example: '# ✅ Comentário útil — explica o PORQUÊ:\ndef calcular_desconto(usuario: Usuario, valor: float) -> float:\n    # Clientes VIP criados antes de 2023 têm regra de desconto\n    # diferente por contrato legado (ticket #1847).\n    # NÃO modificar sem consultar o jurídico.\n    if usuario.vip and usuario.criado_em.year < 2023:\n        return valor * 0.15\n    return valor * 0.10\n\n# ✅ Docstring informativa:\ndef paginar_resultados(\n    query,\n    pagina: int = 1,\n    itens_por_pagina: int = 20\n) -> dict:\n    """\n    Pagina uma query SQLAlchemy.\n\n    Args:\n        query: Query SQLAlchemy não executada.\n        pagina: Número da página (começa em 1).\n        itens_por_pagina: Máximo de itens por página (max: 100).\n\n    Returns:\n        Dict com \'items\', \'total\', \'pagina\', \'total_paginas\'.\n\n    Raises:\n        ValueError: Se pagina < 1 ou itens_por_pagina > 100.\n    """\n    ...',
    tip: "Mantenha documentação perto do código — docstrings no código, não num wiki separado. Documentação longe do código envelhece e fica desatualizada. Automatize: FastAPI gera Swagger, Sphinx gera docs HTML de docstrings Python.",
  },

  "f5-16": {
    what: "Code review é o processo de um desenvolvedor revisar o código de outro antes de fazer merge. O revisor verifica: lógica correta, segurança, performance, legibilidade, testes, e aderência aos padrões do time. Como autor: faça PRs pequenos e focados, descreva o que mudou e por quê. Como revisor: seja específico e construtivo, questione design não pessoalidade.",
    why: "Code review é onde a maioria do aprendizado acontece no trabalho. É também onde bugs são pegos antes de produção. Aprender a dar e receber feedback técnico de forma produtiva é uma das habilidades mais valiosas de um dev.",
    how: "Como autor: PR pequeno (< 400 linhas idealmente), descrição clara ('O que' e 'Por que'), contexto para decisões não óbvias, self-review antes de pedir revisão. Como revisor: diferencie blocking comments (precisa mudar) de suggestions (seria melhor, mas ok).",
    example: "# Comentário de review — exemplos bons e ruins:\n\n# ❌ Comentário ruim (atacante, impreciso):\n'Isso está errado'\n'Por que você fez assim?'\n\n# ✅ Comentário bom (específico, construtivo):\n'Essa query pode ser lenta com muitos registros.\nConsidere adicionar um índice em usuario_id, ou\nmudar para um JOIN que aproveite índices existentes.\nReferência: https://...'\n\n# ✅ Sugestão não-bloqueante:\n'Sugestão (não bloqueante): poderíamos usar list\ncomprehension aqui para ser mais pythônico:\n  return [item.nome for item in items]\nMas o que você escreveu está correto também.'\n\n# Descrição de PR bem escrita:\n## O que mudou\nAdiciona endpoint de busca de usuários com filtros.\n\n## Por que\nProduto pediu busca por nome e email (issue #234).\n\n## Decisões\nUsei ilike() em vez de like() para busca case-insensitive.\n\n## Como testar\n`POST /api/usuarios/busca` com body `{ 'q': 'ana' }`",
    tip: "Regra de ouro de code review: critique o código, nunca a pessoa. 'Esse loop poderia ser mais eficiente' vs 'Você não sabe escrever loops eficientes'. Um bom time tem cultura de review psicologicamente segura — onde erros são oportunidades de aprendizado, não julgamentos.",
  },

  "f5-17": {
    what: "Inglês técnico é a capacidade de ler documentação, artigos, erros e discussões técnicas em inglês — não necessariamente falar fluentemente. A grande maioria da documentação, Stack Overflow, GitHub Issues, artigos de blog técnicos e cursos de qualidade está em inglês. Não ler inglês limita drasticamente o acesso ao conhecimento.",
    why: "90% do conteúdo técnico de qualidade está em inglês. Devs que dependem de conteúdo traduzido ficam 1-2 anos atrás na curva de aprendizado. Em empresas internacionais ou remotas, inglês é requisito. No mercado brasileiro, inglês intermediário já é diferencial.",
    how: "Pratique lendo: comece pela documentação oficial das ferramentas que usa (Python, TypeScript, React). Leia mensagens de erro em inglês e pesquise soluções em inglês no Stack Overflow. Assista tutoriais sem legenda em inglês progressivamente.",
    example: "# Recursos para melhorar inglês técnico:\n\n# Leitura diária:\n# - Docs oficiais (docs.python.org, react.dev)\n# - Stack Overflow em inglês\n# - GitHub Issues e Pull Requests\n# - Dev.to, Medium (artigos técnicos)\n# - Hacker News (https://news.ycombinator.com)\n\n# Vocabulário técnico essencial para saber:\n# deprecated = descontinuado\n# breaking change = mudança que quebra compatibilidade\n# workaround = solução alternativa temporária\n# bottleneck = gargalo de performance\n# edge case = caso limite/extremo\n# idempotent = mesmo resultado independente de quantas vezes chama\n# payload = dados enviados/recebidos\n# scope = escopo\n# upstream/downstream = componente anterior/posterior no fluxo",
    tip: "Não precisa ser perfeito — precisa ser funcional. Objetivo mínimo: conseguir ler a documentação oficial e entender mensagens de erro sem precisar de tradução. Daqui para frente, force-se a pesquisar TUDO em inglês primeiro — é o jeito mais rápido de melhorar.",
  },
};
