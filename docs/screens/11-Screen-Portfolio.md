# Screen 11 — Portfolio

**Màn hình số:** 11  
**Phase:** C — Learner Extended  
**Complexity:** ⭐⭐ (Trung bình thấp)  
**Primary users:** Học sinh (Learner), Phụ huynh (Parent — view-only)  
**Related flow:** Flow 03 — Kết thúc & Nhận báo cáo (long-term destination)  
**Dependencies:** Screen 10 (Final Report - source data), Screen 6 (Hub - alternate entry)

---

## 0. Multi-domain Context

Portfolio là **bộ sưu tập journey** của học sinh qua nhiều scenarios từ nhiều ngành. Đây là nơi đa ngành thể hiện rõ nhất từ góc độ người dùng — học sinh có thể đã thử SE, Marketing, Medical và xem tất cả trong 1 màn.

**Examples used in this spec:**
- Học sinh đã hoàn thành: SE (Fighter ending) + Marketing (Wrong Fit ending)
- Đang trong: Medical scenario Day 4
- Knowledge cards collected từ tất cả scenarios

---

## 1. Mục đích màn hình

Portfolio là **personal trophy room + journey log**:

**4 chức năng cốt lõi:**

1. **Journey timeline** — Visual history của tất cả scenarios
2. **Reports library** — Access tất cả Final Reports
3. **Knowledge collection** — Cards earned across journeys
4. **Achievements & insights** — Cross-scenario patterns

### Metaphor thiết kế

Portfolio giống như **LinkedIn profile + Pokédex**:
- LinkedIn: Professional growth narrative
- Pokédex: Collection feeling (gotta complete them all)

### Triết lý: "Reflection over Bragging"

Portfolio không phải để show off. Nó là cho **chính student** reflect:
- Mình đã thử bao nhiêu paths?
- Mình giỏi điểm gì xuyên suốt?
- Pattern nào lặp lại?

---

## 2. Users & Use Cases

### Primary user: Học sinh (Learner)

**Khi vào Portfolio:**
- Sau khi finish scenario, lưu report
- Vài tuần sau, nhìn lại
- Khi quyết định thử ngành mới
- Để chia sẻ với parent/counselor

### Secondary user: Parent (view-only)

Per transparency settings.

### Use cases chi tiết

#### UC1: Reflect after multiple scenarios

**Flow:**
1. Đã complete 3 scenarios (SE, Marketing, Medical)
2. Mở Portfolio
3. Xem timeline — 3 reports
4. So sánh insights cross-scenario
5. Thấy pattern: "Mình stress với client-facing work"
6. Quyết định: focus on individual contributor roles

#### UC2: Re-read old report

**Flow:**
1. 6 tháng sau khi complete SE
2. Mở Portfolio
3. Find SE report
4. Re-read với perspective mới
5. Realize insights đã trở thành reality

#### UC3: Share với counselor

**Flow:**
1. Trường có career counselor
2. Student exports portfolio summary (PDF)
3. Đem đến meeting
4. Discuss together
5. Refine career planning

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  [Hub] [Portfolio]                            👤 Minh Nguyen  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Profile Header                                                         │
│  Hành trình của bạn                                                     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Tabs: Timeline | Reports | Knowledge | Achievements                   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Tab content (default: Timeline)                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Profile Header

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌────────┐                                                             │
│  │   👤   │   Minh Nguyen                                                │
│  │ Avatar │   Grade 12 • Trên Bắc                                       │
│  │        │   Joined LUMINA: March 2026                                 │
│  └────────┘                                                             │
│                                                                         │
│  📊 Your Stats                                                          │
│                                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│  │  3       │ │  1       │ │  18      │ │  21h     │                  │
│  │ Scenarios│ │ Active   │ │Knowledge │ │  Total   │                  │
│  │Completed │ │  Now     │ │  Cards   │ │  Time    │                  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                  │
│                                                                         │
│  [⤓ Export Portfolio PDF]                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 1: Timeline (default)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  YOUR JOURNEY                                                           │
│                                                                         │
│  March 2026 ────────────────────────────────────────────── April 2026   │
│                                                                         │
│  ●─────────────●─────────────●────────────●                             │
│  Software       Marketing     SE Report    Medical                      │
│  Engineering    Crisis        Re-read      In Progress                  │
│  Mar 15-21      Apr 2-8       Apr 12       Apr 20-now                   │
│  ✓ Completed    ✓ Completed   📖           Day 4 / 7                    │
│  Fighter        Wrong Fit                                               │
│                                                                         │
│  Click any node to explore →                                            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  COMPLETED SCENARIOS (2)                                                │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  🖥 SOFTWARE ENGINEERING                                    │       │
│  │  Junior to Senior Evolution                                 │       │
│  │                                                             │       │
│  │  Completed: Mar 21, 2026 • 7 days                           │       │
│  │  Ending: ⚔️ The Fighter                                     │       │
│  │  Score: 78/100                                              │       │
│  │                                                             │       │
│  │  Key insights:                                              │       │
│  │  • Strong systematic thinking                               │       │
│  │  • Stress với team conflicts                                │       │
│  │  • Best as individual contributor                           │       │
│  │                                                             │       │
│  │  [View Full Report] [Knowledge Cards (12)]                  │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  📢 MARKETING                                                │       │
│  │  Crisis Management                                          │       │
│  │                                                             │       │
│  │  Completed: Apr 8, 2026 • 7 days                            │       │
│  │  Ending: 🍃 The Wrong Fit                                   │       │
│  │  Score: 38/100                                              │       │
│  │                                                             │       │
│  │  Key insights:                                              │       │
│  │  • Discomfort với ambiguity                                 │       │
│  │  • Prefers structured problems                              │       │
│  │  • Public-facing work draining                              │       │
│  │                                                             │       │
│  │  [View Full Report] [Knowledge Cards (6)]                   │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  IN PROGRESS                                                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  🏥 MEDICAL                                                  │       │
│  │  ER Night Shift                                             │       │
│  │                                                             │       │
│  │  Started: Apr 20, 2026                                      │       │
│  │  Day 4 / 7 — Critical Decisions                             │       │
│  │  Progress: ████████░░░░░░░░░░░ 42%                          │       │
│  │                                                             │       │
│  │  [Continue Day 4]                                           │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 2: Reports

