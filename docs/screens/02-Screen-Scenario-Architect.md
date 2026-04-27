# Screen 02 — Scenario Architect

**Màn hình số:** 2  
**Phase:** A — Foundation & Studios  
**Complexity:** ⭐⭐⭐⭐⭐ (Rất cao)  
**Primary users:** Scenario Designer, Super Admin  
**Related flow:** Flow 04 — Tạo kịch bản mới  
**Dependencies:** Screen 1 (Design System), Screen 15 (Knowledge Vault), Screen 3 (Persona Studio - read), Screen 4/14 (Widget - read)

---

## 0. Multi-domain Context

Scenario Architect là container đa ngành. Wireframes trong spec này dùng **Software Engineering scenario** làm ví dụ minh họa (vì SE là Hero Major V1), nhưng cùng layout, tabs, và workflow áp dụng cho mọi scenarios từ mọi ngành.

**Examples used in this spec:**
- **Software Engineering** (Hero V1): SE Junior-to-Senior scenario
- **Medical** (V2 priority): Medical ER, Surgery scenarios
- **Marketing** (V2 priority): Campaign Crisis, Product Launch scenarios

Trong runtime, Designer chỉ làm việc với 1 scenario tại 1 thời điểm. Wireframe SE = 1 instance. Section 13 ở cuối spec sẽ show cách cùng Architect serve các domains khác.

⚠ **Note for readers:** Tất cả wireframes ASCII bên dưới dùng SE Day 3 ("Khủng hoảng hệ thống") làm sample data. Đây chỉ là 1 ví dụ — Architect support đầy đủ các ngành.

---

## 1. Mục đích màn hình

Scenario Architect là **studio chính** để tạo, chỉnh sửa, test và publish kịch bản 7 ngày. Đây là "bản vẽ kỹ thuật" của trải nghiệm học sinh — nơi designer:

- Vạch ra 7 ngày với theme, goal, context
- Thuê personas từ Persona Registry
- Assign widgets cho từng ngày
- Configure triggers (sự kiện tự động)
- Design 2 branch points + 5 endings
- Link knowledge cards
- Setup evaluation hooks
- Playtest trước khi publish

### Metaphor thiết kế

Scenario Architect giống như **AutoCAD cho giáo dục hướng nghiệp** — nơi người thiết kế "xây dựng" trải nghiệm trong môi trường visual, không cần viết code.

Hoặc so sánh gần hơn: **Figma cho scenarios** — canvas vô tận, kéo thả, collaborative editing (V2+).

---

## 2. Users & Use Cases

### Primary users

**Scenario Designer (role: `designer`)**
- Build scenarios cho ngành mới
- Edit scenarios có sẵn
- Fork templates để tạo variations
- Playtest để validate logic
- Submit for review

**Super Admin (role: `super_admin`)**
- Approve/reject submitted scenarios
- Publish to production
- Emergency rollback
- Access all scenarios

### Secondary users (read-only access)

**Persona Writer**
- View scenarios để hiểu cách personas được dùng
- Không edit được

**Widget Engineer**
- View scenarios để biết widget nào đang được request
- Không edit được

**Curator**
- View để đảm bảo knowledge cards được link đúng
- Không edit structure, chỉ flag issues

**Operator**
- View để troubleshoot issues
- Không edit

### Use cases chính

1. **Design new scenario** (complete from scratch)
2. **Edit existing scenario** (minor updates, content fixes)
3. **Fork template** (start from proven structure)
4. **Playtest scenario** (simulate learner)
5. **Submit for review** (workflow)
6. **Monitor published scenario** (analytics integration)
7. **Version control** (branch, rollback)

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🔥 LUMINA          Dashboard > Scenarios > SE-Junior-to-Senior  [Save] │
├────────┬────────────────────────────────────────────────┬───────────────┤
│        │                                                │               │
│  Left  │              Canvas (Main Area)                │  Properties   │
│  Side  │         Infinite Zoomable Workspace            │  Panel        │
│  bar   │                                                │  (Context-    │
│        │                                                │   sensitive)  │
│ 260px  │                                                │   320px       │
│        │                                                │               │
│        │                                                │               │
│        │                                                │               │
│        │                                                │               │
├────────┴────────────────────────────────────────────────┴───────────────┤
│  Bottom Toolbar: Zoom controls | Playtest | Validate | History | Share  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Left Sidebar (260px)

