# Meridian AI Enterprise Cockpit Deep Audit

## Executive summary

The attached “Meridian — AI Enterprise Cockpit” is a strong-looking executive prototype that already tracks several useful **leading indicators** for institutionalising AI (e.g., composite indices, portfolio value, governance coverage, tech debt, delivery flow, AI coverage, cost mix, and a human-oversight gateway). fileciteturn0file0  

The two-lens design (Strategic vs Delivery) is directionally right for your audiences (CxOs + delivery leadership), because it separates **enterprise posture** (institutionalisation, governance, workforce, RAI) from **execution performance** (flow, quality, cost, oversight). fileciteturn0file0  

What will most likely block adoption, trust, and business value is not “missing charts” but the fact that the cockpit is still mostly a **scoreboard without verifiable definitions, drill-down, and decision-grade traceability**. In other words: it shows *what* but not enough of *why* and *what to do next*, and it doesn’t provide enough evidence for leaders to defend funding, risk decisions, or compliance posture.

Top critical gaps (in priority order)

1) **Metric definitions & evidence are missing for the most important numbers** (AII score, Flow Index, ROI, RAI, “hallucination score”, “coverage”, “guardrails”, etc.). The dashboard shows these as authoritative without explaining calculation, scope, owners, or confidence. fileciteturn0file0  
2) **No drill-down or segmentation** (by geography, account, business unit, function, delivery train, or use case) so leaders cannot identify where to intervene. The current views are largely aggregate-only (plus a partial portfolio table). fileciteturn0file0  
3) **Operational AI monitoring is incomplete**: you hint at reliability/safety (e.g., “99.2% uptime” and “hallucination score below 0.1%”), prompt injection risk, and drift, but there’s no model/use-case level telemetry (latency, error rates, guardrail hit-rates, incident trends, eval coverage). fileciteturn0file0  
4) **Governance is presented as coverage %, not as a control system**: you need evidence packs, approvals throughput, compliance-by-risk-class, and “policy-to-production” enforcement metrics. Your current “Policy controls” are status labels without auditable linkouts. fileciteturn0file0  
5) **Value realisation is not finance-grade**: ROI and “Value delivered” are shown, but the cockpit doesn’t show attribution, realised vs forecast, validation status, payback period, or uncertainty—so it’s hard to use for funding gates and board-level scrutiny. fileciteturn0file0  

Best-practice alignment note (why these gaps matter)
- The NIST AI Risk Management Framework (AI RMF) explicitly frames trustworthy AI risk management around **trustworthiness characteristics** (e.g., “Valid and Reliable”, “Safe”, “Secure and Resilient”, “Accountable and Transparent”, “Explainable and Interpretable”, “Privacy-Enhanced”, “Fair – with Harmful Bias Managed”) and operational functions **Govern, Map, Measure, Manage**. citeturn1view0  
- ISO/IEC 42001 describes an organisational AI management system standard—i.e., repeatable policies, processes, and continual improvement—rather than one-off dashboards. Your cockpit needs to show the evidence that these processes exist and are working. citeturn1view2  
- OWASP’s GenAI/LLM Top 10 highlights practical GenAI risks (including prompt injection and more) that require measurable controls and monitoring; your cockpit already flags injection risk but doesn’t yet provide a measurement-and-control loop. citeturn2view0turn0search7  
- The European Commission describes the EU AI Act as a risk-based legal framework intended to foster trustworthy AI; for an enterprise cockpit, that means you need risk classification, traceability, and monitoring—not only a single readiness percentage. citeturn1view3  

## What the dashboard currently measures

This inventory matters because it clarifies what is already present (so we only call something “missing” when there is no evidence it exists).

North-star layer (always visible)
- **AII Score 67 (+4 pts)**, **Flow Index 79**, **Portfolio ROI 3.7× (with £18.4M)**, **RAI Index 62 (+5 pts)** plus signal tags (“Shadow AI”, “Prompt debt”, “Forecast drift”, “SLA improving”). fileciteturn0file0  

