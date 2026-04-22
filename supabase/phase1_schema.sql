-- Meridian AI Enterprise Cockpit
-- Supabase / PostgreSQL Phase 1 schema
--
-- Scope:
-- - measurement spine
-- - value spine
-- - evidence spine
-- - benchmark spine
-- - access scope spine
--
-- Notes:
-- - This file intentionally focuses on stable semantic entities first.
-- - Row Level Security is not enabled here yet because the auth model and
--   viewer-role strategy still need to be finalized with the integration team.
-- - Use an adapter layer between these rows and the current UI shapes.

begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- 1. METRIC DEFINITIONS
-- ============================================================================

create table if not exists public.metric_definitions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  metric_code varchar(80) not null,
  metric_label varchar(160) not null,
  lens varchar(30) not null,
  definition text not null,
  formula text,
  numerator_definition text,
  denominator_definition text,
  owner_role varchar(120),
  unit varchar(20),
  higher_is_better boolean,
  source_systems jsonb not null default '[]'::jsonb,
  refresh_cadence varchar(60),
  confidence_policy varchar(120),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint metric_definitions_lens_chk
    check (lens in ('INSTITUTIONALISATION', 'DELIVERY', 'CROSS_VIEW'))
);

create unique index if not exists metric_definitions_org_metric_code_uidx
  on public.metric_definitions (org_id, metric_code);

create index if not exists metric_definitions_metric_label_idx
  on public.metric_definitions (metric_label);

create index if not exists metric_definitions_org_lens_idx
  on public.metric_definitions (org_id, lens);

drop trigger if exists trg_metric_definitions_updated_at on public.metric_definitions;
create trigger trg_metric_definitions_updated_at
before update on public.metric_definitions
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 2. SEGMENT SLICES
-- ============================================================================

create table if not exists public.segment_slices (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  portfolio_id uuid,
  period_key varchar(30) not null,
  geography varchar(40),
  function_area varchar(60),
  use_case varchar(120),
  model_tier varchar(20),
  workflow_stage varchar(20),
  slice_label varchar(200) not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint segment_slices_workflow_stage_chk
    check (workflow_stage is null or workflow_stage in ('ALL', 'PLANNING', 'BUILD', 'RUN'))
);

create unique index if not exists segment_slices_org_slice_label_uidx
  on public.segment_slices (org_id, slice_label);

create index if not exists segment_slices_filter_lookup_idx
  on public.segment_slices (
    org_id,
    period_key,
    geography,
    function_area,
    use_case,
    model_tier,
    workflow_stage
  );

drop trigger if exists trg_segment_slices_updated_at on public.segment_slices;
create trigger trg_segment_slices_updated_at
before update on public.segment_slices
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 3. METRIC OBSERVATIONS
-- ============================================================================

create table if not exists public.metric_observations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  metric_definition_id uuid not null references public.metric_definitions(id) on delete cascade,
  segment_slice_id uuid not null references public.segment_slices(id) on delete cascade,
  related_entity_type varchar(40),
  related_entity_id uuid,
  baseline_value numeric(14,4),
  current_value numeric(14,4) not null,
  target_value numeric(14,4),
  sample_size integer,
  ci_low_value numeric(14,4),
  ci_high_value numeric(14,4),
  confidence_band varchar(10),
  last_refresh timestamptz,
  period_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint metric_observations_confidence_band_chk
    check (confidence_band is null or confidence_band in ('HIGH', 'MEDIUM', 'LOW')),
  constraint metric_observations_ci_bounds_chk
    check (
      ci_low_value is null
      or ci_high_value is null
      or ci_low_value <= ci_high_value
    )
);

create index if not exists metric_observations_metric_slice_period_idx
  on public.metric_observations (metric_definition_id, segment_slice_id, period_date desc);

create index if not exists metric_observations_related_entity_idx
  on public.metric_observations (related_entity_type, related_entity_id);

create unique index if not exists metric_observations_natural_key_uidx
  on public.metric_observations (
    metric_definition_id,
    segment_slice_id,
    period_date,
    coalesce(related_entity_type, ''),
    coalesce(related_entity_id, '00000000-0000-0000-0000-000000000000'::uuid)
  );

drop trigger if exists trg_metric_observations_updated_at on public.metric_observations;
create trigger trg_metric_observations_updated_at
before update on public.metric_observations
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 4. AI INITIATIVES
-- ============================================================================