```
┌─────────────────────────────┐
│  SCENARIO                   │
│  ▼ SE Junior-to-Senior     │  ← Scenario switcher dropdown
│                             │
├─────────────────────────────┤
│  TABS                       │
│                             │
│  📋 Overview                │  ← Selected tab
│  📅 Timeline                │
│  🎭 Cast                    │
│  🧩 Widgets                 │
│  ⚡ Triggers                │
│  🔀 Branches                │
│  📚 Knowledge               │
│  🏁 Endings                 │
│  📊 Evaluation              │
│  ⚙️  Settings               │
│                             │
├─────────────────────────────┤
│  CANVAS NAVIGATION          │
│                             │
│  ◎ All                      │
│  ● Day 1 — Cơn say          │
│  ● Day 2 — Bức tường        │
│  ● Day 3 — Khủng hoảng      │  ← Highlighted in canvas
│  ● Day 4 — Bí mật            │
│  ● Day 5 — Con người        │
│  ● Day 6 — Đạo đức          │
│  ● Day 7 — Defense          │
│  ◇ Branch Point 1           │
│  ◇ Branch Point 2           │
│  🏁 5 Endings               │
│                             │
├─────────────────────────────┤
│  STATUS                     │
│  🟡 Draft v0.4              │
│  Last saved: 2 min ago      │
│  Auto-save: ON              │
└─────────────────────────────┘
```

### Canvas (Main Area) — Default view "Timeline Mode"

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    Day 1           Day 2           Day 3         ...   Day 7   │
│   ╭────╮          ╭────╮          ╭────╮              ╭────╮   │
│   │ 🔥 │          │ 📚 │          │ ⚠️  │              │ 🎯 │   │
│   │ 1  │─trigger→│ 2  │─trigger→│ 3  │─ ... ─trigger→│ 7  │   │
│   ╰────╯          ╰────╯          ╰────╯              ╰────╯   │
│   Cơn say         Bức tường       Khủng hoảng         Defense  │
│                                                                 │
│                              ⚠️                                 │
│                         BRANCH 1                                │
│                      ◇ Day 4 Choice                             │
│                         ╱  ╲                                    │
│                    Front  Backend                               │
│                      │      │                                   │
│                     Day4F Day4B                                 │
│                      │      │                                   │
│                     Day5F Day5B                                 │
│                       ╲    ╱                                    │
│                        Day6                                     │
│                      ◇ BRANCH 2                                 │
│                      Ethics vs Deadline                         │
│                       ╱        ╲                                │
│                   Day7-E      Day7-D                            │
│                     │           │                               │
│                     ▼           ▼                               │
│                   🏁 Natural   🏁 Fighter                       │
│                                                                 │
│                   🏁 Wrong Fit  🏁 Reluctant  🏁 Burnout        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Day Node Detail (khi click vào 1 day)

```
┌─────────────────────────────────┐
│  DAY 3 — Khủng hoảng hệ thống  │
│  Goal: Test stress response     │
├─────────────────────────────────┤
│                                 │
│  🎭 Cast                        │
│  • Mr. Alpha                    │
│  • Chip                         │
│  • Boss Nam (pressure)          │
│                                 │
│  🧩 Widgets                     │
│  • LogHunter (primary)          │
│  • TeamChat (support)           │
│  • CodeSpace (tertiary)         │
│                                 │
│  📚 Knowledge                   │
│  • big_o_notation (reinforce)   │
│                                 │
│  ⚡ Triggers (4)                │
│  • time_elapsed > 5m            │
│  • wrong_attempts >= 3          │
│  • stress_level > 85            │
│  • server_fixed                 │
│                                 │
│  Time estimate: 60-75 min       │
│                                 │
│  [Edit] [Playtest] [Duplicate]  │
└─────────────────────────────────┘
```

### Right Sidebar — Properties Panel (320px)

Nội dung thay đổi tùy theo **what's selected** trên canvas.

**Example: Khi select Day 3 node**

