# DATA_MODEL_ALIGNMENT.md

## Why This Exists

`data_model.html` was originally shaped around the Meridian Toggle / Unified concept work.

The current Phase 1 implementation in `index.html` + `app.js` has now introduced a clearer shared model across:

- Institutionalisation View
- Delivery Engine View
- metric dictionary / explainability
- finance-grade value tracking
- persistent segmentation
- oversight operating diagnostics
- alert telemetry
- source freshness and pipeline health
- benchmark provenance
- behavioral adoption metrics
- productivity methodology and workflow/train contribution logic
- model monitoring by model family and use case
- hallucination methodology with eval suites and confidence intervals
- prompt security coverage with attack attempts, findings, and remediation SLA
- RAG quality metrics with citation rate, retrieval hit rate, freshness, stale content, and no-answer rate
- governance by risk class with segmentation across risk tier, service criticality, and data sensitivity
- compliance control matrix with framework readiness, control-family ownership, and named remediation gaps
- RBAC and access scope with viewer role, masking policy, evidence-access mode, and audit-logged exports
- reliability and degraded mode with provider incidents, failover share, queueing delay, and degraded quality impact
- workforce capability validation with role certification, safe-use sign-off, and decision-rights clearance
- guided ask-the-cockpit answers with scoped prompts, grounded support facts, and evidence-linked actions
- role-specific saved views with named preset lenses built on shared filters, access scope, and portfolio context

This document bridges those implementation decisions back into the canonical model before the model drifts further away from the working prototype.

## What Changed In Phase 1

The current app now assumes a data layer that can support:

1. shared metrics across board and delivery views
2. explicit metric definitions and calculation transparency
3. forecast vs realized value
4. finance validation and confidence tracking
5. persistent segmentation by:
   - period
   - geography
   - function
   - use case
   - model tier
   - workflow
6. action and roadmap objects that can eventually become operational workflows
7. operational trust signals for:
   - queue age
   - reviewer capacity
   - sampling coverage
   - alert thresholds and recurrence
   - freshness, latency, and completeness of source feeds
8. benchmark provenance with:
   - peer group definition
   - source provenance
   - refresh date
   - supporting drivers
9. behavioral adoption measures such as:
   - DAU / WAU / MAU
   - seat utilization
   - repeat use
   - retention
   - active teams
   - persona-level adoption
10. productivity methodology support with:
   - observation window and normalization rules
   - quality-drag adjustments
   - workflow contribution breakdown
   - train-level contribution slices
11. model monitoring support with:
   - route-level latency and runtime error observations
   - token cost, refusal, and fallback behavior
   - safety event counts by model/use case
   - model-family visibility inside portfolio slices
12. hallucination methodology support with:
   - named evaluation suites and pass criteria
   - route-level sample sizes
   - pass rate with confidence intervals
   - fail-mode visibility by model/use case
13. prompt security support with:
   - injection-tested coverage by route
   - live attack-attempt visibility
   - open and critical findings counts
   - remediation SLA and in-SLA tracking
14. RAG quality support with:
   - route-level citation rate
   - retrieval hit rate
   - knowledge freshness within SLO
   - stale-content share
   - no-answer rate when relevant evidence is not found
15. governance risk segmentation support with:
   - inherent risk tier
   - service criticality
   - data sensitivity
   - control-readiness coverage by class
   - exception concentration by class
16. compliance framework support with:
   - framework readiness percentages
   - control-family mapping
   - named control owners
   - framework obligation references
   - gap summaries for remediation
17. RBAC and viewer-scope support with:
   - viewer role and named cockpit view
   - allowed granularity by role
   - masked data classes by default
   - export policy and evidence-access mode
   - audit logging of view and export actions
18. reliability and degraded-mode support with:
   - provider incidents by route
   - degraded-mode share and provider-failover share
   - queueing delay under degraded conditions
   - quality impact during degraded operation
   - recovery inside the committed resilience window
19. workforce capability-validation support with:
   - role certification coverage
   - scenario-assessment pass rate
   - supervised safe-use sign-off
   - decision-rights certification for leaders
   - validation evidence tied to role and function
