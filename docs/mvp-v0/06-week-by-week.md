# 6. V0 Week-by-Week Plan

This document breaks the 5-week V0 timeline into daily milestones. Use this as the day-to-day execution guide.

## How to Use This Document

- **Daily standup reference:** Each day has specific deliverables. Check off as completed.
- **Week-end review:** Each Sunday, review the week's accomplishments vs plan. Adjust if needed.
- **Slip detection:** If two consecutive days slip, activate the [Cut List](./07-cut-list.md).
- **Buffer:** Days 34-35 are buffer days. Use only if needed; otherwise polish.

## Week 1: Foundation + Persona Quality

> **Theme:** Get infrastructure right and prove AI quality is achievable

### Day 1 — Setup
- [ ] Create Next.js 15 project with TypeScript strict
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Initialize Git repo with proper .gitignore
- [ ] Create Vercel account, link repo, deploy "hello world"
- [ ] Create Neon Postgres database
- [ ] Configure environment variables (Vercel + local)

### Day 2 — Database & AI Foundation
- [ ] Set up Drizzle ORM
- [ ] Define initial schema (users, sessions tables only)
- [ ] Run first migration
- [ ] Create Anthropic API account, get key
- [ ] Set up Vercel AI SDK
- [ ] Create simple "/api/chat" endpoint that calls Claude (no persona yet, just hello world)
- [ ] Verify streaming works end-to-end

### Day 3 — Mr. Alpha Persona v0.1
- [ ] Author Mr. Alpha 5-layer prompt v0.1
- [ ] Create simple test interface (one-page chat)
- [ ] Test 10 conversations with team
- [ ] Document failure modes (out of character, too verbose, too generic)

### Day 4 — Mr. Alpha Persona Iteration
- [ ] Iterate prompt to v0.3 based on Day 3 failures
- [ ] Test 20 more conversations across different topics
- [ ] Recruit 2-3 friends to test (external perspective)
- [ ] Identify remaining issues

### Day 5 — Mr. Alpha v1.0 Lock
- [ ] Final iteration to v1.0 prompt
- [ ] Acceptance test: 9/10 conversations feel "in character"
- [ ] If acceptance fails: extend Day 5 to Day 6 (this is the critical gate)
- [ ] Document prompt with reasoning for each layer choice

### Day 6 — Auth & Multi-User
- [ ] Set up Resend for transactional email
- [ ] Implement magic link sign-up flow
- [ ] Implement session persistence (cookies)
- [ ] Test with 3 different test accounts simultaneously
- [ ] Handle edge cases: expired link, used link, invalid email

### Day 7 — Chip Persona + Buffer
- [ ] Author Chip 5-layer prompt
- [ ] Test in chat interface
- [ ] Iterate to acceptable quality (lower bar than Mr. Alpha — Chip is simpler)
- [ ] If Day 5 slipped: use Day 7 as Mr. Alpha catch-up
- [ ] Week 1 retrospective: what went well, what to adjust

**End of Week 1 Checkpoint:**
- ✅ Mr. Alpha persona at production quality
- ✅ Chip persona at acceptable quality
- ✅ Auth working with multiple users
- ✅ Deployed to Vercel
- ❌ If any of above incomplete: stop, reassess, possibly cut scope

---

## Week 2: Workspace Heart

> **Theme:** Build the 3-zone workspace where 80% of user time is spent

### Day 8 — Workspace Layout Shell
- [ ] Create /workspace route
- [ ] Build 3-zone responsive layout (left/center/right)
- [ ] Stub each zone with placeholder content
- [ ] Verify layout works on desktop and tablet

### Day 9 — Chat Zone (Left)
- [ ] Build message list component (append-only)
- [ ] Build message input component
- [ ] Wire to existing /api/chat endpoint
- [ ] Implement streaming UI (token-by-token append)
- [ ] Handle send-while-AI-responding (disable input)

### Day 10 — Vitals Zone (Right)
- [ ] Build stress meter component
- [ ] Set up Zustand stress store
- [ ] Wire CSS variable updates
- [ ] Build Buddy avatar with breathing animation (Framer Motion)
- [ ] Build knowledge cards earned list
- [ ] Build day timer

### Day 11 — Widget Zone (Center) Setup
- [ ] Install Monaco Editor
- [ ] Create CodeSpace widget component
- [ ] Wire to widget zone with proper sizing
- [ ] Configure TypeScript syntax highlighting
- [ ] Add "Run" button with mock execution

