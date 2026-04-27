# Screen 07 — Workspace

**Màn hình số:** 7  
**Phase:** B — Learner Core  
**Complexity:** ⭐⭐⭐⭐⭐ (Rất cao — trái tim sản phẩm)  
**Primary users:** Học sinh (Learner)  
**Related flow:** Flow 02 — Trải nghiệm một ngày  
**Dependencies:** Screen 1 (Design System), Screen 6 (Hub), tất cả widgets trong Widget Registry

---

## 0. Multi-domain Context

Workspace là container đa ngành. Wireframes trong spec này dùng **SE Day 3 (Khủng hoảng hệ thống)** làm ví dụ minh họa, nhưng cùng 3-zone layout (Communication / Execution / Vitals) áp dụng cho mọi scenarios từ mọi ngành.

**Examples used in this spec:**
- **Software Engineering**: SE Day 3 - Server crash với LogHunter widget + Mr. Alpha/Boss Nam personas
- **Medical** (V2): Medical Day 3 - ER crisis với PatientMonitor widget + Dr. Linh/Y tá Trang personas
- **Marketing** (V2): Marketing Day 5 - Campaign crisis với CampaignDashboard widget + Anh Tùng/Chị Mai personas

Trong runtime, học sinh chỉ trải nghiệm 1 scenario tại 1 thời điểm. Workspace render những gì scenario configured. Section 13 cuối spec sẽ show 3 instances cụ thể.

⚠ **Note for readers:** Tất cả wireframes ASCII (chat messages, widget area, vitals) bên dưới dùng SE làm sample. Cùng layout và interaction patterns hoạt động cho mọi domain.

---

## 1. Mục đích màn hình

Workspace là **trái tim của LUMINA** — nơi học sinh "sống" 80% thời lượng trải nghiệm mỗi ngày. Đây là màn hình đo lường, gây áp lực, và tạo ra dữ liệu cho báo cáo Career-Fit.

**Ba chức năng cốt lõi:**

1. **Tương tác với AI Personas** (chat, nhận hướng dẫn, bị áp lực)
2. **Thao tác với Widgets** (code, drag, drop — mô phỏng tool thực tế)
3. **Theo dõi Vitals** (stress meter, buddy mood, knowledge cards)

### Metaphor thiết kế

Workspace giống như **cockpit** của một chiếc máy bay mô phỏng. Phi công (học sinh) ngồi giữa:
- **Radio communications** (Chat với tháp điều khiển / đồng nghiệp / sếp) — cột trái
- **Control panel** (Widget thực hành) — giữa
- **Vital instruments** (Stress, fuel, altitude) — cột phải

Mỗi quyết định đều có hậu quả thấy được ngay lập tức.

### Triết lý cốt lõi

Theo **Design System Principle #2**: *"Áp lực phải cảm nhận được."*

Workspace không được "làm cho dễ chịu" những khoảnh khắc khó khăn. Khi stress cao, viền màn hình nhấp nháy đỏ. Khi sếp ping đột ngột, notification rung mạnh. Khi thời gian sắp hết, countdown pulsing. Đây không phải UI "đẹp" theo nghĩa thông thường — đây là UI **trung thực với cảm xúc**.

---

## 2. Users & Use Cases

### Primary user: Học sinh (Learner)

**Context khi sử dụng:**
- Đã hoàn thành onboarding + chọn ngành
- Đang trong 1 trong 7 ngày của scenario
- Có thể là lần đầu hoặc quay lại tiếp tục
- Độ tuổi 16-19 (Grade 11-12 hoặc year 1 đại học)
- Thường sử dụng buổi tối, weekend

**Mental state expected:**
- **Day 1**: Tò mò, phấn khích
- **Day 2**: Hơi chán (lý thuyết)
- **Day 3**: Stress cao nhất (khủng hoảng)
- **Day 4-5**: Quyết đoán (branch points)
- **Day 6**: Cân nhắc đạo đức
- **Day 7**: Tổng hợp, chuẩn bị kết thúc

### Secondary users (limited access)

**Designer/Persona Writer/Engineer** — Playtest mode:
- Giao diện same as learner nhưng có debug panel overlay
- Xem AI decisions log
- Có thể rewind/replay
- Control timeline speed

**Operator** — Debug mode:
- Read-only watch mode của session đang diễn ra
- Không can thiệp được
- Thấy stress signals, decisions
- Cho incident investigation

### Use cases chính

