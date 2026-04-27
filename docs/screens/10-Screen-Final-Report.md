# Screen 10 — Final Report

**Màn hình số:** 10  
**Phase:** C — Learner Extended  
**Complexity:** ⭐⭐⭐⭐ (Cao — business-critical deliverable)  
**Primary users:** Học sinh (Learner), Phụ huynh (Parent — view-only)  
**Related flow:** Flow 03 — Kết thúc kịch bản & Nhận báo cáo  
**Dependencies:** Screen 1 (Design System), Screen 7 (Workspace data source), Screen 11 (Portfolio), Screen 20 (Parent Dashboard)

---

## 0. Multi-domain Context

Final Report là container đa ngành. Cấu trúc 6 sections cố định, nhưng nội dung mỗi report hoàn toàn khác nhau dựa trên:
- Ngành student trải nghiệm (SE / Medical / Marketing / ...)
- Ending type (Natural / Fighter / Wrong Fit / Reluctant / Burnout)
- Behavioral data thu thập trong 7 ngày

**Examples used in this spec:**
- **Software Engineering** — "The Fighter" ending: Hợp ngành nhưng phải trả giá
- **Medical** — "The Natural" ending: Sinh ra cho ngành này
- **Marketing** — "The Wrong Fit" ending: Không phù hợp, gợi ý ngành khác

Trong runtime, mỗi student chỉ thấy 1 report tại 1 thời điểm.

---

## 1. Mục đích màn hình

Final Report là **khoảnh khắc đỉnh cao** của LUMINA — đây là moment mà 7 ngày trải nghiệm được "kết tinh" thành insight có ý nghĩa cho quyết định cuộc đời.

**Đây là màn hình có ý nghĩa kinh doanh quan trọng nhất:**

1. **Quyết định NPS**: Student nhận report tốt → recommend cho bạn → growth
2. **Driver retention**: Student lưu report vào Portfolio → quay lại thử ngành khác
3. **Validate parent investment**: Parent xem report → tin tưởng tiếp tục pay
4. **B2B value**: Trường học show reports → justify license

**3 chức năng cốt lõi:**

1. **Display 6-section report** với data viz đẹp
2. **Enable actions** (download PDF, share parent, save Portfolio, explore alternatives)
3. **Collect feedback** cho model improvement

### Metaphor thiết kế

Final Report giống như **báo cáo MRI từ bác sĩ giỏi**:
- Có **hard data** (chỉ số đo được)
- Có **interpretation** (chuyên gia phân tích)
- Có **recommendations** (hành động cụ thể)
- Tone: nghiêm túc, trung thực, đầy đủ — không sugar-coating

Hoặc gần với **Strengths Finder report** + **MBTI assessment** kết hợp với **financial advisor recommendation**.

### Triết lý: Honesty over Comfort

Theo **Design System Principle #3**: *"Failure is valid."*

Report không bao giờ "làm hài lòng" student bằng cách che giấu sự thật. Nếu ending là "Wrong Fit" — report nói thẳng. Nếu stress data cho thấy student không hợp với ngành — report show data, không spin positively.

**Nhưng:** trình bày với **respect và empathy**, không humiliate. "Đây không phải thất bại — đây là thông tin quý giá."

---

## 2. Users & Use Cases

### Primary user: Học sinh (Learner)

**Context khi vào Final Report:**
- Vừa hoàn thành Day 7 hoặc bị Burnout
- Đã xem cinematic ending screen
- Trạng thái cảm xúc: hào hứng / buồn / chấn động / nhẹ nhõm (tùy ending type)
- Mong đợi: insight có giá trị, không phải "score"

**Mental state expectations:**
- **The Natural**: Hào hứng, tự tin
- **The Fighter**: Lo lắng nhưng quyết tâm
- **The Wrong Fit**: Buồn nhưng cần hiểu lý do
- **The Reluctant**: Confused, cần hướng đi
- **The Early Exit/Burnout**: Mệt mỏi, cần được công nhận

### Secondary user: Phụ huynh (Parent — view-only)

**Access conditions:**
- Đã link với student (xem Flow 08)
- Transparency level >= Standard
- Hoặc student chủ động share

**View differences:**
- Section 6 (Parent Insight) **luôn được show** cho parents
- Other sections có thể bị filtered tùy transparency level
- Cannot edit, only view + download

### Tertiary user: Admin (Designer, Operator)

- Anonymized view cho design improvement
- Aggregate statistics across reports
- Used in Session Replay context

### Use cases chi tiết

#### UC1: Student xem report lần đầu (post Day 7)

**Flow:**
1. Sau cinematic ending → loading "Đang phân tích..."
2. Report load với **Section 1** (Compatibility Score) prominent
3. Student scroll qua 6 sections theo thứ tự
4. Có thể click vào data viz để drill down
5. Quyết định action: Download / Share / Save / Explore

#### UC2: Student xem lại report từ Portfolio

**Flow:**
1. Vào Portfolio → click report cũ
2. Final Report load với **last viewed timestamp**
3. Có thể compare với reports khác của ngành khác (V2)
4. Re-export hoặc share

#### UC3: Parent xem report của con

**Flow:**
1. Parent Dashboard → Reports Library
2. Click vào report của con
3. Load với **Section 6 (Parent Insight) auto-expanded**
4. Sections khác hiển thị tùy transparency
5. Có thể download PDF
6. Có thể schedule "talk with child" reminder

#### UC4: Burnout ending — sensitive case

