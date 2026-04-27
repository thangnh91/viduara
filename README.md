# LUMINA Prototype v1.0

> **The Career Pre-Experience** — Sai thử ở đây, đúng cả cuộc đời.

EdTech platform giúp học sinh THPT trải nghiệm "sống thử" 1 nghề trong 7 ngày qua AI simulation, để đưa ra quyết định nghề nghiệp đúng đắn cho 4 năm đại học.

---

## 📦 Tổng quan

- **20 screens** HTML interactive, click-through prototype
- **3 domains**: Software Engineering (V1 Hero), Medical (V2), Marketing (V2)
- **8 user roles**: Learner, Parent, Designer, Persona Writer, Engineer, Curator, Operator, Super Admin
- **No backend required** — pure HTML/CSS/JS, static files
- **~13,000 dòng code** trong ~380KB

---

## 🚀 Cách dùng

### Quick Start

1. **Download** folder `lumina-prototype/` về máy
2. **Mở `index.html`** trong trình duyệt (Chrome, Firefox, Safari, Edge)
3. Click vào card bất kỳ để navigate đến từng màn

### Yêu cầu

- Trình duyệt modern (Chrome 90+, Firefox 85+, Safari 14+)
- Không cần internet (trừ load Google Fonts lần đầu)
- Không cần server

### Cấu trúc thư mục

```
lumina-prototype/
├── index.html                  ← Entry point (mở file này trước)
├── README.md                   ← File này
├── shared/
│   ├── design-system.css       ← Design tokens, components
│   └── navigation.js           ← Demo banner, helpers
└── screens/
    ├── 02-scenario-architect.html
    ├── 03-persona-studio.html
    ├── 04-widget-studio.html
    ├── 05-gateway.html
    ├── 06-hub.html
    ├── 07-workspace.html       ← ⭐ Trái tim sản phẩm
    ├── 08-buddy-chat.html      (modal)
    ├── 09-widget-preview.html  (modal)
    ├── 10-final-report.html    ← ⭐ Deliverable
    ├── 11-portfolio.html
    ├── 12-system-states.html
    ├── 13-orchestrator-console.html
    ├── 14-widget-catalog.html
    ├── 15-knowledge-vault.html
    ├── 16-analytics-dashboard.html
    ├── 17-session-replay.html
    ├── 18-user-mgmt.html
    ├── 19-role-mgmt.html
    └── 20-parent-dashboard.html
```

---

## 🎬 Demo Script cho Stakeholders

Khi present cho đầu tư/khách hàng/team, theo flow này (15-20 phút):

### Act 1: Vấn đề & Giải pháp (3 phút)

**Mở `index.html`**

> "Đây là LUMINA — platform giúp học sinh THPT trải nghiệm nghề trước khi chọn ngành.
> 60% sinh viên VN năm 1 cảm thấy chọn sai ngành. LUMINA giải quyết bằng cách cho học
> sinh 'sống thử' 1 nghề trong 7 ngày trước khi quyết định."

Highlight stats: 20 screens · 3 domains · 8 roles

### Act 2: Trải nghiệm học sinh (5 phút)

**Click `🚪 Gateway` (Screen 5)**

> "Học sinh bắt đầu ở Gateway — cánh cửa đầu tiên. Họ thấy:
> - 3 ngành đã có trong V1 (SE) hoặc V2 (Medical, Marketing)
> - AI gợi ý dựa trên trắc nghiệm
> - Mỗi ngành show: phù hợp với ai, thử thách, career paths
> - Critical: '60% học sinh vỡ mộng' — radical transparency"

**Click `🏠 Hub` (Screen 6)**

> "Sau khi chọn SE, học sinh vào Hub — daily home base:
> - Timeline 7 ngày: Day 3 'Crisis Hits' đang waiting
> - Knowledge cards đã thu được
> - Buddy Chip — companion suốt journey"

**Click `⚡ Workspace` (Screen 7) — TRÁI TIM**

> "Đây là trái tim sản phẩm — học sinh dành 80% thời gian ở đây.
> 3-zone layout:
> - **Trái:** Communication — chat với AI personas
> - **Giữa:** Execution — widget specific cho ngành
> - **Phải:** Vitals — stress meter, buddy mood, knowledge
>
> Hôm nay là Marketing Day 5 crisis — Anh Tùng đang giận, Chị Mai đang demanding,
> Chip đang giúp học sinh giữ bình tĩnh.
>
> Stress meter tăng = vignette tối, animation thay đổi.
> Khi vượt 85%, Chip can thiệp tự động."

**Đợi 30s, scroll qua chat**

> "Notice: AI personas có personality khác nhau, response trong vài giây,
> Buddy Chip support emotional. Đây không phải chatbot — đây là cast diễn xuất."

### Act 3: Deliverable — Final Report (4 phút)

**Click `📊 Final Report` (Screen 10)**

> "Sau 7 ngày, học sinh nhận Final Report — sản phẩm thực sự bán $19.99/scenario.
> 6 sections:
> 1. **Compatibility Score** — 78/100 với gauge visualization
> 2. **Cognitive Matrix** — radar 5 chiều: Tư duy, Xử lý dữ liệu, Đạo đức, Giao tiếp, Áp lực
> 3. **Stress Timeline** — bản đồ áp lực 7 ngày, key moments
> 4. **4-Year Forecast** — dự báo Year 1-2 'có thể bỏ học 40%', Year 3-4 'tỏa sáng'
> 5. **AI Panel Recommendations** — Tier A/B/X majors
> 6. **Parent Insight** — letter dành riêng cho phụ huynh"

**Scroll qua từng section**

