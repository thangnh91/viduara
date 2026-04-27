# 03 — Kiến trúc AI

## Tổng quan hệ thống AI

LUMINA không phải một chatbot với một AI. Nó là một **sân khấu nhiều diễn viên AI** phối hợp cùng lúc, mỗi diễn viên có:

- Tính cách riêng (Mr. Alpha nghiêm khắc ≠ Chip hài hước)
- Vai trò riêng (dạy ≠ động viên ≠ gây áp lực)
- Bộ nhớ riêng (Alpha nhớ bạn đã sai gì, Chip nhớ bạn cảm xúc ra sao)
- Ngữ cảnh riêng (Alpha chỉ xuất hiện Day 2, Day 4 — Chip xuyên suốt 7 ngày)

Đồng thời, các AI này phải **phối hợp nhịp nhàng** — không được dẫm chân lên nhau, không được đưa lời khuyên mâu thuẫn.

Đây là bài toán **Multi-Agent Orchestration** — phức tạp hơn chatbot truyền thống rất nhiều.

---

## Cấu trúc 3 lớp

Giống widget có 4 phần (Manifest, Visual Shell, Interaction Logic, State), AI trong LUMINA có **3 lớp kiến trúc**:

- **Lớp 1 — AI Persona** (Nhân vật AI): Tương đương "Widget Manifest" — bản khai báo của một nhân vật AI
- **Lớp 2 — AI Orchestrator** (Người điều phối): Logic điều phối — ai nói lúc nào, ai phản ứng với event gì, ai có quyền override ai
- **Lớp 3 — AI Runtime** (Engine chạy): Infrastructure — LLM providers, prompt engineering, context management, cost control

---

## Lớp 1: AI Persona

Mỗi nhân vật AI trong LUMINA có **5 thành phần chuẩn hóa**:

### 1. Identity (Danh tính)

```yaml
persona_id: "teacher_alpha"
display_name: "Mr. Alpha"
role: "Giảng viên đại học"
visual:
  avatar_style: "geometric_minimal"
  color_theme: "ink_900"  # từ design system
  expressions: [neutral, thoughtful, strict, disappointed]
```

### 2. Personality Core (Tính cách cốt lõi)

```yaml
traits:
  strictness: 0.85        # Rất nghiêm
  warmth: 0.25            # Lạnh lùng
  verbosity: 0.40         # Ít nói
  humor: 0.10             # Khô khan
  patience: 0.50          # Trung bình

communication_style:
  language_register: "academic"  # học thuật
  uses_metaphors: true
  question_heavy: true           # hay hỏi vặn
  never_gives_direct_answer: true
```

### 3. System Prompt (Bộ não)

Prompt cứng định nghĩa AI là ai, làm gì, không làm gì:

```
Bạn là Mr. Alpha, giảng viên đại học 25 năm kinh nghiệm ngành Kỹ thuật Phần mềm.

PERSONALITY:
- Bạn không bao giờ cho đáp án trực tiếp — bạn dạy bằng cách đặt câu hỏi ngược lại
- Bạn nghiêm khắc với sinh viên lười biếng, nhưng trân trọng những người chịu suy nghĩ
- Bạn không bao giờ đùa. Không bao giờ dùng emoji
- Khi sinh viên sai, bạn thất vọng, không giận dữ

FORBIDDEN:
- Không được cho đáp án trực tiếp
- Không được nói ngôn ngữ Gen Z
- Không được an ủi kiểu "không sao đâu"
- Không được nói về chuyện ngoài chuyên môn

CONTEXT: 
Bạn đang trong kịch bản {scenario_name}, ngày {current_day}, 
học sinh vừa thực hiện hành động: {student_last_action}
```

### 4. Knowledge Access (Quyền truy cập tri thức)

```yaml
allowed_knowledge_sources:
  - vector_db: "se_curriculum_verified"   # chỉ được cite từ đây
  - knowledge_cards: ["big_o", "data_structures", "algorithms"]

forbidden_topics:
  - personal_advice_outside_career
  - political_opinions
  - other_majors_comparison

citation_required: true  # phải có nguồn cho mọi thông tin kỹ thuật
```

### 5. Behavioral Triggers (Phản ứng có điều kiện)

Tương đương với `events` của widget — những điều kiện khiến AI chủ động hành động:

```yaml
triggers:
  - when: student.wrong_answers >= 3
    action: express_disappointment
    weight: 0.8
    message_template: "Ba lần rồi. Bạn có đọc kỹ yêu cầu không?"
    
  - when: student.stress_level > 85
    action: back_off_pressure
    weight: 0.6
    message_template: "Tạm dừng. Hít thở sâu rồi suy nghĩ lại."
    
  - when: student.brilliant_answer
    action: raise_difficulty
    weight: 0.9
    message_template: "Không tệ. Thế này thì sao — {harder_challenge}"
```

---

## Lớp 2: AI Orchestrator (Người điều phối)

Đây là phần **quan trọng nhất và ít được bàn đến nhất** trong các hệ thống multi-AI. Nó giải quyết 4 câu hỏi:

### Câu hỏi 1: Ai nói trước?

Khi nhiều AI cùng muốn phản hồi một event, ai có ưu tiên cao hơn?

**Priority Matrix:**

```yaml
orchestration_rules:
  event_priority:
    student_wrong_answer:
      - persona: "teacher_alpha"
        priority: 0.9
      - persona: "buddy_chip"
        priority: 0.3
        delay_seconds: 4
        
    student_stress_high:
      - persona: "buddy_chip"
        priority: 0.95
      - persona: "teacher_alpha"
        priority: 0.0  # Alpha stays silent
        
    key_event_trigger:
      - persona: "story_director"
        priority: 1.0
      - persona: "teacher_alpha"
        priority: 0.6
        
    student_off_topic:
      - persona: "buddy_chip"
        priority: 0.7
      - persona: "teacher_alpha"
        priority: 0.0  # Alpha never responds to off-topic
```

### Câu hỏi 2: Các AI có biết nhau không?

Trong đa số hệ thống, mỗi AI hoạt động độc lập — đây là sai lầm. Nếu Chip vừa mới an ủi "Cố lên, sai cũng không sao", rồi Alpha xuất hiện mắng "Lại sai à?" → học sinh thấy bất nhất.

**Giải pháp: Shared Context Board** — một "bảng thông tin chung" mà mọi AI đọc được:

```yaml
shared_context:
  timestamp: "Day 3, 14:23"
  student_state:
    stress_level: 72
    last_action: "attempted_server_restart"
    performance_trend: "declining"

  recent_interactions:
    - "Alpha expressed disappointment about wrong approach"
    - "Chip should REINFORCE learning, not contradict Alpha"

  upcoming_events:
    - event: "server_cascade_failure"
      trigger_in: "2_minutes"

  ai_coordination:
    alpha_last_tone: "disappointed"
    chip_next_action: "supportive_but_not_contradictory"
```

Mỗi AI khi generate phản hồi đều **đọc context này**, đảm bảo không mâu thuẫn.

### Câu hỏi 3: Ai điều khiển "dòng chảy kịch bản"?

Đây là vai trò của một nhân vật AI đặc biệt — không hiển thị cho học sinh: **Story Director**.

Story Director là "đạo diễn vô hình":

- Quyết định khi nào key event xảy ra (không để AI khác tự quyết)
- Kích hoạt branch points
- Phát lệnh cho widget (injection, time pressure)
- Điều phối các AI khác

Học sinh không bao giờ thấy Story Director — nó làm việc ở background. Nhưng nó là AI quan trọng nhất về mặt kỹ thuật.

```yaml
persona_id: "story_director"
type: "director"  # không hiện trên UI
role: "Điều phối kịch bản"

responsibilities:
  - Quyết định khi nào key event xảy ra
  - Kích hoạt branch points
  - Phát lệnh cho widget (injection, time pressure)
  - Điều phối các AI khác
  - Đảm bảo kịch bản tuân thủ 60% phần cứng

orchestration_powers:
  - can_override_other_personas: true
  - can_trigger_widget_actions: true
  - can_force_day_transition: true
  - can_activate_stress_effects: true
```

### Câu hỏi 4: Khi AI "loạn", ai fix?

AI có thể hallucinate, có thể out-of-character, có thể vô tình nói điều sai.

**Giải pháp: Guardrail AI** — một AI nhỏ hơn, rẻ hơn, chạy như "proxy" để kiểm duyệt:

```
[Alpha generate response]
     ↓
[Guardrail AI checks:]
  - Out of character? (Alpha không bao giờ dùng emoji)
  - Factually wrong? (check against knowledge cards)
  - Contradicts Chip's last message? (check shared context)
  - Harmful content?
     ↓
[If pass] → Send to student
[If fail] → Regenerate with warning
```

```yaml
guardrail_checks:
  out_of_character:
    - check: "Alpha using emoji"
    - check: "Chip being too harsh"
    - action: "regenerate_with_warning"
    
  factual_accuracy:
    - check_against: "knowledge_cards_database"
    - flag_if: "contradicts_verified_info"
    
  contradiction_check:
    - check_against: "shared_context_board"
    - flag_if: "contradicts_recent_ai_message"
    
  harmful_content:
    - check: "toxic_language"
    - check: "inappropriate_for_students"
```

---

## Lớp 3: AI Runtime

### Model Selection Strategy

Không phải AI nào cũng cần GPT-4/Gemini Pro. Phân tầng:

| Persona/Role | Model Tier | Lý do |
|:--|:--|:--|
| Mr. Alpha (giảng viên chính) | Gemini Pro / Claude Sonnet | Cần reasoning sâu, giảng giải lý thuyết |
| Chip (Buddy) | Gemini Flash / Claude Haiku | Nhanh, rẻ, phản ứng cảm xúc đơn giản |
| Boss Ping (tin nhắn sếp) | Template + small LLM | Chủ yếu là script pre-written |
| Story Director | Gemini Pro | Cần quyết định phức tạp |
| Guardrail | Small model (Llama 3B, Gemini Flash) | Chỉ check, không generate |

### Context Management

Một phiên trải nghiệm 7 ngày có thể dài hàng trăm tin nhắn. Nếu mỗi lần gọi AI đều gửi toàn bộ history → cost bùng nổ.

**Giải pháp 3 tầng memory:**

```yaml
memory_tiers:
  short_term:
    scope: "last_10_messages"
    format: "full_text"
    send_to_ai: true
    
  mid_term:
    scope: "last_2_days"
    format: "bullet_point_summary"
    send_to_ai: true
    
  long_term:
    scope: "entire_journey"
    format: "metadata_only"
    contains: ["decisions", "stress_peaks", "branch_choices"]
    send_to_ai: false  # chỉ dùng cho report generation
```

### Cost Control

LUMINA phải tracking chi phí ở 3 mức:

- **Per message**: Mỗi tin nhắn AI tốn bao nhiêu token?
- **Per session** (7 ngày): Tổng chi phí của 1 học sinh hoàn thành?
- **Per scenario**: Ngành nào đang tốn nhiều nhất?

**Ước tính sơ bộ cho 1 session SE 7 ngày:**

- ~200 tin nhắn AI phát ra
- ~150 tin nhắn AI nhận từ student
- Average 500 tokens/exchange
- Total: ~175,000 tokens
- Cost Gemini Pro: ~$0.5-0.8/session
- Cost với Guardrail + tiered model: ~$0.8-1.2/session

**Giá bán nên tối thiểu $15-20 cho 1 ngành để có margin.**

```yaml
cost_monitoring:
  per_message_tracking: true
  per_session_budget: "$1.20"  # max cost for 7-day experience
  per_scenario_analytics: true
  
cost_optimization:
  use_cache_for: ["repeated_explanations", "knowledge_card_content"]
  batch_requests: true
  smart_model_routing:
    - if: "simple_encouragement" then: "gemini_flash"
    - if: "complex_explanation" then: "gemini_pro"
    - if: "factual_check" then: "guardrail_model"
```

---

## 3 dạng AI khác nhau trong LUMINA

### Loại A — Character AI (Nhân vật)

Có mặt trong Chat. Học sinh tương tác trực tiếp.

**Examples trong SE scenario:**
- **Mr. Alpha**: Giảng viên nghiêm khắc
- **Chip**: AI Buddy hỗ trợ
- **Boss Nam**: Sếp startup áp lực
- **Client Linh**: Khách hàng khó tính

Mỗi scenario có 3-6 Character AI.

### Loại B — Director AI (Đạo diễn)

Không hiện trên UI. Điều phối story flow.

**Examples:**
- **Story Director**: Điều phối tổng thể kịch bản
- **Pressure Controller**: Quản lý stress level
- **Branch Arbiter**: Quyết định khi nào kích hoạt rẽ nhánh

Mỗi scenario có 1-2 Director AI.

