# TEAMMATE_K_SUPABASE_STEP_BY_STEP.md

## Purpose

This is the practical step-by-step note for K.

It is intentionally plain-English and build-order oriented.

Use this if you want to help move the Meridian AI Enterprise Cockpit from static mocked data to a Supabase-backed prototype **without breaking the current UI**.

## What You Are Working On

This repo is currently a static front-end prototype.

The live app is:

- `index.html`
- `app-data.js`
- `app.js`
- `styles.css` plus split CSS files

Right now:

- `app-data.js` holds mocked data
- `app.js` renders the UI
- there is no backend yet

Your job is **not** to redesign the app.

Your job is:

1. set up the first real database tables in Supabase
2. load the first seed data
3. connect one small part of the UI to Supabase safely

## Read These First

Read in this order:

1. [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
2. [SUPABASE_PHASE1_TABLE_PLAN.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_PHASE1_TABLE_PLAN.md:1)
3. [SUPABASE_SEED_MAPPING.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_SEED_MAPPING.md:1)
4. [SUPABASE_ADAPTER_CONTRACT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ADAPTER_CONTRACT.md:1)

Then use:

- [supabase/phase1_schema.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_schema.sql:1)
- [supabase/phase1_seed.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_seed.sql:1)

## Your First Goal

Get this one thing working:

**The Institutionalisation opening should be able to read from Supabase for:**

- AII Score
- Strategy / Ops / People sub-scores
- Governance Coverage
- RAI Index
- Tech Debt Index
- benchmark bars
- benchmark provenance

Do **not** try to connect the whole app at once.

## Important Rule

Do not put raw Supabase rows straight into the render functions.

Use this pattern:

1. fetch rows
2. map rows into the current UI shape
3. merge mapped data into runtime cache
4. rerender

This is important because the current app was not built to read SQL rows directly.

## Step-By-Step

### Step 1. Create a Supabase project

In Supabase:

- create a new project
- open the SQL editor

You do not need auth or policies first for this step.

## Step 2. Run the schema

Open:

- [supabase/phase1_schema.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_schema.sql:1)

Copy it into the Supabase SQL editor and run it.

This creates the Phase 1 tables:

- `metric_definitions`
- `segment_slices`
- `metric_observations`
- `ai_initiatives`
- `value_realizations`
- `finance_validations`
- `evidence_packs`
- `dimension_scores`
- `benchmarks`
- `access_scopes`

## Step 3. Run the seed

Open:

- [supabase/phase1_seed.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_seed.sql:1)

Run that in the same SQL editor.

This gives you:

- one demo org
- one default enterprise slice
- metric definitions for the first board path
- metric observations for the AII opening
- benchmark bars and provenance data

## Step 4. Sanity-check the data in Supabase

Check that these tables have rows:

- `metric_definitions`
- `segment_slices`
- `metric_observations`
- `dimension_scores`
- `benchmarks`

Check especially:

- `AII_SCORE`
- `AII_STRATEGY_SCORE`
- `AII_OPS_SCORE`
- `AII_PEOPLE_SCORE`
- `GOVERNANCE_COVERAGE`
- `RAI_INDEX`
- `TECH_DEBT_INDEX`

If those are not there, stop and fix the seed first.

## Step 5. Create the Supabase files in the repo

Create these files:

- `supabase-client.js`
- `supabase-repositories.js`
- `supabase-mappers.js`
- `supabase-runtime.js`

Keep each file small and focused.

## Step 6. Build the client

In `supabase-client.js`:

- initialize the Supabase browser client
- use the project URL
- use the anon key

Do not put business logic here.

This file should only create and export the client.

## Step 7. Build the repository layer

In `supabase-repositories.js`, create simple data fetch functions.

Start with only these:

- `getMetricDefinitions(orgId)`
- `getDefaultSlice(orgId)`
- `getBoardMetricObservations(orgId, sliceId, periodDate)`
- `getDimensionScores(orgId, periodDate)`
- `getBenchmarkProvenance(orgId, periodDate)`

These functions should return database rows, not UI objects.

## Step 8. Build the mapper layer

In `supabase-mappers.js`, convert database rows into the same shape the UI already expects.

Start with these mappers:

- `mapMetricDefinitionRowsToMetricLibraryPatch(rows)`
- `mapBoardObservationRowsToInstitutionPatch(rows)`
- `mapDimensionScoreRowsToBenchmarkBars(rows)`
- `mapBenchmarkRowsToBenchmarkProvenance(rows)`

The output should match the current `institutionalizationView` shape in the app.

That means the UI should receive objects like:

- `subscores`
- `northStar`
- `benchmarkBars`
- `benchmarkProvenance`

Do not invent a new UI shape if the current one already works.

## Step 9. Add a runtime cache

This is important.

Right now `app.js` reads data once from `window.MeridianCockpitData`.

That means updating the global later will not automatically update the page.

So create a runtime cache.

Recommended shape:

```js
const runtimeData = {
  metricLibrary: structuredClone(metricLibrary),
  institutionalizationView: structuredClone(institutionalizationView),
  sources: {
    boardSnapshot: "static",
    benchmark: "static",
    metrics: "static",
  },
};
```

The Supabase data should patch this cache.

The UI should gradually read from `runtimeData`, not directly from the original static constants.

## Step 10. Make the smallest app refactor

Do not refactor the whole app.

Only refactor the first live domain:

- Institutionalisation opening
- benchmark section
- metric drawer lookups

That means:

1. the Institutionalisation opening should read from `runtimeData.institutionalizationView`
2. metric tooltips and metric drawer should read from `runtimeData.metricLibrary`

Do not touch unrelated Delivery sections yet.

## Step 11. Build the loader

In `supabase-runtime.js`, create one function like:

- `loadInstitutionBoardSnapshot()`

That function should:

1. fetch metric definitions
2. fetch default slice
3. fetch board observations
4. fetch dimension scores
5. fetch benchmark provenance
6. map the rows into cockpit-shaped objects
7. merge the mapped data into `runtimeData`
8. call `render()`

## Step 12. Keep fallback safe

If the Supabase fetch fails:

- do not blank the page
- do not remove current static data
- keep using the static fallback

This prototype must stay demoable even while integration is incomplete.

## Step 13. Check the first success condition

You are done with the first slice when:

- the page still loads
- Institutionalisation opening still renders
- AII score reads from Supabase-backed data
- Strategy / Ops / People sub-scores read from Supabase-backed data
- benchmark bars read from Supabase-backed data
- benchmark provenance reads from Supabase-backed data
- metric `i` buttons still work

If all of that works, stop there before expanding.

## What Not To Do

Do not:

- wire the whole app at once
- pass raw SQL rows into `renderInstitutionalization()`
- rename metrics freely
- invent new labels if the UI already has canonical ones
- move value/evidence sections to Supabase before the first board read path works
- introduce a framework rewrite while doing this

## What Comes After This

Only after the first read path works:

1. seed `ai_initiatives`
2. seed `value_realizations`
3. seed `finance_validations`
4. connect the North-Star value signal and initiative selector
5. seed `evidence_packs`

That is the second slice.

## If You Get Stuck

If something is unclear, ask in this order:

1. is this a database question?
2. is this a mapping question?
3. is this a render/refactor question?

Most integration problems here will be one of those three.

The safest default is:

**keep the UI shape, change the data source behind it.**

## Short Version

If you want the shortest version:

1. run schema
2. run seed
3. create client / repositories / mappers / runtime files
4. add runtime cache
5. wire only the Institutionalisation opening and benchmark section
6. keep static fallback
7. stop after first read success
