# Screen 04 — Widget Studio

**Màn hình số:** 4  
**Phase:** A — Foundation & Studios  
**Complexity:** ⭐⭐⭐⭐ (Cao)  
**Primary users:** Widget Engineer, Super Admin  
**Related flow:** Flow 06 — Tạo Widget mới  
**Dependencies:** Screen 1 (Design System), Screen 14 (Widget Catalog), Screen 2 (Scenario Architect - request source)

---

## 0. Multi-domain Context

Widget Studio là container đa ngành. Wireframes và ví dụ trong spec này dùng nhiều widgets từ các ngành khác nhau để minh họa. Mỗi engineer chỉ làm việc với 1 widget tại 1 thời điểm.

**Examples used in this spec:**
- **Software Engineering** (V1): CodeSpace, LogHunter, TaskBoard, DeployFlow
- **Medical** (V2 priority): PatientMonitor, AnatomyExplorer, PrescriptionForm
- **Marketing** (V2 priority): CampaignDashboard, AudienceSegmentor, ABTestSimulator

---

## 1. Mục đích màn hình

Widget Studio là **studio để Engineer build widgets** — những "công cụ mô phỏng" mà học sinh dùng trong Workspace để trải nghiệm tool thực tế của ngành nghề.

**6 hoạt động cốt lõi:**

1. **Browse Widget Library** — xem widgets có sẵn (cho mọi engineer)
2. **Create new widget** — build widget mới với 4 layers (Manifest + Visual + Logic + Bridge)
3. **Edit existing widget** — refine, fix bugs, add features
4. **Test widget** — unit tests, integration, visual, performance, a11y
5. **Manage versions** — semantic versioning, rollback
6. **Deploy** — staging → production với gradual rollout

### Metaphor thiết kế

Widget Studio giống như **kết hợp giữa Storybook và VS Code**:
- Storybook: render visual states với mock data
- VS Code: write code, run tests, debug
- Plus: manifest editor (specific to LUMINA), deployment dashboard

### Triết lý: Widget là "USB Device"

Một widget không biết sẽ được "cắm" vào scenario nào — nó chỉ tuân thủ contract (Manifest) và phản ứng theo data + actions từ scenario engine.

→ Engineer build CodeSpace 1 lần, có thể được dùng bởi:
- Scenario SE Day 1 (initial_code: empty, no time pressure)
- Scenario SE Day 3 (initial_code: buggy server code, countdown 5 min)
- Scenario Data Science Day 2 (initial_code: pandas template, language: python)

Cùng widget, khác behavior dựa trên data input.

---

## 2. Users & Use Cases

### Primary user: Widget Engineer (role: `engineer`)

**Background expected:**
- Frontend/Full-stack developer
- React + TypeScript proficiency
- Hiểu UX patterns
- Có thể design simple (collaborate với designer cho complex visuals)

**Workload:**
- V1: Build 5 widgets cho SE Hero Major
- V2: Build 8-12 widgets cho Medical + Marketing scenarios
- Maintenance: Bug fixes, performance improvements
- Reviews: Code review từ peer engineers

### Secondary user: Super Admin

- Approve widgets trước deploy
- Emergency disable nếu widget có security/performance issues
- Access tất cả widgets

### Tertiary users (read-only)

- **Scenario Designer**: Browse widgets to know what's available
- **Operator**: Look up widget definitions when debugging
- **Persona Writer**: Understand widget behavior để craft AI responses

### Use cases chi tiết

#### UC1: Build new widget từ scratch

**Example:** PatientMonitor cho Medical scenarios

**Flow:**
1. Designer requests "Patient vital signs monitor with crisis simulation"
2. Engineer opens Widget Studio
3. Click "New Widget" → choose "Code Editor" approach (complex visual)
4. Define Manifest:
   - Inputs: `patient_baseline`, `crisis_events`, `time_compression`
   - Events: `on_intervention`, `on_alarm_triggered`, `on_patient_status_change`
   - Actions: `inject_crisis`, `update_vitals`, `trigger_alarm`
5. Design Visual Shell (heart rate monitor + BP cuff + SpO2)
6. Implement logic (vitals simulation, alarms, intervention responses)
7. Create Bridge to Scenario Engine
8. Test: unit + integration + visual + performance + a11y
9. Deploy to staging
10. Designer integrates into Medical Day 3 scenario
11. Iterate based on feedback
12. Deploy to production

#### UC2: Build widget từ Visual Builder (low complexity)

**Example:** AudienceSegmentor cho Marketing — drag-drop targeting

**Flow:**
1. Open Widget Studio → choose "Visual Builder" approach
2. Drag components: filter inputs, segment list, save button
3. Configure properties (filter types, validation)
4. Wire events: `on_segment_created`, `on_segment_modified`
5. Auto-generated React code
6. Customize logic if needed
7. Test + deploy

#### UC3: Fork existing widget for variant

**Example:** CodeSpace (JavaScript) → fork to create CodeSpace (Python) variant

**Flow:**
1. Open CodeSpace base widget
2. Click "Fork" → new widget created
3. Modify:
   - Default language: Python
   - Syntax highlighter: Python rules
   - Default code template: pandas import
   - Test framework: pytest
4. Save as separate widget OR use config flag (depends on extent of changes)

#### UC4: Debug widget reported in production

**Example:** CampaignDashboard freezes on Day 5 of Marketing scenario

