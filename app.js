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
  askFocus: {
    institutionalization: "scale-readiness",
    delivery: "what-changed",
  },
};

const periodLabels = {
  "last-30": "Last 30 days",
  "q1-2026": "Q1 2026",
  "q2-2026": "Q2 2026",
};

const workflowLabels = {
  all: "All workflows",
  planning: "Planning / Refinement",
  build: "Build / Test / Review",
  run: "Run / Support",
};

const metricLibrary = {
  aii_score: {
    label: "AII Score",
    lens: "Institutionalisation",
    definition:
      "Composite institutionalisation score measuring whether AI is becoming a repeatable enterprise capability rather than a set of isolated pilots.",
    formula:
      "0.20 strategy + 0.20 operations + 0.15 people + 0.15 governance + 0.15 technology + 0.15 responsible AI.",
    numerator:
      "Weighted sum of normalized domain scores across portfolio value, governance, workforce, delivery, and control-system measures.",
    denominator: "100-point composite maturity scale.",
    scope:
      "Enterprise AI portfolio across board, delivery, governance, workforce, and operating-model evidence.",
    exclusions:
      "Excludes sandbox experiments, pre-intake concepts, and acquisitions not yet onboarded to shared telemetry.",
    owner: "Enterprise AI PMO + Data Office",
    sourceSystems: [
      "Jira Align delivery telemetry",
      "FinOps AI ledger",
      "Control Tower policy registry",
      "Workforce telemetry",
    ],
    refreshCadence: "Quarterly board frame with weekly source checks",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "B / directional but still partly sample-based",
    evidence:
      "Dimension scorecards, governance registry, value tracking, and workforce readiness signals.",
  },
  portfolio_roi: {
    label: "Portfolio ROI",
    lens: "Institutionalisation",
    definition:
      "Annualized value run rate divided by annualized AI spend for in-scope initiatives.",
    formula: "Realized value run rate / total AI spend.",
    numerator: "GBP18.4M annualized value run rate from production and scaling initiatives.",
    denominator: "GBP5.0M annualized AI spend across delivery, operations, and shared platform controls.",
    scope:
      "24 active initiatives in the enterprise portfolio, with value attributed at initiative level.",
    exclusions:
      "Excludes speculative upside, pipeline concepts, and benefits not yet reviewed with finance.",
    owner: "Finance + Product + Data",
    sourceSystems: [
      "FinOps AI ledger",
      "Portfolio value register",
      "Initiative scorecards",
    ],
    refreshCadence: "Monthly operating review; quarterly board framing",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "B- / partially finance-validated",
    evidence:
      "Cost-out benefits are finance-reviewed; revenue and risk-reduction benefits remain directional.",
  },
  governance_coverage: {
    label: "Governance Coverage",
    lens: "Institutionalisation",
    definition:
      "Share of in-scope models operating with required policy, approval, and evidence controls in place.",
    formula: "Governed in-scope models / total in-scope models.",
    numerator:
      "23 models with control pack, named owner, risk classification, and current approval evidence.",
    denominator: "31 in-scope production or scaling models.",
    scope:
      "Production and scaling use cases only, including shared enterprise services.",
    exclusions:
      "Excludes lab proofs under 30 days and vendor trials not yet in enterprise production flow.",
    owner: "Risk & Compliance",
    sourceSystems: [
      "Control Tower policy registry",
      "Approval workflow ledger",
      "Audit evidence hub",
    ],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 07:00 BST",
    confidence: "A- / system-of-record backed",
    evidence:
      "Exception register and approval trail are complete; evidence-pack quality is still uneven by use case.",
  },
  rai_index: {
    label: "RAI Index",
    lens: "Institutionalisation",
    definition:
      "Composite responsible AI readiness score covering evaluation discipline, transparency, accountability, and incident preparedness.",
    formula:
      "Weighted readiness score across evaluation coverage, transparency artifacts, accountability controls, incident handling, and policy adherence.",
    numerator:
      "Weighted pass scores across trust, control, and review dimensions for in-scope use cases.",
    denominator: "100-point responsible AI readiness scale.",
    scope: "Enterprise use cases with declared customer, employee, or operational impact.",
    exclusions:
      "Excludes generic office productivity tooling without workflow-specific model behavior.",
    owner: "Responsible AI Office",
    sourceSystems: [
      "RAI control library",
      "Evaluation registry",
      "Incident review log",
    ],
    refreshCadence: "Monthly",
    lastRefresh: "05 Apr 2026, 17:15 BST",
    confidence: "B / methodology stable, evidence coverage still maturing",
    evidence:
      "Index reflects control readiness more strongly than observed long-run production behavior today.",
  },
  tech_debt_index: {
    label: "Tech Debt Index",
    lens: "Institutionalisation",
    definition:
      "Composite debt score capturing workflow fragility, prompt debt, manual control burden, and platform inconsistency across AI initiatives.",
    formula:
      "Inverse weighted score across prompt hygiene, orchestration reuse, control automation, architecture debt, and rework burden.",
    numerator:
      "Debt-adjusted weighted burden points aggregated across active initiatives and shared AI platform services.",
    denominator: "100-point debt scale where lower scores indicate heavier drag.",
    scope: "Enterprise AI delivery and operational workflows in active use.",
    exclusions: "Excludes technical debt outside AI-assisted workflow or model-serving scope.",
    owner: "Platform Engineering + AI Enablement",
    sourceSystems: [
      "Engineering backlog telemetry",
      "Prompt registry",
      "Release evidence store",
    ],
    refreshCadence: "Monthly",
    lastRefresh: "06 Apr 2026, 12:00 BST",
    confidence: "B / partly operational, partly curated",
    evidence:
      "Prompt and organizational debt are well observed; architecture debt is still normalized manually.",
  },
  delivery_flow_index: {
    label: "Flow Index",
    lens: "Cross-view",
    definition:
      "Composite delivery flow score combining throughput, cycle time, blocked work, and predictability across the assisted delivery portfolio.",
    formula:
      "Weighted composite of throughput, cycle-time improvement, blocked-work reduction, and plan-vs-delivery predictability.",
    numerator:
      "Normalized flow performance points across planning, build, and run workflows.",
    denominator: "100-point operational index.",
    scope: "In-scope delivery trains using approved AI-assisted workflows.",
    exclusions:
      "Excludes teams not yet instrumented in the delivery telemetry model and one-off major incident periods.",
    owner: "CIO Delivery Operations",
    sourceSystems: [
      "Jira Align delivery telemetry",
      "GitHub Enterprise workflows",
      "ServiceNow operations records",
    ],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "A- / well-instrumented",
    evidence:
      "This is the strongest shared board-to-delivery metric because all three core workflows are already instrumented.",
  },
  quality_guardrail: {
    label: "Quality Guardrail",
    lens: "Cross-view",
    definition:
      "Weighted quality score across escaped defects, rework, test reliability, change stability, and operational incident hygiene.",
    formula:
      "Weighted composite of escaped defects, rework, test reliability, change stability, and incident spillover.",
    numerator:
      "Normalized quality points from engineering and service-quality telemetry.",
    denominator: "100-point guardrail scale.",
    scope:
      "AI-assisted delivery work across planning, build, review, and operational handoff.",
    exclusions:
      "Excludes incidents traced to non-AI vendor outages or legacy releases outside the AI-assisted flow.",
    owner: "Engineering Excellence + Service Quality",
    sourceSystems: [
      "GitHub Enterprise workflows",
      "Test evidence store",
      "ServiceNow operations records",
    ],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "A / directly instrumented",
    evidence:
      "Guardrail strength is backed by release-quality telemetry, not narrative-only assessment.",
  },
  ai_workflow_coverage: {
    label: "AI Workflow Coverage",
    lens: "Cross-view",
    definition:
      "Share of in-scope workflows operating with an approved AI assist pattern in production use.",
    formula: "Approved AI-assisted workflows in production / total in-scope workflows.",
    numerator: "63% of mapped workflows with approved AI assist in active production use.",
    denominator: "All mapped delivery workflows in the current portfolio scope.",
    scope: "Planning, build, review, and run workflows in the selected portfolio.",
    exclusions:
      "Excludes shadow tooling, experiments without control approval, and teams not yet mapped into the workflow inventory.",
    owner: "AI Enablement + Delivery Operations",
    sourceSystems: [
      "Workflow inventory",
      "Control Tower policy registry",
      "Usage telemetry",
    ],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "B+ / coverage is measurable, behavior depth still limited",
    evidence:
      "Coverage shows approved presence, not sustained behavioral adoption, which is a later gap to fix.",
  },
  delivery_ai_run_rate: {
    label: "AI Run-Rate Cost",
    lens: "Delivery",
    definition:
      "Annualized delivery-side AI operating spend covering model usage, orchestration, controls, and platform support.",
    formula:
      "Annualized monthly assisted-delivery spend for model, platform, safety, and support layers.",
    numerator: "Current month delivery AI spend annualized to a 12-month run rate.",
    denominator: "Not applicable; this is an absolute spend metric.",
    scope: "Delivery-engine spend only, excluding operations/service AI and central experimentation budget.",
    exclusions:
      "Excludes one-time transformation spend and unapproved shadow-tooling purchases.",
    owner: "FinOps + CIO Office",
    sourceSystems: [
      "FinOps AI ledger",
      "Platform billing rollup",
      "Vendor utilization reports",
    ],
    refreshCadence: "Monthly with weekly burn monitoring",
    lastRefresh: "07 Apr 2026, 07:45 BST",
    confidence: "A- / finance-ledger backed",
    evidence:
      "This metric is cost-ledger strong, but value attribution still needs a tighter finance-grade join.",
  },
  operational_ai_spend: {
    label: "Operational AI",
    lens: "Institutionalisation",
    definition:
      "Annualized AI spend associated with service operations, support automation, and run-time incident workflows.",
    formula: "Annualized operations AI spend across in-scope service workflows.",
    numerator: "Current month operations AI spend annualized to 12 months.",
    denominator: "Not applicable; this is an absolute spend metric.",
    scope: "Run operations, support, incident, and service automation workflows.",
    exclusions: "Excludes delivery engineering spend and non-AI service tooling.",
    owner: "COO Operations + FinOps",
    sourceSystems: [
      "ServiceNow operations records",
      "FinOps AI ledger",
      "Vendor billing reports",
    ],
    refreshCadence: "Monthly with weekly burn checks",
    lastRefresh: "07 Apr 2026, 07:45 BST",
    confidence: "A- / ledger backed",
    evidence:
      "Operational AI is now the larger share of spend, which is why the board story must go beyond delivery alone.",
  },
  total_ai_spend: {
    label: "Total AI spend",
    lens: "Institutionalisation",
    definition:
      "Annualized enterprise AI spend across delivery, operations, platform, safety, and governance layers.",
    formula: "Delivery AI run rate + operational AI spend + shared enterprise platform overhead.",
    numerator: "GBP5.0M annualized enterprise AI spend.",
    denominator: "Not applicable; this is an absolute spend metric.",
    scope: "All in-scope enterprise AI operating spend under Meridian governance.",
    exclusions: "Excludes transformation capex and unfunded experiments outside portfolio intake.",
    owner: "Finance + Enterprise AI PMO",
    sourceSystems: [
      "FinOps AI ledger",
      "Shared platform allocations",
      "Vendor billing reports",
    ],
    refreshCadence: "Monthly",
    lastRefresh: "07 Apr 2026, 07:45 BST",
    confidence: "A- / finance-ledger backed",
    evidence:
      "This is the denominator behind portfolio ROI and should be read together with finance validation status.",
  },
  value_delivered: {
    label: "Value delivered",
    lens: "Institutionalisation",
    definition:
      "Annualized value run rate from in-production and scaling initiatives with attributed benefit cases.",
    formula:
      "Sum of initiative-level annualized value contributions across cost-out, revenue, and risk-reduction benefit types.",
    numerator: "GBP18.4M annualized value from in-scope initiatives.",
    denominator: "Not applicable; this is an absolute value metric.",
    scope: "Production and scaling initiatives with named owner and benefit case.",
    exclusions:
      "Excludes stalled initiatives, unvalidated pipeline estimates, and duplicated benefit claims across teams.",
    owner: "Product + Finance",
    sourceSystems: [
      "Portfolio value register",
      "Benefit case tracker",
      "FinOps AI ledger",
    ],
    refreshCadence: "Monthly operating review",
    lastRefresh: "07 Apr 2026, 08:15 BST",
    confidence: "B / value is attributed, finance validation is partial",
    evidence:
      "This is the bridge metric we should harden next into forecast vs realized and finance validation.",
  },
  net_productivity_gain: {
    label: "Net Productivity Gain",
    lens: "Delivery",
    definition:
      "Estimated change in assisted delivery output after normalizing for portfolio mix and release complexity.",
    formula:
      "Composite productivity delta based on cycle-time change, throughput uplift, avoided rework, and review efficiency.",
    numerator:
      "Net weighted improvement points from in-scope assisted delivery workflows.",
    denominator: "Baseline portfolio output under matched complexity assumptions.",
    scope: "Approved AI-assisted delivery workflows in the selected portfolio.",
    exclusions:
      "Excludes teams without stable baseline telemetry and transformation periods with major operating-model change.",
    owner: "CIO Delivery Operations + Data Science",
    sourceSystems: [
      "Jira Align delivery telemetry",
      "GitHub Enterprise workflows",
      "Release evidence store",
    ],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "B- / useful but still methodology-sensitive",
    evidence:
      "This metric is directionally useful, but the research report is right that the method still needs to be made more explicit.",
  },
  delivery_governance_compliance: {
    label: "Governance Compliance",
    lens: "Delivery",
    definition:
      "Share of AI-assisted delivery activity operating inside approved policy controls and evidence requirements.",
    formula:
      "Compliant in-scope delivery events / total in-scope AI-assisted delivery events.",
    numerator:
      "Delivery events with approved workflow pattern, named owner, and attached evidence requirements met.",
    denominator: "All in-scope AI-assisted delivery events in the reporting window.",
    scope: "Delivery-engine workflows only.",
    exclusions:
      "Excludes service operations events and experimentation outside the approved workflow catalogue.",
    owner: "Delivery Governance + Control Tower",
    sourceSystems: [
      "Control Tower policy registry",
      "Release evidence store",
      "GitHub Enterprise workflows",
    ],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:30 BST",
    confidence: "A- / event-level policy checks",
    evidence:
      "This metric is robust for delivery compliance but should later be paired with governance-by-risk views at enterprise level.",
  },
  daily_active_users: {
    label: "Daily Active Users",
    lens: "Delivery",
    definition:
      "Distinct named users triggering at least one approved AI-assisted action on an average business day in the selected slice.",
    formula: "Average distinct daily active named users across approved AI-assisted workflows.",
    numerator: "Distinct named users active on a typical business day in the current slice.",
    denominator: "Not applicable; this is an absolute usage count.",
    scope: "Selected portfolio, workflow, and segment slice across approved AI-assisted workflows.",
    exclusions: "Excludes service accounts, unattended automations, and shadow tooling.",
    owner: "AI Enablement Analytics",
    sourceSystems: ["Usage telemetry", "Workflow inventory", "Identity directory"],
    refreshCadence: "Daily with weekly operating review roll-up",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B+ / event-backed with some identity-join drift",
    evidence:
      "Daily active usage is sourced from approved workflow telemetry joined to named seats in the identity directory.",
  },
  weekly_active_users: {
    label: "Weekly Active Users",
    lens: "Delivery",
    definition:
      "Distinct named users active at least once in the trailing 7-day window across approved AI-assisted workflows.",
    formula: "Distinct weekly active named users in the selected slice.",
    numerator: "Distinct named users active in the trailing 7-day window.",
    denominator: "Not applicable; this is an absolute usage count.",
    scope: "Selected portfolio, workflow, and segment slice across approved AI-assisted workflows.",
    exclusions: "Excludes service accounts, unattended automations, and shadow tooling.",
    owner: "AI Enablement Analytics",
    sourceSystems: ["Usage telemetry", "Workflow inventory", "Identity directory"],
    refreshCadence: "Daily with weekly operating review roll-up",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B+ / event-backed with some identity-join drift",
    evidence:
      "WAU is used to distinguish one-off curiosity from sustained working-pattern adoption.",
  },
  monthly_active_users: {
    label: "Monthly Active Users",
    lens: "Delivery",
    definition:
      "Distinct named users active at least once in the trailing 30-day window across approved AI-assisted workflows.",
    formula: "Distinct monthly active named users in the selected slice.",
    numerator: "Distinct named users active in the trailing 30-day window.",
    denominator: "Not applicable; this is an absolute usage count.",
    scope: "Selected portfolio, workflow, and segment slice across approved AI-assisted workflows.",
    exclusions: "Excludes service accounts, unattended automations, and shadow tooling.",
    owner: "AI Enablement Analytics",
    sourceSystems: ["Usage telemetry", "Workflow inventory", "Identity directory"],
    refreshCadence: "Daily with weekly operating review roll-up",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B+ / event-backed with some identity-join drift",
    evidence:
      "MAU is the main denominator for repeat use, retention, and seat-utilization tracking in the cockpit.",
  },
  seat_utilization: {
    label: "Seat Utilization",
    lens: "Delivery",
    definition:
      "Share of eligible named seats that are monthly active in approved AI-assisted workflows.",
    formula: "Monthly active users / eligible seats.",
    numerator: "Distinct monthly active named users in the selected slice.",
    denominator: "Eligible named seats assigned to approved AI-assisted workflows.",
    scope: "Selected portfolio and filter slice across approved AI-assisted workflows.",
    exclusions: "Excludes users without provisioned access or those only using shadow tooling.",
    owner: "AI Enablement Analytics + Workforce Technology",
    sourceSystems: ["Usage telemetry", "Identity directory", "Seat assignment registry"],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B / seat assignment hygiene still improving in a few teams",
    evidence:
      "Seat utilization shows whether provisioned access is turning into actual behavioral usage.",
  },
  repeat_use_rate: {
    label: "Repeat Use Rate",
    lens: "Delivery",
    definition:
      "Share of monthly active users returning often enough to count as repeated working-pattern use rather than occasional experimentation.",
    formula: "Repeat monthly active users / total monthly active users.",
    numerator: "Users with repeated usage days above the agreed engagement threshold in the month.",
    denominator: "Total monthly active users in the selected slice.",
    scope: "Selected portfolio and filter slice across approved AI-assisted workflows.",
    exclusions: "Excludes one-off launch-week activations and shadow tooling sessions.",
    owner: "AI Enablement Analytics",
    sourceSystems: ["Usage telemetry", "Event aggregation model"],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B+ / event-backed",
    evidence:
      "Repeat use is the cleanest behavior signal separating superficial trial from embedded workflow use.",
  },
  retention_30_day: {
    label: "30-Day Retention",
    lens: "Delivery",
    definition:
      "Share of prior-month active users who returned in the current 30-day window for approved AI-assisted workflows.",
    formula: "Retained active users / prior-month active users.",
    numerator: "Users active this month who were also active in the prior month.",
    denominator: "Prior-month active users in the selected slice.",
    scope: "Selected portfolio and filter slice across approved AI-assisted workflows.",
    exclusions: "Excludes brand-new rollouts inside the first 14 days of launch.",
    owner: "AI Enablement Analytics",
    sourceSystems: ["Usage telemetry", "Identity directory"],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B / cohort stitching is strong but still not universal",
    evidence:
      "Retention makes the behavior story durable by showing whether users come back after the first month of exposure.",
  },
  active_teams: {
    label: "Active Teams",
    lens: "Delivery",
    definition:
      "Number of delivery trains or operating teams clearing the monthly active seat-utilization threshold for meaningful behavioral adoption.",
    formula: "Count of distinct delivery trains with monthly active seat utilization at or above 35%.",
    numerator: "Distinct trains meeting the 35% behavioral-use threshold.",
    denominator: "Total distinct trains represented in the selected slice.",
    scope: "Selected portfolio and filter slice across approved AI-assisted workflows.",
    exclusions: "Excludes teams not yet provisioned or not yet inside approved workflow scope.",
    owner: "CIO Delivery Operations",
    sourceSystems: ["Usage telemetry", "Workflow inventory", "Identity directory"],
    refreshCadence: "Weekly",
    lastRefresh: "07 Apr 2026, 08:00 BST",
    confidence: "B / threshold is stable, team mapping still improving",
    evidence:
      "Active teams is the organizational adoption counterpart to user-level MAU and seat-utilization signals.",
  },
};

const metricLabelToId = {
  "AII Score": "aii_score",
  "Portfolio ROI": "portfolio_roi",
  "Governance Coverage": "governance_coverage",
  "RAI Index": "rai_index",
  "Tech Debt Index": "tech_debt_index",
  "Flow Index": "delivery_flow_index",
  "Delivery Flow Index": "delivery_flow_index",
  "Quality Guardrail": "quality_guardrail",
  "AI Coverage": "ai_workflow_coverage",
  "AI Workflow Coverage": "ai_workflow_coverage",
  "Delivery run-rate": "delivery_ai_run_rate",
  "AI Run-Rate Cost": "delivery_ai_run_rate",
  "Operational AI": "operational_ai_spend",
  "Total AI spend": "total_ai_spend",
  "Value delivered": "value_delivered",
  "Net Productivity Gain": "net_productivity_gain",
  "Governance Compliance": "delivery_governance_compliance",
  "Daily Active Users": "daily_active_users",
  "Weekly Active Users": "weekly_active_users",
  "Monthly Active Users": "monthly_active_users",
  "Seat Utilization": "seat_utilization",
  "Repeat Use Rate": "repeat_use_rate",
  "30-Day Retention": "retention_30_day",
  "Active Teams": "active_teams",
};

const initiativeLedger = [
  {
    id: "voice-ai-service-desk",
    name: "Voice AI service desk",
    portfolioKey: "operations",
    function: "Ops",
    geography: "EMEA",
    deliveryTrain: "Service Tower Alpha",
    workflow: "run",
    useCase: "Service automation",
    modelTier: "Hybrid",
    tierLabel: "T1+T2",
    stage: "Production",
    benefitType: "Cost-out",
    forecastValue: 4.0,
    realizedValue: 3.6,
    spend: 0.82,
    paybackMonths: 8,
    financeValidated: true,
    confidence: "High",
  },
  {
    id: "claims-triage-routing",
    name: "Claims triage & routing",
    portfolioKey: "operations",
    function: "Ops",
    geography: "LATAM",
    deliveryTrain: "Claims Operations",
    workflow: "run",
    useCase: "Claims operations",
    modelTier: "T1",
    tierLabel: "T1",
    stage: "Stalled",
    benefitType: "Cost-out",
    forecastValue: 1.5,
    realizedValue: 0.8,
    spend: 0.36,
    paybackMonths: 14,
    financeValidated: false,
    confidence: "Low",
  },
  {
    id: "field-technician-assistant",
    name: "Field technician assistant",
    portfolioKey: "operations",
    function: "Ops",
    geography: "UK&I",
    deliveryTrain: "Field Service",
    workflow: "run",
    useCase: "Service automation",
    modelTier: "T2",
    tierLabel: "T2",
    stage: "Scaling",
    benefitType: "Cost-out",
    forecastValue: 1.1,
    realizedValue: 0.9,
    spend: 0.18,
    paybackMonths: 9,
    financeValidated: true,
    confidence: "High",
  },
  {
    id: "ticket-auto-resolution",
    name: "Ticket auto-resolution",
    portfolioKey: "enterprise",
    function: "Engineering",
    geography: "UK&I",
    deliveryTrain: "Enterprise Flow",
    workflow: "build",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    tierLabel: "T1+T2",
    stage: "Production",
    benefitType: "Cost-out",
    forecastValue: 2.9,
    realizedValue: 2.5,
    spend: 0.59,
    paybackMonths: 7,
    financeValidated: true,
    confidence: "High",
  },
  {
    id: "rca-change-request-ai",
    name: "RCA & change request AI",
    portfolioKey: "enterprise",
    function: "Engineering",
    geography: "APAC",
    deliveryTrain: "Reliability Engineering",
    workflow: "build",
    useCase: "Incident analysis",
    modelTier: "T3",
    tierLabel: "T3",
    stage: "Scaling",
    benefitType: "Risk reduction",
    forecastValue: 2.6,
    realizedValue: 2.0,
    spend: 0.64,
    paybackMonths: 11,
    financeValidated: false,
    confidence: "Medium",
  },
  {
    id: "financial-anomaly-detection",
    name: "Financial anomaly detection",
    portfolioKey: "enterprise",
    function: "Finance",
    geography: "EMEA",
    deliveryTrain: "Finance Controls",
    workflow: "planning",
    useCase: "Risk analytics",
    modelTier: "T2",
    tierLabel: "T2",
    stage: "Pilot",
    benefitType: "Risk reduction",
    forecastValue: 2.1,
    realizedValue: 1.6,
    spend: 0.44,
    paybackMonths: 15,
    financeValidated: false,
    confidence: "Medium",
  },
  {
    id: "policy-evidence-summarizer",
    name: "Policy evidence summarizer",
    portfolioKey: "enterprise",
    function: "Risk",
    geography: "EMEA",
    deliveryTrain: "Control Tower",
    workflow: "planning",
    useCase: "Governance operations",
    modelTier: "T2",
    tierLabel: "T2",
    stage: "Production",
    benefitType: "Cost-out",
    forecastValue: 0.9,
    realizedValue: 0.6,
    spend: 0.17,
    paybackMonths: 8,
    financeValidated: true,
    confidence: "Medium",
  },
  {
    id: "customer-intent-prediction",
    name: "Customer intent prediction",
    portfolioKey: "product",
    function: "Commercial",
    geography: "North America",
    deliveryTrain: "Growth Products",
    workflow: "planning",
    useCase: "Growth intelligence",
    modelTier: "T2",
    tierLabel: "T2",
    stage: "Production",
    benefitType: "Revenue",
    forecastValue: 4.1,
    realizedValue: 3.5,
    spend: 1.0,
    paybackMonths: 10,
    financeValidated: false,
    confidence: "Medium",
  },
  {
    id: "contract-review-automation",
    name: "Contract review automation",
    portfolioKey: "product",
    function: "Legal",
    geography: "EMEA",
    deliveryTrain: "Enterprise Product Services",
    workflow: "build",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    tierLabel: "T2+T3",
    stage: "Production",
    benefitType: "Cost-out",
    forecastValue: 2.7,
    realizedValue: 2.2,
    spend: 0.53,
    paybackMonths: 9,
    financeValidated: true,
    confidence: "High",
  },
  {
    id: "release-note-copilot",
    name: "Release note copilot",
    portfolioKey: "product",
    function: "Product",
    geography: "UK&I",
    deliveryTrain: "Release Excellence",
    workflow: "build",
    useCase: "Release automation",
    modelTier: "T1",
    tierLabel: "T1",
    stage: "Scaling",
    benefitType: "Cost-out",
    forecastValue: 0.8,
    realizedValue: 0.7,
    spend: 0.12,
    paybackMonths: 6,
    financeValidated: true,
    confidence: "High",
  },
];

const initiativeIndex = Object.fromEntries(initiativeLedger.map((item) => [item.id, item]));

const adoptionBehaviorLedger = [
  {
    initiativeId: "voice-ai-service-desk",
    persona: "Service agents",
    eligibleSeats: 420,
    baseline: { dau: 60, wau: 140, mau: 210, repeatUsers: 108, retainedUsers: 164, priorMonthActive: 230 },
    pilot: { dau: 182, wau: 294, mau: 338, repeatUsers: 246, retainedUsers: 286, priorMonthActive: 331 },
  },
  {
    initiativeId: "claims-triage-routing",
    persona: "Claims specialists",
    eligibleSeats: 150,
    baseline: { dau: 18, wau: 42, mau: 71, repeatUsers: 26, retainedUsers: 48, priorMonthActive: 85 },
    pilot: { dau: 31, wau: 58, mau: 82, repeatUsers: 34, retainedUsers: 57, priorMonthActive: 94 },
  },
  {
    initiativeId: "field-technician-assistant",
    persona: "Field technicians",
    eligibleSeats: 230,
    baseline: { dau: 34, wau: 79, mau: 118, repeatUsers: 46, retainedUsers: 81, priorMonthActive: 132 },
    pilot: { dau: 97, wau: 164, mau: 203, repeatUsers: 137, retainedUsers: 174, priorMonthActive: 198 },
  },
  {
    initiativeId: "ticket-auto-resolution",
    persona: "Engineers",
    eligibleSeats: 280,
    baseline: { dau: 41, wau: 96, mau: 144, repeatUsers: 58, retainedUsers: 103, priorMonthActive: 136 },
    pilot: { dau: 118, wau: 196, mau: 242, repeatUsers: 141, retainedUsers: 198, priorMonthActive: 228 },
  },
  {
    initiativeId: "rca-change-request-ai",
    persona: "SREs",
    eligibleSeats: 190,
    baseline: { dau: 24, wau: 54, mau: 88, repeatUsers: 37, retainedUsers: 60, priorMonthActive: 94 },
    pilot: { dau: 63, wau: 112, mau: 149, repeatUsers: 93, retainedUsers: 126, priorMonthActive: 141 },
  },
  {
    initiativeId: "financial-anomaly-detection",
    persona: "Finance analysts",
    eligibleSeats: 110,
    baseline: { dau: 12, wau: 28, mau: 46, repeatUsers: 18, retainedUsers: 29, priorMonthActive: 52 },
    pilot: { dau: 31, wau: 59, mau: 78, repeatUsers: 43, retainedUsers: 55, priorMonthActive: 71 },
  },
  {
    initiativeId: "policy-evidence-summarizer",
    persona: "Risk reviewers",
    eligibleSeats: 95,
    baseline: { dau: 15, wau: 31, mau: 49, repeatUsers: 22, retainedUsers: 33, priorMonthActive: 57 },
    pilot: { dau: 37, wau: 61, mau: 76, repeatUsers: 45, retainedUsers: 58, priorMonthActive: 73 },
  },
  {
    initiativeId: "customer-intent-prediction",
    persona: "Commercial analysts",
    eligibleSeats: 210,
    baseline: { dau: 27, wau: 68, mau: 101, repeatUsers: 39, retainedUsers: 67, priorMonthActive: 111 },
    pilot: { dau: 82, wau: 145, mau: 189, repeatUsers: 118, retainedUsers: 149, priorMonthActive: 174 },
  },
  {
    initiativeId: "contract-review-automation",
    persona: "Legal reviewers",
    eligibleSeats: 125,
    baseline: { dau: 18, wau: 43, mau: 67, repeatUsers: 29, retainedUsers: 45, priorMonthActive: 75 },
    pilot: { dau: 51, wau: 88, mau: 109, repeatUsers: 72, retainedUsers: 89, priorMonthActive: 101 },
  },
  {
    initiativeId: "release-note-copilot",
    persona: "Release managers",
    eligibleSeats: 70,
    baseline: { dau: 11, wau: 24, mau: 38, repeatUsers: 14, retainedUsers: 21, priorMonthActive: 44 },
    pilot: { dau: 29, wau: 49, mau: 61, repeatUsers: 35, retainedUsers: 45, priorMonthActive: 58 },
  },
];

