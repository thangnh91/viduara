# Screen 13 — Orchestrator Console

**Màn hình số:** 13  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐⭐⭐ (Cao)  
**Primary users:** Persona Writer, Super Admin  
**Related flow:** Flow 07 — System Management (Sub-flow B: Orchestration Debug)  
**Dependencies:** Screen 3 (Persona Studio), Screen 16 (Analytics), Screen 17 (Session Replay)

---

## 0. Multi-domain Context

Orchestrator Console là cấu hình meta — cách các AI personas phối hợp với nhau, không phụ thuộc ngành cụ thể. Tuy nhiên, vì mỗi scenario có cast khác nhau, mỗi scenario có Priority Matrix riêng.

**Examples used in this spec:**
- **SE scenario**: Mr. Alpha + Chip + Boss Nam coordination
- **Medical scenario**: Dr. Linh + Chip + Y tá Trang coordination
- **Marketing scenario**: Anh Tùng + Chip + Chị Mai coordination
- **Cross-scenario rules**: Story Director priority luôn cao nhất

---

## 1. Mục đích màn hình

Orchestrator Console là nơi **cấu hình cách các AI personas phối hợp** trong scenarios. Đây là layer "đạo diễn vô hình" — quyết định:

- AI nào nên nói trước khi có nhiều AI muốn phản ứng cùng event?
- Khi nào AI A nên im lặng để AI B có không gian?
- Làm thế nào để AI không nói mâu thuẫn với nhau?
- Khi nào Story Director nên override các personas khác?

**Đây là màn hình "thầm lặng nhưng quyết định chất lượng":**

Persona Studio tạo "diễn viên giỏi". Nhưng nếu không có "đạo diễn" tốt, các diễn viên giỏi vẫn sẽ giẫm chân lên nhau, tạo trải nghiệm hỗn loạn.

**5 chức năng cốt lõi:**

1. **Configure Priority Matrix** per scenario — ai nói trước, ai im lặng
2. **Set Shared Context Rules** — AI nào đọc gì từ shared state
3. **Define Coordination Patterns** — preset behaviors common
4. **Test Orchestration** — simulate multi-AI scenarios
5. **Monitor Live Issues** — alerts khi AIs mâu thuẫn

### Metaphor thiết kế

Orchestrator Console giống như **mixing console của sound engineer**:
- Mỗi AI là một channel
- Sliders điều chỉnh "volume" (priority weight) của mỗi AI
- EQ và effects (timing rules, delays)
- Master output = trải nghiệm tổng thể

Hoặc gần với **traffic control system** ở sân bay — đảm bảo nhiều "máy bay AI" đáp xuống đúng lúc, không va chạm.

### Triết lý: AI Coordination > AI Quality

Một AI giỏi nói sai lúc còn tệ hơn một AI vừa nói đúng lúc.

LUMINA's competitive advantage không phải là model AI mạnh nhất (everyone has same models), mà là **orchestration tinh tế** giữa nhiều AIs để tạo experience natural.

---

## 2. Users & Use Cases

### Primary user: Persona Writer

**Why Persona Writer (not Engineer)?**

Orchestration là **về behavior coordination**, không phải về code. Persona Writer hiểu rõ:
- Mr. Alpha nói gì khi student sai
- Chip nói gì khi student stress
- Khi nào 2 AIs có thể nói cùng lúc, khi nào không

→ Đây là extension của persona work, không phải technical work.

### Secondary user: Super Admin

- Approve orchestration changes
- Set platform-wide rules (override scenario-specific)
- Emergency adjust khi production issues

### Tertiary users (read-only)

- **Designer**: View để hiểu cách AIs sẽ behave trong scenario
- **Operator**: View khi debug issues
- **Engineer**: View để biết technical constraints

### Use cases chi tiết

#### UC1: Setup orchestration cho new scenario

**Example:** Designer just created "Marketing Crisis Day 5" scenario với 3 personas

**Flow:**
1. Open Orchestrator Console
2. Select scenario "Marketing Crisis Day 5"
3. View auto-generated default Priority Matrix
4. Customize:
   - "Khi student gives gut decision → Anh Tùng priority 0.9, Chip 0.2 (delayed)"
   - "Khi student stress > 80 → Chip priority 0.95, Anh Tùng priority 0.0"
   - "Khi Day 5 climax event → Story Director override all"
5. Test với playground simulation
6. Submit for review

#### UC2: Debug AI contradiction issue

**Example:** Operator reports Alpha and Chip giving conflicting advice

**Flow:**
1. From Analytics Dashboard → click into incident
2. Open Orchestrator Console với scenario context
3. Inspect Priority Matrix for trigger event
4. Identify: Both Alpha and Chip set to high priority cho same event
5. Fix: Lower Chip priority, add delay
6. Test in playground
7. Deploy fix

