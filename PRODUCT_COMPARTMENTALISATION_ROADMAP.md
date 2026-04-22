# PRODUCT_COMPARTMENTALISATION_ROADMAP.md

## Purpose

This file explains what still needs to be compartmentalised for the Meridian AI Enterprise Cockpit to evolve from a strong static prototype into a real AI product.

Use it as a product-readiness roadmap, not as a framework mandate.

The point is not to make the repo more complicated.
The point is to separate responsibilities clearly enough that:

- metrics can change safely
- database integration can happen without UI breakage
- AI behavior can be governed
- evidence can be traced
- access can be controlled
- the product can be operated by more than one person

## What "Compartmentalisation" Means Here

A pet project often mixes these together:

- the thing shown to the user
- the business meaning of the thing
- the data source
- the calculation logic
- the explanation of the thing
- the permissions around the thing

A product should separate those concerns.

In plain English:

- UI should render
- data access should fetch
- calculations should calculate
- evidence should explain
- access should control
- AI should behave through governed instructions

## Current State

Some important compartmentalisation has already been started:

- presentation is separated from reference prototypes
- static data was split out into `app-data.js`
- runtime/render logic is in `app.js`
- styles were split by concern
- `metricLibrary` is now the canonical owner for explainable metrics
- Supabase planning, schema, seed, and adapter docs exist
- metric-change discipline now exists in `METRIC_CHANGE_PROTOCOL.md`

That is good progress.

But the repo is still mostly a prototype, because several responsibilities are still too close together.

## The Compartments We Still Need

### 1. Presentation Layer

What it is:

- visible UI
- cards
- sections
- chips
- navigation
- drawers
- tool trays

Current owner:

- `index.html`
- `styles-*.css`
- `app.js`

Target product rule:

- the presentation layer should not be the place where metric truth, source-system assumptions, or formula logic live

Why it matters:

- lets the UI evolve without redefining the product every time a card changes

When:

- already in progress
- keep improving now

### 2. Domain Layer

What it is:

- metrics
- slices
- initiatives
- evidence packs
- benchmark dimensions
- access scopes
- workflow concepts

Current owner:

- mostly `app-data.js`
- partly docs like `DATA_MODEL_ALIGNMENT.md` and `data_model.html`

Target product rule:

- every important business concept should have one canonical meaning independent of how the UI renders it

Why it matters:

- avoids “same concept, different meaning” drift

When:

- now

### 3. Data-Access Layer

What it is:

- repositories
- Supabase queries
- fetch / load logic
- data mappers

Current owner:

- not yet implemented in code
- planned in `SUPABASE_ADAPTER_CONTRACT.md`

Target product rule:

- UI should not query Supabase directly all over the app

Why it matters:

- lets the database evolve without rewriting the whole UI

Where it should live:

- `supabase-client.js`
- `supabase-repositories.js`
- `supabase-mappers.js`
- `supabase-runtime.js`

When:

- first product-grade implementation slice

### 4. Runtime Cache / View Model Layer

What it is:

- product-shaped data prepared for rendering
- merged static + live values
- safe fallback when live reads fail

Current owner:

- mostly inline in `app.js`

Target product rule:

- render functions should read from runtime-ready objects, not raw DB rows

Why it matters:

- protects the UI from raw schema changes

When:

- together with the data-access layer

### 5. Calculation / Formula Layer

What it is:

- raw facts
- derived metrics
- composite scores
- thresholds
- score bands
- formula versions

Current owner:

- split between `metricLibrary`, hard-coded values, and local render logic

Target product rule:

- formulas should not be scattered through cards, seed scripts, and fallback text

Why it matters:

- this is one of the biggest differences between a product and a mock dashboard

Where it should live:

- canonical metric definition
- mapper/calculation layer
- later versioned in database

When:

- high priority after first live reads

### 6. Evidence / Provenance Layer

What it is:

- why a claim should be trusted
- source systems
- evidence packs
- benchmark provenance
- refresh dates
- confidence levels

Current owner:

- partly `metricLibrary`
- partly benchmark cards
- partly hard-coded narrative copy

Target product rule:

- important user-facing claims must be traceable

Why it matters:

- without this, the product looks smart but is hard to defend

Where it should live:

- evidence pack library
- Supabase `evidence_packs`
- benchmark provenance tables

When:

- parallel with the first real database integration

### 7. Access-Control Layer

What it is:

- who sees what
- masked vs unmasked content
- board vs delivery vs control audiences
- export rules

Current owner:

- conceptual only
- not yet implemented in runtime behavior

Target product rule:

- role-based access must be explicit, not implied by view labels

Why it matters:

- critical for any real AI governance or board product

Where it should live:

