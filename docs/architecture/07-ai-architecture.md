# 7. AI Architecture

AI is LUMINA's distinctive capability and largest technical risk. This section is the most detailed in the TAD because AI architecture decisions have the highest impact on product quality, cost, and operational complexity.

## 7.1 AI Architecture Principles

- **Provider abstraction:** never depend on a single AI provider. Even when using one in production, the architecture must support fast switching.
- **Determinism where possible:** orchestration logic, trigger evaluation, priority resolution are deterministic code, not AI. Only natural language generation uses AI.
- **Knowledge grounding:** personas reference verified knowledge cards via RAG to reduce hallucination on factual content.
- **Quality measurement:** every persona response is sampled for evaluation; quality regressions detected within 24 hours.
- **Cost transparency:** every AI call attributed to user, session, persona, scenario for fine-grained cost analysis.
- **Streaming first:** responses stream to users as they generate; never block on complete response.

## 7.2 Multi-Agent Orchestration Model

LUMINA scenarios feature multiple AI personas active simultaneously. A typical Day 3 crisis scene has Mr. Alpha (mentor), Boss Nam (antagonist), and Chip (buddy) all potentially responding to a single student message. The orchestrator decides which respond, when, and with what tone — without using AI for the decision itself.

### 7.2.1 Orchestration Components

```
           Student Message
                  │
                  ▼
        ┌─────────────────────┐
        │  Event Detector     │   ← Classifies message into events
        │  (deterministic)    │     ('question', 'wrong_decision',
        └──────────┬──────────┘      'stress_high', 'unethical_request', ...)
                   │
                   ▼
        ┌─────────────────────┐
        │  Priority Matrix    │   ← Per scenario-day config:
        │  Resolution         │     {persona × event} → priority + tone + delay
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  Conflict Resolver  │   ← Caps simultaneous responders,
        │                     │     enforces narrative coherence
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │  Response           │   ← Schedules persona responses
        │  Scheduler          │     with calculated delays
        └──────────┬──────────┘
                   │
        ┌──────────┴──────────┬───────────────┐
        ▼                     ▼               ▼
  ┌──────────┐         ┌──────────┐    ┌──────────┐
  │ Mr. Alpha│         │ Boss Nam │    │   Chip   │
  │ Persona  │         │ Persona  │    │ Persona  │
  │ Invoker  │         │ Invoker  │    │ Invoker  │
  └─────┬────┘         └─────┬────┘    └─────┬────┘
        │                    │               │
        └────────────────────┴───────────────┘
                             │
                             ▼
                ┌────────────────────────┐
                │  AI Provider Gateway   │
                │  (multi-provider abs)  │
                └────────────────────────┘
                             │
                             ▼
                  Streaming responses to user
```

*Figure 7.1 Multi-agent orchestration flow*

### 7.2.2 Event Detection

The Event Detector analyzes student messages and session state to produce a list of events. Detection is rule-based (regex patterns, intent classification, semantic similarity to known patterns), not AI-based, to ensure determinism and speed.

Event categories include:

- **Question events:** technical question, clarification request, off-topic question.
- **Decision events:** first attempt, retry, persistent wrong, gave up.
- **Emotional events:** stress detected, frustration expressed, breakthrough moment, overwhelmed signal.
- **Safety events:** self-harm signal, abuse mention, identity disclosure attempt.
- **Narrative events:** branch decision, key story moment, ending trajectory shift.

### 7.2.3 Priority Matrix

Each scenario day declares a priority matrix: a 2D table of `{persona × event} → response specification`. The response specification includes:

- **Priority** (0.0–1.0): probability and order of response. Higher fires first.
- **Tone override:** optional override of persona default tone for this event (e.g., Mr. Alpha defaults to "warm authoritative" but switches to "frustrated" on persistent wrong decisions).
- **Delay (milliseconds):** simulates natural conversation timing. The buddy might wait 4 seconds after the antagonist speaks.
- **Conditions:** optional preconditions (e.g., only fire if student stress > 70%).

> **ℹ️ Why Deterministic:** Using AI to decide which AI responds creates compounding hallucination risk and unpredictable behavior. The orchestrator is glass-box: a designer can read the priority matrix and predict exactly what will happen. This is critical for content quality assurance.

### 7.2.4 Conflict Resolution

After priority resolution, the conflict resolver enforces narrative rules:

- Maximum 2 personas respond per student message (avoids overwhelming).
- Same persona cannot speak twice in a row without student interaction (preserves conversational rhythm).
- Story Director events override all other personas (key narrative beats).
- Safety responses preempt scenario responses (always fire if detected).

## 7.3 Persona Specification Model

Personas are specified through a 5-layer model. Each layer is independently authored, versioned, and tested. The composite specification is rendered into a system prompt at runtime, with scenario context interpolated.

### 7.3.1 Layer 1: Identity

Defines who the persona is. Role, expertise, biographical details, current situation. This layer rarely changes across persona iterations; voice and behavior change far more often.

- **Role:** e.g., "Senior Software Engineer with 15 years of industry experience."
- **Current context:** e.g., "Currently Tech Lead at a Vietnamese fintech startup."
- **Relationship to student:** e.g., "Mentoring this student through their 7-day immersion."

### 7.3.2 Layer 2: Voice

Defines how the persona speaks. Tone, vocabulary, sentence structure, signature phrases.

- **Tone descriptors:** e.g., "Authoritative but warm. Direct. Patient with effort, impatient with laziness."
- **Vocabulary register:** e.g., "Mixes Vietnamese and English technical terms naturally."
- **Sentence structure:** e.g., "Short, punchy. 10–25 words per message."
- **Signature phrases:** 3–5 recurring phrases that establish identity.

### 7.3.3 Layer 3: Behavior

Defines how the persona acts in different situations. Behavior rules are conditional: "when X, do Y."

- **Response to correctness:** how to react when student is right vs. wrong.
- **Response to stress:** how to react when student is overwhelmed.
- **Teaching style:** Socratic vs. didactic, hint-driven vs. direct answer.
- **Boundary management:** how to handle off-topic questions, requests for direct answers, attempts to break character.

### 7.3.4 Layer 4: Knowledge

Defines what the persona knows and how to access it. This layer connects personas to the Knowledge Management subsystem via RAG.

