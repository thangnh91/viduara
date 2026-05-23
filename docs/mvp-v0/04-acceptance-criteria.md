# 4. V0 Acceptance Criteria

This document defines "done" for each major feature area. A feature is acceptable when it meets all stated criteria. This is the QA gating standard before V0 ships.

## 4.1 Authentication

### Magic Link Sign-Up
- [ ] User enters valid email → receives email within 2 minutes
- [ ] User enters invalid email format → sees clear error message
- [ ] Magic link works once, then becomes invalid
- [ ] Magic link expires after 15 minutes
- [ ] Clicking expired link shows clear error with option to request new link
- [ ] Successful login redirects to Hub
- [ ] Concurrent magic link requests for same email don't break

### Session Persistence
- [ ] Logging in sets cookie that persists across browser close/reopen
- [ ] Cookie is HTTP-only and Secure
- [ ] Session expires after 30 days inactivity
- [ ] Activity (any API call) extends session
- [ ] Logout invalidates session immediately
- [ ] Logout from one device doesn't log out other devices (intentional in V0)

### Security
- [ ] No credentials in URLs (magic link uses POST verification, not GET token in URL bar)
- [ ] Rate limiting: max 5 magic link requests per email per hour
- [ ] Rate limiting: max 20 login attempts per IP per hour
- [ ] Generic error messages on auth failure (don't leak whether email is registered)

## 4.2 Hub Screen

- [ ] First-time user sees welcome message with their email/name
- [ ] Returning user sees Hub directly (no re-onboarding loop)
- [ ] Current scenario card shows correct day and progress
- [ ] 7-day timeline shows: completed days (with checkmarks), current day (highlighted), future days (locked)
- [ ] "Continue" button takes user to Workspace at correct day
- [ ] Knowledge cards earned section shows accurate count
- [ ] Page loads in < 2 seconds (warm cache)
- [ ] Hub is responsive on screens 1024px+ wide
- [ ] Hub renders acceptably on tablets (768-1024px)

## 4.3 Workspace Screen

### Layout & Navigation
- [ ] 3-zone layout renders correctly on screens 1280px+
- [ ] Smaller screens (1024-1280px) show acceptable degraded layout
- [ ] User can navigate back to Hub from Workspace
- [ ] Browser back/forward buttons work correctly

### Chat Functionality
- [ ] Sending message shows it immediately in chat (optimistic update)
- [ ] AI response begins streaming within 2 seconds (p75)
- [ ] Streaming text appears smoothly without jumps
- [ ] Multiple personas respond with appropriate delays (when configured)
- [ ] Long messages scroll the chat to bottom automatically
- [ ] User can scroll up to read history without losing scroll position when new message arrives
- [ ] Failed messages (network error) show retry option
- [ ] Message input is disabled while AI is responding
- [ ] Message persists if user closes browser mid-conversation

### Vitals Zone
- [ ] Stress meter updates within 1 second of stress change
- [ ] Stress color transitions are smooth (CSS transition)
- [ ] Buddy avatar breathes continuously (animation never freezes)
- [ ] Buddy mood reflects scenario state appropriately
- [ ] Knowledge cards earned list updates when new card acquired
- [ ] Vignette appears when stress > 70% and intensifies through 100%

### Widget Zone
- [ ] CodeSpace renders Monaco Editor correctly
- [ ] Syntax highlighting works for TypeScript/JavaScript
- [ ] Pre-loaded code per day appears correctly
- [ ] Editor is functional (typing works, no lag)
- [ ] "Run" button shows mock output
- [ ] "Discuss with Mr. Alpha" button creates chat message with current code reference
- [ ] Day 3 transitions to LogHunter mode automatically

### Day Progression
- [ ] "Continue to Day N+1" button only appears when completion criteria met
- [ ] Clicking button advances day in DB
- [ ] Workspace re-renders with new day's content
- [ ] Cannot advance to Day N+1 if not completed Day N
- [ ] Progress is saved to DB before advancing (no race conditions)

## 4.4 AI Quality

### Persona Behavior — Mr. Alpha
- [ ] In 9/10 test conversations, response feels "in character" (Vietnamese senior engineer)
- [ ] Never breaks character to acknowledge being AI
- [ ] Never exceeds 80 words per message
- [ ] Uses Vietnamese with appropriate technical English mix
- [ ] Asks Socratic questions instead of giving direct answers (most of the time)
- [ ] Adjusts tone based on student stress level
- [ ] References knowledge cards when appropriate (cites them)

### Persona Behavior — Chip
- [ ] Tone is supportive, never patronizing
- [ ] Auto-intervenes when student stress > 85%
- [ ] Doesn't speak unprompted unless triggered
- [ ] Provides emotional grounding without solving technical problems
- [ ] Mood indicator reflects current scenario tension

### Persona Behavior — Boss Nam
- [ ] Only appears Day 3 onward (and only during crisis scenes)
- [ ] Tone is frustrated/demanding but not abusive
- [ ] Pressure is felt but not overwhelming
- [ ] Yields appropriate "stage" to Mr. Alpha when student is being mentored
- [ ] Disappears appropriately when crisis is resolving

### Multi-Agent Orchestration
- [ ] Maximum 2 personas respond per student message
- [ ] Personas appear in correct priority order
- [ ] Delays between personas feel natural (not too fast, not too slow)
- [ ] Same persona doesn't speak twice in a row without student interaction

### Knowledge Grounding
- [ ] Persona responses cite knowledge cards when content matches
- [ ] Knowledge cards are factually accurate (no hallucinated content)
- [ ] When student asks about something outside knowledge, persona admits ignorance gracefully

## 4.5 Scenario Engine

### Day Progression
- [ ] All 7 days can be completed
- [ ] Day completion criteria are reasonable (not too hard, not too easy)
- [ ] Day 3 crisis trigger fires reliably (every session, not flaky)
- [ ] Day 3 widget mode switches to LogHunter automatically
- [ ] Day 7 ending shows celebration before redirect to Final Report

### State Persistence
- [ ] User can close browser at any point and resume exactly where they left off
- [ ] Stress level persists across sessions
- [ ] Knowledge cards earned persist across sessions
- [ ] Decisions made persist for Final Report
- [ ] Cannot lose progress through any user action

### Session Integrity
- [ ] Two devices logged into same account see same session state
- [ ] No race conditions when both devices send messages simultaneously (latest wins gracefully)
- [ ] Session can be resumed for at least 30 days after last activity

## 4.6 Final Report

### Generation
- [ ] Final Report generates within 60 seconds of Day 7 completion
- [ ] User sees progress UI during generation (not blank screen)
- [ ] Generation succeeds on 95%+ of completed sessions
- [ ] Generation failures retry automatically (up to 3 times)
- [ ] Failed generations show user-friendly error with retry option

### Content Quality
- [ ] All 6 sections are populated (no empty sections)
- [ ] Content is personalized (references specific session events, not generic)
- [ ] Compatibility score is between 0-100 and matches narrative tone
- [ ] Cognitive matrix shows 5 dimensions
- [ ] Stress timeline shows actual stress curve from session
- [ ] 4-year forecast paragraphs are coherent
- [ ] Tier A/B/X recommendations make sense given session
- [ ] Parent letter is appropriate tone (warm, specific)

### UI
- [ ] Compatibility gauge renders correctly
- [ ] Cognitive radar chart renders correctly
- [ ] Stress timeline renders correctly with annotations
- [ ] All text is readable (no overflow, no truncation)
- [ ] Report is responsive on tablet
- [ ] Re-visiting /report/[sessionId] loads cached version instantly

## 4.7 Data & Performance

### Data Integrity
- [ ] No data loss during normal operations (verified via DB query)
- [ ] All session data backed up daily
- [ ] User can export their own data (basic JSON export, not pretty)
- [ ] Account deletion removes all PII within 30 days

### Performance
- [ ] Page load (cold) p75 < 3 seconds
- [ ] Page load (warm) p75 < 1 second
- [ ] AI first-token latency p75 < 2 seconds
- [ ] AI complete response p75 < 8 seconds (longer messages OK)
- [ ] Database queries p95 < 200ms

### Reliability
- [ ] Uptime > 99% during 14-day beta period
- [ ] Zero data loss incidents
- [ ] Sentry shows < 5 unique errors per day in production

## 4.8 Operations

### Monitoring
- [ ] Sentry catches errors with source maps for debugging
- [ ] Logs are structured JSON queryable by user/session ID
- [ ] Operator dashboard shows: active users today, errors today, AI cost today
- [ ] Cost alerting fires when daily AI spend exceeds $30

### Cost Control
- [ ] Per-user AI spending tracked accurately
- [ ] Per-session token cap (50K) enforced
- [ ] Daily platform cap ($30 during V0) enforced with throttling
- [ ] Total V0 AI spend stays under $500 budget

## 4.9 Compliance

### Privacy
- [ ] User consent captured at signup (clear text, not buried)
- [ ] Privacy policy and terms accessible from landing
- [ ] Data deletion request can be processed within 30 days
- [ ] No third-party trackers without consent
- [ ] PII is encrypted at rest (Postgres encryption enabled)

### Security
- [ ] No exposed credentials in code or git history
- [ ] All API endpoints validate authentication
- [ ] All API endpoints validate input (Zod schemas)
- [ ] No SQL injection vectors (parameterized queries via Drizzle)
- [ ] CSRF protection on state-changing endpoints
- [ ] Rate limiting on auth and chat endpoints

## 4.10 Beta Launch Readiness

### Pre-Beta Gate
- [ ] All P0 features pass acceptance criteria
- [ ] At least 80% of P1 features pass acceptance criteria
- [ ] E2E smoke test passes consistently
- [ ] Manual QA checklist completed across Chrome, Firefox, Safari
- [ ] Onboarding emails tested and working
- [ ] Privacy policy and terms reviewed by founder
- [ ] Support email/contact configured and monitored

### Beta Operations
- [ ] Daily monitoring of: signups, completions, errors, costs
- [ ] Founder available to respond to user issues within 24 hours
- [ ] Feedback survey ready and tested
- [ ] Plan for handling beta user complaints
- [ ] Rollback plan if critical issue emerges

---

[← Previous: Out of Scope](./03-out-of-scope.md) · [Back to README](./README.md) · [Next: Content Deliverables →](./05-content-deliverables.md)
