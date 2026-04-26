(function () {
  const DEFAULT_ORG_ID = "11111111-1111-1111-1111-111111111111";
  const DEFAULT_PERIOD_DATE = "2026-04-08";

  function clone(value) {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
  }

  function buildStaticRuntime(seedData = window.MeridianCockpitData || {}) {
    return {
      metricLibrary: clone(seedData.metricLibrary || {}),
      institutionalizationView: clone(seedData.institutionalizationView || {}),
      sources: {
        boardSnapshot: "static",
        benchmark: "static",
        metrics: "static",
      },
      lastLoad: null,
      lastError: null,
    };
  }

  const runtimeData = buildStaticRuntime();

  function getRuntimeData() {
    return runtimeData;
  }

  function mergeSnapshot(snapshot = {}) {
    if (snapshot.metricLibraryPatch) {
      runtimeData.metricLibrary = {
        ...runtimeData.metricLibrary,
        ...snapshot.metricLibraryPatch,
      };
    }

    if (snapshot.institutionPatch) {
      runtimeData.institutionalizationView = {
        ...runtimeData.institutionalizationView,
        ...snapshot.institutionPatch,
      };
    }

    if (snapshot.sources) {
      runtimeData.sources = {
        ...runtimeData.sources,
        ...snapshot.sources,
      };
    }

    runtimeData.lastLoad = new Date().toISOString();
    runtimeData.lastError = null;

    return runtimeData;
  }

  function resetToStaticFallback(seedData = window.MeridianCockpitData || {}) {
    const staticRuntime = buildStaticRuntime(seedData);
    runtimeData.metricLibrary = staticRuntime.metricLibrary;
    runtimeData.institutionalizationView = staticRuntime.institutionalizationView;
    runtimeData.sources = staticRuntime.sources;
    runtimeData.lastLoad = new Date().toISOString();
    runtimeData.lastError = null;

    return runtimeData;
  }

  async function loadInstitutionBoardSnapshot({
    orgId = DEFAULT_ORG_ID,
    sliceId = null,
    periodDate = DEFAULT_PERIOD_DATE,
    periodKey = null,
    repositories = window.MeridianSupabaseRepositories,
    mappers = window.MeridianSupabaseMappers,
  } = {}) {
    if (!repositories) {
      throw new Error("Supabase repositories are not available.");
    }

    if (!mappers) {
      throw new Error("Supabase mappers are not available.");
    }

    let resolvedSlice = null;

    try {
      resolvedSlice = sliceId ? { id: sliceId } : await repositories.getDefaultSlice(orgId, periodKey);

      if (!resolvedSlice?.id) {
        throw new Error("No default segment slice is available for the requested organization.");
      }

      const [metricDefinitionRows, observationRows, dimensionScoreRows, benchmarkRows] = await Promise.all([
        repositories.getMetricDefinitions(orgId),
        repositories.getBoardMetricObservations(orgId, resolvedSlice.id, periodDate),
        repositories.getDimensionScores(orgId, periodDate),
        repositories.getBenchmarkProvenance(orgId, periodDate),
      ]);

      const snapshot = mappers.mapInstitutionBoardSnapshot({
        metricDefinitionRows,
        observationRows,
        dimensionScoreRows,
        benchmarkRows,
        existingMetricLibrary: runtimeData.metricLibrary,
        existingInstitutionView: runtimeData.institutionalizationView,
      });

      mergeSnapshot({
        ...snapshot,
        sources: {
          boardSnapshot: "supabase",
          benchmark: "supabase",
          metrics: "supabase",
        },
      });

      return {
        defaultSlice: resolvedSlice,
        ...snapshot,
        runtimeData,
      };
    } catch (error) {
      runtimeData.lastError = error.message;
      console.error("Failed to load institutional board snapshot from Supabase.", error);

      return {
        defaultSlice: resolvedSlice,
        metricLibraryPatch: {},
        institutionPatch: {},
        runtimeData,
        error,
      };
    }
  }

  window.MeridianSupabaseRuntime = {
    DEFAULT_ORG_ID,
    DEFAULT_PERIOD_DATE,
    getRuntimeData,
    mergeSnapshot,
    resetToStaticFallback,
    loadInstitutionBoardSnapshot,
  };
})();
