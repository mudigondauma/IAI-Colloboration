# INTEGRATION_PLAN.md

## Why This Exists

This repo currently contains multiple strong but overlapping assets:

- `index.html` + `styles.css` + `app.js`: the cleanest working delivery-focused prototype
- `MeridianAICockpit_Toggle.html`: a richer enterprise cockpit concept with strategic and delivery framing
- `MeridianAICockpit_Unified.html`: a persona-based shell that frames the cockpit by executive role
- `deep-research-report on AI Copit.md`: a critique of gaps of `MeridianAICockpit_Toggle.html`, especially around definitions, drill-down, evidence, and operational trust
- `data_model.html`: the current conceptual data model, originally aligned more closely to the Meridian cockpit work than to `index.html`

The problem is not that there are "too many files". The real problem is that the product story, implementation base, and data model have not yet been explicitly reconciled.

This document defines the recommended way forward.

## Core Recommendation

Do not merge the HTML files first.

First merge the **story**, then the **information architecture**, then the **data model**, and only then the UI implementation.

## Answer To The Key Question

Yes: `MeridianAICockpit_Unified.html` should be treated as a **persona-view shell**.

It is not just another dashboard page. It is a navigation and storytelling model built around role entry points:

- CEO / CFO / Board
- CIO / Engineering / Delivery
- CISO / Risk / Compliance
- COO / Operations / Service

That means `Unified` is best used as the **top-level product architecture**:

- one platform
- shared data foundation
- different views for different executive roles

It should **not** be the day-to-day implementation base unless the team explicitly decides to rebuild the app as one large single-file prototype.

## Proposed Product Story

The cleanest story for the final product is:

1. Meridian has one AI enterprise cockpit.
2. Different leaders need different views of the same underlying truth.
3. The cockpit should answer four executive questions:
   - Are we getting value from AI?
   - Are we doing it safely and governably?
   - Where is it working, and where is it stuck?
   - What should leadership do next?

From that, the best narrative structure is:

- **Landing / role entry**: from `MeridianAICockpit_Unified.html`
- **Institutionalisation / strategic view**: based mainly on K's cockpit work
- **Delivery engine / CIO view**: based mainly on `index.html`
- **Risk / governance view**: phase 2 or selective carryover from `Unified`
- **Operations / service view**: phase 2 or selective carryover from `Unified`

## Recommended Final Shape

### Phase 1 Product Scope

Ship a cockpit with **two primary production-quality views**:

- **Institutionalisation View**
  - audience: CEO / CFO / Board
  - source inspiration: K's strategic / cockpit work
  - purpose: maturity, value, risk, workforce, governance, benchmarking

- **Delivery Engine View**
  - audience: CIO / engineering / delivery leaders
  - source inspiration: your `index.html`
  - purpose: delivery flow, quality, AI workflow coverage, oversight, economics, action plan

### Phase 2 Product Scope

Add or expand:

- **Risk & Governance View**
- **Operations & Service View**

These should be treated as later, focused expansions unless there is a strong presentation need to show all four personas immediately.

## Recommended Technical Base

Use the current static app as the implementation base:

- `index.html`
- `styles.css`
- `app.js`

Why:

- it is split cleanly into structure, styling, and behavior
- it is easier to maintain than the single-file prototypes
- it is already close to a real implementation pattern
- it gives the team a better path for iterative refinement

Treat these files as the canonical codebase. Treat K's HTML files as reference inputs to port from.

## Role Of Each Existing Asset

### `index.html`

Use as the base for:

- Delivery Engine View
- reusable panel structure
- refined presentation of KPIs, swimlanes, oversight, economics, actions, and roadmap

### `MeridianAICockpit_Toggle.html`

Use as a source for:

- enterprise cockpit framing
- strategic-to-delivery storytelling
- executive language and section ideas
- concepts that may still be stronger than the current `index.html`

Do not treat it as the final implementation file.

