# Screen 14 — Widget Catalog

**Màn hình số:** 14  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐⭐ (Trung bình-Cao)  
**Primary users:** Designer, Engineer (full); Persona Writer, Curator, Operator (read)  
**Related flow:** Flow 04 (Tạo kịch bản — browse widgets), Flow 06 (Tạo widget — view registry)  
**Dependencies:** Screen 4 (Widget Studio), Screen 2 (Scenario Architect — uses catalog)

---

## 0. Multi-domain Context

Widget Catalog là **registry** của tất cả widgets trong LUMINA — đa ngành đầy đủ. Khác với Widget Studio (chỉ Engineer chỉnh sửa), Catalog là nơi **discover và select** widgets cho scenarios.

**Examples used in this spec:**
- **Software Engineering**: CodeSpace, LogHunter, TaskBoard, DeployFlow, TeamChat
- **Medical**: PatientMonitor, AnatomyExplorer, PrescriptionForm, DragAndDropDiagnosis
- **Marketing**: CampaignDashboard, AudienceSegmentor, ABTestSimulator, FunnelAnalyzer
- **Generic/Cross-domain**: TeamChat, MarkdownViewer, Timer, KanbanBoard

---

## 1. Mục đích màn hình

Widget Catalog là **thư viện widgets** với 4 chức năng cốt lõi:

1. **Browse & Discover** — Xem tất cả widgets với rich metadata
2. **Filter & Search** — Tìm widget phù hợp cho use case
3. **View Dependencies** — Xem scenarios nào đang dùng widget
4. **Select & Use** — Add widget vào scenario hoặc inspect detail

### Metaphor thiết kế

Widget Catalog giống như **npm Registry** + **Figma Community**:
- Browse với rich preview
- Detailed metadata
- Usage statistics
- Version history
- Reviews/ratings

Hoặc gần với **VSCode Extensions Marketplace** — nơi designers tìm widgets như developers tìm extensions.

### Triết lý: "Widget Discovery is Half the Battle"

Designer biết "tôi cần widget cho Day 3 crisis", nhưng không biết widget nào tồn tại. Catalog phải:
- Easy discovery (search + filters mạnh)
- Clear context ("này dùng cho ngành nào, situation nào")
- Quick preview (không phải click vào mới biết)
- Show alternatives ("cũng có thể xem các widgets tương tự")

---

## 2. Users & Use Cases

### Primary user: Scenario Designer (role: `designer`)

**Use case:** Đang thiết kế scenario, cần widget cho Day N

**Journey:**
- Open Widget Catalog
- Filter by domain (e.g., Marketing)
- Browse cards
- Preview widget với mock data
- Add to scenario hoặc note "request new widget"

### Secondary user: Widget Engineer (role: `engineer`)

**Use case:** Quản lý widgets, decide what to build next

**Journey:**
- View own widgets + others
- See usage statistics
- Identify popular/unused widgets
- Plan deprecation

### Tertiary users (read-only)

- **Persona Writer**: Hiểu widgets để craft AI responses appropriate
- **Curator**: Verify widgets có support knowledge cards correctly
- **Operator**: Look up widgets when debugging

### Use cases chi tiết

#### UC1: Designer browse cho new scenario

**Flow:**
1. Designer just started Marketing scenario
2. Open Widget Catalog
3. Filter: Domain = Marketing, Status = Production
4. Sees 4 Marketing widgets
5. Click CampaignDashboard → preview
6. Click "Use in scenario" → adds to scenario

#### UC2: Engineer plans next quarter

**Flow:**
1. Open Catalog với "Statistics" view
2. Sort by usage (descending)
3. Identify gaps: "Marketing has only 4 widgets, low diversity"
4. Sort by requests: "8 designers requested AnomalyDetector"
5. Plan to build AnomalyDetector next

#### UC3: Designer search for specific functionality

**Flow:**
1. Search: "kanban"
2. Find: TaskBoard (SE), KanbanBoard (Generic)
3. Compare both
4. Select Generic since works cross-domain

#### UC4: Operator investigates widget issue