```
┌─────────────────────────────┐
│  DAY 3 PROPERTIES           │
├─────────────────────────────┤
│                             │
│  Theme                      │
│  ┌─────────────────────┐    │
│  │ Khủng hoảng hệ thống│    │
│  └─────────────────────┘    │
│                             │
│  Goal                       │
│  ┌─────────────────────┐    │
│  │ Test stress response │    │
│  │ under deadline       │    │
│  └─────────────────────┘    │
│                             │
│  Estimated time             │
│  ┌────┐ to ┌────┐           │
│  │ 60 │    │ 75 │ minutes   │
│  └────┘    └────┘           │
│                             │
│  Theme emoji: ⚠️            │
│  Theme color: [swatch] ▼    │
│                             │
│  ─── CONTEXT ───             │
│                             │
│  Simulation context         │
│  ┌─────────────────────┐    │
│  │ 2h sáng. App giao   │    │
│  │ hàng bị sập vì quá  │    │
│  │ nhiều đơn đặt cùng  │    │
│  │ lúc (Black Friday). │    │
│  │ Bạn nhận 15 tin     │    │
│  │ nhắn từ sếp...      │    │
│  └─────────────────────┘    │
│                             │
│  [Open Day Editor →]        │
│                             │
└─────────────────────────────┘
```

### Bottom Toolbar

```
┌─────────────────────────────────────────────────────────┐
│  🔍 [Zoom: 100%] [Fit] [Actual]  │  ▶ Playtest          │
│                                   │  ✓ Validate          │
│                                   │  📜 History          │
│                                   │  🔗 Share            │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Tab Views Detail

Left sidebar có 10 tabs. Mỗi tab thay đổi view của canvas và properties.

### Tab 1: Overview (default)

Hiển thị bird's-eye view của toàn scenario. Đây là view tôi đã vẽ ở trên.

### Tab 2: Timeline

Linear timeline view, detail hơn overview:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Day 1      Day 2      Day 3      Day 4     Day 5    Day 6 Day7│
│  ─────────────────────────────────────────────────────────────  │
│  🔥 Cơn say                                                     │
│  • Intro to SE        Context: Startup first day               │
│  • Widget: CodeSpace (beginner)                                 │
│  • 45 min                                                       │
│  ─────────────────────────────────────────────────────────────  │
│           📚 Bức tường                                          │
│           • Big O Notation                                      │
│           • Widget: AlgorithmAnalyzer                           │
│           • 60 min                                              │
│  ─────────────────────────────────────────────────────────────  │
│                    ⚠️ Khủng hoảng                               │
│                    • Server crash at 2am                        │
│                    • Widgets: LogHunter + TeamChat              │
│                    • 75 min HIGH STRESS                         │
│  ─────────────────────────────────────────────────────────────  │
│                             🔀 BRANCH POINT 1                   │
│                             Frontend vs Backend                 │
│  ─────────────────────────────────────────────────────────────  │
│                             [Frontend path]  [Backend path]    │
│  ...                                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 3: Cast

Browse và assign personas cho scenario:

```
┌─────────────────────────────────────────────────────────────────┐
│  CAST MANAGEMENT                                                │
│                                                                 │
│  Assigned to this scenario (4)                                  │
│  ┌─────────────────────────────────────────────────────┐        │
│  │ 👤 Mr. Alpha (teacher_alpha)          [Remove]      │        │
│  │    Role: Teacher • Active: Day 2, 4, 6              │        │
│  │    Variant: se_teacher                              │        │
│  ├─────────────────────────────────────────────────────┤        │
│  │ 🤖 Chip (buddy_chip)                  [Remove]      │        │
│  │    Role: Buddy • Active: All days                   │        │
│  ├─────────────────────────────────────────────────────┤        │
│  │ 💼 Boss Nam (boss_nam)                [Remove]      │        │
│  │    Role: Pressure • Active: Day 3, 5, 6             │        │
│  ├─────────────────────────────────────────────────────┤        │
│  │ 🎬 Story Director (story_director)    [Default]     │        │
│  │    Role: Orchestrator • Hidden from user            │        │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
│  [+ Add from Persona Registry]   [+ Request New Persona]        │
│                                                                 │
│  Registry Browse (filterable)                                   │
│  Filter: [Type ▼] [Specialization ▼] [Traits ▼]  🔍 Search     │
│                                                                 │
│  Available personas:                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ Mr. Beta │ │ Ms. Lynn │ │ Dr. Chen │ │ Linh     │           │
│  │ Teacher  │ │ Buddy    │ │ Mentor   │ │ Client   │           │
│  │ [Add]    │ │ [Add]    │ │ [Add]    │ │ [Add]    │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 4: Widgets

Similar layout to Cast, but for widgets:

- Assigned widgets per day
- Config options (inputs)
- Progressive fidelity settings
- Request new widget button
- Browse Widget Catalog

### Tab 5: Triggers

