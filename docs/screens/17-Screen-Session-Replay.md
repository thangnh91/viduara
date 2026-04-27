# Screen 17 — Session Replay

**Màn hình số:** 17  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐⭐⭐⭐ (Rất cao — time-travel debugging tool)  
**Primary users:** Operator, Super Admin (Full); Designer, Persona Writer, Engineer (Anonymized)  
**Related flow:** Flow 07 — System Management (Sub-flow B: Orchestration Debug)  
**Dependencies:** Screen 16 (Analytics Dashboard), Screen 7 (Workspace - reused components)

---

## 0. Multi-domain Context

Session Replay là tool đa ngành — replay được sessions từ bất kỳ scenario nào của bất kỳ ngành nào. Stage tái dựng Workspace với data từ recorded session, nên domain phụ thuộc vào scenario được replay.

**Examples used in this spec:**
- **Software Engineering**: SE Day 3 hallucination investigation
- **Medical** (V2): Medical ER session với drug dosage error investigation  
- **Marketing** (V2): Marketing campaign session với metric calculation error

Trong runtime, Investigator chỉ replay 1 session tại 1 thời điểm (1 ngành cụ thể). Section 13 cuối spec sẽ show 3 investigation scenarios cụ thể.

⚠ **Note for readers:** Wireframes sample data dùng SE incident làm ví dụ. Cùng tool, cùng layout, cùng workflow áp dụng cho tất cả ngành.

---

## 1. Mục đích màn hình

Session Replay cho phép admin **xem lại toàn bộ trải nghiệm của một học sinh** từ đầu đến cuối, như "máy quay lại thời gian". Đây là tool quan trọng nhất cho:

- **Debug**: Khi có hallucination hoặc bug, replay session để root cause
- **Improve scenarios**: Designer xem học sinh thực tế tương tác để cải thiện
- **Investigate complaints**: Phụ huynh hoặc học sinh khiếu nại → có evidence
- **Training**: Material để onboard team mới
- **Quality assurance**: Spot-check random sessions để monitor chất lượng

### Metaphor thiết kế

Session Replay giống như **DVR (Digital Video Recorder)** kết hợp với **timeline editor của Premiere Pro**:
- Scrubber timeline để jump bất kỳ moment nào
- Multi-layer view (chat, widget, vitals, AI decisions)
- Playback controls (play, pause, speed)
- Annotations & bookmarks

Hoặc gần hơn: **Chrome DevTools' Performance tab** — trace mọi event, lookup root cause.

### Triết lý: Privacy-first

Session Replay lưu trữ data NHẠY CẢM của học sinh. Nguyên tắc:

1. **Access logged**: Mọi lần xem session đều được audit
2. **3 access levels**: Full / Anonymized / Aggregated — chọn thấp nhất khả thi
3. **Justification required**: Phải có lý do (incident ID) cho Full access
4. **Auto-purge**: Sessions > 90 ngày bị anonymize tự động (chỉ giữ aggregated)
5. **User consent**: Học sinh có thể opt-out để không bị xem (V2 feature)

---

## 2. Users & Use Cases

### Access Levels

#### Level 1: Full Replay
**Who:** Super Admin always; Operator khi có incident ID hợp lệ

**Sees everything:**
- Full chat messages (raw text)
- Widget interactions (real-time)
- AI decisions log
- Stress signals
- All metadata (IP, device, timing)

**Use cases:**
- Critical incident investigation
- Hallucination root cause
- User complaint resolution
- Security investigation

#### Level 2: Anonymized Replay
**Who:** Designer, Persona Writer, Engineer (only sessions related to their work)

**Sees:**
- Chat messages WITH redacted PII (names, locations replaced with [USER])
- Widget interactions (anonymized user input)
- AI decisions log
- Stress signals (pattern, not raw)
- No metadata (no IP, no device fingerprint)

**Use cases:**
- Designer reviewing scenario performance
- Persona Writer studying conversation patterns
- Engineer debugging widget behavior

#### Level 3: Aggregated Stats
**Who:** Curator, all admin roles by default

**Sees:**
- Statistical summaries only
- "Average stress at Day 3 minute 15: 67%"
- "65% of students chose Frontend at Branch Point 1"
- No individual session access

