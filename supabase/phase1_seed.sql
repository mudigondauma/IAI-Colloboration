-- Meridian AI Enterprise Cockpit
-- Supabase / PostgreSQL Phase 1 seed
--
-- Scope of this seed:
-- - one demo org
-- - one default enterprise board slice
-- - metric definitions for the first visible board read path
-- - metric observations for AII, sub-scores, and current board support metrics
-- - full nine-dimension benchmark seed for comparison and provenance
--
-- Intentionally not seeded yet:
-- - ai_initiatives
-- - value_realizations
-- - finance_validations
-- - evidence_packs
--
-- Those should come next, once K confirms the first read adapter path.

begin;

-- ============================================================================
-- Seed constants
-- ============================================================================

-- Demo tenant used for the first working prototype.
-- Replace later if you introduce a real organisations table or a seeded profile.
--
-- org_id: 11111111-1111-1111-1111-111111111111
-- default slice id: 22222222-2222-2222-2222-222222222222

-- ============================================================================
-- 1. Segment slice
-- ============================================================================

insert into public.segment_slices (
  id,
  org_id,
  portfolio_id,
  period_key,
  geography,
  function_area,
  use_case,
  model_tier,
  workflow_stage,
  slice_label,
  is_default
)
values (
  '22222222-2222-2222-2222-222222222222'::uuid,
  '11111111-1111-1111-1111-111111111111'::uuid,
  null,
  'Q2_2026',
  null,
  null,
  null,
  null,
  'ALL',
  'Q2 2026 · all regions, functions, use cases, and model tiers',
  true
)
on conflict (org_id, slice_label) do update
set
  period_key = excluded.period_key,
  geography = excluded.geography,
  function_area = excluded.function_area,
  use_case = excluded.use_case,
  model_tier = excluded.model_tier,
  workflow_stage = excluded.workflow_stage,
  is_default = excluded.is_default,
  updated_at = now();

-- ============================================================================
-- 2. Metric definitions
-- ============================================================================

