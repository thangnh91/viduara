# Task Templates for Claude Code

> **Mẫu prompt khi giao việc cho Claude Code. Copy-paste, fill in, send.**

---

## Cách dùng

Khi muốn Claude Code làm 1 task, **chọn template phù hợp**, **copy nội dung**, **fill vào các phần `[...]`**, rồi paste vào Claude Code session.

Templates dưới đây cover các loại task phổ biến nhất trong V0.

---

## Template #1: Build New Feature (Feature mới)

**Khi dùng:** Build 1 feature mới từ MVP V0 Feature List.

```markdown
## Task: Build Feature [FEATURE_ID]

### Context
Building [feature name] per MVP V0 Feature List item [FEATURE_ID].
Current phase: V0
Current week: Week [N]

### Reference Documents
- **Acceptance criteria:** /docs/mvp-v0/04-acceptance-criteria.md §[SECTION]
- **TAD reference:** /docs/architecture/[FILE].md §[SECTION]
- **Coverage status:** Per /docs/roadmap/06-coverage-matrix.md, this is [REAL/STUBBED] in V0

### Scope of changes
**Files allowed to modify:**
- [LIST OF FILES OR FOLDERS, e.g., src/application/auth/*]

**Files NOT to modify:**
- Anything outside the scope above
- Database schema (unless explicitly part of this task)
- Existing tests in unrelated areas

### Expected output
- [Output 1, e.g., API endpoint POST /api/auth/magic-link/send]
- [Output 2, e.g., Email template in src/infrastructure/email/templates/]
- [Output 3, e.g., Database migration if schema change]
- Tests covering happy path and error cases
- Updated CLAUDE.md if new pattern introduced

### Definition of Done
Run through [/docs/claude-code/definition-of-done.md] checklist.

Specifically for this task:
- [ ] All acceptance criteria from [REFERENCE] pass
- [ ] [SPECIFIC CRITERION 1]
- [ ] [SPECIFIC CRITERION 2]

### Constraints
- Must follow TAD layer boundaries (Presentation → Application → Domain → Infrastructure)
- Use AI Provider Gateway, not Anthropic SDK directly
- All DB queries through Drizzle
- Tenant scoping applied to all user data queries
- TypeScript strict mode (no `any`)

### Open PR with title: [Feature] [Brief description]
```

### Ví dụ cụ thể:

```markdown
## Task: Build Feature A1 — Magic Link Sign-Up

### Context
Building magic link authentication per MVP V0 Feature A1.
Current phase: V0
Current week: Week 1, Day 6

### Reference Documents
- **Acceptance criteria:** /docs/mvp-v0/04-acceptance-criteria.md §4.1
- **TAD reference:** /docs/architecture/10-cross-cutting-concerns.md §10.1
- **Coverage status:** Per /docs/roadmap/06-coverage-matrix.md, Authentication is REAL in V0

### Scope of changes
**Files allowed to modify:**
- src/application/auth/*
- src/infrastructure/email/*
- src/db/schema/users.ts (if needed)
- src/components/auth/*

**Files NOT to modify:**
- Anything in src/domain outside auth context
- Existing scenario, persona, session code

### Expected output
- API endpoint POST /api/auth/magic-link/send
- API endpoint GET /api/auth/magic-link/verify
- Email template (Vietnamese)
- Database migration adding magic_link_tokens table
- Sign-up page UI component
- Unit tests for token generation, validation
- Integration test for full flow

### Definition of Done
- [ ] All acceptance criteria from §4.1 pass
- [ ] Token expires in 15 minutes
- [ ] Token is single-use
- [ ] Rate limit: max 5 requests per email per hour
- [ ] HTTP-only secure cookies for session
- [ ] Email delivery tested with real Resend integration
```

---

## Template #2: Fix Bug

**Khi dùng:** Fix 1 bug đã được identify.