**Special handling:**
- Tone của report **đặc biệt empathetic**
- Section 1 score không hiển thị "low" — show qualitative insight
- Strong emphasis on Section 5 (alternative recommendations)
- Mental health resources prominent
- Parent notification có warning

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

Final Report là **scroll-driven page**, không có sidebar phức tạp:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Báo cáo của bạn  >  Software Engineering        [⤓ ⤴ ⌂]   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                          ENDING HEADER                                  │
│                       (Hero section, full-width)                       │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              SECTION 1: COMPATIBILITY SCORE                            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              SECTION 2: COGNITIVE MATRIX                               │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              SECTION 3: STRESS MAPPING                                 │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              SECTION 4: 4-YEAR FORECAST                                │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              SECTION 5: AI PANEL RECOMMENDATIONS                       │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              SECTION 6: PARENT INSIGHT                                 │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│              ACTIONS PANEL (Sticky bottom)                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Header (Sticky)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Báo cáo của bạn  >  Software Engineering                  │
│                                                                         │
│  [⤓ Download PDF]  [⤴ Share with Parent]  [⌂ Back to Hub]              │
└─────────────────────────────────────────────────────────────────────────┘
```

**Sticky behavior:**
- Stays visible khi scroll
- Compresses height (56px → 40px) khi scrolled
- Quick access đến main actions

### Hero Section (Ending Header)

Tone và style **thay đổi triệt để** dựa trên ending type:

#### Variant A: The Natural (warm, confident gold)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│           ╭───────────────────────────────────╮                         │
│           │                                   │                         │
│           │              THE NATURAL          │                         │
│           │                                   │                         │
│           │   Bạn sinh ra để làm ngành này.   │                         │
│           │                                   │                         │
│           │   Software Engineering            │                         │
│           │                                   │                         │
│           ╰───────────────────────────────────╯                         │
│                                                                         │
│  📅 Hoàn thành: 24 tháng 4, 2026                                        │
│  ⏱️ Thời gian trải nghiệm: 7 ngày, 8 giờ 23 phút                       │
│  📊 Quyết định: 47 lần ra quyết định quan trọng                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Visual:**
- Background: warm gold gradient (`--lumina-300` → `--paper-100`)
- Title: Fraunces 48px, italic
- Tagline: Inter Tight 20px
- Decorative SVG ornament (subtle)

#### Variant B: The Fighter (amber, intense)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                          ⚔️ THE FIGHTER                                 │
│                                                                         │
│         Bạn có thể làm được — nhưng phải trả giá.                       │
│                                                                         │
│                  Software Engineering                                   │
│                                                                         │
│  Bạn đã chứng minh độ kiên trì hiếm có. Nhưng dữ liệu cũng cho          │
│  thấy mức stress cao bất thường. Hãy đọc báo cáo này cẩn thận           │
│  trước khi quyết định 4 năm tới.                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Visual:**
- Background: amber với darker tones (`--signal-alert`)
- Title: Fraunces 44px, semibold
- Subtle texture (paper grain)

#### Variant C: The Wrong Fit (compassionate, calm)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                          🍃 THE WRONG FIT                               │
│                                                                         │
│        Đây không phải thất bại — đây là thông tin quý giá.             │
│                                                                         │
│                  Software Engineering                                   │
│                                                                         │
│  Dữ liệu cho thấy ngành này có thể không phải "nhà" của bạn.           │
│  Đó không phải là điều xấu — bạn vừa tiết kiệm 4 năm và rất            │
│  nhiều tiền bằng cách phát hiện sớm. Hãy xem các gợi ý khác             │
│  ở Section 5.                                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Visual:**
- Background: muted blue (`--signal-focus` desaturated)
- Title: Fraunces 44px, regular
- Soft, calming — không feel like punishment

### Section 1: Compatibility Score

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  SECTION 1 — ĐIỂM PHÙ HỢP TỔNG QUAN                                     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │                                                             │        │
│  │                       ╭─────╮                               │        │
│  │                      │  78  │                               │        │
│  │                       ╰─────╯                               │        │
│  │                       /100                                  │        │
│  │                                                             │        │
│  │              Tiềm năng cao, cần rèn sức bền                │        │
│  │                                                             │        │
│  │  Điểm phù hợp tổng quan với ngành Software Engineering     │        │
│  │  dựa trên 47 quyết định và 8 giờ tương tác.                │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  Điểm này có nghĩa gì?                                                  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │ 0-30   Không phù hợp                                        │        │
│  │ 31-50  Cần cân nhắc kỹ                                      │        │
│  │ 51-70  Có tiềm năng                                         │        │
│  │ 71-85  ★ Bạn ở đây ★ — Phù hợp tốt, có thử thách           │        │
│  │ 86-100 Sinh ra cho ngành này                                │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  💡 So sánh với 4,532 học sinh khác đã thử ngành SE:                   │
│     Bạn ở top 22% — cao hơn average 8 điểm                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Visual elements:**
- Big circular gauge (animated fill from 0 → 78)
- Color-coded zones (red → amber → green → gold)
- Peer comparison data (anonymous aggregated)

### Section 2: Cognitive Matrix (Radar Chart)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  SECTION 2 — MA TRẬN NĂNG LỰC TƯ DUY                                    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │                                                             │        │
│  │                     Tư duy hệ thống                         │        │
│  │                          [10]                               │        │
│  │                          /│\                                │        │
│  │                         / │ \                               │        │
│  │                        /  │  \                              │        │
│  │              [9]      /   │   \      [10]                  │        │
│  │  Chịu áp lực ─────────╳───●───╳───── Xử lý dữ liệu        │        │
│  │                       /│       │\                          │        │
│  │                      / │       │ \                         │        │
│  │                     /  │       │  \                        │        │
│  │                    /   │       │   \                       │        │
│  │                   /    │       │    \                      │        │
│  │              [8] ●─────┴───────┴─────● [7]                 │        │
│  │      Giao tiếp                  Đạo đức                     │        │
│  │                                                             │        │
│  │  ━━ Bạn        ━━ Average Junior SE    ━━ Average Senior SE │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  Insights:                                                              │
│                                                                         │
│  ⭐ Điểm mạnh nổi bật:                                                  │
│     • Tư duy hệ thống (10/10) — Top 5% học sinh                        │
│     • Xử lý dữ liệu nhiễu (10/10) — Quan trọng cho debugging           │
│                                                                         │
│  ⚠️ Điểm cần phát triển:                                                │
│     • Giao tiếp & trình bày (8/10) — Cần cho Senior level              │
│     • Ra quyết định đạo đức (7/10) — Sẽ học qua thực hành              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Interactive:**
- Hover trên axis → tooltip với details
- Toggle layers (Bạn / Junior avg / Senior avg)
- Click axis → drill-down section

### Section 3: Stress Mapping (Timeline Chart)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  SECTION 3 — BẢN ĐỒ ÁP LỰC QUA 7 NGÀY                                   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │ 100│                              ●                         │        │
│  │  90│                            ╱│ ╲                       │        │
│  │  80│           ●───●          ╱  │  ╲      ●               │        │
│  │  70│         ╱        ╲     ╱    │    ╲ ╱                 │        │
│  │  60│       ╱            ╲ ╱      │     ●                  │        │
│  │  50│     ╱       ●─────● ╳       │                        │        │
│  │  40│ ●─●                  ╲    ●─●                        │        │
│  │  30│                       ●─●                              │        │
│  │  20│                                                       │        │
│  │  10│                                                       │        │
│  │   0└─────────────────────────────────────────────────      │        │
│  │      D1    D2    D3    D4    D5    D6    D7                │        │
│  │                                                             │        │
│  │  ─── Stress level    ⚠ Critical threshold (85%)             │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  Key moments:                                                           │
│                                                                         │
│  📍 Day 3, 14:23 — Peak stress 92%                                      │
│     Khi server crash trong scenario, bạn đã chịu áp lực                │
│     cực cao trong 28 phút trước khi tìm ra nguyên nhân.                 │
│                                                                         │
│  📍 Day 5, 10:15 — Lowest stress 25%                                    │
│     Khi làm việc solo trên architecture design, bạn cảm                 │
│     thấy thoải mái nhất.                                                │
│                                                                         │
│  💡 Pattern phát hiện:                                                  │
│     Stress spike khi có team conflicts hoặc deadlines.                  │
│     Stress giảm khi solve technical problems độc lập.                   │
│                                                                         │
│  Khuyến nghị:                                                           │
│  Trong nghề SE, hãy tìm role thiên về individual contributor            │
│  (Senior Engineer, Architect) thay vì Team Lead trong 3-5 năm đầu.     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Interactive:**
- Hover trên data points → see what happened
- Brush to zoom into specific day
- Toggle annotations on/off

### Section 4: 4-Year Forecast

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  SECTION 4 — DỰ BÁO HÀNH TRÌNH 4 NĂM                                    │
│                                                                         │
│  Dựa trên hành vi của bạn, AI dự đoán những giai đoạn quan trọng:      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │                                                             │        │
│  │   YEAR 1-2  │  ĐẠI CƯƠNG                                   │        │
│  │   ─────────────────────────────────────────                │        │
│  │                                                             │        │
│  │   Dự đoán: Bạn sẽ thấy CỰC KỲ NHÀM CHÁN với Toán cao        │        │
│  │   cấp, Triết học. Nguy cơ bỏ học ở giai đoạn này: 40%      │        │
│  │                                                             │        │
│  │   Lý do: Bạn excel ở applied problem solving, nhưng        │        │
│  │   chương trình đại cương VN nặng lý thuyết.                │        │
│  │                                                             │        │
│  │   💡 Chiến lược tồn tại:                                   │        │
│  │   • Tham gia coding clubs ngay từ năm 1                    │        │
│  │   • Tìm internship sớm (sau năm 1)                         │        │
│  │   • Treat đại cương như "bài tập để vượt qua"              │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │                                                             │        │
│  │   YEAR 3-4  │  CHUYÊN NGÀNH                                │        │
│  │   ─────────────────────────────────────────                │        │
│  │                                                             │        │
│  │   Dự đoán: Bạn sẽ TỎA SÁNG ở các dự án thực tế và          │        │
│  │   thực tập tại doanh nghiệp.                                │        │
│  │                                                             │        │
│  │   Likely outcomes:                                          │        │
│  │   • GPA: 3.4-3.7 (good, không xuất sắc)                   │        │
│  │   • Có internship offer từ năm 3                          │        │
│  │   • Có 1-2 personal projects nổi bật                      │        │
│  │                                                             │        │
│  │   💡 Tận dụng:                                              │        │
│  │   • Apply nội bộ projects của khoa                         │        │
│  │   • Build portfolio trên GitHub                            │        │
│  │   • Network với senior students                            │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │                                                             │        │
│  │   POST-GRADUATION                                           │        │
│  │   ─────────────────────────────────────────                │        │
│  │                                                             │        │
│  │   Career path most likely:                                  │        │
│  │                                                             │        │
│  │   • Junior SE @ startup hoặc mid-size company              │        │
│  │   • Salary range expected: 18-25M VND/tháng (HCM)          │        │
│  │   • Path to Senior: 4-6 năm                                │        │
│  │   • Likely specialization: Backend hoặc Systems            │        │
│  │     (dựa trên Day 4 choice)                                │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ⚠ Disclaimer: Đây là DỰ BÁO dựa trên patterns, không phải fate.       │
│  Quyết định và effort của bạn vẫn là yếu tố quan trọng nhất.            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Section 5: AI Panel Recommendations

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  SECTION 5 — ĐỀ XUẤT TỪ HỘI ĐỒNG AI                                     │
│                                                                         │
│  Dựa trên dữ liệu hành vi, đây là 3 hướng đi gợi ý cho bạn:            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  ★ TIER A — Match cao nhất                                  │        │
│  │                                                             │        │
│  │  📚 Software Engineering (ngành bạn vừa thử)                │        │
│  │                                                             │        │
│  │  Compatibility: 78/100                                      │        │
│  │  Confidence: HIGH (validated by 7-day experience)          │        │
│  │                                                             │        │
│  │  Tại sao:                                                   │        │
│  │  • Bạn excel ở systematic thinking                          │        │
│  │  • Tolerable stress trong technical contexts                │        │
│  │  • Strong individual contributor mindset                    │        │
│  │                                                             │        │
│  │  Caveats:                                                   │        │
│  │  • Cần tránh team management trong 3-5 năm đầu             │        │
│  │  • Cần phát triển communication skills                      │        │
│  │                                                             │        │
│  │  [Explore similar majors →]                                 │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  ◆ TIER B — Ngành lân cận (vùng an toàn)                   │        │
│  │                                                             │        │
│  │  📊 Khoa học Dữ liệu                                        │        │
│  │                                                             │        │
│  │  Predicted compatibility: 82/100 (chưa test)                │        │
│  │                                                             │        │
│  │  Tại sao có thể better:                                     │        │
│  │  • Bạn có natural data intuition                            │        │
│  │  • Ít team dependency hơn pure SE                           │        │
│  │  • Application của math + SE skills                         │        │
│  │                                                             │        │
│  │  [💡 Try Data Science scenario - 25% off]                   │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  ◆ TIER B — Ngành bổ sung                                   │        │
│  │                                                             │        │
│  │  💼 Hệ thống Thông tin Quản lý                              │        │
│  │                                                             │        │
│  │  Predicted compatibility: 71/100 (chưa test)                │        │
│  │                                                             │        │
│  │  Tại sao consider:                                          │        │
│  │  • Mix giữa tech và business                               │        │
│  │  • Easier path to senior roles                              │        │
│  │  • Less coding-intensive                                    │        │
│  │                                                             │        │
│  │  [Try MIS scenario]                                         │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │  ⚠ TIER X — Tránh                                           │        │
│  │                                                             │        │
│  │  🎨 Nghệ thuật thuần túy                                    │        │
│  │  📢 Marketing / PR                                          │        │
│  │                                                             │        │
│  │  Tại sao tránh:                                             │        │
│  │  • Bạn tìm quy luật thay vì ngẫu hứng                      │        │
│  │  • Bạn ít tolerant với ambiguity                            │        │
│  │  • Stress patterns không match                              │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
│  ⓘ Đây là gợi ý từ AI dựa trên data. Quyết định cuối cùng là bạn.      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Section 6: Parent Insight (Phụ lục cho phụ huynh)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  SECTION 6 — PHỤ LỤC CHO PHỤ HUYNH                                      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │                                                             │        │
│  │  Kính gửi quý phụ huynh,                                    │        │
│  │                                                             │        │
│  │  Sau 7 ngày trải nghiệm mô phỏng ngành Software            │        │
│  │  Engineering, con của quý vị đã thể hiện những đặc          │        │
│  │  điểm sau:                                                  │        │
│  │                                                             │        │
│  │  ─── ĐÁNH GIÁ TỔNG QUAN ───                                │        │
│  │                                                             │        │
│  │  Con có TIỀM NĂNG TỐT cho ngành SE, với mức phù hợp        │        │
│  │  78/100 — cao hơn 78% học sinh đã trải nghiệm cùng ngành.   │        │
│  │                                                             │        │
│  │  ─── 3 ĐIỂM MẠNH NỔI BẬT ───                               │        │
│  │                                                             │        │
│  │  1. Tư duy logic và phân tích vấn đề (10/10)                │        │
│  │     Con có khả năng break down complex problems              │        │
│  │     thành steps đơn giản — kỹ năng cốt lõi của ngành.       │        │
│  │                                                             │        │
│  │  2. Khả năng làm việc độc lập (9/10)                        │        │
│  │     Con tập trung tốt khi solve problems một mình.          │        │
│  │                                                             │        │
│  │  3. Tolerance với áp lực kỹ thuật                           │        │
│  │     Khi gặp khủng hoảng (Day 3 — server sập), con đã        │        │
│  │     không bỏ cuộc và tìm ra giải pháp.                     │        │
│  │                                                             │        │
│  │  ─── 2 ĐIỂM CẦN HỖ TRỢ ───                                 │        │
│  │                                                             │        │
│  │  1. Communication skills (8/10)                             │        │
│  │     Trong các tình huống team meeting, con có xu hướng     │        │
│  │     nói ít. Để thăng tiến lên Senior level (5+ năm),       │        │
│  │     con cần rèn presentation và networking.                 │        │
│  │                                                             │        │
│  │     Cách hỗ trợ:                                           │        │
│  │     • Khuyến khích con thuyết trình ở trường                │        │
│  │     • Cho con tham gia debate clubs hoặc Toastmasters       │        │
│  │                                                             │        │
│  │  2. Khả năng chịu đựng các môn đại cương                    │        │
│  │     2 năm đầu của ngành SE rất nặng về Toán, Triết.        │        │
│  │     Con có nguy cơ chán nản (40% chance bỏ học).            │        │
│  │                                                             │        │
│  │     Cách hỗ trợ:                                           │        │
│  │     • Giúp con tìm ý nghĩa của môn đại cương               │        │
│  │     • Khuyến khích internship sớm để giữ động lực          │        │
│  │     • Đăng ký coding bootcamp song song nếu cần            │        │
│  │                                                             │        │
│  │  ─── ROI PREDICTION ───                                     │        │
│  │                                                             │        │
│  │  Đầu tư vào ngành SE cho con này có:                       │        │
│  │  • Tỷ lệ hài lòng nghề nghiệp dự đoán: 82%                  │        │
│  │  • Khả năng có việc sau ra trường: 95%                      │        │
│  │  • Mức thu nhập kỳ vọng (5 năm): 35-50 triệu/tháng         │        │
│  │                                                             │        │
│  │  ─── LỜI KHUYÊN CỤ THỂ ───                                  │        │
│  │                                                             │        │
│  │  Quý vị có thể yên tâm đầu tư cho con học ngành này,       │        │
│  │  với 3 lưu ý:                                              │        │
│  │                                                             │        │
│  │  • Hỗ trợ con vượt qua 2 năm đại cương khó khăn            │        │
│  │  • Khuyến khích phát triển communication skills             │        │
│  │  • Đừng kỳ vọng con sẽ làm "manager" — con phù hợp với     │        │
│  │    individual contributor track                             │        │
│  │                                                             │        │
│  │  Nếu cần tư vấn thêm, vui lòng liên hệ team LUMINA.        │        │
│  │                                                             │        │
│  │  Trân trọng,                                               │        │
│  │  Hội đồng Phân tích AI của LUMINA                          │        │
│  │                                                             │        │
│  └─────────────────────────────────────────────────────────────┘        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Actions Panel (Sticky bottom)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Hành động tiếp theo:                                                   │
│                                                                         │
│  [⤓ Download PDF]  [⤴ Share with Parent]  [💾 Save to Portfolio]        │
│  [🎯 Try Another Major - 25% off]  [⭐ Rate this report]                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Loading sequence (cinematic)

After Day 7 complete:

```
T+0s:    Cinematic ending screen (full-screen takeover)
T+8s:    "Đang phân tích hành trình của bạn..."
T+15s:   "Đang đo lường 35 khoảnh khắc áp lực..."
T+22s:   "Đang đối chiếu với 4,532 học sinh khác..."
T+30s:   "Đang chuẩn bị báo cáo dành riêng cho bạn..."
T+45s:   Report fades in, scroll to top
```

**Why so long?** Báo cáo cần feel có giá trị. Generated trong 2 giây sẽ feel như thuật toán đơn giản.

**Real time used:**
- 5-10s actually computing
- 35s buffered animations + thoughtful messages
- Total: 45-60s

### Scroll behavior

- **Smooth scroll** giữa sections
- **Sticky header** with quick navigation
- **Progress indicator** ở edge của viewport
- **Section auto-highlight** trong sticky nav khi scroll đến

### Drill-down interactions

**Section 2 (Cognitive Matrix):**
- Click axis → modal expand showing detailed metrics + examples
- "Why is your Tư duy hệ thống 10/10?" → shows specific moments

**Section 3 (Stress Mapping):**
- Click data point → shows context (what happened that minute)
- Brush to zoom into specific day
- Toggle annotations

**Section 4 (Forecast):**
- Click year section → expand for detailed predictions
- Confidence intervals visible

**Section 5 (Recommendations):**
- Click "Try Data Science" → cross-sell flow
- Click "Why avoid Marketing" → expand reasoning

### Export PDF generation

When user clicks "Download PDF":

```
1. Show modal: "Generating PDF... (15-30 seconds)"
2. Generate beautifully formatted PDF (server-side)
3. Include all 6 sections + charts as embedded images
4. Add LUMINA branding
5. Add QR code → web version of report
6. Download trigger
```

**PDF includes:**
- Same structure as web view
- Charts rendered as SVG (crisp printing)
- Watermark: "Generated for [name] on [date]"
- Footer: Confidential, do not redistribute

### Share with Parent flow

If parent already linked:

```
1. Click "Share with Parent"
2. Modal: "Linked parent: [Name]. Send report?"
3. Optional: add personal message
4. Send → parent gets notification
5. Parent can view in Parent Dashboard
```

If parent not linked:

```
1. Click "Share with Parent"
2. Modal: "Enter parent's email"
3. System sends invitation + report link
4. Parent signs up → can view report
5. Auto-link established
```

---

## 5. States

### State 1: Loading (initial generation)

Cinematic loading như mô tả ở trên.

### State 2: Default view

All 6 sections rendered, scrollable.

### State 3: Drill-down modal

Modal overlay với detailed view của 1 metric.

### State 4: PDF generating

```
┌─────────────────────────────────────┐
│                                     │
│       Đang tạo PDF...                │
│                                     │
│       ████████████░░░░░░░░ 65%       │
│                                     │
│       Quá trình này mất 15-30s       │
│                                     │
│       [Cancel]                      │
│                                     │
└─────────────────────────────────────┘
```

### State 5: Share modal

```
┌─────────────────────────────────────┐
│                                     │
│   Chia sẻ với phụ huynh             │
│                                     │
│   Phụ huynh đã link: Bố Hùng        │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ Tin nhắn (optional):        │   │
│   │                             │   │
│   │ Bố ơi, con đã hoàn thành    │   │
│   │ trải nghiệm ngành SE đây ạ  │   │
│   └─────────────────────────────┘   │
│                                     │
│   Phụ huynh sẽ xem được:            │
│   ☑ All 6 sections (transparency:  │
│     Standard)                       │
│                                     │
│   [Cancel]   [Send to Parent]       │
│                                     │
└─────────────────────────────────────┘
```

### State 6: Feedback prompt (after some time)

```
┌─────────────────────────────────────┐
│                                     │
│   Báo cáo này có chính xác?          │
│                                     │
│   ⭐ ⭐ ⭐ ⭐ ⭐                     │
│                                     │
│   (Phản hồi của bạn giúp LUMINA      │
│    cải thiện cho thế hệ sau)         │
│                                     │
│   [Skip]   [Submit]                 │
│                                     │
└─────────────────────────────────────┘
```

### State 7: Re-view (from Portfolio)

Same as default view, plus:
- Banner: "Last viewed 2 weeks ago"
- "Compare with other reports" option (V2)

### State 8: Burnout ending special view

Different visual tone — softer, more empathetic:
- Hero: muted colors, không amber/gold
- Section 5: alternative paths prominent
- Mental health resources visible
- "It's OK to feel relieved" messaging

### State 9: Generation failed (error)

```
┌─────────────────────────────────────┐
│                                     │
│   ⚠ Báo cáo đang gặp vấn đề          │
│                                     │
│   AI cần thêm thời gian để phân tích │
│   hành trình của bạn.                │
│                                     │
│   Bạn sẽ nhận email khi báo cáo      │
│   sẵn sàng (thường trong 1 giờ).     │
│                                     │
│   Chúng tôi không charge bạn cho     │
│   trải nghiệm này.                   │
│                                     │
│   [Notify me] [Contact support]     │
│                                     │
└─────────────────────────────────────┘
```

---

## 6. Data Flow

### Inputs

```yaml
from_session_data:
  - all_decisions: array[decision_log]
  - stress_timeline: array[stress_snapshot]
  - knowledge_applications: array[application_record]
  - widget_interactions: array[interaction]
  - chat_messages: array[message]
  - branch_choices: array[branch_record]
  - day_completions: array[day_summary]
  - ending_type: enum[natural, fighter, wrong_fit, reluctant, burnout]