insert into public.metric_definitions (
  org_id,
  metric_code,
  metric_label,
  lens,
  definition,
  formula,
  numerator_definition,
  denominator_definition,
  owner_role,
  unit,
  higher_is_better,
  source_systems,
  refresh_cadence,
  confidence_policy,
  is_active
)
values
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'AII_SCORE',
    'AII Score',
    'INSTITUTIONALISATION',
    'Composite institutionalisation score measuring whether AI is becoming a repeatable enterprise capability rather than a set of isolated pilots.',
    '0.20 strategy + 0.20 operations + 0.15 people + 0.15 governance + 0.15 technology + 0.15 responsible AI.',
    'Weighted sum of normalized domain scores across portfolio value, governance, workforce, delivery, and control-system measures.',
    '100-point composite maturity scale.',
    'Enterprise AI PMO + Data Office',
    'INDEX',
    true,
    '["Jira Align delivery telemetry","FinOps AI ledger","Control Tower policy registry","Workforce telemetry"]'::jsonb,
    'Quarterly board frame with weekly source checks',
    'B / directional but still partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'GOVERNANCE_COVERAGE',
    'Governance Coverage',
    'INSTITUTIONALISATION',
    'Share of in-scope models operating with required policy, approval, and evidence controls in place.',
    'Governed in-scope models / total in-scope models.',
    '23 models with control pack, named owner, risk classification, and current approval evidence.',
    '31 in-scope production or scaling models.',
    'Risk & Compliance',
    'PCT',
    true,
    '["Control Tower policy registry","Approval workflow ledger","Audit evidence hub"]'::jsonb,
    'Weekly',
    'A- / system-of-record backed',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'RAI_INDEX',
    'RAI Index',
    'INSTITUTIONALISATION',
    'Composite responsible AI readiness score covering evaluation discipline, transparency, accountability, and incident preparedness.',
    'Weighted readiness score across evaluation coverage, transparency artifacts, accountability controls, incident handling, and policy adherence.',
    'Weighted pass scores across trust, control, and review dimensions for in-scope use cases.',
    '100-point responsible AI readiness scale.',
    'Responsible AI Office',
    'INDEX',
    true,
    '["RAI control library","Evaluation registry","Incident review log"]'::jsonb,
    'Monthly',
    'B / methodology stable, evidence coverage still maturing',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'TECH_DEBT_INDEX',
    'Tech Debt Index',
    'INSTITUTIONALISATION',
    'Composite debt score capturing workflow fragility, prompt debt, manual control burden, and platform inconsistency across AI initiatives.',
    'Inverse weighted score across prompt hygiene, orchestration reuse, control automation, architecture debt, and rework burden.',
    'Debt-adjusted weighted burden points aggregated across active initiatives and shared AI platform services.',
    '100-point debt scale where lower scores indicate heavier drag.',
    'Platform Engineering + AI Enablement',
    'INDEX',
    true,
    '["Engineering backlog telemetry","Prompt registry","Release evidence store"]'::jsonb,
    'Monthly',
    'B / partly operational, partly curated',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'AII_STRATEGY_SCORE',
    'Strategy sub-score',
    'INSTITUTIONALISATION',
    'Board-facing AII sub-score summarizing strategic alignment, portfolio value logic, and governance direction.',
    'Weighted aggregate of Strategic alignment, Portfolio & ROI, and Governance & risk dimension scores.',
    'Weighted points from the three board-facing enterprise dimensions in the AII model.',
    '100-point AII sub-score scale.',
    'Enterprise AI PMO + Strategy Office',
    'INDEX',
    true,
    '["AII scoring engine","Dimension scorecards","Board evidence pack"]'::jsonb,
    'Quarterly board frame with weekly source checks',
    'B / composite score built from normalized dimension evidence',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'AII_OPS_SCORE',
    'Ops sub-score',
    'INSTITUTIONALISATION',
    'Board-facing AII sub-score summarizing operational AI depth, service outcomes, and technology readiness.',
    'Weighted aggregate of Operational AI, SLA/XLA, and Technology dimension scores.',
    'Weighted points from the three operations-facing enterprise dimensions in the AII model.',
    '100-point AII sub-score scale.',
    'COO Operations + Platform Engineering',
    'INDEX',
    true,
    '["AII scoring engine","Dimension scorecards","Board evidence pack"]'::jsonb,
    'Quarterly board frame with weekly source checks',
    'B / composite score built from normalized dimension evidence',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'AII_PEOPLE_SCORE',
    'People sub-score',
    'INSTITUTIONALISATION',
    'Board-facing AII sub-score summarizing workforce capability, cultural adoption, and leadership readiness.',
    'Weighted aggregate of Workforce and Culture dimension scores.',
    'Weighted points from the people and adoption dimensions in the AII model.',
    '100-point AII sub-score scale.',
    'People + AI Enablement',
    'INDEX',
    true,
    '["AII scoring engine","Workforce telemetry","Behavioral adoption evidence"]'::jsonb,
    'Quarterly board frame with weekly source checks',
    'B / composite score built from normalized dimension evidence',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_STRATEGIC_ALIGNMENT',
    'Strategic alignment benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for enterprise AI direction, named sponsorship, and portfolio choices aligned to board priorities.',
    'Normalized 0–100 benchmark score for strategic alignment against the selected peer-set sector average.',
    'Weighted benchmark points across executive sponsorship, enterprise narrative clarity, and portfolio alignment artifacts.',
    '100-point peer-normalized dimension scale.',
    'Enterprise AI PMO + Strategy Office',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_PORTFOLIO_ROI',
    'Portfolio & ROI benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for finance-grade value evidence, ROI discipline, and portfolio value governance.',
    'Normalized 0–100 benchmark score for portfolio and ROI against the selected peer-set sector average.',
    'Weighted benchmark points across realized-vs-forecast value proof, attribution discipline, and finance validation depth.',
    '100-point peer-normalized dimension scale.',
    'Finance + Enterprise AI PMO',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_GOVERNANCE_RISK',
    'Governance & risk benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for AI risk classification, control completeness, exception handling, and evidence discipline.',
    'Normalized 0–100 benchmark score for governance and risk against the selected peer-set sector average.',
    'Weighted benchmark points across control coverage, policy enforcement, exception discipline, and audit-ready evidence quality.',
    '100-point peer-normalized dimension scale.',
    'Risk & Compliance',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_WORKFORCE',
    'Workforce benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for workforce readiness, role certification, and safe-use validation at enterprise scale.',
    'Normalized 0–100 benchmark score for workforce against the selected peer-set sector average.',
    'Weighted benchmark points across foundations coverage, role certification, safe-use validation, and leadership readiness.',
    '100-point peer-normalized dimension scale.',
    'People + AI Enablement',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_TECHNOLOGY',
    'Technology benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for platform readiness, telemetry coverage, architecture consistency, and reusable AI enablement.',
    'Normalized 0–100 benchmark score for technology against the selected peer-set sector average.',
    'Weighted benchmark points across shared platform readiness, observability coverage, and reusable AI service foundations.',
    '100-point peer-normalized dimension scale.',
    'Platform Engineering + AI Enablement',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_CULTURE',
    'Culture benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for behavioral adoption, management support, and everyday working-pattern integration.',
    'Normalized 0–100 benchmark score for culture against the selected peer-set sector average.',
    'Weighted benchmark points across adoption depth, line-manager support, and behavioral embedment of approved AI workflows.',
    '100-point peer-normalized dimension scale.',
    'People + Change Office',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_OPERATIONAL_AI',
    'Operational AI benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for live operational AI usage, service automation penetration, and board-visible run-state impact.',
    'Normalized 0–100 benchmark score for operational AI against the selected peer-set sector average.',
    'Weighted benchmark points across run-state automation depth, incident support coverage, and operating AI value proof.',
    '100-point peer-normalized dimension scale.',
    'COO Operations + Service Automation',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_SLA_XLA',
    'SLA/XLA benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for service-level and experience-level improvement associated with AI-assisted operations.',
    'Normalized 0–100 benchmark score for SLA/XLA against the selected peer-set sector average.',
    'Weighted benchmark points across SLA adherence, experience outcomes, and service reliability lift from AI-assisted workflows.',
    '100-point peer-normalized dimension scale.',
    'Service Operations + Experience Office',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  ),
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'BENCHMARK_RESPONSIBLE_AI',
    'Responsible AI benchmark',
    'INSTITUTIONALISATION',
    'Relative benchmark score for responsible AI controls, transparency, review discipline, and incident preparedness.',
    'Normalized 0–100 benchmark score for responsible AI against the selected peer-set sector average.',
    'Weighted benchmark points across RAI control maturity, transparency artifacts, review governance, and incident readiness.',
    '100-point peer-normalized dimension scale.',
    'Responsible AI Office',
    'INDEX',
    true,
    '["Benchmark panel","Analyst synthesis","Dimension scorecards"]'::jsonb,
    'Quarterly benchmark refresh',
    'B / peer-normalized and partly sample-based',
    true
  )
