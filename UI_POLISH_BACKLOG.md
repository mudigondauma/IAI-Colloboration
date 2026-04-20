# UI_POLISH_BACKLOG.md

## Purpose

This file captures the next UI work after the lightweight split.

It is intentionally focused on:

- polish
- hierarchy
- consistency
- interaction clarity

It is **not** a new feature backlog.

## Current Status

The codebase passed a structural smoke check after the split:

- `index.html` loads `styles.css`, `app-data.js`, then `app.js`
- `styles.css` now imports the split CSS files in order
- `app.js` and `app-data.js` startup path completes in a simulated runtime
- imported data keys and exported data keys match
- DOM selectors in `app.js` all resolve against `index.html`
- `git diff --check` passed during the split sanity pass

This means the repo is structurally ready for more UI work.

## Priority 1: Fast Visual Smoke Pass

Check these areas first in the browser and log only obvious issues:

### Navigation

- landing view
- open Institutionalisation
- open Delivery
- return to All views
- hash-based in-page navigation

### Institutionalisation Top Area

- view bar balance
- metadata chip readability
- Saved Views visibility
- Ask panel visibility
- chapter bar visibility

### Institutionalisation Chapters

- Board readout
- Index
- Bridge
- Value
- Workforce
- Governance
- Debt
- Trust
- Benchmarking
- Board priorities

### Delivery Top Area

- view bar
- metadata chips
- Saved Views
- Ask panel
- quick-nav
- filter bar
- KPI strip

### Delivery Sections

- swimlanes
- oversight
- adoption
- productivity
- economics
- governance
- actions
- trust

## Priority 2: Fix-Now UI Issues

These are the kinds of issues to fix immediately when found:

- blank or clipped text
- invisible controls
- chip/button overlap
- floating controls covering key CTAs
- broken sticky bars
- obvious white-space dead zones
- misaligned card grids
- washed-out contrast in tinted or dark areas

## Priority 3: Institutionalisation Polish

### Focus

- stronger board-deck rhythm
- less empty space
- cleaner chapter transitions
- fewer equal-weight boxes

### Likely Target Areas

- Value section tile density and symmetry
- Benchmarking compactness and comparison clarity
- Governance spacing and card weight
- Board priorities spacing and emphasis

## Priority 4: Delivery Polish

### Focus

- more operational texture
- clearer scan path
- less panel competition in trust/governance/action zones

### Likely Target Areas

- quick-nav weight and spacing
- section-head rhythm
- trust-layer density
- action-center alignment
- economics / governance pacing

## Priority 5: Cross-View Consistency

Keep these component families aligned:

- view bars
- metadata chips
- Saved Views
- Ask panels
- detail / evidence buttons
- segmentation controls
- empty states
- drawer actions

## Watch Items From Recent Work

These are not confirmed bugs right now, but they are high-value watch points:

- Workforce top strips and proof-card visual balance
- Bridge flip readability and tile height
- Value section spacing around selector and selected initiative
- Ask return chip placement vs nearby actions
- chapter / quick-nav stickiness on smaller screens

## Rule For This Phase

Before adding anything new, ask:

- can this be solved with spacing, hierarchy, or grouping?
- can this be solved by combining or simplifying cards?
- does this strengthen the board-to-delivery story?

If not, defer it.
