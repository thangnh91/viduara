# Claude Code Workflow Guide

> **Cách tận dụng Claude Code hiệu quả với LUMINA project**

---

## Setup ban đầu (Day 1)

### Bước 1: Cài đặt Claude Code

Nếu chưa cài Claude Code:

```bash
# Cài Claude Code CLI (xem https://docs.claude.com để có hướng dẫn cập nhật)
# Sau đó authenticate với Anthropic account
```

### Bước 2: Tạo repo LUMINA

```bash
# Tạo Next.js project
pnpm create next-app@latest lumina --typescript --tailwind --app --src-dir
cd lumina

# Init git
git init
git branch -M main

# Tạo GitHub repo (private), push lên
gh repo create lumina --private --source=. --remote=origin --push
```

### Bước 3: Copy documents vào repo

```bash
# Tạo cấu trúc docs
mkdir -p docs/architecture docs/roadmap docs/mvp-v0 docs/claude-code

# Copy 4 bộ documents (từ máy local của bạn)
cp -r ../lumina-tad/* docs/architecture/
cp -r ../lumina-roadmap/* docs/roadmap/
cp -r ../lumina-mvp-v0/* docs/mvp-v0/
cp -r ../lumina-claude-code-setup/* docs/claude-code/

# QUAN TRỌNG: copy CLAUDE.md vào repo root (không phải subfolder)
cp ../lumina-claude-code-setup/CLAUDE.md ./CLAUDE.md

# Commit initial documents
git add .
git commit -m "Initial documents: TAD, Roadmap, MVP V0 Scope, Claude Code setup"
git push
```

### Bước 4: Setup tooling (rất quan trọng cho Claude Code workflow)

Edit `tsconfig.json` để strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Setup pre-commit hooks với Husky:

```bash
pnpm add -D husky lint-staged
pnpm husky init

# Edit .husky/pre-commit:
echo "pnpm typecheck && pnpm lint && pnpm test --run" > .husky/pre-commit
```

Setup GitHub branch protection:
- Vào GitHub repo → Settings → Branches → Add rule for `main`
- Require pull request reviews
- Require status checks to pass
- Include administrators

→ **Kết quả:** Claude Code không thể merge code nếu test/lint/type fail. Bạn không phải nhắc.

### Bước 5: Test Claude Code có context

Mở Claude Code session đầu tiên trong repo:

```
You: "Read CLAUDE.md and tell me what project this is and what the current phase scope is."
```

Claude Code phải trả lời chính xác về LUMINA, V0, 5 tuần. Nếu không, file CLAUDE.md không được đọc — kiểm tra path.

---

## Daily Workflow

### Pattern 1: Build feature mới

**Sáng (15-30 phút):**

1. Mở MVP V0 Feature List → chọn feature tiếp theo
2. Mở Claude Code session
3. Send prelude:
   ```
   Continuing LUMINA V0 development.
   Current week: 2, Day 9
   Last completed: PR #5 (Workspace shell layout)
   Next up: Feature W4 — Streaming AI responses
   
   Please confirm you've read CLAUDE.md.
   Ready for next task.
   ```
4. Send task using template từ `task-templates.md`

**Trong khi Claude Code build:**

- Bạn có thể làm việc khác
- Check in mỗi 30-60 phút
- Nếu Claude Code stuck → unblock bằng câu hỏi clarifying

**Khi Claude Code báo PR ready:**

- Open PR trên GitHub
- Run [Definition of Done checklist](./definition-of-done.md)
- Test manually trên Vercel preview URL
- Approve hoặc request changes
- Merge khi pass

### Pattern 2: Fix bug

**Khi user report bug hoặc bạn discover:**

1. Reproduce locally để confirm
2. Mở Claude Code session
3. Send task using "Fix Bug" template
4. Provide steps to reproduce + suspected cause
5. Review fix, ensure test added
6. Merge

### Pattern 3: Daily maintenance

**Cuối ngày (15 phút):**

- Review tất cả PRs đã merge hôm nay
- Check Sentry errors (nếu có production)
- Check AI cost dashboard
- Update sprint tracking
- Note insights cho mai (CLAUDE.md updates nếu cần)

---

## Effective Communication với Claude Code

### Khi giao task — DO

✅ **Reference docs**: "Per TAD §10.1, build magic link auth"
✅ **Specify scope**: "Files allowed: src/application/auth/*"
✅ **Define done**: "Acceptance criteria from MVP V0 §4.1"
✅ **Mention constraints**: "Use AI Provider Gateway, not direct SDK"
✅ **One task at a time**: Don't bundle 3 features

### Khi giao task — DON'T

❌ **Vague**: "Make the login better"
❌ **Open scope**: "Refactor whatever needs it"
❌ **No reference**: Skipping TAD/MVP context
❌ **Skipping context**: Assuming Claude Code remembers from yesterday
❌ **Trust without verify**: Don't merge without running checklist

### Khi review PR — DO

✅ **Specific feedback**: "Line 42 violates layer boundary because UI is calling DB directly. Should use a service in /application/."
✅ **Link to docs**: "See TAD §5.2"
✅ **Suggest alternatives**: "Consider extracting this into a hook"

### Khi review PR — DON'T

❌ **"This is wrong"** — what's wrong? how to fix?
❌ **Auto-merge** — always check
❌ **Skip checklist** — speeds you up short-term, hurts long-term

---

## Time Budget (Realistic)

Với commitment ~15 hours/tuần (2-3 hours/day, 5 days/week):