1. **Start Day N** — Enter workspace fresh
2. **Resume interrupted session** — Continue from saved state
3. **Complete Day N** — Hit objectives, transition to Day Summary
4. **Abandon session** — Pause, leave, return later
5. **Trigger Dynamic Branching** — Stress > 85% sustained → Early Exit option
6. **Navigate Branch Point** — Day 4 or Day 6 decision
7. **Use AI Buddy help** — Click Buddy avatar → chat popup
8. **Review Knowledge Cards** — Quick access trong workspace

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px — primary)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  [Home] [Portfolio]    Day 3 / 7 ─── Khủng hoảng ─────  👤    │ ← Header (56px)
├────────────────┬───────────────────────────────────────┬────────────────┤
│                │                                       │                │
│ COMMUNICATION  │         EXECUTION CANVAS              │    VITALS      │
│ Zone           │          (Widget area)                │    Zone        │
│                │                                       │                │
│ 360px (25%)    │         800-880px (60%)               │   200px (15%)  │
│                │                                       │                │
│ ┌────────────┐ │  ┌────────────────────────────────┐   │ ┌────────────┐ │
│ │ # channels │ │  │                                │   │ │ STRESS     │ │
│ │            │ │  │   Widget renders here          │   │ │  ▓▓▓▓▓░░░  │ │
│ │ alpha-chat │ │  │   (CodeSpace, LogHunter,      │   │ │   68%      │ │
│ │ buddy-chat │ │  │    TaskBoard, etc.)           │   │ ├────────────┤ │
│ │ boss-ping  │ │  │                                │   │ │ BUDDY      │ │
│ │            │ │  │                                │   │ │   🤖       │ │
│ │ [messages] │ │  │                                │   │ │ concerned  │ │
│ │            │ │  │                                │   │ ├────────────┤ │
│ │            │ │  │                                │   │ │ KNOWLEDGE  │ │
│ │            │ │  │                                │   │ │ 📚 ×4      │ │
│ │ [input]    │ │  │                                │   │ └────────────┘ │
│ │            │ │  │                                │   │                │
│ └────────────┘ │  └────────────────────────────────┘   │ [⏱️ 43:21]    │
│                │                                       │                │
└────────────────┴───────────────────────────────────────┴────────────────┘
```

### Header (56px height)

Minimal, non-intrusive:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  🔥  [Home] [Portfolio]    Day 3 / 7  ──●───  Khủng hoảng   Session 1:23│
│                                                                         │
│                                                           🔔  👤 Profile│
└─────────────────────────────────────────────────────────────────────────┘
```

**Elements:**
- Logo (left) — click → Hub
- Nav: Home, Portfolio — minimal
- Day progress: Current day / total, theme name
- Session timer (subtle, cho tracking)
- Notification bell (icon only)
- Profile avatar (right)

**Auto-hide behavior (optional):**
- Hide on scroll/focus Widget
- Show on mouse move to top 100px
- Giảm distraction khi đang deep work

### Communication Zone (Cột trái — 360px)

Thiết kế **like Discord/Slack** — học sinh đã quen với pattern này:

```
┌────────────────────────────┐
│ # CHANNELS                 │
│                            │
│ ▼ DIRECT MESSAGES          │
│  ● Mr. Alpha           2   │ ← Unread count
│  ● Chip                    │
│    Boss Nam            !   │ ← New urgent!
│                            │
│ ▼ CHANNELS                 │
│  # team-sprint             │
│  # eng-general             │
│  # incident-0423      5    │ ← Active channel
│                            │
├────────────────────────────┤
│ # incident-0423            │
│                            │
│ ┌────────────────────────┐ │
│ │ Today 2:15 AM          │ │
│ │                        │ │
│ │ 🔴 Boss Nam            │ │
│ │ Mọi người đâu hết rồi? │ │
│ │ Server đang chết!      │ │
│ │ 2:15 AM                │ │
│ │                        │ │
│ │ 👤 Mr. Alpha            │ │
│ │ Tôi đang xem logs.     │ │
│ │ Check Cloudwatch cho   │ │
│ │ memory usage.          │ │
│ │ 2:16 AM                │ │
│ │                        │ │
│ │ 🤖 Chip                 │ │
│ │ Hey, áp lực lắm nhưng  │ │
│ │ cậu ok chứ? Nhớ hôm    │ │
│ │ qua học về Big O       │ │
│ │ không? 💪              │ │
│ │ 2:17 AM                │ │
│ │                        │ │
│ │ 🔴 Boss Nam            │ │
│ │ CÒN BAO LÂU NỮA?       │ │
│ │ Khách hàng gọi liên    │ │
│ │ tục!                   │ │
│ │ 2:19 AM                │ │
│ │                        │ │
│ │ (... typing ...)       │ │
│ │                        │ │
│ └────────────────────────┘ │
│                            │
├────────────────────────────┤
│ ┌────────────────────────┐ │
│ │ Gõ tin nhắn...         │ │
│ └────────────────────────┘ │
│ [📎] [😊]        [Send]   │
└────────────────────────────┘
```