const globalFilterOptions = {
  geography: [
    { value: "all", label: "All regions" },
    ...[...new Set(initiativeLedger.map((item) => item.geography))]
      .sort()
      .map((value) => ({ value, label: value })),
  ],
  businessFunction: [
    { value: "all", label: "All functions" },
    ...[...new Set(initiativeLedger.map((item) => item.function))]
      .sort()
      .map((value) => ({ value, label: value })),
  ],
  useCase: [
    { value: "all", label: "All use cases" },
    ...[...new Set(initiativeLedger.map((item) => item.useCase))]
      .sort()
      .map((value) => ({ value, label: value })),
  ],
  modelTier: [
    { value: "all", label: "All model tiers" },
    ...[...new Set(initiativeLedger.map((item) => item.modelTier))]
      .sort()
      .map((value) => ({ value, label: value })),
  ],
};

const portfolios = {
  enterprise: {
    label: "Enterprise Portfolio",
    scope: "27 delivery trains | 4,800 engineers, analysts, and service leads",
    updatedAt: {
      "last-30": "Last updated 07 Apr 2026, 08:30 BST",
      "q1-2026": "Last updated 31 Mar 2026, 18:00 BST",
      "q2-2026": "Last updated 07 Apr 2026, 08:30 BST",
    },
    dataSources: [
      "Jira Align delivery telemetry",
      "GitHub Enterprise workflows",
      "ServiceNow operations records",
      "FinOps AI ledger",
      "Control Tower policy registry",
      "Internal audit evidence hub",
    ],
    kpis: [
      {
        label: "Net Productivity Gain",
        definition: "Estimated change in assisted delivery output after normalizing for portfolio mix and release complexity.",
        baseline: 0,
        pilot: 18,
        target: 22,
        format: "percent",
        improve: "up",
      },
      {
        label: "AI Workflow Coverage",
        definition: "Share of delivery workflows with an approved AI assist pattern in production use.",
        baseline: 24,
        pilot: 63,
        target: 75,
        format: "percent",
        improve: "up",
      },
      {
        label: "Delivery Flow Index",
        definition: "Composite score combining throughput, cycle time, blocked work, and predictability across the portfolio.",
        baseline: 67,
        pilot: 79,
        target: 84,
        format: "index",
        improve: "up",
      },
      {
        label: "Quality Guardrail",
        definition: "Weighted quality score across escaped defects, rework, test reliability, and change stability.",
        baseline: 91,
        pilot: 96,
        target: 97,
        format: "percent",
        improve: "up",
      },
      {
        label: "Governance Compliance",
        definition: "Share of AI-assisted delivery activity operating inside approved policy controls and evidence requirements.",
        baseline: 92,
        pilot: 98,
        target: 99,
        format: "percent",
        improve: "up",
      },
      {
        label: "AI Run-Rate Cost",
        definition: "Annualized AI operating spend covering model usage, orchestration, safety controls, and platform support.",
        baseline: 1.24,
        pilot: 1.31,
        target: 1.18,
        format: "currencyM",
        improve: "down",
      },
    ],
    swimlanes: [
      {
        id: "planning",
        title: "Planning / Refinement",
        valueMetric: {
          label: "Decision latency",
          definition: "Median elapsed time from intake to approved scope decision.",
          baseline: 9.5,
          pilot: 6.8,
          format: "days",
          improve: "down",
        },
        riskMetric: {
          label: "Requirements quality score",
          definition: "Quality score for backlog items entering build, based on completeness, dependency clarity, and acceptance criteria.",
          baseline: 87,
          pilot: 93,
          format: "percent",
          improve: "up",
        },
        interpretation: {
          baseline: "Portfolio planning is document-heavy, with delayed approval cycles and uneven requirements quality across trains.",
          pilot: "Assisted refinement is compressing approval time and improving scope quality before work hits build queues.",
        },
      },
      {
        id: "build",
        title: "Build / Test / Review",
        valueMetric: {
          label: "PR cycle time",
          definition: "Median time from pull request open to approved merge for in-scope repositories.",
          baseline: 31,
          pilot: 23,
          format: "hours",
          improve: "down",
        },
        riskMetric: {
          label: "Critical rework rate",
          definition: "Share of completed work reopened for material code, test, or control remediation.",
          baseline: 11.2,
          pilot: 7.1,
          format: "percent",
          improve: "down",
        },
        interpretation: {
          baseline: "Engineering flow is held back by review queues and inconsistent evidence capture on AI-assisted changes.",
          pilot: "Review acceleration is material, but cost discipline and evidence automation still need executive pressure.",
        },
      },
      {
        id: "run",
        title: "Run / Support",
        valueMetric: {
          label: "Mean time to resolve",
          definition: "Average time to restore service for priority incidents touched by AI-assisted support workflows.",
          baseline: 7.2,
          pilot: 5.1,
          format: "hours",
          improve: "down",
        },
        riskMetric: {
          label: "Change failure rate",
          definition: "Share of changes that trigger rollback, hotfix, or incident activity within the observation window.",
          baseline: 9.1,
          pilot: 6.4,
          format: "percent",
          improve: "down",
        },
        interpretation: {
          baseline: "Support teams rely on manual triage and fragmented runbooks, which keeps incident recovery inconsistent.",
          pilot: "Assisted triage is improving recovery speed, with fewer unstable changes flowing into production support.",
        },
      },
    ],
    trends: [
      {
        title: "Adoption",
        definition: "Approved AI-assisted workflow coverage across the end-to-end delivery chain.",
        baseline: 24,
        current: 63,
        target: 75,
        format: "percent",
        improve: "up",
      },
      {
        title: "Flow",
        definition: "Portfolio flow score derived from throughput, delay, and predictability.",
        baseline: 67,
        current: 79,
        target: 84,
        format: "index",
        improve: "up",
      },
      {
        title: "Quality",
        definition: "Composite quality guardrail score across release and support outcomes.",
        baseline: 91,
        current: 96,
        target: 97,
        format: "percent",
        improve: "up",
      },
      {
        title: "Cost",
        definition: "Annualized AI run-rate cost relative to the target operating model.",
        baseline: 1.24,
        current: 1.31,
        target: 1.18,
        format: "currencyM",
        improve: "down",
      },
    ],
    governance: {
      useCases: [
        {
          label: "Green use cases",
          detail: "Standard copilots and bounded automation",
          baseline: 14,
          pilot: 26,
          status: "green",
        },
        {
          label: "Amber use cases",
          detail: "Supervised workflows awaiting scaled approval",
          baseline: 10,
          pilot: 8,
          status: "amber",
        },
        {
          label: "Red use cases",
          detail: "Restricted or under exception review",
          baseline: 6,
          pilot: 2,
          status: "red",
        },
      ],
      metrics: [
        {
          label: "Policy exceptions",
          definition: "Active exceptions requiring governance approval to continue operating.",
          baseline: 14,
          pilot: 5,
          format: "count",
          improve: "down",
        },
        {
          label: "Human review override rate",
          definition: "Share of AI-assisted actions escalated or overturned during mandatory human review.",
          baseline: 18,
          pilot: 9,
          format: "percent",
          improve: "down",
        },
        {
          label: "Audit evidence completeness",
          definition: "Share of in-scope AI activity with complete linked evidence for audit and regulatory review.",
          baseline: 84,
          pilot: 97,
          format: "percent",
          improve: "up",
        },
      ],
      notes: {
        baseline: "Baseline posture shows fragmented controls and a high manual review burden across the enterprise portfolio.",
        pilot: "Controls are materially tighter in pilot scope, but amber approvals still need faster policy decisions to scale.",
      },
      riskSummary: [
        {
          label: "High-risk routes with full control pack",
          definition: "Share of the highest-risk enterprise routes operating with the required approval, evidence, and human-oversight controls in place.",
          tone: "risk",
          format: "percent",
          baseline: {
            value: 68,
            routes: 9,
            note: "5 high-risk routes still depend on active exception handling or partial evidence coverage.",
          },
          pilot: {
            value: 91,
            routes: 11,
            note: "Only 1 high-risk route remains under temporary exception while its final approval pack closes.",
          },
        },
        {
          label: "Critical workflows with complete evidence",
          definition: "Share of mission-critical and business-critical workflows with the evidence Meridian would need for audit, review, and executive sign-off.",
          tone: "watch",
          format: "percent",
          baseline: {
            value: 74,
            routes: 17,
            note: "Critical-route evidence was fragmented across teams, which made scale decisions slower and less defensible.",
          },
          pilot: {
            value: 94,
            routes: 22,
            note: "Evidence completeness is now strong across the critical path, with only a small number of legacy packs still catching up.",
          },
        },
        {
          label: "Restricted-data routes with masking and logging",
          definition: "Share of restricted-data workflows operating with enforced masking, outbound controls, and immutable audit logging.",
          tone: "watch",
          format: "percent",
          baseline: {
            value: 81,
            routes: 7,
            note: "Restricted-data control quality was better than average, but too many routes still relied on manual proof points.",
          },
          pilot: {
            value: 97,
            routes: 8,
            note: "Restricted-data routes are now close to target-state, with one route still under elevated review.",
          },
        },
      ],
      riskBreakdown: [
        {
          title: "Risk tier",
          description: "Inherent AI risk tier determines how much review, approval, and evidence Meridian should require before scaling.",
          items: [
            {
              label: "High tier",
              detail: "Regulated, decision-shaping, or customer-impacting workflows.",
              tone: "risk",
              baseline: { count: 9, coverage: 68, exceptions: 5 },
              pilot: { count: 11, coverage: 91, exceptions: 1 },
            },
            {
              label: "Medium tier",
              detail: "Material workflows with bounded operational or financial impact.",
              tone: "watch",
              baseline: { count: 13, coverage: 82, exceptions: 4 },
              pilot: { count: 17, coverage: 96, exceptions: 1 },
            },
            {
              label: "Low tier",
              detail: "Assistive or low-blast-radius workflows operating inside standard guardrails.",
              tone: "good",
              baseline: { count: 8, coverage: 95, exceptions: 1 },
              pilot: { count: 8, coverage: 99, exceptions: 0 },
            },
          ],
        },
        {
          title: "Service criticality",
          description: "Criticality shows where governance friction concentrates in workflows that leadership would feel fastest if they failed.",
          items: [
            {
              label: "Mission-critical",
              detail: "Workflows tied to control operation, incident command, or major service commitments.",
              tone: "risk",
              baseline: { count: 6, coverage: 71, exceptions: 3 },
              pilot: { count: 8, coverage: 93, exceptions: 1 },
            },
            {
              label: "Business-critical",
              detail: "High-importance workflows where failure would slow a core business decision or delivery path.",
              tone: "watch",
              baseline: { count: 11, coverage: 79, exceptions: 5 },
              pilot: { count: 14, coverage: 95, exceptions: 1 },
            },
            {
              label: "Standard support",
              detail: "Lower-criticality workflow assists with simpler rollback and containment paths.",
              tone: "good",
              baseline: { count: 13, coverage: 92, exceptions: 2 },
              pilot: { count: 14, coverage: 99, exceptions: 0 },
            },
          ],
        },
        {
          title: "Data sensitivity",
          description: "Sensitive-data routes should carry stronger masking, evidence, and approval requirements than internal-only workflows.",
          items: [
            {
              label: "Restricted data",
              detail: "PII, regulated fields, and restricted operational records.",
              tone: "risk",
              baseline: { count: 7, coverage: 81, exceptions: 4 },
              pilot: { count: 8, coverage: 97, exceptions: 1 },
            },
            {
              label: "Confidential data",
              detail: "Financial, commercial, or internal decision-support information.",
              tone: "watch",
              baseline: { count: 12, coverage: 77, exceptions: 5 },
              pilot: { count: 16, coverage: 93, exceptions: 1 },
            },
            {
              label: "Internal-only data",
              detail: "Low-sensitivity internal workflow material operating inside standard policy.",
              tone: "good",
              baseline: { count: 11, coverage: 94, exceptions: 1 },
              pilot: { count: 12, coverage: 99, exceptions: 0 },
            },
          ],
        },
      ],
      riskNote: {
        baseline:
          "The topline governance percentage hides where the real pressure sits: high-risk, critical, and restricted-data routes are the slices most likely to slow safe scale.",
        pilot:
          "Pilot governance is now strong overall, but the remaining drag is still concentrated in the smallest number of high-risk and critical routes rather than broad non-compliance.",
      },
      complianceFrameworks: [
        {
          name: "Meridian AI Policy",
          owner: "AI Control Tower",
          baseline: {
            readiness: 83,
            controlsReady: 30,
            controlsTotal: 36,
            gap: "Legacy exception packs still need normalization across three higher-risk routes.",
          },
          pilot: {
            readiness: 97,
            controlsReady: 35,
            controlsTotal: 36,
            gap: "One final exception pack is still closing before the whole enterprise slice reads target-state.",
          },
        },
        {
          name: "ISO/IEC 42001",
          owner: "Enterprise AI PMO",
          baseline: {
            readiness: 72,
            controlsReady: 18,
            controlsTotal: 25,
            gap: "Management-review evidence and supplier traceability were still incomplete in baseline operations.",
          },
          pilot: {
            readiness: 91,
            controlsReady: 23,
            controlsTotal: 25,
            gap: "Two management-system artifacts still need repeatable quarterly proof rather than curated evidence.",
          },
        },
        {
          name: "NIST AI RMF",
          owner: "Risk & Control",
          baseline: {
            readiness: 76,
            controlsReady: 21,
            controlsTotal: 27,
            gap: "Govern and monitor practices were weaker than map and measure in the baseline estate.",
          },
          pilot: {
            readiness: 92,
            controlsReady: 25,
            controlsTotal: 27,
            gap: "Residual gaps are mostly in exception closure and evidence freshness, not policy design.",
          },
        },
        {
          name: "EU AI Act",
          owner: "Legal + AI Governance",
          baseline: {
            readiness: 69,
            controlsReady: 17,
            controlsTotal: 24,
            gap: "High-risk classification records and post-market monitoring evidence were still too manual.",
          },
          pilot: {
            readiness: 88,
            controlsReady: 21,
            controlsTotal: 24,
            gap: "The register is much stronger, but post-market monitoring and supplier pack joins still need automation.",
          },
        },
      ],
      complianceMatrix: [
        {
          control: "Model inventory and route classification",
          frameworks: ["Policy", "ISO 42001", "EU AI Act"],
          owner: "AI Control Tower",
          baseline: {
            readiness: 82,
            gap: "Two legacy copilots still lack formal high-risk classification records and a clean inventory join.",
          },
          pilot: {
            readiness: 96,
            gap: "Only one inherited route still needs its final classification attestation and inventory evidence refresh.",
          },
        },
        {
          control: "Data privacy, residency, and masking",
          frameworks: ["Policy", "NIST AI RMF", "EU AI Act"],
          owner: "Data Protection Office",
          baseline: {
            readiness: 88,
            gap: "Restricted-data transfer attestations were still manual in one critical workflow.",
          },
          pilot: {
            readiness: 98,
            gap: "One route still depends on a manual residency attestation before this reads fully closed.",
          },
        },
        {
          control: "Human oversight and exception handling",
          frameworks: ["Policy", "NIST AI RMF", "EU AI Act"],
          owner: "Risk & Control",
          baseline: {
            readiness: 74,
            gap: "Board escalation triggers and exception expiry rules were not consistently automated.",
          },
          pilot: {
            readiness: 92,
            gap: "The final gap is one mission-critical exception path that still needs auto-escalation wiring.",
          },
        },
        {
          control: "Prompt security and abuse testing",
          frameworks: ["Policy", "ISO 42001", "NIST AI RMF"],
          owner: "Platform Security",
          baseline: {
            readiness: 71,
            gap: "Red-team coverage was partial for one high-risk assistant and uneven across older prompts.",
          },
          pilot: {
            readiness: 89,
            gap: "The remaining issue is depth of repeat abuse testing on a small number of legacy prompt assets.",
          },
        },
        {
          control: "Grounding, evaluation, and quality thresholds",
          frameworks: ["Policy", "ISO 42001", "NIST AI RMF"],
          owner: "AI Quality Office",
          baseline: {
            readiness: 77,
            gap: "Route-level evaluation evidence was not yet complete enough to defend scaling decisions everywhere.",
          },
          pilot: {
            readiness: 90,
            gap: "A small number of exception packs still need more repeatable route-level eval evidence.",
          },
        },
        {
          control: "Audit logging and evidence retention",
          frameworks: ["Policy", "ISO 42001", "EU AI Act"],
          owner: "Internal Audit Platform",
          baseline: {
            readiness: 84,
            gap: "Retention mapping was strong, but one archive export control still lacked formal sign-off.",
          },
          pilot: {
            readiness: 97,
            gap: "The remaining work is a legacy archive attestation, not a broad logging coverage issue.",
          },
        },
      ],
      complianceNote: {
        baseline:
          "Framework readiness looked respectable in aggregate, but the gaps were still hiding in concrete control families rather than in policy language alone.",
        pilot:
          "The matrix now makes it clear that most residual framework gaps are concentrated in a small number of control families instead of broad non-compliance.",
      },
      controls: [
        {
          name: "Model Usage Policy",
          detail: "Enterprise GPT-4 reasoning tier limits enforced by workflow policy.",
          status: "green",
          label: "Compliant",
        },
        {
          name: "Data Privacy Controls",
          detail: "PII masking and outbound prompt filters active across delivery assistants.",
          status: "green",
          label: "Enforced",
        },
        {
          name: "Prompt Injection Guard",
          detail: "3 suspicious prompt patterns quarantined in non-production review queues.",
          status: "amber",
          label: "Review Req",
        },
        {
          name: "Output Quality Threshold",
          detail: "Hallucination score remains below 0.1% on approved enterprise workflows.",
          status: "green",
          label: "Passing",
        },
        {
          name: "Cost Budget Alerts",
          detail: "Q2 AI budget is at 82% utilization and within CFO guardrails.",
          status: "amber",
          label: "Warning",
        },
        {
          name: "Audit Logging",
          detail: "All agent actions and human approvals written to immutable cold storage.",
          status: "green",
          label: "Active",
        },
      ],
    },
    economics: {
      byWorkflow: [
        { id: "planning", label: "Planning / Refinement", baseline: 260, pilot: 290, format: "currencyK" },
        { id: "build", label: "Build / Test / Review", baseline: 630, pilot: 710, format: "currencyK" },
        { id: "run", label: "Run / Support", baseline: 350, pilot: 310, format: "currencyK" },
      ],
      modelMix: [
        { label: "Reasoning tier", share: 34, className: "mix-segment--one" },
        { label: "Fast completion tier", share: 29, className: "mix-segment--two" },
        { label: "Embedding / retrieval", share: 21, className: "mix-segment--three" },
        { label: "Policy and safety", share: 16, className: "mix-segment--four" },
      ],
      summary: [
        {
          label: "Cost per assisted outcome",
          definition: "Average AI spend for each completed assisted outcome across approved workflows.",
          baseline: 18.9,
          pilot: 14.8,
          format: "currency",
          improve: "down",
        },
        {
          label: "Model concentration risk",
          definition: "Share of spend concentrated in the primary model family.",
          baseline: 58,
          pilot: 44,
          format: "percent",
          improve: "down",
        },
      ],
      notes: {
        baseline: "Baseline spend is lower because usage is sparse, but unit economics are weaker and outcomes are slower.",
        pilot: "Pilot spend is higher in absolute terms, yet unit cost per assisted outcome is down and model mix is healthier.",
      },
    },
    actions: [
      {
        workflow: "planning",
        title: "Expand the green-list for planning copilots across tier-2 demand intake",
        owner: "Enterprise Architecture",
        due: "18 Apr 2026",
        impact: "Unlock +12 pts workflow coverage",
      },
      {
        workflow: "build",
        title: "Require evidence-pack auto-attach on AI-assisted pull requests",
        owner: "Quality Engineering",
        due: "22 Apr 2026",
        impact: "Lift audit completeness by 3 pts",
      },
      {
        workflow: "build",
        title: "Shift routine test generation to the efficient model tier",
        owner: "FinOps",
        due: "26 Apr 2026",
        impact: "Reduce annual run-rate by $110K",
      },
      {
        workflow: "run",
        title: "Scale supervised incident triage to all P2 and P3 queues",
        owner: "Service Operations",
        due: "30 Apr 2026",
        impact: "Cut MTTR by 1.1 hours",
      },
      {
        workflow: "all",
        title: "Close the amber use-case review backlog with a monthly CIO risk forum",
        owner: "Risk & Compliance",
        due: "03 May 2026",
        impact: "Remove 6 active exceptions",
      },
    ],
    roadmap: [
      {
        window: "30 days",
        title: "Stabilize the operating baseline",
        items: [
          "Standardize approved assistant patterns for planning, code review, and incident triage.",
          "Automate evidence capture for AI-assisted work in the engineering toolchain.",
          "Publish a shared cost guardrail with workflow-level budgets.",
        ],
      },
      {
        window: "60 days",
        title: "Scale safe adoption",
        items: [
          "Extend green use cases into adjacent service and platform teams.",
          "Roll out model-routing by task type to lower completion spend.",
          "Reduce amber approval time with pre-cleared control templates.",
        ],
      },
      {
        window: "90 days",
        title: "Move to portfolio governance",
        items: [
          "Embed AI metrics into the standard CIO monthly operating review.",
          "Tie product funding gates to evidence completeness and guardrail performance.",
          "Set target state for enterprise-wide AI delivery run-rate and realized savings.",
        ],
      },
    ],
  },
  product: {
    label: "Digital Products",
    scope: "14 product lines | 2,100 engineers, designers, and quality leads",
    updatedAt: {
      "last-30": "Last updated 07 Apr 2026, 08:15 BST",
      "q1-2026": "Last updated 31 Mar 2026, 17:45 BST",
      "q2-2026": "Last updated 07 Apr 2026, 08:15 BST",
    },
    dataSources: [
      "Product delivery dashboard",
      "GitHub Enterprise checks",
      "Automated test telemetry",
      "FinOps AI ledger",
      "Control Tower policy registry",
      "Release evidence store",
    ],
    kpis: [
      {
        label: "Net Productivity Gain",
        definition: "Estimated change in assisted delivery output after normalizing for product portfolio mix.",
        baseline: 0,
        pilot: 22,
        target: 25,
        format: "percent",
        improve: "up",
      },
      {
        label: "AI Workflow Coverage",
        definition: "Share of product delivery workflows using approved AI assistance patterns.",
        baseline: 28,
        pilot: 68,
        target: 78,
        format: "percent",
        improve: "up",
      },
      {
        label: "Delivery Flow Index",
        definition: "Composite score for throughput, delay, predictability, and queue health across product squads.",
        baseline: 70,
        pilot: 81,
        target: 86,
        format: "index",
        improve: "up",
      },
      {
        label: "Quality Guardrail",
        definition: "Weighted score across defect escape, test reliability, and release stability.",
        baseline: 90,
        pilot: 95,
        target: 97,
        format: "percent",
        improve: "up",
      },
      {
        label: "Governance Compliance",
        definition: "Share of AI-assisted product work running with approved controls and evidence.",
        baseline: 91,
        pilot: 97,
        target: 99,
        format: "percent",
        improve: "up",
      },
      {
        label: "AI Run-Rate Cost",
        definition: "Annualized AI operating spend for the digital product estate.",
        baseline: 1.08,
        pilot: 1.16,
        target: 1.05,
        format: "currencyM",
        improve: "down",
      },
    ],
    swimlanes: [
      {
        id: "planning",
        title: "Planning / Refinement",
        valueMetric: {
          label: "Decision latency",
          definition: "Median elapsed time from intake to approved scope decision.",
          baseline: 8.1,
          pilot: 5.9,
          format: "days",
          improve: "down",
        },
        riskMetric: {
          label: "Requirements quality score",
          definition: "Quality score for backlog items entering delivery.",
          baseline: 89,
          pilot: 94,
          format: "percent",
          improve: "up",
        },
        interpretation: {
          baseline: "Product planning still depends on manual backlog shaping and PM review bottlenecks.",
          pilot: "AI-assisted briefs are helping squads reach implementation-ready scope faster and with fewer missed dependencies.",
        },
      },
      {
        id: "build",
        title: "Build / Test / Review",
        valueMetric: {
          label: "PR cycle time",
          definition: "Median time from pull request open to approved merge.",
          baseline: 27,
          pilot: 19,
          format: "hours",
          improve: "down",
        },
        riskMetric: {
          label: "Critical rework rate",
          definition: "Share of completed work reopened for material remediation.",
          baseline: 9.6,
          pilot: 6.2,
          format: "percent",
          improve: "down",
        },
        interpretation: {
          baseline: "Engineering velocity is solid, but review handoffs and flaky test evidence still create churn.",
          pilot: "The strongest return is in build flow, especially where assisted code review and test authoring are fully approved.",
        },
      },
      {
        id: "run",
        title: "Run / Support",
        valueMetric: {
          label: "Mean time to resolve",
          definition: "Average time to restore service for priority incidents touched by AI-assisted support workflows.",
          baseline: 5.8,
          pilot: 4.4,
          format: "hours",
          improve: "down",
        },
        riskMetric: {
          label: "Change failure rate",
          definition: "Share of changes that trigger rollback, hotfix, or incident activity.",
          baseline: 8.4,
          pilot: 5.9,
          format: "percent",
          improve: "down",
        },
        interpretation: {
          baseline: "Support performance is acceptable, but incident context is still fragmented across tools.",
          pilot: "Operational gains are emerging, though adoption remains more mature in build than in run workflows.",
        },
      },
    ],
    trends: [
      {
        title: "Adoption",
        definition: "Approved AI-assisted workflow coverage across the digital product chain.",
        baseline: 28,
        current: 68,
        target: 78,
        format: "percent",
        improve: "up",
      },
      {
        title: "Flow",
        definition: "Product flow score derived from throughput, delay, and predictability.",
        baseline: 70,
        current: 81,
        target: 86,
        format: "index",
        improve: "up",
      },
      {
        title: "Quality",
        definition: "Composite quality guardrail score for product delivery.",
        baseline: 90,
        current: 95,
        target: 97,
        format: "percent",
        improve: "up",
      },
      {
        title: "Cost",
        definition: "Annualized AI run-rate cost for the product estate.",
        baseline: 1.08,
        current: 1.16,
        target: 1.05,
        format: "currencyM",
        improve: "down",
      },
    ],
    governance: {
      useCases: [
        {
          label: "Green use cases",
          detail: "Standard copilots and bounded automation",
          baseline: 11,
          pilot: 23,
          status: "green",
        },
        {
          label: "Amber use cases",
          detail: "Supervised workflows awaiting scaled approval",
          baseline: 7,
          pilot: 6,
          status: "amber",
        },
        {
          label: "Red use cases",
          detail: "Restricted or under exception review",
          baseline: 4,
          pilot: 1,
          status: "red",
        },
      ],
      metrics: [
        {
          label: "Policy exceptions",
          definition: "Active exceptions requiring governance approval to continue operating.",
          baseline: 9,
          pilot: 3,
          format: "count",
          improve: "down",
        },
        {
          label: "Human review override rate",
          definition: "Share of AI-assisted actions escalated or overturned during mandatory human review.",
          baseline: 14,
          pilot: 7,
          format: "percent",
          improve: "down",
        },
        {
          label: "Audit evidence completeness",
          definition: "Share of in-scope AI activity with complete linked evidence.",
          baseline: 87,
          pilot: 96,
          format: "percent",
          improve: "up",
        },
      ],
      notes: {
        baseline: "Product teams had lighter controls before scale, with approval patterns varying significantly by squad.",
        pilot: "Governance is now mostly standardized, but build-time evidence capture remains the gating factor for further rollout.",
      },
      riskSummary: [
        {
          label: "High-risk routes with full control pack",
          definition: "Share of product routes with the highest inherent AI risk operating with full approval, evidence, and review controls.",
          tone: "risk",
          format: "percent",
          baseline: {
            value: 73,
            routes: 6,
            note: "High-risk product routes were governed unevenly across squads, especially where customer-impacting release decisions were involved.",
          },
          pilot: {
            value: 92,
            routes: 7,
            note: "Only 1 high-risk product route remains in exception review while the final release-control evidence is completed.",
          },
        },
        {
          label: "Critical workflows with complete evidence",
          definition: "Share of release-critical and customer-critical workflows with the evidence needed to defend rollout and rollback decisions.",
          tone: "watch",
          format: "percent",
          baseline: {
            value: 78,
            routes: 13,
            note: "Evidence capture was strongest in regulated releases and weakest in faster-moving squad-level workflows.",
          },
          pilot: {
            value: 94,
            routes: 18,
            note: "Critical product workflows now carry consistent evidence capture, with only a few legacy release templates still uneven.",
          },
        },
        {
          label: "Sensitive-data routes with masking and logging",
          definition: "Share of data-sensitive product workflows running with masking, audit logging, and policy-approved outbound prompt paths.",
          tone: "watch",
          format: "percent",
          baseline: {
            value: 84,
            routes: 4,
            note: "Sensitive product-data routes were better controlled than average, but not yet consistent enough for scaled confidence.",
          },
          pilot: {
            value: 96,
            routes: 5,
            note: "The product estate is close to target-state here, with one newly expanded route still under heightened review.",
          },
        },
      ],
      riskBreakdown: [
        {
          title: "Risk tier",
          description: "This shows whether governance is holding strongest where product decisions, content, or automation can materially affect customers.",
          items: [
            {
              label: "High tier",
              detail: "Release-shaping, customer-facing, or policy-sensitive product routes.",
              tone: "risk",
              baseline: { count: 6, coverage: 73, exceptions: 3 },
              pilot: { count: 7, coverage: 92, exceptions: 1 },
            },
            {
              label: "Medium tier",
              detail: "Material product workflows with bounded rollback and oversight paths.",
              tone: "watch",
              baseline: { count: 10, coverage: 84, exceptions: 3 },
              pilot: { count: 14, coverage: 95, exceptions: 1 },
            },
            {
              label: "Low tier",
              detail: "Lower-blast-radius assists such as discovery, drafting, and bounded review tasks.",
              tone: "good",
              baseline: { count: 6, coverage: 95, exceptions: 1 },
              pilot: { count: 9, coverage: 99, exceptions: 0 },
            },
          ],
        },
        {
          title: "Service criticality",
          description: "Criticality makes it clear which product routes need stronger evidence and approval because failure would hit releases or customers directly.",
          items: [
            {
              label: "Release-critical",
              detail: "Routes that influence shipping decisions, release readiness, or customer-visible changes.",
              tone: "risk",
              baseline: { count: 5, coverage: 78, exceptions: 2 },
              pilot: { count: 6, coverage: 94, exceptions: 1 },
            },
            {
              label: "Customer-critical",
              detail: "Workflows where degraded output would materially affect customer support or product outcomes.",
              tone: "watch",
              baseline: { count: 8, coverage: 82, exceptions: 3 },
              pilot: { count: 12, coverage: 94, exceptions: 1 },
            },
            {
              label: "Standard product ops",
              detail: "Lower-criticality internal product workflows with more recoverable failure paths.",
              tone: "good",
              baseline: { count: 9, coverage: 93, exceptions: 1 },
              pilot: { count: 12, coverage: 98, exceptions: 0 },
            },
          ],
        },
        {
          title: "Data sensitivity",
          description: "This cuts the same routes by how sensitive the underlying data is, which changes the control burden materially.",
          items: [
            {
              label: "Restricted customer data",
              detail: "Routes operating on regulated customer fields or highly sensitive user data.",
              tone: "risk",
              baseline: { count: 4, coverage: 84, exceptions: 2 },
              pilot: { count: 5, coverage: 95, exceptions: 1 },
            },
            {
              label: "Confidential product data",
              detail: "Commercially sensitive product and roadmap material.",
              tone: "watch",
              baseline: { count: 9, coverage: 79, exceptions: 3 },
              pilot: { count: 13, coverage: 93, exceptions: 1 },
            },
            {
              label: "Internal engineering data",
              detail: "Lower-sensitivity internal engineering and release-support content.",
              tone: "good",
              baseline: { count: 9, coverage: 94, exceptions: 1 },
              pilot: { count: 12, coverage: 98, exceptions: 0 },
            },
          ],
        },
      ],
      riskNote: {
        baseline:
          "Product governance looked acceptable in aggregate, but the gaps were concentrated in higher-risk routes and customer-facing release flows rather than evenly spread.",
        pilot:
          "Pilot controls are materially stronger; the remaining work is concentrated in the smallest number of customer-critical and sensitive-data routes.",
      },
      complianceFrameworks: [
        {
          name: "Meridian AI Policy",
          owner: "Product Governance",
          baseline: {
            readiness: 86,
            controlsReady: 31,
            controlsTotal: 36,
            gap: "Squad-level release evidence was still inconsistent across faster-moving product lanes.",
          },
          pilot: {
            readiness: 96,
            controlsReady: 35,
            controlsTotal: 36,
            gap: "One product release lane still needs a final evidence automation join before it reads fully closed.",
          },
        },
        {
          name: "ISO/IEC 42001",
          owner: "Product AI PMO",
          baseline: {
            readiness: 74,
            controlsReady: 19,
            controlsTotal: 25,
            gap: "Management-system artifacts were present, but supplier and release-governance evidence was uneven.",
          },
          pilot: {
            readiness: 90,
            controlsReady: 23,
            controlsTotal: 25,
            gap: "The remaining work is less policy design and more repeatable quarterly proof in release operations.",
          },
        },
        {
          name: "NIST AI RMF",
          owner: "Product Risk Office",
          baseline: {
            readiness: 79,
            controlsReady: 22,
            controlsTotal: 27,
            gap: "Governance was strongest in review, weaker in monitor and respond across customer-critical routes.",
          },
          pilot: {
            readiness: 91,
            controlsReady: 25,
            controlsTotal: 27,
            gap: "Residual gaps are centered on monitoring and evidence freshness for a few product-critical paths.",
          },
        },
        {
          name: "EU AI Act",
          owner: "Legal + Product Governance",
          baseline: {
            readiness: 71,
            controlsReady: 17,
            controlsTotal: 24,
            gap: "Customer-impact classification and release-grade documentation were still too variable across squads.",
          },
          pilot: {
            readiness: 87,
            controlsReady: 21,
            controlsTotal: 24,
            gap: "Two documentation joins still need automation before the whole product slice looks defensible end to end.",
          },
        },
      ],
      complianceMatrix: [
        {
          control: "Model inventory and release classification",
          frameworks: ["Policy", "ISO 42001", "EU AI Act"],
          owner: "Product Governance",
          baseline: {
            readiness: 84,
            gap: "A few older copilots still lacked clean release-tier classification and inventory traceability.",
          },
          pilot: {
            readiness: 96,
            gap: "Only one inherited release lane still needs its final classification evidence refresh.",
          },
        },
        {
          control: "Sensitive-data handling and outbound controls",
          frameworks: ["Policy", "NIST AI RMF", "EU AI Act"],
          owner: "Data Protection Office",
          baseline: {
            readiness: 87,
            gap: "Masking was strong, but outbound attestation on one customer-data path was still manual.",
          },
          pilot: {
            readiness: 97,
            gap: "One high-sensitivity route still needs a final attestation automation join.",
          },
        },
        {
          control: "Human approval and release gating",
          frameworks: ["Policy", "NIST AI RMF", "EU AI Act"],
          owner: "Release Governance",
          baseline: {
            readiness: 76,
            gap: "Manual release-gate evidence made higher-risk approvals slower and less consistent than they should have been.",
          },
          pilot: {
            readiness: 92,
            gap: "One release-critical workflow still depends on a curated gate pack rather than a fully automated one.",
          },
        },
        {
          control: "Prompt security and abuse testing",
          frameworks: ["Policy", "ISO 42001", "NIST AI RMF"],
          owner: "Product Security",
          baseline: {
            readiness: 73,
            gap: "Developer-sandbox prompt assets had weaker repeat abuse coverage than released product routes.",
          },
          pilot: {
            readiness: 88,
            gap: "A small set of legacy prompt assets still needs repeat abuse testing to match the rest of the estate.",
          },
        },
        {
          control: "Evaluation, grounding, and release quality",
          frameworks: ["Policy", "ISO 42001", "NIST AI RMF"],
          owner: "Product Quality",
          baseline: {
            readiness: 79,
            gap: "Release-quality evidence was present, but not yet uniformly attached to every customer-impacting route.",
          },
          pilot: {
            readiness: 91,
            gap: "Residual gaps are mostly in repeat evaluation evidence, not in outright missing control design.",
          },
        },
        {
          control: "Audit logging and evidence retention",
          frameworks: ["Policy", "ISO 42001", "EU AI Act"],
          owner: "Internal Audit Platform",
          baseline: {
            readiness: 85,
            gap: "Retention was strong, but evidence linkage still varied by squad and release template.",
          },
          pilot: {
            readiness: 96,
            gap: "One legacy release template still needs a final retention-control attestation.",
          },
        },
      ],
      complianceNote: {
        baseline:
          "In product, framework readiness was mostly limited by release-governance evidence and customer-impact documentation, not by missing policy language.",
        pilot:
          "The matrix now shows that the remaining product gaps sit in a narrow band of release-control and documentation joins rather than broad control failure.",
      },
      controls: [
        {
          name: "Model Usage Policy",
          detail: "Reasoning-model use is capped by task type and product release tier.",
          status: "green",
          label: "Compliant",
        },
        {
          name: "Data Privacy Controls",
          detail: "Sensitive customer fields masked before prompts leave product environments.",
          status: "green",
          label: "Enforced",
        },
        {
          name: "Prompt Injection Guard",
          detail: "2 suspicious prompt patterns detected in pre-release developer sandboxes.",
          status: "amber",
          label: "Review Req",
        },
        {
          name: "Output Quality Threshold",
          detail: "Approved product copilots remain within release-quality tolerance bands.",
          status: "green",
          label: "Passing",
        },
        {
          name: "Cost Budget Alerts",
          detail: "Product AI spend is at 86% of quarter-to-date forecast after test expansion.",
          status: "amber",
          label: "Warning",
        },
        {
          name: "Audit Logging",
          detail: "AI-assisted review decisions and evidence links are retained in the release store.",
          status: "green",
          label: "Active",
        },
      ],
    },
    economics: {
      byWorkflow: [
        { id: "planning", label: "Planning / Refinement", baseline: 230, pilot: 250, format: "currencyK" },
        { id: "build", label: "Build / Test / Review", baseline: 550, pilot: 610, format: "currencyK" },
        { id: "run", label: "Run / Support", baseline: 300, pilot: 300, format: "currencyK" },
      ],
      modelMix: [
        { label: "Reasoning tier", share: 31, className: "mix-segment--one" },
        { label: "Fast completion tier", share: 35, className: "mix-segment--two" },
        { label: "Embedding / retrieval", share: 18, className: "mix-segment--three" },
        { label: "Policy and safety", share: 16, className: "mix-segment--four" },
      ],
      summary: [
        {
          label: "Cost per assisted outcome",
          definition: "Average AI spend for each completed assisted outcome across approved workflows.",
          baseline: 16.8,
          pilot: 12.9,
          format: "currency",
          improve: "down",
        },
        {
          label: "Model concentration risk",
          definition: "Share of spend concentrated in the primary model family.",
          baseline: 53,
          pilot: 41,
          format: "percent",
          improve: "down",
        },
      ],
      notes: {
        baseline: "Product delivery had better unit economics than enterprise average, but still carried avoidable premium model usage.",
        pilot: "Cost per outcome is down sharply; the next executive lever is routing more test and review work to lower-cost tiers.",
      },
    },
    actions: [
      {
        workflow: "build",
        title: "Make AI-generated test evidence mandatory in release readiness reviews",
        owner: "Product Quality",
        due: "17 Apr 2026",
        impact: "Reduce rework by 2.1 pts",
      },
      {
        workflow: "planning",
        title: "Scale assisted discovery briefs to all new digital initiatives",
        owner: "Product Management",
        due: "21 Apr 2026",
        impact: "Shorten scope approval by 1.4 days",
      },
      {
        workflow: "build",
        title: "Tune model routing for code review and regression generation",
        owner: "Engineering Enablement",
        due: "28 Apr 2026",
        impact: "Lower annual spend by $85K",
      },
      {
        workflow: "run",
        title: "Extend support copilots into post-release monitoring workflows",
        owner: "SRE",
        due: "02 May 2026",
        impact: "Improve MTTR by 0.8 hours",
      },
      {
        workflow: "all",
        title: "Set product-line adoption targets in the monthly delivery review",
        owner: "CIO Chief of Staff",
        due: "05 May 2026",
        impact: "Increase coverage accountability",
      },
    ],
    roadmap: [
      {
        window: "30 days",
        title: "Tighten product delivery controls",
        items: [
          "Standardize the approved AI workflow playbook for squads and release managers.",
          "Close evidence gaps on test generation and code review.",
          "Add cost routing defaults by task type in the product platform.",
        ],
      },
      {
        window: "60 days",
        title: "Scale adoption into adjacent squads",
        items: [
          "Extend assisted backlog shaping to all active roadmap streams.",
          "Broaden supervised support copilots for release operations.",
          "Push exception handling into a single product governance lane.",
        ],
      },
      {
        window: "90 days",
        title: "Institutionalize outcomes",
        items: [
          "Tie product funding reviews to delivery flow and quality guardrails.",
          "Bake AI economics into quarterly planning and platform chargeback.",
          "Publish a reusable AI operating model for new product launches.",
        ],
      },
    ],
  },
  operations: {
    label: "RunOps & Support",
    scope: "9 service towers | 1,600 operators, platform engineers, and analysts",
    updatedAt: {
      "last-30": "Last updated 07 Apr 2026, 07:55 BST",
      "q1-2026": "Last updated 31 Mar 2026, 17:30 BST",
      "q2-2026": "Last updated 07 Apr 2026, 07:55 BST",
    },
    dataSources: [
      "ServiceNow incident telemetry",
      "Platform reliability dashboard",
      "Runbook automation logs",
      "FinOps AI ledger",
      "Control Tower policy registry",
      "Audit evidence store",
    ],
    kpis: [
      {
        label: "Net Productivity Gain",
        definition: "Estimated change in assisted operations throughput after normalizing for case mix and tower complexity.",
        baseline: 0,
        pilot: 14,
        target: 18,
        format: "percent",
        improve: "up",
      },
      {
        label: "AI Workflow Coverage",
        definition: "Share of support and operations workflows using approved AI assistance patterns.",
        baseline: 21,
        pilot: 56,
        target: 68,
        format: "percent",
        improve: "up",
      },
      {
        label: "Delivery Flow Index",
        definition: "Composite score for service flow, delay, predictability, and queue health.",
        baseline: 69,
        pilot: 76,
        target: 82,
        format: "index",
        improve: "up",
      },
      {
        label: "Quality Guardrail",
        definition: "Weighted score across resolution quality, rollback risk, and change stability.",
        baseline: 92,
        pilot: 94,
        target: 96,
        format: "percent",
        improve: "up",
      },
      {
        label: "Governance Compliance",
        definition: "Share of AI-assisted operations activity inside approved control boundaries.",
        baseline: 95,
        pilot: 99,
        target: 99.5,
        format: "percent",
        improve: "up",
      },
      {
        label: "AI Run-Rate Cost",
        definition: "Annualized AI operating spend for operations and support workflows.",
        baseline: 0.92,
        pilot: 0.98,
        target: 0.89,
        format: "currencyM",
        improve: "down",
      },
    ],
    swimlanes: [
      {
        id: "planning",
        title: "Planning / Refinement",
        valueMetric: {
          label: "Decision latency",
          definition: "Median elapsed time from intake to approved scope decision.",
          baseline: 6.4,
          pilot: 5.1,
          format: "days",
          improve: "down",
        },
        riskMetric: {
          label: "Playbook quality score",
          definition: "Quality score for operational runbooks and escalation playbooks entering active use.",
          baseline: 91,
          pilot: 95,
          format: "percent",
          improve: "up",
        },
        interpretation: {
          baseline: "Operations planning is more mature than product planning, but playbook updates are still slow to approve.",
          pilot: "The biggest near-term gain is faster refinement of runbooks and operating procedures for common incident classes.",
        },
      },
      {
        id: "build",
        title: "Build / Test / Review",
        valueMetric: {
          label: "Automation release cycle",
          definition: "Median time from automation change open to approved production deployment.",
          baseline: 19,
          pilot: 16,
          format: "hours",
          improve: "down",
        },
        riskMetric: {
          label: "Rollback risk",
          definition: "Share of automation changes requiring rollback or rapid remediation.",
          baseline: 7.4,
          pilot: 6.1,
          format: "percent",
          improve: "down",
        },
        interpretation: {
          baseline: "Automation changes are relatively controlled, but reviews remain expert-dependent and slow to scale.",
          pilot: "Assisted review is improving release confidence, though benefits are smaller than in digital product engineering.",
        },
      },
      {
        id: "run",
        title: "Run / Support",
        valueMetric: {
          label: "Mean time to resolve",
          definition: "Average time to restore service for priority incidents touched by AI-assisted support workflows.",
          baseline: 4.9,
          pilot: 3.2,
          format: "hours",
          improve: "down",
        },
        riskMetric: {
          label: "Policy-compliant resolution",
          definition: "Share of incidents resolved with full control adherence and traceable action evidence.",
          baseline: 88,
          pilot: 96,
          format: "percent",
          improve: "up",
        },
        interpretation: {
          baseline: "Run operations already have clear procedures, but incident context gathering is manual and time-consuming.",
          pilot: "This is the most compelling lane for RunOps: faster resolution with stronger policy traceability than the baseline.",
        },
      },
    ],
    trends: [
      {
        title: "Adoption",
        definition: "Approved AI-assisted workflow coverage across support and operations.",
        baseline: 21,
        current: 56,
        target: 68,
        format: "percent",
        improve: "up",
      },
      {
        title: "Flow",
        definition: "Operations flow score derived from throughput, delay, and predictability.",
        baseline: 69,
        current: 76,
        target: 82,
        format: "index",
        improve: "up",
      },
      {
        title: "Quality",
        definition: "Composite quality guardrail score for support and reliability outcomes.",
        baseline: 92,
        current: 94,
        target: 96,
        format: "percent",
        improve: "up",
      },
      {
        title: "Cost",
        definition: "Annualized AI run-rate cost for operations and support workflows.",
        baseline: 0.92,
        current: 0.98,
        target: 0.89,
        format: "currencyM",
        improve: "down",
      },
    ],
    governance: {
      useCases: [
        {
          label: "Green use cases",
          detail: "Standard copilots and bounded automation",
          baseline: 12,
          pilot: 22,
          status: "green",
        },
        {
          label: "Amber use cases",
          detail: "Supervised workflows awaiting scaled approval",
          baseline: 5,
          pilot: 4,
          status: "amber",
        },
        {
          label: "Red use cases",
          detail: "Restricted or under exception review",
          baseline: 2,
          pilot: 1,
          status: "red",
        },
      ],
      metrics: [
        {
          label: "Policy exceptions",
          definition: "Active exceptions requiring governance approval to continue operating.",
          baseline: 6,
          pilot: 2,
          format: "count",
          improve: "down",
        },
        {
          label: "Human review override rate",
          definition: "Share of AI-assisted actions escalated or overturned during mandatory human review.",
          baseline: 10,
          pilot: 4,
          format: "percent",
          improve: "down",
        },
        {
          label: "Audit evidence completeness",
          definition: "Share of in-scope AI activity with complete linked evidence.",
          baseline: 90,
          pilot: 99,
          format: "percent",
          improve: "up",
        },
      ],
      notes: {
        baseline: "Operations already run with stronger controls, but evidence is split across multiple reliability systems.",
        pilot: "Pilot scope is close to target-state compliance; the remaining gap is broader adoption, not governance quality.",
      },
      riskSummary: [
        {
          label: "High-risk routes with full control pack",
          definition: "Share of operations routes with the highest inherent AI risk operating with the required approval, evidence, and supervised fallback controls.",
          tone: "watch",
          format: "percent",
          baseline: {
            value: 82,
            routes: 4,
            note: "Operations started from a stronger base, but a small number of high-risk runbook routes still needed exception handling.",
          },
          pilot: {
            value: 96,
            routes: 5,
            note: "High-risk operations routes are now almost fully controlled, with no open broad-scale exceptions.",
          },
        },
        {
          label: "Critical workflows with complete evidence",
          definition: "Share of production-critical and time-sensitive support routes with complete evidence, traceability, and rollback-ready approval coverage.",
          tone: "watch",
          format: "percent",
          baseline: {
            value: 88,
            routes: 11,
            note: "Evidence was strong but scattered across multiple operations systems, which created friction during review.",
          },
          pilot: {
            value: 98,
            routes: 15,
            note: "Critical operations evidence is now near target-state, which is why governance is no longer the main blocker to adoption.",
          },
        },
        {
          label: "Sensitive-data routes with masking and logging",
          definition: "Share of credential, secret, or customer-ops workflows operating with enforced redaction and immutable logging.",
          tone: "good",
          format: "percent",
          baseline: {
            value: 93,
            routes: 4,
            note: "Sensitive-data control quality was already stronger than the rest of the portfolio, even before the pilot uplift.",
          },
          pilot: {
            value: 99,
            routes: 5,
            note: "Restricted operations data is essentially at target-state control coverage in the current pilot slice.",
          },
        },
      ],
      riskBreakdown: [
        {
          title: "Risk tier",
          description: "Operations governance is already stronger overall, so this view helps isolate whether any concentrated risk still remains.",
          items: [
            {
              label: "High tier",
              detail: "Incident, remediation, or automation routes with material service or control impact.",
              tone: "watch",
              baseline: { count: 4, coverage: 82, exceptions: 2 },
              pilot: { count: 5, coverage: 96, exceptions: 0 },
            },
            {
              label: "Medium tier",
              detail: "Material support workflows with supervised execution and bounded blast radius.",
              tone: "watch",
              baseline: { count: 7, coverage: 88, exceptions: 2 },
              pilot: { count: 9, coverage: 98, exceptions: 0 },
            },
            {
              label: "Low tier",
              detail: "Lower-risk operational assists with strong containment and rollback options.",
              tone: "good",
              baseline: { count: 8, coverage: 96, exceptions: 0 },
              pilot: { count: 13, coverage: 100, exceptions: 0 },
            },
          ],
        },
        {
          title: "Service criticality",
          description: "Criticality matters most in operations because even a well-governed route can be unacceptable if it fails in a production-critical context.",
          items: [
            {
              label: "Production-critical",
              detail: "Routes used in live incident handling, service restoration, or sensitive automation decisions.",
              tone: "watch",
              baseline: { count: 5, coverage: 84, exceptions: 1 },
              pilot: { count: 7, coverage: 97, exceptions: 0 },
            },
            {
              label: "Time-sensitive support",
              detail: "Support workflows where speed matters and degraded evidence can still create operational exposure.",
              tone: "watch",
              baseline: { count: 6, coverage: 89, exceptions: 1 },
              pilot: { count: 8, coverage: 98, exceptions: 0 },
            },
            {
              label: "Standard automation",
              detail: "Lower-criticality runbook and workflow assists with clearer containment paths.",
              tone: "good",
              baseline: { count: 8, coverage: 95, exceptions: 0 },
              pilot: { count: 12, coverage: 99, exceptions: 0 },
            },
          ],
        },
        {
          title: "Data sensitivity",
          description: "This cut separates routes handling secrets, credentials, and customer operations data from lower-sensitivity internal runbooks.",
          items: [
            {
              label: "Secrets and credentials",
              detail: "Routes touching privileged operational data or restricted credential material.",
              tone: "good",
              baseline: { count: 4, coverage: 93, exceptions: 1 },
              pilot: { count: 5, coverage: 99, exceptions: 0 },
            },
            {
              label: "Customer ops data",
              detail: "Sensitive service and support data where traceability and redaction remain important.",
              tone: "watch",
              baseline: { count: 6, coverage: 88, exceptions: 1 },
              pilot: { count: 8, coverage: 97, exceptions: 0 },
            },
            {
              label: "Internal runbooks",
              detail: "Internal-only operational guidance with lower data-sensitivity burden.",
              tone: "good",
              baseline: { count: 9, coverage: 95, exceptions: 0 },
              pilot: { count: 14, coverage: 100, exceptions: 0 },
            },
          ],
        },
      ],
      riskNote: {
        baseline:
          "Operations governance was already comparatively mature, but the concentrated view still matters because production-critical routes carry much higher consequence if controls slip.",
        pilot:
          "The remaining governance gap is narrow and concentrated. Most operations routes are already at or near target-state across tier, criticality, and sensitivity.",
      },
      complianceFrameworks: [
        {
          name: "Meridian AI Policy",
          owner: "Operations Control Tower",
          baseline: {
            readiness: 90,
            controlsReady: 32,
            controlsTotal: 36,
            gap: "Evidence was strong, but spread across too many reliability systems to feel operationally simple.",
          },
          pilot: {
            readiness: 99,
            controlsReady: 36,
            controlsTotal: 36,
            gap: "The operating gap is now more about adoption scale than framework readiness.",
          },
        },
        {
          name: "ISO/IEC 42001",
          owner: "Operations AI PMO",
          baseline: {
            readiness: 81,
            controlsReady: 20,
            controlsTotal: 25,
            gap: "Management proof was present, but still split across reliability and support toolchains.",
          },
          pilot: {
            readiness: 94,
            controlsReady: 24,
            controlsTotal: 25,
            gap: "Only one quarterly proof point still depends on curated cross-system compilation.",
          },
        },
        {
          name: "NIST AI RMF",
          owner: "Service Risk Office",
          baseline: {
            readiness: 84,
            controlsReady: 23,
            controlsTotal: 27,
            gap: "Monitor and respond evidence was strongest, but govern documentation still had a few fragmented joins.",
          },
          pilot: {
            readiness: 96,
            controlsReady: 26,
            controlsTotal: 27,
            gap: "Remaining gaps are evidence-join quality issues rather than missing safety or oversight design.",
          },
        },
        {
          name: "EU AI Act",
          owner: "Legal + Operations Risk",
          baseline: {
            readiness: 77,
            controlsReady: 19,
            controlsTotal: 24,
            gap: "Customer-ops classification and post-deployment documentation were still partially curated.",
          },
          pilot: {
            readiness: 91,
            controlsReady: 22,
            controlsTotal: 24,
            gap: "Residual work is concentrated in a small number of post-market monitoring and documentation joins.",
          },
        },
      ],
      complianceMatrix: [
        {
          control: "Route inventory and operational classification",
          frameworks: ["Policy", "ISO 42001", "EU AI Act"],
          owner: "Operations Control Tower",
          baseline: {
            readiness: 88,
            gap: "A few inherited runbooks still lacked a clean, formal criticality classification.",
          },
          pilot: {
            readiness: 98,
            gap: "One final inherited route still needs a refreshed classification pack.",
          },
        },
        {
          control: "Secrets, customer data, and redaction controls",
          frameworks: ["Policy", "NIST AI RMF", "EU AI Act"],
          owner: "Security Engineering",
          baseline: {
            readiness: 92,
            gap: "Controls were strong, but one customer-ops path still relied on manual proof during review.",
          },
          pilot: {
            readiness: 99,
            gap: "This is essentially closed; the last issue is a documentation join, not a live control weakness.",
          },
        },
        {
          control: "Human supervision and rollback readiness",
          frameworks: ["Policy", "NIST AI RMF", "EU AI Act"],
          owner: "Service Risk Office",
          baseline: {
            readiness: 84,
            gap: "Rollback and escalation evidence was present, but too spread out across operations systems.",
          },
          pilot: {
            readiness: 97,
            gap: "Only one production-critical route still needs its final rollback attestation linked automatically.",
          },
        },
        {
          control: "Prompt security and abuse testing",
          frameworks: ["Policy", "ISO 42001", "NIST AI RMF"],
          owner: "Platform Security",
          baseline: {
            readiness: 78,
            gap: "Abuse testing was solid, but repeat coverage on inherited runbook prompts was not yet universal.",
          },
          pilot: {
            readiness: 92,
            gap: "Residual work sits in one older runbook family, not across the broader operations estate.",
          },
        },
        {
          control: "Grounding, evaluation, and resolution quality",
          frameworks: ["Policy", "ISO 42001", "NIST AI RMF"],
          owner: "Operations Quality",
          baseline: {
            readiness: 86,
            gap: "Resolution-quality evidence was strong, but route-level eval joins were still fragmented across towers.",
          },
          pilot: {
            readiness: 96,
            gap: "One tower still needs its final evaluation evidence to move from curated to repeatable.",
          },
        },
        {
          control: "Audit logging and retention",
          frameworks: ["Policy", "ISO 42001", "EU AI Act"],
          owner: "Internal Audit Platform",
          baseline: {
            readiness: 91,
            gap: "Retention coverage was broad, but one archive export control still lacked end-to-end proof.",
          },
          pilot: {
            readiness: 99,
            gap: "The control family is effectively closed, with only a minor evidence housekeeping item left.",
          },
        },
      ],
      complianceNote: {
        baseline:
          "Operations started from the strongest compliance position, but the matrix still matters because evidence fragmentation can hide in mature-looking percentages.",
        pilot:
          "At this point the matrix shows near-target-state readiness, with only a handful of documentary joins left rather than structural control gaps.",
      },
      controls: [
        {
          name: "Model Usage Policy",
          detail: "Incident and automation tasks route models by risk and service criticality.",
          status: "green",
          label: "Compliant",
        },
        {
          name: "Data Privacy Controls",
          detail: "Operational prompts redact secrets, credentials, and customer identifiers by default.",
          status: "green",
          label: "Enforced",
        },
        {
          name: "Prompt Injection Guard",
          detail: "One escalated runbook recommendation is under active security review.",
          status: "amber",
          label: "Review Req",
        },
        {
          name: "Output Quality Threshold",
          detail: "Resolution guidance remains inside approved confidence and traceability thresholds.",
          status: "green",
          label: "Passing",
        },
        {
          name: "Cost Budget Alerts",
          detail: "Run-support spend is at 79% of budget with a high-volume incident month in flight.",
          status: "amber",
          label: "Warning",
        },
        {
          name: "Audit Logging",
          detail: "All assisted incident actions are written to the immutable operations evidence store.",
          status: "green",
          label: "Active",
        },
      ],
    },
    economics: {
      byWorkflow: [
        { id: "planning", label: "Planning / Refinement", baseline: 170, pilot: 190, format: "currencyK" },
        { id: "build", label: "Build / Test / Review", baseline: 280, pilot: 320, format: "currencyK" },
        { id: "run", label: "Run / Support", baseline: 470, pilot: 470, format: "currencyK" },
      ],
      modelMix: [
        { label: "Reasoning tier", share: 25, className: "mix-segment--one" },
        { label: "Fast completion tier", share: 24, className: "mix-segment--two" },
        { label: "Embedding / retrieval", share: 28, className: "mix-segment--three" },
        { label: "Policy and safety", share: 23, className: "mix-segment--four" },
      ],
      summary: [
        {
          label: "Cost per assisted outcome",
          definition: "Average AI spend for each completed assisted outcome across approved workflows.",
          baseline: 12.4,
          pilot: 10.8,
          format: "currency",
          improve: "down",
        },
        {
          label: "Model concentration risk",
          definition: "Share of spend concentrated in the primary model family.",
          baseline: 42,
          pilot: 33,
          format: "percent",
          improve: "down",
        },
      ],
      notes: {
        baseline: "Operations had the lowest spend baseline, but also the smallest assisted footprint across workflows.",
        pilot: "Run-support remains the main cost center, yet unit economics are improving and spend concentration risk is low.",
      },
    },
    actions: [
      {
        workflow: "run",
        title: "Expand assisted triage to all service towers handling P2 and P3 incidents",
        owner: "Operations Director",
        due: "16 Apr 2026",
        impact: "Improve MTTR by 0.9 hours",
      },
      {
        workflow: "planning",
        title: "Approve a standard playbook template for AI-updated runbooks",
        owner: "Risk & Control",
        due: "20 Apr 2026",
        impact: "Accelerate playbook approvals by 1.0 day",
      },
      {
        workflow: "build",
        title: "Automate rollback evidence checks on automation releases",
        owner: "Platform Engineering",
        due: "24 Apr 2026",
        impact: "Reduce rollback risk by 0.8 pts",
      },
      {
        workflow: "all",
        title: "Shift low-complexity incident summarization to the efficient model tier",
        owner: "FinOps",
        due: "29 Apr 2026",
        impact: "Lower annual spend by $60K",
      },
      {
        workflow: "run",
        title: "Mandate policy traceability for AI-assisted incident actions",
        owner: "Internal Audit",
        due: "04 May 2026",
        impact: "Sustain 99% evidence completeness",
      },
    ],
    roadmap: [
      {
        window: "30 days",
        title: "Scale incident use cases",
        items: [
          "Expand supervised triage into all in-scope support queues.",
          "Standardize AI-updated runbook evidence and approval flow.",
          "Set workflow budgets for support and automation teams.",
        ],
      },
      {
        window: "60 days",
        title: "Improve release confidence",
        items: [
          "Broaden AI-assisted review for automation and platform changes.",
          "Route low-risk summarization to lower-cost completion models.",
          "Reduce residual manual exception handling to near zero.",
        ],
      },
      {
        window: "90 days",
        title: "Move to steady-state operations",
        items: [
          "Embed AI run and support KPIs into the service operating cadence.",
          "Finalize chargeback and savings attribution for AI-assisted operations.",
          "Define the long-term target mix between human-led and AI-assisted support work.",
        ],
      },
    ],
  },
};

