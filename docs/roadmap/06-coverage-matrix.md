# 6. Coverage Matrix

This document tracks every TAD component through the four phases. Use this as a quick reference for "what's the status of X in phase Y?"

## Legend

| Symbol | Meaning |
|:------:|:--------|
| ⬜ | Not yet built or stubbed |
| 🟡 | Stubbed (interface real, implementation minimal) |
| 🟢 | Real implementation |
| 🟢+ | Real + enhanced beyond TAD baseline |

## 6.1 Presentation Layer (TAD §5.2)

| Component | V0 | V1 | V2 | V3 |
|:----------|:--:|:--:|:--:|:--:|
| Learner Web App | 🟢 (Hub, Workspace, Final Report) | 🟢+ (Portfolio added) | 🟢+ (multi-language) | 🟢+ (multi-region edge) |
| Parent Web App | ⬜ | 🟢 (Standard tier) | 🟢+ (3 tiers) | 🟢+ (mobile parity) |
| Internal Admin Web App | 🟡 (basic ops dashboard) | 🟡 (improved ops) | 🟢 (Architect, Studio, Vault) | 🟢+ (Orchestrator, Widget Studio) |
| Learner Mobile App | ⬜ | ⬜ | 🟢 (iOS + Android, WebView Workspace) | 🟢+ |
| Parent Mobile App | ⬜ | ⬜ | 🟢 | 🟢+ |
| Email Templates | 🟡 (magic link only) | 🟢 (full transactional) | 🟢+ (engagement series) | 🟢+ |
| SMS/Zalo Templates | ⬜ | 🟡 (auth codes only) | 🟢 | 🟢+ |
| Push Notification Templates | ⬜ | ⬜ | 🟢 | 🟢+ |

## 6.2 Application Layer (TAD §5.3)

| Component | V0 | V1 | V2 | V3 |
|:----------|:--:|:--:|:--:|:--:|
| API Gateway | 🟢 (basic auth, rate limit) | 🟢+ (tenancy resolved) | 🟢+ (B2B routing) | 🟢+ (multi-region) |
| Use Case Handlers | 🟢 (V0 scope handlers) | 🟢+ (payment, parent) | 🟢+ (B2B, multi-domain) | 🟢+ (community, partner API) |
| Workflow Orchestrators | 🟡 (Session lifecycle) | 🟢 (Onboarding, Final Report) | 🟢+ (Content publication) | 🟢+ |
| Event Handlers | 🟡 (in-process events) | 🟢 (analytics, cost tracking) | 🟢+ (quality, audit) | 🟢+ (cross-region) |

## 6.3 Domain Layer (TAD §5.4)

| Component | V0 | V1 | V2 | V3 |
|:----------|:--:|:--:|:--:|:--:|
| Scenario Engine | 🟢 (1 scenario from DB) | 🟢+ (3 scenarios, recommendation) | 🟢+ (multi-domain) | 🟢+ (community scenarios) |
| Persona System | 🟢 (3 personas, 5-layer model) | 🟢+ (more personas) | 🟢+ (per-domain casts) | 🟢+ (community personas) |
| Multi-Agent Orchestration | 🟢 (priority matrix, 3 personas) | 🟢+ (refined for new scenarios) | 🟢+ (Story Director added) | 🟢+ |
| Session Lifecycle | 🟢 (creation, day, completion) | 🟢+ (resume, abandonment recovery) | 🟢+ (replay) | 🟢+ |
| Knowledge Management | 🟢 (8 cards, RAG) | 🟢+ (30+ cards, editorial workflow) | 🟢+ (Vault CMS, expert verification) | 🟢+ (community contribution) |
| Widget Plugin System | 🟡 (1 widget, plugin interface) | 🟢 (plugin loader) | 🟢+ (sandbox, multi-widget) | 🟢+ (Widget Studio) |
| Final Report Generation | 🟢 (6 sections, AI generated) | 🟢+ (cross-scenario insights) | 🟢+ (per-domain customization) | 🟢+ (multi-language) |
| Identity & Access | 🟢 (auth, basic RBAC) | 🟢+ (full RBAC, parent-child links) | 🟢+ (B2B SSO, custom roles) | 🟢+ (SCIM, SAML) |
| Tenancy | 🟡 (consumer tenant only) | 🟡 (B2B scaffold) | 🟢 (full B2B) | 🟢+ (per-tenant features) |

## 6.4 Infrastructure Layer (TAD §5.5)

