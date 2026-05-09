# 2. V0: MVP for Competition + Small Beta

> **Duration:** 5 weeks
> **Team:** 1-2 full-stack developers + content (the founder)
> **Goal:** Working system proving technical feasibility, supporting 50 beta testers
> **Deliverable:** Live URL where judges and beta users can complete a full 7-day SE scenario

---

## 2.1 Phase Mission

V0 must achieve two things simultaneously:

1. **Prove technical feasibility for the design competition.** Judges click a URL, sign up, complete a scenario, see a Final Report. The experience demonstrates the architecture works end-to-end.

2. **Validate core hypotheses with real users.** 50 beta testers (high school students or adult equivalents) actually use the system. We measure completion rates, AI quality complaints, and qualitative feedback.

This is **not** a commercial launch. There is no payment, no marketing, no SLA. But it is real software with real users — not a prototype.

## 2.2 In-Scope for V0

### 2.2.1 User-Facing Capabilities

- **Authentication:** Email + magic link (passwordless). Real auth, real accounts, real sessions persisted.
- **One scenario:** Software Engineering "Junior to Senior Evolution" (7 days, all days fully designed).
- **Three personas:** Mr. Alpha (mentor), Chip (buddy), Boss Nam (antagonist on Day 3).
- **One widget:** CodeSpace (with LogHunter mode for Day 3 crisis).
- **Eight knowledge cards:** SE essentials (Big O, memory management, etc.).
- **Four screens:** Landing/Gateway, Hub, Workspace, Final Report.
- **Final Report:** All 6 sections AI-generated from session data.
- **Multi-user:** Each user has their own account, their own session, persistent across visits.
- **Cross-device:** Start on laptop, continue on tablet (responsive web only, no native apps).

### 2.2.2 Architecture Components Built (Real)

These TAD components are built with real, production-quality implementations in V0:

- **AI Provider Gateway** (single provider: Anthropic, but interface supports multi-provider)
- **Persona System** (5-layer model fully implemented for 3 personas)
- **Multi-Agent Orchestration** (priority matrix, conflict resolver, response scheduler)
- **Scenario Engine** (loads 1 scenario from DB, but engine ready for N)
- **Session Lifecycle** (creation, active, day transition, completion)
- **Knowledge Management with RAG** (vector search via pgvector)
- **Final Report Generation** (full pipeline with quality validation)
- **Identity & Access** (auth, basic RBAC with Learner role)
- **Cost Tracking** (per-call attribution, per-user/session totals)
- **Database** (Postgres on Neon, full schema deployed)
- **Observability** (structured logs, error tracking via Sentry)

### 2.2.3 Architecture Components Stubbed (Interface Real, Implementation Minimal)

These components have their interfaces in place but minimal implementations. They can be expanded in V1+ without changing call sites:

- **Multi-Provider AI:** interface supports multiple providers; only Anthropic is registered.
- **Tenancy:** interface and tenant_id in every query; only the consumer tenant exists.
- **RBAC:** Role and Permission tables exist; only Learner role is populated and used.
- **Widget Plugin System:** widget loader interface; only CodeSpace is registered.
- **Email/SMS Adapters:** interface dispatches to email; only magic link emails are implemented.
- **Analytics Pipeline:** events emitted; only basic in-DB analytics, no Mixpanel yet.

## 2.3 Out of Scope for V0

These TAD components are **deferred** to later phases:

### 2.3.1 Deferred to V1

- Payment integration (any provider) — V0 is free to beta users
- Mobile native apps
- Parent Dashboard / Parent transparency tiers
- Portfolio screen (cross-session aggregation)
- Internal admin tools (Scenario Architect, Persona Studio, Widget Studio, Knowledge Vault)
- Analytics Dashboard for operators
- Session Replay tool
- Multiple scenarios (V0 ships only the SE scenario)

### 2.3.2 Deferred to V2

- Medical and Marketing domains
- B2B tenant features (custom branding, school SSO)
- Advanced parent features
- Multi-language UI

### 2.3.3 Deferred to V3

- Community contribution platform
- Multi-region deployment
- SOC 2 audit
- Real-time collaborative features

## 2.4 V0 Implementation Plan (5 Weeks)

### Week 1: Foundation + Persona Quality

**Days 1-2: Setup**
- Next.js 15 project with TypeScript strict mode
- Drizzle ORM + Neon Postgres, full schema deployed
- Vercel deployment configured, env vars set
- Anthropic SDK + Vercel AI SDK integrated
- Sentry error tracking configured
- GitHub repo with conventional commits, PR template

**Days 3-5: Mr. Alpha persona iteration**
- Author Mr. Alpha v0.1 prompt (5 layers per TAD Section 7.3)
- Build minimal chat interface for testing
- Test 50+ conversation turns with team and 3-5 friends
- Iterate to v1.0 when 90% of test conversations feel "in character"
- Document successful patterns and failure modes

**Days 6-7: Chip persona + auth**
- Author Chip persona prompt (mood-aware, stress-reactive)
- Implement email + magic link auth (using Resend or AWS SES)
- Multi-user testing: 3 testers with separate sessions

### Week 2: Workspace Heart

**Days 8-9: 3-zone Workspace layout**
- WorkspaceShell with responsive 3-column layout
- ChatZone with streaming AI responses
- VitalsZone with stress meter, knowledge cards, day timer
- WidgetZone shell

**Days 10-11: CodeSpace widget**
- Monaco Editor integration
- Hardcoded code samples per day
- "Run" button with mock execution
- "Discuss with Mr. Alpha" deep link

**Days 12-14: Stress dynamics + animations**
- Zustand stress store with CSS variable updates
- Vignette overlay scaling with stress
- Buddy breathing animation (Framer Motion)
- Auto-intervention when stress > 85%
- Stress decay logic during calm periods

