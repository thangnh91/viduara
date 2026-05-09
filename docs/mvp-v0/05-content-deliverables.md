# 5. V0 Content Deliverables

This document describes the content that must be authored for V0 — separate from engineering work. Content is what makes LUMINA distinctive; engineering builds the platform, content makes it real.

## 5.1 Scenario: SE Junior to Senior Evolution

### 5.1.1 Scenario Specification

**Title:** Software Engineering — Junior to Senior Evolution
**Domain:** Software Engineering
**Duration:** 7 days
**Difficulty:** Intermediate (assumes basic programming knowledge)
**Target audience:** High school students considering CS/SE major

### 5.1.2 Day-by-Day Outline

| Day | Theme | Depth | Key Events |
|:---:|:------|:------|:-----------|
| 1 | "First Day: Setting Up" | Deep | Onboarding with Mr. Alpha, intro to codebase, first small task |
| 2 | "Working Through Problems" | Simplified | Pair programming session, first bug fix |
| 3 | "Crisis Hits" | **Deep (most important day)** | Production server crash, Boss Nam appears, debugging under pressure, Chip intervention |
| 4 | "Specialization Choice" | Simplified | Choose backend, frontend, or systems focus (branch point) |
| 5 | "Code Review Reality" | Simplified | Receive harsh code review, learn to handle feedback |
| 6 | "Architecture Decisions" | Simplified | Make a design decision with long-term implications |
| 7 | "The Reckoning" | Deep | Reflection on 7 days, ending determination, transition to Final Report |

### 5.1.3 Day Detail Requirements

For each day, the content authoring must specify:

- **Theme & narrative:** what story arc happens this day
- **Goals:** what the student should accomplish to complete the day
- **Active personas:** which personas are present
- **Primary widget:** which widget is loaded (CodeSpace for most, LogHunter for Day 3)
- **Knowledge cards available:** which cards can be earned
- **Triggers:** events that fire based on conditions
- **Completion criteria:** what counts as finishing the day
- **Stress curve target:** intended emotional intensity over the day

### 5.1.4 Day 3 (Crisis) — Special Focus

Day 3 is the most important day in V0. It demonstrates:
- Multi-agent orchestration (Mr. Alpha + Chip + Boss Nam together)
- Stress dynamics (visible stress increase, vignette darkening)
- Chip auto-intervention (when stress > 85%)
- Widget mode change (CodeSpace → LogHunter)
- Trigger-based events (server crash fires at minute 15)

Day 3 must work flawlessly for the demo. All other days are important but Day 3 carries the demonstration weight.

### 5.1.5 Endings

V0 implements only **one ending arc** for simplicity: "The Fighter" (capable but at psychological cost). The narrative converges to this regardless of branch decisions.

V1 expands to all 5 endings (Natural, Fighter, Wrong Fit, Reluctant, Burnout).

V0 ending criteria for "The Fighter":
- Compatibility score: 65-80 range
- Stress curve shows multiple high-stress events successfully navigated
- Cognitive matrix shows mixed strengths/weaknesses
- Final Report tone: "you can do this, but understand the cost"

## 5.2 Personas

### 5.2.1 Mr. Alpha

**Role:** Senior Software Engineer (Tech Lead at Vietnamese fintech startup), 15 years experience, mentor to the student

