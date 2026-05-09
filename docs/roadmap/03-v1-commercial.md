# 3. V1: Commercial Launch

> **Duration:** 3-4 months after V0
> **Team:** 3-5 people (2-3 engineers + 1 designer/persona writer + 1 content/operations)
> **Goal:** First commercial release with paying users in Vietnamese market
> **Deliverable:** Public launch of LUMINA with B2C purchase flow, 1 hero domain (SE), monthly recurring revenue

---

## 3.1 Phase Mission

V1 transforms the V0 proof-of-concept into a real product people pay for. The bet validated in V1 is **product-market fit at the unit economic level** — does $19.99 per scenario work for Vietnamese students and parents?

This phase is fundamentally about turning V0's working system into a **business**, not adding many new features. Most engineering effort goes to making V0's components production-grade, not building new components.

## 3.2 In-Scope for V1

### 3.2.1 New Capabilities

- **Payment integration:** Stripe (international cards), MoMo (Vietnamese e-wallet), VNPay (bank cards). Per-scenario purchase model.
- **Account system improvements:** profile management, subscription history, receipt downloads.
- **Parent dashboard (basic):** Standard transparency tier only. View scenarios completed, Final Reports, talking points.
- **Portfolio screen:** cross-session view for users who complete multiple scenarios.
- **Email engagement system:** transactional emails (signup, receipts), scenario reminders, weekly summaries.
- **Internal admin tools (basic):** simple dashboard for operators to view sessions, monitor costs, handle support tickets. Not the full Scenario Architect/Persona Studio yet.
- **2 additional SE scenarios:** building on V0's hero scenario, add 2 SE specializations (e.g., "Backend Deep Dive", "Mobile Engineering").
- **Onboarding flow:** scenario recommendation based on simple questionnaire, Day 1 free trial.
- **Mobile responsive Workspace:** the V0 Workspace is desktop-only; V1 adds tablet support.

### 3.2.2 Architecture Components Built (Real)

These TAD components transition from stub to real implementation:

- **Multi-Provider AI Gateway:** OpenAI added as fallback provider. Failover tested.
- **Email Adapters:** full transactional email pipeline (welcome, receipts, summaries) via SES or SendGrid.
- **Payment Adapters:** Stripe, MoMo, VNPay integrations with webhook handling.
- **Tenancy:** consumer tenant fully featured; B2B tenant scaffold added (not yet customer-facing).
- **Analytics Pipeline:** Mixpanel integrated; basic funnel and retention dashboards.
- **Operator Tools:** simplified Analytics Dashboard, basic Session Replay (anonymized only), user support views.
- **Cost Control:** spending caps enforced at platform/user/session levels.
- **Backup & Disaster Recovery:** automated daily backups, documented restore process.

### 3.2.3 Architecture Components Stubbed in V1

- **Internal admin tools:** simplified UIs sufficient for 5-person team, not the full TAD vision yet.
- **Parent transparency tiers:** only Standard tier; Minimal and Full deferred.
- **B2B tenant features:** scaffolding present; first B2B customer onboarding deferred to V2.
- **Multi-language UI:** Vietnamese only (English UI deferred; English already works for AI personas).

## 3.3 V1 Implementation Plan

### Month 1: Production Hardening

V0 was functional but minimal. Month 1 hardens it:

- **Reliability:** comprehensive error handling, graceful degradation, retry logic on every external call
- **Observability:** distributed tracing added, alert runbooks written, on-call rotation established
- **Security:** penetration testing (or thorough review), vulnerability scanning, secrets rotation
- **Performance:** database indexing review, caching layer added (Redis), N+1 query elimination
- **Quality:** test coverage to > 70%, automated regression tests for AI behavior
- **Compliance:** PDPD compliance review, consent management UI, data export/deletion implemented

### Month 2: Payment + Parent Experience

