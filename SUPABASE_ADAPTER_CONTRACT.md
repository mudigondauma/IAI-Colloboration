# SUPABASE_ADAPTER_CONTRACT.md

## Purpose

This document defines the adapter contract between:

- Supabase-backed data
- the current static cockpit UI

It exists so K can integrate persistent data without turning the render layer into a database parser.

This is the missing bridge between:

- [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
- [SUPABASE_PHASE1_TABLE_PLAN.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_PHASE1_TABLE_PLAN.md:1)
- [supabase/phase1_schema.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_schema.sql:1)
- [supabase/phase1_seed.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_seed.sql:1)

## Why The Adapter Exists

Today the UI reads static data from:

- [app-data.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app-data.js:6586)
- then [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:42) destructures that data once at startup

Important consequence:

**K cannot safely integrate Supabase by mutating `window.MeridianCockpitData` later in the browser and expecting the UI to update.**

Why:

- `app.js` currently captures the data once into local constants
- later async updates to `window.MeridianCockpitData` will not automatically flow into the current render logic

So the integration path must be:

1. fetch Supabase data through repositories
2. map rows into cockpit-shaped objects
3. place those mapped objects into a runtime cache or selector layer
4. render from that runtime layer

## Adapter Principles

### 1. No raw Supabase rows in render functions

Render functions should never consume:

- row arrays
- joined SQL payloads
- column names directly from Supabase

They should consume already-mapped cockpit objects.

### 2. Static fallback remains available

If Supabase is unavailable, the app should keep working from the current mocked data.

### 3. Replace data inputs, not section markup

K should not redesign UI sections as part of data integration.

Goal:

- preserve current HTML/CSS and interaction patterns
- only replace where the data comes from

### 4. Integrate by domain

Do not try to replace the entire app’s data source at once.

First domain:

- Institutionalisation opening board snapshot
- benchmark section

## Current UI Seams That Matter

The most important current seams are:

### Metric library and label mapping

- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:49)
- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:50)

These already treat metric meaning as canonical and should remain stable.

### Metric drawer / metric info buttons

- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:494)
- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:1933)

These should keep resolving against a mapped metric library object.

### Institutionalisation opening / North-Star render

- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:4969)
- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:5037)
- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:5051)
- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:5325)

This is the best first live-data seam because:

- it is visible
- it is board-critical
- it is already relatively canonical

### Top-level render orchestration

- [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:5998)

This is where async loading and runtime cache refresh should eventually connect.

## Recommended Integration Pattern

K should introduce these files:

- `supabase-client.js`
- `supabase-repositories.js`
- `supabase-mappers.js`
- `supabase-runtime.js`

### `supabase-client.js`

Responsibility:

- initialize the Supabase browser client

Should not contain:

- business mapping
- UI decisions

### `supabase-repositories.js`

Responsibility:

- query Supabase tables
- return typed row groups per domain

Examples:

- `getMetricDefinitions(orgId)`
- `getDefaultSlice(orgId)`
- `getBoardMetricObservations(orgId, sliceId, periodDate)`
- `getDimensionScores(orgId, periodDate)`
- `getBenchmarkProvenance(orgId, periodDate)`

Should return:

- raw-but-clean repository objects

Should not return:

- DOM-ready UI strings

### `supabase-mappers.js`

Responsibility:

- convert repository results into current cockpit shapes

This is the most important file for keeping integration smooth.

Examples:

- `mapMetricDefinitionRowsToMetricLibraryPatch(rows)`
- `mapBoardObservationRowsToNorthStarMetrics(rows)`
- `mapDimensionScoreRowsToBenchmarkBars(rows)`
- `mapBenchmarkRowsToBenchmarkProvenance(rows)`

Should output:

- shapes already usable by current render functions

### `supabase-runtime.js`

Responsibility:

- fetch
- map
- merge into runtime cache
- expose a small API to `app.js`

Examples:

- `loadInstitutionBoardSnapshot()`
- `loadBenchmarkSnapshot()`
- `loadMetricLibraryPatch()`

## Recommended Runtime Cache Contract

Introduce a mutable runtime cache object in `app.js` or a small new runtime module.

Suggested shape:

```js
const runtimeData = {
  metricLibrary: structuredClone(metricLibrary),
  institutionalizationView: structuredClone(institutionalizationView),
  benchmarkProvenance: null,
  sources: {
    boardSnapshot: "static",
    benchmark: "static",
    metrics: "static",
  },
};
```

Why:

- the current app starts from static data
- the Supabase layer should patch this runtime cache
- render functions should gradually read from `runtimeData` instead of directly from the original destructured constants

## First Adapter Contract: Board Snapshot

This is the first contract I recommend K implement.

### Repository input

The repository layer should be able to provide:

- default `segment_slice`
- metric definition rows for:
  - `AII_SCORE`
  - `AII_STRATEGY_SCORE`
  - `AII_OPS_SCORE`
  - `AII_PEOPLE_SCORE`
  - `GOVERNANCE_COVERAGE`
  - `RAI_INDEX`
  - `TECH_DEBT_INDEX`
