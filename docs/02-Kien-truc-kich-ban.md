# 02 — Kiến trúc Kịch bản

## Định nghĩa Kịch bản

**Kịch bản** là một file dữ liệu có cấu trúc (YAML/JSON) mô tả toàn bộ trải nghiệm 7 ngày của một học sinh trong một ngành/vị trí cụ thể. Nó **không phải là một ứng dụng**, **không phải là code**, mà là **"bản thiết kế trải nghiệm"** để engine LUMINA diễn giải và dựng lên.

### Ẩn dụ giải thích

- **Kịch bản** giống như **bản nhạc** (sheet music)
- **Engine LUMINA** giống như **dàn nhạc**
- **Widget** giống như **nhạc cụ**
- **AI (Teacher, Buddy)** giống như **nhạc công**
- **Học sinh** là **khán giả** — nhưng cũng đồng thời là **người chỉ huy vô hình**, vì phản ứng của họ ảnh hưởng đến cách dàn nhạc chơi tiếp

### Những đặc tính quan trọng của kịch bản

1. **Kịch bản là "dead data" cho đến khi chạy**: File YAML không "làm" gì cả. Engine + AI mới là thứ thổi hồn vào nó.

2. **Cùng một kịch bản, mỗi học sinh trải nghiệm khác nhau**: Vì AI phản ứng theo hành vi cá nhân, dù khung cứng nhưng "thịt" khác nhau.

3. **Kịch bản có thể fork / remix / version**: Kịch bản B có thể dựa trên kịch bản A (inheritance). Sửa kịch bản A không ảnh hưởng đến học sinh đang trải nghiệm B.

4. **Kịch bản testable**: Admin có thể "playtest" kịch bản mà không cần trải nghiệm thật — Engine có thể mô phỏng phản hồi của học sinh trung bình để test logic.

5. **Kịch bản quốc tế hóa được**: Cùng cấu trúc, chỉ đổi ngôn ngữ của các đoạn text → bản tiếng Việt, tiếng Anh, tiếng Nhật...

---

## Cấu trúc một kịch bản — 5 lớp

### Lớp 1: Metadata (Thông tin chung)

```yaml
scenario_meta:
  id: "se-junior-to-senior-v1.2"
  name: "Kỹ thuật Phần mềm: Từ Junior đến Senior"
  major: "Software Engineering"
  level: "Entry-to-Senior Evolution"
  version: "1.2"
  author: "LUMINA Team"
  created_date: "2026-04-15"
  total_days: 7
  expected_dropout_rate: 0.35  # 35% nhận ra không hợp
  difficulty_stars: 4
  target_audience: ["grade_12", "university_year_1"]
  tags: ["programming", "problem_solving", "team_work", "stress_handling"]
```

### Lớp 2: Cast (Dàn nhân vật AI)

```yaml
characters:
  - id: "teacher_alpha"
    name: "Mr. Alpha"
    role: "Giảng viên nghiêm khắc"
    persona_type: "character"  # hiển thị trên UI
    personality:
      strictness: 0.85
      warmth: 0.25
      verbosity: 0.40
      humor: 0.10
      patience: 0.50
    visual:
      avatar_style: "geometric_minimal"
      color_theme: "ink_900"
      expressions: [neutral, thoughtful, strict, disappointed]

  - id: "buddy_chip"
    name: "Chip"
    role: "AI Buddy"
    persona_type: "character"
    personality:
      strictness: 0.15
      warmth: 0.90
      verbosity: 0.70
      humor: 0.85
      patience: 0.95
    visual:
      avatar_style: "friendly_robot"
      color_theme: "lumina_300"
      expressions: [happy, concerned, encouraging, excited]

  - id: "story_director"
    name: "Story Director"
    role: "Điều phối kịch bản"
    persona_type: "director"  # ẩn với user
    priority: 1.0  # cao nhất trong orchestration
```

### Lớp 3: Timeline (Lộ trình 7 ngày)

Đây là phần "xương sống" của kịch bản. Mỗi ngày gồm:

- **Theme** (chủ đề của ngày): "Cơn say", "Khủng hoảng", "Đêm trắng"...
- **Goal** (mục tiêu đo lường): Kiểm tra khả năng gì của học sinh
- **Academic Snippet** (20% lý thuyết): Knowledge card sẽ được mở khóa
- **Simulation Context** (bối cảnh): Câu chuyện của ngày hôm đó
- **Widget Setup**: Widget nào được gắn, cấu hình ra sao
- **Triggers** (các sự kiện kích hoạt): Khi nào Boss ping, khi nào bug xuất hiện, khi nào thời gian hết

```yaml
timeline:
  - day: 1
    theme: "Cơn say sáng tạo"
    goal: "Kiểm tra sự hứng thú với lập trình và tư duy logic"
    
    academic_snippet:
      title: "Tư duy thuật toán cơ bản"
      content_md: |
        Lập trình không phải về việc ghi nhớ cú pháp, mà về việc chia nhỏ 
        vấn đề phức tạp thành các bước đơn giản. Đây là tư duy thuật toán...
      knowledge_card_unlock: "algo_thinking_101"
      estimated_time_minutes: 15
    
    simulation:
      context: |
        Bạn là thành viên mới của một Startup giao đồ ăn. Hôm nay là ngày 
        đầu tiên, và bạn được giao nhiệm vụ hoàn thiện tính năng "Tính tiền đơn hàng".
      
      widget_setup:
        primary_widget: "code_space_v2"
        widget_config:
          initial_code: |
            // TODO: Hoàn thiện hàm tính tiền
            function calculateOrderTotal(items) {
              return 0;
            }
          language: "javascript"
          hidden_bugs: []
          time_limit: null
          difficulty_level: 1
      
      triggers:
        - condition: "time_elapsed > 30m AND no_progress"
          action: "buddy_encouragement"
          message_template: "Hey, đang vướng ở đâu vậy? Để tớ gợi ý nhé!"
          
        - condition: "solution_correct AND time_spent < 10m"
          action: "teacher_impressed"
          message_template: "Không tệ! Nhưng thử nghĩ xem có cách nào tối ưu hơn không?"

  - day: 3
    theme: "Khủng hoảng hệ thống"
    goal: "Demo áp lực - khả năng xử lý sự cố dưới deadline"
    
    simulation:
      context: |
        2h sáng. App giao hàng bị sập vì quá nhiều đơn đặt cùng lúc (Black Friday). 
        Bạn nhận được 15 tin nhắn từ sếp. Khách hàng đang phàn nàn trên social media.
        
      widget_setup:
        primary_widget: "log_hunter_v1"
        secondary_widgets: ["team_chat_v1"]
        widget_config:
          log_severity: "critical"
          error_patterns: ["OutOfMemoryException", "Database timeout", "Rate limit exceeded"]
          time_pressure: true
          countdown_minutes: 15
          
      triggers:
        - condition: "time_elapsed > 5m AND no_action"
          action: "boss_pressure_message"
          priority: 0.9
          message_template: "TÌM RA NGUYÊN NHÂN CHƯA? Chúng ta đang mất $100k mỗi phút!"
          
        - condition: "incorrect_solution_attempts >= 3"
          action: "buddy_intervention"
          priority: 0.95
          delay_seconds: 4
          message_template: "Hít thở sâu. Nhớ lại bài Big O hôm qua không?"
          
        - condition: "stress_level > 90"
          action: "ui_stress_vignette"
          effect: "red_screen_pulse"
```

### Lớp 4: Branching Logic (Cây quyết định)

Đây là phần phức tạp nhất — **quyết định của học sinh làm kịch bản rẽ nhánh như thế nào**.

#### Cấu trúc rẽ nhánh V1: 2 Branch Points + 5 Endings + 1 Dynamic Tension

