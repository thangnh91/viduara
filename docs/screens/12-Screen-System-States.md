# Screen 12 — System States

**Màn hình số:** 12  
**Phase:** Cross-cutting (applies to all phases)  
**Complexity:** ⭐⭐ (Trung bình thấp nhưng quan trọng)  
**Primary users:** Tất cả users  
**Related flow:** All flows  
**Dependencies:** Screen 1 (Design System)

---

## 0. Multi-domain Context

System States là **shared design patterns** cho mọi màn hình trong LUMINA — không phụ thuộc ngành. Loading state cho Workspace giống loading state cho Analytics, etc.

---

## 1. Mục đích màn hình

System States định nghĩa **8 trạng thái phổ biến** mà mọi màn hình có thể gặp phải:

1. **Loading** (initial, refreshing)
2. **Empty** (no data yet)
3. **Error** (system failure)
4. **Network offline** (connection lost)
5. **Permission denied** (auth issues)
6. **Maintenance** (scheduled downtime)
7. **Rate limited** (too many requests)
8. **Session expired** (logout required)

### Triết lý: "Errors Are Conversations"

Không phải "ERROR 404" cold. Mà là helpful conversation:
- What happened (clear, no jargon)
- Why it happened (if known)
- What user can do
- Tone: Calm, understanding

---

## 2. Users & Use Cases

Tất cả users của LUMINA có thể gặp các states này. Design phải work cho:
- Học sinh (16-19 tuổi) — calm, không scary
- Phụ huynh — clear, action-oriented
- Admin — technical detail available

---

## 3. State Designs

### State 1: Loading (Initial)

#### Variant A: Skeleton (preferred)

For data-heavy screens:

```
┌─────────────────────────────────────┐
│  ████████████████          ████     │ ← Header skeleton
├─────────────────────────────────────┤
│                                     │
│  ┌────────┐  ┌──────────────────┐  │
│  │ ████   │  │  ████████        │  │
│  │        │  │  ██████          │  │
│  │ ████   │  │  ████████████    │  │
│  └────────┘  └──────────────────┘  │
│                                     │
│  ┌────────┐  ┌──────────────────┐  │
│  │ ████   │  │  ████████        │  │
│  │        │  │  ██████          │  │
│  └────────┘  └──────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

**Animation:** Subtle shimmer left-to-right, 1.5s loop.

#### Variant B: Spinner (for actions)

For brief operations:

```
┌─────────────────────────────────────┐
│                                     │
│              ⟳                       │
│           Loading...                 │
│                                     │
└─────────────────────────────────────┘
```

#### Variant C: Progress bar (for known duration)

For long operations (PDF generation, etc):

```
┌─────────────────────────────────────┐
│                                     │
│     Generating your report...       │
│                                     │
│  ████████████░░░░░░░░░ 65%          │
│                                     │
│  Estimated 15 seconds remaining     │
│                                     │
│  [Cancel]                           │
│                                     │
└─────────────────────────────────────┘
```

#### Variant D: Themed loading (LUMINA-specific)

For branded experience (Final Report generation):

```
┌─────────────────────────────────────┐
│                                     │
│     Đang phân tích hành trình       │
│     của bạn...                       │
│                                     │
│     ◯  Đo lường 35 khoảnh khắc      │
│        áp lực                       │
│                                     │
│     ⟳  Đối chiếu với 4,532 học       │
│        sinh khác                    │
│                                     │
│     ○  Chuẩn bị báo cáo              │
│                                     │
│     Quá trình này mất ~45 giây.     │
│                                     │
└─────────────────────────────────────┘
```

### State 2: Empty (No data)

#### Variant A: Empty new state (encouraging)

For first-time users:

```
┌─────────────────────────────────────┐
│                                     │
│         🎬                          │
│                                     │
│    Chưa có scenario nào             │
│                                     │
│    Bắt đầu hành trình của bạn        │
│    bằng cách chọn ngành đầu tiên.   │
│                                     │
│    [Browse Gateway]                 │
│    [Take 5-min quiz]                │
│                                     │
└─────────────────────────────────────┘
```

#### Variant B: Filtered empty (helpful)

When filters return nothing:

```
┌─────────────────────────────────────┐
│                                     │
│         🔍                          │
│                                     │
│    Không có kết quả                 │
│                                     │
│    Thử:                             │
│    • Mở rộng filters                │
│    • Tìm với keyword khác           │
│    • [Clear all filters]            │
│                                     │
└─────────────────────────────────────┘
```

#### Variant C: Cleared empty (positive)

When user finished tasks:

```
┌─────────────────────────────────────┐
│                                     │
│         ✨                          │
│                                     │
│    All caught up!                   │
│                                     │
│    Bạn không có notification        │
│    chưa đọc nào.                    │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### State 3: Error (System Failure)

