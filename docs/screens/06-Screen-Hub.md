# Screen 06 — Hub / Dashboard

**Màn hình số:** 6  
**Phase:** B — Learner Core  
**Complexity:** ⭐⭐⭐ (Trung bình-Cao)  
**Primary users:** Học sinh (Learner)  
**Related flow:** Flow 02 — Trải nghiệm một ngày (entry point)  
**Dependencies:** Screen 1 (Design System), Screen 7 (Workspace), Screen 11 (Portfolio)

---

## 0. Multi-domain Context

Hub là màn hình personal dashboard của học sinh. Đa ngành thể hiện qua việc hiển thị **active scenario** (từ ngành bất kỳ) và có thể multiple scenarios (nếu paid đa scenarios).

**Examples used in this spec:**
- Primary example: Marketing scenario đang progress Day 3
- Secondary example: SE scenario completed
- Future: Multiple active scenarios (when user tries 2+)

---

## 1. Mục đích màn hình

Hub là **home base** của học sinh trong suốt 7 ngày của scenario. Đây là nơi:

**5 chức năng cốt lõi:**

1. **Show scenario progress** — Timeline 7 ngày với status mỗi ngày
2. **Daily entry point** — Start hoặc continue Day N
3. **Knowledge review** — Xem knowledge cards đã học
4. **Buddy interaction** — Casual chat với Chip ngoài scenario
5. **Context awareness** — Hiển thị streak, achievements, progress

### Metaphor thiết kế

Hub giống như **trang chủ Duolingo** + **game lobby**:
- Map-like timeline hiển thị journey
- Current day glowing, gọi mời start
- Locked days có visual barriers
- Achievements và streak visible

Hoặc gần với **Apple Fitness+ home screen** — nơi dashboard progress rõ ràng, không overwhelming.

### Triết lý: "Gentle urgency"

Hub cần tạo cảm giác **có tiến độ**, **có momentum**, nhưng không guilt trip khi học sinh bỏ lỡ ngày.

- Streak visible nhưng không threatening
- Missed day có thông điệp compassionate
- Progress framing positive

---

## 2. Users & Use Cases

### Primary user: Học sinh (Learner)

**Daily usage pattern:**
- Morning/evening check
- Enter after notification ("Day 4 unlocked!")
- Return from completed Workspace session
- Quick 2-5 min visits between deeper sessions

### Secondary user: Parent (if transparency allows)

- View child's Hub in read-only
- See progress and streak
- Cannot start scenarios

### Use cases chi tiết

#### UC1: Start Day N (regular day)

**Flow:**
1. Login → Hub loads
2. Current day clearly marked
3. Check what's expected (theme, time, goal)
4. Click "Start Day 3"
5. Load Workspace (Screen 7)

#### UC2: Resume interrupted session

**Flow:**
1. Previously paused mid-Day 3
2. Hub shows "Day 3 in progress — 23 min elapsed"
3. Click "Continue" → resume from where left off

#### UC3: Review completed scenario

**Flow:**
1. Scenario finished
2. Hub shows all 7 days completed
3. Access Final Report
4. Browse knowledge cards collected
5. Option: Try another scenario

#### UC4: Waiting for next day to unlock

**Flow:**
1. Day 3 complete at 10pm
2. Day 4 unlocks 6am next day (8 hours cool-down)
3. Hub shows countdown to Day 4
4. Suggest activities: Review knowledge, Chat with Chip, Portfolio

#### UC5: Missed day (skipped)

**Flow:**
1. Haven't logged in for 3 days
2. Hub shows "Welcome back!"
3. Compassionate message, not guilt
4. Offer: Resume or restart

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  [Hub] [Portfolio]                            👤 Minh Nguyen  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│           GREETING + STATUS                                             │
│        "Chào Minh — Sẵn sàng cho Day 3?"                                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│           CURRENT SCENARIO CARD                                         │
│           Marketing: Crisis Management                                  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│           TIMELINE — 7 DAYS JOURNEY                                     │
│                                                                         │
│     D1 ✓      D2 ✓      D3 ●      D4 🔒    D5 🔒    D6 🔒    D7 🔒     │
│     ───────────────────────────────────────────────────────────────     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐                      │
│  │  TODAY'S FOCUS      │  │  KNOWLEDGE CARDS    │                      │
│  │                     │  │                     │                      │
│  │  Day 3              │  │  Collected: 6 cards │                      │
│  │  "Crisis Hits"      │  │                     │                      │
│  │                     │  │  [Grid of cards]    │                      │
│  │  [Start Day 3]      │  │                     │                      │
│  └─────────────────────┘  └─────────────────────┘                      │
│                                                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐                      │
│  │  BUDDY CHIP         │  │  OTHER SCENARIOS    │                      │
│  │                     │  │                     │                      │
│  │  Chip greeting      │  │  Browse majors      │                      │
│  │  + current mood     │  │  Portfolio access   │                      │
│  └─────────────────────┘  └─────────────────────┘                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Greeting Section

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│           Chào buổi sáng, Minh                                          │
│           Sẵn sàng cho Day 3 chưa?                                      │
│                                                                         │
│  📊 Your stats:                                                         │
│  🔥 Streak: 2 days     ⏱ Total time: 1h 23m     ⭐ Knowledge: 6 cards  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Time-aware greeting:**
- 5-11: "Chào buổi sáng"
- 12-17: "Chào buổi chiều"
- 18-22: "Chào buổi tối"
- 22+: "Còn thức à?"

