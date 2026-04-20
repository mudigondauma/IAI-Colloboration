// Runtime state, rendering, and interactions for the live cockpit prototype.
// Static data/config is loaded first from app-data.js via window.MeridianCockpitData.

const state = {
  screen: "landing",
  period: "q2-2026",
  team: "enterprise",
  workflow: "all",
  mode: "pilot",
  oversightTab: "overview",
  metricFocus: null,
  evidenceFocus: null,
  geography: "all",
  businessFunction: "all",
  useCase: "all",
  modelTier: "all",
  selectedValueInitiativeId: null,
  bridgeTileFlips: {},
  workforceProofFlips: {},
  workforceTopFlips: {},
  askFocus: {
    institutionalization: null,
    delivery: null,
  },
};

function getScreenFromHash(hash = window.location.hash, fallback = "landing") {
  if (!hash || hash === "#landingView") {
    return "landing";
  }

  if (hash.startsWith("#institution")) {
    return "institutionalization";
  }

  if (hash.startsWith("#delivery")) {
    return "delivery";
  }

  return fallback;
}

state.screen = getScreenFromHash();

const {
  periodLabels,
  workflowLabels,
  metricLibrary,
  metricLabelToId,
  initiativeLedger,
  initiativeIndex,
  adoptionBehaviorLedger,
  globalFilterOptions,
  portfolios,
  oversightProfiles,
  institutionalizationView,
  productivityMethodologyProfiles,
  productivityContributionLedger,
  modelMonitoringLedger,
  hallucinationMethodologyLedger,
  promptSecurityLedger,
  ragQualityLedger,
  reliabilityLedger,
  actionWorkflowLibrary,
  actionSeverityMeta,
  actionStatusMeta,
  evidenceStateMeta,
  assuranceProfiles,
  assuranceToneMeta,
  accessProfiles,
  askPromptRegistry,
  savedViewRegistry,
} = window.MeridianCockpitData;

function updateInstitutionSubnavActive() {
  const links = document.querySelectorAll(".institution-subnav__link");
  const currentHash = window.location.hash;

  links.forEach((link) => {
    const isActive = currentHash && link.getAttribute("href") === currentHash;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "location" : "false");
  });
}

function updateDeliveryQuickNavActive() {
  const links = document.querySelectorAll(".delivery-quicknav__link");
  const currentHash = window.location.hash;

  links.forEach((link) => {
    const isActive = currentHash && link.getAttribute("href") === currentHash;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "location" : "false");
  });
}

const elements = {
  landingView: document.querySelector("#landingView"),
  institutionalizationView: document.querySelector("#institutionalizationView"),
  deliveryView: document.querySelector("#deliveryView"),
  institutionalizationContent: document.querySelector("#institutionalizationContent"),
  institutionalizationSavedViewsPanel: document.querySelector("#institutionalizationSavedViewsPanel"),
  institutionalizationAskPanel: document.querySelector("#institutionalizationAskPanel"),
  institutionalizationViewMeta: document.querySelector("#institutionalizationViewMeta"),
  deliveryViewMeta: document.querySelector("#deliveryViewMeta"),
  deliverySavedViewsPanel: document.querySelector("#deliverySavedViewsPanel"),
  deliveryAskPanel: document.querySelector("#deliveryAskPanel"),
  deliveryQuickNav: document.querySelector("#deliveryQuickNav"),
  scopeSummary: document.querySelector("#scopeSummary"),
  dateFilter: document.querySelector("#dateFilter"),
  teamFilter: document.querySelector("#teamFilter"),
  workflowFilter: document.querySelector("#workflowFilter"),
  deliverySegmentationBar: document.querySelector("#deliverySegmentationBar"),
  baselineToggle: document.querySelector("#baselineToggle"),
  pilotToggle: document.querySelector("#pilotToggle"),
  kpiGrid: document.querySelector("#kpiGrid"),
  swimlaneGrid: document.querySelector("#swimlaneGrid"),
  trendGrid: document.querySelector("#trendGrid"),
  overviewTab: document.querySelector("#overviewTab"),
  governanceTab: document.querySelector("#governanceTab"),
  oversightKpis: document.querySelector("#oversightKpis"),
  oversightDiagnostics: document.querySelector("#oversightDiagnostics"),
  oversightSummary: document.querySelector("#oversightSummary"),
  routingMap: document.querySelector("#routingMap"),
  pendingQueue: document.querySelector("#pendingQueue"),
  governancePanel: document.querySelector("#governancePanel"),
  economicsPanel: document.querySelector("#economicsPanel"),
  adoptionBehaviorPanel: document.querySelector("#adoptionBehaviorPanel"),
  productivityMethodologyPanel: document.querySelector("#productivityMethodologyPanel"),
  actionCenter: document.querySelector("#actionCenter"),
  roadmapPanel: document.querySelector("#roadmapPanel"),
  trustLayerPanel: document.querySelector("#trustLayerPanel"),
  trendWindowNote: document.querySelector("#trendWindowNote"),
  lastUpdated: document.querySelector("#lastUpdated"),
  dataSources: document.querySelector("#dataSources"),
  jumpReturnChip: document.querySelector("#jumpReturnChip"),
  metricDrawer: document.querySelector("#metricDrawer"),
  metricDrawerPanel: document.querySelector(".metric-drawer__panel"),
  metricDrawerContent: document.querySelector("#metricDrawerContent"),
  metricDrawerClose: document.querySelector("#metricDrawerClose"),
  metricDrawerScrim: document.querySelector("#metricDrawerScrim"),
  openScreenButtons: document.querySelectorAll("[data-open-screen]"),
  backHomeButtons: document.querySelectorAll("[data-back-home]"),
};

