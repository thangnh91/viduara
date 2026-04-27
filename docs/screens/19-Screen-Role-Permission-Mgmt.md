# Screen 19 — Role & Permission Management

**Màn hình số:** 19  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐ (Trung bình thấp)  
**Primary users:** Super Admin (only)  
**Related flow:** Flow 07 — System Management (Sub-flow C: User Lifecycle)  
**Dependencies:** Screen 18 (User Management - applies roles)

---

## 0. Multi-domain Context

Role & Permission Mgmt là cấu hình meta — không phụ thuộc ngành. Tuy nhiên, V2+ có thể có domain-specific roles (ví dụ: "Medical Curator" với permissions chỉ trong Medical workspace).

**Examples used in this spec:**
- 6 internal roles: Designer, Persona Writer, Engineer, Curator, Operator, Super Admin
- 2 user-facing: Learner, Parent
- Custom roles (V2): "Senior Designer", "Domain Curator"

---

## 1. Mục đích màn hình

Role & Permission Management là nơi Super Admin:

**4 chức năng cốt lõi:**

1. **View standard roles** — 6 internal + 2 user-facing
2. **Create custom roles** — Cho special cases (V2)
3. **Configure permissions** — Fine-tune what each role can do
4. **Audit role changes** — Track all modifications

### Triết lý: "RBAC Should Be Simple"

LUMINA's RBAC system **không phức tạp như enterprise SaaS**. Mục tiêu:
- 6 default roles cover 95% cases
- Custom roles only for edge cases
- Permissions inherited (not flat list)
- Easy to understand visualization

---

## 2. Users & Use Cases

### Primary user: Super Admin

**Frequency:** Rare — most config done at setup, rarely changed

### Use cases chi tiết

#### UC1: Initial setup

**Flow:**
1. Super Admin first login
2. Default roles already configured
3. Review default permissions
4. Adjust if company has specific needs
5. Save

#### UC2: Create custom role

**Example:** "Senior Designer" với extended permissions

**Flow:**
1. Click "Create Custom Role"
2. Name: "Senior Designer"
3. Inherit from: Designer
4. Add permissions:
   - `scenario.publish` (normally Super Admin only)
   - `persona.review` (review junior work)
5. Save
6. Assign to specific users in User Management

#### UC3: Audit role changes

