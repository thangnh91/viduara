# 05 — Tổ chức người dùng

## Nguyên tắc tổ chức

LUMINA áp dụng **RBAC (Role-Based Access Control) Hybrid**: phân role rõ ràng ngay từ V1, nhưng **flexible — một user có thể mang nhiều role cùng lúc**.

### Tại sao không phải Super Admin làm hết?

**Ưu điểm của Super Admin (1 role):**
- Đơn giản, launch nhanh
- Phù hợp khi team LUMINA ban đầu chỉ 3-5 người

**Nhược điểm nghiêm trọng:**
- Khi team lớn lên (10+ người): không ai chuyên sâu
- Quyền quá rộng → rủi ro (1 nhầm lẫn có thể phá nhiều scenario)
- **Không sẵn sàng cho V2-V3** — khi mở cho external creators, phải refactor permission system từ đầu

### Tại sao Hybrid tốt hơn?

- Mỗi người chuyên sâu một mảng → chất lượng cao
- Phân quyền rõ ràng → ít rủi ro
- **Sẵn sàng cho V2-V3 mà không cần refactor** — chỉ thêm role mới vào hệ thống đã có
- Một user có thể mang nhiều role cùng lúc → linh hoạt cho team nhỏ

---

## Hệ thống Permissions

```yaml
permissions:
  # Scenario permissions
  scenario.create: "Tạo kịch bản mới"
  scenario.edit: "Chỉnh sửa kịch bản"
  scenario.delete: "Xóa kịch bản"
  scenario.publish: "Đưa kịch bản lên production"
  scenario.read: "Xem kịch bản"
  
  # Persona permissions
  persona.create: "Tạo AI persona mới"
  persona.edit: "Chỉnh sửa persona"
  persona.test: "Test persona trong playground"
  persona.read: "Xem persona"
  
  # Widget permissions
  widget.create: "Tạo widget mới"
  widget.edit: "Chỉnh sửa widget"
  widget.deploy: "Deploy widget lên production"
  widget.read: "Xem widget"
  
  # Knowledge permissions
  knowledge.curate: "Biên tập knowledge cards"
  knowledge.approve: "Duyệt nội dung knowledge"
  knowledge.read: "Xem knowledge cards"
  
  # Analytics permissions
  analytics.view: "Xem dashboard analytics"
  analytics.export: "Export dữ liệu analytics"
  
  # User management permissions
  users.manage: "Quản lý user & role"
  users.invite: "Mời user mới"
  
  # System permissions
  system.config: "Cấu hình hệ thống"
  system.backup: "Backup/restore dữ liệu"
```

---

## V1 Internal Roles — 6 Role chính

### 1. Scenario Designer

```yaml
role_id: "designer"
display_name: "Scenario Designer"
description: "Thiết kế trải nghiệm học sinh, tạo kịch bản"

permissions:
  - scenario.*  # full scenario permissions
  - persona.read
  - widget.read
  - knowledge.read
  - analytics.view

typical_users:
  - "Instructional designers"
  - "Educational content creators"
  - "Domain experts với writing skills"
  
estimated_count: 2-3
```

### 2. AI Persona Writer

```yaml
role_id: "persona_writer"
display_name: "AI Persona Writer"
description: "Tạo và tinh chỉnh tính cách AI characters"

permissions:
  - persona.*
  - scenario.read  # để hiểu context
  - analytics.view  # để xem persona performance
  
typical_users:
  - "Creative writers"
  - "Psychology/education experts"
  - "Conversation designers"
  
estimated_count: 1-2
```

### 3. Widget Engineer

```yaml
role_id: "engineer"
display_name: "Widget Engineer"
description: "Xây dựng các tool mô phỏng"

permissions:
  - widget.*
  - scenario.read  # để hiểu yêu cầu
  
typical_users:
  - "Frontend developers"
  - "UI/UX engineers"
  - "DevTools specialists"
  
estimated_count: 2-3
```

### 4. Curriculum Expert

```yaml
role_id: "curator"
display_name: "Curriculum Expert"
description: "Duyệt nội dung học thuật, knowledge cards"

permissions:
  - knowledge.*
  - scenario.read
  - persona.read
  
typical_users:
  - "University professors"
  - "Industry subject matter experts"
  - "Educational consultants"
  
estimated_count: 1 (có thể part-time)
```

### 5. Operations Manager

```yaml
role_id: "operator"
display_name: "Operations Manager"
description: "Giám sát hệ thống, analytics, support"

permissions:
  - analytics.*
  - users.manage
  - users.invite
  - scenario.read  # để troubleshoot
  - persona.read
  - widget.read
  
typical_users:
  - "Product managers"
  - "Operations specialists"
  - "Customer success managers"
  
estimated_count: 1
```

