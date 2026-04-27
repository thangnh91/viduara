# Screen 09 — Widget Preview

**Màn hình số:** 9  
**Phase:** A — Foundation & Studios (sub-screen)  
**Complexity:** ⭐⭐ (Trung bình thấp)  
**Primary users:** Scenario Designer, Engineer (testing)  
**Related flow:** Flow 04 — Tạo kịch bản (browse widgets)  
**Dependencies:** Screen 14 (Widget Catalog), Screen 4 (Widget Studio)

---

## 0. Multi-domain Context

Widget Preview là modal/page hiển thị widget nào đó với mock data — designer hoặc engineer có thể xem widget hoạt động trước khi commit. Hỗ trợ tất cả widgets từ mọi ngành.

**Examples used in this spec:**
- Preview CodeSpace với mock SE code
- Preview PatientMonitor với mock patient data
- Preview CampaignDashboard với mock metrics

---

## 1. Mục đích màn hình

Widget Preview là **try-before-buy** experience:

**3 chức năng cốt lõi:**

1. **Visual preview** — See widget rendered với realistic data
2. **Interaction test** — Click, type, simulate inputs
3. **Configuration explore** — Try different fidelity levels và inputs

### Metaphor thiết kế

Widget Preview giống như **Storybook story** — isolated component với controls.

### Triết lý: "See It In Action"

ASCII description hoặc static screenshot không đủ. Designer cần:
- See widget visually
- Interact với mock data
- Try edge cases
- Decide if fits scenario

---

## 2. Users & Use Cases

### Primary user: Scenario Designer

Browsing Widget Catalog, click "Preview" → modal opens.

### Secondary user: Engineer

Testing widget mình build với real-feel data.

### Use cases chi tiết

#### UC1: Designer evaluates widget

**Flow:**
1. Catalog → click "Preview" on PatientMonitor
2. Modal opens với mock patient (stable)
3. Try different presets (crisis, recovery)
4. Adjust fidelity level
5. Decide: "Yes, fits Day 3 Medical"
6. Click "Add to scenario"

#### UC2: Engineer demos widget

**Flow:**
1. Engineer builds CampaignDashboard
2. Share preview link với team
3. Team views in browser
4. Provides feedback

---

## 3. Layout & Structure

### Modal view (from Catalog)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Background dimmed]                                                 │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐     │
│   │  Widget Preview: PatientMonitor                       ✕  │     │
│   ├───────────────────────────────────────────────────────────┤     │
│   │                                                           │     │
│   │   Mock data:                                              │     │
│   │   [Stable Patient ▼]                                      │     │
│   │    • Stable Patient                                       │     │
│   │    • ER Crisis                                            │     │
│   │    • Surgery Prep                                         │     │
│   │    • Recovery Phase                                       │     │
│   │    • Custom...                                            │     │
│   │                                                           │     │
│   │   Fidelity:    [● Beginner  ○ Intermediate  ○ Advanced]   │     │
│   │                                                           │     │
│   │   Viewport:    [○ Workspace size  ● Mobile  ○ Tablet]     │     │
│   │                                                           │     │
│   │   ─────────────────────────────────────────────────       │     │
│   │                                                           │     │
│   │   ┌─────────────────────────────────────────────────┐     │     │
│   │   │                                                 │     │     │
│   │   │         [WIDGET RENDERS HERE]                   │     │     │
│   │   │                                                 │     │     │
│   │   │         Live, interactive widget               │     │     │
│   │   │                                                 │     │     │
│   │   └─────────────────────────────────────────────────┘     │     │
│   │                                                           │     │
│   │   ─── INTERACTION SIMULATION ───                          │     │
│   │                                                           │     │
│   │   Try triggering events:                                  │     │
│   │   [▶ Inject Cardiac Event]                                │     │
│   │   [▶ Trigger Sepsis Cascade]                              │     │
│   │   [▶ Reset to baseline]                                   │     │
│   │                                                           │     │
│   │   Events log:                                             │     │
│   │   ┌─────────────────────────────────┐                     │     │
│   │   │ 14:23:45 Widget mounted         │                     │     │
│   │   │ 14:24:01 [Test] Cardiac event   │                     │     │
│   │   │ 14:24:02 HR rising: 95          │                     │     │
│   │   │ 14:24:03 ALARM: Tachycardia     │                     │     │
│   │   └─────────────────────────────────┘                     │     │
│   │                                                           │     │
│   │   ─── ACTIONS ───                                         │     │
│   │                                                           │     │
│   │   [➕ Add to scenario] [🔀 Open in Studio] [✕ Close]     │     │
│   │                                                           │     │
│   └───────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Standalone page (sharable URL)

