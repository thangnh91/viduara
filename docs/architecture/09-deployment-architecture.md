# 9. Deployment Architecture

This section describes how LUMINA is deployed and operated. The deployment architecture evolves through phases — V0 deploys as a simple monolith on a managed PaaS; mature deployment involves multi-region, isolated workloads, and disaster recovery. The logical architecture remains the same throughout.

## 9.1 Deployment Topology

### 9.1.1 Hosting Strategy

LUMINA prefers managed services over self-hosted infrastructure for the foreseeable future. The team is small; operational burden of self-hosted infrastructure does not pay back unless costs become exceptional.

- **Application hosting:** Vercel (initial), with capability to migrate to AWS or GCP if cost or feature requirements demand.
- **Database hosting:** Neon (Postgres) initially, with capability to migrate to AWS RDS, Aurora, or self-hosted Postgres at scale.
- **Object storage:** AWS S3 (or compatible).
- **Cache and queue:** Upstash Redis (initially), with potential migration to managed Redis Cluster.
- **Search:** pgvector inside primary Postgres initially; migration to dedicated vector store (Pinecone, Weaviate) when scale demands.

### 9.1.2 Environment Tiers

- **Development:** local SQLite + mock AI responses for fast iteration.
- **Preview:** ephemeral Vercel preview deployments per PR; isolated database per preview.
- **Staging:** production-equivalent infrastructure with realistic test data; used for final pre-deploy verification.
- **Production:** the live environment users access.

## 9.2 Geographic Distribution

### 9.2.1 Phase Evolution

Geographic distribution evolves with user growth:

- **Phase 1:** Single region (US East via Vercel default). Acceptable for early Vietnamese user base; latency dominated by AI calls anyway.
- **Phase 2:** Add edge regions (Vercel Edge Network) for static assets. CDN-served public content from Vietnamese-resident edges.
- **Phase 3:** Singapore region for Asia-Pacific user base. Reduces latency to Vietnamese users by ~150ms.
- **Phase 4:** Vietnam-resident hosting if regulatory requirements (PDPD data residency) mandate it. Likely involves dedicated infrastructure with Vietnamese cloud provider (Viettel IDC, FPT Cloud).

### 9.2.2 Data Residency Considerations

Vietnamese PDPD does not currently mandate data residency for all data, but does require notification for cross-border transfers. The architecture must support data tagging to identify which data crosses borders and where it lands.

> **📌 Decision Pending:** Specific data residency strategy depends on B2B contracts and regulatory evolution. Architecture supports both single-region and per-region data segregation; specific decision deferred until Phase 3 when scale justifies investment.

## 9.3 Scaling Strategy

### 9.3.1 Vertical Scaling Targets

Initial scaling exploits managed-service auto-scaling:

- **Application:** Vercel serverless functions auto-scale per-request. No capacity planning needed.
- **Database:** Neon auto-scaling compute; manual storage upgrades; read replicas added at high read volume.
- **Cache:** managed Redis with manual tier upgrades.

### 9.3.2 Horizontal Scaling Triggers

As scale exceeds managed-service limits, horizontal scaling becomes necessary:

- **Database read scaling:** at ~10,000 concurrent users, add read replicas for non-critical queries (analytics, dashboards).
- **Database write sharding:** at ~100,000 concurrent users, partition by tenant or by session ID. Substantial engineering effort; deferred until necessary.
- **Service extraction:** hot components (AI orchestration, analytics ingestion) extracted into separate services when monolith deployment becomes a bottleneck.

### 9.3.3 Capacity Targets

| Phase | Concurrent Sessions | Daily Active Users | AI Calls/Day |
|:------|:-------------------:|:------------------:|:------------:|
| Phase 1 | 100 | 500 | 10,000 |
| Phase 2 | 1,000 | 10,000 | 200,000 |
| Phase 3 | 10,000 | 100,000 | 2,000,000 |
| Phase 4 | 100,000 | 1,000,000 | 20,000,000 |

## 9.4 Disaster Recovery

### 9.4.1 Recovery Objectives

- **Recovery Point Objective (RPO):** less than 1 hour. Acceptable data loss in catastrophic scenarios.
- **Recovery Time Objective (RTO):** less than 4 hours. Acceptable downtime during disaster recovery.
- **Backup frequency:** continuous (Postgres WAL streaming) for primary database; hourly snapshots for object storage.
- **Backup retention:** 7 days hot, 30 days cold, 1 year archive.

### 9.4.2 Disaster Scenarios

- **Region outage:** failover to secondary region. RTO < 4 hours initially, target < 30 minutes by Phase 3.
- **Database corruption:** restore from latest backup; replay WAL to minimize data loss.
- **Provider account compromise:** rotate credentials, restore from clean backup, force password reset on all users.
- **AI provider terminated:** immediate failover to secondary provider; longer-term, port prompts to alternative provider.

## 9.5 CI/CD Pipeline

### 9.5.1 Pipeline Stages

1. Developer pushes commit to feature branch.
2. CI runs: lint, type check, unit tests, integration tests.
3. PR review: human review required; automated checks must pass.
4. Preview deployment: ephemeral environment created on Vercel preview URL.
5. PR merged to main: triggers staging deploy.
6. Staging verification: automated smoke tests; manual QA for substantial changes.
7. Production deploy: triggered manually by release manager; gradual rollout via feature flags.
8. Post-deploy monitoring: error rate, latency, AI quality monitored for 1 hour; auto-rollback if regressions detected.

### 9.5.2 Deployment Safety

- **Feature flags:** new features deploy disabled, enabled gradually for percentage of users.
- **Database migrations:** backward-compatible by convention; multi-step migrations for incompatible changes.
- **Blue-green deployments:** zero-downtime deployment standard.
- **Canary releases:** for high-risk changes, deploy to 5% of users for 24 hours before full rollout.
- **In-flight session preservation:** active AI calls complete on old version even after new version deployed.

---

[← Previous: Integration Architecture](./08-integration-architecture.md) · [Back to README](./README.md) · [Next: Cross-Cutting Concerns →](./10-cross-cutting-concerns.md)
