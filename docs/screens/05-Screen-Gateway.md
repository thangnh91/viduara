# Screen 05 — Gateway

**Màn hình số:** 5  
**Phase:** B — Learner Core  
**Complexity:** ⭐⭐⭐ (Trung bình-Cao)  
**Primary users:** Học sinh (Learner), Phụ huynh (Parent — gift flow)  
**Related flow:** Flow 01 — Khám phá & Chọn ngành  
**Dependencies:** Screen 1 (Design System), Screen 6 (Hub — after selection), Screen 10 (Final Report — cross-sell)

---

## 0. Multi-domain Context

Gateway là container đa ngành — đây chính là màn **showcase toàn bộ các ngành** mà LUMINA offer. Wireframes dùng nhiều ngành để minh họa variety.

**Examples used in this spec:**
- **Software Engineering** (V1): Hero major
- **Medical** (V2): Showcase as "coming soon" trong V1, featured khi V2 launch
- **Marketing** (V2): Similar treatment
- **Future domains**: Slots reserved for Legal, Design, Finance, etc.

Trong runtime, Gateway hiển thị tất cả ngành có trong system tại thời điểm đó, với status (available / coming soon / locked).

---

## 1. Mục đích màn hình

Gateway là **cánh cửa đầu tiên** mà học sinh bước vào LUMINA — nơi quyết định ngành nào sẽ được "sống thử" trong 7 ngày tới.

**4 chức năng cốt lõi:**

1. **Showcase ngành** với metadata đầy đủ (difficulty, dropout rate, career paths)
2. **Recommend ngành** dựa trên onboarding quiz
3. **Compare ngành** side-by-side (V2)
4. **Purchase flow** hoặc free trial entry

### Metaphor thiết kế

Gateway giống như **cửa hàng sách chuyên đề về nghề nghiệp**:
- Mỗi ngành là một "cuốn sách lớn" với bìa đẹp
- Có preview text, ratings, ai thích hợp đọc
- Không phải Amazon bán hàng hối hả — mà là thư viện chọn lọc

Hoặc gần với **Netflix browse page** — nhưng với chiều sâu hơn, không binge-watching.

### Triết lý: "Slow discovery over quick conversion"

Ngược với e-commerce thông thường (tối ưu conversion), Gateway **cố ý làm chậm** quá trình chọn:

- Thông tin chi tiết về từng ngành
- "Ai hợp?" và "Ai không hợp?" section
- Disillusionment rate visible (60% vỡ mộng)
- Không sale pressure

Lý do: Chọn ngành là quyết định lớn. LUMINA muốn học sinh **chọn đúng**, không chọn nhanh.

---

## 2. Users & Use Cases

### Primary user: Học sinh (Learner)

**Contexts khi vào Gateway:**
- **First-time user**: Vừa hoàn thành onboarding, có AI recommendations
- **Returning user**: Đã hoàn thành 1 scenario, quay lại thử ngành khác (cross-sell)
- **Browsing user**: Chưa quyết định, muốn xem tất cả options

### Secondary user: Phụ huynh (Parent) — Gift flow

Phụ huynh có thể:
- Browse ngành để gift cho con
- Xem details tương tự học sinh
- Purchase và assign cho con linked

### Use cases chi tiết

#### UC1: First-time user với recommendations

**Flow:**
1. Vừa hoàn thành 5-question interest quiz
2. Gateway loads với "Top 3 Recommended" prominent
3. Các ngành khác bên dưới, sorted by fit score
4. Student reads descriptions, compare
5. Click "Start Day 1 Free" cho ngành đầu tiên

#### UC2: Returning user exploring new major

**Flow:**
1. Vừa hoàn thành SE scenario với "Fighter" ending
2. Final Report gợi ý Data Science
3. Click "Explore Data Science" → Gateway với Data Science pre-selected
4. Show special offer: "25% off for second scenario"
5. Purchase flow

#### UC3: Browsing với không có direction

**Flow:**
1. Student vào Gateway, no preferences
2. Default view: All majors, sorted by popularity
3. Filter by category (Tech / Healthcare / Business / ...)
4. Read detail cards
5. Take "Find Your Fit" quiz nếu confused

#### UC4: Parent gift flow

