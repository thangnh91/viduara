# 5. Logical Architecture

This section describes LUMINA's internal structure as a layered architecture. The logical architecture is independent of physical deployment (covered in [Section 9](./09-deployment-architecture.md)) and technology choices (covered through ADRs in [Section 12](./12-adrs.md)). The same logical structure can be deployed as a monolith, modular monolith, or distributed services depending on operational maturity.

## 5.1 Layered Overview

LUMINA follows a four-layer architecture: Presentation, Application, Domain, and Infrastructure. Layers are strictly directional — upper layers depend on lower layers, never the reverse.

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                       PRESENTATION LAYER                                  ║
║  Web Apps (Next.js)    Mobile Apps (React Native)    Email/SMS Templates  ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                       APPLICATION LAYER                                   ║
║  API Gateway     Use Case Handlers     Workflow Orchestrators             ║
║  REST Endpoints  CQRS Commands/Queries  Event Handlers                    ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                          DOMAIN LAYER                                     ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐           ║
║  │  Scenario  │  │  Persona   │  │  Session   │  │  Knowledge │           ║
║  │   Engine   │  │   System   │  │  Lifecycle │  │ Management │           ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────┘           ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐           ║
║  │   Widget   │  │   Final    │  │  Identity  │  │  Tenancy   │           ║
║  │  Plugin    │  │   Report   │  │  & Access  │  │            │           ║
║  └────────────┘  └────────────┘  └────────────┘  └────────────┘           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                      INFRASTRUCTURE LAYER                                 ║
║  AI Provider    Database     Cache       Queue       Object     Search    ║
║  Abstraction    (Postgres)   (Redis)    (SQS/Kafka)  Storage    Index     ║
║                                                       (S3)                ║
║  Email/SMS      Payment      Auth Provider   Analytics   Observability    ║
║  Adapters       Adapters     Adapters        Pipeline    (Logs/Metrics)   ║
╚═══════════════════════════════════════════════════════════════════════════╝

                          DEPENDENCY DIRECTION
                                  │
                                  ▼ (always downward)