**Use cases:**
- Trend analysis
- Curriculum review
- General monitoring

### Use cases chi tiết

#### UC1: Incident Investigation (Critical)

**Scenario:** Student reported AI gave wrong information about Big O notation

**Flow:**
1. Operator receives ticket with session ID
2. Open Session Replay với Full access
3. Justification: "Incident #INC-2026-0423 — Hallucination report"
4. Jump to timestamp of incident (from log)
5. See full context: what student asked, what AI said, why AI said it
6. Identify root cause (bad prompt, missing knowledge, etc.)
7. Bookmark moment
8. Navigate to Persona Studio / Knowledge Vault to fix
9. Close session với resolution notes

#### UC2: Scenario Quality Review

**Scenario:** Designer wants to see how students actually experience their scenario

**Flow:**
1. Designer opens Session Replay với Anonymized access
2. Filter: Sessions của scenario "SE-v1.2", completed
3. Sample 5 random sessions
4. Watch each at 10x speed
5. Note patterns:
   - Where students get stuck
   - Where AI feels off
   - Branch choices distribution
6. Take notes for next scenario iteration
7. Export anonymized highlights cho team review

#### UC3: Persona Performance Audit

**Scenario:** Persona Writer suspects Mr. Alpha is "drifting" out of character

**Flow:**
1. Filter sessions where Mr. Alpha was active
2. Anonymized access
3. Sample 10 conversations
4. Watch with focus on chat panel
5. Check: tone consistency, off-topic handling, character integrity
6. If issues found: go to Persona Studio to refine prompts

#### UC4: Widget Bug Reproduction

**Scenario:** Student reported CodeSpace widget froze at minute 23

**Flow:**
1. Engineer opens session với Anonymized access
2. Jump to minute 22 (just before issue)
3. Watch widget interactions in detail
4. See exact sequence of events
5. Reproduce bug locally
6. Fix in Widget Studio

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Analytics  >  Session Replay  >  #SES-20260423-7891      │ ← Breadcrumb
│ Access: Full  |  Justification: INC-2026-0423  |  Logged: 14:23 UTC    │ ← Audit bar
├──────────────────────┬──────────────────────────────────────────────────┤
│                      │                                                  │
│  Sessions Sidebar    │              Replay Stage                        │
│                      │           (Recreated Workspace)                  │
│  (Filters & List)    │                                                  │
│                      │                                                  │
│  300px               │                  Variable                        │
│                      │                                                  │
│                      │                                                  │
│                      │                                                  │
├──────────────────────┴──────────────────────────────────────────────────┤
│                                                                         │
│           Timeline Scrubber + Layers + Annotations                      │
│                              200px height                               │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Playback Controls + Speed + Bookmarks + Export                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Audit Bar (Top, persistent)

