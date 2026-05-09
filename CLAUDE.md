# CLAUDE.md

> **This file is read by Claude Code at the start of every session. Keep it focused, current, and actionable.**

## Project: LUMINA

LUMINA is a career pre-experience EdTech platform for Vietnamese high school students. Students "live" a career for 7 days through AI-powered simulation before committing to a university major. After completing a 7-day scenario, they receive an AI-generated Career-Fit Report.

**Current Phase:** V0 (MVP for design competition + small beta of 50 users)
**Timeline:** 5 weeks
**Stack:** Next.js 15 + TypeScript strict + Postgres (Neon) + Anthropic Claude API + Vercel

## Critical Documents (Read These Before Coding)

When starting any task, reference these documents:

- **Architecture (the "what"):** `/docs/architecture/` — Technical Architecture Document. The mature target architecture.
- **Phasing (the "when"):** `/docs/roadmap/` — Roadmap & Implementation Phases. Which components in V0 vs V1+.
- **V0 Scope (the "now"):** `/docs/mvp-v0/` — MVP V0 Scope Definition. Exactly what to build in this phase.
- **Coverage Matrix:** `/docs/roadmap/06-coverage-matrix.md` — Quick lookup: is component X built or stubbed in V0?

If any task seems to conflict with these documents, **STOP and ask the human supervisor**. Do not improvise architecture.

## Architectural Principles (NON-NEGOTIABLE)

These principles override convenience. Violating them creates technical debt that costs more than the time saved.

### 1. Layer Boundaries (TAD §5)

Strict 4-layer architecture: Presentation → Application → Domain → Infrastructure. Dependencies flow downward only.

- **Presentation** (UI components): Calls Application layer only. NEVER calls Database, AI, or external services directly.
- **Application** (use case handlers, API routes): Orchestrates Domain components. NEVER contains business rules.
- **Domain** (business logic): Pure logic. NEVER imports from Infrastructure directly. Uses interfaces.
- **Infrastructure** (DB, AI, email adapters): Implements interfaces defined in Domain. Knows about external systems.

**Folder structure must reflect this:**

```
src/
  presentation/     ← UI components, pages
  application/      ← API routes, use cases, workflows
  domain/           ← Business logic, entities, interfaces
    scenario/
    persona/
    session/
    knowledge/
    widget/
    final-report/
    identity/
    tenancy/
  infrastructure/   ← Adapters: AI provider, DB, email, etc.
    ai/
    database/
    email/
    cache/
```

### 2. AI Calls MUST Go Through Provider Gateway

NEVER call Anthropic SDK directly from any feature code.

```typescript
// ❌ WRONG — direct SDK usage
import Anthropic from "@anthropic-ai/sdk";
const client = new Anthropic();
const response = await client.messages.create({...});

// ✅ CORRECT — through gateway
import { aiGateway } from "@/infrastructure/ai/gateway";
const response = await aiGateway.complete({
  model: "claude-sonnet",
  systemPrompt,
  messages,
});
```

The gateway exists in `src/infrastructure/ai/gateway.ts`. If it doesn't exist yet, create it before writing any AI feature.

**Reason:** TAD ADR-006 mandates multi-provider abstraction from V0. Direct SDK calls make V1 (adding OpenAI fallback) painful.

### 3. Database Access ONLY Through Drizzle ORM

NEVER write raw SQL except in migration files.

```typescript
// ❌ WRONG
const result = await db.execute(sql`SELECT * FROM sessions WHERE user_id = ${userId}`);

// ✅ CORRECT
const sessions = await db.select().from(sessionsTable).where(eq(sessionsTable.userId, userId));
```

### 4. Tenant Scoping (Even in V0)

Even though V0 has only the consumer tenant, **every query that reads user-owned data must filter by tenant_id**.

```typescript
// ❌ WRONG — works in V0 but breaks V1 when B2B tenants added
const sessions = await db.select().from(sessionsTable).where(eq(sessionsTable.userId, userId));

// ✅ CORRECT
const sessions = await db.select().from(sessionsTable).where(
  and(
    eq(sessionsTable.userId, userId),
    eq(sessionsTable.tenantId, currentTenantId)
  )
);
```

Use the `withTenantScope()` helper if/when it exists.

### 5. TypeScript Strict — No `any`

`tsconfig.json` has `"strict": true`. Do not use `any` to silence errors. Use `unknown` and narrow with type guards.

If a third-party library has bad types, create a typed wrapper, don't pollute the codebase with `any`.

### 6. Error Handling on Every External Call

Every call to external systems (AI, DB, email, payment) must have explicit error handling:

```typescript
// ❌ WRONG
const result = await aiGateway.complete({...});
return result.text;

// ✅ CORRECT
try {
  const result = await aiGateway.complete({...});
  return result.text;
} catch (error) {
  logger.error("AI completion failed", { error, context: {...} });
  throw new AICompletionError("Failed to generate response", { cause: error });
}
```

Custom error classes in `src/domain/errors/`. Use them.

### 7. Server-Side Permission Checks