**Channel states:**

- **Active channel**: Highlighted với `--lumina-300` background
- **Unread**: Number badge red
- **Urgent (!)**: Pulsing red dot — sếp ping or critical event

**Message bubbles:**

- **From AI Persona**: Avatar + name + timestamp + text
- **From user**: Right-aligned (minimal, just text + timestamp)
- **System message** (italic, centered): "Mr. Alpha joined the channel"

**Typing indicator:**

- Visible khi AI "đang suy nghĩ" (real latency + slight artificial delay cho natural feel)
- 3 dots animating: `. . .`

### Execution Canvas (Giữa — 60% width)

**Đây là phần biến đổi nhất** — tùy thuộc widget nào được scenario chỉ định:

```
┌────────────────────────────────────────────────┐
│                                                │
│  [Widget Header — if widget has one]           │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │                                          │  │
│  │                                          │  │
│  │         WIDGET CONTENT                   │  │
│  │                                          │  │
│  │    (CodeSpace / LogHunter /              │  │
│  │     TaskBoard / DeployFlow /             │  │
│  │     DesignForge / etc.)                  │  │
│  │                                          │  │
│  │                                          │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  [Widget footer — status, actions]             │
│                                                │
└────────────────────────────────────────────────┘
```

**Widget Integration Contract:**

Workspace cung cấp cho widget:
- Container với specific dimensions (responsive)
- Theme variables từ Design System
- Event bus để emit events
- Action receiver để nhận commands từ scenario engine

Widget phải tuân thủ:
- Không vượt container dimensions
- Emit events qua standardized interface
- Respond to `highlight`, `inject_error`, `show_hint` actions

**Widget transitions:**

Khi scenario chuyển từ widget A → widget B (giữa ngày):
- Widget A fade out (300ms)
- Brief loading placeholder (~500ms)
- Widget B fade in (300ms)

**Example: Day 3 với LogHunter widget:**

```
┌────────────────────────────────────────────────┐
│ LogHunter                    Server: PROD-01  │
│ ──────────────────────────────────────────────│
│                                                │
│ [Filter: error level ▼]  [Time range ▼]       │
│ [🔍 Search: _________________]                 │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ 02:15:42 ERROR [Database]                │  │
│ │   Connection timeout: 30000ms exceeded   │  │
│ │   Stack trace: ▶                         │  │
│ ├──────────────────────────────────────────┤  │
│ │ 02:15:44 WARN  [Memory]                  │  │
│ │   Heap usage: 94% of 4GB                 │  │
│ ├──────────────────────────────────────────┤  │
│ │ 02:15:47 CRITICAL [API]                  │  │
│ │   OutOfMemoryException in OrderService   │  │
│ │   Stack trace: ▶                         │  │
│ ├──────────────────────────────────────────┤  │
│ │ 02:15:51 ERROR [Database]                │  │
│ │   Max connections reached                │  │
│ │ ...                                      │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ [Action: Restart service] [Scale up]  [Alert] │
│                                                │
└────────────────────────────────────────────────┘
```

**Đang xảy ra:**
- AI Story Director (hidden) inject errors vào log stream
- User phải scan, tìm root cause
- Click actions → trigger events → AI response
- Countdown timer (top-right) tạo áp lực

### Vitals Zone (Cột phải — 200px)

Dense với 4 elements nhỏ nhưng quan trọng:

```
┌────────────────────────┐
│ STRESS                 │
│                        │
│ ┌────────────────────┐ │
│ │████████████░░░░░░░░│ │ ← Meter
│ └────────────────────┘ │
│            68% HIGH    │
│                        │
│ Threshold warnings:    │
│ • Burnout: 90%         │
│ • 3-day limit active   │
│                        │
├────────────────────────┤
│ BUDDY                  │
│                        │
│      ╭───────╮         │
│      │  😟  │         │ ← Animated
│      │ (Chip) │         │
│      ╰───────╯         │
│                        │
│ Mood: Concerned        │
│ "Take a breath, you're │
│  pushing too hard."    │
│                        │
│ [💬 Chat with Chip]   │
│                        │
├────────────────────────┤
│ KNOWLEDGE 📚 × 4       │
│                        │
│ ◆ Big O Notation       │
│ ◆ Algorithm Thinking   │
│ ◆ Memory Management    │
│ ◆ Debugging 101        │
│                        │
│ [+ View all cards]     │
│                        │
├────────────────────────┤
│ ⏱️  00:43:21           │
│    of 75 min           │
│                        │
│ Day 3 Progress: 57%    │
│                        │
└────────────────────────┘
```

### Stress Meter — Detail

