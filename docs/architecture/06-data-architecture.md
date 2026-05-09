# 6. Data Architecture

This section describes the platform's data: what entities exist, how they relate, who owns them, and how they evolve. The data architecture is independent of database technology — the same model could be implemented in Postgres, MySQL, or alternative stores. Storage technology choice is captured as an ADR in [Section 12](./12-adrs.md).

## 6.1 Data Model Overview

LUMINA's data divides into four categories with distinct lifecycles, ownership, and governance requirements:

- **Identity Data:** User accounts, credentials, profiles, consent records. Owned by Identity & Access component. Subject to PDPD/GDPR.
- **Content Data:** Scenario definitions, persona specifications, widget manifests, knowledge cards. Owned by content authoring tools. Versioned.
- **Session Data:** Active and historical sessions, messages, decisions, stress events, vitals. Owned by Session Lifecycle. High-volume.
- **Operational Data:** Analytics events, audit logs, cost tracking, system metrics. Owned by Observability. Append-only.

## 6.2 Core Entities

### 6.2.1 Identity Domain

| Entity | Description and Key Attributes |
|:-------|:-------------------------------|
| **User** | Represents a real human. Holds identity (email, phone, display name), authentication credentials (hashed), profile (role, locale, age), consent records, account status. Foundation for all other user-related data. |
| **Tenant** | A workspace boundary. Consumer tenant for B2C; one tenant per B2B school customer. Holds branding, contracted scenarios, custom personas, billing relationship. |
| **UserTenantMembership** | Many-to-many: a user can belong to multiple tenants (e.g., student in school tenant + personal consumer account). Holds role within tenant, assignment date. |
| **Role** | A named bundle of permissions. Standard roles (Learner, Parent, Designer, etc.) plus tenant-specific custom roles. |
| **Permission** | A grantable atomic capability (e.g., `scenario.create`, `knowledge.publish`, `session.replay.full`). Permissions compose into roles. |
| **Consent** | Records of user consent to data processing scopes. Versioned (consent forms can change), revocable. Required for PDPD compliance. |
| **ParentChildLink** | Verified relationship between a parent account and a minor child account. Source of parental visibility permissions. |

### 6.2.2 Content Domain

| Entity | Description and Key Attributes |
|:-------|:-------------------------------|
| **Scenario** | A 7-day immersive arc. Holds metadata (title, description, domain, target audience) and references the days, personas, widgets, and knowledge cards it uses. |
| **ScenarioVersion** | Immutable snapshot of a scenario at publication time. In-flight sessions reference a specific version; new sessions use the latest published version. |
| **Day** | One day within a scenario. Theme, goals, active persona cast, primary widget, knowledge cards, triggers, completion criteria, evaluation hooks. |
| **BranchPoint** | A decision point within a day where student choice affects subsequent narrative. Holds choice options and routing rules. |
| **Ending** | One of five archetype outcomes (Natural, Fighter, Wrong Fit, Reluctant, Burnout). Holds narrative templates and triggering criteria. |
| **Persona** | An AI character specification. Identity, voice, behavior rules, knowledge sources, constraints. Versioned. |
| **PersonaVersion** | Immutable snapshot of a persona at publication time. Includes the full system prompt template at this version. |
| **Widget** | A pluggable Workspace tool. Holds manifest (capabilities, configuration schema), source bundle reference, version history. |
| **KnowledgeCard** | Atomic unit of domain knowledge. Title, summary, detailed content, examples, common misconceptions, related cards. Verified by domain experts. |
| **KnowledgeCardVersion** | Versioned content. Includes verifier metadata, verification date. |

### 6.2.3 Session Domain

| Entity | Description and Key Attributes |
|:-------|:-------------------------------|
| **Session** | One student's journey through one scenario. References scenario version, current day, vitals (stress, mood), progress state. |
| **Message** | A single chat message. Speaker (student or persona), content, timestamp, metadata (tokens used, latency, trigger event). |
| **Decision** | A significant choice the student made. Decision type, choice ID, context snapshot. Used for Final Report scoring. |
| **StressEvent** | A point on the stress curve. Stress level, trigger type, timestamp. Used for stress timeline visualization. |
| **KnowledgeAcquisition** | Records when a student earns a knowledge card during a session. Card reference, acquisition context. |
| **DayCompletion** | Records when a student completes a day. Completion criteria met, time spent, key decisions, ending trajectory at this point. |
| **FinalReport** | Generated end-of-scenario assessment. All 6 sections, persisted as structured data plus narrative text. Versioned (regeneration possible). |
| **Portfolio** | Cross-session aggregation for one user. References all completed scenarios, achievements, cross-domain insights. |

