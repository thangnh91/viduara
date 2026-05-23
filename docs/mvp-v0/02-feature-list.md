# 2. V0 Feature List

This document lists every feature that must be built in V0, organized by area. Each feature has a priority (P0 = ship blocker, P1 = needed, P2 = nice-to-have), estimated effort, and acceptance reference.

## Priority Definitions

- **P0 (must-ship):** V0 cannot ship without this. Cut last.
- **P1 (should-ship):** V0 is degraded without this but can ship. Cut second.
- **P2 (nice-to-ship):** Polish, can be added in V0.5 or V1. Cut first.

---

## 2.1 Authentication & User Account

### A1. Email Magic Link Sign-Up [P0]

User enters email → receives email with one-time link → clicks link → logged in.

- **Effort:** ~6 hours
- **Dependencies:** Email provider integration (Resend or AWS SES)
- **Notes:** No password. Token expires in 15 minutes. Single-use.

### A2. Session Persistence [P0]

Logged-in user stays logged in for 30 days. Sliding expiration on activity.

- **Effort:** ~2 hours
- **Notes:** HTTP-only secure cookies. No JWT (opaque server-validated tokens).

### A3. Logout [P0]

User can explicitly log out, invalidating session.

- **Effort:** ~1 hour

### A4. Cross-Device Login [P1]

User logs in on laptop, then logs in on tablet → both sessions active simultaneously.

- **Effort:** Already covered by A2 if implemented correctly
- **Notes:** No "force log out other devices" feature in V0.

### A5. User Profile Display [P1]

User sees their email and basic info on the Hub.

- **Effort:** ~1 hour
- **Notes:** No profile editing in V0; profile is just email + display name auto-generated.

---

## 2.2 Landing & Onboarding

### L1. Landing Page [P0]

Public landing page with: hero, value prop, "Start Demo" CTA, basic info about LUMINA.

- **Effort:** ~6 hours (use existing prototype as basis)
- **Dependencies:** None
- **Notes:** Reuse design from existing HTML prototype.

### L2. Sign-Up Flow [P0]

"Start Demo" → enter email → magic link sent → land on Hub.

- **Effort:** ~3 hours

### L3. First-Time User Onboarding [P1]

After first login, show 2-3 onboarding screens explaining what's about to happen.

- **Effort:** ~3 hours
- **Notes:** Skippable. Show once.

### L4. Returning User Routing [P0]

Returning users land directly on Hub (no re-onboarding).

- **Effort:** ~1 hour

---

## 2.3 Hub Screen

### H1. Hub Layout [P0]

Welcome message, current scenario card, 7-day timeline, "Start" or "Continue" CTA.

- **Effort:** ~6 hours
- **Dependencies:** Existing prototype design

### H2. Current Scenario Card [P0]

Shows SE scenario with: title, current day, completion %, "Continue" button.

- **Effort:** ~3 hours

### H3. 7-Day Timeline Visualization [P0]

Visual timeline showing Day 1-7 with completion status per day.

- **Effort:** ~4 hours
- **Notes:** Past days marked complete, current day highlighted, future days locked.

### H4. Knowledge Cards Earned [P1]

List of knowledge cards user has earned during scenario.

- **Effort:** ~2 hours
- **Notes:** Click card → expand to show full content.

### H5. Scenario Completed State [P1]

When scenario complete, Hub shows celebration + "View Final Report" CTA.

- **Effort:** ~2 hours

---

## 2.4 Workspace Screen (The Heart)

### W1. 3-Zone Layout [P0]

Left: Chat zone. Center: Widget zone. Right: Vitals zone. Responsive.

- **Effort:** ~8 hours
- **Dependencies:** None
- **Notes:** Desktop-optimized. Mobile shows zones stacked.

### W2. Chat Zone — Message Display [P0]

Append-only conversation with all personas. Each message shows speaker avatar + name + content + timestamp.

- **Effort:** ~6 hours

### W3. Chat Zone — Message Input [P0]

Text input, send button, shift+enter for newline, enter to send.

- **Effort:** ~3 hours

### W4. Chat Zone — Streaming AI Responses [P0]

Persona responses stream token-by-token from server-sent events.

- **Effort:** ~6 hours
- **Dependencies:** Vercel AI SDK
- **Notes:** Critical for perceived performance.

### W5. Chat Zone — Multi-Persona Display [P0]

When multiple personas respond to one message, they appear in sequence with appropriate delays.

- **Effort:** ~4 hours
- **Dependencies:** Orchestration logic (B1-B4)

### W6. Vitals Zone — Stress Meter [P0]

Vertical bar showing current stress 0-100. Color shifts (calm green → focused blue → stressed red).

- **Effort:** ~3 hours

### W7. Vitals Zone — Buddy Avatar [P0]

Chip avatar with breathing animation. Mood indicator (calm/concerned/alert).

- **Effort:** ~3 hours
- **Notes:** Framer Motion for breathing.

### W8. Vitals Zone — Knowledge Cards [P1]

List of knowledge cards earned in this scenario so far.

- **Effort:** ~2 hours

### W9. Vitals Zone — Day Timer [P1]