Visual trigger editor:

```
┌─────────────────────────────────────────────────────────────────┐
│  TRIGGERS FOR DAY 3                                             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────┐        │
│  │ TRIGGER: boss_pressure_escalation                   │        │
│  │                                                     │        │
│  │ WHEN                                                │        │
│  │   ┌──────────────────┐   ┌──────────────┐          │        │
│  │   │ time_elapsed     │ > │ 5 minutes    │          │        │
│  │   └──────────────────┘   └──────────────┘          │        │
│  │   AND                                               │        │
│  │   ┌──────────────────┐   ┌──────────────┐          │        │
│  │   │ student_progress │ < │ 20%          │          │        │
│  │   └──────────────────┘   └──────────────┘          │        │
│  │                                                     │        │
│  │ THEN                                                │        │
│  │   ┌──────────────────────────────────────┐          │        │
│  │   │ Persona: Boss Nam speaks             │          │        │
│  │   │ Tone: "pressuring"                   │          │        │
│  │   │ Message: "TÌM RA NGUYÊN NHÂN CHƯA?  │          │        │
│  │   │  Chúng ta đang mất $100k mỗi phút!" │          │        │
│  │   └──────────────────────────────────────┘          │        │
│  │                                                     │        │
│  │ [Edit] [Duplicate] [Delete] [Test]                  │        │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
│  + Add new trigger                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 6: Branches

Visual branch point editor:

```
┌─────────────────────────────────────────────────────────────────┐
│  BRANCH POINT 1 — Day 4 Technical Choice                        │
│                                                                 │
│  Prompt to student:                                             │
│  "Bạn muốn chuyên sâu về mảng nào?"                             │
│                                                                 │
│  Options:                                                       │
│  ┌──────────────────────────┐ ┌──────────────────────────┐     │
│  │ 🎨 Frontend/Mobile       │ │ 🔧 Backend/Data          │     │
│  │                          │ │                          │     │
│  │ Label: Frontend/Mobile   │ │ Label: Backend/Data      │     │
│  │ (Giao diện người dùng)   │ │ (Hệ thống & Dữ liệu)     │     │
│  │                          │ │                          │     │
│  │ Affects days: 4, 5, 6    │ │ Affects days: 4, 5, 6    │     │
│  │                          │ │                          │     │
│  │ Widget changes:          │ │ Widget changes:          │     │
│  │ Day 4: DesignForge       │ │ Day 4: DatabaseArchitect│     │
│  │ Day 5: UserFeedbackSim   │ │ Day 5: APILoadTester    │     │
│  │                          │ │                          │     │
│  │ [Edit path]              │ │ [Edit path]              │     │
│  └──────────────────────────┘ └──────────────────────────┘     │
│                                                                 │
│  Tracking metrics:                                              │
│  ☑ time_to_decide                                               │
│  ☑ hover_patterns                                               │
│  ☑ questions_asked                                              │
│                                                                 │
│  [Preview branching animation]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 7: Knowledge

Link knowledge cards:

```
┌─────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE CARDS                                                │
│                                                                 │
│  Cards unlocked in this scenario (5):                           │
│                                                                 │
│  Day 2: big_o_notation                                          │
│   ├─ Source: Knowledge Vault > SE > Algorithms                  │
│   ├─ Verified by: Dr. Nguyen (2026-03-15)                       │
│   └─ Reinforced in: Day 3 (optimization task)                   │
│                                                                 │
│  Day 3: debugging_fundamentals                                  │
│   ├─ Source: Knowledge Vault > SE > Debugging                   │
│   └─ Status: ⚠️ Needs curator review                            │
│                                                                 │
│  ...                                                            │
│                                                                 │
│  [+ Link card from Knowledge Vault]                             │
│  [+ Request curator to create new card]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 8: Endings

Configure 5 endings với conditions:

```
┌─────────────────────────────────────────────────────────────────┐
│  ENDINGS CONFIGURATION                                          │
│                                                                 │
│  🏆 The Natural                                                 │
│  Trigger conditions:                                            │
│    stress_avg < 40 AND                                          │
│    performance_score > 80 AND                                   │
│    knowledge_application_rate > 75                              │
│  Message: "Bạn sinh ra để làm ngành này..."                     │
│  [Preview] [Edit narrative] [Adjust conditions]                 │
│                                                                 │
│  ⚔️ The Fighter                                                 │
│  ...                                                            │
│                                                                 │
│  💔 The Wrong Fit                                               │
│  ...                                                            │
│                                                                 │
│  😐 The Reluctant                                               │
│  ...                                                            │
│                                                                 │
│  🕊️ The Early Exit                                              │
│  Trigger: early_exit_flag = true                                │
│  Special: Can activate mid-scenario                             │
│  ...                                                            │
│                                                                 │
│  [Test coverage: Simulate all 5 endings reachable]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 9: Evaluation