### `MeridianAICockpit_Unified.html`

Use as a source for:

- persona-based landing page
- role-based information architecture
- long-term product structure across executive audiences

This is the right place to take the idea of "one platform, different views".

### `deep-research-report on AI Copit.md`

Use as:

- the prioritised improvement backlog
- the quality bar for what the cockpit still lacks
- a guide for what must be added to become decision-grade rather than just presentation-grade

This document should influence the roadmap, not be copied blindly into the UI.

### `data_model.html`

Use as:

- the starting point for the unified data model
- the bridge between strategic and delivery views

It should be extended and revised, not replaced with a separate model for `index.html`.

## Data Model Recommendation

Do **not** build a separate "Index data model" in parallel.

Instead, evolve `data_model.html` into the canonical unified model for the whole cockpit.

### What To Do

1. Keep the existing model as the base.
2. Review every section in `index.html`.
3. Map each section to existing entities in `data_model.html`.
4. Add missing entities, fields, or relationships only where needed.
5. Rename or clarify any fields whose meaning is ambiguous.

### Practical Meaning

The future model should support both:

- strategic / institutionalisation metrics
- delivery / operational metrics

The cockpit should feel like:

- one shared data layer
- multiple role-specific views over it

Not:

- one model for K's prototype
- one model for your prototype

## Recommended Integration Sequence

### Step 1. Lock the narrative

Agree on the final story:

- one enterprise cockpit
- persona-based entry
- two core views first
- optional expansion to four persona views later

### Step 2. Create a section mapping

Make a simple matrix:

`Final section | Primary source | Keep / adapt / drop | Data model support | Notes`

This should cover:

- landing / role entry
- institutionalisation overview
- delivery KPIs
- workflow swimlanes
- human oversight
- economics
- governance
- actions
- roadmap

### Step 3. Rationalise metrics and labels

Before heavy UI work, normalize:

- metric names
- definitions
- dates and time windows
- baseline / pilot / target logic
- audience-specific terminology

This prevents the final experience from feeling stitched together.

### Step 4. Unify the data model

Update `data_model.html` so it clearly supports:

- the strategic view
- the delivery view from `index.html`
- future risk and operations views if retained

### Step 5. Implement on the `index.html` stack

Port the best ideas from K's work into:

- `index.html`
- `styles.css`
- `app.js`

### Step 6. Use the research report to drive upgrades

Prioritise the gaps that matter most for credibility:

- metric definitions
- evidence and traceability
- drill-down readiness
- governance as a control system
- finance-grade value attribution

## Suggested Phase 1 Deliverable

The best near-term deliverable is:

### "Meridian AI Enterprise Cockpit v1"

- a simple role-entry shell
- an Institutionalisation View
- a Delivery Engine View
- shared visual language
- shared terminology
- shared data model direction

This is the most coherent midpoint between your work and K's work.

## Suggested Division Of Labor

### Your strongest area right now

- implementation structure
- delivery view clarity
- cleaner static app architecture

### K's strongest area right now

- enterprise framing
- strategic storytelling
- persona-oriented cockpit concept

### Best collaboration model

- use K's work to define the top-level narrative and strategic surface
- use your `index.html` stack to implement the integrated product
- use the research report to tighten quality and credibility
- use the data model as the shared foundation that both of you align to

## Immediate Next Task

The next concrete artifact should be a section-mapping document, for example:

- `SECTION_MAPPING.md`

That file should explicitly say:

- what the final views are
- which sections come from which prototype
- which sections are deferred
- which sections have missing data-model support

Once that exists, implementation decisions become much easier.

## Working Decision For Now

Until changed, the recommended working decision is:

- `Unified` = persona architecture
- `Toggle` = concept and section reference
- `index.html` = implementation base
- `data_model.html` = canonical model to evolve
- `deep-research-report on AI Copit.md` = gap backlog and quality benchmark