### Current Scenario Card (prominent)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  CURRENT SCENARIO                                                       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │                                                             │       │
│  │  📢 Marketing: Crisis Management                            │       │
│  │                                                             │       │
│  │  Started: 3 days ago                                        │       │
│  │  Day 3 of 7 — Crisis Hits                                   │       │
│  │                                                             │       │
│  │  Progress: ████████░░░░░░░░░░░░ 28%                         │       │
│  │                                                             │       │
│  │  Today's theme:                                             │       │
│  │  "Khủng hoảng chiến dịch — Campaign ROAS giảm 40%.          │       │
│  │   Bạn sẽ phân tích data với Anh Tùng và quyết định          │       │
│  │   xử lý ra sao trước khi CEO nổi giận."                     │       │
│  │                                                             │       │
│  │  Estimated time: 45-75 minutes                              │       │
│  │  Expected stress: High                                      │       │
│  │                                                             │       │
│  │  [  ▶ Start Day 3  ]                                        │       │
│  │                                                             │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Timeline — 7 Days

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  YOUR JOURNEY                                                           │
│                                                                         │
│     DAY 1       DAY 2       DAY 3       DAY 4     DAY 5    DAY 6  DAY 7│
│                                                                         │
│       ●───────────●───────────◎···········○·········○·········○······○ │
│                                                                         │
│     ✓ Done     ✓ Done     ◎ Today     🔒 Locked  🔒 Locked 🔒 Locked... │
│                                                                         │
│    Onboarding  Market     Crisis      Options    People    Ethics  Resolve│
│    Research    Analysis   Hits                                          │
│                                                                         │
│    70 min      58 min     ???         ???       ???        ???     ??? │
│    2 cards     2 cards    +??? cards                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Day node states:**

**Completed (✓):**
- Green accent (`--signal-calm`)
- Solid circle
- Click → see day recap

**Current (◎):**
- Lumina accent (`--lumina-500`)
- Pulsing animation
- Click → start Day
- Emphasized size (1.2x)

**Locked (🔒):**
- Muted gray
- Icon: lock
- Click → show unlock time

**Future visible but preview (?):**
- Theme name known
- Detailed content hidden
- "Will unlock after Day N complete"

### Today's Focus Card

```
┌─────────────────────────────┐
│  TODAY'S FOCUS              │
│                             │
│  Day 3                      │
│  "Crisis Hits"              │
│                             │
│  🎯 What you'll do:         │
│  • Analyze campaign drop    │
│  • Decide intervention      │
│  • Report to client         │
│                             │
│  🧠 You'll learn:           │
│  • Anomaly detection        │
│  • Crisis communication     │
│                             │
│  ⏱ Estimated: 60 min        │
│  ⚡ Stress: High             │
│                             │
│  [  Start Now  ]            │
│                             │
└─────────────────────────────┘
```

### Knowledge Cards Card

```
┌─────────────────────────────┐
│  KNOWLEDGE CARDS            │
│  Your collection            │
│                             │
│  📚 6 / ~14 expected        │
│                             │
│  Recent additions:          │
│                             │
│  ┌─────────────────────┐    │
│  │ ◆ AARRR Metrics    │    │
│  │   Day 2 — today     │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ ◆ Marketing Funnel │    │
│  │   Day 2             │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ ◆ CAC vs LTV       │    │
│  │   Day 1             │    │
│  └─────────────────────┘    │
│                             │
│  [  View all (6)  ]         │
│                             │
└─────────────────────────────┘
```

### Buddy Card

```
┌─────────────────────────────┐
│  YOUR BUDDY                 │
│                             │
│       ╭─────╮               │
│       │ 🤖  │               │
│       │Chip │               │
│       ╰─────╯               │
│                             │
│  Chip says:                 │
│  "Hey Minh! Hôm qua cậu     │
│   handle Day 2 khá tốt.     │
│   Day 3 sẽ căng đấy — sẵn   │
│   sàng chưa?"               │
│                             │
│  Mood today: 😊 Encouraging │
│                             │
│  [  💬 Chat with Chip  ]    │
│                             │
└─────────────────────────────┘
```