Shows current day, time elapsed in this day's session.

- **Effort:** ~2 hours

### W10. Vignette Effect on High Stress [P1]

When stress > 70%, screen edges darken. > 85%, animations slow.

- **Effort:** ~3 hours
- **Notes:** CSS variables driven by Zustand. No re-renders.

### W11. Auto-Buddy Intervention [P1]

When stress > 85%, Chip auto-sends supportive message.

- **Effort:** ~3 hours

### W12. Day Progression Button [P0]

When day-completion criteria met, button appears: "Continue to Day N+1".

- **Effort:** ~3 hours

### W13. Resume Mid-Day [P0]

If user closes browser mid-day, returning lands them at exact same conversation state.

- **Effort:** ~2 hours
- **Dependencies:** Persistent message storage (D-series).

---

## 2.5 CodeSpace Widget

### C1. Monaco Editor Integration [P0]

VS Code-style editor in widget zone. TypeScript/JavaScript syntax highlighting.

- **Effort:** ~6 hours
- **Dependencies:** Monaco Editor library

### C2. Pre-loaded Code Per Day [P0]

Each day loads relevant starter code (Day 1: hello world, Day 3: buggy server, etc.).

- **Effort:** ~3 hours (across 7 days)

### C3. "Run" Button (Mock Execution) [P1]

Click "Run" → shows mock output in console pane below editor.

- **Effort:** ~3 hours
- **Notes:** No real sandbox in V0. Hardcoded outputs per day's expected behavior.

### C4. "Discuss with Mr. Alpha" Button [P1]

Click → opens chat with prefilled message referencing current code.

- **Effort:** ~2 hours

### C5. Day 3 LogHunter Mode [P1]

Day 3 crisis switches widget to log-viewing mode (not code editing). Logs scroll, errors highlighted.

- **Effort:** ~5 hours
- **Notes:** Hardcoded log content for Day 3 server crash narrative.

---

## 2.6 AI Backend (Most Critical)

### B1. Anthropic API Integration [P0]

Server calls Claude Sonnet for persona responses, Claude Opus for Final Report. Streaming for personas.

- **Effort:** ~4 hours
- **Dependencies:** Anthropic SDK, API key

### B2. Persona Prompt Templates [P0]

5-layer prompts for Mr. Alpha, Chip, Boss Nam. Templated with scenario context interpolation.

- **Effort:** ~12 hours (most of Week 1)
- **Dependencies:** None
- **Notes:** Most important quality determinant. Iterate heavily.

### B3. Multi-Agent Orchestration Logic [P0]

Given student message + session state, decide which persona(s) respond, with what delay, with what tone override.

- **Effort:** ~8 hours
- **Dependencies:** Priority matrix configuration per day
- **Notes:** Deterministic, not AI-driven (per TAD ADR-007).

### B4. Priority Matrix Configuration [P0]

For each scenario day, define {persona × event} → response specification.

- **Effort:** ~4 hours
- **Notes:** Lives in TypeScript file in V0; will move to DB in V1.

### B5. Knowledge Card RAG [P1]

Before persona invocation, retrieve relevant knowledge cards via vector similarity. Inject into prompt.

- **Effort:** ~6 hours
- **Dependencies:** pgvector setup, knowledge cards seeded

### B6. Stress Calculation [P0]

After each interaction, update stress level based on event type, persona response, recent decisions.

- **Effort:** ~4 hours
- **Notes:** Deterministic rules. Not AI-driven.

### B7. Trigger System [P1]

Day-specific triggers fire based on conditions: time elapsed, decision made, stress threshold.

- **Effort:** ~5 hours
- **Notes:** Day 3 crisis trigger is the main one; others optional in V0.

### B8. Cost Tracking Per Call [P0]

Every AI call records: tokens used, cost, attributable user/session/scenario/persona.

- **Effort:** ~3 hours

### B9. Cost Caps Enforcement [P0]

Per-user, per-session, platform-wide spending caps. Trigger throttling, not hard stop.

- **Effort:** ~4 hours

---

## 2.7 Final Report Generation

### F1. Session Data Aggregation [P0]

Gather all messages, decisions, stress events, knowledge earned, time spent for the session.

- **Effort:** ~4 hours

### F2. Quantitative Score Calculation [P0]

Cognitive matrix scores (5 dimensions), compatibility score (0-100), stress timeline summary.

- **Effort:** ~6 hours
- **Notes:** Deterministic calculations from session data.

### F3. AI Narrative Generation [P0]

Single Claude Opus call generating: personalized observations, 4-year forecast, AI panel recommendations, parent letter. Structured output (Zod schema).

- **Effort:** ~8 hours
- **Dependencies:** Schema definition, prompt iteration

### F4. Report Caching [P0]

After generation, persist full report to DB. Subsequent views read from cache.

- **Effort:** ~2 hours

### F5. Report UI — Section 1: Compatibility [P0]

Gauge visualization showing 0-100 score, label, hero summary.

- **Effort:** ~4 hours
- **Dependencies:** Recharts

### F6. Report UI — Section 2: Cognitive Matrix [P0]