Strategic view
- Institutionalisation composite and sub-scores (Strategy/Ops/People), plus dimension bars vs sector average. fileciteturn0file0  
- Delivery bridge summary (Flow, Quality, Coverage, delivery run-rate, operational AI spend, total AI spend). fileciteturn0file0  
- Portfolio metrics (active initiatives, value delivered, in production count, stalled value at risk) and a partial table of use cases with stage/value/maturity/status/LLM tier. fileciteturn0file0  
- Workforce heatmap (AI literacy by function across Aware/Prompt/Integrate/Govern/Build), training pipeline completion and alignment/sentiment breakdown. fileciteturn0file0  
- Governance & risk (models in inventory, governance coverage, shadow AI signals, EU AI Act readiness) with a risk register (owners + due dates). fileciteturn0file0  
- Tech debt index and debt sub-dimensions (data/model/prompt/org) including explicit red flags (e.g., prompts undocumented, injection pentest gap). fileciteturn0file0  
- Responsible AI (RAI index with pillar scores) plus “regulatory readiness” (EU AI Act, GDPR, ISO 42001, UK AI Safety, NIST AI RMF, SOC2) and Q2 targets. fileciteturn0file0  

Delivery view
- Executive KPIs with baseline vs pilot vs target (productivity gain, AI coverage, flow index, quality guardrail, governance compliance, AI run-rate cost). fileciteturn0file0  
- Swimlanes for planning/build/run with cycle times and quality proxies. fileciteturn0file0  
- Human oversight gateway (auto-resolved / supervised / escalated %) plus a list of pending escalations. fileciteturn0file0  
- Trend bars (adoption/flow/quality/cost). fileciteturn0file0  
- Economics (cost by workflow; model mix; cost per assisted outcome; model concentration risk). fileciteturn0file0  
- Governance console (green/amber/red use cases; policy controls including “prompt injection guard”, “output quality threshold”, “audit logging”, cost alerts). fileciteturn0file0  
- Top 5 executive actions and a 30/60/90 day roadmap. fileciteturn0file0  

## Gaps, weaknesses, missing components and fixes

The table below follows your required format. I use labels:
- **[Missing feature]** = capability not present  
- **[Weak implementation]** = present but not decision-grade  
- **[Missing evidence]** = claimed/assumed but not verifiable from the dashboard  

