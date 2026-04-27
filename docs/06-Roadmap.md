# 06 — Roadmap

## Chiến lược phát hành 3 phiên bản

LUMINA được phát hành theo **3 phiên bản tiến hóa**, mỗi phiên bản mở rộng thêm tính năng và đối tượng người dùng. Cách tiếp cận này giúp:

1. **Giảm rủi ro**: V1 an toàn, xây dựng niềm tin trước khi mở rộng
2. **Validate từng bước**: Mỗi phiên bản là một thử nghiệm thực tế trước khi đi xa hơn
3. **Tối ưu nguồn lực**: Không cần build toàn bộ hệ thống phức tạp ngay từ đầu

---

## V1.0 — Curated Foundation

**Thời gian**: 6-8 tháng  
**Đối tượng**: Học sinh lớp 11-12, sinh viên năm 1  
**Mục tiêu**: Xây niềm tin, chứng minh giá trị cốt lõi

### Scope

- **Chỉ LUMINA team tạo** kịch bản và widget (không mở cho external)
- **1 Hero Major**: Software Engineering với đầy đủ 7 ngày
- **5 Widget cốt lõi**: CodeSpace, TaskBoard, LogHunter, DeployFlow, TeamChat
- **1 kịch bản chính**: "SE Junior to Senior Evolution" (7 ngày)
- **Design System hoàn chỉnh** sẵn sàng áp dụng
- **18 màn hình**

### Tech Stack

- **Frontend**: Next.js + Tailwind CSS + Shadcn/UI
- **Backend**: NestJS hoặc FastAPI
- **AI**: Gemini Pro (characters) + Gemini Flash (buddy) + small model (guardrail)
- **Database**: PostgreSQL + Redis (session state)
- **Infrastructure**: Vercel/Railway (staging) → AWS (production)

### 20 Màn hình V1

*Cập nhật: Thêm Session Replay (màn 17) và Parent Dashboard (màn 20) sau khi thiết kế User Flows phát hiện cần thiết.*

#### Phase A — Foundation & Studios (4 màn)

1. **Design System** ✅ (đã hoàn thành)
2. **Scenario Architect** — studio tạo kịch bản (flow-based editor)
3. **Persona Studio** — studio tạo AI nhân vật
4. **Widget Studio** — studio tạo widget

#### Phase B — Learner Core (3 màn)

5. **Gateway** — chọn ngành (cánh cửa đầu)
6. **Hub/Dashboard** — timeline 7 ngày
7. **Workspace** — 3-zone layout (trái tim)

#### Phase C — Learner Extended (5 màn)

8. **Buddy Chat** — popup/tab riêng
9. **Widget Preview** — xem chi tiết widget
10. **Final Report** — Career-Fit Analytics
11. **Portfolio/Archive** — di sản học sinh
12. **System States** — Loading, Game Over, Level Up

#### Phase D — Admin Operations (8 màn)

13. **Orchestrator Console** — cấu hình Priority Matrix, Shared Context
14. **Widget Catalog** — browse widgets với dependencies
15. **Knowledge Vault** — CMS cho thẻ bài lý thuyết
16. **Analytics Dashboard** — monitoring, AI cost, hallucination log
17. **Session Replay** ⭐ — time-travel debugging với 3 access levels (Full/Anonymized/Aggregated)
18. **User & Workspace Management** — quản lý user + workspace
19. **Role & Permission Management** — RBAC admin
20. **Parent Dashboard** ⭐ — phụ huynh theo dõi con (3 transparency levels)

### Kiến trúc hệ thống V1

- **Scenario architecture**: 60% cứng / 40% mềm, 2 Branch Points + 5 Endings
- **AI architecture**: 3 lớp (Persona / Orchestrator / Runtime), 3 loại AI (Character / Director / System)
- **Widget architecture**: Manifest + Contract + Composition pattern
- **User organization**: RBAC Hybrid với 6 internal roles, Workspace concept sẵn sàng

### Mô hình kinh doanh V1

- **B2C**: $19.99/ngành trải nghiệm
- **B2B**: License cho trường cấp 3 (~$2,999/năm cho 500 học sinh)
- **Freemium**: 1 ngày miễn phí để try

### Success Metrics V1

- **Completion rate**: >60% học sinh hoàn thành 7 ngày
- **Accuracy**: 80%+ học sinh đồng ý với báo cáo Career-Fit sau 6 tháng
- **NPS**: >50 từ phụ huynh
- **Conversion**: 15%+ từ freemium sang paid
- **Cost per session**: < $1.20 (AI cost)

---

## V2.0 — Expert Network

**Thời gian**: Year 2 (sau V1 launch 6-12 tháng)  
**Đối tượng**: + Expert contributors (bác sĩ, luật sư, giảng viên đại học)  
**Mục tiêu**: Scale nội dung bằng chuyên gia có credential

