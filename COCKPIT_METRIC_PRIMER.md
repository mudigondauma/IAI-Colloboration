# COCKPIT_METRIC_PRIMER.md

## Purpose

This is the plain-English guide to the main cockpit metrics.

It is written for:

- product readers
- business readers
- vibe coders
- teammates who need to understand what the numbers are before touching code or database work

This is **not** the canonical formula store.

The canonical source for exact metric meaning is still:

- the live metric library in `app-data.js`

This file is the readable companion:

- what the metric is
- what type of metric it is
- why it exists
- how to think about it

## Do We Already Have A File Like This?

Not really.

The closest documents we already had were:

- [LOGIC_AUDIT_CHECKLIST.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/LOGIC_AUDIT_CHECKLIST.md:1)
- [DATA_MODEL_ALIGNMENT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/DATA_MODEL_ALIGNMENT.md:1)
- [deep-research-report on AI Copit.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/deep-research-report%20on%20AI%20Copit.md:1)

But those are:

- technical
- audit-oriented
- architecture-oriented

They are **not** a simple metric primer.

## Quick Start: The 10 Metrics To Understand First

If you only want the shortest useful list, start here:

1. `AII Score`
2. `Strategy sub-score`
3. `Ops sub-score`
4. `People sub-score`
5. `Governance Coverage`
6. `Portfolio ROI`
7. `Forecast value`
8. `Realized value`
9. `Flow Index`
10. `Quality Guardrail`

Why these first:

- they carry most of the board story
- they connect Institutionalisation and Delivery
- they are the fastest way to understand whether the cockpit is describing:
  - scale readiness
  - control strength
  - value proof
  - operational performance

## The Three Metric Types

This cockpit mostly uses three kinds of metrics.

### 1. Direct metrics

These are the closest thing to a raw fact.

They are usually:

- counts
- percentages from a clear numerator / denominator
- spend totals
- durations
- medians

Examples:

- `Governance Coverage`
- `AI Workflow Coverage`
- `Total AI spend`
- `Straight-Through Rate`
- `Human Review Queue`
- `Median Review SLA`
- `DAU`

### 2. Derived metrics

These are calculated from one or more other numbers.

Examples:

- `Portfolio ROI`
- `Attainment`
- `Finance-validated`
- `Weighted payback`
- `Stalled value at risk`

### 3. Composite metrics

These combine multiple dimensions into one higher-level score.

They are usually weighted and normalized.

Examples:

- `AII Score`
- `Strategy sub-score`
- `Ops sub-score`
- `People sub-score`
- `RAI Index`
- `Flow Index`
- `Quality Guardrail`
- benchmark dimension scores

## The Best Mental Model

Think in layers:

1. **base facts**
   counts, spend, approvals, telemetry, sample sizes

2. **derived metrics**
   ratios, aggregates, weighted averages

3. **composite scores**
   higher-level executive signals built from multiple components

So yes:

**some of the most important metrics in this cockpit are calculations of multiple other metrics.**

That is expected.

## Institutionalisation View Metrics

### AII Score

- Type: `Composite`
- What it means:
  The top institutionalisation score. It answers whether AI is becoming a governed, repeatable enterprise capability.
- Why it exists:
  To give the board one top-level view of enterprise AI maturity.

### Strategy sub-score

- Type: `Composite`
- What it means:
  A board-facing score for strategic alignment, portfolio value logic, and governance direction.
- Why it exists:
  To show whether the enterprise direction is coherent enough for board sponsorship.

### Ops sub-score

- Type: `Composite`
- What it means:
  A board-facing score for operational AI depth, service outcomes, and technology readiness.
- Why it exists:
  To show whether the enterprise can scale in real operations, not just in concept decks.

### People sub-score

- Type: `Composite`
- What it means:
  A board-facing score for workforce capability, cultural adoption, and leadership readiness.
- Why it exists:
  To show whether people and management readiness are keeping pace with AI scale.

### Governance Coverage

- Type: `Direct`
- What it means:
  Share of in-scope models or use cases that have the required governance controls in place.
- Why it exists:
  To show whether AI scale is actually governed, not just active.

### RAI Index