**Flow:**
1. Quarterly review
2. Audit log: see what changed
3. Verify still appropriate
4. Adjust as needed

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Settings  >  Role & Permission     [+ Custom Role]       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Tabs: Standard Roles | Custom Roles | Permission Catalog | Audit Log  │
│                                                                         │
├──────────────────────┬──────────────────────────────────────────────────┤
│                      │                                                  │
│  Roles Sidebar       │           Permissions View                       │
│                      │                                                  │
│  280px               │              780px                               │
│                      │                                                  │
└──────────────────────┴──────────────────────────────────────────────────┘
```

### Roles Sidebar

```
┌─────────────────────────────┐
│  STANDARD ROLES             │
│                             │
│  Internal:                  │
│  ┌───────────────────────┐  │
│  │ ⚙ Super Admin (3)     │  │
│  │   Full access         │  │
│  ├───────────────────────┤  │
│  │ 📋 Operator (2)       │  │
│  │   Daily ops           │  │
│  ├───────────────────────┤  │
│  │ 🎨 Designer (5)       │  │ ← Selected
│  │   Scenario creation   │  │
│  ├───────────────────────┤  │
│  │ ✍ Persona Writer (4)  │  │
│  │   AI character design │  │
│  ├───────────────────────┤  │
│  │ 🔧 Engineer (8)       │  │
│  │   Widget development  │  │
│  ├───────────────────────┤  │
│  │ 📚 Curator (3)        │  │
│  │   Knowledge content   │  │
│  └───────────────────────┘  │
│                             │
│  User-facing:               │
│  ┌───────────────────────┐  │
│  │ 🎓 Learner (12,847)   │  │
│  ├───────────────────────┤  │
│  │ 👨‍👩‍👧 Parent (3,421)   │  │
│  └───────────────────────┘  │
│                             │
│  CUSTOM ROLES (2)           │
│  ┌───────────────────────┐  │
│  │ ★ Senior Designer (2) │  │
│  ├───────────────────────┤  │
│  │ ★ QA Tester (1)       │  │
│  └───────────────────────┘  │
│                             │
│  [+ Create Custom Role]     │
│                             │
└─────────────────────────────┘
```

### Permissions View (when role selected)

```
┌─────────────────────────────────────────────────┐
│  🎨 DESIGNER                                    │
│  Scenario creation specialist                   │
│                                                 │
│  5 users have this role                         │
│                                                 │
│  ─── DESCRIPTION ───                            │
│                                                 │
│  Designers tạo và quản lý scenarios. Có quyền   │
│  edit own scenarios, browse all assets, request │
│  new personas/widgets.                          │
│                                                 │
│  [Edit description]                             │
│                                                 │
│  ─── PERMISSIONS ───                            │
│                                                 │
│  ✅ scenario.create                             │
│  ✅ scenario.read.all                           │
│  ✅ scenario.edit.own                           │
│  ❌ scenario.edit.others                        │
│  ❌ scenario.publish (Super Admin only)         │
│  ❌ scenario.delete                             │
│                                                 │
│  ✅ persona.read                                │
│  ❌ persona.create                              │
│  ❌ persona.edit                                │
│                                                 │
│  ✅ widget.read                                 │
│  ❌ widget.create                               │
│  ❌ widget.edit                                 │
│                                                 │
│  ✅ knowledge.read                              │
│  ❌ knowledge.create                            │
│  ❌ knowledge.edit                              │
│                                                 │
│  ✅ analytics.view.own                          │
│  ❌ analytics.view.all                          │
│                                                 │
│  ✅ playtest.run                                │
│  ✅ session_replay.view.anonymized              │
│  ❌ session_replay.view.full                    │
│                                                 │
│  ✅ workspace.access.assigned                   │
│  ❌ workspace.create                            │
│                                                 │
│  [Edit permissions]                             │
│                                                 │
│  ─── INHERITS FROM ───                          │
│                                                 │
│  None (base role)                               │
│                                                 │
│  ─── INHERITED BY ───                           │
│                                                 │
│  Custom: Senior Designer                        │
│                                                 │
│  ─── USERS WITH THIS ROLE ───                   │
│                                                 │
│  • Carol Nguyen                                 │
│  • David Pham                                   │
│  • Linh Tran                                    │
│  • Hoa Le                                       │
│  • Quan Vo                                      │
│                                                 │
│  [Manage assignments in User Mgmt]              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Edit Permissions Modal

```
┌─────────────────────────────────────────┐
│  Edit Permissions: Designer             │
│                                         │
│  Filter: [All ▼]                        │
│  [Search permissions...]                │
│                                         │
│  ─── SCENARIO ───                       │
│                                         │
│  ✅ scenario.create                     │
│     Create new scenarios                │
│                                         │
│  ✅ scenario.read.all                   │
│     View all scenarios                  │
│                                         │
│  ✅ scenario.edit.own                   │
│     Edit scenarios you created          │
│                                         │
│  ☐ scenario.edit.others                 │
│     Edit scenarios by other designers   │
│                                         │
│  ☐ scenario.publish                     │
│     Publish to production               │
│     ⓘ Currently Super Admin only        │
│                                         │
│  ─── PERSONA ───                        │
│                                         │
│  ✅ persona.read                        │
│     ...                                 │
│                                         │
│  [Cancel]   [Save Changes]              │
│                                         │
└─────────────────────────────────────────┘
```

### Permission Catalog Tab

