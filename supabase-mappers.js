(function () {
  const METRIC_CODE_TO_ID = {
    AII_SCORE: "aii_score",
    AII_STRATEGY_SCORE: "aii_strategy_score",
    AII_OPS_SCORE: "aii_ops_score",
    AII_PEOPLE_SCORE: "aii_people_score",
    GOVERNANCE_COVERAGE: "governance_coverage",
    RAI_INDEX: "rai_index",
    TECH_DEBT_INDEX: "tech_debt_index",
    BENCHMARK_STRATEGIC_ALIGNMENT: "benchmark_strategic_alignment",
    BENCHMARK_PORTFOLIO_ROI: "benchmark_portfolio_roi",
    BENCHMARK_GOVERNANCE_RISK: "benchmark_governance_risk",
    BENCHMARK_WORKFORCE: "benchmark_workforce",
    BENCHMARK_TECHNOLOGY: "benchmark_technology",
    BENCHMARK_CULTURE: "benchmark_culture",
    BENCHMARK_OPERATIONAL_AI: "benchmark_operational_ai",
    BENCHMARK_SLA_XLA: "benchmark_sla_xla",
    BENCHMARK_RESPONSIBLE_AI: "benchmark_responsible_ai",
  };

  const DIMENSION_NAME_TO_LABEL = {
    STRATEGIC_ALIGNMENT: "Strategic alignment",
    PORTFOLIO_ROI: "Portfolio & ROI",
    GOVERNANCE_RISK: "Governance & risk",
    WORKFORCE: "Workforce",
    TECHNOLOGY: "Technology",
    CULTURE: "Culture",
    OPERATIONAL_AI: "Operational AI",
    SLA_XLA: "SLA/XLA",
    RESPONSIBLE_AI: "Responsible AI",
  };

  const DIMENSION_ORDER = [
    "STRATEGIC_ALIGNMENT",
    "PORTFOLIO_ROI",
    "GOVERNANCE_RISK",
    "WORKFORCE",
    "TECHNOLOGY",
    "CULTURE",
    "OPERATIONAL_AI",
    "SLA_XLA",
    "RESPONSIBLE_AI",
  ];

  function getSeedMetricLibrary(existingMetricLibrary) {
    return existingMetricLibrary || window.MeridianCockpitData?.metricLibrary || {};
  }

  function getSeedInstitutionView(existingInstitutionView) {
    return existingInstitutionView || window.MeridianCockpitData?.institutionalizationView || {};
  }

  function normalizeLens(lens) {
    if (!lens) {
      return undefined;
    }

    if (lens === "INSTITUTIONALISATION") {
      return "Institutionalisation";
    }

    if (lens === "DELIVERY") {
      return "Delivery";
    }

    if (lens === "CROSS_VIEW") {
      return "Cross-view";
    }

    return lens;
  }

  function formatDateTime(value) {
    if (!value) {
      return undefined;
    }

    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/London",
        timeZoneName: "short",
      }).format(new Date(value));
    } catch (_error) {
      return String(value);
    }
  }

  function formatDateOnly(value) {
    if (!value) {
      return undefined;
    }

    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Europe/London",
      }).format(new Date(value));
    } catch (_error) {
      return String(value);
    }
  }

  function formatObservationValue(metricCode, value) {
    if (value == null) {
      return null;
    }

    const numericValue = Number(value);

    if (metricCode === "GOVERNANCE_COVERAGE") {
      return `${Math.round(numericValue)}%`;
    }

    if (metricCode === "AII_SCORE" || metricCode === "AII_STRATEGY_SCORE" || metricCode === "AII_OPS_SCORE" || metricCode === "AII_PEOPLE_SCORE" || metricCode === "RAI_INDEX" || metricCode === "TECH_DEBT_INDEX") {
      return String(Math.round(numericValue));
    }

    return String(numericValue);
  }

  function replaceRowsByLabel(existingRows = [], updatesByLabel = {}) {
    return existingRows.map((row) => {
      if (!updatesByLabel[row.label]) {
        return row;
      }

      return {
        ...row,
        ...updatesByLabel[row.label],
      };
    });
  }

  function mapMetricDefinitionRowsToMetricLibraryPatch(rows = [], existingMetricLibrary) {
    const seedMetricLibrary = getSeedMetricLibrary(existingMetricLibrary);
    const patch = {};

    rows.forEach((row) => {
      const metricId = METRIC_CODE_TO_ID[row.metric_code];

      if (!metricId) {
        return;
      }

      const existing = seedMetricLibrary[metricId] || {};
      patch[metricId] = {
        ...existing,
        label: row.metric_label || existing.label,
        lens: normalizeLens(row.lens) || existing.lens,
        definition: row.definition || existing.definition,
        formula: row.formula || existing.formula,
        numerator: row.numerator_definition || existing.numerator,
        denominator: row.denominator_definition || existing.denominator,
        owner: row.owner_role || existing.owner,
        sourceSystems: Array.isArray(row.source_systems) ? row.source_systems : existing.sourceSystems,
        refreshCadence: row.refresh_cadence || existing.refreshCadence,
        confidence: row.confidence_policy || existing.confidence,
      };
    });

    return patch;
  }

  function mapBoardObservationRowsToInstitutionPatch(rows = [], existingInstitutionView) {
    const seedInstitutionView = getSeedInstitutionView(existingInstitutionView);
    const observationByCode = Object.fromEntries(
      rows
        .filter((row) => row.metric_definitions?.metric_code)
        .map((row) => [row.metric_definitions.metric_code, row]),
    );

    const subscoreUpdates = {
      Strategy: {
        value: formatObservationValue("AII_STRATEGY_SCORE", observationByCode.AII_STRATEGY_SCORE?.current_value) || seedInstitutionView.subscores?.find((row) => row.label === "Strategy")?.value,
      },
      Ops: {
        value: formatObservationValue("AII_OPS_SCORE", observationByCode.AII_OPS_SCORE?.current_value) || seedInstitutionView.subscores?.find((row) => row.label === "Ops")?.value,
      },
      People: {
        value: formatObservationValue("AII_PEOPLE_SCORE", observationByCode.AII_PEOPLE_SCORE?.current_value) || seedInstitutionView.subscores?.find((row) => row.label === "People")?.value,
      },
    };

    const northStarUpdates = {
      "AII Score": {
        value: formatObservationValue("AII_SCORE", observationByCode.AII_SCORE?.current_value) || seedInstitutionView.northStar?.find((row) => row.label === "AII Score")?.value,
      },
      "Governance Coverage": {
        value:
          formatObservationValue("GOVERNANCE_COVERAGE", observationByCode.GOVERNANCE_COVERAGE?.current_value) ||
          seedInstitutionView.northStar?.find((row) => row.label === "Governance Coverage")?.value,
      },
      "RAI Index": {
        value: formatObservationValue("RAI_INDEX", observationByCode.RAI_INDEX?.current_value) || seedInstitutionView.northStar?.find((row) => row.label === "RAI Index")?.value,
      },
      "Tech Debt Index": {
        value:
          formatObservationValue("TECH_DEBT_INDEX", observationByCode.TECH_DEBT_INDEX?.current_value) ||
          seedInstitutionView.northStar?.find((row) => row.label === "Tech Debt Index")?.value,
      },
    };

    return {
      subscores: replaceRowsByLabel(seedInstitutionView.subscores, subscoreUpdates),
      northStar: replaceRowsByLabel(seedInstitutionView.northStar, northStarUpdates),
    };
  }

  function mapDimensionScoreRowsToBenchmarkBars(rows = [], existingInstitutionView) {
    const seedInstitutionView = getSeedInstitutionView(existingInstitutionView);
    const scoreByDimension = Object.fromEntries(rows.map((row) => [row.dimension_name, row]));

    const fallbackByLabel = Object.fromEntries((seedInstitutionView.benchmarkBars || []).map((row) => [row.label, row]));

    return DIMENSION_ORDER.map((dimensionName) => {
      const label = DIMENSION_NAME_TO_LABEL[dimensionName];
      const liveRow = scoreByDimension[dimensionName];
      const fallbackRow = fallbackByLabel[label] || {};

      return {
        label,
        meridian: liveRow ? Number(liveRow.org_score) : fallbackRow.meridian,
        sector: liveRow ? Number(liveRow.sector_avg) : fallbackRow.sector,
      };
    }).filter((row) => row.label && row.meridian != null && row.sector != null);
  }

  function mapBenchmarkRowsToBenchmarkProvenance(rows = [], existingInstitutionView) {
    const seedInstitutionView = getSeedInstitutionView(existingInstitutionView);
    const fallback = seedInstitutionView.benchmarkProvenance || {};
    const firstRow = rows[0];

    if (!firstRow) {
      return fallback;
    }

    return {
      ...fallback,
      peerGroup: firstRow.sector || fallback.peerGroup,
      source: firstRow.data_source || fallback.source,
      lastRefresh: formatDateOnly(firstRow.period_date) || fallback.lastRefresh,
    };
  }

  function mapInstitutionBoardSnapshot({
    metricDefinitionRows = [],
    observationRows = [],
    dimensionScoreRows = [],
    benchmarkRows = [],
    existingMetricLibrary,
    existingInstitutionView,
  }) {
    const metricLibraryPatch = mapMetricDefinitionRowsToMetricLibraryPatch(metricDefinitionRows, existingMetricLibrary);
    const institutionPatch = mapBoardObservationRowsToInstitutionPatch(observationRows, existingInstitutionView);
    const benchmarkBars = mapDimensionScoreRowsToBenchmarkBars(dimensionScoreRows, existingInstitutionView);
    const benchmarkProvenance = mapBenchmarkRowsToBenchmarkProvenance(benchmarkRows, existingInstitutionView);

    return {
      metricLibraryPatch,
      institutionPatch: {
        ...institutionPatch,
        benchmarkBars,
        benchmarkProvenance,
      },
      metadata: {
        lastMetricRefresh: observationRows
          .map((row) => row.last_refresh)
          .filter(Boolean)
          .sort()
          .slice(-1)
          .map(formatDateTime)[0] || null,
      },
    };
  }

  window.MeridianSupabaseMappers = {
    METRIC_CODE_TO_ID,
    DIMENSION_NAME_TO_LABEL,
    mapMetricDefinitionRowsToMetricLibraryPatch,
    mapBoardObservationRowsToInstitutionPatch,
    mapDimensionScoreRowsToBenchmarkBars,
    mapBenchmarkRowsToBenchmarkProvenance,
    mapInstitutionBoardSnapshot,
  };
})();
