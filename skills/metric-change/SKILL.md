---
name: metric-change
description: Use when a user-facing metric is added, renamed, recalculated, corrected, aliased, or retired in the Meridian cockpit and the change must stay aligned across the metric library, UI, docs, and Supabase rollout artifacts.
---

# Metric Change

## Overview

Use this skill when a cockpit metric changes and the change must be applied safely across the repo.

This skill is for metric work that affects meaning, formulas, labels, ownership, thresholds, rollout docs, or database plans. It is not for cosmetic-only copy tweaks where the metric itself is unchanged.

## When To Use This Skill

Use this skill when the task involves any of the following:

- adding a new user-facing metric
- changing a metric label that users see in the UI
- changing a formula, threshold, weight, denominator, or normalization rule
- changing a metric owner, source system, refresh cadence, or confidence note
- creating or changing aliases between labels and metric ids
- retiring a metric or replacing it with a new canonical id
- correcting a metric in a way that affects Supabase planning, seeds, or product docs

Do not use this skill for:

- pure layout or spacing changes
- copy edits that do not change metric meaning
- visual-only badge or chip styling

## Read Order

Before editing, read these files in this order:

1. `AGENTS.md`
2. `WHERE_TRUTH_LIVES.md`
3. `METRIC_CHANGE_PROTOCOL.md`
4. `COCKPIT_METRIC_PRIMER.md`
5. `LOGIC_AUDIT_CHECKLIST.md`

Read these too if the change affects rollout or database planning:

6. `SUPABASE_ALIGNMENT_HANDOFF.md`
7. `SUPABASE_SEED_MAPPING.md`
8. `SUPABASE_PHASE1_TABLE_PLAN.md`
9. `SUPABASE_ADAPTER_CONTRACT.md`

## Workflow

### 1. Classify The Change

Decide which type of metric change this is:

- new metric
- label change
- formula or threshold change
- owner or source change
- alias change
- retirement or replacement

Be explicit about whether the meaning changed or only the presentation changed.

### 2. Find The Canonical Owner

For live prototype metric truth, start from:

- `app-data.js` via `metricLibrary`

Do not create anonymous one-off metric text in `app.js` if the value is meant to be explainable, reused, or persisted later.

Use stable metric ids whenever possible.

### 3. Update Canonical Metric Truth

In `app-data.js`, update the metric entry itself:

- id
- label
- definition
- formula
- owner
- source
- refresh cadence
- confidence

Also update supporting label maps or aliases if the metric is referenced by multiple labels in the UI.

### 4. Update Runtime Surfaces

Then update the places that render or reference the metric:

- `app.js`
- any relevant metric-id or label lookup paths in `app-data.js`
- `index.html` only if the metric is structurally introduced or renamed in static markup

Check:

- tiles
- scorecards
- benchmark bars
- tooltip info buttons
- supporting chips or callouts
- opening snapshot sections
- any repeated labels across Institutionalisation and Delivery

### 5. Update Rollout And Database Artifacts If Needed

If the metric is part of the productization path, update the rollout docs too:

- `SUPABASE_ALIGNMENT_HANDOFF.md`
- `SUPABASE_PHASE1_TABLE_PLAN.md`
- `SUPABASE_SEED_MAPPING.md`
- `supabase/phase1_schema.sql`
- `supabase/phase1_seed.sql`

Use judgment here:

- if the metric is already in the planned database path, keep the docs and seeds aligned
- if the metric is still UI-only, do not invent unnecessary Supabase work

### 6. Update Human-Readable Docs

If the meaning or scope changed, update:

- `COCKPIT_METRIC_PRIMER.md`
- `LOGIC_AUDIT_CHECKLIST.md` if audit coverage changed
- `METRIC_CHANGE_PROTOCOL.md` only if the process itself changed

### 7. Update Repo Memory If Truth Moved

If the change created a new important file, changed canonical ownership, or changed onboarding/update dependencies, update:

- `WHERE_TRUTH_LIVES.md`
- `START_HERE.md`
- `CURRENT_STATE_HANDOFF.md`

### 8. Verify Before Finishing

Run at least:

- `git diff --check`

Also verify, as relevant:

- the UI label matches the canonical metric label
- tooltip or `i` definitions still match the metric meaning
- both Institutionalisation and Delivery use the same meaning if they reference the same metric
- Supabase docs and seed files are not left pointing to stale labels or formulas

## Guardrails

- Do not let the same metric exist under two meanings.
- Do not change user-facing labels without checking metric ids and aliases.
- Do not update only the UI if the meaning changed.
- Do not update only the metric library if the UI still tells the old story.
- Do not forget the repo-memory docs when a new important owner or file appears.

## Expected Output

When using this skill, the final work should make clear:

- what metric changed
- whether the meaning changed or only the presentation changed
- which canonical files were updated
- whether Supabase rollout files were touched
- whether any follow-up audit or rollout work is still pending