#### Variant A: Soft error (retry)

For transient issues:

```
┌─────────────────────────────────────┐
│                                     │
│         ⚠                           │
│                                     │
│    Có gì đó không ổn                │
│                                     │
│    Tải lại trang có thể giúp.       │
│    Progress của bạn được lưu        │
│    đầy đủ.                          │
│                                     │
│    [Retry] [Refresh page]           │
│                                     │
│    Persistent issues?               │
│    [Contact support]                │
│                                     │
└─────────────────────────────────────┘
```

#### Variant B: Hard error (navigate away)

For severe errors:

```
┌─────────────────────────────────────┐
│                                     │
│         🚨                          │
│                                     │
│    Hệ thống gặp lỗi nghiêm trọng    │
│                                     │
│    Chúng tôi đã được thông báo      │
│    và đang fix.                     │
│                                     │
│    Error ID: #ERR-7891              │
│    Time: 14:23 UTC                  │
│                                     │
│    [Go to Hub] [Report issue]       │
│                                     │
└─────────────────────────────────────┘
```

#### Variant C: Specific component error

For widget/section failure:

```
┌─────────────────────────────────────┐
│  PERSONA STUDIO                     │
│                                     │
│  Editor Tabs                        │
│                                     │
│  ┌────────────────────────────┐    │
│  │  ⚠ Section unavailable     │    │
│  │                            │    │
│  │  This section had an error │    │
│  │  loading.                  │    │
│  │                            │    │
│  │  Other sections work fine. │    │
│  │                            │    │
│  │  [Retry section]           │    │
│  └────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

### State 4: Network Offline

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚠ Không có kết nối internet                                            │
│  Đang lưu offline. Sẽ sync khi online.            [Try reconnect]      │
└─────────────────────────────────────────────────────────────────────────┘
```

**Banner across top, persistent until online.**

For Workspace specifically:
- Switch to read-only mode
- Queue chat messages locally
- Save state to IndexedDB
- Resume seamlessly when online

### State 5: Permission Denied

```
┌─────────────────────────────────────┐
│                                     │
│         🔒                          │
│                                     │
│    Không có quyền truy cập          │
│                                     │
│    Trang này yêu cầu permission     │
│    "scenario.edit" mà bạn chưa có.  │
│                                     │
│    Liên hệ Super Admin để xin       │
│    quyền truy cập.                  │
│                                     │
│    [Go back] [Request access]       │
│                                     │
└─────────────────────────────────────┘
```