- Type: `Composite`
- What it means:
  Responsible AI readiness score across transparency, evaluation, accountability, and incident preparedness.
- Why it exists:
  To show whether trust and control maturity are keeping pace with deployment.

### Tech Debt Index

- Type: `Composite`
- What it means:
  A debt signal covering prompt debt, workflow fragility, manual burden, and architectural inconsistency.
- Why it exists:
  To show what is slowing durable scale.

## North-Star / Value Metrics

### Portfolio ROI

- Type: `Derived`
- What it means:
  Realized value divided by total AI spend.
- Why it exists:
  To give leadership a finance-style value efficiency signal.

### Forecast value

- Type: `Derived`
- What it means:
  Total forecast value from the matching initiatives in the current slice.
- Why it exists:
  To show expected value, not just what has already landed.

### Realized value

- Type: `Derived`
- What it means:
  Total value already evidenced in the current slice.
- Why it exists:
  To separate actual value from expected value.

### Attainment

- Type: `Derived`
- What it means:
  Realized value divided by forecast value.
- Why it exists:
  To show how much expected value is already becoming real.

### Finance-validated

- Type: `Derived`
- What it means:
  Share of realized value that is already backed by finance evidence or review.
- Why it exists:
  To stop ROI from being just storytelling.

### Weighted payback

- Type: `Derived`
- What it means:
  A realized-value-weighted payback period across the matching initiatives.
- Why it exists:
  To show how quickly value is returned at the portfolio level.

### Matching initiatives

- Type: `Direct`
- What it means:
  Count of initiatives in the current slice.
- Why it exists:
  To show how large the active board story is.

### Live or scaling

- Type: `Direct`
- What it means:
  Count of initiatives already in production or scaling.
- Why it exists:
  To show how much of the portfolio is beyond pilot.

### In full production

- Type: `Direct`
- What it means:
  Count of initiatives already fully live.
- Why it exists:
  To show the depth of real adoption.

### Stalled value at risk

- Type: `Derived`
- What it means:
  Forecast value attached to stalled initiatives.
- Why it exists:
  To show what expected value is being trapped by execution or governance issues.

## Benchmarking Metrics

### Benchmark dimension scores

Examples:

- `Strategic alignment`
- `Portfolio & ROI`
- `Governance & risk`
- `Workforce`
- `Technology`
- `Culture`
- `Operational AI`
- `SLA/XLA`
- `Responsible AI`

- Type: `Composite`
- What they mean:
  Peer-normalized dimension scores comparing Meridian to a defined benchmark peer set.
- Why they exist:
  To show where Meridian is ahead, behind, or roughly in line with peers.

Important note:

These are not simple raw facts.
They are normalized comparison scores built from underlying evidence and benchmark methodology.

## Delivery View Metrics

### Flow Index

- Type: `Composite`
- What it means:
  Delivery flow score across throughput, cycle time, blocked work, and predictability.
- Why it exists:
  To show whether AI is actually improving delivery movement.

### Quality Guardrail

- Type: `Composite`
- What it means:
  Quality score across defects, rework, test reliability, release stability, and incident spillover.
- Why it exists:
  To show whether speed is being bought at the expense of quality.

### AI Workflow Coverage

- Type: `Direct`
- What it means:
  Share of in-scope workflows that have an approved AI assist pattern in real use.
- Why it exists:
  To show how widely AI is actually embedded.

### AI Run-Rate Cost

- Type: `Direct`
- What it means:
  Annualized delivery-side AI operating spend.
- Why it exists:
  To show the operating cost footprint of the delivery AI layer.

### Value delivered

- Type: `Derived`
- What it means:
  Delivered or evidenced value from active initiatives or workflows.
- Why it exists:
  To connect workflow change to business value.

### Net Productivity Gain

- Type: `Derived / Modeled`
- What it means:
  Productivity gain after adjustments for complexity and quality drag.
- Why it exists:
  To avoid overstating productivity through simplistic before/after claims.

## Oversight And Trust Metrics

### Straight-Through Rate

- Type: `Direct`
- What it means:
  Share of items handled without human escalation.
- Why it exists:
  To show automation depth in accountable operations.

### Human Review Queue

- Type: `Direct`
- What it means:
  Count of items waiting for human review.
