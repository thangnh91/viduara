# LUMINA — Technical Architecture Document

> **The Career Pre-Experience platform**
> Target architecture for the mature LUMINA system

---

## About This Document

This Technical Architecture Document (TAD) describes the target architecture for LUMINA at maturity. It defines architectural goals, system structure, component responsibilities, integration points, and quality attributes.

**This TAD is the architectural north star** — it is not phase-specific. Implementation phases (V0, V1, V2, V3) are described in a separate Roadmap & Implementation Phases document. Each phase represents a vertical slice of the architecture defined here, building it incrementally without changing its fundamental shape.

## Document Status

| Field | Value |
|:------|:------|
| Version | v1.0 |
| Status | Draft for review |
| Last Updated | 2026 |
| Owner | LUMINA Engineering |
| Review Cycle | Quarterly |

## How to Read This Document

The TAD is organized into 12 sections covering the full architecture surface. Each section is a separate Markdown file for easier navigation and version control.

**For a 30-minute overview**, read sections 1, 2, 5, and 12.

**For technical due diligence**, read all sections in order.

**For implementing a specific phase**, read this document for context, then consult the Roadmap and MVP Scope documents for phase-specific scope.

## Table of Contents

| # | Section | File | Focus |
|:--|:--------|:-----|:------|
| 1 | [Introduction](./01-introduction.md) | `01-introduction.md` | Purpose, audience, scope, glossary |
| 2 | [Architectural Goals](./02-architectural-goals.md) | `02-architectural-goals.md` | What the architecture must achieve |
| 3 | [Architectural Constraints](./03-architectural-constraints.md) | `03-architectural-constraints.md` | Business, legal, technical realities |
| 4 | [System Context](./04-system-context.md) | `04-system-context.md` | External actors and systems |
| 5 | [Logical Architecture](./05-logical-architecture.md) | `05-logical-architecture.md` | Layers, components, responsibilities |
| 6 | [Data Architecture](./06-data-architecture.md) | `06-data-architecture.md` | Entities, ownership, lifecycle |
| 7 | [AI Architecture](./07-ai-architecture.md) | `07-ai-architecture.md` | Multi-agent design, orchestration |
| 8 | [Integration Architecture](./08-integration-architecture.md) | `08-integration-architecture.md` | External system integrations |
| 9 | [Deployment Architecture](./09-deployment-architecture.md) | `09-deployment-architecture.md` | Hosting, scaling, disaster recovery |
| 10 | [Cross-Cutting Concerns](./10-cross-cutting-concerns.md) | `10-cross-cutting-concerns.md` | Auth, security, observability |
| 11 | [Quality Attributes](./11-quality-attributes.md) | `11-quality-attributes.md` | Performance, reliability, security targets |
| 12 | [Architecture Decision Records](./12-adrs.md) | `12-adrs.md` | Why we chose what we chose |

## Related Documents

- **Product Specifications** (`lumina-docs/`) — design source of truth
- **Roadmap & Implementation Phases** (separate) — V0, V1, V2, V3 scope and timing
- **MVP V0 Scope Definition** (separate) — what's built vs stubbed in first phase
- **Software Design Documents** (per component, written before implementation)

## Document Maintenance

This TAD changes when **architectural decisions** change, not when features are added or roadmap shifts.

**Triggers for update:**
- New layer or major component introduced
- Foundational technology choice changes
- Cross-cutting concern added or fundamentally redesigned
- Architectural quality target changes significantly

**NOT triggers for update:**
- Adding scenarios, personas, widgets, or knowledge cards (content)
- Adding new screens or UX flows (product)
- Changing implementation libraries within an existing component
- Performance optimizations that don't change component boundaries
