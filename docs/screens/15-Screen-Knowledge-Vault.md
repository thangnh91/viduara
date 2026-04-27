# Screen 15 — Knowledge Vault

**Màn hình số:** 15  
**Phase:** D — Admin Operations  
**Complexity:** ⭐⭐⭐ (Trung bình)  
**Primary users:** Curator (full); Designer, Persona Writer (read)  
**Related flow:** Flow 04 (Tạo kịch bản — link cards), Flow 05 (Tạo persona — link sources)  
**Dependencies:** Screen 1 (Design System), Screen 2/3 (consumers of cards)

---

## 0. Multi-domain Context

Knowledge Vault chứa **knowledge cards** đa ngành — atomic units of academic content mà personas reference khi giảng dạy.

**Examples used in this spec:**
- **Software Engineering**: Big O Notation, Data Structures, Algorithms 101, Design Patterns
- **Medical**: Anatomy basics, Clinical reasoning, Drug interactions, Vital signs
- **Marketing**: AARRR Metrics, Marketing Funnel, A/B Testing, CAC vs LTV
- **Generic**: Critical thinking, Communication, Problem solving

---

## 1. Mục đích màn hình

Knowledge Vault là **CMS (Content Management System)** cho academic content. Đây là nơi:

**5 chức năng cốt lõi:**

1. **Manage knowledge cards** — Create, edit, organize, version
2. **Categorize by domain** — Tree structure
3. **Quality control** — Verification by experts
4. **Track usage** — Cards đang được dùng ở đâu
5. **Detect gaps** — Cards bị thiếu cho coverage

### Metaphor thiết kế

Knowledge Vault giống như **Wikipedia** + **Notion database**:
- Hierarchical organization
- Rich content editing
- Cross-linking
- Version history
- Verification badges

Hoặc gần với **Anki deck manager** — atomic flashcards organized by topic.

### Triết lý: "Verified, Not Comprehensive"

Vault không cố gắng cover everything về ngành. Chỉ những gì:
- **Cần thiết** cho scenarios (used by 1+ scenario)
- **Đã verified** bởi expert
- **Atomic** (1 concept per card)
- **Reusable** (dùng được nhiều contexts)

---

## 2. Users & Use Cases

### Primary user: Curator (role: `curator`)

**Background:**
- University professor, industry expert
- Domain knowledge deep
- Often part-time contractor

**Workload:**
- Create cards cho new scenarios
- Verify cards from other contributors
- Update outdated cards
- Flag inaccuracies

### Secondary users (read-only)

- **Designer**: Link cards to scenarios
- **Persona Writer**: Set persona's allowed knowledge sources
- **Operator**: Lookup card content when investigating

### Use cases chi tiết

#### UC1: Curator creates new card

**Example:** "Customer Lifetime Value (LTV)" cho Marketing

**Flow:**
1. Open Knowledge Vault
2. Navigate: Marketing > Metrics > [Add card]
3. Fill form:
   - Title: "Customer Lifetime Value (LTV)"
   - Concept summary
   - Detailed explanation
   - Examples (Vietnamese context)
   - Common misconceptions
   - Related cards
4. Add references/sources
5. Submit for review (if peer review enabled)
6. Publish

#### UC2: Curator verifies external contribution

**Scenario:** Junior contributor wrote "Big O Notation"

**Flow:**
1. Notification: "New card pending verification"
2. Open card, review content
3. Edit if needed
4. Add verification badge
5. Approve or request changes

#### UC3: Designer browses to link cards

**Flow:**
1. Designing Marketing scenario, Day 3
2. Need card for AARRR
3. Open Knowledge Vault → Marketing → Metrics
4. Find AARRR card
5. Click "Link to scenario" → choose scenario + day
6. Card now available to personas in that scenario

#### UC4: Audit outdated content

**Scenario:** "Tax law update 2026" affects Legal cards

**Flow:**
1. Curator filters: Legal cards updated > 1 year ago
2. Review for outdated info
3. Update cards
4. Notify scenarios using affected cards

---

## 3. Layout & Structure

