# Screen 18 — User & Workspace Management

**Màn hình số:** 18  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐⭐ (Trung bình)  
**Primary users:** Super Admin (full); Operator (limited)  
**Related flow:** Flow 07 — System Management (Sub-flow C: User Lifecycle)  
**Dependencies:** Screen 19 (Role & Permission Mgmt), Screen 17 (Session Replay - drill down)

---

## 0. Multi-domain Context

User & Workspace Management là cấu hình meta — không phụ thuộc ngành. Tuy nhiên, users có thể được scope vào workspace theo ngành (V2): "Marketing team workspace", "Medical team workspace".

**Examples used in this spec:**
- Internal team (designers, persona writers, engineers, curators)
- Workspace concept (V2): Tách team theo domain
- B2B school workspace (V3): Trường học có workspace riêng

---

## 1. Mục đích màn hình

User & Workspace Management là **administrative center** — quản lý:

**5 chức năng cốt lõi:**

1. **User CRUD** — Create, view, edit, deactivate users
2. **Workspace management** — Create, configure workspaces (V2)
3. **Bulk operations** — Invite multiple, change roles
4. **Activity monitoring** — Last login, sessions count
5. **Audit & compliance** — User actions log

### Metaphor thiết kế

Màn này giống như **GitHub Organizations** + **Notion Workspace settings**:
- Members table với roles
- Invite flow
- Permission management
- Activity tracking

### Triết lý: "Least Privilege by Default"

Khi tạo user mới, default role là "viewer" với minimum permissions. Admin phải explicitly grant elevated access. Đảm bảo:
- Reduces accidental damage
- Forces conscious decisions
- Audit trail clear

---

## 2. Users & Use Cases

### Primary user: Super Admin

**Daily tasks:**
- Onboard new team members
- Adjust permissions when roles change
- Deactivate departed members
- Review access requests
- Audit user actions

### Secondary user: Operator

**Limited access:**
- View user list (no edit)
- Look up user khi debugging
- Cannot change permissions

### Use cases chi tiết

#### UC1: Onboard new Persona Writer

**Flow:**
1. Click "Invite User"
2. Modal: Email + Role selection
3. Set role: "Persona Writer"
4. Assign workspace (V2): "Medical team"
5. Send invitation
6. New user receives email với signup link

#### UC2: Departed engineer needs deactivation

**Flow:**
1. Search user "Bob Engineer"
2. View user detail
3. Click "Deactivate"
4. Confirmation: "Are you sure? Bob owns 3 widgets."
5. Choose handling: Transfer ownership / Archive / Block
6. Confirm
7. User loses access immediately
8. Audit log entry

#### UC3: Promote Designer to Senior Designer

**Flow:**
1. Find user
2. Edit role
3. Add additional permissions
4. Notification sent
5. Audit logged

#### UC4: Bulk invite from school (B2B V3)

**Flow:**
1. Click "Bulk Invite"
2. Upload CSV: emails + assigned scenarios
3. Preview
4. Send all invitations
5. Track signup completion

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Settings  >  User Management              [+ Invite User]│
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Tabs: Users | Workspaces | Pending Invites | Audit Log                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Filter & Search                                                        │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Users Table                                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 1: Users

