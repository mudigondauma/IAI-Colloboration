# CURRENT_STATE_HANDOFF.md

## Purpose

This file captures the current working state of the repo so a new human or AI can recover context quickly.

Use it as the practical handoff snapshot.

## What Is Stable Right Now

### 1. The live prototype has already been split lightly

The app is no longer a single giant runtime file.

Current runtime structure:

- `index.html`
- `app-data.js`
- `app.js`
- `styles.css`
- split `styles-*.css`

This lightweight split is already done and working.

### 2. Institutionalisation opening has been redesigned

Important changes already made:

- the old separate hero/header was merged into the North-Star opening
- the AII scorecard and sub-scores were kept and integrated into that opening
- the chapter navigation was moved higher on the page
- the `Board tools` area was made more interactive and modern
- the opening was tightened to get to the board message faster

### 3. Delivery opening is now being tightened too

Important current state:

- Delivery keeps the view bar, operating header, quick jump, and KPI opening
- the opening now leads with an operating posture line and KPI snapshot before scope controls
- the old passive support stack has been converted into a clickable `Delivery tools` tray
- the tray now owns saved lenses and grounded delivery questions
- quick navigation now sits between the KPI opening and the lower scope controls
- filters and segmentation were demoted into a lower operating-scope panel instead of leading the page
### 4. Workforce chapter was reworked substantially

Important current state:

- `Foundations learning` is a baseline strip
- top Workforce metrics use the progress-strip language
- proof cards were selectively redesigned rather than everything being flipped blindly
- semantic color logic was intentionally preserved for proof signals

### 5. Metric discipline is now much stronger than before

What already exists:

- canonical `metricLibrary` in `app-data.js`
- `COCKPIT_METRIC_PRIMER.md`
- `LOGIC_AUDIT_CHECKLIST.md`
- `METRIC_CHANGE_PROTOCOL.md`

The repo now assumes:

- important user-facing metrics should have a canonical definition
- metric changes must follow a change protocol

### 6. Productization / Supabase planning package already exists

These are already prepared:

- `SUPABASE_ALIGNMENT_HANDOFF.md`
- `SUPABASE_PHASE1_TABLE_PLAN.md`
- `SUPABASE_SEED_MAPPING.md`
- `SUPABASE_ADAPTER_CONTRACT.md`
- `TEAMMATE_K_SUPABASE_STEP_BY_STEP.md`
- `TEAMMATE_K_CODESPACES_SETUP.md`
- `supabase/phase1_schema.sql`
- `supabase/phase1_seed.sql`

This means the repo is no longer just UI-only in planning terms.

## What Is Intentionally Not Finished Yet

### 1. The app is still a static prototype at runtime

What is not yet live:

- Supabase read path in the running app
- auth / RLS
- persisted saved views
- persisted comments / actions
- full initiative persistence
- production AI service boundary
- observability stack

### 2. Some UI polish is still ongoing

The Institutionalisation and Delivery views are improved, but not fully finalized.

Expect more polish to still happen in:

- opening composition
- tool trays
- chapter flow
- spacing / hierarchy
- tooltip consistency
- Delivery hierarchy and operational texture

### 3. Not every displayed value is product-grade yet

The metric library is much stronger now, but this is still a transition state:

- some metrics are fully canonical
- some are partially canonical
- some local values still need later normalization

## What The Team Should Assume

### For UI work

Use the live runtime files, not the old reference prototypes.

### For metric or logic work

Start from:

- `app-data.js`
- `METRIC_CHANGE_PROTOCOL.md`
- `COCKPIT_METRIC_PRIMER.md`
- `LOGIC_AUDIT_CHECKLIST.md`

### For Supabase work

Start from:

- `SUPABASE_ALIGNMENT_HANDOFF.md`
- `SUPABASE_PHASE1_TABLE_PLAN.md`
- `SUPABASE_ADAPTER_CONTRACT.md`
- `TEAMMATE_K_SUPABASE_STEP_BY_STEP.md`

## What Is The Next Meaningful Work

If the goal is still prototype/UI improvement:

- continue UI polish in Institutionalisation and Delivery

If the goal is productization:

- complete Phase 1 productization steps from:
  - `PHASE1_PRODUCTIZATION_CHECKLIST.md`

If the goal is safer long-term maintenance:

- keep `WHERE_TRUTH_LIVES.md` current
- follow `METRIC_CHANGE_PROTOCOL.md`

## Current Repo Memory Layer

These files together are now the core repo memory:

- `AGENTS.md`
- `WHERE_TRUTH_LIVES.md`
- `START_HERE.md`
- `CURRENT_STATE_HANDOFF.md`

These files together are the metric / logic memory:

- `COCKPIT_METRIC_PRIMER.md`
- `LOGIC_AUDIT_CHECKLIST.md`
- `METRIC_CHANGE_PROTOCOL.md`

These files together are the productization / Supabase memory:

- `PRODUCT_COMPARTMENTALISATION_ROADMAP.md`
- `PHASE1_PRODUCTIZATION_CHECKLIST.md`
- `SUPABASE_ALIGNMENT_HANDOFF.md`
- `SUPABASE_PHASE1_TABLE_PLAN.md`
- `SUPABASE_SEED_MAPPING.md`
- `SUPABASE_ADAPTER_CONTRACT.md`
- `TEAMMATE_K_SUPABASE_STEP_BY_STEP.md`

## Update Rule

If a major repo decision changes, this file should be updated.

Examples:

- live runtime shape changes
- canonical ownership changes
- major UI restructuring is completed
- a new integration path becomes the default
- a phase is completed and the next one starts