#### UC3: Set platform-wide rules

**Example:** Story Director should ALWAYS take priority cho key events

**Flow:**
1. Super Admin opens Console
2. Go to "Platform Rules" tab
3. Add rule: "type=director events override all character events"
4. Apply to all scenarios
5. Existing scenarios respect new rule

#### UC4: Test orchestration before deploy

**Example:** Before deploying new scenario, verify AIs work together

**Flow:**
1. Open Console for scenario
2. Click "Test Orchestration"
3. Simulate 20 different events
4. Review AI responses (who spoke, in what order)
5. Identify issues (e.g., Chip never speaks because Alpha always wins)
6. Adjust priorities
7. Re-test until satisfied

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Operations  >  Orchestrator Console  >  Marketing Day 5   │
├─────────────────┬───────────────────────────────────┬───────────────────┤
│                 │                                   │                   │
│ Scenarios       │        Configuration Area         │    Live Test      │
│ Sidebar         │                                   │    Playground     │
│                 │   Tabs: Priority Matrix |         │                   │
│ 280px           │   Shared Context | Patterns |     │      400px        │
│                 │   Platform Rules                  │                   │
│                 │                                   │                   │
│                 │              720px                │                   │
│                 │                                   │                   │
├─────────────────┴───────────────────────────────────┴───────────────────┤
│  Status: Marketing Day 5 v0.8 | 3 personas active | ⚠ 1 conflict alert │
└─────────────────────────────────────────────────────────────────────────┘
```

### Scenarios Sidebar (Left, 280px)

```
┌─────────────────────────────┐
│  SCENARIOS                  │
│                             │
│  Filter:                    │
│  Domain: [All ▼]            │
│  Status: [Production ▼]     │
│                             │
├─────────────────────────────┤
│  ▼ Software Engineering (3) │
│  ┌───────────────────────┐  │
│  │   SE Day 1 (Onboard)  │  │
│  │   3 personas          │  │
│  ├───────────────────────┤  │
│  │   SE Day 3 (Crisis)   │  │
│  │   4 personas ⚠        │  │
│  ├───────────────────────┤  │
│  │   SE Day 7 (Defense)  │  │
│  │   3 personas          │  │
│  └───────────────────────┘  │
│                             │
│  ▼ Medical (2)              │
│  ┌───────────────────────┐  │
│  │   Medical ER Day 3    │  │
│  │   3 personas          │  │
│  ├───────────────────────┤  │
│  │   Medical Surgery     │  │
│  │   4 personas ✅       │  │
│  └───────────────────────┘  │
│                             │
│  ▼ Marketing (3)            │
│  ┌───────────────────────┐  │
│  │   Marketing Day 1     │  │
│  │   2 personas          │  │
│  ├───────────────────────┤  │
│  │ ● Marketing Day 5     │  │ ← Selected
│  │   (Crisis)            │  │
│  │   3 personas ⚠        │  │
│  ├───────────────────────┤  │
│  │   Marketing Day 7     │  │
│  │   3 personas          │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  PLATFORM-WIDE              │
│  ┌───────────────────────┐  │
│  │   Global Rules        │  │
│  │   System-wide config  │  │
│  └───────────────────────┘  │
│                             │
├─────────────────────────────┤
│  ALERTS (2)                 │
│                             │
│  ⚠ Marketing Day 5          │
│   AI conflict detected      │
│   2 hours ago               │
│                             │
│  ⚠ SE Day 3                 │
│   Chip never speaks         │
│   1 day ago                 │
│                             │
└─────────────────────────────┘
```

### Configuration Area (Center, 720px)

#### Tab 1: Priority Matrix (default, most important)

```
┌─────────────────────────────────────────────────────────┐
│  [⚡ Priority] [📋 Context] [🎭 Patterns] [🌐 Platform]  │ ← Selected
├─────────────────────────────────────────────────────────┤
│                                                         │
│  PRIORITY MATRIX                                        │
│  Marketing Day 5 — Crisis scenario                      │
│                                                         │
│  Active personas in this scenario:                      │
│  • Anh Tùng (Marketing Director)                        │
│  • Chip (Buddy)                                         │
│  • Chị Mai (Demanding Client)                           │
│  • Story Director (orchestrator)                        │
│                                                         │
│  ─── EVENT-BASED PRIORITY ───                           │
│                                                         │
│  Define which persona responds to which event types.    │
│  Priority 0-1, higher = speaks first.                   │
│  Delay = waits N seconds after higher priority speaks.  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ EVENT: student_wrong_decision                   │    │
│  │                                                 │    │
│  │ ┌─────────────────────┬──────┬──────┬────────┐  │    │
│  │ │ Persona             │ Prio │ Delay│ Tone    │  │    │
│  │ ├─────────────────────┼──────┼──────┼────────┤  │    │
│  │ │ Anh Tùng            │ 0.9  │  0s  │frustrate│  │    │
│  │ │ Chip                │ 0.3  │  4s  │supportive│ │    │
│  │ │ Chị Mai             │ 0.5  │  2s  │demanding│ │    │
│  │ │ Story Director      │ 0.0  │  -   │ silent │  │    │
│  │ └─────────────────────┴──────┴──────┴────────┘  │    │
│  │                                                 │    │
│  │ Result preview:                                 │    │
│  │ 1. Anh Tùng speaks first (0.9, no delay)        │    │
│  │ 2. Chị Mai speaks 2s later (0.5, demanding)     │    │
│  │ 3. Chip speaks 4s later (supportive recovery)   │    │
│  │ 4. Story Director silent                        │    │
│  │                                                 │    │
│  │ [Edit] [Test trigger] [Duplicate event]          │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ EVENT: student_stress_high (>85%)               │    │
│  │                                                 │    │
│  │ ┌─────────────────────┬──────┬──────┬────────┐  │    │
│  │ │ Anh Tùng            │ 0.0  │  -   │ silent │  │    │
│  │ │ Chip                │ 0.95 │  0s  │ calm   │  │    │
│  │ │ Chị Mai             │ 0.0  │  -   │ silent │  │    │
│  │ │ Story Director      │ 0.7  │  10s │trigger │  │    │
│  │ └─────────────────────┴──────┴──────┴────────┘  │    │
│  │                                                 │    │
│  │ Result preview:                                 │    │
│  │ 1. Chip intervenes immediately                  │    │
│  │ 2. Story Director may trigger early-exit option │    │
│  │ 3. Anh Tùng and Chị Mai stay silent             │    │
│  │                                                 │    │
│  │ [Edit] [Test trigger]                           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ EVENT: key_story_event (Day 5 crisis peak)      │    │
│  │                                                 │    │
│  │ ┌─────────────────────┬──────┬──────┬────────┐  │    │
│  │ │ Anh Tùng            │ 0.3  │  3s  │follow  │  │    │
│  │ │ Chip                │ 0.0  │  -   │ silent │  │    │
│  │ │ Chị Mai             │ 0.0  │  -   │ silent │  │    │
│  │ │ Story Director      │ 1.0  │  0s  │OVERRIDE│  │    │
│  │ └─────────────────────┴──────┴──────┴────────┘  │    │
│  │                                                 │    │
│  │ Result: Story Director controls this event      │    │
│  │ Other personas defer                            │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  + Add event                                            │
│                                                         │
│  ─── EVENT LIBRARY (Templates) ───                      │
│                                                         │
│  Common event types to import:                          │
│  • student_correct_answer                               │
│  • student_off_topic                                    │
│  • student_idle (>5min)                                 │
│  • time_running_out                                     │
│  • branch_point_reached                                 │
│  • [Browse all 18 templates]                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Tab 2: Shared Context