### Day 12 — CodeSpace Polish
- [ ] Pre-load code samples for Day 1 and Day 2 (hardcoded for now)
- [ ] "Discuss with Mr. Alpha" button creates chat message
- [ ] Test editor responsiveness (no lag)
- [ ] Style to match design system

### Day 13 — Stress Dynamics
- [ ] Implement vignette overlay (CSS, driven by stress level)
- [ ] Test smooth transitions (calm → stressed)
- [ ] Implement animation slowdown on stress > 85%
- [ ] Wire stress changes from chat messages (deterministic rules)

### Day 14 — Buddy Auto-Intervention + Buffer
- [ ] When stress > 85%, Chip auto-sends supportive message
- [ ] Implement Buddy chat overlay (simple modal)
- [ ] User can summon Chip on demand
- [ ] Week 2 retrospective

**End of Week 2 Checkpoint:**
- ✅ Workspace renders 3 zones
- ✅ Chat works with streaming
- ✅ Stress system visible and responsive
- ✅ Buddy interventions trigger
- ❌ If incomplete: cut Day 3 crisis features for Week 3

---

## Week 3: Scenario Engine + Day 3 Crisis

> **Theme:** The 7-day arc, with Day 3 as the demonstration centerpiece

### Day 15 — Scenario Configuration System
- [ ] Define ScenarioConfig TypeScript types
- [ ] Define DayConfig types
- [ ] Create scenario file: SE Junior-to-Senior with 7 days
- [ ] Day-loading function (returns active personas, widget, knowledge cards for given day)

### Day 16 — Day Progression Logic
- [ ] /api/scenario/advance-day endpoint
- [ ] Day completion validation
- [ ] Update session state on day advance
- [ ] UI: "Continue to Day N+1" button when criteria met
- [ ] Test progression Day 1 → 2 → 3

### Day 17 — Boss Nam Persona
- [ ] Author Boss Nam 5-layer prompt
- [ ] Test in isolation (no orchestration yet)
- [ ] Verify tone is demanding-but-not-abusive
- [ ] Confirm constraints (max 40 words, no profanity)

### Day 18 — Multi-Agent Orchestration
- [ ] Implement Event Detector (rule-based, classifies messages)
- [ ] Implement Priority Matrix loader
- [ ] Configure Day 3 priority matrix (Mr. Alpha + Boss Nam + Chip)
- [ ] Implement Conflict Resolver (max 2 personas, no consecutive same-speaker)
- [ ] Implement Response Scheduler (delays between personas)
- [ ] Test Day 3 simulated message → multiple personas respond

### Day 19 — Day 3 Crisis Trigger + LogHunter
- [ ] Implement trigger system (time-based)
- [ ] Day 3 trigger: 15 minutes elapsed → server crash event
- [ ] Switch widget to LogHunter mode on Day 3
- [ ] Pre-load LogHunter content (hardcoded crash logs)
- [ ] Test full Day 3 flow start to finish

### Day 20 — Hub Screen
- [ ] Build /hub route
- [ ] Welcome message with user info
- [ ] Current scenario card with progress
- [ ] 7-day timeline with completion states
- [ ] Knowledge cards earned section
- [ ] "Continue" button → Workspace

### Day 21 — Day 1, 2, 4-7 Simplified Flows + Buffer
- [ ] Author simplified content for Days 1, 2 (intro + first task)
- [ ] Author simplified content for Days 4-7 (just enough to traverse)
- [ ] Test full 7-day completion in one sitting
- [ ] Week 3 retrospective

**End of Week 3 Checkpoint:**
- ✅ Full 7-day scenario can be completed
- ✅ Day 3 crisis triggers reliably
- ✅ Boss Nam appears at correct moment
- ✅ Multi-persona orchestration works
- ❌ If Day 3 doesn't work reliably: extend to Day 22

---

## Week 4: Final Report + Multi-User Polish

> **Theme:** The deliverable and production hardening

### Day 22 — Final Report Data Pipeline
- [ ] Session data aggregation function
- [ ] Cognitive matrix scoring (deterministic from decisions)
- [ ] Compatibility score calculation
- [ ] Stress timeline summary statistics

### Day 23 — Final Report AI Generation
- [ ] Define Zod schema for full report structure
- [ ] Author Final Report system prompt
- [ ] Implement /api/report/generate endpoint
- [ ] Use Claude Opus with structured output
- [ ] Handle generation errors with retry

### Day 24 — Final Report UI Sections 1-3
- [ ] Section 1: Compatibility gauge (Recharts)
- [ ] Section 2: Cognitive radar chart
- [ ] Section 3: Stress timeline chart with annotations

