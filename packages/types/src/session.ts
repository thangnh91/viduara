import type { DayNumber, ScenarioId } from "./scenario";
import type { UserId, TenantId } from "./identity";

export type SessionId = string;
export type SessionStatus = "active" | "completed" | "abandoned";

export interface Session {
  id: SessionId;
  userId: UserId;
  tenantId: TenantId;
  scenarioId: ScenarioId;
  currentDay: DayNumber;
  status: SessionStatus;
  stressLevel: number; // 0–100
  startedAt: string; // ISO-8601
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: SessionId;
  speaker: "student" | string; // persona name
  content: string;
  timestamp: string;
}