**Flow:**
1. Parent login vào Parent Dashboard
2. Click "Gift Scenario for Child"
3. Gateway in gift mode
4. Select scenario
5. Purchase
6. Child receives unlock code

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA          [Portfolio]                          👤 Minh Nguyen  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                          HERO SECTION                                   │
│              "Khám phá ngành phù hợp với bạn"                          │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│        RECOMMENDATIONS BANNER (if user has taken quiz)                 │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  FILTER & SORT BAR                                                     │
│  [Category ▼] [Difficulty ▼] [Duration ▼]   Sort: [Recommended ▼]      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  MAJOR CARDS GRID (3 columns)                                          │
│                                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                │
│  │ Software │ │ Medical  │ │ Marketing│                                │
│  │ Engineer │ │          │ │          │                                │
│  │          │ │ Coming   │ │ Coming   │                                │
│  │ [Card]   │ │ Soon     │ │ Soon     │                                │
│  └──────────┘ └──────────┘ └──────────┘                                │
│                                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                                │
│  │   ...    │ │   ...    │ │   ...    │                                │
│  └──────────┘ └──────────┘ └──────────┘                                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  HELP SECTION                                                          │
│  [Find Your Fit quiz]  [Talk to advisor (V2)]  [FAQ]                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Hero Section

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                                                                         │
│              Khám phá ngành phù hợp với bạn                             │
│                                                                         │
│        7 ngày trải nghiệm. 1 quyết định đúng cho 4 năm tới.            │
│                                                                         │
│                                                                         │
│         [🎯 Lấy gợi ý cá nhân hóa]    [📖 Xem tất cả 12 ngành]          │
│                                                                         │
│                                                                         │
│  Trust indicators:                                                      │
│  ⭐ 4.6/5 — 8,234 học sinh đã trải nghiệm                              │
│  🎓 95% tìm được hướng đi sau trải nghiệm                               │
│  👨‍👩‍👧 87% phụ huynh tin tưởng                                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Visual:**
- Background: gradient từ `--paper-100` → `--paper-200`
- Title: Fraunces 48px italic
- Subtitle: Inter Tight 18px
- CTAs: Primary (lumina) + Secondary (outline)

### Recommendations Banner (if applicable)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ✨ Gợi ý dựa trên bài trắc nghiệm của bạn                              │
│                                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                   │
│  │ 🥇 Match cao │ │ 🥈 Lân cận   │ │ 🥉 Khám phá  │                   │
│  │              │ │              │ │              │                   │
│  │ Software     │ │ Data Science │ │ UX Design    │                   │
│  │ Engineering  │ │              │ │              │                   │
│  │              │ │              │ │              │                   │
│  │ Match: 87%   │ │ Match: 72%   │ │ Match: 65%   │                   │
│  │              │ │              │ │              │                   │
│  │ [Try Day 1   │ │ [View]       │ │ [View]       │                   │
│  │  Free]       │ │              │ │              │                   │
│  └──────────────┘ └──────────────┘ └──────────────┘                   │
│                                                                         │
│  [Retake quiz]  [How is this calculated?]                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Filter & Sort Bar

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  CATEGORY                                                               │
│  [All] [🖥 Tech] [🏥 Healthcare] [💼 Business] [🎨 Creative]           │
│  [⚖ Legal] [💰 Finance] [📚 Education]                                 │
│                                                                         │
│  DIFFICULTY          DURATION                  STATUS                  │
│  [Any ▼]              [7 days ▼]                [Available ▼]          │
│                                                                         │
│  Sort by: [Recommended ▼]                                               │
│   • Recommended (based on profile)                                      │
│   • Most popular                                                        │
│   • Highest rated                                                       │
│   • Newest                                                              │
│   • Alphabetical                                                        │
│                                                                         │
│  Showing 8 of 12 majors                              [Clear filters]   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Major Card — Full view

```
┌──────────────────────────────────────┐
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │       🖥                     │    │
│  │                              │    │
│  │   Hero image/pattern         │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  Software Engineering                │
│  Kỹ thuật Phần mềm                   │
│                                      │
│  ⭐ 4.7 (1,234 reviews)              │
│  ⏱ 7 ngày • 45-75 min/day            │
│  ★★★★☆ Difficulty: 4/5               │
│                                      │
│  "Sống thử cuộc đời của một dev     │
│  từ junior đến senior trong 7 ngày." │
│                                      │
│  ─────────────────────────           │
│                                      │
│  AI HỢP VỚI BẠN NẾU:                 │
│  ✓ Tư duy logic tốt                  │
│  ✓ Thích problem-solving             │
│  ✓ OK với sitting work               │
│                                      │
│  THỬ THÁCH:                          │
│  ⚠ 60% học sinh "vỡ mộng"            │
│  ⚠ Đại cương năm 1-2 khô khan        │
│                                      │
│  ─────────────────────────           │
│                                      │
│  CAREER PATHS:                       │
│  • Junior/Senior Engineer            │
│  • Data Scientist                    │
│  • Product Manager (tech)            │
│  • Tech Lead → CTO                   │
│                                      │
│  Starting salary (VN):               │
│  15-25M/tháng                        │
│                                      │
│  ─────────────────────────           │
│                                      │
│  [  Try Day 1 Free  ]                │
│  [  Start Full Journey - $19.99  ]   │
│                                      │
│  💡 Match score: 87%                 │
│                                      │
└──────────────────────────────────────┘
```