### Day 25 — Final Report UI Sections 4-6
- [ ] Section 4: 4-Year Forecast paragraphs
- [ ] Section 5: AI Panel Tier A/B/X recommendations
- [ ] Section 6: Parent Letter
- [ ] Polish layout, responsive design

### Day 26 — Knowledge Cards & RAG
- [ ] Author 8 SE knowledge cards
- [ ] Generate embeddings (OpenAI embeddings or alternative)
- [ ] Set up pgvector
- [ ] Implement retrieval function (top 3-5 cards)
- [ ] Inject into persona prompts at runtime
- [ ] Test improvement in persona accuracy

### Day 27 — Cost Tracking & Caps
- [ ] AI cost tracking per call (tokens × pricing)
- [ ] Per-user, per-session cost aggregation
- [ ] Per-user spending cap enforcement
- [ ] Daily platform spending alert

### Day 28 — Internal QA Pass + Buffer
- [ ] 5-tester internal QA of full flow
- [ ] Bug fix sprint
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing (tablet at minimum)
- [ ] Week 4 retrospective

**End of Week 4 Checkpoint:**
- ✅ Final Report generates and renders all 6 sections
- ✅ Knowledge cards integrated via RAG
- ✅ Cost tracking and caps in place
- ✅ Internal QA passed
- ❌ If incomplete: extend timeline; do not launch beta

---

## Week 5: Beta Launch + Polish

> **Theme:** Real users, real feedback, ship

### Day 29 — Production Hardening
- [ ] Sentry integration with source maps
- [ ] Structured logging on all endpoints
- [ ] Rate limiting on auth and chat endpoints
- [ ] Operator dashboard (basic)
- [ ] Cost alerting email

### Day 30 — Pre-Launch Checklist
- [ ] Privacy policy and terms of service drafted
- [ ] Onboarding email sequence (5 emails) authored
- [ ] Feedback survey (Google Forms) prepared
- [ ] Landing page polish
- [ ] Support email configured
- [ ] Backup/restore tested
- [ ] Lighthouse score > 85 on landing

### Day 31 — Beta Recruitment
- [ ] Reach out to network for beta testers
- [ ] Aim for 100 sign-ups (target 50 active)
- [ ] Personal messages to first 20 (high-touch)
- [ ] Send onboarding email to first batch

### Day 32 — Beta Day 1
- [ ] Monitor signups, completions, errors
- [ ] Personal check-ins with 5 beta users
- [ ] Hot-fix any blockers
- [ ] Track metrics in operator dashboard

### Day 33 — Beta Days 2-3 Active Monitoring
- [ ] Daily metrics review
- [ ] Sample persona quality (review 20 random responses)
- [ ] Address any user issues within 24 hours
- [ ] Note bugs and feature requests

### Day 34 — Buffer + Bug Fixes
- [ ] Fix any critical bugs surfaced from beta
- [ ] Polish any rough edges noticed
- [ ] Continue beta monitoring

### Day 35 — Competition Submission
- [ ] Record demo video (3-5 min)
- [ ] Finalize submission package
- [ ] Submit competition entry
- [ ] Beta continues for 2 more weeks (post-submission)
- [ ] Week 5 retrospective + V0 retrospective

**End of Week 5 Checkpoint:**
- ✅ Beta is live with real users completing scenarios
- ✅ Competition submission delivered
- ✅ All P0 features working in production
- ✅ At least 5 users have completed full Day 7

---

## Buffer Days (If Needed)

If timeline slips, days 34-35 absorb the slip. Beyond that, the cut list activates.

If timeline is on track at Day 33, use buffer days for:
- Polish (animations, micro-interactions)
- Additional manual QA
- Persona prompt iteration (always more to improve)
- Knowledge card expansion (8 → 10-12 if time)
- Documentation for team handoff

## Daily Standup Format

Each morning, answer:
1. What did I complete yesterday?
2. What's the plan for today?
3. What's blocking me?
4. Are we still on track for end-of-week milestone?

5-minute standup, document in shared note.

## Weekly Review Format

Each Sunday:
1. What was planned this week?
2. What was actually accomplished?
3. What slipped and why?
4. What's the plan for next week?
5. Any scope cuts needed?

30-minute review, share with team.

---

[← Previous: Content Deliverables](./05-content-deliverables.md) · [Back to README](./README.md) · [Next: Cut List →](./07-cut-list.md)