**Flow:**
1. Receive bug report với session ID
2. Open Session Replay (Screen 17) — see student interaction
3. Open Widget Studio → CampaignDashboard
4. Reproduce bug locally với same input data
5. Identify root cause (memory leak in chart rendering)
6. Fix + add regression test
7. Deploy patch (version bump)

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Studios  >  Widget Studio  >  PatientMonitor v0.5-draft   │
├─────────────────┬───────────────────────────────────┬───────────────────┤
│                 │                                   │                   │
│ Widgets         │           Editor                  │   Preview         │
│ Sidebar         │                                   │   (Live)          │
│                 │  Tabs: Manifest | Visual |        │                   │
│ 280px           │  Logic | Tests | Deploy           │   480px           │
│                 │                                   │                   │
│                 │              640px                │                   │
│                 │                                   │                   │
│                 │                                   │                   │
├─────────────────┴───────────────────────────────────┴───────────────────┤
│  Status bar: Draft v0.5 | Last saved 2 min | 12/15 tests pass | [Save]  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Widgets Sidebar (Left, 280px)

```
┌─────────────────────────────┐
│  WIDGETS                    │
│                             │
│  + New Widget               │
│  📋 From Template           │
│  🔀 Fork Existing           │
│                             │
├─────────────────────────────┤
│  FILTERS                    │
│                             │
│  Domain:                    │
│  [All ▼]                    │
│   • Software Engineering    │
│   • Medical                 │
│   • Marketing               │
│   • Generic                 │
│                             │
│  Status:                    │
│  ☑ Production               │
│  ☑ Staging                  │
│  ☑ Draft                    │
│  ☐ Archived                 │
│                             │
│  Owner:                     │
│  ○ Mine                     │
│  ● All team                 │
│                             │
├─────────────────────────────┤
│  REGISTRY (18)              │
│                             │
│  ▼ Software Engineering (5) │
│  ┌───────────────────────┐  │
│  │   CodeSpace           │  │
│  │   v2.1.3 prod         │  │
│  ├───────────────────────┤  │
│  │   LogHunter           │  │
│  │   v1.2.0 prod         │  │
│  ├───────────────────────┤  │
│  │   TaskBoard           │  │
│  │   v1.0.5 prod         │  │
│  ├───────────────────────┤  │
│  │   DeployFlow          │  │
│  │   v1.0.0 prod         │  │
│  ├───────────────────────┤  │
│  │   TeamChat (generic)  │  │
│  │   v3.2.0 prod         │  │
│  └───────────────────────┘  │
│                             │
│  ▼ Medical (3)              │
│  ┌───────────────────────┐  │
│  │ ● PatientMonitor      │  │ ← Selected
│  │   v0.5-draft          │  │
│  │   ⚠ 2 tests failing   │  │
│  ├───────────────────────┤  │
│  │   AnatomyExplorer     │  │
│  │   v1.0.0 staging      │  │
│  ├───────────────────────┤  │
│  │   PrescriptionForm    │  │
│  │   v0.3-draft          │  │
│  └───────────────────────┘  │
│                             │
│  ▼ Marketing (4)            │
│  ┌───────────────────────┐  │
│  │   CampaignDashboard   │  │
│  │   v1.1.0 prod         │  │
│  ├───────────────────────┤  │
│  │   AudienceSegmentor   │  │
│  │   v0.8 staging        │  │
│  ├───────────────────────┤  │
│  │   ABTestSimulator     │  │
│  │   v0.5-draft          │  │
│  ├───────────────────────┤  │
│  │   FunnelAnalyzer      │  │
│  │   v0.2-draft          │  │
│  └───────────────────────┘  │
│                             │
│  ▼ Generic / Cross-domain   │
│  (6 widgets)                │
│                             │
└─────────────────────────────┘
```

### Editor Tabs (Center, 640px)

5 tabs: Manifest | Visual | Logic | Tests | Deploy

#### Tab 1: Manifest (declarative contract)

