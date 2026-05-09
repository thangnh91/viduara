# 10. Cross-Cutting Concerns

This section addresses concerns that span all components: how authentication works, how authorization is enforced, how the system observes itself, and how privacy and security are maintained.

## 10.1 Authentication and Identity

### 10.1.1 Authentication Methods

- **Email + magic link (passwordless):** primary method for B2C consumers. Lower friction, no password management.
- **Email + password:** alternative for users who prefer it. Argon2id hashing; password strength requirements.
- **OAuth via Google:** frictionless signup for users with Google accounts (the majority in target market).
- **OAuth via Microsoft:** alternative for Microsoft 365 users.
- **Enterprise SSO:** SAML and OIDC for B2B school customers.
- **Multi-factor authentication:** required for internal staff (Designer, Operator, etc.); optional for end users.

### 10.1.2 Session Management

- **Session tokens:** opaque, server-side validated. No JWT for end-user sessions (avoids token revocation complexity).
- **Token storage:** HTTP-only secure cookies. Never accessible to JavaScript.
- **Session lifetime:** 30 days for end users with sliding expiration; 8 hours for internal staff with re-authentication.
- **Concurrent sessions:** multiple devices supported; users can list and revoke active sessions.

## 10.2 Authorization and RBAC

### 10.2.1 Permission Model

LUMINA uses Role-Based Access Control with permission composition. Permissions are atomic capabilities; roles bundle permissions; users acquire roles within tenants.

```
User ──belongs-to──► Tenant
   │
   └──assigned──► Role(s) ──contains──► Permission(s) ──grants──► Action

Standard roles:
  - Learner            ─────► [scenario.start, session.read.own, report.read.own, ...]
  - Parent             ─────► [child.progress.read, child.report.read, ...]
  - Designer           ─────► [scenario.read.all, scenario.create, scenario.edit.own, ...]
  - Persona Writer     ─────► [persona.read.all, persona.create, persona.edit.own, ...]
  - Engineer           ─────► [widget.read.all, widget.create, widget.edit.own, ...]
  - Curator            ─────► [knowledge.read.all, knowledge.create, knowledge.edit, ...]
  - Operator           ─────► [analytics.read, session.replay.anonymized, alerts.manage, ...]
  - Super Admin        ─────► [* all permissions, including user.manage, role.manage]
  - Custom Roles       ─────► [tenant-defined, drawn from available permission catalog]
```

*Figure 10.1 RBAC model*

### 10.2.2 Permission Enforcement

- **Server-side checks:** every API endpoint validates required permissions before executing. Never trust client-side checks for security.
- **Tenant scoping:** queries automatically filter by user's tenant context. Cross-tenant operations require explicit elevation (Super Admin only).
- **Object-level checks:** for entity-level permissions (e.g., "edit own scenarios"), ownership verified per-object.
- **Audit logging:** every permission check failure logged for security monitoring.

## 10.3 Privacy Architecture

### 10.3.1 Privacy by Design Principles

- **Minimization:** collect only data needed for stated purposes.
- **Purpose limitation:** data collected for purpose X is not used for purpose Y without additional consent.
- **Transparency:** users see what data exists about them and why.
- **User control:** users can export, correct, and delete their data.
- **Default privacy:** most-private settings are defaults; users opt-in to broader sharing.

### 10.3.2 Three-Tier Parent Transparency

Parent visibility into student data is configurable by the student in three tiers:

- **Minimal:** parent sees account exists, account active dates, scenarios completed (counts only).
- **Standard** *(default)*: parent sees scenario completion, Final Report, talking points, weekly summary.
- **Full:** parent additionally sees stress patterns, decision summaries, peer-comparison anonymized aggregates. Chat content remains private regardless of tier.

> **ℹ️ Privacy Boundary:** Even at Full transparency, parents do not see chat message content. Chat is treated as the student's private space, equivalent to a personal journal. This is non-negotiable architectural policy.

### 10.3.3 Operator Access Controls

