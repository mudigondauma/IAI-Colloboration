# TOGGLE_TO_INSTITUTIONALISATION_MAPPING.md

## Purpose

This document maps the old **Toggle Strategic View** to the current **Institutionalisation View** in the integrated app.

It answers one practical question:

`Toggle Strategic section -> Institutionalisation section -> same / merged / dropped / deferred`

## Short Answer

The Institutionalisation View is **not** a 1:1 copy of the Toggle Strategic View.

It is:

- visually influenced by the Toggle Strategic View
- structurally simplified for Phase 1
- reframed around a stronger board narrative

So most sections are **same but adapted**, while a few are **merged**, and some deeper visual/detail layers are **deferred** for later refinement.

## Status Legend

- `Same`: the section survives with essentially the same purpose
- `Merged`: the original section was folded into another section or split across multiple new sections
- `Dropped`: intentionally removed from the current Institutionalisation view
- `Deferred`: not removed forever, but postponed from the current Phase 1 implementation
- `Added`: new board-oriented section introduced in the Institutionalisation view

## Major Section Mapping

| Toggle Strategic View | Institutionalisation View | Status | What Happened |
| --- | --- | --- | --- |
| Always-visible north-star strip | Strategic hero + North-Star View strip | `Merged` | The old top strip has been re-expressed as the dark Institutionalisation hero plus the dedicated North-Star View strip |
| 01. AI Institutionalisation Index | Board Readout + Institutionalisation Index | `Merged` | The old AII section was split into a board-level interpretation layer and a separate evidence section for maturity against sector baseline |
| 02. Delivery engine summary | Why the CIO delivery lens now matters to the board | `Same` | Same bridge idea, but rewritten to explain why delivery evidence now belongs in the board story |
| 03. Use case portfolio & value realisation | Value realisation and exposure | `Same` | Same portfolio/value logic, renamed to sound more like a board risk-and-value discussion |
| 04. Workforce capability & literacy | Capability, literacy, and leadership readiness | `Same` | Same theme, but reframed from training inventory toward enterprise readiness and leadership scaling capacity |
| 05. Governance & risk | Governance readiness and enterprise exposure | `Same` | Same core section, but sharpened toward governance maturity and scale risk |
| 06. AI Technical Debt | Structural debt holding back scale | `Same` | Same core topic, but given more executive language and less prototype-style labeling |
| 07. Responsible AI Dashboard | Trust, control, and regulatory readiness | `Same` | Same underlying RAI and readiness story, but retitled for board relevance |
| 08. Competitive benchmarking | Competitive position and board priorities | `Merged` | Benchmarks remain, but the framing is now explicitly about where leadership should invest next |
| Strategic footer | Strategic Metadata + Strategic Sources | `Same` | Same role, cleaner integrated footer pattern |

## Subsection / Component Mapping

This section is more precise than the major-section map. It shows where the important visual and informational components actually landed.

| Toggle Strategic Component | Institutionalisation Equivalent | Status | Notes |
| --- | --- | --- | --- |
| AII composite score card | Hero scorecard on the right side of the Institutionalisation header | `Same` | Same core content, now pulled upward into the hero |
| Strategy / Ops / People mini-scores | Hero subscores in the Institutionalisation header | `Same` | Same idea, same numbers, different placement |
| Dimension scores vs sector average | Institutionalisation Index section | `Same` | Still present as the core evidence block |
| Top signals | North-Star signal pills + Institutionalisation signal cards | `Merged` | Signal language is now split between a fast visual strip and a richer interpretive panel |
| Delivery bridge note + metrics | Why the CIO delivery lens now matters to the board | `Same` | Same concept, rewritten for stronger board logic |
| Portfolio top metrics | Value realisation and exposure metric cards | `Same` | Same numbers and purpose, same board relevance |
| Portfolio use-case table | Portfolio initiative cards | `Merged` | Same content family, but simplified from table form into cards for the integrated Phase 1 experience |
| Workforce literacy heatmap | Workforce readiness summary | `Deferred` | The exact heatmap is not in the current view; the topic remains, but the visualization was simplified |
| Training pipeline | Workforce readiness summary | `Merged` | Training survives as a narrative readiness summary rather than a standalone visual block |
| AI sentiment & leadership alignment | Workforce readiness summary | `Merged` | Same idea, but folded into the broader workforce leadership story |
| Governance top metrics | Governance readiness and enterprise exposure metric cards | `Same` | Same metrics and purpose |
| Risk register | Governance readiness and enterprise exposure risk cards | `Same` | Same idea, more card-based and less prototype-table-like |
| Debt index callout | Structural debt holding back scale | `Same` | Same topic, same board relevance |
| Debt category cards | Structural debt holding back scale | `Same` | Data survives, naming is more executive |
| Debt heatmap by initiative | Not currently surfaced | `Deferred` | Good candidate to reintroduce later if the view needs more analytical depth |
| Prompt debt warning callout | Structural debt holding back scale | `Same` | Still central to the debt story |
| RAI index card | Trust, control, and regulatory readiness | `Same` | Same top-line role |
| RAI pillar breakdown | Trust, control, and regulatory readiness | `Same` | Same component, currently retained |
| Regulatory readiness block | Trust, control, and regulatory readiness | `Same` | Same component, reframed for board trust/control language |
| Q2 targets | Not currently surfaced as a standalone block | `Deferred` | Can come back later if you want stronger board target-setting on the page |
| Benchmark bars | Competitive position and board priorities | `Deferred` | The explicit bar visualization is currently simplified into board-level lead/gap narrative |
| “Where Meridian leads” card | Competitive position and board priorities | `Same` | Still present |
| “Where to close the gap” card | Competitive position and board priorities | `Same` | Still present |