from_aggregated_data:
  - peer_comparisons: stats from other students same scenario
  - historical_outcomes: 6-month follow-up data (V2)

from_persona_responses:
  - alpha_summary: từ Mr. Alpha (academic perspective)
  - chip_summary: từ Chip (emotional support perspective)

from_evaluation_hooks:
  - cognitive_matrix_scores: từ scenario evaluation hooks
  - behavioral_metrics: stress_tolerance, persistence, etc.
```

### Report Generation Pipeline

```
1. Trigger: Day 7 complete OR burnout exit
2. Load all session data
3. Run Branch Arbitration → determine ending type
4. Calculate Section 1 (Compatibility Score)
5. Calculate Section 2 (Cognitive Matrix scores)
6. Generate Section 3 (Stress timeline visualization data)
7. Generate Section 4 (4-year forecast via LLM với scenario context)
8. Generate Section 5 (Recommendations via LLM với cross-domain knowledge)
9. Generate Section 6 (Parent insight via LLM với parent-friendly language)
10. Compile into structured JSON
11. Cache for fast access
12. Notify user (if not currently in session)
```

### LLM usage

**Deterministic parts** (no LLM):
- Compatibility Score calculation
- Cognitive Matrix scores
- Stress Mapping data
- Branch Arbitration

**Generated parts** (LLM):
- 4-year forecast narrative
- Recommendations reasoning
- Parent insight letter
- Personalized messaging

**Important:** LLM uses **template-based generation** với strict constraints, không free-form. Đảm bảo report structure consistent across users.

### Outputs

```yaml
report_artifacts:
  - structured_json: stored in DB
  - rendered_html: cached for web view
  - pdf_export: generated on-demand
  - parent_summary: filtered version
  
