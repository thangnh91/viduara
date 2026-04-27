# Screen 16 — Analytics Dashboard

**Màn hình số:** 16  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐⭐⭐ (Cao)  
**Primary users:** Operator, Super Admin (full); Designer, Persona Writer, Engineer (filtered)  
**Related flow:** Flow 07 — System Management (entry point cho debug)  
**Dependencies:** All screens (data sources), Screen 17 (drill-down to Session Replay)

---

## 0. Multi-domain Context

Analytics Dashboard là container đa ngành. Hiển thị data từ tất cả scenarios across all domains, với filters để focus vào domain cụ thể.

**Examples used in this spec:**
- **Software Engineering**: SE Hero Major V1 metrics
- **Medical** (V2): ER scenarios performance
- **Marketing** (V2): Campaign scenarios engagement
- **Cross-domain comparisons**: Compare scenarios across domains

---

## 1. Mục đích màn hình

Analytics Dashboard là **command center** của LUMINA — nơi admin monitoring everything: AI cost, hallucination rates, user behavior, scenario performance, system health.

**5 chức năng cốt lõi:**

1. **Overview health monitoring** — KPIs at a glance
2. **Drill-down investigation** — từ alert → detailed view → root cause
3. **Trend analysis** — patterns over time
4. **Comparative analytics** — scenarios, personas, widgets vs each other
5. **Alert management** — priority issues cần attention

### Metaphor thiết kế

Analytics Dashboard giống như **mission control** của NASA:
- Big screens với critical metrics
- Color-coded status (green/yellow/red)
- Specialists watching different aspects
- Quick drill-down khi anomaly detected

Hoặc gần với **Datadog/Grafana** + **Mixpanel** + **Stripe Dashboard** combined.

### Triết lý: Actionable insights, not vanity metrics

Dashboard không show numbers vô nghĩa. Mọi metric phải trả lời câu hỏi: **"Tôi cần làm gì với thông tin này?"**

Ví dụ:
- ❌ "Total users: 1,234" (vô nghĩa)
- ✅ "Users at risk of churn: 23 (action needed)"
- ❌ "AI calls: 5,678,901"
- ✅ "AI cost up 30% this week — investigate top 3 spending scenarios"

---

## 2. Users & Use Cases

### Primary user: Operator (role: `operator`)

**Daily workflow:**
- Morning standup: Check overnight alerts
- Throughout day: Monitor live metrics
- Investigate spikes/anomalies
- Coordinate fixes với other roles

**Mental model:** Dashboard is "always on" — checked frequently throughout day.

### Secondary user: Super Admin

- Strategic view (revenue, growth, retention)
- Approve major decisions
- Crisis response

### Tertiary users (filtered views)

- **Designer**: Analytics cho scenarios mình design
- **Persona Writer**: Analytics cho personas mình tạo
- **Engineer**: Analytics cho widgets mình build
- **Curator**: Knowledge usage stats

### Use cases chi tiết

#### UC1: Morning health check

**Flow:**
1. Operator login → Dashboard default view
2. Scan top-line metrics (5 seconds)
3. Check alerts panel (any red?)
4. Review overnight session count
5. Check AI cost trend
6. If all green → continue with planned work
7. If alerts → drill down to investigate

#### UC2: Investigate cost spike

**Scenario:** AI cost up 40% this week

**Flow:**
1. Open Analytics Dashboard
2. Cost section shows red trend
3. Click → drill into cost breakdown
4. Identify culprit: "Mr. Alpha cost doubled in SE Day 3"
5. Click "Investigate persona" → opens Persona Studio
6. Or click "View affected sessions" → Session Replay

#### UC3: Designer reviews scenario performance

**Flow:**
1. Designer opens Dashboard
2. Default view: scenarios mình design
3. See performance: completion rate, NPS, dropout points
4. Drill into Day 3 (highest dropout)
5. View aggregated student feedback
6. Take notes for next iteration

#### UC4: Hallucination investigation

**Scenario:** Alert "Hallucination rate up 15%"