Khi access Full Replay, banner luôn hiển thị:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔒 FULL ACCESS  |  Justification: INC-2026-0423  |  Started: 14:23 UTC  │
│ ⚠️  This session view is being audited. Student data is sensitive.      │
└─────────────────────────────────────────────────────────────────────────┘
```

**Mục đích:** Constant reminder về privacy + accountability.

### Sessions Sidebar (Left, 300px)

```
┌─────────────────────────────┐
│  FILTERS                    │
│                             │
│  Date range:                │
│  [Last 7 days ▼]            │
│                             │
│  Scenario:                  │
│  [All ▼]                    │
│                             │
│  Outcome:                   │
│  ☑ Completed                │
│  ☑ Burnout                  │
│  ☐ Abandoned                │
│  ☐ In progress              │
│                             │
│  Has incidents:             │
│  ☑ Yes only                 │
│                             │
│  [Apply] [Reset]            │
│                             │
├─────────────────────────────┤
│  RESULTS (47)               │
│                             │
│  ┌───────────────────────┐  │
│  │ #SES-...7891          │  │ ← Selected
│  │ SE-v1.2 • Day 3       │  │
│  │ Burnout exit          │  │
│  │ ⚠ 1 incident flagged  │  │
│  │ 2 hours ago           │  │
│  ├───────────────────────┤  │
│  │ #SES-...7843          │  │
│  │ SE-v1.2 • Day 5       │  │
│  │ Completed             │  │
│  │ 5 hours ago           │  │
│  ├───────────────────────┤  │
│  │ #SES-...7821          │  │
│  │ Marketing-v1 • Day 7  │  │
│  │ Completed             │  │
│  │ ⚠ AI cost spike       │  │
│  │ 1 day ago             │  │
│  └───────────────────────┘  │
│                             │
│  [Load more...]             │
│                             │
├─────────────────────────────┤
│  BOOKMARKS                  │
│                             │
│  📌 Day 3 - 14:23           │
│     "Hallucination point"   │
│  📌 Day 4 - 09:15           │
│     "Branch decision"       │
│                             │
│  [+ Add bookmark]           │
└─────────────────────────────┘
```

### Replay Stage (Main area)

**Recreates the Workspace** that the student saw:

```
┌────────────────────────────────────────────────────────────┐
│  REPLAY  |  Day 3 / 7  |  ⏱ 14:23:42 of 1:08:15           │
├──────────────┬──────────────────────────┬──────────────────┤
│              │                          │                  │
│ COMMUNICATION│    EXECUTION (LogHunter) │   VITALS         │
│ (replayed)   │    (replayed widget)     │   (replayed)     │
│              │                          │                  │
│ #incident-   │  [LogHunter widget       │  STRESS: 87% 🔴 │
│  0423        │   showing logs from      │                  │
│              │   the recorded moment]   │  BUDDY: worried  │
│              │                          │                  │
│ [Messages    │                          │  KNOWLEDGE: 4    │
│  shown up    │                          │                  │
│  to current  │                          │                  │
│  timestamp]  │                          │  Time elapsed:   │
│              │                          │   43:21          │
│              │                          │                  │
└──────────────┴──────────────────────────┴──────────────────┘
```

**Key differences từ Workspace gốc:**
- All zones are **read-only** (cannot interact)
- Top has timestamp showing current playback time
- Borders subtly different color (indicate "playback mode")
- No real-time AI calls (everything from recording)

### Anonymization indicators (when applicable)

Khi access là Anonymized:

```
┌──────────────┐
│ # incident-  │
│  0423        │
│              │
│ [USER]:      │
│ "Em không    │
│  hiểu sao    │
│  server lại  │
│  sập ạ"      │
│ 2:15 AM      │
│                          
│ Mr. Alpha:   │
│ "Đó là vì... │
│  ..."        │
│ 2:16 AM      │
└──────────────┘
```

- Tên student → `[USER]`
- Locations → `[LOCATION]`
- Personal details → `[REDACTED]`

### Timeline Scrubber (Bottom, 200px)

**Most important feature** — scrub through entire session:

```
┌─────────────────────────────────────────────────────────────────┐
│ TIMELINE                                                        │
│                                                                 │
│ Day 1     Day 2     Day 3       Day 4    Day 5   Day 6   Day 7 │
│ ━━━━━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                       ▲                                         │
│                       Current: Day 3 14:23:42                   │
│                                                                 │
│ LAYERS                                                          │
│                                                                 │
│ Chat:        ━━━━━●━━━●━━━●━━━━●●━━●━━━━●━━━━━━━━━━━━━━━━━━━━│
│ Widget:      ━━━━━━━━━●━━━━━●━━━━━━━●━━━━●━━●━━━━━━━━━━━━━━━━│
│ AI Decisions:━━━━━━━━━━━━━●━━━━━━●━━━━━●━━━━━━━━━━━━━━━━━━━━│
│ Stress:      ░░░░░▓▓▓▓▓▓▓▓████████████████▓▓▓▓░░░░░░░░░░░░░│ ← Heatmap
│ Incidents:   ━━━━━━━━━━━━━━━━━━⚠━━━━━━━━━━━━━━━━━━━━━━━━━━━│ ← Bookmarks
│                                                                 │
│ [Click any layer dot to jump to that event]                    │
└─────────────────────────────────────────────────────────────────┘
```

**Layer descriptions:**

- **Chat layer**: Each dot = a message sent (color-coded by speaker)
- **Widget layer**: Each dot = significant widget interaction
- **AI Decisions layer**: Each dot = AI persona decided to act (visible only to admin)
- **Stress heatmap**: Color intensity = stress level over time
- **Incidents**: Bookmarks for flagged moments

**Scrubber interactions:**
- Click anywhere on timeline → jump to that time
- Drag scrubber handle → smooth scrub (preview updates)
- Mouse hover → tooltip preview (mini chat snippet)

### Playback Controls (Very bottom)

```
┌─────────────────────────────────────────────────────────────────┐
│  ⏮ ⏪ ⏯ ⏩ ⏭   Speed: [1x ▼]   📌 Bookmark   📤 Export   ✏️ Notes│
│                                                                 │
│  [|<] [<<] [▶/❚❚] [>>] [>|]                                     │
│                                                                 │
│  Speed options: 0.5x | 1x | 2x | 5x | 10x | 25x                │
└─────────────────────────────────────────────────────────────────┘
```

**Controls:**

- ⏮ **Restart** — back to session start
- ⏪ **Back 30s** — quick rewind
- ⏯ **Play/Pause** — main control (Space key)
- ⏩ **Forward 30s** — quick skip
- ⏭ **End** — jump to session end
- **Speed selector**: Critical for efficiency
  - 1x for detailed observation
  - 5-10x for browsing
  - 25x for skimming entire 7-day session
- 📌 **Bookmark** current moment với note
- 📤 **Export** options:
  - Anonymized PDF report
  - Video clip (10-second window)
  - JSON event log
- ✏️ **Notes** — add investigation notes

### Investigation Panel (Optional overlay, right side)

When investigating, can open analysis panel:

```
┌─────────────────────────────────┐
│ INVESTIGATION                   │
│                                 │
│ Current moment context:         │
│                                 │
│ Time: Day 3, 14:23:42           │
│ Active widget: LogHunter        │
│ Active personas: Alpha, Boss    │
│                                 │
│ AI Decision Trace:              │
│ ─────────────────────────       │
│ At 14:23:40                     │
│ • Trigger fired:                │
│   "wrong_attempts >= 3"         │
│ • Priority: Alpha (0.9)         │
│   over Buddy (0.3)              │
│ • Alpha generated:              │
│   "Ba lần rồi..."               │
│ • Guardrail check: PASS         │
│ • Latency: 1,243ms              │
│ • Cost: $0.0034                 │
│                                 │
│ Shared Context Snapshot:        │
│ {                               │
│   "stress_level": 87,           │
│   "wrong_attempts": 3,          │
│   "alpha_last_tone":            │
│     "instructional"             │
│ }                               │
│                                 │
│ [Inspect prompt]                │
│ [View knowledge sources used]   │
│ [Compare with other sessions]   │
│                                 │
└─────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Playback Behavior