```yaml
branching:
  # Branch Point 1: Technical Choice (Day 4)
  - point: "day_4_technical_choice"
    trigger: "end_of_day_3"
    prompt: "Bạn muốn chuyên sâu về mảng nào?"
    options:
      - id: "frontend_path"
        label: "Frontend/Mobile (Giao diện người dùng)"
        description: "Tập trung vào trải nghiệm người dùng, thiết kế UI/UX"
        affects_days: [4, 5, 6]
        widget_changes:
          day_4: 
            primary_widget: "design_forge_v1"
          day_5:
            primary_widget: "user_feedback_simulator_v1"
            
      - id: "backend_path" 
        label: "Backend/Data (Hệ thống & Dữ liệu)"
        description: "Tập trung vào hiệu suất, database, APIs"
        affects_days: [4, 5, 6]
        widget_changes:
          day_4:
            primary_widget: "database_architect_v1"
          day_5:
            primary_widget: "api_load_tester_v1"
    
    tracking:
      measures: ["time_to_decide", "hover_patterns", "questions_asked"]
      
  # Branch Point 2: Values Choice (Day 6) 
  - point: "day_6_ethics_choice"
    trigger: "day_6_morning"
    prompt: |
      Ngày mai là deadline launch sản phẩm. Bạn phát hiện một lỗi nhỏ về 
      bảo mật dữ liệu người dùng. Sếp nói: 'Kệ nó đi, launch đúng hạn quan trọng hơn!'
    options:
      - id: "ethics_first"
        label: "Đặt đạo đức lên trên"
        consequence: "Delay launch, nhưng dữ liệu user được bảo vệ"
        affects_ending: true
        
      - id: "deadline_first"  
        label: "Ưu tiên tiến độ"
        consequence: "Launch đúng hạn, nhưng có nguy cơ scandal sau này"
        affects_ending: true

# Dynamic Branching (Stress-based reactive)
dynamic_branching:
  - condition: "stress_level > 85 for 3_consecutive_days"
    action: "early_exit_branch"
    ending: "burnout_early"
    buddy_intervention: true
    intervention_message: |
      "Hey, tớ thấy cậu đang rất mệt. Có muốn nghỉ một chút không? 
      Nhận ra mình cần nghỉ ngơi cũng là một kỹ năng quan trọng đấy."
```

#### 5 Endings

```yaml
endings:
  - id: "the_natural"
    trigger_conditions:
      - "stress_avg < 40"
      - "performance_score > 80"
      - "knowledge_application_rate > 75"
    title: "The Natural"
    message: |
      Bạn sinh ra để làm ngành này. Tư duy logic mạnh, chịu áp lực tốt, 
      và có khả năng học hỏi nhanh chóng. Hãy tự tin lựa chọn ngành này.
    career_recommendation: "high_confidence"
    
  - id: "the_fighter"
    trigger_conditions:
      - "stress_avg > 70" 
      - "performance_score > 75"
      - "persistence_score > 80"
    title: "The Fighter" 
    message: |
      Bạn có thể làm được, nhưng phải trả giá. Bạn kiên trì và quyết tâm cao, 
      nhưng ngành này gây áp lực lớn cho bạn. Cân nhắc kỹ về sức khỏe tinh thần.
    career_recommendation: "conditional_yes"
    
  - id: "the_wrong_fit"
    trigger_conditions:
      - "stress_avg > 75"
      - "performance_score < 50" 
      - "enjoyment_score < 30"
    title: "The Wrong Fit"
    message: |
      Dựa trên dữ liệu, ngành này có thể không phù hợp với bạn. Hãy khám phá 
      các ngành liên quan hoặc tìm hiểu về điểm mạnh khác của bạn.
    career_recommendation: "not_recommended"
    
  - id: "the_reluctant" 
    trigger_conditions:
      - "stress_avg < 50"
      - "performance_score < 65"
      - "engagement_score < 40"
    title: "The Reluctant"
    message: |
      Bạn không ghét ngành này, nhưng cũng không đủ yêu. Có thể bạn cần tìm 
      một lĩnh vực khiến bạn thực sự phấn khích.
    career_recommendation: "explore_alternatives"
    
  - id: "the_burnout"
    trigger_conditions:
      - "early_exit: true"
      - "stress_level > 90 for consecutive_days"
    title: "The Early Exit"
    message: |
      Nhận ra sớm rằng mình cần nghỉ ngơi là một dấu hiệu trưởng thành. 
      Ngành này có thể không phù hợp với nhịp làm việc của bạn.
    career_recommendation: "consider_work_life_balance"
```

### Lớp 5: Evaluation Hooks (Điểm đo lường)

Những "cảm biến" ẩn được cài vào kịch bản:

```yaml
evaluation_hooks:
  # Behavioral metrics
  behavioral_metrics:
    - metric: "stress_tolerance"
      measure: "max_stress_sustained_minutes"
      weight: 0.25
      
    - metric: "problem_solving_persistence"  
      measure: "attempts_before_asking_help"
      weight: 0.20
      
    - metric: "collaboration_tendency"
      measure: "frequency_of_buddy_interaction"
      weight: 0.15
      
    - metric: "ethical_orientation"
      measure: "choices_favoring_ethics_over_speed"
      weight: 0.15
      
    - metric: "learning_speed"
      measure: "time_to_apply_knowledge_cards"
      weight: 0.25

  # Decision tracking
  decision_tracking:
    - decision_point: "day_4_technical_choice"
      track: ["time_to_decide", "questions_asked", "option_hover_time"]
      
    - decision_point: "day_6_ethics_choice"  
      track: ["decision_time", "stress_level_during_choice"]
      
  # Knowledge application
  knowledge_application:
    - knowledge_card: "big_o_notation"
      application_test: "day_3_performance_optimization"
      success_criteria: "applies_concept_within_10_minutes"
```

---

## Mức độ "cứng" và "mềm" — Tỷ lệ 60/40

### 60% Cứng (Không thương lượng — đây là xương sống)

- **Timeline 7 ngày**: Day 1 luôn là "Cơn say", Day 3 luôn là "Khủng hoảng"...
- **Key Events**: Server sập lúc 2h sáng là bắt buộc xảy ra, không AI nào được skip
- **Knowledge Cards**: Big O là thẻ bài của Day 2, nội dung đã được chuyên gia duyệt
- **Evaluation Hooks**: Các "cảm biến" đo lường phải cố định để báo cáo có giá trị khoa học
- **Endings**: 5 ending được định nghĩa rõ, AI không tự tạo ending mới
- **Branch Points**: Điểm rẽ nhánh ở Day 4-5 là cố định, nội dung mỗi nhánh được viết trước

### 40% Mềm (AI được tự do)

- **Cách diễn đạt thoại**: Mr. Alpha hôm nay có thể nói "Bạn có chắc không?" hoặc "Nghĩ kỹ chưa?" — cùng ý, khác câu chữ
- **Phản ứng với hành vi**: Tùy vào stress level của học sinh mà điều chỉnh giọng điệu
- **Trả lời câu hỏi ngoài lề**: "Em đói quá" → AI có thể đáp "Ăn đi rồi quay lại, deadline vẫn chạy đấy"
- **Gợi ý scaffolding**: Tùy số lần sai mà AI tạo hint phù hợp

### Guardrails kỹ thuật

- AI luôn được inject "System Prompt" với ranh giới rõ ràng
- Có **Hallucination Monitor** để flag các câu bất thường
- Knowledge Cards được query từ Vector DB — AI buộc phải citation đúng nguồn, không được bịa
- Có bộ **Forbidden Topics** filter

---

## Cách kịch bản tương tác trong runtime

### Workflow thực thi

**Bước 1 — Load kịch bản**
Engine đọc file YAML/JSON của kịch bản vào memory. Khởi tạo Cast, thiết lập Timeline, cài Triggers cho Ngày 1.

**Bước 2 — Render Day N**
- Dựa vào Widget Setup của Ngày N, Engine lấy các widget tương ứng từ Widget Registry
- Truyền inputs (từ kịch bản) vào widget
- Render 3-zone layout: Chat (trái) | Widget (giữa) | Vitals (phải)
- AI Teacher phát biểu câu đầu tiên theo kịch bản

**Bước 3 — Interaction Loop (vòng lặp chính)**

```
1. Học sinh thao tác (gõ code, kéo thả ticket, chat...)
2. Widget emit event → gửi cho Engine
3. Engine kiểm tra Triggers của kịch bản:
   - Có điều kiện nào được kích hoạt không?
4. Engine tổng hợp context gửi cho AI:
   - Lịch sử tương tác
   - Trạng thái widget hiện tại
   - Event vừa xảy ra
   - Prompt của AI Persona
5. AI phản hồi JSON chứa:
   - Tin nhắn cho Chat
   - Lệnh điều khiển Widget (action)
   - Cập nhật Vitals (stress meter, buddy mood)
   - Kích hoạt UI events (glitch, vignette...)
6. Engine áp dụng JSON → UI cập nhật
7. Quay lại bước 1
```

**Bước 4 — Branching**
Khi đến điểm rẽ nhánh, Engine lưu lại lựa chọn và load nhánh kịch bản tương ứng cho các ngày tiếp theo.