### Vấn đề cần giải quyết

V1 chỉ có LUMINA team tạo nội dung → không thể scale nhanh chóng sang nhiều ngành. Việt Nam có 300+ ngành đào tạo đại học, model top-down sẽ nghẽn.

### Scope mở rộng

- **Expert Workspace**: Chuyên gia verified tạo kịch bản riêng
- **Review Pipeline**: Quy trình duyệt 2 vòng (auto + manual)
- **Revenue Share**: Expert nhận 30% doanh thu từ kịch bản của họ
- **Quality Control**: Rating system + feedback loop
- **Expand ngành**: Y, Luật, Kinh tế, Marketing (từ 1 ngành lên 5)

### 3 Tầng nội dung (Curated Marketplace)

Thay vì mở hoàn toàn cho cộng đồng kiểu YouTube/TikTok, V2 dùng mô hình **3 tầng** giống App Store của Apple:

**Tầng 1 — Official Scenarios (LUMINA chính thức)**
- Do đội ngũ LUMINA + chuyên gia đối tác sản xuất
- Badge "Verified by LUMINA"
- Mặc định cho học sinh khi chọn ngành

**Tầng 2 — Expert Scenarios (Chuyên gia xác thực)**
- Dành riêng cho **người có credential được verify**: bác sĩ (có số giấy phép), luật sư (có thẻ), giảng viên (có email .edu)
- Pass **quy trình duyệt 2 vòng**: tự động (check plagiarism, bias, toxicity) + manual (chuyên gia LUMINA review)
- Badge "Expert-contributed" kèm profile người tạo
- Creator nhận **revenue share** khi học sinh chọn kịch bản này

**Tầng 3 — Community Labs** → Dành cho V3

### Technical Additions

- Multi-tenant architecture (workspaces)
- Expert verification system (credential upload + third-party check)
- Payment/revenue distribution system
- Advanced analytics per expert

### +12 Màn hình V2

#### Expert Creator (6 màn)

19. **Expert Onboarding & Verification** — upload credential, liên kết LinkedIn
20. **Expert Studio** (simplified Scenario Architect)
21. **Submission Dashboard** — theo dõi trạng thái duyệt
22. **Expert Analytics** (usage, revenue, ratings)
23. **Expert Profile** (public page)
24. **Revenue & Payout**

#### Learner mở rộng (2 màn)

25. **Scenario Marketplace** (discover by expert/rating/category)
26. **Expert Public Profile** (khi duyệt kịch bản)

#### Admin mở rộng (4 màn)

27. **Review Pipeline** (queue + AI-assist review tools)
28. **Expert Management** (verification, suspension, tier management)
29. **Quality Metrics Dashboard**
30. **Revenue/Payout Management**

### V2 Roles bổ sung

**Expert-side:**
- Expert Creator (tạo scenario, không publish được)
- Verified Expert (publish được sau review)

**LUMINA Internal mở rộng:**
- Reviewer (duyệt scenarios)
- Verification Officer (xác thực credential)

### Mô hình kinh doanh V2

V1 models + thêm:
- **Revenue share**: Expert nhận 30% từ mỗi scenario sử dụng
- **Marketplace fee**: LUMINA giữ 70%
- **Premium tier cho học sinh**: Access tất cả expert scenarios

---

## V3.0 — Community Labs

**Thời gian**: Year 3 (sau V2 validate 12+ tháng)  
**Đối tượng**: + Community creators (user thường, không cần credential)  
**Mục tiêu**: Democratize innovation, phủ rộng ngành ngách

### Vấn đề cần giải quyết

V2 vẫn giới hạn ở các ngành "chính thống" có chuyên gia verified. Nhưng có rất nhiều ngành **phi truyền thống** mà học sinh Gen Z quan tâm:
- Streamer / Content Creator
- Game Designer / E-sports
- Social Media Manager
- Freelance Designer
- Nghề tự do (gig economy)

Các ngành này không có "chuyên gia được Đoàn ngành chứng nhận", nhưng có cộng đồng thực hành lớn.

### Scope mở rộng

- **Community Labs**: User thường tạo experimental scenarios
- **Custom Widget Sandbox**: Community tạo widget trong môi trường cô lập
- **Scenario Remix/Fork**: Lấy scenario có sẵn, cá nhân hóa
- **Graduation Path**: Experimental scenario "trưởng thành" lên Expert tier nếu đủ chất lượng

### Nguyên tắc an toàn

- Scenario experimental **luôn gắn label rõ ràng** "Experimental — không tính vào Career-Fit Report"
- **Không ảnh hưởng đến báo cáo chính thức**
- Dùng cho ngành phi truyền thống, không cạnh tranh với Tier 1-2
- Có thể "graduate" lên Tier 2 nếu đủ chất lượng và được chuyên gia endorse