```
┌───────────────────────────────────────────────────┐
│  [📋 Manifest] [🎨 Visual] [⚡ Logic]             │ ← Selected
│  [🧪 Tests] [🚀 Deploy]                           │
├───────────────────────────────────────────────────┤
│                                                   │
│  WIDGET MANIFEST                                  │
│  Token: 1,247 chars (well under 5KB limit)        │
│                                                   │
│  ─── METADATA ───                                 │
│                                                   │
│  Widget ID                                        │
│  ┌─────────────────────────────────────┐          │
│  │ patient_monitor                     │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  Display Name                                     │
│  ┌─────────────────────────────────────┐          │
│  │ Patient Monitor                     │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  Inspired by                                      │
│  ┌─────────────────────────────────────┐          │
│  │ Hospital vital signs monitors       │          │
│  │ (Philips IntelliVue, GE Carescape)  │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  Superpower                                       │
│  ┌─────────────────────────────────────┐          │
│  │ Real-time vital signs với alarm     │          │
│  │ system, intervention scoring        │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  Domain: [Medical ▼]                              │
│  Category: [Clinical Tools ▼]                     │
│                                                   │
│  ─── INPUTS (what scenario provides) ───          │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ patient_baseline                    │          │
│  │   type: object                      │          │
│  │   required: yes                     │          │
│  │   schema: { hr, bp, spo2, temp,    │          │
│  │            respiratory_rate }       │          │
│  │ [Edit] [Remove]                     │          │
│  ├─────────────────────────────────────┤          │
│  │ crisis_events                       │          │
│  │   type: array<crisis>               │          │
│  │   required: no                      │          │
│  │   description: Triggers cho         │          │
│  │     deterioration                   │          │
│  │ [Edit] [Remove]                     │          │
│  ├─────────────────────────────────────┤          │
│  │ time_compression                    │          │
│  │   type: number (1-100)              │          │
│  │   default: 1                        │          │
│  │   description: Speed up time        │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  + Add input                                      │
│                                                   │
│  ─── EVENTS (what widget emits) ───               │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ on_intervention                     │          │
│  │   payload: {action, timestamp,      │          │
│  │             targeting_value}        │          │
│  ├─────────────────────────────────────┤          │
│  │ on_alarm_triggered                  │          │
│  │   payload: {alarm_type, severity,   │          │
│  │             vital_value}            │          │
│  ├─────────────────────────────────────┤          │
│  │ on_patient_status_change            │          │
│  │   payload: {from_status,            │          │
│  │             to_status, reason}      │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  + Add event                                      │
│                                                   │
│  ─── ACTIONS (what scenario can command) ───      │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ inject_crisis                       │          │
│  │   params: {type, severity}          │          │
│  ├─────────────────────────────────────┤          │
│  │ update_vitals                       │          │
│  │   params: {vital, value, animate}   │          │
│  ├─────────────────────────────────────┤          │
│  │ trigger_alarm                       │          │
│  │   params: {type, message}           │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  + Add action                                     │
│                                                   │
│  ─── FIDELITY LEVELS ───                          │
│                                                   │
│  ☑ Beginner                                       │
│    Features: Basic vitals + manual intervention   │
│  ☑ Intermediate                                   │
│    + Auto-alerts, vital trends                    │
│  ☑ Advanced                                       │
│    + Multi-patient, advanced waveforms            │
│                                                   │
│  ─── DEPENDENCIES ───                             │
│                                                   │
│  External libraries:                              │
│  • d3-shape (waveform rendering) v3.2.0           │
│  • framer-motion (transitions) v10.x              │
│                                                   │
│  Browser support: Chrome 90+, Firefox 85+,        │
│                    Safari 14+                     │
│                                                   │
│  [📊 Validate Manifest]                           │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### Tab 2: Visual (UI implementation)

```
┌───────────────────────────────────────────────────┐
│  [📋 Manifest] [🎨 Visual] [⚡ Logic]             │ ← Selected
│  [🧪 Tests] [🚀 Deploy]                           │
├───────────────────────────────────────────────────┤
│                                                   │
│  VISUAL LAYER                                     │
│                                                   │
│  Build approach:                                  │
│  ○ Visual Builder (drag-drop)                     │
│  ● Code Editor (custom React)                     │
│  ○ Hybrid                                         │
│                                                   │
│  ─── COMPONENT TREE ───                           │
│                                                   │
│  PatientMonitor.tsx                               │
│  ├── MonitorHeader                                │
│  ├── VitalsGrid                                   │
│  │   ├── HeartRateDisplay                         │
│  │   ├── BloodPressureDisplay                     │
│  │   ├── OxygenSaturationDisplay                  │
│  │   ├── TemperatureDisplay                       │
│  │   └── RespiratoryRateDisplay                   │
│  ├── WaveformsPanel                               │
│  │   ├── ECGWaveform                              │
│  │   └── PlethysmographWaveform                   │
│  ├── AlarmsPanel                                  │
│  └── InterventionPanel                            │
│                                                   │
│  ─── CODE EDITOR ───                              │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ import { useState, useEffect } from │          │
│  │   'react';                          │          │
│  │ import { motion } from 'framer-...'│          │
│  │ import { ECGWaveform } from        │          │
│  │   './components/ECGWaveform';       │          │
│  │                                     │          │
│  │ export const PatientMonitor =       │          │
│  │   ({ config, state, onEvent }) => {│          │
│  │   const [vitals, setVitals] =       │          │
│  │     useState(config.patient_        │          │
│  │     baseline);                      │          │
│  │                                     │          │
│  │   // ... vital signs simulation     │          │
│  │                                     │          │
│  │   return (                          │          │
│  │     <div className="patient-       │          │
│  │       monitor">                     │          │
│  │       <MonitorHeader />             │          │
│  │       <VitalsGrid vitals={vitals}/>│          │
│  │       <WaveformsPanel               │          │
│  │         heartRate={vitals.hr} />    │          │
│  │       <AlarmsPanel                  │          │
│  │         alarms={alarms} />          │          │
│  │     </div>                          │          │
│  │   );                                │          │
│  │ };                                  │          │
│  │                                     │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  Files: 8 (PatientMonitor.tsx, components/...)    │
│  Total: 1,247 lines                               │
│                                                   │
│  Tools:                                           │
│  [📁 File explorer] [🔍 Search code]              │
│  [⚙ Format] [📊 Bundle size: 47KB]                │
│                                                   │
│  ─── DESIGN SYSTEM TOKENS ───                     │
│                                                   │
│  Available:                                       │
│  • Colors: --ink-*, --paper-*, --signal-*         │
│  • Typography: Inter Tight, JetBrains Mono        │
│  • Spacing: 4px grid (--space-1, --space-2...)    │
│  • Animations: --transition-base                  │
│                                                   │
│  [🎨 Open Design System reference]                │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### Tab 3: Logic (state, events, actions)

