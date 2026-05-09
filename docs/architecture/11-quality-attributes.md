# 11. Quality Attributes

Quality attributes are measurable system properties. This section defines targets at maturity. Phase-specific targets (V0, V1, V2, V3) are calibrated separately in the Roadmap document.

## 11.1 Performance

| Metric | Target | Notes |
|:-------|:-------|:------|
| Page load (cold) | < 2.0 seconds | First Contentful Paint, p75 from Vietnam. |
| Page load (warm) | < 0.5 seconds | Subsequent navigation within app. |
| AI first-token latency | < 1.0 second | Time to first streamed token from persona. |
| AI complete response | < 5.0 seconds (p75) | Typical persona response of 80 words or less. |
| Final Report generation | < 30 seconds | Single expensive call; user shown progress UI. |
| API endpoint p95 latency | < 500ms | Excluding AI-bound endpoints. |
| Database query p95 | < 100ms | Properly indexed queries. |

## 11.2 Reliability

- **Uptime:** 99.5% (mature target). Allows ~3.6 hours downtime/month.
- **Session continuity:** zero progress loss for sessions in flight during deployments.
- **Data durability:** 99.999999% (eight nines) for committed user data. Aligned with managed database service provider SLAs.
- **Mean Time To Recovery (MTTR):** < 30 minutes for known failure modes; < 4 hours for novel incidents.
- **Error rate:** < 0.5% of API requests result in 5xx errors.

## 11.3 Scalability

- **Concurrent active sessions:** 100,000 at maturity (Phase 4 target).
- **Horizontal scaling:** application layer scales linearly with no architecture changes through Phase 3.
- **Database scaling:** read replicas activated by Phase 2; write sharding evaluated by Phase 3.
- **AI throughput:** rate limits negotiable with providers; multi-provider routing distributes load.

## 11.4 Security

- **Authentication strength:** MFA mandatory for staff; available for users; required for sensitive actions (payment, data export).
- **Encryption:** TLS 1.3 in transit; AES-256 at rest; key rotation quarterly.
- **Vulnerability response:** Critical CVEs patched within 24 hours; High within 7 days; Medium within 30 days.
- **Penetration testing:** annual third-party security assessment from Phase 2 onward.
- **Compliance:** Vietnam PDPD compliance from launch; SOC 2 Type II by Phase 3 (B2B requirement).

## 11.5 Maintainability

- **Code quality:** strict TypeScript, automated linting, code review required, test coverage > 70%.
- **Documentation:** every public component documented; ADRs for significant decisions; runbooks for every alert.
- **Onboarding:** new engineer productive within 2 weeks; comprehensive setup automation.
- **Observability:** any production issue investigatable from logs/metrics within 30 minutes.

## 11.6 Usability

- **Accessibility:** WCAG 2.1 AA compliance; tested with screen readers; keyboard navigation throughout.
- **Mobile responsiveness:** all user-facing screens functional on iPhone SE-class devices and up.
- **Browser support:** last 2 versions of Chrome, Firefox, Safari, Edge.
- **Internationalization:** Vietnamese and English fully supported from Phase 2; additional languages added per market.
- **Loading states:** any operation > 500ms shows progress indication.
- **Error messages:** user-facing errors are friendly conversations, not technical codes.

## 11.7 Cost Efficiency

- **AI cost per scenario:** < 25% of selling price (gross margin > 75% on AI alone).
- **Infrastructure cost per active user:** < $0.50 per monthly active user (excluding AI).
- **Engineering productivity:** feature delivery cost-tracked; cost per delivered feature trends down quarter over quarter.

---

[← Previous: Cross-Cutting Concerns](./10-cross-cutting-concerns.md) · [Back to README](./README.md) · [Next: Architecture Decision Records →](./12-adrs.md)
