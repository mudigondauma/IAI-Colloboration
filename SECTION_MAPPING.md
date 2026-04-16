# SECTION_MAPPING.md

## Scope

This mapping follows the current recommendation in `INTEGRATION_PLAN.md`:

- Phase 1 focuses on:
  - Landing / role entry
  - Institutionalisation View
  - Delivery Engine View
- Phase 2 defers:
  - Risk & Governance View
  - Operations & Service View

## Data Model Status Legend

- `Supported`: the current `data_model.html` already has a strong direct fit
- `Partial`: the current model mostly supports the section, but some UI concepts are still implicit or loosely modeled
- `Needs extension`: the current model does not cleanly support the section yet
- `Deferred`: not in Phase 1 implementation scope

## Phase 1 Working Decision

- `MeridianAICockpit_Unified.html` provides the persona shell and role-entry concept
- `MeridianAICockpit_Toggle.html` provides the best strategic section inventory
- `index.html` provides the best delivery implementation base
- `data_model.html` remains the canonical model to evolve

## Phase 1 View Map

| Final View | Purpose | Primary Source | Implementation Home |
| --- | --- | --- | --- |
| Landing / Role Entry | Explain that one cockpit serves multiple executive roles | `MeridianAICockpit_Unified.html` | New shell inside `index.html` + `app.js` |
| Institutionalisation View | Show enterprise AI maturity, value, risk, readiness, and benchmarks | Strategic sections from `MeridianAICockpit_Toggle.html`, framed by `MeridianAICockpit_Unified.html` | New view built on the `index.html` stack |
| Delivery Engine View | Show CIO delivery value, quality, oversight, economics, and actions | `index.html`, with selective ideas from Toggle and Unified | Existing `index.html` stack |

## Landing / Role Entry Mapping

| Final Section | Primary Source | Secondary Reference | Decision | Implementation Home | Data Model Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Landing hero and role entry | `MeridianAICockpit_Unified.html` | None | Keep and adapt | `index.html` + `app.js` | Partial | This is presentation and routing logic more than a data-model problem |
| Role cards for CEO / CFO / Board, CIO, CISO, COO | `MeridianAICockpit_Unified.html` | None | Keep and adapt | `app.js` config-driven shell | Partial | In Phase 1, only Institutionalisation and Delivery need to be fully clickable |
| Shared "one platform, same data, different views" message | `MeridianAICockpit_Unified.html` | `INTEGRATION_PLAN.md` | Keep | `index.html` content | Supported | Conceptually backed by the unified model already |
| Last refresh / shared metadata strip | `MeridianAICockpit_Unified.html` | `index.html` footer metadata | Keep and adapt | `app.js` + `index.html` | Supported | Use `DATA_SOURCE_LOG` as the long-term source of truth |

## Institutionalisation View Mapping

| Final Section | Primary Source | Secondary Reference | Decision | Implementation Home | Data Model Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| View header and executive framing | `MeridianAICockpit_Unified.html` Institutionalisation View | `MeridianAICockpit_Toggle.html` Strategic View | Keep and adapt | New Institutionalisation view in `index.html` + `app.js` | Partial | Mostly IA and copy; not blocked by schema |
| North-star strip: AII, ROI, RAI, debt, key signals | `MeridianAICockpit_Toggle.html` | `MeridianAICockpit_Unified.html` CEO view | Keep and adapt | `app.js` strategic dataset | Supported | Uses `AII_SCORE`, `DIMENSION_SCORE`, `RAI_PILLAR_SCORE`, `TECH_DEBT_SCORE`, `AI_INITIATIVE` |
| AI Institutionalisation Index | `MeridianAICockpit_Toggle.html` section 01 | `MeridianAICockpit_Unified.html` CEO AII section | Keep | New Institutionalisation view | Supported | `AII_SCORE`, `DIMENSION_SCORE`, `SCORE_NARRATIVE`, `BENCHMARK` |
| Delivery engine summary inside the strategic view | `MeridianAICockpit_Toggle.html` section 02 | `index.html` Delivery view | Keep but shrink | New Institutionalisation view | Partial | Should act as a bridge into the Delivery view, not duplicate it |
| Use case portfolio and value realisation | `MeridianAICockpit_Toggle.html` section 03 | `MeridianAICockpit_Unified.html` CEO portfolio material | Keep | New Institutionalisation view | Supported | `AI_INITIATIVE`, `PORTFOLIO`, `GOVERNANCE_RECORD`; finance-grade value detail may need richer fields later |
| Workforce capability and literacy | `MeridianAICockpit_Toggle.html` section 04 | `MeridianAICockpit_Unified.html` Workforce & culture | Keep | New Institutionalisation view | Partial | `WORKFORCE_METRIC` is strong, but culture and sentiment may need clearer modeling |
| Governance and risk | `MeridianAICockpit_Toggle.html` section 05 | `MeridianAICockpit_Unified.html` Governance & risk | Keep | New Institutionalisation view | Supported | `GOVERNANCE_RECORD`, `MODEL_ASSET`, `DATA_SOURCE_LOG`; later evidence-pack needs are still open |
| AI Technical Debt | `MeridianAICockpit_Toggle.html` section 06 | `MeridianAICockpit_Unified.html` Tech debt | Keep | New Institutionalisation view | Supported | `TECH_DEBT_SCORE` already maps well |
| Responsible AI Dashboard | `MeridianAICockpit_Toggle.html` section 07 | `MeridianAICockpit_Unified.html` RAI section | Keep | New Institutionalisation view | Supported | `RAI_PILLAR_SCORE` already maps well |
| Competitive benchmarking | `MeridianAICockpit_Toggle.html` section 08 | `MeridianAICockpit_Unified.html` Benchmarks | Keep | New Institutionalisation view | Supported | `BENCHMARK` and `DIMENSION_SCORE` support this directly |
| Strategic footer metadata and sources | `MeridianAICockpit_Toggle.html` footer | `index.html` footer metadata | Keep and standardize | Shared footer pattern in `index.html` stack | Supported | `DATA_SOURCE_LOG` should drive freshness and source provenance |