events_emitted:
  - report.generated
  - report.viewed
  - report.downloaded_pdf
  - report.shared_with_parent
  - report.feedback_submitted
  - report.cross_sell_clicked
```

### API Endpoints

```yaml
GET    /api/reports/:session_id          # Load report
POST   /api/reports/:session_id/generate # Trigger generation
GET    /api/reports/:session_id/pdf      # Generate/download PDF
POST   /api/reports/:session_id/share    # Share with parent
POST   /api/reports/:session_id/feedback # Submit rating
GET    /api/reports/user/:user_id        # All reports cho user
```

---

## 7. Permission Checks

| Action | Learner | Parent | Admin |
|:--|:-:|:-:|:-:|
| View own report | ✅ | N/A | N/A |
| View child's report | N/A | 🔐 (transparency) | N/A |
| Download PDF | ✅ | 🔐 (if can view) | ✅ (admin context) |
| Share with parent | ✅ | N/A | N/A |
| Submit feedback | ✅ | ✅ | N/A |
| Re-share to others | ❌ | ❌ | N/A |
| Edit report | ❌ | ❌ | ❌ |
| Delete report | 🔐 (request to admin) | ❌ | ✅ |
| Anonymized view | N/A | N/A | ✅ |

**Parent transparency rules:**
- **Minimal**: Cannot view report content, only fact that report exists
- **Standard**: Can view all sections + Section 6 prominent
- **Full**: Same as Standard (no additional access for reports)

---

## 8. Edge Cases

### Case 1: Report generation timeout

**Scenario:** AI generation takes > 5 minutes

**Response:**
- Show "Taking longer than usual" message
- Continue in background
- Email notification when ready
- Refund consideration if total time > 30 min

### Case 2: Disagreement với report

**Scenario:** Student feels report is wrong

**Flow:**
- Feedback button: "Report doesn't feel accurate"
- Detailed feedback form
- Specific section disagreement
- Doesn't change report immediately
- Logged cho model improvement
- Re-generate option (limited use)

### Case 3: Sensitive content (suicide ideation, crisis indicators)

**Detection:**
- Stress patterns extreme
- Chat content concerning
- Behavioral red flags

**Response:**
- Flag report cho LUMINA team review
- Include mental health resources prominently
- Crisis hotline information
- Optional parent notification (with student consent if 16+)
- Não block report

### Case 4: Parent disputes report

**Scenario:** Parent thinks report is wrong about their child

**Flow:**
- Parent can submit feedback
- Logged
- LUMINA team reviews
- May offer re-evaluation with updated context
- Report is **suggestion**, not verdict — emphasize this

### Case 5: Multiple reports same major (re-take)

**Scenario:** Student re-takes SE scenario after 3 months

**Flow:**
- Previous report archived (kept in Portfolio)
- New report generated
- Comparison view available (V2)
- Show growth/changes

### Case 6: Report data lost (rare)

**Scenario:** Session data corrupted

**Response:**
- Apologize + refund
- Best-effort partial report from available data
- Clearly labeled "Partial Report"
- Offer re-take with discount

### Case 7: Sharing report tới people other than parent

**Scenario:** Student wants to share with school counselor

**Flow:**
- "Share PDF" → can email to anyone
- Or "Generate shareable link" → expires in 7 days
- Recipient sees web view (read-only)
- Audit log tracks shares

---

## 9. Responsive Considerations

### Desktop (1440px+) — Primary

Full layout với rich data viz.

### Laptop (1024-1440px)

- Charts scale proportionally
- Sections stack với same structure
- Sticky header compresses

### Tablet (768-1024px)

- Single column layout
- Charts simplified (less detail in radar)
- Sections collapsible
- Touch-friendly controls

### Mobile (< 768px)

- Mobile-first read experience
- Charts replaced với simpler visualizations
- Sections accordion-style
- Big tap targets cho actions
- PDF download still available

**Important:** Final Report MUST work well on mobile. Many parents will view on phone.

---

## 10. Performance Requirements

- **Initial load**: < 3s (cached)
- **First-time generation**: 30-60s (one-time)
- **Section drill-downs**: < 500ms
- **PDF generation**: < 30s
- **Chart rendering**: < 1s per section

### Optimization

- Pre-generate report immediately after Day 7 complete
- Cache HTML rendering
- Lazy-load detailed drill-downs
- Optimize chart library bundle size
- Server-side PDF generation

---

## 11. Accessibility

**Critical for Final Report:**

- Full keyboard navigation
- Screen reader: all chart data có text alternatives
- Tables provide same data as charts
- Color không sole indicator (icons + text)
- High contrast mode support
- Print-friendly version
- Translatable (V2: English version cho international)

**Special considerations:**
- Reports often shown to parents who may have visual impairments
- Long-form reading — typography critical
- Anxiety-inducing topics — calm, accessible design

---

## 12. Visual Design Notes

### Color application

**Per ending type:**
- **Natural**: warm gold (`--lumina-300` → `--lumina-500`)
- **Fighter**: amber với intensity (`--signal-alert`)
- **Wrong Fit**: muted blue (`--signal-focus` desaturated)
- **Reluctant**: neutral gray (`--ink-300`)
- **Burnout**: soft warm (`--paper-200` warm tones)

**Sections:**
- Each section card: `--paper-100` background
- Dividers: `--ink-200`
- Highlights: ending-specific accent color

**Charts:**
- Primary data: ending color
- Comparison data: `--ink-400` (muted)
- Annotations: `--lumina-500`

### Typography

**Hero:**
- Ending title: Fraunces 44-48px italic
- Tagline: Inter Tight 18-20px regular

**Section headers:**
- Title: Inter Tight 24px semibold
- Subtitle: Inter Tight 14px regular `--ink-500`

**Body:**
- Insights: Inter Tight 16px regular
- Data labels: JetBrains Mono 13px
- Quotes/letters: Fraunces 16px italic

### Iconography

- Section icons: Lucide (BarChart, RadarChart, LineChart, Calendar, etc.)
- Ending icons: Custom (matching mood)
- Action icons: Lucide (Download, Share, Bookmark)

### Motion

- Section entrance: stagger fade-up (200ms each)
- Charts: animate from 0 to value (1.5s)
- Counter numbers: count up animation
- Drill-down: smooth modal expand

---

## 13. Multi-domain Application Examples

### Example 1: Software Engineering — The Fighter ending

```yaml
ending: "the_fighter"
compatibility_score: 78
hero_message: "Bạn có thể làm được — nhưng phải trả giá."