**Flow:**
1. Click alert → goes to Hallucination section
2. See list of recent flagged responses
3. Filter by persona, scenario
4. Click incident → Session Replay (Screen 17)
5. Identify root cause
6. Coordinate fix với Persona Writer

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

Dashboard sử dụng **flexible grid layout** với widgets. User có thể customize.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Operations  >  Analytics Dashboard       [⚙ Customize]   │
├──────────────────────────────────┬──────────────────────────────────────┤
│  Filters & Time Range            │   Alerts (Sticky right)              │
│                                  │                                      │
├──────────────────────────────────┴──────────────────────────────────────┤
│                                                                         │
│  ROW 1: Top-line KPIs (4 cards)                                         │
│  [Active sessions] [Today revenue] [AI cost] [System health]            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ROW 2: Trend charts (2 wide cards)                                     │
│  [Sessions over time]              [Cost over time]                     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ROW 3: Performance breakdown (3 cards)                                 │
│  [Top scenarios]  [Persona ratings]  [Widget performance]               │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ROW 4: Issues & Quality (2 wide cards)                                 │
│  [Hallucination log]               [Orchestration issues]               │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ROW 5: User insights (3 cards)                                         │
│  [User funnel]  [Retention cohort]  [NPS distribution]                  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ROW 6: Comparative analytics (2 wide cards)                            │
│  [Scenario comparison]             [Cross-domain comparison]            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Filter Bar (Top, persistent)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Time range: [Last 7 days ▼]  Domain: [All ▼]  Scenario: [All ▼]        │
│  Compare to: [Previous period ▼]  Refresh: [Auto 30s ▼]   [⤓ Export]   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Filter options:**
- Time range: Today / Yesterday / Last 7d / Last 30d / Last 90d / Custom
- Domain: All / SE / Medical / Marketing / Generic
- Scenario: Specific scenario to filter
- Compare: Previous period / Same period last week / Same period last month / None

### Alerts Panel (Right, persistent sticky)

```
┌──────────────────────────┐
│  ALERTS (3)              │
│                          │
│  🚨 CRITICAL (1)         │
│  ┌────────────────────┐  │
│  │ AI Cost spike      │  │
│  │ +40% this week     │  │
│  │ Mr. Alpha 2x usage │  │
│  │ 10 min ago         │  │
│  │ [Investigate]      │  │
│  └────────────────────┘  │
│                          │
│  ⚠ HIGH (1)              │
│  ┌────────────────────┐  │
│  │ Hallucination rate │  │
│  │ Dr. Linh: 6%      │  │
│  │ Threshold: 5%     │  │
│  │ 2 hours ago        │  │
│  │ [Investigate]      │  │
│  └────────────────────┘  │
│                          │
│  ⚠ MEDIUM (1)            │
│  ┌────────────────────┐  │
│  │ Drop-off Day 3 SE  │  │
│  │ 35% (target: 25%)  │  │
│  │ 5 hours ago        │  │
│  │ [View details]     │  │
│  └────────────────────┘  │
│                          │
│  ✅ Resolved today: 5    │
│  [View resolved]         │
│                          │
└──────────────────────────┘
```

**Severity levels:**
- 🚨 Critical: Immediate action (revenue, security, data loss)
- ⚠ High: Action within 24h (quality, costs)
- ⚠ Medium: Review this week
- ℹ Low: FYI, no action needed

### Row 1: Top-line KPIs

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│  ACTIVE SESSIONS │  TODAY REVENUE   │  AI COST (24h)   │  SYSTEM HEALTH   │
│                  │                  │                  │                  │
│       127        │   $1,245.67      │     $89.23       │      ✅ OK        │
│   ▲ 12 (10%)     │   ▼ $67 (-5%)    │   ▲ $12 (+15%)   │  All systems go  │
│                  │                  │                  │                  │
│  Right now       │  vs yesterday    │  vs avg          │  4/4 services    │
│                  │                  │                  │                  │
│  [View live]     │  [Revenue >]     │  [Cost details]  │  [Status page]   │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

**KPI card features:**
- Big number prominent
- Trend arrow + percentage change
- Comparison context
- Color-coded (green/yellow/red based on direction + threshold)
- Click to drill down