```

*Figure 5.1 LUMINA layered architecture*

## 5.2 Presentation Layer

The presentation layer renders user interfaces and translates user input into application-layer commands. It is intentionally thin — business logic lives in the domain layer, not in UI components.

### 5.2.1 Web Applications

Three logical web applications, deployed as one or multiple Next.js projects depending on deployment strategy:

- **Learner Web App** — Hub, Workspace, Final Report, Portfolio. Optimized for desktop/laptop.
- **Parent Web App** — Parent Dashboard, talking points, progress visibility. Mobile-responsive.
- **Internal Admin Web App** — Scenario Architect, Persona Studio, Widget Studio, Knowledge Vault, Analytics Dashboard, Session Replay, User Management, Role Management, Orchestrator Console.

> **ℹ️ Deployment Flexibility:** These three apps may share a single Next.js codebase with route-based separation, or be split into separate projects when teams scale. The logical separation is what matters; physical deployment is an evolution decision.

### 5.2.2 Mobile Applications

- **Learner Mobile App** — Hub, notifications, knowledge card review, Final Report reading. Workspace experience runs in WebView for content parity.
- **Parent Mobile App** — Parent Dashboard, push notifications, talking points, weekly summaries.

### 5.2.3 Communication Templates

- **Email templates** — transactional emails (signup, receipts, weekly summaries, milestone notifications).
- **SMS/Zalo templates** — short-form notifications (auth codes, day reminders, parent updates).
- **Push notification templates** — per-platform formatting for FCM/APNs.

## 5.3 Application Layer

The application layer orchestrates use cases by coordinating domain components, infrastructure adapters, and external integrations. It does not contain business rules — those live in the domain layer.

### 5.3.1 API Gateway

Single entry point for all external HTTP traffic. Responsibilities:

- Authentication and session validation.
- Rate limiting (per-user, per-tenant, per-endpoint).
- Request routing to appropriate handlers.
- Response shaping and error normalization.
- Tenancy resolution (which tenant context this request executes in).

### 5.3.2 Use Case Handlers

Each handler corresponds to a single user-facing operation. Handlers are organized by domain capability, not by HTTP path. Examples:

- `StartScenarioSession` — creates a new session, initializes day state, returns session context.
- `SendChatMessage` — accepts student input, invokes orchestration, streams persona response.
- `AdvanceScenarioDay` — validates day-completion, transitions session to next day.
- `GenerateFinalReport` — gathers session data, invokes Final Report generation, persists result.

### 5.3.3 Workflow Orchestrators

Multi-step workflows that coordinate domain components across time. These are distinct from synchronous use case handlers because they may span minutes to days.

- **Session Lifecycle Workflow** — manages day transitions, periodic check-ins, abandonment detection, completion celebration.
- **Final Report Generation Workflow** — triggers on Day 7 completion, gathers data, calls AI, generates assets, notifies user.
- **Onboarding Workflow** — first-time user setup, scenario recommendation, payment, account configuration.
- **Content Publication Workflow** — scenario/persona/widget submission, review, approval, deployment.

### 5.3.4 Event Handlers

React to domain events asynchronously. Events decouple producing and consuming components.

- `ScenarioCompleted` → triggers Final Report generation, parent notification, recommendation refresh.
- `StressLevelExceeded` → triggers Buddy intervention, optional safety check.
- `PersonaResponseGenerated` → triggers analytics event, cost tracking, quality monitoring.
- `AbandonmentDetected` → triggers re-engagement notifications, support outreach if persistent.

## 5.4 Domain Layer

The domain layer contains LUMINA's core business logic. It is independent of any specific UI, database, or external service. The domain layer is the most stable part of the architecture — UIs change, databases change, integrations change, but the rules of how scenarios work, how personas behave, how reports are constructed, change rarely.

### 5.4.1 Scenario Engine

The Scenario Engine is the heart of the platform's content runtime. Responsibilities:

- Load scenario definitions from the data layer.
- Manage 7-day arcs: day transitions, branch points, completion criteria, ending resolution.
- Coordinate the cast of personas active on each day.
- Configure the active widget for each day.
- Track scenario-level metrics (decisions made, time per day, stress events).
- Apply trigger logic — events that fire based on student actions, time, or external signals.

**Key Concepts:**

- **Scenario Definition:** Versioned, immutable artifact describing the full 7-day experience. Changes produce new versions; in-flight sessions continue on their original version.
- **Day:** One unit of scenario progression with a theme, goals, active personas, primary widget, available knowledge cards, triggers, and evaluation hooks.
- **Branch Point:** A moment in the scenario where student choice diverges the narrative. Different branches lead to different subsequent days or endings.
- **Ending:** One of five archetypes (Natural, Fighter, Wrong Fit, Reluctant, Burnout) determined by aggregate session metrics.
- **Trigger:** A rule that fires when conditions are met (time elapsed, stress level threshold, decision pattern). Triggers can spawn events, change persona priorities, or reveal scenario content.

### 5.4.2 Persona System

The Persona System represents AI characters as composable specifications and orchestrates their interaction with students. This is detailed in [Section 7](./07-ai-architecture.md); here we describe its position in the domain layer.

- Persona specifications follow a 5-layer model: Identity, Voice, Behavior, Knowledge, Constraints.
- Personas are composable — multiple personas can be active simultaneously in a scenario day.
- Persona behavior is influenced by scenario context (current day, stress level, recent decisions, time of day in scenario).
- Personas reference Knowledge Cards via the Knowledge Management subsystem.
- Persona quality is monitored continuously through evaluation pipelines.

### 5.4.3 Session Lifecycle

Manages the lifecycle of a single student's journey through one scenario.

- **Creation:** Initialize session state, persona casts, day-1 context, vitals.
- **Active:** Track messages, decisions, stress events, knowledge earned, time spent.
- **Day Transition:** Validate completion, update state, load next day's context.
- **Abandonment:** Detect inactivity, flag for re-engagement, optionally allow restart.
- **Completion:** Trigger Final Report generation, archive session for portfolio.
- **Replay:** Reconstruct historical session state for review or auditing.

### 5.4.4 Knowledge Management

The system that stores, versions, and retrieves expert-verified knowledge content.

- Atomic Knowledge Cards (one concept per card).
- Cross-domain organization (Software Engineering › Algorithms › Big O Notation).
- Version control with editorial workflow (draft → review → published).
- Expert verification metadata (verifier identity, verification date, expertise scope).
- Persona-knowledge linkage (which personas may reference which cards).
- Retrieval-Augmented Generation (RAG) infrastructure for runtime persona use.

### 5.4.5 Widget Plugin System

The infrastructure that lets domain-specific tools plug into the Workspace shell.

- Widget manifest specification (capabilities, configuration schema, event hooks).
- Widget loader and runtime sandbox.
- Widget-Workspace event bus (mount, unmount, suspend, resume, data sync).
- Widget catalog and version management.

### 5.4.6 Final Report Generation

The system that transforms a completed session into the structured 6-section report.

- Session data aggregation (messages, decisions, stress curve, knowledge earned).
- Cognitive matrix scoring (5 dimensions evaluated against domain benchmarks).
- Compatibility score calculation.
- Stress timeline reconstruction with key moment annotation.
- Narrative generation (4-year forecast, AI panel recommendations, parent letter).
- Report versioning (regeneration possible if scoring algorithm improves).

### 5.4.7 Identity and Access

User identity, authentication, authorization, and tenant association.

- User accounts with multiple authentication methods (email/password, OAuth, SSO).
- Role-based access control (RBAC) with the 8 standard roles plus custom roles.
- Permission-based authorization at the action level.
- Multi-tenant association (consumer tenant vs school tenants).
- Session and token lifecycle management.

### 5.4.8 Tenancy

Manages logical isolation between B2C consumers and B2B school customers.

- Tenant provisioning and lifecycle management.
- Tenant-scoped configuration (branding, available scenarios, custom personas).
- Tenant-scoped data isolation (queries automatically filter by tenant).
- Cross-tenant operations (only available to platform Super Admins).

## 5.5 Infrastructure Layer

The infrastructure layer abstracts external systems and platform capabilities behind interfaces consumed by the domain layer. This abstraction enables provider substitution, testing, and operational flexibility.

### 5.5.1 AI Provider Abstraction

Critical infrastructure that decouples LUMINA from any single AI provider. Exposes a uniform interface for chat completion (with streaming), structured output generation, and embedding. Multiple provider implementations behind this interface (Anthropic, OpenAI, future: open-weight models).

### 5.5.2 Database Adapter

Postgres-compatible relational database for transactional data. Domain repositories use this layer; domain logic does not see SQL.

### 5.5.3 Cache Adapter

Redis-compatible cache for session state, rate-limit counters, and frequently-accessed reference data. Used to reduce database load and accelerate hot paths.

### 5.5.4 Queue Adapter

Asynchronous job queue for long-running operations: Final Report generation, batch analytics, scheduled notifications.

### 5.5.5 Object Storage

Blob storage (S3-compatible) for static assets, generated PDFs, exported portfolios, screen recordings (where used).

### 5.5.6 Search Index

Full-text and vector search infrastructure (e.g., pgvector or dedicated service like Typesense/OpenSearch). Used for knowledge card retrieval (RAG), session search by operators, and content discovery.

### 5.5.7 Communication Adapters

Provider-specific implementations of email, SMS, push, and Zalo OA delivery. Domain code dispatches "send notification" to a generic interface; the adapter chooses the appropriate channel.

### 5.5.8 Payment Adapters

Per-provider integrations (Stripe, MoMo, VNPay, ZaloPay) behind a uniform Payment interface.

### 5.5.9 Auth Provider Adapters

Integrations with external identity providers: Google OAuth, Microsoft Azure AD, school-specific SAML, SCIM for user provisioning.

### 5.5.10 Observability Infrastructure

Structured logging, metrics, distributed tracing, error tracking. Aggregated into operational dashboards and alerting.

## 5.6 Cross-Component Communication

Components within the same layer communicate through well-defined contracts. Two patterns dominate:

- **Synchronous calls:** Direct method/function invocation within the application boundary. Used when the calling component needs the result to proceed (e.g., Use Case Handler invoking the Scenario Engine to load a session).
- **Asynchronous events:** Domain events published by one component and consumed by zero or more handlers. Used when the calling component does not need to wait for downstream effects (e.g., publishing `PersonaResponseGenerated` for analytics, cost tracking, and quality monitoring to consume independently).

> **ℹ️ Architecture Pattern: Modular Monolith**
> These components live in a single deployable application initially. They communicate via in-process function calls and an in-memory event bus. As load and team scale, hot components can be extracted into separate services without changing their interface. This is the modular monolith pattern — strict modularity at the code level, flexibility at the deployment level.

---

[← Previous: System Context](./04-system-context.md) · [Back to README](./README.md) · [Next: Data Architecture →](./06-data-architecture.md)
