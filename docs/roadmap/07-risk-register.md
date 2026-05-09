# 7. Risk Register

This document catalogs phase-specific risks. Each risk has a likelihood, impact, and mitigation strategy. Risks are reviewed at each phase transition.

## Risk Severity Scale

| Likelihood | Definition |
|:-----------|:-----------|
| Low | < 20% probability based on current evidence |
| Medium | 20-50% probability |
| High | > 50% probability |

| Impact | Definition |
|:-------|:-----------|
| Low | Inconvenience, easy workaround |
| Medium | Phase scope reduction or timeline slip |
| High | Phase failure or significant rework |
| Critical | Project failure or pivot required |

---

## 7.1 V0 Phase Risks

### V0-R01: AI Persona Quality Insufficient

**Likelihood:** Medium · **Impact:** Critical

The single largest V0 risk. If Mr. Alpha doesn't feel like a real engineer, beta users disengage immediately and judges dismiss the demo. This risk is high because LUMINA's distinctive value rests on this quality.

**Mitigation:**
- Week 1 of V0 dedicated entirely to persona iteration (most front-loaded resource allocation)
- Test with 5+ external testers, not just team members
- Lock persona prompt v1.0 only after 90% positive "feels real" feedback
- Have backup plan: if persona quality blocks Week 2, cut Boss Nam from V0 to focus on Mr. Alpha + Chip

### V0-R02: 5-Week Timeline Slips

**Likelihood:** High · **Impact:** Medium

Solo founder full-time is realistic but tight. Solo founder part-time is unlikely to finish in 5 weeks.

**Mitigation:**
- Pre-defined cut order: drop Day 3 crisis → drop charts in Final Report → drop multi-day → drop auth (last resort)
- Weekly checkpoints; if behind, cut from list above immediately
- Realistic: 6-7 weeks more likely than 5 if part-time

### V0-R03: AI Cost Spike During Beta

**Likelihood:** Medium · **Impact:** Medium

50 beta testers × heavy chat usage could exhaust Anthropic credits before competition deadline.

**Mitigation:**
- Per-user rate limit (5 sessions max)
- Per-session token cap (50K tokens)
- Anthropic spending alert at $200, hard stop at $500
- If budget exhausted, beta closes early; competition demo continues

### V0-R04: Beta Recruitment Underdelivers

**Likelihood:** Medium · **Impact:** Low

Recruited 50, only 5 sign up; only 1 finishes.

**Mitigation:**
- Over-target recruitment (aim for 100+ sign-ups)
- Personal outreach for first 20
- Daily onboarding emails to maintain momentum
- If completion rate very low, focus deep qualitative interviews on the few who finish

### V0-R05: Vendor Outage During Demo

**Likelihood:** Low · **Impact:** High

Anthropic API or Vercel down during competition judging.

**Mitigation:**
- Cache final report from a successful demo session for fallback
- Pre-recorded demo video as backup
- Test demo URL 24 hours before submission

---

## 7.2 V1 Phase Risks

### V1-R01: Conversion Doesn't Materialize

**Likelihood:** Medium · **Impact:** Critical

Beta users complete free Day 1 but won't pay for Days 2-7. Without conversion, V1 fails.

**Mitigation:**
- A/B test pricing ($9.99, $19.99, $29.99) with first 200 users
- Test bundle pricing
- Iterate on Day 1 quality until paywall conversion > 30%
- If conversion stays < 10%, pivot pricing model (subscription, school B2B-first)

### V1-R02: AI Costs Compress Margin

**Likelihood:** High · **Impact:** High

Per-scenario AI cost exceeds 30% of revenue.

**Mitigation:**
- Aggressive prompt optimization sprint
- Use Claude Sonnet for personas, only Opus for Final Report
- Implement prompt caching where Anthropic supports
- Response length caps via persona constraints
- If still > 30%, raise prices before scaling

### V1-R03: Support Burden Overwhelms Team

