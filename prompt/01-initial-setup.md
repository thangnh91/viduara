# Prompt #1 — Initial Setup

> **Dùng cho session ĐẦU TIÊN với Claude Code, khi repo còn trống**
> **Mục đích**: Setup project foundation theo TAD architecture

---

## Cách dùng

1. Tạo repo trống (hoặc clone repo Next.js mới)
2. Copy 4 thư mục documents vào `/docs/`:
   - `/docs/architecture/` (từ `lumina-tad/`)
   - `/docs/roadmap/` (từ `lumina-roadmap/`)
   - `/docs/mvp-v0/` (từ `lumina-mvp-v0/`)
   - `/docs/claude-code/` (từ `lumina-claude-code-setup/`)
3. Copy `CLAUDE.md` vào root repo
4. Mở Claude Code, paste prompt dưới đây

---

## Paste prompt này:

```
You are starting work on LUMINA, a career pre-experience EdTech platform 
for Vietnamese high school students. Today is Day 1 of the V0 sprint 
(5-week MVP).

## Your first task: Read and understand the project

Before doing ANYTHING else, read these documents in this exact order:

1. /CLAUDE.md (root) — Project context and architectural principles
2. /docs/architecture/README.md — TAD overview
3. /docs/architecture/01-introduction.md
4. /docs/architecture/02-architectural-goals.md
5. /docs/architecture/05-logical-architecture.md
6. /docs/architecture/06-data-architecture.md
7. /docs/architecture/07-ai-architecture.md
8. /docs/architecture/12-adrs.md
9. /docs/roadmap/README.md
10. /docs/roadmap/02-v0-mvp.md
11. /docs/roadmap/06-coverage-matrix.md
12. /docs/mvp-v0/README.md
13. /docs/mvp-v0/01-overview.md
14. /docs/mvp-v0/02-feature-list.md
15. /docs/mvp-v0/06-week-by-week.md
16. /docs/claude-code/CLAUDE.md (if exists separately from root CLAUDE.md)
17. /docs/claude-code/task-templates.md
18. /docs/claude-code/definition-of-done.md
19. /docs/claude-code/workflow-guide.md

After reading, summarize in 5-7 sentences:
- What LUMINA is (1 sentence)
- The current phase and timeline (1 sentence)
- The 8 architectural principles you must follow (1 sentence each, brief)
- The Week 1 focus of V0 (1 sentence)

DO NOT write any code yet. Just confirm understanding.

## After confirmation, your next task: Initialize the project

I will give you the green light to proceed. Then your task will be to 
setup the project foundation per Day 1 of /docs/mvp-v0/06-week-by-week.md:

1. Verify Next.js 15 project structure (or initialize if not present)
2. Configure TypeScript strict mode (per TAD §11.5 + ADR-005)
3. Setup folder structure matching TAD layered architecture:
   ```
   src/
     presentation/
     application/
     domain/
       scenario/
       persona/
       session/
       knowledge/
       widget/
       final-report/
       identity/
       tenancy/
     infrastructure/
       ai/
       database/
       email/
       cache/
   ```
4. Configure tooling:
   - ESLint with strict rules
   - Prettier
   - Husky pre-commit hooks (typecheck + lint + test)
   - Vitest for unit testing
   - Playwright for E2E (config only, no tests yet)
5. Setup environment variable validation (src/config/env.ts using Zod)
6. Create `.env.example` with placeholders for required vars
7. Setup database connection (Drizzle ORM + Neon Postgres) — connection 
   only, no schema yet
8. Setup AI Provider Gateway interface (TAD §7.6) — empty implementation, 
   just the interface
9. Configure Vercel deployment settings
10. Verify deployment with a "Hello LUMINA" page

## Constraints during setup

- Use pnpm (not npm or yarn)
- TypeScript strict: true, noUncheckedIndexedAccess: true, 
  exactOptionalPropertyTypes: true
- No `any` type anywhere
- All imports use `@/` alias for src/
- Create PR for setup work (do not commit directly to main)
- Setup work goes in branch `setup/foundation`

## What you should NOT do

- Do not write business logic yet (that's Week 1 Day 3+)
- Do not author persona prompts (that's a HUMAN task, not Claude Code)
- Do not setup payment integration (deferred to V1 per Coverage Matrix)
- Do not add features not in MVP V0 Feature List
- Do not introduce dependencies beyond what's needed for foundation

## Stop and ask the human if

- Any document you need to read is missing
- A setup decision conflicts with TAD or MVP V0 Scope
- You need credentials (Anthropic API key, Neon DB URL, etc.)
- A required tool/dependency is not available

## When to consider this task complete

The setup is complete when:
- Repo passes `pnpm typecheck` and `pnpm lint` with zero errors
- Repo passes `pnpm test --run` (no tests yet, but no failures)
- Vercel deploys successfully
- A team member can clone the repo, run `pnpm install`, and start dev 
  server without any manual configuration beyond setting .env values
- Folder structure matches TAD architecture exactly
- AI Provider Gateway interface exists (but unimplemented)

Open a PR titled "Setup: Foundation infrastructure for V0" with a 
description listing every file created and a checklist of the above.

Begin by reading the documents now. After you confirm understanding, 
I will give you the signal to start the setup work.
```

---

## Sau khi paste

Claude Code sẽ:
1. Đọc tất cả documents (mất 5-10 phút)
2. Summary 5-7 sentences về dự án
3. Đợi confirmation từ bạn

**Bạn verify**:
- Summary có chính xác không?
- Có hiểu đúng 8 architectural principles không?
- Có nhận thức được Week 1 focus là persona quality (HUMAN-LED) không?

Nếu summary đúng → reply: `Confirmed. Proceed with setup.`

Nếu sai → correct lại và yêu cầu re-read documents cần thiết.

---

## Expected duration

- **Reading + summary**: 5-10 phút
- **Setup work**: 1-2 giờ
- **Your review + merge PR**: 30 phút

**Total Day 1 với Claude Code**: ~2-3 giờ