- **Payment integration:** all three providers, full purchase flow, webhook reliability, refund handling
- **Parent dashboard:** Standard tier transparency, talking points, weekly summary emails
- **Parent-child linking:** verified relationship flow, consent capture for minors
- **Subscription management:** customer-facing account portal, billing history, cancellation
- **Email engagement:** transactional + behavioral emails (Day 3 reminder, Day 7 celebration)

### Month 3: Content Expansion + Onboarding

- **2 new SE scenarios:** "Backend Deep Dive" and "Mobile Engineering" authored
- **Persona library expansion:** new personas for new scenarios (different mentor archetypes)
- **Knowledge card library:** expand from 8 to 30+ cards covering SE breadth
- **Scenario recommendation:** simple questionnaire-based recommendation
- **Day 1 free trial:** users complete Day 1 free, paywall before Day 2
- **Portfolio screen:** cross-scenario aggregation for repeat users

### Month 4: Launch + Iteration

- **Closed beta launch:** 200-500 paying users, $19.99 per scenario
- **Daily monitoring:** completion rates, support tickets, cost per scenario, NPS
- **Iteration sprints:** weekly feature/fix cycles based on user feedback
- **Marketing launch:** content marketing, founder personal network, school partner pilot
- **Public launch:** opens to general public after beta validation

## 3.4 V1 Success Metrics

### 3.4.1 Business Metrics

| Metric | Target | Notes |
|:-------|:-------|:------|
| Paying users | > 500 | By end of V1 |
| Completion rate (Day 7) | > 50% | Up from 40% in V0 |
| NPS | > 40 | Industry-good for EdTech |
| Gross margin per scenario | > 60% | After all variable costs |
| Refund rate | < 5% | Healthy product fit signal |

### 3.4.2 Technical Metrics

| Metric | Target | Notes |
|:-------|:-------|:------|
| Uptime | > 99.5% | Mature target |
| Page load (p75) | < 2s | TAD target |
| AI hallucination rate | < 3% | Improvement from V0's 5% |
| Critical bugs in production | < 1/month | Zero tolerance for show-stoppers |
| Test coverage | > 70% | Automated quality gate |

## 3.5 V1 Risks

### 3.5.1 Conversion Doesn't Materialize

**Risk:** Beta users complete free Day 1 but don't pay for Days 2-7.

**Mitigation:** A/B test pricing ($9.99, $19.99, $29.99). Test bundle pricing (3 scenarios for $39). Focus on Day 1 quality — if Day 1 doesn't sell the experience, no price will work.

### 3.5.2 AI Costs Compress Margin

**Risk:** Per-scenario AI cost exceeds 30% of revenue, leaving thin margin.

**Mitigation:** Aggressive prompt optimization, prompt caching where Anthropic supports it, lower-tier model for non-critical responses, response length caps. If still > 30%, raise prices before scaling.

### 3.5.3 Support Burden Overwhelms Small Team

**Risk:** 500 paying users generate 50+ support tickets/week, team can't keep up.

**Mitigation:** Self-service knowledge base, in-product Buddy can handle common questions, async support only (no live chat in V1), dedicated support hire if ticket volume sustained.

### 3.5.4 New Scenarios Don't Match V0 Quality

**Risk:** First scenario was hand-crafted carefully; new scenarios feel rushed.

**Mitigation:** Each new scenario gets minimum 2 weeks dedicated work + expert review. If quality slips, delay launch rather than ship weak content.

## 3.6 V1 Team Growth

V1 requires team growth from V0's 1-2 to 3-5 people:

- **Engineer #2** (full-stack, hired Month 1): payment integration, admin tools, infrastructure hardening
- **Designer/Persona Writer** (hired Month 2): new scenarios, persona authoring, UX polish
- **Content/Operations** (hired Month 3): scenario authoring assistance, beta user support, marketing content

**Optional fourth hire** at Month 4 if traction justifies: dedicated Customer Support / Operations.

---

[← Previous: V0 MVP](./02-v0-mvp.md) · [Back to README](./README.md) · [Next: V2 Multi-Domain →](./04-v2-multi-domain.md)
