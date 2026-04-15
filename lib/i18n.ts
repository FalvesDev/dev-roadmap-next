export type Locale = "pt" | "en";

export const translations = {
  pt: {
    // Hero
    heroTag:       "Roadmap 2025 · Python & TypeScript",
    heroTitle1:    "Do zero ao dev júnior",
    heroTitle2:    "em 9 meses.",
    heroDesc:      "Módulos semana a semana, checklist interativo com explicações completas, 110+ recursos curados e trilha de carreira. Tudo que precisa, na ordem certa.",

    // Quick actions
    actionFlashcard:  "Revisão rápida",
    actionPomodoro:   "Pomodoro",
    actionNotes:      "Minhas notas",
    actionExport:     "Exportar imagem",
    actionBackup:     "Backup / Restore",
    actionShare:      "Compartilhar perfil",
    actionActivity:   "Histórico",
    actionQuiz:       "Quiz",
    actionCert:       "Certificado",
    actionAchievements: "Conquistas",

    // Dividers
    divModules:    "Módulos de aprendizado",
    divProjects:   "Projetos guiados",
    divProgress:   "Seu progresso",
    divArch:       "Arquitetura, redes & lógica",
    divMaterials:  "Materiais de estudo",
    divGlossary:   "Glossário técnico",
    divInterview:  "Prep para entrevista",
    divCareer:     "Mercado de trabalho",
    divTips:       "Dicas e referência",

    // Sidebar sections
    navStart:      "Início",
    navLearn:      "Aprender",
    navMaterials:  "Materiais",
    navCareer:     "Carreira",
    navOverview:   "Visão geral",
    navProgress:   "Progresso",
    navModules:    "Módulos",
    navProjects:   "Projetos guiados",
    navArch:       "Arquitetura & Redes",
    navArticles:   "Artigos & Vídeos",
    navLinks:      "Links curados",
    navGlossary:   "Glossário",
    navInterview:  "Prep entrevista",
    navMarket:     "Mercado de trabalho",
    navTips:       "Dicas & Referência",

    // Footer
    footer: "Dev Roadmap · Python 3.12 · TypeScript 5 · Node 20 · 2025",

    // Buttons
    btnSave:    "Salvar",
    btnClose:   "Fechar",
    btnCancel:  "Cancelar",
    btnNext:    "Próxima",
    btnCopy:    "Copiar",
    btnCopied:  "Copiado!",
    btnDownload:"Baixar PNG",
    btnGenerate:"Gerar certificado",
    btnRestore: "Restaurar",

    // Language toggle
    langToggle: "EN",
  },
  en: {
    // Hero
    heroTag:       "Roadmap 2025 · Python & TypeScript",
    heroTitle1:    "From zero to junior dev",
    heroTitle2:    "in 9 months.",
    heroDesc:      "Week-by-week modules, interactive checklist with full explanations, 110+ curated resources and career track. Everything you need, in the right order.",

    // Quick actions
    actionFlashcard:  "Flashcards",
    actionPomodoro:   "Pomodoro",
    actionNotes:      "My notes",
    actionExport:     "Export image",
    actionBackup:     "Backup / Restore",
    actionShare:      "Share profile",
    actionActivity:   "Activity",
    actionQuiz:       "Quiz",
    actionCert:       "Certificate",
    actionAchievements: "Achievements",

    // Dividers
    divModules:    "Learning modules",
    divProjects:   "Guided projects",
    divProgress:   "Your progress",
    divArch:       "Architecture, networks & logic",
    divMaterials:  "Study materials",
    divGlossary:   "Technical glossary",
    divInterview:  "Interview prep",
    divCareer:     "Job market",
    divTips:       "Tips & reference",

    // Sidebar sections
    navStart:      "Start",
    navLearn:      "Learn",
    navMaterials:  "Materials",
    navCareer:     "Career",
    navOverview:   "Overview",
    navProgress:   "Progress",
    navModules:    "Modules",
    navProjects:   "Guided projects",
    navArch:       "Architecture & Networks",
    navArticles:   "Articles & Videos",
    navLinks:      "Curated links",
    navGlossary:   "Glossary",
    navInterview:  "Interview prep",
    navMarket:     "Job market",
    navTips:       "Tips & Reference",

    // Footer
    footer: "Dev Roadmap · Python 3.12 · TypeScript 5 · Node 20 · 2025",

    // Buttons
    btnSave:    "Save",
    btnClose:   "Close",
    btnCancel:  "Cancel",
    btnNext:    "Next",
    btnCopy:    "Copy",
    btnCopied:  "Copied!",
    btnDownload:"Download PNG",
    btnGenerate:"Generate certificate",
    btnRestore: "Restore",

    // Language toggle
    langToggle: "PT",
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;
