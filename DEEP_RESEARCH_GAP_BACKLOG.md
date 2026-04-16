# DEEP_RESEARCH_GAP_BACKLOG.md

## Why This Exists

`deep-research-report on AI Copit.md` is the quality bar for this cockpit, but it is too broad to execute ad hoc.

This file turns the report into a practical build order for the current static prototype.

## Working Principle

We should fix the gaps in the same order a leadership team would feel them:

1. Can we trust the numbers?
2. Can we trace them to evidence?
3. Can we see where the problem sits?
4. Can we act on it and close the loop?

That means we do **not** start with more charts. We start with the measurement and evidence layer.

## Execution Waves

| Wave | Focus | Why it comes first | Report priority coverage |
|---|---|---|---|
| 1 | Decision-grade metrics | Makes the cockpit defensible before we add more surface area | 1, 2, 3 |
| 2 | Traceability and action loops | Turns signals into evidence-backed operating work | 4, 5, 7, 8, 9 |
| 3 | Adoption and AI operations | Shows whether AI is really being used safely and effectively | 10, 11, 14, 15, 16, 17 |
| 4 | Governance system depth | Makes governance a control system instead of a percentage | 18, 19, 20, 21, 22, 23, 24, 25 |

## Ordered Backlog

| Order | Gap | Target outcome in this repo | Status |
|---|---|---|---|
| 1 | Metric dictionary + calculation transparency | Add metric cards for core board and delivery KPIs with formula, scope, owner, source systems, refresh, and confidence | Implemented in prototype |
| 2 | Finance-grade value tracking | Split value into forecast vs realized, finance validation, benefit type, confidence band, and payback framing | Implemented in prototype |
| 3 | Global filters and segmentation | Add persistent filters for time, geography, BU, function, train, use case, and model tier | Implemented in prototype |
| 4 | Action centre workflow | Turn signals into owned work items with severity, due date, progress, and closure evidence | Implemented in prototype |
| 5 | Evidence packs and traceability | Add evidence pack views for use cases, controls, and metrics | Implemented in prototype |
| 6 | Benchmarking provenance | Show peer set, source, last refresh, and supporting drivers behind benchmark claims | Implemented in prototype |
| 7 | Oversight performance metrics | Add review SLAs, backlog ageing, reviewer capacity, and sampling efficacy | Implemented in prototype |
| 8 | Alert telemetry and thresholds | Add alert volumes, MTTA, MTTR, recurrence, and forecasted burn/drift | Implemented in prototype |
| 9 | Data freshness and pipeline SLOs | Show source freshness, ingestion health, latency, and completeness | Implemented in prototype |
| 10 | Adoption behaviour metrics | Add DAU/WAU/MAU, retention, repeat usage, active teams, seat utilization, and persona adoption | Implemented in prototype |
| 11 | Productivity methodology | Explain productivity measurement and break it down by workflow and train | Implemented in prototype |
| 12 | Ask-the-cockpit layer | Add scoped explainability and question prompts with grounded answers | Implemented in prototype |
| 13 | Role-specific saved views | Deepen persona tailoring beyond the current landing and dual-view shell | Implemented in prototype |
| 14 | Model monitoring panel | Add latency, errors, token cost, refusal rate, fallback rate, and safety events by model/use case | Implemented in prototype |
| 15 | Hallucination methodology | Show eval suite definition, sample size, pass rate, and confidence interval | Implemented in prototype |
| 16 | Prompt security coverage | Track test coverage, attack attempts, findings, and remediation SLA | Implemented in prototype |
| 17 | RAG quality metrics | Add citation rate, retrieval hit rate, freshness, stale content, and no-answer rate | Implemented in prototype |
| 18 | Governance by risk class | Break governance down by risk tier, criticality, and data sensitivity | Implemented in prototype |
| 19 | Compliance control matrix | Map framework readiness percentages to concrete controls, owners, and gaps | Implemented in prototype |
| 20 | Audit observability | Add audit volume, retention, searchability, and investigation metrics | Implemented in prototype |
| 21 | RBAC and access scope | Show data access model and viewer scope for sensitive cockpit data | Implemented in prototype |
| 22 | Reliability and degraded mode | Track provider incidents, fallback rates, queueing, and degraded quality impact | Implemented in prototype |
| 23 | Integration completeness | Show what share of teams, logs, and workflows are actually instrumented | Implemented in prototype |
| 24 | Workforce capability validation | Move from training completion to capability evidence and safe-use validation | Implemented in prototype |
| 25 | Accessibility hardening | Remove color-only meaning and improve keyboard, ARIA, and export semantics | Implemented in prototype |

## Immediate Build Sequence

### Step 1

Implement metric cards for the non-negotiable KPIs:

- AII Score
- Portfolio ROI
- Governance Coverage
- RAI Index
- Tech Debt Index
- Flow Index
- Quality Guardrail
- AI Coverage
- Net Productivity Gain
- AI Run-Rate Cost

### Step 2

Make value metrics finance-grade:

- forecast vs realized
- validated by finance
- payback period
- benefit type
- confidence band

### Step 3

Add global segmentation so every important metric can answer:

- where
- which business area
- which workflow
- which use case

## Rule For Future Changes

For every major cockpit section, we should eventually support this triad:

- **Explain**: what the metric means and how it is calculated
- **Drill down**: where the result comes from
- **Evidence**: what documents, controls, or telemetry back it up
