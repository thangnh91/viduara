# 04 — Kiến trúc Widget

## Định nghĩa Widget

Widget trong LUMINA là **component độc lập có contract** (manifest với inputs/events/actions) được thiết kế để mô phỏng các tool thực tế của ngành nghề. Mỗi widget bám sát **1 superpower** của tool gốc, không phải toàn bộ tính năng.

### Tư duy cốt lõi

**Widget là "USB device"**: Nó không biết sẽ được cắm vào máy tính nào, nhưng nó tuân thủ chuẩn USB nên cắm đâu cũng chạy.
- Kịch bản là "máy tính"
- Widget là "USB device"

**Widget = Component có contract, không phải kịch bản:**

Một widget độc lập, có phản ứng khác nhau tùy vào dữ liệu đầu vào của các kịch bản riêng biệt. Ví dụ:
- Kịch bản A dùng widget W
- Kịch bản B cũng dùng W  
- Các action của W khác nhau dựa vào dữ liệu input từ A, B

Không thiết kế widget cứng chỉ phục vụ cho một kịch bản riêng lẻ.

---

## Nguyên tắc thiết kế Widget

### 1. "Inspired by" — không clone

Mô phỏng tool thực tế nhưng tránh vi phạm trademark/copyright:

- **Không dùng tên/logo gốc**: VS Code → "CodeSpace", Jira → "TaskBoard", Figma → "DesignForge"
- **Giữ lại patterns đặc trưng**: file tree bên trái, terminal dưới, tab top (kiểu VS Code)
- **Màu sắc/typography khác**: dùng design system LUMINA nhưng layout giống
- **Thêm chi tiết mang DNA LUMINA**: luôn có AI Buddy góc màn hình, stress meter

### 2. "1 tool = 1 superpower"

Mỗi widget chỉ mô phỏng 1 khả năng cốt lõi, không phải toàn bộ app:

| Công cụ thực | LUMINA widget | Superpower duy nhất |
|:--|:--|:--|
| VS Code | CodeSpace | Edit + highlight lỗi + terminal output |
| Jira | TaskBoard | Kéo thả ticket + priority conflict |
| Kibana | LogHunter | Search log + spot anomaly |
| ArgoCD | DeployFlow | Watch deployment + rollback decision |
| Figma | DesignForge | Align elements + feedback loop |
| Postman | APITester | Send request + read response |

### 3. Progressive Fidelity — độ chân thực tăng theo ngày

- **Ngày 1-2**: Widget đơn giản nhất có thể (1-2 panels, 5-10 buttons)
- **Ngày 3-4**: Thêm complexity — sidebar, tabs, keyboard shortcuts
- **Ngày 5-7**: Gần với bản thật (80% feature set của "superpower" đó)

Lý do: học sinh cần **cảm giác trưởng thành cùng công cụ**, giống như developer thật học VS Code từ cơ bản đến pro.

---

## Widget Contract (Manifest)

Mỗi widget có **4 phần** được chuẩn hóa:

### 1. Schema khai báo (Widget Manifest)

