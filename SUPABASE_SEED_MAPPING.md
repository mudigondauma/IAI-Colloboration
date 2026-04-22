# SUPABASE_SEED_MAPPING.md

## Purpose

This document explains how the current live prototype maps into the first seed layer for Supabase.

It is intentionally narrower than the full database model.

Current scope:

- Phase 1A seed baseline
- enough persisted data to support the first visible read integration

This means the first seed focuses on:

- `metric_definitions`
- `segment_slices`
- `metric_observations`
- `dimension_scores`
- `benchmarks`

It does **not** yet seed:

- `ai_initiatives`
- `value_realizations`
- `finance_validations`
- `evidence_packs`

because those should be seeded after K confirms the first read path and adapter shape.

## Seed Philosophy

The seed should reflect the current live cockpit, not an idealized future model.

So the first seed follows these rules:

1. seed what is already canonical
2. seed what is already visible in the UI
3. do not force derived UI-only logic into rows too early
4. leave unstable presentation-only content mocked for now

## Demo Tenant And Default Slice

The seed introduces one demo tenant and one default board slice.

### Demo tenant

- `org_id`: one fixed demo UUID in the seed SQL

Why:

- keeps the Phase 1 seed deterministic
- lets K test multi-tenant structure later without adding tenant complexity now

### Default slice

The first slice represents the current default board posture:

- period: `Q2_2026`
- geography: null / all
- function: null / all
- use case: null / all
- model tier: null / all
- workflow: `ALL`
- label: `Q2 2026 · all regions, functions, use cases, and model tiers`

Why:

- this matches the current opening board view
- it is the right first slice for validating the AII scorecard and benchmark bars

## Source To Table Mapping

### 1. `metricLibrary` in `app-data.js`

Target table:

- `metric_definitions`

Mapping rule:

- one metric library entry -> one `metric_definitions` row

Included in the first seed now:

- `AII Score`
- `Governance Coverage`
- `RAI Index`
- `Tech Debt Index`
- `Strategy sub-score`
- `Ops sub-score`
- `People sub-score`
- all benchmark dimension metrics

Why these first:

- they support the current Institutionalisation opening and benchmarking path
- they already have stable definitions and formulas

Not seeded yet from the library:

- many Delivery metrics
- North-Star support metrics derived from live initiative aggregation
- oversight metrics that are not part of the first visible board read path

Why not yet:

- we want the first database-backed read to be small and testable

### 2. Current board filter context

Source:

- current default state in `app.js`
- saved-view / filter conventions already present in the UI

Target table:

- `segment_slices`

Mapping rule:

- one named reusable slice -> one `segment_slices` row

Included in the first seed now:

- one default enterprise board slice

Deferred:

- saved-lens variations
- delivery-specific slices
- additional periods

### 3. `institutionalizationView.subscores`

Source:

- `institutionalizationView.subscores` in `app-data.js`

Target table:

- `metric_observations`

Canonical metric definitions used:

- `AII_STRATEGY_SCORE`
- `AII_OPS_SCORE`
- `AII_PEOPLE_SCORE`

Mapping rule:

- each visible sub-score becomes one `metric_observations` row for the default slice and period

Included in the first seed now:

- yes

### 4. Institutionalisation opening support metrics

Source:

- the current North-Star support row values in the live board opening

Target table:

- `metric_observations`

Canonical metric definitions used:

- `AII_SCORE`
- `GOVERNANCE_COVERAGE`
- `RAI_INDEX`
- `TECH_DEBT_INDEX`

Included in the first seed now:

- yes

Why:

- these are the most visible board summary values after the AII scorecard

### 5. Benchmark comparison data

Source:

- `institutionalizationView.benchmarkBars`
- `institutionalizationView.dimensions`
- `institutionalizationView.benchmarkProvenance`

Target tables:

- `metric_observations`
- `dimension_scores`
- `benchmarks`

Important note:

The current code contains:

- a fuller nine-dimension enterprise comparison set in `dimensions`
- a currently rendered seven-card benchmark subset in `benchmarkBars`

