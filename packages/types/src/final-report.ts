import type { SessionId } from "./session";

export interface FinalReport {
  id: string;
  sessionId: SessionId;
  compatibilityScore: number; // 0–100
  cognitiveMatrix: CognitiveMatrix;
  stressTimeline: StressPoint[];
  fourYearForecast: FourYearForecast;
  aiPanelRecommendations: AIPanelRecommendations;
  parentInsight: string;
  generatedAt: string; // ISO-8601
}

export interface CognitiveMatrix {
  problemSolving: number;
  technicalLearning: number;
  stressResilience: number;
  collaboration: number;
  persistence: number;
}

export interface StressPoint {
  day: number;
  hour: number;
  level: number; // 0–100
  trigger?: string;
}

export interface FourYearForecast {
  yearOneTwo: string;
  yearThreeFour: string;
  postGraduate: string;
}

export interface AIPanelRecommendations {
  tierA: Recommendation[]; // High match
  tierB: Recommendation[]; // Adjacent
  tierX: Recommendation[]; // Avoid
}

export interface Recommendation {
  field: string;
  reasoning: string;
}