Setup metrics tracking:

```
┌─────────────────────────────────────────────────────────────────┐
│  EVALUATION HOOKS                                               │
│                                                                 │
│  Behavioral Metrics (5)                                         │
│  ┌─────────────────────────────────────────────────────┐        │
│  │ stress_tolerance (weight: 0.25)                     │        │
│  │ Measure: max_stress_sustained_minutes               │        │
│  │ Capture points: Day 3, 5, 6                         │        │
│  ├─────────────────────────────────────────────────────┤        │
│  │ problem_solving_persistence (weight: 0.20)          │        │
│  │ Measure: attempts_before_asking_help                │        │
│  │ Capture points: All days                            │        │
│  ├─────────────────────────────────────────────────────┤        │
│  │ collaboration_tendency (weight: 0.15)               │        │
│  ...                                                            │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
│  Decision Tracking                                              │
│  • day_4_technical_choice                                       │
│  • day_6_ethics_choice                                          │
│                                                                 │
│  Knowledge Application                                          │
│  • big_o_notation → test in Day 3                               │
│                                                                 │
│  [Preview how data feeds into Final Report]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tab 10: Settings

Scenario metadata + permissions:

```
┌─────────────────────────────────────────────────────────────────┐
│  SCENARIO SETTINGS                                              │
│                                                                 │
│  Metadata                                                       │
│  Name: [SE Junior to Senior Evolution              ]            │
│  Major: [Software Engineering ▼]                                │
│  Level: [Entry-to-Senior ▼]                                     │
│  Difficulty: ★★★★☆ (4/5)                                        │
│  Expected dropout rate: [35%]                                   │
│  Target audience: ☑ Grade 12  ☑ University Year 1              │
│  Tags: [programming, team_work, stress_handling] [+]            │
│                                                                 │
│  Access Control                                                 │
│  Owner: Carol Nguyen (designer)                                 │
│  Collaborators: [+ Invite]                                      │
│  Review assignees: Dr. Nguyen, Super Admin                      │
│                                                                 │
│  Version                                                        │
│  Current: v0.4-draft                                            │
│  History: [View version history]                                │
│                                                                 │
│  Dependencies                                                   │
│  • 4 Personas (1 pending review)                                │
│  • 5 Widgets (all production)                                   │
│  • 8 Knowledge Cards (2 pending review)                         │
│                                                                 │
│  ⚠️ Danger Zone                                                 │
│  [Archive scenario]  [Delete scenario]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Interactions & Controls

### Canvas interactions

**Pan:** Click + drag empty space  
**Zoom:** Mouse wheel OR pinch (trackpad) OR `+`/`-` buttons  
**Fit to view:** `F` key OR Fit button  
**Select node:** Click  
**Multi-select:** Shift + click OR drag selection box  
**Delete selected:** `Delete` key (with confirm modal)  
**Duplicate:** `Ctrl+D`  
**Undo/Redo:** `Ctrl+Z` / `Ctrl+Y`

### Drag-and-Drop patterns

**From Registry → Canvas:**
- Drag persona from Cast tab → drop on day node = assign persona to that day
- Drag widget from Widgets tab → drop on day node = assign widget

**Within Canvas:**
- Drag day node to reorder (Day 3 ↔ Day 4) with warning about dependencies
- Drag trigger between days to move

**From Canvas → Outside:**
- Drag any element to Trash icon = delete

### Keyboard shortcuts

