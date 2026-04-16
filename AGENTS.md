# AGENTS.md

## Purpose

This repository is a static prototype for an executive AI dashboard called the Meridian AI Enterprise Cockpit. The current implementation is presentation-first: it is designed to communicate product direction, operating metrics, governance posture, and oversight workflows for CIO and executive audiences.

Treat this repo as a polished front-end concept, not a production application.

## Source Of Truth

The live prototype is the three-file static app below:

- `index.html`: page structure and section containers
- `styles.css`: full visual system, layout, responsiveness, and component styling
- `app.js`: all demo data, UI state, formatting helpers, and render logic

If a user asks you to update the actual dashboard experience, default to editing those three files.

## Reference Artifacts

These files are important context, but they are not the main runtime unless the user explicitly asks to work on them:

- `MeridianAICockpit_Unified.html`: larger standalone concept prototype spanning multiple views
- `MeridianAICockpit_Toggle.html`: alternate or earlier prototype with toggle-based presentation
- `data_model.html`: conceptual end-to-end data model and schema document
- `deep-research-report on AI Copit.md`: written critique of cockpit gaps and recommended improvements
- `Meridian AI Enterprise Cockpit Deep Audit.docx`: exported audit document

Use these as design, product, or architecture references. Do not silently copy changes between them and the live prototype unless asked.

## How The Current App Works

- The app is fully client-side and has no build step.
- There is no package manager, no framework, no backend, and no API integration at the repo root.
- `app.js` stores the entire demo dataset in plain JavaScript objects.
- UI changes are driven by a small `state` object and a top-level `render()` function.
- Filters and toggles rerender the page from in-memory data only.
- Portfolio content currently exists for `enterprise`, `product`, and `operations`.
- Oversight content is split into a separate `oversightProfiles` object.

If you add a new metric or portfolio field, update both the data objects and the render path that consumes them.

## Working Conventions For Agents

- Preserve the static nature of the repo unless the user asks for a bigger architectural change.
- Prefer extending the existing HTML/CSS/vanilla JS approach over introducing frameworks or tooling.
- Keep the executive-dashboard tone: concise labels, decision-oriented copy, and polished presentation.
- Maintain consistency between filters, labels, dates, and portfolio narratives.
- When editing data in `app.js`, keep baseline, pilot, and target values internally consistent.
- When editing UI sections, preserve accessibility basics already present in the markup, including labels, headings, and ARIA usage.
- Keep responsive behavior intact. Check existing media-query patterns in `styles.css` before adding new layout rules.
- Use `data_model.html` as a conceptual backend guide, not as a strict implementation contract.
- Treat the research report as critique and product guidance, not runtime truth.

## Integration Discipline

This repo now has an explicit integration path. Agents should not treat each request as an isolated UI tweak.

- Treat `INTEGRATION_PLAN.md` as the story-level guide for what the product is becoming.
- Treat `SECTION_MAPPING.md` and `TOGGLE_TO_INSTITUTIONALISATION_MAPPING.md` as the section-reconciliation record.
- Treat `DEEP_RESEARCH_GAP_BACKLOG.md` as the ordered gap-remediation backlog.
- Treat `DATA_MODEL_ALIGNMENT.md` and `data_model.html` as the semantic and structural reference for data meaning.
- Treat `index.html`, `styles.css`, and `app.js` as the only implementation base unless the user explicitly asks to edit the reference prototypes.

Before making a change, check for these failure modes:

- duplicating an existing feature in another section instead of extending or drilling into it
- creating a second source of truth for the same metric, evidence pack, or workflow state
- porting Toggle or Unified literally when the agreed direction is to adapt, not mirror
- changing data meaning in `app.js` without aligning the model docs
- adding a new panel that should really be a drill-down, drawer, or evidence layer
- implementing a research-gap fix twice under different names

If a requested change looks conflicting, redundant, or structurally off, pause and challenge it before implementing. Say why it may be a problem and what should be done instead.

Use this rule of thumb:

- if the change is visual, copy, or layout only, update the live prototype only
- if the change affects metric meaning, ownership, segmentation, evidence, traceability, or action workflow logic, update the relevant model or backlog docs too
- if the change introduces a new concept, check whether it already exists in the integration plan, mapping docs, or deep-research backlog before building it

## Change Checklist

Before editing, quickly confirm:

- What user problem or research gap is this change solving?
- Is this already present somewhere else in the live prototype or reference docs?
- Am I extending the agreed implementation base, or accidentally creating a parallel version?
- Does this change alter data meaning, evidence logic, segmentation, or workflow state?
- If yes, do `DEEP_RESEARCH_GAP_BACKLOG.md`, `DATA_MODEL_ALIGNMENT.md`, or `data_model.html` also need an update?
- Will this make the board story and delivery story more connected, or more fragmented?
- Is this better as a new section, or should it be a drill-down, drawer, chip, or evidence layer instead?
- Could this break consistency across labels, filters, dates, or metric definitions?

If any answer suggests duplication, conflict, or drift, stop and explain the issue before making the change.

## Editing Guidance

- For content or layout updates, start with `index.html` and `styles.css`.
- For any metric, filter, toggle, or card behavior, start with `app.js`.
- If you change section names or control labels, verify that related copy in summaries, chips, and tables still matches.
- If you add a new workflow or team, update the label maps and any prioritization logic tied to workflow IDs.
- Avoid broad file renames unless requested. Several filenames currently contain inconsistent capitalization or spelling, but they may be referenced externally.

## Running And Previewing

Because this is a static prototype, the simplest preview options are:

- open `index.html` directly in a browser
- run a lightweight static server such as `python3 -m http.server`

Do not assume a local dev server, test runner, or bundler exists.

## Known Limitations

- All data is mocked and hard-coded.
- There is no persistence, authentication, or service integration.
- There are no automated tests in the repo at the moment.
- The README is minimal and does not document the project.
- The supporting HTML files may overlap conceptually with the main app, but they are not wired together.

## Good Next Steps

If a user asks how to improve this repo, the most natural directions are:

- turn the static data model into JSON or a dedicated data module
- separate rendering logic into smaller component-like functions or files
- add a lightweight local preview workflow
- add basic regression coverage for formatting and rendering logic
- align the live prototype more closely with the data model and audit recommendations