const oversightProfiles = {
  enterprise: {
    kpis: [
      {
        label: "Straight-Through Rate",
        definition: "Share of in-scope decisions cleared by policy and evidence checks without manual review.",
        baseline: 52,
        pilot: 71,
        target: 78,
        format: "percent",
        improve: "up",
      },
      {
        label: "Human Review Queue",
        definition: "Active items awaiting accountable reviewer action across the enterprise delivery estate.",
        baseline: 19,
        pilot: 8,
        target: 6,
        format: "count",
        improve: "down",
      },
      {
        label: "Median Review SLA",
        definition: "Median time to decision for items requiring human review after policy scan.",
        baseline: 18.6,
        pilot: 7.4,
        target: 6,
        format: "hours",
        improve: "down",
      },
      {
        label: "Override Rate",
        definition: "Share of recommendations changed by accountable humans after escalation.",
        baseline: 12,
        pilot: 6,
        target: 5,
        format: "percent",
        improve: "down",
      },
      {
        label: "High-Risk Holds",
        definition: "Count of red-tier items placed on hold pending investigation, approval, or rejection.",
        baseline: 7,
        pilot: 2,
        target: 1,
        format: "count",
        improve: "down",
      },
    ],
    routeMix: [
      { label: "Green auto-approved", tone: "green", baseline: 52, pilot: 71, format: "percent" },
      { label: "Amber under review", tone: "amber", baseline: 32, pilot: 23, format: "percent" },
      { label: "Red on hold", tone: "red", baseline: 16, pilot: 6, format: "percent" },
    ],
    slaStatus: [
      { label: "Within SLA", tone: "green", baseline: 61, pilot: 84 },
      { label: "Watch", tone: "amber", baseline: 23, pilot: 11 },
      { label: "Breached", tone: "red", baseline: 16, pilot: 5 },
    ],
    queue: [
      {
        name: "Customer Profile Schema Migration - EU Tenant Cluster",
        workflow: "Build / Test / Review",
        workflowId: "build",
        riskTier: "red",
        owner: "Data Platform CAB",
        due: "Due in 2h 10m",
        slaDefinition: "Red-tier architectural changes require a named decision inside 4 business hours.",
        reason: "Cross-border data retention controls require explicit approval before DDL execution in production.",
        evidenceTags: ["PII-impact", "rollback-plan", "CAB-note", "data-lineage"],
        actions: ["Approve with controls", "Place hold", "Reject change"],
      },
      {
        name: "Payments Feature Flag Rollout - Tier-1 Checkout",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "amber",
        owner: "Release Management",
        due: "Due in 5h 40m",
        slaDefinition: "Amber-tier release decisions target disposition within 8 business hours.",
        reason: "Projected traffic exposure exceeds the pre-cleared policy threshold for auto-expansion.",
        evidenceTags: ["canary-metrics", "rollback-window", "change-ticket", "customer-impact"],
        actions: ["Approve rollout", "Request review notes", "Hold wave"],
      },
      {
        name: "Incident 47821 RCA Draft Approval",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "amber",
        owner: "Site Reliability Lead",
        due: "Due in 1d 2h",
        slaDefinition: "Amber-tier post-incident artifacts require sign-off within 2 business days.",
        reason: "The draft attributes causal responsibility to an external dependency and needs accountable validation.",
        evidenceTags: ["timeline", "log-extracts", "vendor-bridge", "control-gap"],
        actions: ["Approve draft", "Return for revision", "Escalate to risk"],
      },
      {
        name: "Release Note Auto-Approval for Payroll Patch 26.4",
        workflow: "Planning / Refinement",
        workflowId: "planning",
        riskTier: "green",
        owner: "Change Communications",
        due: "Due in 6h 15m",
        slaDefinition: "Green-tier communications items are expected to close inside the same business day.",
        reason: "Policy-based auto-approval is enabled, but a new regulatory wording check flagged a documentation delta for review.",
        evidenceTags: ["comms-template", "regulatory-copy", "release-brief"],
        actions: ["Approve copy", "Return to author", "Archive item"],
      },
      {
        name: "Severity-2 Incident Response Recommendation - Network Saturation",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "red",
        owner: "Major Incident Manager",
        due: "Due in 38m",
        slaDefinition: "Red-tier live-incident interventions require accountable review inside 1 hour.",
        reason: "The recommendation includes aggressive traffic shedding across executive reporting services.",
        evidenceTags: ["blast-radius", "war-room-log", "runbook-step", "exec-service-map"],
        actions: ["Approve intervention", "Escalate hold", "Reject recommendation"],
      },
    ],
    performance: {
      note: "Median SLA is already shown above. This layer adds the operating mechanics behind it: backlog ageing, reviewer headroom, sampling discipline, and QA efficacy.",
      metrics: [
        {
          label: "Oldest queue age",
          definition: "Elapsed time since the oldest still-open oversight item entered accountable review.",
          baseline: 31,
          pilot: 12,
          target: 8,
          format: "hours",
          improve: "down",
        },
        {
          label: "Reviewer capacity use",
          definition: "Share of accountable reviewer capacity currently committed across the enterprise oversight queue.",
          baseline: 91,
          pilot: 78,
          target: 75,
          format: "percent",
          improve: "down",
        },
        {
          label: "Sampling coverage",
          definition: "Share of straight-through decisions sampled post-hoc for policy and quality assurance.",
          baseline: 18,
          pilot: 41,
          target: 50,
          format: "percent",
          improve: "up",
        },
        {
          label: "Escalation QA pass",
          definition: "Share of reviewed decisions that pass secondary QA without remediation or policy challenge.",
          baseline: 82,
          pilot: 93,
          target: 95,
          format: "percent",
          improve: "up",
        },
      ],
      ageBuckets: [
        { label: "<4h", baseline: 24, pilot: 49, tone: "good" },
        { label: "4-8h", baseline: 21, pilot: 27, tone: "watch" },
        { label: "8-24h", baseline: 29, pilot: 18, tone: "watch" },
        { label: ">24h", baseline: 26, pilot: 6, tone: "risk" },
      ],
      reviewerBands: [
        { label: "Utilized", baseline: 91, pilot: 78, tone: "good" },
        { label: "Headroom", baseline: 5, pilot: 18, tone: "good" },
        { label: "Unavailable", baseline: 4, pilot: 4, tone: "watch" },
      ],
      samplingChecks: [
        { label: "Post-hoc sampled", baseline: 18, pilot: 41, tone: "good" },
        { label: "Override-led QA", baseline: 12, pilot: 21, tone: "watch" },
        { label: "Returned for remediation", baseline: 9, pilot: 4, tone: "risk" },
      ],
    },
  },
  product: {
    kpis: [
      {
        label: "Straight-Through Rate",
        definition: "Share of in-scope product decisions cleared by policy and evidence checks without manual review.",
        baseline: 55,
        pilot: 74,
        target: 80,
        format: "percent",
        improve: "up",
      },
      {
        label: "Human Review Queue",
        definition: "Active items awaiting accountable reviewer action across product delivery.",
        baseline: 14,
        pilot: 6,
        target: 4,
        format: "count",
        improve: "down",
      },
      {
        label: "Median Review SLA",
        definition: "Median time to decision for product items requiring human review.",
        baseline: 14.2,
        pilot: 6.3,
        target: 5,
        format: "hours",
        improve: "down",
      },
      {
        label: "Override Rate",
        definition: "Share of recommendations changed by accountable humans after escalation.",
        baseline: 11,
        pilot: 5,
        target: 4,
        format: "percent",
        improve: "down",
      },
      {
        label: "High-Risk Holds",
        definition: "Count of red-tier items placed on hold pending investigation, approval, or rejection.",
        baseline: 5,
        pilot: 2,
        target: 1,
        format: "count",
        improve: "down",
      },
    ],
    routeMix: [
      { label: "Green auto-approved", tone: "green", baseline: 55, pilot: 74, format: "percent" },
      { label: "Amber under review", tone: "amber", baseline: 29, pilot: 20, format: "percent" },
      { label: "Red on hold", tone: "red", baseline: 16, pilot: 6, format: "percent" },
    ],
    slaStatus: [
      { label: "Within SLA", tone: "green", baseline: 66, pilot: 87 },
      { label: "Watch", tone: "amber", baseline: 21, pilot: 9 },
      { label: "Breached", tone: "red", baseline: 13, pilot: 4 },
    ],
    queue: [
      {
        name: "Customer Profile Schema Migration - Product Graph",
        workflow: "Build / Test / Review",
        workflowId: "build",
        riskTier: "red",
        owner: "Platform Architecture",
        due: "Due in 3h 05m",
        slaDefinition: "Red-tier architectural changes require a named decision inside 4 business hours.",
        reason: "The migration touches shared identity entities and exceeds the approved blast-radius for autonomous execution.",
        evidenceTags: ["entity-map", "rollback-plan", "CAB-note", "data-contract"],
        actions: ["Approve with controls", "Place hold", "Reject change"],
      },
      {
        name: "Payments Feature Flag Rollout - Mobile Checkout",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "amber",
        owner: "Release Manager",
        due: "Due in 4h 20m",
        slaDefinition: "Amber-tier release decisions target disposition within 8 business hours.",
        reason: "Traffic expansion exceeds the cohort threshold allowed for unattended progression.",
        evidenceTags: ["canary-metrics", "rollback-window", "app-store-impact"],
        actions: ["Approve rollout", "Request review notes", "Hold wave"],
      },
      {
        name: "Release Note Auto-Approval for Pricing Engine Patch 14.8",
        workflow: "Planning / Refinement",
        workflowId: "planning",
        riskTier: "green",
        owner: "Product Communications",
        due: "Due in 7h 00m",
        slaDefinition: "Green-tier communications items are expected to close inside the same business day.",
        reason: "A new compliance phrase was inserted after the last approved content template and requires named approval.",
        evidenceTags: ["release-brief", "legal-copy", "comms-template"],
        actions: ["Approve copy", "Return to author", "Archive item"],
      },
      {
        name: "Incident Response Recommendation - Feature Service Saturation",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "red",
        owner: "SRE Director",
        due: "Due in 44m",
        slaDefinition: "Red-tier live-incident interventions require accountable review inside 1 hour.",
        reason: "The recommendation proposes temporary request shedding for premium customer paths.",
        evidenceTags: ["blast-radius", "war-room-log", "runbook-step"],
        actions: ["Approve intervention", "Escalate hold", "Reject recommendation"],
      },
    ],
    performance: {
      note: "Product oversight is mostly healthy now. The main watchpoints are squad-level reviewer capacity and making sure straight-through decisions are still sampled as scale rises.",
      metrics: [
        {
          label: "Oldest queue age",
          definition: "Elapsed time since the oldest still-open product oversight item entered accountable review.",
          baseline: 24,
          pilot: 9,
          target: 6,
          format: "hours",
          improve: "down",
        },
        {
          label: "Reviewer capacity use",
          definition: "Share of accountable reviewer capacity currently committed across product oversight workflows.",
          baseline: 87,
          pilot: 73,
          target: 70,
          format: "percent",
          improve: "down",
        },
        {
          label: "Sampling coverage",
          definition: "Share of straight-through product decisions sampled post-hoc for quality and policy assurance.",
          baseline: 22,
          pilot: 46,
          target: 55,
          format: "percent",
          improve: "up",
        },
        {
          label: "Escalation QA pass",
          definition: "Share of reviewed product decisions that pass secondary QA without rework.",
          baseline: 84,
          pilot: 94,
          target: 96,
          format: "percent",
          improve: "up",
        },
      ],
      ageBuckets: [
        { label: "<4h", baseline: 28, pilot: 56, tone: "good" },
        { label: "4-8h", baseline: 26, pilot: 24, tone: "watch" },
        { label: "8-24h", baseline: 25, pilot: 14, tone: "watch" },
        { label: ">24h", baseline: 21, pilot: 6, tone: "risk" },
      ],
      reviewerBands: [
        { label: "Utilized", baseline: 87, pilot: 73, tone: "good" },
        { label: "Headroom", baseline: 9, pilot: 21, tone: "good" },
        { label: "Unavailable", baseline: 4, pilot: 6, tone: "watch" },
      ],
      samplingChecks: [
        { label: "Post-hoc sampled", baseline: 22, pilot: 46, tone: "good" },
        { label: "Override-led QA", baseline: 11, pilot: 18, tone: "watch" },
        { label: "Returned for remediation", baseline: 7, pilot: 3, tone: "risk" },
      ],
    },
  },
  operations: {
    kpis: [
      {
        label: "Straight-Through Rate",
        definition: "Share of in-scope operations decisions cleared by policy and evidence checks without manual review.",
        baseline: 60,
        pilot: 79,
        target: 84,
        format: "percent",
        improve: "up",
      },
      {
        label: "Human Review Queue",
        definition: "Active items awaiting accountable reviewer action across support and operations.",
        baseline: 10,
        pilot: 5,
        target: 3,
        format: "count",
        improve: "down",
      },
      {
        label: "Median Review SLA",
        definition: "Median time to decision for operations items requiring human review.",
        baseline: 10.1,
        pilot: 4.6,
        target: 4,
        format: "hours",
        improve: "down",
      },
      {
        label: "Override Rate",
        definition: "Share of recommendations changed by accountable humans after escalation.",
        baseline: 8,
        pilot: 4,
        target: 3,
        format: "percent",
        improve: "down",
      },
      {
        label: "High-Risk Holds",
        definition: "Count of red-tier items placed on hold pending investigation, approval, or rejection.",
        baseline: 3,
        pilot: 1,
        target: 1,
        format: "count",
        improve: "down",
      },
    ],
    routeMix: [
      { label: "Green auto-approved", tone: "green", baseline: 60, pilot: 79, format: "percent" },
      { label: "Amber under review", tone: "amber", baseline: 26, pilot: 17, format: "percent" },
      { label: "Red on hold", tone: "red", baseline: 14, pilot: 4, format: "percent" },
    ],
    slaStatus: [
      { label: "Within SLA", tone: "green", baseline: 72, pilot: 90 },
      { label: "Watch", tone: "amber", baseline: 18, pilot: 7 },
      { label: "Breached", tone: "red", baseline: 10, pilot: 3 },
    ],
    queue: [
      {
        name: "Severity-2 Incident Response Recommendation - WAN Saturation",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "red",
        owner: "Major Incident Manager",
        due: "Due in 22m",
        slaDefinition: "Red-tier live-incident interventions require accountable review inside 1 hour.",
        reason: "The recommendation would shed traffic from internal reporting systems to stabilize the network edge.",
        evidenceTags: ["blast-radius", "war-room-log", "runbook-step", "service-map"],
        actions: ["Approve intervention", "Escalate hold", "Reject recommendation"],
      },
      {
        name: "RCA Draft Approval - Storage Cluster Recovery",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "amber",
        owner: "Operations Director",
        due: "Due in 18h",
        slaDefinition: "Amber-tier post-incident artifacts require sign-off within 2 business days.",
        reason: "The draft proposes a control gap finding that must be affirmed before distribution to audit stakeholders.",
        evidenceTags: ["timeline", "log-extracts", "control-gap", "vendor-bridge"],
        actions: ["Approve draft", "Return for revision", "Escalate to risk"],
      },
      {
        name: "Release Note Auto-Approval for VPN Client Update",
        workflow: "Planning / Refinement",
        workflowId: "planning",
        riskTier: "green",
        owner: "Service Communications",
        due: "Due in 5h 25m",
        slaDefinition: "Green-tier communications items are expected to close inside the same business day.",
        reason: "Policy-based auto-approval is enabled, but a revised security disclaimer triggered named review.",
        evidenceTags: ["release-brief", "security-copy", "comms-template"],
        actions: ["Approve copy", "Return to author", "Archive item"],
      },
      {
        name: "Feature Flag Rollout - Self-Service Password Reset",
        workflow: "Run / Support",
        workflowId: "run",
        riskTier: "amber",
        owner: "Service Transition",
        due: "Due in 6h 30m",
        slaDefinition: "Amber-tier release decisions target disposition within 8 business hours.",
        reason: "The rollout affects identity recovery journeys and exceeds the unattended cohort threshold.",
        evidenceTags: ["change-ticket", "customer-impact", "rollback-window"],
        actions: ["Approve rollout", "Request review notes", "Hold wave"],
      },
    ],
    performance: {
      note: "RunOps has the strongest reviewer throughput, so the focus shifts from queue size to sustaining sampling and keeping incident reviewers out of overload during spikes.",
      metrics: [
        {
          label: "Oldest queue age",
          definition: "Elapsed time since the oldest still-open operations oversight item entered accountable review.",
          baseline: 18,
          pilot: 6,
          target: 4,
          format: "hours",
          improve: "down",
        },
        {
          label: "Reviewer capacity use",
          definition: "Share of accountable reviewer capacity currently committed across run and support oversight flows.",
          baseline: 79,
          pilot: 66,
          target: 64,
          format: "percent",
          improve: "down",
        },
        {
          label: "Sampling coverage",
          definition: "Share of straight-through operations decisions sampled post-hoc for QA and incident-policy assurance.",
          baseline: 26,
          pilot: 52,
          target: 60,
          format: "percent",
          improve: "up",
        },
        {
          label: "Escalation QA pass",
          definition: "Share of reviewed operations decisions that pass secondary QA without remediation.",
          baseline: 88,
          pilot: 96,
          target: 97,
          format: "percent",
          improve: "up",
        },
      ],
      ageBuckets: [
        { label: "<4h", baseline: 36, pilot: 63, tone: "good" },
        { label: "4-8h", baseline: 24, pilot: 23, tone: "watch" },
        { label: "8-24h", baseline: 23, pilot: 10, tone: "watch" },
        { label: ">24h", baseline: 17, pilot: 4, tone: "risk" },
      ],
      reviewerBands: [
        { label: "Utilized", baseline: 79, pilot: 66, tone: "good" },
        { label: "Headroom", baseline: 16, pilot: 28, tone: "good" },
        { label: "Unavailable", baseline: 5, pilot: 6, tone: "watch" },
      ],
      samplingChecks: [
        { label: "Post-hoc sampled", baseline: 26, pilot: 52, tone: "good" },
        { label: "Override-led QA", baseline: 9, pilot: 16, tone: "watch" },
        { label: "Returned for remediation", baseline: 5, pilot: 2, tone: "risk" },
      ],
    },
  },
};

