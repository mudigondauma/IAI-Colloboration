---
name: delivery-ui-pass
description: Use when polishing the Delivery view in the Meridian cockpit, especially when tightening hierarchy, reducing density, deciding whether a section should stay directly readable or become clickable, and updating the standard Delivery UI files consistently.
---

# Delivery UI Pass

## Overview

Use this skill when the task is a Delivery-view UI pass rather than a metric-meaning change.

This skill is for repeated Delivery workflow work such as:

- tightening the opening hierarchy
- reducing density or whitespace
- improving section readability
- deciding whether a section should stay directly readable
- grouping a dense section into clickable reading modes
- keeping Delivery interaction patterns consistent across sections

Do not use this skill for:

- metric definition or formula changes
- Supabase or schema work
- Institutionalisation-only UI work
- cosmetic-only one-line copy tweaks that do not affect Delivery workflow structure

## Read Order

Before editing, read these in order:

1. `AGENTS.md`
2. `WHERE_TRUTH_LIVES.md`
3. `CURRENT_STATE_HANDOFF.md`
4. `UI_POLISH_BACKLOG.md`

Read these too if the task touches meaning, not just UI:

5. `COCKPIT_METRIC_PRIMER.md`
6. `METRIC_CHANGE_PROTOCOL.md`

## Workflow

### 1. Classify The Section

First decide what kind of Delivery section this is:

- opening posture or KPI snapshot
- section that should stay immediately readable
- section that is too dense and should be grouped into reading modes
- operational queue or lane section
- explanatory method section

Do not default everything to clickable.

### 2. Inspect Before Changing

Check the current section in:

- `index.html`
- `app.js`
- `styles-delivery.css`
- `styles-responsive.css`

Look for these failure modes:

- filter chrome appearing before the message
- repeated context shown both as chips and editable controls
- dense sections squeezed into half-width columns
- several unrelated cards stacked without a clear reading order
- interactive grouping that would hide content that should stay immediately visible

### 3. Choose The Right Pattern

Use these heuristics:

- keep KPI openings, swimlanes, and decision queues directly readable
- use clickable grouping when a section really has multiple reading modes
- move dense operational sections to full width if the half-column layout is squeezing them
- prefer one short posture line plus evidence over a tall hero
- use a compact context summary instead of repeating the same filters as pills

Good clickable candidates usually break into 2 or 3 clear modes such as:

- posture / risk / controls
- value / spend / efficiency
- method / drivers / ledger

### 4. Update In The Standard Delivery Pattern

If the change introduces or modifies a Delivery grouped section, update in this order:

1. `app.js` state
2. section render function in `app.js`
3. Delivery click handler in `app.js`
4. `styles-delivery.css`
5. `styles-responsive.css`
6. `CURRENT_STATE_HANDOFF.md`

If the section moved structurally, also check:

- `index.html`
- `WHERE_TRUTH_LIVES.md` if file roles or canonical ownership changed

### 5. Keep Delivery Consistent

Match the established Delivery interaction language:

- compact section framing
- numbered switchers for grouped sections
- active/open state labeling
- concise notes and CTA lines
- dark operational tone with readable contrast

Do not invent a new interaction pattern if an existing Delivery one already fits.

### 6. Verify Before Finishing

Run:

- `git diff --check`

Then verify, as relevant:

- the section is easier to scan than before
- the section is not squeezed into the wrong width
- the switcher names match the actual reading modes
- the grouped section still works on smaller screens
- no old duplicated context chips remain above editable controls

## Guardrails

- Do not make every section clickable just because the pattern exists.
- Do not let Delivery become more chrome-heavy while trying to add structure.
- Do not change metric meaning during a UI-only pass.
- Do not forget `CURRENT_STATE_HANDOFF.md` when the Delivery structure changes materially.
- Do not leave half-converted sections where the layout and interaction model disagree.

## Expected Output

When using this skill, the final work should make clear:

- which Delivery section changed
- why it stayed direct or became grouped
- which files were updated
- whether repo-memory docs were updated too
