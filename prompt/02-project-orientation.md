# Prompt #2 — Project Orientation

> **Dùng SAU khi setup xong**, trước khi giao task đầu tiên
> **Mục đích**: Confirm Claude Code thực sự hiểu architectural model đầy đủ

---

## Khi nào dùng

- Sau khi Prompt #1 (setup) đã merge
- Trước khi bắt đầu Week 1 Day 3 (Mr. Alpha persona)
- Hoặc bất cứ lúc nào bạn cần Claude Code "re-orient" sau gap dài

---

## Paste prompt này:

```
Before we start building features, I need you to demonstrate deep 
understanding of LUMINA's architecture. This is a quality gate — 
shallow understanding leads to bad code later.

## Task: Architecture deep dive

Read these documents thoroughly:

1. /docs/architecture/05-logical-architecture.md (FULL — every section)
2. /docs/architecture/06-data-architecture.md (FULL)
3. /docs/architecture/07-ai-architecture.md (FULL — this is the most 
   important section for V0)
4. /docs/architecture/10-cross-cutting-concerns.md (FULL)
5. /docs/architecture/12-adrs.md (every ADR)

Then answer these questions in your own words. Do NOT paste from the 
documents — explain in your own understanding:

### Question 1: Layered Architecture (TAD §5)
- What are the 4 layers?
- Give an example of WRONG cross-layer dependency
- If a React component needs to query the database, what's the correct 
  flow through layers?

### Question 2: Multi-Agent Orchestration (TAD §7.2)
- When a student sends a message, what are the 4 steps from message 
  to persona response?
- Why is orchestration logic deterministic instead of AI-driven? 
  (TAD ADR-007)
- What is the Priority Matrix and where does it live?

### Question 3: Persona System (TAD §7.3)
- What are the 5 layers of a persona specification?
- Why is each layer separated? (vs one big prompt)
- Which layer changes most frequently? Which changes rarely?

### Question 4: Data Architecture (TAD §6)
- What are the 4 categories of data?
- What is "versioning and immutability on publish"? (ADR-010)
- Why must every user-data query filter by tenant_id even in V0?

### Question 5: AI Provider Gateway (TAD §7.6)
- Why must this abstraction exist from V0 even though only Anthropic 
  is integrated? (ADR-006)
- What goes through the Gateway vs what doesn't?
- If someone writes `import Anthropic from "@anthropic-ai/sdk"` in a 
  feature file, what should you do?

### Question 6: V0 Scope (MVP V0)
- Is multi-user (real auth) in V0 scope or stubbed?
- Is the Parent Dashboard in V0 scope or deferred?
- Is multi-tenant B2B in V0 scope or stubbed?
- Is Mr. Alpha persona authoring a Claude Code task or a HUMAN task?

### Question 7: Definition of Done
- What are 3 things you must run before claiming a feature is done?
- What are the "Red Flags — DO NOT MERGE" patterns?
- When should you stop and ask the human?

## Format your answers

Write each answer in 2-4 sentences. Be precise, not verbose. If you're 
uncertain, say "I'm not sure about X" instead of making it up.

## After answers

I will review your answers. If understanding is solid, we proceed to 
Week 1 work. If there are gaps, you re-read the relevant documents.

Do not start any other work until I confirm your understanding.
```

---

## Sau khi Claude Code trả lời

**Bạn review từng câu trả lời**. Đây là grading rubric:

| Question | What "Pass" Looks Like |
|:---------|:-----------------------|
| Q1 Layers | Names all 4 layers correctly; example of wrong dep is concrete (e.g. "UI calling DB directly"); correct flow goes through Application + Domain |
| Q2 Orchestration | Mentions Event Detector → Priority Matrix → Conflict Resolver → Scheduler; explains determinism = predictability + cost + latency; Priority Matrix lives per scenario-day |
| Q3 Persona | Names Identity, Voice, Behavior, Knowledge, Constraints; correct reasoning for separation (authoring, testing, evolution); Behavior changes most, Identity changes least |
| Q4 Data | Identity/Content/Session/Operational; immutability = sessions reference stable versions; tenant_id needed to avoid retroactive rewrites in V1 |
| Q5 Gateway | Insurance against vendor lock-in; provider routing/cost/retry through Gateway; direct SDK import should be flagged as violation |
| Q6 Scope | Real auth (real), Parent Dashboard (deferred V1), Multi-tenant (stubbed), Persona authoring (HUMAN-LED) |
| Q7 DoD | typecheck/lint/test; mentions Red Flags like disabled tests, `any` type, direct DB in UI; ask human when scope unclear or architectural change |

**Pass criteria**: 6/7 correct → proceed.

Nếu fail 2+ → reply: `Re-read [SECTION] more carefully and re-answer Q[N].`

---

## Sau khi pass

Reply Claude Code:

```
Understanding confirmed. We are ready to start Week 1.

Current week: 1
Current day: [N]
Next up: [Task from MVP V0 Week-by-Week, e.g., "Day 2 — Database & AI Foundation"]

Note that Days 3-5 (Mr. Alpha persona iteration) are HUMAN-LED work, 
not Claude Code work. You will assist by formatting and validating 
prompts, but I lead the iteration.

Proceeding to next task now. [Paste task using Template #1 from 
task-templates.md]
```

---

## Tại sao prompt này quan trọng

Nhiều người skip step này và phát hiện sau 1 tuần rằng Claude Code:
- Tạo direct DB calls trong UI components
- Quên tenant scoping
- Bypass AI Gateway để gọi Anthropic SDK
- Tự ý implement features không có trong MVP V0 scope

Mỗi vấn đề tốn 2-4 giờ refactor sau này. Prompt này tốn 15 phút và prevent 80% các vấn đề đó.