## Delivery Engine View Mapping

| Final Section | Primary Source | Secondary Reference | Decision | Implementation Home | Data Model Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| View header, filters, scope chips | `index.html` | `MeridianAICockpit_Toggle.html` Delivery header | Keep | Existing `index.html` + `app.js` | Partial | `PORTFOLIO` supports scope; filter metadata is still mostly UI configuration |
| Executive KPIs | `index.html` | `MeridianAICockpit_Toggle.html`, `MeridianAICockpit_Unified.html` CIO view | Keep | Existing delivery implementation | Supported | `DELIVERY_KPI` fits directly |
| Workflow swimlanes | `index.html` | `MeridianAICockpit_Toggle.html` | Keep | Existing delivery implementation | Supported | `SWIMLANE_METRIC` fits directly |
| Human Oversight Gateway | `index.html` | `MeridianAICockpit_Toggle.html`, `MeridianAICockpit_Unified.html` CIO view | Keep | Existing delivery implementation | Supported | `OVERSIGHT_ROUTING` and `ESCALATION_LOG` fit directly |
| Pending escalation queue detail | `index.html` | `MeridianAICockpit_Unified.html` CIO view | Keep | Existing delivery implementation | Supported | Long-term details come from `ESCALATION_LOG` and possibly `AI_SERVICE_OPERATION` |
| Trends: baseline vs current vs target | `index.html` | `MeridianAICockpit_Toggle.html` | Keep | Existing delivery implementation | Partial | Likely derived from `DELIVERY_KPI` and related aggregates rather than a dedicated trend entity |
| Economics: spend mix and efficiency | `index.html` | `MeridianAICockpit_Toggle.html`, `MeridianAICockpit_Unified.html` CIO view | Keep | Existing delivery implementation | Partial | Current support comes from `AI_INITIATIVE`, `DELIVERY_KPI`, `MODEL_ASSET`, `LLM_OPERATION_LOG`; explicit economics modeling may be needed later |
| Governance console | `index.html` | `MeridianAICockpit_Toggle.html`, `MeridianAICockpit_Unified.html` CIO and CISO views | Keep | Existing delivery implementation | Partial | `GOVERNANCE_RECORD` supports much of this, but control-level status may need a more explicit structure |
| Top 5 executive actions | `index.html` | `MeridianAICockpit_Toggle.html` | Keep | Existing delivery implementation | Needs extension | There is no clean `ACTION` or `RECOMMENDATION` entity in `data_model.html` yet |
| 30 / 60 / 90 day roadmap | `index.html` | `MeridianAICockpit_Toggle.html` | Keep | Existing delivery implementation | Needs extension | There is no roadmap or milestone entity yet |
| Footer metadata and source list | `index.html` | `MeridianAICockpit_Toggle.html` footer | Keep and standardize | Shared footer pattern | Supported | `DATA_SOURCE_LOG` should eventually drive this instead of hard-coded strings |

## Intentional Distinctions To Preserve

| Topic | Institutionalisation View | Delivery Engine View |
| --- | --- | --- |
| Main question | Is AI becoming an enterprise capability? | Is AI improving delivery outcomes right now? |
| Governance | Enterprise posture, readiness, risk concentration, controls at scale | Workflow-level control status and operational guardrails |
| Value | Portfolio value, ROI, maturity, benchmarks | Productivity, flow, quality, cost efficiency |
| Oversight | Summarized as governance capability | Shown operationally as routing, queue, SLA, and escalation |

These should stay distinct so the final cockpit does not feel repetitive.

## Phase 2 Deferred Mapping

| Deferred View | Likely Primary Source | Data Model Status | Notes |
| --- | --- | --- | --- |
| Risk & Governance View | `MeridianAICockpit_Unified.html` CISO view | Partial to Supported | Strong conceptual fit using `GOVERNANCE_RECORD`, `TECH_DEBT_SCORE`, `RAI_PILLAR_SCORE`, `MODEL_ASSET`, `OVERSIGHT_ROUTING`, `PROMPT_REGISTRY`, `LLM_OPERATION_LOG` |
| Operations & Service View | `MeridianAICockpit_Unified.html` COO view | Partial to Supported | Strong conceptual fit using `AI_SERVICE_OPERATION`, `SLA_XLA_RECORD`, `MODEL_ASSET`, `SWIMLANE_METRIC`, `ESCALATION_LOG`; some hero KPIs may need clearer aggregation rules |

## Data Model Follow-Ups From This Mapping

The current model already supports much of the final story. The clearest Phase 1 gaps are:

- a first-class entity for executive actions or recommendations
- a first-class entity for roadmap milestones
- clearer support for control-level governance status if the governance console becomes more detailed
- clearer economics aggregation if spend mix, unit economics, and model routing become decision-grade rather than illustrative
- clearer role and view metadata if the persona shell becomes configurable rather than hard-coded

## Immediate Build Implication

If we follow this mapping, the build order should be:

1. add a persona landing shell to the `index.html` app
2. add a new Institutionalisation view using K's strategic section structure
3. retain and refine the current Delivery Engine view
4. extend the data model only where the mapping shows clear gaps
