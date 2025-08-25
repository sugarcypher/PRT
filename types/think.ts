export interface ThinkCriteria {
  true: boolean;
  helpful: boolean;
  important: boolean;
  necessary: boolean;
  kind: boolean;
}

export interface ThinkEvaluation {
  id: string;
  text: string;
  criteria: ThinkCriteria;
  percentage: number;
  timestamp: Date;
  canDelete: boolean;
}

export interface KeepToYourselfStats {
  totalKeepToYourself: number;
  overallScore: number;
  recentTrend: 'improving' | 'declining' | 'stable';
}

export interface ProgressionState {
  startDate: Date;
  consecutiveDays: number;
  lastActiveDate: Date | null;
  pleaseUnlocked: boolean;
  reallyUnlocked: boolean;
}

export const CRITERIA_LABELS = {
  true: "True",
  helpful: "Helpful",
  important: "Important",
  necessary: "Necessary",
  kind: "Kind"
} as const;

export const CRITERIA_DESCRIPTIONS = {
  true: "Is it factually accurate and honest?",
  helpful: "Will it help or benefit someone?",
  important: "Does it matter in the bigger picture?",
  necessary: "Does it need to be said right now?",
  kind: "Is it compassionate and considerate?"
} as const;