```
┌─────────────────────────────────────────────────────────┐
│  SHARED CONTEXT BOARD                                   │
│  Marketing Day 5                                        │
│                                                         │
│  ─── WHAT IS SHARED ───                                 │
│                                                         │
│  All personas in this scenario can read these states:   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ student_state                                   │    │
│  │   • current_action                              │    │
│  │   • stress_level (0-100)                        │    │
│  │   • last_decision                               │    │
│  │   • mood_inference                              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ recent_interactions                             │    │
│  │   • last_5_messages                             │    │
│  │   • last_persona_to_speak                       │    │
│  │   • last_persona_tone                           │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ widget_state                                    │    │
│  │   • current_widget_active                       │    │
│  │   • widget_input_data                           │    │
│  │   • widget_progress                             │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ─── PERSONA-SPECIFIC ACCESS ───                        │
│                                                         │
│  Some context restricted by role:                       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Anh Tùng (Director)                             │    │
│  │ Reads: ALL                                      │    │
│  │ Writes: alpha_last_tone                         │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Chip (Buddy)                                    │    │
│  │ Reads: ALL + stress_history                     │    │
│  │ Writes: chip_last_intervention                  │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Chị Mai (Client)                                │    │
│  │ Reads: widget_state, last_decisions             │    │
│  │ Writes: client_satisfaction_level                │    │
│  │ Cannot read: student_internal_state             │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Story Director                                  │    │
│  │ Reads: ALL (super context)                      │    │
│  │ Writes: ALL (master controller)                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ─── COORDINATION RULES ───                             │
│                                                         │
│  Rule: AI must check shared context before responding   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Rule: avoid_contradiction                       │    │
│  │   If last_persona_tone = "encouraging" THEN     │    │
│  │   next persona MUST not contradict              │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Rule: cooldown_between_persona                  │    │
│  │   Same persona cannot speak twice within 8s     │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Rule: stress_priority                           │    │
│  │   If stress > 85, only Chip and Director speak  │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Rule: escalation_consistency                    │    │
│  │   Tones can only escalate 1 step per turn       │    │
│  │   (calm → concerned → worried → critical)       │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  + Add coordination rule                                │
│                                                         │
│  ─── CONTEXT WINDOW MANAGEMENT ───                      │
│                                                         │
│  Memory tier configuration:                             │
│                                                         │
│  Short-term (last 10 messages): SEND TO ALL             │
│  Mid-term (last 2 days summary): SEND TO ALL            │
│  Long-term (entire journey): METADATA ONLY              │
│                                                         │
│  Token budget per call: 4000 tokens max                 │
│  Current avg: 2,847 tokens                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Tab 3: Patterns (Preset behaviors)

```
┌─────────────────────────────────────────────────────────┐
│  COORDINATION PATTERNS                                  │
│                                                         │
│  Pre-built coordination patterns for common situations  │
│                                                         │
│  ─── INSTALLED PATTERNS ───                             │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ Stress Recovery Protocol                     │    │
│  │                                                 │    │
│  │ When: stress > 85 sustained 3 minutes           │    │
│  │ Sequence:                                       │    │
│  │  1. Pressuring AIs (Boss, Client) silenced      │    │
│  │  2. Chip intervenes within 5 seconds            │    │
│  │  3. Teacher pauses for 30s                      │    │
│  │  4. After student stress drops, gradual return  │    │
│  │                                                 │    │
│  │ [Edit] [Disable] [View statistics]              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ Mistake Cascade Prevention                   │    │
│  │                                                 │    │
│  │ When: student wrong x3 in row                   │    │
│  │ Sequence:                                       │    │
│  │  1. Teacher disappointed (1x only)              │    │
│  │  2. Wait 8 seconds                              │    │
│  │  3. Chip offers help (gentle)                   │    │
│  │  4. If still wrong, teacher provides hint       │    │
│  │                                                 │    │
│  │ Why this matters: Avoid pile-on effect          │    │
│  │                                                 │    │
│  │ [Edit] [Disable] [View statistics]              │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ Off-topic Redirect                           │    │
│  │                                                 │    │
│  │ When: student off-topic > 30s                   │    │
│  │ Who responds:                                   │    │
│  │  - Chip ONLY (never Teacher)                    │    │
│  │  - Brief acknowledgment                         │    │
│  │  - Gentle redirect to task                      │    │
│  │                                                 │    │
│  │ [Edit] [Disable]                                │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ─── AVAILABLE PATTERNS (NOT INSTALLED) ───             │
│                                                         │
│  ☐ Brilliant Solution Challenge                         │
│  ☐ Time Pressure Escalation                             │
│  ☐ Branch Point Coordination                            │
│  ☐ Emotional Support Cascade                            │
│  ☐ Multi-AI Debate Pattern                              │
│                                                         │
│  [+ Install pattern] [+ Create custom pattern]          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Tab 4: Platform Rules (Super Admin only)