```markdown
## Task: Fix Bug — [BRIEF DESCRIPTION]

### Bug Description
[1-2 sentences describing the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Expected: X. Actual: Y]

### Suspected Cause
[Your hypothesis if any. Otherwise: "Unknown — investigate"]

### Acceptance
- [ ] Bug no longer reproduces with steps above
- [ ] Test case added to prevent regression
- [ ] No related bugs introduced
- [ ] Existing tests still pass

### Constraints
- Minimal change scope. Do not refactor unrelated code.
- If fix requires architectural change, STOP and alert me.
- If root cause is in 3rd-party library, document workaround instead of patching upstream.
```

### Ví dụ:

```markdown
## Task: Fix Bug — Stress meter doesn't update during streaming

### Bug Description
Stress meter in VitalsZone doesn't update in real-time when AI persona response streams. It only updates after full response completes.

### Steps to Reproduce
1. Send a message to Mr. Alpha
2. Observe stress meter while response is streaming
3. Expected: meter updates as stress changes per token batch
4. Actual: meter stays static, jumps at end

### Suspected Cause
Likely the stress update is in `onFinish` callback of streamText, should be in `onChunk` instead.

### Acceptance
- [ ] Stress meter updates smoothly during streaming
- [ ] Test added to verify streaming + stress behavior
- [ ] No performance regression (no excessive re-renders)
```

---

## Template #3: Refactor

**Khi dùng:** Tidy up code mà không change functionality.

```markdown
## Task: Refactor — [WHAT]

### Reason for Refactor
[Why is this needed now? E.g., "Extracting repeated logic into shared utility before adding 3rd similar feature"]

### Scope
**Files to modify:**
- [LIST]

**Behavior must NOT change:**
- All existing tests must still pass
- No new bugs introduced
- No performance regression

### Expected outcome
- [Specific structural change, e.g., "Extract /api/persona/respond/* logic into PersonaInvoker class"]
- [Test changes only if needed for new structure]

### Constraints
- This is a refactor — no new features added
- No test deletions; if a test no longer makes sense, justify removal in PR description
- Behavior must be IDENTICAL before and after
```

---

## Template #4: Add Tests

**Khi dùng:** Improve test coverage on existing code.

```markdown
## Task: Add Tests for [COMPONENT]

### Current State
Test coverage for [COMPONENT] is at [X]%. Below the 70% threshold.

### Files to test
- [LIST]

### Test types needed
- [ ] Unit tests for pure logic
- [ ] Integration tests for [SPECIFIC FLOW]
- [ ] Edge cases: [LIST]
- [ ] Error paths: [LIST]

### Constraints
- Tests must be deterministic (no flaky tests)
- Mock external services (AI, email, etc.)
- Test data fixtures in /test/fixtures/
- Use Vitest, follow existing test conventions

### Acceptance
- [ ] Coverage > 70% for [COMPONENT]
- [ ] All tests pass on CI
- [ ] No production code changed (test additions only)
```

---

## Template #5: Database Migration

**Khi dùng:** Schema changes cần migration.

```markdown
## Task: Database Migration — [WHAT]

### Schema change
[Describe the change: new table, new column, etc.]

### Reason
[Why this change is needed, link to feature]

### Backward compatibility check
- [ ] This migration is backward-compatible (old code still works after migration applied)
- [ ] If NOT backward compatible, describe deployment strategy:
  - [Step 1: Deploy code that handles both schemas]
  - [Step 2: Run migration]
  - [Step 3: Deploy code that uses new schema only]

### Files to modify
- src/db/schema/*.ts
- New migration file in src/db/migrations/
- Affected query functions in src/infrastructure/database/

### Constraints
- Migration must be tested on a copy of dev DB before production
- Down migration must be implemented (rollback path)
- No data loss for existing rows

### Acceptance
- [ ] Schema change reflects intent
- [ ] Migration runs cleanly on fresh DB
- [ ] Migration runs cleanly on populated DB
- [ ] All existing queries still work
- [ ] New schema indexed appropriately
```

---

## Template #6: AI Prompt Iteration (HUMAN-LED, Claude Code assists)

**Khi dùng:** Iterate persona prompts. **Note:** Persona quality is too subjective for autonomous Claude Code work. Use this template for assistance only.