const institutionalizationView = {
  subscores: [
    { label: "Strategy", value: "71" },
    { label: "Ops", value: "63" },
    { label: "People", value: "58" },
  ],
  headlineSignals: [
    { label: "Shadow AI", tone: "risk" },
    { label: "Prompt debt", tone: "risk" },
    { label: "Forecast drift", tone: "watch" },
    { label: "SLA improving", tone: "good" },
  ],
  boardReadout: {
    lead:
      "Meridian has moved beyond AI experimentation. The enterprise now has enough value, delivery signal, and technical depth to scale more deliberately, but governance discipline and workforce readiness are not yet keeping pace with that ambition.",
    takeaways: [
      {
        label: "Board takeaway",
        title: "The value case is credible enough to justify continued sponsorship.",
        detail:
          "Portfolio ROI, realized value, and improved delivery outcomes now support an enterprise story rather than a collection of isolated pilot wins.",
        tone: "good",
      },
      {
        label: "Board concern",
        title: "Governance maturity is lagging the speed of deployment.",
        detail:
          "Ungoverned models, prompt-injection coverage gaps, and weak management-system readiness create scale risk if left untreated.",
        tone: "risk",
      },
      {
        label: "Board lens",
        title: "The next step is institutional discipline, not just more use cases.",
        detail:
          "Meridian now needs stronger controls, leadership capability, and finance-grade value tracking to turn momentum into a durable operating model.",
        tone: "watch",
      },
    ],
  },
  northStarStory: {
    summary:
      "Meridian now has enough value signal and delivery proof to justify broader AI scale. The board question is no longer whether AI works, but whether controls, leadership readiness, and management discipline can keep pace with that growth.",
    stanceLabel: "Recommended board stance",
    stance: "Continue sponsorship, but make scale conditional.",
    stanceDetail:
      "Expand where governance coverage, prompt controls, and finance-grade value evidence are complete. Slow anything that is scaling faster than accountability.",
  },
  northStarSpotlight: {
    label: "Value signal",
    value: "3.7x ROI",
    detail:
      "GBP18.4M annualized value in run rate is now large enough to support an enterprise scale decision, not just another quarter of isolated experiments.",
    note:
      "The drag has shifted from technical feasibility to managed scale, especially in governance coverage and leadership readiness.",
  },
  northStarTensions: [
    {
      label: "Permission to scale",
      title: "ROI, operational AI, and delivery flow are now strong enough to justify continued sponsorship.",
      tone: "good",
    },
    {
      label: "Constraint to solve",
      title: "Control completeness and institutional discipline still trail the speed of adoption.",
      tone: "risk",
    },
  ],
  northStar: [
    { label: "AII Score", value: "67", delta: "Scaling zone, +4 pts this quarter", tone: "good" },
    { label: "Portfolio ROI", value: "3.7x", delta: "GBP18.4M annualized value in run rate", tone: "good" },
    { label: "Governance Coverage", value: "74%", delta: "8 models still outside policy scope", tone: "risk" },
    { label: "RAI Index", value: "62", delta: "+5 pts QoQ, but readiness still mixed", tone: "good" },
    { label: "Tech Debt Index", value: "38", delta: "Prompt and organizational debt remain the drag", tone: "watch" },
  ],
  dimensions: [
    { name: "Strategic alignment", meridian: 71, sector: 62 },
    { name: "Portfolio & ROI", meridian: 68, sector: 59 },
    { name: "Governance & risk", meridian: 63, sector: 71 },
    { name: "Workforce", meridian: 60, sector: 55 },
    { name: "Technology", meridian: 74, sector: 66 },
    { name: "Culture", meridian: 51, sector: 52 },
    { name: "Operational AI", meridian: 61, sector: 48 },
    { name: "SLA/XLA", meridian: 66, sector: 54 },
    { name: "Responsible AI", meridian: 62, sector: 57 },
  ],
  signals: [
    {
      label: "Enterprise lead",
      title: "Meridian is ahead in technology, strategic alignment, SLA/XLA, and operational AI.",
      detail: "These are the strongest ingredients for scaling from isolated pilots into a managed enterprise capability.",
      tone: "good",
    },
    {
      label: "Scaling constraint",
      title: "Governance and culture remain the main blockers to institutionalizing AI.",
      detail: "The enterprise is moving faster in delivery than in enterprise control maturity, management discipline, and behavioral adoption.",
      tone: "risk",
    },
    {
      label: "Bridge signal",
      title: "Delivery metrics are improving fast enough to justify executive attention at the enterprise layer.",
      detail: "Flow, quality, and workflow coverage now provide enough evidence to support the board narrative, not just the CIO narrative.",
      tone: "watch",
    },
  ],
  bridge: [
    { label: "Flow Index", value: "79", detail: "Shared with Delivery view" },
    { label: "Quality Guardrail", value: "96%", detail: "Shared with Delivery view" },
    { label: "AI Coverage", value: "63%", detail: "Shared with Delivery view" },
    { label: "Delivery run-rate", value: "GBP1.31M", detail: "Delivery-specific AI spend" },
    { label: "Operational AI", value: "GBP3.69M", detail: "Service and run operations" },
    { label: "Total AI spend", value: "GBP5.0M", detail: "Enterprise AI footprint" },
  ],
  portfolioMetrics: [
    { label: "Active initiatives", value: "24", detail: "Up 6 from last quarter" },
    { label: "Value delivered", value: "GBP18.4M", detail: "Up 31% QoQ annualized" },
    { label: "In production", value: "9/24", detail: "37% of portfolio live" },
    { label: "Stalled value at risk", value: "GBP2.1M", detail: "3 stalled use cases need attention" },
  ],
  initiatives: [
    {
      name: "Voice AI service desk",
      function: "Ops",
      stage: "Production",
      value: "GBP3.8M",
      tier: "T1+T2",
    },
    {
      name: "Ticket auto-resolution",
      function: "Engineering",
      stage: "Production",
      value: "GBP2.6M",
      tier: "T1+T2",
    },
    {
      name: "RCA & change request AI",
      function: "Engineering",
      stage: "Scaling",
      value: "GBP2.2M",
      tier: "T3",
    },
    {
      name: "Customer intent prediction",
      function: "Commercial",
      stage: "Production",
      value: "GBP4.2M",
      tier: "T2",
    },
    {
      name: "Contract review automation",
      function: "Legal",
      stage: "Production",
      value: "GBP2.8M",
      tier: "T2+T3",
    },
    {
      name: "Financial anomaly detection",
      function: "Finance",
      stage: "Pilot",
      value: "GBP2.0M",
      tier: "T2",
    },
    {
      name: "Claims triage & routing",
      function: "Ops",
      stage: "Stalled",
      value: "GBP1.1M",
      tier: "T1",
    },
  ],
  workforce: [
    {
      label: "Foundations learning",
      value: "78%",
      detail: "2,100 colleagues have completed the baseline literacy path and are now eligible for role-specific certification.",
    },
    {
      label: "Role-certified practitioners",
      value: "46%",
      detail: "Scenario-based certification is now the real capability gate, and it still trails the broader training footprint.",
    },
    {
      label: "Safe-use validated",
      value: "39%",
      detail: "Only this share has demonstrated governed use on supervised workflow samples without material policy or quality breaches.",
    },
    {
      label: "Decision-rights certified leaders",
      value: "34%",
      detail: "Leadership decision rights remain the thinnest part of the validation ladder and still constrain safe scale.",
    },
  ],
  workforceValidation: {
    lead:
      "Meridian now has enough training volume to form a candidate bench, but training alone is no longer treated as proof of readiness. Scale readiness now depends on certification, supervised safe-use validation, and explicit decision-rights clearance.",
    evidenceBasis: ["Scenario drills", "Supervised workflow samples", "Manager sign-off", "Control attestation"],
    metrics: [
      {
        label: "Scenario assessment pass",
        value: "67%",
        detail: "Share of learners entering role certification who pass function-specific scenario drills on the first assessed attempt.",
        tone: "good",
      },
      {
        label: "Supervised safe-use sign-off",
        value: "58%",
        detail: "Share of certified practitioners who have completed live workflow sampling with named supervisor approval.",
        tone: "watch",
      },
      {
        label: "Policy-exception ready leaders",
        value: "34%",
        detail: "Leaders cleared to approve exception paths, escalation decisions, and higher-risk scaling moves under the new governance model.",
        tone: "risk",
      },
      {
        label: "Control-function validation",
        value: "61%",
        detail: "Risk, legal, audit, and governance roles that can challenge, certify, and monitor AI use with documented criteria.",
        tone: "watch",
      },
    ],
    stages: [
      {
        title: "1. Train",
        status: "Broadly established",
        detail: "Foundations learning is now broad enough to create a serious candidate bench across the enterprise.",
      },
      {
        title: "2. Certify",
        status: "Partially scaled",
        detail: "Role-based scenario assessment is working, but it is still concentrated in technical teams and not yet normalised across leaders and control functions.",
      },
      {
        title: "3. Validate in workflow",
        status: "Main scaling gap",
        detail: "Safe-use sign-off on supervised live work remains the gating step for Meridian's next phase of scale readiness.",
      },
    ],
  },
  workforceHeatmap: {
    columns: ["Foundations", "Certified", "Safe use", "Decision rights"],
    cohorts: [
      {
        label: "Board & ExCo",
        scores: [82, 41, 33, 48],
        detail: "Executive sponsorship is strong, but only a minority of leaders are formally cleared for exception decisions and scale approvals.",
      },
      {
        label: "Function leaders",
        scores: [68, 45, 36, 42],
        detail: "Commercial and legal leaders are progressing, but governed safe-use validation is still uneven outside the strongest functions.",
      },
      {
        label: "Delivery managers",
        scores: [74, 61, 54, 49],
        detail: "Execution fluency is ahead of decision-rights confidence, which is why delivery still leans on a smaller certified leadership spine.",
      },
      {
        label: "Risk & control",
        scores: [59, 43, 48, 63],
        detail: "Control functions are stronger in approval discipline than in hands-on workflow validation, which creates a practical tooling gap.",
      },
      {
        label: "Engineering & ops",
        scores: [81, 69, 58, 52],
        detail: "This is Meridian's strongest certified cohort, though supervised safe-use proof still needs to scale further before broader autonomy is sensible.",
      },
    ],
  },
  governanceMetrics: [
    { label: "Models in inventory", value: "31", detail: "Up 5 this quarter" },
    { label: "Governance coverage", value: "74%", detail: "8 models still out of policy scope" },
    { label: "Shadow AI signals", value: "6", detail: "Requires investigation and owner action" },
    { label: "EU AI Act readiness", value: "82%", detail: "Up from 61% last quarter" },
  ],
  risks: [
    {
      title: "Shadow AI in Finance",
      detail: "Three unapproved tools are creating data residency and IP exposure.",
      owner: "CFO + CISO",
    },
    {
      title: "Prompt injection coverage gap",
      detail: "Seven of nine use cases remain untested for prompt injection resilience.",
      owner: "CTO",
    },
    {
      title: "Demand forecasting drift",
      detail: "APAC and LATAM forecast performance is degrading without retraining triggers.",
      owner: "CTO",
    },
    {
      title: "Ethics board quorum miss",
      detail: "High-risk approvals are backlogged after two quarters without quorum.",
      owner: "Chief Ethics Officer",
    },
  ],
  debtItems: [
    {
      label: "Data-related debt",
      value: "Moderate",
      detail: "Lineage and data quality are improving, but bias-assessment coverage is still uneven.",
    },
    {
      label: "Model-related debt",
      value: "Moderate",
      detail: "Rollback, evaluation, and testing coverage are inconsistent across the model inventory.",
    },
    {
      label: "Prompt-related debt",
      value: "Critical",
      detail: "52% of production prompts are undocumented and injection testing is incomplete.",
    },
    {
      label: "Organizational debt",
      value: "High",
      detail: "Ownership, governance processes, and red-team operating rhythms still need hardening.",
    },
  ],
  debtHeatmap: {
    columns: ["Data", "Model", "Prompt", "Org"],
    rows: [
      {
        label: "Voice AI service desk",
        levels: ["Moderate", "Low", "High", "Moderate"],
        detail: "Scaling well, but prompt governance and run ownership are still manual.",
      },
      {
        label: "Ticket auto-resolution",
        levels: ["Moderate", "Moderate", "Critical", "High"],
        detail: "Prompt sprawl is now the main drag on quality and explainability.",
      },
      {
        label: "RCA & change request AI",
        levels: ["High", "Moderate", "High", "High"],
        detail: "Strong value potential, but shaky lineage and uneven ownership are slowing scale.",
      },
      {
        label: "Customer intent prediction",
        levels: ["Low", "Moderate", "Moderate", "Moderate"],
        detail: "Most stable initiative in the portfolio, with manageable technical drag.",
      },
      {
        label: "Claims triage & routing",
        levels: ["High", "High", "Moderate", "Critical"],
        detail: "Stall is mostly operating-model debt rather than model quality alone.",
      },
    ],
  },
  raiPillars: [
    { label: "Fairness", value: "58" },
    { label: "Reliability", value: "71" },
    { label: "Privacy", value: "64" },
    { label: "Inclusiveness", value: "54" },
    { label: "Transparency", value: "61" },
    { label: "Accountability", value: "63" },
  ],
  regulatory: [
    { label: "EU AI Act", value: "82%", detail: "High-risk readiness improving" },
    { label: "GDPR / data privacy", value: "91%", detail: "Strongest compliance posture today" },
    { label: "ISO 42001", value: "47%", detail: "Largest management-system gap" },
    { label: "NIST AI RMF", value: "61%", detail: "Operationalization remains partial" },
  ],
  nextQuarterTargets: [
    {
      title: "Governance coverage",
      current: "74%",
      target: "90%",
      owner: "CFO + CISO",
      detail: "Bring every material model and agentic workflow into named policy scope with evidence owners.",
    },
    {
      title: "Leadership pathway completion",
      current: "41%",
      target: "65%",
      owner: "CHRO",
      detail: "Close the biggest institutionalization gap by moving leaders through the governance and decision-rights pathway.",
    },
    {
      title: "Prompt injection resilience",
      current: "22%",
      target: "85%",
      owner: "CTO",
      detail: "Extend red-team and injection testing across the highest-volume production experiences.",
    },
    {
      title: "ISO 42001 readiness",
      current: "47%",
      target: "70%",
      owner: "Chief Ethics Officer",
      detail: "Stand up the missing management-system artifacts, review cadences, and evidence trails.",
    },
  ],
  benchmark: {
    strengths:
      "Technology (+8), strategic alignment (+9), SLA/XLA (+12), and operational AI (+13) are genuine competitive strengths. Meridian's ROI is 3.7x versus a sector average of 2.8x, which gives the enterprise permission to scale with confidence rather than keep treating AI as a narrow experiment.",
    gaps:
      "Governance & risk (-8) and culture adoption (-1, trending down) are the clearest enterprise gaps to close next. These are not presentation issues; they are the management-system and adoption issues that determine whether scale becomes durable.",
  },
  benchmarkProvenance: {
    peerGroup: "12 regulated-service enterprises with scaled AI programs",
    source: "Q1 2026 Meridian AI benchmark panel + analyst synthesis",
    lastRefresh: "02 Apr 2026",
    confidence: "B / mixed public disclosures and structured survey returns",
    methodology:
      "Dimension scores are normalized onto a 100-point scale using disclosed spend, operating-model evidence, governance artifacts, and structured survey responses from a matched peer set.",
    caveat:
      "Technology and operating-model comparisons are the strongest. Culture and governance dimensions carry wider confidence intervals because peer disclosure depth is less consistent.",
    drivers: [
      {
        title: "Why Meridian leads in operational AI",
        detail: "Service automation penetration and incident telemetry coverage are ahead of the peer median, which lifts both ROI and SLA/XLA position.",
      },
      {
        title: "Why governance still trails peers",
        detail: "Management-system artifacts, exception discipline, and evidence completeness are less mature than Meridian's technology posture.",
      },
      {
        title: "Why culture remains a watch item",
        detail: "Behavioral adoption is rising in engineers and operators, but mid-management and control functions are still below the peer median.",
      },
    ],
  },
  benchmarkBars: [
    { label: "Technology", meridian: 74, sector: 66 },
    { label: "Strategic alignment", meridian: 71, sector: 62 },
    { label: "Operational AI", meridian: 61, sector: 48 },
    { label: "SLA/XLA", meridian: 66, sector: 54 },
    { label: "Responsible AI", meridian: 62, sector: 57 },
    { label: "Governance & risk", meridian: 63, sector: 71 },
    { label: "Culture", meridian: 51, sector: 52 },
  ],
  boardDecisions: [
    {
      title: "Tie scale approval to control completeness",
      detail:
        "Require all material AI use cases to meet named governance, prompt, and evidence thresholds before they move deeper into production.",
    },
    {
      title: "Make value realization finance-grade",
      detail:
        "Shift from directional ROI storytelling to forecast-versus-realized value, owner accountability, and explicit confidence levels for the top use cases.",
    },
    {
      title: "Close the leadership capability gap in Q2",
      detail:
        "Prioritize governance and leadership enablement so operational momentum is matched by accountable decision-making at scale.",
    },
  ],
  updatedAt: "Data as of 08 Apr 2026, 08:30 BST",
  sources: [
    "Scoring engine",
    "Portfolio tracker",
    "Governance registry",
    "Workforce telemetry",
    "Benchmark dataset",
  ],
};