```
┌─────────────────────────────────────────────────┐
│  PERMISSION CATALOG                             │
│                                                 │
│  All permissions in the system                  │
│                                                 │
│  ─── SCENARIO ───                               │
│                                                 │
│  scenario.create                                │
│   Create new scenarios                          │
│   Used by: Designer, Senior Designer, Super     │
│                                                 │
│  scenario.read.all                              │
│   View all scenarios                            │
│   Used by: All internal roles                   │
│                                                 │
│  scenario.publish                               │
│   Publish to production                         │
│   Used by: Super Admin, Senior Designer         │
│                                                 │
│  ... (47 more permissions)                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Custom Role Creator

```
┌─────────────────────────────────────────┐
│  Create Custom Role                     │
│                                         │
│  Name                                   │
│  [Senior Designer]                      │
│                                         │
│  Description                            │
│  [Senior designers with publish rights] │
│                                         │
│  Inherit from existing role:            │
│  [Designer ▼]                           │
│                                         │
│  Additional permissions to add:         │
│  ☑ scenario.publish                     │
│  ☑ persona.review                       │
│  ☐ scenario.edit.others                 │
│                                         │
│  Permissions to remove from inherited:  │
│  (None)                                 │
│                                         │
│  Final permission count: 13             │
│  (vs Designer base: 11)                 │
│                                         │
│  [Cancel]   [Create Role]               │
│                                         │
└─────────────────────────────────────────┘
```

### Audit Log Tab

```
┌─────────────────────────────────────────────────┐
│  ROLE CHANGE AUDIT LOG                          │
│                                                 │
│  Filter: [All actions ▼]   Date: [30 days ▼]    │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Time    │ Admin    │ Action            │   │
│  ├─────────────────────────────────────────┤   │
│  │ 14:25   │ Minh Vũ  │ Granted permission│   │
│  │         │          │ scenario.publish  │   │
│  │         │          │ to Senior Designer│   │
│  ├─────────────────────────────────────────┤   │
│  │ 09:15   │ Minh Vũ  │ Created custom    │   │
│  │         │          │ role: QA Tester   │   │
│  ├─────────────────────────────────────────┤   │
│  │ Yesterday│ Minh Vũ │ Removed permission│   │
│  │         │          │ session.full from │   │
│  │         │          │ Operator          │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 4. Interactions

### Permission toggle

- Click checkbox to toggle
- Confirmation modal cho dangerous changes
- Real-time validation: "This permission may break X feature"

### Role inheritance visualization

```
Designer (base)
└── Senior Designer (inherits + extra)
    └── (no further inheritance allowed - max depth 2)
```

### Bulk permission check

- "Show me all permissions involving scenarios"
- Filter by category

---

## 5. States

### State 1: Default

Roles sidebar + selected role permissions.

### State 2: Editing permissions

Modal open, original view dimmed.

### State 3: Confirming dangerous change

```
⚠ Confirm Permission Change

You're granting "scenario.publish" to Senior Designer.

This means:
• 2 users gain ability to publish to production
• Previously only Super Admin (3 users) could

Are you sure?

[Cancel] [Yes, grant permission]
```

### State 4: New role created

Success toast + role appears in custom roles list.

---

## 6. Data Flow

### Inputs

```yaml
from_user_db:
  - users_per_role
  - role_assignments

from_audit_log:
  - role_changes
  - permission_changes
```

### Outputs

```yaml
events:
  - role.created
  - role.modified
  - role.deleted
  - permission.granted
  - permission.revoked
  - audit.logged
```

### API Endpoints

```yaml
GET    /api/roles                          # All roles
GET    /api/roles/:id                      # Role detail with permissions
POST   /api/roles                          # Create custom role
PATCH  /api/roles/:id                      # Update role
DELETE /api/roles/:id                      # Delete custom role
GET    /api/permissions                    # All permissions catalog
GET    /api/audit/role-changes             # Audit log
```

---

## 7. Permission Checks

Only Super Admin can access this screen.

```yaml
required_permissions:
  - admin.roles.view
  - admin.roles.edit (for changes)
  - admin.permissions.modify (for permission changes)
```

---

## 8. Edge Cases

### Case 1: Removing permission breaks active workflow

**Detection:** User currently using feature about to be disabled

**Response:**
- Warning: "Carol is currently using scenario.edit.others"
- Options: Apply now (force), Apply at end of session, Cancel

### Case 2: Custom role no longer needed

- Cannot delete if users still assigned
- Must reassign first
- Then deletion possible

### Case 3: Standard role cannot be deleted

- 6 standard roles are protected
- Can modify permissions
- Cannot remove role itself

### Case 4: Circular inheritance

- Prevented at design (max depth 2)
- Validation in UI

---

## 9-12. Standard sections

(Responsive: Desktop only)
(Performance: < 1s load)
(Accessibility: Tables accessible, screen reader)
(Visual: Clean tables, status indicators)

---

## 13. Multi-domain Considerations

### V1: Single workspace

All roles apply globally.

### V2: Workspace-scoped roles

```yaml
example:
  user: "Carol"
  global_role: "Designer"
  workspace_overrides:
    medical_workspace: "Senior Designer"
    marketing_workspace: "Designer (read-only)"
```

User has different effective permissions based on which workspace working in.

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Super Admin only |
| **Complexity** | ⭐⭐ |
| **Estimated build time** | 3-4 weeks |
| **Frequency of use** | Rare - mostly at setup |
| **Multi-domain** | V2+ via workspace-scoped roles |
| **Biggest value** | Foundation for security and scaling |