### Other Scenarios Card

```
┌─────────────────────────────┐
│  EXPLORE MORE               │
│                             │
│  Completed:                 │
│  ┌─────────────────────┐    │
│  │ 🖥 Software Eng.   │    │
│  │ Ending: Fighter     │    │
│  │ 2 weeks ago         │    │
│  │ [View Report]       │    │
│  └─────────────────────┘    │
│                             │
│  ─────                      │
│                             │
│  Try more majors:           │
│                             │
│  [  🎯 Browse Gateway  ]    │
│                             │
│  💡 Based on your results,  │
│  you might like:            │
│  • UX Design                │
│  • Data Science             │
│                             │
└─────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Timeline interactions

- **Hover completed day**: Show summary tooltip (score, stress peak, knowledge earned)
- **Click completed day**: Expand mini-view of that day's achievements
- **Hover current day**: Subtle pulse intensifies
- **Click current day**: Same as "Start Now" button
- **Hover locked day**: Show unlock condition
- **Click locked day**: Show "Not yet — Day X unlocks at HH:MM"

### Auto-refresh

- Check unlock status every minute
- Notify when new day unlocks (if tab in background)
- Update streak counter at midnight

### Navigation patterns

**From Hub:**
- Primary: Start Day → Workspace
- Secondary: Browse Gateway, View Portfolio, Chat with Buddy

**To Hub:**
- After every Workspace session
- From any other screen via "Hub" nav link

---

## 5. States

### State 1: First visit (just started scenario)

- Day 1 prominent with glow
- Only Day 1 preview visible, others completely locked
- Welcome message: "Let's begin your journey"
- Chip intro message

### State 2: Active scenario, mid-journey

- Default view as described
- Progress clear, momentum visible

### State 3: Day in progress (paused)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ⏸ DAY 3 IN PROGRESS                                                    │
│                                                                         │
│  You paused 23 minutes into Day 3.                                      │
│  Your progress is saved.                                                │
│                                                                         │
│  [  Continue Day 3  ]  [  Restart Day 3  ]                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### State 4: Scenario completed

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  🎉 SCENARIO COMPLETE                                                   │
│                                                                         │
│  You finished all 7 days of Marketing: Crisis Management.              │
│  Ending: The Fighter                                                    │
│                                                                         │
│  [  View Final Report  ]  [  Try Another Major  ]                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### State 5: Waiting for unlock

- Day indicator for upcoming day has countdown
- "Day 4 unlocks in 4h 23m"
- Suggest activities below

### State 6: Missed several days

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Welcome back! 👋                                                       │
│                                                                         │
│  Bạn đã nghỉ 5 ngày — chào mừng bạn quay lại.                           │
│  Progress của bạn được lưu đầy đủ.                                      │
│                                                                         │
│  Sẵn sàng tiếp tục Day 3?                                               │
│                                                                         │
│  [  Continue  ]  [  Start Over  ]                                       │
│                                                                         │
│  💡 Tip: Học đều đặn mỗi ngày giúp báo cáo chính xác hơn.               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### State 7: No active scenario

- Prompt to browse Gateway
- Show completed scenarios summary
- Recommendations based on past

---

## 6. Data Flow

### Inputs

```yaml
from_user_profile:
  - active_scenarios
  - completed_scenarios
  - current_day_status
  - streak_count
  - total_time
  - knowledge_cards_owned

from_session_state:
  - is_in_progress
  - last_active_timestamp
  - pause_context
```

### Outputs

```yaml
user_actions:
  - day.started
  - day.resumed
  - scenario.abandoned
  - knowledge.reviewed
  - buddy.clicked