const productivityMethodologyProfiles = {
  enterprise: {
    summary:
      "Enterprise productivity is modeled by comparing matched baseline-to-current workflow events, normalizing for complexity, and subtracting quality drag before reporting the net gain.",
    formula:
      "Net productivity gain = throughput uplift + cycle-time compression + avoided rework - quality drag, normalized for story complexity, PR size, incident severity, and release tier.",
    observationWindow: "Trailing 30-day assisted window compared with a matched pre-assist reference period.",
    normalization:
      "Normalization adjusts for story size, repository complexity, incident severity, and change criticality so easier work does not overstate gains.",
    qualityAdjustment:
      "Escaped defects, reopened work, rollback events, and incident spillover reduce the gross uplift before the final gain is reported.",
    confidence: "B / strong build and run telemetry; planning still uses partly modeled effort estimates.",
    workflowWeights: {
      planning: { weight: 25, detail: "Planning gains come from faster approvals, sharper requirements, and less back-and-forth on scope." },
      build: { weight: 45, detail: "Build gains come mostly from review acceleration, better test coverage, and reduced reopened work." },
      run: { weight: 30, detail: "Run gains come from faster triage and more consistent recovery paths, offset by live-incident quality drag." },
    },
  },
  product: {
    summary:
      "Product productivity is modeled by matching squad work before and after approved AI assistance, normalizing for release mix, and then deducting quality drag from regressions or rework.",
    formula:
      "Net productivity gain = cycle-time compression + throughput uplift + avoided rework + review-efficiency gain - quality drag, normalized for squad mix and release complexity.",
    observationWindow: "Trailing 30-day assisted window compared with a matched reference release window.",
    normalization:
      "Normalization adjusts for squad size, release tier, story complexity, and regression burden so busy releases do not get undue credit.",
    qualityAdjustment:
      "Regression escapes, reopened tickets, failed checks, and release rollback activity reduce the gross uplift before the final gain is reported.",
    confidence: "B+ / strong build telemetry; planning and post-release workflow attribution still need one more quarter of data.",
    workflowWeights: {
      planning: { weight: 30, detail: "Planning gains come from faster discovery briefs, clearer scope, and better release readiness before build starts." },
      build: { weight: 50, detail: "Build remains the largest source of gain because review, test, and release automation are now broadly instrumented." },
      run: { weight: 20, detail: "Run contributes less overall, but post-release support gains are becoming more material as copilots spread." },
    },
  },
  operations: {
    summary:
      "Operations productivity is modeled by matching assisted and reference cases, normalizing for case mix and tower complexity, then subtracting remediation or rollback drag.",
    formula:
      "Net productivity gain = faster resolution + greater throughput + avoided handoff effort - quality and remediation drag, normalized for case severity and tower complexity.",
    observationWindow: "Trailing 30-day assisted operations window compared with a matched pre-assist reference period.",
    normalization:
      "Normalization adjusts for incident severity, tower complexity, automation class, and shift mix so calmer weeks do not inflate the gain.",
    qualityAdjustment:
      "Rollback effort, supervisor intervention, and remediation activity reduce the gross uplift before the final gain is reported.",
    confidence: "B / run telemetry is strong; planning and automation-build attribution are still partly modeled in smaller towers.",
    workflowWeights: {
      planning: { weight: 20, detail: "Planning gains come from faster runbook and playbook refinement before work reaches active operations." },
      build: { weight: 25, detail: "Build gains come from safer automation change flow and faster review of operational releases." },
      run: { weight: 55, detail: "Run is the dominant source because triage and incident handling now generate the most measurable assisted lift." },
    },
  },
};

const productivityContributionLedger = [
  {
    portfolioKey: "enterprise",
    train: "Enterprise Flow",
    workflow: "build",
    geography: "UK&I",
    function: "Engineering",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    sampleCount: 960,
    grossGain: 7.0,
    qualityOffset: -1.6,
    netGain: 5.4,
    confidence: "High",
    detail: "PR review, test evidence, and merge-cycle improvements are the main contributors.",
  },
  {
    portfolioKey: "enterprise",
    train: "Reliability Engineering",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    sampleCount: 620,
    grossGain: 4.8,
    qualityOffset: -0.8,
    netGain: 4.0,
    confidence: "Medium",
    detail: "Change-request drafting and RCA preparation are faster, though high-complexity reviews still need heavy expert involvement.",
  },
  {
    portfolioKey: "enterprise",
    train: "Finance Controls",
    workflow: "planning",
    geography: "EMEA",
    function: "Finance",
    useCase: "Risk analytics",
    modelTier: "T2",
    sampleCount: 410,
    grossGain: 3.6,
    qualityOffset: -0.5,
    netGain: 3.1,
    confidence: "Medium",
    detail: "Anomaly review and decision prep are faster after complexity matching, but finance review drag still trims the net effect.",
  },
  {
    portfolioKey: "enterprise",
    train: "Control Tower",
    workflow: "planning",
    geography: "EMEA",
    function: "Risk",
    useCase: "Governance operations",
    modelTier: "T2",
    sampleCount: 520,
    grossGain: 2.9,
    qualityOffset: -0.5,
    netGain: 2.4,
    confidence: "Medium",
    detail: "Policy packet preparation is materially faster, though evidence quality checks still absorb some of the gross uplift.",
  },
  {
    portfolioKey: "enterprise",
    train: "Service Command",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    sampleCount: 680,
    grossGain: 4.5,
    qualityOffset: -1.4,
    netGain: 3.1,
    confidence: "Medium",
    detail: "Incident triage and guided remediation are faster, but live-incident caution and quality drag still subtract meaningfully.",
  },
  {
    portfolioKey: "product",
    train: "Growth Products",
    workflow: "planning",
    geography: "North America",
    function: "Commercial",
    useCase: "Growth intelligence",
    modelTier: "T2",
    sampleCount: 730,
    grossGain: 5.0,
    qualityOffset: -0.6,
    netGain: 4.4,
    confidence: "Medium",
    detail: "Discovery briefs and opportunity prioritization are faster, especially in higher-volume roadmap areas.",
  },
  {
    portfolioKey: "product",
    train: "Enterprise Product Services",
    workflow: "build",
    geography: "EMEA",
    function: "Legal",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    sampleCount: 540,
    grossGain: 6.8,
    qualityOffset: -0.9,
    netGain: 5.9,
    confidence: "High",
    detail: "Contract review automation lifts throughput significantly while quality drag remains relatively contained.",
  },
  {
    portfolioKey: "product",
    train: "Release Excellence",
    workflow: "build",
    geography: "UK&I",
    function: "Product",
    useCase: "Release automation",
    modelTier: "T1",
    sampleCount: 890,
    grossGain: 5.4,
    qualityOffset: -0.7,
    netGain: 4.7,
    confidence: "High",
    detail: "Release note and review automation reduce repeat coordination work without materially lifting regression drag.",
  },
  {
    portfolioKey: "product",
    train: "Discovery Studio",
    workflow: "planning",
    geography: "EMEA",
    function: "Product",
    useCase: "Growth intelligence",
    modelTier: "T2",
    sampleCount: 610,
    grossGain: 4.5,
    qualityOffset: -0.6,
    netGain: 3.9,
    confidence: "Medium",
    detail: "Backlog shaping is faster and more complete, though some manual refinement remains in the final approval stage.",
  },
  {
    portfolioKey: "product",
    train: "Product Reliability",
    workflow: "run",
    geography: "North America",
    function: "Engineering",
    useCase: "Release automation",
    modelTier: "Hybrid",
    sampleCount: 460,
    grossGain: 3.9,
    qualityOffset: -0.8,
    netGain: 3.1,
    confidence: "Medium",
    detail: "Post-release support gains are rising, but defect spillover still trims some of the modeled lift.",
  },
  {
    portfolioKey: "operations",
    train: "Service Tower Alpha",
    workflow: "run",
    geography: "EMEA",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    sampleCount: 1280,
    grossGain: 5.4,
    qualityOffset: -1.2,
    netGain: 4.2,
    confidence: "High",
    detail: "Incident handling and support summaries are now measurably faster with limited remediation drag.",
  },
  {
    portfolioKey: "operations",
    train: "Field Service",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "T2",
    sampleCount: 840,
    grossGain: 4.2,
    qualityOffset: -0.8,
    netGain: 3.4,
    confidence: "High",
    detail: "Field guidance and runbook retrieval reduce dispatch friction while keeping rollback pressure manageable.",
  },
  {
    portfolioKey: "operations",
    train: "Claims Operations",
    workflow: "run",
    geography: "LATAM",
    function: "Ops",
    useCase: "Claims operations",
    modelTier: "T1",
    sampleCount: 520,
    grossGain: 2.6,
    qualityOffset: -0.7,
    netGain: 1.9,
    confidence: "Medium",
    detail: "Claims routing shows positive lift, though quality review still removes part of the gross gain.",
  },
  {
    portfolioKey: "operations",
    train: "Platform Reliability",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    sampleCount: 410,
    grossGain: 3.1,
    qualityOffset: -0.7,
    netGain: 2.4,
    confidence: "Medium",
    detail: "Automation release review is faster, but rollback-proofing still absorbs a notable part of the modeled uplift.",
  },
  {
    portfolioKey: "operations",
    train: "Ops Planning Office",
    workflow: "planning",
    geography: "EMEA",
    function: "Ops",
    useCase: "Governance operations",
    modelTier: "T2",
    sampleCount: 360,
    grossGain: 2.6,
    qualityOffset: -0.5,
    netGain: 2.1,
    confidence: "Medium",
    detail: "Playbook preparation and approval prep are faster, with lower drag than in live-service workflows.",
  },
];

const modelMonitoringLedger = [
  {
    portfolioKey: "enterprise",
    route: "Control Tower Copilot",
    modelFamily: "Claude 4.2 Sonnet + policy layer",
    workflow: "planning",
    geography: "EMEA",
    function: "Risk",
    useCase: "Governance operations",
    modelTier: "T2",
    requests7d: 12800,
    latencyMs: 1820,
    errorRate: 0.9,
    tokenCostPer1k: 14.6,
    refusalRate: 2.4,
    fallbackRate: 3.1,
    safetyEvents7d: 1,
    tone: "good",
    detail: "Control decisions remain stable, with most runtime drag coming from policy retrieval hops rather than model instability.",
  },
  {
    portfolioKey: "enterprise",
    route: "Finance Review Analyst",
    modelFamily: "GPT-5.4 + retrieval",
    workflow: "planning",
    geography: "EMEA",
    function: "Finance",
    useCase: "Risk analytics",
    modelTier: "T2",
    requests7d: 9400,
    latencyMs: 2140,
    errorRate: 1.4,
    tokenCostPer1k: 16.8,
    refusalRate: 3.9,
    fallbackRate: 4.6,
    safetyEvents7d: 2,
    tone: "watch",
    detail: "Longer-context finance reviews are still safe enough to operate, but latency and refusal remain elevated in dense quarterly packs.",
  },
  {
    portfolioKey: "enterprise",
    route: "Enterprise Engineering Copilot",
    modelFamily: "Hybrid code assistant mesh",
    workflow: "build",
    geography: "UK&I",
    function: "Engineering",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    requests7d: 18500,
    latencyMs: 1280,
    errorRate: 0.8,
    tokenCostPer1k: 11.4,
    refusalRate: 1.7,
    fallbackRate: 2.8,
    safetyEvents7d: 1,
    tone: "good",
    detail: "The engineering route is now well-tuned, with strong runtime efficiency and low safety noise across code-review and test-generation tasks.",
  },
  {
    portfolioKey: "enterprise",
    route: "Service Command Assistant",
    modelFamily: "GPT-5.4 mini + runbook retrieval",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    requests7d: 22100,
    latencyMs: 1710,
    errorRate: 1.9,
    tokenCostPer1k: 9.2,
    refusalRate: 4.7,
    fallbackRate: 6.3,
    safetyEvents7d: 3,
    tone: "watch",
    detail: "Runtime cost is efficient here, but fallback still clusters in complex incident escalations and edge-case policy asks.",
  },
  {
    portfolioKey: "product",
    route: "Discovery Studio Assistant",
    modelFamily: "GPT-5.4 + insight RAG",
    workflow: "planning",
    geography: "EMEA",
    function: "Product",
    useCase: "Growth intelligence",
    modelTier: "T2",
    requests7d: 8600,
    latencyMs: 1960,
    errorRate: 1.1,
    tokenCostPer1k: 15.9,
    refusalRate: 3.2,
    fallbackRate: 3.7,
    safetyEvents7d: 1,
    tone: "good",
    detail: "Discovery prompts are stable, though longer research-style sessions still push token burn higher than product wants at scale.",
  },
  {
    portfolioKey: "product",
    route: "Contract Reviewer",
    modelFamily: "Hybrid counsel review stack",
    workflow: "build",
    geography: "EMEA",
    function: "Legal",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    requests7d: 6400,
    latencyMs: 2440,
    errorRate: 1.8,
    tokenCostPer1k: 18.6,
    refusalRate: 5.4,
    fallbackRate: 4.2,
    safetyEvents7d: 2,
    tone: "watch",
    detail: "Legal review remains appropriately conservative, but refusal and cost are still high enough to require close route management.",
  },
  {
    portfolioKey: "product",
    route: "Release Generator",
    modelFamily: "T1 release drafting stack",
    workflow: "build",
    geography: "UK&I",
    function: "Product",
    useCase: "Release automation",
    modelTier: "T1",
    requests7d: 20200,
    latencyMs: 920,
    errorRate: 0.6,
    tokenCostPer1k: 6.4,
    refusalRate: 0.8,
    fallbackRate: 1.7,
    safetyEvents7d: 0,
    tone: "good",
    detail: "This is the strongest scaled route in product delivery: fast, cheap, and largely free of runtime or trust incidents.",
  },
  {
    portfolioKey: "product",
    route: "Reliability Patch Assistant",
    modelFamily: "Hybrid release repair mesh",
    workflow: "run",
    geography: "North America",
    function: "Engineering",
    useCase: "Release automation",
    modelTier: "Hybrid",
    requests7d: 7800,
    latencyMs: 1580,
    errorRate: 2.7,
    tokenCostPer1k: 10.8,
    refusalRate: 1.5,
    fallbackRate: 7.9,
    safetyEvents7d: 1,
    tone: "risk",
    detail: "Patch support still flips to fallback too often during high-severity release events, which is now the main runtime drag in product operations.",
  },
  {
    portfolioKey: "operations",
    route: "Incident Analyst",
    modelFamily: "T3 incident reasoning stack",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    requests7d: 5200,
    latencyMs: 2670,
    errorRate: 3.1,
    tokenCostPer1k: 22.4,
    refusalRate: 6.8,
    fallbackRate: 5.2,
    safetyEvents7d: 2,
    tone: "risk",
    detail: "Deep incident analysis remains valuable, but it is still the most expensive and refusal-prone route in the operating estate.",
  },
  {
    portfolioKey: "operations",
    route: "Tower Resolver",
    modelFamily: "Hybrid runbook resolver",
    workflow: "run",
    geography: "EMEA",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    requests7d: 24900,
    latencyMs: 1110,
    errorRate: 0.7,
    tokenCostPer1k: 8.3,
    refusalRate: 1.2,
    fallbackRate: 2.1,
    safetyEvents7d: 1,
    tone: "good",
    detail: "The primary RunOps route is now fast and stable enough to operate as a true scale pathway rather than an assisted pilot lane.",
  },
  {
    portfolioKey: "operations",
    route: "Dispatch Copilot",
    modelFamily: "T2 dispatch assistant",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "T2",
    requests7d: 14300,
    latencyMs: 1380,
    errorRate: 1.2,
    tokenCostPer1k: 7.6,
    refusalRate: 2.1,
    fallbackRate: 3.8,
    safetyEvents7d: 1,
    tone: "good",
    detail: "Dispatch support remains cost-effective, with only moderate fallback pressure in less-structured field-service requests.",
  },
  {
    portfolioKey: "operations",
    route: "Claims Router",
    modelFamily: "T1 claims triage stack",
    workflow: "run",
    geography: "LATAM",
    function: "Ops",
    useCase: "Claims operations",
    modelTier: "T1",
    requests7d: 9100,
    latencyMs: 980,
    errorRate: 2.6,
    tokenCostPer1k: 5.2,
    refusalRate: 0.6,
    fallbackRate: 6.5,
    safetyEvents7d: 2,
    tone: "watch",
    detail: "Claims triage is economically efficient, but fallback remains too high in exception-heavy queues and multilingual edge cases.",
  },
];