```yaml
widget_id: "code_space_v2"
name: "CodeSpace"
description: "Code editor inspired by VS Code, focused on live feedback"
category: "software-engineering"
superpower: "code_editing_with_live_feedback"
version: "2.1.3"
author: "LUMINA Team"
created_date: "2026-04-10"

# Progressive fidelity levels
fidelity_levels:
  beginner: # Day 1-2
    features: ["basic_editor", "syntax_highlight", "run_button"]
    complexity_score: 2
  intermediate: # Day 3-4
    features: ["file_tree", "terminal", "debug_panel", "shortcuts"]
    complexity_score: 5
  advanced: # Day 5-7
    features: ["extensions", "git_integration", "advanced_debug", "custom_themes"]
    complexity_score: 8

# Widget cần gì từ kịch bản?
inputs:
  - name: "initial_code"
    type: "string"
    required: true
    description: "Đoạn code khởi tạo"
    
  - name: "language"
    type: "enum"
    options: ["javascript", "python", "typescript", "java"]
    required: true
    
  - name: "hidden_bugs"
    type: "array"
    description: "Các bug được cài sẵn trong code"
    items:
      - line_number: "integer"
      - error_type: "string"
      - severity: "enum[error, warning, info]"
    required: false
    
  - name: "read_only_lines"
    type: "array[integer]"
    description: "Các dòng không được phép sửa"
    required: false
    
  - name: "time_limit"
    type: "integer"
    description: "Giới hạn thời gian (seconds), null = không giới hạn"
    required: false
    
  - name: "fidelity_level"
    type: "enum[beginner, intermediate, advanced]"
    description: "Độ phức tạp của widget"
    required: true

# Widget phát ra gì cho kịch bản biết?
events:
  - name: "on_code_change"
    payload:
      new_code: "string"
      lines_changed: "array[integer]"
      timestamp: "datetime"
      
  - name: "on_run"
    payload:
      output: "string"
      errors: "array"
      duration_ms: "integer"
      success: "boolean"
      
  - name: "on_bug_fixed"
    payload:
      bug_id: "string"
      line_number: "integer"
      attempts_count: "integer"
      
  - name: "on_give_up"
    payload:
      time_spent_seconds: "integer"
      code_completion_percentage: "float"

# Widget nhận lệnh gì từ kịch bản (AI điều khiển)?
actions:
  - name: "highlight_line"
    parameters:
      line_number: "integer"
      color: "enum[error, warning, success, info]"
      duration_seconds: "integer"
      
  - name: "inject_error"
    parameters:
      line_number: "integer"
      message: "string"
      severity: "enum[error, warning]"
      
  - name: "show_hint"
    parameters:
      content: "string"
      position: "enum[tooltip, modal, sidebar]"
      auto_dismiss_seconds: "integer"
      
  - name: "force_save"
    parameters: {}
    
  - name: "set_readonly_mode"
    parameters:
      enabled: "boolean"
      message: "string"

# Dependencies & compatibility
dependencies:
  runtime_requirements:
    browser_support: ["chrome >= 90", "firefox >= 85", "safari >= 14"]
    js_frameworks: ["react >= 18.0"]
    css_features: ["css_grid", "css_custom_properties"]
    
  external_apis:
    - name: "syntax_highlighter"
      url: "https://cdn.jsdelivr.net/npm/highlight.js@11.8.0"
      type: "required"
```

### 2. Visual Shell (UI)

Giao diện mô phỏng, không logic — chỉ nhìn. Giống skin của Discord/Slack, nhận ra ngay "à, đây là IDE" mà không cần đọc tên.

### 3. Interaction Layer (UX)

Các thao tác cốt lõi: click, drag, type, shortcut. Feedback ngay lập tức (syntax highlight, error underline...).

### 4. Scenario Hooks

Điểm kết nối với kịch bản AI — nơi "Sếp ping đột ngột", "bug đột ngột xuất hiện", "deadline đếm ngược". Widget không có logic riêng, nó phản hồi theo JSON từ AI.

---

## Cùng 1 Widget, nhiều kịch bản — Ví dụ minh họa

**Cùng widget `CodeSpace`, 3 kịch bản khác nhau dùng theo 3 cách:**

| Kịch bản | Input widget | Behavior |
|:--|:--|:--|
| **SE Day 1 - "Cơn say"** | `initial_code: ""`, `hidden_bugs: []`, `time_limit: null` | Widget cho phép viết code thoải mái, không áp lực |
| **SE Day 3 - "Khủng hoảng"** | `initial_code: [buggy_server_code]`, `hidden_bugs: [3 lỗi]`, `time_limit: 300s` | Widget hiện countdown, đỏ khi sắp hết giờ |
| **Data Science Day 2** | `initial_code: [pandas_template]`, `language: py`, `read_only_lines: [1-10]` | Widget lock 10 dòng đầu, chỉ cho edit phần phân tích |

