export type UserId = string;
export type TenantId = string;

export interface User {
  id: UserId;
  email: string;
  displayName: string;
  tenantId: TenantId;
  role: UserRole;
  createdAt: string; // ISO-8601
}

export type UserRole = "learner" | "parent" | "designer" | "operator" | "super_admin";