cognitive_matrix:
  systematic_thinking: 10
  data_processing: 10
  stress_tolerance: 9
  ethical_reasoning: 7
  communication: 8

stress_pattern:
  peak: "Day 3 14:23 (92%)"
  lowest: "Day 5 10:15 (25%)"
  insight: "Spike khi team conflicts, calm khi solo work"

forecast:
  year_1_2: "Risk 40% bỏ học (đại cương khó)"
  year_3_4: "Tỏa sáng ở dự án thực tế"
  career_path: "Senior Engineer track, avoid management"

recommendations:
  tier_a: "Software Engineering (validated)"
  tier_b: "Data Science (similar skills, less team)"
  tier_b_alt: "Hệ thống Thông tin Quản lý"
  avoid: "Marketing/PR, Pure Arts"
```

### Example 2: Medical — The Natural ending

```yaml
ending: "the_natural"
compatibility_score: 92
hero_message: "Bạn sinh ra để cứu người."

cognitive_matrix:
  clinical_reasoning: 10
  empathy: 10
  attention_to_detail: 9
  decision_under_pressure: 9
  ethical_judgment: 10

stress_pattern:
  peak: "Day 4 16:45 (78%) - emergency triage"
  lowest: "Day 6 09:00 (30%) - patient education"
  insight: "Calm under crisis, energized by patient interaction"

