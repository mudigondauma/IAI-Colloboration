# PHASE1_PRODUCTIZATION_CHECKLIST.md

## Purpose

Use this as the short execution checklist for turning the cockpit from a polished prototype into a product-ready foundation.

This is the checklist version of:

- [PRODUCT_COMPARTMENTALISATION_ROADMAP.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/PRODUCT_COMPARTMENTALISATION_ROADMAP.md:1)

It is intentionally shorter and more tactical.

## Scope

This checklist covers **Phase 1 only**:

1. domain layer hardening
2. data-access layer
3. runtime cache / mapper layer
4. calculation / formula discipline

Do not try to solve auth, full workflow persistence, or AI orchestration in this phase.

## Phase 1 Success Criteria

Phase 1 is done when:

- key cockpit metrics have one canonical definition
- the first live reads come through repositories and mappers
- the UI reads product-shaped runtime data, not raw DB rows
- benchmark and opening-score values can be traced to the database path
- metric changes follow the protocol instead of ad hoc edits

## 1. Domain Layer Hardening

- [ ] Confirm `metricLibrary` is the canonical owner for all explainable, user-facing metrics.
- [ ] Confirm any new or corrected metric follows [METRIC_CHANGE_PROTOCOL.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/METRIC_CHANGE_PROTOCOL.md:1).
- [ ] Confirm benchmark dimensions and AII sub-scores have canonical metric ids.
- [ ] Confirm important Institutionalisation opening metrics are in the library.
- [ ] Confirm important Delivery metrics are in the library or are explicitly documented as still local.
- [ ] Remove or note any remaining one-off anonymous numbers that should become library-owned metrics.
- [ ] Confirm evidence-oriented claims have a canonical evidence owner, not just UI copy.

Helpful references:

- [COCKPIT_METRIC_PRIMER.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/COCKPIT_METRIC_PRIMER.md:1)
- [LOGIC_AUDIT_CHECKLIST.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/LOGIC_AUDIT_CHECKLIST.md:1)
- [DATA_MODEL_ALIGNMENT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/DATA_MODEL_ALIGNMENT.md:1)

## 2. Database Foundations

- [ ] Run [supabase/phase1_schema.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_schema.sql:1).
- [ ] Run [supabase/phase1_seed.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_seed.sql:1).
- [ ] Verify the following tables exist and seed cleanly:
  - `metric_definitions`
  - `segment_slices`
  - `metric_observations`
  - `dimension_scores`
  - `benchmarks`
- [ ] Confirm seeded metric ids match the canonical metric ids used by the UI.
- [ ] Confirm the default demo org and slice are usable for first read-path integration.

Helpful references:

- [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
- [SUPABASE_PHASE1_TABLE_PLAN.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_PHASE1_TABLE_PLAN.md:1)
- [SUPABASE_SEED_MAPPING.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_SEED_MAPPING.md:1)

## 3. Data-Access Layer

- [ ] Create `supabase-client.js`.
- [ ] Create `supabase-repositories.js`.
- [ ] Keep repositories responsible only for fetching rows, not shaping UI objects.
- [ ] Implement the first repository reads for:
  - Institutionalisation opening scorecard
  - AII sub-scores
  - benchmark bars
  - benchmark provenance
- [ ] Do not wire the whole app at once.
- [ ] Keep a static fallback path during the first live integration.

Helpful reference:

- [SUPABASE_ADAPTER_CONTRACT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ADAPTER_CONTRACT.md:1)

## 4. Mapper Layer

- [ ] Create `supabase-mappers.js`.
- [ ] Map raw DB rows into cockpit-shaped objects.
- [ ] Keep UI-facing labels and structures stable even if DB row shapes differ.
- [ ] Put benchmark bar shaping in the mapper, not in the render layer.
- [ ] Put AII/sub-score shaping in the mapper, not in the render layer.
- [ ] Make sure the mapper output is compatible with the current render path before replacing static data.

## 5. Runtime Cache Layer

- [ ] Create `supabase-runtime.js`.
- [ ] Introduce a runtime cache / runtime data object.
- [ ] Merge live reads into runtime data instead of mutating `window.MeridianCockpitData` directly.
- [ ] Keep runtime source flags visible enough to debug:
  - `static`
  - `live`
  - `fallback`
- [ ] Confirm render functions can read runtime data without caring whether the source was static or Supabase.

## 6. First Live Read Slice

- [ ] Make the Institutionalisation opening read from the live path.
- [ ] Make the benchmark section read from the live path.
- [ ] Confirm the UI still renders if Supabase is unavailable.
- [ ] Confirm live values match the seeded values.
- [ ] Confirm tooltips / `i` buttons still resolve the same metric ids.
- [ ] Confirm there is no second source of truth between seeded values and fallback values.

## 7. Calculation / Formula Discipline

- [ ] Confirm any displayed composite score has a canonical formula entry.
- [ ] Confirm any displayed derived metric has a canonical formula or calculation note.
- [ ] Confirm benchmark normalization logic is documented clearly enough for later review.
- [ ] Confirm any formula changes also update:
  - `metricLibrary`
  - seed rows or DB definitions
  - UI surfaces
  - plain-English docs
- [ ] Confirm no formula is only documented in chat history.

Helpful references:

- [METRIC_CHANGE_PROTOCOL.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/METRIC_CHANGE_PROTOCOL.md:1)
- [COCKPIT_METRIC_PRIMER.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/COCKPIT_METRIC_PRIMER.md:1)

## 8. Smoke Checks

- [ ] Institutionalisation opening still loads.
- [ ] AII score renders.
- [ ] Strategy / Ops / People sub-scores render.
- [ ] Benchmark bars render.
- [ ] Benchmark provenance still reads correctly.
- [ ] Tooltip and metric-card links still work.
- [ ] No blank page or startup crash appears.
- [ ] Static fallback still works if the live path is disabled.

## 9. Handoff / Team Readiness

- [ ] K can follow [TEAMMATE_K_SUPABASE_STEP_BY_STEP.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/TEAMMATE_K_SUPABASE_STEP_BY_STEP.md:1) without guessing.
- [ ] The team knows which files are canonical:
  - `app-data.js` for current metric definitions
  - Supabase schema and seeds for product rollout path
  - mapper/repository/runtime files for integration logic
- [ ] The team knows what is still mocked and what is now live.
- [ ] The team knows not to wire the rest of the app until the first read slice is stable.

## 10. Not In Phase 1

Do **not** treat these as Phase 1 blockers:

- [ ] full auth and RLS rollout
- [ ] full write/save behavior
- [ ] persisted comments and approvals
- [ ] complete initiative persistence
- [ ] full Delivery live integration
- [ ] full AI service boundary
- [ ] observability stack

These are important, but they belong to later phases.

## Done Means

You can call Phase 1 complete when:

- the opening Institutionalisation read path is live-capable
- benchmark bars and provenance are live-capable
- the UI is reading runtime-shaped data
- metrics still have one canonical definition
- no one has to guess where metric truth lives