| Area | Observed issue / missing component | Evidence | Why it matters | Severity | What to fix | How to fix | Suggested owner | Effort | Priority order |
|---|---|---|---|---|---|---|---|---|---|
| Business purpose & clarity | **[Missing evidence]** “AII Score”, “Flow Index”, “RAI Index”, “Debt Index”, “Quality Guardrail”, “AI Coverage” are displayed without definitions, scope, or formulas | Indices and core KPIs are shown prominently, but no metric dictionary or “how calculated” UI exists fileciteturn0file0 | CxOs will not trust or fund against numbers they cannot defend. Without definitions you cannot standardise measurement across the enterprise (institutionalisation goal). | Critical | Add a **metric dictionary + calculation transparency** | Add an ⓘ icon on every KPI to open: definition, formula, numerator/denominator, inclusion/exclusion, owner, source systems, refresh cadence, last refresh, confidence/quality grade | Product + Data | M | 1 |
| KPIs & decision support | **[Missing evidence]** ROI and value metrics lack attribution and validation | “Portfolio ROI 3.7×” and “Value delivered £18.4M” are shown without methodology or validation status fileciteturn0file0 | Finance-grade value tracking is essential to institutionalise AI (otherwise benefits become anecdotes). | Critical | Make value tracking finance-grade | Split into: **Forecast vs Realised**, “Validated by Finance (Y/N)”, payback period, benefit type (cost-out vs revenue vs risk reduction), confidence bands; link each initiative to the cost ledger | Finance + Product + Data | M | 2 |
| Information architecture | **[Missing feature]** No global filters (time range, geography, BU, function, train, use case) | Prototype has only view toggle and baseline/pilot toggle; no segmentation controls are visible fileciteturn0file0 | Aggregate metrics prevent targeted intervention. Institutionalisation requires pinpointing *where adoption is stuck* and *where risk is concentrated*. | Critical | Add global filter bar + segmentation | Add persistent filters: Time (W/M/Q/YTD), Geography, BU/Account, Function, Delivery train, Use case, Model tier. Ensure every chart/card responds and supports “Compare vs peer” | Product + Design + Data | L | 3 |
| Core workflows | **[Weak implementation]** The cockpit shows “signals” but doesn’t support a remediation workflow | Signals like “Shadow AI”, “Prompt debt”, “Forecast drift” appear, but no structured workflow states are shown fileciteturn0file0 | Leaders need an operating rhythm: detect → assign → remediate → verify. Otherwise risks persist quarter over quarter. | High | Turn signals into “work items” with lifecycle | Introduce an “Action Centre” object: signal → severity → owner → due date → progress → evidence of closure; integrate with Jira/ServiceNow tasks | Product + Ops | M | 4 |
| Prompt/input design | **[Missing feature]** No AI-assisted interrogation of the dashboard (“ask why / what changed / what to do”) | Dashboard presents static sections; no prompt area exists fileciteturn0file0 | Your business goal is institutionalising AI; an AI cockpit that cannot be queried is a missed opportunity—especially for execs who want “explain the drivers”. | Medium | Add an “Explain this” / “Ask the cockpit” layer | Provide scoped Q&A with guardrails: pre-approved questions, dataset-bound answers, citations back to underlying measures; log queries for analytics | Product + AI/ML | M | 12 |
| Output quality & explainability | **[Missing evidence]** “Top signals” and “benchmarks” contain conclusions without drill-down evidence | E.g., narrative claims about lead/lag and ROI vs sector, but no data source links/citations fileciteturn0file0 | Execs will challenge benchmark claims; without evidence you can’t use it for board narrative. | High | Provide benchmarking provenance | Provide uplift drivers, peer set definition, data provenance (e.g., industry survey vs internal), and last update; allow “view peer distribution” | Product + Data | M | 6 |
| Confidence, citations, traceability | **[Missing feature]** No audit trail / evidence pack per use case and per metric | “Audit Logging … immutable cold storage” is stated, but no linkouts or evidence views fileciteturn0file0 | Institutionalisation requires auditability (policy-to-production). Also supports EU AI Act and ISO 42001 style management controls. citeturn1view3turn1view2 | Critical | Add evidence packs and traceability links | For each use case: model card, data sheet, risk assessment, approvals, evaluation results, pen test status, incident history, user adoption, cost; store as an “evidence pack” with immutable snapshots | Governance + Security + AI/ML | L | 5 |
| Feedback loops & HITL controls | **[Weak implementation]** Oversight gateway shows routing percentages but not quality of oversight | Auto-resolved 72%, supervised 21%, escalated 7%; pending escalations list, but no SLA/throughput metrics fileciteturn0file0 | If review is slow or low-quality, risk accumulates or business slows. Leaders need review SLAs and sampling efficacy. | High | Add oversight performance metrics | Add: review SLA (p50/p95), backlog ageing, reviewer capacity, sampling plan coverage, false positive/false negative rates for escalations | Ops + Governance | M | 7 |
| Personalisation & relevance | **[Missing feature]** No role-tailoring (CxO vs CIO vs Delivery leader vs Risk leads) beyond the two views | Only “Strategic” and “Delivery” toggles exist fileciteturn0file0 | Different leaders need different decision prompts: CFO needs value & cost, CISO needs security posture, CIO needs flow/quality, CHRO needs capability. | Medium | Add role-based landing + saved views | Implement role-specific “home” views and saved filters; show “Your top actions” per role | Product + Design | M | 13 |
| Alerts & exception handling | **[Weak implementation]** Alerts are not measurable (no thresholds, no alert volume trends, no MTTA/MTTR) | Signals appear as labels and a short list; cost budget at 82% shown but no trend/forecast visuals fileciteturn0file0 | Without proper alerting, leaders discover issues too late (quarterly). | High | Add alert telemetry & SLOs | Add: alert count by class, time-to-ack (MTTA), time-to-close, recurrence rate; include forecast for budget burn and drift | Ops + Data | M | 8 |
| Data quality, freshness, lineage | **[Missing evidence]** Only a quarterly refresh is stated; pipeline health not visible | “Data as of 08 Apr 2026 · Next refresh 08 Jul 2026” fileciteturn0file0 | Risk and cost metrics need much faster cadence (weekly/daily for incidents & spending). Without pipeline health, you can’t trust the numbers. | High | Add freshness and pipeline SLOs | Show per-source ingestion status (Jira/GitHub/ServiceNow/etc.), last successful run, completeness %, anomalies, and data latency; separate daily operational metrics from quarterly maturity metrics | Data + Engineering | M | 9 |
| KPIs & instrumentation | **[Missing feature]** Missing adoption *behaviour* metrics (not just “AI coverage”) | AI Coverage is shown (e.g., 63%), but usage metrics are absent fileciteturn0file0 | “Coverage” can be gamed. Institutionalisation requires sustained usage, retention, and measurable behaviour change. | Critical | Add adoption funnel metrics | Track: DAU/WAU/MAU, active teams, sessions per user, repeat usage, retention (D7/D30), % workforce using approved tools, seat utilisation, adoption by persona/function | Data + Product | L | 10 |
| Delivery performance | **[Weak implementation]** Productivity gain is a single % with unclear measurement | “Net Productivity Gain” shown (pilot 18%, target 22%); baseline 0% suggests placeholder fileciteturn0file0 | Productivity claims are scrutinised; without measurement method you will lose credibility. | High | Make productivity measurement explicit | Define method (time-on-task, throughput, cycle-time deltas, avoided rework). Show breakdown by workflow (planning/build/run) and by train; add confidence intervals | Product + Data | M | 11 |
| Model performance monitoring | **[Missing feature]** No model/use-case level performance telemetry | “Model mix” exists, plus “hallucination score below 0.1%” and “99.2% uptime”, but no per-model SLOs or trends fileciteturn0file0 | Without granular monitoring you can’t safely scale or compare model tiers; OWASP risks require measurable controls. citeturn2view0turn0search7 | Critical | Add model monitoring panel | Track latency (p50/p95), error rate, timeout rate, token usage, cost per request, refusal rate, safety filter hit-rate, jailbreak/injection attempts, tool-call failure rate; slice by model, use case, geography | AI/ML + Engineering | L | 14 |
| Hallucination & output risk | **[Missing evidence]** “Hallucination score <0.1%” is not credible without method, sample size, and definition | Appears as a policy control status line only fileciteturn0file0 | “Hallucination scoring” is non-trivial; leadership needs to know how it’s tested and what “passing” means to risk appetite. | High | Define and operationalise evaluation methodology | Create standard eval suites per workflow (golden sets), show pass rates over time, confidence intervals, and “unknown/untested” coverage; link to incidents | AI/ML + QA | L | 15 |
| Prompt security | **[Weak implementation]** Prompt injection is flagged, but you don’t measure attack attempts, coverage, or closure | “7/9 use cases not pen-tested for injection” and “Prompt Injection Guard … 3 suspicious patterns quarantined” fileciteturn0file0 | Prompt injection is a known top GenAI risk; measuring and closing coverage gaps is non-negotiable. citeturn2view0turn0search7 | Critical | Add prompt security control coverage | Add: % use cases injection-tested, last test date, open findings severity, fix SLA, attack attempts detected, false positives, prompt leakage incidents | Security + AI/ML | M | 16 |
| Knowledge/RAG integrity | **[Missing feature]** No metrics for retrieval quality, citation coverage, KB freshness | No RAG layer metrics are shown (only “embedding/retrieval” in model mix) fileciteturn0file0 | Institutional AI often depends on enterprise knowledge. Without RAG metrics, you can’t explain “why answers are wrong” or demonstrate traceability. | High | Add RAG quality metrics | Track: citation rate (% answers with sources), retrieval hit-rate, top failed queries, document freshness, index lag, stale content %, “no-answer” rate; include audits for sensitive docs leakage | AI/ML + Data | L | 17 |
| Governance & risk | **[Weak implementation]** Governance shown as a single coverage %, not by risk class or system criticality | “Governance coverage 74%” and “8 ungoverned” but no breakdown by risk level fileciteturn0file0 | A missing control on a high-risk system is far worse than on a low-risk pilot. EU AI Act is risk-based. citeturn1view3 | High | Add governance-by-risk breakdown | Classify each use case (high/limited/minimal), criticality, data sensitivity; show control completion by class; enforce gating (cannot reach Production if required controls missing) | Governance + Product | M | 18 |
| Compliance readiness | **[Missing evidence]** Readiness scores (EU AI Act 82%, ISO 42001 47%) lack a control map | Regulatory readiness is shown as % values without showing requirements/controls met vs missing fileciteturn0file0 | Leaders need to know *what is missing* to close readiness—otherwise the % is meaningless. ISO/IEC 42001 is about a management system, not a single number. citeturn1view2turn1view3 | High | Add compliance control matrix | For each framework: list required controls, map to internal policies, show completion %, evidence links, audit dates, owners, and remediation plan | Risk & Compliance | L | 19 |
| Auditability | **[Missing feature]** No audit log search and no audit metrics | “Audit logging … active” but no audit volume, retention, search, or access oversight metrics fileciteturn0file0 | Auditing is only useful if searchable and governed; supports investigations and compliance. | Medium | Add audit observability | Provide metrics: audit events/day, coverage %, retention policy, access logs to audit store, investigations opened/closed; link to audit search tool (RBAC-controlled) | Security + Engineering | M | 20 |
| User roles & RBAC | **[Missing evidence]** No visibility of access controls for cockpit data | No RBAC/permissions model is shown in UI fileciteturn0file0 | Exec cockpits often contain sensitive HR, finance, and security data; RBAC must be explicit. | High | Implement and show RBAC model | Add role-based access (CxO, BU leader, train lead, risk officer). Display “Your access scope” and enforce per-dimension masking/aggregation | Security + Engineering | L | 21 |
| Reliability & fallbacks | **[Missing feature]** No tracking of model downtime, fallback behaviour, or degraded mode | Only a reliability statement exists; no operational stats or fallback rates fileciteturn0file0 | When models fail, business workflows fail. Leaders need to know resilience posture and degraded-mode performance. | Medium | Add resilience metrics | Track: model/provider incidents, fallback activation rate, degraded-mode quality impact, queueing delays; define reliability SLO per workflow | Engineering + AI/ML | M | 22 |
| Integration & handoffs | **[Missing feature]** “Sources” listed but no integration completeness score | Footer lists sources, but no completeness/coverage indicator fileciteturn0file0 | If only some teams integrate, your metrics become biased and institutionalisation progress is overstated. | Medium | Add integration coverage KPIs | Track: % teams connected, % logs ingested, % workflows instrumented, “unknown/unmeasured share” | Data + Ops | M | 23 |
| Workforce capability | **[Weak implementation]** Training shows completion %, not competency or application | Foundations/Applied/Leadership completion shown fileciteturn0file0 | Completion ≠ capability. Institutionalisation requires proficiency and demonstrated safe use. | Medium | Add capability validation metrics | Add assessments, certifications, practical lab completion, policy comprehension checks, and observed usage outcomes post-training | HR/L&D + Product | M | 24 |
| Accessibility | **[Weak implementation]** Heavy reliance on colour for RAG; limited explicit accessibility signals | RAG chips and heatmap colour cues are primary indicators fileciteturn0file0 | Exec dashboards must meet accessibility expectations; colour-only cues fail for colour-vision deficiency and in print/PDF packs. | Medium | Fix accessibility semantics | Add text labels/icons (▲▼), pattern fills for heatmaps, keyboard navigation, ARIA labels for controls; provide export that preserves meaning without colour | Design + Engineering | S/M | 25 |