### Overall Layout (Desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 LUMINA  >  Operations  >  Knowledge Vault         [+ New Card]      │
├─────────────────┬───────────────────────────────────┬───────────────────┤
│                 │                                   │                   │
│  Domain Tree    │           Cards List              │   Card Detail     │
│  Sidebar        │         (sortable table)          │   (Editor)        │
│                 │                                   │                   │
│  280px          │            720px                  │      400px        │
│                 │                                   │                   │
│                 │                                   │                   │
│                 │                                   │                   │
└─────────────────┴───────────────────────────────────┴───────────────────┘
```

### Domain Tree Sidebar (Left)

```
┌─────────────────────────────┐
│  KNOWLEDGE VAULT            │
│                             │
│  Search: [_____________]    │
│                             │
│  ─── DOMAINS ───            │
│                             │
│  ▼ Software Engineering (24)│
│   ▼ Algorithms (8)          │
│      ◆ Big O Notation       │
│      ◆ Sorting Algorithms   │
│      ◆ Search Algorithms    │
│      ◆ Recursion            │
│      ◆ Dynamic Programming  │
│      ◆ Graph Algorithms     │
│      ◆ ...                  │
│   ▶ Data Structures (6)     │
│   ▶ System Design (4)       │
│   ▶ Programming Concepts(6) │
│                             │
│  ▼ Medical (15)             │
│   ▶ Anatomy (5)             │
│   ▶ Clinical Reasoning (4)  │
│   ▶ Pharmacology (3)        │
│   ▶ Procedures (3)          │
│                             │
│  ▼ Marketing (12)           │
│   ▼ Metrics (4)             │
│      ◆ AARRR                │
│      ◆ CAC vs LTV           │
│      ◆ ROAS                 │
│      ◆ NPS                  │
│   ▶ Strategy (4)            │
│   ▶ Channels (4)            │
│                             │
│  ▼ Generic (8)              │
│   ▶ Critical Thinking (3)   │
│   ▶ Communication (3)       │
│   ▶ Problem Solving (2)     │
│                             │
│  ─── STATS ───              │
│  Total: 59 cards            │
│  Verified: 51 (86%)         │
│  Pending: 5                 │
│  Outdated: 3 ⚠              │
│                             │
└─────────────────────────────┘
```

### Cards List (Center) — Default view

When domain selected (e.g., Marketing > Metrics):

```
┌───────────────────────────────────────────────────────────┐
│  📂 Marketing > Metrics                                   │
│                                                           │
│  Filter: [All ▼]  Status: [All ▼]  Updated: [Any ▼]       │
│                                                           │
│  4 cards                                                  │
│                                                           │
│  ┌───────────────────────────────────────────────────┐    │
│  │ Title             │ Status   │ Updated  │ Used in │   │
│  ├───────────────────────────────────────────────────┤    │
│  │ ◆ AARRR           │ ✅ Verified│ 2 weeks │ 3 scen │   │
│  │   Acquisition,    │            │ ago     │        │   │
│  │   Activation...   │            │         │        │   │
│  ├───────────────────────────────────────────────────┤    │
│  │ ◆ CAC vs LTV     │ ✅ Verified│ 1 month │ 2 scen │   │
│  │   Customer        │            │ ago     │        │   │
│  │   acquisition cost│            │         │        │   │
│  ├───────────────────────────────────────────────────┤    │
│  │ ◆ ROAS           │ ⏳ Pending │ 3 days  │ 0 scen │   │
│  │   Return on Ad    │  Review    │ ago     │        │   │
│  │   Spend           │            │         │        │   │
│  ├───────────────────────────────────────────────────┤    │
│  │ ◆ NPS            │ ⚠ Outdated│ 8 months│ 1 scen │   │
│  │   Net Promoter    │            │ ago     │        │   │
│  │   Score           │            │         │        │   │
│  └───────────────────────────────────────────────────┘    │
│                                                           │
│  [+ Add card to Metrics]                                  │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Status indicators:**

- ✅ **Verified**: Reviewed by expert, current
- ⏳ **Pending Review**: Submitted, awaiting verification
- 📝 **Draft**: Being edited, not yet submitted
- ⚠ **Outdated**: Verified > 1 year ago, needs review
- 🚫 **Deprecated**: Replaced by newer card

### Card Detail / Editor (Right, 400px)

When card selected:

```
┌─────────────────────────────────────┐
│  ◆ AARRR Metrics                    │
│  Marketing > Metrics                │
│  ✅ Verified by Anh Hải             │
│                                     │
│  Status: Production v1.3            │
│  [Edit] [History] [Duplicate]       │
│                                     │
│  ─── SUMMARY ───                    │
│                                     │
│  AARRR là framework đo lường        │
│  growth metrics cho startup, gồm    │
│  5 stages: Acquisition, Activation, │
│  Retention, Referral, Revenue.      │
│                                     │
│  ─── DETAILED EXPLANATION ───       │
│                                     │
│  Framework AARRR (còn gọi Pirate    │
│  Metrics) được Dave McClure đề      │
│  xuất 2007. Đây là 5 stages quan    │
│  trọng nhất của customer journey:   │
│                                     │
│  1. **Acquisition**                 │
│     Người dùng tìm đến sản phẩm.    │
│     Metrics: Visit count, traffic   │
│     sources                         │
│                                     │
│  2. **Activation**                  │
│     User experience "wow moment".   │
│     Metrics: Sign-up rate,          │
│     onboarding completion           │
│                                     │
│  3. **Retention**                   │
│     User quay lại dùng tiếp.        │
│     Metrics: D1/D7/D30 retention    │
│                                     │
│  ... [continued]                    │
│                                     │
│  ─── EXAMPLES ───                   │
│                                     │
│  Vietnamese context:                │
│  - TikTok: Acquisition rất tốt      │
│    (FYP), Retention rất cao         │
│  - Grab: Activation có challenge    │
│    (cần download app, register)     │
│                                     │
│  ─── COMMON MISCONCEPTIONS ───      │
│                                     │
│  ❌ "AARRR là sequence cứng"        │
│  ✅ "AARRR là 5 stages parallel"    │
│                                     │
│  ❌ "Activation = Sign-up"          │
│  ✅ "Activation = Aha moment"       │
│                                     │
│  ─── RELATED CARDS ───              │
│                                     │
│  • Marketing Funnel                 │
│  • CAC vs LTV                       │
│  • Cohort Analysis                  │
│  • Customer Journey                 │
│                                     │
│  ─── REFERENCES ───                 │
│                                     │
│  1. McClure, D. (2007). "Startup    │
│     Metrics for Pirates"             │
│  2. Y Combinator Startup School     │
│  3. Lean Analytics (Croll, 2013)    │
│                                     │
│  ─── METADATA ───                   │
│                                     │
│  Version: 1.3                       │
│  Created: 2026-02-10                │
│  Updated: 2 weeks ago               │
│  Curator: Anh Hải                   │
│  Verifier: Dr. Long (PhD MBA)       │
│                                     │
│  ─── USAGE ───                      │
│                                     │
│  Used in 3 scenarios:               │
│  • Marketing Day 2 (intro)          │
│  • Marketing Day 5 (deep dive)      │
│  • Business Adm Day 4               │
│                                     │
│  Referenced by 2 personas:          │
│  • Anh Tùng (Marketing Director)    │
│  • Chị Mai (Senior Marketer)        │
│                                     │
│  Total student exposures:           │
│  1,247 (this month)                 │
│                                     │
│  ─── ACTIONS ───                    │
│                                     │
│  [Edit content]                     │
│  [Submit for re-verification]       │
│  [Mark as outdated]                 │
│  [Archive]                          │
│                                     │
└─────────────────────────────────────┘
```

### Editor mode (when editing)

Replaces detail view với rich text editor:

```
┌─────────────────────────────────────┐
│  ✏️ Editing: AARRR Metrics          │
│                                     │
│  Title: [AARRR Metrics_____________]│
│  Domain: [Marketing > Metrics ▼]    │
│  Tags: [growth, metrics, startup]   │
│                                     │
│  ─── SUMMARY (max 280 char) ───     │
│  ┌─────────────────────────────┐    │
│  │ AARRR là framework đo       │    │
│  │ lường growth metrics...     │    │
│  └─────────────────────────────┘    │
│  240 / 280 chars                    │
│                                     │
│  ─── DETAILED EXPLANATION ───       │
│  ┌─────────────────────────────┐    │
│  │ [Rich text editor]          │    │
│  │                             │    │
│  │ B  I  U  H1 H2  • 1.        │    │
│  │ Link  Image  Code            │    │
│  │                             │    │
│  │ Framework AARRR (còn gọi    │    │
│  │ Pirate Metrics)...          │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  ─── EXAMPLES (Vietnam context) ─── │
│  [+ Add example]                    │
│                                     │
│  ─── MISCONCEPTIONS ───             │
│  [+ Add misconception]              │
│                                     │
│  ─── RELATED CARDS ───              │
│  Search and link related cards...   │
│  [+ Add link]                       │
│                                     │
│  ─── REFERENCES ───                 │
│  [+ Add reference]                  │
│                                     │
│  [Save draft]  [Submit for review]  │
│  [Cancel]                           │
│                                     │
└─────────────────────────────────────┘
```

---

## 4. Interactions & Behaviors

### Tree navigation

- Click domain → expand/collapse
- Click card → load in detail panel
- Drag-drop để reorganize (curator only)
- Right-click context menu

### Search

- Search across: title, content, tags
- Real-time results
- Filter by domain after search

### Card linking

**Link to scenario:**
1. Click "Link to scenario"
2. Modal: Select scenario + day + trigger
3. Confirm → card available trong runtime

**Link to persona:**
1. From Persona Studio
2. Browse Vault
3. Add to "Allowed sources"

### Verification workflow

**For pending cards:**
1. Curator opens card
2. Reviews content
3. Options:
   - ✅ Approve & verify
   - 📝 Request changes (with feedback)
   - 🗑 Reject
4. Email notification to author

---

## 5. States

### State 1: Empty domain (no cards yet)

```
📂 Marketing > Channels

This category is empty.

Add the first card to help personas reference it.

[+ Add first card]
```

### State 2: Loading

Skeleton tree + cards.

### State 3: Editing