```
┌───────────────────────────────────────────────────┐
│  LOGIC LAYER                                      │
│                                                   │
│  ─── STATE MANAGEMENT ───                         │
│                                                   │
│  Store: Zustand (recommended for widgets)         │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ // useWidgetStore.ts                │          │
│  │                                     │          │
│  │ interface PatientMonitorState {     │          │
│  │   vitals: VitalSigns;               │          │
│  │   alarms: Alarm[];                  │          │
│  │   patientStatus: 'stable' |         │          │
│  │     'deteriorating' | 'critical';   │          │
│  │   interventions: Intervention[];    │          │
│  │ }                                   │          │
│  │                                     │          │
│  │ export const useStore = create<     │          │
│  │   PatientMonitorState>((set) => ({ │          │
│  │   vitals: defaultVitals,            │          │
│  │   alarms: [],                       │          │
│  │   patientStatus: 'stable',          │          │
│  │   interventions: [],                │          │
│  │   updateVitals: (vital, value) =>   │          │
│  │     set((state) => ({...})),        │          │
│  │ }));                                │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── EVENT HANDLERS ───                           │
│                                                   │
│  Mapping events từ Manifest → emit logic:         │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ • on_intervention                   │          │
│  │   Triggered when: User clicks       │          │
│  │   intervention button               │          │
│  │   Emits: {action, timestamp,        │          │
│  │           targeting_value}          │          │
│  │   [View handler code]               │          │
│  ├─────────────────────────────────────┤          │
│  │ • on_alarm_triggered                │          │
│  │   Triggered when: Vital exceeds     │          │
│  │   threshold                         │          │
│  │   Emits: {alarm_type, severity,     │          │
│  │           vital_value}              │          │
│  ├─────────────────────────────────────┤          │
│  │ • on_patient_status_change          │          │
│  │   Triggered when: Multiple alarms   │          │
│  │   sustained                         │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── ACTION HANDLERS ───                          │
│                                                   │
│  Mapping actions từ Manifest → handler logic:     │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ • inject_crisis                     │          │
│  │   Receives: {type, severity}        │          │
│  │   Effects: Modifies vitals over     │          │
│  │   time, triggers alarms             │          │
│  │   [View handler code]               │          │
│  ├─────────────────────────────────────┤          │
│  │ • update_vitals                     │          │
│  │   Receives: {vital, value, animate}│          │
│  │   Effects: Animated transition to   │          │
│  │   new value                         │          │
│  ├─────────────────────────────────────┤          │
│  │ • trigger_alarm                     │          │
│  │   Receives: {type, message}         │          │
│  │   Effects: Visual + audio alarm     │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── BRIDGE TO SCENARIO ENGINE ───                │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ // PatientMonitorBridge.ts          │          │
│  │                                     │          │
│  │ export class PatientMonitorBridge   │          │
│  │   extends WidgetBridge {            │          │
│  │   constructor(scenarioEngine) {     │          │
│  │     super('patient_monitor',        │          │
│  │       scenarioEngine);              │          │
│  │     this.setupEventHandlers();      │          │
│  │     this.setupActionHandlers();     │          │
│  │   }                                 │          │
│  │ }                                   │          │
│  └─────────────────────────────────────┘          │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### Tab 4: Tests (5 test types)

```
┌───────────────────────────────────────────────────┐
│  TESTS                                            │
│                                                   │
│  Overall: 12/15 passing • Coverage: 78%           │
│                                                   │
│  ─── UNIT TESTS ───                               │
│  ✅ 8/8 passing (220ms total)                     │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ ✅ updateVitals updates state        │          │
│  │ ✅ updateVitals triggers alarm       │          │
│  │   when threshold crossed            │          │
│  │ ✅ injectCrisis modifies vitals      │          │
│  │   over time                         │          │
│  │ ✅ on_intervention emits correct     │          │
│  │   payload                           │          │
│  │ ✅ patient status updates based      │          │
│  │   on sustained alarms               │          │
│  │ ... 3 more passing                  │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  [▶ Run] [🔄 Run on save]                         │
│                                                   │
│  ─── INTEGRATION TESTS ───                        │
│  ⚠️ 2/3 passing                                   │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ ✅ Full scenario flow: stable →      │          │
│  │    crisis → intervention → recovery │          │
│  │ ✅ Multi-alarm coordination          │          │
│  │ ❌ Time compression at 100x          │          │
│  │    Error: Animation queue overflow  │          │
│  │    Stack trace: ▶                   │          │
│  │    [Debug] [Skip]                   │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── VISUAL TESTS (Storybook) ───                 │
│  ✅ All states snapshot match                     │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ States rendered:                    │          │
│  │ ☑ Stable patient                    │          │
│  │ ☑ Mild deterioration                │          │
│  │ ☑ Critical (multiple alarms)        │          │
│  │ ☑ Post-intervention recovery        │          │
│  │ ☑ Empty state                       │          │
│  │ ☑ Loading state                     │          │
│  │ ☑ Error state                       │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  [📸 Update snapshots]                            │
│                                                   │
│  ─── PERFORMANCE TESTS ───                        │
│  ⚠️ 1/2 passing                                   │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ ✅ Initial render < 100ms            │          │
│  │   Actual: 87ms                      │          │
│  │ ❌ Memory leak after 30 min         │          │
│  │   Detected: 80MB growth             │          │
│  │   Threshold: 20MB                   │          │
│  │   Likely cause: Waveform animation  │          │
│  │   queue not cleaning up             │          │
│  │   [Debug] [Profile]                 │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── ACCESSIBILITY TESTS ───                      │
│  ✅ WCAG 2.1 AA compliant                         │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ ✅ Color contrast (all text)         │          │
│  │ ✅ Keyboard navigation                │          │
│  │ ✅ Screen reader labels               │          │
│  │ ✅ Focus indicators                   │          │
│  │ ✅ Alarm sounds có visual fallback   │          │
│  │ ⚠️  No reduced-motion alternative   │          │
│  │   for waveform animations           │          │
│  │   [Add]                             │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── REGRESSION TESTS ───                         │
│                                                   │
│  Run all tests after every code change            │
│  ☑ On commit                                       │
│  ☑ On pull request                                │
│  ☑ Before deploy                                  │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### Tab 5: Deploy (versioning, environments)

