export type ScenarioId = string;
export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ScenarioSummary {
  id: ScenarioId;
  title: string;
  domain: string;
  description: string;
  totalDays: 7;
}

export interface DaySummary {
  day: DayNumber;
  theme: string;
  completed: boolean;
}