- Supabase auth + RLS
- access-scope model
- UI gating rules

When:

- before broad rollout

### 8. AI Service Boundary

What it is:

- prompts
- system instructions
- retrieval context
- answer assembly
- guardrails
- fallback behavior
- evaluation rules

Current owner:

- not yet a true product layer

Target product rule:

- AI behavior should not be hidden inside UI code or ad hoc prompts

Why it matters:

- real AI products need governable behavior

Where it should live:

- prompt/instruction registry
- retrieval layer
- service boundary separate from rendering

When:

- before “Ask the cockpit” becomes a true product feature

### 9. Workflow / Action Layer

What it is:

- saved views
- guided questions
- approvals
- comments
- actions
- task state
- roadmap milestones

Current owner:

- presentation-first and mostly mocked

Target product rule:

- action state must be persisted and auditable if it affects decisions

Why it matters:

- otherwise the cockpit remains a read-only concept

When:

- after core data and access layers are stable

### 10. Observability Layer

What it is:

- usage analytics
- error logging
- audit trail
- stale-data monitoring
- model-call logs
- data freshness checks

Current owner:

- not yet implemented

Target product rule:

- the product should reveal whether it is healthy, trusted, and current

Why it matters:

- products need operations, not just UI

When:

- before serious internal rollout

### 11. Release / Change-Control Layer

What it is:

- migrations
- seed versioning
- metric versioning
- environment separation
- release notes
- signoff checklists

Current owner:

- partly manual
- partly documented

Target product rule:

- changes to metric logic and data model should be deployable, reviewable, and reversible

Why it matters:

- prevents metric drift and rollout chaos

Current related docs:

- `METRIC_CHANGE_PROTOCOL.md`
- `LOGIC_AUDIT_CHECKLIST.md`

When:

- now, and keep strengthening it

## Priority Order

This is the order I recommend.

### Phase 1. Foundations For A Real Product

Do first:

1. domain layer hardening
2. data-access layer
3. runtime cache / mapper layer
4. calculation / formula discipline

Reason:

- this is the minimum needed to connect Supabase without collapsing the UI

### Phase 2. Trust And Control

Do next:

5. evidence / provenance layer
6. access-control layer
7. release / change-control layer

Reason:

- this is what turns the product from “interesting dashboard” into “defensible system”

### Phase 3. Product Behavior

Do after the foundations are stable:

8. AI service boundary
9. workflow / action layer
10. observability layer

Reason:

- these are product behaviors, and they need stable truth + access + evidence below them

## What Kinds Of Files Should Own What

### Repo-owned now

- product docs
- static UI
- canonical metric registry
- seed plans
- schema files
- adapter contracts

### Database-owned later

- metric definitions and versioned observations
- access scopes
- initiatives
- evidence pack metadata
- benchmark rows
- saved views
- user-specific state

### Service-owned later

- AI prompt registry
- retrieval logic
- model call orchestration
- evaluation and safety checks

## What Not To Do

Do not do these if the goal is a product:

- let raw Supabase rows drive the UI directly
- put formulas only in chat or docs but not in the canonical registry
- add new explainable metrics without updating the library
- let view-specific labels drift away from canonical metric meaning
- hide provenance only in prose
- mix AI prompts, data fetching, and rendering in one file
- make auth / masking assumptions only in the UI

## Done Criteria For “Product-Grade Enough To Roll Out Internally”

The cockpit is no longer just a pet project when:

- key metrics have one canonical definition
- live reads come through a repository + mapper layer
- benchmark and board-opening numbers can be traced to seeded/live data
- access rules are explicit
- evidence claims are explainable
- metric changes follow the protocol
- database changes are migration-based
- the AI layer has its own governed boundary
- the team can change one layer without breaking the others

## Related Docs

- [AGENTS.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/AGENTS.md:1)
- [DATA_MODEL_ALIGNMENT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/DATA_MODEL_ALIGNMENT.md:1)
- [SUPABASE_ALIGNMENT_HANDOFF.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ALIGNMENT_HANDOFF.md:1)
- [SUPABASE_ADAPTER_CONTRACT.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/SUPABASE_ADAPTER_CONTRACT.md:1)
- [METRIC_CHANGE_PROTOCOL.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/METRIC_CHANGE_PROTOCOL.md:1)
- [LOGIC_AUDIT_CHECKLIST.md](/Users/umamudigonda/MY%20CODING/Git/IAI%20Colloboration/LOGIC_AUDIT_CHECKLIST.md:1)

## Practical Summary

If we want this to become a real AI product, the next big step is not “more screens.”

It is:

- clear domain truth
- clear data access
- clear calculation logic
- clear evidence
- clear access
- clear AI behavior boundary

That is the line between a polished prototype and a governable product.