**Flow:**
1. Alert: "PatientMonitor errors up 5%"
2. Open Catalog → click PatientMonitor
3. View dependencies: 3 scenarios using it
4. View version history: latest deployed 2 days ago
5. Drill down to Widget Studio for code investigation

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Operations  >  Widget Catalog              [+ New Widget]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Filter & Search bar                                                   │
│                                                                         │
├─────────────┬─────────────────────────────────────────────┬─────────────┤
│             │                                             │             │
│  Filters    │            Widgets Grid                     │   Detail    │
│  Sidebar    │         (3-column cards)                    │   Panel     │
│             │                                             │   (when     │
│  280px      │              780px                          │   selected) │
│             │                                             │             │
│             │                                             │   320px     │
│             │                                             │             │
│             │                                             │             │
│             │                                             │             │
└─────────────┴─────────────────────────────────────────────┴─────────────┘
```

### Filter Bar (Top, persistent)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🔍 Search widgets...                                          24 results│
│                                                                         │
│  Domain:  [All] [SE] [Medical] [Marketing] [Generic]                    │
│  Status:  [Production] [Staging] [Draft]                                │
│  Sort:    [Most used ▼]                                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Sort options:**
- Most used
- Recently updated
- Highest rated
- Alphabetical
- Most expensive (cost per session)

### Filters Sidebar (Left, 280px)

```
┌─────────────────────────────┐
│  ADVANCED FILTERS           │
│                             │
│  ─── DOMAIN ───             │
│  ☑ Software Engineering (5) │
│  ☑ Medical (3)              │
│  ☑ Marketing (4)            │
│  ☑ Generic (6)              │
│  ☐ Legal (0)                │
│  ☐ Design (2 - Coming)      │
│                             │
│  ─── CATEGORY ───           │
│  ☑ Code editors             │
│  ☑ Dashboards               │
│  ☑ Communication            │
│  ☑ Forms                    │
│  ☑ Visualizations           │
│  ☑ Simulations              │
│                             │
│  ─── STATUS ───             │
│  ● Production               │
│  ○ Staging                  │
│  ○ Draft                    │
│  ○ Archived                 │
│                             │
│  ─── COMPLEXITY ───         │
│  ☑ Beginner level           │
│  ☑ Intermediate             │
│  ☑ Advanced                 │
│                             │
│  ─── BUNDLE SIZE ───        │
│  Slider: [50KB ────●─────]  │
│  Max: 100KB                 │
│                             │
│  ─── PERFORMANCE ───        │
│  ☑ < 100ms render           │
│  ☑ < 200ms render           │
│  ☐ > 200ms render           │
│                             │
│  [Reset filters]            │
│                             │
└─────────────────────────────┘
```

### Widget Card (in grid)

```
┌─────────────────────────────────┐
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │     [Preview thumbnail]   │  │
│  │                           │  │
│  │     CodeSpace             │  │
│  │     ━━━━━━━━━━━           │  │
│  │     {code editor visual}  │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  CodeSpace                      │
│  Inspired by VS Code            │
│                                 │
│  📊 SE • Code editor            │
│  ★ 4.7 (47 reviews)             │
│  📦 v2.1.3 • 47KB                │
│                                 │
│  Used in 12 scenarios           │
│  78% of SE Day 1+ scenarios     │
│                                 │
│  [👁 Preview]  [➕ Add to scenario]│
│                                 │
└─────────────────────────────────┘
```

**Card states:**

- **Default**: Clean, info-rich
- **Hover**: Lift + shadow
- **Selected**: `--lumina-300` border + slight scale
- **In current scenario**: ✓ checkmark badge + green tint
- **Coming soon**: dimmed + "Beta" badge
- **Deprecated**: warning badge + "End of life: Date"

### Detail Panel (Right, 320px) — Slides in when widget selected

```
┌─────────────────────────────┐
│  CodeSpace                  │
│  v2.1.3 • Production        │
│                             │
│  ┌─────────────────────────┐│
│  │                         ││
│  │  [Live preview iframe]  ││
│  │                         ││
│  │  Try the widget here    ││
│  │                         ││
│  └─────────────────────────┘│
│                             │
│  [Try with mock data]       │
│  [▶ Open in Studio]         │
│                             │
│  ─── DESCRIPTION ───        │
│                             │
│  Code editor inspired by    │
│  VS Code, focused on live  │
│  feedback. Supports JS,     │
│  Python, TypeScript.        │
│                             │
│  Best for:                  │
│  • Day 1-3 scenarios        │
│  • Programming education    │
│  • Live debugging           │
│                             │
│  ─── METADATA ───           │
│                             │
│  Domain: Software Eng       │
│  Category: Code Editor      │
│  Owner: Alex Tran           │
│  Created: 2026-02-15        │
│  Updated: 3 days ago        │
│                             │
│  Bundle size: 47KB          │
│  Render time: 95ms          │
│  Cost/session: $0.12        │
│                             │
│  ─── DEPENDENCIES ───       │
│                             │
│  Used in 12 scenarios:      │
│  • SE Junior-to-Senior      │
│  • SE Day 1 Onboard         │
│  • SE Day 7 Defense         │
│  • Data Science Day 1       │
│  • [9 more...]              │
│                             │
│  Required by:               │
│  None (standalone)          │
│                             │
│  ─── COMPATIBILITY ───      │
│                             │
│  • Chrome 90+ ✓             │
│  • Firefox 85+ ✓            │
│  • Safari 14+ ✓             │
│                             │
│  Inputs: 6 fields           │
│  Events: 4                  │
│  Actions: 5                 │
│                             │
│  [View full Manifest]       │
│                             │
│  ─── REVIEWS (47) ───       │
│                             │
│  ⭐ 4.7 average             │
│                             │
│  "Best widget cho code      │
│   simulation. Easy to       │
│   integrate."               │
│   — Designer Carol          │
│                             │
│  [Read all reviews]         │
│                             │
│  ─── ACTIONS ───            │
│                             │
│  [➕ Add to current scenario]│
│  [🔀 Fork variant]           │
│  [📝 Request feature]        │
│                             │
└─────────────────────────────┘
```

### Statistics View (Engineer focus)

Toggle from "Catalog" to "Statistics" view:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  WIDGET STATISTICS                              View: [Statistics ▼]    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Most Used Widgets (last 30 days)                                       │
│                                                                         │
│  ┌────────────────────────────────────────────────┐                    │
│  │ Widget               │ Usage │ Trend          │                    │
│  ├────────────────────────────────────────────────┤                    │
│  │ CodeSpace            │ 524   │ ▲ +15%         │                    │
│  │ TeamChat (Generic)   │ 423   │ ▲ +8%          │                    │
│  │ TaskBoard            │ 312   │ → Stable       │                    │
│  │ LogHunter            │ 183   │ ▼ -5%          │                    │
│  │ CampaignDashboard    │ 156   │ ▲ +22%         │                    │
│  │ ... (15 more)                                  │                    │
│  └────────────────────────────────────────────────┘                    │
│                                                                         │
│  Underutilized Widgets (< 10 uses/month)                                │
│                                                                         │
│  ┌────────────────────────────────────────────────┐                    │
│  │ Widget               │ Last used               │                    │
│  ├────────────────────────────────────────────────┤                    │
│  │ DragAndDropDiagnosis │ 2 weeks ago             │                    │
│  │ ABTestSimulator      │ 1 month ago             │                    │
│  │ AnatomyExplorer      │ Never (just released)   │                    │
│  └────────────────────────────────────────────────┘                    │
│                                                                         │
│  Coverage Gaps (domains needing more widgets)                           │
│                                                                         │
│  ┌────────────────────────────────────────────────┐                    │
│  │ Domain    │ Widget count │ Designer requests   │                    │
│  ├────────────────────────────────────────────────┤                    │
│  │ Legal     │ 0            │ 5 requests pending  │                    │
│  │ Finance   │ 0            │ 3 requests pending  │                    │
│  │ Medical   │ 3            │ 8 requests pending  │                    │
│  │ Marketing │ 4            │ 4 requests pending  │                    │
│  └────────────────────────────────────────────────┘                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Search

- Real-time search (no submit button)
- Search across: name, description, tags
- Highlight matching terms in results
- Recent searches saved

### Card hover

- Lift effect (translateY(-2px))
- Shadow deepens
- Quick action buttons appear

### Card click

- Detail panel slides in from right
- Card visually selected
- Other cards dim slightly

### Add to scenario flow

**Click "Add to scenario":**
1. Modal: "Which scenario?"
2. List of designer's active scenarios
3. Select scenario + day
4. Configure widget inputs
5. Confirm → widget added

### Fork variant

**Click "Fork variant":**
1. Modal: "Create variant for which domain?"
2. Select domain (e.g., Marketing)
3. Pre-fill manifest copying base
4. Open in Widget Studio for customization

---

## 5. States

### State 1: Default browse

3-column grid, popular widgets first.

### State 2: Filtered

Active filters shown as chips, count updated.

### State 3: Empty results

```
🔍 No widgets match your filters