let lastDrawerTrigger = null;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function humanizeTag(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getInitiativeEvidenceId(initiativeId) {
  return `initiative:${initiativeId}`;
}

function getActionEvidenceId(teamKey, actionId) {
  return `action:${teamKey}:${actionId}`;
}

function getControlEvidenceId(teamKey, controlName) {
  return `control:${teamKey}:${slugify(controlName)}`;
}

function getQueueEvidenceId(teamKey, itemName) {
  return `queue:${teamKey}:${slugify(itemName)}`;
}

function getMetricEvidenceId(metricId) {
  return `metric:${metricId}`;
}

function getBenchmarkEvidenceId() {
  return "benchmark:enterprise-peer-set";
}

function getAccessEvidenceId(viewKey) {
  return `access:${viewKey}`;
}

function buildEvidencePackLibrary() {
  const packs = {};

  initiativeLedger.forEach((initiative) => {
    const portfolio = portfolios[initiative.portfolioKey];
    const financeStatus = initiative.financeValidated ? "Finance validated" : "Directional value";
    const stageNote =
      initiative.stage === "Stalled"
        ? "Recovery plan and owner commitment are required before scale resumes."
        : initiative.stage === "Production"
          ? "Production telemetry is available and linked to the value case."
          : "Scaling evidence is available, but the pack still depends on rollout proof.";

    packs[getInitiativeEvidenceId(initiative.id)] = {
      title: initiative.name,
      kind: "Initiative evidence pack",
      tone: initiative.financeValidated ? "good" : "watch",
      status: financeStatus,
      owner: `${initiative.function} · ${initiative.deliveryTrain}`,
      lastReviewed: "07 Apr 2026",
      summary: `${initiative.name} is a ${initiative.stage.toLowerCase()} ${initiative.useCase.toLowerCase()} initiative in ${initiative.geography}. This pack links the value case, control posture, and deployment proof used in the cockpit.`,
      trail: [
        { label: "Portfolio", value: portfolio.label },
        { label: "Use case", value: initiative.useCase },
        { label: "Value", value: `${formatMoneyM(initiative.realizedValue)} realized / ${formatMoneyM(initiative.forecastValue)} forecast` },
        { label: "Payback", value: formatMonths(initiative.paybackMonths) },
      ],
      artifacts: [
        `${initiative.name} value case`,
        initiative.financeValidated ? "Finance validation memo" : "Finance review pending note",
        `${workflowLabels[initiative.workflow]} evidence bundle`,
        `${initiative.useCase} control approval snapshot`,
      ],
      controls: [
        `Model tier ${initiative.tierLabel} approved for ${initiative.useCase}`,
        `Benefit type recorded as ${initiative.benefitType}`,
        `Stage note: ${stageNote}`,
      ],
      sources: [
        `${portfolio.label} initiative register`,
        "FinOps AI ledger",
        "Release evidence store",
        "Control Tower policy registry",
      ],
      gaps: initiative.financeValidated
        ? [
            `${initiative.confidence} confidence band still needs periodic refresh.`,
            initiative.stage === "Scaling" ? "Scale rollout evidence should be refreshed after the next wave." : "No material evidence gap in the current slice.",
          ]
        : [
            "Finance validation is still pending for this initiative.",
            initiative.stage === "Stalled" ? "Recovery plan evidence is not yet attached." : "Value proof is directional until finance review completes.",
          ],
    };
  });

  Object.entries(actionWorkflowLibrary).forEach(([teamKey, actions]) => {
    actions.forEach((action) => {
      const statusMeta = actionStatusMeta[action.status];
      const evidenceMeta = evidenceStateMeta[action.evidenceState];

      packs[getActionEvidenceId(teamKey, action.id)] = {
        title: action.title,
        kind: "Executive action pack",
        tone: evidenceMeta.tone,
        status: statusMeta.label,
        owner: action.owner,
        lastReviewed: "08 Apr 2026",
        summary: `This executive action was raised from the signal that ${action.sourceSignal.toLowerCase()}. Closure requires explicit evidence that the work item has landed, not just that it has been discussed.`,
        trail: [
          { label: "Severity", value: actionSeverityMeta[action.severity].label },
          { label: "Due date", value: formatDateLabel(action.dueDate) },
          { label: "Progress", value: `${action.progress}%` },
          { label: "Impact", value: action.impact },
        ],
        artifacts: action.requiredArtifacts,
        controls: action.closureCriteria,
        sources: action.sourceSystems,
        gaps: action.openGaps.length
          ? action.openGaps
          : [`${evidenceMeta.label} should still be rechecked before closure.`],
      };
    });
  });

  Object.entries(portfolios).forEach(([teamKey, portfolio]) => {
    portfolio.governance.controls.forEach((control) => {
      packs[getControlEvidenceId(teamKey, control.name)] = {
        title: control.name,
        kind: "Control evidence pack",
        tone: control.status === "green" ? "good" : control.status === "amber" ? "watch" : "risk",
        status: control.label,
        owner: `${portfolio.label} governance`,
        lastReviewed: "07 Apr 2026",
        summary: control.detail,
        trail: [
          { label: "Portfolio", value: portfolio.label },
          { label: "Status", value: control.label },
          { label: "Signal", value: control.status === "green" ? "Operating normally" : "Follow-up required" },
          { label: "Evidence", value: control.status === "green" ? "Current" : "Needs refresh" },
        ],
        artifacts: [
          `${control.name} control design`,
          `${control.name} latest test result`,
          `${portfolio.label} owner attestation`,
          `${portfolio.label} exception register extract`,
        ],
        controls: [
          "Named accountable owner recorded in the policy registry",
          "Latest control test linked to the audit evidence hub",
          control.status === "amber"
            ? "Next scale decision should remain conditional until follow-up closes"
            : "Control is currently acceptable for approved in-scope use cases",
        ],
        sources: [
          "Control Tower policy registry",
          "Internal audit evidence hub",
          ...portfolio.dataSources.slice(0, 2),
        ],
        gaps:
          control.status === "amber"
            ? [
                "Follow-up evidence is required before this control can be treated as fully scaled.",
                "Control owner should attach the next validation sample.",
              ]
            : ["No material evidence gap in the current reporting slice."],
      };
    });
  });

  Object.entries(oversightProfiles).forEach(([teamKey, profile]) => {
    profile.queue.forEach((item) => {
      packs[getQueueEvidenceId(teamKey, item.name)] = {
        title: item.name,
        kind: "Oversight evidence pack",
        tone: item.riskTier === "red" ? "risk" : item.riskTier === "amber" ? "watch" : "good",
        status: `${riskLabel(item.riskTier)} review`,
        owner: item.owner,
        lastReviewed: "07 Apr 2026",
        summary: item.reason,
        trail: [
          { label: "Workflow", value: item.workflow },
          { label: "SLA", value: item.due },
          { label: "Risk tier", value: riskLabel(item.riskTier) },
          { label: "Evidence tags", value: `${item.evidenceTags.length} attached` },
        ],
        artifacts: item.evidenceTags.map((tag) => humanizeTag(tag)),
        controls: [
          item.slaDefinition,
          `Primary disposition path: ${item.actions[0]}`,
          "Decision should write back to the approval workflow ledger",
        ],
        sources: [
          "Approval workflow ledger",
          "Oversight queue telemetry",
          "Audit evidence hub",
        ],
        gaps: [
          "Accountable decision is still pending.",
          `Owner confirmation is required from ${item.owner}.`,
        ],
      };
    });
  });

  Object.entries(metricLibrary).forEach(([metricId, metric]) => {
    packs[getMetricEvidenceId(metricId)] = {
      title: metric.label,
      kind: "Metric evidence pack",
      tone: metric.confidence.startsWith("A") ? "good" : metric.confidence.startsWith("B") ? "watch" : "risk",
      status: metric.confidence,
      owner: metric.owner,
      lastReviewed: metric.lastRefresh,
      summary: metric.evidence,
      trail: [
        { label: "Lens", value: metric.lens },
        { label: "Refresh", value: metric.refreshCadence },
        { label: "Scope", value: "In current cockpit scope" },
        { label: "Sources", value: `${metric.sourceSystems.length} systems` },
      ],
      artifacts: [
        `${metric.label} calculation workbook`,
        `${metric.label} source extract`,
        `${metric.label} QA check log`,
        `${metric.owner} attestation note`,
      ],
      controls: [
        `Scope: ${metric.scope}`,
        `Exclusions: ${metric.exclusions}`,
        `Owner: ${metric.owner}`,
      ],
      sources: metric.sourceSystems,
      gaps: metric.confidence.startsWith("A")
        ? ["No material evidence gap in the current cycle."]
        : ["Confidence is not yet fully system-of-record backed.", "Evidence quality should improve as source joins mature."],
    };
  });

  packs[getBenchmarkEvidenceId()] = {
    title: "Benchmark provenance and peer methodology",
    kind: "Benchmark evidence pack",
    tone: "watch",
    status: institutionalizationView.benchmarkProvenance.confidence,
    owner: "Strategy + Benchmarking Office",
    lastReviewed: institutionalizationView.benchmarkProvenance.lastRefresh,
    summary: institutionalizationView.benchmarkProvenance.methodology,
    trail: [
      { label: "Peer group", value: institutionalizationView.benchmarkProvenance.peerGroup },
      { label: "Source", value: institutionalizationView.benchmarkProvenance.source },
      { label: "Refresh", value: institutionalizationView.benchmarkProvenance.lastRefresh },
      { label: "Confidence", value: institutionalizationView.benchmarkProvenance.confidence },
    ],
    artifacts: [
      "Peer benchmark questionnaire",
      "Normalization workbook",
      "Analyst synthesis note",
      "Public disclosure source extract",
    ],
    controls: [
      "Peer set is matched on sector and scaled-AI operating maturity",
      "Public disclosures are used to validate spend and operating-model claims where available",
      institutionalizationView.benchmarkProvenance.caveat,
    ],
    sources: ["Benchmark dataset", "Analyst synthesis note", "Public disclosures", "Meridian scoring engine"],
    gaps: [
      "Governance and culture dimensions have wider confidence intervals than spend and operating metrics.",
      "Peer comparability is strongest for scaled enterprises and weaker for partially disclosed firms.",
    ],
  };

  packs[getAccessEvidenceId("institutionalization")] = {
    title: "Board-view access and masking policy",
    kind: "Access scope evidence pack",
    tone: "good",
    status: "Board summary access",
    owner: "Security + Data Governance",
    lastReviewed: "09 Apr 2026",
    summary:
      "Defines what the board-oriented institutionalisation view can see, what remains masked, and how exports stay aggregated even when the enterprise slice is narrowed.",
    trail: [
      { label: "View", value: "Institutionalisation" },
      { label: "Audience", value: "CEO · CFO · Board" },
      { label: "Granularity", value: "Aggregated enterprise rollup" },
      { label: "Export mode", value: "Board-pack summary only" },
    ],
    artifacts: [
      "Viewer role matrix",
      "Board masking standard",
      "Export policy and approval memo",
      "Quarterly access review attestation",
    ],
    controls: [
      "Board viewers see rollups by portfolio, region, function, and risk class, not raw operational payloads.",
      "Restricted artifacts require elevated approval outside the board view.",
      "Every read and export action is logged against the viewer role.",
    ],
    sources: ["Identity policy registry", "Data governance standard", "Audit trail ledger", "Evidence hub"],
    gaps: ["No material policy gap in the current review cycle."],
  };

  packs[getAccessEvidenceId("delivery")] = {
    title: "Delivery-view RBAC and route-detail policy",
    kind: "Access scope evidence pack",
    tone: "watch",
    status: "Operational governance access",
    owner: "Security + Data Governance",
    lastReviewed: "09 Apr 2026",
    summary:
      "Defines what delivery leaders can inspect inside the operating cockpit, which sensitive data classes stay masked by default, and how route-level evidence is opened under governed access.",
    trail: [
      { label: "View", value: "Delivery Engine" },
      { label: "Audience", value: "CIO · Engineering · Delivery" },
      { label: "Granularity", value: "Portfolio, route, and action detail" },
      { label: "Export mode", value: "Summary + evidence references" },
    ],
    artifacts: [
      "Viewer role matrix",
      "Route-detail masking standard",
      "Restricted evidence workflow",
      "Quarterly access review attestation",
    ],
    controls: [
      "Prompt text, live payloads, and person-level reviewer traces remain masked by default.",
      "Restricted evidence is opened through an approved exception path tied to risk tier and data sensitivity.",
      "Viewer role, active slice, and export activity are all written to the access trail.",
    ],
    sources: ["Identity policy registry", "Data governance standard", "Audit trail ledger", "Evidence hub"],
    gaps: ["A small number of legacy evidence exports still need the new masking banner before broad rollout."],
  };

  return packs;
}

const evidencePackLibrary = buildEvidencePackLibrary();

function getMetricId(label) {
  return metricLabelToId[label] ?? null;
}

function metricInfoButton(metricId, label, tone = "light", fallbackDefinition = "") {
  const metric = metricId ? metricLibrary[metricId] : null;
  const definition = metric?.definition || fallbackDefinition;

  if (!definition) {
    return "";
  }

  const buttonClasses = [
    "tooltip__button",
    tone === "dark" ? "tooltip__button--dark" : "",
    metric ? "tooltip__button--interactive" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const buttonAttrs = metric ? `data-metric-id="${metricId}"` : "";
  const buttonLabel = metric
    ? `${label} definition, calculation, and evidence card`
    : `${label} definition`;
  const hint = metric ? `<span class="tooltip__hint">Click for metric card</span>` : "";

  return `
    <span class="tooltip">
      <button class="${buttonClasses}" type="button" ${buttonAttrs} aria-label="${buttonLabel}">i</button>
      <span class="tooltip__text">${definition}${hint}</span>
    </span>
  `;
}

function metricLabelRow(label, labelClass, tone = "light", fallbackDefinition = "") {
  return `
    <div class="metric-label-row ${tone === "dark" ? "metric-label-row--dark" : ""}">
      <span class="${labelClass}">${label}</span>
      ${metricInfoButton(getMetricId(label), label, tone, fallbackDefinition)}
    </div>
  `;
}

function tooltip(label, definition, metricId = null, tone = "light") {
  return `
    <div class="metric-header">
      <span class="metric-header__label">${label}</span>
      ${metricInfoButton(metricId, label, tone, definition)}
    </div>
  `;
}

function inlineTooltip(definition, label = "Definition", metricId = null, tone = "light") {
  const metric = metricId ? metricLibrary[metricId] : null;
  const text = metric?.definition || definition;

  if (!text) {
    return "";
  }

  const buttonClasses = [
    "tooltip__button",
    tone === "dark" ? "tooltip__button--dark" : "",
    metric ? "tooltip__button--interactive" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const buttonAttrs = metric ? `data-metric-id="${metricId}"` : "";
  const buttonLabel = metric
    ? `${label} definition, calculation, and evidence card`
    : `${label} definition`;
  const hint = metric ? `<span class="tooltip__hint">Click for metric card</span>` : "";

  return `
    <span class="tooltip tooltip--inline">
      <button class="${buttonClasses}" type="button" ${buttonAttrs} aria-label="${buttonLabel}">i</button>
      <span class="tooltip__text">${text}${hint}</span>
    </span>
  `;
}

function getHeatTone(score) {
  if (score >= 75) {
    return "good";
  }

  if (score >= 55) {
    return "watch";
  }

  return "risk";
}

function getDebtTone(level) {
  if (level === "Low") {
    return "good";
  }

  if (level === "Moderate") {
    return "watch";
  }

  return "risk";
}

function formatValue(value, format) {
  switch (format) {
    case "percent":
      return `${Number(value).toFixed(value % 1 === 0 ? 0 : 1)}%`;
    case "index":
      return `${Math.round(value)}`;
    case "currencyM":
      return `$${Number(value).toFixed(2)}M`;
    case "currencyK":
      return `$${Math.round(value)}K`;
    case "currency":
      return `$${Number(value).toFixed(1)}`;
    case "days":
      return `${Number(value).toFixed(1)} d`;
    case "hours":
      return `${Number(value).toFixed(value % 1 === 0 ? 0 : 1)} h`;
    case "count":
      return `${Math.round(value)}`;
    default:
      return `${value}`;
  }
}

function formatDelta(value, format) {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  const absolute = Math.abs(value);

  switch (format) {
    case "percent":
      return `${sign}${absolute.toFixed(absolute % 1 === 0 ? 0 : 1)} pts`;
    case "index":
      return `${sign}${absolute.toFixed(absolute % 1 === 0 ? 0 : 1)} pts`;
    case "currencyM":
      return `${sign}$${absolute.toFixed(2)}M`;
    case "currencyK":
      return `${sign}$${absolute.toFixed(0)}K`;
    case "currency":
      return `${sign}$${absolute.toFixed(1)}`;
    case "days":
      return `${sign}${absolute.toFixed(1)} d`;
    case "hours":
      return `${sign}${absolute.toFixed(absolute % 1 === 0 ? 0 : 1)} h`;
    case "count":
      return `${sign}${absolute.toFixed(0)}`;
    default:
      return `${sign}${absolute}`;
  }
}

function formatMoneyM(value) {
  return `GBP${Number(value).toFixed(1)}M`;
}

function formatRatio(value) {
  return `${Number(value).toFixed(1)}x`;
}

function formatPoints(value) {
  return `${Number(value).toFixed(value % 1 === 0 ? 0 : 1)} pts`;
}

function formatMilliseconds(value) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 2000 ? 1 : 2)} s`;
  }
  return `${Math.round(value)} ms`;
}

function formatCurrencyPerThousand(value) {
  return `GBP${Number(value).toFixed(1)} / 1K req`;
}

function formatPercentRange(lower, upper) {
  return `${formatValue(lower, "percent")} - ${formatValue(upper, "percent")}`;
}

function formatMonths(value) {
  return `${Math.round(value)} months`;
}

function formatDateLabel(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersTouchScrolling() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function topScrollBehavior() {
  return prefersReducedMotion() || prefersTouchScrolling() ? "auto" : "smooth";
}

function getFilterLabel(filterKey, value) {
  if (filterKey === "period") {
    return periodLabels[value] ?? value;
  }

  const option = (globalFilterOptions[filterKey] || []).find((item) => item.value === value);
  return option?.label ?? value;
}

function renderSelectOptions(options, selectedValue) {
  return options
    .map(
      (option) => `
        <option value="${option.value}" ${option.value === selectedValue ? "selected" : ""}>${option.label}</option>
      `,
    )
    .join("");
}

function renderGlobalFilterControl(label, filterKey, options, selectedValue) {
  return `
    <label class="control control--compact">
      <span class="control__label">${label}</span>
      <select data-global-filter="${filterKey}" name="${filterKey}">
        ${renderSelectOptions(options, selectedValue)}
      </select>
    </label>
  `;
}

function renderGlobalSegmentationBar({ dark = false, includePeriod = false } = {}) {
  const controls = [];

  if (includePeriod) {
    controls.push(
      renderGlobalFilterControl(
        "Period",
        "period",
        Object.entries(periodLabels).map(([value, label]) => ({ value, label })),
        state.period,
      ),
    );
  }

  controls.push(
    renderGlobalFilterControl("Region", "geography", globalFilterOptions.geography, state.geography),
    renderGlobalFilterControl(
      "Function",
      "businessFunction",
      globalFilterOptions.businessFunction,
      state.businessFunction,
    ),
    renderGlobalFilterControl("Use case", "useCase", globalFilterOptions.useCase, state.useCase),
    renderGlobalFilterControl("Model tier", "modelTier", globalFilterOptions.modelTier, state.modelTier),
  );

  return `
    <div class="segment-toolbar ${dark ? "segment-toolbar--dark" : ""}">
      <div class="segment-toolbar__grid">${controls.join("")}</div>
    </div>
  `;
}

function describeActiveSegments() {
  const labels = [];

  if (state.geography !== "all") {
    labels.push(getFilterLabel("geography", state.geography));
  }
  if (state.businessFunction !== "all") {
    labels.push(getFilterLabel("businessFunction", state.businessFunction));
  }
  if (state.useCase !== "all") {
    labels.push(getFilterLabel("useCase", state.useCase));
  }
  if (state.modelTier !== "all") {
    labels.push(getFilterLabel("modelTier", state.modelTier));
  }

  return labels.length ? labels.join(" · ") : "all regions, functions, use cases, and model tiers";
}

function getFilteredInitiatives({ portfolioKey = null, workflow = null } = {}) {
  return initiativeLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (workflow && workflow !== "all" && item.workflow !== workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function getFilteredAdoptionRecords({ portfolioKey = null, workflow = null } = {}) {
  return adoptionBehaviorLedger
    .map((record) => ({
      ...initiativeIndex[record.initiativeId],
      ...record,
    }))
    .filter((item) => {
      if (portfolioKey && item.portfolioKey !== portfolioKey) {
        return false;
      }
      if (workflow && workflow !== "all" && item.workflow !== workflow) {
        return false;
      }
      if (state.geography !== "all" && item.geography !== state.geography) {
        return false;
      }
      if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
        return false;
      }
      if (state.useCase !== "all" && item.useCase !== state.useCase) {
        return false;
      }
      if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
        return false;
      }
      return true;
    });
}

function getFilteredProductivityRecords({ portfolioKey = null, workflow = null } = {}) {
  return productivityContributionLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (workflow && workflow !== "all" && item.workflow !== workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function summarizeAdoptionSnapshot(records, mode = state.mode) {
  if (!records.length) {
    return null;
  }

  const personaMap = {};
  const totalTrains = new Set();
  const activeTrains = new Set();

  const totals = records.reduce(
    (summary, record) => {
      const slice = mode === "pilot" ? record.pilot : record.baseline;
      const seatUse = record.eligibleSeats ? slice.mau / record.eligibleSeats : 0;

      summary.dau += slice.dau;
      summary.wau += slice.wau;
      summary.mau += slice.mau;
      summary.eligibleSeats += record.eligibleSeats;
      summary.repeatUsers += slice.repeatUsers;
      summary.retainedUsers += slice.retainedUsers;
      summary.priorMonthActive += slice.priorMonthActive;

      totalTrains.add(record.deliveryTrain);
      if (seatUse >= 0.35) {
        activeTrains.add(record.deliveryTrain);
      }

      if (!personaMap[record.persona]) {
        personaMap[record.persona] = {
          persona: record.persona,
          eligibleSeats: 0,
          mau: 0,
          repeatUsers: 0,
        };
      }

      personaMap[record.persona].eligibleSeats += record.eligibleSeats;
      personaMap[record.persona].mau += slice.mau;
      personaMap[record.persona].repeatUsers += slice.repeatUsers;

      return summary;
    },
    {
      dau: 0,
      wau: 0,
      mau: 0,
      eligibleSeats: 0,
      repeatUsers: 0,
      retainedUsers: 0,
      priorMonthActive: 0,
    },
  );

  const personas = Object.values(personaMap)
    .map((item) => ({
      ...item,
      seatUtilization: item.eligibleSeats ? (item.mau / item.eligibleSeats) * 100 : 0,
      repeatRate: item.mau ? (item.repeatUsers / item.mau) * 100 : 0,
    }))
    .sort((left, right) => right.mau - left.mau);

  return {
    records: records.length,
    dau: totals.dau,
    wau: totals.wau,
    mau: totals.mau,
    eligibleSeats: totals.eligibleSeats,
    seatUtilization: totals.eligibleSeats ? (totals.mau / totals.eligibleSeats) * 100 : 0,
    repeatRate: totals.mau ? (totals.repeatUsers / totals.mau) * 100 : 0,
    retentionRate: totals.priorMonthActive ? (totals.retainedUsers / totals.priorMonthActive) * 100 : 0,
    activeTeams: activeTrains.size,
    totalTeams: totalTrains.size,
    personas,
  };
}

function summarizeProductivityMethodology(records, teamKey) {
  if (!records.length) {
    return null;
  }

  const profile = productivityMethodologyProfiles[teamKey];
  const workflowOrder = ["planning", "build", "run"];
  const workflowGroups = {};

  let sampleCount = 0;
  let grossGain = 0;
  let qualityOffset = 0;
  let netGain = 0;

  records.forEach((record) => {
    sampleCount += record.sampleCount;
    grossGain += record.grossGain;
    qualityOffset += record.qualityOffset;
    netGain += record.netGain;

    if (!workflowGroups[record.workflow]) {
      workflowGroups[record.workflow] = {
        workflow: record.workflow,
        sampleCount: 0,
        grossGain: 0,
        qualityOffset: 0,
        netGain: 0,
        trains: 0,
      };
    }

    workflowGroups[record.workflow].sampleCount += record.sampleCount;
    workflowGroups[record.workflow].grossGain += record.grossGain;
    workflowGroups[record.workflow].qualityOffset += record.qualityOffset;
    workflowGroups[record.workflow].netGain += record.netGain;
    workflowGroups[record.workflow].trains += 1;
  });

  const workflowBreakdown = workflowOrder
    .filter((workflow) => workflowGroups[workflow])
    .map((workflow) => ({
      id: workflow,
      label: workflowLabels[workflow],
      ...workflowGroups[workflow],
      weight: profile.workflowWeights[workflow].weight,
      detail: profile.workflowWeights[workflow].detail,
      share: netGain ? (workflowGroups[workflow].netGain / netGain) * 100 : 0,
    }));

  return {
    sampleCount,
    grossGain,
    qualityOffset,
    netGain,
    trainCount: records.length,
    workflowBreakdown,
    trainBreakdown: [...records].sort((left, right) => right.netGain - left.netGain),
  };
}

function getFilteredModelMonitoringRecords({ portfolioKey = null } = {}) {
  return modelMonitoringLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (state.workflow !== "all" && item.workflow !== state.workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function getModelMonitoringTone(metric, value) {
  switch (metric) {
    case "latency":
      return value <= 1600 ? "good" : value <= 2200 ? "watch" : "risk";
    case "errorRate":
      return value <= 1.2 ? "good" : value <= 2.5 ? "watch" : "risk";
    case "tokenCost":
      return value <= 10 ? "good" : value <= 16 ? "watch" : "risk";
    case "refusalRate":
      return value <= 2 ? "good" : value <= 4.5 ? "watch" : "risk";
    case "fallbackRate":
      return value <= 3 ? "good" : value <= 6 ? "watch" : "risk";
    case "safetyEvents":
      return value <= 1 ? "good" : value <= 3 ? "watch" : "risk";
    default:
      return "good";
  }
}

function summarizeModelMonitoring(records) {
  if (!records.length) {
    return null;
  }

  const totalRequests = records.reduce((sum, item) => sum + item.requests7d, 0);
  const weightedAverage = (key) =>
    totalRequests
      ? records.reduce((sum, item) => sum + item[key] * item.requests7d, 0) / totalRequests
      : 0;
  const severityRank = { risk: 0, watch: 1, good: 2 };

  return {
    totalRequests,
    routeCount: records.length,
    latencyMs: weightedAverage("latencyMs"),
    errorRate: weightedAverage("errorRate"),
    tokenCostPer1k: weightedAverage("tokenCostPer1k"),
    refusalRate: weightedAverage("refusalRate"),
    fallbackRate: weightedAverage("fallbackRate"),
    safetyEvents7d: records.reduce((sum, item) => sum + item.safetyEvents7d, 0),
    routeBreakdown: [...records].sort((left, right) => {
      const severityDelta = severityRank[left.tone] - severityRank[right.tone];
      if (severityDelta !== 0) {
        return severityDelta;
      }
      return right.requests7d - left.requests7d;
    }),
  };
}

function getFilteredHallucinationRecords({ portfolioKey = null } = {}) {
  return hallucinationMethodologyLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (state.workflow !== "all" && item.workflow !== state.workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function getHallucinationTone(passRate) {
  if (passRate >= 95) {
    return "good";
  }
  if (passRate >= 91) {
    return "watch";
  }
  return "risk";
}

function summarizeHallucinationMethodology(records) {
  if (!records.length) {
    return null;
  }

  const totalSample = records.reduce((sum, item) => sum + item.sampleSize, 0);
  const totalPasses = records.reduce((sum, item) => sum + item.sampleSize * (item.passRate / 100), 0);
  const passRate = totalSample ? (totalPasses / totalSample) * 100 : 0;
  const proportion = totalSample ? totalPasses / totalSample : 0;
  const margin = totalSample ? 1.96 * Math.sqrt((proportion * (1 - proportion)) / totalSample) : 0;

  const routeBreakdown = [...records].sort((left, right) => {
    const toneRank = { risk: 0, watch: 1, good: 2 };
    const toneDelta = toneRank[left.tone] - toneRank[right.tone];
    if (toneDelta !== 0) {
      return toneDelta;
    }
    return left.passRate - right.passRate;
  });

  return {
    totalSample,
    passRate,
    ciLow: Math.max(0, (proportion - margin) * 100),
    ciHigh: Math.min(100, (proportion + margin) * 100),
    suiteCount: new Set(records.map((item) => item.suiteName)).size,
    routeCount: records.length,
    routeBreakdown,
  };
}

function getFilteredPromptSecurityRecords({ portfolioKey = null } = {}) {
  return promptSecurityLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (state.workflow !== "all" && item.workflow !== state.workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function getPromptSecurityTone(metric, value) {
  switch (metric) {
    case "coverage":
      return value >= 90 ? "good" : value >= 80 ? "watch" : "risk";
    case "blockedRate":
      return value >= 97 ? "good" : value >= 93 ? "watch" : "risk";
    case "openFindings":
      return value <= 2 ? "good" : value <= 5 ? "watch" : "risk";
    case "criticalFindings":
      return value === 0 ? "good" : value === 1 ? "watch" : "risk";
    case "remediationSla":
      return value <= 72 ? "good" : value <= 96 ? "watch" : "risk";
    case "withinSla":
      return value >= 90 ? "good" : value >= 75 ? "watch" : "risk";
    default:
      return "good";
  }
}

function summarizePromptSecurity(records) {
  if (!records.length) {
    return null;
  }

  const totals = records.reduce(
    (summary, item) => {
      summary.promptAssets += item.promptAssets;
      summary.coverage += item.promptAssets * item.testedCoveragePct;
      summary.attackAttempts7d += item.attackAttempts7d;
      summary.blockedWeight += item.attackAttempts7d * item.blockedRate;
      summary.openFindings += item.openFindings;
      summary.criticalFindings += item.criticalFindings;
      summary.remediationWeight += Math.max(item.openFindings, 1) * item.remediationSlaHours;
      summary.withinSlaWeight += Math.max(item.openFindings, 1) * item.withinSlaPct;
      return summary;
    },
    {
      promptAssets: 0,
      coverage: 0,
      attackAttempts7d: 0,
      blockedWeight: 0,
      openFindings: 0,
      criticalFindings: 0,
      remediationWeight: 0,
      withinSlaWeight: 0,
    },
  );

  const weightBase = records.reduce((sum, item) => sum + Math.max(item.openFindings, 1), 0);

  return {
    promptAssets: totals.promptAssets,
    testedCoveragePct: totals.promptAssets ? totals.coverage / totals.promptAssets : 0,
    attackAttempts7d: totals.attackAttempts7d,
    blockedRate: totals.attackAttempts7d ? totals.blockedWeight / totals.attackAttempts7d : 0,
    openFindings: totals.openFindings,
    criticalFindings: totals.criticalFindings,
    remediationSlaHours: weightBase ? totals.remediationWeight / weightBase : 0,
    withinSlaPct: weightBase ? totals.withinSlaWeight / weightBase : 0,
    routeCount: records.length,
    routeBreakdown: [...records].sort((left, right) => {
      const toneRank = { risk: 0, watch: 1, good: 2 };
      const toneDelta = toneRank[left.tone] - toneRank[right.tone];
      if (toneDelta !== 0) {
        return toneDelta;
      }
      if (right.criticalFindings !== left.criticalFindings) {
        return right.criticalFindings - left.criticalFindings;
      }
      return right.openFindings - left.openFindings;
    }),
  };
}

function getFilteredRagQualityRecords({ portfolioKey = null } = {}) {
  return ragQualityLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (state.workflow !== "all" && item.workflow !== state.workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function getRagQualityTone(metric, value) {
  switch (metric) {
    case "citationRate":
      return value >= 90 ? "good" : value >= 82 ? "watch" : "risk";
    case "retrievalHitRate":
      return value >= 88 ? "good" : value >= 78 ? "watch" : "risk";
    case "freshness":
      return value >= 92 ? "good" : value >= 84 ? "watch" : "risk";
    case "staleContent":
      return value <= 8 ? "good" : value <= 15 ? "watch" : "risk";
    case "noAnswer":
      return value <= 6 ? "good" : value <= 12 ? "watch" : "risk";
    default:
      return "good";
  }
}

function summarizeRagQuality(records) {
  if (!records.length) {
    return null;
  }

  const totalQueries = records.reduce((sum, item) => sum + item.queries7d, 0);
  const weightedAverage = (key) =>
    totalQueries
      ? records.reduce((sum, item) => sum + item[key] * item.queries7d, 0) / totalQueries
      : 0;

  return {
    totalQueries,
    routeCount: records.length,
    citationRate: weightedAverage("citationRate"),
    retrievalHitRate: weightedAverage("retrievalHitRate"),
    freshnessWithinSlaPct: weightedAverage("freshnessWithinSlaPct"),
    staleContentPct: weightedAverage("staleContentPct"),
    noAnswerRate: weightedAverage("noAnswerRate"),
    routeBreakdown: [...records].sort((left, right) => {
      const toneRank = { risk: 0, watch: 1, good: 2 };
      const toneDelta = toneRank[left.tone] - toneRank[right.tone];
      if (toneDelta !== 0) {
        return toneDelta;
      }
      return left.retrievalHitRate - right.retrievalHitRate;
    }),
  };
}

function getFilteredReliabilityRecords({ portfolioKey = null } = {}) {
  return reliabilityLedger.filter((item) => {
    if (portfolioKey && item.portfolioKey !== portfolioKey) {
      return false;
    }
    if (state.workflow !== "all" && item.workflow !== state.workflow) {
      return false;
    }
    if (state.geography !== "all" && item.geography !== state.geography) {
      return false;
    }
    if (state.businessFunction !== "all" && item.function !== state.businessFunction) {
      return false;
    }
    if (state.useCase !== "all" && item.useCase !== state.useCase) {
      return false;
    }
    if (state.modelTier !== "all" && item.modelTier !== state.modelTier) {
      return false;
    }
    return true;
  });
}

function getReliabilityTone(metric, value) {
  switch (metric) {
    case "incidents":
      return value <= 1 ? "good" : value <= 3 ? "watch" : "risk";
    case "degradedShare":
      return value <= 2.5 ? "good" : value <= 5.5 ? "watch" : "risk";
    case "failoverShare":
      return value <= 3 ? "good" : value <= 6 ? "watch" : "risk";
    case "queueDelay":
      return value <= 300 ? "good" : value <= 900 ? "watch" : "risk";
    case "qualityImpact":
      return value <= 4 ? "good" : value <= 9 ? "watch" : "risk";
    case "recovery":
      return value >= 92 ? "good" : value >= 80 ? "watch" : "risk";
    default:
      return "good";
  }
}

function summarizeReliability(records) {
  if (!records.length) {
    return null;
  }

  const totalCalls = records.reduce((sum, item) => sum + item.routedCalls7d, 0);
  const weightedAverage = (key) =>
    totalCalls
      ? records.reduce((sum, item) => sum + item[key] * item.routedCalls7d, 0) / totalCalls
      : 0;
  const totalIncidents = records.reduce((sum, item) => sum + item.providerIncidents7d, 0);
  const incidentWeight = records.reduce((sum, item) => sum + Math.max(item.providerIncidents7d, 1), 0);

  return {
    totalCalls,
    routeCount: records.length,
    providerIncidents7d: totalIncidents,
    degradedSharePct: weightedAverage("degradedSharePct"),
    failoverSharePct: weightedAverage("failoverSharePct"),
    queueDelayMs: weightedAverage("queueDelayMs"),
    qualityImpactPct: weightedAverage("qualityImpactPct"),
    recoveryWithinSlaPct: incidentWeight
      ? records.reduce((sum, item) => sum + item.recoveryWithinSlaPct * Math.max(item.providerIncidents7d, 1), 0) / incidentWeight
      : 0,
    routeBreakdown: [...records].sort((left, right) => {
      const toneRank = { risk: 0, watch: 1, good: 2 };
      const toneDelta = toneRank[left.tone] - toneRank[right.tone];
      if (toneDelta !== 0) {
        return toneDelta;
      }
      return right.qualityImpactPct - left.qualityImpactPct;
    }),
  };
}

function summarizeValueLedger(items) {
  if (!items.length) {
    return null;
  }

  const totals = items.reduce(
    (summary, item) => {
      summary.forecast += item.forecastValue;
      summary.realized += item.realizedValue;
      summary.spend += item.spend;
      summary.validatedRealized += item.financeValidated ? item.realizedValue : 0;
      summary.weightedPayback += item.paybackMonths * item.realizedValue;
      summary.confidenceScore += { High: 3, Medium: 2, Low: 1 }[item.confidence] * item.realizedValue;
      summary.liveCount += item.stage === "Production" || item.stage === "Scaling" ? 1 : 0;
      summary.productionCount += item.stage === "Production" ? 1 : 0;
      summary.stalledRisk += item.stage === "Stalled" ? item.forecastValue - item.realizedValue : 0;
      summary.benefitMix[item.benefitType] = (summary.benefitMix[item.benefitType] || 0) + item.realizedValue;
      return summary;
    },
    {
      forecast: 0,
      realized: 0,
      spend: 0,
      validatedRealized: 0,
      weightedPayback: 0,
      confidenceScore: 0,
      liveCount: 0,
      productionCount: 0,
      stalledRisk: 0,
      benefitMix: {},
    },
  );

  const confidenceScore = totals.confidenceScore / totals.realized;
  const confidenceBand = confidenceScore >= 2.55 ? "High" : confidenceScore >= 1.8 ? "Medium" : "Low";
  const benefitMix = Object.entries(totals.benefitMix)
    .map(([label, value]) => ({
      label,
      value,
      share: totals.realized ? (value / totals.realized) * 100 : 0,
    }))
    .sort((left, right) => right.value - left.value);

  return {
    count: items.length,
    forecast: totals.forecast,
    realized: totals.realized,
    forecastGap: totals.forecast - totals.realized,
    spend: totals.spend,
    roi: totals.spend ? totals.realized / totals.spend : 0,
    attainment: totals.forecast ? (totals.realized / totals.forecast) * 100 : 0,
    validatedShare: totals.realized ? (totals.validatedRealized / totals.realized) * 100 : 0,
    paybackMonths: totals.weightedPayback / totals.realized,
    confidenceBand,
    liveCount: totals.liveCount,
    productionCount: totals.productionCount,
    stalledRisk: totals.stalledRisk,
    benefitMix,
  };
}

function renderValueCard(card) {
  return `
    <article class="finance-card ${card.className ?? ""}">
      <span class="finance-card__label">${card.label}</span>
      <strong class="finance-card__value">${card.value}</strong>
      <p>${card.note}</p>
    </article>
  `;
}

function renderValueSummaryCards(snapshot, { compact = false, extraCards = [] } = {}) {
  if (!snapshot) {
    return `
      <div class="empty-state-card">
        <strong>No initiatives match the current slice.</strong>
        <p>Broaden one or more filters to reopen the finance-grade value view.</p>
      </div>
    `;
  }

  const cards = [
    {
      label: "Forecast value",
      value: formatMoneyM(snapshot.forecast),
      note: "Forward run-rate value expected from matching initiatives.",
    },
    {
      label: "Realized value",
      value: formatMoneyM(snapshot.realized),
      note: "Current run-rate value already evidenced in the slice.",
    },
    {
      label: "Attainment",
      value: `${Math.round(snapshot.attainment)}%`,
      note: `${formatMoneyM(snapshot.forecastGap)} still sits between forecast and realized value.`,
    },
    {
      label: "Finance-validated",
      value: `${Math.round(snapshot.validatedShare)}%`,
      note: "Share of realized value already reviewed against finance evidence.",
    },
    {
      label: "Weighted payback",
      value: formatMonths(snapshot.paybackMonths),
      note: "Weighted by realized value so the biggest initiatives matter most.",
    },
    {
      label: "Realized ROI",
      value: formatRatio(snapshot.roi),
      note: `${formatMoneyM(snapshot.spend)} spend supports this slice today.`,
    },
  ];

  return `
    <div class="finance-card-grid ${compact ? "finance-card-grid--compact" : ""} ${extraCards.length ? "finance-card-grid--expanded" : ""}">
      ${cards.map((card) => renderValueCard(card)).join("")}
      ${extraCards.map((card) => renderValueCard(card)).join("")}
    </div>
  `;
}

function renderBenefitMix(summary) {
  if (!summary || !summary.benefitMix.length) {
    return "";
  }

  return `
    <div class="value-mix">
      ${summary.benefitMix
        .map(
          (item) => `
            <span class="value-mix__chip">
              <strong>${item.label}</strong>
              <span>${Math.round(item.share)}%</span>
            </span>
          `,
        )
        .join("")}
      <span class="value-mix__chip value-mix__chip--neutral">
        <strong>Confidence</strong>
        <span>${summary.confidenceBand}</span>
      </span>
    </div>
  `;
}

function getBridgeWhyItMatters(label) {
  const narratives = {
    "Flow Index": "Shows whether AI work is moving through the delivery system with enough throughput to support enterprise-scale execution.",
    "Quality Guardrail": "Confirms that scale is not being bought at the expense of quality, assurance, or review discipline.",
    "AI Coverage": "Shows how much of the operating estate has moved from isolated experiments into instrumented AI support.",
    "Delivery run-rate": "Gives the board the spend baseline behind the delivery engine, separate from realized operational value.",
    "Operational AI": "This is the clearest proof that run operations are already generating material board-visible value.",
    "Total AI spend": "Puts ROI, governance expectations, and enterprise exposure in the context of total AI footprint.",
  };

  return narratives[label] || "Connects a delivery-side signal to the enterprise story the board is being asked to sponsor.";
}

function renderBridgeCard(item) {
  const isFlipped = Boolean(state.bridgeTileFlips?.[item.label]);

  return `
    <button
      class="mini-stat mini-stat--bridge-flip ${isFlipped ? "is-flipped" : ""}"
      type="button"
      data-bridge-tile-id="${item.label}"
      aria-pressed="${String(isFlipped)}"
      aria-label="${isFlipped ? `Show front of ${item.label}` : `Show why ${item.label} matters`}"
    >
      <span class="bridge-flip-card__inner" aria-hidden="true">
        <span class="bridge-flip-card__face bridge-flip-card__face--front">
          <span class="mini-stat__label">${item.label}</span>
          <span class="mini-stat__value">${item.value}</span>
          <span class="bridge-flip-card__copy">${item.detail}</span>
          <span class="bridge-flip-card__hint">Tap for why it matters</span>
        </span>
        <span class="bridge-flip-card__face bridge-flip-card__face--back">
          <span class="mini-stat__label">Why it matters</span>
          <strong>${item.label}</strong>
          <span class="bridge-flip-card__copy">${getBridgeWhyItMatters(item.label)}</span>
          <span class="bridge-flip-card__hint">Tap to return</span>
        </span>
      </span>
    </button>
  `;
}

function getWorkforceProofWhyItMatters(label) {
  const narratives = {
    "Scenario assessment pass":
      "Shows whether learning is turning into assessed job-ready capability instead of remaining broad but shallow training completion.",
    "Supervised safe-use sign-off":
      "This is the gating step between certification and real operating autonomy, because it proves governed use on live work with named supervision.",
    "Policy-exception ready leaders":
      "Shows whether Meridian has enough accountable leadership capacity to approve exceptions, handle escalation paths, and scale safely under pressure.",
    "Control-function validation":
      "Shows whether risk, legal, audit, and governance teams can challenge and certify AI use with documented criteria as adoption spreads.",
  };

  return narratives[label] || "Shows why this capability signal matters to safe scale, not just workforce optics.";
}

function getWorkforceProofProgressLabel(label) {
  const labels = {
    "Scenario assessment pass": "First-attempt assessment",
    "Supervised safe-use sign-off": "Workflow sign-off coverage",
    "Policy-exception ready leaders": "Exception-ready leadership",
    "Control-function validation": "Control-team coverage",
  };

  return labels[label] || "Capability coverage";
}

function renderWorkforceProofCard(item) {
  const isFlipped = Boolean(state.workforceProofFlips?.[item.label]);
  const percent = Number.parseFloat(item.value) || 0;
  const progressLabel = getWorkforceProofProgressLabel(item.label);

  return `
    <button
      class="workforce-proof-card workforce-proof-card--flip workforce-proof-card--progress workforce-proof-card--${item.tone} ${isFlipped ? "is-flipped" : ""}"
      type="button"
      data-workforce-proof-id="${item.label}"
      aria-pressed="${String(isFlipped)}"
      aria-label="${isFlipped ? `Show front of ${item.label}` : `Show why ${item.label} matters`}"
    >
      <span class="workforce-proof-card__inner" aria-hidden="true">
        <span class="workforce-proof-card__face workforce-proof-card__face--front">
          <span class="workforce-proof-card__label">${item.label}</span>
          <strong class="workforce-proof-card__value">${item.value}</strong>
          <span class="workforce-proof-card__copy">${item.detail}</span>
          <span class="workforce-proof-card__progress-block">
            <span class="workforce-proof-card__progress-label">${progressLabel}</span>
            <span class="workforce-proof-card__progress" aria-hidden="true">
              <span class="workforce-proof-card__progress-fill workforce-proof-card__progress-fill--${item.tone}" style="width: ${percent}%"></span>
            </span>
          </span>
          <span class="workforce-proof-card__hint">Tap for why it matters</span>
        </span>
        <span class="workforce-proof-card__face workforce-proof-card__face--back">
          <span class="workforce-proof-card__label">Why it matters</span>
          <strong>${item.label}</strong>
          <span class="workforce-proof-card__copy">${getWorkforceProofWhyItMatters(item.label)}</span>
          <span class="workforce-proof-card__progress-block">
            <span class="workforce-proof-card__progress-label">${progressLabel}</span>
            <span class="workforce-proof-card__progress" aria-hidden="true">
              <span class="workforce-proof-card__progress-fill workforce-proof-card__progress-fill--${item.tone}" style="width: ${percent}%"></span>
            </span>
          </span>
          <span class="workforce-proof-card__hint">Tap to return</span>
        </span>
      </span>
    </button>
  `;
}

function getWorkforceTopWhyItMatters(label) {
  const narratives = {
    "Role-certified practitioners":
      "This is the first real capability gate beyond training volume. It shows whether Meridian is building role-ready practitioners, not just awareness.",
    "Safe-use validated":
      "This is the main scale gate, because it proves governed use on supervised live workflows without material policy or quality breaches.",
    "Decision-rights certified leaders":
      "This shows whether Meridian has enough cleared leaders to approve exceptions, handle escalations, and sponsor broader scale safely.",
  };

  return narratives[label] || "Shows why this workforce signal matters to safe enterprise scale, not just learning progress.";
}

function getWorkforceTopProgressLabel(label) {
  const progressLabels = {
    "Role-certified practitioners": "Certification coverage",
    "Safe-use validated": "Workflow validation",
    "Decision-rights certified leaders": "Leadership clearance",
  };

  return progressLabels[label] || "Capability coverage";
}

function renderWorkforceTopMetric(item) {
  if (item.label === "Foundations learning") {
    return `
      <div class="summary-row--inline">
        <div>
          <strong>${item.label}</strong>
          <span>${item.detail}</span>
        </div>
        <b>${item.value}</b>
      </div>
    `;
  }

  const isFlipped = Boolean(state.workforceTopFlips?.[item.label]);
  const percent = Number.parseFloat(item.value) || 0;
  const progressLabel = getWorkforceTopProgressLabel(item.label);

  return `
    <button
      class="summary-row--flip summary-row--flip--progress ${isFlipped ? "is-flipped" : ""}"
      type="button"
      data-workforce-top-id="${item.label}"
      aria-pressed="${String(isFlipped)}"
      aria-label="${isFlipped ? `Show front of ${item.label}` : `Show why ${item.label} matters`}"
    >
      <span class="summary-row--flip__inner" aria-hidden="true">
        <span class="summary-row--flip__face summary-row--flip__face--front">
          <span class="summary-row--flip__content">
            <span class="summary-row--flip__head">
              <strong>${item.label}</strong>
              <b>${item.value}</b>
            </span>
            <span class="summary-row--flip__body">${item.detail}</span>
            <span class="summary-row--flip__progress-block">
              <span class="summary-row--flip__progress-label">${progressLabel}</span>
              <span class="summary-row--flip__progress" aria-hidden="true">
                <span class="summary-row--flip__progress-fill" style="width: ${percent}%"></span>
              </span>
            </span>
            <span class="summary-row--flip__hint">Tap for why it matters</span>
          </span>
        </span>
        <span class="summary-row--flip__face summary-row--flip__face--back">
          <span class="summary-row--flip__content">
            <span class="summary-row--flip__head">
              <strong>Why it matters</strong>
              <b>${item.value}</b>
            </span>
            <span class="summary-row--flip__body">${getWorkforceTopWhyItMatters(item.label)}</span>
            <span class="summary-row--flip__progress-block">
              <span class="summary-row--flip__progress-label">${progressLabel}</span>
              <span class="summary-row--flip__progress" aria-hidden="true">
                <span class="summary-row--flip__progress-fill" style="width: ${percent}%"></span>
              </span>
            </span>
            <span class="summary-row--flip__hint">Tap to return</span>
          </span>
        </span>
      </span>
    </button>
  `;
}

function getSelectedValueInitiative(items) {
  if (!items?.length) {
    return null;
  }

  return items.find((item) => item.id === state.selectedValueInitiativeId) ?? items[0];
}

function getInitiativeAttainment(initiative) {
  return initiative.forecastValue ? Math.round((initiative.realizedValue / initiative.forecastValue) * 100) : 0;
}

function getInitiativeBoardSummary(initiative) {
  const attainment = getInitiativeAttainment(initiative);
  const validationLine = initiative.financeValidated
    ? "Finance validation is in place."
    : "Finance review is still pending.";

  if (initiative.stage === "Stalled") {
    return `${attainment}% forecast attainment, but the initiative is stalled. ${validationLine}`;
  }

  if (initiative.financeValidated && attainment >= 85) {
    return `${attainment}% forecast attainment with ${formatMonths(initiative.paybackMonths)} payback. ${validationLine}`;
  }

  return `${initiative.stage} with ${attainment}% forecast attainment and ${formatMoneyM(initiative.realizedValue)} realized against ${formatMoneyM(initiative.forecastValue)} forecast. ${validationLine}`;
}

function renderValueInitiativePicker(items, selectedId) {
  if (!items?.length || items.length < 2) {
    return "";
  }

  const limit = 10;
  const topItems = items.slice(0, limit);
  const selected = items.find((item) => item.id === selectedId);
  const visible = selected && !topItems.some((item) => item.id === selected.id)
    ? [...topItems.slice(0, Math.max(0, limit - 1)), selected]
    : topItems;
  const maxRealized = Math.max(...visible.map((item) => item.realizedValue), 1);

  return `
    <div class="initiative-picker-panel" id="valueInitiativePicker">
      <div class="initiative-picker__head">
        <strong>Choose initiative</strong>
        <p>Click an initiative name or bar to update the selected summary. Showing ${visible.length} strongest value signals in the current slice.</p>
      </div>
      <div class="initiative-picker">
        <div class="initiative-picker__list">
          ${visible
            .map(
              (initiative) => `
                <button
                  class="initiative-picker__option ${selectedId === initiative.id ? "is-active" : ""}"
                  type="button"
                  data-initiative-select="${initiative.id}"
                  aria-pressed="${String(selectedId === initiative.id)}"
                >
                  <span class="initiative-picker__name">${initiative.name}</span>
                  <span class="initiative-picker__bar" aria-hidden="true">
                    <span class="initiative-picker__fill initiative-picker__fill--${initiative.financeValidated ? "validated" : "directional"}" style="width: ${(initiative.realizedValue / maxRealized) * 100}%"></span>
                  </span>
                  <span class="initiative-picker__value">${formatMoneyM(initiative.realizedValue)}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderValueInitiativeSummary(initiative) {
  if (!initiative) {
    return "";
  }

  const attainment = getInitiativeAttainment(initiative);

  return `
    <article class="initiative-summary-card">
      <div class="initiative-summary-card__head">
        <div>
          <span class="initiative-summary-card__eyebrow">Selected initiative</span>
          <h3>${initiative.name}</h3>
          <p>${initiative.function} · ${initiative.stage} · ${initiative.geography} · ${initiative.deliveryTrain}</p>
        </div>
        <span class="status-chip ${initiative.financeValidated ? "status-chip--green" : "status-chip--amber"}">
          ${initiative.financeValidated ? "Finance validated" : "Directional value"}
        </span>
      </div>
      <div class="initiative-summary-card__body">
        <div class="initiative-summary-card__copy">
          <p class="initiative-summary-card__story">${getInitiativeBoardSummary(initiative)}</p>
          <div class="initiative-summary-card__tags">
            <span>${initiative.useCase}</span>
            <span>${initiative.tierLabel}</span>
            <span>${initiative.benefitType}</span>
            <span>${initiative.confidence} confidence</span>
          </div>
        </div>
        <div class="initiative-summary-card__metrics">
          <div>
            <span>Realized</span>
            <strong>${formatMoneyM(initiative.realizedValue)}</strong>
          </div>
          <div>
            <span>Forecast</span>
            <strong>${formatMoneyM(initiative.forecastValue)}</strong>
          </div>
          <div>
            <span>Attainment</span>
            <strong>${attainment}%</strong>
          </div>
          <div>
            <span>Payback</span>
            <strong>${formatMonths(initiative.paybackMonths)}</strong>
          </div>
        </div>
      </div>
      <div class="initiative-summary-card__footer">
        <span class="trace-note">${initiative.financeValidated ? "Finance, control, and release proof linked." : "Value case linked, finance review still pending."}</span>
        <div class="initiative-summary-card__actions">
          <button class="detail-link" type="button" data-evidence-id="${getInitiativeEvidenceId(initiative.id)}" aria-label="Open evidence pack for ${initiative.name}">
            Open evidence pack
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderValueInitiatives(items, { limit = null, selectedId = null } = {}) {
  const visible = limit ? items.slice(0, limit) : items;

  if (!visible.length) {
    return `
      <div class="empty-state-card">
        <strong>No initiatives match the current slice.</strong>
        <p>Reset the segment filters to reopen the value ledger.</p>
      </div>
    `;
  }

  return visible
    .map(
      (initiative) => `
        <article
          class="initiative-item initiative-item--finance initiative-item--selectable ${selectedId === initiative.id ? "is-active" : ""}"
          data-initiative-select="${initiative.id}"
          tabindex="0"
          role="button"
          aria-pressed="${String(selectedId === initiative.id)}"
          aria-label="Select ${initiative.name} summary"
        >
          <div class="initiative-item__head">
            <div>
              <strong>${initiative.name}</strong>
              <p>${initiative.function} · ${initiative.stage} · ${initiative.geography} · ${initiative.deliveryTrain}</p>
            </div>
            <div class="initiative-item__head-tags">
              ${selectedId === initiative.id
                ? `<span class="initiative-item__selection-chip">Selected</span>`
                : ""}
              <span class="status-chip ${initiative.financeValidated ? "status-chip--green" : "status-chip--amber"}">
                ${initiative.financeValidated ? "Finance validated" : "Directional value"}
              </span>
            </div>
          </div>
          <div class="initiative-value-grid">
            <div>
              <span>Realized</span>
              <strong>${formatMoneyM(initiative.realizedValue)}</strong>
            </div>
            <div>
              <span>Forecast</span>
              <strong>${formatMoneyM(initiative.forecastValue)}</strong>
            </div>
            <div>
              <span>Spend</span>
              <strong>${formatMoneyM(initiative.spend)}</strong>
            </div>
          </div>
          <div class="initiative-item__meta">
            <span>${initiative.useCase}</span>
            <span>${initiative.tierLabel}</span>
            <span>${initiative.benefitType}</span>
            <span>Payback ${Math.round(initiative.paybackMonths)}m</span>
            <span>${initiative.confidence} confidence</span>
          </div>
          <div class="initiative-item__footer">
            <span class="trace-note">${initiative.financeValidated ? "Finance, control, and release proof linked" : "Value case linked, finance review still pending"}</span>
            <button class="detail-link" type="button" data-evidence-id="${getInitiativeEvidenceId(initiative.id)}" aria-label="Open evidence pack for ${initiative.name}">
              Open evidence pack
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderDetailList(items, emptyMessage) {
  const visible = items?.length ? items : [emptyMessage];

  return `
    <ul class="detail-list">
      ${visible.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function renderMetricDrawer() {
  const metric = state.metricFocus ? metricLibrary[state.metricFocus] : null;
  const evidencePack = state.evidenceFocus ? evidencePackLibrary[state.evidenceFocus] : null;

  if (!metric && !evidencePack) {
    elements.metricDrawer.hidden = true;
    elements.metricDrawerContent.innerHTML = "";
    document.body.classList.remove("metric-drawer-open");
    return;
  }

  elements.metricDrawer.hidden = false;
  document.body.classList.add("metric-drawer-open");
  if (metric) {
    elements.metricDrawerContent.innerHTML = `
      <div class="metric-drawer__header">
        <div>
          <p class="eyebrow">Metric Card</p>
          <h2 id="metricDrawerTitle">${metric.label}</h2>
        </div>
        <div class="metric-drawer__badges">
          <span class="metric-drawer__badge">${metric.lens}</span>
          <span class="metric-drawer__badge">${metric.confidence}</span>
        </div>
      </div>

      <p class="metric-drawer__lead">${metric.definition}</p>

      <div class="metric-drawer__actions">
        <button class="detail-link" type="button" data-evidence-id="${getMetricEvidenceId(state.metricFocus)}" aria-label="Open evidence pack for ${metric.label}">
          Open evidence pack
        </button>
      </div>

      <div class="metric-drawer__grid">
        <article class="metric-detail-card">
          <span class="metric-detail-card__label">How calculated</span>
          <p>${metric.formula}</p>
        </article>
        <article class="metric-detail-card">
          <span class="metric-detail-card__label">Numerator</span>
          <p>${metric.numerator}</p>
        </article>
        <article class="metric-detail-card">
          <span class="metric-detail-card__label">Denominator</span>
          <p>${metric.denominator}</p>
        </article>
        <article class="metric-detail-card">
          <span class="metric-detail-card__label">Scope</span>
          <p>${metric.scope}</p>
        </article>
        <article class="metric-detail-card">
          <span class="metric-detail-card__label">Exclusions</span>
          <p>${metric.exclusions}</p>
        </article>
        <article class="metric-detail-card">
          <span class="metric-detail-card__label">Owner</span>
          <p>${metric.owner}</p>
        </article>
      </div>

      <div class="metric-drawer__meta">
        <div>
          <span class="metric-drawer__meta-label">Source systems</span>
          <p>${metric.sourceSystems.join(" · ")}</p>
        </div>
        <div>
          <span class="metric-drawer__meta-label">Refresh cadence</span>
          <p>${metric.refreshCadence}</p>
        </div>
        <div>
          <span class="metric-drawer__meta-label">Last refresh</span>
          <p>${metric.lastRefresh}</p>
        </div>
        <div>
          <span class="metric-drawer__meta-label">Evidence note</span>
          <p>${metric.evidence}</p>
        </div>
      </div>
    `;
    requestAnimationFrame(() => elements.metricDrawerClose.focus());
    return;
  }

  elements.metricDrawerContent.innerHTML = `
    <div class="metric-drawer__header">
      <div>
        <p class="eyebrow">Evidence Pack</p>
        <h2 id="metricDrawerTitle">${evidencePack.title}</h2>
      </div>
      <div class="metric-drawer__badges">
        <span class="metric-drawer__badge">${evidencePack.kind}</span>
        <span class="metric-drawer__badge metric-drawer__badge--${evidencePack.tone}">${evidencePack.status}</span>
      </div>
    </div>

    <p class="metric-drawer__lead">${evidencePack.summary}</p>

    <div class="metric-drawer__grid">
      ${evidencePack.trail
        .map(
          (item) => `
            <article class="metric-detail-card">
              <span class="metric-detail-card__label">${item.label}</span>
              <p>${item.value}</p>
            </article>
          `,
        )
        .join("")}
    </div>

    <div class="metric-drawer__stack">
      <article class="metric-detail-card">
        <span class="metric-detail-card__label">Artifacts in pack</span>
        ${renderDetailList(evidencePack.artifacts, "Artifact list is still being assembled.")}
      </article>
      <article class="metric-detail-card">
        <span class="metric-detail-card__label">Control and closure checks</span>
        ${renderDetailList(evidencePack.controls, "Control checks are still being documented.")}
      </article>
      <article class="metric-detail-card">
        <span class="metric-detail-card__label">Source systems</span>
        ${renderDetailList(evidencePack.sources, "Source systems are not yet attached.")}
      </article>
      <article class="metric-detail-card">
        <span class="metric-detail-card__label">Open evidence gaps</span>
        ${renderDetailList(evidencePack.gaps, "No material evidence gap is currently open.")}
      </article>
    </div>

    <div class="metric-drawer__meta">
      <div>
        <span class="metric-drawer__meta-label">Owner</span>
        <p>${evidencePack.owner}</p>
      </div>
      <div>
        <span class="metric-drawer__meta-label">Last reviewed</span>
        <p>${evidencePack.lastReviewed}</p>
      </div>
      <div>
        <span class="metric-drawer__meta-label">Pack status</span>
        <p>${evidencePack.status}</p>
      </div>
      <div>
        <span class="metric-drawer__meta-label">Traceability</span>
        <p>This pack is reused across the cockpit so the same evidence can support board, delivery, governance, and oversight views.</p>
      </div>
    </div>
  `;
  requestAnimationFrame(() => elements.metricDrawerClose.focus());
}

function closeMetricDrawer() {
  if (!state.metricFocus && !state.evidenceFocus) {
    return;
  }

  state.metricFocus = null;
  state.evidenceFocus = null;
  renderMetricDrawer();

  if (lastDrawerTrigger?.isConnected && !elements.metricDrawer.contains(lastDrawerTrigger)) {
    lastDrawerTrigger.focus();
  }

  lastDrawerTrigger = null;
}

function describeDelta(metric, currentValue) {
  if (state.mode === "baseline") {
    return {
      arrow: "→",
      tone: "watch",
      text: "Reference baseline",
    };
  }

  const delta = currentValue - metric.baseline;
  const improved = (metric.improve === "up" && delta > 0) || (metric.improve === "down" && delta < 0);
  const flat = Math.abs(delta) < 0.1;

  return {
    arrow: flat ? "→" : improved ? delta > 0 ? "↑" : "↓" : delta > 0 ? "↑" : "↓",
    tone: flat ? "watch" : improved ? "good" : "risk",
    text: `${formatDelta(delta, metric.format)} vs baseline`,
  };
}

function progressState(metric, currentValue) {
  if (state.mode === "baseline") {
    return {
      className: "",
      label: "Reference",
    };
  }

  const range = metric.target - metric.baseline;
  const progress = metric.improve === "down"
    ? (metric.baseline - currentValue) / (metric.baseline - metric.target || 1)
    : (currentValue - metric.baseline) / (range || 1);

  if (progress >= 0.85) {
    return { className: "status-chip--green", label: "Strong" };
  }

  if (progress >= 0.45) {
    return { className: "status-chip--amber", label: "Watch" };
  }

  return { className: "status-chip--red", label: "At risk" };
}

function trendStatus(metric) {
  const delta = metric.current - metric.baseline;
  const improved = (metric.improve === "up" && delta > 0) || (metric.improve === "down" && delta < 0);
  const tone = improved ? "good" : "risk";
  const arrow = improved ? delta > 0 ? "↑" : "↓" : delta > 0 ? "↑" : "↓";

  return `<span class="delta-chip delta-chip--${tone}">${arrow} ${formatDelta(delta, metric.format)} vs baseline</span>`;
}

function renderKpis(portfolio) {
  elements.kpiGrid.innerHTML = portfolio.kpis
    .map((metric) => {
      const currentValue = state.mode === "pilot" ? metric.pilot : metric.baseline;
      const delta = describeDelta(metric, currentValue);
      const status = progressState(metric, currentValue);
      const metricId = getMetricId(metric.label);

      return `
        <article class="kpi-card">
          ${tooltip(metric.label, metric.definition, metricId)}
          <div class="metric-value">${formatValue(currentValue, metric.format)}</div>
          <div class="metric-meta">
            <span class="delta-chip delta-chip--${delta.tone}">${delta.arrow} ${delta.text}</span>
            <span class="status-chip ${status.className}">${status.label}</span>
          </div>
          <p class="metric-baseline">Baseline ${formatValue(metric.baseline, metric.format)} | Target ${formatValue(metric.target, metric.format)}</p>
        </article>
      `;
    })
    .join("");
}

function renderSwimlanes(portfolio) {
  elements.swimlaneGrid.innerHTML = portfolio.swimlanes
    .map((lane) => {
      const isFocused = state.workflow === "all" || state.workflow === lane.id;
      const valueMetric = {
        ...lane.valueMetric,
        current: state.mode === "pilot" ? lane.valueMetric.pilot : lane.valueMetric.baseline,
      };
      const riskMetric = {
        ...lane.riskMetric,
        current: state.mode === "pilot" ? lane.riskMetric.pilot : lane.riskMetric.baseline,
      };
      const valueDelta = describeDelta(lane.valueMetric, valueMetric.current);
      const riskDelta = describeDelta(lane.riskMetric, riskMetric.current);

      return `
        <article class="swimlane ${isFocused ? "is-focused" : ""}">
          <div class="swimlane__title">
            <h3>${lane.title}</h3>
            <span class="status-chip ${isFocused ? "" : ""}">${isFocused ? "In view" : "Available"}</span>
          </div>
          <div class="swimlane__metrics">
            <div class="swimlane__metric">
              ${tooltip(valueMetric.label, valueMetric.definition)}
              <div class="swimlane__metric-value">
                <strong>${formatValue(valueMetric.current, valueMetric.format)}</strong>
                <span class="delta-chip delta-chip--${valueDelta.tone}">${valueDelta.arrow} ${valueDelta.text}</span>
              </div>
            </div>
            <div class="swimlane__metric">
              ${tooltip(riskMetric.label, riskMetric.definition)}
              <div class="swimlane__metric-value">
                <strong>${formatValue(riskMetric.current, riskMetric.format)}</strong>
                <span class="delta-chip delta-chip--${riskDelta.tone}">${riskDelta.arrow} ${riskDelta.text}</span>
              </div>
            </div>
          </div>
          <p class="swimlane__interpretation">${lane.interpretation[state.mode]}</p>
        </article>
      `;
    })
    .join("");
}

function renderTrendSvg(metric) {
  const values = [metric.baseline, metric.current, metric.target];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const xCoords = [28, 150, 272];
  const yFor = (value) => 106 - ((value - min) / range) * 70;
  const points = values.map((value, index) => `${xCoords[index]},${yFor(value)}`).join(" ");

  return `
    <svg viewBox="0 0 300 124" role="img" aria-label="${metric.title} trend chart">
      <line x1="28" y1="106" x2="272" y2="106" stroke="#d7dfeb" stroke-width="1.5"></line>
      <line x1="28" y1="36" x2="272" y2="36" stroke="#edf2f8" stroke-width="1"></line>
      <line x1="${xCoords[2]}" y1="22" x2="${xCoords[2]}" y2="106" stroke="#9db8e1" stroke-width="1.5" stroke-dasharray="4 4"></line>
      <polyline points="${points}" fill="none" stroke="#2059a8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <circle cx="${xCoords[0]}" cy="${yFor(metric.baseline)}" r="5" fill="#c8d2e1"></circle>
      <circle cx="${xCoords[1]}" cy="${yFor(metric.current)}" r="6" fill="#2059a8"></circle>
      <circle cx="${xCoords[2]}" cy="${yFor(metric.target)}" r="6" fill="#ffffff" stroke="#2059a8" stroke-width="3"></circle>
    </svg>
  `;
}

function renderTrends(portfolio) {
  elements.trendWindowNote.textContent = `${periodLabels[state.period]} view. Current reflects the live assisted operating state; baseline and target remain fixed anchors.`;

  elements.trendGrid.innerHTML = portfolio.trends
    .map((metric) => {
      return `
        <article class="trend-card">
          <div class="trend-card__header">
            <div>
              ${tooltip(metric.title, metric.definition)}
            </div>
            ${trendStatus(metric)}
          </div>
          <div class="trend-card__chart">${renderTrendSvg(metric)}</div>
          <div class="trend-card__legend">
            <div>
              <span>Baseline</span>
              <strong>${formatValue(metric.baseline, metric.format)}</strong>
            </div>
            <div>
              <span>Current</span>
              <strong>${formatValue(metric.current, metric.format)}</strong>
            </div>
            <div>
              <span>Target</span>
              <strong>${formatValue(metric.target, metric.format)}</strong>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAdoptionBehavior(portfolio) {
  const records = getFilteredAdoptionRecords({ portfolioKey: state.team, workflow: state.workflow });

  if (!records.length) {
    elements.adoptionBehaviorPanel.innerHTML = `
      <div class="empty-state-card">
        <strong>No adoption behavior records match the current slice.</strong>
        <p>Broaden one or more segment filters to reopen the behavioral adoption view.</p>
      </div>
    `;
    return;
  }

  const snapshot = summarizeAdoptionSnapshot(records, state.mode);
  const baselineSnapshot = summarizeAdoptionSnapshot(records, "baseline");
  const activeLabel = state.mode === "pilot" ? "Current" : "Reference";
  const adoptionSegmentNote = `${snapshot.records} initiative slices match ${describeActiveSegments()} in ${portfolio.label}${state.workflow === "all" ? "" : ` and the ${workflowLabels[state.workflow]}`}. Coverage says approved AI workflows are present; behavior shows whether people are returning to use them often enough to change the operating model.`;

  const cards = [
    {
      label: "Daily Active Users",
      value: formatValue(snapshot.dau, "count"),
      note: state.mode === "pilot" ? `${formatDelta(snapshot.dau - baselineSnapshot.dau, "count")} vs baseline` : "Reference baseline",
    },
    {
      label: "Weekly Active Users",
      value: formatValue(snapshot.wau, "count"),
      note: state.mode === "pilot" ? `${formatDelta(snapshot.wau - baselineSnapshot.wau, "count")} vs baseline` : "Reference baseline",
    },
    {
      label: "Monthly Active Users",
      value: formatValue(snapshot.mau, "count"),
      note: state.mode === "pilot" ? `${formatDelta(snapshot.mau - baselineSnapshot.mau, "count")} vs baseline` : "Reference baseline",
    },
    {
      label: "Seat Utilization",
      value: formatValue(snapshot.seatUtilization, "percent"),
      note: `${activeLabel} ${formatValue(snapshot.mau, "count")} of ${formatValue(snapshot.eligibleSeats, "count")} eligible seats are active monthly.`,
    },
    {
      label: "Repeat Use Rate",
      value: formatValue(snapshot.repeatRate, "percent"),
      note: state.mode === "pilot" ? `${formatDelta(snapshot.repeatRate - baselineSnapshot.repeatRate, "percent")} vs baseline` : "Reference baseline",
    },
    {
      label: "30-Day Retention",
      value: formatValue(snapshot.retentionRate, "percent"),
      note: state.mode === "pilot" ? `${formatDelta(snapshot.retentionRate - baselineSnapshot.retentionRate, "percent")} vs baseline` : "Reference baseline",
    },
    {
      label: "Active Teams",
      value: formatValue(snapshot.activeTeams, "count"),
      note: `${snapshot.activeTeams} of ${snapshot.totalTeams} teams clear the 35% monthly-use threshold.`,
    },
  ];

  const summaryCardsHtml = cards
    .map(
      (card) => `
        <article class="adoption-card">
          ${tooltip(card.label, "", getMetricId(card.label))}
          <strong class="adoption-card__value">${card.value}</strong>
          <p>${card.note}</p>
        </article>
      `,
    )
    .join("");

  const personaCardsHtml = snapshot.personas
    .slice(0, 4)
    .map(
      (persona, index) => `
        <article class="persona-adoption-card">
          <div class="persona-adoption-card__head">
            <strong>${persona.persona}</strong>
            <span class="status-chip ${persona.seatUtilization >= 65 ? "status-chip--green" : persona.seatUtilization >= 45 ? "status-chip--amber" : "status-chip--red"}">
              ${Math.round(persona.seatUtilization)}% seats active
            </span>
          </div>
          <div class="persona-adoption-card__stats">
            <span><b>${formatValue(persona.mau, "count")}</b> MAU</span>
            <span><b>${formatValue(persona.repeatRate, "percent")}</b> repeat use</span>
          </div>
          <div class="metric-bar" aria-hidden="true">
            <span class="metric-bar__fill metric-bar__fill--primary" style="width: ${Math.min(persona.seatUtilization, 100)}%"></span>
          </div>
          <p>${index === 0 ? "Largest engaged persona in the current slice." : "Behavioral adoption is present, but still varies meaningfully by persona."}</p>
        </article>
      `,
    )
    .join("");

  elements.adoptionBehaviorPanel.innerHTML = `
    <div class="adoption-layout">
      <div class="adoption-story-card">
        <span class="adoption-story-card__label">Behavioral adoption lens</span>
        <p>${adoptionSegmentNote}</p>
      </div>
      <div class="adoption-summary-grid">${summaryCardsHtml}</div>
      <div class="persona-adoption-grid">${personaCardsHtml}</div>
    </div>
  `;
}

function renderProductivityMethodology(portfolio) {
  const records = getFilteredProductivityRecords({ portfolioKey: state.team, workflow: state.workflow });
  const profile = productivityMethodologyProfiles[state.team];

  if (!records.length || !profile) {
    elements.productivityMethodologyPanel.innerHTML = `
      <div class="empty-state-card">
        <strong>No productivity methodology records match the current slice.</strong>
        <p>Broaden one or more segment filters to reopen the workflow and train breakdown.</p>
      </div>
    `;
    return;
  }

  const summary = summarizeProductivityMethodology(records, state.team);
  const methodologyNote = `${summary.trainCount} trains and ${formatValue(summary.sampleCount, "count")} matched workflow events underpin the current slice in ${portfolio.label}. This panel always compares a matched baseline to the current assisted state because productivity is itself a comparative measure, even when the page toggle is set to ${state.mode === "pilot" ? "Pilot" : "Baseline"}.`;

  const methodCardsHtml = [
    {
      label: "Observation window",
      detail: profile.observationWindow,
    },
    {
      label: "Normalization",
      detail: profile.normalization,
    },
    {
      label: "Quality adjustment",
      detail: profile.qualityAdjustment,
    },
    {
      label: "Confidence",
      detail: profile.confidence,
    },
  ]
    .map(
      (item) => `
        <article class="productivity-method-card">
          <span class="productivity-method-card__label">${item.label}</span>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const workflowCardsHtml = summary.workflowBreakdown
    .map(
      (item) => `
        <article class="workflow-productivity-card ${state.workflow === "all" || state.workflow === item.id ? "workflow-productivity-card--focus" : ""}">
          <div class="workflow-productivity-card__head">
            <strong>${item.label}</strong>
            <span class="status-chip">${item.weight}% model weight</span>
          </div>
          <div class="workflow-productivity-card__metrics">
            <span><b>${formatPoints(item.netGain)}</b> net gain</span>
            <span><b>${formatValue(item.sampleCount, "count")}</b> matched events</span>
            <span><b>${item.trains}</b> trains</span>
          </div>
          <div class="metric-bar" aria-hidden="true">
            <span class="metric-bar__fill metric-bar__fill--primary" style="width: ${Math.min(item.share, 100)}%"></span>
          </div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const trainRowsHtml = summary.trainBreakdown
    .map(
      (item) => `
        <tr>
          <td>
            <div class="methodology-table__title">
              <strong>${item.train}</strong>
              <span>${workflowLabels[item.workflow]} · ${item.geography} · ${item.function}</span>
            </div>
          </td>
          <td>${formatValue(item.sampleCount, "count")}</td>
          <td>${formatPoints(item.grossGain)}</td>
          <td>${formatPoints(item.qualityOffset)}</td>
          <td><strong>${formatPoints(item.netGain)}</strong></td>
          <td>${item.confidence}</td>
        </tr>
        <tr class="methodology-table__detail-row">
          <td colspan="6">${item.detail}</td>
        </tr>
      `,
    )
    .join("");

  elements.productivityMethodologyPanel.innerHTML = `
    <div class="productivity-layout">
      <div class="productivity-story-card">
        <div class="productivity-story-card__head">
          <div>
            ${metricLabelRow("Net Productivity Gain", "value-story-card__label")}
            <p>${profile.summary}</p>
          </div>
          <button class="detail-link" type="button" data-metric-id="${getMetricId("Net Productivity Gain")}" aria-label="Open Net Productivity Gain metric card">
            Open metric card
          </button>
        </div>
        <p class="productivity-story-card__formula"><strong>Formula</strong>${profile.formula}</p>
        <p class="productivity-story-card__note">${methodologyNote}</p>
        <div class="productivity-story-card__totals">
          <span><b>${formatPoints(summary.grossGain)}</b> gross uplift</span>
          <span><b>${formatPoints(summary.qualityOffset)}</b> quality drag</span>
          <span><b>${formatPoints(summary.netGain)}</b> current net gain</span>
        </div>
      </div>

      <div class="productivity-method-grid">${methodCardsHtml}</div>

      <div class="productivity-subhead">
        <div>
          <p class="eyebrow">Workflow contribution</p>
          <h3>Where the gain is coming from</h3>
        </div>
        <p>${state.workflow === "all" ? "All workflows are shown below." : `Currently focused on ${workflowLabels[state.workflow]}.`}</p>
      </div>
      <div class="workflow-productivity-grid">${workflowCardsHtml}</div>

      <div class="productivity-subhead">
        <div>
          <p class="eyebrow">Train breakdown</p>
          <h3>Which trains are driving the current modeled uplift</h3>
        </div>
        <p>Trains are sorted by current net contribution after quality drag is deducted.</p>
      </div>
      <div class="methodology-table-wrap">
        <table class="methodology-table">
          <thead>
            <tr>
              <th>Train</th>
              <th>Matched sample</th>
              <th>Gross uplift</th>
              <th>Quality drag</th>
              <th>Net gain</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>${trainRowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderOversightKpis(profile) {
  elements.oversightKpis.innerHTML = profile.kpis
    .map((metric) => {
      const currentValue = state.mode === "pilot" ? metric.pilot : metric.baseline;
      const delta = describeDelta(metric, currentValue);
      return `
        <article class="oversight-kpi">
          ${tooltip(metric.label, metric.definition)}
          <div class="metric-value">${formatValue(currentValue, metric.format)}</div>
          <div class="metric-meta">
            <span class="delta-chip delta-chip--${delta.tone}">${delta.arrow} ${delta.text}</span>
          </div>
          <p class="metric-baseline">Target ${formatValue(metric.target, metric.format)}</p>
        </article>
      `;
    })
    .join("");
}

function renderOversightBreakdownRows(items, format) {
  const activeLabel = state.mode === "pilot" ? "Current" : "Reference";

  return items
    .map((item) => {
      const activeValue = state.mode === "pilot" ? item.pilot : item.baseline;
      const delta = activeValue - item.baseline;
      const deltaText = state.mode === "pilot" ? `${formatDelta(delta, format)} vs baseline` : "Reference baseline";

      return `
        <article class="oversight-breakdown-row">
          <div class="oversight-breakdown-row__copy">
            <strong>${item.label}</strong>
            <p>${deltaText}</p>
          </div>
          <div class="oversight-breakdown-row__values">
            <span class="oversight-breakdown-badge">Baseline ${formatValue(item.baseline, format)}</span>
            <span class="oversight-breakdown-badge oversight-breakdown-badge--${item.tone}">
              ${activeLabel} ${formatValue(activeValue, format)}
            </span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderOversightDiagnostics(profile) {
  if (!profile?.performance) {
    elements.oversightDiagnostics.innerHTML = "";
    return;
  }

  elements.oversightDiagnostics.innerHTML = `
    <div class="oversight-diagnostics__intro">
      <div>
        <p class="eyebrow eyebrow--dark">Oversight operating diagnostics</p>
        <h3>Queue pressure, reviewer headroom, and sampling quality</h3>
      </div>
      <p>${profile.performance.note}</p>
    </div>

    <div class="oversight-performance-summary">
      ${profile.performance.metrics
        .map((metric) => {
          const currentValue = state.mode === "pilot" ? metric.pilot : metric.baseline;
          const delta = describeDelta(metric, currentValue);
          return `
            <article class="oversight-performance-card">
              <span class="oversight-performance-card__label">${metric.label}</span>
              <strong>${formatValue(currentValue, metric.format)}</strong>
              <p>${delta.text}</p>
            </article>
          `;
        })
        .join("")}
    </div>

    <div class="oversight-performance-grid">
      <article class="oversight-breakdown-card">
        <div class="oversight-breakdown-card__head">
          <p class="eyebrow eyebrow--dark">Backlog ageing</p>
          <h3>Where queue delay is still sitting</h3>
          <p>Shows whether the queue is truly clearing or just shifting into older age bands.</p>
        </div>
        <div class="oversight-breakdown-list">
          ${renderOversightBreakdownRows(profile.performance.ageBuckets, "percent")}
        </div>
      </article>

      <article class="oversight-breakdown-card">
        <div class="oversight-breakdown-card__head">
          <p class="eyebrow eyebrow--dark">Reviewer capacity</p>
          <h3>Whether accountable reviewers still have headroom</h3>
          <p>Helps distinguish SLA pressure caused by workload, availability, or review design.</p>
        </div>
        <div class="oversight-breakdown-list">
          ${renderOversightBreakdownRows(profile.performance.reviewerBands, "percent")}
        </div>
      </article>

      <article class="oversight-breakdown-card">
        <div class="oversight-breakdown-card__head">
          <p class="eyebrow eyebrow--dark">Sampling and QA</p>
          <h3>How much straight-through work is still being checked</h3>
          <p>Completes the oversight story by showing post-hoc review depth and remediation pressure.</p>
        </div>
        <div class="oversight-breakdown-list">
          ${renderOversightBreakdownRows(profile.performance.samplingChecks, "percent")}
        </div>
      </article>
    </div>
  `;
}

function renderOversightSummary(profile) {
  const straightThrough = profile.kpis.find((metric) => metric.label === "Straight-Through Rate");
  const reviewQueue = profile.kpis.find((metric) => metric.label === "Human Review Queue");
  const highRiskHolds = profile.kpis.find((metric) => metric.label === "High-Risk Holds");

  const straightThroughValue = state.mode === "pilot" ? straightThrough.pilot : straightThrough.baseline;
  const reviewQueueValue = state.mode === "pilot" ? reviewQueue.pilot : reviewQueue.baseline;
  const highRiskHoldsValue = state.mode === "pilot" ? highRiskHolds.pilot : highRiskHolds.baseline;

  elements.oversightSummary.innerHTML = `
    <span class="oversight-summary-chip">
      <strong>${formatValue(straightThroughValue, straightThrough.format)}</strong>
      <span>Straight-through policy clearance</span>
    </span>
    <span class="oversight-summary-chip">
      <strong>${formatValue(reviewQueueValue, reviewQueue.format)}</strong>
      <span>Items awaiting accountable review</span>
    </span>
    <span class="oversight-summary-chip">
      <strong>${formatValue(highRiskHoldsValue, highRiskHolds.format)}</strong>
      <span>High-risk holds currently active</span>
    </span>
  `;
}

function renderRoutingMap(profile) {
  const routeMix = profile.routeMix.map((item) => ({
    ...item,
    value: state.mode === "pilot" ? item.pilot : item.baseline,
  }));
  const slaStatus = profile.slaStatus.map((item) => ({
    ...item,
    value: state.mode === "pilot" ? item.pilot : item.baseline,
  }));
  const straightThrough = profile.kpis.find((metric) => metric.label === "Straight-Through Rate");
  const reviewQueue = profile.kpis.find((metric) => metric.label === "Human Review Queue");
  const overrideRate = profile.kpis.find((metric) => metric.label === "Override Rate");
  const footerStats = [
    {
      label: "Auto-cleared",
      value: state.mode === "pilot" ? straightThrough.pilot : straightThrough.baseline,
      format: straightThrough.format,
    },
    {
      label: "Queue in review",
      value: state.mode === "pilot" ? reviewQueue.pilot : reviewQueue.baseline,
      format: reviewQueue.format,
    },
    {
      label: "Human override",
      value: state.mode === "pilot" ? overrideRate.pilot : overrideRate.baseline,
      format: overrideRate.format,
    },
  ];

  elements.routingMap.innerHTML = `
    <div class="routing-map">
      <div class="routing-map__kpi-strip">
        ${routeMix
          .map(
            (item) => `
              <article class="routing-map__mini-kpi routing-map__mini-kpi--${item.tone}">
                <span class="routing-map__mini-label">${item.label}</span>
                <strong>${formatValue(item.value, item.format)}</strong>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="routing-map__sla">
        <div class="routing-map__sla-head">
          <div>
            <span class="routing-map__overview-label">Oversight SLA</span>
            <strong>Disposition status for escalated decisions</strong>
          </div>
          <span class="status-chip">${slaStatus[0].value}% within SLA</span>
        </div>
        <div class="routing-map__sla-bar">
          ${slaStatus
            .map(
              (item) => `
                <span
                  class="routing-map__sla-segment routing-map__sla-segment--${item.tone}"
                  style="width: ${item.value}%"
                ></span>
              `,
            )
            .join("")}
        </div>
        <div class="routing-map__sla-legend">
          ${slaStatus
            .map(
              (item) => `
                <span class="routing-map__sla-legend-item routing-map__sla-legend-item--${item.tone}">
                  ${item.label} ${item.value}%
                </span>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="routing-map__stage">
        <div class="routing-map__label">
          <strong>AI Recommendation</strong>
          <span>Structured recommendation generated from approved workflow context and evidence.</span>
        </div>
        <span class="status-chip">Input</span>
      </div>
      <div class="routing-map__stage">
        <div class="routing-map__label">
          <strong>Policy &amp; Risk Scan</strong>
          <span>Control checks evaluate data sensitivity, blast radius, workflow policy, and evidence completeness.</span>
        </div>
        <span class="status-chip">Decision point</span>
      </div>
      <div class="routing-map__split">
        <div class="routing-map__branches">
          <article class="routing-map__branch routing-map__branch--green">
            <div>
              <strong>Green</strong>
              <p>Low-risk, policy-conformant work with complete evidence.</p>
            </div>
            <div class="routing-map__flow">
              <span class="routing-map__step">Policy-Based Auto-Approval Enabled</span>
              <span class="routing-map__step">Execute</span>
            </div>
          </article>
          <article class="routing-map__branch routing-map__branch--amber">
            <div>
              <strong>Amber</strong>
              <p>Material impact or incomplete evidence requiring accountable review.</p>
            </div>
            <div class="routing-map__flow">
              <span class="routing-map__step">Human Review</span>
              <span class="routing-map__step">Approve</span>
              <span class="routing-map__step">Execute</span>
            </div>
          </article>
          <article class="routing-map__branch routing-map__branch--red">
            <div>
              <strong>Red</strong>
              <p>High-risk, restricted, or policy-conflicting recommendations.</p>
            </div>
            <div class="routing-map__flow">
              <span class="routing-map__step">Escalate</span>
              <span class="routing-map__step">Hold</span>
              <span class="routing-map__step">Reject</span>
            </div>
          </article>
        </div>
      </div>
      <div class="routing-map__footer">
        ${footerStats
          .map(
            (item) => `
              <article class="routing-map__footer-kpi">
                <span>${item.label}</span>
                <strong>${formatValue(item.value, item.format)}</strong>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function riskDefinition(riskTier) {
  const definitions = {
    green: "Green: low-risk work with complete evidence and no policy conflicts.",
    amber: "Amber: material impact, missing evidence, or elevated blast radius requiring accountable review.",
    red: "Red: high-risk or policy-conflicting work that must be escalated, held, or rejected.",
  };
  return definitions[riskTier];
}

function riskLabel(riskTier) {
  return `${riskTier.charAt(0).toUpperCase()}${riskTier.slice(1)}`;
}

function prioritizedQueueItems(items) {
  return [...items].sort((left, right) => {
    const leftRank = left.workflowId === state.workflow ? 0 : left.workflowId === "all" ? 1 : 2;
    const rightRank = right.workflowId === state.workflow ? 0 : right.workflowId === "all" ? 1 : 2;
    return leftRank - rightRank;
  });
}

function renderPendingQueue(profile) {
  const queue = prioritizedQueueItems(profile.queue);
  const visibleItems = state.oversightTab === "overview" ? queue.slice(0, 3) : queue;

  elements.pendingQueue.innerHTML = `
    <div class="queue-toolbar">
      <span>${state.oversightTab === "overview" ? "Showing top 3 pending items" : `Showing full queue (${queue.length} items)`}</span>
      <span>SLA ${inlineTooltip("SLA is the accountable decision window for escalated items after policy scan.", "SLA definition")}</span>
    </div>
    <div class="queue-list">
      ${visibleItems
        .map(
          (item) => `
            <article class="pending-item">
              <div class="pending-item__header">
                <div class="pending-item__title-group">
                  <div class="pending-item__title">${item.name}</div>
                  <p class="pending-item__meta">${item.workflow} | Owner: ${item.owner}</p>
                </div>
                <div class="pending-item__chips">
                  <span class="risk-chip risk-chip--${item.riskTier}">
                    ${riskLabel(item.riskTier)}
                    ${inlineTooltip(riskDefinition(item.riskTier), `${riskLabel(item.riskTier)} risk definition`)}
                  </span>
                  <span class="status-chip">
                    ${item.due}
                    ${inlineTooltip(item.slaDefinition, "SLA definition")}
                  </span>
                </div>
              </div>
              <p class="pending-item__reason">${item.reason}</p>
              <div class="pending-item__tags">
                ${item.evidenceTags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
              </div>
              <div class="pending-item__footer">
                <div class="pending-item__evidence">
                  <span class="pending-item__meta">Escalation reason documented and evidence pack attached.</span>
                  <button class="action-button action-button--ghost" type="button" data-evidence-id="${getQueueEvidenceId(state.team, item.name)}" aria-label="Open evidence pack for ${item.name}">
                    Open evidence pack
                  </button>
                </div>
                <div class="pending-item__actions">
                  <button class="action-button action-button--primary" type="button">${item.actions[0]}</button>
                  <button class="action-button" type="button">${item.actions[1]}</button>
                  <button class="action-button action-button--ghost" type="button">${item.actions[2]}</button>
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderGovernance(portfolio) {
  const getCurrentSnapshot = (item) => (state.mode === "pilot" ? item.pilot : item.baseline);
  const getGovernanceReadinessTone = (value) => (value >= 95 ? "good" : value >= 85 ? "watch" : "risk");

  const renderGovernanceRiskSummary = (items = []) =>
    `
      <div class="governance-risk-summary-grid">
        ${items
          .map((item) => {
            const snapshot = getCurrentSnapshot(item);
            return `
              <article class="governance-risk-summary governance-risk-summary--${item.tone}">
                <div class="governance-risk-summary__head">
                  <span class="governance-risk-summary__label">${item.label}</span>
                  <span class="workitem-pill workitem-pill--${item.tone}">${formatValue(snapshot.routes, "count")} routes</span>
                </div>
                <strong>${formatValue(snapshot.value, item.format || "percent")}</strong>
                <p>${item.definition}</p>
                <small>${snapshot.note}</small>
              </article>
            `;
          })
          .join("")}
      </div>
    `;

  const renderGovernanceRiskBreakdown = (groups = []) =>
    `
      <div class="governance-risk-groups">
        ${groups
          .map(
            (group) => `
              <section class="governance-risk-group">
                <div class="governance-risk-group__head">
                  <div>
                    <h4>${group.title}</h4>
                    <p>${group.description}</p>
                  </div>
                </div>
                <div class="governance-risk-group__grid">
                  ${group.items
                    .map((item) => {
                      const snapshot = getCurrentSnapshot(item);
                      return `
                        <article class="governance-risk-item governance-risk-item--${item.tone}">
                          <div class="governance-risk-item__head">
                            <strong>${item.label}</strong>
                            <span class="workitem-pill workitem-pill--${item.tone}">${formatValue(snapshot.coverage, "percent")} covered</span>
                          </div>
                          <p>${item.detail}</p>
                          <div class="governance-risk-item__stats">
                            <span>${formatValue(snapshot.count, "count")} routes</span>
                            <span>${formatValue(snapshot.exceptions, "count")} exceptions</span>
                          </div>
                        </article>
                      `;
                    })
                    .join("")}
                </div>
              </section>
            `,
          )
          .join("")}
      </div>
    `;

  const renderGovernanceFrameworkCards = (items = []) =>
    `
      <div class="governance-console__frameworks">
        ${items
          .map((item) => {
            const snapshot = getCurrentSnapshot(item);
            const tone = getGovernanceReadinessTone(snapshot.readiness);
            return `
              <article class="governance-framework-card governance-framework-card--${tone}">
                <div class="governance-framework-card__head">
                  <span class="governance-framework-card__label">${item.name}</span>
                  <span class="workitem-pill workitem-pill--${tone}">${snapshot.controlsReady}/${snapshot.controlsTotal}</span>
                </div>
                <strong>${formatValue(snapshot.readiness, "percent")}</strong>
                <p>${item.owner}</p>
                <small>${snapshot.gap}</small>
              </article>
            `;
          })
          .join("")}
      </div>
    `;

  const renderGovernanceComplianceMatrix = (items = []) =>
    `
      <section class="governance-matrix">
        <div class="governance-matrix__head">
          <div>
            <p class="eyebrow eyebrow--dark">Compliance Matrix</p>
            <h4>Framework readiness mapped to concrete controls, owners, and gaps</h4>
          </div>
          <span class="status-chip">Framework-ready</span>
        </div>
        <div class="governance-matrix__table-wrap">
          <table class="governance-matrix__table">
            <thead>
              <tr>
                <th>Control family</th>
                <th>Frameworks</th>
                <th>Owner</th>
                <th>Ready</th>
                <th>Primary gap</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map((item) => {
                  const snapshot = getCurrentSnapshot(item);
                  const tone = getGovernanceReadinessTone(snapshot.readiness);
                  return `
                    <tr>
                      <td>
                        <div class="governance-matrix__title">${item.control}</div>
                      </td>
                      <td>
                        <div class="governance-framework-chips">
                          ${item.frameworks.map((framework) => `<span class="governance-framework-chip">${framework}</span>`).join("")}
                        </div>
                      </td>
                      <td>${item.owner}</td>
                      <td><span class="workitem-pill workitem-pill--${tone}">${formatValue(snapshot.readiness, "percent")}</span></td>
                      <td>${snapshot.gap}</td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
        </div>
        <p class="governance-matrix__note">${portfolio.governance.complianceNote[state.mode]}</p>
      </section>
    `;

  elements.governancePanel.innerHTML = `
    <div class="governance-layout">
      <div class="classification-grid">
        ${portfolio.governance.useCases
          .map((item) => {
            const count = state.mode === "pilot" ? item.pilot : item.baseline;
            return `
              <article class="classification-card">
                <span class="classification-dot classification-dot--${item.status}"></span>
                <div>
                  <strong>${item.label}</strong>
                  <small>${item.detail}</small>
                </div>
                <strong>${count}</strong>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="stat-list">
        ${portfolio.governance.metrics
          .map((metric) => {
            const currentValue = state.mode === "pilot" ? metric.pilot : metric.baseline;
            const delta = describeDelta(metric, currentValue);
            return `
              <div class="stat-row">
                <div>
                  ${tooltip(metric.label, metric.definition)}
                </div>
                <div class="stat-row__value">
                  <strong>${formatValue(currentValue, metric.format)}</strong>
                  <div><span class="delta-chip delta-chip--${delta.tone}">${delta.arrow} ${delta.text}</span></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
      <p class="governance-note">${portfolio.governance.notes[state.mode]}</p>
      <section class="governance-risk-board">
        <div class="governance-risk-board__head">
          <div>
            <p class="eyebrow">Risk-Class View</p>
            <h3>Where governance pressure sits by risk tier, criticality, and data sensitivity</h3>
          </div>
          <span class="status-chip">Concentration view</span>
        </div>
        <p class="governance-risk-board__note">${portfolio.governance.riskNote[state.mode]}</p>
        ${renderGovernanceRiskSummary(portfolio.governance.riskSummary)}
        ${renderGovernanceRiskBreakdown(portfolio.governance.riskBreakdown)}
      </section>
      <div class="governance-console">
        <div class="governance-console__head">
          <div>
            <p class="eyebrow eyebrow--dark">Control-Level View</p>
            <h3>Explicit framework and control status</h3>
          </div>
          <span class="status-chip">Auditable</span>
        </div>
        ${renderGovernanceFrameworkCards(portfolio.governance.complianceFrameworks)}
        ${renderGovernanceComplianceMatrix(portfolio.governance.complianceMatrix)}
        <div class="governance-console__list">
          ${portfolio.governance.controls
            .map(
              (control) => `
                <article class="governance-control">
                  <div class="governance-control__copy">
                    <strong>${control.name}</strong>
                    <span>${control.detail}</span>
                  </div>
                  <div class="governance-control__status">
                    <span class="status-chip status-chip--${control.status === "green" ? "green" : control.status === "amber" ? "amber" : "red"}">${control.label}</span>
                    <button class="governance-control__button" type="button" data-evidence-id="${getControlEvidenceId(state.team, control.name)}" aria-label="Open ${control.name} evidence pack">
                      View evidence
                    </button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderEconomics(portfolio) {
  const deliverySlice = getFilteredInitiatives({ portfolioKey: state.team, workflow: state.workflow })
    .sort((left, right) => right.realizedValue - left.realizedValue);
  const deliveryValueSnapshot = summarizeValueLedger(deliverySlice);
  const currentCostBars = portfolio.economics.byWorkflow.map((item) => ({
    ...item,
    value: state.mode === "pilot" ? item.pilot : item.baseline,
  }));
  const maxValue = Math.max(...currentCostBars.map((item) => item.value));
  const valueSegmentNote = deliveryValueSnapshot
    ? `${deliveryValueSnapshot.count} initiatives match ${describeActiveSegments()} in ${portfolio.label}${state.workflow === "all" ? "" : ` and the ${workflowLabels[state.workflow]}`}. ${Math.round(deliveryValueSnapshot.validatedShare)}% of realized value is finance validated.`
    : `No initiatives match ${describeActiveSegments()} in ${portfolio.label}${state.workflow === "all" ? "" : ` and the ${workflowLabels[state.workflow]}`}.`;

  elements.economicsPanel.innerHTML = `
    <div class="economics-layout">
      <section class="value-realization-panel">
        <div class="value-story-card value-story-card--compact">
          <span class="value-story-card__label">Finance-grade value tracking</span>
          <p>${valueSegmentNote}</p>
          ${renderBenefitMix(deliveryValueSnapshot)}
        </div>
        ${renderValueSummaryCards(deliveryValueSnapshot, { compact: true })}
        <div class="initiative-list initiative-list--compact">
          ${renderValueInitiatives(deliverySlice, { limit: 3 })}
        </div>
      </section>
      <div class="cost-bars">
        ${currentCostBars
          .map((item) => {
            const width = (item.value / maxValue) * 100;
            const isFocus = state.workflow === "all" || state.workflow === item.id;
            return `
              <div class="cost-bars__row">
                <div class="cost-bars__top">
                  <span>${item.label}</span>
                  <strong>${formatValue(item.value, item.format)}</strong>
                </div>
                <div class="bar-track">
                  <span class="bar-fill ${isFocus ? "is-focus" : ""}" style="width: ${width}%"></span>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
      <div>
        <div class="mix-stack">
          ${portfolio.economics.modelMix
            .map(
              (segment) =>
                `<span class="${segment.className}" style="width: ${segment.share}%"></span>`,
            )
            .join("")}
        </div>
        <div class="mix-legend">
          ${portfolio.economics.modelMix
            .map((segment, index) => {
              const colorMap = ["#1d5aa9", "#4b83c7", "#88acd8", "#c3d3e8"];
              return `
                <div class="mix-row" style="--mix-color: ${colorMap[index]}">
                  <span>${segment.label}</span>
                  <span>${segment.share}%</span>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
      <div class="economics-summary">
        ${portfolio.economics.summary
          .map((metric) => {
            const currentValue = state.mode === "pilot" ? metric.pilot : metric.baseline;
            const delta = describeDelta(metric, currentValue);
            return `
              <div class="summary-row">
                <div>${tooltip(metric.label, metric.definition)}</div>
                <div class="summary-row__value">
                  <strong>${formatValue(currentValue, metric.format)}</strong>
                  <div><span class="delta-chip delta-chip--${delta.tone}">${delta.arrow} ${delta.text}</span></div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
      <p class="economics-note">${portfolio.economics.notes[state.mode]}</p>
    </div>
  `;
}

function getPrioritizedActions(actions) {
  const severityRank = {
    high: 0,
    medium: 1,
    low: 2,
  };

  return [...actions]
    .filter((action) => state.workflow === "all" || action.workflow === "all" || action.workflow === state.workflow)
    .sort((left, right) => {
      const leftRank = left.workflow === state.workflow ? 0 : left.workflow === "all" ? 1 : 2;
      const rightRank = right.workflow === state.workflow ? 0 : right.workflow === "all" ? 1 : 2;
      if (leftRank !== rightRank) {
        return leftRank - rightRank;
      }

      const severityDelta = severityRank[left.severity] - severityRank[right.severity];

      if (severityDelta !== 0) {
        return severityDelta;
      }

      return new Date(left.dueDate) - new Date(right.dueDate);
    })
    .slice(0, 6);
}

function renderActionCenter(portfolio) {
  const actions = getPrioritizedActions(actionWorkflowLibrary[state.team] || []);
  const highSeverityCount = actions.filter((item) => item.severity === "high").length;
  const atRiskCount = actions.filter((item) => item.status === "at-risk" || item.status === "blocked").length;
  const evidenceReadyCount = actions.filter((item) => item.evidenceState === "complete").length;
  const thisMonthCount = actions.filter((item) => item.dueDate.startsWith("2026-04")).length;

  elements.actionCenter.innerHTML = `
    <div class="action-center">
      <div class="action-summary-grid">
        <article class="action-summary-card">
          <span class="action-summary-card__label">High-severity items</span>
          <strong>${highSeverityCount}</strong>
          <p>These are the work items most likely to slow safe scale if they drift.</p>
        </article>
        <article class="action-summary-card">
          <span class="action-summary-card__label">At risk or blocked</span>
          <strong>${atRiskCount}</strong>
          <p>These items need either executive clearance or missing evidence before they can close.</p>
        </article>
        <article class="action-summary-card">
          <span class="action-summary-card__label">Evidence complete</span>
          <strong>${evidenceReadyCount}</strong>
          <p>These items have enough closure evidence attached to support an accountable decision.</p>
        </article>
        <article class="action-summary-card">
          <span class="action-summary-card__label">Due in April 2026</span>
          <strong>${thisMonthCount}</strong>
          <p>The action center is built to convert this month’s signals into owned operating work.</p>
        </article>
      </div>

      <div class="action-workflow-grid">
        ${actions
          .map((action) => {
            const severityMeta = actionSeverityMeta[action.severity];
            const statusMeta = actionStatusMeta[action.status];
            const evidenceMeta = evidenceStateMeta[action.evidenceState];

            return `
              <article class="action-workitem action-workitem--${action.status}">
                <div class="action-workitem__head">
                  <div>
                    <span class="action-workitem__eyebrow">${workflowLabels[action.workflow] || "Cross-workflow"} priority</span>
                    <h3>${action.title}</h3>
                  </div>
                  <div class="action-workitem__chips">
                    <span class="workitem-pill workitem-pill--${severityMeta.tone}">${severityMeta.label}</span>
                    <span class="workitem-pill workitem-pill--${statusMeta.tone}">${statusMeta.label}</span>
                  </div>
                </div>

                <p class="action-workitem__source"><strong>Source signal:</strong> ${action.sourceSignal}</p>

                <div class="action-progress">
                  <div class="action-progress__head">
                    <span>Closure progress</span>
                    <strong>${action.progress}%</strong>
                  </div>
                  <div class="action-progress__track" aria-hidden="true">
                    <span class="action-progress__fill action-progress__fill--${statusMeta.tone}" style="width: ${action.progress}%"></span>
                  </div>
                </div>

                <div class="action-workitem__meta">
                  <div>
                    <span>Owner</span>
                    <strong>${action.owner}</strong>
                  </div>
                  <div>
                    <span>Due</span>
                    <strong>${formatDateLabel(action.dueDate)}</strong>
                  </div>
                  <div>
                    <span>Expected impact</span>
                    <strong>${action.impact}</strong>
                  </div>
                  <div>
                    <span>Evidence</span>
                    <strong>${evidenceMeta.label}</strong>
                  </div>
                </div>

                <p class="action-workitem__next"><strong>Next step:</strong> ${action.nextStep}</p>

                <div class="action-workitem__footer">
                  <span class="workitem-pill workitem-pill--${evidenceMeta.tone}">${action.evidenceSummary}</span>
                  <button class="detail-link" type="button" data-evidence-id="${getActionEvidenceId(state.team, action.id)}" aria-label="Open evidence pack for ${action.title}">
                    Open evidence pack
                  </button>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderRoadmap(portfolio) {
  elements.roadmapPanel.innerHTML = `
    <div class="roadmap-grid">
      ${portfolio.roadmap
        .map(
          (step) => `
            <article class="roadmap-step">
              <span class="roadmap-step__window">${step.window}</span>
              <h3>${step.title}</h3>
              <ul>
                ${step.items.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderTrustLayer(teamKey) {
  const profile = assuranceProfiles[teamKey];

  if (!profile) {
    elements.trustLayerPanel.innerHTML = "";
    return;
  }

  const modelMonitoringRecords = getFilteredModelMonitoringRecords({ portfolioKey: teamKey });
  const modelMonitoringSummary = summarizeModelMonitoring(modelMonitoringRecords);
  const ragQualityRecords = getFilteredRagQualityRecords({ portfolioKey: teamKey });
  const ragQualitySummary = summarizeRagQuality(ragQualityRecords);
  const hallucinationRecords = getFilteredHallucinationRecords({ portfolioKey: teamKey });
  const hallucinationSummary = summarizeHallucinationMethodology(hallucinationRecords);
  const promptSecurityRecords = getFilteredPromptSecurityRecords({ portfolioKey: teamKey });
  const promptSecuritySummary = summarizePromptSecurity(promptSecurityRecords);
  const reliabilityRecords = getFilteredReliabilityRecords({ portfolioKey: teamKey });
  const reliabilitySummary = summarizeReliability(reliabilityRecords);
  const deliveryAccessContext = buildAccessScopeContext("delivery", teamKey);

  const renderAssuranceMetrics = (items) =>
    items
      .map(
        (item) => `
          <article class="assurance-metric assurance-metric--${item.tone}">
            <div class="assurance-metric__head">
              <span class="assurance-metric__label">${item.label}</span>
              <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
            </div>
            <strong class="assurance-metric__value">${item.value}</strong>
            <p>${item.detail}</p>
          </article>
        `,
      )
      .join("");

  const renderAlertWatchlist = (items) =>
    `
      <div class="trust-watchlist">
        ${items
          .map(
            (item) => `
              <article class="trust-watchlist__item">
                <div class="trust-watchlist__head">
                  <strong>${item.name}</strong>
                  <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                </div>
                <div class="trust-watchlist__meta">
                  <span>${item.threshold}</span>
                  <span>${item.current}</span>
                  <span>${item.trend}</span>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const renderSourceFeeds = (items) =>
    `
      <div class="trust-feed-list">
        ${items
          .map(
            (item) => `
              <article class="trust-feed-row">
                <div class="trust-feed-row__copy">
                  <div class="trust-feed-row__head">
                    <strong>${item.name}</strong>
                    <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                  </div>
                  <p>${item.detail}</p>
                </div>
                <div class="trust-feed-row__stats">
                  <span>${item.freshness}</span>
                  <span>${item.completeness}</span>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const renderModelRoutes = (items) =>
    `
      <div class="trust-model-list">
        ${items
          .map(
            (item) => `
              <article class="trust-model-row trust-model-row--${item.tone}">
                <div class="trust-model-row__head">
                  <div class="trust-model-row__copy">
                    <strong>${item.route}</strong>
                    <p>${item.modelFamily} · ${item.useCase}</p>
                  </div>
                  <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                </div>
                <div class="trust-model-row__meta">
                  <span>${workflowLabels[item.workflow]}</span>
                  <span>${item.geography}</span>
                  <span>${item.function}</span>
                  <span>${formatValue(item.requests7d, "count")} req / 7d</span>
                </div>
                <div class="trust-model-row__stats">
                  <span>P95 ${formatMilliseconds(item.latencyMs)}</span>
                  <span>Errors ${formatValue(item.errorRate, "percent")}</span>
                  <span>Cost ${formatCurrencyPerThousand(item.tokenCostPer1k)}</span>
                  <span>Refusal ${formatValue(item.refusalRate, "percent")}</span>
                  <span>Fallback ${formatValue(item.fallbackRate, "percent")}</span>
                  <span>Safety ${formatValue(item.safetyEvents7d, "count")} / 7d</span>
                </div>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const renderHallucinationRoutes = (items) =>
    `
      <div class="trust-model-list">
        ${items
          .map(
            (item) => `
              <article class="trust-model-row trust-model-row--${item.tone}">
                <div class="trust-model-row__head">
                  <div class="trust-model-row__copy">
                    <strong>${item.route}</strong>
                    <p>${item.suiteName} · ${item.modelFamily}</p>
                  </div>
                  <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                </div>
                <div class="trust-model-row__meta">
                  <span>${workflowLabels[item.workflow]}</span>
                  <span>${item.geography}</span>
                  <span>${item.function}</span>
                  <span>${formatValue(item.sampleSize, "count")} eval samples</span>
                </div>
                <div class="trust-model-row__stats">
                  <span>Pass ${formatValue(item.passRate, "percent")}</span>
                  <span>95% CI ${formatPercentRange(item.ciLow, item.ciHigh)}</span>
                  <span>${item.useCase}</span>
                  <span>${item.modelTier}</span>
                </div>
                <p><strong>Suite scope:</strong> ${item.suiteScope}</p>
                <p><strong>Main fail mode:</strong> ${item.failureMode}</p>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const renderRagQualityRoutes = (items) =>
    `
      <div class="trust-model-list">
        ${items
          .map(
            (item) => `
              <article class="trust-model-row trust-model-row--${item.tone}">
                <div class="trust-model-row__head">
                  <div class="trust-model-row__copy">
                    <strong>${item.route}</strong>
                    <p>${item.knowledgeSurface}</p>
                  </div>
                  <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                </div>
                <div class="trust-model-row__meta">
                  <span>${workflowLabels[item.workflow]}</span>
                  <span>${item.geography}</span>
                  <span>${item.function}</span>
                  <span>${formatValue(item.queries7d, "count")} retrieval queries / 7d</span>
                </div>
                <div class="trust-model-row__stats">
                  <span>Citation ${formatValue(item.citationRate, "percent")}</span>
                  <span>Hit ${formatValue(item.retrievalHitRate, "percent")}</span>
                  <span>Fresh ${formatValue(item.freshnessWithinSlaPct, "percent")}</span>
                  <span>Stale ${formatValue(item.staleContentPct, "percent")}</span>
                  <span>No-answer ${formatValue(item.noAnswerRate, "percent")}</span>
                </div>
                <p><strong>Main gap:</strong> ${item.findingSummary}</p>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const renderPromptSecurityRoutes = (items) =>
    `
      <div class="trust-model-list">
        ${items
          .map(
            (item) => `
              <article class="trust-model-row trust-model-row--${item.tone}">
                <div class="trust-model-row__head">
                  <div class="trust-model-row__copy">
                    <strong>${item.route}</strong>
                    <p>${item.securityBattery} · ${item.securityOwner}</p>
                  </div>
                  <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                </div>
                <div class="trust-model-row__meta">
                  <span>${workflowLabels[item.workflow]}</span>
                  <span>${item.geography}</span>
                  <span>${item.function}</span>
                  <span>${formatValue(item.promptAssets, "count")} prompt assets</span>
                </div>
                <div class="trust-model-row__stats">
                  <span>Coverage ${formatValue(item.testedCoveragePct, "percent")}</span>
                  <span>Attacks ${formatValue(item.attackAttempts7d, "count")} / 7d</span>
                  <span>Blocked ${formatValue(item.blockedRate, "percent")}</span>
                  <span>Open ${formatValue(item.openFindings, "count")}</span>
                  <span>Critical ${formatValue(item.criticalFindings, "count")}</span>
                  <span>SLA ${formatValue(item.remediationSlaHours, "hours")}</span>
                </div>
                <p><strong>Main finding:</strong> ${item.findingSummary}</p>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const renderReliabilityRoutes = (items) =>
    `
      <div class="trust-model-list">
        ${items
          .map(
            (item) => `
              <article class="trust-model-row trust-model-row--${item.tone}">
                <div class="trust-model-row__head">
                  <div class="trust-model-row__copy">
                    <strong>${item.route}</strong>
                    <p>${item.provider} · fallback ${item.fallbackTarget}</p>
                  </div>
                  <span class="workitem-pill workitem-pill--${item.tone}">${assuranceToneMeta[item.tone]}</span>
                </div>
                <div class="trust-model-row__meta">
                  <span>${workflowLabels[item.workflow]}</span>
                  <span>${item.geography}</span>
                  <span>${item.function}</span>
                  <span>${formatValue(item.routedCalls7d, "count")} routed calls / 7d</span>
                </div>
                <div class="trust-model-row__stats">
                  <span>Incidents ${formatValue(item.providerIncidents7d, "count")} / 7d</span>
                  <span>Degraded ${formatValue(item.degradedSharePct, "percent")}</span>
                  <span>Failover ${formatValue(item.failoverSharePct, "percent")}</span>
                  <span>Queue ${formatMilliseconds(item.queueDelayMs)}</span>
                  <span>Quality impact ${formatValue(item.qualityImpactPct, "percent")}</span>
                  <span>Recovered ${formatValue(item.recoveryWithinSlaPct, "percent")}</span>
                </div>
                <p><strong>Degraded mode:</strong> ${item.modeDetail}</p>
                <p>${item.detail}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    `;

  const modelMonitoringMetrics = modelMonitoringSummary
    ? [
        {
          label: "P95 latency",
          value: formatMilliseconds(modelMonitoringSummary.latencyMs),
          detail: `Weighted across ${formatValue(modelMonitoringSummary.totalRequests, "count")} requests in the current 7-day slice.`,
          tone: getModelMonitoringTone("latency", modelMonitoringSummary.latencyMs),
        },
        {
          label: "Runtime error rate",
          value: formatValue(modelMonitoringSummary.errorRate, "percent"),
          detail: "Share of routed calls ending in transport, execution, or policy-processing errors.",
          tone: getModelMonitoringTone("errorRate", modelMonitoringSummary.errorRate),
        },
        {
          label: "Token cost / 1K req",
          value: formatCurrencyPerThousand(modelMonitoringSummary.tokenCostPer1k),
          detail: "Weighted token and platform cost for the currently visible model routes.",
          tone: getModelMonitoringTone("tokenCost", modelMonitoringSummary.tokenCostPer1k),
        },
        {
          label: "Refusal rate",
          value: formatValue(modelMonitoringSummary.refusalRate, "percent"),
          detail: "Share of requests declined by policy, safety, or task-fit controls.",
          tone: getModelMonitoringTone("refusalRate", modelMonitoringSummary.refusalRate),
        },
        {
          label: "Fallback rate",
          value: formatValue(modelMonitoringSummary.fallbackRate, "percent"),
          detail: "Share of routed calls that needed a lower-tier or alternate path to complete safely.",
          tone: getModelMonitoringTone("fallbackRate", modelMonitoringSummary.fallbackRate),
        },
        {
          label: "Safety events",
          value: `${formatValue(modelMonitoringSummary.safetyEvents7d, "count")} / 7d`,
          detail: "Flagged safety or policy events observed across the current model slice in the last seven days.",
          tone: getModelMonitoringTone("safetyEvents", modelMonitoringSummary.safetyEvents7d),
        },
      ]
    : [];

  const modelMonitoringContent = modelMonitoringSummary
    ? `
        <div class="assurance-metric-grid">${renderAssuranceMetrics(modelMonitoringMetrics)}</div>
        ${renderModelRoutes(modelMonitoringSummary.routeBreakdown)}
      `
    : `
        <div class="empty-state-card">
          <strong>No model monitoring routes match the current slice.</strong>
          <p>Broaden one or more filters to reopen the route-level runtime view.</p>
        </div>
      `;

  const reliabilityMetrics = reliabilitySummary
    ? [
        {
          label: "Provider incidents / 7d",
          value: `${formatValue(reliabilitySummary.providerIncidents7d, "count")} / 7d`,
          detail: `Across ${reliabilitySummary.routeCount} active routes in the current slice.`,
          tone: getReliabilityTone("incidents", reliabilitySummary.providerIncidents7d),
        },
        {
          label: "Degraded-mode share",
          value: formatValue(reliabilitySummary.degradedSharePct, "percent"),
          detail: "Share of routed calls served under constrained context, cached retrieval, or safe degraded handling.",
          tone: getReliabilityTone("degradedShare", reliabilitySummary.degradedSharePct),
        },
        {
          label: "Provider failover share",
          value: formatValue(reliabilitySummary.failoverSharePct, "percent"),
          detail: "Fallbacks caused by provider or orchestration degradation, not general task-fit rerouting.",
          tone: getReliabilityTone("failoverShare", reliabilitySummary.failoverSharePct),
        },
        {
          label: "Queueing delay in degraded mode",
          value: formatMilliseconds(reliabilitySummary.queueDelayMs),
          detail: "Weighted incremental queue delay while routes are in degraded or provider-failover conditions.",
          tone: getReliabilityTone("queueDelay", reliabilitySummary.queueDelayMs),
        },
        {
          label: "Quality impact in degraded mode",
          value: formatValue(reliabilitySummary.qualityImpactPct, "percent"),
          detail: "Measured drop in pass, containment, or first-pass quality during degraded conditions versus normal operation.",
          tone: getReliabilityTone("qualityImpact", reliabilitySummary.qualityImpactPct),
        },
        {
          label: "Recovered within SLO",
          value: formatValue(reliabilitySummary.recoveryWithinSlaPct, "percent"),
          detail: "Share of visible provider or dependency incidents restored inside the committed resilience window.",
          tone: getReliabilityTone("recovery", reliabilitySummary.recoveryWithinSlaPct),
        },
      ]
    : [];

  const reliabilityContent = reliabilitySummary
    ? `
        <div class="trust-methodology-callout">
          <strong>Reliability definition</strong>
          <p>Degraded-mode share = calls served under constrained routing, cached retrieval, or slim-context fallback because a provider or dependency is stressed. Provider failover counts only those fallbacks caused by degraded conditions, not the broader task-fit fallbacks already shown in Model monitoring.</p>
        </div>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(reliabilityMetrics)}</div>
        ${renderReliabilityRoutes(reliabilitySummary.routeBreakdown)}
      `
    : `
        <div class="empty-state-card">
          <strong>No reliability routes match the current slice.</strong>
          <p>Broaden one or more filters to reopen the degraded-mode and provider-resilience view.</p>
        </div>
      `;

  const ragQualityMetrics = ragQualitySummary
    ? [
        {
          label: "Retrieval queries / 7d",
          value: `${formatValue(ragQualitySummary.totalQueries, "count")} / 7d`,
          detail: `${ragQualitySummary.routeCount} knowledge-grounded routes are currently visible in the slice.`,
          tone: "good",
        },
        {
          label: "Citation rate",
          value: formatValue(ragQualitySummary.citationRate, "percent"),
          detail: "Share of answered retrieval-backed responses that return an explicit approved source citation.",
          tone: getRagQualityTone("citationRate", ragQualitySummary.citationRate),
        },
        {
          label: "Retrieval hit rate",
          value: formatValue(ragQualitySummary.retrievalHitRate, "percent"),
          detail: "Share of retrieval calls where the returned evidence set contains at least one adjudicated relevant source.",
          tone: getRagQualityTone("retrievalHitRate", ragQualitySummary.retrievalHitRate),
        },
        {
          label: "Knowledge in freshness SLO",
          value: formatValue(ragQualitySummary.freshnessWithinSlaPct, "percent"),
          detail: "Share of served knowledge that falls inside the route-specific content freshness window.",
          tone: getRagQualityTone("freshness", ragQualitySummary.freshnessWithinSlaPct),
        },
        {
          label: "Stale content share",
          value: formatValue(ragQualitySummary.staleContentPct, "percent"),
          detail: "Share of retrievals that surfaced content older than the route’s freshness allowance.",
          tone: getRagQualityTone("staleContent", ragQualitySummary.staleContentPct),
        },
        {
          label: "No-answer rate",
          value: formatValue(ragQualitySummary.noAnswerRate, "percent"),
          detail: "Share of retrieval-backed prompts where the system correctly declined because relevant evidence was not found.",
          tone: getRagQualityTone("noAnswer", ragQualitySummary.noAnswerRate),
        },
      ]
    : [];

  const ragQualityContent = ragQualitySummary
    ? `
        <div class="trust-methodology-callout">
          <strong>Grounding definition</strong>
          <p>Citation rate = answered responses with a source handle to approved knowledge. Retrieval hit rate = returned evidence set includes at least one adjudicated relevant source. No-answer means the route declined to answer because relevant evidence was not confidently found.</p>
        </div>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(ragQualityMetrics)}</div>
        ${renderRagQualityRoutes(ragQualitySummary.routeBreakdown)}
      `
    : `
        <div class="empty-state-card">
          <strong>No RAG quality routes match the current slice.</strong>
          <p>Broaden one or more filters to reopen the retrieval-quality view.</p>
        </div>
      `;

  const hallucinationMetrics = hallucinationSummary
    ? [
        {
          label: "Eval suites in slice",
          value: formatValue(hallucinationSummary.suiteCount, "count"),
          detail: `${hallucinationSummary.routeCount} model routes currently contribute to the methodology view.`,
          tone: "good",
        },
        {
          label: "Matched sample",
          value: formatValue(hallucinationSummary.totalSample, "count"),
          detail: "Human-reviewed prompts and adjudicated answer checks in the currently visible evaluation slice.",
          tone: "good",
        },
        {
          label: "Weighted pass rate",
          value: formatValue(hallucinationSummary.passRate, "percent"),
          detail: "Pass means the answer is grounded in approved evidence and contains no unsupported material claim.",
          tone: getHallucinationTone(hallucinationSummary.passRate),
        },
        {
          label: "95% confidence interval",
          value: formatPercentRange(hallucinationSummary.ciLow, hallucinationSummary.ciHigh),
          detail: "Sampling uncertainty around the current weighted pass-rate estimate for the visible slice.",
          tone: hallucinationSummary.totalSample >= 300 ? "good" : hallucinationSummary.totalSample >= 200 ? "watch" : "risk",
        },
      ]
    : [];

  const hallucinationContent = hallucinationSummary
    ? `
        <div class="trust-methodology-callout">
          <strong>Eval definition</strong>
          <p>Pass = a grounded answer that stays faithful to approved evidence and avoids unsupported material claims. Fail = invented fact, unsupported rationale, or a missing caveat that changes decision meaning.</p>
        </div>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(hallucinationMetrics)}</div>
        ${renderHallucinationRoutes(hallucinationSummary.routeBreakdown)}
      `
    : `
        <div class="empty-state-card">
          <strong>No hallucination methodology routes match the current slice.</strong>
          <p>Broaden one or more filters to reopen the route-level evaluation view.</p>
        </div>
      `;

  const promptSecurityMetrics = promptSecuritySummary
    ? [
        {
          label: "Injection-tested coverage",
          value: formatValue(promptSecuritySummary.testedCoveragePct, "percent"),
          detail: `Weighted across ${formatValue(promptSecuritySummary.promptAssets, "count")} active prompt assets in the current slice.`,
          tone: getPromptSecurityTone("coverage", promptSecuritySummary.testedCoveragePct),
        },
        {
          label: "Attack attempts / 7d",
          value: `${formatValue(promptSecuritySummary.attackAttempts7d, "count")} / 7d`,
          detail: `${formatValue(promptSecuritySummary.blockedRate, "percent")} were blocked before execution or tool access.`,
          tone: getPromptSecurityTone("blockedRate", promptSecuritySummary.blockedRate),
        },
        {
          label: "Open findings",
          value: formatValue(promptSecuritySummary.openFindings, "count"),
          detail: "Security findings still open across injection, leakage, and tool-abuse testing.",
          tone: getPromptSecurityTone("openFindings", promptSecuritySummary.openFindings),
        },
        {
          label: "Critical findings",
          value: formatValue(promptSecuritySummary.criticalFindings, "count"),
          detail: "Findings severe enough to keep the route supervised or gate broader scale-out.",
          tone: getPromptSecurityTone("criticalFindings", promptSecuritySummary.criticalFindings),
        },
        {
          label: "Target remediation SLA",
          value: formatValue(promptSecuritySummary.remediationSlaHours, "hours"),
          detail: "Weighted security-fix SLA across the currently visible open findings.",
          tone: getPromptSecurityTone("remediationSla", promptSecuritySummary.remediationSlaHours),
        },
        {
          label: "Findings within SLA",
          value: formatValue(promptSecuritySummary.withinSlaPct, "percent"),
          detail: "Share of visible findings currently progressing inside the committed remediation window.",
          tone: getPromptSecurityTone("withinSla", promptSecuritySummary.withinSlaPct),
        },
      ]
    : [];

  const promptSecurityContent = promptSecuritySummary
    ? `
        <div class="trust-methodology-callout">
          <strong>Coverage definition</strong>
          <p>Covered = active prompts that passed injection, data-exfiltration, and tool-abuse tests in the current review cycle. Live attack attempts count observed malicious prompt patterns in production traffic, not internal red-team runs.</p>
        </div>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(promptSecurityMetrics)}</div>
        ${renderPromptSecurityRoutes(promptSecuritySummary.routeBreakdown)}
      `
    : `
        <div class="empty-state-card">
          <strong>No prompt-security routes match the current slice.</strong>
          <p>Broaden one or more filters to reopen the prompt-security coverage view.</p>
        </div>
      `;

  const accessScopeContent = deliveryAccessContext
    ? `
        <div class="assurance-metric-grid">${renderAssuranceMetrics(deliveryAccessContext.metrics)}</div>
        <div class="access-scope-grid">
          <article class="access-scope-column access-scope-column--good">
            <p class="eyebrow">Visible in this role</p>
            <ul>
              ${deliveryAccessContext.visible.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="access-scope-column access-scope-column--watch">
            <p class="eyebrow">Masked or restricted</p>
            <ul>
              ${deliveryAccessContext.masked.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="access-scope-column access-scope-column--good">
            <p class="eyebrow">Control rules</p>
            <ul>
              ${deliveryAccessContext.controls.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
        </div>
      `
    : "";

  elements.trustLayerPanel.innerHTML = `
    <div class="trust-grid">
      <article class="trust-card">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Integration completeness</p>
            <h3>How much of the operating estate is actually instrumented</h3>
          </div>
          <span class="status-chip">Coverage context</span>
        </div>
        <p class="trust-card__lead">${profile.integration.headline}</p>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(profile.integration.metrics)}</div>
        <p class="trust-card__note">${profile.integration.note}</p>
      </article>

      <article class="trust-card">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Audit observability</p>
            <h3>How quickly Meridian can inspect, search, and export evidence</h3>
          </div>
          <span class="status-chip">Evidence operations</span>
        </div>
        <p class="trust-card__lead">${profile.audit.headline}</p>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(profile.audit.metrics)}</div>
        <p class="trust-card__note">${profile.audit.note}</p>
      </article>

      <article class="trust-card trust-card--wide">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">RBAC and access scope</p>
            <h3>What this viewer can inspect, what stays masked, and how sensitive exports are governed</h3>
          </div>
          <div class="trust-card__actions">
            <button class="detail-link" type="button" data-evidence-id="${getAccessEvidenceId("delivery")}" aria-label="Open delivery access and masking policy evidence pack">
              Open policy pack
            </button>
            <span class="status-chip">${deliveryAccessContext.statusChip}</span>
          </div>
        </div>
        <p class="trust-card__lead">${deliveryAccessContext.headline}</p>
        ${accessScopeContent}
        <p class="trust-card__note">Policy owner: ${deliveryAccessContext.policyOwner}. Approval path: ${deliveryAccessContext.approvalGroup}. Active delivery scope: ${deliveryAccessContext.scopeDetail}.</p>
      </article>

      <article class="trust-card">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Alert telemetry</p>
            <h3>Which thresholds are breaching, recurring, or slowing down response</h3>
          </div>
          <span class="status-chip">Thresholded signals</span>
        </div>
        <p class="trust-card__lead">${profile.alerts.headline}</p>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(profile.alerts.metrics)}</div>
        ${renderAlertWatchlist(profile.alerts.watchlist)}
        <p class="trust-card__note">${profile.alerts.note}</p>
      </article>

      <article class="trust-card">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Data freshness</p>
            <h3>Whether the cockpit inputs are current enough to trust</h3>
          </div>
          <span class="status-chip">Pipeline health</span>
        </div>
        <p class="trust-card__lead">${profile.sourceHealth.headline}</p>
        <div class="assurance-metric-grid">${renderAssuranceMetrics(profile.sourceHealth.metrics)}</div>
        ${renderSourceFeeds(profile.sourceHealth.feeds)}
        <p class="trust-card__note">${profile.sourceHealth.note}</p>
      </article>

      <article class="trust-card trust-card--wide">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Model monitoring</p>
            <h3>How the active model routes are behaving by use case</h3>
          </div>
          <span class="status-chip">${modelMonitoringSummary ? `${modelMonitoringSummary.routeCount} routes in slice` : "No active slice"}</span>
        </div>
        <p class="trust-card__lead">${profile.modelMonitoring.headline}</p>
        ${modelMonitoringContent}
        <p class="trust-card__note">${profile.modelMonitoring.note}</p>
      </article>

      <article class="trust-card trust-card--wide">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Reliability and degraded mode</p>
            <h3>How provider incidents, degraded handling, and failover are affecting queue flow and quality</h3>
          </div>
          <span class="status-chip">${reliabilitySummary ? `${reliabilitySummary.routeCount} routes in resilience slice` : "No active slice"}</span>
        </div>
        <p class="trust-card__lead">${profile.reliability.headline}</p>
        ${reliabilityContent}
        <p class="trust-card__note">${profile.reliability.note}</p>
      </article>

      <article class="trust-card trust-card--wide">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">RAG quality</p>
            <h3>How well Meridian's retrieval layer is finding fresh, citable knowledge before the model answers</h3>
          </div>
          <span class="status-chip">${ragQualitySummary ? `${ragQualitySummary.routeCount} routes in RAG slice` : "No active slice"}</span>
        </div>
        <p class="trust-card__lead">${profile.ragQuality.headline}</p>
        ${ragQualityContent}
        <p class="trust-card__note">${profile.ragQuality.note}</p>
      </article>

      <article class="trust-card trust-card--wide">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Hallucination methodology</p>
            <h3>How grounded-answer quality is measured and how certain Meridian is in that number</h3>
          </div>
          <span class="status-chip">${hallucinationSummary ? `${hallucinationSummary.routeCount} routes in eval slice` : "No active slice"}</span>
        </div>
        <p class="trust-card__lead">${profile.hallucinationMethodology.headline}</p>
        ${hallucinationContent}
        <p class="trust-card__note">${profile.hallucinationMethodology.note}</p>
      </article>

      <article class="trust-card trust-card--wide">
        <div class="trust-card__head">
          <div>
            <p class="eyebrow">Prompt security coverage</p>
            <h3>How well Meridian has actually tested prompts against injection, leakage, and tool-abuse risk</h3>
          </div>
          <span class="status-chip">${promptSecuritySummary ? `${promptSecuritySummary.routeCount} routes in security slice` : "No active slice"}</span>
        </div>
        <p class="trust-card__lead">${profile.promptSecurity.headline}</p>
        ${promptSecurityContent}
        <p class="trust-card__note">${profile.promptSecurity.note}</p>
      </article>
    </div>
  `;
}

function buildAccessScopeContext(screen, teamKey = state.team) {
  const profile = accessProfiles[screen];

  if (!profile) {
    return null;
  }

  if (screen === "delivery") {
    const portfolio = portfolios[teamKey];
    const scopeDetail = `${portfolio.label} · ${describeActiveSegments()}`;

    return {
      ...profile,
      scopeDetail,
      metrics: [
        {
          label: "Visible granularity",
          value: "Route + action",
          detail: `Access applies to ${scopeDetail}.`,
          tone: "good",
        },
        {
          label: "Masked by default",
          value: "3 data classes",
          detail: "Prompt text, raw payloads, and person-level identities remain hidden.",
          tone: "watch",
        },
        {
          label: "Evidence access",
          value: "Summary + refs",
          detail: "Evidence packs expose approved metadata; restricted artifacts need governed approval.",
          tone: "good",
        },
        {
          label: "Audit logging",
          value: "Every read logged",
          detail: "Viewer role, slice, and export actions are all written to the access trail.",
          tone: "good",
        },
      ],
    };
  }

  return {
    ...profile,
    scopeDetail: describeActiveSegments(),
    metrics: [
      {
        label: "Visible granularity",
        value: "Aggregates only",
        detail: "Board view stays at enterprise rollup level even when filters narrow the slice.",
        tone: "good",
      },
      {
        label: "Masked by default",
        value: "3 data classes",
        detail: "Prompt text, raw evidence artifacts, and person-level activity are hidden in this view.",
        tone: "watch",
      },
      {
        label: "Evidence access",
        value: "Summary only",
        detail: "Evidence opens in board-summary mode rather than raw restricted artifact mode.",
        tone: "good",
      },
      {
        label: "Audit logging",
        value: "Every read logged",
        detail: "Board-view reads and exports are logged against the named viewer role.",
        tone: "good",
      },
    ],
  };
}

function renderViewBars() {
  const institutionAccess = buildAccessScopeContext("institutionalization");
  const deliveryAccess = buildAccessScopeContext("delivery", state.team);

  if (elements.institutionalizationViewMeta && institutionAccess) {
    elements.institutionalizationViewMeta.innerHTML = `
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Audience</strong>
        <span>${institutionAccess.roleLabel}</span>
      </span>
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Lens</strong>
        <span>${institutionAccess.posture}</span>
      </span>
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Access</strong>
        <span>${institutionAccess.clearance}</span>
      </span>
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Scope</strong>
        <span>${institutionAccess.scopeLabel}</span>
      </span>
    `;
  }

  if (elements.deliveryViewMeta && deliveryAccess) {
    elements.deliveryViewMeta.innerHTML = `
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Audience</strong>
        <span>${deliveryAccess.roleLabel}</span>
      </span>
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Lens</strong>
        <span>${deliveryAccess.posture}</span>
      </span>
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Access</strong>
        <span>${deliveryAccess.clearance}</span>
      </span>
      <span class="view-bar__meta">
        <strong class="view-bar__meta-label">Scope</strong>
        <span>${deliveryAccess.scopeLabel}</span>
      </span>
    `;
  }
}

function renderShell() {
  const screens = {
    landing: elements.landingView,
    institutionalization: elements.institutionalizationView,
    delivery: elements.deliveryView,
  };

  document.body.dataset.screen = state.screen;

  const titles = {
    landing: "Meridian AI Enterprise Cockpit",
    institutionalization: "Meridian AI Enterprise Cockpit - Institutionalisation View",
    delivery: "Meridian AI Enterprise Cockpit - Delivery Engine View",
  };

  document.title = titles[state.screen] || titles.landing;

  const hashes = {
    landing: "#landingView",
    institutionalization: "#institutionalizationView",
    delivery: "#deliveryView",
  };

  const currentHash = window.location.hash;
  const currentHashScreen = getScreenFromHash(currentHash, null);
  const targetHash = currentHash && currentHashScreen === state.screen
    ? currentHash
    : hashes[state.screen] || hashes.landing;

  if (window.location.hash !== targetHash) {
    window.history.replaceState(null, "", targetHash);
  }

  renderJumpReturnChip(targetHash);
}

function getJumpReturnConfig(hash = window.location.hash) {
  if (!hash || hash === "#landingView") {
    return null;
  }

  if (hash === "#institutionalizationView" || hash === "#institutionalizationAskPanel") {
    return null;
  }

  if (hash === "#deliveryView" || hash === "#deliveryAskPanel") {
    return null;
  }

  if (hash.startsWith("#institution-")) {
    return {
      href: "#institutionalizationAskPanel",
      label: "Back to guided questions",
      screen: "institutionalization",
    };
  }

  if (hash.startsWith("#delivery-")) {
    return {
      href: "#deliveryAskPanel",
      label: "Back to guided questions",
      screen: "delivery",
    };
  }

  return null;
}

function renderJumpReturnChip(hash = window.location.hash) {
  if (!elements.jumpReturnChip) {
    return;
  }

  const config = getJumpReturnConfig(hash);

  if (!config) {
    elements.jumpReturnChip.hidden = true;
    elements.jumpReturnChip.innerHTML = "";
    return;
  }

  elements.jumpReturnChip.hidden = false;
  elements.jumpReturnChip.innerHTML = `
    <a class="jump-return-chip jump-return-chip--${config.screen}" href="${config.href}">
      <span class="jump-return-chip__icon" aria-hidden="true">↑</span>
      <span class="jump-return-chip__copy">
        <span class="jump-return-chip__label">Ask the cockpit</span>
        <strong>${config.label}</strong>
      </span>
    </a>
  `;
}

function renderDeliverySegmentationBar() {
  elements.deliverySegmentationBar.innerHTML = `
    <div class="segment-toolbar-shell">
      <div class="segment-toolbar__meta">
        <p class="eyebrow">Global segmentation</p>
        <p>Region, function, use case, and model tier persist across both views.</p>
      </div>
      ${renderGlobalSegmentationBar()}
    </div>
  `;
}

function renderDeliveryQuickNav() {
  const items = [
    { id: "delivery-swimlanes", label: "Flow" },
    { id: "delivery-oversight", label: "Oversight" },
    { id: "delivery-adoption", label: "Adoption" },
    { id: "delivery-productivity", label: "Productivity" },
    { id: "delivery-economics", label: "Economics" },
    { id: "delivery-governance", label: "Governance" },
    { id: "delivery-actions", label: "Actions" },
    { id: "delivery-trust", label: "Trust" },
  ];

  const linksHtml = items
    .map(
      (item) => `
        <a class="delivery-quicknav__link" href="#${item.id}" aria-current="false">${item.label}</a>
      `,
    )
    .join("");

  elements.deliveryQuickNav.innerHTML = `
    <nav class="delivery-quicknav panel" aria-label="Delivery quick navigation">
      <div class="delivery-quicknav__head">
        <div>
          <p class="eyebrow">Quick Jump</p>
          <span class="delivery-quicknav__note">Move across the delivery evidence without losing the operating thread.</span>
        </div>
      </div>
      <div class="delivery-quicknav__links">
        ${linksHtml}
      </div>
    </nav>
  `;

  updateDeliveryQuickNavActive();
}

function getSavedViews(screen) {
  return savedViewRegistry[screen] || [];
}

function savedViewMatchesState(screen, preset) {
  const entries = Object.entries(preset.state || {});
  const stateMatches = entries.every(([key, value]) => state[key] === value);
  const askMatches = state.askFocus[screen] == null || !preset.askPrompt || state.askFocus[screen] === preset.askPrompt;

  return stateMatches && askMatches;
}

function getActiveSavedView(screen) {
  // As soon as filters, toggles, or the guided ask prompt drift from the preset,
  // we treat the page as a custom slice rather than claiming the preset is still active.
  return getSavedViews(screen).find((preset) => savedViewMatchesState(screen, preset)) ?? null;
}

function focusSavedViewAnchor(anchor) {
  if (!anchor) {
    window.scrollTo({ top: 0, behavior: topScrollBehavior() });
    return;
  }

  requestAnimationFrame(() => {
    const target = document.querySelector(anchor);

    if (!target) {
      window.scrollTo({ top: 0, behavior: topScrollBehavior() });
      return;
    }

    target.scrollIntoView({ block: "start", behavior: topScrollBehavior() });
  });
}

function applySavedView(screen, presetId) {
  const preset = getSavedViews(screen).find((item) => item.id === presetId);

  if (!preset) {
    return;
  }

  Object.entries(preset.state || {}).forEach(([key, value]) => {
    state[key] = value;
  });

  if (preset.askPrompt) {
    state.askFocus[screen] = preset.askPrompt;
  }

  state.metricFocus = null;
  state.evidenceFocus = null;
  state.screen = screen;
  render();
  focusSavedViewAnchor(preset.anchor);
}

function renderSavedViewsPanel(screen) {
  const container = screen === "institutionalization"
    ? document.querySelector("#institutionalizationSavedViewsPanel")
    : elements.deliverySavedViewsPanel;
  const presets = getSavedViews(screen);

  if (!container || !presets.length) {
    return;
  }

  const activePreset = getActiveSavedView(screen);
  const isDark = screen === "institutionalization";
  const panelTitle = screen === "institutionalization" ? "Saved board lenses" : "Saved lenses for this view";
  const activeMessage = activePreset
    ? `Active lens: ${activePreset.title}.`
    : "Adjusted from saved view. One or more filters, toggles, or guided prompts now differ from the preset.";

  container.innerHTML = `
    <section class="saved-view-panel panel ${isDark ? "saved-view-panel--dark" : ""}">
      <div class="saved-view-panel__head">
        <div>
          <p class="eyebrow ${isDark ? "eyebrow--dark" : ""}">Saved views</p>
          <h3>${panelTitle}</h3>
        </div>
        <p class="saved-view-panel__note">
          ${activeMessage}
        </p>
      </div>
      <div class="saved-view-grid">
        ${presets
          .map(
            (preset) => `
              <button
                class="saved-view-card ${savedViewMatchesState(screen, preset) ? "is-active" : ""}"
                type="button"
                data-saved-view-screen="${screen}"
                data-saved-view-id="${preset.id}"
                aria-pressed="${String(savedViewMatchesState(screen, preset))}"
              >
                <div class="saved-view-card__head">
                  <span class="saved-view-card__role">${preset.role}</span>
                  <span class="status-chip ${savedViewMatchesState(screen, preset) ? "status-chip--green" : ""}">
                    ${savedViewMatchesState(screen, preset) ? "Active" : "Use lens"}
                  </span>
                </div>
                <strong class="saved-view-card__title">${preset.title}</strong>
                <p class="saved-view-card__note">${preset.note}</p>
                <div class="saved-view-card__chips">
                  ${preset.chips.map((chip) => `<span>${chip}</span>`).join("")}
                </div>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderSavedViewPanels() {
  renderSavedViewsPanel("institutionalization");
  renderSavedViewsPanel("delivery");
}

function getPortfolioKpi(portfolio, label) {
  return portfolio?.kpis.find((item) => item.label === label) ?? null;
}

function getOversightKpi(profile, label) {
  return profile?.kpis.find((item) => item.label === label) ?? null;
}

function getMetricComparison(metric) {
  if (!metric) {
    return null;
  }

  return {
    baseline: metric.baseline,
    pilot: metric.pilot,
    target: metric.target,
    delta: metric.pilot - metric.baseline,
    deltaText: `${formatDelta(metric.pilot - metric.baseline, metric.format)} vs baseline`,
  };
}

function getAskScopeLabel(screen) {
  if (screen === "delivery") {
    const segments = [
      portfolios[state.team].label,
      state.workflow === "all" ? "All workflows" : workflowLabels[state.workflow],
      state.mode === "pilot" ? "Pilot assisted" : "Baseline reference",
      periodLabels[state.period],
    ];

    if (describeActiveSegments() !== "all regions, functions, use cases, and model tiers") {
      segments.push(describeActiveSegments());
    }

    return segments.join(" · ");
  }

  const segments = ["Enterprise slice", periodLabels[state.period]];

  if (describeActiveSegments() !== "all regions, functions, use cases, and model tiers") {
    segments.push(describeActiveSegments());
  }

  return segments.join(" · ");
}

function renderAskActions(actions = []) {
  if (!actions.length) {
    return "";
  }

  return `
    <div class="ask-answer__actions">
      ${actions
        .map((action) => {
          if (action.type === "metric") {
            return `
              <button class="detail-link" type="button" data-metric-id="${action.metricId}" aria-label="${action.label}">
                ${action.label}
              </button>
            `;
          }

          if (action.type === "evidence") {
            return `
              <button class="detail-link" type="button" data-evidence-id="${action.evidenceId}" aria-label="${action.label}">
                ${action.label}
              </button>
            `;
          }

          return `<a class="detail-link" href="${action.href}">${action.label}</a>`;
        })
        .join("")}
    </div>
  `;
}

function renderAskAnswer(screen, prompt, answer) {
  const isDark = screen === "institutionalization";

  return `
    <article class="ask-answer ask-answer--${answer.tone} ${isDark ? "ask-answer--dark" : ""}">
      <div class="ask-answer__head">
        <div>
          <p class="eyebrow ${isDark ? "eyebrow--dark" : ""}">Grounded answer</p>
          <h4>${prompt.label}</h4>
        </div>
        <button class="detail-link" type="button" data-ask-clear="${screen}" aria-label="Clear guided answer">
          Clear
        </button>
      </div>
      <p class="ask-answer__summary">${answer.summary}</p>
      <div class="ask-answer__meta">
        <span class="workitem-pill workitem-pill--accent">${answer.scope}</span>
        <span class="workitem-pill workitem-pill--${answer.tone}">${answer.assurance}</span>
      </div>
      <div class="ask-answer__support">
        ${answer.support
          .map(
            (item) => `
              <article class="ask-answer__support-item">
                <span class="ask-answer__support-label">${item.label}</span>
                <p>${item.text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
      ${renderAskActions(answer.actions)}
      <p class="ask-answer__grounding">${answer.grounding}</p>
    </article>
  `;
}

function buildInstitutionAskAnswer(promptId) {
  const enterpriseSlice = getFilteredInitiatives().sort((left, right) => right.realizedValue - left.realizedValue);
  const valueSnapshot = summarizeValueLedger(enterpriseSlice);
  const topInitiatives = enterpriseSlice.slice(0, 2);
  const topInitiative = topInitiatives[0];
  const governanceRisk = institutionalizationView.risks[0];
  const workforceGap = institutionalizationView.workforceValidation.stages[2];
  const debtItem = institutionalizationView.debtItems[0];
  const scope = getAskScopeLabel("institutionalization");

  if (!valueSnapshot) {
    return {
      tone: "watch",
      summary: "The current board slice is too narrow to support a grounded answer. Broaden one or more filters to reopen the enterprise story.",
      support: [
        {
          label: "Current scope",
          text: `${scope} currently has no matching initiatives in the shared Phase 1 ledger.`,
        },
      ],
      actions: [{ type: "anchor", href: "#institution-value", label: "Jump to Value section" }],
      assurance: "Needs broader slice",
      grounding: `This answer is constrained by the current enterprise filters and the initiative ledger shown in the cockpit.`,
      scope,
    };
  }

  switch (promptId) {
    case "scale-readiness":
      return {
        tone: "watch",
        summary:
          "Meridian can keep scaling AI, but it should do it conditionally rather than treating the current posture as fully institutionalized.",
        support: [
          {
            label: "Institutionalisation index",
            text: "AII is 67, above the scaling threshold of 55 but still short of the native 76+ posture shown in the board scorecard.",
          },
          {
            label: "Value proof",
            text: `${formatMoneyM(valueSnapshot.realized)} realized against ${formatMoneyM(valueSnapshot.forecast)} forecast across ${valueSnapshot.count} matching initiatives; ${Math.round(valueSnapshot.validatedShare)}% of realized value is already finance validated.`,
          },
          {
            label: "Control drag",
            text: "Governance coverage remains at 74% and safe-use validation sits at 39%, so controls and workforce readiness still lag the pace of value creation.",
          },
        ],
        actions: [
          { type: "metric", metricId: getMetricId("AII Score"), label: "Open AII metric card" },
          { type: "anchor", href: "#institution-priorities", label: "Jump to Board priorities" },
        ],
        assurance: "Board-framed",
        grounding:
          "Grounded in the institutionalisation scorecard, filtered initiative ledger, governance coverage, and workforce capability validation shown in this view.",
        scope,
      };
    case "blocking-scale":
      return {
        tone: "risk",
        summary:
          "The main blockers have shifted from proving technical feasibility to closing governance discipline, workforce validation, and prompt/control debt.",
        support: [
          {
            label: "Governance",
            text: `${governanceRisk.title}: ${governanceRisk.detail}`,
          },
          {
            label: "Workforce",
            text: `${workforceGap.title} is still the main scaling gap: ${workforceGap.detail}`,
          },
          {
            label: "Debt",
            text: `${debtItem.label} is still a drag at ${debtItem.value}: ${debtItem.detail}`,
          },
        ],
        actions: [
          { type: "anchor", href: "#institution-governance", label: "Jump to Governance" },
          { type: "anchor", href: "#institution-workforce", label: "Jump to Workforce" },
          { type: "anchor", href: "#institution-debt", label: "Jump to Debt" },
        ],
        assurance: "Constraint-led",
        grounding:
          "Grounded in the board risk list, workforce validation ladder, and debt heatmap summary already visible in the Institutionalisation view.",
        scope,
      };
    case "value-proof":
      return {
        tone: Math.round(valueSnapshot.validatedShare) >= 60 ? "good" : "watch",
        summary:
          "Value is already proven in live and scaling initiatives, but part of the upside is still trapped in stalled work and not all realized value has finance-grade backing yet.",
        support: [
          {
            label: "Portfolio evidence",
            text: `${valueSnapshot.liveCount} of ${valueSnapshot.count} matching initiatives are live or scaling, with weighted payback at ${formatMonths(valueSnapshot.paybackMonths)}.`,
          },
          {
            label: topInitiative?.name || "Top initiative",
            text: topInitiative
              ? `${formatMoneyM(topInitiative.realizedValue)} realized against ${formatMoneyM(topInitiative.forecastValue)} forecast in ${topInitiative.useCase.toLowerCase()} (${topInitiative.stage.toLowerCase()}).`
              : "No top initiative is available in the current slice.",
          },
          {
            label: "Value at risk",
            text: `${formatMoneyM(valueSnapshot.stalledRisk)} of forecast value still sits in stalled initiatives instead of governed scale execution.`,
          },
        ],
        actions: [
          topInitiative
            ? {
                type: "evidence",
                evidenceId: getInitiativeEvidenceId(topInitiative.id),
                label: `Open ${topInitiative.name} evidence pack`,
              }
            : { type: "anchor", href: "#institution-value", label: "Jump to Value section" },
          { type: "metric", metricId: getMetricId("Portfolio ROI"), label: "Open Portfolio ROI metric card" },
        ],
        assurance: "Finance-linked",
        grounding:
          "Grounded in the value realization ledger, finance validation coverage, and initiative evidence packs filtered by the active enterprise slice.",
        scope,
      };
    case "leadership-next":
    default:
      return {
        tone: "watch",
        summary:
          "Leadership should keep sponsorship high, but make broader scale conditional on stronger governance coverage, workforce validation, and finance-grade proof.",
        support: institutionalizationView.boardDecisions.slice(0, 3).map((item) => ({
          label: item.title,
          text: item.detail,
        })),
        actions: [
          { type: "anchor", href: "#institution-priorities", label: "Jump to Board priorities" },
          { type: "anchor", href: "#institution-bridge", label: "Jump to Delivery bridge" },
        ],
        assurance: "Decision-oriented",
        grounding:
          "Grounded in the Board Priorities chapter, the north-star board stance, and the delivery-to-board bridge already configured in this view.",
        scope,
      };
  }
}

function buildDeliveryAskAnswer(promptId) {
  const portfolio = portfolios[state.team];
  const oversightProfile = oversightProfiles[state.team];
  const deliverySlice = getFilteredInitiatives({ portfolioKey: state.team, workflow: state.workflow })
    .sort((left, right) => right.realizedValue - left.realizedValue);
  const valueSnapshot = summarizeValueLedger(deliverySlice);
  const productivitySummary = summarizeProductivityMethodology(
    getFilteredProductivityRecords({ portfolioKey: state.team, workflow: state.workflow }),
    state.team,
  );
  const promptSecuritySummary = summarizePromptSecurity(getFilteredPromptSecurityRecords({ portfolioKey: state.team }));
  const ragQualitySummary = summarizeRagQuality(getFilteredRagQualityRecords({ portfolioKey: state.team }));
  const hallucinationSummary = summarizeHallucinationMethodology(getFilteredHallucinationRecords({ portfolioKey: state.team }));
  const reliabilitySummary = summarizeReliability(getFilteredReliabilityRecords({ portfolioKey: state.team }));
  const priorityActions = getPrioritizedActions(actionWorkflowLibrary[state.team] || []);
  const topAction = priorityActions[0];
  const secondAction = priorityActions[1];
  const scope = getAskScopeLabel("delivery");

  if (!deliverySlice.length) {
    return {
      tone: "watch",
      summary: "The current delivery slice is too narrow to support a grounded operating answer. Broaden one or more filters to reopen the portfolio view.",
      support: [
        {
          label: "Current scope",
          text: `${scope} currently has no matching initiatives in the delivery ledger.`,
        },
      ],
      actions: [{ type: "anchor", href: "#delivery-swimlanes", label: "Jump to Workflow swimlanes" }],
      assurance: "Needs broader slice",
      grounding: "This answer is constrained by the current delivery filters and shared initiative ledger.",
      scope,
    };
  }

  const flowMetric = getMetricComparison(getPortfolioKpi(portfolio, "Delivery Flow Index"));
  const coverageMetric = getMetricComparison(getPortfolioKpi(portfolio, "AI Workflow Coverage"));
  const productivityMetric = getMetricComparison(getPortfolioKpi(portfolio, "Net Productivity Gain"));
  const straightThroughMetric = getMetricComparison(getOversightKpi(oversightProfile, "Straight-Through Rate"));
  const reviewQueueMetric = getMetricComparison(getOversightKpi(oversightProfile, "Human Review Queue"));
  const queuePressureMetric = oversightProfile.performance?.metrics.find((item) => item.label === "Oldest queue age");

  const trustSignals = [
    promptSecuritySummary
      ? {
          label: "Prompt security",
          tone: getPromptSecurityTone("openFindings", promptSecuritySummary.openFindings),
          text: `${formatValue(promptSecuritySummary.openFindings, "count")} open findings, ${formatValue(promptSecuritySummary.criticalFindings, "count")} critical, and ${formatValue(promptSecuritySummary.attackAttempts7d, "count")} attack attempts / 7d remain in the slice.`,
        }
      : null,
    ragQualitySummary
      ? {
          label: "Retrieval grounding",
          tone: getRagQualityTone("staleContent", ragQualitySummary.staleContentPct),
          text: `${formatValue(ragQualitySummary.citationRate, "percent")} citation rate with ${formatValue(ragQualitySummary.staleContentPct, "percent")} stale content still surfacing.`,
        }
      : null,
    reliabilitySummary
      ? {
          label: "Reliability",
          tone: getReliabilityTone("qualityImpact", reliabilitySummary.qualityImpactPct),
          text: `${formatValue(reliabilitySummary.degradedSharePct, "percent")} degraded-mode share with ${formatMilliseconds(reliabilitySummary.queueDelayMs)} queue delay under stress.`,
        }
      : null,
    hallucinationSummary
      ? {
          label: "Answer quality",
          tone: getHallucinationTone(hallucinationSummary.passRate),
          text: `${formatValue(hallucinationSummary.passRate, "percent")} grounded-answer pass rate with a 95% confidence band of ${formatPercentRange(hallucinationSummary.ciLow, hallucinationSummary.ciHigh)}.`,
        }
      : null,
  ]
    .filter(Boolean)
    .sort((left, right) => {
      const rank = { risk: 0, watch: 1, good: 2 };
      return rank[left.tone] - rank[right.tone];
    });

  switch (promptId) {
    case "what-changed":
      return {
        tone: "good",
        summary:
          "Compared with baseline, this slice has broader approved AI coverage, faster governed flow, and materially lower human-review pressure.",
        support: [
          {
            label: "Coverage",
            text: `AI workflow coverage moved to ${formatValue(coverageMetric.pilot, "percent")} (${coverageMetric.deltaText}).`,
          },
          {
            label: "Flow",
            text: `Delivery Flow Index now sits at ${formatValue(flowMetric.pilot, "index")} (${flowMetric.deltaText}).`,
          },
          {
            label: "Oversight",
            text: `Straight-through clearance is ${formatValue(straightThroughMetric.pilot, "percent")} while the human review queue is down to ${formatValue(reviewQueueMetric.pilot, "count")} items.`,
          },
          {
            label: "Productivity",
            text: productivitySummary
              ? `${formatPoints(productivitySummary.netGain)} modeled net gain is now spread across ${productivitySummary.trainCount} trains in this slice.`
              : `${formatValue(productivityMetric.pilot, "percent")} net productivity gain is now visible in the current slice.`,
          },
        ],
        actions: [
          { type: "anchor", href: "#delivery-oversight", label: "Jump to Oversight" },
          { type: "anchor", href: "#delivery-productivity", label: "Jump to Productivity method" },
        ],
        assurance: "Change vs baseline",
        grounding:
          "Grounded in the delivery KPI row, oversight KPIs, and productivity methodology records filtered by the active portfolio, workflow, and segment slice.",
        scope,
      };
    case "needs-attention":
      return {
        tone: topAction?.severity === "high" ? "risk" : "watch",
        summary:
          "The next attention point is not more dashboard reading; it is closing the highest-severity operating blockers already sitting in the Action Center.",
        support: [
          {
            label: topAction?.title || "Priority action",
            text: topAction
              ? `${topAction.nextStep} Due ${formatDateLabel(topAction.dueDate)} with expected impact of ${topAction.impact}.`
              : "No priority action is available in the current slice.",
          },
          {
            label: secondAction?.title || "Secondary action",
            text: secondAction
              ? `${secondAction.nextStep} Due ${formatDateLabel(secondAction.dueDate)} with expected impact of ${secondAction.impact}.`
              : "No second action is available in the current slice.",
          },
          {
            label: "Queue pressure",
            text: queuePressureMetric
              ? `Oldest queue age is currently ${formatValue(state.mode === "pilot" ? queuePressureMetric.pilot : queuePressureMetric.baseline, queuePressureMetric.format)}, which is still above the ${formatValue(queuePressureMetric.target, queuePressureMetric.format)} target.`
              : "Oversight queue pressure is not available in the current slice.",
          },
        ],
        actions: [
          { type: "anchor", href: "#delivery-actions", label: "Jump to Action Center" },
          topAction
            ? {
                type: "evidence",
                evidenceId: getActionEvidenceId(state.team, topAction.id),
                label: `Open evidence for ${topAction.title}`,
              }
            : { type: "anchor", href: "#delivery-roadmap", label: "Jump to Roadmap" },
        ],
        assurance: "Action-linked",
        grounding:
          "Grounded in the prioritized Action Center workflow, oversight diagnostics, and due-date / impact metadata already shown in Delivery.",
        scope,
      };
    case "why-risky":
      return {
        tone: trustSignals[0]?.tone || "watch",
        summary:
          trustSignals[0]?.tone === "risk"
            ? `${trustSignals[0].label} is the main reason this slice still reads as risky, with adjacent trust signals still needing cleanup before scale can feel boring.`
            : "This slice is more watchpoint than failure case: flow is improving, but a small number of trust signals still need cleanup to make scale durable.",
        support: [
          ...(trustSignals.slice(0, 3).map((item) => ({
            label: item.label,
            text: item.text,
          })) || []),
          {
            label: "Value at risk",
            text: valueSnapshot
              ? `${formatMoneyM(valueSnapshot.stalledRisk)} of forecast value still sits in stalled delivery work rather than repeatable scale execution.`
              : "No delivery value exposure is visible in the current slice.",
          },
        ],
        actions: [
          { type: "anchor", href: "#delivery-trust", label: "Jump to Trust layer" },
          { type: "anchor", href: "#delivery-oversight", label: "Jump to Oversight" },
        ],
        assurance: "Trust-led",
        grounding:
          "Grounded in prompt-security coverage, retrieval-quality telemetry, hallucination methodology, reliability signals, and the current delivery value slice.",
        scope,
      };
    case "leadership-next":
    default:
      return {
        tone: "watch",
        summary:
          "Leadership should keep pushing adoption and flow, but the next decisions should stay anchored to the named actions, not broad calls for more experimentation.",
        support: priorityActions.slice(0, 3).map((action) => ({
          label: action.title,
          text: `${action.owner} owns this next step. Due ${formatDateLabel(action.dueDate)} · ${action.impact}.`,
        })),
        actions: [
          { type: "anchor", href: "#delivery-actions", label: "Jump to Action Center" },
          { type: "anchor", href: "#delivery-roadmap", label: "Jump to Roadmap" },
        ],
        assurance: "Leadership-oriented",
        grounding:
          "Grounded in the active delivery action workflow, current due dates, and the 30/60/90 milestone plan already visible in this view.",
        scope,
      };
  }
}

function renderAskPanel(screen) {
  const container = screen === "institutionalization"
    ? document.querySelector("#institutionalizationAskPanel")
    : elements.deliveryAskPanel;
  const prompts = askPromptRegistry[screen] || [];

  if (!container || !prompts.length) {
    return;
  }

  const activePrompt = prompts.find((item) => item.id === state.askFocus[screen]) ?? null;
  const answer = activePrompt
    ? screen === "institutionalization"
      ? buildInstitutionAskAnswer(activePrompt.id)
      : buildDeliveryAskAnswer(activePrompt.id)
    : null;
  const headingId = screen === "institutionalization" ? "institutionAskHeading" : "deliveryAskHeading";
  const isDark = screen === "institutionalization";
  const panelTitle = screen === "institutionalization" ? "Board questions from the current slice" : "Grounded questions for this view";
  const promptButtonsHtml = prompts
    .map(
      (prompt) => `
        <button
          class="ask-layer__prompt ${state.askFocus[screen] === prompt.id ? "is-active" : ""}"
          type="button"
          data-ask-screen="${screen}"
          data-ask-prompt="${prompt.id}"
          aria-pressed="${String(state.askFocus[screen] === prompt.id)}"
        >
          ${prompt.label}
        </button>
      `,
    )
    .join("");

  container.innerHTML = `
    <section class="ask-layer panel ${isDark ? "ask-layer--dark" : ""}" aria-labelledby="${headingId}">
      <div class="ask-layer__head">
        <div>
          <p class="eyebrow ${isDark ? "eyebrow--dark" : ""}">Ask the cockpit</p>
          <h3 id="${headingId}">${panelTitle}</h3>
        </div>
        <p class="ask-layer__note">
          ${screen === "institutionalization"
            ? "Board questions stay tied to the current slice, scorecard, and evidence already on this page."
            : "Delivery questions stay tied to the active portfolio, workflow, and evidence already on this page."}
        </p>
      </div>
      <div class="ask-layer__toolbar">
        <div class="ask-layer__prompts" role="list">
          ${promptButtonsHtml}
        </div>
        <span class="ask-layer__hint">For metric definitions, use the <code>i</code> buttons.</span>
      </div>
      ${answer ? renderAskAnswer(screen, activePrompt, answer) : `
        <div class="empty-state-card">
          <strong>Choose a guided question.</strong>
          <p>The answer will stay constrained to the current slice and point back to the same metrics, actions, and evidence already visible here.</p>
        </div>
      `}
    </section>
  `;
}

function renderAskPanels() {
  renderAskPanel("institutionalization");
  renderAskPanel("delivery");
}

function renderInstitutionalization() {
  const data = institutionalizationView;
  const enterpriseSlice = getFilteredInitiatives().sort((left, right) => right.realizedValue - left.realizedValue);
  const enterpriseValueSnapshot = summarizeValueLedger(enterpriseSlice);
  const institutionFilterBarHtml = renderGlobalSegmentationBar({ dark: true, includePeriod: true });
  const valueSegmentNote = enterpriseValueSnapshot
    ? `${enterpriseValueSnapshot.count} initiatives match ${describeActiveSegments()}. ${enterpriseValueSnapshot.liveCount} are live or scaling and ${Math.round(enterpriseValueSnapshot.validatedShare)}% of realized value is already finance validated.`
    : `No initiatives match ${describeActiveSegments()}.`;
  const valueSupportCards = enterpriseValueSnapshot
    ? [
        {
          id: "matching-initiatives",
          label: "Matching initiatives",
          value: `${enterpriseValueSnapshot.count}`,
          note: `${enterpriseValueSnapshot.liveCount} are still live or scaling in the current slice.`,
          className: "finance-card--support",
        },
        {
          id: "live-or-scaling",
          label: "Live or scaling",
          value: `${enterpriseValueSnapshot.liveCount}`,
          note: "Production and scaling initiatives in the current slice.",
          className: "finance-card--support",
        },
        {
          id: "in-full-production",
          label: "In full production",
          value: `${enterpriseValueSnapshot.productionCount}`,
          note: "Initiatives already operating at full production today.",
          className: "finance-card--support",
        },
        {
          id: "stalled-value-at-risk",
          label: "Stalled value at risk",
          value: formatMoneyM(enterpriseValueSnapshot.stalledRisk),
          note: "Forecast value currently trapped in stalled initiatives.",
          className: "finance-card--support",
        },
        {
          id: "future-slot-1",
          label: "Future slot 1",
          value: "TBD",
          note: "Reserved for a future board-ready value signal.",
          className: "finance-card--placeholder",
        },
        {
          id: "future-slot-2",
          label: "Future slot 2",
          value: "TBD",
          note: "Reserved for a future board-ready operating signal.",
          className: "finance-card--placeholder",
        },
      ]
    : "";
  const valueSummaryCardsHtml = renderValueSummaryCards(enterpriseValueSnapshot, { extraCards: valueSupportCards || [] });
  const valueMixHtml = renderBenefitMix(enterpriseValueSnapshot);
  const selectedValueInitiative = getSelectedValueInitiative(enterpriseSlice);
  const initiativeSummaryHtml = renderValueInitiativeSummary(selectedValueInitiative);
  const initiativeSelectorHtml = renderValueInitiativePicker(enterpriseSlice, selectedValueInitiative?.id);
  const northStarSpotlightValue = enterpriseValueSnapshot
    ? `${formatRatio(enterpriseValueSnapshot.roi)} ROI`
    : data.northStarSpotlight.value;
  const northStarSpotlightDetail = enterpriseValueSnapshot
    ? `${formatMoneyM(enterpriseValueSnapshot.realized)} realized value against ${formatMoneyM(enterpriseValueSnapshot.forecast)} forecast across ${enterpriseValueSnapshot.count} matching initiatives.`
    : data.northStarSpotlight.detail;
  const northStarSpotlightNote = enterpriseValueSnapshot
    ? `${Math.round(enterpriseValueSnapshot.validatedShare)}% of realized value is finance validated and weighted payback sits at ${formatMonths(enterpriseValueSnapshot.paybackMonths)}.`
    : data.northStarSpotlight.note;
  const subscoreDefinitions = {
    Strategy:
      "Strategy sub-score: measures whether Meridian has a clear enterprise AI direction, named sponsorship, and portfolio choices aligned to board priorities.",
    Ops:
      "Ops sub-score: measures whether delivery flow, operational controls, and run-state evidence are strong enough to support governed scale.",
    People:
      "People sub-score: measures workforce readiness, leadership decision rights, and the institutional capability required to operate AI at scale.",
  };

  const subscoresHtml = data.subscores
    .map(
      (item) => `
        <article class="institution-header__subscore">
          <div class="institution-header__subscore-head">
            <span>${item.label}</span>
            ${metricInfoButton(null, `${item.label} sub-score`, "dark", subscoreDefinitions[item.label] || "")}
          </div>
          <strong>${item.value}</strong>
        </article>
      `,
    )
    .join("");

  const northStarScoreMetric = data.northStar.find((metric) => metric.label === "AII Score");
  const northStarScoreValue = Number.parseInt(northStarScoreMetric?.value ?? "67", 10);

  const headlineSignalsHtml = data.headlineSignals
    .map(
      (item) => `
        <span class="signal-pill signal-pill--${item.tone}">${item.label}</span>
      `,
    )
    .join("");

  const boardReadoutHtml = data.boardReadout.takeaways
    .map(
      (item) => `
        <article class="signal-item signal-item--${item.tone}">
          <span class="signal-item__label">${item.label}</span>
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const northStarSupportingHtml = data.northStar
    .filter((metric) => !["Portfolio ROI", "AII Score"].includes(metric.label))
    .map(
      (metric) => `
        <article class="institution-kpi-card">
          ${metricLabelRow(metric.label, "institution-kpi-card__label", "dark")}
          <div class="institution-kpi-card__value">${metric.value}</div>
          <div class="metric-meta">
            <span class="delta-chip delta-chip--${metric.tone}">${metric.delta}</span>
          </div>
        </article>
      `,
    )
    .join("");

  const northStarTensionsHtml = data.northStarTensions
    .map(
      (item) => `
        <article class="strip-insight strip-insight--${item.tone}">
          <span class="strip-insight__label">${item.label}</span>
          <strong>${item.title}</strong>
        </article>
      `,
    )
    .join("");

  const dimensionsHtml = data.dimensions
    .map(
      (dimension) => `
        <div class="dimension-row">
          <strong class="dimension-row__name">${dimension.name}</strong>
          <div class="dimension-row__bars" aria-hidden="true">
            <div class="metric-bar">
              <span class="metric-bar__fill metric-bar__fill--secondary" style="width: ${dimension.sector}%"></span>
            </div>
            <div class="metric-bar">
              <span class="metric-bar__fill metric-bar__fill--primary" style="width: ${dimension.meridian}%"></span>
            </div>
          </div>
          <div class="dimension-row__meta">${dimension.meridian} vs ${dimension.sector}</div>
        </div>
      `,
    )
    .join("");

  const signalsHtml = data.signals
    .map(
      (signal) => `
        <article class="signal-item signal-item--${signal.tone}">
          <span class="signal-item__label">${signal.label}</span>
          <strong>${signal.title}</strong>
          <p>${signal.detail}</p>
        </article>
      `,
    )
    .join("");

  const bridgeHtml = data.bridge
    .map((item) => renderBridgeCard(item))
    .join("");

  const workforceBaseline = data.workforce.find((item) => item.label === "Foundations learning");
  const workforceBaselineHtml = workforceBaseline
    ? `
      <article class="workforce-baseline-strip">
        <div class="workforce-baseline-strip__content">
          <span class="workforce-baseline-strip__eyebrow">Baseline readiness</span>
          <strong class="workforce-baseline-strip__title">${workforceBaseline.label}</strong>
          <p>${workforceBaseline.detail}</p>
          <span class="summary-row--flip__progress-block workforce-baseline-strip__progress-block">
            <span class="summary-row--flip__progress-label">Foundations coverage</span>
            <span class="summary-row--flip__progress" aria-hidden="true">
              <span class="summary-row--flip__progress-fill" style="width: ${Number.parseFloat(workforceBaseline.value) || 0}%"></span>
            </span>
          </span>
          <span class="workforce-baseline-strip__note">Large candidate bench established, but advanced validation still lags.</span>
        </div>
        <b class="workforce-baseline-strip__value">${workforceBaseline.value}</b>
      </article>
    `
    : "";

  const workforceTopMetricsHtml = data.workforce
    .filter((item) => item.label !== "Foundations learning")
    .map((item) => renderWorkforceTopMetric(item))
    .join("");

  const workforceValidationMetricsHtml = data.workforceValidation.metrics
    .map(
      (item) => renderWorkforceProofCard(item),
    )
    .join("");

  const workforceValidationStagesHtml = data.workforceValidation.stages
    .map(
      (item) => `
        <article class="workforce-validation-step">
          <div class="workforce-validation-step__head">
            <strong>${item.title}</strong>
            <span>${item.status}</span>
          </div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const workforceHeatmapHeadHtml = data.workforceHeatmap.columns
    .map((label) => `<span>${label}</span>`)
    .join("");

  const workforceHeatmapHtml = data.workforceHeatmap.cohorts
    .map(
      (cohort) => `
        <div class="heatmap-table__row">
          <div class="heatmap-table__label">
            <strong>${cohort.label}</strong>
            <span>${cohort.detail}</span>
          </div>
          ${cohort.scores
            .map(
              (score) => `
                <div class="heat-cell heat-cell--${getHeatTone(score)}">
                  <strong>${score}</strong>
                </div>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");

  const governanceMetricsHtml = data.governanceMetrics
    .map(
      (item) => `
        <article class="mini-stat">
          <span class="mini-stat__label">${item.label}</span>
          <div class="mini-stat__value">${item.value}</div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const risksHtml = data.risks
    .map(
      (risk) => `
        <article class="risk-item">
          <strong>${risk.title}</strong>
          <p>${risk.detail}</p>
          <p><strong>Owner:</strong> ${risk.owner}</p>
        </article>
      `,
    )
    .join("");

  const debtHtml = data.debtItems
    .map(
      (item) => `
        <div class="summary-row--inline">
          <div>
            <strong>${item.label}</strong>
            <span>${item.detail}</span>
          </div>
          <b>${item.value}</b>
        </div>
      `,
    )
    .join("");

  const debtHeatmapHeadHtml = data.debtHeatmap.columns
    .map((label) => `<span>${label}</span>`)
    .join("");

  const debtHeatmapHtml = data.debtHeatmap.rows
    .map(
      (row) => `
        <div class="debt-matrix__row">
          <div class="debt-matrix__label">
            <strong>${row.label}</strong>
            <span>${row.detail}</span>
          </div>
          ${row.levels
            .map(
              (level) => `
                <div class="debt-chip debt-chip--${getDebtTone(level)}">${level}</div>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");

  const pillarsHtml = data.raiPillars
    .map(
      (pillar) => `
        <article class="pillar-card">
          <span>${pillar.label}</span>
          <strong>${pillar.value}</strong>
        </article>
      `,
    )
    .join("");

  const regulatoryHtml = data.regulatory
    .map(
      (item) => `
        <div class="summary-row--inline">
          <div>
            <strong>${item.label}</strong>
            <span>${item.detail}</span>
          </div>
          <b>${item.value}</b>
        </div>
      `,
    )
    .join("");

  const nextQuarterTargetsHtml = data.nextQuarterTargets
    .map(
      (item) => `
        <article class="target-card">
          <div class="target-card__head">
            <strong>${item.title}</strong>
            <span class="target-card__goal">${item.target}</span>
          </div>
          <p>${item.detail}</p>
          <div class="target-card__meta">
            <span><b>Current</b>${item.current}</span>
            <span><b>Owner</b>${item.owner}</span>
            <span><b>Target</b>${item.target}</span>
          </div>
        </article>
      `,
    )
    .join("");

  const benchmarkBarsHtml = data.benchmarkBars
    .map((item) => {
      const delta = item.meridian - item.sector;
      const tone = delta >= 0 ? "good" : "risk";
      const deltaLabel = `${delta >= 0 ? "+" : ""}${delta} vs sector`;

      return `
        <article class="benchmark-bar-card">
          <div class="benchmark-bar-card__head">
            <strong>${item.label}</strong>
            <span class="delta-chip delta-chip--${tone}">${deltaLabel}</span>
          </div>
          <div class="benchmark-bar-card__row">
            <span>Meridian</span>
            <div class="metric-bar" aria-hidden="true">
              <span class="metric-bar__fill metric-bar__fill--primary" style="width: ${item.meridian}%"></span>
            </div>
            <b>${item.meridian}</b>
          </div>
          <div class="benchmark-bar-card__row">
            <span>Sector</span>
            <div class="metric-bar" aria-hidden="true">
              <span class="metric-bar__fill metric-bar__fill--secondary" style="width: ${item.sector}%"></span>
            </div>
            <b>${item.sector}</b>
          </div>
        </article>
      `;
    })
    .join("");

  const benchmarkDeltas = data.benchmarkBars
    .map((item) => ({
      ...item,
      delta: item.meridian - item.sector,
      tone: item.meridian - item.sector >= 0 ? "good" : item.meridian - item.sector <= -5 ? "risk" : "watch",
    }));

  const benchmarkLeadBulletsHtml = benchmarkDeltas
    .filter((item) => item.delta > 0)
    .sort((left, right) => right.delta - left.delta)
    .slice(0, 4)
    .map(
      (item) => `
        <li class="benchmark-bullet">
          <div class="benchmark-bullet__head">
            <strong>${item.label}</strong>
            <span class="delta-chip delta-chip--${item.tone}">+${item.delta}</span>
          </div>
          <span class="benchmark-bullet__detail">Meridian ${item.meridian} vs sector ${item.sector}.</span>
        </li>
      `,
    )
    .join("");

  const benchmarkGapBulletsHtml = benchmarkDeltas
    .filter((item) => item.delta < 0)
    .sort((left, right) => left.delta - right.delta)
    .slice(0, 3)
    .map(
      (item) => `
        <li class="benchmark-bullet">
          <div class="benchmark-bullet__head">
            <strong>${item.label}</strong>
            <span class="delta-chip delta-chip--${item.tone}">${item.delta}</span>
          </div>
          <span class="benchmark-bullet__detail">Meridian ${item.meridian} vs sector ${item.sector}.</span>
        </li>
      `,
    )
    .join("");

  const benchmarkDriversHtml = data.benchmarkProvenance.drivers
    .map(
      (item) => `
        <article class="benchmark-driver">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const northStarCompactFacts = enterpriseValueSnapshot
    ? [
        {
          label: "Matching initiatives",
          value: `${enterpriseValueSnapshot.count}`,
        },
        {
          label: "Finance validated",
          value: `${Math.round(enterpriseValueSnapshot.validatedShare)}%`,
        },
        {
          label: "Weighted payback",
          value: formatMonths(enterpriseValueSnapshot.paybackMonths),
        },
      ]
        .map(
          (item) => `
            <article class="north-star-spotlight__fact">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
            </article>
          `,
        )
        .join("")
    : "";

  const institutionSectionNav = [
    { id: "institution-board-readout", number: "01", label: "Board" },
    { id: "institution-index", number: "02", label: "Index" },
    { id: "institution-bridge", number: "03", label: "Bridge" },
    { id: "institution-value", number: "04", label: "Value" },
    { id: "institution-workforce", number: "05", label: "Workforce" },
    { id: "institution-governance", number: "06", label: "Governance" },
    { id: "institution-debt", number: "07", label: "Debt" },
    { id: "institution-trust", number: "08", label: "Trust" },
    { id: "institution-benchmarking", number: "09", label: "Benchmarks" },
    { id: "institution-priorities", number: "10", label: "Priorities" },
  ];

  const institutionSubnavHtml = institutionSectionNav
    .map(
      (item) => `
        <a class="institution-subnav__link" href="#${item.id}" aria-current="false">
          <span>${item.number}</span>
          <strong>${item.label}</strong>
        </a>
      `,
    )
    .join("");

  const boardDecisionsHtml = data.boardDecisions
    .map(
      (item) => `
        <article class="decision-card">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  elements.institutionalizationContent.innerHTML = `
    <section class="institution-strip" aria-label="Board north-star strip">
      <div class="institution-strip__stage">
        <div class="institution-strip__copy">
          <div class="institution-strip__head">
            <div>
              <p class="eyebrow eyebrow--dark">Board posture</p>
              <h2>Governed scale readiness</h2>
            </div>
          </div>
          <p class="institution-strip__context">
            <strong>Current slice</strong>
            <span>${periodLabels[state.period]} · ${describeActiveSegments()}</span>
          </p>
          <p class="institution-strip__summary">${data.northStarStory.summary}</p>
          <div class="institution-strip__stance">
            <span class="institution-strip__stance-label">${data.northStarStory.stanceLabel}</span>
            <strong>${data.northStarStory.stance}</strong>
            <p>${data.northStarStory.stanceDetail}</p>
          </div>
          <div class="institution-strip__insights">${northStarTensionsHtml}</div>
        </div>

        <div class="north-star-rail">
          <aside class="north-star-scorecard institution-header__scorecard" aria-label="Institutionalisation scorecard">
            ${metricLabelRow("AII Score", "institution-header__score-label", "dark")}
            <strong class="institution-header__score-value">${northStarScoreValue}</strong>
            <p class="institution-header__score-note">${northStarScoreMetric?.delta || "Out of 100 · +4 pts this quarter"}</p>
            <div class="institution-header__meter" aria-hidden="true">
              <span class="institution-header__meter-fill" style="width: ${northStarScoreValue}%"></span>
            </div>
            <div class="institution-header__meter-scale">
              <span>0</span>
              <span>Scaling 55</span>
              <span>Native 76+</span>
            </div>
            <div class="institution-header__subscores">${subscoresHtml}</div>
          </aside>
          <aside class="north-star-spotlight">
            <div class="metric-label-row metric-label-row--dark">
              <span class="north-star-spotlight__label">${data.northStarSpotlight.label}</span>
              ${metricInfoButton(getMetricId("Portfolio ROI"), "Portfolio ROI", "dark")}
            </div>
            <strong class="north-star-spotlight__value">${northStarSpotlightValue}</strong>
            <p class="north-star-spotlight__detail">${northStarSpotlightDetail}</p>
            <div class="north-star-spotlight__facts">${northStarCompactFacts}</div>
            <div class="institution-strip__signals">${headlineSignalsHtml}</div>
            <p class="north-star-spotlight__note">${northStarSpotlightNote}</p>
          </aside>
        </div>
        <div class="north-star-rail__support">
          <div class="institution-kpi-grid">${northStarSupportingHtml}</div>
        </div>
      </div>
    </section>

    <section id="institution-board-readout" class="panel board-readout institution-section institution-section--board">
      <div class="section-head">
        <div class="section-head__cluster">
          <span class="section-index">01</span>
          <div>
            <p class="eyebrow">Board Readout</p>
            <h2>What the board should take away this quarter</h2>
          </div>
        </div>
        <p class="section-head__note">
          Meridian now has enough evidence to scale AI more deliberately, but
          the limiting factor is shifting from technical feasibility to
          enterprise discipline.
        </p>
      </div>
      <div class="institution-panel__body">
        <p class="board-readout__lead">${data.boardReadout.lead}</p>
        <div class="board-readout__grid">${boardReadoutHtml}</div>
      </div>
    </section>

    <nav class="institution-subnav panel" aria-label="Institutionalisation chapters">
      <div class="institution-subnav__head">
        <div>
          <p class="eyebrow">Chapter navigation</p>
          <span class="institution-subnav__note">Use this chapter bar after the opening board snapshot.</span>
        </div>
      </div>
      <div class="institution-subnav__links">
        ${institutionSubnavHtml}
      </div>
    </nav>

    <section class="panel institution-toolrail" aria-labelledby="institutionToolsHeading">
      <div class="institution-toolrail__head">
        <div>
          <p class="eyebrow">Board tools</p>
          <h2 id="institutionToolsHeading">Filters, saved lenses, and guided board questions</h2>
        </div>
        <p class="institution-toolrail__note">
          Use these controls after the opening snapshot to re-scope the board view or ask grounded follow-up questions.
        </p>
      </div>
      <div class="institution-toolrail__filters">
        <div class="segment-toolbar__meta">
          <p class="eyebrow">Global segmentation</p>
          <p>These filters persist into Delivery and reshape the board evidence below.</p>
        </div>
        ${institutionFilterBarHtml}
      </div>
      <div class="institution-toolrail__stack view-support-stack view-support-stack--dark">
        <div id="institutionalizationSavedViewsPanel"></div>
        <div id="institutionalizationAskPanel"></div>
      </div>
    </section>

    <section id="institution-index" class="panel institution-section institution-section--index">
      <div class="section-head">
        <div class="section-head__cluster">
          <span class="section-index">02</span>
          <div>
            <p class="eyebrow">Institutionalisation Index</p>
            <h2>How far Meridian has moved from experimentation to managed scale</h2>
          </div>
        </div>
        <p class="section-head__note">
          Meridian is ahead on enterprise technology posture and operational AI,
          but governance discipline, workforce readiness, and management-system
          maturity are still constraining scale.
        </p>
      </div>
      <div class="institution-panel__body institution-dimension-grid">
        <div class="dimension-list">${dimensionsHtml}</div>
        <div class="signal-list">${signalsHtml}</div>
      </div>
    </section>

    <section id="institution-bridge" class="panel institution-section institution-section--bridge">
      <div class="section-head">
        <div class="section-head__cluster">
          <span class="section-index">03</span>
          <div>
            <p class="eyebrow">Bridge</p>
            <h2>Why the CIO delivery lens now matters to the board</h2>
          </div>
        </div>
        <p class="section-head__note">
          These six numbers reconcile the board narrative with the delivery
          engine. They show that Meridian's AI story is now grounded in
          operating signal, not just ambition.
        </p>
      </div>
      <div class="institution-panel__body bridge-strip">${bridgeHtml}</div>
    </section>

    <div class="institution-layout">
      <div class="institution-column institution-column--primary">
        <section id="institution-value" class="panel institution-section institution-section--value">
          <div class="section-head">
            <div class="section-head__cluster">
              <span class="section-index">04</span>
              <div>
                <p class="eyebrow">Portfolio</p>
                <h2>Value realisation and exposure</h2>
              </div>
            </div>
            <p class="section-head__note">
              Meridian now needs value evidence that finance can defend. This
              section separates forecast from realized value, shows how much is
              finance validated, and narrows the story to the current slice.
            </p>
          </div>
          <div class="institution-panel__body">
            <div class="value-story-card">
              <span class="value-story-card__label">Finance-grade value lens</span>
              <p>${valueSegmentNote}</p>
              ${valueMixHtml}
            </div>
            <div class="value-layout">
              <div class="value-layout__overview">
                ${valueSummaryCardsHtml}
              </div>
              <div class="value-layout__selector">
                ${initiativeSelectorHtml}
              </div>
              <div class="value-layout__summary">
                ${initiativeSummaryHtml}
              </div>
            </div>
          </div>
        </section>

        <section id="institution-workforce" class="panel institution-section institution-section--workforce">
          <div class="section-head">
            <div class="section-head__cluster">
              <span class="section-index">05</span>
              <div>
                <p class="eyebrow">Workforce</p>
                <h2>Validated capability, safe use, and leadership readiness</h2>
              </div>
            </div>
            <p class="section-head__note">
              Meridian has broad training momentum, but validated safe-use
              capability and decision-rights readiness still lag the pace of
              deployment.
            </p>
          </div>
          <div class="institution-panel__body summary-stack">
            <div class="workforce-validation-callout">
              <strong>Validation rule</strong>
              <p>${data.workforceValidation.lead}</p>
              <div class="workforce-validation-callout__meta">
                ${data.workforceValidation.evidenceBasis.map((item) => `<span>${item}</span>`).join("")}
              </div>
            </div>
            ${workforceBaselineHtml}
            <div class="workforce-top-grid">${workforceTopMetricsHtml}</div>
            <div class="workforce-proof-grid">${workforceValidationMetricsHtml}</div>
            <div class="workforce-validation-grid">${workforceValidationStagesHtml}</div>
            <details class="deep-dive">
              <summary>
                <span class="deep-dive__eyebrow">Deferred from Toggle Strategic</span>
                <span class="deep-dive__title">Open capability validation heatmap</span>
                <span class="deep-dive__hint">Role-by-role training, certification, safe-use, and decision-rights pattern</span>
              </summary>
              <div class="deep-dive__body">
                <div class="heatmap-table">
                  <div class="heatmap-table__row heatmap-table__row--head">
                    <span class="heatmap-table__corner">Audience</span>
                    ${workforceHeatmapHeadHtml}
                  </div>
                  ${workforceHeatmapHtml}
                </div>
              </div>
            </details>
          </div>
        </section>
      </div>

      <div class="institution-column institution-column--secondary">
        <section id="institution-governance" class="panel institution-section institution-section--governance">
          <div class="section-head">
            <div class="section-head__cluster">
              <span class="section-index">06</span>
              <div>
                <p class="eyebrow">Governance</p>
                <h2>Governance readiness and enterprise exposure</h2>
              </div>
            </div>
            <p class="section-head__note">
              The core question is no longer whether Meridian can deploy AI; it
              is whether Meridian can govern it consistently at enterprise scale.
            </p>
          </div>
          <div class="institution-panel__body">
            <div class="institution-stat-grid">${governanceMetricsHtml}</div>
            <div class="risk-list">${risksHtml}</div>
          </div>
        </section>

        <section id="institution-debt" class="panel institution-section institution-section--debt">
          <div class="section-head">
            <div class="section-head__cluster">
              <span class="section-index">07</span>
              <div>
                <p class="eyebrow">Tech Debt</p>
                <h2>Structural debt holding back scale</h2>
              </div>
            </div>
            <p class="section-head__note">
              The most material drag is no longer raw platform capability. It is
              the prompt, control, and organizational debt that makes safe scale
              harder than isolated success.
            </p>
          </div>
          <div class="institution-panel__body summary-stack">
            ${debtHtml}
            <details class="deep-dive">
              <summary>
                <span class="deep-dive__eyebrow">Deferred from Toggle Strategic</span>
                <span class="deep-dive__title">Open initiative debt heatmap</span>
                <span class="deep-dive__hint">See where prompt and operating-model drag concentrates</span>
              </summary>
              <div class="deep-dive__body">
                <div class="debt-matrix">
                  <div class="debt-matrix__row debt-matrix__row--head">
                    <span class="debt-matrix__corner">Initiative</span>
                    ${debtHeatmapHeadHtml}
                  </div>
                  ${debtHeatmapHtml}
                </div>
              </div>
            </details>
          </div>
        </section>
      </div>

      <section id="institution-trust" class="panel institution-panel--full institution-section institution-section--trust">
        <div class="section-head">
          <div class="section-head__cluster">
            <span class="section-index">08</span>
            <div>
              <p class="eyebrow">Responsible AI</p>
              <h2>Trust, control, and regulatory readiness</h2>
            </div>
          </div>
          <p class="section-head__note">
            Responsible AI is improving, but the management-system maturity
            behind it is not yet strong enough to claim full enterprise
            institutionalization.
          </p>
        </div>
        <div class="institution-panel__body institution-benchmark-grid">
          <div>
            <div class="pillars-grid">${pillarsHtml}</div>
          </div>
          <div class="summary-stack">${regulatoryHtml}</div>
        </div>
        <details class="deep-dive deep-dive--wide">
          <summary>
            <span class="deep-dive__eyebrow">Deferred from Toggle Strategic</span>
            <span class="deep-dive__title">Open next-quarter targets</span>
            <span class="deep-dive__hint">Board-facing target block for controls, readiness, and trust</span>
          </summary>
          <div class="deep-dive__body">
            <div class="target-grid">${nextQuarterTargetsHtml}</div>
          </div>
        </details>
      </section>

      <section id="institution-benchmarking" class="panel institution-panel--full institution-section institution-section--benchmarking">
        <div class="section-head">
          <div class="section-head__cluster">
            <span class="section-index">09</span>
            <div>
              <p class="eyebrow">Benchmarking</p>
              <h2>Competitive position and board priorities</h2>
            </div>
          </div>
        </div>
        <div class="institution-panel__body summary-stack">
          <div class="institution-benchmark-grid">
            <div class="benchmark-story-grid">
              <article class="benchmark-card benchmark-insight-card benchmark-insight-card--good">
                <div class="benchmark-insight-card__head">
                  <strong>Where Meridian leads</strong>
                  <span class="delta-chip delta-chip--good">Scale signals</span>
                </div>
                <p class="benchmark-insight-card__summary">
                  Meridian is ahead of the peer set in the operating-model dimensions that most clearly support enterprise scale.
                </p>
                <ul class="benchmark-bullet-list">${benchmarkLeadBulletsHtml}</ul>
                <p class="benchmark-insight-card__note">
                  Board implication: scale where service evidence, operating cadence, and technology posture are already ahead of peers.
                </p>
              </article>
              <article class="benchmark-card benchmark-insight-card benchmark-insight-card--risk">
                <div class="benchmark-insight-card__head">
                  <strong>Where Meridian trails</strong>
                  <span class="delta-chip delta-chip--risk">Control gaps</span>
                </div>
                <p class="benchmark-insight-card__summary">
                  The next constraint is not feasibility. It is governance rigor and wider cultural adoption.
                </p>
                <ul class="benchmark-bullet-list">${benchmarkGapBulletsHtml}</ul>
                <p class="benchmark-insight-card__note">
                  Board implication: treat governance and culture as gating conditions for durable scale, not presentation polish.
                </p>
              </article>
            </div>
            <article class="benchmark-card benchmark-provenance-card">
              <div class="benchmark-provenance-card__head">
                <div>
                  <strong>Benchmark provenance</strong>
                  <p>${data.benchmarkProvenance.methodology}</p>
                </div>
                <button class="detail-link" type="button" data-evidence-id="${getBenchmarkEvidenceId()}" aria-label="Open benchmark provenance evidence pack">
                  Open evidence pack
                </button>
              </div>
              <div class="benchmark-provenance-meta">
                <div>
                  <span>Peer group</span>
                  <strong>${data.benchmarkProvenance.peerGroup}</strong>
                </div>
                <div>
                  <span>Source</span>
                  <strong>${data.benchmarkProvenance.source}</strong>
                </div>
                <div>
                  <span>Last refresh</span>
                  <strong>${data.benchmarkProvenance.lastRefresh}</strong>
                </div>
                <div>
                  <span>Confidence</span>
                  <strong>${data.benchmarkProvenance.confidence}</strong>
                </div>
              </div>
              <div class="benchmark-driver-list">${benchmarkDriversHtml}</div>
              <p class="benchmark-provenance-card__note">${data.benchmarkProvenance.caveat}</p>
            </article>
          </div>
          <div class="benchmark-bar-grid benchmark-bar-grid--inline">${benchmarkBarsHtml}</div>
          <p class="benchmark-section-note">
            Dimension-by-dimension comparison is now shown inline so the board story, evidence, and peer position can be read in one pass.
          </p>
        </div>
      </section>

      <section id="institution-priorities" class="panel institution-panel--full institution-section institution-section--priorities">
        <div class="section-head">
          <div class="section-head__cluster">
            <span class="section-index">10</span>
            <div>
              <p class="eyebrow">Board Priorities</p>
              <h2>What Meridian leadership should push in the next 90 days</h2>
            </div>
          </div>
          <p class="section-head__note">
            The next chapter is not about adding more dashboards. It is about
            tightening the management system that turns promising momentum into
            repeatable enterprise capability.
          </p>
        </div>
        <div class="institution-panel__body board-decision-grid">${boardDecisionsHtml}</div>
      </section>
    </div>

    <footer class="institution-footer panel panel--full">
      <div>
        <p class="eyebrow">Strategic Metadata</p>
        <p class="page-footer__meta">${data.updatedAt}</p>
      </div>
      <div>
        <p class="eyebrow">Strategic Sources</p>
        <p class="page-footer__sources">${data.sources.join(" | ")}</p>
      </div>
    </footer>
  `;

  updateInstitutionSubnavActive();
}

function renderScopeSummary(portfolio) {
  elements.scopeSummary.innerHTML = `
    <span class="scope-chip"><strong>Team</strong><span>${portfolio.label}</span></span>
    <span class="scope-chip"><strong>Workflow</strong><span>${workflowLabels[state.workflow]}</span></span>
    <span class="scope-chip"><strong>Mode</strong><span>${state.mode === "pilot" ? "Pilot assisted" : "Baseline reference"}</span></span>
    <span class="scope-chip"><strong>Date</strong><span>${periodLabels[state.period]}</span></span>
    <span class="scope-chip"><strong>Region</strong><span>${getFilterLabel("geography", state.geography)}</span></span>
    <span class="scope-chip"><strong>Function</strong><span>${getFilterLabel("businessFunction", state.businessFunction)}</span></span>
    <span class="scope-chip"><strong>Use case</strong><span>${getFilterLabel("useCase", state.useCase)}</span></span>
    <span class="scope-chip"><strong>Model tier</strong><span>${getFilterLabel("modelTier", state.modelTier)}</span></span>
    <span class="scope-chip"><strong>Scope</strong><span>${portfolio.scope}</span></span>
  `;
}

function renderFooter(portfolio) {
  elements.lastUpdated.textContent = portfolio.updatedAt[state.period];
  elements.dataSources.textContent = portfolio.dataSources.join(" | ");
}

function render() {
  renderShell();
  renderViewBars();
  renderDeliverySegmentationBar();
  renderDeliveryQuickNav();
  renderInstitutionalization();
  renderSavedViewPanels();
  renderAskPanels();

  const portfolio = portfolios[state.team];
  const oversightProfile = oversightProfiles[state.team];
  renderScopeSummary(portfolio);
  renderKpis(portfolio);
  renderSwimlanes(portfolio);
  renderOversightSummary(oversightProfile);
  renderOversightKpis(oversightProfile);
  renderOversightDiagnostics(oversightProfile);
  renderRoutingMap(oversightProfile);
  renderPendingQueue(oversightProfile);
  renderTrends(portfolio);
  renderAdoptionBehavior(portfolio);
  renderProductivityMethodology(portfolio);
  renderGovernance(portfolio);
  renderEconomics(portfolio);
  renderActionCenter(portfolio);
  renderRoadmap(portfolio);
  renderTrustLayer(state.team);
  renderFooter(portfolio);

  elements.dateFilter.value = state.period;
  elements.teamFilter.value = state.team;
  elements.workflowFilter.value = state.workflow;

  elements.baselineToggle.classList.toggle("is-active", state.mode === "baseline");
  elements.baselineToggle.setAttribute("aria-pressed", String(state.mode === "baseline"));
  elements.pilotToggle.classList.toggle("is-active", state.mode === "pilot");
  elements.pilotToggle.setAttribute("aria-pressed", String(state.mode === "pilot"));
  elements.overviewTab.classList.toggle("is-active", state.oversightTab === "overview");
  elements.overviewTab.setAttribute("aria-selected", String(state.oversightTab === "overview"));
  elements.governanceTab.classList.toggle("is-active", state.oversightTab === "governance");
  elements.governanceTab.setAttribute("aria-selected", String(state.oversightTab === "governance"));
  renderMetricDrawer();
}

elements.dateFilter.addEventListener("change", (event) => {
  state.period = event.target.value;
  render();
});

elements.teamFilter.addEventListener("change", (event) => {
  state.team = event.target.value;
  render();
});

elements.workflowFilter.addEventListener("change", (event) => {
  state.workflow = event.target.value;
  render();
});

document.addEventListener("change", (event) => {
  const filterKey = event.target.dataset.globalFilter;

  if (!filterKey) {
    return;
  }

  state[filterKey] = event.target.value;
  render();
});

[elements.baselineToggle, elements.pilotToggle].forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    render();
  });
});

[elements.overviewTab, elements.governanceTab].forEach((button) => {
  button.addEventListener("click", () => {
    state.oversightTab = button.dataset.oversightTab;
    render();
  });
});

elements.openScreenButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    state.screen = button.dataset.openScreen;
    state.metricFocus = null;
    state.evidenceFocus = null;
    render();
    window.scrollTo({ top: 0, behavior: topScrollBehavior() });
  });
});

elements.backHomeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    state.screen = "landing";
    state.metricFocus = null;
    state.evidenceFocus = null;
    render();
    window.scrollTo({ top: 0, behavior: topScrollBehavior() });
  });
});

window.addEventListener("hashchange", () => {
  const nextScreen = getScreenFromHash(window.location.hash, state.screen);

  updateInstitutionSubnavActive();
  updateDeliveryQuickNavActive();
  renderJumpReturnChip(window.location.hash);

  if (state.screen === nextScreen) {
    return;
  }

  state.screen = nextScreen;
  state.metricFocus = null;
  state.evidenceFocus = null;
  render();
});

document.addEventListener("click", (event) => {
  const savedViewTrigger = event.target.closest("[data-saved-view-id]");
  const askTrigger = event.target.closest("[data-ask-prompt]");
  const askClearTrigger = event.target.closest("[data-ask-clear]");
  const trigger = event.target.closest("[data-metric-id]");
  const evidenceTrigger = event.target.closest("[data-evidence-id]");
  const initiativeSelectTrigger = event.target.closest("[data-initiative-select]");
  const bridgeTileTrigger = event.target.closest("[data-bridge-tile-id]");
  const workforceProofTrigger = event.target.closest("[data-workforce-proof-id]");
  const workforceTopTrigger = event.target.closest("[data-workforce-top-id]");

  if (savedViewTrigger) {
    event.preventDefault();
    applySavedView(savedViewTrigger.dataset.savedViewScreen, savedViewTrigger.dataset.savedViewId);
    return;
  }

  if (askTrigger) {
    event.preventDefault();
    state.askFocus[askTrigger.dataset.askScreen] = askTrigger.dataset.askPrompt;
    render();
    return;
  }

  if (askClearTrigger) {
    event.preventDefault();
    state.askFocus[askClearTrigger.dataset.askClear] = null;
    render();
    return;
  }

  if (trigger) {
    event.preventDefault();
    lastDrawerTrigger = elements.metricDrawer.contains(trigger) ? null : trigger;
    state.metricFocus = trigger.dataset.metricId;
    state.evidenceFocus = null;
    renderMetricDrawer();
    return;
  }

  if (evidenceTrigger) {
    event.preventDefault();
    lastDrawerTrigger = elements.metricDrawer.contains(evidenceTrigger) ? null : evidenceTrigger;
    state.metricFocus = null;
    state.evidenceFocus = evidenceTrigger.dataset.evidenceId;
    renderMetricDrawer();
    return;
  }

  if (bridgeTileTrigger) {
    event.preventDefault();
    const tileId = bridgeTileTrigger.dataset.bridgeTileId;
    const nextState = !state.bridgeTileFlips?.[tileId];
    state.bridgeTileFlips = {
      ...state.bridgeTileFlips,
      [tileId]: nextState,
    };
    bridgeTileTrigger.classList.toggle("is-flipped", nextState);
    bridgeTileTrigger.setAttribute("aria-pressed", String(nextState));
    bridgeTileTrigger.setAttribute("aria-label", nextState ? `Show front of ${tileId}` : `Show why ${tileId} matters`);
    return;
  }

  if (workforceProofTrigger) {
    event.preventDefault();
    const tileId = workforceProofTrigger.dataset.workforceProofId;
    const nextState = !state.workforceProofFlips?.[tileId];
    state.workforceProofFlips = {
      ...state.workforceProofFlips,
      [tileId]: nextState,
    };
    workforceProofTrigger.classList.toggle("is-flipped", nextState);
    workforceProofTrigger.setAttribute("aria-pressed", String(nextState));
    workforceProofTrigger.setAttribute("aria-label", nextState ? `Show front of ${tileId}` : `Show why ${tileId} matters`);
    return;
  }

  if (workforceTopTrigger) {
    event.preventDefault();
    const tileId = workforceTopTrigger.dataset.workforceTopId;
    const nextState = !state.workforceTopFlips?.[tileId];
    state.workforceTopFlips = {
      ...state.workforceTopFlips,
      [tileId]: nextState,
    };
    workforceTopTrigger.classList.toggle("is-flipped", nextState);
    workforceTopTrigger.setAttribute("aria-pressed", String(nextState));
    workforceTopTrigger.setAttribute("aria-label", nextState ? `Show front of ${tileId}` : `Show why ${tileId} matters`);
    return;
  }

  if (!initiativeSelectTrigger) {
    return;
  }

  event.preventDefault();
  state.selectedValueInitiativeId = initiativeSelectTrigger.dataset.initiativeSelect;
  render();
});

elements.metricDrawerClose.addEventListener("click", closeMetricDrawer);
elements.metricDrawerScrim.addEventListener("click", closeMetricDrawer);

document.addEventListener("keydown", (event) => {
  const initiativeSelectTrigger = event.target.closest("[data-initiative-select]");

  if (initiativeSelectTrigger && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    state.selectedValueInitiativeId = initiativeSelectTrigger.dataset.initiativeSelect;
    render();
    return;
  }

  if (event.key === "Escape") {
    closeMetricDrawer();
    return;
  }

  if (event.key !== "Tab" || elements.metricDrawer.hidden) {
    return;
  }

  const focusable = [...elements.metricDrawerPanel.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")]
    .filter((element) => !element.hasAttribute("disabled"));

  if (!focusable.length) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

render();