| Component | V0 | V1 | V2 | V3 |
|:----------|:--:|:--:|:--:|:--:|
| AI Provider Abstraction | 🟡 (interface real, 1 provider) | 🟢 (Anthropic + OpenAI failover) | 🟢+ (3+ providers) | 🟢+ (cost-routed) |
| Database Adapter | 🟢 (Postgres on Neon) | 🟢+ (caching layer added) | 🟢+ (read replicas) | 🟢+ (multi-region replication) |
| Cache Adapter | ⬜ | 🟢 (Redis added) | 🟢+ | 🟢+ (cluster) |
| Queue Adapter | ⬜ | 🟡 (background jobs) | 🟢 (full async pipeline) | 🟢+ |
| Object Storage | 🟡 (Vercel storage) | 🟢 (S3) | 🟢+ | 🟢+ (multi-region) |
| Search Index | 🟢 (pgvector for RAG) | 🟢+ (text search added) | 🟢+ | 🟢+ (dedicated vector store evaluated) |
| Email/SMS Adapters | 🟡 (email only, magic link) | 🟢 (full email pipeline) | 🟢+ (SMS, Zalo, push) | 🟢+ |
| Payment Adapters | ⬜ | 🟢 (Stripe, MoMo, VNPay) | 🟢+ (ZaloPay, B2B invoice) | 🟢+ |
| Auth Provider Adapters | 🟡 (email magic link only) | 🟡 (Google OAuth) | 🟢 (Google + Microsoft + SAML) | 🟢+ (SCIM, custom SAML) |
| Observability | 🟢 (logs + Sentry) | 🟢+ (metrics, tracing) | 🟢+ (dashboards) | 🟢+ (full observability) |

## 6.5 Cross-Cutting Concerns (TAD §10)

| Component | V0 | V1 | V2 | V3 |
|:----------|:--:|:--:|:--:|:--:|
| Authentication | 🟢 (magic link) | 🟢+ (password, OAuth) | 🟢+ (SSO, MFA staff) | 🟢+ (custom SAML, SCIM) |
| Authorization (RBAC) | 🟡 (Learner role only) | 🟢 (full standard roles) | 🟢+ (custom roles) | 🟢+ (B2B custom) |
| Privacy (consent, transparency) | 🟡 (basic consent capture) | 🟢 (Standard parent tier, PDPD) | 🟢+ (3 tiers, parent flows) | 🟢+ (full compliance) |
| Security | 🟡 (basics: HTTPS, hashed passwords) | 🟢 (pen test, vuln scanning) | 🟢+ (SOC 2 prep) | 🟢+ (SOC 2 Type II) |
| Observability | 🟢 (logs, errors) | 🟢+ (metrics, traces) | 🟢+ (quality pipeline) | 🟢+ (full TAD spec) |
| Internationalization | ⬜ (Vietnamese only) | ⬜ (Vietnamese only) | 🟢 (Vietnamese + English) | 🟢+ (Chinese, Korean) |
| Audit Trail | 🟡 (basic logging) | 🟢 (immutable audit log) | 🟢+ (full coverage) | 🟢+ (tamper detection) |

## 6.6 External Integrations (TAD §8)

| Integration | V0 | V1 | V2 | V3 |
|:----------|:--:|:--:|:--:|:--:|
| AI Providers (Anthropic) | 🟢 | 🟢+ | 🟢+ | 🟢+ |
| AI Providers (OpenAI fallback) | ⬜ | 🟢 | 🟢+ | 🟢+ |
| Stripe | ⬜ | 🟢 | 🟢+ | 🟢+ |
| MoMo | ⬜ | 🟢 | 🟢+ | 🟢+ |
| VNPay | ⬜ | 🟢 | 🟢+ | 🟢+ |
| ZaloPay | ⬜ | ⬜ | 🟢 | 🟢+ |
| Bank Invoice (B2B) | ⬜ | ⬜ | 🟢 | 🟢+ |
| Google Workspace SSO | ⬜ | ⬜ | 🟢 | 🟢+ |
| Microsoft 365 SSO | ⬜ | ⬜ | ⬜ | 🟢 |
| Custom SAML | ⬜ | ⬜ | ⬜ | 🟢 |
| SCIM Provisioning | ⬜ | ⬜ | ⬜ | 🟢 |
| Mixpanel | ⬜ | 🟢 | 🟢+ | 🟢+ |
| Custom Data Warehouse | ⬜ | ⬜ | 🟡 | 🟢 |
| Sentry (errors) | 🟢 | 🟢+ | 🟢+ | 🟢+ |
| Email Provider | 🟡 (magic link) | 🟢 (full transactional) | 🟢+ | 🟢+ |
| SMS Provider | ⬜ | 🟡 | 🟢 | 🟢+ |
| Zalo Official Account | ⬜ | ⬜ | 🟢 | 🟢+ |
| Firebase Cloud Messaging | ⬜ | ⬜ | 🟢 | 🟢+ |

## 6.7 Quality Attributes (TAD §11)

| Attribute | V0 Target | V1 Target | V2 Target | V3 Target |
|:----------|:----------|:----------|:----------|:----------|
| Uptime | > 99% | > 99.5% | > 99.5% | > 99.9% |
| Page Load (cold, p75) | < 3s | < 2s (TAD) | < 2s | < 2s |
| AI First Token | < 2s | < 1s (TAD) | < 1s | < 1s |
| AI Hallucination Rate | < 5% | < 3% | < 2% (TAD) | < 2% |
| Test Coverage | > 50% | > 70% (TAD) | > 70% | > 70% |
| Security: SOC 2 | N/A | N/A | Type I prep | Type II |
| Compliance: PDPD | Basic | Full | Full | Full |
| Accessibility (WCAG) | A | AA partial | AA (TAD) | AA |
| Languages | VN | VN | VN + EN | VN + EN + CN + KR |
| Concurrent Sessions | 100 | 1,000 | 10,000 | 100,000 (TAD) |

---

[← Previous: V3 Scale](./05-v3-scale.md) · [Back to README](./README.md) · [Next: Risk Register →](./07-risk-register.md)
