# SUPABASE_PHASE1_TABLE_PLAN.md

## Purpose

This document turns the higher-level Supabase handoff into a build-ready Phase 1 table plan.

It is intentionally practical:

- what table to create
- why it is in Phase 1
- which columns are required first
- which constraints and indexes matter
- where the seed data comes from in the current prototype
- what K should wire in the UI first

Read this after:

- [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
- [DATA_MODEL_ALIGNMENT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/DATA_MODEL_ALIGNMENT.md:1)
- [data_model.html](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/data_model.html:1)

## Phase 1 Goal

Persist the stable semantic spine that supports:

- metric explainability
- cross-view consistency
- value realism
- evidence traceability
- benchmark comparison

without forcing a major UI rewrite.

This means:

- read-path integration first
- no full write workflow yet
- adapter layer between Supabase rows and current UI shapes

## Global Table Conventions

Use these conventions consistently.

- table names: plural snake_case
- primary keys: `uuid`
- tenant field: `org_id uuid not null`
- timestamps: `created_at timestamptz default now()`, `updated_at timestamptz default now()` unless the table is append-only
- explicit enums can start as `text` plus check constraints if that is faster to iterate
- use `jsonb` only for unstable or list-like payloads, not core business meaning

Recommended shared columns where relevant:

- `id`
- `org_id`
- `created_at`
- `updated_at`

Recommended Supabase/Postgres setup:

- enable RLS on any table that may be read from the browser
- use the anon key only from the client
- keep admin/seed/import flows outside the browser

## Build Order

### Phase 1A: measurement spine

1. `metric_definitions`
2. `segment_slices`
3. `metric_observations`

### Phase 1B: value and evidence spine

4. `ai_initiatives`
5. `value_realizations`
6. `finance_validations`
7. `evidence_packs`

### Phase 1C: benchmark and access spine

8. `dimension_scores`
9. `benchmarks`
10. `access_scopes`

This order is deliberate:

- Phase 1A unlocks the smallest working read integration
- Phase 1B gives the North-Star and value sections real persistence
- Phase 1C expands benchmark rigor and future-safe access rules

## Table Plans

### 1. `metric_definitions`

Canonical model:

- `METRIC_DEFINITION`

Why it is Phase 1:

- already canonical in the prototype
- supports every `i` button and logic audit
- is the cleanest first table to seed

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `metric_code text not null`
- `metric_label text not null`
- `lens text not null`
- `definition text not null`
- `formula text`
- `numerator_definition text`
- `denominator_definition text`
- `owner_role text`
- `unit text`
- `higher_is_better boolean`
- `source_systems jsonb`
- `refresh_cadence text`
- `confidence_policy text`
- `is_active boolean default true`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- unique: `(org_id, metric_code)`
- index: `(metric_label)`
- check: `lens in ('INSTITUTIONALISATION', 'DELIVERY', 'CROSS_VIEW')`

Seed source:

- `metricLibrary` in `app-data.js`

UI areas supported first:

- AII score
- AII sub-scores
- benchmark bar `i` buttons
- metric drawer definitions

### 2. `segment_slices`

Canonical model:

- `SEGMENT_SLICE`

Why it is Phase 1:

- filters already drive both views
- saved views and Ask depend on slice context
- it prevents filter logic from staying UI-only forever

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `portfolio_id uuid`
- `period_key text not null`
- `geography text`
- `function_area text`
- `use_case text`
- `model_tier text`
- `workflow_stage text`
- `slice_label text not null`
- `is_default boolean default false`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- unique: `(org_id, slice_label)`
- index: `(org_id, period_key, geography, function_area, use_case, model_tier, workflow_stage)`

Seed source:

- current default and saved filter combinations from `app.js` state and saved-view presets

UI areas supported first:

- current slice display
- saved views
- Ask-the-cockpit scoping

### 3. `metric_observations`

Canonical model:

- `METRIC_OBSERVATION`

Why it is Phase 1:

- this is the real measured-value layer behind both views
- it lets the UI stop depending only on hard-coded current values

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `metric_definition_id uuid not null references metric_definitions(id)`
- `segment_slice_id uuid not null references segment_slices(id)`
- `related_entity_type text`
- `related_entity_id uuid`
- `baseline_value numeric(14,4)`
- `current_value numeric(14,4) not null`
- `target_value numeric(14,4)`
- `sample_size integer`
- `ci_low_value numeric(14,4)`
- `ci_high_value numeric(14,4)`
- `confidence_band text`
- `last_refresh timestamptz`
- `period_date date not null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- index: `(metric_definition_id, segment_slice_id, period_date desc)`
- index: `(related_entity_type, related_entity_id)`
- check: `confidence_band in ('HIGH', 'MEDIUM', 'LOW')`

Recommended uniqueness for first implementation:

- unique on `(metric_definition_id, segment_slice_id, period_date, coalesce(related_entity_type,''), coalesce(related_entity_id,'00000000-0000-0000-0000-000000000000'))`

Seed source:

- AII score and sub-score values
- benchmark values
- north-star support metrics
- oversight metrics currently hard-coded in `app-data.js`

UI areas supported first:

- AII scorecard
- benchmark bars
- North-Star support metrics later

### 4. `ai_initiatives`

Canonical model:

- `AI_INITIATIVE`

Why it is Phase 1:

- it is the shared object behind Institutionalisation and Delivery
- the value story depends on it
- it is the natural join point for evidence and value history

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `portfolio_id uuid`
- `name text not null`
- `function_area text`
- `geography text`
- `delivery_train text`
- `workflow_stage text`
- `use_case text`
- `stage text`
- `delivery_mode text`
- `estimated_value numeric(12,2)`
- `realised_value numeric(12,2)`
- `cost numeric(12,2)`
- `benefit_type text`
- `use_case_classification text`
- `llm_tier text`
- `rag_status text`
- `owner_id text`
- `human_override_rate numeric(5,2)`
- `policy_exceptions integer`
- `start_date date`
- `production_date date`
- `source_updated_at timestamptz`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- index: `(portfolio_id, workflow_stage, stage)`
- index: `(function_area, geography, use_case, llm_tier)`
- check: `delivery_mode in ('BASELINE', 'PILOT')` if enforced now

Seed source:

- initiative and portfolio objects in `app-data.js`

UI areas supported first:

- North-Star selected initiative/value evidence
- Delivery initiative lists
- value selector and initiative cards

### 5. `value_realizations`

Canonical model:

- `VALUE_REALIZATION`

Why it is Phase 1:

- the ROI story becomes credible only if forecast, realized value, spend, and payback are separate records

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `initiative_id uuid not null references ai_initiatives(id)`
- `segment_slice_id uuid references segment_slices(id)`
- `forecast_value_gbp numeric(12,2)`
- `realized_value_gbp numeric(12,2)`
- `spend_gbp numeric(12,2)`
- `benefit_type text`
- `payback_months smallint`
- `confidence_band text`
- `value_note text`
- `period_date date not null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- index: `(initiative_id, period_date desc)`
- index: `(segment_slice_id, period_date desc)`
- check: `confidence_band in ('HIGH', 'MEDIUM', 'LOW')`

Seed source:

- initiative value fields and North-Star support metrics in `app-data.js`

UI areas supported first:

- ROI section
- selected initiative summary
- finance-validated share and payback logic

### 6. `finance_validations`

Canonical model:

- `FINANCE_VALIDATION`

Why it is Phase 1:

- it separates narrative value claims from finance-approved value

Required columns:

- `id uuid primary key`
- `value_realization_id uuid not null references value_realizations(id)`
- `validation_status text not null`
- `finance_owner text`
- `validated_value_gbp numeric(12,2)`
- `challenged_delta_gbp numeric(12,2)`
- `review_note text`
- `reviewed_at timestamptz`
- `next_review_due date`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- index: `(value_realization_id)`
- check: `validation_status in ('VALIDATED', 'PARTIAL', 'CHALLENGED', 'PENDING')`

Seed source:

- finance validation flags and notes currently embedded in value data / evidence narratives

UI areas supported first:

- finance-validated chips
- North-Star value signal summary
- initiative-level evidence text

### 7. `evidence_packs`

Canonical model:

- `EVIDENCE_PACK`

Why it is Phase 1:

- the cockpit already uses evidence as part of trust and explainability
- this is the canonical owner for traceable proof claims

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `entity_type text not null`
- `entity_id uuid not null`
- `pack_type text not null`
- `evidence_status text not null`
- `storage_ref text`
- `immutable_snapshot boolean default false`
- `version integer default 1`
- `owner text`
- `last_checked_at timestamptz`
- `summary_payload jsonb`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Why `summary_payload jsonb` is acceptable here:

- the current evidence pack content in the prototype is still fairly UI-shaped
- the metadata should be normalized now, but the inner pack summary can stay flexible initially

Recommended constraints and indexes:

- index: `(entity_type, entity_id)`
- check: `evidence_status in ('COMPLETE', 'PARTIAL', 'MISSING', 'EXPIRED')`

Seed source:

- `buildEvidencePackLibrary()` in `app.js`

UI areas supported first:

- evidence pack buttons
- guided Ask support facts
- metric / initiative proof links

### 8. `dimension_scores`

Canonical model:

- `DIMENSION_SCORE`

Why it is Phase 1:

- these are the benchmark comparison bars shown in Institutionalisation
- they are more specific than raw benchmark provenance

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `dimension_name text not null`
- `org_score smallint not null`
- `sector_avg smallint not null`
- `vs_sector smallint`
- `weight numeric(5,2)`
- `period_date date not null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- unique: `(org_id, dimension_name, period_date)`
- check list for `dimension_name`:
  - `STRATEGIC_ALIGNMENT`
  - `PORTFOLIO_ROI`
  - `GOVERNANCE_RISK`
  - `WORKFORCE`
  - `TECHNOLOGY`
  - `CULTURE`
  - `OPERATIONAL_AI`
  - `SLA_XLA`
  - `RESPONSIBLE_AI`

Seed source:

- `benchmarkBars` and benchmark metric registry entries in `app-data.js`

UI areas supported first:

- benchmarking bars
- benchmark metric `i` buttons

### 9. `benchmarks`

Canonical model:

- `BENCHMARK`

Why it is Phase 1:

- keeps the peer-group and provenance layer separate from the displayed bars

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `dimension_name text not null`
- `org_score smallint not null`
- `sector_avg smallint not null`
- `sector_leader smallint`
- `sector text`
- `sample_size integer`
- `data_source text`
- `period_date date not null`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- unique: `(org_id, dimension_name, period_date, data_source)`

Seed source:

- benchmark provenance data in `app-data.js`

UI areas supported first:

- benchmark provenance card
- future methodology / peer-set drill-down

### 10. `access_scopes`

Canonical model:

- `ACCESS_SCOPE`

Why it is Phase 1:

- it is not needed for the first visible read demo, but it should exist before broad real-data exposure

Required columns:

- `id uuid primary key`
- `org_id uuid not null`
- `viewer_role text not null`
- `view_name text not null`
- `clearance_level text not null`
- `allowed_granularity text not null`
- `masked_data_classes jsonb`
- `export_policy text`
- `evidence_access_mode text`
- `approval_group text`
- `audit_logging_mode text`
- `last_reviewed_at timestamptz`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Recommended constraints and indexes:

- unique: `(org_id, viewer_role, view_name)`

Seed source:

- current modeled access logic and view assumptions

UI areas supported first:

- none required on day one
- future support for role-safe evidence access and saved views

## Seed Order

Use this seed order so foreign keys resolve cleanly.

1. `metric_definitions`
2. `segment_slices`
3. `metric_observations`
4. `ai_initiatives`
5. `value_realizations`
6. `finance_validations`
7. `evidence_packs`
8. `dimension_scores`
9. `benchmarks`
10. `access_scopes`

## Recommended First Read Integration

K should not wire all tables at once.

Start with this path:

1. `metric_definitions`
2. `metric_observations`
3. `dimension_scores`
4. `benchmarks`

Then connect these UI areas:

- AII scorecard
- AII sub-scores
- benchmark bars
- benchmark provenance

Why this first:

- immediately visible
- lowest schema ambiguity
- already aligned to the canonical metric registry

Second integration step:

5. `evidence_packs`
6. `ai_initiatives`
7. `value_realizations`
8. `finance_validations`

Then connect:

- North-Star value signal
- selected initiative card
- evidence buttons

## Recommended Repository Functions

K should create repository functions along these lines:

- `getMetricDefinitions(orgId)`
- `getMetricObservations(orgId, sliceId, metricCodes = [])`
- `getBenchmarkDimensions(orgId, periodDate)`
- `getBenchmarkProvenance(orgId, periodDate)`
- `getEvidencePackByEntity(entityType, entityId)`
- `getInitiativesBySlice(orgId, sliceId)`
- `getValueRealizationsByInitiative(initiativeId)`

## Recommended Mapper Functions

Suggested mappers:

- `mapMetricDefinitionRowsToMetricLibrary`
- `mapObservationRowsToAiiScorecard`
- `mapObservationRowsToNorthStarSupportMetrics`
- `mapDimensionScoreRowsToBenchmarkBars`
- `mapBenchmarkRowsToBenchmarkProvenance`
- `mapInitiativeRowsToValueSelector`
- `mapValueRowsToSelectedInitiativeSummary`
- `mapEvidencePackRowsToEvidencePackLibrary`

## Out Of Scope For Phase 1

Do not let these expand the first database sprint:

- full executive action workflow persistence
- roadmap milestone persistence
- prompt / LLM log platform modeling
- complete governance-record normalization
- complete workforce-metric normalization
- write-back from the UI
- full auth-driven RBAC rollout in the first visible demo

These matter, but they should not block the first working Supabase-backed prototype.

## Success Condition

This table plan is successful if K can:

- create the first schema slice without guessing
- seed the first rows from the current prototype
- wire a read-first integration path
- keep the UI stable while moving from mocks to persistence

The most important discipline is:

**keep the semantic spine canonical, and let the UI adapt through mappers instead of coupling directly to database rows.**