- **Knowledge card scope:** which knowledge cards this persona may reference.
- **Citation requirements:** when to cite vs. when to integrate without citation.
- **Knowledge limits:** explicit areas the persona admits ignorance in (e.g., Mr. Alpha won't pretend to know medical concepts).
- **Retrieval strategy:** vector similarity, keyword match, or hybrid for finding relevant knowledge.

### 7.3.5 Layer 5: Constraints

Defines hard limits on persona behavior. Constraints are absolute — no scenario context can override them.

- Maximum response length (e.g., "Never exceed 80 words.").
- Forbidden behaviors (e.g., "Never break character to acknowledge being an AI.").
- Forbidden topics (e.g., "Never discuss personal medical advice.").
- Safety obligations (e.g., "If student expresses self-harm intent, respond with crisis resources.").
- Tonal limits (e.g., "Never demean the student, even when frustrated.").

## 7.4 Knowledge Grounding (RAG)

Personas ground their responses in verified knowledge through Retrieval-Augmented Generation. When a persona is invoked, relevant knowledge cards are retrieved and injected into the prompt context. This reduces hallucination on factual content and ensures consistency across conversations.

### 7.4.1 Retrieval Strategy

1. Generate query embedding from recent conversation context (last 3–5 messages).
2. Vector similarity search against knowledge card embeddings, scoped to cards available to this persona.
3. Re-rank results using keyword match boost for technical terms detected in the message.
4. Inject top 3–5 cards into the persona system prompt as a knowledge context section.
5. Persona is instructed to cite cards when used (provides traceability for quality review).

### 7.4.2 Knowledge Card Quality

- Cards are atomic — one concept per card, never bundles.
- Cards are expert-verified — verification metadata stored with each card version.
- Cards include common misconceptions — what students often get wrong, paired with correct understanding.
- Cards are versioned — verifiers can update cards as fields evolve; old session contexts retain old versions.

## 7.5 Final Report Generation

The Final Report is the most demanding AI workload in the system: it produces structured, personalized, narrative content from a session's complete history. Quality is paramount because this is the user-visible deliverable.

### 7.5.1 Generation Pipeline

1. Aggregate session data: complete message history, all decisions, stress curve, knowledge earned, time spent per day.
2. Compute quantitative scores: cognitive matrix dimensions, compatibility score, stress timeline summary statistics. These are deterministic calculations, not AI.
3. Generate narrative content via AI: personalized observations, 4-year forecast, AI panel recommendations, parent letter. Uses the most capable available model.
4. Validate output structure: enforce schema (six sections, required fields, length limits).
5. Cache result: report is expensive to generate; subsequent views read from cache.

### 7.5.2 Quality Strategy

- Use structured output (JSON schema-enforced) to prevent format errors.
- Use higher-tier model (e.g., Claude Opus or equivalent) — quality matters more than cost on this single end-of-scenario call.
- Include explicit examples of good vs. bad reports in the prompt.
- Sample 5% of generated reports for human review; track quality drift.
- Allow regeneration if quality bug detected; preserve original for audit.

## 7.6 AI Provider Abstraction

The AI Provider Gateway is a critical component for managing AI provider dependency. It exposes a uniform interface to the domain layer while routing requests to specific provider implementations.

### 7.6.1 Capabilities

- **Unified interface:** chat completion (streaming), structured output, embeddings — same interface across providers.
- **Provider routing:** route requests by model tier (cheap/fast vs expensive/quality), cost budget, regional preference, or fallback chain.
- **Retry and fallback:** on provider failure, automatically retry on alternative provider with capability mapping.
- **Rate limiting:** respect provider rate limits, queue or throttle excess requests.
- **Cost tracking:** attribute every call to user/session/persona/scenario for fine-grained reporting.
- **Prompt versioning:** track which prompt version produced which response for quality regression analysis.

### 7.6.2 Multi-Provider Strategy

- **Primary:** Anthropic Claude (selected for quality on long-context conversations and structured output reliability).
- **Secondary:** OpenAI GPT (fallback during Anthropic outages, alternative for cost optimization on lower-stakes calls).
- **Future:** Vietnamese-hosted LLMs (when available at acceptable quality, useful for data residency requirements).
- **Future:** Self-hosted open-weight models (for cost optimization at scale, if economic).

## 7.7 Quality Evaluation Pipeline

Continuous quality measurement is essential because AI behavior can drift silently — a model update or prompt change can degrade quality without explicit errors. The evaluation pipeline samples production interactions and scores them against quality dimensions.

### 7.7.1 Evaluation Dimensions

- **In-character consistency:** does the response match the persona specification (voice, behavior, constraints)?
- **Knowledge accuracy:** are factual claims correct? Does the response cite sources when expected?
- **Hallucination:** does the response invent facts not grounded in knowledge cards or established context?
- **Narrative coherence:** does the response advance the scenario meaningfully?
- **Safety:** does the response respect constraints (length, forbidden topics, safety obligations)?

### 7.7.2 Evaluation Methods

- **Automated rule checks:** constraint violations, length checks, forbidden patterns. Run on every response.
- **LLM-as-judge:** higher-tier model evaluates lower-tier responses. Run on sampled responses.
- **Human review:** expert evaluators review sampled responses, especially edge cases. Anchor for automated metrics calibration.
- **User signals:** implicit feedback (engagement, completion) and explicit feedback (Buddy chat reactions, support tickets).

## 7.8 Cost Control Architecture

AI inference is the dominant variable cost. The architecture must enforce spending limits at multiple levels and provide visibility for optimization.

### 7.8.1 Cost Control Mechanisms

- **Platform-wide caps:** hard cap on monthly AI spend across all tenants. Triggers throttling rather than hard stop to preserve service.
- **Per-tenant caps:** for B2B contracts with usage-based limits.
- **Per-user caps:** prevents runaway costs from edge-case usage. Generous defaults; tighter for free-tier users.
- **Per-session caps:** scenario-level budget. Exceeding triggers warning to user and persona behavior shift to brevity.
- **Per-call timeouts:** max tokens, max latency. Prevents pathological cases.

### 7.8.2 Cost Optimization Strategies

- **Model tier routing:** use cheaper models for low-stakes calls (e.g., short Chip responses), reserve expensive models for high-stakes (Final Report).
- **Prompt caching:** provider-specific prompt caching where available (e.g., Anthropic's caching for system prompts).
- **Context trimming:** send only recent relevant messages, not full session history, when possible.
- **Response length caps:** enforced by max_tokens parameter, also encouraged by persona constraints.
- **Batch operations:** cluster low-priority operations (analytics, evaluation) into batched API calls.

---

[← Previous: Data Architecture](./06-data-architecture.md) · [Back to README](./README.md) · [Next: Integration Architecture →](./08-integration-architecture.md)