Editor takes detail panel space, cards list dim.

### State 4: Pending review (for curator)

```
⏳ Cards Pending Review (5)

You have 5 cards awaiting verification.

[Review queue]
```

### State 5: Outdated alert

```
⚠ Outdated Cards Detected (3)

These cards haven't been reviewed in over 1 year:
• Tax Law (Legal) - 14 months
• Pricing Strategies (Marketing) - 13 months  
• Drug Dosages (Medical) - 12 months

[Review queue]
```

---

## 6. Data Flow

### Inputs

```yaml
from_card_database:
  - all_cards
  - card_content
  - verification_status
  - usage_data

from_scenarios:
  - cards_referenced
  - student_exposure_counts

from_personas:
  - cards_in_allowed_sources
```

### Outputs

```yaml
events:
  - card.created
  - card.updated
  - card.verified
  - card.deprecated
  - card.linked_to_scenario

analytics:
  - card_creation_rate
  - verification_speed
  - usage_per_card
  - gap_detection
```

### API Endpoints

```yaml
GET    /api/vault/cards                 # List with filters
GET    /api/vault/card/:id              # Detail
POST   /api/vault/card                  # Create
PATCH  /api/vault/card/:id              # Update
POST   /api/vault/card/:id/verify       # Verify
POST   /api/vault/card/:id/deprecate    # Deprecate
GET    /api/vault/card/:id/usage        # Where used
GET    /api/vault/domains               # Tree structure
GET    /api/vault/pending               # Pending review queue
GET    /api/vault/outdated              # Outdated cards
POST   /api/vault/search                # Full-text search
```

---

## 7. Permission Checks

| Action | Curator | Designer | Persona Writer |
|:--|:-:|:-:|:-:|
| Browse vault | ✅ | ✅ | ✅ |
| View card | ✅ | ✅ | ✅ |
| Create card | ✅ | 🔐 (request) | 🔐 (request) |
| Edit card | ✅ | ❌ | ❌ |
| Verify card | ✅ | ❌ | ❌ |
| Deprecate card | ✅ | ❌ | ❌ |
| Link to scenario | 🔐 | ✅ | ❌ |
| Link to persona | 🔐 | ❌ | ✅ |

---

## 8. Edge Cases

### Case 1: Card referenced but deprecated

**Scenario:** Card "Old Marketing Mix 4Ps" deprecated, but 2 scenarios still use it

**Resolution:**
- Show warning when deprecating
- List affected scenarios
- Suggest replacement card
- Auto-notify scenario owners

### Case 2: Conflicting card content

**Scenario:** Two cards có conflicting info (e.g., different definitions of CAC)

**Resolution:**
- Curator flags conflict
- Discussion thread
- Resolve by merging or clarifying

### Case 3: Card translation needed (V2)

**Scenario:** English-only card, need Vietnamese version

**Resolution:**
- Translation request
- Version per language
- Synchronized updates

---

## 9-12. Standard sections

(Responsive: Desktop primary, mobile read-only)
(Performance: < 1s load, instant search)
(Accessibility: Tree keyboard nav, screen reader)
(Visual: `--paper-100` cards, status colors, tree indentation)

---

## 13. Multi-domain Application Examples

### Vault content distribution

```yaml
software_engineering:
  total: 24 cards
  categories:
    - Algorithms (8)
    - Data Structures (6)
    - System Design (4)
    - Programming Concepts (6)

medical:
  total: 15 cards
  categories:
    - Anatomy (5)
    - Clinical Reasoning (4)
    - Pharmacology (3)
    - Procedures (3)

marketing:
  total: 12 cards
  categories:
    - Metrics (4)
    - Strategy (4)
    - Channels (4)

generic:
  total: 8 cards
  categories:
    - Critical Thinking (3)
    - Communication (3)
    - Problem Solving (2)

total: 59 cards across domains
```

### Card example structures

**SE: Big O Notation**
- Heavy code examples
- Mathematical notation
- Time complexity tables

**Medical: Anatomy basics**
- Diagram-heavy
- 3D model references
- Clinical correlations

**Marketing: AARRR**
- Real Vietnam case studies
- Metrics formulas
- Industry benchmarks

**Same vault, dramatically different content depending on domain.**

---

## 14. Tóm tắt

| Khía cạnh | Chi tiết |
|:--|:--|
| **Primary role** | Curator |
| **Complexity** | ⭐⭐⭐ |
| **Estimated build time** | 5-7 weeks |
| **Total V1 cards** | 24 (SE only) |
| **Expected V2 cards** | 59+ (cross-domain) |
| **Key technologies** | Rich text editor, search, version control |
| **Multi-domain** | Yes - tree structure organizes by domain |
| **Biggest challenge** | Maintaining quality across many cards |
| **Biggest value** | Foundation for AI accuracy |