**Real-time vs. Discrete events:**

- **Continuous** (smoothly interpolated): Stress meter, time, vignette intensity
- **Discrete** (instant on event): Chat messages, widget actions, AI responses

When playing at faster speeds:
- 5x: All animations preserved
- 10x: Animations skip mid-frame
- 25x: Only key frames shown (fast scan mode)

### Time-jumping

**Jumping mid-session:**
- Stage rebuilds state up to that timestamp (~500ms reconstruct time)
- Shows loading: "Reconstructing state..."
- All zones snap to correct state

**Jumping with playback paused:**
- Instant snap to that moment
- Resume play from new position

### Multi-session comparison (V2 feature)

Side-by-side comparison of 2 sessions:

```
┌──────────────────────────┬──────────────────────────┐
│ Session #SES-7891        │ Session #SES-8234        │
│ Burnout exit             │ Completed normally       │
│                          │                          │
│ [Sync playback]          │                          │
│ [Compare metrics]        │                          │
└──────────────────────────┴──────────────────────────┘
```

### Keyboard shortcuts

| Shortcut | Action |
|:--|:--|
| `Space` | Play/Pause |
| `←` `→` | Back/Forward 5s |
| `Shift + ← →` | Back/Forward 30s |
| `↑` `↓` | Speed up/down |
| `0-9` | Jump to 0%, 10%, ..., 90% |
| `B` | Add bookmark |
| `N` | Add note |
| `E` | Export current view |
| `J` | Jump to next AI decision |
| `K` | Jump to next chat message |
| `L` | Jump to next widget interaction |

---

## 5. States

### State 1: Initial (Session Selection)