```
┌─────────────────────────────────────────────────────────────────────────┐
│  USERS  (47 total, 42 active)                                           │
│                                                                         │
│  Filters:                                                               │
│  Role: [All ▼]  Status: [Active ▼]  Workspace: [All ▼]                  │
│  🔍 Search by name or email...                                          │
│                                                                         │
│  Sort: [Last active ▼]                              [⤓ Export CSV]      │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ ☑ │ Name           │ Role        │ Workspace  │ Last Active │ ⋮  │ │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ ☐ │ Carol Nguyen   │ Persona Wr. │ Marketing  │ 5 min ago   │ ⋮  │ │
│  │ ☐ │ Alex Tran      │ Engineer    │ Generic    │ 2h ago      │ ⋮  │ │
│  │ ☐ │ David Pham     │ Designer    │ SE         │ 1 day ago   │ ⋮  │ │
│  │ ☐ │ Bob Lee        │ Engineer    │ Generic    │ 8 days ago ⚠│ ⋮  │ │
│  │ ☐ │ Lan Dao        │ Curator     │ Medical    │ 3h ago      │ ⋮  │ │
│  │ ☐ │ Hà Trần        │ Operator    │ -          │ 12 min ago  │ ⋮  │ │
│  │ ☐ │ Minh Vũ        │ Super Admin │ -          │ Now ●       │ ⋮  │ │
│  │ ... (40 more)                                                  │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  Bulk actions (when selected): [Change Role] [Deactivate] [Send Msg]    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Status indicators:**
- ● Online (active session)
- 🟢 Active (logged in last 7 days)
- 🟡 Inactive (8-30 days)
- 🔴 Dormant (> 30 days)
- ⚠ Warning (security or activity issues)

### User Detail (slide-out panel or dedicated page)

```
┌─────────────────────────────────────┐
│  Carol Nguyen                       │
│  carol@lumina.app                   │
│                                     │
│  ┌────────┐                         │
│  │   👤   │  Persona Writer          │
│  │ Avatar │  Workspace: Marketing   │
│  └────────┘  Joined: 2026-02-10     │
│                                     │
│  Status: ● Active                   │
│                                     │
│  ─── PERMISSIONS ───                │
│                                     │
│  Role: Persona Writer               │
│  Permissions:                       │
│  • persona.create                   │
│  • persona.edit (own)               │
│  • persona.test                     │
│  • orchestration.edit               │
│  • playground.use                   │
│  + 3 more                           │
│                                     │
│  Custom permissions:                │
│  • [+ Grant additional access]      │
│                                     │
│  ─── ACTIVITY ───                   │
│                                     │
│  Last login: 5 min ago              │
│  Total logins: 234                  │
│                                     │
│  Recent activity:                   │
│  • Updated Anh Tùng persona         │
│    14:23 today                      │
│  • Tested Marketing scenario        │
│    13:45 today                      │
│  • [View full audit log]            │
│                                     │
│  ─── ASSETS OWNED ───               │
│                                     │
│  Personas: 3                        │
│  • Anh Tùng                         │
│  • Chị Mai                          │
│  • Marketing Director (variant)     │
│                                     │
│  Scenarios contributed: 0           │
│  (read-only access)                 │
│                                     │
│  ─── ACCESS CONTROL ───             │
│                                     │
│  Workspace: Marketing               │
│  [Change workspace]                 │
│                                     │
│  IP whitelist: None                 │
│  2FA: ✅ Enabled                    │
│  Session limit: 2 concurrent        │
│                                     │
│  ─── ACTIONS ───                    │
│                                     │
│  [Send message]                     │
│  [Reset password]                   │
│  [Force logout]                     │
│  [Audit user actions]               │
│  [Edit role]                        │
│                                     │
│  ─── DANGER ZONE ───                │
│                                     │
│  [Suspend account]                  │
│  [Deactivate account]               │
│  [Delete account]                   │
│                                     │
│  ⓘ Deactivation will transfer       │
│    ownership of 3 personas.         │
│                                     │
└─────────────────────────────────────┘
```

### Tab 2: Workspaces (V2)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  WORKSPACES                                                             │
│                                                                         │
│  Default workspace                                                      │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │ 🏢 LUMINA Internal                                          │       │
│  │ All internal team members                                   │       │
│  │ 47 members                                                  │       │
│  │ Created: 2026-01-15                                         │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  Domain workspaces                                                      │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │ 🖥 SE Team                                                  │       │
│  │ Software Engineering scenarios                              │       │
│  │ 12 members                                                  │       │
│  │ [Manage]                                                    │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ 🏥 Medical Team                                             │       │
│  │ Medical scenarios                                           │       │
│  │ 8 members                                                   │       │
│  │ [Manage]                                                    │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ 📢 Marketing Team                                           │       │
│  │ Marketing scenarios                                         │       │
│  │ 6 members                                                   │       │
│  │ [Manage]                                                    │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  External workspaces (B2B - V3)                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │ 🏫 Trường THPT Chu Văn An                                   │       │
│  │ B2B school license                                          │       │
│  │ 234 students                                                │       │
│  │ [Manage]                                                    │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  [+ Create Workspace]                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 3: Pending Invites

```
┌─────────────────────────────────────────────────────────────────────────┐
│  PENDING INVITES (3)                                                    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │ jane@lumina.app                                             │       │
│  │ Invited as: Curator (Medical workspace)                     │       │
│  │ Sent: 2 days ago                                            │       │
│  │ Status: Email opened, not clicked                           │       │
│  │ [Resend] [Cancel]                                           │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ thomas@lumina.app                                           │       │
│  │ Invited as: Designer (Marketing workspace)                  │       │
│  │ Sent: 5 days ago                                            │       │
│  │ Status: Not opened ⚠                                        │       │
│  │ [Resend] [Cancel]                                           │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  [+ Send New Invite]  [Bulk Invite from CSV]                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tab 4: Audit Log