### 6.2.4 Operational Domain

| Entity | Description and Key Attributes |
|:-------|:-------------------------------|
| **AnalyticsEvent** | Behavioral events for product analytics (page views, button clicks, feature usage). Streamed to analytics platforms. |
| **AuditLog** | Immutable record of operator actions. Who did what, when, with what justification. Required for compliance and incident investigation. |
| **AICostRecord** | Per-call cost tracking for AI inference. Tokens used, model, cost, attributable user/session/persona/scenario. |
| **QualityEvaluation** | Sampled persona response evaluations (in-character consistency, hallucination rate, knowledge accuracy). Used for quality monitoring. |
| **Notification** | Outbound communications to users. Channel, template, delivery status, read status. Used for both transactional and engagement messaging. |
| **PaymentTransaction** | Record of payments made. Amount, currency, payment method, processor reference, status. Reconciled with payment provider records. |

## 6.3 Data Ownership and Access

### 6.3.1 Ownership Principles

- Each entity has exactly one owning component. The owning component is responsible for the entity's lifecycle, validation, and consistency.
- Other components access entities through the owner's interface, not directly. This prevents cross-component coupling at the data level.
- Entities are not shared across tenants except for global content (scenario marketplace) and cross-tenant operations (Super Admin functions).

### 6.3.2 Access Patterns

| Entity | Owner | Typical Access Pattern |
|:-------|:------|:----------------------|
| User | Identity & Access | Read frequently (every authenticated request); write rarely (signup, profile updates). |
| Session | Session Lifecycle | Read on every Workspace render; write on every message exchange. Hot path; benefits from caching. |
| Message | Session Lifecycle | Append-mostly. Read in chronological windows. Suitable for time-series storage patterns. |
| ScenarioVersion | Scenario Engine | Read frequently (loaded into session context); write only on publication. Suitable for aggressive caching. |
| KnowledgeCard | Knowledge Mgmt | Read frequently (RAG retrieval); write on editorial workflow. Indexed for vector search. |
| AICostRecord | Observability | Append-only, high volume. Aggregated for dashboards. Time-series storage appropriate. |
| AuditLog | Identity & Access | Append-only, immutable. Read for compliance reviews and incident investigation. |

## 6.4 Data Lifecycle and Retention

### 6.4.1 Retention Policies

- **Active session data:** retained indefinitely while user account is active.
- **Completed sessions:** retained 5 years for portfolio access; archived after.
- **Final Reports:** retained indefinitely (user-owned content).
- **Chat messages:** retained 2 years; older messages summarized for portfolio retention.
- **Audit logs:** retained 7 years per compliance requirements.
- **Analytics events:** retained 2 years in raw form, indefinitely in aggregated form.
- **Account deletion (right to erasure):** PII purged within 30 days of request; behavioral data anonymized and aggregated.

### 6.4.2 Lifecycle Transitions

- **Hot storage (frequent access):** active sessions, recent messages, current users.
- **Warm storage (occasional access):** completed sessions, older messages, dormant users.
- **Cold storage (rare access):** archived sessions, compliance archives.
- **Deletion:** automated based on retention policy; manual on user request.

## 6.5 Data Privacy and Classification

All data is classified by sensitivity to drive access controls and protection measures:

| Classification | Examples | Protection Measures |
|:---------------|:---------|:-------------------|
| **Public** | Marketing content, scenario summaries, public knowledge cards | CDN-cacheable; no access controls. |
| **Internal** | Aggregated analytics, persona configurations, widget code | Authenticated access only; tenant-scoped where applicable. |
| **Confidential** | User profiles, sessions, decisions, stress events, Final Reports | Encrypted at rest; encrypted in transit; access logged; user-controlled visibility. |
| **Restricted** | Authentication credentials, payment tokens, minor PII | Strong encryption; access requires elevated privileges; mandatory audit logging. |

---

[← Previous: Logical Architecture](./05-logical-architecture.md) · [Back to README](./README.md) · [Next: AI Architecture →](./07-ai-architecture.md)
