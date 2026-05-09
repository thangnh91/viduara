# 8. Integration Architecture

This section describes how LUMINA integrates with external systems. Each integration is a managed dependency with explicit contracts, failure handling, and operational requirements.

## 8.1 Integration Patterns

LUMINA uses three integration patterns depending on coupling and synchronicity requirements:

- **Synchronous request-response:** for integrations where the user is waiting (AI inference, payment authorization). Failures must be handled in the user flow.
- **Asynchronous fire-and-forget:** for integrations where the result is not immediately needed (analytics events, audit log forwarding). Failures retried in background.
- **Webhook callbacks:** for integrations where external system signals events to LUMINA (payment confirmations, school SSO assertions). Webhook handlers must be idempotent.

## 8.2 AI Provider Integration

Detailed in [Section 7](./07-ai-architecture.md). Architecturally, AI providers are accessed through the AI Provider Gateway abstraction. Key integration concerns:

- **Authentication:** API keys stored in secrets management (rotated quarterly).
- **Rate limiting:** provider-specific limits monitored; in-flight requests queued at platform level if exceeded.
- **Retries:** transient errors retry with exponential backoff up to 3 attempts; permanent errors fall back to alternate provider.
- **Latency expectations:** first-token latency 300–800ms; full response 1–30 seconds depending on length.
- **Cost per request:** tracked per-call with provider-reported token counts.

## 8.3 Payment Integration

### 8.3.1 Payment Flow

1. User initiates purchase (B2C scenario buy or B2B contract signup).
2. LUMINA creates a payment intent with selected payment provider.
3. User redirects to provider's payment page (or completes inline checkout).
4. Provider sends webhook to LUMINA on completion (success or failure).
5. Webhook handler verifies signature, updates payment status, grants entitlement.
6. User redirects back to LUMINA with order confirmation.

### 8.3.2 Provider-Specific Considerations

- **Stripe:** Standard Checkout Session pattern. SCA (Strong Customer Authentication) for European cards.
- **MoMo:** Vietnamese e-wallet. QR code or in-app redirect. SDK-based integration.
- **VNPay:** Bank-card gateway. Form-post integration with HMAC-signed parameters.
- **ZaloPay:** E-wallet competitor to MoMo. Similar integration pattern.
- **Bank Invoice:** Manual reconciliation for B2B contracts. Generated PDF invoice; payment confirmed by accounting team.

> **ℹ️ PCI Scope Minimization:** LUMINA does not store payment card data. All card handling is delegated to payment providers. LUMINA stores only payment tokens, transaction references, and metadata. This minimizes PCI compliance scope.

## 8.4 School System Integration

### 8.4.1 Authentication via SSO

- **Google Workspace:** OIDC integration. School admin configures domain restriction; users sign in with school Google account.
- **Microsoft 365:** SAML or OIDC. Similar admin-configured tenant restriction.
- **Custom SAML:** for schools using custom identity providers. Per-tenant configuration.

### 8.4.2 User Provisioning

- **Just-in-time provisioning:** first SSO login creates user account; role assigned based on SSO claims.
- **SCIM provisioning:** for schools requiring full lifecycle management. School IT system pushes user changes (create, update, deactivate) via SCIM API.
- **Roster sync:** for classroom features, periodic roster import via Google Classroom API or equivalent.

## 8.5 Analytics Integration

### 8.5.1 Event Streaming

LUMINA emits behavioral events to multiple analytics destinations:

- **Mixpanel:** real-time event tracking, funnel analysis, retention cohorts.
- **Custom data warehouse:** BigQuery or Snowflake for advanced analytics, ML feature engineering, executive reporting.
- **Internal analytics service:** for product-internal dashboards (Analytics Dashboard screen).

### 8.5.2 Event Schema

All events follow a uniform envelope:

- **Event ID:** UUID for deduplication.
- **Event name:** hierarchical name (e.g., `session.day.completed`, `persona.response.generated`).
- **Timestamp:** ISO 8601 with timezone.
- **Actor:** user ID, anonymized for analytics destinations that don't need PII.
- **Tenant:** tenant context.
- **Properties:** event-specific structured data.
- **Metadata:** source app version, request ID, environment.

## 8.6 Communication Integration

### 8.6.1 Email Delivery

- **Provider:** AWS SES or SendGrid (decision deferred to deployment, both supported).
- **Template engine:** react-email or equivalent for type-safe email templates.
- **Bounce handling:** automated processing of bounces and complaints; user-level opt-out tracking.
- **Deliverability monitoring:** SPF, DKIM, DMARC configured; reputation monitoring via provider dashboards.

### 8.6.2 SMS and Zalo

- **SMS:** Twilio for international, local Vietnamese SMS gateway for cost optimization.
- **Zalo Official Account:** Vietnam's primary messenger. Used for parent communications (high engagement, low cost).

### 8.6.3 Push Notifications

- **Firebase Cloud Messaging:** unified iOS and Android push delivery.
- **Per-user notification preferences:** category-based opt-in/opt-out.
- **Engagement throttling:** rate limits to prevent notification fatigue.

## 8.7 Integration Failure Handling

| Integration | Failure Mode | Handling |
|:------------|:-------------|:---------|
| AI Provider | Provider unavailable | Failover to secondary provider; if both fail, queue message and notify user with estimated retry time. |
| AI Provider | Rate limit exceeded | Throttle at platform level; queue with priority by user tier. |
| Payment Processor | Authorization fails | Show clear error to user; suggest alternative payment method; preserve cart state. |
| Payment Processor | Webhook delayed | User sees "processing" state; reconciliation job catches missed webhooks every 15 minutes. |
| School SSO | Identity provider down | Show clear error; allow fallback to email/password if configured by school admin. |
| Email Delivery | SMTP failure | Retry with exponential backoff; persistent failure flagged; alternate provider if configured. |
| Analytics | Pipeline backed up | Buffer locally; never block user-facing operations on analytics. Lossiness acceptable for analytics. |

---

[← Previous: AI Architecture](./07-ai-architecture.md) · [Back to README](./README.md) · [Next: Deployment Architecture →](./09-deployment-architecture.md)