Và AI trong kịch bản có thể **điều khiển widget từ xa**:

- Day 3: Khi user gõ được 30 giây, AI gửi action `inject_error(line: 45)` → một lỗi đột ngột xuất hiện → user phải fix thêm

Đây chính là "Data-driven Dynamic Rendering Platform" — engine đọc JSON, widget phản ứng theo data.

---

## V1 Widget Library — Software Engineering

### 5 Widget cốt lõi cho ngành SE

#### 1. CodeSpace (inspired by VS Code)

```yaml
superpower: "Code editing với live feedback"
xuất_hiện: [Day 1, Day 3, Day 4, Day 6]
fidelity_progression:
  day_1: "Basic editor + run button"
  day_3: "Thêm file tree + terminal + debug panel"
  day_6: "Full IDE với extensions + git integration"
```

#### 2. TaskBoard (inspired by Jira/Linear)

```yaml
superpower: "Drag-and-drop task management với priority conflicts"
xuất_hiện: [Day 1, Day 5]
fidelity_progression:
  day_1: "Simple kanban: To Do → In Progress → Done"
  day_5: "Advanced với sprint planning + story points + dependencies"
```

#### 3. LogHunter (inspired by Kibana/Datadog)

```yaml
superpower: "Log filtering và anomaly detection"
xuất_hiện: [Day 3]
fidelity_progression:
  day_3: "Search box + log list với syntax highlighting cho errors"
kịch_bản: "Server sập, phải tìm root cause từ hàng ngàn dòng log"
```

#### 4. DeployFlow (inspired by ArgoCD/Vercel)

```yaml
superpower: "Deployment monitoring và rollback decisions"
xuất_hiện: [Day 3, Day 6]
fidelity_progression:
  day_3: "Deployment pipeline visualization + health check"
  day_6: "Advanced với blue/green deployment + metric monitoring"
kịch_bản: "Deploy lỗi, phải quyết định rollback hay fix forward"
```

#### 5. TeamChat (inspired by Slack/Discord)

```yaml
superpower: "Team communication dưới pressure"
xuất_hiện: [Day 1-7] # xuyên suốt
fidelity_progression:
  day_1: "Simple chat với channels"
  day_3: "Thêm notification pressure (nhiều tin nhắn cùng lúc)"
  day_7: "Advanced với thread + reaction + status indicators"
role: "Kênh chính để AI Boss/Colleague giao tiếp với user"
```

### Widget Tái sử dụng Pattern

```yaml
# Kịch bản SE sử dụng
widgets_used:
  day_1: ["CodeSpace", "TaskBoard", "TeamChat"]
  day_3: ["CodeSpace", "LogHunter", "DeployFlow", "TeamChat"]
  day_5: ["TaskBoard", "TeamChat"] # focus on people management
  day_6: ["CodeSpace", "DeployFlow", "TeamChat"]

# Kịch bản Data Science có thể tái dùng
widgets_reused:
  - "CodeSpace" # cùng widget, khác config (language: python, libraries: pandas)
  - "TeamChat" # giống hệt
widgets_new:
  - "DataExplorer" # inspired by Jupyter/Tableau
  - "MLPipeline" # inspired by MLflow/Kubeflow
```

---

## Workspace Layout — 3 Zone

Widget được render trong màn Workspace theo cấu trúc 3 cột:

### Cột Trái (25% - Communication Zone)
- Thiết kế giống Slack/Discord
- Các AI Persona (Sếp, Giảng viên, Đồng nghiệp) nhắn tin
- Khi có tin nhắn mới từ Sếp lúc đang làm việc, cửa sổ này rung nhẹ hoặc hiện số thông báo đỏ

