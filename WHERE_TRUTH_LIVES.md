# WHERE_TRUTH_LIVES.md

## Purpose

This file is the orientation map for the repo.

Use it to answer:

- where runtime truth lives
- where metric truth lives
- where evidence truth lives
- where database rollout truth lives
- where product intent lives
- which files are implementation files vs reference files
- which files must be updated together

This file exists for both humans and AI.

If a file becomes canonical, stops being canonical, or its update dependencies change, this file must be updated.

## The Fastest Mental Model

Think of the repo in five layers:

1. live prototype runtime
2. canonical business truth
3. product / integration guidance
4. Supabase rollout path
5. reference / critique artifacts

## 1. Live Prototype Runtime Truth

These files run the current product experience.

### Page structure

- `index.html`

Use for:

- section containers
- structural placement
- static shell markup

If you change this, also check:

- `app.js`
- `styles.css`
- the relevant split stylesheet

### Runtime data and canonical mocked domain data

- `app-data.js`

Use for:

- `metricLibrary`
- portfolio and oversight demo data
- benchmark bars
- metric ids and label mapping
- canonical mocked values and definitions

If you change this, also check:

- `app.js`
- `COCKPIT_METRIC_PRIMER.md` if the meaning changes
- `LOGIC_AUDIT_CHECKLIST.md` if the audit set changes
- Supabase docs and seed files if the product rollout path depends on that metric or concept

### Runtime render and interaction logic

- `app.js`

Use for:

- state
- render orchestration
- event handling
- view composition
- tooltip / drawer / interaction wiring

If you change this, also check:

- `index.html`
- `app-data.js`
- the relevant stylesheet

### Stylesheet entry point

- `styles.css`

Use for:

- the single entry stylesheet loaded by the page
- imports for split CSS files

If you change this, also check:

- the imported split stylesheets

### Split stylesheets

- `styles-base.css`
- `styles-shared-components.css`
- `styles-institutionalization.css`
- `styles-delivery.css`
- `styles-responsive.css`

Use for:

- visual system
- shared components
- view-specific styling
- responsive behavior

If you change one of these, also check:

- `styles.css`
- the related markup and render logic

## 2. Canonical Business Truth

These files define what the cockpit means, not just how it looks.

### Metric truth

- `app-data.js` via `metricLibrary`

This is the canonical owner for:

- explainable metrics
- score-like values
- formulas
- owners
- source systems
- refresh cadence
- confidence

Related rules:

- `METRIC_CHANGE_PROTOCOL.md`
- `AGENTS.md`

### Evidence and traceability truth

Current state:

- partially in `app-data.js`
- partially in UI copy
- partially in Supabase rollout docs

Product direction:

- should move toward canonical evidence pack ownership

Current guiding files:

- `SUPABASE_ALIGNMENT_HANDOFF.md`
- `SUPABASE_PHASE1_TABLE_PLAN.md`
- `DATA_MODEL_ALIGNMENT.md`

### Data-model / semantic truth

- `DATA_MODEL_ALIGNMENT.md`
- `data_model.html`

Use for:

- entity meaning
- structural relationships
- product semantics beyond the current mock implementation

If you change meaning, ownership, segmentation, evidence semantics, or workflow state, also check:

- `app-data.js`
- `LOGIC_AUDIT_CHECKLIST.md`
- relevant Supabase planning docs

## 3. Product And Integration Guidance Truth

These files explain what the product is becoming and what decisions were already made.

### Product direction

- `INTEGRATION_PLAN.md`

Use for:

- the story-level destination
- what the cockpit should become

### Section reconciliation

- `SECTION_MAPPING.md`
- `TOGGLE_TO_INSTITUTIONALISATION_MAPPING.md`

Use for:

- how current sections map across prototypes
- what was adapted vs kept

### Gap and critique backlog

- `DEEP_RESEARCH_GAP_BACKLOG.md`
- `deep-research-report on AI Copit.md`

Use for:

- product critique
- missing capabilities
- rationale for future fixes