```
┌────────────────────────┐
│ STRESS                 │
│                        │
│  0%          50%   100%│
│  ├───────────┬──────┤ │
│  ██████████████░░░░  │ ← Filled với gradient
│                        │
│              68% HIGH  │
│                        │
│ Zones (color-coded):   │
│  0-40%  Calm (green)   │
│  40-70% Focus (blue)   │
│  70-85% Alert (amber)  │
│  85-100% Critical (red)│
│                        │
└────────────────────────┘
```

**Animations:**
- Slow pulse khi > 70%
- Faster pulse khi > 85%
- Vignette effect trên toàn workspace khi > 90%
- Value changes smooth transitions (200ms ease)

### Buddy Avatar — Detail

**5 moods với 5 sprite variations:**

1. **Happy** 😊 — Learning going well
2. **Neutral** 🙂 — Default state
3. **Concerned** 😟 — Stress rising
4. **Worried** 😰 — Stress high
5. **Excited** ✨ — Big achievement

**Animations:**
- Idle: gentle breathing (scale 1.0 → 1.02)
- Mood change: morph transition 500ms
- Speaking: subtle bounce + speech bubble appears
- Click: wave + open chat popup

**Click behavior:**
- Single click → Quick chat bubble with last message
- Double click → Open full Buddy Chat (Screen 8)

---

## 4. Interactions & Behaviors

### Main Interaction Loop (Technical)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  User Action                                            │
│  ↓                                                      │
│  Widget captures event (code change, button click,     │
│   message typed, etc.)                                 │
│  ↓                                                      │
│  Event bus emits to Scenario Engine                    │
│  ↓                                                      │
│  Scenario Engine checks triggers                       │
│  ↓                                                      │
│  If trigger fires:                                     │
│    → AI Orchestrator generates response                │
│    → Returns JSON control instructions                 │
│    → Workspace applies:                                │
│       - Chat message appears                           │
│       - Widget state updates                           │
│       - Vitals animate                                 │
│       - UI effects (glitch, vignette, sound)           │
│                                                         │
│  Loop continues...                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Specific behaviors

**When AI message arrives:**
1. Audio notification (subtle beep — respectable, not annoying)
2. Channel tab shows unread badge
3. Scroll chat to new message (with option to pin view)
4. If urgent (Boss ping): channel pulses red

**When widget emits event:**
- No visual feedback directly (event invisible to user)
- Indirect: AI may respond → visible
- Engineer playtest mode: event shown in debug panel

**When stress crosses threshold:**
- **70%**: Subtle amber tint on stress meter
- **85%**: Buddy avatar mood changes, optional intervention message
- **90%+**: Screen vignette (red pulse), Buddy actively intervenes
- **90%+ for 3 consecutive days**: Dynamic Branching → Early Exit option appears

**When time runs low (< 5 min):**
- Countdown prominent (pulse in color)
- Boss ping frequency increases
- Final warning at 1 min

**When user makes decision at branch point:**
- Modal takeover (full screen dim)
- Two options beautifully presented
- Hover states show consequences preview
- Confirm + irreversible

---

## 5. States

### State 1: Initial Load / Day Start

Timeline:
- **T+0s**: Header visible, zones skeleton
- **T+500ms**: Chat loads with greeting message
- **T+1s**: Widget fades in
- **T+1.5s**: Vitals populate
- **T+2s**: AI Teacher sends opening message with typing indicator

Visual:
- Staggered fade-in (300ms delays)
- "Welcome to Day 3" brief overlay, auto-dismiss

### State 2: Active Work (Default)

All zones active, user interacting. This is 90% of time.

### State 3: AI Thinking

- Typing indicator in chat (3 dots)
- Widget may have loading state if AI-driven change coming
- Vitals still active (stress continues to track)

### State 4: Urgent Event (Boss Ping, Error Injection)

- Chat channel pulses red
- Notification bell animates
- Audio alert (can be disabled in settings)
- Brief vignette flash (200ms)

### State 5: High Stress

- Vignette pulsing red at edges
- Stress meter pulsing
- Buddy avatar worried
- UI elements slightly "shake" on interaction (subtle)

### State 6: Branch Point

Full-screen takeover modal:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│           DAY 4 — TECHNICAL CHOICE                  │
│                                                     │
│        Bạn muốn chuyên sâu về mảng nào?            │
│                                                     │
│  ┌──────────────────┐    ┌──────────────────┐      │
│  │                  │    │                  │      │
│  │  🎨 Frontend     │    │  🔧 Backend      │      │
│  │     / Mobile     │    │    / Data        │      │
│  │                  │    │                  │      │
│  │  Giao diện       │    │  Hệ thống &      │      │
│  │  người dùng      │    │  Dữ liệu         │      │
│  │                  │    │                  │      │
│  │  [Select]        │    │  [Select]        │      │
│  └──────────────────┘    └──────────────────┘      │
│                                                     │
│  Hover để xem trước sự khác biệt                   │
│                                                     │
│  [⏱️ Take your time — quyết định không rush]        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### State 7: Day Complete