Never trust client-side authorization. Every API endpoint must verify user permissions before executing.

```typescript
// In API route handler
export async function POST(req: Request) {
  const user = await requireAuth(req);
  if (!hasPermission(user, "scenario.start")) {
    return new Response("Forbidden", { status: 403 });
  }
  // ... proceed
}
```

### 8. No Secrets in Code

Never commit API keys, passwords, or tokens. Always use `process.env.X` with validation in `src/config/env.ts`.

If you find a secret accidentally committed, **STOP, alert the human, rotate the secret, history-rewrite the commit.**

## Coding Conventions

### File naming
- React components: `PascalCase.tsx` (e.g., `WorkspaceShell.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-stress-level.ts`)
- API routes: Next.js convention (`route.ts`)
- Tests: `<file>.test.ts` colocated with source

### Imports
- Absolute imports via `@/` alias (e.g., `import { x } from "@/domain/scenario"`)
- Group order: external → internal → relative
- No wildcard imports (`import *`)

### Comments
- Comments explain **why**, not **what**
- Avoid comments that restate code
- TODO comments must include issue reference: `// TODO(#123): ...`

### State management
- Server state: React Query (TanStack Query)
- Ephemeral UI state: Zustand
- No Redux unless specifically justified

## Forbidden Patterns

These patterns are explicitly forbidden in this codebase:

- ❌ Calling AI providers directly (use Gateway)
- ❌ Raw SQL outside migrations (use Drizzle)
- ❌ `any` type to silence errors
- ❌ Client-side-only authorization checks
- ❌ Hardcoded secrets or API keys
- ❌ Disabling tests to make CI pass
- ❌ `// @ts-ignore` without justification comment
- ❌ Storing chat content in `localStorage` (it's confidential per TAD §6.5)
- ❌ Accessing other users' data without explicit permission check
- ❌ Cross-layer imports (e.g., Presentation importing Infrastructure)

## Test Commands

Before claiming a task is "done", run:

```bash
pnpm typecheck        # TypeScript strict check
pnpm lint             # ESLint
pnpm test             # Vitest unit tests
pnpm test:e2e         # Playwright E2E (only for major features)
```

All must pass. If any fail, fix before opening PR.

## Common Gotchas

### Anthropic Streaming
- Use Vercel AI SDK's `streamText`, not raw SDK streaming
- Streams must complete before saving messages to DB (use `onFinish` callback)

### Drizzle Migrations
- Schema changes require new migration via `pnpm db:generate`
- Migrations must be backward-compatible (TAD §3.4.2 — zero-downtime deploys)
- Test migrations on a copy of production data before applying

### Vercel Deployment
- Environment variables MUST be set in Vercel dashboard for both Preview and Production
- Edge functions have 50ms cold start; AI streaming should use Node runtime, not Edge

### Time Zones
- All timestamps stored as UTC in DB (Postgres `timestamp` type, not `timestamp without time zone`)
- Convert to Asia/Ho_Chi_Minh only at display layer

## When to Stop and Ask the Human

Pause and ask the human supervisor if:

1. A task seems to conflict with TAD or MVP V0 Scope documents
2. You need to introduce a new dependency (npm package)
3. You need to make an architectural decision not covered by existing ADRs
4. You discover a security issue or potential data leak
5. A test failure suggests a deeper issue, not a quick fix
6. You're about to delete or rewrite > 100 lines of existing code
7. The task could affect billing/cost (e.g., new AI calls in hot path)
8. You're not sure whether a feature is in V0 scope or deferred

Better to ask and wait 1 hour than to spend 4 hours building the wrong thing.

## Communication Style for PRs

When opening a PR:

- **Title:** Imperative mood, ≤72 chars (e.g., "Add magic link authentication")
- **Body:** Structured per `.github/PULL_REQUEST_TEMPLATE.md`
- **Reference:** Always cite the TAD section and MVP V0 feature ID being implemented
- **Checklist:** Complete the [Definition of Done checklist](../docs/claude-code/definition-of-done.md)

## Current Sprint Focus

**Week 1 (Days 1-7):** Foundation + Persona Quality
- Days 1-2: Project setup, infrastructure, deploy hello-world
- Days 3-5: Mr. Alpha persona iteration (HUMAN-LED, not Claude Code)
- Day 6: Magic link auth
- Day 7: Chip persona

**Note:** Persona prompt iteration (Days 3-5) is led by the human, not Claude Code. Claude Code can help format and validate prompts but should not author personas autonomously. Persona quality is too subjective and culturally-dependent for autonomous AI work.

## Document Maintenance

Update this CLAUDE.md when:
- A new architectural pattern is established
- A new "common gotcha" is discovered (don't let the next contributor hit the same issue)
- The current sprint focus changes
- A new forbidden pattern emerges

Do NOT update this CLAUDE.md for:
- Routine feature additions (covered by per-feature documentation)
- Bug fixes
- Cosmetic changes

---

**Last updated:** [DATE]
**Maintained by:** [HUMAN SUPERVISOR NAME]