### Row 2: Trend Charts

#### Chart A: Sessions Over Time

```
┌─────────────────────────────────────────────────────────┐
│  SESSIONS OVER TIME                          [⤴ Open]   │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 200│                                ●             │  │
│  │ 175│                              ╱   ╲           │  │
│  │ 150│                            ╱       ╲         │  │
│  │ 125│                          ╱           ●       │  │
│  │ 100│              ●─────●  ╱                ╲     │  │
│  │  75│            ╱       ●╱                   ●    │  │
│  │  50│        ●─●                                   │  │
│  │  25│                                              │  │
│  │   0└──────────────────────────────────────────    │  │
│  │     Mon Tue Wed Thu Fri Sat Sun                   │  │
│  │                                                   │  │
│  │  ── New sessions    ── Completed sessions         │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Total this week: 1,234 sessions                        │
│  Completion rate: 67% (target: 60%)                     │
└─────────────────────────────────────────────────────────┘
```

#### Chart B: Cost Over Time

```
┌─────────────────────────────────────────────────────────┐
│  AI COST OVER TIME                           [⤴ Open]   │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ $200│                              ╱─●            │  │
│  │ $150│                            ╱                │  │
│  │ $100│         ●●●●●●●●●●●●●●●●●●               │  │
│  │  $50│  ●●●●●                                      │  │
│  │   $0└─────────────────────────────────            │  │
│  │      Apr 1            Apr 15        Apr 24        │  │
│  │                                                   │  │
│  │  ── Daily cost    --- Budget ($150)              │  │
│  │  ⚠ Spike detected: Apr 22                         │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  Monthly burn: $4,234 (target: $3,500)                  │
│  Cost per session avg: $0.87 (target: <$1.20)           │
└─────────────────────────────────────────────────────────┘
```

### Row 3: Performance Breakdown

#### Card A: Top Scenarios

```
┌─────────────────────────────────────────────────────────┐
│  SCENARIOS PERFORMANCE                                  │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Scenario                  │ Sessions │ Comp%   │   │
│  ├────────────────────────────────────────────────┤    │
│  │ SE Junior-to-Senior      │   524    │  72%    │   │
│  │ Medical ER Day 3         │   183    │  68%    │   │
│  │ Marketing Crisis         │   156    │  61%    │   │
│  │ SE Day 1 Onboard          │   234    │  89%    │   │
│  │ Medical Surgery Prep     │    98    │  74%    │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  [View all scenarios]                                   │
└─────────────────────────────────────────────────────────┘
```

#### Card B: Persona Ratings

```
┌─────────────────────────────────────────────────────────┐
│  PERSONA RATINGS                                        │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Persona              │ Rating │ Hallucination  │   │
│  ├────────────────────────────────────────────────┤    │
│  │ Mr. Alpha (SE)       │ ★4.6   │ 1.2%           │   │
│  │ Chip (Buddy)         │ ★4.8   │ 0.3%           │   │
│  │ Boss Nam             │ ★3.9   │ 0.8%           │   │
│  │ Dr. Linh (Medical)   │ ★4.5   │ 6.0% ⚠         │   │
│  │ Anh Tùng (Marketing) │ ★4.2   │ 1.5%           │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  [View persona analytics]                               │
└─────────────────────────────────────────────────────────┘
```

#### Card C: Widget Performance

```
┌─────────────────────────────────────────────────────────┐
│  WIDGET PERFORMANCE                                     │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Widget               │ Usage  │ Errors │ Perf  │   │
│  ├────────────────────────────────────────────────┤    │
│  │ CodeSpace            │ 524    │ 0.2%   │ 95ms  │   │
│  │ LogHunter            │ 183    │ 1.1%   │ 145ms │   │
│  │ TaskBoard            │ 312    │ 0.4%   │ 67ms  │   │
│  │ PatientMonitor       │ 156    │ 2.3% ⚠ │ 234ms │   │
│  │ CampaignDashboard    │ 98     │ 0.6%   │ 156ms │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  [View widget analytics]                                │
└─────────────────────────────────────────────────────────┘
```