## Missing components checklist

This section is intentionally framed as “capabilities”, not “more charts”, because institutionalisation is an operating model.

Decision-grade measurement
- A **metric dictionary** with explicit calculations, scope boundaries, and owners for every top KPI and index. (This is currently missing evidence; indices are presented without definitions.) fileciteturn0file0  
- **Uncertainty / confidence** for value and productivity metrics (e.g., confidence bands, sample sizes, “validated by finance” flags). fileciteturn0file0  

Adoption and institutionalisation signals beyond “coverage”
- Behavioural adoption: DAU/WAU/MAU, retention, repeat usage, adoption by persona/function/team, % activity through approved tools, seat utilisation. (Currently there is “AI Coverage” but no behavioural telemetry.) fileciteturn0file0  
- “Shadow AI” should be measurable: count of unapproved tools detected, data egress risk scoring, trend lines, time-to-remediate. (Currently it’s a signal tag + risk item.) fileciteturn0file0  

Model and safety operations
- Model-level SLOs and telemetry (latency, errors, token/cost, refusal rate, guardrail triggers, fallback rates). (Only partial statements exist today.) fileciteturn0file0  
- OWASP-class risk metrics beyond prompt injection: sensitive data disclosure, supply chain, data/model poisoning, improper output handling, excessive agency, system prompt leakage, vector/embedding weaknesses, misinformation, unbounded consumption. citeturn2view0  