### Major Card — "Coming Soon" (V2 majors trong V1)

```
┌──────────────────────────────────────┐
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │       🏥                     │    │
│  │                              │    │
│  │   (dimmed hero image)        │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  Medical (Y khoa)                    │
│                                      │
│  🔒 COMING SOON — V2                 │
│                                      │
│  "Trải nghiệm một ca trực Cấp cứu,  │
│   chẩn đoán, và ra quyết định       │
│   trong áp lực cao."                 │
│                                      │
│  ─────────────────────────           │
│                                      │
│  EXPECTED:                           │
│  • 7 days intensive simulation      │
│  • Patient interaction               │
│  • Ethical dilemmas                  │
│                                      │
│  ─────────────────────────           │
│                                      │
│  [  🔔 Notify me when ready  ]       │
│                                      │
│  Expected: Q3 2026                   │
│                                      │
└──────────────────────────────────────┘
```

### Major Card — Completed (for returning users)

```
┌──────────────────────────────────────┐
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │       🖥                     │    │
│  │                              │    │
│  │   ✅ COMPLETED               │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
│  Software Engineering                │
│                                      │
│  Your ending: The Fighter            │
│  Completed: 2 weeks ago              │
│                                      │
│  ─────────────────────────           │
│                                      │
│  [View your report]                  │
│  [Retake with new approach]          │
│                                      │
└──────────────────────────────────────┘
```

### Help Section (bottom)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Chưa biết chọn ngành nào?                                              │
│                                                                         │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐        │
│  │  🎯              │ │  💬              │ │  📖              │        │
│  │                  │ │                  │ │                  │        │
│  │  Find Your Fit   │ │  Talk to AI      │ │  Read FAQ        │        │
│  │  Quiz            │ │  Advisor (V2)    │ │                  │        │
│  │                  │ │                  │ │                  │        │
│  │  10 phút trắc    │ │  Chat với AI     │ │  Câu hỏi phổ     │        │
│  │  nghiệm AI       │ │  để khám phá     │ │  biến về việc    │        │
│  │                  │ │                  │ │  chọn ngành      │        │
│  │                  │ │                  │ │                  │        │
│  │  [Start Quiz]    │ │  [Coming Soon]   │ │  [View FAQ]      │        │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Card hover

- Subtle lift: translateY(-2px)
- Shadow deepens
- CTA button color intensifies
- Match score highlights

### Filter behavior

- Chips toggle active state
- Apply immediately (no "Apply" button)
- Show count of matching results
- Smooth transition of cards (fade in/out)

### Quick Preview (click card)

Before committing to start, can preview:

```
┌─────────────────────────────────────────┐
│  [×]                                    │
│                                         │
│      Software Engineering               │
│      Preview                            │
│                                         │
│  ─── DAY 1 PREVIEW ───                  │
│                                         │
│  [Embedded 2-minute video]              │
│                                         │
│  Day 1 theme: "Cơn say lập trình"       │
│  You'll experience:                     │
│  • First day at a startup               │
│  • Meet your AI mentor Mr. Alpha        │
│  • Build your first feature             │
│                                         │
│  ─── WHAT STUDENTS SAY ───              │
│                                         │
│  "Day 3 crashed changed my perspective  │
│   on SE career forever."                │
│                      — Linh, Grade 12   │
│                                         │
│  ─── READY? ───                         │
│                                         │
│  [Start Day 1 Free]                     │
│  [Start Full 7 Days - $19.99]           │
│                                         │
└─────────────────────────────────────────┘
```

### Start journey flow

**Click "Try Day 1 Free":**
1. Confirmation modal
2. Onboarding mini-flow (pre-Day 1 setup from Flow 01)
3. Redirect to Workspace (Screen 7)