### Row 4: Issues & Quality

#### Card A: Hallucination Log

```
┌─────────────────────────────────────────────────────────┐
│  HALLUCINATION LOG                          ⚠ 6 today   │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Time      │ Persona      │ Severity│ Status   │   │
│  ├────────────────────────────────────────────────┤    │
│  │ 14:23     │ Dr. Linh     │ HIGH ⚠  │ NEW      │   │
│  │ 12:45     │ Mr. Alpha    │ MEDIUM  │ INVESTIGATING│   │
│  │ 11:30     │ Anh Tùng     │ LOW     │ NEW      │   │
│  │ 09:15     │ Dr. Linh     │ HIGH ⚠  │ ASSIGNED │   │
│  │ 08:42     │ Boss Nam     │ LOW     │ NEW      │   │
│  │ 07:20     │ Chip         │ LOW     │ DISMISSED│   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Pattern: Dr. Linh có 2 incidents — trend ⚠            │
│                                                         │
│  [View all] [Hallucination dashboard]                   │
└─────────────────────────────────────────────────────────┘
```

#### Card B: Orchestration Issues

```
┌─────────────────────────────────────────────────────────┐
│  ORCHESTRATION ISSUES                       ⚠ 3 today   │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Time   │ Scenario      │ Issue type           │   │
│  ├────────────────────────────────────────────────┤    │
│  │ 13:45  │ SE Day 3      │ Pile-on (4 AIs in 3s)│   │
│  │ 11:20  │ Medical ER    │ AI contradiction     │   │
│  │ 09:30  │ Marketing D5  │ Chip never speaks    │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  [View all] [Orchestrator Console]                      │
└─────────────────────────────────────────────────────────┘
```

### Row 5: User Insights

#### Card A: User Funnel

```
┌─────────────────────────────────────────────────────────┐
│  USER FUNNEL (Last 7 days)                              │
│                                                         │
│  Landing page         ████████████████ 5,234 (100%)     │
│  Signup              ████████ 1,847 (35%)               │
│  Onboarding done     ███████ 1,623 (31%)                │
│  Started Day 1       █████ 1,234 (24%)                  │
│  Completed Day 1     ████ 987 (19%)                     │
│  Paid                ██ 456 (9%)                        │
│  Completed scenario  ██ 312 (6%)                        │
│                                                         │
│  Critical drop: Signup → Day 1 (-13%)                   │
│  Recommendation: Investigate onboarding friction        │
│                                                         │
│  [Funnel details] [A/B test ideas]                      │
└─────────────────────────────────────────────────────────┘
```

#### Card B: Retention Cohort

```
┌─────────────────────────────────────────────────────────┐
│  RETENTION COHORT                                       │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Cohort      │ Day 1 │ Day 3 │ Day 7 │ Day 30  │   │
│  ├────────────────────────────────────────────────┤    │
│  │ Apr 1 (123) │ 100%  │  78%  │  62%  │  45%    │   │
│  │ Apr 8 (156) │ 100%  │  82%  │  67%  │  -      │   │
│  │ Apr 15 (189)│ 100%  │  85%  │  70%  │  -      │   │
│  │ Apr 22 (212)│ 100%  │  -    │  -    │  -      │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Trend: Retention improving over time                   │
│                                                         │
│  [Cohort details]                                       │
└─────────────────────────────────────────────────────────┘
```

#### Card C: NPS Distribution

```
┌─────────────────────────────────────────────────────────┐
│  NPS DISTRIBUTION (Final Reports)                       │
│                                                         │
│  Detractors (0-6)  ██ 12%                               │
│  Passives (7-8)    █████ 23%                            │
│  Promoters (9-10)  ███████████████ 65%                  │
│                                                         │
│  NPS Score: 53 (target: >50) ✅                         │
│                                                         │
│  By ending type:                                        │
│  • The Natural:    NPS 78                               │
│  • The Fighter:    NPS 62                               │
│  • The Wrong Fit:  NPS 41                               │
│  • The Reluctant:  NPS 28 ⚠                             │
│  • The Burnout:    NPS 35                               │
│                                                         │
│  Issue: Reluctant ending có NPS thấp                    │
│                                                         │
│  [NPS details]                                          │
└─────────────────────────────────────────────────────────┘
```