```
┌─────────────────────────────────────────────────────────┐
│  PLATFORM-WIDE ORCHESTRATION RULES                      │
│                                                         │
│  ⚠ Changes here affect ALL scenarios.                   │
│  Super Admin access only.                               │
│                                                         │
│  ─── HARD CONSTRAINTS ───                               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ Director Always Wins Key Events              │    │
│  │                                                 │    │
│  │ Rule: type=director events ALWAYS override      │    │
│  │ character events khi key_story_event triggered  │    │
│  │                                                 │    │
│  │ Cannot be overridden by individual scenarios.   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ Buddy Has Stress Priority                    │    │
│  │                                                 │    │
│  │ Rule: When stress > 90, Chip MUST be top        │    │
│  │ priority across all scenarios                   │    │
│  │                                                 │    │
│  │ Reasoning: Buddy is student wellness anchor     │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ No Same Persona Twice in Row                 │    │
│  │                                                 │    │
│  │ Rule: Same persona cannot respond twice in a    │    │
│  │ row within 5 seconds (prevent monologuing)      │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ─── SAFETY RULES ───                                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ ✅ Crisis Detection Override                    │    │
│  │                                                 │    │
│  │ If student message indicates self-harm or       │    │
│  │ severe distress:                                │    │
│  │ - All scripted responses paused                 │    │
│  │ - Special crisis protocol activated             │    │
│  │ - Chip provides supportive response             │    │
│  │ - Mental health resources surfaced              │    │
│  │ - LUMINA team alerted                           │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ─── COST CONTROL ───                                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Max AI calls per minute per session             │    │
│  │ ┌─────┐                                         │    │
│  │ │ 12  │ calls/min                               │    │
│  │ └─────┘                                         │    │
│  │ ⓘ Prevents runaway loops                        │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Token budget per session (7 days)               │    │
│  │ ┌──────────┐                                    │    │
│  │ │ 200,000  │ tokens                             │    │
│  │ └──────────┘                                    │    │
│  │ ⓘ Auto-degrade to cheaper models if exceeded    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  + Add platform rule (Super Admin only)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Live Test Playground (Right, 400px)

```
┌─────────────────────────────────────┐
│  ORCHESTRATION TEST                 │
│                                     │
│  Test mode:                         │
│  ● Single Event                     │
│  ○ Scenario Simulation              │
│  ○ Stress Test                      │
│                                     │
│  ─── SIMULATE EVENT ───             │
│                                     │
│  Event type:                        │
│  [student_wrong_decision ▼]         │
│                                     │
│  Context:                           │
│  ┌─────────────────────────────┐    │
│  │ Stress: 65%                 │    │
│  │ Wrong attempts: 2           │    │
│  │ Last persona: Anh Tùng     │    │
│  │ Time in day: 23 min         │    │
│  └─────────────────────────────┘    │
│                                     │
│  [▶ Run simulation]                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  RESULT                             │
│                                     │
│  Event: student_wrong_decision      │
│  Time: T+0                          │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ T+0.3s                      │    │
│  │ 🎭 Anh Tùng (priority 0.9)  │    │
│  │ "Số liệu đâu? Sai 2 lần     │    │
│  │  rồi đấy."                  │    │
│  │ Tone: frustrated_business   │    │
│  │ ✓ Approved by Guardrail     │    │
│  ├─────────────────────────────┤    │
│  │ T+2.1s                      │    │
│  │ 💼 Chị Mai (priority 0.5)   │    │
│  │ "Tôi cần kết quả tuần này   │    │
│  │  để đưa lên CEO!"            │    │
│  │ Tone: demanding             │    │
│  │ ✓ Approved by Guardrail     │    │
│  ├─────────────────────────────┤    │
│  │ T+4.5s                      │    │
│  │ 🤖 Chip (priority 0.3)       │    │
│  │ "Hey, hít thở nhé. Cậu có   │    │
│  │  thể nhìn lại data Q3 không?"│   │
│  │ Tone: supportive            │    │
│  │ ✓ Approved by Guardrail     │    │
│  ├─────────────────────────────┤    │
│  │ T+5s                        │    │
│  │ 🎬 Story Director silent    │    │
│  │ (priority 0.0 cho event này)│    │
│  └─────────────────────────────┘    │
│                                     │
│  Total cost: $0.0089                │
│  Total latency: 4.5s                │
│  Conflict check: ✅ All consistent  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ─── ANALYTICS PREVIEW ───          │
│                                     │
│  If this event happens 100 times:   │
│  • Anh Tùng speaks: 100             │
│  • Chị Mai speaks: 100              │
│  • Chip speaks: 100                 │
│  • Avg total cost: $0.89/100        │
│                                     │
│  Stress impact estimate:            │
│  • +5% (Anh Tùng frustration)       │
│  • +3% (Chị Mai demanding)          │
│  • -8% (Chip recovery)              │
│  • Net: 0% (balanced)               │
│                                     │
└─────────────────────────────────────┘
```

### Scenario Simulation mode

```
┌─────────────────────────────────────┐
│  SCENARIO SIMULATION                │
│                                     │
│  Run full Day with auto student:    │
│                                     │
│  Student profile:                   │
│  ○ Average performer                │
│  ● Struggling (high stress)         │
│  ○ High performer                   │
│  ○ Erratic                          │
│                                     │
│  Day to simulate: [Day 5 ▼]         │
│                                     │
│  Simulation speed: [10x ▼]          │
│                                     │
│  [▶ Run simulation]                 │
│                                     │
│  ─── PROGRESS ───                   │
│                                     │
│  ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░ 50%           │
│  Simulating: Day 5 minute 22...     │
│                                     │
│  ─── ISSUES DETECTED ───            │
│                                     │
│  ⚠ Pile-on event at minute 15       │
│   3 personas spoke within 2s        │
│   Recommendation: Add cooldown      │
│                                     │
│  ⚠ Chip silent for 18 minutes       │
│   When student stress was 75%       │
│   Recommendation: Lower threshold   │
│                                     │
│  ✅ No contradictions detected      │
│  ✅ Token budget OK (78% used)      │
│                                     │
│  [Apply suggested fixes]            │
│  [View full simulation]             │
│                                     │
└─────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Real-time validation

