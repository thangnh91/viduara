export type PersonaId = string;
export type PersonaRole = "mentor" | "buddy" | "antagonist" | "peer";

export interface PersonaSummary {
  id: PersonaId;
  name: string;
  role: PersonaRole;
  avatarUrl?: string;
}