20. guided ask-layer support with:
   - prompt-led question templates by view
   - answer scope tied to the active segment slice
   - supporting facts linked to metric, action, and evidence objects
   - viewer-safe answers constrained by access scope rather than free-form chat behavior
21. role-specific saved-view support with:
   - named view presets by cockpit lens and viewer role
   - restorable combinations of period, portfolio, workflow, and segment filters
   - saved question focus for the guided ask layer
   - role-safe scope restored through existing access constraints rather than bespoke screens

The old model supported parts of this implicitly, but not as first-class entities.

## Keep vs Extend

### Keep

These entities are still right and should remain:

- `ORGANISATION`
- `AII_SCORE`
- `DIMENSION_SCORE`
- `AI_INITIATIVE`
- `GOVERNANCE_RECORD`
- `MODEL_ASSET`
- `WORKFORCE_METRIC`
- `BENCHMARK`
- `DATA_SOURCE_LOG`
- `PORTFOLIO`
- `DELIVERY_KPI`
- `SWIMLANE_METRIC`
- `OVERSIGHT_ROUTING`
- `ESCALATION_LOG`
- `AI_SERVICE_OPERATION`
- `PROMPT_REGISTRY`
- `LLM_OPERATION_LOG`
- `SCORE_NARRATIVE`

### Extend

The following now need first-class support:

- `METRIC_DEFINITION`
- `SEGMENT_SLICE`
- `METRIC_OBSERVATION`
- `VALUE_REALIZATION`
- `FINANCE_VALIDATION`
- `EVIDENCE_PACK`
- `EXECUTIVE_ACTION`
- `ROADMAP_MILESTONE`
- `ALERT_EVENT`
- `ACCESS_SCOPE`

## Recommended Canonical Shape

### 1. Measurement Spine

Use:

- `METRIC_DEFINITION` for the dictionary
- `METRIC_OBSERVATION` for actual measured values
- `SEGMENT_SLICE` for reusable filter context

Meaning:

- the board and delivery views can read different cuts of the same metrics
- the explain layer can point to a real owner, formula, and freshness record
- segmentation stops being UI-only and becomes part of the model

### 2. Value Spine

Use:

- `AI_INITIATIVE` for the use case / portfolio object
- `VALUE_REALIZATION` for forecast, realized, spend, benefit type, confidence, and payback
- `FINANCE_VALIDATION` for whether finance has signed off or challenged the value

Meaning:

- the board ROI story becomes defensible
- delivery economics and institutionalisation value are no longer separate stories

### 3. Traceability Spine

Use:

- `EVIDENCE_PACK`
- `GOVERNANCE_RECORD`
- `DATA_SOURCE_LOG`

Meaning:

- metrics, initiatives, and controls can all point to evidence rather than narrative-only claims

### 4. Action Spine

Use:

- `EXECUTIVE_ACTION`
- `ROADMAP_MILESTONE`

Meaning:

- the current action center and 30/60/90 roadmap stop being presentation-only

### 5. Operational Trust Spine

Use:

- `OVERSIGHT_ROUTING`
- `ESCALATION_LOG`
- `AI_SERVICE_OPERATION`
- `LLM_OPERATION_LOG`
- `METRIC_OBSERVATION`
- `DATA_SOURCE_LOG`
- `ALERT_EVENT`

Meaning:

- queue ageing, reviewer headroom, and sampling efficacy can be tracked as real operating signals
- alert count, thresholds, recurrence, MTTA, and MTTR stop being presentation-only
- freshness, latency, and completeness become first-class support for cockpit trust
- provider incidents, degraded-mode failover, queue drag, and degraded quality impact become explicit resilience signals rather than hidden side effects

### 6. Access and Viewer-Scope Spine

Use:

- `ACCESS_SCOPE`
- `SEGMENT_SLICE`
- `GOVERNANCE_RECORD`

Meaning:

- the cockpit can show which viewer role is active and what granularity that role is allowed to inspect
- masked data classes and export rules stop being implicit UI behavior
- access policy can be tied back to the same risk-tier and data-sensitivity logic used in governance

### 7. Guided Explainability Spine

Use:

- `METRIC_DEFINITION`
- `METRIC_OBSERVATION`
- `EXECUTIVE_ACTION`
- `EVIDENCE_PACK`
- `SEGMENT_SLICE`
- `ACCESS_SCOPE`