**As user adjusts priorities:**
- Immediate validation: "Total priority sum = 1.7 (should be ~1.0 for balance)"
- Conflict detection: "Two personas at 0.9+ for same event = pile-on risk"
- Suggestions: "Consider delaying Chip 4s after Anh Tùng"

### Pattern installation

**Click "Install pattern":**
1. Modal shows pattern details
2. Preview impact on current scenario
3. Confirm → pattern integrated
4. Existing rules merged (with conflict warnings)

### Test simulation

**Single event test:**
- Real LLM calls in playground
- Show actual responses
- Cost tracked
- Saved as test case for regression

**Scenario simulation:**
- Auto-generate student behavior based on profile
- Run through entire day
- Identify orchestration issues
- Suggest fixes

### Keyboard shortcuts

| Shortcut | Action |
|:--|:--|
| `Ctrl+S` | Save changes |
| `Ctrl+T` | Run test simulation |
| `Ctrl+R` | Reset playground |
| `Ctrl+1-4` | Switch tabs |
| `Ctrl+/` | Show shortcuts help |
| `Space` | Pause/resume simulation |

---

## 5. States

### State 1: Empty (no scenarios configured)

For new platform setup:

```
┌─────────────────────────────────────┐
│                                     │
│         🎼                          │
│                                     │
│  Chưa có scenario nào configured    │
│                                     │
│  Bắt đầu bằng:                      │
│                                     │
│  [Configure first scenario]         │
│  [Apply default Priority Matrix]    │
│  [Browse coordination patterns]     │
│                                     │
└─────────────────────────────────────┘
```