**Click "Start Full Journey":**
1. Payment modal
2. Select method (VNPay, MoMo, Credit Card)
3. Confirm
4. Onboarding
5. Redirect to Hub (Screen 6) with scenario activated

---

## 5. States

### State 1: Loading

Skeleton cards với shimmer effect.

### State 2: Default (first-time, no quiz taken)

- Hero visible
- No recommendations banner
- All majors shown
- Sort: Recommended (default algorithm)

### State 3: With Recommendations (post-quiz)

- Recommendations banner prominent
- Cards sorted by match score
- Top 3 have "Match X%" badge

### State 4: Filtered view

- Active filters highlighted
- Count shown
- "Clear filters" visible

### State 5: No results

```
┌─────────────────────────────────────┐
│                                     │
│         🔍                          │
│                                     │
│    Không có ngành nào phù hợp       │
│                                     │
│  Thử:                               │
│  • Mở rộng difficulty range         │
│  • Xem "Coming Soon" majors         │
│  • Clear all filters                │
│                                     │
│  [Reset filters]                    │
│                                     │
└─────────────────────────────────────┘
```

### State 6: Payment processing

Modal với progress, cannot dismiss.

### State 7: Already completed view

- Completed scenarios marked clearly
- Options: View report / Retake

### State 8: Parent gift mode

- Additional selection: "Gift to [child name]"
- Price shown clearly
- Gift message option

---

## 6. Data Flow

### Inputs

```yaml
from_user_profile:
  - quiz_results (if taken)
  - completed_scenarios
  - current_subscription
  - payment_methods

from_scenario_registry:
  - all_scenarios
  - scenario_metadata (difficulty, duration, ratings)
  - availability_status
  - pricing

from_analytics:
  - popularity_rankings
  - success_rates
  - user_testimonials
```

### Outputs

```yaml
user_actions:
  - scenario.previewed
  - scenario.selected
  - purchase.initiated
  - purchase.completed
  - free_trial.started
  - quiz.retaken
  - filter.applied
  - notify_me.requested

analytics:
  - gateway_bounce_rate
  - time_to_selection
  - filter_usage
  - purchase_conversion
```

### API Endpoints

```yaml
GET    /api/gateway/majors              # List with filters
GET    /api/gateway/recommendations     # Personalized based on user
POST   /api/gateway/preview             # Scenario preview content
POST   /api/gateway/select              # Begin scenario
POST   /api/gateway/purchase            # Purchase scenario
POST   /api/gateway/notify-me           # Coming Soon notification
GET    /api/gateway/compare             # Compare 2-3 majors (V2)
```

---

## 7. Permission Checks

