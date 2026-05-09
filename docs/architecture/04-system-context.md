# 4. System Context

This section defines LUMINA's boundaries — what is part of the system, what is external, and how the system relates to its environment. The system context is the foundation for all subsequent architectural decisions.

## 4.1 System Boundary

LUMINA is a single platform comprising web applications, mobile applications, backend services, and a database. Everything within this boundary is built, operated, and owned by the LUMINA team. External dependencies (AI providers, payment processors, school systems) are integrated via well-defined contracts.

## 4.2 Context Diagram

```
                           ┌─────────────────────────────┐
                           │      EXTERNAL ACTORS        │
                           └─────────────────────────────┘
                                        │
       ┌──────────────────┬─────────────┼──────────────┬──────────────────┐
       │                  │             │              │                  │
   ┌───▼────┐      ┌─────▼────┐  ┌──────▼──────┐  ┌────▼─────┐    ┌──────▼─────┐
   │Learner │      │  Parent  │  │  Designer/  │  │  School  │    │  External  │
   │(student)│     │          │  │  Persona    │  │  Admin   │    │  Reviewer  │
   └───┬────┘      └─────┬────┘  │  Writer/    │  └────┬─────┘    └──────┬─────┘
       │                 │       │  Engineer/  │       │                 │
       │                 │       │  Curator/   │       │                 │
       │                 │       │  Operator/  │       │                 │
       │                 │       │  Super Admin│       │                 │
       │                 │       └──────┬──────┘       │                 │
       └─────────────────┴──────────────┴──────────────┴─────────────────┘
                                        │
                                        ▼
              ╔═════════════════════════════════════════════╗
              ║                                             ║
              ║              L U M I N A                    ║
              ║         (System Boundary)                   ║
              ║                                             ║
              ║  Web Apps · Mobile Apps · Backend · Data    ║
              ║                                             ║
              ╚═════════════════════════════════════════════╝
                                        │
       ┌──────────────────┬─────────────┼──────────────┬──────────────────┐
       │                  │             │              │                  │
   ┌───▼─────┐    ┌──────▼─────┐ ┌──────▼──────┐ ┌─────▼──────┐  ┌────────▼──────┐
   │   AI    │    │  Payment   │ │  School     │ │ Analytics  │  │ Communication │
   │Providers│    │ Processors │ │  Systems    │ │ Platforms  │  │   Channels    │
   │         │    │            │ │             │ │            │  │               │
   │Anthropic│    │  Stripe    │ │  Google     │ │ Mixpanel   │  │  Email (SES)  │
   │ OpenAI  │    │  MoMo      │ │  Workspace  │ │ Custom DW  │  │  SMS gateways │
   │ (future)│    │  VNPay     │ │  MS 365     │ │            │  │  Zalo OA      │
   └─────────┘    │  ZaloPay   │ │  Custom     │ └────────────┘  │  Push (FCM)   │
                  └────────────┘ │  SIS APIs   │                  └───────────────┘
                                 └─────────────┘

                                ┌─────────────────────┐
                                │   EXTERNAL SYSTEMS  │
                                └─────────────────────┘
```

*Figure 4.1 LUMINA system context — external actors and external systems*

## 4.3 External Actors

External actors are humans or organizations that interact with LUMINA from outside the system boundary. They are not part of the system but are central to its purpose.

### 4.3.1 Learner (Student)

The primary user. High school students aged 16–18 (with some flexibility for younger early adopters and adult mid-career changers in future markets). Interacts via web (primary) and mobile (Hub and notifications). Pays for scenarios via B2C purchases or accesses through B2B school subscriptions.

### 4.3.2 Parent

The financial sponsor of B2C purchases and the trust authority for B2C signups by minors. Interacts primarily via mobile parent app. Has visibility into child's progress with student-controlled transparency levels.

### 4.3.3 Internal Staff (Multiple Roles)

Internal staff use the platform's admin tools. The architecture supports eight distinct roles:

- **Designer** — authors scenarios using Scenario Architect.
- **Persona Writer** — authors AI personas using Persona Studio.
- **Engineer** — builds widgets using Widget Studio; maintains core platform code.
- **Curator** — manages knowledge cards in Knowledge Vault.
- **Operator** — monitors platform health via Analytics Dashboard; investigates incidents via Session Replay.
- **Super Admin** — manages users, roles, workspaces; controls access.
- **Customer Support** — handles user inquiries (subset of Operator with restricted access).
- **Content Moderator** — reviews flagged content and user reports.

### 4.3.4 School Administrator

Manages school-tenant deployments. Provisions student accounts (typically via SSO), assigns scenario licenses, views school-aggregate analytics. Does not see individual student chat content.

### 4.3.5 External Reviewer

Domain experts (industry practitioners, academic faculty) who verify knowledge cards, validate scenario authenticity, and evaluate persona quality. Limited access to specific review workflows.

## 4.4 External Systems

### 4.4.1 AI Providers

Commercial LLM providers supplying the inference capability for personas and Final Report generation. Primary: Anthropic Claude. Secondary (future): OpenAI for fallback, possibly Vietnamese-hosted LLMs for data residency.

- **Interaction:** HTTPS REST API with streaming responses. Authentication via API keys (provider-specific).
- **Data flow:** System prompts + conversation history + user message → AI → streaming response tokens.
- **SLA reliance:** Provider-specific. Anthropic targets 99.9%; degradation to fallback provider if unavailable.

### 4.4.2 Payment Processors

Multiple payment integrations to cover Vietnamese consumer preferences:

- **Stripe** — international cards, the technical reference. Used for cross-border B2B contracts.
- **MoMo** — dominant Vietnamese e-wallet for B2C consumer purchases.
- **VNPay** — bank-card payment gateway, supports most Vietnamese banks.
- **ZaloPay** — alternative Vietnamese e-wallet.
- **Bank invoice** — for B2B school contracts, processed offline with manual reconciliation.

### 4.4.3 School Systems

B2B integrations with school technology environments:

- **Google Workspace for Education** — SSO via OIDC, classroom roster sync.
- **Microsoft 365 Education** — SSO via SAML, Teams integration.
- **Custom SIS (Student Information Systems)** — per-customer integrations via SCIM or proprietary APIs.

### 4.4.4 Analytics Platforms

Behavioral and product analytics:

- **Mixpanel** — event tracking, funnel analysis, retention cohorts.
- **Custom Data Warehouse** — BigQuery or equivalent for advanced analytics, ML feature store, executive dashboards.
- **Application Performance Monitoring** — Sentry for errors, Datadog or Vercel Analytics for performance.

### 4.4.5 Communication Channels

Outbound communications to users:

- **Email** — transactional (signup, receipts, weekly summaries) via AWS SES or SendGrid.
- **SMS** — authentication codes via Twilio or Vietnamese SMS gateway.
- **Zalo Official Account** — Vietnamese messenger, primary parent communication channel.
- **Push Notifications** — mobile apps via Firebase Cloud Messaging.

## 4.5 Trust Boundaries

Trust boundaries identify where data crosses between zones with different security postures. Each boundary is a place where authentication, authorization, and validation must be enforced.

- **User Browser/Device → LUMINA Backend:** All requests authenticated, rate-limited, validated against schema.
- **LUMINA Backend → AI Providers:** API keys secured in secrets management; outbound data minimized to operationally necessary fields.
- **LUMINA Backend → Payment Processors:** PCI-DSS isolation; LUMINA never stores card data; uses tokenization.
- **LUMINA Backend → School Systems:** Per-tenant credentials; SSO assertions validated; data scope limited to authorized students.
- **Internal Staff → Admin Tools:** Strong authentication (MFA required); role-based access enforced server-side; all actions audited.

---

[← Previous: Architectural Constraints](./03-architectural-constraints.md) · [Back to README](./README.md) · [Next: Logical Architecture →](./05-logical-architecture.md)