on conflict (org_id, metric_code) do update
set
  metric_label = excluded.metric_label,
  lens = excluded.lens,
  definition = excluded.definition,
  formula = excluded.formula,
  numerator_definition = excluded.numerator_definition,
  denominator_definition = excluded.denominator_definition,
  owner_role = excluded.owner_role,
  unit = excluded.unit,
  higher_is_better = excluded.higher_is_better,
  source_systems = excluded.source_systems,
  refresh_cadence = excluded.refresh_cadence,
  confidence_policy = excluded.confidence_policy,
  is_active = excluded.is_active,
  updated_at = now();

-- ============================================================================
-- 3. Metric observations for the first visible board read path
-- ============================================================================

delete from public.metric_observations mo
using public.metric_definitions md
where mo.metric_definition_id = md.id
  and mo.org_id = '11111111-1111-1111-1111-111111111111'::uuid
  and mo.segment_slice_id = '22222222-2222-2222-2222-222222222222'::uuid
  and mo.period_date = date '2026-04-08'
  and md.metric_code in (
    'AII_SCORE',
    'GOVERNANCE_COVERAGE',
    'RAI_INDEX',
    'TECH_DEBT_INDEX',
    'AII_STRATEGY_SCORE',
    'AII_OPS_SCORE',
    'AII_PEOPLE_SCORE',
    'BENCHMARK_STRATEGIC_ALIGNMENT',
    'BENCHMARK_PORTFOLIO_ROI',
    'BENCHMARK_GOVERNANCE_RISK',
    'BENCHMARK_WORKFORCE',
    'BENCHMARK_TECHNOLOGY',
    'BENCHMARK_CULTURE',
    'BENCHMARK_OPERATIONAL_AI',
    'BENCHMARK_SLA_XLA',
    'BENCHMARK_RESPONSIBLE_AI'
  );

insert into public.metric_observations (
  id,
  org_id,
  metric_definition_id,
  segment_slice_id,
  baseline_value,
  current_value,
  target_value,
  sample_size,
  confidence_band,
  last_refresh,
  period_date
)
select
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111'::uuid,
  md.id,
  '22222222-2222-2222-2222-222222222222'::uuid,
  seed.baseline_value,
  seed.current_value,
  seed.target_value,
  seed.sample_size,
  seed.confidence_band,
  seed.last_refresh,
  seed.period_date