```
┌─────────────────────────────────────────────────────────────────────────┐
│  REPORTS LIBRARY (2)                                                    │
│                                                                         │
│  Sort: [Most recent ▼]                                                  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  Final Report — Marketing Crisis Management                 │       │
│  │  Generated: Apr 8, 2026                                     │       │
│  │  Last viewed: 2 days ago                                    │       │
│  │                                                             │       │
│  │  [View Online] [⤓ Download PDF] [⤴ Share]                    │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  Final Report — Software Engineering: Junior to Senior      │       │
│  │  Generated: Mar 21, 2026                                    │       │
│  │  Last viewed: Apr 12, 2026                                  │       │
│  │                                                             │       │
│  │  [View Online] [⤓ Download PDF] [⤴ Share]                    │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  When Medical scenario completes, report will appear here.              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 3: Knowledge

```
┌─────────────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE COLLECTION (18 cards)                                        │
│                                                                         │
│  Filter: [All domains ▼]                                                │
│                                                                         │
│  ─── FROM SOFTWARE ENGINEERING (12) ───                                 │
│                                                                         │
│  ◆ Big O Notation         ◆ Sorting Algorithms                          │
│  ◆ Recursion              ◆ Data Structures Basics                      │
│  ◆ Memory Management      ◆ Debugging 101                               │
│  ◆ Algorithm Thinking     ◆ Object-Oriented Programming                 │
│  ◆ Database Concepts      ◆ API Design                                  │
│  ◆ Testing Fundamentals   ◆ Code Review                                 │
│                                                                         │
│  ─── FROM MARKETING (6) ───                                             │
│                                                                         │
│  ◆ AARRR Metrics          ◆ Marketing Funnel                            │
│  ◆ CAC vs LTV             ◆ A/B Testing                                 │
│  ◆ Customer Personas      ◆ Marketing Mix                               │
│                                                                         │
│  ─── FROM MEDICAL (in progress) ───                                     │
│                                                                         │
│  ◆ Vital Signs            ◆ Clinical Reasoning                          │
│  (More to unlock as you progress through Medical scenario)              │
│                                                                         │
│  Click any card to review details                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 4: Achievements & Insights

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ACHIEVEMENTS                                                           │
│                                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│  │  🎯      │ │  ⚔️      │ │  🌍      │ │  📚      │                  │
│  │          │ │          │ │          │ │          │                  │
│  │  First   │ │  Survivor│ │  Explorer│ │  Scholar │                  │
│  │ Scenario │ │          │ │          │ │          │                  │
│  │          │ │ Completed│ │ Tried 3  │ │ 18 cards │                  │
│  │ Earned   │ │ Crisis   │ │ majors   │ │ collected│                  │
│  │ Mar 21   │ │ Day 3    │ │          │ │          │                  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                  │
│                                                                         │
│  Locked achievements (5):                                               │
│  🔒 Complete 5 scenarios     🔒 Stay 1 month                            │
│  🔒 Earn 50 knowledge cards  🔒 Try 5 different domains                 │
│  🔒 The Natural ending                                                  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  CROSS-SCENARIO INSIGHTS                                                │
│                                                                         │
│  Patterns AI discovered across your journeys:                           │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  💡 INSIGHT 1                                                │       │
│  │                                                             │       │
│  │  Your stress consistently spikes when:                      │       │
│  │  • Team conflicts (3 instances)                             │       │
│  │  • Client-facing work (2 instances)                         │       │
│  │  • Public presentations (2 instances)                       │       │
│  │                                                             │       │
│  │  Pattern: You thrive in deep individual work                │       │
│  │  Recommendation: Look for IC-track careers                  │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  💡 INSIGHT 2                                                │       │
│  │                                                             │       │
│  │  Your strengths consistent across domains:                  │       │
│  │  • Systematic thinking (10/10 in SE, 8/10 in Marketing)     │       │
│  │  • Pattern recognition                                      │       │
│  │  • Logical analysis                                         │       │
│  │                                                             │       │
│  │  These are core skills that transfer well.                  │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │  💡 INSIGHT 3                                                │       │
│  │                                                             │       │
│  │  Career path recommendation update:                         │       │
│  │                                                             │       │
│  │  Based on 2 scenarios, your top fits are:                   │       │
│  │  1. Software Engineering (78%) — confirmed                  │       │
│  │  2. Data Science (predicted 82%) — try this                 │       │
│  │  3. Research (predicted 75%) — explore                      │       │
│  │                                                             │       │
│  │  [Try Data Science scenario]                                │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Interactions