```markdown
## Task: Assist Persona Prompt Iteration — [PERSONA NAME]

### Role
You are assisting the human supervisor in iterating a persona prompt. The HUMAN evaluates prompt quality, you provide structural assistance only.

### Current prompt
[PASTE CURRENT PROMPT]

### Issues identified by human
1. [ISSUE 1]
2. [ISSUE 2]

### Assistance needed
- [ ] Suggest 2-3 alternative wordings for [SPECIFIC LAYER]
- [ ] Validate prompt against TAD §7.3 5-layer model
- [ ] Identify any missing constraints
- [ ] Format prompt for clarity (no behavior changes)

### What you should NOT do
- Do not autonomously change persona "voice" or "personality"
- Do not iterate without human review of each version
- Do not test persona against real users without human approval

### Output format
Present 2-3 options for human to choose. Don't pick one yourself.
```

---

## Template #7: Investigation / Analysis

**Khi dùng:** Cần Claude Code research codebase trước khi implement.

```markdown
## Task: Investigate — [QUESTION]

### Question to answer
[Specific question, e.g., "How is session state currently persisted? What touchpoints exist?"]

### Output expected
- Markdown document at /docs/investigations/[date]-[topic].md
- Findings, not recommendations
- File references with line numbers
- Diagrams if helpful (mermaid syntax)

### What you should NOT do
- Don't change code during investigation
- Don't propose solutions yet (separate task)
- Don't speculate beyond what code reveals

### Acceptance
- [ ] Document answers the question with code references
- [ ] No code changes in this task
- [ ] Document is in /docs/investigations/
```

---

## Template #8: Performance Optimization

**Khi dùng:** Một specific perf issue đã được measured.

```markdown
## Task: Optimize Performance — [SPECIFIC METRIC]

### Current state
[Metric] is currently [X], target is [Y].

### Measurement evidence
[Link to logs, monitoring screenshot, profiling output]

### Suspected bottleneck
[Hypothesis]

### Constraints
- Maintain functional behavior (existing tests must pass)
- Don't over-optimize (target is [Y], not 10x)
- Document tradeoffs in PR (e.g., memory ↑ for speed ↑)

### Acceptance
- [ ] Metric [X] now [Y or better]
- [ ] No regression on other metrics
- [ ] Test demonstrating optimization impact
```

---

## General Tips for Effective Task Prompts

### DO

✅ **Be specific**: "Build magic link auth per MVP V0 Feature A1" > "Add login"

✅ **Reference documents**: Link to TAD section, MVP feature ID

✅ **Define scope explicitly**: List files allowed/forbidden

✅ **State acceptance criteria**: How will you know it's done?

✅ **Mention constraints**: "Don't introduce new dependencies"

✅ **One task at a time**: If 2 features, 2 tasks. Don't bundle.

### DON'T

❌ **Vague goals**: "Make the chat better" — what's "better"?

❌ **Multiple features in one task**: Hard to review, hard to roll back

❌ **No reference to architecture**: Claude Code may improvise wrong patterns

❌ **No acceptance criteria**: How does Claude know it's done?

❌ **Open scope**: "Refactor anything that needs it" — too risky

❌ **Skipping context**: Don't assume Claude Code remembers from last session

---

## Session Start Pattern

At the start of every Claude Code session, send this brief prelude:

```markdown
Continuing LUMINA V0 development.
Current week: [N]
Last completed: [last PR or feature]
Next up: [next task from MVP V0 Feature List]

Please confirm you've read CLAUDE.md and have access to /docs/architecture/, /docs/roadmap/, /docs/mvp-v0/.

Ready for next task.
```

This primes Claude Code with context before you give the actual task.

---

## When to Override Templates

Templates are guides, not laws. Override when:

- Task is truly unique (use closest template + add custom sections)
- Quick experiment / spike (lighter template OK)
- Bug fix on something you wrote 5 minutes ago (heavier template overkill)

**Rule of thumb:** If task takes > 2 hours of Claude Code work, use full template. Quick tasks can use abbreviated form.