forecast:
  year_1_2: "Strong performance in foundational sciences"
  year_3_4: "Natural in clinical rotations"
  career_path: "Likely specialist (Internal, Emergency)"
  prediction: "Likely top 10% of class"

recommendations:
  tier_a: "Y khoa (validated, high confidence)"
  tier_b: "Y học cổ truyền (alternative path)"
  tier_b_alt: "Dược học (related field)"
  avoid: "None - this is your calling"

parent_insight: |
  Quý vị nên cảm thấy vô cùng yên tâm. Con thuộc nhóm
  hiếm có khả năng tự nhiên cho ngành Y. Đầu tư 6 năm
  Y khoa cho con sẽ có ROI rất cao.
```

### Example 3: Marketing — The Wrong Fit ending

```yaml
ending: "the_wrong_fit"
compatibility_score: 38
hero_message: "Đây không phải thất bại — đây là thông tin quý giá."

cognitive_matrix:
  creative_thinking: 6
  data_analysis: 5
  social_intuition: 4
  storytelling: 5
  business_acumen: 6

stress_pattern:
  peak: "Day 5 11:30 (95%) - presenting to client"
  consistent_high: "Stress > 70% trong 5/7 days"
  insight: "Discomfort với ambiguity và public-facing work"

forecast:
  scenario_continuation: "Risk cao của burnout năm 2-3"
  career_path: "Likely struggle, low job satisfaction"
  health_impact: "Pattern suggests anxiety risk"

