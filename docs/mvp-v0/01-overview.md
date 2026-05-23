# 1. V0 Overview

## 1.1 Mission Statement

Build a working LUMINA system in 5 weeks that:

1. **Demonstrates technical feasibility for the design competition** — judges click a URL, sign up, complete a 7-day Software Engineering scenario, receive an AI-generated Final Report.
2. **Validates core hypotheses with 50 beta users** — real students experience the platform and provide qualitative feedback.

V0 is **not** a commercial product. There is no payment, no marketing, no SLA. But V0 **is** real software with real users — not a clickable prototype.

## 1.2 Definition of "Working" V0

A V0 is shippable when a new user can:

1. Visit the live URL
2. Sign up with email (magic link)
3. Choose to start the SE scenario
4. Complete Day 1 with Mr. Alpha (intro + first coding task)
5. Continue Day 2-7 across multiple sessions (with persistent state)
6. Experience Day 3 crisis with Boss Nam appearance
7. Receive AI-generated Final Report with all 6 sections at end of Day 7
8. Re-visit and view their report again later

If any of these steps fails, V0 is not done. If all pass and quality is acceptable, V0 ships.

## 1.3 Success Criteria

### 1.3.1 Hard Requirements (Ship Blockers)

V0 cannot ship without these:

- [ ] Live URL accessible from Vietnam
- [ ] Sign-up with email + magic link works for new users
- [ ] User session persists across visits (refresh, new device with same login)
- [ ] All 7 days of SE scenario can be completed
- [ ] Day 3 crisis triggers Boss Nam appearance
- [ ] Final Report generates after Day 7 with all 6 sections populated
- [ ] No critical security issues (no exposed credentials, no SQL injection, basic CSRF protection)
- [ ] No data loss for completed sessions
- [ ] Cost monitoring shows actual AI spend per session

### 1.3.2 Soft Requirements (Aim For)

These should be achieved but won't block ship:

- Page load p75 < 3 seconds
- AI first-token latency < 2 seconds
- Uptime > 99% during beta period (14 days)
- 50 beta users recruited
- Day 7 completion rate > 40%
- Hallucination rate (sampled) < 5%
- Cost per scenario < $5 in AI spend

## 1.4 Architectural Principles for V0

V0 follows the TAD's architectural principles. Specific implications:

### 1.4.1 Production Quality Code

- TypeScript strict mode (no `any` except justified)
- Test coverage > 50% for core domain logic
- Error handling on every external call (AI, DB, email)
- Structured logging on every API endpoint
- No hardcoded secrets (all in env vars)
- Code review required even for solo founder (use AI as reviewer)

### 1.4.2 Real, Not Stubbed (V0 In-Scope)

These are real implementations following TAD architecture:

- Multi-agent orchestration with priority matrix
- 5-layer persona specifications
- RAG knowledge retrieval (pgvector)
- Auth with magic link
- Multi-user with persistent state
- Final Report generation pipeline
- Cost tracking per call/user/session

### 1.4.3 Stubbed (V0 Interface Real, Implementation Minimal)

These have proper interfaces but minimal implementations:

- AI Provider Gateway (1 provider registered: Anthropic)
- Tenancy (1 tenant: consumer)
- RBAC (1 role: Learner)
- Widget Plugin System (1 widget: CodeSpace)
- Email adapter (1 use: magic link)
- Analytics (basic in-DB events, no Mixpanel)

### 1.4.4 Skipped (Not in V0, No Stub)

These don't exist in V0 at all:

- Payment integration
- Mobile native apps
- Parent dashboard
- Admin tools (Scenario Architect, Persona Studio, etc.)
- Session Replay
- Multi-language UI
- B2B features
- 2nd and 3rd domains (Medical, Marketing)

## 1.5 Constraints

### 1.5.1 Resource Constraints

- **People:** 1-2 full-stack developers (founder + optional co-founder)
- **Time:** 5 weeks calendar (35 days)
- **Budget:**
  - AI API: $500 cap during V0 development + beta
  - Hosting: Free tier of Vercel + Neon (sufficient for V0 traffic)
  - Tools/services: < $200 (Sentry free tier, Resend for emails ~$0)
  - Total V0 cost ceiling: ~$700

### 1.5.2 Quality Constraints

- No critical security vulnerabilities
- No data loss for any user
- No accidentally-public PII

### 1.5.3 Schedule Constraints

- Must ship before competition deadline
- Must have 14 days of beta period before submission
- Buffer of 2-3 days at end for emergency fixes

## 1.6 Out-of-Scope (Forbidden Scope Creep)

If during V0 development someone says "we should also..." about any of these, the answer is **no, deferred to V1**:

- Adding any payment or monetization
- Adding any second scenario
- Building any admin tool beyond basic ops view
- Adding parent features
- Adding mobile-specific features
- Adding multi-language support
- Adding any third-party analytics platform
- Adding social sharing features
- Adding email marketing campaigns

This list exists because scope creep is the most common cause of MVP timeline slippage.

## 1.7 Decision Authority

For V0, decisions are made by:

- **Architectural decisions:** founder, with reference to TAD
- **Scope decisions:** founder, with reference to this document
- **Technical implementation:** engineer (with code review)
- **Content quality:** founder + designated reviewers
- **Timeline / cut-list activation:** founder

Ambiguity goes to founder. Speed of decisions matters more than thoroughness in V0.

---

[← Back to README](./README.md) · [Next: Feature List →](./02-feature-list.md)
