# 1. Introduction

## 1.1 Document Purpose

This Technical Architecture Document (TAD) describes the target architecture for LUMINA — a career pre-experience EdTech platform. The document defines architectural goals, system structure, component responsibilities, integration points, and quality attributes for the mature state of the system. It serves as the authoritative reference for technical decision-making throughout the product's evolution.

This TAD does **not** describe what is built in any specific release. The architecture defined here is the target end-state. Implementation phases (V0, V1, V2, V3) are described in a separate `Roadmap & Implementation Phases` document. Each phase represents a vertical slice of the architecture defined here, building it incrementally without changing its fundamental shape.

## 1.2 Audience

This document is written for:

- **Software architects and senior engineers** who design and review system components.
- **Engineering leads** who plan implementation phases and break down work into stories.
- **Technical due diligence reviewers** — investors, partners, acquirers — evaluating technical maturity.
- **Future team members** who need to understand the system without reading every line of code.

It is **not** written for: end users, marketing teams, or non-technical stakeholders. Those audiences should consult product specs, marketing materials, and executive summaries respectively.

## 1.3 Document Scope

This document covers the architecture of the complete LUMINA platform at maturity, including:

- Web applications for end users (learners, parents) and internal staff (designers, persona writers, engineers, curators, operators, super admins).
- Mobile applications for learners and parents.
- All backend services, data stores, and AI infrastructure.
- Integration with external systems (AI providers, payment processors, school systems, analytics, communications).
- Cross-cutting concerns: authentication, authorization, observability, security, privacy, internationalization.
- Operational concerns: deployment, scaling, disaster recovery, compliance.

This document does **not** cover:

- Detailed implementation code or function-level designs (those belong in Software Design Documents per component).
- UX/UI specifications (those belong in product specs and design system documents).
- Business strategy, market analysis, or financial projections.
- Detailed test plans (those belong in QA strategy documents).

## 1.4 Definitions and Glossary

Key domain terms used throughout this document:

| Term | Definition |
|:-----|:-----------|
| **Scenario** | A 7-day immersive narrative arc representing a career experience. Composed of day themes, branch points, persona casts, widget configurations, and ending conditions. |
| **Persona** | An AI-driven character within a scenario (mentor, peer, antagonist, buddy). Specified through a 5-layer model: Identity, Voice, Behavior, Knowledge, Constraints. |
| **Widget** | A domain-specific interactive component within the Workspace. Examples: CodeSpace, LogHunter, PatientMonitor, CampaignDashboard. Loaded as plugins. |
| **Workspace** | The 3-zone runtime environment where students experience scenarios. Hosts the active widget, multi-persona chat, and real-time vitals (stress, knowledge, time). |
| **Knowledge Card** | An atomic, expert-verified unit of domain knowledge. Personas reference cards when teaching; students earn cards as they progress. |
| **Session** | One student's complete journey through one scenario. Identified by a session ID; persists across days and devices. |
| **Orchestration** | The server-side logic that decides which persona(s) respond to a student message, in what order, with what tone, based on event triggers and priority matrices. |
| **Final Report** | The 6-section AI-generated career-fit assessment delivered to students after Day 7 completion. The primary monetizable deliverable. |
| **Workspace Tenant** | A logical isolation unit. B2C consumers share the consumer tenant; each B2B school is its own tenant with isolated users, content, and analytics. |
| **Story Director** | A meta-persona that orchestrates narrative arcs and can override other personas at key story beats. Typically silent. |

## 1.5 Related Documents

- **Product Specifications** (34 markdown files in `lumina-docs/`) — the design source of truth for screens, flows, and user experience.
- **Roadmap & Implementation Phases** (separate document) — defines V0, V1, V2, V3 scope and timing.
- **MVP V0 Scope Definition** (separate document) — explicit list of components built vs. stubbed in the first implementation phase.
- **Software Design Documents** (per component, written before implementation) — detailed designs for individual subsystems.
- **Architecture Decision Records (ADRs)** ([Section 12](./12-adrs.md)) — log of significant architectural decisions and their rationale.

## 1.6 Document Maintenance

This document changes when architectural decisions change, not when features are added or roadmap shifts. Triggers for updating this TAD include:

- A new layer or major component is introduced (e.g., adding a real-time collaboration layer).
- A foundational technology choice changes (e.g., switching from Postgres to a different database family).
- A cross-cutting concern is added or fundamentally redesigned (e.g., introducing GDPR compliance, multi-region deployment).
- An architectural quality attribute target changes significantly (e.g., scaling from 50K to 500K concurrent users).

Triggers that **do not** require TAD updates:

- Adding new scenarios, personas, widgets, or knowledge cards (these are content, not architecture).
- Adding new screens or UX flows (these are product, not architecture).
- Changing implementation libraries within an existing component (e.g., swapping one charting library for another).
- Performance optimizations that don't change component boundaries.

---

[← Back to README](./README.md) · [Next: Architectural Goals →](./02-architectural-goals.md)
