# 5. V3: Scale to Maturity

> **Duration:** 12 months after V2
> **Team:** 25-50 people
> **Goal:** Reach mature state described in TAD: 50K+ active users, 8-12 domains, full B2B program
> **Deliverable:** Platform maturity matching TAD targets across all quality attributes

---

## 5.1 Phase Mission

V3 is when LUMINA becomes the platform described in the TAD. Earlier phases proved the architecture works; V3 implements the parts deferred for capacity reasons and scales the parts already running.

V3 also opens the longest-leverage capability: **community contribution**. Until V3, all content is internal. V3 lets external designers, persona writers, and curators contribute (with quality gating). This is the path to 12+ domains without 12x team growth.

## 5.2 In-Scope for V3

### 5.2.1 New Capabilities

- **Community contribution platform:** external designers can author scenarios via Scenario Architect; review workflow; revenue share with creators
- **5-9 additional domains:** Law, Finance, Design, Education, Engineering specializations, Hospitality, Healthcare specializations, etc.
- **Multi-region deployment:** primary + Singapore region for Asia-Pacific; Vietnam-resident option for B2B contracts requiring data residency
- **Advanced B2B features:** custom personas per school, white-label branding, classroom features, teacher-facilitated mode
- **Advanced admin tools:** Orchestrator Console (priority matrix tuning), Widget Studio (visual widget authoring), Custom Role Management
- **Enterprise SSO:** custom SAML providers, SCIM provisioning at scale
- **API for partners:** programmatic access for B2B integrations (read-only initially)
- **Compliance certifications:** SOC 2 Type II, possibly ISO 27001
- **Internationalization:** Chinese, Korean languages for international expansion

### 5.2.2 Architecture Components Built (Real)

By end of V3, all TAD components are real implementations:

- **Multi-region deployment:** active-active or active-passive depending on workload
- **All 8 user roles:** custom roles framework for B2B tenants
- **Full quality pipeline:** automated + LLM-judge + human review feedback loops
- **Disaster recovery:** RPO < 1 hour, RTO < 30 minutes (TAD targets met)
- **Read replicas:** database scaled horizontally for read traffic
- **Service extraction:** AI orchestration extracted as separate service if monolith bottleneck
- **Comprehensive observability:** distributed tracing, custom metrics, alert runbooks for every component

### 5.2.3 Always Out of Scope

These remain out of scope per TAD non-goals:

- Real-time multi-user collaboration on a single session
- Offline-first operation
- Custom AI model training
- Open developer platform (third-party app marketplace)

## 5.3 V3 Implementation Plan (Quarterly)

### Q1: Multi-Region + Compliance Foundation

- Deploy Singapore region; data replication; failover testing
- SOC 2 Type I audit (preparation began in V2)
- Penetration testing; remediation
- ISO 27001 gap analysis (decision: pursue or skip)
- Database read replicas in production
- Cost optimization sprint (reduce AI cost per scenario by 20%)

### Q2: Community Contribution Platform

- External authoring via Scenario Architect (with restricted permissions)
- Review workflow with internal quality gating
- Creator revenue share program (negotiated with first 5-10 creators)
- Community knowledge card contribution with expert verification
- Public scenario marketplace

### Q3: Domain Expansion

- 5-9 new domains added (parallel authoring with mix of internal and community creators)
- Internal scenario authoring time per domain reduced to < 3 weeks (improved from < 4 weeks in V2)
- Domain-specific widgets developed (Widget Studio in production)
- Cross-domain analytics for users who try multiple paths

### Q4: Enterprise Maturity

- Custom SSO providers (SAML)
- Advanced B2B features (white-label, classroom mode)
- Partner API
- SOC 2 Type II completion
- Internationalization to Chinese, Korean
- Mature state achieved: TAD targets met across all quality attributes

## 5.4 V3 Success Metrics

| Metric | Target | Notes |
|:-------|:-------|:------|
| Total domains | 8-12 | Mix of internal + community |
| Monthly active users | > 50,000 | Across all tenants |
| Annual recurring revenue | $5M+ | Mix of B2C + B2B |
| B2B school contracts | 50+ | Various tier sizes |
| Community creators | 100+ | Active in last 90 days |
| Multi-region active | Yes | Singapore + Vietnam edge |
| SOC 2 Type II | Achieved | Required for enterprise B2B |
| AI hallucination rate | < 2% | TAD mature target sustained |
| Uptime | > 99.9% | Improvement from V2's 99.5% |
| Team size | 25-50 | Scaled across functions |

## 5.5 V3 Risks

### 5.5.1 Community Quality Below Internal Quality

**Risk:** Community-authored scenarios have lower quality than internal, hurts brand.

**Mitigation:** Strict quality gating before publication. Featured vs. all-content distinction. Creator reputation system. Refund policy for poor-quality scenarios. Internal review remains gating step indefinitely.

### 5.5.2 Multi-Region Complexity Slows Deployment

**Risk:** Deployment complexity grows; deploys take longer; incidents harder to diagnose.

**Mitigation:** Heavy investment in deployment automation and observability before scaling regions. Automated cross-region testing. On-call rotation per-region.

### 5.5.3 Enterprise Sales Cycle Drags

**Risk:** SOC 2 takes 9 months; B2B contracts requiring it stall.

**Mitigation:** Parallel-track SOC 2 with smaller B2B contracts not requiring it. Use SOC 2 Type I (less rigorous, faster) as interim. Be transparent with prospects about certification timeline.

### 5.5.4 AI Costs Don't Decrease at Scale

**Risk:** Volume discounts and prompt optimization don't materialize; margins stay thin.

**Mitigation:** Negotiate enterprise AI provider deals. Investigate self-hosted open-weight models for non-critical use cases. Consider price increase if margins force it. Worst case: scale slower until margins acceptable.

## 5.6 V3 Team Growth

V3 grows from 8-12 to 25-50 people across functions:

- **Engineering:** ~12-20. Domain teams (Platform, AI, Content tools, Mobile). On-call rotation.
- **Design:** ~3-5. Visual + UX + brand.
- **Content:** ~5-10. Domain experts, community manager, knowledge curators.
- **Operations:** ~5-10. Customer success, B2B sales, support, DevOps.
- **Other:** finance, legal, HR, marketing.

## 5.7 What Comes After V3

V3 reaches the TAD's mature state. What comes after is **growth** of an already-mature platform, not architectural evolution:

- More domains (potentially 30+ over time)
- More markets (Indonesia, Philippines, Thailand, Singapore, India)
- More user types (mid-career changers, parent users for their own careers)
- Adjacent products (university partnerships, employer talent pipelines, certification programs)

These growth opportunities are addressed in business strategy documents, not architectural roadmap.

---

[← Previous: V2 Multi-Domain](./04-v2-multi-domain.md) · [Back to README](./README.md) · [Next: Coverage Matrix →](./06-coverage-matrix.md)