### State 2: Editing (default)

All zones active, real-time validation.

### State 3: Running simulation

- Playground panel shows progress
- Other panels dim slightly
- Cancel button available

### State 4: Conflict detected

```
┌─────────────────────────────────────┐
│  ⚠ ORCHESTRATION CONFLICT           │
│                                     │
│  Detected in current configuration: │
│                                     │
│  3 personas có priority > 0.8 cho   │
│  cùng event "student_wrong_decision"│
│                                     │
│  This will cause "pile-on" effect:  │
│  3 AIs speak almost simultaneously, │
│  overwhelming student.              │
│                                     │
│  Suggested fix:                     │
│  • Anh Tùng: 0.9 (keep)             │
│  • Chị Mai: 0.5 (reduce from 0.8)   │
│  • Chip: 0.3 (reduce from 0.85)     │
│                                     │
│  [Apply fix] [Ignore]               │
│                                     │
└─────────────────────────────────────┘
```

### State 5: Live alert (production issue)

```
┌─────────────────────────────────────┐
│  🚨 LIVE ORCHESTRATION ALERT        │
│                                     │
│  Marketing Day 5 scenario:          │
│                                     │
│  Issue: Chip and Anh Tùng giving    │
│  contradictory advice in 5 active   │
│  sessions right now.                │
│                                     │
│  [View Session Replay]              │
│  [Quick fix orchestration]          │
│  [Disable scenario temporarily]     │
│                                     │
└─────────────────────────────────────┘
```

### State 6: Awaiting review (changes submitted)

- Banner: "Changes pending Super Admin review"
- Cannot make new changes
- Can revert to previous version

### State 7: Read-only (production version)

- Banner: "Viewing production. Changes create new draft."
- All controls disabled
- "Edit" button creates new draft

---

## 6. Data Flow

### Inputs

```yaml
from_persona_registry:
  - persona_definitions (cho selected scenario)
  - persona_capabilities
  - persona_constraints

from_scenario:
  - scenario_metadata
  - scenario_events
  - scenario_personas (cast)

from_analytics:
  - orchestration_alerts
  - hallucination_reports
  - cost_data
```

### Outputs

```yaml
orchestration_config:
  destination: Database (per scenario)
  format: JSON với versioning
  
events_emitted:
  - orchestration.config_updated
  - orchestration.test_run
  - orchestration.alert_resolved
  - orchestration.deployed
  
analytics:
  - test_simulation_results
  - cost_predictions
  - issue_detections
```

### API Endpoints

```yaml
GET    /api/orchestration/scenarios            # List với configs
GET    /api/orchestration/:scenario_id          # Get full config
PATCH  /api/orchestration/:scenario_id          # Update config
POST   /api/orchestration/:scenario_id/test     # Run test simulation
POST   /api/orchestration/:scenario_id/deploy   # Deploy to production
GET    /api/orchestration/patterns              # List available patterns
POST   /api/orchestration/patterns/install      # Install pattern
GET    /api/orchestration/platform-rules        # Platform-wide rules
PATCH  /api/orchestration/platform-rules        # Update (Super Admin)
GET    /api/orchestration/alerts                # Live issues
```