| Action | Free User | Paid User | Subscriber | Parent |
|:--|:-:|:-:|:-:|:-:|
| View all majors | ✅ | ✅ | ✅ | ✅ |
| Take quiz | ✅ | ✅ | ✅ | ❌ |
| Try Day 1 Free | ✅ (per major, once) | ✅ (unlimited) | ✅ | N/A |
| Start full journey | 💰 (pay) | ✅ (if purchased) | ✅ (unlimited) | 💰 (gift) |
| Compare majors (V2) | ❌ | ✅ | ✅ | ✅ |
| View completed | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (child's) |

---

## 8. Edge Cases

### Case 1: User hasn't taken quiz yet

- Show prompt: "Lấy gợi ý cá nhân hóa" prominent
- Recommendations based on default algo (popular + entry-level)

### Case 2: No majors available (empty state in V1)

Not applicable - V1 has SE. But if system has issues:
- Show maintenance message
- Offer email signup for updates

### Case 3: Student wants major not in system

- "Not seeing your major?" link
- Form to request
- Add to request queue (used for V2/V3 prioritization)

### Case 4: Student quickly starting without reading

- No forced reading, but:
- Show "Quick facts" tooltip on hover
- Post-selection confirmation: "Bạn đã đọc disillusionment rate 60% chưa?"

### Case 5: Payment fails mid-flow

- Retain selection
- Clear error message
- Alternative payment methods
- Save as "pending" for 24h

### Case 6: Student wants to compare 3 majors (V2)

**Flow:**
- Click "Compare" on cards (max 3)
- Side-by-side comparison modal
- Attributes shown: difficulty, duration, career path, requirements

### Case 7: Parent gift but child already has scenario

- Warning: "Child already has SE scenario"
- Options: Gift different major, Continue anyway (add duplicate), Cancel

### Case 8: Seasonal/promotional pricing

- Banner: "Tết 2026 Special: 30% off"
- Price shows original + discount
- Coupon codes supported

---

## 9. Responsive Considerations

### Desktop (1440px+)

- 3-column card grid
- Full filter bar visible
- Recommendations prominent

### Laptop (1024-1440px)

- 3-column still works
- Filter bar may wrap

### Tablet (768-1024px)

- 2-column card grid
- Filter bar horizontal scroll
- Modal previews full-screen

### Mobile (< 768px)

- Single column
- Sticky filter button → opens full-screen filter modal
- Cards more compact
- Critical: Maintain all features (mobile users can purchase)

---

## 10. Performance Requirements

- **Initial load**: < 2s
- **Filter apply**: < 300ms
- **Card hover**: 60 FPS
- **Preview modal open**: < 500ms
- **Search/filter**: instant (client-side for small lists)

### Optimization

- Lazy load card images
- Pre-compute filter indexes
- Cache popular queries
- CDN for scenario thumbnails

---

## 11. Accessibility

- Full keyboard navigation (Tab through cards)
- Screen readers: card structure clear
- Color không sole indicator (icons + text)
- Focus indicators visible
- Alt text cho all images
- High contrast mode support

---

## 12. Visual Design Notes

### Color application

**Cards:**
- Background: `--paper-100`
- Border: `--ink-100`
- Hover: shadow + `--lumina-300` border tint
- Completed: `--signal-calm` accent
- Coming soon: dimmed (opacity 0.7)

**Hero:**
- Gradient: `--paper-100` → `--paper-200`
- Title: `--ink-900`
- Trust indicators: `--lumina-500` accents

**Match scores:**
- >80%: `--signal-calm` badge
- 60-80%: `--lumina-500` badge
- <60%: `--ink-400` subtle

### Typography

- Hero title: Fraunces 48px italic
- Major names: Fraunces 22px
- Major descriptions: Inter Tight 14px
- Metadata: JetBrains Mono 11px uppercase
- CTAs: Inter Tight 14px medium

### Iconography

- Major category icons: custom (SE = 🖥, Medical = 🏥, Marketing = 📢)
- Ratings: star icons
- Status: ✅ 🔒 ⏱
- Actions: Lucide

---

## 13. Multi-domain Application Examples

### V1 Gateway Content

```yaml
majors_v1_available:
  - Software Engineering (Hero)
  
majors_v1_coming_soon:
  - Medical (Y khoa)
  - Marketing
  - Business Administration

majors_future:
  - Legal (Luật)
  - Design (Thiết kế)
  - Finance (Tài chính)
  - Psychology (Tâm lý học)
  - Education (Sư phạm)
  - Engineering (Kỹ thuật)
  - Architecture (Kiến trúc)
  - Media (Truyền thông)
```

### V2 Gateway Content (expanded)

```yaml
majors_v2_available:
  - Software Engineering
  - Medical (Y khoa)
  - Marketing
  - Business Administration
  - Data Science (new)
  - UX Design (new)
  
majors_v2_coming_soon:
  - Legal
  - Finance
  - Psychology
  - Education
```

### Card differentiation by domain

Each major has unique visual identity:

**Software Engineering:**
- Icon: 🖥
- Color accent: Blue-tinted
- Hero pattern: Code/matrix style
- Tone: Logical, structured

**Medical:**
- Icon: 🏥
- Color accent: Warm red (but not stress red)
- Hero pattern: Anatomy/medical
- Tone: Serious, caring

**Marketing:**
- Icon: 📢
- Color accent: Energetic orange
- Hero pattern: Data viz/campaigns
- Tone: Dynamic, business

**Design:**
- Icon: 🎨
- Color accent: Creative purple
- Hero pattern: Grid/composition
- Tone: Creative, visual

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Learner (first-time + returning) |
| **Complexity** | ⭐⭐⭐ |
| **Business criticality** | HIGH (conversion driver) |
| **Estimated build time** | 4-6 weeks |
| **Key technologies** | React, search/filter, payment integration |
| **Performance targets** | < 2s load, < 300ms filter |
| **Device support** | Desktop + tablet + mobile |
| **Multi-domain** | Yes - showcase all domains equally |
| **Biggest challenge** | Balance showcase với avoiding overwhelm |
| **Biggest value** | First impression of LUMINA's breadth |
