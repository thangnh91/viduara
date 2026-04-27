# Screen 20 — Parent Dashboard

**Màn hình số:** 20  
**Phase:** C — Learner Extended  
**Complexity:** ⭐⭐⭐ (Trung bình)  
**Primary users:** Phụ huynh (Parent)  
**Related flow:** Flow 08 — Parent Onboarding & Engagement  
**Dependencies:** Screen 6 (Hub - mirrors child's progress), Screen 10 (Final Report - parent view), Screen 11 (Portfolio)

---

## 0. Multi-domain Context

Parent Dashboard hiển thị progress của con qua bất kỳ ngành nào. Phụ huynh có thể có nhiều con, mỗi con có scenarios khác nhau từ các ngành khác nhau.

**Examples used in this spec:**
- 1 con đang học Marketing scenario
- 1 con đã complete SE scenario  
- Cross-domain: Phụ huynh thấy son thử SE, daughter thử Medical
- B2B context (V3): Trường học có "parent-like" view cho counselors

---

## 1. Mục đích màn hình

Parent Dashboard là **lăng kính quan sát** của phụ huynh vào hành trình LUMINA của con. Đây là nơi:

**5 chức năng cốt lõi:**

1. **Monitor progress** — Theo dõi tiến độ scenario của con
2. **View reports** — Xem Final Reports với parent insight
3. **Receive insights** — Notifications về milestone, concerns
4. **Communicate** — Talk to child với suggested topics
5. **Gift scenarios** — Mua scenarios mới cho con

### Metaphor thiết kế

Parent Dashboard giống như **kết hợp Apple Family + Khan Academy parent view**:
- Privacy-respectful visibility
- Calm, không alarmist
- Actionable insights
- Communication-focused (not surveillance)

### Triết lý: "Visibility, Not Surveillance"

Parent Dashboard **cố ý KHÔNG hiển thị** mọi thứ:
- Không show real-time chat của con với AI
- Không show specific decisions
- Show patterns, milestones, summaries

**3 transparency levels** quyết định visibility:
- **Minimal**: Chỉ status (Ngày 3 / 7), completion fact
- **Standard** (default): Progress + insights summary + Final Report
- **Full**: Standard + behavioral patterns + extended insights

Học sinh có quyền chọn level (với guidance từ LUMINA).

---

## 2. Users & Use Cases

### Primary user: Phụ huynh (Parent)

**Background expectations:**
- Tuổi 35-55
- Quan tâm con cái nhưng có thể bận
- Tech-savviness varied
- Tiếng Việt fluent, English reading OK
- Mobile-first usage (kiểm tra bằng phone)

**Mental states:**
- **Curious**: "Con đang làm gì?"
- **Worried**: "Con có ổn không?"
- **Supportive**: "Làm sao giúp con?"
- **Strategic**: "Đầu tư đúng hướng không?"

### Secondary user: Counselor (V3 B2B)

Trường học có counselor role với "parent-like" access:
- View students được assign
- Gợi ý interventions
- Cannot replace parental view

### Use cases chi tiết

#### UC1: Quick check-in (mobile, 2 phút)

**Flow:**
1. Mở app trên phone
2. See: "Minh đang ở Day 3 / 7 - Marketing scenario"
3. Status: Engaged, not stressed
4. Last active: 2 hours ago
5. No action needed → close

#### UC2: Receive milestone notification

**Flow:**
1. Push notification: "Minh hoàn thành Day 4 với điểm cao"
2. Open dashboard
3. View Day 4 summary
4. Suggested talking points cho dinner conversation
5. Mark "I'll discuss this"

#### UC3: View Final Report

**Flow:**
1. Notification: "Final Report available"
2. Open dashboard → Reports section
3. View report (Section 6 - Parent Insight prominent)
4. Download PDF
5. Schedule "talk with child" reminder

#### UC4: Concern alert (sensitive case)

**Flow:**
1. Notification: "Minh có vẻ stress cao trong 2 ngày"
2. Open dashboard
3. View patterns (anonymized)
4. Suggested approaches
5. Optional: Contact LUMINA support

#### UC5: Gift new scenario

**Flow:**
1. Child completed SE scenario
2. Click "Gift another scenario"
3. Browse Gateway in gift mode
4. Purchase Marketing scenario
5. Child sees unlocked

---

## 3. Layout & Structure

### Overall Layout (Mobile-first, 375px primary)

```
┌─────────────────────────────────┐
│ 🔥 LUMINA  [⚙]                  │
│ Parent Dashboard                │
├─────────────────────────────────┤
│                                 │
│  Greeting + Children selector   │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Active Scenario Card           │
│  (current journey)              │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Recent Milestones              │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Insights & Recommendations     │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Reports Library                │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Quick Actions                  │
│                                 │
└─────────────────────────────────┘
```

### Desktop Layout (1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  Parent Dashboard                  Mr. Hùng (Father)  [Logout]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Greeting + Children Tabs                                               │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │  ACTIVE SCENARIO                │  │  INSIGHTS & RECOMMENDATIONS│  │
│  │  (large card)                   │  │                             │  │
│  │                                 │  │  Suggested talking points  │  │
│  │                                 │  │  Communication tips         │  │
│  └─────────────────────────────────┘  └─────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │  RECENT MILESTONES              │  │  REPORTS LIBRARY            │  │
│  │                                 │  │                             │  │
│  │                                 │  │                             │  │
│  └─────────────────────────────────┘  └─────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  QUICK ACTIONS                                                  │   │
│  │  [Gift Scenario] [Schedule Talk] [Settings]                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Greeting + Children Selector

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Chào ông/bà Hùng                                                       │
│                                                                         │
│  Đang xem:                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                │
│  │ ● Minh   │ │   Linh   │ │ + Add    │                                │
│  │ 17 tuổi  │ │ 15 tuổi  │ │  child   │                                │
│  └──────────┘ └──────────┘ └──────────┘                                │
│                                                                         │
│  Last update: 2 hours ago                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Active Scenario Card (Mobile view)

```
┌─────────────────────────────────┐
│  📢 Marketing Scenario          │
│  Day 3 / 7                      │
│                                 │
│  ━━━━●━━━━━━━━━━━━━━━━           │
│  ████████░░░░░░░░░░░░ 28%       │
│                                 │
│  Status: ✓ Engaged              │
│  Stress level: Moderate         │
│                                 │
│  Recent activity:               │
│  Last session: 2 hours ago      │
│  Duration: 58 minutes           │
│                                 │
│  Today's theme:                 │
│  "Crisis Hits"                  │
│                                 │
│  Trying to: Analyze campaign    │
│  drop và respond to client      │
│  pressure                       │
│                                 │
│  [View detailed progress >]     │
│                                 │
└─────────────────────────────────┘
```

### Insights & Recommendations Card

```
┌─────────────────────────────────┐
│  💡 INSIGHTS                    │
│                                 │
│  This week's pattern:           │
│  Minh thể hiện strong logical    │
│  thinking trong Day 2 metrics   │
│  analysis. Có vẻ con yêu thích  │
│  data work.                     │
│                                 │
│  💬 SUGGESTED TALKING POINTS    │
│                                 │
│  Bạn có thể hỏi con:            │
│                                 │
│  ✓ "Hôm nay con thấy ngành      │
│     Marketing thế nào?"         │
│                                 │
│  ✓ "Có moment nào trong Day 3   │
│     khiến con suy nghĩ?"        │
│                                 │
│  ✓ "Stress level của con thế    │
│     nào trong scenario?"        │
│                                 │
│  ⚠ AVOID asking:                │
│                                 │
│  ✗ "Con quyết định ngành chưa?" │
│    (Quá sớm, tạo áp lực)        │
│                                 │
│  ✗ "Tại sao con chọn không      │
│    đúng?"                       │
│    (Mọi quyết định đều valid)   │
│                                 │
│  [📅 Schedule talk reminder]    │
│                                 │
└─────────────────────────────────┘
```

### Recent Milestones

```
┌─────────────────────────────────┐
│  🏆 RECENT MILESTONES           │
│                                 │
│  ✓ Day 2 completed              │
│    2 days ago                   │
│    "Strong analytical thinking" │
│                                 │
│  ✓ Day 1 completed              │
│    3 days ago                   │
│    "Curious and engaged"        │
│                                 │
│  📊 First scenario started      │
│    4 days ago                   │
│                                 │
│  [View all activity]            │
│                                 │
└─────────────────────────────────┘
```

### Reports Library

```
┌─────────────────────────────────┐
│  📄 REPORTS LIBRARY             │
│                                 │
│  Available reports:             │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🖥 Software Engineering │    │
│  │ Completed 2 weeks ago   │    │
│  │ Ending: The Fighter     │    │
│  │ Score: 78/100           │    │
│  │                         │    │
│  │ [View Report] [⤓ PDF]   │    │
│  └─────────────────────────┘    │
│                                 │
│  In progress:                   │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 📢 Marketing Scenario   │    │
│  │ Day 3 / 7               │    │
│  │ Report available after  │    │
│  │ Day 7 completion        │    │
│  │                         │    │
│  │ [Track progress]        │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

### Quick Actions

```
┌─────────────────────────────────┐
│  QUICK ACTIONS                  │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🎁                      │    │
│  │ Gift Another Scenario   │    │
│  │                         │    │
│  │ Browse all majors       │    │
│  │ [Browse Gateway >]      │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 📅                      │    │
│  │ Schedule Talk           │    │
│  │                         │    │
│  │ Set reminder to discuss │    │
│  │ scenarios với con       │    │
│  │ [Set reminder]          │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ⚙                       │    │
│  │ Settings                │    │
│  │                         │    │
│  │ Notifications, privacy  │    │
│  │ transparency level      │    │
│  │ [Settings]              │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 💬                      │    │
│  │ LUMINA Support          │    │
│  │                         │    │
│  │ Need help understanding │    │
│  │ a report?               │    │
│  │ [Contact >]             │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## 4. Transparency Level Visualization

Phụ huynh thấy gì tùy vào transparency level student đã chọn:

### Minimal Level

```
┌─────────────────────────────────┐
│  📢 Marketing Scenario           │
│  Day 3 / 7                      │
│                                 │
│  Status: In progress            │
│  Last active: 2 hours ago       │
│                                 │
│  ⓘ Minh đã chọn Minimal         │
│    transparency. Bạn chỉ thấy   │
│    progress căn bản.            │
│                                 │
│  Khi scenario kết thúc, bạn sẽ │
│  có thể xem báo cáo cuối cùng. │
│                                 │
└─────────────────────────────────┘
```

### Standard Level (default)

Như layout đã mô tả ở trên — full visibility với insights.

### Full Level

Standard + extra:

```
┌─────────────────────────────────┐
│  EXTENDED INSIGHTS              │
│                                 │
│  Behavioral patterns:           │
│  • Best decisions: When         │
│    presented with data          │
│  • Struggles with: Time         │
│    pressure scenarios           │
│  • Strength: Logical analysis   │
│  • Growth area: Communication   │
│                                 │
│  Compared to peer avg:          │
│  • Stress tolerance: Higher     │
│  • Decision speed: Faster       │
│  • Engagement: Strong           │
│                                 │
│  ⓘ Insights anonymized — không  │
│    show specific decisions hay  │
│    chat content                 │
│                                 │
└─────────────────────────────────┘
```

---

## 5. States

### State 1: Onboarding (first-time)

```
Welcome to LUMINA Parent Dashboard

You're now linked với Minh's account.

Your child has selected:
Standard transparency level

This means you can see:
✓ Progress overview
✓ Milestones
✓ Final reports
✓ Insights summary

You CANNOT see:
✗ Real-time chat content
✗ Specific decisions
✗ Detailed behavioral data

[Got it - Continue]
```

### State 2: Default view

Active scenario card prominent, others below.

### State 3: No active scenario

```
Minh chưa có scenario nào đang chạy.

Last completed: SE Scenario (2 weeks ago)

Would you like to:
[Gift Another Scenario]
[Discuss SE Report với Minh]
```

### State 4: Concern alert

```
⚠ NOTICE FROM LUMINA

Minh đã thể hiện stress level cao trong
2 ngày liên tiếp.

Recommended actions:
1. Check in with Minh casually
2. Don't pressure decisions
3. Listen rather than advise

This is common và usually resolves naturally.
LUMINA's Buddy AI sẽ continue support con.

[Read more] [Talk to LUMINA support]
```

### State 5: Multiple children

Tabs switching between children.

### State 6: Notification view

List của recent notifications, marked read/unread.

---

## 6. Data Flow

### Inputs

```yaml
from_child_account:
  - active_scenarios
  - completed_scenarios
  - progress_data
  - milestones
  - transparency_level

from_analytics:
  - patterns_aggregated
  - insights_generated
  - peer_comparisons (anonymized)

from_lumina_team:
  - manual_alerts
  - support_messages
```

### Outputs

```yaml
parent_actions:
  - dashboard.viewed
  - report.viewed
  - report.downloaded
  - scenario.gifted
  - talk.scheduled
  - settings.updated
  - notification.acknowledged
```

### API Endpoints

```yaml
GET    /api/parent/dashboard                # Full dashboard
GET    /api/parent/children                 # List linked children
GET    /api/parent/child/:id/progress       # Specific child progress
GET    /api/parent/child/:id/reports        # Reports list
GET    /api/parent/insights                 # AI-generated insights
POST   /api/parent/schedule-talk            # Set reminder
POST   /api/parent/gift-scenario            # Purchase scenario
PATCH  /api/parent/settings                 # Update settings
GET    /api/parent/notifications            # Notifications list
POST   /api/parent/notifications/read       # Mark read
```

---

## 7. Permission Checks

| Action | Parent (Linked) | Counselor (V3) |
|:--|:-:|:-:|
| View child progress | ✅ (per transparency) | ✅ (per school agreement) |
| View Final Report | ✅ (Standard+) | ✅ |
| Download PDF | ✅ | 🔐 (school agreement) |
| Gift scenarios | ✅ | ❌ |
| View insights | ✅ (Standard+) | ✅ |
| Modify child account | ❌ | ❌ |
| View raw chat | ❌ (privacy) | ❌ |
| Receive notifications | ✅ | ✅ (concerning patterns only) |

---

## 8. Edge Cases

### Case 1: Child changes transparency level mid-scenario

- Dashboard updates immediately
- Notification to parent: "Transparency level changed"
- Past data respects new level retrospectively

### Case 2: Child requests parent disconnect

- Parent notified với explanation
- Disconnect after 7-day cooling period
- Parent loses dashboard access

### Case 3: Sensitive content (mental health concern)

- LUMINA team alerts parent
- Mental health resources prominent
- Suggest professional help if needed
- Override transparency level for safety

### Case 4: Multiple children, different transparency

- Each child's tab respects their own level
- Parent doesn't see consistent UI across children
- Helps avoid comparison

### Case 5: Divorced/separated parents

- Each parent has separate dashboard access
- Child can choose which parent(s) link
- No collaboration features (avoid conflicts)

### Case 6: Grandparents/guardians

- Same as parent role
- Multiple guardians possible

---

## 9. Responsive Considerations

### Mobile (< 768px) — Primary

**Critical** - parents kiểm tra phone trước.

- Single column
- Cards stack
- Touch-optimized
- Swipe between children
- Push notifications integrated

### Tablet (768-1024px)

- 2-column where appropriate
- Larger touch targets

### Desktop (> 1024px)

- 2-column grid
- More information density
- Better for reading reports

---

## 10. Performance Requirements

- **Initial load**: < 2s mobile
- **Child switch**: < 500ms
- **Report load**: < 3s
- **PDF download**: < 30s

---

## 11. Accessibility

**Critical:**
- Many parents có thị lực giảm
- Text resize respect
- High contrast mode
- Voice over support
- Big tap targets
- Simple language

---

## 12. Visual Design Notes

**Tone:** Warm, calm, confidence-inspiring (NOT clinical or alarming)

### Colors
- Background: `--paper-200` (warmer)
- Cards: `--paper-100`
- Status colors moderate: greens calmer, reds softer
- Action CTAs: `--lumina-500`

### Typography
- Headlines: Fraunces (warmer than tech-y)
- Body: Inter Tight comfortable size (16px on mobile)
- Tables avoided (poor mobile)
- Lots of whitespace

### Iconography
- Friendly icons (rounded, not sharp)
- Family/care metaphors (heart, hand, home)
- Status simple (✓ ⚠ ℹ)

---

## 13. Multi-domain Application Examples

### Single child, Marketing scenario

Standard transparency, mid-journey.

### Single child, completed SE

Past tense framing, "Looking back at journey".

### Multiple children, different domains

```yaml
parent: "Mr. Hùng"
children:
  - name: "Minh (17)"
    active_scenario: "Marketing - Day 3"
    transparency: "Standard"
    completed: ["Software Engineering"]
    
  - name: "Linh (15)"
    active_scenario: null
    transparency: "Standard"
    completed: []
    interest_quiz_done: false
```

### Cross-domain insights

Parent có thể compare children:
- Minh: Strong logical thinking
- Linh: Strong creative thinking
- Insight: Different strengths, different paths

**Important:** Comparison careful — not "which child is better"

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Parent |
| **Complexity** | ⭐⭐⭐ |
| **Estimated build time** | 5-6 weeks |
| **Frequency of use** | 2-3 times per week typically |
| **Key technologies** | React, mobile-first, push notifications |
| **Critical dependencies** | Child accounts, analytics, transparency settings |
| **Performance targets** | < 2s mobile load |
| **Device support** | Mobile primary, tablet secondary, desktop tertiary |
| **Multi-domain** | Yes - shows scenarios across all domains |
| **Biggest challenge** | Balance visibility vs privacy |
| **Biggest value** | Family communication + investment confidence |
