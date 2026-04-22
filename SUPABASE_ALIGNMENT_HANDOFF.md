# SUPABASE_ALIGNMENT_HANDOFF.md

## Purpose

This document is the working handoff for moving the Meridian AI Enterprise Cockpit from a static, mocked prototype into a Supabase-backed prototype without breaking the current UI.

It is written for implementation, not for abstract architecture review.

Primary audience:

- K, who will work on database and integration
- anyone touching the data shape while the UI is still evolving

## What Exists Today

The live prototype is still a static app:

- `index.html`
- `app-data.js`
- `app.js`
- `styles.css` plus the split CSS files

Important current realities:

- `app-data.js` is the mocked source of truth for demo data and metric definitions
- `app.js` contains runtime state, render functions, and interaction logic
- there is no framework, no build step, and no backend
- the UI currently expects in-memory JavaScript objects, not database rows

This means the integration job is not just "connect Supabase." It is:

1. persist the right data
2. map database rows back into the shapes the cockpit expects
3. do it without forcing a UI rewrite too early

## What Is Already Canonical And Why

The repo now has three explicit canonical owners for user-facing cockpit behavior:

1. `metricLibrary` in `app-data.js`
   Why:
   It is the canonical owner for explainable metrics, score-like values, formulas, ownership, and refresh logic.

2. `evidencePackLibrary` in `app.js`
   Why:
   It is the canonical owner for traceable proof claims, evidence packs, supporting notes, and evidence-linked detail.

3. shared component patterns in the shared CSS / shared render helpers
   Why:
   It is the canonical owner for repeated user-facing controls and interaction surfaces.

This matters for Supabase because the database should reinforce those ownership boundaries, not bypass them.

## What Has Already Been Done And Why

### 1. Lightweight file split

What was done:

- static data/config moved into `app-data.js`
- runtime/render/interactions kept in `app.js`
- CSS split by concern

Why it was done:

- make the app easier to maintain
- make future data integration possible without one giant file bottleneck
- reduce risk while continuing UI work

### 2. Live metric registry expanded

What was done:

- the metric library now covers:
  - top institutionalisation metrics
  - AII sub-scores
  - benchmark dimensions
  - north-star support metrics
  - shared oversight metrics

Why it was done:

- create one canonical metric dictionary
- support consistent `i` buttons / explainability
- reduce second-source-of-truth drift before database work starts

### 3. Canonical-owner rule added

What was done:

- repo guidance and implementation comments now enforce:
  - metrics -> metric library
  - evidence claims -> evidence library
  - controls -> shared component patterns

Why it was done:

- prevent future integration from turning into ad hoc inline logic
- make database mapping easier because important concepts now have owners

## How To Use `data_model.html`

Use `data_model.html` as the semantic blueprint, not as a schema we blindly implement 1:1.

It tells us:

- what a concept means
- which concepts are stable enough to become real tables
- which relationships matter across board and delivery views

Examples of especially important model entities:

- `METRIC_DEFINITION`
- `METRIC_OBSERVATION`
- `SEGMENT_SLICE`
- `ACCESS_SCOPE`
- `AI_INITIATIVE`
- `VALUE_REALIZATION`
- `FINANCE_VALIDATION`
- `DIMENSION_SCORE`
- `BENCHMARK`
- `EVIDENCE_PACK`

Practical rule:

- stable, reused concepts -> real Supabase tables
- still-changing UI payloads -> `jsonb` first, normalize later if needed

## Integration Principles

These are the rules I recommend K follow.

### 1. Read first, write later

First make the cockpit read from Supabase.
Do not start with edit/save flows.

Reason:

- lower risk
- easier verification against current mocked UI
- avoids auth/RLS complexity too early

### 2. Do not bind the UI directly to raw Supabase rows

Add a small adapter layer:

- DB row -> cockpit view model
- cockpit state/action -> DB payload

Reason:

- the UI already expects specific in-memory shapes
- the database schema will evolve
- adapters isolate that change

### 3. Keep a static fallback during the transition

The app should not become unusable if Supabase data is absent during early integration.

Reason:

- safer iteration
- easier comparison against the mocked baseline
- lower deployment friction

### 4. Use the current mock data as the seed baseline

The first seeded data should come from the current prototype.

Reason:

- avoids semantic drift between what the UI shows and what the DB holds
- gives K a deterministic test bed

### 5. Keep naming aligned across UI, code, and SQL

If the UI says `Governance coverage`, the metric registry, database, and adapters should all be explicitly traceable to that same concept.

Reason:

- fewer hidden mappings
- easier debugging
- easier logic audit later

## Phase 1 Database Slice

This is the first persistence scope I recommend.

### Priority 1: measurement and slicing

- `metric_definitions`
- `metric_observations`
- `segment_slices`

Why first:

- both Institutionalisation and Delivery depend on them
- they support the existing metric dictionary rule
- they unlock explainability and cross-view consistency

### Priority 2: value and evidence

- `ai_initiatives`
- `value_realizations`
- `finance_validations`
- `evidence_packs`

Why second:

- they support North-Star, value sections, and evidence buttons
- they give the ROI story a real persistence layer

### Priority 3: benchmarking and access

