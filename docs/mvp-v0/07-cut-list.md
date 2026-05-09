# 7. V0 Cut List

This document pre-defines the order of scope cuts if V0 falls behind schedule. **Pre-deciding cut order is more important than pre-deciding what to build.**

When timeline slips, panic decisions are bad decisions. This list lets the founder cut decisively without anxiety.

## When to Activate the Cut List

Activate cuts at these triggers:

- **Two consecutive days slip:** make first cut from this list
- **End of week milestone missed:** make next cut
- **Day 28 (end of Week 4) and Final Report not working:** activate emergency cuts
- **Day 32 (beta launch) and major bugs unfixed:** delay beta or make emergency cuts

## Cut Order (Cut from Top First)

### Cut #1: Knowledge Cards Reduced (8 → 5)

**What's cut:** Reduce knowledge card library from 8 to 5 essential cards.

**Cards kept:** K01 Big O Notation, K04 Reading Stack Traces, K05 Code Review Etiquette, K07 Production Debugging, K08 Estimating Effort.

**Cards cut:** K02 Memory Management, K03 Premature Optimization, K06 When to Refactor.

**Effort saved:** ~6-9 hours (3 cards × 2-3 hours each)

**Impact:** Minor. Personas have less knowledge to cite. Day 3 still has K04 + K07 which are the relevant ones.

**Recovery:** Can be added in V0.5 or V1 without rework.

---

### Cut #2: Polish Animations and Visual Effects

**What's cut:**
- Vignette darkening on stress
- Animation slowdown on high stress
- Buddy breathing animation (use static image)
- Smooth transitions between zones

**Effort saved:** ~6-8 hours

**Impact:** Visual experience less impressive but functional. Demo video will look less polished.

**Recovery:** All polish features can be added in V0.5 without backend changes.

---

### Cut #3: Cross-Device Sync

**What's cut:** Multi-device session persistence. User logs in on laptop, can't seamlessly continue on tablet.

**Effort saved:** ~3-4 hours

**Impact:** Beta users must complete scenario on single device. Workaround: clear messaging at signup.

**Recovery:** Easy to add in V0.5 — session state already persists, just need cookie sharing.

---

### Cut #4: Final Report Charts (Use Tables Instead)

**What's cut:**
- Compatibility gauge → simple "78/100" text
- Cognitive matrix radar chart → bullet list of 5 dimensions with scores
- Stress timeline chart → text summary with key moments listed

**Effort saved:** ~10-15 hours (Recharts integration time)

**Impact:** Final Report less visually impressive but content unchanged. Judges see substance, not visuals.

**Recovery:** Add charts in V0.5 — data is already structured for visualization.

---

### Cut #5: Day 4-7 Content Simplified to Skeleton

**What's cut:** Days 4-7 become very simplified ("acknowledge progress, advance"). Real depth only on Days 1, 3, 7.

**Effort saved:** ~10-12 hours (content authoring + scenario configuration)

**Impact:** Beta users complete the arc but middle days feel thin. Day 3 (crisis) and Day 7 (reflection) still strong.

**Recovery:** Author Days 4-7 properly in V0.5.

---

### Cut #6: Knowledge Card RAG (Hardcoded Instead)

**What's cut:** Vector search retrieval system. Instead, hardcode which knowledge cards each persona references per day.

**Effort saved:** ~5-6 hours (pgvector setup, embedding generation, retrieval logic)

**Impact:** Less flexible knowledge integration. Persona responses still cite knowledge but selection is static, not dynamic.

**Recovery:** Implement RAG in V0.5 — interfaces designed to support it.

---

### Cut #7: Boss Nam Persona

**What's cut:** Day 3 crisis still happens but with Mr. Alpha urgent + Chip support, no Boss Nam.

**Effort saved:** ~6 hours (persona authoring + orchestration tuning for 3-way)

**Impact:** Day 3 less dramatic. Multi-agent demonstration only shows 2 personas instead of 3.

**Recovery:** Add Boss Nam in V0.5 — orchestration architecture supports N personas.

---

### Cut #8: Stress System (Visual Only)

**What's cut:** Stress mechanic becomes purely visual (meter goes up/down based on simple time-based logic), not driven by persona events. No auto-Buddy intervention.

**Effort saved:** ~5-6 hours

**Impact:** Stress feels less responsive to actual conversation. Buddy auto-intervention not triggered.

**Recovery:** Wire stress to events in V0.5.

---

### Cut #9: Final Report 6 → 3 Sections

