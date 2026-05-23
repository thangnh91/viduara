# 12. Architecture Decision Records

Architecture Decision Records (ADRs) document significant architectural decisions, their context, and rationale. ADRs are written when a decision is made and amended only when reversing the decision. New ADRs are appended; existing ADRs are not edited (history is preserved).

This section presents foundational ADRs that shape the architecture defined in earlier sections. Subsequent ADRs are appended to a separate ADR log.

---

## ADR-001: Modular Monolith over Microservices

**Status:** Accepted (amended by ADR-011)

### Context

LUMINA is at pre-seed scale with a small team. The system has clear bounded contexts (Scenario Engine, Persona System, etc.) but does not yet have the scale or team structure that justifies microservices.

### Decision

Build LUMINA as a modular monolith — a single deployable application with strict internal modularity. Components communicate via in-process function calls and an in-memory event bus. Deployment splits are an evolution decision, not a starting point.

### Consequences

- **Positive:** simpler operations, easier debugging, faster feature delivery, no distributed transaction complexity.
- **Positive:** strong modularity preserved at code level enables future extraction of services where justified.
- **Negative:** scaling individual components requires scaling the whole monolith; mitigated by component extraction when justified.
- **Negative:** requires team discipline to maintain module boundaries; mitigated by code review and architecture fitness functions.

### Amendment (V0 Sprint — see ADR-011)

In V0, we chose a pnpm monorepo with separate `apps/web` (Next.js) and `apps/api` (Hono) rather than a single Next.js full-stack application. This is still a modular monolith at the domain layer — domain logic lives in `apps/api`, not split across services. The FE/BE separation is a deployment boundary, not a microservices split. ADR-001's intent (no distributed transactions, no service mesh, single team owns all code) is preserved.

---

## ADR-002: Anthropic Claude as Primary AI Provider

**Status:** Accepted

### Context

LUMINA's quality depends heavily on AI persona authenticity. The platform requires long-context conversation handling, structured output reliability, and multi-agent coordination. Several commercial LLM providers are available (Anthropic, OpenAI, Google, Mistral, Meta).

### Decision

Use Anthropic Claude as the primary AI provider. Use Claude Sonnet for persona conversations (cost-quality balance) and Claude Opus for Final Report generation (quality-critical). Maintain provider abstraction enabling fast failover to alternatives.

### Rationale

- Demonstrated quality in long-context, character-driven conversations relevant to LUMINA's use case.
- Strong structured output reliability via tool-use and structured generation features.
- Provider stability and clear product roadmap.
- Pricing competitive at expected usage volumes.

### Consequences

- **Positive:** highest quality available for the use case at launch time.
- **Negative:** dependency on a single provider's pricing, availability, and policy changes; mitigated by abstraction layer enabling rapid switching.

---

## ADR-003: Postgres as Primary Data Store

**Status:** Accepted

### Context

LUMINA's data is predominantly relational with strong transactional requirements (sessions, payments, audit logs). Some workloads have specialized needs: vector search for knowledge retrieval, time-series for analytics, document storage for messages.

### Decision

Use Postgres as the primary data store for relational, transactional, document (JSON), and vector (pgvector) data. Specialized stores added only when Postgres limitations are demonstrably hit.

### Rationale

- Single technology reduces operational burden for small team.
- Postgres extension ecosystem (pgvector, JSONB, time-series) covers diverse workloads.
- Mature managed offerings (Neon, Supabase, AWS RDS) eliminate self-hosting burden.
- Easy migration to dedicated stores later when justified by scale.

### Consequences

- **Positive:** operational simplicity, transactional consistency across all domains.
- **Negative:** Postgres is not optimal for very high write volume time-series or massive vector search; will require dedicated stores eventually.

---

## ADR-004: Next.js as Frontend Framework

**Status:** Amended (superseded in part by ADR-011)

### Context