| Shortcut | Action |
|:--|:--|
| `Ctrl+S` | Save scenario |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+D` | Duplicate selection |
| `Ctrl+P` | Playtest |
| `Ctrl+V` | Validate |
| `F` | Fit canvas to view |
| `Delete` | Delete selection |
| `Tab` | Next property field |
| `Escape` | Close modal / deselect |
| `1-9` | Jump to day N |
| `B` | Jump to branch points |
| `E` | Jump to endings |

### Right-click context menus

**On day node:**
- Edit day
- Duplicate day (creates Day X.5)
- Delete day
- Playtest from this day
- Copy as template

**On trigger:**
- Edit trigger
- Disable/Enable
- Test trigger (simulate conditions)
- Delete trigger

**On empty canvas:**
- Add new day
- Paste (if clipboard has content)
- Canvas settings

---

## 6. States

### Loading state
- Canvas shows skeleton placeholders
- Sidebar loads progressively
- Estimated time: < 2 seconds for most scenarios

### Empty state (new scenario)
```
┌─────────────────────────────────────┐
│                                     │
│         🎬                          │
│                                     │
│    Scenario mới                     │
│                                     │
│  Bắt đầu bằng:                      │
│                                     │
│  [+ Blank Canvas]                   │
│  [📋 From Template]                 │
│  [📥 Import YAML]                   │
│                                     │
└─────────────────────────────────────┘
```

### Editing state
- Dirty indicator (●) near scenario name
- Auto-save every 30s
- Unsaved changes warning on navigate away

### Saving state
- Spinner on save button
- Toast: "Saving..." → "Saved 10:23:45"

### Validating state
- Progress bar
- Validation results in panel:
  - ✅ 12 checks passed
  - ⚠️ 3 warnings
  - ❌ 1 error

### Error state
- Red banner với actionable message
- Validation errors in context (click to jump to issue)

### Playtest state
- Canvas dims
- Overlay shows playtest UI (split screen)
- [Exit playtest] button prominent

### Published state
- Lock icon near editable fields
- "Version 1.2.0 (production)" badge
- Changes require version bump

---

## 7. Data Flow

### Inputs
- Scenario ID từ URL params
- Scenario YAML từ backend
- Persona Registry (read)
- Widget Registry (read)
- Knowledge Vault (read)
- User permissions từ auth service

### Outputs
- Scenario YAML (saved to backend)
- Events to audit log
- Notifications to reviewers
- Analytics events (on publish)

### API endpoints

```yaml
GET  /api/scenarios/:id                    # Load scenario
PATCH /api/scenarios/:id                   # Save changes (partial)
POST /api/scenarios/:id/validate           # Run validation
POST /api/scenarios/:id/playtest           # Start playtest session
GET  /api/scenarios/:id/history            # Version history
POST /api/scenarios/:id/submit-review      # Submit for review
POST /api/scenarios/:id/publish            # Publish (super admin)
POST /api/scenarios/:id/rollback           # Rollback (super admin)

GET  /api/personas                         # List available personas
GET  /api/widgets                          # List available widgets
GET  /api/knowledge-cards                  # List available cards

