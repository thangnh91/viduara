# LUMINA

> **The Career Pre-Experience** — Sai thử ở đây, đúng cả cuộc đời.

EdTech platform giúp học sinh THPT Việt Nam "sống thử" 1 nghề trong 7 ngày qua AI simulation, trước khi chọn ngành đại học.

---

## Monorepo Structure

```
viduara/
├── apps/
│   ├── web/          ← Next.js 16 (App Router) — giao diện người dùng
│   └── api/          ← Hono + Node.js — backend API
├── packages/
│   ├── config/       ← tsconfig, eslint configs dùng chung
│   └── types/        ← TypeScript types dùng chung (FE + BE)
├── docs/             ← Architecture, roadmap, MVP V0 specs
├── .env.example      ← Template biến môi trường
└── pnpm-workspace.yaml
```

- **Web** chạy ở `http://localhost:3000`
- **API** chạy ở `http://localhost:3001`

---

## Chạy Local

### 1. Yêu cầu

- Node.js ≥ 20
- pnpm ≥ 9 (`npm install -g pnpm`)

### 2. Clone và cài dependencies

```bash
git clone <repo-url>
cd viduara
pnpm install
```

### 3. Tạo file `.env`

```bash
cp .env.example .env
```

Sau đó điền các giá trị vào `.env`:

| Biến | Lấy ở đâu |
| --- | --- |
| `DATABASE_URL` | [neon.tech](https://neon.tech) → tạo project → Connection string |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `AUTH_SECRET` | Chạy: `openssl rand -base64 32` |
| `EMAIL_FROM` | Email domain của bạn (hoặc để mặc định cho local dev) |

> **Lưu ý:** `apps/api` đọc `.env` từ thư mục **gốc** của monorepo (không phải `apps/api/.env`).

### 4. Chạy development servers

```bash
pnpm dev
```

Lệnh này khởi động cả `apps/web` và `apps/api` song song.

Hoặc chạy riêng từng app:

```bash
pnpm --filter @lumina/web dev    # chỉ frontend
pnpm --filter @lumina/api dev    # chỉ backend
```

### 5. Kiểm tra

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend health: [http://localhost:3001/health](http://localhost:3001/health)

---

## Các lệnh thường dùng

```bash
# Quality checks (chạy trước khi commit/PR)
pnpm typecheck      # TypeScript strict check toàn bộ monorepo
pnpm lint           # ESLint toàn bộ monorepo
pnpm test:run       # Vitest toàn bộ monorepo

# Database
pnpm --filter @lumina/api db:generate   # Generate migration từ schema
pnpm --filter @lumina/api db:migrate    # Apply migrations
pnpm --filter @lumina/api db:studio     # Drizzle Studio UI

# Chạy lệnh cho 1 app cụ thể
pnpm --filter @lumina/web <script>
pnpm --filter @lumina/api <script>
```

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, Tailwind v4 |
| Backend | Hono, Node.js, TypeScript |
| Database | Postgres (Neon serverless), Drizzle ORM |
| AI | Anthropic Claude (qua AI Provider Gateway) |
| Email | Resend |
| Auth | Magic link (V0), JWT |
| Monorepo | pnpm workspaces |
| Deploy | Vercel (web) + Railway/Render (api) |

---

## Tài liệu

- `docs/architecture/` — Technical Architecture Document
- `docs/roadmap/` — Roadmap & phasing (V0 → V1 → V2)
- `docs/mvp-v0/` — Scope chính xác của V0 sprint
- `CLAUDE.md` — Hướng dẫn cho Claude Code (conventions, forbidden patterns)