- **Anonymized mode (default):** operators investigating sessions see anonymized student identifiers, redacted PII.
- **Full access mode:** requires written justification, auto-expires after 1 hour, every action audited, requires Super Admin approval for sensitive sessions.
- **Full access triggers:** legal investigation, child safety concerns, explicit user consent.

## 10.4 Security Architecture

### 10.4.1 Defense in Depth

- **Network:** WAF (Web Application Firewall) for common attack patterns; rate limiting per endpoint; DDoS protection via CDN.
- **Application:** input validation on every endpoint; output encoding for XSS prevention; parameterized queries (no SQL injection).
- **Data:** encryption at rest for all database storage; TLS 1.3 in transit; key management via cloud KMS.
- **Operational:** least privilege for service accounts; secrets in vault, not in code; mandatory MFA for production access.

### 10.4.2 Threat Model

Primary threats considered:

- **Account compromise:** brute force, credential stuffing, phishing. Mitigations: rate limiting, MFA, anomaly detection.
- **Data exfiltration:** malicious insider, compromised account, third-party API leak. Mitigations: least privilege, audit logging, DLP rules on outbound.
- **AI prompt injection:** user attempts to manipulate persona behavior via crafted messages. Mitigations: prompt injection detection, persona constraints enforced, output validation.
- **AI cost abuse:** malicious user runs sessions to drain platform AI budget. Mitigations: per-user rate limits, anomaly detection on usage patterns.
- **Content injection:** malicious scenarios or knowledge cards introduced via designer accounts. Mitigations: editorial workflow, content review before publication.

## 10.5 Observability

### 10.5.1 Three Pillars

- **Logs:** structured logs (JSON) emitted from every component. Aggregated in centralized log platform (Datadog, Loki, or similar).
- **Metrics:** operational metrics (request rate, error rate, latency) and business metrics (sessions started, scenarios completed, revenue).
- **Traces:** distributed tracing (OpenTelemetry) across components, especially through AI orchestration paths where latency matters.

### 10.5.2 Monitoring Coverage

- **System health:** uptime, error rates, latency percentiles for every endpoint.
- **AI quality:** hallucination rate, in-character consistency score, knowledge citation rate.
- **AI cost:** real-time cost per provider, per persona, per scenario, per tenant.
- **User experience:** session completion rate, abandonment rate, time per day, NPS feedback.
- **Business:** daily active users, paid scenarios, revenue, B2B contract status.

### 10.5.3 Alerting Strategy

- **Severity tiers:** Critical (page on-call), High (notify within 1 hour), Medium (notify within 24 hours), Low (review in weekly digest).
- **Actionability requirement:** every alert must have a runbook with diagnostic and remediation steps. Non-actionable alerts are deleted.
- **Alert fatigue prevention:** alert thresholds tuned quarterly to prevent excessive notifications; deduplication rules across related alerts.

## 10.6 Internationalization

### 10.6.1 i18n Strategy

- **UI strings:** externalized in translation files. Source language Vietnamese; translations to English, Chinese, Korean as markets expand.
- **Persona content:** persona prompts authored per locale, not auto-translated. Localization includes cultural adaptation, not just language.
- **Scenario content:** scenarios authored per market — a Software Engineering scenario for Vietnamese students differs meaningfully from one for Singaporean students.
- **Final Report generation:** AI prompts include locale instruction; reports generated in user's locale.
- **Date/time formatting:** ICU MessageFormat for locale-aware formatting.
- **RTL support:** CSS logical properties used throughout; RTL tested for future Arabic markets.

## 10.7 Audit Trail

Comprehensive audit logging is required for compliance and incident investigation.

- **What is logged:** authentication events, authorization failures, data access by operators, content modifications by internal staff, configuration changes, payment events.
- **Immutability:** audit logs are append-only. No deletion or modification possible, including by Super Admins.
- **Retention:** 7 years per compliance requirements.
- **Tamper detection:** log entries chained with hash references; integrity verifiable.

---

[← Previous: Deployment Architecture](./09-deployment-architecture.md) · [Back to README](./README.md) · [Next: Quality Attributes →](./11-quality-attributes.md)