**What's cut:** Final Report shows only 3 sections instead of 6:
- Keep: Compatibility, Cognitive Matrix, Parent Insight
- Cut: Stress Timeline, 4-Year Forecast, AI Panel Recommendations

**Effort saved:** ~6-8 hours (UI + AI generation prompts)

**Impact:** Significant. Final Report less compelling. But still demonstrates AI-generated personalized insight.

**Recovery:** Add cut sections in V0.5.

---

### Cut #10: Day 3 Crisis Trigger (Manual Instead)

**What's cut:** Day 3 crisis doesn't auto-trigger after 15 minutes. Instead, "Continue" button appears and crisis happens immediately.

**Effort saved:** ~3-4 hours (trigger system simplification)

**Impact:** Day 3 feels less authentic (no surprise). Demo flow becomes more linear.

**Recovery:** Add real triggers in V0.5.

---

### EMERGENCY CUTS (Last Resort)

If cuts 1-10 are insufficient and timeline still slipping past Day 30:

### Emergency Cut #1: Reduce to 3-Day Scenario

**What's cut:** Instead of 7 days, scenario is 3 days (Day 1 intro, Day 2 crisis, Day 3 reflection).

**Effort saved:** ~15-20 hours (less content, less day-progression complexity)

**Impact:** Major. Loses the "7-day immersion" core narrative. But proof-of-concept still works.

**Recovery:** Expand to 7 days in V1.

---

### Emergency Cut #2: No Multi-User (Hardcoded Single User)

**What's cut:** No auth. Single hardcoded user. All beta testers share state.

**Effort saved:** ~8-10 hours

**Impact:** Catastrophic for beta validation (can't have 50 users). Demo only.

**Recovery:** Real auth in V1. This cut converts V0 from MVP to prototype.

---

### Emergency Cut #3: No Final Report Generation

**What's cut:** Final Report is hardcoded sample, not AI-generated.

**Effort saved:** ~15-20 hours

**Impact:** Catastrophic. Removes the most distinctive feature. Demo has no real ending.

**Recovery:** Implement Final Report in V1. This is essentially admitting V0 didn't reach MVP threshold.

---

## Cut Decision Framework

When activating a cut:

1. **Identify the trigger:** what slipped, by how much
2. **Match cut size to slip:** small slip → Cut #1; major slip → Cut #4-5
3. **Cut decisively:** don't half-cut (that creates worse outcome than full cut)
4. **Communicate cut:** update team on what's removed and why
5. **Document for V0.5/V1:** the cut feature goes into the V1 backlog
6. **Don't undo cuts:** once cut, stay cut for V0; reconsider only at V1 planning

## What to NEVER Cut

Some features are non-negotiable. These are the V0 essence:

- Magic link authentication (without this, no beta validation possible)
- Multi-user with persistent state (without this, V0 is a prototype, not MVP)
- 1 working scenario end-to-end (without this, no demo possible)
- Mr. Alpha persona at quality (without this, no AI quality demonstration)
- AI cost tracking (without this, no business viability proof)
- Database persistence (without this, no real software)

If these are at risk, the answer is **extend timeline**, not cut.

## Acceptable V0 With All Cuts Applied

If all 10 cuts are activated, V0 still ships with:

- Real authentication and multi-user
- 1 working scenario (3 days deeply scripted, 4 days lightly scripted)
- Mr. Alpha + Chip personas (no Boss Nam)
- CodeSpace widget
- 5 knowledge cards (hardcoded selection)
- Visual stress meter (less responsive)
- Final Report with 3 sections (text-based, no charts)
- Live URL with beta users
- Cost tracking

This is still a defensible V0 — it demonstrates feasibility, even if less polished than full V0.

## Acceptable V0 With Emergency Cuts

If emergency cuts activate, V0 becomes:

- Either: 3-day scenario only (more painful)
- Or: hardcoded user, hardcoded report (essentially a polished prototype)

These outcomes mean V0 didn't reach its MVP target. Acknowledge honestly. Don't dress up a prototype as an MVP.

## Recovery Plan After Cuts

After V0 ships (with or without cuts), V0.5 sprint (2-3 weeks) restores cut features:

- Week 1 of V0.5: restore P1 cuts (charts, RAG, animations)
- Week 2 of V0.5: restore P2 cuts (Boss Nam, full Days 4-7)
- Week 3 of V0.5: polish and prepare for V1 commercial launch

V0.5 happens during the gap between competition submission and V1 commercial launch.

---

[← Previous: Week-by-Week Plan](./06-week-by-week.md) · [Back to README](./README.md)