```

### API Endpoints

```yaml
GET    /api/hub/dashboard          # Full dashboard data
GET    /api/hub/scenario/:id       # Specific scenario progress
POST   /api/hub/start-day          # Start Day N
POST   /api/hub/resume-session     # Resume paused session
GET    /api/hub/knowledge          # Collected knowledge cards
GET    /api/hub/streak             # Streak data
```

---

## 7. Permission Checks

Hub là màn user-facing, minimal permission complexity:
- Authenticated user: Access own Hub
- Parent (with transparency): Read-only view of child's Hub
- Otherwise: Redirect to login

---

## 8. Edge Cases

### Case 1: Streak broken

- No shame messaging
- "Your 5-day streak ended. Start a new one?"
- Focus on continuing, not rebuilding

### Case 2: Multiple active scenarios (V2)

- Switch scenarios with tabs
- Each has own timeline
- Primary scenario = most recently active

### Case 3: Timezone issues

- Store all times in UTC
- Display in user's local time
- Handle DST transitions gracefully

### Case 4: Clock tampering (device clock wrong)

- Server-side validation for day unlocks
- Prevent cheating "fast-forward"

### Case 5: Scenario archived by admin

- Show "This scenario is temporarily unavailable"
- Suggest alternatives
- Refund if appropriate

### Case 6: User completed scenario, tries to re-enter

- Show "Already completed" message
- Options: View report, Restart scenario, Try new

---

## 9. Responsive Considerations

### Desktop (1440px+)

- 3-column card layout
- Timeline horizontal
- All sections visible without scroll

### Laptop (1024-1440px)

- 2-column card layout
- Timeline still horizontal

### Tablet (768-1024px)

- 2-column cards
- Timeline responsive (may truncate names)

### Mobile (< 768px)

- Single column
- Timeline vertical (showing as list)
- Cards stack
- Swipe gestures for timeline

---

## 10. Performance Requirements

- **Initial load**: < 1.5s
- **Navigation in/out**: < 500ms
- **Timeline animation**: smooth
- **Auto-refresh**: background, non-blocking

---

## 11. Accessibility

- Clear heading hierarchy
- Timeline accessible via keyboard
- Screen reader announces status of each day
- Color không sole indicator (icons + labels)
- Focus indicators clear

---

## 12. Visual Design Notes

### Color application

**Timeline:**
- Completed: `--signal-calm`
- Current: `--lumina-500` with glow
- Locked: `--ink-300`
- Future preview: `--ink-400`

**Cards:**
- Primary action card (current day): `--lumina-100` tint
- Other cards: `--paper-100`
- Hover: `--paper-200` + shadow

**Greeting:**
- Time-aware icons
- Subtle background gradient

### Typography

- Greeting: Fraunces 32px italic
- Day labels: Inter Tight 14px
- Day names: Fraunces 16px
- Stats: JetBrains Mono 14px
- Card titles: Inter Tight 14px semibold uppercase

### Motion

- Current day pulse: slow, calming
- Completed day transitions: 300ms ease
- Day unlock: celebratory animation (brief confetti from lumina particles)
- Card hover: translateY(-2px) 200ms

---

## 13. Multi-domain Application Examples

### Example 1: Hub for Marketing scenario (active)

```yaml
user: "Minh Nguyen"
active_scenario:
  major: "Marketing"
  title: "Marketing: Crisis Management"
  current_day: 3
  theme: "Crisis Hits"
  progress: "28%"
  
personas_encountered:
  - "Anh Tùng (Marketing Director)"
  - "Chị Mai (Client)"
  - "Chip (Buddy)"

knowledge_cards:
  - "AARRR Metrics"
  - "Marketing Funnel"
  - "CAC vs LTV"
  - "A/B Testing"

buddy_greeting: "Day 3 sẽ căng đấy — sẵn sàng chưa?"

recommendations_when_complete:
  - "Business Administration"
  - "Product Management"
```

### Example 2: Hub for SE scenario (completed)

```yaml
user: "Minh Nguyen"
completed_scenarios:
  - major: "Software Engineering"
    title: "SE: Junior to Senior"
    ending: "The Fighter"
    completed_days_ago: 14
    
personas_encountered:
  - "Mr. Alpha (Giảng viên)"
  - "Boss Nam (Startup CEO)"
  - "Chip (Buddy)"

knowledge_cards_count: 14
```

### Example 3: Multiple Scenarios (V2 feature)

```yaml
user: "Linh Tran (Premium subscriber)"

active_scenarios:
  - major: "Medical"
    current_day: 3
    last_active: "2 hours ago"
    is_primary: true
    
  - major: "Psychology"
    current_day: 1
    last_active: "1 week ago"
    is_primary: false

ui_treatment: "Tabs to switch between scenarios"
```

### Differences in same Hub screen

| Aspect | Marketing (active) | SE (completed) | Multi-scenario |
|:--|:--|:--|:--|
| **Primary content** | Day 3 start prominent | Final Report link | Tabs to switch |
| **Buddy greeting** | Contextual to current day | "Congrats on completing!" | Per-scenario |
| **Knowledge cards** | In progress (6/14) | Full collection | Per-scenario |
| **Recommendations** | "When you complete..." | "Try these next" | Cross-pollination |
| **Emotional tone** | Anticipatory | Reflective | Balanced |

**Same Hub structure, different emotional states based on journey stage.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Learner |
| **Complexity** | ⭐⭐⭐ |
| **Frequency of use** | Daily (often multiple times) |
| **Estimated build time** | 4-6 weeks |
| **Key technologies** | React, state management, timezone handling |
| **Critical dependencies** | Screen 7 (Workspace) as main action target |
| **Performance targets** | < 1.5s load, smooth animations |
| **Device support** | All devices, mobile priority |
| **Multi-domain** | Yes - shows scenarios from any domain |
| **Biggest challenge** | Balancing urgency với compassion |
| **Biggest value** | Daily touchpoint, habit builder |