### Week 3: Scenario Engine + Day 3 Crisis

**Days 15-16: Scenario configuration**
- ScenarioConfig types (matching TAD Section 5.4.1)
- SE scenario authored as TypeScript file (will move to DB in V1)
- Day-progression API with completion validation

**Days 17-19: Day 3 Crisis + Boss Nam**
- Boss Nam persona authored
- Trigger system for Day 3 server crash event
- LogHunter mode for CodeSpace widget
- Priority matrix configured for Day 3 events
- End-to-end Day 3 crisis flow tested

**Days 20-21: Hub + day flow**
- Hub page with 7-day timeline
- "Continue to Day N+1" with completion gate
- Knowledge cards earned UI
- Day 1, 2, 4-7 simplified flows (enough to traverse the arc)

### Week 4: Final Report + Multi-User

**Days 22-24: Final Report generation**
- Session data aggregation
- Cognitive matrix scoring (deterministic calculations)
- AI generation pipeline using Claude Opus
- Structured output with Zod schema validation
- Caching of generated reports

**Days 25-26: Final Report UI**
- All 6 sections rendered with charts (Recharts)
- Compatibility gauge, cognitive radar, stress timeline
- Parent letter section
- Print-friendly layout

**Days 27-28: Multi-user polish**
- Account dashboard, session history
- Resume mid-scenario flow
- Cross-device testing
- 5-tester internal QA pass

### Week 5: Beta + Polish

**Days 29-31: Production readiness**
- Cost monitoring dashboard (operators-only, simple)
- Rate limiting on auth and chat endpoints
- Basic alerting via Sentry
- Lighthouse > 85 on landing page
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsive testing

**Days 32-33: Beta launch**
- Recruit 50 beta users (LinkedIn, FB groups, school partners)
- Onboarding email sequence (5 emails)
- Feedback survey at end of scenario
- Daily monitoring of completions, errors, AI quality

**Days 34-35: Buffer + competition submission**
- Bug fixes from beta feedback
- Competition demo video recording
- Submission package finalization

## 2.5 V0 Success Metrics

### 2.5.1 Technical Metrics

| Metric | Target | Critical Threshold |
|:-------|:-------|:-------------------|
| Uptime during beta | > 99% | > 95% |
| Page load (cold, p75) | < 3s | < 5s |
| AI first-token latency | < 2s | < 5s |
| Session resume success rate | > 95% | > 80% |
| Final Report generation success | > 95% | > 80% |
| Critical bugs in production | 0 | < 3 |

### 2.5.2 Quality Metrics

| Metric | Target | Critical Threshold |
|:-------|:-------|:-------------------|
| Hallucination rate (sampled) | < 5% | < 10% |
| Persona in-character consistency (qualitative) | > 80% | > 60% |
| AI cost per completed scenario | < $5 | < $10 |
| Beta feedback "felt authentic" | > 70% | > 50% |

### 2.5.3 User Metrics

| Metric | Target | Critical Threshold |
|:-------|:-------|:-------------------|
| Day 1 completion rate | > 80% | > 60% |
| Day 7 completion rate (full scenario) | > 40% | > 20% |
| User self-report "would recommend" | > 60% | > 40% |
| Final Report read-through | > 90% | > 70% |

## 2.6 V0 Risks

### 2.6.1 AI Quality Insufficient

**Risk:** Mr. Alpha sounds like a generic chatbot, beta users disengage in first 10 minutes.

**Mitigation:** Week 1 is dedicated entirely to persona iteration. If after 5 days Mr. Alpha doesn't pass the "feels real" test with 5 testers, scope reduces (cut Boss Nam from V0, push Day 3 crisis to V1, focus all AI effort on Mr. Alpha + Chip quality).

### 2.6.2 5-Week Timeline Slips

**Risk:** Building production-quality from V0 takes longer than 5 weeks for solo developer.

**Mitigation:** Cut order is pre-defined: (1) drop Day 3 crisis, (2) drop Final Report charts (text only), (3) drop multi-day scenario (single-day demo), (4) drop auth (single hardcoded user). This last cut converts V0 to a prototype, sacrificing the "production quality from V0" principle. It's the last resort.

### 2.6.3 AI Costs Exceed Budget

**Risk:** Beta testers exhaust the budgeted Anthropic credits before competition deadline.

**Mitigation:** Per-user rate limit (5 sessions per user max). Per-session token cap (50K tokens). Anthropic spending alert at $200, hard stop at $500. If budget exhausted, beta closes early but competition demo continues with founder credits.

### 2.6.4 Beta Users Don't Show Up

**Risk:** Recruited 50 testers, only 5 actually start; only 1 finishes.

**Mitigation:** Recruitment over-targets (aim for 100 sign-ups). Personal outreach to first 20 (founder calls/messages). Day-by-day onboarding emails to keep momentum. If completion rate is very low, focus on the few who finish (deep qualitative interviews).

## 2.7 Output Artifacts

By end of V0, these artifacts exist:

- **Live URL** (e.g., `lumina-mvp.vercel.app` or custom domain)
- **GitHub repository** with full source code, README, contribution guide
- **Database** with real beta user sessions (anonymized data exportable)
- **Beta feedback report** synthesizing 50 users' qualitative input
- **Cost report** showing actual AI spend per scenario
- **Quality evaluation report** with sampled response analysis
- **Demo video** (3-5 min) for competition submission
- **Decision document** for V1 (what worked, what to change)

---

[← Previous: Phase Strategy](./01-phase-strategy.md) · [Back to README](./README.md) · [Next: V1 Commercial →](./03-v1-commercial.md)