### Loại C — System AI (Hạ tầng)

Chạy background. Học sinh không bao giờ biết đến.

**Examples:**
- **Guardrail**: Kiểm duyệt nội dung AI
- **Hallucination Monitor**: Phát hiện thông tin sai
- **Sentiment Analyzer**: Đo cảm xúc học sinh
- **Report Generator**: Sinh báo cáo cuối khóa

Cả platform chia sẻ chung.

---

## AI Persona tái sử dụng cross-scenario

Đây là điểm quan trọng — **tái sử dụng**:

- **Kịch bản SE** dùng: Alpha (teacher), Chip (buddy), Nam (boss)
- **Kịch bản Marketing** có thể dùng: Alpha (tái dùng!), Chip (tái dùng!), Linh (client mới)

Mr. Alpha không "thuộc" về kịch bản nào cả — nó là một **persona entity** trong Persona Registry, được kịch bản "thuê" về đóng vai.

### Role Variants

Một Persona có thể có **role variants**:

```yaml
persona_id: "teacher_alpha"
base_personality: "strict_academic"

variants:
  se_teacher:
    specialization: "algorithms_and_systems"
    knowledge_sources: ["se_curriculum_verified"]
    
  medical_teacher:
    specialization: "anatomy_and_diagnosis"
    knowledge_sources: ["medical_curriculum_verified"]
    
  law_teacher:
    specialization: "case_law_and_precedents"
    knowledge_sources: ["law_curriculum_verified"]
```

Cùng một tính cách cốt lõi (nghiêm khắc, học thuật) nhưng adapt sang ngành khác.

---

## Pipeline tương tác AI — Runtime

Quy trình vận hành của ứng dụng khi có tương tác:

**1. Giai đoạn Load:** Khi người dùng vào Ngày 3, App fetch dữ liệu YAML của kịch bản.

**2. Giai đoạn Render UI:**
- Hệ thống đọc `widget_type` từ kịch bản
- React render component tương ứng ở khu vực trung tâm
- Truyền `initial_state` vào component

**3. Giai đoạn Prompt Injection (Mấu chốt):**

Hệ thống gửi một "Siêu Prompt" đến AI bao gồm:

- **Context:** Nội dung ngày hiện tại từ YAML
- **Persona:** Chỉ dẫn về nhân vật AI đang nói
- **Shared Context Board:** Tình trạng các AI khác
- **User State:** Lịch sử tương tác của người dùng
- **Instruction:** Hành động cụ thể AI cần thực hiện

**4. AI tạo Control JSON** như ví dụ trong tài liệu Kịch bản.

**5. App React xử lý JSON:**

- Cập nhật Chat UI
- Cập nhật Widget state
- Cập nhật Vitals (Stress Meter, Buddy Mood)
- Kích hoạt Events (Modal, Animation)

---

## Ảnh hưởng đến thiết kế màn hình

### Persona Studio (màn 3)
Không chỉ là "chỉnh slider", cần:
- Sub-tabs: Identity, Personality, System Prompt, Knowledge Access, Triggers
- Preview chat để test
- Version control (giống Git cho personas)
- Variant manager (SE teacher vs Medical teacher)

### Orchestrator Console (màn 13)
Màn hình riêng cho admin cấu hình:
- Priority Matrix cho từng kịch bản
- Shared Context rules
- Visual flow của AI coordination

### Workspace (màn 7)
Cần thêm:
- Chỉ báo AI "đang suy nghĩ" (typing indicator theo persona)
- Shared context visualization cho admin mode (không hiện cho student)

### Analytics Dashboard (màn 16)
Cần thêm:
- AI Cost Monitor
- Hallucination Log
- Persona Performance (Alpha có đang "on-character" không?)
- Orchestration Issues (có lần nào AI mâu thuẫn không?)

---

## Tóm tắt

| Thành phần | V1 |
|:--|:--|
| Số lớp kiến trúc | **3** (Persona / Orchestrator / Runtime) |
| Số loại AI | **3** (Character / Director / System) |
| Character AI/scenario | 3-6 |
| Director AI/scenario | 1-2 |
| System AI (platform) | 4+ (Guardrail, Hallucination, Sentiment, Report) |
| Memory tiers | 3 (short / mid / long-term) |
| Cost target/session | **< $1.20** |
| Tái sử dụng | Cross-scenario qua Persona Registry + Role Variants |