recommendations:
  tier_a: "Không recommend Marketing"
  tier_b: "Phân tích Tài chính (uses same skills bạn excel)"
  tier_b_alt: "Software Engineering (try this scenario)"
  tier_b_third: "Khoa học Máy tính"
  avoid: "Public-facing roles in general"

empathetic_messaging: |
  Báo cáo này không nói bạn không giỏi. Nó chỉ nói rằng
  bạn sẽ phải work twice as hard cho cùng kết quả trong
  Marketing. Hãy thử hướng khác — bạn có thể tỏa sáng ở
  ngành phù hợp với strengths tự nhiên của mình.

cross_sell_emphasis: HIGH
mental_health_resources: VISIBLE
```

### Differences in same Final Report screen

| Aspect | SE Fighter | Medical Natural | Marketing Wrong Fit |
|:--|:--|:--|:--|
| **Hero color** | Amber (intense) | Gold (warm) | Muted blue (calm) |
| **Score emphasis** | 78 (mid-high) | 92 (high) | 38 (low — but framed positively) |
| **Recommendations focus** | Continue với caveats | Continue confidently | Explore alternatives |
| **Parent message tone** | Cautiously optimistic | Highly confident | Reassuring + practical |
| **Cross-sell intensity** | Low | None | High |
| **Mental health resources** | Hidden | Hidden | Visible |
| **Forecast tone** | Realistic challenges | Bright outlook | Honest concerns |

**Same component, completely different experience.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Learner (post Day 7) |
| **Complexity** | ⭐⭐⭐⭐ |
| **Business criticality** | HIGHEST (NPS driver) |
| **Estimated build time** | 8-10 weeks |
| **Key technologies** | React, D3/Recharts, PDF generation, LLM templates |
| **Critical dependencies** | Session data (Workspace), Aggregate stats |
| **Performance targets** | < 3s load, < 30s PDF gen |
| **Device support** | Desktop + tablet + mobile (all important) |
| **Multi-domain** | Yes - 5 endings × N domains = many variants |
| **Biggest challenge** | Generating insightful narrative consistently |
| **Biggest value** | Quyết định trust và word-of-mouth của LUMINA |

### Design principles applied

1. ✅ **Honesty over comfort** — Wrong Fit ending told straight
2. ✅ **Empathy in delivery** — All endings respect student's emotional state
3. ✅ **Data hero** — Beautiful viz, but data drives narrative
4. ✅ **Action-oriented** — Always next steps clear
5. ✅ **Privacy aware** — Parent view filtered by transparency level