const hallucinationMethodologyLedger = [
  {
    portfolioKey: "enterprise",
    route: "Control Tower Copilot",
    modelFamily: "Claude 4.2 Sonnet + policy layer",
    workflow: "planning",
    geography: "EMEA",
    function: "Risk",
    useCase: "Governance operations",
    modelTier: "T2",
    suiteName: "Policy-faithful decision replay",
    suiteScope: "Replays recent control decisions against approved policy packs and exception history.",
    sampleSize: 360,
    passRate: 95.3,
    ciLow: 93.1,
    ciHigh: 97.5,
    failureMode: "Occasional unsupported escalation rationale when policy exceptions are nested.",
    tone: "good",
    detail: "Pass means the answer remains grounded in the current control pack and contains no unsupported disposition logic.",
  },
  {
    portfolioKey: "enterprise",
    route: "Finance Review Analyst",
    modelFamily: "GPT-5.4 + retrieval",
    workflow: "planning",
    geography: "EMEA",
    function: "Finance",
    useCase: "Risk analytics",
    modelTier: "T2",
    suiteName: "Finance evidence-faithfulness set",
    suiteScope: "Quarter-close packets, variance commentary, and benefit-validation evidence with human-reviewed answer keys.",
    sampleSize: 280,
    passRate: 91.4,
    ciLow: 88.1,
    ciHigh: 94.8,
    failureMode: "Fabricated explanatory color appears when value evidence is thin or temporally ambiguous.",
    tone: "watch",
    detail: "Failures are mostly subtle unsupported claims, not grossly wrong arithmetic, which is why methodology needs to stay explicit.",
  },
  {
    portfolioKey: "enterprise",
    route: "Enterprise Engineering Copilot",
    modelFamily: "Hybrid code assistant mesh",
    workflow: "build",
    geography: "UK&I",
    function: "Engineering",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    suiteName: "Code-review groundedness set",
    suiteScope: "Checks review comments and test suggestions against the actual diff, linked issue, and approved coding standards.",
    sampleSize: 520,
    passRate: 96.8,
    ciLow: 95.3,
    ciHigh: 98.2,
    failureMode: "Most failures are overconfident style or coverage claims not fully supported by the changed files.",
    tone: "good",
    detail: "This route now has the strongest answer-faithfulness signal in the enterprise slice because the evaluation set is well-bounded and evidence-rich.",
  },
  {
    portfolioKey: "enterprise",
    route: "Service Command Assistant",
    modelFamily: "GPT-5.4 mini + runbook retrieval",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    suiteName: "Runbook grounding replay",
    suiteScope: "Replays live-service incident prompts against approved runbooks and post-incident reviews.",
    sampleSize: 410,
    passRate: 90.7,
    ciLow: 87.9,
    ciHigh: 93.5,
    failureMode: "Hallucination risk rises when runbook steps are stale or multiple procedures partially apply.",
    tone: "watch",
    detail: "The methodology keeps these evaluations separated from runtime fallback because the question here is answer truthfulness, not route resilience.",
  },
  {
    portfolioKey: "product",
    route: "Discovery Studio Assistant",
    modelFamily: "GPT-5.4 + insight RAG",
    workflow: "planning",
    geography: "EMEA",
    function: "Product",
    useCase: "Growth intelligence",
    modelTier: "T2",
    suiteName: "Research brief faithfulness suite",
    suiteScope: "Evaluates strategic summaries against approved customer research packets and source notes.",
    sampleSize: 300,
    passRate: 92.6,
    ciLow: 89.7,
    ciHigh: 95.6,
    failureMode: "Synthesized market claims can outpace the underlying note set when evidence is sparse.",
    tone: "watch",
    detail: "Pass requires every material claim to be supported by the approved brief pack, not just directionally plausible.",
  },
  {
    portfolioKey: "product",
    route: "Contract Reviewer",
    modelFamily: "Hybrid counsel review stack",
    workflow: "build",
    geography: "EMEA",
    function: "Legal",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    suiteName: "Clause-grounded review set",
    suiteScope: "Compares generated redlines and summaries against the actual clause set and approved playbook interpretations.",
    sampleSize: 250,
    passRate: 89.8,
    ciLow: 86.0,
    ciHigh: 93.5,
    failureMode: "Occasional unsupported risk assertions appear when the model generalizes from similar clause families.",
    tone: "risk",
    detail: "This route is still usable with human review, but it is not yet strong enough to market as a high-confidence autonomous lane.",
  },
  {
    portfolioKey: "product",
    route: "Release Generator",
    modelFamily: "T1 release drafting stack",
    workflow: "build",
    geography: "UK&I",
    function: "Product",
    useCase: "Release automation",
    modelTier: "T1",
    suiteName: "Release-note accuracy set",
    suiteScope: "Checks release summaries against actual ticket changes, approved copy, and rollout notes.",
    sampleSize: 470,
    passRate: 97.2,
    ciLow: 95.7,
    ciHigh: 98.7,
    failureMode: "Residual misses mostly come from omitted caveats rather than invented release content.",
    tone: "good",
    detail: "The evaluation suite is stable and narrow, which is why confidence is stronger here than in broader product reasoning tasks.",
  },
  {
    portfolioKey: "product",
    route: "Reliability Patch Assistant",
    modelFamily: "Hybrid release repair mesh",
    workflow: "run",
    geography: "North America",
    function: "Engineering",
    useCase: "Release automation",
    modelTier: "Hybrid",
    suiteName: "Incident fix grounding replay",
    suiteScope: "Tests patch suggestions against incident evidence, changed files, and approved rollback paths.",
    sampleSize: 220,
    passRate: 88.9,
    ciLow: 84.7,
    ciHigh: 93.0,
    failureMode: "Unsupported remediation steps still appear under time pressure and partial incident context.",
    tone: "risk",
    detail: "This remains a supervised route because hallucination risk is still too high in volatile release-repair conditions.",
  },
  {
    portfolioKey: "operations",
    route: "Incident Analyst",
    modelFamily: "T3 incident reasoning stack",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    suiteName: "Post-incident reasoning benchmark",
    suiteScope: "Evaluates causal analysis and remediation suggestions against verified incident writeups and adjudicated timelines.",
    sampleSize: 210,
    passRate: 87.4,
    ciLow: 82.9,
    ciHigh: 91.9,
    failureMode: "The model can overstate causal certainty when evidence is partial or contradictory.",
    tone: "risk",
    detail: "This is the strongest case for methodology transparency because the route is valuable, but the confidence interval is still wide.",
  },
  {
    portfolioKey: "operations",
    route: "Tower Resolver",
    modelFamily: "Hybrid runbook resolver",
    workflow: "run",
    geography: "EMEA",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    suiteName: "Runbook adherence eval set",
    suiteScope: "Measures whether guidance stays within approved runbook steps and known escalation policies.",
    sampleSize: 540,
    passRate: 95.9,
    ciLow: 94.3,
    ciHigh: 97.6,
    failureMode: "Most failures come from incomplete mention of escalation preconditions rather than fabricated procedures.",
    tone: "good",
    detail: "This route is one of the clearest examples where strong methodology supports scale rather than just post-hoc monitoring.",
  },
  {
    portfolioKey: "operations",
    route: "Dispatch Copilot",
    modelFamily: "T2 dispatch assistant",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "T2",
    suiteName: "Field dispatch grounding suite",
    suiteScope: "Tests dispatch guidance against live playbooks, entitlements, and approved routing rules.",
    sampleSize: 330,
    passRate: 93.4,
    ciLow: 90.8,
    ciHigh: 96.0,
    failureMode: "Unsupported entitlement or routing assumptions still surface in more complex field-service cases.",
    tone: "watch",
    detail: "The route is generally safe, but the methodology still catches edge-case overreach that would not show up in pure runtime metrics.",
  },
  {
    portfolioKey: "operations",
    route: "Claims Router",
    modelFamily: "T1 claims triage stack",
    workflow: "run",
    geography: "LATAM",
    function: "Ops",
    useCase: "Claims operations",
    modelTier: "T1",
    suiteName: "Claims triage truthfulness set",
    suiteScope: "Compares triage explanations against approved claims policies, known exceptions, and adjudicated outcomes.",
    sampleSize: 390,
    passRate: 91.1,
    ciLow: 88.3,
    ciHigh: 94.0,
    failureMode: "The main failure mode is unsupported rationale around edge-case exceptions and multilingual nuance.",
    tone: "watch",
    detail: "This route is economically attractive, but the methodology shows why exception-heavy lanes still need tighter quality controls.",
  },
];

const promptSecurityLedger = [
  {
    portfolioKey: "enterprise",
    route: "Control Tower Copilot",
    securityBattery: "Policy jailbreak and tool-override battery",
    workflow: "planning",
    geography: "EMEA",
    function: "Risk",
    useCase: "Governance operations",
    modelTier: "T2",
    promptAssets: 12,
    testedCoveragePct: 92,
    attackAttempts7d: 19,
    blockedRate: 98,
    openFindings: 2,
    criticalFindings: 0,
    remediationSlaHours: 72,
    withinSlaPct: 95,
    securityOwner: "Control Tower Security",
    findingSummary: "One nested-exception jailbreak pattern still needs a final prompt hardening pass.",
    detail: "Coverage includes prompt injection, context override, and tool-abuse checks against the live control pack.",
    tone: "good",
  },
  {
    portfolioKey: "enterprise",
    route: "Finance Review Analyst",
    securityBattery: "Document exfiltration and override battery",
    workflow: "planning",
    geography: "EMEA",
    function: "Finance",
    useCase: "Risk analytics",
    modelTier: "T2",
    promptAssets: 9,
    testedCoveragePct: 78,
    attackAttempts7d: 14,
    blockedRate: 93,
    openFindings: 4,
    criticalFindings: 1,
    remediationSlaHours: 96,
    withinSlaPct: 74,
    securityOwner: "Finance Platform Security",
    findingSummary: "One upload-driven prompt override path remains open in dense quarter-close evidence packs.",
    detail: "This route needs stronger attachment sanitization and tool gating before Meridian should widen autonomous usage.",
    tone: "risk",
  },
  {
    portfolioKey: "enterprise",
    route: "Enterprise Engineering Copilot",
    securityBattery: "Code prompt and tool-abuse battery",
    workflow: "build",
    geography: "UK&I",
    function: "Engineering",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    promptAssets: 18,
    testedCoveragePct: 89,
    attackAttempts7d: 27,
    blockedRate: 97,
    openFindings: 3,
    criticalFindings: 0,
    remediationSlaHours: 72,
    withinSlaPct: 88,
    securityOwner: "Engineering Enablement Security",
    findingSummary: "Prompt routing is strong, but two code-diff helper prompts still lack the latest abuse tests.",
    detail: "Most attacks are blocked before execution; the main task now is closing test lag on newer build assistants.",
    tone: "watch",
  },
  {
    portfolioKey: "enterprise",
    route: "Service Command Assistant",
    securityBattery: "Runbook override and secret-handling battery",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    promptAssets: 14,
    testedCoveragePct: 81,
    attackAttempts7d: 22,
    blockedRate: 92,
    openFindings: 5,
    criticalFindings: 1,
    remediationSlaHours: 48,
    withinSlaPct: 71,
    securityOwner: "Service Operations Security",
    findingSummary: "Edge-case incident prompts still create one exploitable override path in high-severity escalation flows.",
    detail: "This route has strong masking controls, but exception-heavy runbook scenarios need tighter prompt constraints.",
    tone: "risk",
  },
  {
    portfolioKey: "product",
    route: "Discovery Studio Assistant",
    securityBattery: "Research prompt manipulation battery",
    workflow: "planning",
    geography: "EMEA",
    function: "Product",
    useCase: "Growth intelligence",
    modelTier: "T2",
    promptAssets: 10,
    testedCoveragePct: 84,
    attackAttempts7d: 13,
    blockedRate: 95,
    openFindings: 3,
    criticalFindings: 0,
    remediationSlaHours: 96,
    withinSlaPct: 82,
    securityOwner: "Product Insights Security",
    findingSummary: "Research uploads are largely protected, but one source-summarization path still lacks the newest exfiltration checks.",
    detail: "The remaining issue is coverage completeness, not active compromise of the discovery route.",
    tone: "watch",
  },
  {
    portfolioKey: "product",
    route: "Contract Reviewer",
    securityBattery: "Clause override and data leakage battery",
    workflow: "build",
    geography: "EMEA",
    function: "Legal",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    promptAssets: 8,
    testedCoveragePct: 76,
    attackAttempts7d: 11,
    blockedRate: 90,
    openFindings: 4,
    criticalFindings: 1,
    remediationSlaHours: 72,
    withinSlaPct: 68,
    securityOwner: "Legal AI Security",
    findingSummary: "A clause-summary path still over-trusts embedded instructions in uploaded documents.",
    detail: "This is why the route remains supervised and should not yet be positioned as a high-trust autonomous reviewer.",
    tone: "risk",
  },
  {
    portfolioKey: "product",
    route: "Release Generator",
    securityBattery: "Template integrity and prompt-injection battery",
    workflow: "build",
    geography: "UK&I",
    function: "Product",
    useCase: "Release automation",
    modelTier: "T1",
    promptAssets: 16,
    testedCoveragePct: 96,
    attackAttempts7d: 9,
    blockedRate: 99,
    openFindings: 1,
    criticalFindings: 0,
    remediationSlaHours: 48,
    withinSlaPct: 100,
    securityOwner: "Release Platform Security",
    findingSummary: "Only one low-severity wording-bypass finding remains open after the last prompt refresh.",
    detail: "This is now Meridian's strongest prompt-security route: narrow scope, high coverage, and very low unresolved risk.",
    tone: "good",
  },
  {
    portfolioKey: "product",
    route: "Reliability Patch Assistant",
    securityBattery: "Incident repair tool-abuse battery",
    workflow: "run",
    geography: "North America",
    function: "Engineering",
    useCase: "Release automation",
    modelTier: "Hybrid",
    promptAssets: 11,
    testedCoveragePct: 74,
    attackAttempts7d: 18,
    blockedRate: 89,
    openFindings: 6,
    criticalFindings: 2,
    remediationSlaHours: 48,
    withinSlaPct: 61,
    securityOwner: "Release Reliability Security",
    findingSummary: "Two critical findings remain around tool escalation and patch-suggestion override under live pressure.",
    detail: "This is the clearest prompt-security gap in product delivery right now and should stay tightly supervised.",
    tone: "risk",
  },
  {
    portfolioKey: "operations",
    route: "Incident Analyst",
    securityBattery: "Incident narrative and tool-abuse battery",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    promptAssets: 7,
    testedCoveragePct: 69,
    attackAttempts7d: 15,
    blockedRate: 88,
    openFindings: 5,
    criticalFindings: 1,
    remediationSlaHours: 36,
    withinSlaPct: 63,
    securityOwner: "Reliability Security",
    findingSummary: "One unresolved finding still allows partial instruction carry-over from incident artifacts into analysis prompts.",
    detail: "The route is valuable, but it still needs more complete prompt hardening before Meridian can reduce review intensity.",
    tone: "risk",
  },
  {
    portfolioKey: "operations",
    route: "Tower Resolver",
    securityBattery: "Runbook guardrail and override battery",
    workflow: "run",
    geography: "EMEA",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    promptAssets: 15,
    testedCoveragePct: 94,
    attackAttempts7d: 20,
    blockedRate: 98,
    openFindings: 1,
    criticalFindings: 0,
    remediationSlaHours: 48,
    withinSlaPct: 97,
    securityOwner: "RunOps Security",
    findingSummary: "Only one medium-severity runbook override finding remains and is already inside SLA.",
    detail: "This route combines high coverage with strong ingress blocking, making it one of the safest scale candidates in the estate.",
    tone: "good",
  },
  {
    portfolioKey: "operations",
    route: "Dispatch Copilot",
    securityBattery: "Dispatch entitlement and routing battery",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "T2",
    promptAssets: 12,
    testedCoveragePct: 86,
    attackAttempts7d: 12,
    blockedRate: 96,
    openFindings: 2,
    criticalFindings: 0,
    remediationSlaHours: 72,
    withinSlaPct: 89,
    securityOwner: "Field Operations Security",
    findingSummary: "Coverage is mostly healthy, though entitlement-edge cases still need one additional attack battery pass.",
    detail: "The main remaining job is finishing the newest field-service prompt variants, not rethinking the whole route.",
    tone: "watch",
  },
  {
    portfolioKey: "operations",
    route: "Claims Router",
    securityBattery: "Claims exception and multilingual injection battery",
    workflow: "run",
    geography: "LATAM",
    function: "Ops",
    useCase: "Claims operations",
    modelTier: "T1",
    promptAssets: 13,
    testedCoveragePct: 79,
    attackAttempts7d: 17,
    blockedRate: 91,
    openFindings: 4,
    criticalFindings: 1,
    remediationSlaHours: 72,
    withinSlaPct: 72,
    securityOwner: "Claims Platform Security",
    findingSummary: "Multilingual exception handling still produces one unresolved prompt-bypass finding in complex claims packets.",
    detail: "This route is economically efficient but still needs tighter prompt guardrails before Meridian should widen automation depth.",
    tone: "risk",
  },
];

const ragQualityLedger = [
  {
    portfolioKey: "enterprise",
    route: "Control Tower Copilot",
    knowledgeSurface: "Policy registry + exception history",
    workflow: "planning",
    geography: "EMEA",
    function: "Risk",
    useCase: "Governance operations",
    modelTier: "T2",
    queries7d: 11800,
    citationRate: 94,
    retrievalHitRate: 91,
    freshnessWithinSlaPct: 97,
    staleContentPct: 4,
    noAnswerRate: 3,
    findingSummary: "Policy grounding is strong; misses usually come from new exception packs that have not fully propagated through indexing.",
    detail: "This route is a good example of retrieval quality enabling safer autonomous guidance rather than just decorating the answer with links.",
    tone: "good",
  },
  {
    portfolioKey: "enterprise",
    route: "Finance Review Analyst",
    knowledgeSurface: "Finance evidence packs + variance commentary",
    workflow: "planning",
    geography: "EMEA",
    function: "Finance",
    useCase: "Risk analytics",
    modelTier: "T2",
    queries7d: 8700,
    citationRate: 86,
    retrievalHitRate: 82,
    freshnessWithinSlaPct: 89,
    staleContentPct: 11,
    noAnswerRate: 7,
    findingSummary: "The main weakness is quarter-close freshness: older evidence packets still surface too often in long commentary prompts.",
    detail: "This route needs better document freshness weighting before Meridian should lean harder on generated finance narrative.",
    tone: "watch",
  },
  {
    portfolioKey: "enterprise",
    route: "Enterprise Engineering Copilot",
    knowledgeSurface: "Repo docs + coding standards + service patterns",
    workflow: "build",
    geography: "UK&I",
    function: "Engineering",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    queries7d: 16400,
    citationRate: 92,
    retrievalHitRate: 88,
    freshnessWithinSlaPct: 95,
    staleContentPct: 6,
    noAnswerRate: 4,
    findingSummary: "Retrieval is generally strong, though archived patterns still occasionally outrank the newest platform standards.",
    detail: "The route is well-grounded overall; improving standards ranking would likely close most of the remaining gap.",
    tone: "good",
  },
  {
    portfolioKey: "enterprise",
    route: "Service Command Assistant",
    knowledgeSurface: "Runbooks + incident KB + escalation notes",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    queries7d: 20100,
    citationRate: 84,
    retrievalHitRate: 79,
    freshnessWithinSlaPct: 88,
    staleContentPct: 13,
    noAnswerRate: 9,
    findingSummary: "The main RAG gap is stale runbook content in exception-heavy service incidents.",
    detail: "This route is useful, but retrieval freshness needs to improve before the no-answer rate comes down safely.",
    tone: "watch",
  },
  {
    portfolioKey: "product",
    route: "Discovery Studio Assistant",
    knowledgeSurface: "Research briefs + experiment archive + customer notes",
    workflow: "planning",
    geography: "EMEA",
    function: "Product",
    useCase: "Growth intelligence",
    modelTier: "T2",
    queries7d: 7900,
    citationRate: 88,
    retrievalHitRate: 84,
    freshnessWithinSlaPct: 90,
    staleContentPct: 10,
    noAnswerRate: 6,
    findingSummary: "Most misses come from fragmented customer-note indexing rather than the ranking model itself.",
    detail: "The route is reasonably well-grounded, but Meridian still needs better knowledge hygiene for adjacent discovery sources.",
    tone: "watch",
  },
  {
    portfolioKey: "product",
    route: "Contract Reviewer",
    knowledgeSurface: "Clause library + negotiation playbooks + approved positions",
    workflow: "build",
    geography: "EMEA",
    function: "Legal",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    queries7d: 5600,
    citationRate: 79,
    retrievalHitRate: 76,
    freshnessWithinSlaPct: 85,
    staleContentPct: 16,
    noAnswerRate: 10,
    findingSummary: "Clause-grounding is still too uneven across legacy playbooks and newly approved fallback positions.",
    detail: "This is why legal review remains high-touch: the retrieval layer still cannot be assumed to surface the right clause context reliably enough.",
    tone: "risk",
  },
  {
    portfolioKey: "product",
    route: "Release Generator",
    knowledgeSurface: "Release notes + ticket changes + rollout templates",
    workflow: "build",
    geography: "UK&I",
    function: "Product",
    useCase: "Release automation",
    modelTier: "T1",
    queries7d: 18500,
    citationRate: 95,
    retrievalHitRate: 93,
    freshnessWithinSlaPct: 97,
    staleContentPct: 3,
    noAnswerRate: 2,
    findingSummary: "The release corpus is narrow and fresh, which is why both citation and hit rates are consistently strong.",
    detail: "This is the cleanest scaled RAG route in product delivery and a strong benchmark for other knowledge-grounded flows.",
    tone: "good",
  },
  {
    portfolioKey: "product",
    route: "Reliability Patch Assistant",
    knowledgeSurface: "Incident notes + patch history + rollback guides",
    workflow: "run",
    geography: "North America",
    function: "Engineering",
    useCase: "Release automation",
    modelTier: "Hybrid",
    queries7d: 6900,
    citationRate: 74,
    retrievalHitRate: 71,
    freshnessWithinSlaPct: 82,
    staleContentPct: 18,
    noAnswerRate: 13,
    findingSummary: "Patch-related retrieval still surfaces outdated rollback guidance too often under live incident pressure.",
    detail: "This route needs fresher operational docs and stronger ranking before Meridian should trust it in volatile repair scenarios.",
    tone: "risk",
  },
  {
    portfolioKey: "operations",
    route: "Incident Analyst",
    knowledgeSurface: "Postmortems + runbooks + incident timeline archive",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    queries7d: 4800,
    citationRate: 77,
    retrievalHitRate: 73,
    freshnessWithinSlaPct: 83,
    staleContentPct: 17,
    noAnswerRate: 12,
    findingSummary: "Root-cause analysis still suffers when the indexed incident archive mixes current and superseded remediation patterns.",
    detail: "The route is valuable, but the knowledge layer is not yet stable enough to claim dependable grounding in every incident class.",
    tone: "risk",
  },
  {
    portfolioKey: "operations",
    route: "Tower Resolver",
    knowledgeSurface: "Runbook library + service KB + escalation guides",
    workflow: "run",
    geography: "EMEA",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    queries7d: 23800,
    citationRate: 93,
    retrievalHitRate: 91,
    freshnessWithinSlaPct: 96,
    staleContentPct: 4,
    noAnswerRate: 3,
    findingSummary: "The runbook library is tightly maintained, so retrieval quality is strong and no-answer behavior remains appropriately low.",
    detail: "This route shows what good knowledge operations look like when runbooks, escalations, and service KB all stay aligned.",
    tone: "good",
  },
  {
    portfolioKey: "operations",
    route: "Dispatch Copilot",
    knowledgeSurface: "Entitlement rules + field guides + dispatch notes",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "T2",
    queries7d: 13200,
    citationRate: 87,
    retrievalHitRate: 83,
    freshnessWithinSlaPct: 89,
    staleContentPct: 9,
    noAnswerRate: 7,
    findingSummary: "Dispatch grounding is mostly healthy, though entitlement updates still lag in a few field-service regions.",
    detail: "The route is directionally strong, but the knowledge layer still needs better update discipline for regional dispatch rules.",
    tone: "watch",
  },
  {
    portfolioKey: "operations",
    route: "Claims Router",
    knowledgeSurface: "Claims policies + exception catalog + multilingual guidance",
    workflow: "run",
    geography: "LATAM",
    function: "Ops",
    useCase: "Claims operations",
    modelTier: "T1",
    queries7d: 8600,
    citationRate: 82,
    retrievalHitRate: 78,
    freshnessWithinSlaPct: 86,
    staleContentPct: 14,
    noAnswerRate: 10,
    findingSummary: "The main weakness is multilingual exception handling, where stale policy variants are still retrieved too often.",
    detail: "This route is useful for triage, but its knowledge layer still needs cleanup before deeper automation is advisable.",
    tone: "watch",
  },
];

const reliabilityLedger = [
  {
    portfolioKey: "enterprise",
    route: "Control Tower Copilot",
    provider: "Anthropic via Azure policy cluster",
    fallbackTarget: "Read-only policy cache",
    workflow: "planning",
    geography: "EMEA",
    function: "Risk",
    useCase: "Governance operations",
    modelTier: "T2",
    routedCalls7d: 12800,
    providerIncidents7d: 1,
    degradedSharePct: 1.8,
    failoverSharePct: 2.2,
    queueDelayMs: 210,
    qualityImpactPct: 2.1,
    recoveryWithinSlaPct: 96,
    modeDetail: "One short provider-throttle event was absorbed by cached policy lookups and safe read-only responses.",
    detail: "The route remains resilient because the policy cache preserves answer fidelity well when the primary provider is under mild pressure.",
    tone: "good",
  },
  {
    portfolioKey: "enterprise",
    route: "Finance Review Analyst",
    provider: "OpenAI long-context review stack",
    fallbackTarget: "Slim-context analyst chain",
    workflow: "planning",
    geography: "EMEA",
    function: "Finance",
    useCase: "Risk analytics",
    modelTier: "T2",
    routedCalls7d: 9400,
    providerIncidents7d: 3,
    degradedSharePct: 6.2,
    failoverSharePct: 4.9,
    queueDelayMs: 1180,
    qualityImpactPct: 11.4,
    recoveryWithinSlaPct: 77,
    modeDetail: "Quarter-close evidence packs downgrade to a slim-context chain when long-context capacity or retrieval throughput tightens.",
    detail: "The route stays available, but quality drops noticeably in degraded mode because finance commentary loses supporting nuance under constrained context.",
    tone: "risk",
  },
  {
    portfolioKey: "enterprise",
    route: "Enterprise Engineering Copilot",
    provider: "Hybrid code assistant mesh",
    fallbackTarget: "Secondary code tier + lint cache",
    workflow: "build",
    geography: "UK&I",
    function: "Engineering",
    useCase: "Engineering automation",
    modelTier: "Hybrid",
    routedCalls7d: 18500,
    providerIncidents7d: 1,
    degradedSharePct: 2.4,
    failoverSharePct: 3.1,
    queueDelayMs: 320,
    qualityImpactPct: 3.8,
    recoveryWithinSlaPct: 93,
    modeDetail: "Short-lived code tier failover shifts low-risk review prompts to the secondary route while keeping merge protections in place.",
    detail: "Reliability is mostly healthy here; the main cost of degraded mode is slower response rather than meaningful output-quality loss.",
    tone: "watch",
  },
  {
    portfolioKey: "enterprise",
    route: "Service Command Assistant",
    provider: "OpenAI mini + runbook index",
    fallbackTarget: "Runbook retrieval only",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    routedCalls7d: 22100,
    providerIncidents7d: 4,
    degradedSharePct: 7.1,
    failoverSharePct: 8.4,
    queueDelayMs: 1340,
    qualityImpactPct: 12.7,
    recoveryWithinSlaPct: 72,
    modeDetail: "High-severity incidents increasingly fall back to retrieval-only guidance when provider latency or orchestration pressure spikes.",
    detail: "The route remains available, but degraded mode now materially slows queue flow and weakens containment quality in live-service conditions.",
    tone: "risk",
  },
  {
    portfolioKey: "product",
    route: "Discovery Studio Assistant",
    provider: "OpenAI insight stack",
    fallbackTarget: "Cached research brief summarizer",
    workflow: "planning",
    geography: "EMEA",
    function: "Product",
    useCase: "Growth intelligence",
    modelTier: "T2",
    routedCalls7d: 8600,
    providerIncidents7d: 2,
    degradedSharePct: 3.6,
    failoverSharePct: 4.2,
    queueDelayMs: 560,
    qualityImpactPct: 5.8,
    recoveryWithinSlaPct: 88,
    modeDetail: "Research sessions fall back to cached brief summarization when retrieval latency or provider saturation rises.",
    detail: "Availability remains acceptable, but degraded mode trims source breadth and slightly weakens the quality of research synthesis.",
    tone: "watch",
  },
  {
    portfolioKey: "product",
    route: "Contract Reviewer",
    provider: "Hybrid counsel review stack",
    fallbackTarget: "Clause extraction only",
    workflow: "build",
    geography: "EMEA",
    function: "Legal",
    useCase: "Contract intelligence",
    modelTier: "Hybrid",
    routedCalls7d: 6400,
    providerIncidents7d: 3,
    degradedSharePct: 5.9,
    failoverSharePct: 5.1,
    queueDelayMs: 980,
    qualityImpactPct: 9.2,
    recoveryWithinSlaPct: 81,
    modeDetail: "When the primary stack degrades, the route drops to clause extraction and requires heavier human completion of legal reasoning.",
    detail: "The fallback keeps work moving, but the quality hit is large enough that degraded periods still need visible operating controls.",
    tone: "watch",
  },
  {
    portfolioKey: "product",
    route: "Release Generator",
    provider: "T1 release drafting stack",
    fallbackTarget: "Template-only generator",
    workflow: "build",
    geography: "UK&I",
    function: "Product",
    useCase: "Release automation",
    modelTier: "T1",
    routedCalls7d: 20200,
    providerIncidents7d: 0,
    degradedSharePct: 0.8,
    failoverSharePct: 1.1,
    queueDelayMs: 120,
    qualityImpactPct: 0.9,
    recoveryWithinSlaPct: 100,
    modeDetail: "The route rarely degrades; when it does, it shifts to a template-only mode with negligible user-visible impact.",
    detail: "This is Meridian's best reliability route: narrow task, fast failover, and almost no measurable degraded-quality penalty.",
    tone: "good",
  },
  {
    portfolioKey: "product",
    route: "Reliability Patch Assistant",
    provider: "Hybrid release repair mesh",
    fallbackTarget: "Patch triage only",
    workflow: "run",
    geography: "North America",
    function: "Engineering",
    useCase: "Release automation",
    modelTier: "Hybrid",
    routedCalls7d: 7800,
    providerIncidents7d: 4,
    degradedSharePct: 8.6,
    failoverSharePct: 9.4,
    queueDelayMs: 1460,
    qualityImpactPct: 14.8,
    recoveryWithinSlaPct: 69,
    modeDetail: "Live release-repair demand often forces the route into triage-only mode during provider or orchestration instability.",
    detail: "This is the clearest product reliability weakness: the route remains available, but degraded mode sharply raises queue drag and lowers fix quality.",
    tone: "risk",
  },
  {
    portfolioKey: "operations",
    route: "Incident Analyst",
    provider: "T3 incident reasoning stack",
    fallbackTarget: "Timeline extraction + human-led analysis",
    workflow: "build",
    geography: "APAC",
    function: "Engineering",
    useCase: "Incident analysis",
    modelTier: "T3",
    routedCalls7d: 5200,
    providerIncidents7d: 3,
    degradedSharePct: 6.8,
    failoverSharePct: 7.2,
    queueDelayMs: 1210,
    qualityImpactPct: 13.5,
    recoveryWithinSlaPct: 74,
    modeDetail: "Degraded conditions force the route down to evidence extraction and postpone higher-order causal reasoning to humans.",
    detail: "The route is still valuable, but degraded periods materially slow RCA throughput and reduce first-pass quality in urgent investigations.",
    tone: "risk",
  },
  {
    portfolioKey: "operations",
    route: "Tower Resolver",
    provider: "Hybrid runbook resolver",
    fallbackTarget: "Cached runbook path",
    workflow: "run",
    geography: "EMEA",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "Hybrid",
    routedCalls7d: 24900,
    providerIncidents7d: 1,
    degradedSharePct: 1.5,
    failoverSharePct: 2.0,
    queueDelayMs: 160,
    qualityImpactPct: 1.8,
    recoveryWithinSlaPct: 97,
    modeDetail: "Short provider pressure is absorbed by cached runbook pathways with minimal user-visible degradation.",
    detail: "This route demonstrates the target pattern: safe failover, low queue drag, and little quality loss during degraded conditions.",
    tone: "good",
  },
  {
    portfolioKey: "operations",
    route: "Dispatch Copilot",
    provider: "T2 dispatch assistant",
    fallbackTarget: "Static routing tree",
    workflow: "run",
    geography: "UK&I",
    function: "Ops",
    useCase: "Service automation",
    modelTier: "T2",
    routedCalls7d: 14300,
    providerIncidents7d: 1,
    degradedSharePct: 2.9,
    failoverSharePct: 3.6,
    queueDelayMs: 340,
    qualityImpactPct: 4.2,
    recoveryWithinSlaPct: 92,
    modeDetail: "Dispatch can drop to a static routing tree when model or retrieval latency rises, preserving throughput at modest quality cost.",
    detail: "The route is resilient overall, though entitlement-heavy or location-ambiguous cases still feel the degraded-mode penalty more sharply.",
    tone: "watch",
  },
  {
    portfolioKey: "operations",
    route: "Claims Router",
    provider: "T1 claims triage stack",
    fallbackTarget: "Exception-first review queue",
    workflow: "run",
    geography: "LATAM",
    function: "Ops",
    useCase: "Claims operations",
    modelTier: "T1",
    routedCalls7d: 9100,
    providerIncidents7d: 2,
    degradedSharePct: 5.1,
    failoverSharePct: 6.8,
    queueDelayMs: 880,
    qualityImpactPct: 8.9,
    recoveryWithinSlaPct: 83,
    modeDetail: "Multilingual exception handling pushes the route into exception-first review when providers or translation dependencies wobble.",
    detail: "The route stays serviceable, but degraded conditions still create meaningful queue delay and quality loss in complex claims packets.",
    tone: "watch",
  },
];