### Row 6: Comparative Analytics

#### Card A: Scenario Comparison

```
┌─────────────────────────────────────────────────────────┐
│  SCENARIO COMPARISON                                    │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │           │ Sessions │ Comp% │ NPS │ Cost/sess│   │
│  ├────────────────────────────────────────────────┤    │
│  │ SE Junior │   524    │ 72%   │ 58  │ $0.92    │   │
│  │ Med ER    │   183    │ 68%   │ 71  │ $1.14    │   │
│  │ Marketing │   156    │ 61%   │ 49  │ $0.78    │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Best performer: Medical ER (NPS 71)                    │
│  Worst: Marketing (NPS 49 - investigate)                │
│                                                         │
│  [Compare details]                                      │
└─────────────────────────────────────────────────────────┘
```

#### Card B: Cross-Domain Comparison

```
┌─────────────────────────────────────────────────────────┐
│  CROSS-DOMAIN COMPARISON                                │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ Domain    │ Sessions │ Comp% │ NPS │ Revenue  │   │
│  ├────────────────────────────────────────────────┤    │
│  │ SE        │  1,234   │ 72%   │ 58  │ $4,567   │   │
│  │ Medical   │    389   │ 71%   │ 68  │ $2,134   │   │
│  │ Marketing │    234   │ 64%   │ 51  │ $1,023   │   │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│  Insight: Medical highest NPS, SE highest volume        │
│  Action: Increase Medical capacity (high satisfaction)  │
│                                                         │
│  [Domain details]                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Auto-refresh

- Default: Auto-refresh every 30 seconds
- Configurable: 10s / 30s / 1min / 5min / Manual only
- Spinner indicator subtle when refreshing
- New alerts pulse briefly

### Drill-down navigation

**Universal pattern:**
- Click any chart → opens detailed view
- Click any KPI → breakdown by dimension
- Click any alert → opens relevant screen (Persona Studio, Session Replay, etc.)

### Time range comparison

**When "Compare to" set:**
- Charts show 2 lines (current vs comparison period)
- KPIs show change percentage
- Color-coded improvement/regression

### Customization

**Click "⚙ Customize" in header:**
- Drag widgets to rearrange
- Resize widgets (small/medium/large)
- Hide/show widgets
- Add new widgets from library
- Save layout per user

### Export

**Export options:**
- PDF report (formatted)
- CSV data (raw)
- API access (for further analysis)
- Scheduled email reports (V2)

### Keyboard shortcuts

| Shortcut | Action |
|:--|:--|
| `R` | Refresh now |
| `T` | Change time range |
| `D` | Change domain filter |
| `?` | Show shortcuts |
| `1-9` | Jump to widget N |

---

## 5. States

### State 1: Loading (initial)

Skeleton placeholders for all widgets.

### State 2: Default view

All widgets populated với data.

### State 3: Error loading specific widget

```
┌─────────────────────────────────────┐
│  ⚠ Failed to load                    │
│                                     │
│  This widget couldn't fetch data.   │
│  Other widgets are working.         │
│                                     │
│  [Retry]                            │
│                                     │
└─────────────────────────────────────┘
```

### State 4: No data (filtered too narrow)

```
┌─────────────────────────────────────┐
│  📊                                  │
│                                     │
│  No data for this filter            │
│                                     │
│  Try widening time range or         │
│  removing scenario filter.          │
│                                     │
│  [Reset filters]                    │
│                                     │
└─────────────────────────────────────┘
```

### State 5: Customizing layout

- Widgets show drag handles
- Resize handles visible
- Add widget panel slides in
- Save/Cancel buttons prominent

### State 6: Critical alert (full takeover)

For very serious issues:

```
┌─────────────────────────────────────┐
│  🚨 CRITICAL SYSTEM ALERT            │
│                                     │
│  AI service degraded                │
│  - 50% of sessions affected         │
│  - Average latency: 12s              │
│  - Started: 5 min ago                │
│                                     │
│  Actions:                           │
│  • Switch to fallback model         │
│  • Notify users                     │
│  • Page on-call engineer            │
│                                     │
│  [Acknowledge] [Open incident]      │
│                                     │
└─────────────────────────────────────┘
```

### State 7: Maintenance mode

Banner: "System in maintenance mode. Some metrics may be incomplete."

---

## 6. Data Flow

### Inputs

```yaml
real_time_streams:
  - active_sessions (WebSocket)
  - new_alerts (WebSocket)
  - system_health (WebSocket)

