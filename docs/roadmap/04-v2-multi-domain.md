# 4. V2: Multi-Domain Expansion + B2B Pilots

> **Duration:** 6 months after V1
> **Team:** 8-12 people
> **Goal:** Validate container architecture across multiple domains; convert first B2B school customers
> **Deliverable:** 3 career domains live (SE + Medical + Marketing); 3-5 paying B2B school contracts

---

## 4.1 Phase Mission

V2 validates LUMINA's most architecturally distinctive bet: the **container architecture** that lets one platform deliver experiences for any career domain. If V0/V1 proved "this works for one domain," V2 must prove "this works for many domains without rebuilding the platform."

V2 also opens the B2B revenue channel. Schools pay differently than consumers (annual contracts, larger amounts, slower sales cycles). The architecture supports this from V0, but V2 is when actual B2B operations begin.

## 4.2 In-Scope for V2

### 4.2.1 New Capabilities

- **Medical domain:** "ER Crisis 7 Days" scenario with patient interaction, triage, ethical dilemmas, clinical mentor personas, PatientMonitor widget
- **Marketing domain:** "Campaign Director" scenario with crisis management, ROAS analysis, demanding clients, account director personas, CampaignDashboard widget
- **B2B school portal:** custom branding per school, school-administered student access, school-aggregate analytics, SSO via Google Workspace
- **Mobile apps:** native iOS and Android apps for Hub, notifications, knowledge cards (Workspace runs in WebView)
- **Parent transparency tiers:** Minimal and Full added to Standard
- **Multi-language UI:** English added to Vietnamese
- **Internal admin tools v2:** real Scenario Architect (visual scenario authoring), real Persona Studio (sandboxed persona testing), Knowledge Vault (CMS for cards)
- **Analytics Dashboard for operators:** real-time KPIs, cross-domain comparison, cost monitoring
- **Session Replay tool:** anonymized by default, full-access mode with audit trail
- **Quality evaluation pipeline:** automated AI quality monitoring with sampling

### 4.2.2 Architecture Components Built (Real)

These transition from stub to full implementation:

- **Tenancy:** B2B tenants fully functional with custom branding, isolated data, SSO
- **Widget Plugin System:** dynamic widget loading, multiple widgets per scenario, plugin sandboxing
- **Knowledge Management:** full CMS with editorial workflow (draft → review → published), expert verification
- **Internal Admin Tools:** Scenario Architect, Persona Studio, Knowledge Vault as full TAD-spec implementations
- **Quality Evaluation:** automated rule checks + LLM-as-judge sampling pipeline
- **Multi-language UI:** translation file infrastructure, locale switching, Vietnamese + English

### 4.2.3 Architecture Components Stubbed in V2

- **Custom SSO providers:** Google Workspace + Microsoft 365 only; custom SAML deferred
- **Community contribution:** internal designers only; community deferred to V3
- **Multi-region deployment:** still single region; multi-region deferred
- **SOC 2 audit:** preparation begins; certification deferred to V3

## 4.3 V2 Implementation Plan

### Months 1-2: Multi-Domain Foundation

- Validate container architecture works: build Medical scenario as test, identify any platform changes needed
- Refactor anything domain-specific accidentally hardcoded into core
- Build PatientMonitor widget for Medical domain
- Author medical personas (ER attending, charge nurse, frustrated patient archetype)
- Author 30+ medical knowledge cards verified by domain experts
- Beta test Medical scenario with 50 students before launch

### Months 3-4: Marketing Domain + Admin Tools

- Marketing scenario authoring (parallel with Medical launch)
- CampaignDashboard widget
- Build real Scenario Architect (replacing TypeScript-file authoring)
- Build real Persona Studio
- Build Knowledge Vault CMS
- Internal team migration: existing scenarios moved from code to CMS

### Months 5-6: B2B + Mobile + Polish

- B2B school portal: custom branding, SSO, school analytics
- Mobile apps (iOS + Android) for Hub
- Quality evaluation pipeline live
- Session Replay tool live
- 3-5 school pilot conversions to paid contracts
- Public launch of all 3 domains

## 4.4 V2 Success Metrics

| Metric | Target | Notes |
|:-------|:-------|:------|
| Domains live | 3 | SE + Medical + Marketing |
| Paying B2C users | > 5,000 | Cumulative |
| Paying B2B school contracts | 3-5 | Annual contracts |
| Cross-domain user rate | > 20% | Users completing scenarios in 2+ domains |
| Mobile app installs | > 10,000 | iOS + Android combined |
| Internal team domain authoring time | < 4 weeks | From TAD goal: < 4 weeks per new domain |
| AI hallucination rate | < 2% | TAD mature target |
| Uptime | > 99.5% | Sustained for 30 days |

## 4.5 V2 Risks

### 4.5.1 Container Architecture Doesn't Generalize

**Risk:** Building Medical reveals SE-specific assumptions in core platform; refactoring takes months.

**Mitigation:** Month 1 dedicated to architectural validation before content. Build Medical "vertical slice" first to surface platform issues. Time-box: if not refactored cleanly in 6 weeks, either accept V2 as "2 domains shipped" or extend timeline.

### 4.5.2 B2B Sales Cycle Longer Than Expected

**Risk:** School procurement takes 6+ months; V2 ends without B2B revenue.

**Mitigation:** B2B target is 3-5 contracts, not 30. Prioritize private schools and tutoring centers (faster decisions) over public schools. Even 1 closed contract validates B2B viability.

### 4.5.3 Quality Evaluation Reveals Issues

**Risk:** Once quality pipeline is live, it surfaces hallucination rate higher than V1 estimates.

**Mitigation:** This is good news, not bad — invisible problems became visible. Allocate dedicated time for prompt iteration and persona refinement based on quality data. Hold Marketing/Medical launches until quality acceptable.

### 4.5.4 Mobile Apps Compete with Web Resources

**Risk:** Building mobile apps consumes engineering resources, slowing V2 core scope.

**Mitigation:** Use React Native (shares logic with web). Workspace stays in WebView (no native re-implementation). Keep mobile scope to Hub + notifications + knowledge cards only. If mobile slips, ship V2 web-only and add mobile in V2.5.

## 4.6 V2 Team Growth

V2 grows from 3-5 to 8-12 people:

- **Engineering:** +2 engineers (4-5 total). One focused on mobile, one on admin tools.
- **Design:** +1 (2 total). Visual designer for B2B branding, mobile UX.
- **Content:** +2 (3 total). Domain experts for Medical and Marketing scenarios.
- **Operations:** +1 (2 total). B2B sales/customer success.
- **Optional:** dedicated AI/ML engineer for quality pipeline.

---

[← Previous: V1 Commercial](./03-v1-commercial.md) · [Back to README](./README.md) · [Next: V3 Scale →](./05-v3-scale.md)