Governance as a control system (not a percentage)
- Risk-class-based compliance views (especially for EU AI Act’s risk-based framing) with required control completion per class. citeturn1view3  
- Evidence packs (model card/data sheet/risk assessment/evaluations/red-team & pen-test records/approvals/incidents) per use case. (Currently only status and narrative.) fileciteturn0file0  
- Throughput metrics for governance: time-to-approve amber, backlog ageing, exception renewal cycle times, committee quorum health linked to throughput. (You flag quorum gap but do not show its operational impact.) fileciteturn0file0  

Drill-down and actionability
- Global filters and drill-through to locate precisely where the problem sits (APAC/LATAM drift is mentioned, but there is no way to drill into those segments). fileciteturn0file0  
- An “action centre” that turns signals into tracked remediation work with closure evidence. fileciteturn0file0  

## Practical implementation notes for fixing this in a realistic way

Metric layer you should standardise first
Start by turning the cockpit into a **single source of truth** for a small set of non-negotiable enterprise metrics, then expand.

A pragmatic “minimum viable enterprise AI telemetry” schema (what to log everywhere)
- **Who**: user role/persona, team, BU/account, geography (aggregated/anonymised as needed)  
- **What**: use case ID, workflow stage (planning/build/run), model ID/tier, tool/agent name, policy mode (green/amber/red) fileciteturn0file0  
- **When**: timestamp + release version  
- **Cost**: tokens, £ cost, retries, cache hits  
- **Performance**: latency p50/p95, error codes, fallback events  
- **Safety**: policy violations, DLP/PII masking events, injection/jailbreak detections, unsafe output blocks  
- **Quality**: eval score (task-specific), human feedback outcome (thumbs up/down + reason code), incident linkage  