create table if not exists public.ai_initiatives (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  portfolio_id uuid,
  name varchar(200) not null,
  function_area varchar(60),
  geography varchar(40),
  delivery_train varchar(120),
  workflow_stage varchar(20),
  use_case varchar(120),
  stage varchar(30),
  delivery_mode varchar(20),
  estimated_value numeric(12,2),
  realised_value numeric(12,2),
  cost numeric(12,2),
  benefit_type varchar(30),
  use_case_classification varchar(10),
  llm_tier varchar(20),
  rag_status varchar(10),
  owner_id varchar(100),
  human_override_rate numeric(5,2),
  policy_exceptions integer,
  start_date date,
  production_date date,
  source_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_initiatives_workflow_stage_chk
    check (workflow_stage is null or workflow_stage in ('PLANNING', 'BUILD', 'RUN')),
  constraint ai_initiatives_stage_chk
    check (stage is null or stage in ('DISCOVERY', 'PILOT', 'SCALING', 'PRODUCTION', 'STALLED')),
  constraint ai_initiatives_delivery_mode_chk
    check (delivery_mode is null or delivery_mode in ('BASELINE', 'PILOT')),
  constraint ai_initiatives_benefit_type_chk
    check (benefit_type is null or benefit_type in ('COST_OUT', 'REVENUE', 'RISK_REDUCTION')),
  constraint ai_initiatives_use_case_classification_chk
    check (use_case_classification is null or use_case_classification in ('GREEN', 'AMBER', 'RED'))
);

create index if not exists ai_initiatives_portfolio_stage_idx
  on public.ai_initiatives (portfolio_id, workflow_stage, stage);

create index if not exists ai_initiatives_filter_lookup_idx
  on public.ai_initiatives (function_area, geography, use_case, llm_tier);

create index if not exists ai_initiatives_name_idx
  on public.ai_initiatives (name);

drop trigger if exists trg_ai_initiatives_updated_at on public.ai_initiatives;
create trigger trg_ai_initiatives_updated_at
before update on public.ai_initiatives
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 5. VALUE REALIZATIONS
-- ============================================================================

create table if not exists public.value_realizations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  initiative_id uuid not null references public.ai_initiatives(id) on delete cascade,
  segment_slice_id uuid references public.segment_slices(id) on delete set null,
  forecast_value_gbp numeric(12,2),
  realized_value_gbp numeric(12,2),
  spend_gbp numeric(12,2),
  benefit_type varchar(30),
  payback_months smallint,
  confidence_band varchar(10),
  value_note text,
  period_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint value_realizations_benefit_type_chk
    check (benefit_type is null or benefit_type in ('COST_OUT', 'REVENUE', 'RISK_REDUCTION')),
  constraint value_realizations_confidence_band_chk
    check (confidence_band is null or confidence_band in ('HIGH', 'MEDIUM', 'LOW'))
);

create index if not exists value_realizations_initiative_period_idx
  on public.value_realizations (initiative_id, period_date desc);

create index if not exists value_realizations_slice_period_idx
  on public.value_realizations (segment_slice_id, period_date desc);

create unique index if not exists value_realizations_natural_key_uidx
  on public.value_realizations (
    initiative_id,
    coalesce(segment_slice_id, '00000000-0000-0000-0000-000000000000'::uuid),
    period_date
  );

drop trigger if exists trg_value_realizations_updated_at on public.value_realizations;
create trigger trg_value_realizations_updated_at
before update on public.value_realizations
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 6. FINANCE VALIDATIONS
-- ============================================================================

create table if not exists public.finance_validations (
  id uuid primary key default gen_random_uuid(),
  value_realization_id uuid not null references public.value_realizations(id) on delete cascade,
  validation_status varchar(20) not null,
  finance_owner varchar(100),
  validated_value_gbp numeric(12,2),
  challenged_delta_gbp numeric(12,2),
  review_note text,
  reviewed_at timestamptz,
  next_review_due date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint finance_validations_status_chk
    check (validation_status in ('VALIDATED', 'PARTIAL', 'CHALLENGED', 'PENDING'))
);

create unique index if not exists finance_validations_value_realization_uidx
  on public.finance_validations (value_realization_id);

drop trigger if exists trg_finance_validations_updated_at on public.finance_validations;
create trigger trg_finance_validations_updated_at
before update on public.finance_validations
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 7. EVIDENCE PACKS
-- ============================================================================

create table if not exists public.evidence_packs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  entity_type varchar(40) not null,
  entity_id uuid not null,
  pack_type varchar(40) not null,
  evidence_status varchar(20) not null,
  storage_ref varchar(300),
  immutable_snapshot boolean not null default false,
  version integer not null default 1,
  owner varchar(100),
  last_checked_at timestamptz,
  summary_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint evidence_packs_status_chk
    check (evidence_status in ('COMPLETE', 'PARTIAL', 'MISSING', 'EXPIRED'))
);

create index if not exists evidence_packs_entity_idx
  on public.evidence_packs (entity_type, entity_id);

create unique index if not exists evidence_packs_version_uidx
  on public.evidence_packs (entity_type, entity_id, pack_type, version);

