# Prompt #3 — Daily Session Start

> **Dùng MỖI session làm việc** với Claude Code (sau lần đầu)
> **Mục đích**: Brief Claude Code re-orient với context mới nhất, không phải đọc lại all docs

---

## Khi nào dùng

- Mỗi buổi sáng khi mở Claude Code session mới
- Sau khi nghỉ giữa giờ và quay lại
- Sau khi có architectural change mà bạn đã update vào CLAUDE.md

---

## Template prompt (fill in placeholders)

```
Continuing LUMINA V0 development.

## Current state

- Current week: [WEEK_NUMBER] (e.g., Week 2)
- Current day: [DAY_NUMBER] (e.g., Day 9)
- Days remaining in V0: [N]

## Last session

- Last task completed: [TASK_OR_PR, e.g., "PR #8 — Vitals zone with stress meter"]
- Status: [merged / pending review / in progress]

## Today's plan

- Primary task: [TASK_FROM_WEEK_BY_WEEK, e.g., "Day 9 — Chat Zone with streaming AI responses"]
- Reference: /docs/mvp-v0/06-week-by-week.md and /docs/mvp-v0/02-feature-list.md feature [FEATURE_ID]

## Confirm before proceeding

Please confirm:
1. You have read /CLAUDE.md (latest version)
2. You remember the 8 architectural principles (briefly list them by name only)
3. You understand the architecture layer boundaries (1 sentence)
4. You know what's in V0 scope vs deferred (1 sentence)

After confirmation, I will paste the task using a template from 
/docs/claude-code/task-templates.md.

If anything in CLAUDE.md has changed since your last session, flag it.

Ready?
```

---

## Bạn cần fill in những placeholders

| Placeholder | Example |
|:------------|:--------|
| `[WEEK_NUMBER]` | Week 1, Week 2, Week 3, Week 4, Week 5 |
| `[DAY_NUMBER]` | Day 1 đến Day 35 |
| `[N]` (days remaining) | 30, 25, 15, etc. |
| `[TASK_OR_PR]` | "PR #12 — Day 3 crisis trigger" hoặc "Feature W6 — Stress meter" |
| `[merged/pending review/in progress]` | Status of last task |
| `[TASK_FROM_WEEK_BY_WEEK]` | Lấy từ /docs/mvp-v0/06-week-by-week.md cho day hiện tại |
| `[FEATURE_ID]` | A1, W4, B3, F2, etc. từ feature list |

---

## Sau khi Claude Code confirm

Expected response từ Claude Code:

```
Confirmed.

1. I've read CLAUDE.md.
2. 8 principles: Layer Boundaries, AI Gateway, Drizzle ORM, Tenant 
   Scoping, TypeScript Strict, Error Handling, Server-Side Permission 
   Checks, No Secrets in Code.
3. Layer boundaries: Presentation → Application → Domain → 
   Infrastructure (downward only).
4. V0 scope: real auth, 1 scenario, 3 personas, CodeSpace widget, 
   Final Report. Deferred: payment, parent dashboard, mobile native, 
   additional domains.

No changes detected in CLAUDE.md since last session.

Ready for today's task.
```

**Bạn verify**:
- Có list được 8 principles không? (không cần đầy đủ exact wording, chỉ cần đủ ý)
- Có nắm layer boundaries đúng không?
- Có phân biệt V0 vs deferred đúng không?

Nếu OK → paste task từ template.
Nếu sai → reply: `Re-read /CLAUDE.md before we proceed. Then re-confirm.`

---

## Quick version (dùng khi đã có rapport tốt)

Sau 2-3 tuần làm việc với cùng Claude Code session/context, có thể dùng quick version:

```
LUMINA V0 — Day [N].
Last: [TASK]
Next: [TASK + reference]
Confirm CLAUDE.md read, ready for task?
```

Nhưng nếu có dấu hiệu Claude Code drift (làm sai pattern, quên rules), quay lại dùng full version.

---

## Một note nhỏ về session continuity

Claude Code mỗi session là độc lập — **không nhớ context** từ session trước trừ khi bạn nhắc. Đây là lý do prompt này quan trọng:

- ✅ **Đúng**: Brief Claude Code mỗi session về state hiện tại
- ❌ **Sai**: Giả định Claude Code nhớ "hôm qua chúng ta đã quyết định X"

Mọi quyết định lớn phải được document trong:
- PR description
- Commit message
- CLAUDE.md (nếu là architectural pattern)
- /docs/decisions/ (nếu là ADR mới)

Tránh trường hợp "chúng ta đã thảo luận chuyện này rồi" — không, Claude Code chưa thấy.

---

## Tóm tắt 3 prompts

| Prompt | Khi dùng | Tần suất | Time |
|:-------|:---------|:--------|:-----|
| #1 Initial Setup | Day 1, repo trống | 1 lần | 2-3 giờ |
| #2 Orientation | Sau setup, hoặc khi cần re-orient | 1-2 lần | 15-30 phút |
| #3 Daily Start | Mỗi session | Hàng ngày | 2-5 phút |