### Khu vực Trung tâm (60% - Execution Zone)
- Chứa "Hộp đen công cụ" (chính là Widget)
- Thay đổi theo ngành:
  - **IT:** Sơ đồ luồng hoặc các khối logic kéo thả
  - **Y:** Bảng chỉ số sinh tồn của bệnh nhân
  - **Luật:** Văn bản hợp đồng với dòng chữ highlight

### Cột Phải (15% - The Vitals Zone)
- **AI Buddy Avatar**: Nhân vật 2D/3D nhỏ, biểu cảm thay đổi
- **Stress Meter**: Thanh trượt từ xanh sang đỏ, tăng lên khi có áp lực
- **Túi đồ (Resources)**: Chứa các "mảnh kiến thức" đã học được (Knowledge Cards)

---

## Runtime — Cách React và JSON AI tương tác

### Trạng thái ban đầu

Khi người dùng bước vào Ngày 3, hệ thống đọc kịch bản:

```json
{
  "day": 3,
  "layout": "three_zone",
  "default_widget": "NetworkTopologyWidget",
  "initial_state": {
    "nodes": [
      { "id": "load_balancer", "status": "critical", "load": 95 },
      { "id": "server_1", "status": "critical", "load": 98 },
      { "id": "server_2", "status": "critical", "load": 99 }
    ],
    "traffic_source": "USA",
    "alert_level": "high"
  }
}
```

### React xử lý

1. React đọc `layout: "three_zone"` → render bộ khung 3 cột
2. React đọc `default_widget: "NetworkTopologyWidget"`. Trong code có "Map" các component:

```javascript
const widgetMap = {
  "NetworkTopologyWidget": LazyNetworkTopologyWidget,
  "CodeEditorWidget": LazyCodeEditorWidget,
  "DatabaseSchemaWidget": LazyDatabaseSchemaWidget,
  // ...hàng trăm widget khác
};
```

3. React lấy `LazyNetworkTopologyWidget` và đặt vào "Khu vực Trung tâm"
4. React truyền `initial_state` vào component dưới dạng **Props**. Component dựa vào data này để vẽ các node máy chủ màu đỏ.

### Tương tác và phản hồi động

Người dùng chat: *"Tôi sẽ thử ngắt kết nối Server 2 để giảm tải cho Load Balancer"*.

AI Mr. Alpha phân tích và tạo JSON phản hồi:

```json
{
  "ai_persona": "teacher_alpha",
  "ai_message": "Ngắt Server 2? Bạn có điên không?",
  
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

### React "nuốt" JSON và dựng hình lại

Ứng dụng React không render lại toàn bộ trang, mà sử dụng State Management để cập nhật từng phần:

1. **Cập nhật Khung Chat**: Message "Ngắt Server 2?..." được thêm vào, render với avatar Mr. Alpha
2. **Cập nhật Component Trung tâm**: 
   - State của NetworkTopologyWidget được cập nhật với `failed_node_id: "server_2"` và `server_1.status: "down"`
   - Component tự động vẽ lại: Node Server 2 biến mất, Server 1 chuyển sang xám
3. **Cập nhật Thanh phụ**:
   - Stress Meter tăng 30 đơn vị, chuyển đỏ đậm
   - AI Buddy chuyển biểu cảm "hoảng sợ"
4. **Kích hoạt Sự kiện**:
   - Component Modal hiện lên với dòng chữ "HỆ THỐNG ĐÃ SỤP ĐỔ..."

---

## Thư viện Component Phân loại

### Widget Cơ bản (Dùng cho nhiều ngành)
- CodeEditor
- Terminal
- Flowchart
- MarkdownViewer
- Chat
- Kanban

### Widget Chuyên ngành (Domain-specific)

**Y khoa:**
- PatientMonitor (theo dõi chỉ số sinh tồn)
- DragAndDropAnatomy (kéo thả giải phẫu)
- PrescriptionForm (đơn thuốc)

**Luật:**
- DocumentHighlighter (highlight văn bản)
- CourtroomSimulator (mô phỏng tòa án)
- ContractBuilder (soạn hợp đồng)

**Kinh doanh:**
- StockMarketGraph (biểu đồ chứng khoán)
- MarketingCampaignSlider (điều chỉnh ngân sách)
- BalanceSheetTable (bảng cân đối kế toán)

---

## Widget Studio Requirements

Để admin tạo widget mới, Widget Studio cần:

### Canvas Builder
- Kéo thả các "atomic elements": Button, Input, Panel, Chart, Tree View...
- Real-time preview với mock data
- Responsive preview (desktop/mobile)

### Manifest Editor
- Form để khai báo inputs/events/actions
- JSON schema validation
- Autocomplete cho common patterns

### Test Environment
- Mock scenario data để test widget
- Event emission testing
- Action response testing
- Performance monitoring (render time, memory usage)

### Version Control
- Git-like versioning cho widget
- Rollback to previous version
- Branch/merge for experimental features

---

## Liên kết với Scenario

### Composition Pattern (Kết hợp khi thiết kế kịch bản)

Khi soạn kịch bản trong Scenario Architect, không **tạo lại** Widget — mà **"thuê"** chúng từ registry:

```
┌─────────────────────────────────────────────┐
│  SCENARIO ARCHITECT (kịch bản SE Day 3)     │
│                                              │
│  Cast (thuê từ Persona Registry):           │
│    • Mr. Alpha ─────┐                       │
│    • Chip ──────────┤                       │
│    • Boss Nam ──────┘                       │
│                                              │
│  Widgets (thuê từ Widget Registry):         │
│    • CodeSpace ─────┐                       │
│    • TeamChat ──────┤                       │
│    • LogHunter ─────┘                       │
│                                              │
│  Kịch bản chỉ DEFINE:                       │
│    - Họ xuất hiện lúc nào                   │
│    - Widget được cấu hình ra sao            │
│    - Trigger gì xảy ra lúc nào              │
└─────────────────────────────────────────────┘
```

### Contract Pattern (Giao ước)

```
WIDGET CONTRACT (CodeSpace):
  - Inputs: {initial_code, language, hidden_bugs, time_limit}
  - Events emitted: [on_code_change, on_run, on_bug_fixed]
  - Actions accepted: [highlight_line, inject_error, show_hint]

SCENARIO uses widget through contract:
  Day 3, minute 5:
    → Widget CodeSpace emits `on_run` event
    → Scenario's trigger fires: "if output has error"
    → Scenario orchestrates: "Mr. Alpha respond with tone=disappointed"
    → Persona Alpha generates message
    → Scenario also commands: CodeSpace.highlight_line(45, red)
```

### Dependency Management

Khi một Widget thay đổi, các Scenario bị ảnh hưởng thế nào?

- **Sửa Widget CodeSpace** (thêm input mới `enforce_strict_typing`): Scenarios cũ vẫn dùng version cũ, scenarios mới có thể opt-in → **backward compatibility**
- **Xóa Widget**: Không được phép xóa nếu còn scenario đang dùng → **dependency graph**

LUMINA cần một **Dependency Manager** ở backend, và ít nhất 1 màn hình để admin **xem dependencies**: "CodeSpace đang được dùng bởi 12 scenarios, xem chi tiết trước khi sửa".

---

## Tóm tắt

| Thành phần | V1 |
|:--|:--|
| Widget cho Hero Major (SE) | **5 widget cốt lõi** |
| Pattern | Inspired by + 1 tool = 1 superpower |
| Fidelity | Progressive (Day 1 đơn giản → Day 7 phức tạp) |
| Cấu trúc | Manifest (inputs/events/actions) + Visual + Interaction + State |
| Tái sử dụng | Cross-scenario qua contract |
| Tạo bởi | Widget Studio |
| Render tại | Workspace (Execution Zone) |
