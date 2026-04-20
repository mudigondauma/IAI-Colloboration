# LOGIC_AUDIT_CHECKLIST.md

## Purpose

This checklist is for the phase after the current UI polish pass.

Use it to verify that:

- metrics are still correct
- labels still match the data
- board and delivery stories still reconcile
- the split did not hide any second source of truth

## 1. Metric Inventory

For each important metric, confirm:

- metric name
- display label
- where it appears
- formula
- owner
- source systems
- refresh cadence
- confidence

Minimum set:

- AII Score
- Portfolio ROI
- Governance Coverage
- RAI Index
- Tech Debt Index
- Flow Index
- Quality Guardrail
- AI Coverage
- Net Productivity Gain
- AI Run-Rate Cost
- Value delivered
- forecast value
- realized value
- finance-validated share
- weighted payback
- realized ROI

## 2. Cross-View Reconciliation

Check whether the same concept appears consistently in both views:

- Flow Index
- Quality Guardrail
- AI Coverage
- spend / run-rate framing
- governance posture
- value proof
- workforce readiness

For each, confirm:

- same label or intentionally different label
- same underlying logic
- same direction of improvement
- no contradictory numbers in the same slice

## 3. Filter Integrity

Check that the active slice is respected across:

- period
- team
- workflow
- geography
- business function
- use case
- model tier

Confirm:

- cards change when the filter should matter
- cards stay stable when the filter should not matter
- saved views set filters intentionally
- Ask answers reflect the current slice

## 4. Evidence Integrity

For a sample of metrics, initiatives, controls, and actions, confirm:

- evidence pack opens
- status/tone matches the visible card
- summary aligns with the parent metric or initiative
- no duplicated or conflicting evidence pack for the same object

## 5. Action Workflow Integrity

For a sample of action cards, confirm:

- severity
- status
- progress
- evidence state
- source signal
- due date
- owner

All should tell one consistent story.

## 6. Workforce Logic Check

Confirm the chapter hierarchy still makes sense:

- `Foundations learning` = baseline denominator
- top three progress strips = capability gates
- proof cards = validation evidence
- ladder = sequence, not competing metrics

Check that no percentage accidentally implies the same denominator if it does not.

## 7. Benchmarking Logic Check

Confirm:

- peer group, source, refresh, and confidence are consistent
- summary cards do not contradict comparison bars
- lead/trail language matches the benchmark deltas

## 8. Governance Logic Check

Confirm:

- governance by risk class
- compliance matrix
- RBAC/access scope
- reliability / prompt security / RAG / model monitoring

These should complement each other, not repeat each other.

## 9. Drawer / Drill-Down Integrity

Confirm:

- metric info buttons still resolve to the right metric ids
- evidence pack buttons still resolve to the right evidence ids
- no broken references after the split

## 10. Final Audit Outcome

Classify each finding as:

- `Confirmed issue`
- `Wording mismatch`
- `Presentation only`
- `Needs model/doc alignment`
- `No action`

## Rule

If a logic issue is found, prefer fixing the source data or render logic first.

Do not patch the copy alone if the underlying metric meaning is wrong.