aggregated_data:
  - sessions_completed (5-min batch)
  - cost_breakdown (1-min batch)
  - hallucination_reports (real-time)
  - persona_ratings (after each session)
  - user_funnel (hourly batch)
  - retention_cohorts (daily batch)
  
historical_data:
  - long_term_trends (daily)
  - comparison_periods (calculated)
```

### Outputs

```yaml
analytics_events:
  - dashboard.viewed
  - dashboard.alert_acknowledged
  - dashboard.drill_down
  - dashboard.exported
  - dashboard.layout_customized
  
notifications:
  - critical_alerts → email + Slack + push
  - high_alerts → in-app + email
  - medium_alerts → in-app
```

### API Endpoints

```yaml
GET    /api/analytics/overview          # Top-line KPIs
GET    /api/analytics/sessions          # Session metrics
GET    /api/analytics/cost              # AI cost breakdown
GET    /api/analytics/scenarios         # Scenario performance
GET    /api/analytics/personas          # Persona ratings
GET    /api/analytics/widgets           # Widget metrics
GET    /api/analytics/hallucinations    # Hallucination log
GET    /api/analytics/orchestration     # Orchestration issues
GET    /api/analytics/funnel            # User funnel
GET    /api/analytics/retention         # Cohort data
GET    /api/analytics/nps               # NPS distribution
GET    /api/analytics/alerts            # Active alerts
PATCH  /api/analytics/alerts/:id        # Acknowledge/resolve