Show sessions sidebar, empty stage:

```
┌─────────────────────────────────────────┐
│                                         │
│           🎬                            │
│                                         │
│      Select a session to replay         │
│                                         │
│   Use filters to find specific sessions │
│   or click any from the list on left.   │
│                                         │
│   Recent sessions với incidents:        │
│   ⚠ #SES-7891 (2 hours ago)            │
│   ⚠ #SES-7821 (1 day ago)              │
│                                         │
└─────────────────────────────────────────┘
```

### State 2: Loading session

```
Reconstructing session state...

[==============>     ] 75%

Loading: Day 3 events
```

### State 3: Justification Required (Full Access)

Modal block khi try Full access:

```
┌─────────────────────────────────────────┐
│  ⚠️ Full Access Requires Justification  │
│                                         │
│  This will reveal sensitive student     │
│  data including raw chat and PII.      │
│                                         │
│  Reason for access:                     │
│  ○ Incident investigation               │
│  ○ User complaint resolution            │
│  ○ Security audit                       │
│  ○ Other (specify below)                │
│                                         │
│  Reference ID:                          │
│  ┌─────────────────────────────┐        │
│  │ INC-2026-0423              │        │
│  └─────────────────────────────┘        │
│                                         │
│  Notes (optional):                      │
│  ┌─────────────────────────────┐        │
│  │                             │        │
│  └─────────────────────────────┘        │
│                                         │
│  ☑ I understand this access is logged  │
│  ☑ I will not share data publicly      │
│                                         │
│  [Cancel]  [Grant Full Access]          │
│                                         │
└─────────────────────────────────────────┘
```

### State 4: Active Replay

Stage and timeline active. Most common state.

### State 5: Investigating (Notes open)

```
[Stage on left]  [Notes panel on right]

Notes for #SES-7891:
─────────────────────
14:23 — Alpha gave wrong info about Big O.
        Root cause: prompt missing strict accuracy rule.
        Action: Update Alpha system prompt.

14:45 — Boss Nam pinged 8 times in 5 minutes.
        Possibly contributed to burnout.
        Action: Tone down Boss aggression after stress > 80%.

[Save notes]  [Convert to incident report]
```

### State 6: Export in progress

```
Exporting anonymized session report...

[==========>          ] 50%

This may take 1-2 minutes for full sessions.
You'll receive an email when ready.
```

### State 7: Empty results (filter mismatch)

```
No sessions match your filters.

Try:
- Expanding date range
- Removing scenario filter
- Including in-progress sessions

[Reset filters]
```

### State 8: Access denied

If user lacks permission:

```
🔒 Access Denied

You don't have permission to view this session.

This session contains data from:
- Scenario: SE-v1.2 (you don't own)
- Persona: Mr. Alpha (you didn't create)

To request access, contact Super Admin.

[Go back to Analytics]
```

---

## 6. Data Flow

### Inputs

```yaml
session_data:
  source: PostgreSQL (raw events) + Object Storage (snapshots)
  format: Time-series events + state snapshots every 30s
  
event_types:
  - chat_message
  - widget_interaction
  - widget_state_change
  - ai_persona_response
  - ai_decision_made
  - shared_context_update
  - vitals_change
  - trigger_activated
  - branch_choice_made
  - day_transition

permissions:
  source: Auth service
  determines: Access level (Full/Anonymized/Aggregated)
```

### Reconstruction Algorithm

```
1. Load session metadata
2. Load nearest state snapshot before requested time
3. Load all events from snapshot to requested time
4. Apply events sequentially to reconstruct state
5. Render reconstructed state in stage
```

**Performance optimization:**
- Snapshots every 30 seconds
- Max events to apply: ~600 per snapshot interval
- Reconstruction time: < 500ms typically

### Outputs (events emitted)

```yaml
audit_events:
  - session_replay_accessed
    metadata: {session_id, access_level, justification, reference_id, user_id}
  - session_bookmark_added
  - session_notes_saved
  - session_exported
  - investigation_completed

analytics_events:
  - replay_session_started
  - replay_duration
  - bookmarks_count
  - export_format
```

### API endpoints