Radar chart with 5 dimensions, comparison to junior/senior averages.

- **Effort:** ~4 hours

### F7. Report UI — Section 3: Stress Timeline [P0]

Line chart of stress level across all 7 days, with annotated key moments.

- **Effort:** ~5 hours

### F8. Report UI — Section 4: 4-Year Forecast [P0]

Narrative paragraphs for Year 1-2, Year 3-4, Post-Graduate.

- **Effort:** ~3 hours

### F9. Report UI — Section 5: AI Panel Recommendations [P0]

Tier A (high match), Tier B (adjacent), Tier X (avoid) recommendations with reasoning.

- **Effort:** ~3 hours

### F10. Report UI — Section 6: Parent Insight [P0]

Letter format addressed to parent, with talking points.

- **Effort:** ~3 hours

### F11. Report Re-Read [P1]

User can return to /report/[sessionId] anytime after Day 7 to re-read.

- **Effort:** ~1 hour

---

## 2.8 Data & Infrastructure

### D1. Database Schema [P0]

Tables per TAD §6: sessions, messages, decisions, stress_events, knowledge_acquisitions, day_completions, final_reports, users, plus stub tables (tenants, roles).

- **Effort:** ~8 hours
- **Dependencies:** Drizzle ORM
- **Notes:** Migrations in version control.

### D2. Database Queries [P0]

All CRUD operations through Drizzle. No raw SQL in domain code.

- **Effort:** ~10 hours (across all features)

### D3. Vector Search Setup [P1]

pgvector extension enabled, embeddings generated for knowledge cards, similarity search works.

- **Effort:** ~5 hours
- **Dependencies:** OpenAI embeddings API or Anthropic alternative

### D4. Database Backups [P0]

Neon's automatic backups enabled. Test restore once during V0.

- **Effort:** ~1 hour

### D5. Secrets Management [P0]

All API keys in environment variables, never committed. Vercel env config.

- **Effort:** ~1 hour

---

## 2.9 Operations & Monitoring

### O1. Sentry Integration [P0]

Error tracking for client and server. Source maps uploaded.

- **Effort:** ~2 hours

### O2. Structured Logging [P0]

JSON logs from every API endpoint with request ID, user ID, duration.

- **Effort:** ~3 hours

### O3. Basic Operator Dashboard [P1]

Internal-only page (founder-access) showing: active sessions today, total cost today, error count.

- **Effort:** ~6 hours
- **Notes:** Simplest possible. Not the full Analytics Dashboard from TAD.

### O4. Rate Limiting [P0]

Auth endpoints, chat endpoint rate-limited per user and per IP.

- **Effort:** ~3 hours

### O5. Cost Alerting [P0]

Daily email to founder showing AI spend + alert if approaching cap.

- **Effort:** ~2 hours

---

## 2.10 Quality & Testing

### Q1. Unit Tests [P1]

Core domain logic: orchestration, stress calculation, scenario engine.

- **Effort:** ~10 hours

### Q2. Integration Tests [P1]

API endpoints tested with real DB.

- **Effort:** ~6 hours

### Q3. E2E Test of Critical Path [P0]

Automated test: sign-up → start scenario → send message → receive response → advance day.

- **Effort:** ~5 hours
- **Notes:** Playwright. Smoke test only, not exhaustive.

### Q4. Manual QA Checklist [P0]

Documented checklist for pre-deploy testing across browsers and devices.

- **Effort:** ~2 hours

### Q5. Persona Quality Sampling [P1]

Manual review of 10% of persona responses during beta. Track in spreadsheet.

- **Effort:** ~ongoing

---

## 2.11 Beta Launch Support

### N1. Beta User Recruitment Flow [P1]

Landing page accepts beta signups. Founder reviews and approves access.

- **Effort:** ~3 hours
- **Notes:** Not full waitlist; just email collection.

### N2. Onboarding Email Sequence [P1]

5 emails: welcome (Day 0), check-in (Day 2), encouragement (Day 4), feedback request (Day 7), thank you (Day 8).

- **Effort:** ~4 hours

### N3. Feedback Survey [P1]

Post-Day-7 survey with 10 questions (rating + open text).

- **Effort:** ~2 hours
- **Notes:** Use Google Forms or similar; no need to build into product.

### N4. Beta Analytics [P1]

Track in DB: signups, scenario starts, day completions, scenario completions.

- **Effort:** ~3 hours
- **Notes:** Simple counts; visualization in operator dashboard.

---

## 2.12 Effort Summary

Total effort estimate: ~280-320 hours.

For 1 full-stack developer at 40 hours/week × 5 weeks = 200 hours. Gap of 80-120 hours.

This means **V0 needs either:**
- 2 developers (60-80 hours each on the critical path)
- 1 developer + ruthless cut-list usage (see [07-cut-list.md](./07-cut-list.md))
- Extended timeline to 6-7 weeks

This calibration is reality-based; the original "5-week solo" target is optimistic.

---

[← Previous: Overview](./01-overview.md) · [Back to README](./README.md) · [Next: Out of Scope →](./03-out-of-scope.md)
