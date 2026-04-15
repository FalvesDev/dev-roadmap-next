export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  check: (state: AchievementState) => boolean;
}

export interface AchievementState {
  totalChecked: number;
  totalItems: number;
  currentStreak: number;
  bestStreak: number;
  totalStudyDays: number;
  pomodorosTotal: number;
  notesCount: number;
  phasesCompleted: number; // phases at 100%
  projectTasksDone: number;
  flashcardSessions: number;
}

export const achievements: Achievement[] = [
  {
    id: "first-check",
    title: "Primeiro passo",
    description: "Marque seu primeiro item no checklist",
    icon: "✅",
    color: "#34d399",
    check: (s) => s.totalChecked >= 1,
  },
  {
    id: "week-one",
    title: "Uma semana",
    description: "Estude 7 dias no total",
    icon: "📅",
    color: "#60a5fa",
    check: (s) => s.totalStudyDays >= 7,
  },
  {
    id: "streak-3",
    title: "Em chamas",
    description: "Mantenha um streak de 3 dias seguidos",
    icon: "🔥",
    color: "#f97316",
    check: (s) => s.currentStreak >= 3,
  },
  {
    id: "streak-7",
    title: "Semana perfeita",
    description: "7 dias de streak seguidos",
    icon: "🌟",
    color: "#fbbf24",
    check: (s) => s.currentStreak >= 7,
  },
  {
    id: "streak-30",
    title: "Mês dedicado",
    description: "30 dias de streak seguidos",
    icon: "💎",
    color: "#a78bfa",
    check: (s) => s.currentStreak >= 30,
  },
  {
    id: "quarter",
    title: "25% do roadmap",
    description: "Complete 25% de todos os itens",
    icon: "🗺️",
    color: "#7c6af7",
    check: (s) => s.totalChecked / s.totalItems >= 0.25,
  },
  {
    id: "half",
    title: "Na metade!",
    description: "Complete 50% de todos os itens",
    icon: "⚡",
    color: "#f59e0b",
    check: (s) => s.totalChecked / s.totalItems >= 0.5,
  },
  {
    id: "three-quarters",
    title: "Quase lá",
    description: "Complete 75% de todos os itens",
    icon: "🚀",
    color: "#fb923c",
    check: (s) => s.totalChecked / s.totalItems >= 0.75,
  },
  {
    id: "complete",
    title: "Dev Júnior!",
    description: "Complete 100% do roadmap",
    icon: "🏆",
    color: "#fbbf24",
    check: (s) => s.totalChecked >= s.totalItems && s.totalItems > 0,
  },
  {
    id: "first-phase",
    title: "Fase 1 concluída",
    description: "Complete todos os itens da primeira fase",
    icon: "🎓",
    color: "#34d399",
    check: (s) => s.phasesCompleted >= 1,
  },
  {
    id: "three-phases",
    title: "Meio caminho andado",
    description: "Conclua 3 fases do roadmap",
    icon: "🏅",
    color: "#60a5fa",
    check: (s) => s.phasesCompleted >= 3,
  },
  {
    id: "pomodoro-first",
    title: "Primeiro pomodoro",
    description: "Complete sua primeira sessão de foco",
    icon: "🍅",
    color: "#ef4444",
    check: (s) => s.pomodorosTotal >= 1,
  },
  {
    id: "pomodoro-10",
    title: "Focado",
    description: "Complete 10 sessões pomodoro",
    icon: "⏱️",
    color: "#f97316",
    check: (s) => s.pomodorosTotal >= 10,
  },
  {
    id: "note-taker",
    title: "Anotador",
    description: "Crie 5 notas em itens do checklist",
    icon: "📝",
    color: "#818cf8",
    check: (s) => s.notesCount >= 5,
  },
  {
    id: "project-first",
    title: "Mão na massa",
    description: "Conclua sua primeira tarefa de projeto guiado",
    icon: "🔨",
    color: "#a78bfa",
    check: (s) => s.projectTasksDone >= 1,
  },
  {
    id: "project-10",
    title: "Construtor",
    description: "Conclua 10 tarefas de projetos guiados",
    icon: "🏗️",
    color: "#7c6af7",
    check: (s) => s.projectTasksDone >= 10,
  },
];