Celebration overlay:

```
┌─────────────────────────────────────────┐
│                                         │
│            ✨ DAY 3 COMPLETE ✨         │
│                                         │
│        You handled the crisis.          │
│                                         │
│    📚 Knowledge earned: +2 cards        │
│    ⚡ Stress peak: 87% (recovered)     │
│    ⏱️ Time: 68 minutes                  │
│                                         │
│       Tomorrow: Day 4 — Insights        │
│       Unlocks in: 18 hours              │
│                                         │
│   [Back to Hub]  [Review Day 3]         │
│                                         │
└─────────────────────────────────────────┘
```

### State 8: Early Exit Option (Burnout Prevention)

```
┌─────────────────────────────────────────┐
│                                         │
│    🤖 Chip nhảy vào cuộc trò chuyện    │
│                                         │
│    "Hey, tớ thấy cậu đang mệt lắm.     │
│     3 ngày liên tiếp stress cao.       │
│     Cậu có muốn dừng và lắng nghe      │
│     bản thân không?"                   │
│                                         │
│    Lựa chọn của cậu:                   │
│                                         │
│    [Tiếp tục — Tôi ổn]                 │
│    [Dừng lại — Tôi cần nghỉ]           │
│                                         │
│    (Cả hai lựa chọn đều được tôn trọng │
│     và không ảnh hưởng đến điểm số)    │
│                                         │
└─────────────────────────────────────────┘
```

### State 9: Network Lost / Offline

Banner across top:

```
⚠️ Mất kết nối — Đang save offline. Sẽ sync khi online.
```

- Widget switches to read-only mode
- Chat queued locally
- Stress continues tracking (local)
- Reconnect → sync seamlessly

### State 10: Error / Crash Recovery

Nếu widget hoặc AI fail:

```
┌─────────────────────────────────────────┐
│                                         │
│    🤖 Chip cần nghỉ xíu để reset...    │
│                                         │
│    Có vẻ tớ gặp chút khó khăn.         │
│    Thử refresh trong vài giây nhé?     │
│                                         │
│    [Refresh]  [Report issue]           │
│                                         │
│    (Progress đã save, không mất gì)    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 6. Motion & Micro-interactions

Áp dụng **Design System Principle #4**: *"Mỗi pixel có lý do."*

### Glitch Effect (Widget error injection)

Khi AI inject error vào widget:
- 200ms glitch on widget area
- RGB shift 2px
- Subtle shake
- Then error appears "naturally"

### Stress Vignette

Khi stress > 90%:
```css
box-shadow: inset 0 0 200px 20px rgba(201, 88, 74, 0.25);
animation: stress-pulse 2s ease-in-out infinite;
```

### Buddy Avatar Breathing

```css
@keyframes breathing {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
animation: breathing 4s ease-in-out infinite;
```

### Chat Message Arrival

```css
.message {
  animation: messageArrive 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes messageArrive {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Widget State Change

Smooth transitions, never jarring:
- Property changes: 200ms ease-out
- Layout changes: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Major transitions: 500ms với fade

### Knowledge Card Earned

Flying animation từ Widget → Vitals Zone:

```
1. Card appears above widget (scale: 0 → 1)
2. Particle burst effect (gold sparks)
3. Flies to Knowledge pile (bezier path, 800ms)
4. Pile count increments với subtle bounce
```

### Countdown Final Minute

Last 60 seconds:
- Number pulses every second
- Color shifts from amber → red
- Audio: subtle tick (optional, user toggleable)

---

## 7. Data Flow

### Inputs (real-time)

```yaml
from_scenario_engine:
  - current_day_context
  - active_widget_config
  - active_personas
  - trigger_definitions
  - knowledge_cards_unlocked

from_ai_orchestrator:
  - chat_messages (stream)
  - widget_actions (commands)
  - vitals_updates (stress, buddy_mood)
  - ui_effects (glitch, vignette)
  - branch_point_activations

from_user_session:
  - current_stress_level
  - time_elapsed_in_day
  - knowledge_cards_earned
  - decisions_log
```

### Outputs (events emitted)

```yaml
user_events:
  - chat_message_sent
  - widget_interaction (varies per widget)
  - decision_made
  - help_requested (click Buddy)
  - day_paused
  - day_completed
  - early_exit_chosen

analytics_events:
  - workspace_entered
  - widget_rendered
  - ai_response_received
  - stress_threshold_crossed
  - knowledge_card_earned
  - branch_choice_made
  - session_ended
```

### API / WebSocket

```yaml
WebSocket (persistent):
  channel: /ws/workspace/:sessionId
  events:
    - message (bidirectional)
    - widget_command (server → client)
    - vitals_update (server → client)
    - ui_effect (server → client)

REST (occasional):
  GET  /api/workspace/state/:sessionId
  POST /api/workspace/save-progress
  POST /api/workspace/complete-day
  POST /api/workspace/early-exit
```

---

## 8. Permission Checks

Workspace là màn user-facing, ít permission complexity.

| Context | Permission | Behavior |
|:--|:--|:--|
| Learner (regular) | `learner` role | Full interactive access |
| Designer (playtest) | `scenario.edit` + playtest mode flag | Full + debug panel |
| Persona Writer (playtest) | `persona.test` + playtest mode flag | Full + persona debug |
| Engineer (playtest) | `widget.edit` + playtest mode flag | Full + widget debug |
| Operator (observe) | `analytics.view` + session_watch flag | Read-only watch |
| Super Admin | `*` | All modes available |

**Anti-abuse:**
- Rate limit chat messages (prevent spam)
- Validate widget events server-side
- Session tied to user, no impersonation

---

## 9. Edge Cases

### Case 1: User thoát tab giữa session

- **Auto-save mỗi 10 giây** — ghi state vào IndexedDB + server
- Session stays "paused" trong 30 phút
- Quay lại → prompt "Continue from where you left?"
- > 30 phút → session marked as interrupted, next login sẽ offer resume

### Case 2: AI model fails / times out

- Fallback message từ Chip: "Tớ cần nghỉ xíu..."
- Retry với cheaper model (fallback chain)
- Nếu vẫn fail > 3 lần: suggest pause session
- Widget continues to work standalone

### Case 3: Widget throws error

- Error boundary catches
- Show friendly error: "Widget gặp vấn đề"
- Save scenario state (don't lose progress)
- Option: retry widget, or skip to next stage (Day Summary early)

### Case 4: User speed-runs / rushes

- Detection: extremely fast decisions, not reading messages
- Soft nudge: "Slow down — quality of decision matters more than speed"
- Data flagged in analytics: may indicate low engagement

### Case 5: User opens DevTools / tries to inspect

- No blocking (would be adversarial)
- Log as "technical curiosity" in analytics
- Don't expose sensitive data in frontend (server-validated)

### Case 6: Multiple tabs same scenario

- Detection via BroadcastChannel API
- Only one tab "active", others show "Continue in other tab"
- Prevents double-logging, state conflicts

### Case 7: Device rotation (tablet)

- Detect orientation change
- Portrait: warn "Landscape recommended"
- Landscape: adjust layout, widget re-flows

### Case 8: Stress monitor bị "gamed"

- Student có thể cố tình pretend stress (click random, type gibberish)
- Detection: behavioral anomaly
- Log as suspicious, flag cho final report
- Don't block (let them experience consequences)

### Case 9: Widget requires unavailable feature

- Ví dụ: Widget yêu cầu clipboard, user blocks
- Graceful degradation: feature disabled with explanation
- Don't crash scenario

### Case 10: Session timeout mid-interaction

- Auth token expires while user is typing
- Silent refresh attempt
- If fail: save state, redirect to login với resume token

---

## 10. Responsive Considerations

### Desktop (1440px+) — Primary

Full 3-zone layout. Optimal experience.

### Laptop (1024-1440px)

- Vitals Zone collapses to 160px
- Widget area gets priority
- Communication Zone stays 320px

### Tablet Landscape (1024x768)

- Vitals becomes drawer (pull from right)
- 2-zone focus: Chat (30%) + Widget (70%)
- Vitals accessible via button

### Tablet Portrait / Mobile (< 1024px)

**Recommended: Not supported for active sessions**
- Warning on entry: "Best experienced on desktop"
- If forced:
  - Single-column layout
  - Tabs for Chat / Widget / Vitals
  - Swipe between zones
  - Features limited
- **Final Report and Portfolio** OK on mobile

### Print Layout

Not applicable (live interactive).

---

## 11. Performance Requirements

### Critical metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Widget render**: < 500ms after zone ready
- **Chat message latency**: < 200ms for user, < 2s for AI
- **Animation FPS**: 60 consistent
- **Memory**: < 300MB total
- **WebSocket reconnect**: < 3s

### Optimization strategies

- **Widget lazy loading** — only current widget in memory
- **Message virtualization** — chat với 1000+ messages vẫn smooth
- **Debounced state updates** — batch vitals updates every 100ms
- **IndexedDB cache** — offline resilience
- **Service Worker** — asset caching
- **Preload next widget** when approaching day transition

---

## 12. Accessibility

Workspace must be fully accessible — students with disabilities are part of target audience.

### Keyboard Navigation

- Tab order: Header → Communication → Execution → Vitals
- Arrow keys within zones
- Focus trap trong modals (branch points)
- Escape to close modals

### Screen Reader

- Live regions cho chat messages (polite announcement)
- Widget state announcements
- Stress level updates (on threshold change, not every update)
- Descriptive labels cho Buddy mood

### Visual Accessibility

- High contrast mode support
- Color not sole indicator (icons + text for stress zones)
- Text resize respects user preferences
- Focus indicators clear (2px ring với --lumina-500)

### Motion Accessibility

- Respect `prefers-reduced-motion`:
  - Disable vignette pulse
  - Disable glitch effect
  - Simple fades only
  - Breathing animation still OK (very subtle)

### Cognitive Accessibility

- Clear language in AI messages
- Option to show subtitles for audio cues
- Don't rush timers (can pause scenario)
- Buddy simplifies explanations on request

---

## 13. Visual Design Notes

### Color application

From Design System (Screen 1):

**Communication Zone:**
- Background: `--paper-100`
- Borders: `--ink-100`
- Active channel: `--lumina-300` background
- Alpha messages: `--ink-900` avatar
- Chip messages: `--lumina-500` avatar
- Boss messages: `--signal-stress` avatar (urgent)

**Execution Canvas:**
- Background: `--paper-200` (slightly deeper than Communication)
- Widget wrapper: `--paper-100` inside
- Subtle grid pattern (very faint)

**Vitals Zone:**
- Background: `--ink-900` với `--paper-100` text
- Stress meter gradient: `--signal-calm` → `--signal-focus` → `--signal-alert` → `--signal-stress`
- Buddy background: dark for avatar contrast
- Knowledge cards: gold accent (`--lumina-500`)

### Typography

**Header**:
- Day indicator: Inter Tight 14px, medium
- Theme name: Fraunces 16px, italic

**Chat messages**:
- User names: Inter Tight 13px, semibold
- Message body: Inter Tight 14px, regular
- Timestamps: JetBrains Mono 11px

**Widget text**: Depends on widget, but generally Inter Tight 13-14px

**Vitals labels**: JetBrains Mono 10px, uppercase, letter-spacing 0.08em

### Spacing

Adhere to 8px base grid:
- Zone padding: 16px (2 units)
- Message spacing: 12px between messages
- Vitals spacing: 24px between sections

### Shadows

Minimal, only for emphasis:
- Modal overlays: `0 20px 40px rgba(0,0,0,0.2)`
- Branch point cards: `0 8px 24px rgba(0,0,0,0.1)` + hover enhancement
- Stress vignette: inset shadow only

### Iconography

- Channel icons: Lucide React
- AI avatars: Custom SVG (designed with Persona Studio)
- Stress indicators: Custom meter component
- Knowledge cards: Custom card stack visualization

---

## 14. Audio Design (Optional but recommended)

Subtle audio layer, toggleable in settings.

### Ambient

- Day 1: Light, optimistic (very low volume)
- Day 3: Subtle tension build
- Day 6: Contemplative
- Day 7: Resolving

### Interactive sounds

- Message arrive: soft ping
- Message send: subtle whoosh
- Stress threshold cross: sub-bass warning
- Knowledge earned: golden chime
- Branch point: dramatic sting
- Day complete: celebration melody

### Accessibility

- Toggle on/off in settings
- Volume control
- Captions for critical audio events

---

## 15. Multi-domain Application Examples

Workspace là cùng 1 component nhưng render 3 trải nghiệm hoàn toàn khác nhau dựa trên scenario configuration. Đây là 3 instance examples:

### Instance 1: SE Day 3 — Khủng hoảng hệ thống

**Communication Zone:**
```yaml
channels:
  - "#incident-0423" (active, urgent)
  - DM: Mr. Alpha (online)
  - DM: Chip (online)
  - DM: Boss Nam (urgent indicator)

active_chat_messages:
  - Boss Nam: "MỌI NGƯỜI ĐÂU? Server đang chết!"
  - Mr. Alpha: "Tôi đang xem logs. Check Cloudwatch."
  - Chip: "Hít thở đi cậu. Nhớ Big O hôm qua không?"
```

**Execution Zone (Widget):**
- LogHunter widget hiển thị production server logs
- Color-coded errors (DB timeout, OOM, API failures)
- Filter và search controls
- Action buttons: Restart service, Scale up

**Vitals Zone:**
- Stress: 87% (HIGH zone, vignette pulsing)
- Buddy: 😟 Worried
- Knowledge: 📚 ×4 (Big O, Algorithm Thinking, Memory Mgmt, Debugging)
- Timer: 43:21 of 75 min

### Instance 2: Medical Day 3 — ER Crisis

**Communication Zone:**
```yaml
channels:
  - "#er-floor-1" (active)
  - DM: Dr. Linh (online, mentor)
  - DM: Chip (online)
  - DM: Y tá Trang (urgent - patient deterioration)

active_chat_messages:
  - Y tá Trang: "BS ơi, bệnh nhân giường 12 SpO2 xuống 88%!"
  - Dr. Linh: "Triệu chứng kèm? Em nghĩ differential gì?"
  - Chip: "Ổn không cậu? Recall vital signs hôm qua."
```

**Execution Zone (Widget):**
- PatientMonitor widget hiển thị vitals real-time
- HR waveform, BP, SpO2, Temperature, RR
- Alarm panel (Tachycardia alert)
- Intervention buttons (oxygen, fluids, medication)

**Vitals Zone:**
- Stress: 78% (HIGH zone)
- Buddy: 😟 Concerned
- Knowledge: 📚 ×6 (Vital Signs, Anatomy, Drug Interactions, etc.)
- Timer: 28:45 of 60 min

### Instance 3: Marketing Day 5 — Campaign Crisis

**Communication Zone:**
```yaml
channels:
  - "#campaign-q2-crisis" (active)
  - DM: Anh Tùng (online, director)
  - DM: Chip (online)
  - DM: Chị Mai (urgent - client demanding)

active_chat_messages:
  - Chị Mai: "ROAS giảm 40%! CEO đang gọi liên tục!"
  - Anh Tùng: "Em nhìn dashboard. Phân tích metric nào trước?"
  - Chip: "Hít thở. Cậu có data — đừng panic. AARRR?"
```

**Execution Zone (Widget):**
- CampaignDashboard widget với 4 KPI cards (ROAS, CAC, CTR, Conv Rate)
- 14-day trend chart với anomaly detection
- Audience segments visualization
- Action: Optimize, Pause, Reallocate budget

**Vitals Zone:**
- Stress: 68% (Alert zone)
- Buddy: 😟 Concerned
- Knowledge: 📚 ×4 (AARRR, Marketing Funnel, CAC/LTV, A/B Testing)
- Timer: 43:21 of 75 min

### Comparison: Same Workspace, different experiences

| Aspect | SE Crisis | Medical Crisis | Marketing Crisis |
|:--|:--|:--|:--|
| **Layout** | 3-zone (identical) | 3-zone (identical) | 3-zone (identical) |
| **Communication content** | Code/server jargon | Medical/clinical terms | Business/metrics talk |
| **Execution widget** | LogHunter (text-heavy) | PatientMonitor (waveforms) | CampaignDashboard (charts) |
| **Personas tone** | Tech crisis (logical) | Life-and-death (cautious) | Business pressure (direct) |
| **Stakes feel** | $100k/min loss | Patient outcome | CEO confidence |
| **Knowledge applied** | Big O, debugging | Vital signs, diagnosis | AARRR, anomaly detection |
| **Buddy intervention** | Stress reduction | Stress + medical safety | Stress + business calm |
| **Visual atmosphere** | Dark monitor feel | Hospital sterile | Office professional |

**Key insight:** Same component layout, same interaction patterns, same vitals system — completely different emotional experiences và domain expertise.

### Container architecture proven

Workspace component nhận:
- `scenario_config` — defines which day, which personas, which widgets
- `current_state` — stress level, knowledge cards, timer
- `active_widget` — pluggable widget (CodeSpace / PatientMonitor / CampaignDashboard / etc.)
- `active_personas` — array of AI personas to render

Render output adapts based on inputs. Designer doesn't customize Workspace per scenario — they configure scenario, Workspace renders.

---

## 16. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Learner (student) |
| **Complexity** | ⭐⭐⭐⭐⭐ (highest) |
| **Time spent** | 80% of scenario time (~45-75 min/day × 7 days) |
| **Estimated build time** | 10-14 weeks (full feature) |
| **Key technologies** | React, WebSocket, Zustand/Redux, Framer Motion |
| **Critical dependencies** | Screen 1 (Design System), all widgets |
| **Performance targets** | 60 FPS, < 2.5s TTI |
| **Device support** | Desktop primary, tablet limited, mobile warning |
| **Users (V1)** | End-users (students), internal playtest access |
| **Biggest risk** | Maintaining engagement across 7 days |
| **Biggest opportunity** | Memorable first impression drives word-of-mouth |

### Design principles applied

1. ✅ **Serious, not naive** — Professional UI, no childish elements
2. ✅ **Pressure must be felt** — Vignette, timers, notifications deliberate
3. ✅ **Failure is valid** — Early Exit option respectfully presented
4. ✅ **Every pixel has reason** — Zero decorative fluff
5. ✅ **Data is the hero** — All interactions flow to Final Report