```
┌───────────────────────────────────────────────────┐
│  DEPLOY                                           │
│                                                   │
│  ─── CURRENT STATE ───                            │
│                                                   │
│  Local: v0.5-draft (12/15 tests passing)          │
│  Staging: v0.4 (deployed 3 days ago)              │
│  Production: Not yet deployed                     │
│                                                   │
│  ─── VERSIONING ───                               │
│                                                   │
│  Next version:                                    │
│  ○ Patch (0.5.0 → 0.5.1) - Bug fixes              │
│  ● Minor (0.5.0 → 0.6.0) - New features           │
│  ○ Major (0.5.0 → 1.0.0) - Breaking changes       │
│                                                   │
│  Changelog:                                       │
│  ┌─────────────────────────────────────┐          │
│  │ ## v0.6.0                           │          │
│  │                                     │          │
│  │ ### Added                           │          │
│  │ - Multi-patient support             │          │
│  │ - Custom alarm thresholds           │          │
│  │                                     │          │
│  │ ### Fixed                           │          │
│  │ - Memory leak in waveform           │          │
│  │ - Time compression overflow at 100x │          │
│  │                                     │          │
│  │ ### Breaking                        │          │
│  │ None                                │          │
│  └─────────────────────────────────────┘          │
│                                                   │
│  ─── DEPLOY TO STAGING ───                        │
│                                                   │
│  Pre-deploy checks:                               │
│  ✅ All tests passing                             │
│  ✅ No security vulnerabilities                   │
│  ✅ Bundle size under limit (47KB / 200KB)        │
│  ✅ Code reviewed                                 │
│                                                   │
│  Staging deployment will:                         │
│  • Make widget available to internal testers      │
│  • Show "Staging" badge in Catalog                │
│  • Available cho test scenarios                   │
│  • Not visible to end users                       │
│                                                   │
│  [🚀 Deploy to Staging]                           │
│                                                   │
│  ─── DEPLOY TO PRODUCTION (Super Admin only) ───  │
│                                                   │
│  Production deployment requires:                  │
│  ✅ Staging validated (1 week minimum)            │
│  ⚠ Awaiting staging validation                    │
│  ✅ Code reviewed by senior                       │
│  ✅ Security scan passed                          │
│                                                   │
│  Rollout strategy:                                │
│  ● Gradual (10% → 50% → 100%)                     │
│  ○ Immediate (all scenarios)                      │
│                                                   │
│  Affected scenarios (when v0.6.0 deploys):        │
│  • Medical Day 3 - ER Crisis                     │
│  • Medical Day 5 - Surgery Prep                  │
│  • (Designers can opt to pin v0.5)                │
│                                                   │
│  [🚀 Deploy to Production]                        │
│  [🆘 Emergency Rollback]                          │
│                                                   │
│  ─── VERSION HISTORY ───                          │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ v0.5 (current draft)                │          │
│  │ v0.4 - 3 days ago [Compare]         │          │
│  │ v0.3 - 1 week ago [Compare]         │          │
│  │ v0.2 - 2 weeks ago                  │          │
│  │ v0.1 - 3 weeks ago (initial)        │          │
│  └─────────────────────────────────────┘          │
│                                                   │
└───────────────────────────────────────────────────┘
```

### Preview Panel (Right, 480px) — Always visible

Live preview của widget với mock data:

```
┌─────────────────────────────────────┐
│  PREVIEW                            │
│                                     │
│  Mock data preset:                  │
│  [Stable Patient ▼]                 │
│   • Stable Patient                  │
│   • ER Crisis Day 3                 │
│   • Surgery Prep                    │
│   • Custom...                       │
│                                     │
│  Fidelity level:                    │
│  ○ Beginner ● Intermediate ○ Adv   │
│                                     │
│  Viewport size:                     │
│  ● Workspace (60% of 1440px)        │
│  ○ Mobile portrait                  │
│  ○ Tablet landscape                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │ PATIENT MONITOR             │    │
│  │ Bed 12-A | John Doe, 45M    │    │
│  ├─────────────────────────────┤    │
│  │                             │    │
│  │  HR: 72 bpm                 │    │
│  │  ━━━╱╲━━━╱╲━━━╱╲━━━━ 80    │    │
│  │     30                      │    │
│  │                             │    │
│  │  BP: 120/80 mmHg            │    │
│  │  SpO2: 98%                  │    │
│  │  Temp: 36.7°C               │    │
│  │  RR: 16 /min                │    │
│  │                             │    │
│  │  Status: ● STABLE           │    │
│  │                             │    │
│  │  [Intervention] [Alarms]    │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Test scenario simulation:          │
│  [▶ Inject Cardiac Event]           │
│  [▶ Trigger Sepsis Cascade]         │
│  [▶ Inject Allergic Reaction]       │
│                                     │
│  ─── EVENTS LOG ───                 │
│  ┌─────────────────────────────┐    │
│  │ 14:23:45 Widget mounted     │    │
│  │ 14:23:46 Vitals stable      │    │
│  │ 14:23:50 [Test] Crisis      │    │
│  │           injected          │    │
│  │ 14:23:51 HR rising: 95      │    │
│  │ 14:23:52 ALARM: Tachycardia │    │
│  │ 14:23:55 Status changed:    │    │
│  │           stable→deteriorate│    │
│  └─────────────────────────────┘    │
│                                     │
│  ☑ Show event log                   │
│  ☑ Show performance metrics         │
│  ☐ Show full state                  │
│                                     │
└─────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Auto-save & Hot reload

**Code editing:**
- Auto-save every 30s
- Hot reload preview on save
- Failed compilation → show error, keep last working preview

**Manifest editing:**
- Validation on field blur
- Schema check real-time
- Preview updates when manifest changes affect rendering

### Test running

**On-demand:**
- Click "Run" → executes test suite
- Real-time results streaming
- Drill-down on failures

**Auto-run:**
- On save (debounced 5s)
- On commit (CI integration)
- On deploy (mandatory, blocks if fail)

### Mock data management

**Preset library:**
- Common scenarios for this widget
- Saved by widget engineer or designers
- Shareable across team

**Custom mock:**
- Modal to define custom config
- JSON editor with schema validation
- Save as new preset

### Keyboard shortcuts

| Shortcut | Action |
|:--|:--|
| `Ctrl+S` | Save changes |
| `Ctrl+R` | Run all tests |
| `Ctrl+Shift+R` | Reset preview |
| `Ctrl+1-5` | Switch tabs |
| `Ctrl+P` | Toggle preview |
| `Ctrl+E` | Toggle event log |
| `F5` | Refresh preview |
| `Ctrl+/` | Show shortcuts |

---

## 5. States

### State 1: Empty (no widgets)

```
┌─────────────────────────────────────┐
│                                     │
│         🧩                          │
│                                     │
│    Chưa có widget nào               │
│                                     │
│  Bắt đầu bằng:                      │
│                                     │
│  [+ Tạo widget đầu tiên]            │
│  [📋 Browse templates]              │
│  [📖 Widget development guide]      │
│                                     │
└─────────────────────────────────────┘
```

### State 2: Editing (default)

All zones active, hot reload enabled.

### State 3: Tests Running

- Test tab badge shows spinner
- Real-time results streaming
- Other tabs functional

### State 4: Deploying

- Deploy tab shows progress
- Pre-deploy checks animated
- Each step ✅ or ❌
- Cannot navigate away (warning)

### State 5: Build Error

```
┌─────────────────────────────────────┐
│  ⚠️ BUILD ERROR                     │
│                                     │
│  PatientMonitor.tsx:45:12           │
│                                     │
│  Type 'string' is not assignable   │
│  to type 'number'                  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ const hr = vital.value; // ⚠ │    │
│  │       ^^                    │    │
│  │ Should be: parseInt(...)    │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Jump to error] [Suggest fix]      │
│                                     │
└─────────────────────────────────────┘
```

### State 6: Production deploy in progress

```
┌─────────────────────────────────────┐
│  🚀 DEPLOYING TO PRODUCTION         │
│                                     │
│  PatientMonitor v0.6.0              │
│                                     │
│  Stage 1: 10% rollout               │
│  ████████████████░░░░░░░░░ 65%      │
│                                     │
│  Affected scenarios: 2              │
│  Active sessions: 8                 │
│                                     │
│  Health check: ✅ All metrics OK    │
│                                     │
│  Next stage in: 4h 12m              │
│                                     │
│  [Pause rollout] [Rollback]         │
│                                     │
└─────────────────────────────────────┘
```

### State 7: Read-only (production version)

- Banner: "Viewing production version. Edit creates new draft."
- Code editor read-only
- Can browse but not modify
- "Edit" button creates new draft version

### State 8: Emergency disabled

```
┌─────────────────────────────────────┐
│  🆘 WIDGET EMERGENCY DISABLED       │
│                                     │
│  PatientMonitor v0.6.0 was disabled │
│  by Super Admin (2 hours ago).      │
│                                     │
│  Reason: Critical security issue    │
│  (XSS vulnerability in alert msgs)  │
│                                     │
│  Affected scenarios:                │
│  • Medical Day 3 — Currently using  │
│    fallback widget                  │
│  • Medical Day 5 — Disabled         │
│                                     │
│  Actions required:                  │
│  1. Patch the vulnerability         │
│  2. Add security test               │
│  3. Submit for emergency review     │
│                                     │
│  [Open patch workflow]              │
│                                     │
└─────────────────────────────────────┘
```

---

## 6. Data Flow

### Inputs

```yaml
from_registry:
  - widget_definition (manifest + code + assets)
  - version_history
  - usage_statistics
  - dependency_graph

from_design_system:
  - design tokens (colors, typography, spacing)
  - reusable components
  - icons