---

## 7. Permission Checks

| Action | Persona Writer | Super Admin |
|:--|:-:|:-:|
| View scenarios | ✅ | ✅ |
| Edit Priority Matrix | ✅ | ✅ |
| Edit Shared Context rules | ✅ | ✅ |
| Install patterns | ✅ | ✅ |
| Run test simulations | ✅ | ✅ |
| Deploy to production | ❌ | ✅ |
| Edit Platform Rules | ❌ | ✅ |
| Emergency rollback | ❌ | ✅ |
| Resolve alerts | ✅ | ✅ |

**Read-only roles:**
- Designer: View scenario configs (cannot edit)
- Engineer: View technical aspects
- Operator: View + alert handling

---

## 8. Edge Cases

### Case 1: Persona removed from scenario

**Scenario:** Designer removes Chị Mai from Marketing Day 5

**Auto-handling:**
- Orchestrator detects missing persona
- All rules referencing Chị Mai flagged
- Either: auto-remove rules OR migrate to alternative persona
- Notify Persona Writer to review

### Case 2: New persona added to scenario

**Auto-handling:**
- Default Priority Matrix entries generated cho new persona
- Default values: priority 0.3, no special triggers
- Persona Writer notified to customize

### Case 3: Conflicting Platform vs Scenario rules

**Resolution:**
- Platform rules ALWAYS win
- Scenario shows "Overridden by platform rule" indicator
- Can request platform exception (Super Admin only)

### Case 4: Real-time issue in production

**Detection:**
- Analytics monitors for orchestration anomalies
- Alert triggered if conflict rate > threshold

**Response:**
- Orchestrator Console shows live alert
- Persona Writer can investigate immediately
- Quick fix option available
- Emergency: disable specific orchestration rules

### Case 5: Test simulation cost spike

**Prevention:**
- Cost preview before running expensive tests
- Token budget per test session
- Auto-cancel if budget exceeded

### Case 6: Pattern conflicts với custom rules

**Resolution:**
- Show conflict in install dialog
- Options: skip pattern, override custom, merge intelligently

### Case 7: Migration khi persona update

**Scenario:** Mr. Alpha v1.0 → v2.0 (breaking changes)

**Handling:**
- Orchestration config marks compatibility
- Persona Writer notified
- Migration helper suggests updates
- Old config still works until manually migrated

---

## 9. Responsive Considerations

### Desktop (1440px+) — Primary

Full 3-zone layout. Optimal for orchestration work.

### Laptop (1024-1440px)

- Scenarios Sidebar collapsible
- Configuration area expands
- Playground stays 360px

### Tablet (< 1024px)

**Not recommended.** Show:

```
🎼 Orchestrator Console requires desktop.

Multi-AI coordination work requires
multi-pane layout. Please use desktop.
```

---

## 10. Performance Requirements

- **Scenario load**: < 1s
- **Real-time validation**: < 200ms
- **Single event test**: < 5s
- **Full Day simulation**: < 60s (depends on length)
- **Save operation**: < 1s

### Optimization

- Cache scenario configs
- Parallelize test simulations
- Debounce real-time validation
- Stream simulation results

---

## 11. Accessibility

- Full keyboard navigation
- Screen reader support
- Tables with proper headers
- Color không sole indicator
- High contrast mode
- Reduced motion option

---

## 12. Visual Design Notes

### Color application

**Configuration area:**
- Background: `--paper-100`
- Tab borders: `--ink-200`
- Active tab: `--lumina-500` underline

**Priority Matrix tables:**
- High priority (>0.7): `--lumina-500` text
- Medium (0.3-0.7): `--ink-700` text
- Low (<0.3) or silent: `--ink-400` text
- Cell highlights based on validation state

**Playground:**
- Background: `--ink-900` (terminal-like)
- AI responses: persona's color theme
- Metadata: `--ink-500` italic

**Alerts:**
- Critical: `--signal-stress` background
- Warning: `--signal-alert`
- Info: `--signal-focus`

### Typography

- Tab labels: Inter Tight 14px medium
- Table headers: Inter Tight 11px uppercase letter-spacing 0.05em
- Values: Inter Tight 14px regular
- Code/event names: JetBrains Mono 12px
- Playground responses: Inter Tight 13px

### Iconography

- Tabs: Lucide (Zap, Database, Layers, Globe)
- Personas: Their assigned icons
- Status: ✅ ⚠ ❌ icons
- Patterns: Custom workflow icons

---

## 13. Multi-domain Application Examples

### Example 1: SE Day 3 — Crisis (Server crash scenario)