The seed follows the **full nine-dimension model** because:

- it aligns better with the AII sub-score formulas
- it keeps the semantic benchmark spine fuller than the current UI subset
- the UI can still choose to render only seven bars while the database keeps all nine dimensions

Seeded benchmark dimensions:

- `STRATEGIC_ALIGNMENT`
- `PORTFOLIO_ROI`
- `GOVERNANCE_RISK`
- `WORKFORCE`
- `TECHNOLOGY`
- `CULTURE`
- `OPERATIONAL_AI`
- `SLA_XLA`
- `RESPONSIBLE_AI`

Mapping rule:

- one dimension -> one `dimension_scores` row
- one dimension -> one `benchmarks` row
- one benchmark metric definition -> one `metric_observations` row for the same period and slice

Included in the first seed now:

- yes

### 6. North-Star value support metrics

Source:

- current rendered values derived from:
  - `getFilteredInitiatives()`
  - `summarizeValueLedger(...)`

Examples:

- `Forecast value`
- `Realized value`
- `Attainment`
- `Finance-validated`
- `Weighted payback`
- `Matching initiatives`
- `Live or scaling`
- `In full production`
- `Stalled value at risk`

Target tables later:

- `ai_initiatives`
- `value_realizations`
- `finance_validations`
- then optionally `metric_observations` for the rollups

Included in the first seed now:

- no

Why not:

- these are currently computed from initiative/value ledger logic
- we should seed the underlying initiative and value tables before freezing these as database observations

### 7. Evidence packs

Source:

- `buildEvidencePackLibrary()` in `app.js`

Target table later:

- `evidence_packs`

Included in the first seed now:

- no

Why not:

- evidence pack content is still partly UI-shaped
- metadata can be normalized next, but it is not required for the first read integration

## Proposed Canonical Metric Codes In Seed SQL

The seed SQL uses explicit database-facing metric codes.

| Current JS concept | Seed metric code |
|---|---|
| `aii_score` | `AII_SCORE` |
| `governance_coverage` | `GOVERNANCE_COVERAGE` |
| `rai_index` | `RAI_INDEX` |
| `tech_debt_index` | `TECH_DEBT_INDEX` |
| `aii_strategy_score` | `AII_STRATEGY_SCORE` |
| `aii_ops_score` | `AII_OPS_SCORE` |
| `aii_people_score` | `AII_PEOPLE_SCORE` |
| `benchmark_strategic_alignment` | `BENCHMARK_STRATEGIC_ALIGNMENT` |
| `benchmark_portfolio_roi` | `BENCHMARK_PORTFOLIO_ROI` |
| `benchmark_governance_risk` | `BENCHMARK_GOVERNANCE_RISK` |
| `benchmark_workforce` | `BENCHMARK_WORKFORCE` |
| `benchmark_technology` | `BENCHMARK_TECHNOLOGY` |
| `benchmark_culture` | `BENCHMARK_CULTURE` |
| `benchmark_operational_ai` | `BENCHMARK_OPERATIONAL_AI` |
| `benchmark_sla_xla` | `BENCHMARK_SLA_XLA` |
| `benchmark_responsible_ai` | `BENCHMARK_RESPONSIBLE_AI` |

## What The First Seed SQL Enables

After the first seed is loaded, K should be able to prove a read-first integration for:

- AII score
- Strategy / Ops / People sub-scores
- Governance Coverage
- RAI Index
- Tech Debt Index
- benchmark comparison bars
- benchmark provenance

This is enough to validate:

- the database contract
- the metric-definition contract
- the default slice contract
- the first adapter path

## What Comes Next After This Seed

Once the first read path is working:

1. seed `ai_initiatives`
2. seed `value_realizations`
3. seed `finance_validations`
4. then move the North-Star value card and initiative selector to Supabase-backed data
5. then seed `evidence_packs`

That sequence keeps persistence aligned with the real semantic spine instead of trying to database every UI surface at once.
