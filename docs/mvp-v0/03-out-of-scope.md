# 3. V0 Out-of-Scope

This document explicitly lists what is **NOT** in V0. If something is on this list, do not build it in V0 — it belongs to V1 or later.

This list exists because scope creep is the most common cause of MVP timeline slippage. When someone says "we should also...", check this list first.

## 3.1 Explicitly Deferred to V1

### 3.1.1 Monetization

- Stripe integration
- MoMo integration
- VNPay integration
- ZaloPay integration
- Pricing pages
- Subscription management
- Refund flows
- Receipts and invoices
- Coupon/discount codes
- Free trial logic (Day 1 free, paywall before Day 2)

### 3.1.2 Parent Features

- Parent account creation
- Parent-child verification flow
- Parent Dashboard (any tier)
- Parent transparency settings (Minimal/Standard/Full)
- Parent talking points UI
- Parent weekly summary emails
- Parent push notifications

### 3.1.3 Multi-Scenario Features

- Scenario marketplace / browse
- Scenario recommendations engine
- Multiple scenarios per user
- Cross-scenario portfolio
- Scenario-to-scenario journey suggestions

### 3.1.4 Engagement Features

- Streaks / daily login rewards
- Achievements / badges system
- Leaderboards or social comparison
- Friend connections
- Sharing (social media share, link share)
- Export Final Report to PDF
- Print-friendly views

### 3.1.5 Internal Operations

- Admin user management UI
- Role and permission management UI
- Customer support tooling beyond basic ops dashboard
- Refund processing UI
- User suspension / banning workflows

## 3.2 Explicitly Deferred to V2

### 3.2.1 Multi-Domain

- Medical scenarios (any)
- Marketing scenarios (any)
- Any non-SE scenario
- Domain-specific widgets (PatientMonitor, CampaignDashboard)
- Cross-domain comparison features

### 3.2.2 Mobile Native

- iOS app
- Android app
- Push notification system (FCM)
- Mobile-specific features

### 3.2.3 Internal Authoring Tools

- Scenario Architect (visual scenario authoring)
- Persona Studio (sandboxed persona testing)
- Widget Studio (widget development tool)
- Knowledge Vault CMS
- Orchestrator Console
- Session Replay tool

### 3.2.4 B2B Features

- School tenant creation
- Custom branding per tenant
- School SSO (Google Workspace, Microsoft 365)
- School analytics dashboards
- Bulk user provisioning
- Annual billing / invoicing
- Classroom features

### 3.2.5 Multi-Language

- English UI (Vietnamese only in V0)
- Translation infrastructure
- Locale-specific formatting

## 3.3 Explicitly Deferred to V3

### 3.3.1 Community

- Community scenario contribution
- Community persona contribution
- Creator revenue share
- Public scenario marketplace
- User reviews/ratings of scenarios

### 3.3.2 Enterprise

- Custom SAML SSO providers
- SCIM provisioning
- Partner API
- White-label configurations
- Enterprise contract management

### 3.3.3 Compliance Certifications

- SOC 2 Type I or II
- ISO 27001
- Educational privacy certifications (FERPA, etc.)

### 3.3.4 Multi-Region

- Singapore region deployment
- Vietnam-resident hosting
- Cross-region data replication
- Regional failover

## 3.4 Architecturally Deferred (Not In Scope at Any Phase)

These are TAD non-goals — never built per architectural decision:

- Real-time multi-user collaboration on a single session
- Offline-first PWA operation
- Custom AI model training
- Open API for third-party developers (third-party app marketplace)
- Voice interface (text only)
- Video interface (text only)
- VR/AR experiences

## 3.5 Quality Features Deferred

### 3.5.1 Testing & QA

- Automated AI quality regression tests (manual sampling in V0)
- Load testing (V0 expects < 50 concurrent users)
- Penetration testing (basic security review only)
- Accessibility audit (basic WCAG A; full AA in V2)

### 3.5.2 Performance

- CDN optimization beyond Vercel default
- Service worker / PWA caching
- Image optimization pipeline
- Database query optimization beyond basic indexing

### 3.5.3 Observability

- Distributed tracing (basic logs only in V0)
- Custom metrics dashboards (V1+)
- APM tooling beyond Vercel Analytics
- Real User Monitoring (RUM)

## 3.6 Content Scope Limitations

### 3.6.1 Single Scenario

- V0 ships ONE scenario: "Software Engineering — Junior to Senior Evolution"
- All 7 days designed but Day 2, 4, 5, 6 are simplified (Day 1, 3, 7 deeply scripted)
- One ending arc (e.g., "The Fighter") with branches reducing to single ending in V0
  - V1 expands to all 5 endings

### 3.6.2 Limited Personas

- 3 personas only: Mr. Alpha, Chip, Boss Nam
- No additional supporting characters in V0
- Story Director is conceptually present but not invoked in V0

### 3.6.3 Limited Knowledge

- 8 knowledge cards covering SE essentials
- No domain breadth
- No alternative explanations / variations per concept

### 3.6.4 Limited Widgets

- 1 widget: CodeSpace (with Day 3 LogHunter mode)
- No Markdown editor, no diagram tool, no any other widget

## 3.7 Common Scope-Creep Requests (Pre-Empted)

These will likely come up. Default answer: **deferred to V1**.

| Request | V0 Answer |
|:--------|:----------|
| "Can we add a chat history search?" | No, deferred to V1 |
| "Can we let users restart a scenario?" | No, deferred to V1 (single attempt in V0) |
| "Can we add dark mode?" | No, deferred to V1 |
| "Can we add a referral program?" | No, deferred to V2 |
| "Can we add user-to-user messaging?" | Never (not in TAD) |
| "Can we add voice input?" | Never (not in TAD) |
| "Can we make it work offline?" | Never (TAD non-goal) |
| "Can we add a different scenario quickly?" | No, deferred to V1+ |
| "Can we let parents create accounts?" | No, deferred to V1 |
| "Can we add a free trial?" | Sort of — V0 is entirely free; V1 will have Day 1 free + paywall |
| "Can we sell to a school first?" | No, deferred to V2 (B2B requires features V0 lacks) |

## 3.8 What If Someone Insists?

If a stakeholder insists a deferred feature must be in V0:

1. **Restate the cost**: this feature replaces another feature on the in-scope list. Which one?
2. **Restate the impact**: adding this delays V0 ship by N days.
3. **Restate the architecture**: deferring this is a Roadmap decision, not a quality decision. The architecture supports it; V0 doesn't include it.
4. **Escalate to founder**: only the founder has authority to add scope to V0.

Adding scope without removing scope is a **commitment to delay V0**, not a free addition.

---

[← Previous: Feature List](./02-feature-list.md) · [Back to README](./README.md) · [Next: Acceptance Criteria →](./04-acceptance-criteria.md)