### State 6: Maintenance Mode

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🛠 Bảo trì hệ thống — 24 Apr 2:00-3:00 AM UTC                          │
│  Một số tính năng có thể chậm hoặc không khả dụng.                     │
└─────────────────────────────────────────────────────────────────────────┘
```

**Hoặc full takeover:**

```
┌─────────────────────────────────────┐
│                                     │
│         🛠                          │
│                                     │
│    LUMINA đang bảo trì              │
│                                     │
│    Estimated completion:            │
│    24 Apr, 3:00 AM UTC              │
│    (45 minutes from now)            │
│                                     │
│    Lý do: Database upgrade cho      │
│    performance improvements.        │
│                                     │
│    [Status page] [Notify me]        │
│                                     │
└─────────────────────────────────────┘
```

### State 7: Rate Limited

```
┌─────────────────────────────────────┐
│                                     │
│         ⏱                           │
│                                     │
│    Bạn đang request quá nhanh        │
│                                     │
│    Vui lòng đợi 30 giây rồi thử      │
│    lại.                             │
│                                     │
│    Đếm ngược: 28s                   │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### State 8: Session Expired

```
┌─────────────────────────────────────┐
│                                     │
│         🔐                          │
│                                     │
│    Phiên đăng nhập hết hạn          │
│                                     │
│    Vì lý do bảo mật, bạn cần        │
│    đăng nhập lại.                   │
│                                     │
│    Progress của bạn được lưu        │
│    đầy đủ.                          │
│                                     │
│    [Login again]                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 4. Tone Guidelines

### DO

- ✅ Use natural language ("Có gì đó không ổn")
- ✅ Reassure user (progress saved, not their fault)
- ✅ Give actionable next step
- ✅ Be specific when possible
- ✅ Include support contact for serious issues

### DON'T

- ❌ Use technical jargon ("HTTP 500 Internal Server Error")
- ❌ Blame user (unless really their action)
- ❌ Hide what happened
- ❌ Be cute when serious (no jokes for critical errors)
- ❌ Leave user stranded (always provide path forward)

---

## 5. State Transitions

```
Loading → Success (data loaded)
Loading → Error (failed to load)
Loading → Empty (no data exists)

Active → Loading (refreshing)
Active → Error (mid-action failure)
Active → Network Offline (lost connection)
Active → Session Expired (token expired)

Error → Retry → Loading
Error → Navigate Away

Maintenance → Active (after maintenance)
```

---

## 6. Data Flow

These states triggered by:

```yaml
loading_states:
  triggers:
    - api_request_pending
    - data_fetching
    - action_processing

empty_states:
  triggers:
    - no_data_returned
    - filters_too_narrow
    - first_time_user

error_states:
  triggers:
    - api_error_response
    - network_failure
    - validation_failure
    - permission_check_failed
    - timeout

network_states:
  triggers:
    - online_event
    - offline_event
    - connection_quality_change
```

---

## 7. Visual Design Notes

### Loading

- Skeletons: `--ink-100` background, shimmer animation
- Spinners: `--lumina-500` color, smooth rotation
- Progress bars: gradient `--lumina-300` → `--lumina-500`

### Empty

- Background: `--paper-200`
- Icons: muted (50% opacity)
- Tone: Friendly, not sad

### Error

- Soft errors: `--signal-alert` accent (amber)
- Hard errors: `--signal-stress` accent (red)
- Tone: Calm even in red

### Network/Offline

- Banner: `--signal-stress` background
- Icon prominent
- Persistent until resolved

### Maintenance

- Tone: Informative, not panicky
- Show exact times
- Provide alternative (status page)

---

## 8. Multi-domain Examples

States are universal — same patterns work across:
- SE Workspace loading
- Medical PatientMonitor error
- Marketing Dashboard empty filters
- Parent Dashboard offline

Visual treatment consistent everywhere.

---

## 9. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Scope** | Cross-cutting (all screens) |
| **Complexity** | ⭐⭐ |
| **Estimated build time** | 2-3 weeks (component library) |
| **Multi-domain** | Universal patterns |
| **Biggest value** | Consistent UX across all screens |

### Design principles applied

1. ✅ **Errors are conversations** — Friendly tone
2. ✅ **Provide paths forward** — Always actionable
3. ✅ **Reassure where possible** — Progress saved messages
4. ✅ **Specific over generic** — Show what happened
5. ✅ **Consistent across screens** — Reusable component library