### 6. Super Admin

```yaml
role_id: "super_admin"
display_name: "Super Admin"
description: "Toàn quyền hệ thống"

permissions:
  - "*"  # tất cả permissions
  
typical_users:
  - "Founders"
  - "Technical leads"
  
estimated_count: 1-2
```

---

## Multi-role Assignment — Ví dụ thực tế

```yaml
users:
  - email: "alice@lumina.com"
    roles: ["designer", "persona_writer", "super_admin"]
    # Alice = founder, có thể làm mọi việc trong V1
    
  - email: "bob@lumina.com"
    roles: ["engineer", "operator"]
    # Bob = tech lead, làm widget + ops
    
  - email: "carol@lumina.com"
    roles: ["designer"]
    # Carol = chuyên design kịch bản
    
  - email: "dr.nguyen@university.edu"
    roles: ["curator"]
    # Dr. Nguyen = expert part-time, chỉ duyệt content
```

**Ý nghĩa thực tế**: Khi team nhỏ (3-5 người), founders mang nhiều role; khi team lớn lên, dần lấy bớt role của founders, giao cho người mới. **Không cần refactor code**.

---

## Workspace Concept — Chuẩn bị cho V2, V3

### Vấn đề cần giải quyết

Nếu V1 chỉ có 1 workspace "LUMINA Official", khi sang V2 muốn mở cho chuyên gia bên ngoài sẽ phải **refactor toàn bộ hệ thống**. Thay vào đó, thiết kế **Workspace concept từ V1** để V2-V3 chỉ cần thêm workspace type mới.

### V1 Foundation

```yaml
workspaces:
  - id: "lumina_official"
    name: "LUMINA Official"
    type: "internal"
    owner: "LUMINA Team"
    
    resources:
      scenarios: ["se-official-v1", "marketing-official-v1", ...]
      personas: ["teacher_alpha", "buddy_chip", ...]
      widgets: ["code_space_v2", "task_board_v1", ...]
    
    permissions:
      internal_roles: ["full_access"]
      external_roles: ["read_only"]
```

### V2 Extension (Preview)

```yaml
workspaces:
  - id: "dr_nguyen_workspace"
    name: "Dr. Nguyễn Văn A - Medical Expert"
    type: "expert"
    owner: "dr.nguyen@medical.edu"
    verification_status: "verified"
    
    resources:
      scenarios: ["medical-diagnosis-v1", "surgery-prep-v2"]
      personas: ["dr_nguyen_persona", "patient_simulator"]
      widgets: []  # shared from official workspace, không được tạo riêng
    
    permissions:
      owner: ["scenario.create", "persona.create", "knowledge.curate"]
      lumina_reviewers: ["scenario.review", "persona.review"]
      public: ["read_only_after_approved"]
```

### V3 Extension (Preview)

```yaml
workspaces:
  - id: "community_creator_123"
    name: "Community Creator"
    type: "community"
    owner: "user123@email.com"
    verification_status: "unverified"
    
    resources:
      scenarios: ["experimental-gamedev-v1"]  # luôn gắn label "experimental"
      personas: []  # chỉ được dùng shared personas
      widgets: ["custom_widget_sandbox"]  # chỉ chạy trong sandbox
      
    permissions:
      owner: ["experimental_scenario.create"]
      public: ["read_only"]
      disclaimer: "This is experimental content, not official LUMINA curriculum"
```

---

## V2 Expert Roles (Preview)

Khi mở sang V2, chỉ cần **thêm** các role mới, không sửa role V1:

### Expert Creator

| Permission | Trong workspace riêng | Với shared resources |
|:--|:--|:--|
| Tạo scenario | ✅ | ❌ |
| Tạo persona | ✅ | ❌ |
| Tạo widget | ❌ | ❌ (chỉ propose) |
| Publish scenario | ❌ (cần LUMINA review) | ❌ |
| Đọc shared widgets | ✅ | ✅ |
| Đọc shared knowledge | ✅ | ✅ |

### Verified Expert (Tier cao hơn)

Như Expert Creator + thêm:
- Publish scenario sau review
- Propose new widgets (LUMINA build)
- Access analytics của scenario mình

### LUMINA Internal Roles mở rộng V2

| Role mới | Quyền |
|:--|:--|
| **Reviewer** | Duyệt scenarios của experts trước khi publish |
| **Verification Officer** | Xác thực credential của expert (bằng cấp, license) |

**Key insight**: Expert **không có** access vào LUMINA's internal workspace. Họ chỉ làm việc trong workspace của họ + đọc shared library.

---

## V3 Community Roles (Preview)

### Community Creator