This is the foundation you need to make your existing KPIs “real” (rather than self-reported).

How to make your existing sections decision-grade with minimal redesign
- Keep the current two views, but add a consistent **“Explain / Drill-down / Evidence” triad** for every section:  
  - **Explain**: metric definition + calculation and a short narrative of the top 3 drivers  
  - **Drill-down**: breakdown by BU/function/geography/train/use case  
  - **Evidence**: link to underlying artefacts (tickets, logs, eval results, approvals, pen tests)  

How to align with recognised frameworks without making it bureaucratic
- Use NIST AI RMF language as a structuring device: show where you are **Governing**, **Mapping**, **Measuring**, **Managing** risks and trustworthiness characteristics in operations—not just scored indices. citeturn1view0  
- Use ISO/IEC 42001 thinking for “system-ness”: policies, processes, continual improvement, audits, and evidence of execution. Your cockpits should show *the system working* (e.g., review SLAs, audit cycles, closure rates), not only a “readiness %”. citeturn1view2  

Why this matters specifically for “Institutionalise AI”
Institutionalisation is achieved when AI becomes: measurable, repeatable, governable, auditable, and economically managed across teams. Your dashboard already has the right *shape* (value + delivery + governance + workforce). fileciteturn0file0  
To make it production-grade for CXOs, the next step is to convert it from a quarterly narrative pack into an operational instrument panel with definitions, drill-down, and evidence.