const actionWorkflowLibrary = {
  enterprise: [
    {
      id: "planning-green-list",
      workflow: "planning",
      title: "Expand the green-list for planning copilots across tier-2 demand intake",
      owner: "Enterprise Architecture",
      dueDate: "2026-04-18",
      impact: "Unlock +12 pts workflow coverage",
      sourceSignal: "Planning lanes still lag build and run coverage in the approved workflow inventory.",
      severity: "medium",
      status: "in-flight",
      progress: 58,
      evidenceState: "partial",
      evidenceSummary: "2 of 3 closure artifacts are attached",
      nextStep: "Secure architecture council sign-off for the extra planning patterns now in draft.",
      requiredArtifacts: ["Updated workflow inventory", "Policy redline", "Training completion list"],
      sourceSystems: ["Workflow inventory", "Control Tower policy registry", "Training telemetry"],
      closureCriteria: [
        "Policy update approved by architecture council",
        "Named owners confirmed for each newly green-lit workflow",
        "First-month usage telemetry meets adoption threshold",
      ],
      openGaps: ["Architecture council sign-off is still pending."],
      relatedMetricIds: ["ai_workflow_coverage", "delivery_governance_compliance"],
    },
    {
      id: "auto-attach-evidence",
      workflow: "build",
      title: "Require evidence-pack auto-attach on AI-assisted pull requests",
      owner: "Quality Engineering",
      dueDate: "2026-04-22",
      impact: "Lift audit completeness by 3 pts",
      sourceSignal: "Build-flow scale is now more limited by evidence completeness than by model quality.",
      severity: "high",
      status: "at-risk",
      progress: 34,
      evidenceState: "missing",
      evidenceSummary: "Automation design exists, but closure evidence is not yet complete",
      nextStep: "Finish the GitHub-to-evidence-store integration and validate it on the top 20 repositories.",
      requiredArtifacts: ["GitHub workflow change set", "Evidence-store mapping", "Pilot audit sample"],
      sourceSystems: ["GitHub Enterprise workflows", "Release evidence store", "Internal audit evidence hub"],
      closureCriteria: [
        "Auto-attach active on top 20 repositories",
        "Evidence completeness exceeds 98% in pilot scope",
        "Internal audit signs off on sample traceability",
      ],
      openGaps: ["Repository-level metadata mapping is still inconsistent across two delivery trains."],
      relatedMetricIds: ["delivery_governance_compliance", "quality_guardrail"],
    },
    {
      id: "efficient-model-tier",
      workflow: "build",
      title: "Shift routine test generation to the efficient model tier",
      owner: "FinOps",
      dueDate: "2026-04-26",
      impact: "Reduce annual run-rate by $110K",
      sourceSignal: "Unit economics are improving, but reasoning-tier concentration is still higher than target in build workflows.",
      severity: "medium",
      status: "ready",
      progress: 68,
      evidenceState: "complete",
      evidenceSummary: "Decision pack is complete and ready for approval",
      nextStep: "Approve routing policy and activate the lower-cost tier for low-risk regression generation.",
      requiredArtifacts: ["Routing policy diff", "A/B quality comparison", "Spend forecast update"],
      sourceSystems: ["FinOps AI ledger", "Model routing telemetry", "Release evidence store"],
      closureCriteria: [
        "Routing policy approved",
        "Quality delta remains inside tolerance",
        "30-day spend reduction confirmed in ledger",
      ],
      openGaps: ["Final sign-off from delivery operations is still needed."],
      relatedMetricIds: ["delivery_ai_run_rate", "quality_guardrail"],
    },
    {
      id: "incident-triage-scale",
      workflow: "run",
      title: "Scale supervised incident triage to all P2 and P3 queues",
      owner: "Service Operations",
      dueDate: "2026-04-30",
      impact: "Cut MTTR by 1.1 hours",
      sourceSignal: "Run-support performance is improving, but AI-assisted triage is not yet scaled across all targeted queues.",
      severity: "high",
      status: "in-flight",
      progress: 61,
      evidenceState: "partial",
      evidenceSummary: "Queue telemetry and training evidence are attached; rollout proof is still partial",
      nextStep: "Finish supervisor training in two remaining towers and close the final routing exception.",
      requiredArtifacts: ["Queue coverage report", "Supervisor roster", "Rollout approval note"],
      sourceSystems: ["ServiceNow operations records", "Oversight queue telemetry", "Training telemetry"],
      closureCriteria: [
        "All target queues are live",
        "Supervisor coverage meets staffing minimum",
        "MTTR improvement is sustained for 30 days",
      ],
      openGaps: ["Two service towers still need supervisor scheduling coverage."],
      relatedMetricIds: ["delivery_flow_index", "ai_workflow_coverage"],
    },
    {
      id: "amber-backlog-forum",
      workflow: "all",
      title: "Close the amber use-case review backlog with a monthly CIO risk forum",
      owner: "Risk & Compliance",
      dueDate: "2026-05-03",
      impact: "Remove 6 active exceptions",
      sourceSignal: "Governance coverage is improving, but amber approvals are ageing and slowing safe scale.",
      severity: "high",
      status: "blocked",
      progress: 23,
      evidenceState: "missing",
      evidenceSummary: "Forum charter drafted, but closure evidence is not yet attached",
      nextStep: "Confirm standing attendees and publish the forum charter with exception disposition rules.",
      requiredArtifacts: ["Forum charter", "Exception register", "Decision log template"],
      sourceSystems: ["Control Tower policy registry", "Approval workflow ledger", "Audit evidence hub"],
      closureCriteria: [
        "Forum cadence approved and published",
        "All six amber exceptions have named owners",
        "Disposition evidence is written back to the exception register",
      ],
      openGaps: ["Standing executive attendance is not yet confirmed for the first session."],
      relatedMetricIds: ["governance_coverage", "rai_index"],
    },
  ],
  product: [
    {
      id: "release-evidence-mandate",
      workflow: "build",
      title: "Make AI-generated test evidence mandatory in release readiness reviews",
      owner: "Product Quality",
      dueDate: "2026-04-17",
      impact: "Reduce rework by 2.1 pts",
      sourceSignal: "Product build flow is strong, but release gates still accept uneven AI-generated test evidence.",
      severity: "high",
      status: "at-risk",
      progress: 39,
      evidenceState: "partial",
      evidenceSummary: "Policy change is drafted; release checklist evidence is only partly wired",
      nextStep: "Land the release checklist update and run the first evidence-complete readiness review.",
      requiredArtifacts: ["Updated readiness checklist", "Test evidence sample", "Release CAB sign-off"],
      sourceSystems: ["Product delivery dashboard", "Automated test telemetry", "Release evidence store"],
      closureCriteria: [
        "Readiness checklist updated in all product lines",
        "Evidence completeness exceeds 97% for release candidates",
        "Release CAB confirms new evidence gate is active",
      ],
      openGaps: ["Two squads still generate evidence outside the standard release workflow."],
      relatedMetricIds: ["quality_guardrail", "delivery_governance_compliance"],
    },
    {
      id: "discovery-brief-scale",
      workflow: "planning",
      title: "Scale assisted discovery briefs to all new digital initiatives",
      owner: "Product Management",
      dueDate: "2026-04-21",
      impact: "Shorten scope approval by 1.4 days",
      sourceSignal: "Planning quality is improving fastest where assisted discovery briefs are already standard.",
      severity: "medium",
      status: "in-flight",
      progress: 63,
      evidenceState: "complete",
      evidenceSummary: "Template, training, and first-wave adoption evidence are complete",
      nextStep: "Extend the playbook to the final four roadmap streams entering Q2 prioritization.",
      requiredArtifacts: ["Discovery brief template", "PM enablement attendance", "Scope-cycle baseline"],
      sourceSystems: ["Product delivery dashboard", "Roadmap intake tracker", "Training telemetry"],
      closureCriteria: [
        "All new initiatives use the standard brief",
        "Approval latency improves in the next planning wave",
        "PM enablement attendance reaches target coverage",
      ],
      openGaps: ["One roadmap stream still uses a local discovery template."],
      relatedMetricIds: ["net_productivity_gain", "delivery_flow_index"],
    },
    {
      id: "routing-tune-review-tests",
      workflow: "build",
      title: "Tune model routing for code review and regression generation",
      owner: "Engineering Enablement",
      dueDate: "2026-04-28",
      impact: "Lower annual spend by $85K",
      sourceSignal: "Build economics are improving, but expensive model usage remains too high on routine review tasks.",
      severity: "medium",
      status: "ready",
      progress: 71,
      evidenceState: "complete",
      evidenceSummary: "Quality and cost comparisons are complete and ready for decision",
      nextStep: "Approve the updated routing matrix and monitor spend for the first 30 days.",
      requiredArtifacts: ["Routing matrix", "Quality comparison pack", "Spend sensitivity analysis"],
      sourceSystems: ["FinOps AI ledger", "GitHub Enterprise checks", "Model routing telemetry"],
      closureCriteria: [
        "Routing matrix approved",
        "Quality remains inside tolerance bands",
        "30-day spend saving confirmed in product ledger",
      ],
      openGaps: ["Final approval from platform engineering is pending."],
      relatedMetricIds: ["delivery_ai_run_rate", "quality_guardrail"],
    },
    {
      id: "support-copilot-monitoring",
      workflow: "run",
      title: "Extend support copilots into post-release monitoring workflows",
      owner: "SRE",
      dueDate: "2026-05-02",
      impact: "Improve MTTR by 0.8 hours",
      sourceSignal: "Operational gains exist after release, but monitoring workflows still rely on manual correlation.",
      severity: "medium",
      status: "in-flight",
      progress: 47,
      evidenceState: "partial",
      evidenceSummary: "Pilot telemetry is attached; service handoff evidence is still open",
      nextStep: "Complete observability dashboard integration and certify the support playbook with SRE leads.",
      requiredArtifacts: ["Observability mapping", "Support playbook", "Pilot incident review"],
      sourceSystems: ["ServiceNow operations records", "Observability dashboard", "Release evidence store"],
      closureCriteria: [
        "Monitoring workflow is live in target services",
        "SRE playbook signed off",
        "MTTR improvement sustained for 30 days",
      ],
      openGaps: ["Alert handoff between observability and support tooling is not yet unified."],
      relatedMetricIds: ["delivery_flow_index", "quality_guardrail"],
    },
    {
      id: "product-line-targets",
      workflow: "all",
      title: "Set product-line adoption targets in the monthly delivery review",
      owner: "CIO Chief of Staff",
      dueDate: "2026-05-05",
      impact: "Increase coverage accountability",
      sourceSignal: "Adoption is rising, but accountability is still stronger at portfolio level than at product-line level.",
      severity: "medium",
      status: "blocked",
      progress: 28,
      evidenceState: "missing",
      evidenceSummary: "Draft scorecard exists, but product-line target evidence is not finalized",
      nextStep: "Agree the product-line target framework and write it into the monthly operating review pack.",
      requiredArtifacts: ["Monthly review scorecard", "Product-line baselines", "Target-setting memo"],
      sourceSystems: ["Product delivery dashboard", "Usage telemetry", "Operating review pack"],
      closureCriteria: [
        "Targets approved for every product line",
        "Baselines signed off by product leads",
        "Monthly review pack carries the new accountability cut",
      ],
      openGaps: ["Three product lines have not yet agreed their baseline adoption measure."],
      relatedMetricIds: ["ai_workflow_coverage", "net_productivity_gain"],
    },
  ],
  operations: [
    {
      id: "triage-all-towers",
      workflow: "run",
      title: "Expand assisted triage to all service towers handling P2 and P3 incidents",
      owner: "Operations Director",
      dueDate: "2026-04-16",
      impact: "Improve MTTR by 0.9 hours",
      sourceSignal: "RunOps is the strongest lane, but coverage is still uneven across service towers.",
      severity: "high",
      status: "in-flight",
      progress: 76,
      evidenceState: "complete",
      evidenceSummary: "Tower-by-tower rollout evidence is substantially complete",
      nextStep: "Finish the final tower activation and publish the first cross-tower performance readout.",
      requiredArtifacts: ["Tower rollout tracker", "Supervisor approval log", "Incident performance sample"],
      sourceSystems: ["ServiceNow incident telemetry", "Support queue telemetry", "Operations evidence store"],
      closureCriteria: [
        "All target towers are live",
        "Incident routing policy is consistent across towers",
        "MTTR improvement holds across all towers",
      ],
      openGaps: ["Final live-readiness check is still open for one tower."],
      relatedMetricIds: ["delivery_flow_index", "ai_workflow_coverage"],
    },
    {
      id: "runbook-template",
      workflow: "planning",
      title: "Approve a standard playbook template for AI-updated runbooks",
      owner: "Risk & Control",
      dueDate: "2026-04-20",
      impact: "Accelerate playbook approvals by 1.0 day",
      sourceSignal: "Runbook quality is improving, but approval flow still depends on local templates and manual review.",
      severity: "medium",
      status: "ready",
      progress: 66,
      evidenceState: "complete",
      evidenceSummary: "Template draft and pilot review evidence are complete",
      nextStep: "Approve the standard template and retire the last two local variants.",
      requiredArtifacts: ["Standard template", "Pilot review sample", "Policy alignment note"],
      sourceSystems: ["Runbook automation logs", "Control Tower policy registry", "Audit evidence store"],
      closureCriteria: [
        "Standard template approved",
        "Local variants retired",
        "Approval time decreases in the next 30 days",
      ],
      openGaps: ["Final legal wording check is still pending."],
      relatedMetricIds: ["quality_guardrail", "delivery_governance_compliance"],
    },
    {
      id: "rollback-evidence-checks",
      workflow: "build",
      title: "Automate rollback evidence checks on automation releases",
      owner: "Platform Engineering",
      dueDate: "2026-04-24",
      impact: "Reduce rollback risk by 0.8 pts",
      sourceSignal: "Automation releases are stable, but rollback evidence still relies on manual attachment.",
      severity: "high",
      status: "at-risk",
      progress: 42,
      evidenceState: "partial",
      evidenceSummary: "Design approved; automated evidence trail is not yet end-to-end",
      nextStep: "Complete the rollback evidence hook and validate it against the last ten automation releases.",
      requiredArtifacts: ["Release hook design", "Rollback evidence map", "Validation sample"],
      sourceSystems: ["Platform reliability dashboard", "Runbook automation logs", "Audit evidence store"],
      closureCriteria: [
        "Automated evidence hook is deployed",
        "Last ten releases are traceable end-to-end",
        "Rollback risk improves in monthly operating review",
      ],
      openGaps: ["Evidence hook still misses one legacy deployment path."],
      relatedMetricIds: ["quality_guardrail", "delivery_governance_compliance"],
    },
    {
      id: "efficient-summarization-tier",
      workflow: "all",
      title: "Shift low-complexity incident summarization to the efficient model tier",
      owner: "FinOps",
      dueDate: "2026-04-29",
      impact: "Lower annual spend by $60K",
      sourceSignal: "Operations economics are healthy, but low-complexity summarization still uses a premium tier too often.",
      severity: "medium",
      status: "ready",
      progress: 74,
      evidenceState: "complete",
      evidenceSummary: "Cost, quality, and fallback evidence are complete",
      nextStep: "Approve the routing change and confirm degraded-mode handling for tower leads.",
      requiredArtifacts: ["Routing proposal", "Quality comparison", "Fallback procedure note"],
      sourceSystems: ["FinOps AI ledger", "Model usage telemetry", "Operations evidence store"],
      closureCriteria: [
        "Routing change approved",
        "Quality remains inside tolerance",
        "Savings confirmed in next monthly ledger cut",
      ],
      openGaps: ["Tower lead communication still needs final approval."],
      relatedMetricIds: ["delivery_ai_run_rate", "quality_guardrail"],
    },
    {
      id: "policy-traceability-incident-actions",
      workflow: "run",
      title: "Mandate policy traceability for AI-assisted incident actions",
      owner: "Internal Audit",
      dueDate: "2026-05-04",
      impact: "Sustain 99% evidence completeness",
      sourceSignal: "Traceability is strong in pilot scope, but expansion will fail if incident action evidence becomes uneven.",
      severity: "high",
      status: "blocked",
      progress: 31,
      evidenceState: "missing",
      evidenceSummary: "Traceability standard is drafted, but closure evidence is still incomplete",
      nextStep: "Publish the audit standard and map every incident action type to a named evidence requirement.",
      requiredArtifacts: ["Traceability standard", "Incident action taxonomy", "Audit sampling plan"],
      sourceSystems: ["Audit evidence store", "ServiceNow incident telemetry", "Policy registry"],
      closureCriteria: [
        "Traceability standard published",
        "Every incident action type has a named evidence requirement",
        "Audit sample passes at 99% completeness",
      ],
      openGaps: ["Incident action taxonomy is not yet complete for automation-led interventions."],
      relatedMetricIds: ["delivery_governance_compliance", "quality_guardrail"],
    },
  ],
};

const actionSeverityMeta = {
  high: { label: "High severity", tone: "risk" },
  medium: { label: "Medium severity", tone: "watch" },
  low: { label: "Low severity", tone: "good" },
};

const actionStatusMeta = {
  ready: { label: "Ready for decision", tone: "accent" },
  "in-flight": { label: "In flight", tone: "good" },
  "at-risk": { label: "At risk", tone: "watch" },
  blocked: { label: "Blocked", tone: "risk" },
};

const evidenceStateMeta = {
  complete: { label: "Evidence complete", tone: "good" },
  partial: { label: "Evidence partial", tone: "watch" },
  missing: { label: "Evidence missing", tone: "risk" },
};

const evidencePackLibrary = buildEvidencePackLibrary();

const assuranceProfiles = {
  enterprise: {
    integration: {
      headline: "Most of the enterprise estate is now instrumented enough to support a decision-grade cockpit.",
      note: "The remaining risk is not total blindness; it is partial joins in a small number of towers and source feeds that still need manual enrichment.",
      metrics: [
        { label: "Teams instrumented", value: "89%", detail: "24 of 27 delivery trains publish complete workflow telemetry.", tone: "good" },
        { label: "Workflow map coverage", value: "92%", detail: "Planning and build are fully mapped; 3 run lanes remain partial.", tone: "good" },
        { label: "Source joins healthy", value: "14 / 16", detail: "Two lower-volume feeds still rely on manual reconciliation.", tone: "watch" },
        { label: "Evidence-linked events", value: "95%", detail: "In-scope events now carry a stable evidence reference into the cockpit.", tone: "good" },
      ],
    },
    audit: {
      headline: "Audit evidence is largely searchable, sealed, and fast enough for operating review.",
      note: "The audit story is credible today, but two manual joins still slow complex investigations and export assembly.",
      metrics: [
        { label: "Searchable evidence packs", value: "96%", detail: "Indexed and queryable inside the audit evidence hub.", tone: "good" },
        { label: "Immutable retention", value: "18 months", detail: "Current sealed retention window for in-scope AI records.", tone: "good" },
        { label: "Investigations in SLA", value: "93%", detail: "Most evidence requests now close inside the target operating window.", tone: "good" },
        { label: "Audit export time", value: "11 min", detail: "Median time to assemble a regulator-ready evidence export.", tone: "watch" },
      ],
    },
    alerts: {
      headline: "Most enterprise alerts are threshold-backed and fast enough to action, but recurrence is still concentrated in governance and value signals.",
      note: "The remaining concern is not lack of alerting. It is the repeat firing of a small number of burn, drift, and evidence exceptions that still need structural fixes.",
      metrics: [
        { label: "Threshold-backed alerts", value: "94%", detail: "Most active alert families now carry an explicit threshold and accountable owner.", tone: "good" },
        { label: "Active alert count", value: "18", detail: "Open threshold breaches across value, governance, and operating telemetry.", tone: "watch" },
        { label: "Mean time to acknowledge", value: "11 min", detail: "Median time from breach to accountable acknowledgement.", tone: "good" },
        { label: "Mean time to resolve", value: "2.8 h", detail: "Median time to close or safely suppress an alert after triage.", tone: "watch" },
      ],
      watchlist: [
        { name: "Prompt policy drift", threshold: "Threshold 6 / week", current: "8 this week", trend: "+2 vs prior week", tone: "watch" },
        { name: "Spend burn variance", threshold: "Threshold 5% over forecast", current: "6.3% variance", trend: "-1.1 pts vs prior week", tone: "watch" },
        { name: "Evidence ingestion failures", threshold: "Threshold 3 / day", current: "2 today", trend: "-4 vs prior week", tone: "good" },
      ],
    },
    sourceHealth: {
      headline: "Most enterprise feeds are fresh enough for daily board and delivery review, though finance and policy joins still lag the core telemetry spine.",
      note: "Freshness is generally strong; the risk sits in a small number of manual or slower-moving joins that can briefly weaken value and control completeness.",
      metrics: [
        { label: "Sources within SLO", value: "93%", detail: "Share of cockpit source feeds landing inside freshness and completeness targets.", tone: "good" },
        { label: "Pipeline success", value: "98.7%", detail: "Successful scheduled runs across source ingestion and enrichment jobs.", tone: "good" },
        { label: "Complete joins", value: "95%", detail: "Records resolving cleanly to portfolio, workflow, and evidence dimensions.", tone: "good" },
        { label: "Longest stale feed", value: "4.2 h", detail: "Current max freshness lag across active source feeds.", tone: "watch" },
      ],
      feeds: [
        { name: "Control Tower policy registry", freshness: "42 min lag", completeness: "99% complete", detail: "Policy decisions and exception status are current.", tone: "good" },
        { name: "FinOps AI ledger", freshness: "4.2 h lag", completeness: "92% complete", detail: "Still relies on one scheduled reconciliation before final value close.", tone: "watch" },
        { name: "Audit evidence store", freshness: "18 min lag", completeness: "97% complete", detail: "Evidence handles are mostly current, with a small overnight export queue.", tone: "good" },
      ],
    },
    modelMonitoring: {
      headline: "Enterprise model-runtime telemetry is broad enough to compare real operating behavior by route, not just by platform invoice or policy exception.",
      note: "This panel always shows the live last-7-day slice because model monitoring is an observability signal, not a baseline-versus-pilot comparison.",
    },
    reliability: {
      headline: "Enterprise resilience is now visible route by route, including where provider incidents, degraded-mode handling, and queue drag are starting to erode decision quality.",
      note: "This panel isolates provider and dependency resilience. Generic runtime health remains in Model monitoring, and fallback here counts only degraded-mode failover triggered by provider or orchestration pressure.",
    },
    hallucinationMethodology: {
      headline: "Enterprise answer-quality measurement is now grounded in explicit replay suites, named pass criteria, and confidence intervals rather than anecdotal trust claims.",
      note: "This panel measures grounded answer quality only. Retrieval quality and citation behavior now sit in the adjacent RAG quality slice.",
    },
    promptSecurity: {
      headline: "Enterprise prompt-security posture is now measured route by route, with explicit coverage, attack-attempt visibility, and remediation accountability.",
      note: "This panel measures prompt-security coverage and findings only. Provider outages and degraded-mode behavior now sit in the adjacent reliability slice.",
    },
    ragQuality: {
      headline: "Enterprise knowledge-grounding quality is now visible route by route, including whether the retrieval layer is finding fresh, citable evidence rather than just returning something plausible.",
      note: "This panel measures retrieval quality only. Pipeline freshness stays in Data freshness, and answer-truth scoring stays in Hallucination methodology.",
    },
  },
  product: {
    integration: {
      headline: "Product telemetry is broad enough for portfolio review, but a few squad-level joins still lag.",
      note: "The main weakness is not top-level visibility. It is inconsistent metadata capture in a small subset of squad and release workflows.",
      metrics: [
        { label: "Teams instrumented", value: "91%", detail: "13 of 14 product lines publish complete delivery telemetry.", tone: "good" },
        { label: "Workflow map coverage", value: "94%", detail: "Build and release workflows are the strongest mapped lanes.", tone: "good" },
        { label: "Source joins healthy", value: "11 / 12", detail: "One release evidence feed still needs manual merge support.", tone: "watch" },
        { label: "Evidence-linked events", value: "94%", detail: "Release and review events now mostly land with traceable evidence handles.", tone: "good" },
      ],
    },
    audit: {
      headline: "Product evidence is fast to inspect and strong enough for release governance.",
      note: "The main remaining audit weakness is not retention; it is squad-level consistency in how evidence is attached to releases.",
      metrics: [
        { label: "Searchable evidence packs", value: "95%", detail: "Most product release packs are indexed and queryable.", tone: "good" },
        { label: "Immutable retention", value: "15 months", detail: "Sealed retention window for product AI review and release evidence.", tone: "good" },
        { label: "Investigations in SLA", value: "91%", detail: "Investigation response is generally on time, with a few squad-level misses.", tone: "good" },
        { label: "Audit export time", value: "9 min", detail: "Median time to assemble a release-ready audit export.", tone: "watch" },
      ],
    },
    alerts: {
      headline: "Product alerting is reliable, but recurring cost, release-quality, and prompt-safety spikes still need tighter squad-level thresholds.",
      note: "The issue is no longer whether the product estate alerts. It is whether squads react fast enough to the same recurring warning families before release pressure builds.",
      metrics: [
        { label: "Threshold-backed alerts", value: "92%", detail: "Most release and squad alerts now carry an explicit threshold and owning team.", tone: "good" },
        { label: "Active alert count", value: "14", detail: "Open alert conditions across delivery flow, release quality, and spend.", tone: "watch" },
        { label: "Mean time to acknowledge", value: "9 min", detail: "Median time from alert breach to squad or platform acknowledgement.", tone: "good" },
        { label: "Mean time to resolve", value: "2.1 h", detail: "Median time to close alert conditions after triage and routing.", tone: "good" },
      ],
      watchlist: [
        { name: "Regression quality drift", threshold: "Threshold 3 releases / week", current: "4 this week", trend: "+1 vs prior week", tone: "watch" },
        { name: "Prompt safety exceptions", threshold: "Threshold 2 / week", current: "2 this week", trend: "Flat vs prior week", tone: "watch" },
        { name: "Release spend burn", threshold: "Threshold 4% over plan", current: "3.1% variance", trend: "-0.8 pts vs prior week", tone: "good" },
      ],
    },
    sourceHealth: {
      headline: "Product delivery feeds are current enough for operating review, with residual weakness in release evidence and squad metadata joins.",
      note: "The product trust issue is not severe staleness. It is the small number of squad-level feeds that still need manual cleanup before evidence and economics align perfectly.",
      metrics: [
        { label: "Sources within SLO", value: "96%", detail: "Share of product telemetry feeds landing within freshness targets.", tone: "good" },
        { label: "Pipeline success", value: "99.1%", detail: "Successful ingestion and enrichment jobs across release telemetry.", tone: "good" },
        { label: "Complete joins", value: "96%", detail: "Records resolving cleanly to product line, workflow, and evidence dimensions.", tone: "good" },
        { label: "Longest stale feed", value: "2.6 h", detail: "Current worst-case freshness lag across active product feeds.", tone: "watch" },
      ],
      feeds: [
        { name: "Release evidence hub", freshness: "34 min lag", completeness: "98% complete", detail: "Release packs are current and queryable for most squads.", tone: "good" },
        { name: "Automated test telemetry", freshness: "22 min lag", completeness: "97% complete", detail: "Coverage is strong, with a few long-running suites still delayed.", tone: "good" },
        { name: "Squad metadata sync", freshness: "2.6 h lag", completeness: "91% complete", detail: "Squad ownership and tag hygiene still require manual correction in a few lines.", tone: "watch" },
      ],
    },
    modelMonitoring: {
      headline: "Product runtime quality is mostly healthy, but release-repair and legal-review routes still carry more fallback, refusal, and token burn than Meridian wants at scale.",
      note: "This panel always shows the live last-7-day slice because model monitoring is an observability signal, not a baseline-versus-pilot comparison.",
    },
    reliability: {
      headline: "Product reliability is strongest in narrow release-drafting paths and weakest where repair, legal review, or research context depends on multiple providers and orchestration steps.",
      note: "This panel isolates provider incidents, degraded-mode failover, queueing delay, and quality loss. It does not repeat the broader runtime measures already shown in Model monitoring.",
    },
    hallucinationMethodology: {
      headline: "Product answer-quality evaluation is strongest in bounded drafting flows and weaker in broader reasoning or legal interpretation tasks.",
      note: "This panel measures grounded answer quality only. Retrieval quality and citation behavior now sit in the adjacent RAG quality slice.",
    },
    promptSecurity: {
      headline: "Product prompt-security coverage is strongest in narrow drafting flows and still weakest where uploads, tool actions, or high-pressure repair paths are involved.",
      note: "This panel measures prompt-security coverage and findings only. Provider outages and degraded-mode behavior now sit in the adjacent reliability slice.",
    },
    ragQuality: {
      headline: "Product retrieval quality is strongest in narrow, well-maintained corpora and weaker where research, legal, or live repair context spans multiple sources.",
      note: "This panel measures retrieval quality only. Pipeline freshness stays in Data freshness, and answer-truth scoring stays in Hallucination methodology.",
    },
  },
  operations: {
    integration: {
      headline: "RunOps has the best operational coverage, though a few automation paths are still under-instrumented.",
      note: "The operations picture is strong because queue, incident, and runbook telemetry already share a tighter operational spine.",
      metrics: [
        { label: "Teams instrumented", value: "94%", detail: "8 of 9 service towers are fully inside the telemetry model.", tone: "good" },
        { label: "Workflow map coverage", value: "96%", detail: "Run-support and incident flows are nearly fully mapped.", tone: "good" },
        { label: "Source joins healthy", value: "10 / 11", detail: "One legacy automation feed still lands outside the standard join.", tone: "watch" },
        { label: "Evidence-linked events", value: "97%", detail: "Incident and runbook events are strongly tied to evidence objects.", tone: "good" },
      ],
    },
    audit: {
      headline: "Operations evidence is highly traceable, especially for incident and intervention workflows.",
      note: "The residual gap is older automation pathways where audit export assembly still touches legacy evidence storage.",
      metrics: [
        { label: "Searchable evidence packs", value: "98%", detail: "Incident and intervention packs are nearly fully searchable.", tone: "good" },
        { label: "Immutable retention", value: "24 months", detail: "Retention is longer here because of service and risk obligations.", tone: "good" },
        { label: "Investigations in SLA", value: "96%", detail: "Evidence requests are closing comfortably inside the operating target.", tone: "good" },
        { label: "Audit export time", value: "7 min", detail: "Median time to assemble an operations-grade audit export.", tone: "good" },
      ],
    },
    alerts: {
      headline: "RunOps has the strongest live alert posture, but a few high-volume incident families still re-fire often enough to create review drag.",
      note: "Alert coverage is broad and response is fast. The remaining operating challenge is recurrence in a small number of noisy incident and fallback pathways.",
      metrics: [
        { label: "Threshold-backed alerts", value: "97%", detail: "Almost all operations alert families now carry explicit thresholds and runbook ownership.", tone: "good" },
        { label: "Active alert count", value: "11", detail: "Open alert conditions across incidents, automation, and escalation queues.", tone: "good" },
        { label: "Mean time to acknowledge", value: "6 min", detail: "Median time from breach to accountable acknowledgement.", tone: "good" },
        { label: "Mean time to resolve", value: "1.4 h", detail: "Median time to restore or safely suppress alert conditions.", tone: "good" },
      ],
      watchlist: [
        { name: "Fallback routing spikes", threshold: "Threshold 4 / day", current: "5 today", trend: "+1 vs prior day", tone: "watch" },
        { name: "Incident triage backlog", threshold: "Threshold 12 open", current: "10 open", trend: "-3 vs prior day", tone: "good" },
        { name: "Runbook execution failures", threshold: "Threshold 2 / day", current: "2 today", trend: "Flat vs prior day", tone: "watch" },
      ],
    },
    sourceHealth: {
      headline: "Operations source health is strong because incident, runbook, and reliability telemetry already share a tighter operational backbone.",
      note: "The residual gap is legacy automation telemetry rather than the core run-support spine. Most signals are fresh enough for near-real-time operating review.",
      metrics: [
        { label: "Sources within SLO", value: "98%", detail: "Share of RunOps telemetry feeds landing within freshness and completeness SLOs.", tone: "good" },
        { label: "Pipeline success", value: "99.4%", detail: "Successful ingestion and enrichment runs across operations sources.", tone: "good" },
        { label: "Complete joins", value: "98%", detail: "Records resolving cleanly to tower, workflow, and evidence dimensions.", tone: "good" },
        { label: "Longest stale feed", value: "1.4 h", detail: "Current worst-case freshness lag across operations feeds.", tone: "watch" },
      ],
      feeds: [
        { name: "ServiceNow incident telemetry", freshness: "8 min lag", completeness: "99% complete", detail: "The core incident stream is current enough for active queue management.", tone: "good" },
        { name: "Runbook automation logs", freshness: "16 min lag", completeness: "98% complete", detail: "Automation events are landing quickly with strong evidence linkage.", tone: "good" },
        { name: "Legacy automation adapter", freshness: "1.4 h lag", completeness: "93% complete", detail: "One adapter still batches late, which can briefly understate fallback events.", tone: "watch" },
      ],
    },
    modelMonitoring: {
      headline: "RunOps now has enough live route telemetry to manage model behavior as an operating service, not just a support feature.",
      note: "This panel always shows the live last-7-day slice because model monitoring is an observability signal, not a baseline-versus-pilot comparison.",
    },
    reliability: {
      headline: "RunOps now exposes the difference between being available and being resilient: several routes stay up during provider stress, but queue drag and quality loss still matter in degraded mode.",
      note: "This panel isolates provider or dependency resilience. Fallback here means degraded-mode failover under incident pressure, not every general route switch already counted in model monitoring.",
    },
    hallucinationMethodology: {
      headline: "Operations evaluation is now explicit enough to distinguish safe runbook-grounded routes from higher-variance reasoning lanes.",
      note: "This panel measures grounded answer quality only. Retrieval quality and citation behavior now sit in the adjacent RAG quality slice.",
    },
    promptSecurity: {
      headline: "Operations prompt-security posture is strongest in runbook-grounded routes and weaker in exception-heavy or reasoning-intensive lanes.",
      note: "This panel measures prompt-security coverage and findings only. Provider outages and degraded-mode behavior now sit in the adjacent reliability slice.",
    },
    ragQuality: {
      headline: "Operations retrieval quality is strongest where runbooks and service KB stay disciplined and weakest where exception-heavy knowledge changes faster than indexing.",
      note: "This panel measures retrieval quality only. Pipeline freshness stays in Data freshness, and answer-truth scoring stays in Hallucination methodology.",
    },
  },
};