## What Was Added In The Institutionalisation View

These sections do not map directly from the old Toggle Strategic structure. They were introduced to make the page think more like a board pack.

| Institutionalisation Section | Source Logic | Status | Why It Exists |
| --- | --- | --- | --- |
| Board Readout | New board framing layer | `Added` | Gives the board the conclusion before the evidence sections |
| Board Priorities | Benchmark gaps + research recommendations + board framing | `Added` | Converts the page from “interesting dashboard” into “what leadership should do next” |
| Strategic hero with dark executive framing | Inspired by Toggle visual drama + Unified persona framing | `Added` | Creates a stronger executive-entry feel for the view |
| North-Star View strip | Inspired by Toggle north-star strip | `Added` | Retains the strategic cockpit feel while keeping the board story explicit |

## Practical Interpretation

If you want to think about it simply:

- The **logic** of Toggle Strategic is still here.
- The **language** has been upgraded to be more board-oriented.
- The **layout** has been simplified so it fits the integrated product.
- The **missing pieces** are mostly richer visual modules, not missing story themes.

## What Is Most Important To Know

The biggest transformation is this:

- **Toggle Strategic** was saying: "Here is the strategic dashboard."
- **Institutionalisation View** is saying: "Here is what the board should conclude from the strategic dashboard."

That is why some sections are not copied literally even when the underlying topic is still the same.

## Gap Ledger Rule

Treat this file as the working source of truth for **what is still missing, simplified, or intentionally deferred** from the old Toggle Strategic view.

That means:

- if a section is marked `Deferred`, it is a candidate for reintroduction
- if a section is marked `Merged`, it should usually come back as optional supporting evidence rather than a full standalone section
- if a section is marked `Dropped`, it should only return with a deliberate product reason

The default implementation pattern going forward is:

- keep the main Institutionalisation page clean and board-first
- restore richer Strategic-view modules as **click-open evidence layers**
- attach each restored module to the section it actually supports

## Deferred Pieces Reintroduction Pattern

| Deferred Toggle Component | Current Reintroduction Pattern | Why This Is Better |
| --- | --- | --- |
| Workforce literacy heatmap | Click-open drawer inside the Workforce section | Keeps the board summary simple but restores role-level depth on demand |
| Debt heatmap by initiative | Click-open drawer inside the Tech Debt section | Lets the user inspect where debt concentrates without overwhelming the default story |
| Q2 targets | Click-open drawer inside the Responsible AI / readiness section | Preserves board orientation while still making targets explicit when needed |
| Benchmark bars | Click-open drawer inside the Benchmarking section | Brings back strategic visual comparison without turning the page into a dense benchmark report |

## If You Want To Restore More Of Toggle’s Richness

The best candidates to bring back next are:

- the workforce heatmap
- benchmark comparison bars
- the debt heatmap by initiative
- stronger section dividers / subnav from the Toggle visual system
- slightly more dramatic north-star presentation

Those would increase visual richness without changing the core board-oriented narrative.
