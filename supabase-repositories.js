(function () {
  const BOARD_METRIC_CODES = [
    "AII_SCORE",
    "AII_STRATEGY_SCORE",
    "AII_OPS_SCORE",
    "AII_PEOPLE_SCORE",
    "GOVERNANCE_COVERAGE",
    "RAI_INDEX",
    "TECH_DEBT_INDEX",
    "BENCHMARK_STRATEGIC_ALIGNMENT",
    "BENCHMARK_PORTFOLIO_ROI",
    "BENCHMARK_GOVERNANCE_RISK",
    "BENCHMARK_WORKFORCE",
    "BENCHMARK_TECHNOLOGY",
    "BENCHMARK_CULTURE",
    "BENCHMARK_OPERATIONAL_AI",
    "BENCHMARK_SLA_XLA",
    "BENCHMARK_RESPONSIBLE_AI",
  ];

  function getClient() {
    if (!window.MeridianSupabase) {
      throw new Error("Supabase client is not initialized.");
    }

    return window.MeridianSupabase;
  }

  function unwrapRows(result, context) {
    if (result.error) {
      throw new Error(`${context}: ${result.error.message}`);
    }

    return result.data || [];
  }

  async function getMetricDefinitions(orgId, metricCodes = BOARD_METRIC_CODES) {
    const client = getClient();
    const result = await client
      .from("metric_definitions")
      .select(
        [
          "id",
          "org_id",
          "metric_code",
          "metric_label",
          "lens",
          "definition",
          "formula",
          "numerator_definition",
          "denominator_definition",
          "owner_role",
          "unit",
          "higher_is_better",
          "source_systems",
          "refresh_cadence",
          "confidence_policy",
          "is_active",
        ].join(","),
      )
      .eq("org_id", orgId)
      .eq("is_active", true)
      .in("metric_code", metricCodes)
      .order("metric_code");

    return unwrapRows(result, "getMetricDefinitions");
  }

  async function getDefaultSlice(orgId, periodKey = null) {
    const client = getClient();
    let query = client
      .from("segment_slices")
      .select(
        [
          "id",
          "org_id",
          "portfolio_id",
          "period_key",
          "geography",
          "function_area",
          "use_case",
          "model_tier",
          "workflow_stage",
          "slice_label",
          "is_default",
        ].join(","),
      )
      .eq("org_id", orgId)
      .eq("is_default", true)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (periodKey) {
      query = query.eq("period_key", periodKey);
    }

    const rows = unwrapRows(await query, "getDefaultSlice");
    return rows[0] || null;
  }

  async function getBoardMetricObservations(orgId, sliceId, periodDate, metricCodes = BOARD_METRIC_CODES) {
    const client = getClient();
    let query = client
      .from("metric_observations")
      .select(
        [
          "id",
          "org_id",
          "segment_slice_id",
          "baseline_value",
          "current_value",
          "target_value",
          "sample_size",
          "confidence_band",
          "last_refresh",
          "period_date",
          "metric_definitions!inner(",
          "id,",
          "metric_code,",
          "metric_label,",
          "lens,",
          "definition,",
          "formula,",
          "numerator_definition,",
          "denominator_definition,",
          "owner_role,",
          "unit,",
          "higher_is_better,",
          "source_systems,",
          "refresh_cadence,",
          "confidence_policy",
          ")",
        ].join(""),
      )
      .eq("org_id", orgId)
      .eq("segment_slice_id", sliceId)
      .order("period_date", { ascending: false });

    if (periodDate) {
      query = query.eq("period_date", periodDate);
    }

    const rows = unwrapRows(await query, "getBoardMetricObservations");
    return rows.filter((row) => metricCodes.includes(row.metric_definitions?.metric_code));
  }

  async function getDimensionScores(orgId, periodDate) {
    const client = getClient();
    let query = client
      .from("dimension_scores")
      .select("id, org_id, dimension_name, org_score, sector_avg, weight, period_date")
      .eq("org_id", orgId)
      .order("dimension_name");

    if (periodDate) {
      query = query.eq("period_date", periodDate);
    }

    return unwrapRows(await query, "getDimensionScores");
  }

  async function getBenchmarkProvenance(orgId, periodDate) {
    const client = getClient();
    let query = client
      .from("benchmarks")
      .select(
        [
          "id",
          "org_id",
          "dimension_name",
          "org_score",
          "sector_avg",
          "sector_leader",
          "sector",
          "sample_size",
          "data_source",
          "period_date",
        ].join(","),
      )
      .eq("org_id", orgId)
      .order("dimension_name");

    if (periodDate) {
      query = query.eq("period_date", periodDate);
    }

    return unwrapRows(await query, "getBenchmarkProvenance");
  }

  window.MeridianSupabaseRepositories = {
    BOARD_METRIC_CODES,
    getMetricDefinitions,
    getDefaultSlice,
    getBoardMetricObservations,
    getDimensionScores,
    getBenchmarkProvenance,
  };
})();