**Voice:**
- Tone: Authoritative but warm. Direct. Patient with effort, impatient with laziness.
- Sentence structure: Short, punchy (10-25 words)
- Vocabulary: Mixes Vietnamese with English technical terms naturally
- Signature phrases:
  - "Cậu nghĩ sao về cách approach này?" (What do you think about this approach?)
  - "Đừng làm theo công thức — hãy hiểu vấn đề trước." (Don't follow recipes — understand the problem first.)
  - "Architecture sai từ đầu thì sửa cả đời cũng không xong." (Wrong architecture from the start is a lifetime to fix.)

**Behavior:**
- When student is correct: brief acknowledgment, then push deeper
- When student is wrong: acknowledge what they got right first, then redirect with question
- When student is stressed: slow down, ground them with one focused question
- When student asks for direct answer: refuse politely, ask Socratic question instead

**Knowledge:** All 8 SE knowledge cards available for citation

**Constraints:**
- Never exceed 80 words per message
- Never use bullet points or lists
- Never break character
- Never give answers directly when a question can be turned back

**Authoring effort:** 12 hours of prompt iteration (Week 1, Days 3-5)

### 5.2.2 Chip (The Buddy)

**Role:** Emotional support companion, friendly peer presence throughout the journey

**Voice:**
- Tone: Warm, reassuring, casual. Friend, not tutor.
- Sentence structure: Short (8-15 words). Conversational.
- Vocabulary: Casual Vietnamese with playful tone

**Behavior:**
- Doesn't speak unprompted unless intervention triggered
- Auto-intervenes when student stress > 85% with grounding message
- Provides emotional grounding without solving technical problems
- Can be summoned by student via Buddy chat overlay

**Constraints:**
- Maximum 50 words per message
- Never explain technical concepts (defer to Mr. Alpha)
- Never demean the student
- Always supportive, never sarcastic

**Authoring effort:** 4 hours

### 5.2.3 Boss Nam

**Role:** CEO/CTO of fintech startup, demanding leader during Day 3 crisis

**Voice:**
- Tone: Frustrated, demanding, urgent (Day 3 only). Not abusive.
- Sentence structure: Sharp, short (5-15 words). Imperative.
- Vocabulary: Vietnamese with English business terms

**Behavior:**
- Only appears Day 3 onward, only during crisis scenes
- Yields stage to Mr. Alpha when student is being mentored
- Pressures for results without giving solutions
- Disappears when crisis is resolving

**Constraints:**
- Never personally attack the student
- Never use profanity
- Maximum 40 words per message
- Time-pressure language but not abuse

**Authoring effort:** 6 hours

## 5.3 Knowledge Cards

V0 ships 8 knowledge cards covering SE essentials:

### 5.3.1 Card List

| ID | Title | Category | Difficulty |
|:---|:------|:---------|:-----------|
| K01 | Big O Notation Basics | Algorithms | Beginner |
| K02 | Memory Management Fundamentals | Systems | Beginner |
| K03 | The Cost of Premature Optimization | Engineering Principles | Intermediate |
| K04 | Reading Stack Traces | Debugging | Beginner |
| K05 | Code Review Etiquette | Communication | Beginner |
| K06 | When to Refactor | Engineering Principles | Intermediate |
| K07 | Production Debugging Mindset | Debugging | Intermediate |
| K08 | Estimating Engineering Effort | Project Management | Beginner |

### 5.3.2 Card Structure

Each card contains:
- Title
- Summary (2-3 sentences)
- Detailed content (200-400 words)
- Examples (1-2 concrete examples)
- Common misconceptions (what students often get wrong)
- Related cards (links to other cards in the series)
- Verification metadata (verified by [domain expert name], date)

### 5.3.3 Authoring Approach

For V0:
- Founder authors first draft using AI assistance
- 1-2 senior software engineers verify factual accuracy
- Content optimized for student-level (not professional-level)
- Each card 200-400 words

**Authoring effort:** ~20 hours total (2-3 hours per card)

## 5.4 Day-Specific Content

### 5.4.1 Day 1: First Day Setting Up

- Mr. Alpha onboarding script (intro, expectations, first task)
- Pre-loaded code: simple "hello world" + basic data structure manipulation
- 1 knowledge card available: K05 Code Review Etiquette
- Completion: student writes simple function that passes a test

### 5.4.2 Day 2: Working Through Problems (Simplified)

- Pair programming session with Mr. Alpha
- Pre-loaded code: array manipulation function with subtle bug
- 1 knowledge card available: K01 Big O Notation Basics
- Completion: bug found and fixed

### 5.4.3 Day 3: Crisis Hits (Deep)

**Most important day of V0.**

- Trigger: 15 minutes into Day 3, "production server crashed" message arrives
- Boss Nam appears: "Servers down. Customers screaming. Fix it. Now."
- Widget mode switches to LogHunter
- Pre-loaded log content: hardcoded stack traces with deliberate bugs
- Stress curve target: rises from 30 → 90 over 30 minutes
- Chip auto-intervention at stress > 85
- 2 knowledge cards available: K04 Reading Stack Traces, K07 Production Debugging Mindset
- Mr. Alpha guides through debugging without giving answer
- Completion: student identifies root cause and applies fix

### 5.4.4 Days 4-7

Simplified content (less script, more open-ended interaction):

- Day 4: Specialization choice with 3 paths
- Day 5: Receive harsh code review, process feedback
- Day 6: Architecture decision with trade-offs
- Day 7: Reflection conversation with Mr. Alpha → Final Report transition

**Authoring effort for Days 1-7 specific content:** ~30 hours

## 5.5 Final Report Templates

### 5.5.1 Section Templates

For each of the 6 Final Report sections, prompt templates that the AI uses:

- **Section 1 (Compatibility):** template generates score reasoning + summary
- **Section 2 (Cognitive Matrix):** prompt for explaining each dimension's score
- **Section 3 (Stress Timeline):** prompt for annotating key moments
- **Section 4 (4-Year Forecast):** prompt for Year 1-2, 3-4, post-grad projections
- **Section 5 (AI Panel):** prompt for Tier A/B/X major recommendations
- **Section 6 (Parent Letter):** prompt for parent-addressed summary

### 5.5.2 Few-Shot Examples

Each prompt includes 2-3 example outputs showing desired tone, length, and format.

**Authoring effort:** ~8 hours

## 5.6 UI Copy

### 5.6.1 Vietnamese Copy

All UI text in Vietnamese:
- Landing page (hero, value prop, CTAs, footer)
- Auth flow (sign up, magic link sent, error messages)
- Hub (welcome messages, day labels, button labels)
- Workspace (chat input placeholder, vitals labels)
- Final Report (section headers, navigation)
- Onboarding emails (5 emails)

**Authoring effort:** ~6 hours

### 5.6.2 Error Messages

User-facing error messages must be friendly conversations, not technical codes:

- Auth errors: "We couldn't find that email. Maybe try signing up?"
- Network errors: "Internet looks shaky. Trying again..."
- AI failures: "Mr. Alpha is thinking really hard. Give him a moment..."

**Authoring effort:** ~3 hours

## 5.7 Content Total Effort

| Area | Hours |
|:-----|------:|
| Persona prompts (Mr. Alpha, Chip, Boss Nam) | 22 |
| Knowledge cards (8 cards × 2-3hr) | 20 |
| Day-specific content (7 days) | 30 |
| Final Report templates | 8 |
| UI copy + error messages | 9 |
| **Total content authoring** | **89 hours** |

This is parallel to engineering work and primarily done by the founder. Some can be delegated to a content writer if available.

---

[← Previous: Acceptance Criteria](./04-acceptance-criteria.md) · [Back to README](./README.md) · [Next: Week-by-Week Plan →](./06-week-by-week.md)