drop trigger if exists trg_evidence_packs_updated_at on public.evidence_packs;
create trigger trg_evidence_packs_updated_at
before update on public.evidence_packs
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 8. DIMENSION SCORES
-- ============================================================================

create table if not exists public.dimension_scores (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  dimension_name varchar(60) not null,
  org_score smallint not null,
  sector_avg smallint not null,
  vs_sector smallint generated always as (org_score - sector_avg) stored,
  weight numeric(5,2),
  period_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint dimension_scores_dimension_name_chk
    check (
      dimension_name in (
        'STRATEGIC_ALIGNMENT',
        'PORTFOLIO_ROI',
        'GOVERNANCE_RISK',
        'WORKFORCE',
        'TECHNOLOGY',
        'CULTURE',
        'OPERATIONAL_AI',
        'SLA_XLA',
        'RESPONSIBLE_AI'
      )
    ),
  constraint dimension_scores_org_score_chk
    check (org_score between 0 and 100),
  constraint dimension_scores_sector_avg_chk
    check (sector_avg between 0 and 100)
);

create unique index if not exists dimension_scores_org_dimension_period_uidx
  on public.dimension_scores (org_id, dimension_name, period_date);

drop trigger if exists trg_dimension_scores_updated_at on public.dimension_scores;
create trigger trg_dimension_scores_updated_at
before update on public.dimension_scores
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 9. BENCHMARKS
-- ============================================================================

create table if not exists public.benchmarks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  dimension_name varchar(60) not null,
  org_score smallint not null,
  sector_avg smallint not null,
  sector_leader smallint,
  sector varchar(100),
  sample_size integer,
  data_source varchar(100),
  period_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint benchmarks_dimension_name_chk
    check (
      dimension_name in (
        'STRATEGIC_ALIGNMENT',
        'PORTFOLIO_ROI',
        'GOVERNANCE_RISK',
        'WORKFORCE',
        'TECHNOLOGY',
        'CULTURE',
        'OPERATIONAL_AI',
        'SLA_XLA',
        'RESPONSIBLE_AI'
      )
    ),
  constraint benchmarks_org_score_chk
    check (org_score between 0 and 100),
  constraint benchmarks_sector_avg_chk
    check (sector_avg between 0 and 100),
  constraint benchmarks_sector_leader_chk
    check (sector_leader is null or sector_leader between 0 and 100)
);

create unique index if not exists benchmarks_org_dimension_period_source_uidx
  on public.benchmarks (org_id, dimension_name, period_date, coalesce(data_source, ''));

drop trigger if exists trg_benchmarks_updated_at on public.benchmarks;
create trigger trg_benchmarks_updated_at
before update on public.benchmarks
for each row
execute function public.set_updated_at();

-- ============================================================================
-- 10. ACCESS SCOPES
-- ============================================================================

create table if not exists public.access_scopes (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  viewer_role varchar(80) not null,
  view_name varchar(40) not null,
  clearance_level varchar(40) not null,
  allowed_granularity varchar(60) not null,
  masked_data_classes jsonb not null default '[]'::jsonb,
  export_policy varchar(60),
  evidence_access_mode varchar(40),
  approval_group varchar(120),
  audit_logging_mode varchar(40),
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint access_scopes_view_name_chk
    check (view_name in ('INSTITUTIONALISATION', 'DELIVERY')),
  constraint access_scopes_clearance_level_chk
    check (clearance_level in ('BOARD_SUMMARY', 'OPERATIONAL_GOVERNANCE', 'RESTRICTED_EXCEPTION')),
  constraint access_scopes_allowed_granularity_chk
    check (allowed_granularity in ('AGGREGATE_ONLY', 'PORTFOLIO_DETAIL', 'ROUTE_AND_ACTION_DETAIL')),
  constraint access_scopes_export_policy_chk
    check (
      export_policy is null
      or export_policy in ('BOARD_PACK_ONLY', 'SUMMARY_AND_REFERENCES', 'RESTRICTED_EXCEPTION_PATH')
    ),
  constraint access_scopes_evidence_access_mode_chk
    check (
      evidence_access_mode is null
      or evidence_access_mode in ('SUMMARY_ONLY', 'SUMMARY_PLUS_REFERENCES', 'APPROVAL_REQUIRED')
    ),
  constraint access_scopes_audit_logging_mode_chk
    check (
      audit_logging_mode is null
      or audit_logging_mode in ('READ_AND_EXPORT_LOGGED', 'EXPORT_LOGGED_ONLY')
    )
);

create unique index if not exists access_scopes_org_role_view_uidx
  on public.access_scopes (org_id, viewer_role, view_name);

drop trigger if exists trg_access_scopes_updated_at on public.access_scopes;
create trigger trg_access_scopes_updated_at
before update on public.access_scopes
for each row
execute function public.set_updated_at();

commit;