from_scenarios:
  - widget_requests (which widgets are needed)
  - usage_data (which widgets are popular)
  - bug_reports (issues to fix)
```

### Outputs

```yaml
widget_artifacts:
  - bundled_js (minified)
  - manifest.json
  - assets (images, fonts)
  - source_maps (for debugging)
  
events:
  - widget.created
  - widget.updated
  - widget.deployed_staging
  - widget.deployed_production
  - widget.disabled
  - widget.deleted
  
metrics:
  - bundle_size
  - test_coverage
  - performance_benchmarks
```

### API Endpoints

```yaml
GET    /api/widgets                       # List với filters
GET    /api/widgets/:id                   # Get widget + manifest
POST   /api/widgets                       # Create new
PATCH  /api/widgets/:id                   # Update (creates draft if production)
GET    /api/widgets/:id/code              # Source code
PUT    /api/widgets/:id/code              # Update code
GET    /api/widgets/:id/versions          # Version history
POST   /api/widgets/:id/deploy/staging    # Deploy to staging
POST   /api/widgets/:id/deploy/production # Deploy to production (super admin)
POST   /api/widgets/:id/rollback          # Emergency rollback
POST   /api/widgets/:id/disable           # Emergency disable

POST   /api/widgets/:id/test/unit         # Run unit tests
POST   /api/widgets/:id/test/integration  # Run integration
POST   /api/widgets/:id/test/visual       # Snapshot tests
POST   /api/widgets/:id/test/performance  # Perf tests
POST   /api/widgets/:id/test/a11y         # Accessibility audit
```

### Build Pipeline

```
Save → Lint → Type-check → Build → Bundle → Test → Preview update
                                              ↓
                                        Pass → Ready to deploy
                                        Fail → Show errors
```

---

## 7. Permission Checks

| Action | Engineer | Super Admin |
|:--|:-:|:-:|
| Browse widgets | ✅ | ✅ |
| Create new widget | ✅ | ✅ |
| Edit own draft | ✅ | ✅ |
| Edit others' drafts | ❌ | ✅ |
| Edit production | ❌ (creates draft) | ✅ |
| Run tests | ✅ | ✅ |
| Deploy to staging | ✅ | ✅ |
| Deploy to production | ❌ | ✅ |
| Emergency rollback | ❌ | ✅ |
| Emergency disable | ❌ | ✅ |
| Delete widget | ❌ | ✅ (only if unused) |
| Fork widget | ✅ | ✅ |
| View dependencies | ✅ | ✅ |

**Read-only roles:**
- Designer: Browse + view manifest (cannot edit)
- Operator: Browse + view code (for debugging)

---

## 8. Edge Cases

### Case 1: Widget breaks scenarios in production

**Detection:** Spike in errors after deploy

**Response:**
- Alert Super Admin immediately
- Auto-rollback option (if configured)
- Manual rollback button always available
- Post-mortem required

### Case 2: Two engineers cùng work trên 1 widget

**V1 approach:** File-level locking
- Prevent concurrent edits to same file
- Show "Locked by Bob" indicator
- Auto-unlock after 30 min idle

**V2+ approach:** Real-time collaborative editing (CRDT-based)

### Case 3: Widget dependency conflict

**Scenario:** Widget A uses framer-motion v10, Widget B uses v11 (breaking changes)

**Resolution:**
- Lock dependency versions per widget
- Build system isolates each widget
- Detect conflicts at build time

### Case 4: Widget bị deprecated cần migrate

**Scenario:** Old widget needs replacement

**Migration flow:**
- Mark widget as "deprecated" với date
- Notify scenarios using it
- Provide migration guide
- Sunset after 3 months
- Auto-migrate scenarios to new version (where possible)

### Case 5: Performance regression

**Detection:** Performance tests show degradation

**Response:**
- Block deploy
- Show comparison: before/after
- Engineer must optimize or justify
- If accepted: document in changelog

### Case 6: Security vulnerability discovered

**Severity-based response:**
- Critical: Emergency disable + hotfix
- High: Patch within 24h
- Medium: Patch in next regular release
- Low: Backlog với deadline

### Case 7: Widget needs feature only in latest browser

**Resolution:**
- Document browser requirements in Manifest
- Workspace shows compatibility warning
- Provide fallback hoặc graceful degradation

---

## 9. Responsive Considerations

### Desktop (1440px+) — Primary

Full 3-zone layout. Optimal for development.

### Laptop (1024-1440px)

- Widgets Sidebar collapsible
- Editor expands
- Preview stays 400px

### Tablet (< 1024px)

**Not recommended.** Show:

```
🧩 Widget Studio requires desktop.