```yaml
GET  /api/replay/sessions              # List sessions với filters
GET  /api/replay/session/:id           # Get session metadata
GET  /api/replay/session/:id/state     # Reconstruct state at timestamp
GET  /api/replay/session/:id/events    # Stream events
POST /api/replay/access-request        # Request Full access (creates audit log)
POST /api/replay/bookmark              # Add bookmark
POST /api/replay/notes                 # Save investigation notes
POST /api/replay/export                # Export session report
GET  /api/replay/incidents             # List flagged sessions
```

---

## 7. Permission Checks

| Role | Default Access | Conditions for Higher |
|:--|:--|:--|
| `super_admin` | Full | Always |
| `operator` | Anonymized | Full với justification + incident ID |
| `designer` | Anonymized | Only sessions của scenarios mình design |
| `persona_writer` | Anonymized | Only sessions where persona mình tạo was used |
| `engineer` | Anonymized | Only sessions where widget mình build was used |
| `curator` | Aggregated | Cannot see individual sessions |
| `learner` | None | Cannot access |
| `parent` | None | Cannot access (privacy of other students) |

### Audit Log Entries

Every access creates entry:

```yaml
audit_entry:
  timestamp: "2026-04-23T14:23:00Z"
  user_id: "operator_001"
  user_name: "Hà Trần"
  user_role: "operator"
  
  action: "session_replay_accessed"
  
  target:
    session_id: "SES-20260423-7891"
    student_id: "student_anonymous_xyz"  # not real ID
    scenario_id: "SE-v1.2"
  
  access_level: "full"
  justification: "Hallucination investigation"
  reference_id: "INC-2026-0423"
  
  ip_address: "10.0.0.5"
  duration_seconds: 1247  # how long viewed
  
  consent_acknowledged: true
```

---

## 8. Edge Cases

### Case 1: Session corrupted (events missing)

**Detection:** Reconstruction fails or shows obvious gaps

**Behavior:**
- Show warning banner: "Some events may be missing"
- Highlight gap in timeline (red marker)
- Still show what's available
- Log corruption issue cho infra team

### Case 2: Trying to view session > 90 days old

**Behavior:**
- Auto-purged data → only aggregated stats
- Show: "Session data archived. Only summary available."
- Show summary view instead of full replay

### Case 3: Concurrent investigators

**Scenario:** 2 operators viewing same session simultaneously

**Behavior:**
- Both can view (no lock — read-only)
- Show indicator: "Hà Trần is also viewing this session"
- Notes collaborative (shared workspace cho session)

### Case 4: Student requests data deletion (GDPR)

**Flow:**
- Right to be forgotten request
- Session data → fully anonymized (or deleted if requested)
- Aggregated stats preserved
- Investigators see: "Data anonymized per user request"

### Case 5: Session is currently in progress (live)

**Behavior:**
- Show "Live session" indicator
- Replay limited to events recorded so far
- Auto-refresh option (poll every 30s)
- Cannot replay future timestamps

### Case 6: Network interruption during replay

**Behavior:**
- Pause playback gracefully
- Show "Connection lost — reconnecting..."
- Buffer last 30s of events
- Resume seamlessly when reconnected

### Case 7: AI decision data missing for old sessions

**Scenario:** Sessions from before AI decision logging was added

**Behavior:**
- Hide AI Decisions layer in timeline
- Show note: "AI decision logging added 2026-03-15. Older sessions don't have this data."

### Case 8: Investigator accidentally exposes screen

**Mitigation:**
- Auto-blur option after 5 min idle
- "Privacy mode" hotkey (Ctrl+Shift+P) to instantly blur
- Re-authenticate after blur

---

## 9. Responsive Considerations

### Desktop (1440px+) — Primary

Full layout as described. Optimal for investigation work.

### Laptop (1024-1440px)

- Sessions sidebar collapsible (icon-only)
- Stage shrinks proportionally
- Timeline still full-width
- Investigation panel becomes overlay

### Tablet (768-1024px)

- Sessions sidebar = drawer
- Stage = main view
- Timeline below
- Limited functionality recommended
- Warning: "Best on desktop"

### Mobile (< 768px)

**Not supported.** Show message:

```
🔒 Session Replay requires desktop.

This is an investigation tool with sensitive data
that requires careful screen management.

Please use a desktop computer.
```