```
┌─────────────────────────────────────────────────────────────────────────┐
│  AUDIT LOG                                                              │
│                                                                         │
│  Filter: [All actions ▼]  User: [Anyone ▼]  Date: [Last 30 days ▼]      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐       │
│  │ Time      │ User         │ Action                │ Target  │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ 14:25     │ Minh Vũ      │ Updated role          │ Carol N │       │
│  │           │ (Super Admin)│ Persona Writer →     │         │       │
│  │           │              │ Senior Persona Wr.    │         │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ 13:50     │ Hà Trần      │ Viewed session        │ #SES-89 │       │
│  │           │ (Operator)   │ (Full Access)         │         │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ 11:30     │ Minh Vũ      │ Invited user          │ jane@.. │       │
│  ├─────────────────────────────────────────────────────────────┤       │
│  │ 10:15     │ System       │ Auto-deactivated user │ Bob Lee │       │
│  │           │              │ (90 days inactive)    │         │       │
│  └─────────────────────────────────────────────────────────────┘       │
│                                                                         │
│  [⤓ Export Audit Log]                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Invite flow

```
┌─────────────────────────────────────┐
│  Invite User                        │
│                                     │
│  Email                              │
│  ┌─────────────────────────────┐    │
│  │ name@email.com              │    │
│  └─────────────────────────────┘    │
│                                     │
│  Role                               │
│  ○ Designer                         │
│  ● Persona Writer                   │
│  ○ Engineer                         │
│  ○ Curator                          │
│  ○ Operator                         │
│  ○ Custom (advanced)                │
│                                     │
│  Workspace (V2)                     │
│  [Marketing ▼]                      │
│                                     │
│  Welcome message (optional)         │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Expires: [7 days ▼]                │
│                                     │
│  [Cancel]   [Send Invite]           │
│                                     │
└─────────────────────────────────────┘
```

### Bulk operations

**Select multiple → Bulk actions:**
- Change role (apply to all)
- Send message
- Deactivate (with safeguards)
- Move workspace
- Export selected

---

## 5-12. Standard sections

(States: Loading, Empty, Editing, Confirming actions, Suspended, Deactivated)
(Data flow: User CRUD APIs, audit events)
(Permissions: Super Admin full, Operator limited, others none)
(Edge cases: Self-deletion prevention, owner transfer, concurrent edits)
(Responsive: Desktop primary, mobile read-only)
(Performance: < 1s load, instant search)
(Accessibility: Tables accessible, screen readers)
(Visual: Status colors, role badges with semantic icons)

---

## 13. Multi-domain Application Examples

### V1 single-workspace

All 47 users in one workspace.
Roles distinguish, not workspace.

### V2 multi-domain workspaces

```yaml
workspaces:
  - se_team:
      members: 12
      scenarios: SE-only
      personas: SE specific + generic
      
  - medical_team:
      members: 8
      scenarios: Medical-only
      personas: Medical + generic
      
  - marketing_team:
      members: 6
      scenarios: Marketing-only
      personas: Marketing + generic
      
  - cross_domain:
      members: 21
      scenarios: any
      personas: any
```

### V3 B2B workspaces

External workspaces cho schools/companies:
- Cannot see internal team
- Limited to scenarios licensed
- Their own admin (super admin role within their workspace)
- Reports filtered to their data only

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Super Admin |
| **Complexity** | ⭐⭐⭐ |
| **Estimated build time** | 4-5 weeks |
| **Performance** | < 1s load |
| **Multi-domain** | Yes - workspaces in V2/V3 |
| **Biggest value** | Foundation for team scaling và B2B |