const assuranceToneMeta = {
  good: "Strong",
  watch: "Watch",
  risk: "Gap",
};

const accessProfiles = {
  institutionalization: {
    roleLabel: "CEO · CFO · Board",
    posture: "Enterprise posture",
    clearance: "Board summary access",
    scopeLabel: "Aggregated enterprise rollup",
    statusChip: "Masked by design",
    headline:
      "Board viewers can see enterprise value, control, and readiness signals for the current slice without dropping into raw operational payloads or person-level activity.",
    visible: [
      "Enterprise rollups by portfolio, region, function, and risk class",
      "Named executive owners, remediation themes, and approved benchmark sources",
      "Evidence-pack summaries rather than raw restricted artifacts",
    ],
    masked: [
      "Prompt text and live model input/output content",
      "Person-level reviewer activity or operator identities",
      "Customer-specific payloads, ticket excerpts, and restricted attachments",
    ],
    controls: [
      "Exports stay at board-pack level with approved evidence references only",
      "Restricted artifacts require elevated approval outside the board view",
      "Every read and export action is logged against the viewer role",
    ],
    policyOwner: "Security + Data Governance",
    approvalGroup: "Board and enterprise leadership group",
  },
  delivery: {
    roleLabel: "CIO · Engineering · Delivery",
    posture: "Operational outcomes",
    clearance: "Operational governance access",
    scopeLabel: "Portfolio + route operations",
    statusChip: "Role-aware access",
    headline:
      "Delivery leaders can inspect route, action, and governance evidence for the selected portfolio and slice, but sensitive payloads, prompt text, and person-level identities stay masked by default.",
    visible: [
      "Portfolio KPIs, route telemetry, action workflow, and control readiness in the active slice",
      "Governance gaps, named owners, and evidence-pack summaries tied to risk class",
      "Aggregated reviewer performance, queue ageing, and audit/export readiness",
    ],
    masked: [
      "Prompt text and live request or response payload bodies",
      "PII-bearing case notes, raw ticket excerpts, and customer identifiers",
      "Named reviewer productivity and person-level incident trails",
    ],
    controls: [
      "Exports remain summary or evidence-reference only for restricted content",
      "Risk-tier and data-sensitivity policy determine whether deeper artifacts can open",
      "Access reviews run quarterly with policy-owner sign-off",
    ],
    policyOwner: "Security + Data Governance",
    approvalGroup: "CIO staff + governed exception path",
  },
};

const askPromptRegistry = {
  institutionalization: [
    { id: "scale-readiness", label: "Are we ready to scale AI?" },
    { id: "blocking-scale", label: "What is still blocking scale?" },
    { id: "value-proof", label: "Where is value already proven?" },
    { id: "leadership-next", label: "What should leadership do next?" },
  ],
  delivery: [
    { id: "what-changed", label: "What changed in this slice?" },
    { id: "needs-attention", label: "What needs attention now?" },
    { id: "why-risky", label: "Why is this slice still risky?" },
    { id: "leadership-next", label: "What should leadership do next?" },
  ],
};

const savedViewRegistry = {
  institutionalization: [
    {
      id: "board-overview",
      role: "Board default",
      title: "Scale readiness pack",
      note: "Enterprise rollup for value, control, and scale posture in the current board frame.",
      chips: ["Q2 2026", "Enterprise slice", "Scale readiness"],
      askPrompt: "scale-readiness",
      anchor: "#institution-board-readout",
      state: {
        period: "q2-2026",
        geography: "all",
        businessFunction: "all",
        useCase: "all",
        modelTier: "all",
      },
    },
    {
      id: "cfo-value-pack",
      role: "CFO lens",
      title: "Finance-grade value pack",
      note: "Restores the value chapter with finance-context segmentation and ROI proof in focus.",
      chips: ["Finance", "Value proof", "Payback"],
      askPrompt: "value-proof",
      anchor: "#institution-value",
      state: {
        period: "q2-2026",
        geography: "all",
        businessFunction: "Finance",
        useCase: "all",
        modelTier: "all",
      },
    },
    {
      id: "risk-committee",
      role: "Risk committee",
      title: "Control and readiness watch",
      note: "Brings governance blockers, control exposure, and board-next actions into one reusable lens.",
      chips: ["Risk", "Governance", "Board action"],
      askPrompt: "blocking-scale",
      anchor: "#institution-governance",
      state: {
        period: "q2-2026",
        geography: "all",
        businessFunction: "Risk",
        useCase: "all",
        modelTier: "all",
      },
    },
  ],
  delivery: [
    {
      id: "cio-operating-review",
      role: "CIO default",
      title: "Operating review",
      note: "Restores the main enterprise delivery slice for flow, oversight, economics, and executive action closure.",
      chips: ["Enterprise", "All workflows", "Pilot"],
      askPrompt: "what-changed",
      anchor: "#delivery-swimlanes",
      state: {
        period: "q2-2026",
        team: "enterprise",
        workflow: "all",
        mode: "pilot",
        oversightTab: "overview",
        geography: "all",
        businessFunction: "all",
        useCase: "all",
        modelTier: "all",
      },
    },
    {
      id: "product-engineering",
      role: "Product engineering",
      title: "Build quality and productivity",
      note: "Shifts to the digital products build slice to review throughput, quality, and train-level gain.",
      chips: ["Digital Products", "Build", "Productivity"],
      askPrompt: "what-changed",
      anchor: "#delivery-productivity",
      state: {
        period: "q2-2026",
        team: "product",
        workflow: "build",
        mode: "pilot",
        oversightTab: "overview",
        geography: "all",
        businessFunction: "all",
        useCase: "all",
        modelTier: "all",
      },
    },
    {
      id: "ops-resilience-watch",
      role: "Operations resilience",
      title: "Trust and exception watch",
      note: "Restores the RunOps support slice for oversight pressure, reliability, and trust hot spots.",
      chips: ["RunOps", "Run", "Trust"],
      askPrompt: "why-risky",
      anchor: "#delivery-trust",
      state: {
        period: "q2-2026",
        team: "operations",
        workflow: "run",
        mode: "pilot",
        oversightTab: "governance",
        geography: "all",
        businessFunction: "all",
        useCase: "all",
        modelTier: "all",
      },
    },
  ],
};

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

function topScrollBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
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

function renderValueSummaryCards(snapshot, { compact = false } = {}) {
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
    <div class="finance-card-grid ${compact ? "finance-card-grid--compact" : ""}">
      ${cards
        .map(
          (card) => `
            <article class="finance-card">
              <span class="finance-card__label">${card.label}</span>
              <strong class="finance-card__value">${card.value}</strong>
              <p>${card.note}</p>
            </article>
          `,
        )
        .join("")}
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

function renderValueInitiatives(items, { limit = null } = {}) {
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
        <article class="initiative-item initiative-item--finance">
          <div class="initiative-item__head">
            <div>
              <strong>${initiative.name}</strong>
              <p>${initiative.function} · ${initiative.stage} · ${initiative.geography} · ${initiative.deliveryTrain}</p>
            </div>
            <span class="status-chip ${initiative.financeValidated ? "status-chip--green" : "status-chip--amber"}">
              ${initiative.financeValidated ? "Finance validated" : "Directional value"}
            </span>
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
      <span class="view-bar__badge">${institutionAccess.roleLabel}</span>
      <span class="view-bar__meta">${institutionAccess.posture}</span>
      <span class="view-bar__meta view-bar__meta--access">${institutionAccess.clearance}</span>
      <span class="view-bar__meta">${institutionAccess.scopeLabel}</span>
    `;
  }

  if (elements.deliveryViewMeta && deliveryAccess) {
    elements.deliveryViewMeta.innerHTML = `
      <span class="view-bar__badge">${deliveryAccess.roleLabel}</span>
      <span class="view-bar__meta">${deliveryAccess.posture}</span>
      <span class="view-bar__meta view-bar__meta--access">${deliveryAccess.clearance}</span>
      <span class="view-bar__meta">${deliveryAccess.scopeLabel}</span>
    `;
  }
}

function renderShell() {
  const screens = {
    landing: elements.landingView,
    institutionalization: elements.institutionalizationView,
    delivery: elements.deliveryView,
  };

  Object.entries(screens).forEach(([screen, element]) => {
    element.hidden = state.screen !== screen;
  });

  const titles = {
    landing: "Meridian AI Enterprise Cockpit",
    institutionalization: "Meridian AI Enterprise Cockpit - Institutionalisation View",
    delivery: "Meridian AI Enterprise Cockpit - Delivery Engine View",
  };

  document.title = titles[state.screen] || titles.landing;
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

function getSavedViews(screen) {
  return savedViewRegistry[screen] || [];
}

function savedViewMatchesState(screen, preset) {
  const entries = Object.entries(preset.state || {});
  const stateMatches = entries.every(([key, value]) => state[key] === value);
  const askMatches = !preset.askPrompt || state.askFocus[screen] === preset.askPrompt;

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
  const container = screen === "institutionalization" ? elements.institutionalizationSavedViewsPanel : elements.deliverySavedViewsPanel;
  const presets = getSavedViews(screen);

  if (!container || !presets.length) {
    return;
  }

  const activePreset = getActiveSavedView(screen);
  const isDark = screen === "institutionalization";

  container.innerHTML = `
    <section class="saved-view-panel panel ${isDark ? "saved-view-panel--dark" : ""}">
      <div class="saved-view-panel__head">
        <div>
          <p class="eyebrow ${isDark ? "eyebrow--dark" : ""}">Saved views</p>
          <h3>Reusable role presets for this cockpit lens</h3>
        </div>
        <p class="saved-view-panel__note">
          ${activePreset
            ? `Active preset: ${activePreset.title}`
            : "Adjusted from saved view: one or more filters, toggles, or guided prompts now differ from the preset, so this is a custom slice."}
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
                    ${savedViewMatchesState(screen, preset) ? "Active" : "Restore"}
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
  const container = screen === "institutionalization" ? elements.institutionalizationAskPanel : elements.deliveryAskPanel;
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
          <h3 id="${headingId}">Guided answers from the current slice</h3>
        </div>
        <p class="ask-layer__note">
          ${screen === "institutionalization"
            ? "Board questions stay grounded in the current slice, the scorecard, and the evidence already in this cockpit."
            : "Delivery questions stay grounded in the current portfolio, workflow, active filters, and the same evidence used elsewhere in the view."}
        </p>
      </div>
      <div class="ask-layer__toolbar">
        <div class="ask-layer__prompts" role="list">
          ${promptButtonsHtml}
        </div>
        <span class="ask-layer__hint">For metric-specific definitions, use the <code>i</code> buttons and metric cards.</span>
      </div>
      ${answer ? renderAskAnswer(screen, activePrompt, answer) : `
        <div class="empty-state-card">
          <strong>Select one of the guided questions above.</strong>
          <p>The answer will stay constrained to the current slice and point back to the same metrics, actions, and evidence already visible in the cockpit.</p>
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
  const valueSummaryCardsHtml = renderValueSummaryCards(enterpriseValueSnapshot);
  const valueMixHtml = renderBenefitMix(enterpriseValueSnapshot);
  const initiativesHtml = renderValueInitiatives(enterpriseSlice);
  const dynamicPortfolioMetrics = enterpriseValueSnapshot
    ? [
        { label: "Matching initiatives", value: `${enterpriseValueSnapshot.count}`, detail: `${enterpriseValueSnapshot.productionCount} in full production today` },
        { label: "Live or scaling", value: `${enterpriseValueSnapshot.liveCount}`, detail: "Production and scaling initiatives in the current slice" },
        { label: "Finance validated", value: `${Math.round(enterpriseValueSnapshot.validatedShare)}%`, detail: "Share of realized value already backed by finance evidence" },
        { label: "Stalled value at risk", value: formatMoneyM(enterpriseValueSnapshot.stalledRisk), detail: "Forecast value currently trapped in stalled initiatives" },
      ]
    : [];
  const portfolioMetricsHtml = dynamicPortfolioMetrics.length
    ? dynamicPortfolioMetrics
        .map(
          (item) => `
            <article class="mini-stat">
              <span class="mini-stat__label">${item.label}</span>
              <div class="mini-stat__value">${item.value}</div>
              <p>${item.detail}</p>
            </article>
          `,
        )
        .join("")
    : `
      <div class="empty-state-card">
        <strong>No portfolio value snapshot is available for the current slice.</strong>
        <p>Broaden the global segmentation controls to restore the value readout.</p>
      </div>
    `;
  const northStarSpotlightValue = enterpriseValueSnapshot
    ? `${formatRatio(enterpriseValueSnapshot.roi)} ROI`
    : data.northStarSpotlight.value;
  const northStarSpotlightDetail = enterpriseValueSnapshot
    ? `${formatMoneyM(enterpriseValueSnapshot.realized)} realized value against ${formatMoneyM(enterpriseValueSnapshot.forecast)} forecast across ${enterpriseValueSnapshot.count} matching initiatives.`
    : data.northStarSpotlight.detail;
  const northStarSpotlightNote = enterpriseValueSnapshot
    ? `${Math.round(enterpriseValueSnapshot.validatedShare)}% of realized value is finance validated and weighted payback sits at ${formatMonths(enterpriseValueSnapshot.paybackMonths)}.`
    : data.northStarSpotlight.note;

  const subscoresHtml = data.subscores
    .map(
      (item) => `
        <article class="institution-header__subscore">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </article>
      `,
    )
    .join("");

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
    .filter((metric) => metric.label !== "Portfolio ROI")
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
    .map(
      (item) => `
        <article class="mini-stat">
          ${metricLabelRow(item.label, "mini-stat__label")}
          <div class="mini-stat__value">${item.value}</div>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  const workforceHtml = data.workforce
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

  const workforceValidationMetricsHtml = data.workforceValidation.metrics
    .map(
      (item) => `
        <article class="workforce-proof-card workforce-proof-card--${item.tone}">
          <span class="workforce-proof-card__label">${item.label}</span>
          <strong class="workforce-proof-card__value">${item.value}</strong>
          <p>${item.detail}</p>
        </article>
      `,
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
        <a class="institution-subnav__link" href="#${item.id}">
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
    <header class="institution-header">
      <div class="institution-header__layout">
        <div class="institution-header__content">
          <div>
            <p class="eyebrow">CEO / CFO / Board View</p>
            <h1>Institutionalisation View</h1>
          </div>
          <p class="institution-header__subtitle">
            Board-level lens on whether Meridian is turning AI from promising
            deployment activity into a governed, repeatable enterprise capability
            with durable value, trusted controls, and clear scaling choices.
          </p>
          <div class="institution-header__summary">
            <span class="scope-chip"><strong>Audience</strong><span>Board and enterprise leadership</span></span>
            <span class="scope-chip"><strong>Question</strong><span>Are we scaling AI as an enterprise capability?</span></span>
            <span class="scope-chip"><strong>Board lens</strong><span>Value, control, and scale readiness</span></span>
            <span class="scope-chip"><strong>Bridge</strong><span>Delivery evidence now feeds the enterprise story</span></span>
            <span class="scope-chip"><strong>Period</strong><span>${periodLabels[state.period]} strategic frame</span></span>
          </div>
          <div class="institution-header__filters">
            <div class="segment-toolbar__meta">
              <p class="eyebrow eyebrow--dark">Global segmentation</p>
              <p>These filters persist into Delivery and reshape the value evidence below.</p>
            </div>
            ${institutionFilterBarHtml}
          </div>
        </div>

        <aside class="institution-header__scorecard" aria-label="Institutionalisation scorecard">
          ${metricLabelRow("AII Score", "institution-header__score-label", "dark")}
          <strong class="institution-header__score-value">67</strong>
          <p class="institution-header__score-note">Out of 100 · +4 pts this quarter</p>
          <div class="institution-header__meter" aria-hidden="true">
            <span class="institution-header__meter-fill" style="width: 67%"></span>
          </div>
          <div class="institution-header__meter-scale">
            <span>0</span>
            <span>Scaling 55</span>
            <span>Native 76+</span>
          </div>
          <div class="institution-header__subscores">${subscoresHtml}</div>
        </aside>
      </div>
    </header>

    <section class="institution-strip" aria-label="Board north-star strip">
      <div class="institution-strip__stage">
        <div class="institution-strip__copy">
          <div class="institution-strip__head">
            <div>
              <p class="eyebrow eyebrow--dark">North-Star View</p>
              <h2>Strategic skin, board brain</h2>
            </div>
          </div>
          <p class="institution-strip__summary">${data.northStarStory.summary}</p>
          <div class="institution-strip__stance">
            <span class="institution-strip__stance-label">${data.northStarStory.stanceLabel}</span>
            <strong>${data.northStarStory.stance}</strong>
            <p>${data.northStarStory.stanceDetail}</p>
          </div>
          <div class="institution-strip__insights">${northStarTensionsHtml}</div>
        </div>

        <aside class="north-star-spotlight">
          <div class="metric-label-row metric-label-row--dark">
            <span class="north-star-spotlight__label">${data.northStarSpotlight.label}</span>
            ${metricInfoButton(getMetricId("Portfolio ROI"), "Portfolio ROI", "dark")}
          </div>
          <strong class="north-star-spotlight__value">${northStarSpotlightValue}</strong>
          <p class="north-star-spotlight__detail">${northStarSpotlightDetail}</p>
          <div class="institution-strip__signals">${headlineSignalsHtml}</div>
          <p class="north-star-spotlight__note">${northStarSpotlightNote}</p>
        </aside>
      </div>
      <div class="institution-panel__body">
        <div class="institution-kpi-grid">${northStarSupportingHtml}</div>
      </div>
    </section>

    <nav class="institution-subnav panel" aria-label="Institutionalisation chapters">
      <div class="institution-subnav__head">
        <p class="eyebrow">Strategic Chapters</p>
        <span class="institution-subnav__note">Scroll or jump through the board narrative</span>
      </div>
      <div class="institution-subnav__links">${institutionSubnavHtml}</div>
    </nav>

    <section id="institution-board-readout" class="panel board-readout institution-section">
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

    <section id="institution-index" class="panel institution-section">
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

    <section id="institution-bridge" class="panel institution-section">
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
        <section id="institution-value" class="panel institution-section">
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
            ${valueSummaryCardsHtml}
            <div class="institution-stat-grid">${portfolioMetricsHtml}</div>
            <div class="initiative-list">${initiativesHtml}</div>
          </div>
        </section>

        <section id="institution-workforce" class="panel institution-section">
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
            ${workforceHtml}
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
        <section id="institution-governance" class="panel institution-section">
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

        <section id="institution-debt" class="panel institution-section">
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

      <section id="institution-trust" class="panel institution-panel--full institution-section">
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

      <section id="institution-benchmarking" class="panel institution-panel--full institution-section">
        <div class="section-head">
          <div class="section-head__cluster">
            <span class="section-index">09</span>
            <div>
              <p class="eyebrow">Benchmarking</p>
              <h2>Competitive position and board priorities</h2>
            </div>
          </div>
        </div>
        <div class="institution-panel__body institution-benchmark-grid">
          <div class="benchmark-stack">
            <article class="benchmark-card">
              <strong>Where Meridian leads</strong>
              <p>${data.benchmark.strengths}</p>
            </article>
            <article class="benchmark-card">
              <strong>Where to close the gap</strong>
              <p>${data.benchmark.gaps}</p>
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
        <details class="deep-dive deep-dive--wide">
          <summary>
            <span class="deep-dive__eyebrow">Deferred from Toggle Strategic</span>
            <span class="deep-dive__title">Open benchmark comparison bars</span>
            <span class="deep-dive__hint">Explicit Meridian-vs-sector view across the core dimensions</span>
          </summary>
          <div class="deep-dive__body">
            <div class="benchmark-bar-grid">${benchmarkBarsHtml}</div>
          </div>
        </details>
      </section>

      <section id="institution-priorities" class="panel institution-panel--full institution-section">
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
  button.addEventListener("click", () => {
    state.screen = button.dataset.openScreen;
    state.metricFocus = null;
    state.evidenceFocus = null;
    render();
    window.scrollTo({ top: 0, behavior: topScrollBehavior() });
  });
});

elements.backHomeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.screen = "landing";
    state.metricFocus = null;
    state.evidenceFocus = null;
    render();
    window.scrollTo({ top: 0, behavior: topScrollBehavior() });
  });
});

document.addEventListener("click", (event) => {
  const savedViewTrigger = event.target.closest("[data-saved-view-id]");
  const askTrigger = event.target.closest("[data-ask-prompt]");
  const askClearTrigger = event.target.closest("[data-ask-clear]");
  const trigger = event.target.closest("[data-metric-id]");
  const evidenceTrigger = event.target.closest("[data-evidence-id]");

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

  if (!evidenceTrigger) {
    return;
  }

  event.preventDefault();
  lastDrawerTrigger = elements.metricDrawer.contains(evidenceTrigger) ? null : evidenceTrigger;
  state.metricFocus = null;
  state.evidenceFocus = evidenceTrigger.dataset.evidenceId;
  renderMetricDrawer();
});

elements.metricDrawerClose.addEventListener("click", closeMetricDrawer);
elements.metricDrawerScrim.addEventListener("click", closeMetricDrawer);

document.addEventListener("keydown", (event) => {
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