- `dimension_scores`
- `benchmarks`
- `access_scopes`

Why third:

- they support benchmark bars and board-safe access behavior
- they are important, but not the first thing needed for a working read prototype

## Recommended Supabase Table Mapping

| Concept | Canonical model entity | Recommended Supabase table | Current source | Why it exists |
|---|---|---|---|---|
| Metric dictionary | `METRIC_DEFINITION` | `metric_definitions` | `metricLibrary` in `app-data.js` | One explainable source of truth for metric meaning |
| Metric values by slice | `METRIC_OBSERVATION` | `metric_observations` | hard-coded values across `app-data.js` | Persisted values for cards, bars, and KPIs |
| Reusable filter context | `SEGMENT_SLICE` | `segment_slices` | current state/filter combinations | Makes slices explicit and restorable |
| Board/delivery value objects | `AI_INITIATIVE` | `ai_initiatives` | portfolio and initiative objects in `app-data.js` | Connects use cases to value, workflow, and ownership |
| Forecast vs realized value | `VALUE_REALIZATION` | `value_realizations` | value cards and initiative data | Supports ROI, payback, attainment, finance-grade value |
| Finance sign-off state | `FINANCE_VALIDATION` | `finance_validations` | validation flags in initiative/value data | Separates finance validation from raw value claims |
| Evidence and proof packs | `EVIDENCE_PACK` | `evidence_packs` | `buildEvidencePackLibrary()` in `app.js` | Canonical traceability layer |
| Benchmark comparison bars | `DIMENSION_SCORE` | `dimension_scores` | `benchmarkBars` and benchmark metrics | Supports board benchmark view |
| Benchmark provenance | `BENCHMARK` | `benchmarks` | benchmark provenance data | Peer set, source, refresh, confidence |
| View-level RBAC / masking | `ACCESS_SCOPE` | `access_scopes` | currently modeled, not fully persisted | Needed before broad real-data exposure |

## What Stays Mocked In Phase 1

These can stay local a little longer:

- experimental presentation copy
- some section-only narrative cards
- some workflow-specific helper values
- purely presentational chips or labels
- any unstable layout-specific aggregation that has no independent business meaning yet

This is intentional. We should persist meaning before presentation.

## Recommended Adapter Layer

I strongly recommend K create an explicit adapter path instead of mixing Supabase calls into render functions.

Suggested structure:

- `supabase-client.js`
- `supabase-repositories.js`
- `supabase-mappers.js`
- optionally `supabase-seed-notes.md` or `seed/`

Responsibilities:

### `supabase-client.js`

- initialize Supabase client
- contain project URL and anon key usage pattern

### `supabase-repositories.js`

- fetch rows from tables
- keep raw DB access in one place

Examples:

- `getMetricDefinitions()`
- `getMetricObservations(slice)`
- `getBenchmarkDimensions(slice)`
- `getEvidencePack(id)`

### `supabase-mappers.js`

- map DB rows to cockpit shapes the UI already understands

Examples:

- `mapMetricDefinitionRowToLibraryEntry`
- `mapBenchmarkRowsToBenchmarkBars`
- `mapInitiativeRowsToNorthStarValueShape`

### `app.js`

Should keep doing:

- state management
- rendering
- interactions

It should not become a SQL-shape interpreter.

## First Implementation Slice For K

If K wants the smoothest first success, I would start here:

1. create `metric_definitions`
2. create `metric_observations`
3. seed them from the current `metricLibrary` plus current live values
4. wire one small read path:
   - AII score
   - AII sub-scores
   - benchmark bars

Why this slice:

- visible in the UI immediately
- tied to already-canonical metric definitions
- small enough to verify without reworking everything

After that:

5. persist `evidence_packs`
6. persist `ai_initiatives` + `value_realizations`
7. wire the North-Star / value sections

## Handoff Checklist For K

Before implementing, K should confirm:

- which tables are in phase 1
- which fields are canonical vs still UI-only
- whether a value already exists in `metricLibrary` before inventing a new metric
- whether a proof claim belongs in `evidence_packs`
- whether a repeated control belongs in shared UI patterns instead of per-section code

During implementation, K should avoid:

- exposing raw Supabase rows directly inside render functions
- duplicating metric definitions in SQL and JS without a mapping plan
- persisting experimental copy as if it were a durable business entity
- inventing alternate names for concepts already defined in `data_model.html`

## What We Should Produce Next

This document is the blueprint, not the full delivery package.

The next artifacts I recommend are:

1. `SUPABASE_PHASE1_TABLE_PLAN.md`
   A narrower table-by-table implementation list

2. SQL schema for phase 1
   Probably:
   - `metric_definitions`
   - `metric_observations`
   - `segment_slices`
   - `evidence_packs`
   - `ai_initiatives`
   - `value_realizations`

3. Seed mapping notes
   Current object in `app-data.js` -> target table rows

4. Adapter contract
   Which UI functions will read from the adapter first

## Success Condition

This handoff is successful if K can:

- understand what is already canonical
- know what to persist first
- know what must stay mocked for now
- know where to integrate without destabilizing the UI

The goal is not “database everything.”

The goal is:

**persist the stable semantic spine first, then let the UI grow on top of it safely.**
