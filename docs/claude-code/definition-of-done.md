# Definition of Done — Checklists

> **Run through these checklists BEFORE merging code Claude Code creates. Catches issues that automated tests miss.**

---

## Cách dùng

Khi Claude Code tạo PR và báo "ready to merge":

1. **Đọc PR description** — Claude Code tự nói gì đã làm
2. **Run checklist phù hợp** với loại PR (feature/bug/refactor/etc.)
3. **Nếu có item nào fail** — request changes, đừng merge
4. **Tất cả pass** — merge

Mỗi PR phải pass **General Checklist** + **Type-Specific Checklist**.

---

## General Checklist (Tất cả PRs)

### Code Quality
- [ ] TypeScript strict passes (no `any` without justification comment)
- [ ] ESLint passes (no warnings ignored)
- [ ] No commented-out code blocks
- [ ] No `console.log` in production paths (only in dev/debug utilities)
- [ ] No `// @ts-ignore` without justification
- [ ] No TODOs without issue reference (`// TODO(#123): ...`)

### Testing
- [ ] Unit tests added for new logic
- [ ] Tests pass locally (`pnpm test`)
- [ ] Test coverage > 70% for new code (check coverage report)
- [ ] Manual smoke test passed (you actually used the feature)

### Architecture (TAD compliance)
- [ ] Layer boundaries respected (Presentation → Application → Domain → Infrastructure)
- [ ] AI calls go through Provider Gateway, not Anthropic SDK directly
- [ ] DB queries use Drizzle, no raw SQL outside migrations
- [ ] Tenant ID applied to all queries on user data
- [ ] Custom interfaces used for external systems (not provider-specific types in domain)

### Security
- [ ] No secrets/keys/tokens committed
- [ ] Input validation on all API endpoints (Zod schemas or equivalent)
- [ ] Authorization checked server-side on all sensitive endpoints
- [ ] No SQL injection vectors (parameterized queries via Drizzle)
- [ ] No XSS vectors (proper output encoding)
- [ ] CSRF protection on state-changing endpoints

### Documentation
- [ ] PR description references relevant TAD section
- [ ] PR description lists MVP V0 acceptance criteria met
- [ ] CLAUDE.md updated if new architectural pattern introduced
- [ ] New "common gotcha" added if you discovered one
- [ ] Public APIs/functions have JSDoc comments

### Observability
- [ ] Errors logged with structured context (not just `console.error`)
- [ ] Important business events emitted (e.g., `session.day.completed`)
- [ ] Cost tracking added if new AI calls introduced
- [ ] Performance metrics if hot path

---

## Type-Specific Checklists

### A. Feature PR Checklist

**Use for:** New feature implementation per MVP V0 Feature List.

#### Functional
- [ ] Feature works end-to-end as described in MVP V0 acceptance criteria
- [ ] All listed acceptance criteria checked and verified
- [ ] Happy path manually tested
- [ ] Error paths manually tested (network down, AI failure, etc.)
- [ ] Edge cases handled (empty state, max limits, concurrent users)

#### UX
- [ ] Loading states shown for operations > 500ms
- [ ] Error messages user-friendly (Vietnamese, friendly tone, actionable)
- [ ] Mobile responsive (works on tablet at minimum for V0)
- [ ] Accessible (keyboard navigation, screen reader basic support)

#### Integration
- [ ] Doesn't break existing features (run full E2E smoke test)
- [ ] Database migrations are backward-compatible
- [ ] New env vars documented in `.env.example` and Vercel dashboard
- [ ] Feature flag added if risky (allows quick disable)

#### Data
- [ ] User data follows TAD §6.5 classification (Public/Internal/Confidential/Restricted)
- [ ] PII protected per TAD §10.3
- [ ] Consent captured if collecting new data type
- [ ] Audit log entry if operator-visible action

---

### B. Bug Fix PR Checklist

**Use for:** Bug fixes.

- [ ] Bug no longer reproduces with original steps
- [ ] Test case added that fails before fix, passes after
- [ ] Root cause identified and described in PR
- [ ] Related areas checked (is this a class of bugs, not a single instance?)
- [ ] Fix is minimal scope (no unrelated refactoring)
- [ ] Existing tests still pass
- [ ] Hotfix label applied if production-affecting

---

### C. Refactor PR Checklist

**Use for:** Code restructuring without behavior change.

