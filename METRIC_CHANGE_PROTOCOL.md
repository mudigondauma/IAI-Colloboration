# METRIC_CHANGE_PROTOCOL.md

## Purpose

Use this protocol whenever a metric is:

- added
- renamed
- removed
- recalculated
- reweighted
- re-scoped
- given a new owner, source, threshold, or refresh cadence

This file exists so metric changes do not rely on memory.

The goal is simple:

- one canonical metric definition
- one required update path
- no silent drift between UI, docs, and database work

## Core Rule

Any change to a user-facing metric must be updated through its canonical owner first.

In this repo, that means:

- today: `metricLibrary` in `app-data.js`
- later: `metric_definitions` and related DB rows in Supabase

No metric change is complete until the canonical source and all affected surfaces agree.

## Change Types

### 1. Definition-only change

Use this when the number stays the same, but the explanation changes.

Examples:

- better wording
- clearer exclusions
- corrected owner
- improved source-system note

### 2. Formula or logic change

Use this when the number may change because the calculation changed.

Examples:

- new weighting
- new numerator or denominator
- revised benchmark normalization
- changed inclusion / exclusion rules

### 3. Label change

Use this when the displayed name changes, even if the logic does not.

Examples:

- `AI Coverage` -> `AI Workflow Coverage`
- `Finance-validated` -> `Finance-validated share`

### 4. Threshold or status change

Use this when the score stays the same but the interpretation bands change.

Examples:

- benchmark threshold moved
- score band renamed
- red / amber / green rules changed

### 5. New metric

Use this when a metric did not exist before and will now appear in the UI, docs, or DB.

### 6. Metric retirement

Use this when an existing metric should no longer be shown or used.

## Canonical Owners

Every user-facing change must have one clear owner:

- explainable metric or score -> `metricLibrary`
- evidence or proof claim -> evidence pack / evidence library
- repeated UI control -> shared component pattern

If a new displayed value does not clearly belong to one of these, stop and define the owner first.

## Required Update Order

Follow this order every time.

### Step 1. Update the canonical metric definition

Primary file today:

- [app-data.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app-data.js:1)

Update:

- label
- definition
- formula
- numerator
- denominator
- scope
- exclusions
- owner
- source systems
- refresh cadence
- confidence
- evidence note

If the metric is new, add it to `metricLibrary` before using it anywhere else.

### Step 2. Update any aliases or explicit metric-id references

Check:

- `metricLabelToId` and any aliases in `app-data.js`
- explicit metric id references in [app.js](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/app.js:1)
- any fallback metric definitions that were temporarily added in render code

Goal:

- the UI should still point to the same canonical metric id
- no second source of truth should be created through renamed labels or fallback copy

### Step 3. Update the actual value logic

If the formula or threshold changed, update the place where the value is produced.

Possible current locations:

- mocked numeric objects in `app-data.js`
- derived render logic in `app.js`
- benchmark bar data
- portfolio / oversight datasets

Future product locations:

- Supabase mappers
- runtime data adapters
- DB seed or observation rows

### Step 4. Update the UI surfaces

Check every place the metric is shown:

- cards
- bars
- tooltips
- evidence buttons
- Ask answers
- saved views
- benchmark sections
- Institutionalisation opening
- Delivery readouts

If the label or meaning changed, the visible UI copy must change too.

### Step 5. Update the database contract if the product path is affected

If the metric is already represented in the Supabase planning files, update the relevant docs and seeds:

- [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
- [SUPABASE_PHASE1_TABLE_PLAN.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_PHASE1_TABLE_PLAN.md:1)
- [SUPABASE_SEED_MAPPING.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_SEED_MAPPING.md:1)
- [SUPABASE_ADAPTER_CONTRACT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ADAPTER_CONTRACT.md:1)
- [supabase/phase1_seed.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_seed.sql:1)
- [supabase/phase1_schema.sql](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/supabase/phase1_schema.sql:1) if the schema itself must change

### Step 6. Update the plain-English docs

If a human reading the cockpit would understand the metric differently after the change, update:

- [COCKPIT_METRIC_PRIMER.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/COCKPIT_METRIC_PRIMER.md:1)

If the change affects validation, reconciliation, or audit work, update:

- [LOGIC_AUDIT_CHECKLIST.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/LOGIC_AUDIT_CHECKLIST.md:1)

If the change affects meaning at the model layer, update:

- [DATA_MODEL_ALIGNMENT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/DATA_MODEL_ALIGNMENT.md:1)
- [data_model.html](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/data_model.html:1)

### Step 7. Update the repo memory if truth moved

If the metric change causes any of these to change:

- canonical file owner
- supporting file owner
- read order for orientation
- current working assumptions for humans or AI

then also update:

- [WHERE_TRUTH_LIVES.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/WHERE_TRUTH_LIVES.md:1)
- [CURRENT_STATE_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/CURRENT_STATE_HANDOFF.md:1)

## File Checklist By Change Type

### If the metric label changed

Check:

- `metricLibrary`
- label-to-id mapping / aliases
- UI copy in `app.js`
- `COCKPIT_METRIC_PRIMER.md`
- `LOGIC_AUDIT_CHECKLIST.md`
- any benchmark / tooltip / evidence text using the old label

### If the formula changed

Check:

- `metricLibrary`
- current mocked value logic in `app-data.js` or `app.js`
- benchmark / composite score logic
- Supabase seed / DB definitions if already modeled
- `COCKPIT_METRIC_PRIMER.md`
- `LOGIC_AUDIT_CHECKLIST.md`

### If the owner or source changed

Check:

- `metricLibrary`
- primer doc if business explanation changes
- Supabase handoff docs if the data pipeline assumption changes

### If a new metric was added

Check:

- `metricLibrary`
- any UI surface using it
- primer doc if it is important enough to explain
- audit checklist if it becomes a key verification metric
- Supabase plan / seed mapping if it is part of product rollout

### If a metric is removed

Check:

- remove or deprecate it from the metric library
- remove the UI usage
- remove or mark obsolete any seed rows and Supabase references
- update docs so they do not keep teaching a dead metric

## Done Criteria

A metric change is only done when all of these are true:

- canonical definition is updated
- value logic matches the new definition
- UI labels and tooltips match the new meaning
- no duplicate or fallback definition remains elsewhere
- related Supabase docs and seeds are updated if the product path depends on the metric
- plain-English docs reflect the new meaning
- logic audit checklist still matches reality

## Product Rollout Guidance

As the cockpit becomes a real product, use this stronger versioning discipline:

- keep stable metric ids
- add `formula_version`
- add `effective_from`
- add `effective_to`
- add `status`
- do not overwrite historical meaning without a version trail

That will let the team understand:

- what changed
- when it changed
- which dashboards use the new logic
- whether old screenshots or reports are still comparable

## Practical Rule Of Thumb

If a metric changed and only one file was updated, the change is probably incomplete.

At minimum, most meaningful metric changes will touch:

- `app-data.js`
- one UI surface or render path
- one human-readable doc

And if the product rollout path already depends on that metric, they will also touch:

- one Supabase planning or seed file
