# LUMINA — Claude Code Setup

> **Files để Claude Code làm việc hiệu quả với LUMINA project**

---

## Tổng quan

Folder này chứa các artifacts đặc biệt dành cho **Claude Code workflow** — không phải human reader. Mỗi file có vai trò cụ thể trong việc supervise Claude Code khi build LUMINA.

## Files

| File | Vai trò | Khi nào dùng |
|:-----|:--------|:-------------|
| [CLAUDE.md](./CLAUDE.md) | Project context cho Claude Code đọc | Đặt ở repo root, Claude Code tự đọc mỗi session |
| [task-templates.md](./task-templates.md) | Mẫu prompt cho các loại task | Copy-paste khi giao task cho Claude Code |
| [definition-of-done.md](./definition-of-done.md) | Checklist trước khi merge PR | Review PR Claude Code tạo |
| [workflow-guide.md](./workflow-guide.md) | Daily workflow + setup checklist | Hướng dẫn cách dùng Claude Code hiệu quả |

## Cách sử dụng

### Setup ban đầu (1 lần)

1. **Khởi tạo repo LUMINA** (Next.js project)
2. **Copy `CLAUDE.md` vào repo root** — Claude Code sẽ tự đọc mỗi khi bạn mở session
3. **Copy 3 documents khác** vào `/docs/claude-code/` trong repo
4. **Bookmark** [task-templates.md](./task-templates.md) để copy-paste khi giao task

### Daily workflow

1. **Sáng**: review PRs Claude Code tạo đêm qua, dùng [DoD checklist](./definition-of-done.md)
2. **Giao task mới**: dùng template từ [task-templates.md](./task-templates.md)
3. **Tối**: update CLAUDE.md nếu architectural pattern thay đổi

Chi tiết: xem [workflow-guide.md](./workflow-guide.md)

## Companion documents

Các documents này được Claude Code reference qua CLAUDE.md:

- [Technical Architecture Document](../architecture/README.md)
- [Roadmap & Implementation Phases](../roadmap/README.md)
- [MVP V0 Scope Definition](../mvp-v0/README.md)
