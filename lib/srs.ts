/**
 * SM-2 Spaced Repetition Algorithm
 * https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 *
 * Quality ratings:
 *   5 = perfect recall
 *   4 = correct with hesitation  ("Sabia!")
 *   2 = incorrect but easy to recall ("Difícil")
 *   0 = complete blackout          ("Não sabia")
 */

export const SRS_KEY = "roadmap_srs_v1";

export interface CardState {
  id: string;
  repetitions: number;   // number of times reviewed with quality >= 3
  interval: number;      // days until next review
  easeFactor: number;    // starts at 2.5
  dueDate: string;       // ISO date YYYY-MM-DD
  lastReviewed: string;  // ISO date YYYY-MM-DD
  totalReviews: number;
}

export type SRSQuality = 0 | 2 | 4;

const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Apply SM-2 to a card and return the updated state */
export function applyReview(card: CardState, quality: SRSQuality): CardState {
  const t = today();
  let { repetitions, interval, easeFactor } = card;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0)       interval = 1;
    else if (repetitions === 1)  interval = 6;
    else                         interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    // Incorrect — reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  const q = quality;
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  easeFactor = Math.max(MIN_EASE, easeFactor);

  return {
    ...card,
    repetitions,
    interval,
    easeFactor,
    dueDate: addDays(t, interval),
    lastReviewed: t,
    totalReviews: card.totalReviews + 1,
  };
}

/** Load all SRS states from localStorage */
export function loadSRS(): Record<string, CardState> {
  try {
    return JSON.parse(localStorage.getItem(SRS_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Save all SRS states */
export function saveSRS(states: Record<string, CardState>): void {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(states));
  } catch { /* ignore */ }
}

/** Get or create a card state */
export function getCard(id: string, states: Record<string, CardState>): CardState {
  return states[id] ?? {
    id,
    repetitions: 0,
    interval: 1,
    easeFactor: DEFAULT_EASE,
    dueDate: today(),
    lastReviewed: "",
    totalReviews: 0,
  };
}

/** Returns cards due today or overdue, sorted by urgency */
export function getDueCards(ids: string[], states: Record<string, CardState>): CardState[] {
  const t = today();
  return ids
    .map(id => getCard(id, states))
    .filter(c => c.dueDate <= t)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/** Returns new cards never reviewed */
export function getNewCards(ids: string[], states: Record<string, CardState>): CardState[] {
  return ids
    .map(id => getCard(id, states))
    .filter(c => c.totalReviews === 0);
}

/** Stats summary */
export function getSRSStats(ids: string[], states: Record<string, CardState>) {
  const t = today();
  const all = ids.map(id => getCard(id, states));
  return {
    total:    ids.length,
    due:      all.filter(c => c.dueDate <= t && c.totalReviews > 0).length,
    newCards: all.filter(c => c.totalReviews === 0).length,
    learned:  all.filter(c => c.totalReviews > 0).length,
    mature:   all.filter(c => c.interval >= 21).length,
  };
}

/** Label for next review */
export function nextReviewLabel(card: CardState): string {
  const t = today();
  if (card.dueDate <= t) return "Hoje";
  const diff = Math.round((new Date(card.dueDate).getTime() - new Date(t).getTime()) / 86400000);
  if (diff === 1) return "Amanhã";
  if (diff < 7)  return `Em ${diff} dias`;
  if (diff < 30) return `Em ${Math.round(diff / 7)} sem.`;
  return `Em ${Math.round(diff / 30)} mes.`;
}