POST /api/tasks                            # Create task (request new persona/widget)
```

### Real-time events (WebSocket)

```yaml
- scenario.autosaved
- scenario.collaborator_joined  # V2
- scenario.review_comment_added
- scenario.validation_completed
- scenario.dependency_updated  # when persona/widget/card used by scenario is updated
```

---

## 8. Permission Checks

| Action | Check |
|:--|:--|
| View scenario | `scenario.read` + ownership OR assigned |
| Edit scenario | `scenario.edit` + ownership OR super_admin |
| Delete scenario | `scenario.delete` + super_admin |
| Publish | `scenario.publish` + super_admin |
| Fork template | `scenario.create` |
| Playtest | `scenario.edit` OR `scenario.read` (read-only playtest) |
| Request new persona | `persona.read` (any role can request) |
| Add collaborator | Owner OR super_admin |

**UI enforcement:**
- Hide "Publish" button if no permission
- Disable "Delete" with tooltip explaining why
- Show read-only badge for non-editors

---

## 9. Edge Cases

### Case 1: Concurrent editing (2 designers cùng mở)
- **V1**: Lock system. First person mở = edit mode, second person = read-only với warning
- **V2+**: Real-time collaboration (Figma-style)

### Case 2: Scenario references deleted persona
- Show warning in properties panel
- Offer auto-replace with similar persona
- Block playtest until resolved

### Case 3: Widget version mismatch
- Scenario uses CodeSpace v2.1, new version v2.2 available
- Banner: "Widget update available. Test compatibility first."
- Option to pin version or upgrade

### Case 4: Unsaved changes + browser close
- `beforeunload` event fires
- Warning dialog: "Unsaved changes will be lost. Continue?"
- LocalStorage backup as fallback

### Case 5: Auto-save fails (network issue)
- Queue changes locally
- Retry on reconnect
- Banner: "Offline - changes saved locally. Will sync when online."

### Case 6: Validation has circular dependency
- Detect: day_4 branches affect day_5, but day_5 affects day_4 context
- Error: "Circular dependency detected"
- Visual highlight of circular path

### Case 7: Scenario published but has bug
- Emergency rollback: super_admin clicks "Rollback to previous version"
- All active users trong scenario bị affected:
  - Finish current day với current version
  - Next day uses previous version

---

## 10. Responsive Considerations

### Desktop (1440px+) — Primary target
- Full layout as described
- All tabs visible
- Canvas and panels side-by-side

### Laptop (1024-1440px)
- Right panel collapsible
- Left sidebar can shrink to icons only
- Canvas gets priority

### Tablet (768-1024px)
- Canvas becomes primary, panels are drawers
- Touch-optimized (larger hit targets)
- Limited functionality — warning "Best experienced on desktop"

### Mobile (< 768px)
- **Not supported for editing**
- Show warning: "Scenario Architect requires desktop"
- Read-only mobile view for quick checks
- Link to email self "Continue on desktop"

---

## 11. Performance Requirements

- **Initial load**: < 2s for scenarios up to 100 triggers
- **Canvas render**: 60 FPS when panning/zooming
- **Auto-save debounce**: 30s after last change
- **Playtest launch**: < 5s from click to render
- **Validation**: < 10s for complex scenarios

### Optimization strategies

- Virtualized canvas (only render visible nodes)
- Lazy-load tab contents
- Debounce property updates
- Web Workers cho validation
- IndexedDB cho offline cache

---

## 12. Accessibility

- Keyboard navigation cho all actions (no mouse required)
- Screen reader announcements cho state changes
- High contrast mode support
- Focus indicators rõ ràng
- ARIA labels cho canvas regions
- Reduce motion setting (disable animations)

---

## 13. Visual Design Notes

Áp dụng Design System từ Screen 1:

### Colors
- **Canvas background**: `--paper-100` với grid pattern
- **Day nodes**: `--ink-900` background, `--paper-100` text
- **Branch nodes**: `--lumina-500` với pulsing animation
- **Endings**: gradient gold
- **Connections**: `--ink-400` với arrow heads
- **Selected state**: `--lumina-300` glow
- **Error state**: `--signal-stress` border

### Typography
- **Tab labels**: Inter Tight 14px, medium
- **Node titles**: Fraunces 16px, 500 weight
- **Property labels**: Inter Tight 12px, uppercase, `--ink-500`
- **Property values**: Inter Tight 14px, regular
- **Canvas metadata**: JetBrains Mono 11px

### Animations
- **Node hover**: scale(1.02), shadow increase
- **Selection**: 200ms ease fade-in glow
- **Canvas pan**: smooth, no jitter
- **Properties panel slide**: 250ms ease-out
- **Trigger activation (playtest)**: pulse animation

### Icons
- Day themes: contextual emojis (🔥 🔧 ⚠️ etc.)
- Tabs: Lucide icons
- Cast/Widget: avatars and thumbnails

---

## 14. Multi-domain Application Examples

Scenario Architect là cùng 1 studio nhưng được Designer dùng để build scenarios từ bất kỳ ngành nào. Dưới đây là 3 ví dụ cho thấy cùng layout và workflow nhưng config hoàn toàn khác:

### Example 1: SE Junior-to-Senior (Hero V1)

```yaml
scenario_id: "se-junior-to-senior-v1"
major: "Software Engineering"
days: 7

cast_assigned:
  - mr_alpha (teacher)
  - chip (buddy)
  - boss_nam (pressure)
  - story_director

widgets_per_day:
  day_1: CodeSpace (intro)
  day_2: AlgorithmAnalyzer + CodeSpace
  day_3: LogHunter + TeamChat (crisis)
  day_4: CodeSpace (branch: Frontend/Backend)
  day_5: TaskBoard + DesignForge OR APITester
  day_6: CodeSpace + EthicsViewer
  day_7: PortfolioBuilder

branch_points:
  - day_4: technical_specialization (Frontend/Backend)
  - day_6: ethics_dilemma (deadline vs quality)

key_triggers:
  - server_failure (Day 3)
  - boss_pressure_escalation (when stress < 60%)
  - knowledge_reinforcement (Day 5)