Meaning:

- the ask layer can answer from the same structured objects already visible in the cockpit
- prompts stay scoped to the active board or delivery slice
- answers can link back to a metric card, evidence pack, or action without inventing a separate chat-only source of truth

### 8. Saved View Spine

Use:

- `SEGMENT_SLICE`
- `ACCESS_SCOPE`
- `PORTFOLIO`
- `METRIC_DEFINITION`

Meaning:

- named role presets can restore a trusted slice without duplicating dashboards
- board, finance, risk, CIO, product, and operations lenses can stay inside the same two-view shell
- the saved view feature remains a composition of existing state and access rules instead of creating another source of truth

## Existing Entity Changes

### `AI_INITIATIVE`

Should now explicitly support:

- `geography`
- `delivery_train`
- `workflow_stage`
- `use_case`
- `model_tier`

Value fields should move toward `VALUE_REALIZATION` as the canonical time-aware record.

### `GOVERNANCE_RECORD`

Should now explicitly support:

- `risk_tier`
- `service_criticality`
- `data_sensitivity`
- `control_readiness_pct`
- `review_path`
- `framework_name`
- `framework_obligation_ref`
- `control_family`
- `gap_summary`

The current prototype now assumes governance can be broken down by inherent risk, operational criticality, and data sensitivity rather than only by one aggregate compliance percentage. It also assumes framework-level readiness can be traced back to concrete control families, owners, and named gaps.

### `ACCESS_SCOPE`

Should now explicitly support:

- `viewer_role`
- `view_name`
- `clearance_level`
- `allowed_granularity`
- `masked_data_classes`
- `export_policy`
- `evidence_access_mode`
- `approval_group`
- `audit_logging_mode`

The current prototype now assumes the cockpit can explain what a board viewer can see versus what a delivery viewer can see, which sensitive data classes stay masked by default, and how evidence exports are governed and logged.

### `MODEL_ASSET`

Should now explicitly support:

- `use_case`
- `workflow_stage`
- `runtime_route`
- `token_cost_profile`
- `fallback_behavior`
- `safety_event_count`

Runtime observations should be treated as time-aware signals backed by `METRIC_OBSERVATION`, not just static model metadata.

The current prototype also assumes that answer-quality evaluation metadata can hang off the model route:

- `eval_suite_name`
- `eval_sample_size`
- `eval_pass_rate`
- `eval_ci_low`
- `eval_ci_high`
- `hallucination_failure_mode`

The current prototype also assumes that retrieval-grounding telemetry can hang off the same route context:

- `citation_rate`
- `retrieval_hit_rate`
- `freshness_within_sla_pct`
- `stale_content_pct`
- `no_answer_rate`

### `WORKFORCE_METRIC`

Should now explicitly support:

- `role_certified_pct`
- `scenario_pass_pct`
- `safe_use_validated_pct`
- `decision_rights_certified_pct`
- `supervised_signoff_pct`
- `validation_basis`

The current prototype now assumes workforce readiness is not proven by training completion alone. Meridian now needs enough detail to show who has passed role-specific scenario checks, who has demonstrated safe use in supervised workflow samples, and which leaders are actually certified to approve higher-risk or scaled AI use.

### `AI_SERVICE_OPERATION` and `LLM_OPERATION_LOG`

Should now explicitly support:

- `provider_name`
- `fallback_provider`
- `degraded_mode_flag`
- `queue_delay_ms`
- `provider_incident_ref`
- `recovery_sla_breach_flag`

The current prototype now assumes degraded-mode behavior is a first-class operating concept. Provider incidents, resilience-driven failover, queueing delay, and degraded-quality impact should be observable through route-level operation logs and then surfaced into the cockpit through `METRIC_OBSERVATION`.

### `PROMPT_REGISTRY`

Should now explicitly support:

- `security_owner`
- `red_team_last_run`
- `open_findings_count`
- `critical_findings_count`
- `remediation_sla_hours`

The current prototype also assumes that prompt-security coverage is not just a boolean injection-test flag. It needs enough detail to show route-level coverage, live attack pressure, and remediation accountability.

### `DELIVERY_KPI` and `SWIMLANE_METRIC`