Same content, full-page layout:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  Widget Preview: PatientMonitor             [⤴ Share]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Same content as modal, full width]                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Interactions

### Mock data switching

- Preset dropdown changes data immediately
- Widget re-renders smoothly
- Custom data option: opens JSON editor

### Fidelity selector

- Toggle between Beginner / Intermediate / Advanced
- Widget UI adapts (more features visible)
- Preview matches what students at that level will see

### Viewport simulator

- Resize widget container
- Test responsive behavior
- See how widget adapts

### Event triggering

- Buttons to fire events
- Useful cho testing dynamic states
- Helps designer understand widget behavior

---

## 5. States

### State 1: Loading

Skeleton placeholder while widget loads.

### State 2: Default

Stable mock data, beginner fidelity, workspace viewport.

### State 3: Interacting

User actively triggering events, widget responding.

### State 4: Custom data editor

JSON editor for custom mock data:

```
{
  "patient_baseline": {
    "hr": 72,
    "bp": "120/80",
    "spo2": 98,
    "temp": 36.5
  },
  "crisis_events": []
}
```

### State 5: Widget error

If widget fails to load:

```
⚠ Widget failed to load

Error: PatientMonitor v0.5 - Module not found

[Retry] [Open in Studio] [Report]
```

### State 6: Browser incompatibility

```
⚠ This widget requires Chrome 90+

Your browser: Chrome 88
[Update browser]
```

---

## 6. Data Flow

### Inputs

```yaml
from_widget_registry:
  - widget_code
  - widget_manifest
  - default_mock_presets

from_user:
  - selected_preset
  - selected_fidelity
  - selected_viewport
  - custom_data (if any)
```

### Outputs

```yaml
events:
  - preview.opened
  - preset.switched
  - fidelity.changed
  - event.triggered
  - widget.added_to_scenario
```

### API Endpoints

```yaml
GET    /api/widgets/:id/preview          # Load widget for preview
GET    /api/widgets/:id/mock-presets     # Available presets
POST   /api/widgets/:id/preview-event    # Simulate event
POST   /api/widgets/:id/preview-share    # Generate shareable link
```

---

## 7. Permission Checks

| Action | Designer | Engineer | Others |
|:--|:-:|:-:|:-:|
| Preview widget | ✅ | ✅ | ✅ |
| Switch presets | ✅ | ✅ | ✅ |
| Custom mock data | ✅ | ✅ | ❌ |
| Add to scenario | ✅ | ❌ | ❌ |
| Open in Studio | ❌ | ✅ | ❌ |
| Share preview link | ✅ | ✅ | ✅ |

---

## 8. Edge Cases

### Case 1: Widget needs external API

- Show "API mocked" indicator
- Don't make real calls
- Use realistic fake data

### Case 2: Widget has heavy dependencies

- Lazy-load
- Show progress
- Cache if frequently previewed

### Case 3: Designer wants compare 2 widgets

- Side-by-side preview (V2)
- Same mock data
- Highlight differences

---

## 9-12. Standard sections

(Responsive: Modal sized, mobile = full-screen)
(Performance: < 2s widget load)
(Accessibility: Keyboard nav, focus management)
(Visual: Modal với shadow-lg, semi-transparent backdrop)

---

## 13. Multi-domain Examples

### Preview CodeSpace (SE)

Mock data presets:
- "Empty editor" (beginner)
- "Buggy server code" (intermediate)
- "Complex algorithm" (advanced)

### Preview PatientMonitor (Medical)

Mock presets:
- "Stable patient" (training)
- "Cardiac event" (crisis)
- "Sepsis cascade" (deteriorating)

### Preview CampaignDashboard (Marketing)

Mock presets:
- "Campaign launch" (Day 1)
- "Performance drop" (crisis)
- "Recovery phase" (post-fix)

**Each widget showcases its unique capabilities.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Designer |
| **Complexity** | ⭐⭐ |
| **Estimated build time** | 2-3 weeks |
| **Multi-domain** | Yes - any widget previewable |
| **Biggest value** | Reduce decision friction in widget selection |