- [ ] Behavior is IDENTICAL before and after (verified by existing tests)
- [ ] All existing tests pass
- [ ] No tests deleted (if any deletion, justified in PR description)
- [ ] Coverage same or better
- [ ] Performance same or better (no regression)
- [ ] Code is genuinely clearer (not just different)
- [ ] Refactor scope limited (no scope creep into related areas)

---

### D. Database Migration PR Checklist

**Use for:** Schema changes.

- [ ] Migration tested on fresh DB
- [ ] Migration tested on copy of populated DB
- [ ] Migration is backward-compatible (or deployment strategy documented)
- [ ] Down migration implemented (rollback path)
- [ ] Indexes added for new query patterns
- [ ] Existing queries still work (run full test suite)
- [ ] Migration committed with corresponding code changes
- [ ] Documented in `/docs/migrations/` if non-trivial

---

### E. AI/Persona PR Checklist

**Use for:** Changes to AI personas, prompts, or orchestration.

- [ ] Persona changes reviewed by human before deploy (NOT just Claude Code judgment)
- [ ] Prompt changes versioned (old version preserved per TAD ADR-010)
- [ ] Cost impact assessed (new prompt longer = more tokens = more $)
- [ ] Quality sample taken: 10 sample conversations reviewed
- [ ] Persona constraints still enforced (length limits, forbidden behaviors)
- [ ] Knowledge card references still accurate
- [ ] Multi-agent orchestration: priority matrix updated if new persona

---

### F. Performance PR Checklist

**Use for:** Performance optimizations.

- [ ] Before/after metrics included in PR description
- [ ] Target metric improved
- [ ] No regression on other metrics
- [ ] Tradeoffs documented (e.g., memory ↑ for speed ↑)
- [ ] Test demonstrating performance impact
- [ ] Not premature optimization (was a real bottleneck identified)

---

### G. Security PR Checklist

**Use for:** Security-related changes.

- [ ] CVE / vulnerability description in PR
- [ ] Severity assessed (Critical/High/Medium/Low)
- [ ] Fix doesn't introduce new vulnerabilities
- [ ] Tests cover the security scenario
- [ ] Logging added for security events (auth failures, etc.)
- [ ] If user-facing impact, communication plan ready
- [ ] If credential rotation needed, executed before merge

---

## Pre-Merge Final Checks

After all checklists above pass, before clicking "Merge":

1. **Run CI one more time** — sometimes flaky tests
2. **Check live preview** — Vercel preview URL shows the change working
3. **Squash commits** if many small commits during development
4. **Update CHANGELOG.md** if change is user-visible
5. **Tag related issues** in PR description (`Closes #123`)

After merge:

1. **Watch deployment** — Vercel auto-deploys to staging
2. **Smoke test on staging** — quick manual check
3. **Monitor error rate** for 1 hour after production deploy
4. **Update sprint progress** in your tracking tool

---

## Red Flags — DO NOT MERGE

If you see any of these, **stop and investigate** before merging:

🚫 **Tests disabled or skipped** without justification
🚫 **`@ts-ignore` added** to silence type errors
🚫 **`any` type added** in domain layer
🚫 **Direct database queries** in presentation layer
🚫 **Hardcoded values** that should be config
🚫 **Authentication bypassed** "temporarily for testing"
🚫 **PII logged in plaintext**
🚫 **Cross-tenant data access** without explicit elevation
🚫 **AI calls without cost tracking**
🚫 **Migration that drops a column** with existing data
🚫 **`force-push` to main branch**

When in doubt, request changes. Asking 1 extra question costs nothing. Merging bad code costs hours later.

---

## Communication After Review

### If approving:
> "✅ LGTM. Merging."

### If requesting changes:
> "Hi Claude Code, before merging:
> - [Issue 1] — [why this is a problem, link to relevant doc]
> - [Issue 2] — [...]
>
> Please address and re-request review."

Be specific. "This is wrong" doesn't help Claude Code fix it. "This violates TAD §5.2 because Presentation is calling Database directly" tells Claude Code exactly what to change.

---

## Self-Audit Quarterly

Every 3 months (or at phase transitions), review this DoD document:

- [ ] Are all items still relevant?
- [ ] New patterns to add to checklists?
- [ ] Items that always pass — remove (not adding value)
- [ ] Items that frequently fail — investigate root cause

Update this document. Stale checklists become noise.