**Likelihood:** Medium · **Impact:** Medium

500 paying users → 50+ support tickets/week with 3-person team.

**Mitigation:**
- Self-service knowledge base from day 1
- In-product Buddy handles common questions
- Async-only support
- Hire dedicated CS at Month 3 if ticket volume sustained

### V1-R04: New Scenarios Don't Match V0 Quality

**Likelihood:** Medium · **Impact:** High

V0 scenario was hand-crafted carefully; V1's two new SE scenarios feel rushed.

**Mitigation:**
- Each new scenario gets minimum 2 weeks dedicated work
- Domain expert review before launch
- Beta test new scenarios with 30+ users before public launch
- If quality slips, delay launch rather than ship weak content

### V1-R05: Payment Provider Issues

**Likelihood:** Medium · **Impact:** Medium

MoMo or VNPay integration has bugs; Vietnamese users can't pay.

**Mitigation:**
- Stripe live first (international cards work for tech-savvy users)
- MoMo and VNPay rolled out gradually with monitoring
- Manual payment fallback (bank transfer + manual entitlement) as emergency option

### V1-R06: PDPD Compliance Issue Surfaces

**Likelihood:** Low · **Impact:** High

Vietnamese authorities flag a compliance issue; service forced to pause.

**Mitigation:**
- Compliance review in Month 1 of V1 (don't defer)
- Legal counsel engaged for review
- Clear consent flows from V0 onward
- DPIA (Data Protection Impact Assessment) completed before launch

---

## 7.3 V2 Phase Risks

### V2-R01: Container Architecture Doesn't Generalize

**Likelihood:** Medium · **Impact:** High

Building Medical reveals SE-specific assumptions in core platform; refactoring takes months instead of weeks.

**Mitigation:**
- Month 1 dedicated to architectural validation (Medical "vertical slice" first)
- Time-box: if not refactored cleanly in 6 weeks, accept "2 domains shipped" or extend timeline
- Architectural review at start of phase to identify likely issues

### V2-R02: B2B Sales Cycle Longer Than Expected

**Likelihood:** High · **Impact:** Medium

School procurement takes 6+ months; V2 ends without B2B revenue.

**Mitigation:**
- Target 3-5 contracts, not 30
- Prioritize private schools and tutoring centers (faster decisions)
- Even 1 closed contract validates B2B viability
- V3 absorbs longer-tail B2B contracts

### V2-R03: Quality Pipeline Reveals Hidden Issues

**Likelihood:** Medium · **Impact:** Medium

Once automated quality monitoring is live, hallucination rate is higher than V1 estimates.

**Mitigation:**
- This is good news (problems become visible) — frame accordingly
- Allocate dedicated time for prompt iteration based on quality data
- Hold new domain launches until quality acceptable
- V2 success metric (< 2% hallucination) may slip to V2.5 if needed

### V2-R04: Mobile App Resource Contention

**Likelihood:** High · **Impact:** Medium

Building mobile apps consumes engineering resources; V2 core scope slips.

**Mitigation:**
- React Native shares logic with web
- Workspace stays in WebView (no native re-implementation)
- Mobile scope limited to Hub + notifications + knowledge cards
- If mobile slips, ship V2 web-only and add mobile in V2.5

### V2-R05: Domain Expert Recruitment Difficult

**Likelihood:** Medium · **Impact:** Medium

Hard to find Vietnamese medical/marketing experts willing to commit time for content authoring.

**Mitigation:**
- Equity compensation for early domain experts
- Part-time arrangements (not full-time hires)
- Network leverage: each expert helps recruit others
- If recruitment stalls, scope V2 to 2 domains instead of 3

---

## 7.4 V3 Phase Risks

### V3-R01: Community Quality Below Internal Quality

**Likelihood:** High · **Impact:** Medium

Community-authored scenarios have lower quality than internal, hurts brand.

**Mitigation:**
- Strict quality gating before publication
- Featured vs. all-content distinction (only featured promoted)
- Creator reputation system
- Refund policy for poor-quality scenarios
- Internal review remains gating step indefinitely

### V3-R02: Multi-Region Complexity Slows Operations

**Likelihood:** Medium · **Impact:** Medium

Deployment complexity grows; deploys take longer; incidents harder to diagnose across regions.

**Mitigation:**
- Heavy investment in deployment automation BEFORE scaling regions
- Automated cross-region testing
- Per-region on-call rotation
- Phased rollout: Singapore first, Vietnam local later, Asia broader after

### V3-R03: Enterprise Sales Cycle Drags

**Likelihood:** High · **Impact:** Medium

SOC 2 takes 9 months; B2B contracts requiring it stall.

**Mitigation:**
- Parallel-track SOC 2 with non-SOC-required B2B contracts
- SOC 2 Type I as interim certification
- Transparent timeline communication with prospects

### V3-R04: AI Costs Don't Decrease at Scale

**Likelihood:** Medium · **Impact:** High

Volume discounts and prompt optimization don't materialize; margins stay thin at scale.

**Mitigation:**
- Negotiate enterprise AI provider deals (>$100K/month volume)
- Investigate self-hosted open-weight models for non-critical use cases
- Consider price increase if margins force it
- Worst case: scale slower until margins acceptable

### V3-R05: Talent Acquisition at 50-Person Scale

**Likelihood:** Medium · **Impact:** Medium

Vietnam EdTech talent market is small; competing with global remote employers.

**Mitigation:**
- Remote-first hiring (Vietnam + Southeast Asia + global remote)
- Strong engineering culture as recruiting differentiator
- Internal training programs for junior hires
- Competitive total compensation (equity emphasis given pre-IPO)

---

## 7.5 Cross-Phase Risks

### CP-R01: Founder/Team Burnout

**Likelihood:** Medium across all phases · **Impact:** Critical

Multi-year journey with intense periods at each phase transition. Founder burnout has killed many promising EdTech startups.

**Mitigation:**
- Sustainable pace as architectural principle (not heroic sprints)
- Quarterly check-ins on team wellbeing
- Hire to relieve founder bottlenecks early, not late
- Honest communication about pace expectations

### CP-R02: Competitive Entry

**Likelihood:** Medium · **Impact:** High

Well-funded Vietnamese or international EdTech enters with similar concept.

**Mitigation:**
- Speed to market (V1 launch within 6 months of V0)
- Quality moat (persona authenticity hard to replicate quickly)
- Brand and trust building from V1 onward
- Network effects (community creators in V3 are hard to replicate)

### CP-R03: AI Provider Strategic Shift

**Likelihood:** Low · **Impact:** Critical

Anthropic acquired, deprecates Claude API, dramatically raises prices, or restricts use cases.

**Mitigation:**
- Multi-provider abstraction from V0 (TAD ADR-006)
- OpenAI as proven fallback by V1
- Self-hosted models researched by V2
- Annual review of AI provider landscape

### CP-R04: Regulatory Tightening

**Likelihood:** Medium · **Impact:** High

Vietnam tightens AI regulations or education sector compliance.

**Mitigation:**
- Active monitoring of Vietnamese regulatory environment
- Conservative compliance posture (over-comply rather than skirt edges)
- Legal counsel relationships in Vietnam and internationally
- Architecture supports rapid policy enforcement (consent, data residency, content filters)

### CP-R05: Funding Gap

**Likelihood:** Medium · **Impact:** Critical

Run out of money between phases.

**Mitigation:**
- V0 designed to be self-fundable (low cost, founder-led)
- V1 should generate revenue, reducing burn
- V2 funding raised based on V1 traction
- V3 funding raised based on V2 unit economics
- Bridge funding plans for between-round periods

---

[← Previous: Coverage Matrix](./06-coverage-matrix.md) · [Back to README](./README.md)