Code editing và testing work best với
larger screens. Please use desktop.
```

### Preview viewport simulation

Within Preview panel, can simulate target viewports:
- Workspace (60% of 1440px = ~864px)
- Mobile portrait (375px)
- Tablet landscape (1024px)
- Custom dimensions

---

## 10. Performance Requirements

- **Widget load**: < 1.5s (depending on bundle size)
- **Preview hot reload**: < 500ms
- **Test suite (all)**: < 60s
- **Code editor responsiveness**: 60 FPS
- **Build**: < 30s for typical widget
- **Deploy**: < 5 min staging, gradual rollout production

### Optimization

- Lazy-load tabs
- Worker threads for builds/tests
- Cache compiled widgets
- Stream test results
- Parallel test execution

---

## 11. Accessibility

For Widget Studio itself:
- Full keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

For widgets being built:
- Built-in WCAG 2.1 AA tests
- Linting rules cho a11y issues
- Documentation về accessibility patterns
- Examples cho common patterns

---

## 12. Visual Design Notes

### Color application

**Editor area:**
- Background: `--paper-100`
- Code editor: dark theme (`--ink-900` background)
- Tab borders: `--ink-200`

**Widgets Sidebar:**
- Background: `--paper-200`
- Status badges:
  - Production: `--signal-calm` (green)
  - Staging: `--signal-focus` (blue)
  - Draft: `--signal-alert` (amber)
  - Disabled: `--signal-stress` (red)

**Preview:**
- Background: `--paper-300` (deeper than editor)
- Widget container: actual production background
- Event log: terminal-style (dark)

### Typography

- Code: JetBrains Mono 13-14px
- UI labels: Inter Tight 12-14px
- Manifest fields: Inter Tight 13px
- Event log: JetBrains Mono 11px

### Iconography

- Tabs: Lucide icons (FileText, Palette, Zap, FlaskConical, Rocket)
- Status: ✅ ⚠️ ❌ 🚀 🆘
- File types: Custom icons per file type

---

## 13. Multi-domain Application Examples

### Example 1: Software Engineering — CodeSpace

```yaml
widget_id: "code_space"
inspired_by: "VS Code, CodeSandbox"
domain: "Software Engineering"

inputs:
  - initial_code: string
  - language: enum[javascript, python, typescript, java]
  - hidden_bugs: array<bug>
  - read_only_lines: array<int>
  - time_limit: int (seconds)

events:
  - on_code_change
  - on_run
  - on_bug_fixed

actions:
  - highlight_line
  - inject_error
  - show_hint

key_visual: Code editor với file tree, terminal
typical_use: SE Day 1 (intro), Day 3 (debug crisis), Day 6 (architecture)
```

### Example 2: Medical — PatientMonitor

```yaml
widget_id: "patient_monitor"
inspired_by: "Hospital vital signs displays"
domain: "Medical"

inputs:
  - patient_baseline: object (HR, BP, SpO2, etc.)
  - crisis_events: array<crisis>
  - time_compression: number (1-100x)

events:
  - on_intervention
  - on_alarm_triggered
  - on_patient_status_change

actions:
  - inject_crisis
  - update_vitals
  - trigger_alarm

key_visual: Real-time vital signs, waveforms, alarm panel
typical_use: Medical Day 3 (ER crisis), Day 5 (surgery monitoring)
```

### Example 3: Marketing — CampaignDashboard

```yaml
widget_id: "campaign_dashboard"
inspired_by: "Meta Ads Manager, Google Analytics"
domain: "Marketing"

inputs:
  - campaign_metrics: object (CTR, CAC, ROAS, etc.)
  - budget_constraints: object
  - audience_segments: array<segment>
  - simulation_speed: number

events:
  - on_budget_change
  - on_segment_modified
  - on_campaign_launched

actions:
  - update_metric
  - show_anomaly
  - trigger_alert

key_visual: Charts, KPI cards, audience pie chart, budget sliders
typical_use: Marketing Day 4 (campaign optimization), Day 6 (crisis response)
```

### Common contract pattern

All 3 widgets follow same Manifest structure:
- Inputs (data from scenario)
- Events (emit to scenario)
- Actions (commands from scenario)
- Fidelity levels (Day 1 simple → Day 7 complex)

**Result:** Same Widget Studio screen, completely different widget implementations. Widget engineer learns 1 pattern, applies to N domains.

### Differences highlighted

| Aspect | CodeSpace | PatientMonitor | CampaignDashboard |
|:--|:--|:--|:--|
| **Domain** | SE | Medical | Marketing |
| **Visual complexity** | Medium | High (waveforms) | Medium (charts) |
| **Real-time updates** | Code editor | Vitals streaming | Metric updates |
| **Audio** | None | Alarms (toggleable) | Optional notifications |
| **Critical patterns** | Syntax highlighting | Threshold alarms | Anomaly detection |
| **Bundle size** | ~80KB | ~50KB | ~70KB |
| **Reusability** | Across SE scenarios | Across Medical scenarios | Across Marketing scenarios |

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Widget Engineer |
| **Complexity** | ⭐⭐⭐⭐ |
| **Estimated build time** | 6-8 weeks |
| **Widgets per V1** | 5 (cho SE Hero Major) |
| **Widgets per engineer/V1** | 2-3 |
| **Key technologies** | React, TypeScript, Vite, Storybook, Jest |
| **Critical dependencies** | Design System (Screen 1) |
| **Performance targets** | < 1.5s widget load, < 500ms hot reload |
| **Device support** | Desktop only |
| **Multi-domain** | Yes - widgets cho all majors via container pattern |
| **Biggest challenge** | Maintaining widget contract while adding features |
| **Biggest value** | Widgets are reusable assets across all scenarios |

### Design principles applied

1. ✅ **Contract-first** — Manifest defines stable API
2. ✅ **Test-driven** — 5 test types mandatory
3. ✅ **Container thinking** — One studio, many widgets, all domains
4. ✅ **Versioning discipline** — Semantic versioning, controlled rollout
5. ✅ **Privacy aware** — Widgets don't store user data, only handle session state
