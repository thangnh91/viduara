# Screen 08 — Buddy Chat

**Màn hình số:** 8  
**Phase:** B — Learner Core  
**Complexity:** ⭐⭐ (Trung bình thấp)  
**Primary users:** Học sinh (Learner)  
**Related flow:** Flow 02 — Trải nghiệm một ngày (sub-component)  
**Dependencies:** Screen 7 (Workspace - parent context), Screen 6 (Hub - alternative entry)

---

## 0. Multi-domain Context

Buddy Chat là tương tác với **Chip** — persona Buddy duy nhất xuất hiện ở mọi ngành. Khác với Mr. Alpha (SE), Dr. Linh (Medical), Anh Tùng (Marketing), Chip là **constant companion** xuyên suốt mọi scenario.

**Examples used in this spec:**
- Chip trong Marketing scenario (đang stress về campaign)
- Chip trong Medical scenario (đang lo về patient)
- Chip trong SE scenario (đang frustrated về code)

Chip adapt tone theo scenario nhưng giữ identity nhất quán.

---

## 1. Mục đích màn hình

Buddy Chat là **safe space** — nơi học sinh có thể "thở" giữa scenario căng thẳng. Khác với chat với Mr. Alpha/Dr. Linh/Anh Tùng (academic/professional), chat với Chip là:

**4 chức năng cốt lõi:**

1. **Emotional support** — "Tôi stress quá"
2. **Knowledge clarification** — "Big O là gì lại?"
3. **Strategy advice** — "Tôi nên làm gì tiếp?"
4. **Wellness check** — Chip chủ động hỏi thăm

### Metaphor thiết kế

Buddy Chat giống như **chat với bạn thân thông minh**:
- Không formal (Discord/iMessage feel)
- Always available
- Không judgment
- Có sense of humor

### Triết lý: "Friend, Not Tutor"

Chip không phải teacher — không grade, không correct quá nhiều. Chip là:
- **Cheerleader** khi student doing well
- **Therapist** khi stressed
- **Study buddy** khi confused
- **Friend** khi need to vent

---

## 2. Users & Use Cases

### Primary user: Học sinh (Learner)

Always trong context của 1 scenario đang chạy.

### Use cases chi tiết

#### UC1: Emotional vent

Student stressed → Click Chip avatar → Pop-up chat → Vent → Chip empathizes, suggests break

#### UC2: Quick knowledge check

Student forgot AARRR meaning → Quick chat with Chip → Get reminder

#### UC3: Strategy help

