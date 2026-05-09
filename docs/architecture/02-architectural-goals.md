# 2. Architectural Goals

This section defines the qualities the architecture must achieve at maturity. Goals are stated in measurable terms where possible. Goals are intentionally distinct from constraints ([Section 3](./03-architectural-constraints.md)) — goals are what we strive for; constraints are what we must accept.

## 2.1 Primary Goals

### 2.1.1 AI Quality and Authenticity

LUMINA's core value proposition rests on AI personas feeling authentically like real industry professionals — not generic chatbots. Architecture must support this through prompt engineering tooling, multi-agent orchestration, knowledge grounding, and continuous quality measurement.

- **Target:** Hallucination rate below 2% in domain-relevant responses (measured by expert review of sampled sessions).
- **Target:** In-character consistency above 95% across long conversations (measured by automated evaluation pipelines).
- **Target:** New persona authoring time below 8 hours from concept to production-ready quality.

### 2.1.2 Multi-Domain Extensibility

The platform must support adding new career domains (Medicine, Marketing, Law, Design, etc.) without modifying the core engine. This is the container architecture pattern — a single Workspace renders dramatically different experiences based on scenario configuration.

- **Target:** Adding a new career domain takes less than 4 weeks of designer-curator effort, with zero core engineering work.
- **Target:** 60%+ code reuse across domains (measured by lines shared vs lines domain-specific).
- **Target:** Widget plugin system supports domain-specific tools without modifying the Workspace shell.

### 2.1.3 Privacy and Trust

Students share emotionally intimate experiences with the platform — moments of confusion, stress, breakdown. Parents trust the platform with their children's data. The architecture must enforce strong privacy boundaries by default.

- **Target:** Parent dashboards show student progress without exposing chat content unless student explicitly opts in.
- **Target:** Operator session replay requires justification, leaves immutable audit trail, and anonymizes student identity by default.
- **Target:** All user data is encrypted at rest and in transit; PII is segregated from behavioral data.
- **Target:** Compliance with Vietnamese personal data protection regulations and equivalent international standards (GDPR-class).

### 2.1.4 Operational Reliability

Students invest 7 days into a scenario. A platform outage that loses progress is unacceptable. The architecture must ensure session continuity and graceful degradation.

- **Target:** 99.5% uptime (measured monthly, excluding planned maintenance).
- **Target:** Zero data loss for in-flight sessions during deployments or AI provider failures.
- **Target:** AI provider failures degrade gracefully (queue messages, notify user, retry) rather than crash sessions.
- **Target:** Session state recoverable across devices — student can start on web, continue on mobile.

### 2.1.5 Cost Efficiency

AI inference costs are the dominant variable cost. The architecture must enable cost monitoring, throttling, and optimization without sacrificing quality.

- **Target:** AI cost per completed scenario below 25% of selling price (gross margin > 75% on AI alone).
- **Target:** Real-time cost monitoring with per-user, per-persona, per-scenario breakdowns.
- **Target:** Per-user spending caps that prevent runaway costs from edge-case usage.
- **Target:** Multi-provider abstraction allowing routing to cheaper models for non-critical interactions.

## 2.2 Secondary Goals

### 2.2.1 Designer Productivity

Internal designers, persona writers, engineers, and curators are the long-term content velocity bottleneck. Tools must make their work fast, reviewable, and collaborative.

- Visual scenario authoring with live preview and playtesting.
- Persona authoring with sandboxed conversation testing across stress contexts.
- Knowledge card management with version control and expert verification workflow.
- Widget development with isolated preview and automated regression testing.

### 2.2.2 Operational Observability

Operators need to detect, diagnose, and resolve incidents quickly. Architecture must instrument the system for visibility.

- Real-time analytics dashboard for KPIs and anomaly detection.
- Session replay with privacy guardrails for incident investigation.
- Cross-domain comparison and quality monitoring.
- Alert system for AI cost spikes, hallucination rate increases, and uptime issues.

### 2.2.3 Internationalization Readiness

Vietnam is the launch market, but the platform's value proposition translates across emerging markets. Architecture must support localization without rewriting core systems.

- All user-facing text externalized in translation files (no hardcoded strings).
- Persona prompts authored per locale (not auto-translated).
- Scenario content authored per market (not just translated — culturally adapted).
- Right-to-left text support for future Arabic markets.

### 2.2.4 Multi-Tenant Isolation

B2B school customers require their data, users, and analytics to be isolated from B2C consumers and from other schools. Architecture must support tenant isolation without code duplication.

- Logical tenant isolation at the database level.
- Tenant-specific branding, scenarios, and personas (where contracted).
- Tenant-specific analytics aggregation.
- Tenant-specific RBAC roles within shared role framework.

## 2.3 Non-Goals

Explicitly stating non-goals prevents over-engineering. The following are **not** architectural goals at any phase:

- **Real-time multi-user collaboration.** Sessions are single-user. Two students cannot share a session. (If V3 introduces classroom modes, this becomes a goal at that point.)
- **Offline operation.** Sessions require connectivity for AI inference. Offline-first PWA is not a target.
- **Sub-100ms latency.** AI streaming dominates response time. Optimizing below network/AI latency provides no user benefit.
- **Custom AI model training.** LUMINA uses commercial LLM APIs. Training proprietary models is out of scope; fine-tuning third-party models is a possible future enhancement, not a current goal.
- **Open API for third-party developers.** The platform is a closed product, not a developer platform. APIs are internal.

---

[← Previous: Introduction](./01-introduction.md) · [Back to README](./README.md) · [Next: Architectural Constraints →](./03-architectural-constraints.md)