- metric observation rows for the same codes
- dimension score rows
- benchmark rows

### Mapper output

The mapper should produce this cockpit-facing shape:

```js
{
  metricLibraryPatch: {
    aii_score: { ... },
    aii_strategy_score: { ... },
    aii_ops_score: { ... },
    aii_people_score: { ... },
    governance_coverage: { ... },
    rai_index: { ... },
    tech_debt_index: { ... },
    benchmark_strategic_alignment: { ... },
    benchmark_portfolio_roi: { ... },
    benchmark_governance_risk: { ... },
    benchmark_workforce: { ... },
    benchmark_technology: { ... },
    benchmark_culture: { ... },
    benchmark_operational_ai: { ... },
    benchmark_sla_xla: { ... },
    benchmark_responsible_ai: { ... },
  },
  institutionPatch: {
    subscores: [
      { label: "Strategy", value: "71" },
      { label: "Ops", value: "63" },
      { label: "People", value: "58" },
    ],
    northStar: [
      { label: "AII Score", value: "67", delta: "Scaling zone, +4 pts this quarter", tone: "good" },
      { label: "Governance Coverage", value: "74%", delta: "8 models still outside policy scope", tone: "risk" },
      { label: "RAI Index", value: "62", delta: "+5 pts QoQ, but readiness still mixed", tone: "good" },
      { label: "Tech Debt Index", value: "38", delta: "Prompt and organizational debt remain the drag", tone: "watch" },
    ],
    benchmarkBars: [
      { label: "Technology", meridian: 74, sector: 66 },
      { label: "Strategic alignment", meridian: 71, sector: 62 },
      { label: "Portfolio & ROI", meridian: 68, sector: 59 },
      { label: "Governance & risk", meridian: 63, sector: 71 },
      { label: "Workforce", meridian: 60, sector: 55 },
      { label: "Culture", meridian: 51, sector: 52 },
      { label: "Operational AI", meridian: 61, sector: 48 },
      { label: "SLA/XLA", meridian: 66, sector: 54 },
      { label: "Responsible AI", meridian: 62, sector: 57 },
    ],
    benchmarkProvenance: {
      peerGroup: "12 regulated-service enterprises with scaled AI programs",
      source: "Q1 2026 Meridian AI benchmark panel + analyst synthesis",
      lastRefresh: "02 Apr 2026",
      confidence: "B / mixed public disclosures and structured survey returns",
      methodology: "...",
      caveat: "...",
      drivers: [
        { title: "...", detail: "..." },
      ],
    },
  },
}
```

Important:

- labels must remain UI-compatible
- percentages and currency formatting can still happen in the UI layer
- mapper should return raw values where possible, but in the exact object structure the current UI expects

## Merge Contract

When a Supabase snapshot is loaded, merge it into the runtime cache like this:

```js
runtimeData.metricLibrary = {
  ...runtimeData.metricLibrary,
  ...snapshot.metricLibraryPatch,
};

runtimeData.institutionalizationView = {
  ...runtimeData.institutionalizationView,
  ...snapshot.institutionPatch,
};
```

Then:

```js
render();
```

This lets the UI keep functioning even if:

- only one domain has been replaced
- a fetch fails
- a later table is not ready yet

## Fallback Contract

If a Supabase read fails:

- log the failure
- keep static fallback data
- do not blank the section

This is required for a prototype that must stay demoable.

Suggested rule:

- no successful fetch -> keep static source
- partial fetch -> merge only valid mapped domains

## What K Should Not Do

K should avoid:

- passing raw SQL rows into `renderInstitutionalization()`
- changing labels in SQL that no longer match the UI
- replacing current metric ids with new ad hoc ids
- letting repository code decide presentation tone strings like `good`, `watch`, `risk`
- trying to wire Delivery and Institutionalisation simultaneously on the first pass

## First Minimal Refactor Needed In `app.js`

Before live Supabase reads can patch the page safely, one small refactor is recommended:

1. stop reading directly from the destructured immutable constants for the first live domain
2. introduce `runtimeData`
3. make the Institutionalisation opening and benchmark section read from `runtimeData.institutionalizationView`
4. make metric drawer and `i` buttons read from `runtimeData.metricLibrary`

This is the smallest realistic seam for K.

## Suggested First Implementation Sequence

1. add `supabase-client.js`
2. add `supabase-repositories.js`
3. add `supabase-mappers.js`
4. add `supabase-runtime.js`
5. introduce `runtimeData` fallback cache
6. patch the Institutionalisation opening to read from `runtimeData`
7. load:
   - metric definitions
   - default slice
   - board metric observations
   - dimension scores
   - benchmark provenance
8. merge snapshot into runtime cache
9. rerender

Only after that should K move to:

- value/initiative integration
- evidence packs
- Delivery view integration

## Success Condition

This contract is successful if K can:

- wire Supabase into the Institutionalisation opening without rewriting the whole page
- preserve the current static fallback
- keep metric definitions canonical
- keep render functions free of raw database logic

The key rule is:

**repositories fetch rows, mappers produce cockpit shapes, runtime cache feeds render functions.**