These should remain because they map well to the current UI, but over time they should be treated as presentation-friendly aggregates backed by `METRIC_OBSERVATION`.

### `PORTFOLIO`

Should remain the delivery grouping layer, but must work cleanly with segment slicing rather than acting as the only scope dimension.

## Current UI To Model Mapping

| UI capability | Canonical model support |
|---|---|
| Metric cards / explain layer | `METRIC_DEFINITION` + `METRIC_OBSERVATION` + `DATA_SOURCE_LOG` |
| Institutionalisation value section | `AI_INITIATIVE` + `VALUE_REALIZATION` + `FINANCE_VALIDATION` |
| Delivery economics value section | `PORTFOLIO` + `AI_INITIATIVE` + `VALUE_REALIZATION` |
| Global segmentation controls | `SEGMENT_SLICE` |
| Governance and control evidence | `GOVERNANCE_RECORD` + `EVIDENCE_PACK` |
| Governance by risk class | `GOVERNANCE_RECORD` + `SEGMENT_SLICE` + `EVIDENCE_PACK` |
| Compliance control matrix | `GOVERNANCE_RECORD` + `SEGMENT_SLICE` + `EVIDENCE_PACK` |
| View-level RBAC and access scope | `ACCESS_SCOPE` + `SEGMENT_SLICE` + `GOVERNANCE_RECORD` + `EVIDENCE_PACK` |
| Action Center | `EXECUTIVE_ACTION` |
| 30/60/90 roadmap | `ROADMAP_MILESTONE` |
| Oversight operating diagnostics | `OVERSIGHT_ROUTING` + `ESCALATION_LOG` + `METRIC_OBSERVATION` |
| Alert telemetry | `ALERT_EVENT` + `METRIC_OBSERVATION` |
| Source freshness and data health | `DATA_SOURCE_LOG` + `METRIC_OBSERVATION` |
| Benchmark provenance | `BENCHMARK` + `EVIDENCE_PACK` + `DATA_SOURCE_LOG` |
| Behavioral adoption panel | `WORKFORCE_METRIC` + `METRIC_OBSERVATION` + `SEGMENT_SLICE` |
| Workforce capability validation | `WORKFORCE_METRIC` + `METRIC_OBSERVATION` + `EVIDENCE_PACK` + `SEGMENT_SLICE` |
| Ask-the-cockpit layer | `METRIC_DEFINITION` + `METRIC_OBSERVATION` + `EXECUTIVE_ACTION` + `EVIDENCE_PACK` + `SEGMENT_SLICE` + `ACCESS_SCOPE` |
| Role-specific saved views | `SEGMENT_SLICE` + `ACCESS_SCOPE` + `PORTFOLIO` + `METRIC_DEFINITION` |
| Productivity methodology panel | `METRIC_DEFINITION` + `METRIC_OBSERVATION` + `SEGMENT_SLICE` + `SWIMLANE_METRIC` |
| Model monitoring panel | `MODEL_ASSET` + `METRIC_OBSERVATION` + `ALERT_EVENT` + `SEGMENT_SLICE` |
| Reliability and degraded-mode panel | `LLM_OPERATION_LOG` + `AI_SERVICE_OPERATION` + `ALERT_EVENT` + `METRIC_OBSERVATION` + `SEGMENT_SLICE` |
| RAG quality panel | `LLM_OPERATION_LOG` + `DATA_SOURCE_LOG` + `METRIC_OBSERVATION` + `SEGMENT_SLICE` |
| Hallucination methodology panel | `MODEL_ASSET` + `METRIC_OBSERVATION` + `SEGMENT_SLICE` |
| Prompt security coverage panel | `PROMPT_REGISTRY` + `LLM_OPERATION_LOG` + `ALERT_EVENT` + `SEGMENT_SLICE` |

## Practical Modeling Rule

From here on:

- if a change affects meaning, traceability, segmentation, or ownership, update the canonical model
- if a change only affects layout, copy, or visual treatment, do not touch the model

## Immediate Outcome

The next refresh of `data_model.html` should:

1. preserve the strong existing Toggle-era entities
2. add the new shared measurement / value / segmentation / action layer
3. explicitly describe the Institutionalisation + Delivery Phase 1 architecture