LUMINA needs a web framework supporting server-side rendering (for SEO and performance), server components (for AI-heavy pages), and easy deployment.

### Original Decision

Build the web application using Next.js (App Router) with React as a full-stack framework including API routes.

### Amendment (V0 Sprint)

Next.js is used for the **frontend only** (`apps/web`). API routes are not used. Backend logic lives in a separate Hono + Node.js application (`apps/api`). See ADR-011 for rationale.

Next.js is still responsible for:

- All user-facing UI (App Router, RSC, Tailwind)
- Static asset serving
- Vercel deployment for the frontend

### Amended Consequences

- **Positive:** Next.js remains best-in-class for the frontend use case (SSR, RSC, Vercel integration).
- **Positive:** Backend is now independently deployable and not constrained by Vercel's Edge/Serverless runtime.
- **Negative:** Two deployment targets (Vercel for web, Railway/Render for api); mitigated by pnpm monorepo keeping code co-located.

---

## ADR-005: TypeScript for Application Code

**Status:** Accepted

### Decision

All application code in TypeScript with strict mode enabled. Type safety at all module boundaries. No use of `any` type except in clearly justified cases.

### Rationale

- Prevents large categories of bugs, especially in AI response parsing and structured output handling.
- Enables confident refactoring as the codebase grows.
- IDE support significantly improves developer productivity.
- Self-documenting types reduce documentation burden.

---

## ADR-006: Multi-Provider AI Abstraction from V0

**Status:** Accepted

### Context

AI provider dependency is the platform's largest technical risk. Pricing changes, model deprecations, or provider policy changes can directly impact business viability.

### Decision

Build AI Provider Gateway abstraction in V0, even though only one provider (Anthropic) is integrated initially. The abstraction is not added retroactively.

### Rationale

- Adding the abstraction later requires invasive changes to call sites throughout the codebase.
- V0 already needs to handle provider failures gracefully — the abstraction layer provides this naturally.
- Architectural insurance against provider risk; cost is small at V0, large later.

---

## ADR-007: Deterministic Orchestration, Not AI-Driven

**Status:** Accepted

### Context

Multi-agent orchestration could be implemented by having an AI "director" decide which persona responds. Alternative: deterministic rules driven by configuration.

### Decision

Implement orchestration as deterministic logic with configuration-driven priority matrices. AI is used only for natural language generation, not for routing or coordination decisions.

### Rationale

- Designers can predict and reason about scenario behavior; using AI to drive AI creates unpredictable behavior.
- Cost: orchestration runs on every message; using AI here would multiply token costs.
- Latency: deterministic logic runs in milliseconds; AI orchestration would add seconds.
- Quality assurance: testable, debuggable, observable. AI orchestration is opaque.

---

## ADR-008: Single Deployment Region Initially

**Status:** Accepted

### Context

Vietnamese users connect from Vietnam. Default Vercel region is US East. Round-trip latency adds ~200ms. Multi-region deployment is operationally complex.

### Decision

Deploy to single US East region initially. Defer multi-region until specific business case justifies operational investment.

### Rationale

- AI inference latency (1–5 seconds) dominates user-perceived latency; saving 200ms on round-trips provides minor UX improvement.
- Static assets served from Vercel Edge Network globally; user-perceived load times acceptable.
- Multi-region operational complexity (data replication, region failover, deployment coordination) outweighs benefit at current scale.

### Reconsider When

- Vietnamese user count exceeds 50,000 monthly active and latency complaints emerge.
- B2B contracts require regional data residency.
- Regulatory environment shifts to require local hosting.

---

## ADR-009: Zustand and React Query for State

**Status:** Accepted

### Decision

Use Zustand for ephemeral UI state (current chat input, stress meter visualization, modal open/closed) and React Query (TanStack Query) for server state caching. Avoid Redux except for specific components if their complexity demands it.

### Rationale