---

## 10. Performance Requirements

### Critical metrics

- **Session list load**: < 1s for 100 results
- **Initial reconstruction**: < 2s for any timestamp
- **Scrubber response**: < 100ms after release
- **Playback at 1x**: smooth 60 FPS
- **Playback at 25x**: maintain 30 FPS minimum
- **Memory**: < 500MB cho session 7 ngày

### Optimization strategies

- **Lazy event loading**: Only load events near current playback time
- **Snapshot pre-loading**: Pre-fetch next snapshot during playback
- **Worker threads**: Reconstruction in Web Worker (don't block UI)
- **Virtual scrolling**: Sessions list with thousands of items
- **Compressed event storage**: gzip events on backend
- **Caching**: IndexedDB cache cho recently viewed sessions

---

## 11. Accessibility

### Keyboard navigation
- All controls keyboard-accessible
- Tab order logical
- Shortcuts documented in `?` help modal

### Screen reader
- Timeline events announced on focus
- Playback state changes announced
- Time changes announced (configurable frequency)
- Stage state described on demand

### Visual
- High contrast mode
- Heatmap colors có alternative pattern fallback
- Subtitle option cho audio cues (if applicable)

### Motion
- Respect `prefers-reduced-motion`
- Smooth transitions can be disabled
- Stress vignette can be reduced

---

## 12. Visual Design Notes

### Color application

**Differentiate from real Workspace:**

- **Stage borders**: `--ink-300` (more muted than `--ink-900` of real Workspace)
- **Replay tint**: subtle gray overlay on stage (5% opacity) — indicates "not live"
- **Audit bar**: `--signal-alert` background (amber) — constant reminder
- **Sensitive data**: highlighted với `--signal-stress` (red) tint
- **Anonymized fields**: `[USER]` shown in `--ink-500` italic

### Timeline colors

- **Chat dots**: Color-coded by persona (Alpha = ink, Chip = lumina, Boss = stress)
- **Widget dots**: `--ink-700`
- **AI Decisions dots**: `--lumina-500`
- **Stress heatmap**: gradient from `--signal-calm` to `--signal-stress`
- **Bookmarks**: `--lumina-500` flag icons

### Typography

- **Event timestamps**: JetBrains Mono 12px (precise, technical feel)
- **Notes**: Inter Tight 14px (writeable)
- **Audit info**: JetBrains Mono 11px uppercase (forensic feel)

### Iconography

- Playback controls: Lucide media icons (play, pause, skip)
- Bookmark: Pin/flag icons
- Investigation: Magnifying glass, document icons
- Privacy/lock: Shield, lock icons

---

## 13. Multi-domain Application Examples

Session Replay tool universal — replay được sessions từ mọi ngành. Stage tái dựng exactly Workspace mà student đã thấy. Đây là 3 investigation scenarios cụ thể:

### Investigation 1: SE Hallucination — Mr. Alpha Big O Error

**Context:**
- Student báo cáo: "Mr. Alpha nói wrong info về Big O notation"
- Incident ID: INC-2026-0423
- Operator opens Full Replay với justification

**Investigation flow:**
1. Jump to timestamp 14:23 (reported time)
2. Stage rebuilds: SE Day 3 Workspace với LogHunter widget
3. Chat shows:
   - Student: "Mr. Alpha, sorting algorithm này complexity là gì?"
   - Mr. Alpha: "Quick sort luôn là O(n log n)" ← WRONG
4. Investigation Panel reveals AI Decision Trace:
   - Trigger: student_question_about_complexity
   - Knowledge sources used: NONE (hallucination!)
   - Should have: cite from "Big O Notation" knowledge card
5. Root cause: Persona prompt missing "always cite knowledge cards for technical facts"
6. Action: Open Persona Studio → Update Mr. Alpha system prompt
7. Bookmark moment for documentation
8. Close session

**Outcome:** Persona patched in 2 hours, regression test added

### Investigation 2: Medical Error — Dr. Linh Drug Dosage

**Context:**
- Student ghi: "Dr. Linh suggested wrong drug dosage"
- Severity: HIGH (potential safety implication)
- Super Admin opens Full Replay immediately

**Investigation flow:**
1. Stage rebuilds: Medical Day 5 Workspace với PrescriptionForm widget
2. Chat shows:
   - Student: "Liều paracetamol cho bệnh nhân 65kg?"
   - Dr. Linh: "1500mg mỗi 4 giờ" ← INCORRECT (max 1000mg, every 6h)
3. Investigation Panel:
   - Knowledge card "Drug Interactions" was outdated (>1 year)
   - Persona used cached info instead of fresh card
4. Root cause: Knowledge Vault has outdated drug card
5. Cascade actions:
   - Curator updates drug knowledge card immediately
   - All Medical scenarios paused (safety hold)
   - Existing students notified với correction
6. Persona re-tested
7. Scenarios reopened

**Outcome:** Patient safety prioritized — temporary scenario hold acceptable

### Investigation 3: Marketing Calculation — Anh Tùng CAC Error

**Context:**
- Student báo: "Anh Tùng calculated CAC wrong"
- Severity: MEDIUM (educational accuracy)

**Investigation flow:**
1. Stage rebuilds: Marketing Day 4 Workspace với CampaignDashboard widget
2. Chat shows:
   - Student: "Anh ơi, CAC tuần này là bao nhiêu?"
   - Anh Tùng: "Total spend / total signups = 200/50 = $4" ← MATH OK but missing context
3. Investigation Panel:
   - Anh Tùng explained correctly mathematically
   - But missed: CAC should be paid signups only, not free trial
   - Edge case in prompt
4. Root cause: Prompt edge case không cover B2B distinction
5. Action:
   - Update Anh Tùng prompt với clarification
   - Add knowledge card "CAC nuances" for future reference

**Outcome:** Education quality improved without urgent action

### Comparison: Same Replay tool, different investigation depths

| Aspect | SE Hallucination | Medical Error | Marketing Calc |
|:--|:--|:--|:--|
| **Severity** | Medium (educational) | HIGH (safety) | Medium (accuracy) |
| **Speed needed** | Standard | Immediate | Standard |
| **Stakeholders involved** | Operator + Persona Writer | Super Admin + Curator + Medical Lead | Operator + Persona Writer |
| **Cascade actions** | Patch persona | Pause scenarios + update knowledge | Update prompt + add card |
| **Audit trail emphasis** | Standard | EXTREME (potential liability) | Standard |
| **Learning recorded** | Persona prompt rule | Drug card update process | Edge case documentation |
| **Recovery time** | 2 hours | 24 hours (safety review) | 4 hours |

**Key insight:** Same tool, same UI, same workflow. Severity và domain context determine depth of investigation và cascade response.

### Cross-domain audit patterns

Session Replay enables learning across domains:
- **Pattern: AI hallucinations cluster around** specific topics (Big O in SE, drug dosages in Medical, metric calculations in Marketing)
- **Pattern: Outdated knowledge cards** consistently cause errors regardless of domain
- **Pattern: Edge cases in prompts** miss domain-specific nuances (B2B vs B2C in Marketing)

These patterns inform platform-wide improvements (Knowledge Vault refresh policies, Persona Studio prompt templates, etc.)

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Operator (Full); Designer/Writer/Engineer (Anonymized) |
| **Complexity** | ⭐⭐⭐⭐⭐ (highest among admin tools) |
| **Frequency of use** | Daily (small subset of sessions) |
| **Estimated build time** | 8-12 weeks |
| **Key technologies** | Time-series DB, WebSocket, Canvas/SVG timeline, Web Workers |
| **Critical dependencies** | Screen 7 (Workspace components reused), Screen 16 (Analytics integration) |
| **Performance targets** | < 2s reconstruction, smooth playback at 25x |
| **Device support** | Desktop ONLY |
| **Privacy** | Highest concern — 3 access levels, full audit |
| **Biggest risk** | Privacy breach, data leak |
| **Biggest value** | Tool that makes LUMINA debuggable & improvable |

### Design principles applied

1. ✅ **Privacy-first** — Every interaction defaults to least access
2. ✅ **Audit always** — No untracked access
3. ✅ **Investigators are humans** — Notes, bookmarks, collaboration
4. ✅ **Time is dimension** — Scrubber-first design
5. ✅ **Data fidelity** — Reconstruct exactly what student saw