| Activity | Time/week |
|:---------|:----------|
| Task planning + giao việc Claude Code | 2-3h |
| Code review (PRs) | 5-7h |
| Manual testing | 2-3h |
| Architectural decisions, ambiguity resolution | 1-2h |
| Documentation updates (CLAUDE.md) | 30min |
| User feedback monitoring (during beta) | 1-2h |
| **Total** | **~12-17h/week** |

Nếu bạn có < 10h/tuần → V0 sẽ slip. Realistic. Chấp nhận extend timeline hoặc giảm scope.

---

## Common Pitfalls và cách tránh

### Pitfall 1: "Claude Code-driven development"

**Triệu chứng**: Bạn approve mọi PR Claude Code tạo mà không thực sự review. Sau 3 tuần, codebase có nhiều issues bạn không biết.

**Phòng tránh**: 
- Luôn run DoD checklist
- Nếu không có thời gian review kỹ → bảo Claude Code chờ, không merge
- Spot-check 100% lines, không chỉ skim

### Pitfall 2: Mất context giữa sessions

**Triệu chứng**: Claude Code làm sai vì không biết quyết định bạn đã đưa ra ở session trước.

**Phòng tránh**:
- Document mọi quyết định lớn trong PR description hoặc commit message
- Update CLAUDE.md khi pattern thay đổi
- Send prelude mỗi session đầu

### Pitfall 3: Scope creep

**Triệu chứng**: Bạn nói "cũng add luôn X" giữa task. Task vốn 2 hours thành 6 hours.

**Phòng tránh**:
- Stick to MVP V0 Scope
- Mỗi "ý tưởng mới" → ghi vào backlog cho V1
- "Yes, but for V1" thay vì "Yes, let's add now"

### Pitfall 4: Quality drift

**Triệu chứng**: Tuần 1 code đẹp, tuần 4 code có nhiều shortcut.

**Phòng tránh**:
- DoD checklist không thay đổi qua thời gian
- Refuse to lower standards under deadline pressure
- Nếu không ship được với quality → cut scope, không cut quality

### Pitfall 5: Không update CLAUDE.md

**Triệu chứng**: CLAUDE.md từ Day 1 vẫn nguyên ở Day 30. Patterns mới không được capture.

**Phòng tránh**:
- Mỗi PR introduce architectural pattern → update CLAUDE.md
- Weekly review CLAUDE.md content
- Gotchas mới phát hiện → ghi ngay vào "Common Gotchas" section

---

## Sample Session Transcript

Đây là ví dụ session thực tế nên trông như thế nào:

```
[YOU]
Continuing LUMINA V0 development.
Current week: 2, Day 11
Last completed: PR #8 (Vitals zone with stress meter)
Next up: Feature C1 — Monaco Editor integration

Please confirm you've read CLAUDE.md.

[CLAUDE CODE]
Confirmed. I've read CLAUDE.md. LUMINA is a career pre-experience EdTech platform, currently in V0 phase. I understand the architectural principles: layer boundaries, AI through Gateway, Drizzle for DB, tenant scoping, TypeScript strict, no `any`.

Ready for next task.

[YOU]
[Pastes Template #1: Build New Feature, filled in for Feature C1]

[CLAUDE CODE]
Understood. Plan:
1. Install monaco-editor package
2. Create CodeSpace component in /presentation/widgets/codespace/
3. Configure TypeScript syntax highlighting
4. Implement editor in WidgetZone
5. Add basic toolbar (run button, file selector)
6. Tests for component rendering and interactions

Proceeding. Will open PR when complete.

[Claude Code works for 30-45 minutes]

[CLAUDE CODE]
PR #9 opened. Summary:
- Added monaco-editor dependency
- CodeSpace component renders with TypeScript syntax
- Mock execution returns hardcoded outputs
- 5 unit tests + 1 integration test
- Coverage 78% for new code

Note: Decided to use Monaco's built-in TypeScript service rather than custom service. This adds ~2MB to bundle. Acceptable for V0 (desktop only). Mentioned in PR description.

[YOU]
[Reviews PR using DoD Feature checklist]

Hi Claude Code, before merging:
- Line 67 in code-space.tsx: the editor instance leaks if component unmounts mid-load. Need cleanup in useEffect return.
- Tests don't cover the unmount scenario. Please add.
- Bundle size 2MB is acceptable but document in PR description with link to size analysis.

[CLAUDE CODE]
Understood. Fixing now.

[10 minutes later]

[CLAUDE CODE]
PR updated:
- useEffect cleanup added (line 67-72)
- Test for unmount during load added
- Bundle analysis screenshot attached, documented in PR

[YOU]
[Re-runs checklist, all pass]

LGTM. Merging.
```

---

## Phase Transitions

### V0 → V0.5 (after competition)

- Update CLAUDE.md "Current Sprint Focus" section
- Review all "TODO V1" comments — promote to issues
- Activate any cuts in V0 → restore in V0.5

### V0.5 → V1

- Major CLAUDE.md update — V1 phase introduces commercial concerns
- Add payment patterns to forbidden/required lists
- Update DoD with B2C-specific checks (PII handling for paid users, etc.)

### V1 → V2

- Significant CLAUDE.md update — multi-domain architectural patterns
- Add domain-extraction checklist
- Update task templates for cross-domain work

---

## Final Reminders

1. **Documents > guesswork**: Always reference docs in tasks
2. **Verify > trust**: Always run DoD checklist
3. **Quality > velocity**: Don't ship bad code under deadline pressure
4. **Update > assume**: CLAUDE.md is living, update it
5. **One task > many**: Bundle = bad reviews
6. **Specific > vague**: Both giving tasks and reviewing PRs

Bạn là supervisor + reviewer + product owner. Claude Code là implementer. Phân vai rõ giúp cả hai làm việc tốt.