Student stuck → Ask Chip "what should I try?" → Chip nudges (doesn't give answer)

#### UC4: Casual conversation

Between intense moments, just chat → Chip remembers past conversations → builds rapport

---

## 3. Layout & Structure

### Pop-up overlay (from Workspace)

```
┌─────────────────────────────────────────────────────┐
│ [Workspace dim background]                          │
│                                                     │
│              ┌─────────────────────────┐            │
│              │  💬 Chat with Chip   ✕  │            │
│              ├─────────────────────────┤            │
│              │                         │            │
│              │  ╭───────╮              │            │
│              │  │  🤖   │  Chip        │            │
│              │  │       │  Buddy       │            │
│              │  ╰───────╯              │            │
│              │                         │            │
│              │  Hey Minh! Cậu đang     │            │
│              │  ổn không? Tôi thấy     │            │
│              │  stress cao đấy.        │            │
│              │                         │            │
│              │                ─────    │            │
│              │            Hi Chip      │            │
│              │            14:23 - You  │            │
│              │                         │            │
│              │  Mình stress về Day 3   │            │
│              │  thật. Campaign drop    │            │
│              │  40% mà chị Mai keeps   │            │
│              │  pinging.               │            │
│              │                         │            │
│              │  Mình hiểu cảm giác đó. │            │
│              │  Hít thở nhé. 30 giây.  │            │
│              │  ...                    │            │
│              │  Cậu có nhớ AARRR       │            │
│              │  không? Có thể đó là    │            │
│              │  starting point.        │            │
│              │                         │            │
│              │  ─────────────────      │            │
│              │  Type your message...   │            │
│              │                  [Send] │            │
│              │                         │            │
│              │  Quick replies:         │            │
│              │  [Tôi cần break]        │            │
│              │  [Giúp với AARRR]       │            │
│              │  [Cảm ơn Chip]          │            │
│              └─────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Full-screen view (from Hub)

```
┌─────────────────────────────────────────────────────┐
│ 🔥 LUMINA  Hub > Chat with Chip          [⚙ Setup]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Hôm nay: 24 Apr 2026                               │
│                                                     │
│  ╭───────╮                                          │
│  │  🤖   │  Chip                                    │
│  │       │  Your Buddy                              │
│  ╰───────╯  Mood today: 😊 Encouraging              │
│                                                     │
│  ─── Chat history ───                               │
│                                                     │
│  [Chat messages thread]                             │
│                                                     │
│  ─── Topics chúng ta đã bàn ───                     │
│                                                     │
│  • Day 1: First impressions                         │
│  • Day 2: AARRR review                              │
│  • Day 3: Crisis support                            │
│                                                     │
│  [Continue chatting...]                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Chat Message Patterns

**From Chip:**
- Avatar left
- Lumina-tinted background
- Casual Vietnamese
- Occasional emoji (1-2 max)
- Sometimes use English business terms naturally

**From User:**
- Right-aligned
- Plain background
- Free typing (no rules)

**Typing indicator** trong cách Chip "đang gõ":
- 3 dots animation
- 1-3 seconds delay (natural feel)

**Quick replies:**
- Suggested based on context
- Tap to send instantly
- Updates dynamically

---

## 4. Interactions

### Auto-prompts từ Chip

Chip chủ động message khi:
- Student stress > 70% sustained 3 min
- Student silent > 5 min trong scenario
- Student gặp wrong answer 3 lần
- Student vừa có achievement (celebrate)

### Mood detection

Chip adjust tone:
- Student stressed → Calm, supportive
- Student excited → Match energy
- Student confused → Patient, explanatory
- Student frustrated → Empathetic, redirect

### Memory between sessions

Chip remembers:
- Past conversations
- Student's interests
- Previous struggles
- Inside jokes (V2)

---

## 5. States

### State 1: Closed (default)

Buddy avatar trong Vitals zone, click to open.

### State 2: Just opened

Greeting based on time + scenario context:
- Day 1: "Welcome! Tôi là Chip. Sẵn sàng chứ?"
- Day 3: "Hey Minh! Day 3 căng đấy nhỉ?"
- Resume: "Welcome back! Hôm qua chúng ta đã bàn về..."

### State 3: Active conversation

Chat flowing, both typing.

### State 4: Chip thinking

Typing indicator visible.

### State 5: Conversation pause

User idle 30s → Chip might offer:
- "Còn đó không?"
- Or just wait silently

### State 6: Crisis detected

If user message indicates severe distress:
- Chip pauses normal flow
- Provides supportive response
- Offers mental health resources
- LUMINA team alerted (privacy respected)

---

## 6. Data Flow

### Inputs

```yaml
from_session:
  - current_scenario
  - current_day
  - current_stress_level
  - recent_decisions
  - last_action

from_history:
  - past_conversations
  - student_preferences
  - rapport_level
```

### Outputs

```yaml
events:
  - chat.opened
  - chat.message_sent
  - chip.responded
  - quick_reply.used
  - crisis.detected (if applicable)
```

### API Endpoints

```yaml
POST   /api/buddy/message              # Send message
GET    /api/buddy/history              # Past conversations
GET    /api/buddy/quick-replies        # Context-aware suggestions
POST   /api/buddy/auto-greet           # When opening
```

---

## 7. Permission Checks

Authenticated user only. No special permissions — standard learner access.

---

## 8. Edge Cases

### Case 1: Student tries to "break" Chip

- Adversarial inputs (jailbreak attempts)
- Chip stays in character
- Redirect to scenario context

### Case 2: Off-topic conversations

- Chip allows brief tangents
- Gently redirects to scenario after 2-3 exchanges

### Case 3: Sensitive personal disclosures

- Mental health: provide resources
- Trauma: Don't claim therapeutic role
- Safety: Alert LUMINA team

### Case 4: Long absence (return after weeks)

- Chip mentions: "Đã lâu không chat. Mọi thứ ổn chứ?"
- Doesn't guilt trip

---

## 9-12. Standard sections

(Responsive: Mobile-first design, popup adapts)
(Performance: < 2s response, streaming)
(Accessibility: Voice input option, screen reader)
(Visual: Lumina accent for Chip, casual rounded UI)

---

## 13. Multi-domain Examples

**Marketing scenario:**
> "Hey, ROAS giảm thật khó. Cậu có nhớ AARRR không? Có thể start từ Acquisition. Chỉ là gợi ý — quyết định là của cậu nhé!"

**Medical scenario:**
> "Patient deterioration là moment khó. Hít thở. Cậu có recall vital signs hôm qua không? Nếu cần, nhìn lại knowledge cards."

**SE scenario:**
> "Server crash 2am là intense! Chip cũng thấy stress. Cậu nhớ Big O từ Day 2 không? Memory leak có thể là culprit."

**Same Chip, contextualized to domain.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Learner |
| **Complexity** | ⭐⭐ |
| **Estimated build time** | 3-4 weeks |
| **Frequency of use** | Multiple times per session |
| **Multi-domain** | Yes - same Chip, different contexts |
| **Biggest value** | Emotional anchor across journey |
