# 12. Architecture Decision Records

Architecture Decision Records (ADRs) document significant architectural decisions, their context, and rationale. ADRs are written when a decision is made and amended only when reversing the decision. New ADRs are appended; existing ADRs are not edited (history is preserved).

This section presents foundational ADRs that shape the architecture defined in earlier sections. Subsequent ADRs are appended to a separate ADR log.

---

## ADR-001: Modular Monolith over Microservices

**Status:** Accepted

### Context

LUMINA is at pre-seed scale with a small team. The system has clear bounded contexts (Scenario Engine, Persona System, etc.) but does not yet have the scale or team structure that justifies microservices.

### Decision

Build LUMINA as a modular monolith — a single deployable application with strict internal modularity. Components communicate via in-process function calls and an in-memory event bus. Deployment splits are an evolution decision, not a starting point.

### Consequences

- **Positive:** simpler operations, easier debugging, faster feature delivery, no distributed transaction complexity.
- **Positive:** strong modularity preserved at code level enables future extraction of services where justified.
- **Negative:** scaling individual components requires scaling the whole monolith; mitigated by component extraction when justified.
- **Negative:** requires team discipline to maintain module boundaries; mitigated by code review and architecture fitness functions.

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

## ADR-004: Next.js as Application Framework

**Status:** Accepted

### Context

LUMINA needs a full-stack web framework supporting server-side rendering (for SEO and performance), server components (for AI-heavy pages), API routes (for backend logic), and easy deployment.

### Decision

Build the web application using Next.js (App Router) with React. Single project containing user-facing apps and admin tools, with route-based separation.

### Consequences

- **Positive:** integrated full-stack experience reduces context switching for small team.
- **Positive:** Vercel deployment is one-click; managed infrastructure free tier sufficient for initial scale.
- **Negative:** Next.js framework opinionation; mitigated by following framework conventions rather than fighting them.
- **Negative:** hosted on Vercel, future migration to alternative hosting requires effort; mitigated by avoiding Vercel-specific features beyond standard Next.js.

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