theme_arc: "Cơn say → Bức tường → Khủng hoảng → Phân nhánh → Con người → Đạo đức → Defense"
```

### Example 2: Medical ER Night Shift (V2)

```yaml
scenario_id: "medical-er-night-shift-v1"
major: "Medical (Y khoa)"
days: 7

cast_assigned:
  - dr_linh (mentor)
  - chip (buddy)
  - y_ta_trang (peer)
  - patient_avatars (rotating)
  - story_director

widgets_per_day:
  day_1: PatientMonitor + AnatomyExplorer (intro)
  day_2: PatientMonitor + DragAndDropDiagnosis
  day_3: PatientMonitor + PrescriptionForm + TeamChat (crisis)
  day_4: PatientMonitor (branch: ER vs ICU specialization)
  day_5: SurgicalSimulator OR ICUMonitor
  day_6: EthicsConsultation widget
  day_7: PatientReportBuilder

branch_points:
  - day_4: specialization (ER track vs ICU track)
  - day_6: end_of_life_ethics (treatment intensity)

key_triggers:
  - patient_deterioration (Day 3, 5)
  - ethical_dilemma (Day 6)
  - missed_diagnosis (any day with stress test)

theme_arc: "First night → Routines → Crisis → Specialization → Edge cases → Ethics → Reflection"
```

### Example 3: Marketing Crisis Campaign (V2)

```yaml
scenario_id: "marketing-crisis-campaign-v1"
major: "Marketing"
days: 7

cast_assigned:
  - anh_tung (director)
  - chip (buddy)
  - chi_mai (demanding client)
  - story_director

widgets_per_day:
  day_1: CampaignDashboard + AudienceSegmentor (intro)
  day_2: ABTestSimulator + CampaignDashboard
  day_3: CampaignDashboard + ClientChat + AnomalyDetector (crisis)
  day_4: BudgetSlider (branch: brand vs performance)
  day_5: FunnelAnalyzer OR CreativeStudio
  day_6: EthicsAdvisor (greenwashing dilemma)
  day_7: CampaignReportBuilder

branch_points:
  - day_4: marketing_focus (brand awareness vs performance marketing)
  - day_6: ethics_dilemma (truth in advertising)

key_triggers:
  - roas_drop_critical (Day 3)
  - client_pressure_escalation (when student gut-decides)
  - data_validation_required (every decision)

theme_arc: "Strategy → Optimization → Crisis → Direction → Execution → Ethics → Presentation"
```

### Differences highlighted: Same Architect, different scenarios

| Aspect | SE | Medical | Marketing |
|:--|:--|:--|:--|
| **Cast complexity** | 4 personas | 5 personas (rotating patients) | 4 personas |
| **Widget categories** | Code editors, logs, tasks | Vital monitors, anatomy, forms | Dashboards, charts, simulators |
| **Branch nature** | Technical specialization | Clinical specialization | Marketing focus |
| **Ethics theme** | Code quality vs deadline | End-of-life decisions | Truth in advertising |
| **Crisis trigger** | Server failure (technical) | Patient deterioration (life) | Campaign collapse (business) |
| **Stress source** | Boss + deadlines | Patient outcomes + ethics | Client + metrics |
| **Day 7 deliverable** | Portfolio (code) | Patient report (clinical) | Campaign report (business) |

**Key insight:** Cùng 10 tabs (Overview, Timeline, Cast, Widgets, Triggers, Branches, Knowledge, Endings, Evaluation, Settings), cùng workflow (design → playtest → submit → publish), nhưng output là 3 trải nghiệm hoàn toàn khác.

### Cross-domain reusability

Một số assets có thể reuse across domains:
- **Chip (Buddy)** — luôn xuất hiện ở mọi scenarios
- **Story Director** — generic orchestrator
- **TeamChat (Generic widget)** — dùng ở mọi domain
- **Knowledge cards** generic (Critical Thinking, Communication) — apply universally

Designers có thể leverage these để giảm thời gian tạo scenarios mới.

---

## 15. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Scenario Designer |
| **Complexity** | ⭐⭐⭐⭐⭐ (highest) |
| **Estimated build time** | 8-12 weeks (full feature) |
| **Key technologies** | React Flow, Monaco Editor, WebSocket |
| **Critical dependencies** | Screen 1, 3, 4, 15 |
| **Performance targets** | 60 FPS canvas, < 2s load |
| **Device support** | Desktop primary, tablet limited |
| **Users per month (V1)** | 3-5 internal designers |
| **Canvas complexity** | Up to 500 nodes per scenario |