GET    /api/dashboard/layout            # User's saved layout
PATCH  /api/dashboard/layout            # Save layout
POST   /api/dashboard/export            # Generate export
```

### Caching strategy

- Real-time KPIs: No cache, WebSocket
- 5-min metrics: Redis cache
- Historical trends: Pre-computed, refreshed hourly
- Heavy aggregations: Pre-computed daily

---

## 7. Permission Checks

| Widget/Section | Operator | Super Admin | Designer | Persona Writer | Engineer |
|:--|:-:|:-:|:-:|:-:|:-:|
| Top-line KPIs | ✅ | ✅ | ✅ (filtered) | ✅ (filtered) | ✅ (filtered) |
| Sessions trends | ✅ | ✅ | 🔐 (own scenarios) | ❌ | ❌ |
| AI Cost | ✅ | ✅ | ❌ | 🔐 (own personas) | 🔐 (own widgets) |
| Scenario performance | ✅ | ✅ | 🔐 (own) | ❌ | ❌ |
| Persona ratings | ✅ | ✅ | ❌ | 🔐 (own) | ❌ |
| Widget performance | ✅ | ✅ | ❌ | ❌ | 🔐 (own) |
| Hallucination log | ✅ | ✅ | ❌ | 🔐 (own personas) | ❌ |
| Orchestration | ✅ | ✅ | ❌ | ✅ | ❌ |
| User funnel | ✅ | ✅ | ❌ | ❌ | ❌ |
| NPS | ✅ | ✅ | 🔐 (own scenarios) | ❌ | ❌ |
| Revenue | 🔐 (limited) | ✅ | ❌ | ❌ | ❌ |
| Customize layout | ✅ | ✅ | ✅ | ✅ | ✅ |
| Export data | ✅ | ✅ | 🔐 (own data) | 🔐 (own data) | 🔐 (own data) |

---

## 8. Edge Cases

### Case 1: Data lag (real-time streams delayed)

**Detection:** Real-time KPIs not updating

**Response:**
- Show "Last updated 5 min ago" indicator
- Try fallback to cached data
- Background retry
- Banner if persistent

### Case 2: Conflicting data sources

**Scenario:** Real-time count differs from aggregated count

**Response:**
- Show real-time number
- Tooltip: "Aggregated count may differ slightly"
- Reconcile in background

### Case 3: Massive alert spike

**Scenario:** 50+ alerts arrive in 1 minute (system issue)

**Response:**
- Group similar alerts
- Show count: "47 similar alerts (Mr. Alpha hallucination)"
- Single click to investigate batch

### Case 4: User has very limited permissions

**Scenario:** Designer with restricted scenario access

**Response:**
- Show message: "Filtered view based on your access"
- Hide widgets they can't access
- Suggest expanding access if needed

### Case 5: Time range with no data

**Scenario:** User selects future date range

**Response:**
- Empty state with explanation
- Suggest valid date range
- Auto-correct to nearest valid range

### Case 6: Export taking too long

**Scenario:** PDF export of 90-day data

**Response:**
- Show progress bar
- Allow background processing
- Email notification when ready
- Don't block dashboard

### Case 7: Mobile/small screen

**Scenario:** Operator checking dashboard on phone urgently

**Response:**
- Mobile-optimized layout (single column)
- Critical alerts prominent
- Full data access (no feature limits)
- Touch-optimized controls

---

## 9. Responsive Considerations

### Desktop (1440px+) — Primary

Full multi-column layout với all widgets.

### Laptop (1024-1440px)

- 2-column layout instead of multi-column
- Widgets resize accordingly
- All functionality preserved

### Tablet (768-1024px)

- Single column layout
- Widgets stack vertically
- Sticky alerts collapse to drawer
- Touch-optimized

### Mobile (< 768px)

**Supported with priority on critical info:**
- Top-line KPIs prominent
- Critical alerts always visible
- Full charts (not simplified)
- Swipe between widget categories

**Critical:** Mobile must work because operators may need to check during off-hours.

---

## 10. Performance Requirements

- **Initial load**: < 3s for default view
- **Widget refresh**: < 1s per widget
- **Chart rendering**: < 500ms
- **Drill-down navigation**: < 1s
- **Filter changes**: < 2s for all widgets to update
- **Real-time updates**: < 5s latency

### Optimization

- Lazy load below-fold widgets
- Cache aggregated metrics aggressively
- WebSocket for real-time data
- Pre-compute expensive aggregations
- Server-side rendering for initial load

---

## 11. Accessibility

**Critical for operations role:**

- Full keyboard navigation
- Screen reader support cho all charts (data tables alternative)
- High contrast mode for status colors
- Color không sole indicator (icons + text)
- Reduced motion option
- Configurable refresh rate (some users overwhelmed by frequent updates)
- Alert sounds toggleable

---

## 12. Visual Design Notes

### Color application

**Status colors:**
- Healthy/positive: `--signal-calm` (green)
- Warning: `--signal-alert` (amber)
- Critical: `--signal-stress` (red)
- Neutral info: `--signal-focus` (blue)

**Chart colors:**
- Primary metric: `--lumina-500`
- Comparison: `--ink-400` (muted)
- Trends up (good): `--signal-calm`
- Trends down (bad): `--signal-stress`

**Widgets:**
- Background: `--paper-100`
- Hover: `--paper-200`
- Selected/Active: `--lumina-300` border

**Alerts:**
- Critical background: `--signal-stress` (subtle)
- High background: `--signal-alert` (subtle)
- Pulsing animation cho new alerts

### Typography

- KPI numbers: Fraunces 36-48px (display)
- Trend indicators: Inter Tight 14px medium
- Widget titles: Inter Tight 14px semibold uppercase
- Chart labels: Inter Tight 11px
- Tables: Inter Tight 13px
- Code/IDs: JetBrains Mono 12px

### Iconography

- Status: ✅ ⚠ 🚨 ℹ
- Trends: ▲ ▼ →
- Actions: Lucide icons
- Domain: Custom domain icons (SE, Medical, Marketing)

### Motion

- Number transitions: smooth count up/down (500ms)
- Chart animations: 800ms ease-out
- Alert pulse: subtle 2s loop
- Page transitions: 200ms fade

---

## 13. Multi-domain Application Examples

### Example 1: Software Engineering Focus

**Filter applied:** Domain = SE

**KPIs change:**
- Active SE sessions: 78
- SE revenue today: $789
- SE-specific AI cost: $54
- SE scenario health: ✅

**Top scenarios shown:** Only SE scenarios
- SE Junior-to-Senior (524 sessions)
- SE Day 1 Onboard (234 sessions)
- SE Day 7 Defense (123 sessions)

**Persona ratings shown:** Only SE personas
- Mr. Alpha: 4.6
- Boss Nam: 3.9
- Chip (used in SE): 4.8

**Widget performance shown:** Only SE widgets
- CodeSpace: 524 usage
- LogHunter: 183 usage
- TaskBoard: 312 usage

**Alerts:** Only SE-related
- Cost spike: Mr. Alpha (SE)
- Drop-off: Day 3 SE

### Example 2: Medical Focus

**Filter applied:** Domain = Medical

**KPIs:**
- Active Medical sessions: 23
- Medical revenue today: $234
- Medical AI cost: $18
- Medical health: ⚠ (Dr. Linh hallucination)

**Top scenarios:**
- Medical ER Day 3 (183 sessions)
- Medical Surgery Prep (98 sessions)

**Persona ratings:**
- Dr. Linh: 4.5 (with 6% hallucination ⚠)
- Y tá Trang: 4.3
- Chip (used in Medical): 4.8

**Widget performance:**
- PatientMonitor: 156 usage (2.3% errors ⚠)
- AnatomyExplorer: 89 usage
- PrescriptionForm: 67 usage

**Alerts:**
- Hallucination spike: Dr. Linh
- Widget errors: PatientMonitor

### Example 3: Cross-Domain Strategic View

**Filter applied:** All domains, "Compare to" = Previous month

**Strategic insights:**
- Highest growth: Medical (+45% sessions)
- Highest NPS: Medical (68)
- Most efficient: Marketing ($0.78 cost/session)
- Highest volume: SE (1,234 sessions)

**Strategic recommendations:**
- Invest in Medical capacity (high satisfaction)
- Investigate Marketing NPS issues
- Maintain SE position (workhorse domain)
- Consider expanding Medical scenarios

### Differences in same Analytics Dashboard

| Aspect | SE Filter | Medical Filter | Cross-domain |
|:--|:--|:--|:--|
| **Data volume** | High | Medium | Highest (all data) |
| **Critical metrics** | Cost efficiency, completion | Quality (hallucination), safety | Strategic comparisons |
| **Alert focus** | Operations | Quality | All categories |
| **Scenarios shown** | SE only | Medical only | All ranked |
| **Action implications** | Optimize SE | Fix Medical quality | Strategic resource allocation |

**Same dashboard, different actionable insights based on filter focus.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Operator (daily monitoring) |
| **Complexity** | ⭐⭐⭐⭐ |
| **Estimated build time** | 8-10 weeks |
| **Frequency of use** | Daily/hourly |
| **Key technologies** | React, Recharts/D3, WebSocket, time-series DB |
| **Critical dependencies** | All data sources |
| **Performance targets** | < 3s initial load, real-time updates |
| **Device support** | Desktop primary, mobile critical |
| **Multi-domain** | Yes - filtering critical for focus |
| **Biggest challenge** | Showing actionable insights, not vanity metrics |
| **Biggest value** | Catches issues early, drives data-driven decisions |

### Design principles applied

1. ✅ **Actionable insights** — Every metric tied to action
2. ✅ **Drill-down everywhere** — Easy investigation path
3. ✅ **Mobile critical** — Operators may need urgent access
4. ✅ **Customizable** — Different roles need different views
5. ✅ **Real-time when needed** — WebSocket for critical KPIs