- Why it exists:
  To show whether the control system is becoming a bottleneck.

### Median Review SLA

- Type: `Direct`
- What it means:
  Median review time against the accountability service level.
- Why it exists:
  To show whether oversight is keeping pace with volume.

### Override Rate

- Type: `Derived`
- What it means:
  Share of AI outputs or decisions that humans override.
- Why it exists:
  To show how often the system still needs correction.

### High-Risk Holds

- Type: `Direct`
- What it means:
  Count of items held because of high-risk review conditions.
- Why it exists:
  To show concentrated risk and control friction.

### Oldest queue age

- Type: `Direct`
- What it means:
  Time since the oldest unresolved review item entered the queue.
- Why it exists:
  To show queue staleness and hidden oversight drag.

### Reviewer capacity use

- Type: `Derived`
- What it means:
  Share of reviewer capacity currently in use.
- Why it exists:
  To show whether the human control layer is overloaded.

### Sampling coverage

- Type: `Derived`
- What it means:
  Share of straight-through decisions that still get sampled for quality assurance.
- Why it exists:
  To show whether automation still has enough checking around it.

### Escalation QA pass

- Type: `Derived`
- What it means:
  Share of escalated items that pass secondary review cleanly.
- Why it exists:
  To show whether the review system is producing trustworthy outcomes.

## Workforce Metrics

### Foundations learning

- Type: `Direct`
- What it means:
  Share of the workforce that has completed foundation-level AI learning.
- Why it exists:
  To show the denominator or basic readiness base.

### Role-certified practitioners

- Type: `Derived`
- What it means:
  Share of relevant people who have passed role-specific certification.
- Why it exists:
  To show capability beyond basic training.

### Safe-use validated

- Type: `Derived`
- What it means:
  Share of people validated on supervised safe use in live workflow samples.
- Why it exists:
  To show whether governed usage is actually being demonstrated in practice.

### Decision-rights certified leaders

- Type: `Derived`
- What it means:
  Share of leaders certified to make scaled or higher-risk AI decisions.
- Why it exists:
  To show whether leadership controls are keeping pace with rollout.

### Proof cards like scenario pass and supervised sign-off

- Type: `Direct / Derived`
- What they mean:
  Evidence signals about validation quality, pass rates, and sign-off coverage.
- Why they exist:
  To make readiness more defensible than just training completion.

## Adoption Metrics

Examples:

- `DAU`
- `WAU`
- `MAU`
- `Seat utilization`
- `Retention`
- `Active teams`

- Type: mostly `Direct`, sometimes `Derived`
- What they mean:
  Behavior and usage metrics for whether people are actually using the tools.
- Why they exist:
  To separate tool access from real adoption.

## Important Warning

Just because a metric is composite does **not** mean it is bad.

Board-level views often need composites.

The real question is:

- is the formula defined?
- is the owner clear?
- is the evidence traceable?
- is the confidence level honest?

If those are clear, a composite can be very useful.

## Practical Rule For Reading The Cockpit

When you see a metric, ask:

1. Is this a direct fact, a derived calculation, or a composite score?
2. If it is derived, what is it derived from?
3. If it is composite, what dimensions are inside it?
4. Is it meant to be operationally exact, or strategically directional?

That simple habit makes the cockpit much easier to understand.

## Practical Rule For Building The Database

When storing a metric, remember:

- direct facts are easiest to persist first
- derived metrics should either:
  - be recomputed from stored facts, or
  - be stored with a clear formula and owner
- composite metrics should always have:
  - metric definition
  - formula
  - source systems
  - confidence

## The Most Important Metrics To Understand First

If you only want a shortlist, start here:

1. `AII Score`
2. `Strategy / Ops / People sub-scores`
3. `Governance Coverage`
4. `Portfolio ROI`
5. `Forecast value`
6. `Realized value`
7. `Attainment`
8. `Finance-validated`
9. `Flow Index`
10. `Quality Guardrail`

Those ten do most of the heavy lifting in the current story.

## Final Note

This file is meant to be readable.

If a metric changes in the future:

- update the live metric library first
- then update this primer if the plain-English explanation has changed

That keeps the technical truth and the human-readable truth aligned.