### +8-10 Màn hình V3

#### Community Creator (4 màn)

31. **Community Studio** (lightweight editor)
32. **Widget Sandbox** (tạo custom widget với template)
33. **Collaboration Space** (fork, remix kịch bản)
34. **Graduation Path** (upgrade to Expert tier)

#### Learner mở rộng (2 màn)

35. **Community Hub** (khám phá experimental content)
36. **Scenario Remix** (fork kịch bản có sẵn để cá nhân hóa)

#### Admin mở rộng (3 màn)

37. **Community Moderation** (report, flag, ban)
38. **Sandbox Security Monitor**
39. **Graduation Review**

### V3 Roles bổ sung

- **Community Creator** (quyền giới hạn, sandbox only)
- **Moderator** (flag content, escalate lên LUMINA)

### Technical Additions

- **Widget SDK** — framework để community tự build widget
- Sandbox bảo mật cho custom widget
- **Widget Remix** — fork widget có sẵn để biến thể
- Content moderation pipeline
- Reputation system

### Mô hình kinh doanh V3

V1 + V2 models + thêm:
- **Premium creator subscription**: $9/tháng cho advanced tools
- **Featured placement**: Trả phí để scenario xuất hiện top
- **Sponsorship**: Công ty tài trợ scenario nghề đặc thù

---

## Tổng kết Roadmap

| Phiên bản | Thời gian | Màn hình tích lũy | Rủi ro | Complexity | Đối tượng |
|:-:|:-:|:-:|:-:|:-:|:-:|
| **V1.0 Curated Foundation** | 6-8 tháng | 20 | Thấp | ⭐⭐ | LUMINA Team + Học sinh + Phụ huynh |
| **V2.0 Expert Network** | Year 2 | 32 (+12) | Trung bình | ⭐⭐⭐⭐ | + Experts verified |
| **V3.0 Community Labs** | Year 3 | 41 (+9) | Cao (có kiểm soát) | ⭐⭐⭐⭐⭐ | + Community creators |

---

## Lợi ích của cách tiếp cận 3 phiên bản

### 1. V1 là MVP thực sự
20 màn hình là con số vừa sức để launch, không quá tham vọng.

### 2. Mỗi phiên bản là "milestone có thể bán được"
- V1 bán được cho trường cấp 3
- V2 mở marketplace tạo network effect
- V3 tạo hệ sinh thái cộng đồng

### 3. Design System chỉ tạo 1 lần
Tokens đủ mở rộng cho cả V3, chỉ thêm components mới theo từng phiên bản.

### 4. Backward-compatible extensibility
Các quyết định ở V1:
- **RBAC Hybrid** sẵn sàng cho thêm roles ở V2-V3
- **Workspace concept** sẵn sàng cho expert/community workspaces
- **Widget manifest** sẵn sàng cho custom widgets ở V3
- **Persona Registry** sẵn sàng cho expert-created personas

→ V2-V3 **chỉ thêm**, không sửa V1.

### 5. Dễ thuyết phục nhà đầu tư
Có lộ trình rõ ràng với milestones cụ thể:
- V1: Prove value → Raise Seed
- V2: Prove scalability → Raise Series A
- V3: Prove network effect → Raise Series B

---

## Nguyên tắc "bổ sung không phá hủy"

Khi chuyển từ phiên bản này sang phiên bản khác:

### Data Layer
- **Không migration lớn**: Schema V1 phải đủ rộng để chứa V2-V3 concepts
- **Versioning từ đầu**: Mỗi entity (scenario, persona, widget) có `version` và `schema_version`

### Code Layer
- **Feature flags**: V2 features ẩn sau flag cho đến khi ready
- **Plugin architecture**: Tính năng mới là plugin, không phải core modification

### User Layer
- **Grandfathering**: Users V1 tự động được upgrade quyền khi V2 launch, không mất data
- **Opt-in mới**: Features mới là opt-in, không ép buộc

---

## Tóm tắt

| Khía cạnh | V1 | V2 | V3 |
|:--|:--|:--|:--|
| **Người tạo content** | Chỉ LUMINA | + Verified Experts | + Community |
| **Số ngành** | 1 (SE) | 5+ | Mở rộng không giới hạn |
| **Số màn hình** | 18 | 30 | 39 |
| **Độ rủi ro** | Thấp | Trung bình | Cao (có kiểm soát) |
| **Mô hình kinh doanh chính** | B2C + B2B | + Marketplace revenue share | + Creator subscriptions |
| **Mục tiêu milestone** | Prove value | Prove scalability | Prove network effect |