from (
  values
    ('AII_SCORE', 63::numeric, 67::numeric, null::numeric, null::integer, 'MEDIUM'::varchar, timestamptz '2026-04-07 08:30:00+01', date '2026-04-08'),
    ('GOVERNANCE_COVERAGE', null::numeric, 74::numeric, 90::numeric, 31::integer, 'HIGH'::varchar, timestamptz '2026-04-07 07:00:00+01', date '2026-04-08'),
    ('RAI_INDEX', null::numeric, 62::numeric, null::numeric, null::integer, 'MEDIUM'::varchar, timestamptz '2026-04-05 17:15:00+01', date '2026-04-08'),
    ('TECH_DEBT_INDEX', null::numeric, 38::numeric, null::numeric, null::integer, 'MEDIUM'::varchar, timestamptz '2026-04-06 12:00:00+01', date '2026-04-08'),
    ('AII_STRATEGY_SCORE', null::numeric, 71::numeric, null::numeric, null::integer, 'MEDIUM'::varchar, timestamptz '2026-04-07 08:30:00+01', date '2026-04-08'),
    ('AII_OPS_SCORE', null::numeric, 63::numeric, null::numeric, null::integer, 'MEDIUM'::varchar, timestamptz '2026-04-07 08:30:00+01', date '2026-04-08'),
    ('AII_PEOPLE_SCORE', null::numeric, 58::numeric, null::numeric, null::integer, 'MEDIUM'::varchar, timestamptz '2026-04-07 08:30:00+01', date '2026-04-08'),
    ('BENCHMARK_STRATEGIC_ALIGNMENT', null::numeric, 71::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_PORTFOLIO_ROI', null::numeric, 68::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_GOVERNANCE_RISK', null::numeric, 63::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_WORKFORCE', null::numeric, 60::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_TECHNOLOGY', null::numeric, 74::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_CULTURE', null::numeric, 51::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_OPERATIONAL_AI', null::numeric, 61::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_SLA_XLA', null::numeric, 66::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08'),
    ('BENCHMARK_RESPONSIBLE_AI', null::numeric, 62::numeric, null::numeric, 12::integer, 'MEDIUM'::varchar, timestamptz '2026-04-02 00:00:00+01', date '2026-04-08')
) as seed (
  metric_code,
  baseline_value,
  current_value,
  target_value,
  sample_size,
  confidence_band,
  last_refresh,
  period_date
)
join public.metric_definitions md
  on md.org_id = '11111111-1111-1111-1111-111111111111'::uuid
 and md.metric_code = seed.metric_code;

-- ============================================================================
-- 4. Dimension scores (full nine-dimension benchmark spine)
-- ============================================================================

insert into public.dimension_scores (
  org_id,
  dimension_name,
  org_score,
  sector_avg,
  weight,
  period_date
)
values
  ('11111111-1111-1111-1111-111111111111'::uuid, 'STRATEGIC_ALIGNMENT', 71, 62, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'PORTFOLIO_ROI', 68, 59, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'GOVERNANCE_RISK', 63, 71, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'WORKFORCE', 60, 55, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'TECHNOLOGY', 74, 66, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'CULTURE', 51, 52, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'OPERATIONAL_AI', 61, 48, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'SLA_XLA', 66, 54, null, date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'RESPONSIBLE_AI', 62, 57, null, date '2026-04-08')
on conflict (org_id, dimension_name, period_date) do update
set
  org_score = excluded.org_score,
  sector_avg = excluded.sector_avg,
  weight = excluded.weight,
  updated_at = now();

-- ============================================================================
-- 5. Benchmark provenance rows
-- ============================================================================

delete from public.benchmarks
where org_id = '11111111-1111-1111-1111-111111111111'::uuid
  and period_date = date '2026-04-08'
  and data_source = 'Q1 2026 Meridian AI benchmark panel + analyst synthesis';

insert into public.benchmarks (
  org_id,
  dimension_name,
  org_score,
  sector_avg,
  sector_leader,
  sector,
  sample_size,
  data_source,
  period_date
)
values
  ('11111111-1111-1111-1111-111111111111'::uuid, 'STRATEGIC_ALIGNMENT', 71, 62, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'PORTFOLIO_ROI', 68, 59, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'GOVERNANCE_RISK', 63, 71, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'WORKFORCE', 60, 55, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'TECHNOLOGY', 74, 66, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'CULTURE', 51, 52, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'OPERATIONAL_AI', 61, 48, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'SLA_XLA', 66, 54, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08'),
  ('11111111-1111-1111-1111-111111111111'::uuid, 'RESPONSIBLE_AI', 62, 57, null, '12 regulated-service enterprises with scaled AI programs', 12, 'Q1 2026 Meridian AI benchmark panel + analyst synthesis', date '2026-04-08');

commit;
