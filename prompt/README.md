# LUMINA — Claude Code Initial Prompts

> **Prompts để khởi tạo và chạy dự án LUMINA với Claude Code**

---

## 3 Prompts cần dùng

| # | File | Khi nào dùng |
|:--|:-----|:-------------|
| 1 | [01-initial-setup.md](./01-initial-setup.md) | **Session đầu tiên** — Khi repo trống, để setup foundation |
| 2 | [02-project-orientation.md](./02-project-orientation.md) | **Sau setup** — Cho Claude Code đọc và hiểu toàn bộ dự án |
| 3 | [03-daily-session-start.md](./03-daily-session-start.md) | **Mỗi ngày** — Brief Claude Code bắt đầu session |

## Cách dùng

### Lần đầu tiên:

```
1. Tạo repo trống
2. Copy documents vào (TAD, Roadmap, MVP V0, Claude Code setup)
3. Mở Claude Code trong repo
4. Paste Prompt #1 (Initial Setup)
5. Đợi Claude Code setup xong (~30-60 phút)
6. Paste Prompt #2 (Project Orientation)
7. Confirm Claude Code hiểu đúng
8. Bắt đầu task Tuần 1 đầu tiên
```

### Hàng ngày sau đó:

```
1. Mở Claude Code
2. Paste Prompt #3 (Daily Session Start)
3. Chờ Claude Code confirm context
4. Giao task tiếp theo (dùng task template)
```

## Quan trọng: Đọc trước khi paste

Mỗi prompt cần fill in một số placeholders `[...]` trước khi gửi:
- Tên repo
- Đường dẫn documents (nếu khác convention)
- Sprint week hiện tại