```yaml
role_id: "community_creator"
description: "User thường tạo experimental content"

permissions:
  experimental_scenario.create: true
  widget.use_sandboxed: true
  
restrictions:
  - scenario luôn bị gắn label "experimental"
  - không có impact vào Career-Fit Report
  - widget phải qua sandbox kiểm duyệt tự động
```

### Moderator

```yaml
role_id: "moderator"
description: "Kiểm duyệt community content"

permissions:
  - flag_content
  - escalate_to_lumina_team
  - warn_users
  
not_allowed:
  - ban_users  # chỉ LUMINA team
  - delete_content  # chỉ LUMINA team sau review
```

---

## Permission-based UI Rendering

Mỗi màn hình phải **hide/show features theo permission**:

```javascript
// Example: Scenario Architect chỉ hiện create button nếu có quyền
const ScenarioArchitect = () => {
  const { permissions } = useAuth();
  const canCreate = permissions.includes('scenario.create');
  const canEdit = permissions.includes('scenario.edit');
  
  return (
    <div className="scenario-architect">
      {canCreate && <CreateScenarioButton />}
      <ScenarioList editable={canEdit} />
    </div>
  );
};

// Example: Widget Studio ẩn hoàn toàn nếu user không có widget permissions
const Navigation = () => {
  const { permissions } = useAuth();
  const hasWidgetAccess = permissions.some(p => p.startsWith('widget.'));
  
  return (
    <nav>
      <NavItem to="/scenarios">Scenarios</NavItem>
      <NavItem to="/personas">AI Personas</NavItem>
      {hasWidgetAccess && <NavItem to="/widgets">Widgets</NavItem>}
      <NavItem to="/analytics">Analytics</NavItem>
    </nav>
  );
};
```

---

## Role-based Dashboard Customization

Mỗi role nhìn thấy dashboard khác nhau khi login:

```yaml
dashboard_customization:
  designer:
    default_view: "scenario_list"
    widgets: ["recent_scenarios", "pending_reviews", "analytics_summary"]
    
  persona_writer:
    default_view: "persona_playground"
    widgets: ["persona_performance", "conversation_samples", "testing_queue"]
    
  engineer:
    default_view: "widget_studio"
    widgets: ["widget_metrics", "integration_status", "performance_monitoring"]
    
  operator:
    default_view: "system_dashboard"
    widgets: ["user_activity", "system_health", "support_tickets", "usage_analytics"]
    
  super_admin:
    default_view: "overview"
    widgets: ["all_metrics", "user_management", "system_config", "backup_status"]
```

---

## Ảnh hưởng đến các màn hình V1

### Màn hình bị ảnh hưởng mạnh

**Màn 17 — User & Workspace Management:**
- Không chỉ list users, mà còn quản lý roles và workspaces
- Cần view: "Dr. Nguyen belongs to `dr_nguyen_workspace` with roles `[curator]`"

**Màn 18 — Role & Permission Management (màn mới):**
- Create/edit custom roles (kết hợp permissions)
- Assign roles cho users
- Audit log: ai sửa gì, khi nào

### Màn hình cần permission check

Tất cả các Studio và Admin screens cần:
- Check permission trước khi render action buttons
- Hide navigation items nếu không có access
- Show proper error khi thử access không có quyền

### Màn hình không bị ảnh hưởng (Learner screens)

- Gateway, Hub, Workspace, Buddy Chat, Final Report, Portfolio, System States
- Tất cả học sinh đều có cùng permissions (chỉ khác subscription tier trong V1+)

---

## Audit & Compliance

### Audit Log

Mọi hành động quan trọng phải log:

```yaml
audit_events:
  - role_assignment_change
  - scenario_publish
  - scenario_delete
  - persona_edit
  - widget_deploy
  - user_invite
  - permission_grant
  - system_config_change

log_retention: 90_days_minimum
access_to_logs: ["super_admin", "operator"]
```

### Compliance (V2+)

- **GDPR**: Dữ liệu hành vi của trẻ vị thành niên (học sinh lớp 12) phải được xử lý đặc biệt
- **COPPA**: Nếu mở rộng sang dưới 13 tuổi, cần consent của phụ huynh
- **Expert verification**: Bằng cấp/credential của expert phải được lưu encrypted, có thể audit

---

## Tóm tắt

| Thành phần | V1 |
|:--|:--|
| Mô hình | **RBAC Hybrid** (1 user nhiều roles) |
| Số Internal Roles V1 | **6** (Designer, Persona Writer, Engineer, Curator, Operator, Super Admin) |
| Workspace concept | **Nhúng từ V1** (LUMINA Official) — sẵn sàng V2-V3 |
| V2 thêm | Expert Creator, Verified Expert, Reviewer, Verification Officer |
| V3 thêm | Community Creator, Moderator |
| Permission enforcement | UI + API + Database level |
| Audit log | 90 ngày tối thiểu |