> "Đây là deliverable — học sinh và phụ huynh sẽ DOWNLOAD và đọc lại nhiều lần.
> Phụ huynh đọc Section 6 → quyết định đầu tư cho con học ngành.
> Học sinh đọc Section 4 → biết sẵn sàng cho 4 năm sắp tới."

### Act 4: Multi-domain & Container Architecture (3 phút)

**Quay lại `index.html`, click `🏠 Hub`**

> "Bây giờ tôi sẽ cho thấy power của container architecture..."

**Click `📢 Marketing` chip ở demo banner**

> "Same Hub, nhưng ngành Marketing thay vì SE.
> Cùng layout, cùng workflow, nhưng:
> - Anh Tùng (Marketing Director) thay Mr. Alpha
> - CampaignDashboard widget thay CodeSpace
> - Knowledge cards: AARRR, CAC vs LTV, ROAS thay vì Big O
>
> 1 platform, ∞ scenarios. Tăng ngành = không build lại UI."

### Act 5: Admin Power (4 phút)

**Click `🎬 Scenario Architect` (Screen 2)**

> "Designer build scenarios như director làm phim:
> - 7-day timeline canvas
> - Drag-drop personas, widgets
> - Branch points cho học sinh chọn
> - Triggers cho dynamic events"

**Click `📈 Analytics Dashboard` (Screen 16)**

> "Operators monitor toàn platform:
> - Live KPIs: 127 active sessions, $1,245 revenue today
> - Cross-domain comparison: SE 1,234 sessions vs Medical 389
> - Active alerts: AI cost spike, hallucination rate up
> - Cost gauge: 73% budget burned"

**Click `⏪ Session Replay` (Screen 17)**

> "Khi có incident — VD: Mr. Alpha nói wrong info về Big O —
> Operator có thể replay đúng moment đó:
> - Stage rebuilds workspace học sinh thấy
> - Investigation panel show AI decision trace
> - Root cause analysis: 'Persona prompt missing knowledge card constraint'
> - One-click jump to Persona Studio để patch
>
> Privacy-first: full access mode chỉ unlock với justification, audit log immutable."

### Act 6: Wrap-up (2 phút)

**Quay về `index.html`**

> "Tổng kết:
> - **20 screens** prove platform hoạt động end-to-end
> - **Container architecture** scale ngành mới với 60% reuse code
> - **Multi-tier roles** support team 5 người (V1) → 50 người (V3)
> - **Privacy-first** với 3 transparency levels cho parent
>
> Production roadmap:
> - **V1 (Q3 2026):** SE Hero major + 3 internal designers
> - **V2 (Q1 2027):** Medical + Marketing + 8-10 designers
> - **V3 (Q3 2027):** Community contribution + B2B schools"

---

## 🎨 Design Decisions

### Tại sao "calm intensity"?

Học sinh stress khi quyết định ngành là natural. UI phải:
- Calm trong default state (paper texture, warm gold accent)
- Intense khi học sinh stress (vignette tối, animations changes)
- Không bao giờ alarmist (no red flashing, no scary error pages)

### Tại sao 3-zone Workspace?

Học sinh thực sự làm 3 việc song song:
1. Communication với team/AI (chat)
2. Execution công việc (widget)
3. Self-awareness (vitals)

Tách rõ 3 zones giúp focus và reduce cognitive load.

### Tại sao 5 endings?

Không phải mọi học sinh đều "phù hợp ngành". Việc admit "Wrong Fit" là VALUE — saves 4 năm + 100 triệu cho gia đình. 5 endings (Natural, Fighter, Wrong Fit, Reluctant, Burnout) cover full spectrum của outcomes.

### Tại sao Vietnamese-first?

Target: học sinh THPT VN. Tiếng Việt thoải mái hơn cho emotional content. English-only sẽ filter ra học sinh ESL — wrong audience.

---

## 🔧 Tech Stack (Prototype)

- **HTML5 + CSS3** vanilla
- **JavaScript** vanilla (no framework)
- **Google Fonts**: Fraunces (display), Inter Tight (body), JetBrains Mono (code)
- **Static assets only** — no API calls, no localStorage, no backend

### Production Stack (Suggested)

- **Frontend**: React/Next.js
- **Backend**: Node.js/Python
- **AI**: OpenAI/Anthropic API (multi-agent)
- **Database**: PostgreSQL + Redis
- **Auth**: Clerk/Auth0
- **Analytics**: Mixpanel + custom dashboards

---

## 📋 Bug Reports / Feedback

Đây là prototype — KHÔNG production code. Một số limitations đã biết:

1. **No real backend** — tất cả data static, không persist giữa sessions
2. **No auth** — bất kỳ ai cũng có thể access mọi role
3. **No mobile optimization cho complex screens** — Workspace, Architect tối ưu cho desktop
4. **Animations may be slow trên older browsers**
5. **Demo banner scenario switcher** chỉ visual, không thay đổi data

Cho production cần build từ scratch với specs đầy đủ trong `lumina-docs/`.

---

## 📚 Documentation

Specs đầy đủ ở folder `../lumina-docs/`:

- `01-Tong-quan-san-pham.md` — Product overview
- `02-Kien-truc-kich-ban.md` — Scenario architecture
- `03-Kien-truc-AI.md` — AI multi-agent system
- `04-Kien-truc-Widget.md` — Widget system
- `05-To-chuc-nguoi-dung.md` — User org & roles
- `06-Roadmap.md` — V1/V2/V3 roadmap
- `07-Information-Architecture.md` — IA tổng thể
- `flows/` — 8 user flows với Mermaid diagrams
- `screens/` — 19 screen specs (~16,500 dòng)

---

## 👥 Credits

**Design & Specs**: Created với Claude (Anthropic)
**Built**: Static HTML prototype
**License**: Internal use only — NOT for production

---

**Ready to demo? Open `index.html` to start.** 🚀