```yaml
scenario: "se-day-3-crisis"
personas: [mr_alpha, chip, boss_nam, story_director]

priority_matrix:
  
  student_wrong_attempt_x3:
    mr_alpha: 0.9 (disappointed)
    chip: 0.4 (delayed 6s, supportive)
    boss_nam: 0.2 (silent unless time pressure)
    story_director: 0.0
    
  student_stress_high:
    mr_alpha: 0.0 (silent)
    chip: 0.95 (immediate intervention)
    boss_nam: 0.0 (silent)
    story_director: 0.6 (may trigger early exit option)
    
  server_failure_event:
    mr_alpha: 0.4 (technical guidance)
    chip: 0.3 (emotional support)
    boss_nam: 0.85 (heavy pressure)
    story_director: 1.0 (orchestrate event)

key_pattern: "Stress Recovery Protocol installed"
```

### Example 2: Medical ER Day 3 — Patient crisis

```yaml
scenario: "medical-er-day-3"
personas: [dr_linh, chip, y_ta_trang, story_director]

priority_matrix:
  
  student_misdiagnosis:
    dr_linh: 0.85 (clinical reasoning question)
    y_ta_trang: 0.6 (gentle correction về protocol)
    chip: 0.3 (delayed 5s, supportive)
    story_director: 0.0
    
  patient_deterioration:
    dr_linh: 0.95 (urgent guidance)
    y_ta_trang: 0.7 (vital signs alert)
    chip: 0.2 (background only)
    story_director: 0.8 (orchestrate cascade)
    
  ethical_dilemma:
    dr_linh: 0.95 (ethical framework)
    y_ta_trang: 0.4 (peer perspective)
    chip: 0.0 (silent — too sensitive)
    story_director: 0.6

key_pattern: "Ethical Dilemma Protocol installed"
special_rule: "Patient safety alerts always override timing"
```

### Example 3: Marketing Day 5 — Campaign crisis

```yaml
scenario: "marketing-day-5-crisis"
personas: [anh_tung, chip, chi_mai, story_director]

priority_matrix:
  
  campaign_metric_drop:
    anh_tung: 0.9 (data-driven analysis)
    chi_mai: 0.7 (client frustration)
    chip: 0.2 (silent unless stress high)
    story_director: 0.0
    
  budget_decision:
    anh_tung: 0.85 (financial perspective)
    chi_mai: 0.6 (client requirement)
    chip: 0.0 (silent — business decision)
    story_director: 0.0
    
  client_meeting_simulation:
    anh_tung: 0.4 (background mentor)
    chi_mai: 0.95 (active client role)
    chip: 0.2 (post-meeting support)
    story_director: 0.7 (manage flow)

key_pattern: "Mistake Cascade Prevention installed"
special_rule: "Chị Mai never speaks after stress > 80"
```

### Differences in same Orchestrator Console

| Aspect | SE | Medical | Marketing |
|:--|:--|:--|:--|
| **Personas in cast** | Teacher + Buddy + Boss + Director | Doctor + Buddy + Nurse + Director | Director + Buddy + Client + Director |
| **Critical events** | server_failure, branch_choice | patient_crisis, ethical_dilemma | campaign_drop, client_meeting |
| **Buddy role** | Stress relief | Stress relief | Stress relief (consistent) |
| **Pressure source** | Boss + deadline | Patient outcomes + ethics | Client + metrics |
| **Story Director priority** | High in crisis | High in cascades | Medium (events less script-heavy) |
| **Special patterns** | Stress Recovery | Ethical Protocol | Mistake Prevention |

**Same Orchestrator Console, different orchestration strategies per domain.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Persona Writer (extension), Super Admin (platform) |
| **Complexity** | ⭐⭐⭐⭐ |
| **Estimated build time** | 6-8 weeks |
| **Configurations per scenario** | 1 priority matrix + N coordination rules |
| **Key technologies** | React, real-time validation, simulation engine |
| **Critical dependencies** | Persona Studio (Screen 3), Analytics (Screen 16) |
| **Performance targets** | < 1s scenario load, < 5s single event test |
| **Device support** | Desktop only |
| **Multi-domain** | Yes - per-scenario configs across all domains |
| **Biggest challenge** | Predicting orchestration issues before production |
| **Biggest value** | Quality multiplier — turns good personas into great experiences |

### Design principles applied

1. ✅ **Coordination over capability** — Better orchestration > better individual AI
2. ✅ **Test before deploy** — Simulation built into workflow
3. ✅ **Platform safety** — Hard constraints can't be overridden
4. ✅ **Live monitoring** — Issues caught in real-time
5. ✅ **Multi-domain awareness** — Each scenario has own coordination strategy
