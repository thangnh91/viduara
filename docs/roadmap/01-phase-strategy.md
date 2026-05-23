# 1. Phase Strategy

This document explains the rationale behind LUMINA's phasing strategy — why these phases, why this order, what drives transitions between phases.

## 1.1 Phasing Principles

### 1.1.1 Build Vertical Slices, Not Horizontal Layers

A common anti-pattern is building "the platform" first (auth system, admin tools, content management) before any user-facing experience exists. This delays user feedback and risks building wrong foundations.

LUMINA inverts this. Each phase delivers a **vertical slice** — one complete user journey, end-to-end, with all necessary supporting infrastructure. Subsequent phases broaden the slice (more domains, more roles, more scale) rather than building horizontal foundations.

### 1.1.2 Production Quality from V0

V0 is not a throwaway demo. It uses the same architectural patterns, technology stack, and quality standards as V3. The difference between V0 and V3 is **scope**, not **quality**.

This is the single most important phasing decision in this document. Most "demo MVPs" become technical debt because they were built to throwaway standards. LUMINA avoids this by treating V0 as the first commercial release with limited features.

### 1.1.3 Architecture Stays Constant; Implementation Grows

The TAD describes the architecture — components, layers, contracts. Each phase implements more of those components. Components added in later phases plug into pre-existing slots, not into a redesigned system.

This is why the TAD is phase-independent. If V1 requires architectural changes, the TAD itself is wrong, not just the V1 plan.

### 1.1.4 Stubs Beat Skips

When a TAD component cannot be built in a phase, the phase **stubs** it rather than **skips** it. A stub is a minimal implementation behind the same interface as the real component. Examples:

- **Real:** Multi-provider AI gateway with Anthropic + OpenAI failover.
- **Stub (V0):** Single-provider gateway returning Anthropic responses, but exposing the multi-provider interface so call sites don't need to change in V1.

Stubs preserve the option to extend without rewriting. Skips force rework.

### 1.1.5 Defer Optionality, Not Architecture

Things that can wait without affecting architectural shape are deferred. Things that affect architectural shape are addressed early, even if their full capability is deferred.

Example: Multi-tenancy affects every database query (tenant-scoped filtering). It must be in the architecture from V0, even though V0 has only the consumer tenant. Adding tenancy retroactively means rewriting every query.

Counter-example: Mobile native apps don't affect backend architecture significantly. They can be deferred to V2 without touching V0/V1 architecture.

## 1.2 Decision Framework: What Goes in Which Phase

For each TAD component, the phasing decision uses these questions in order:

```
1. Is it needed for the user journey at this phase?
   ├─ Yes → must be built or stubbed
   └─ No  → defer to later phase

2. Is it foundational (affects how everything else works)?
   ├─ Yes → must be in architecture from V0, even if stubbed
   └─ No  → can be added in any phase without rework

3. Does the team have capacity?
   ├─ Yes → build it
   └─ No  → stub it; revisit when capacity grows

4. Does deferring this create competitive risk?
   ├─ Yes → reconsider stub vs build
   └─ No  → defer is safe
```

## 1.3 Phase Transitions

A phase transition is a milestone, not a date. Transitions happen when:

- All in-phase scope is implemented and stable.
- Quality gates are passed (tests, monitoring, security review).
- Business signals validate the phase's strategic bet.
- Capacity exists to take on next-phase scope.

Calendar dates in this document are **planning targets**, not commitments. A phase that drags due to scope creep or quality issues should slip its transition rather than ship broken.

## 1.4 Quality Gates per Phase

Each phase must pass these gates before transitioning:

### 1.4.1 V0 → V1 Gate

- [ ] All V0 scope (defined in MVP V0 Scope Definition document) implemented
- [ ] System uptime > 99% over 14-day beta period
- [ ] Beta user feedback shows core experience is working (qualitative)
- [ ] AI quality monitoring shows < 5% hallucination rate (lenient V0 target)
- [ ] No critical security issues open
- [ ] Cost per scenario tracked and reasonable (< $5 AI cost)
- [ ] Architecture review confirms no V1 work requires V0 rewrite

### 1.4.2 V1 → V2 Gate

- [ ] V1 commercial launch achieved with paying users
- [ ] System uptime > 99.5% sustained for 30 days
- [ ] Unit economics validated (gross margin acceptable at scale)
- [ ] Hero domain scenario quality validated by domain experts (NPS > 40)
- [ ] AI quality < 3% hallucination rate
- [ ] Team capacity to support 3 domains (at least 5 engineers + 3 content creators)
- [ ] No scaling issues identified at projected V2 user volume

### 1.4.3 V2 → V3 Gate

- [ ] 3 domains live with healthy usage in each
- [ ] B2B school pilots converted to paid contracts
- [ ] System uptime > 99.5% sustained
- [ ] AI quality < 2% hallucination rate (mature target)
- [ ] Team capacity for community contribution platform (15+ engineers)
- [ ] Regulatory compliance audit passed (SOC 2 Type I minimum)
- [ ] Multi-region deployment justified by user distribution

## 1.5 What This Document Doesn't Define

This Roadmap intentionally avoids:

- **Specific calendar dates beyond Phase 1.** Targets are stated as duration; calendar dates depend on team formation and funding timing.
- **Hiring plans.** Team size targets are stated; specific role hiring sequence is operational, not architectural.
- **Marketing or sales strategy.** Phase goals reference business signals (paying users, B2B contracts) but not the channels or campaigns achieving them.
- **Detailed cost breakdowns.** Cost is mentioned where it affects architecture; full unit economics is a separate financial document.

These are addressed in operational planning documents, not in this architectural roadmap.

---

[← Back to README](./README.md) · [Next: V0 MVP →](./02-v0-mvp.md)
