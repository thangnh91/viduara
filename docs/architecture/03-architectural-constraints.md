# 3. Architectural Constraints

Constraints are external realities the architecture must accommodate. Unlike goals, constraints are not negotiable through engineering effort — they reflect business, legal, market, and resource realities.

## 3.1 Business Constraints

### 3.1.1 Funding and Team Size

LUMINA is pre-seed. The architecture must be implementable by a small team (1–5 engineers) for the foreseeable future, with growth to 15–20 engineers across all phases. Architectural patterns that require dedicated platform teams (microservices proliferation, custom orchestration platforms) are inappropriate.

### 3.1.2 Time-to-Market Pressure

Vietnamese EdTech is a fast-moving market with multiple well-funded competitors entering. Architecture must support rapid feature delivery; long upfront platform-building phases are not acceptable. Build-buy decisions favor commercial managed services over self-hosted infrastructure where the cost difference is justifiable.

### 3.1.3 Revenue Model Implications

The product mixes B2C consumer purchases with B2B school subscriptions. Architecture must support both:

- **B2C:** Per-scenario purchases ($19.99 each), credit card and Vietnamese payment methods (MoMo, VNPay, ZaloPay), self-service signup.
- **B2B:** Annual contracts, bulk seat licensing, school-administered access, invoice billing, custom branding.

## 3.2 Legal and Regulatory Constraints

### 3.2.1 Vietnamese Personal Data Protection

Vietnam's Decree 13/2023/ND-CP on Personal Data Protection (PDPD), effective July 2023, applies to LUMINA. Key obligations include:

- User consent for data collection and processing, with clear purpose specification.
- Data subject rights: access, correction, deletion.
- Cross-border data transfer notification (relevant for Anthropic API calls hitting US infrastructure).
- Mandatory breach notification to authorities and affected users.
- Data Protection Impact Assessments for sensitive processing (children's behavioral data qualifies).

> **ℹ️ Architectural Implication:** All user data must be tagged at the field level for retention, consent scope, and cross-border transfer status. Generic "user data table" patterns are insufficient.

### 3.2.2 Minor Protection (COPPA-equivalent)

Primary users are aged 16–18 (high school students). Some users may be younger (Grade 10 early adopters). The architecture must support:

- Parental consent capture for users under 16.
- Stricter privacy defaults for minors (no marketing emails, opt-in for analytics).
- Content moderation appropriate for minors.
- Transparent data practices visible to parents.

### 3.2.3 Education Sector Compliance

If pursued, B2B school contracts will require additional compliance:

- Vietnam Ministry of Education and Training (MOET) approval for school-curriculum integration.
- School-specific data residency requirements (some require Vietnam-hosted data).
- FERPA-equivalent protections if expanding to international markets with educational privacy laws.

## 3.3 Technical Constraints

### 3.3.1 AI Provider Dependency

LUMINA's quality is directly dependent on commercial LLM provider availability and capability. This creates several constraints:

- Provider rate limits cap concurrent user counts (must monitor and throttle gracefully).
- Provider pricing changes propagate directly to unit economics.
- Provider model deprecations require persona/prompt re-validation and possibly re-authoring.
- Provider downtime equals platform downtime for AI features.
- Provider data policies (training data, retention) constrain what user data can be sent.

> **⚠️ Critical Constraint:** The architecture must support multi-provider abstraction from V0. Single-provider lock-in is unacceptable risk for a business model dependent on AI inference.

### 3.3.2 Network Conditions in Target Market

Vietnamese internet infrastructure varies significantly:

- Urban areas (HCMC, Hanoi): fiber broadband, low latency.
- Provincial capitals: 4G/fiber mix, moderate latency.
- Rural areas: 4G dominant, intermittent connectivity.
- Cross-border latency to US-hosted services (Anthropic): 200–400ms.

Architecture must accommodate:

- Streaming AI responses (perceived speed > total speed).
- Graceful handling of connection drops mid-conversation.
- Optimistic UI updates with reconciliation.
- Edge caching for static assets (Vietnam-resident CDN).

### 3.3.3 Browser and Device Targets

Target devices and browsers:

- **Primary:** Desktop/laptop browsers (Chrome, Firefox, Safari, Edge — last 2 versions). Most students do scenarios on shared family laptops.
- **Secondary:** Tablets (iPad, Android). Used for content review and Final Report reading.
- **Tertiary:** Mobile (iOS, Android). Native apps for Hub and notifications; web for Workspace.
- **Excluded:** Internet Explorer, browsers older than 2 years.

## 3.4 Operational Constraints

### 3.4.1 Working Hours and On-Call

LUMINA is a Vietnam-primary product. Peak usage hours: 18:00–23:00 ICT weekdays, 09:00–23:00 weekends. The architecture must enable solo/small-team on-call rotation:

- Self-healing systems where possible (automatic restarts, failovers).
- Detailed alerting with actionable runbooks.
- Most failures should not require human intervention during peak hours.

### 3.4.2 Deployment Constraints

Deployments cannot disrupt active sessions. Students midway through Day 3 cannot lose their conversation due to a deploy.

- Zero-downtime deployments required.
- Database migrations must be backward-compatible (or use feature flags for incompatible changes).
- Long-running AI calls must complete even if a new version is deployed mid-call.

## 3.5 Constraints Summary

| Category | Constraint | Architectural Implication |
|:---------|:-----------|:--------------------------|
| Business | Small team (1–20 engineers) | Favor managed services, monolith-first, avoid platform team requirements. |
| Business | Time-to-market pressure | Build-buy favors buy where commercially justified. |
| Legal | Vietnam PDPD compliance | Field-level data tagging, consent management, audit trails, breach detection. |
| Legal | Minor protection | Age-aware features, parental consent capture, stricter privacy defaults. |
| Technical | AI provider dependency | Multi-provider abstraction, prompt portability, cost monitoring with throttling. |
| Technical | Cross-border latency to AI | Streaming responses, optimistic UI, retry/queue logic. |
| Operational | Solo/small team on-call | Self-healing systems, actionable alerts, automated remediation. |
| Operational | Zero-downtime deploys | Backward-compatible migrations, blue-green deployment, in-flight session preservation. |

---

[← Previous: Architectural Goals](./02-architectural-goals.md) · [Back to README](./README.md) · [Next: System Context →](./04-system-context.md)