**Bước 5 — End of Day**
- Engine tổng kết dữ liệu của ngày (stress peak, decisions made, time spent...)
- Lưu vào user profile
- Chuyển sang Day N+1, unlock knowledge card đã học

**Bước 6 — Final Report**
Sau Ngày 7 hoặc khi học sinh bỏ cuộc:
- Engine phân tích toàn bộ dữ liệu đã thu thập
- Chạy qua bộ quy tắc "Career-Fit Analytics"
- Sinh ra báo cáo PDF

---

## Ví dụ JSON phản hồi từ AI

Khi người dùng chat với AI, AI phản hồi về một chuỗi JSON control instructions:

```json
{
  "ai_persona": "teacher_alpha",
  "ai_message": "Ngắt Server 2? Bạn có điên không? Nhìn xem chuyện gì sẽ xảy ra với Server 1 khi nó phải gánh toàn bộ tải!",
  
  "control_instructions": {
    "update_widget": {
      "target": "NetworkTopologyWidget",
      "action": "simulate_server_failure",
      "data": {
        "failed_node_id": "server_2",
        "effect": {
          "target_node_id": "server_1",
          "new_status": "down",
          "new_load": 100
        },
        "system_status": "collapsed"
      }
    },
    "update_vitals": {
      "stress_level_change": 30,
      "buddy_mood": "panicked"
    },
    "trigger_event": {
      "type": "show_modal_overlay",
      "content": "HỆ THỐNG ĐÃ SỤP ĐỔ HOÀN TOÀN. THIỆT HẠI: $500.000"
    }
  }
}
```

App React sẽ đọc JSON này để:
- Hiển thị tin nhắn của AI lên khung chat
- Cập nhật hiệu ứng trên Widget (Server xoay vòng xoay)
- Tăng thanh áp lực (Stress Meter) lên 30 đơn vị
- Hiện popup lời cổ vũ của Chip

---

## Phân cấp kịch bản theo Level (V2+)

### Mô hình "Kịch bản tiến hóa" (Evolutionary Scenario)

Thay vì chia thành các khóa học tách biệt (A1, A2, A3), tích hợp chúng vào **trong cùng một kịch bản 7 ngày** nhưng theo dạng **"Nhảy vọt thời gian" (Time-jump)**.

| Ngày | Vai trò (Level) | Mục tiêu mô phỏng |
|:-:|:-:|:-:|
| 1-3 | Intern / Junior | **Thực thi:** Tập trung vào tư duy logic, fix bug, chịu đựng sự lặp đi lặp lại |
| 4-5 | Senior / Leader | **Giải quyết vấn đề:** Chọn giải pháp tối ưu và hướng dẫn người khác |
| 6-7 | CTO / Founder | **Tầm nhìn & Đạo đức:** Ra quyết định về tiền bạc, công nghệ và con người dưới áp lực phá sản |

### Tại sao làm thế này lại hay?

1. **Học sinh thấy được "Đích đến":** Có những em rất giỏi code nhưng cực kỳ ghét họp hành/quản lý. Khi trải nghiệm Ngày 6-7 (Level CTO), các em sẽ nhận ra: "À, mình chỉ muốn làm chuyên gia kỹ thuật thôi, không muốn làm quản lý". Đây là một phát hiện hướng nghiệp cực lớn!

2. **Cảm giác tiến bộ:** User cảm thấy mình "lên cấp" rất nhanh, tạo hưng phấn (Game-like experience).

3. **Đánh giá đa chiều:** Bản báo cáo cuối cùng sẽ nói: "Bạn có tố chất của một Junior xuất sắc nhưng cần rèn luyện thêm kỹ năng lãnh đạo nếu muốn thăng tiến nhanh."

---

## Tóm tắt

| Thành phần | V1 |
|:--|:--|
| Độ "cứng" | **60% cứng / 40% mềm** |
| Số Branch Points | **2 cố định** (Day 4: Technical, Day 6: Values) |
| Dynamic Branching | **1 stress-based reactive** |
| Số Endings | **5** (Natural / Fighter / Wrong-Fit / Reluctant / Burnout) |
| Format | YAML/JSON |
| Tạo bởi | Scenario Architect (visual editor) |
| Đọc bởi | LUMINA Engine + AI Orchestrator |