### Current productization direction

- `PRODUCT_COMPARTMENTALISATION_ROADMAP.md`
- `PHASE1_PRODUCTIZATION_CHECKLIST.md`

Use for:

- turning the prototype into a real product foundation

## 4. Supabase Rollout Truth

These files define the current database integration path.

### Main alignment and handoff

- `SUPABASE_ALIGNMENT_HANDOFF.md`

Use for:

- how the current cockpit maps into a Supabase-backed product path

### Table plan

- `SUPABASE_PHASE1_TABLE_PLAN.md`

Use for:

- Phase 1 tables
- columns
- constraints
- build order

### Seed and schema truth

- `supabase/phase1_schema.sql`
- `supabase/phase1_seed.sql`
- `SUPABASE_SEED_MAPPING.md`

Use for:

- actual database structure
- first seed assumptions
- how mocked cockpit values map into tables

### Adapter / integration contract

- `SUPABASE_ADAPTER_CONTRACT.md`

Use for:

- repository layer
- mapper layer
- runtime cache pattern
- what should not be wired directly

### Teammate handoff for K

- `TEAMMATE_K_SUPABASE_STEP_BY_STEP.md`

Use for:

- plain-English execution order for a vibe-coder teammate

## 5. Human-Readable Orientation Truth

These files exist to help humans and future AI sessions regain context quickly.

### Repo onboarding

- `START_HERE.md`

Use for:

- first read order
- how to orient by task type

### Current state

- `CURRENT_STATE_HANDOFF.md`

Use for:

- what is already done
- what is stable
- what is in progress
- what is intentionally deferred

### Metric understanding

- `COCKPIT_METRIC_PRIMER.md`

Use for:

- plain-English metric understanding
- direct vs derived vs composite metric orientation

### Audit and verification

- `LOGIC_AUDIT_CHECKLIST.md`
- `METRIC_CHANGE_PROTOCOL.md`

Use for:

- keeping metric truth aligned
- checking changes safely

## 6. Reference-Only Files

These are important, but they are not the live runtime.

- `MeridianAICockpit_Unified.html`
- `MeridianAICockpit_Toggle.html`
- `data_model.html`
- `deep-research-report on AI Copit.md`

Do not treat them as live implementation files unless a task explicitly says to.

## 7. If You Change X, Also Update Y

### If you change a user-facing metric

Update:

- `app-data.js`
- `METRIC_CHANGE_PROTOCOL.md` checklist path
- affected UI surfaces in `app.js`
- `COCKPIT_METRIC_PRIMER.md` if meaning changed
- `LOGIC_AUDIT_CHECKLIST.md` if audit scope changed
- Supabase docs and seeds if rollout path depends on it

### If you change a file’s canonical role

Update:

- `WHERE_TRUTH_LIVES.md`
- `AGENTS.md` if the repo rule or ownership guidance changes
- `START_HERE.md` if the onboarding order changes
- `CURRENT_STATE_HANDOFF.md` if the practical working shape changes

### If you change the product rollout path

Update:

- `SUPABASE_ALIGNMENT_HANDOFF.md`
- `SUPABASE_PHASE1_TABLE_PLAN.md`
- `SUPABASE_SEED_MAPPING.md`
- `SUPABASE_ADAPTER_CONTRACT.md`
- `TEAMMATE_K_SUPABASE_STEP_BY_STEP.md`
- `PRODUCT_COMPARTMENTALISATION_ROADMAP.md` or `PHASE1_PRODUCTIZATION_CHECKLIST.md` if the phase order changes

### If you change section meaning, not just layout

Update:

- `DATA_MODEL_ALIGNMENT.md`
- maybe `data_model.html`
- mapping docs if section structure or identity changes

## 8. Done Criteria For Truth Changes

A change is not done if:

- a canonical owner changed but this file still points to the old one
- a new important file exists but nobody would know to read it
- docs still tell humans or AI to look in the wrong place

In short:

- if truth moved, this map must move too