Try:
• Removing some filters
• Searching with different keywords
• Browsing all 24 widgets

[Clear filters]  [Browse all]

Don't see what you need?
[Request new widget]
```

### State 4: Detail panel open

Sidebar collapses, detail panel takes its space.

### State 5: Loading

Skeleton cards với shimmer.

### State 6: Statistics view

Different layout (tables instead of cards).

---

## 6. Data Flow

### Inputs

```yaml
from_widget_registry:
  - all_widgets
  - widget_metadata
  - usage_statistics
  - dependencies
  - reviews

from_scenarios:
  - widget_usage_per_scenario
  - widget_compatibility
```

### Outputs

```yaml
analytics_events:
  - catalog.viewed
  - widget.previewed
  - widget.added_to_scenario
  - widget.forked
  - widget.requested
  - filter.applied
```

### API Endpoints

```yaml
GET    /api/catalog/widgets             # List with filters
GET    /api/catalog/widget/:id          # Detail
GET    /api/catalog/widget/:id/preview  # Live preview iframe URL
GET    /api/catalog/widget/:id/dependencies  # Used by scenarios
POST   /api/catalog/widget/:id/add-to-scenario  # Add to scenario
POST   /api/catalog/widget/:id/fork     # Create variant
POST   /api/catalog/widget/:id/review   # Submit review
GET    /api/catalog/statistics          # Usage stats
GET    /api/catalog/gaps                # Coverage gaps
POST   /api/catalog/request-widget      # Request new widget
```

---

## 7. Permission Checks

| Action | Designer | Engineer | Persona Writer | Curator | Operator |
|:--|:-:|:-:|:-:|:-:|:-:|
| Browse catalog | ✅ | ✅ | ✅ | ✅ | ✅ |
| View detail | ✅ | ✅ | ✅ | ✅ | ✅ |
| View statistics | 🔐 (own scenarios) | ✅ | ❌ | ❌ | ✅ |
| Add to scenario | ✅ | ❌ | ❌ | ❌ | ❌ |
| Fork variant | ❌ | ✅ | ❌ | ❌ | ❌ |
| Submit review | ✅ | ✅ | ✅ | ✅ | ✅ |
| Request widget | ✅ | ❌ | ✅ | ❌ | ❌ |

---

## 8. Edge Cases

### Case 1: Widget deprecated mid-search

- Show with "Deprecated" badge
- Suggest alternative
- Block "Add to scenario" with explanation

### Case 2: Browser doesn't support widget preview

- Fallback to static screenshot
- Note: "Preview requires modern browser"

### Case 3: Search query has typo

- Fuzzy matching
- Suggestion: "Did you mean..."

### Case 4: User without permission tries action

- Clear messaging
- Suggest alternative ("Request via Designer")

---

## 9-12. Standard sections

(Responsive: Desktop primary, mobile read-only)
(Performance: < 1s load, instant search)
(Accessibility: Keyboard nav, screen readers, alt text)
(Visual: Cards với `--paper-100`, hover lift, status badges with semantic colors)

---

## 13. Multi-domain Application Examples

### Catalog content by domain

**Software Engineering (5 widgets):**
- CodeSpace, LogHunter, TaskBoard, DeployFlow, TeamChat

**Medical (3 widgets):**
- PatientMonitor, AnatomyExplorer, PrescriptionForm

**Marketing (4 widgets):**
- CampaignDashboard, AudienceSegmentor, ABTestSimulator, FunnelAnalyzer

**Generic/Cross-domain (6 widgets):**
- TeamChat, MarkdownViewer, Timer, KanbanBoard, FileExplorer, CalendarView

**Total V1 + early V2: 18 widgets**

### Filter intelligence

- Designer searching for "Medical Day 3 emergency widget" → narrow to Medical + Simulations + Crisis-tagged
- Engineer reviewing coverage → easily see gaps (Legal: 0 widgets)
- Cross-domain search: "Generic widgets that work for all" → 6 results

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Designer (browse), Engineer (manage) |
| **Complexity** | ⭐⭐⭐ |
| **Estimated build time** | 4-5 weeks |
| **Key technologies** | React, search engine, iframe preview |
| **Dependencies** | Widget Studio, Scenario Architect |
| **Performance** | < 1s load |
| **Multi-domain** | Yes - showcases all domains |
| **Biggest value** | Discoverability of platform widgets |