- Zustand is lightweight; minimal boilerplate compared to Redux.
- React Query handles server-state concerns (caching, refetching, optimistic updates) better than custom solutions.
- Combination covers all needs without imposing unnecessary architecture on simple components.

---

## ADR-010: All Content Versioned and Immutable on Publish

**Status:** Accepted

### Context

Scenarios, personas, and knowledge cards evolve over time. In-flight sessions could break or behave unexpectedly if content changes underneath them.

### Decision

All published content is immutable. Editing produces a new version. Sessions reference the version they started with; updates do not propagate to in-flight sessions. Authors can always see and edit drafts; only published versions are immutable.

### Consequences

- **Positive:** session integrity guaranteed across the 7-day arc.
- **Positive:** audit trail of content changes; ability to compare versions.
- **Negative:** storage cost grows with version count; mitigated by archival policies after content is unused for extended periods.

---

## ADR-011: pnpm Monorepo with Separate Frontend and Backend Apps

**Status:** Accepted

### Context

The original architecture assumed a Next.js full-stack monolith (TAD ADR-004). During V0 sprint setup, the team decided to separate frontend and backend concerns to avoid coupling them to the same framework and deployment target.

Specific concerns with the full-stack Next.js approach:

- Backend AI streaming logic is poorly served by Vercel Edge/Serverless runtimes (cold starts, execution time limits).
- Next.js API routes mix frontend and backend concerns in the same project, making layer boundaries harder to enforce.
- A future mobile app would need to call the same API — a dedicated API server is the natural fit.

### Decision

Structure the codebase as a **pnpm monorepo** with:

- `apps/web` — Next.js 16 (App Router), frontend only, deployed to Vercel
- `apps/api` — Hono + Node.js, all backend/API logic, deployed to Railway or Render
- `packages/types` — shared TypeScript types consumed by both apps
- `packages/config` — shared tsconfig and eslint configs

### Rationale

- **Separation of deployment targets:** backend runs as a long-lived Node.js process on Railway; frontend deploys to Vercel CDN. Each is independently scalable.
- **Framework freedom:** `apps/api` is not constrained by Next.js conventions or Vercel's runtime limits. Hono is lightweight and TypeScript-first.
- **Mobile readiness:** `apps/api` is an HTTP API from day one. A future `apps/mobile` (React Native) calls the same endpoints without any backend changes.
- **Monorepo cohesion:** despite separate apps, all code lives in one repository. Shared types prevent drift between FE and BE. One `pnpm install`, one CI pipeline.
- **Migration path to microservices:** domain logic in `apps/api/src/domain/` is framework-agnostic. If a bounded context needs to be extracted as a microservice in V2+, it is a deployment concern, not a rewrite.

### Consequences

- **Positive:** Backend can use long-running Node.js processes; AI streaming is not constrained by Vercel's 60s function timeout.
- **Positive:** Clear API contract boundary; frontend is a pure consumer of the HTTP API.
- **Positive:** Future mobile app (`apps/mobile`) can reuse `packages/types` and call the same `apps/api` endpoints.
- **Negative:** Two deployment targets to manage (Vercel + Railway); mitigated by having both under one repo and one CI workflow.
- **Negative:** Local dev requires starting two servers; mitigated by `pnpm dev` at root running both in parallel.

---

## ADR Template (For Future Decisions)

When adding new ADRs, follow this template:

```markdown
## ADR-NNN: [Decision Title]

**Status:** [Proposed | Accepted | Deprecated | Superseded by ADR-XXX]

### Context

[What is the issue we're seeing that is motivating this decision?]

### Decision

[What is the change we're proposing or have agreed to?]

### Rationale

[Why this decision over alternatives?]

### Consequences

- **Positive:** [What becomes easier?]
- **Negative:** [What becomes harder? How is it mitigated?]

### Reconsider When

[Optional: signals that should trigger revisiting this decision]
```

---

[← Previous: Quality Attributes](./11-quality-attributes.md) · [Back to README](./README.md)