### Timeline interactions

- Click node → opens scenario detail
- Hover → tooltip with summary
- Long timeline scrolls smoothly

### Cross-scenario insights generation

- Generated at portfolio load
- Cached, refreshed when new scenario completes
- LLM-generated với constraints

### Export PDF

- Compiles all data into 1 PDF
- 10-30 seconds to generate
- Email when ready (background task)

---

## 5. States

### State 1: Empty (just signed up)

```
┌─────────────────────────────────────┐
│                                     │
│         📁                          │
│                                     │
│    Portfolio of you                 │
│                                     │
│    Khi bạn hoàn thành scenarios,    │
│    chúng sẽ xuất hiện ở đây.        │
│                                     │
│    [Start your first scenario]      │
│                                     │
└─────────────────────────────────────┘
```

### State 2: 1 scenario (initial state)

Less rich than full version. Cross-scenario insights not yet available.

### State 3: 2+ scenarios (full insights)

Default view with all 4 tabs populated.

### State 4: Sharing mode

Generate read-only link to share with parent/counselor.

---

## 6. Data Flow

### Inputs

```yaml
from_user_history:
  - all_completed_scenarios
  - all_active_scenarios
  - all_reports_generated
  - knowledge_cards_collected
  - achievements_earned

from_analytics:
  - cross_scenario_patterns
  - peer_comparisons (anonymized)
```

### Outputs

```yaml
events:
  - portfolio.viewed
  - report.reopened
  - portfolio.exported
  - portfolio.shared
  - cross_insights.generated
```

### API Endpoints

```yaml
GET    /api/portfolio                   # Full portfolio data
GET    /api/portfolio/timeline          # Timeline data
GET    /api/portfolio/reports           # Reports list
GET    /api/portfolio/knowledge         # Knowledge cards
GET    /api/portfolio/achievements      # Achievements
GET    /api/portfolio/insights          # Cross-scenario insights
POST   /api/portfolio/export            # Generate PDF
POST   /api/portfolio/share             # Generate share link
```

---

## 7. Permission Checks

| Action | Self | Parent | Counselor (V3) |
|:--|:-:|:-:|:-:|
| View own portfolio | ✅ | N/A | N/A |
| View child's portfolio | N/A | 🔐 (transparency) | ✅ (per agreement) |
| Export PDF | ✅ | 🔐 | 🔐 |
| Share link | ✅ | ❌ | ❌ |
| Edit | ❌ | ❌ | ❌ |
| Delete scenarios | 🔐 (request) | ❌ | ❌ |

---

## 8. Edge Cases

### Case 1: Privacy concerns about cross-insights

- Insights generated locally cho student
- Patterns abstracted (no specific decisions revealed)
- User can opt-out of insights generation

### Case 2: Old portfolio (years later)

- Long-term storage maintained
- Knowledge cards persist
- Reports archived but accessible

### Case 3: Account deletion request

- GDPR-compliant
- Portfolio data exported first
- Then deleted permanently

---

## 9-12. Standard sections

(Responsive: Mobile-friendly, swipe between tabs)
(Performance: < 2s load, lazy-load tabs)
(Accessibility: Timeline keyboard navigable)
(Visual: Trophy room feel, warm colors)

---

## 13. Multi-domain Application Examples

Portfolio reaches its full power when student has scenarios from multiple domains. Cross-domain insights emerge naturally.

**Example portfolio:**
```yaml
scenarios:
  - se_completed (Fighter ending)
  - marketing_completed (Wrong Fit ending)
  - medical_in_progress (Day 4)

cross_insights:
  - "Strengths consistent: Systematic thinking, Logic"
  - "Weakness pattern: Public-facing work"
  - "Recommended next: Data Science (82% predicted)"
```

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Learner (long-term reflection) |
| **Complexity** | ⭐⭐ |
| **Estimated build time** | 3-4 weeks |
| **Multi-domain** | YES - Power emerges from cross-domain data |
| **Biggest value** | Long-term retention + reflection tool |
