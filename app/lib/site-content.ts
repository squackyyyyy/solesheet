export const siteContent = {
  brand: "SoleSheet",
  eyebrow: "Being built for Filipino resellers",
  heroTitle: "Your shoe business, out of the spreadsheet.",
  heroCopy:
    "A faster way to track pairs, profit, and installment payments—designed for resellers who run their business from a phone.",
  pricingNote: "SoleSheet is still in validation — product, pricing, and plan coverage are indicative and not available yet.",
} as const;

export const foundingOffer = {
  price: "₱65/month",
  plan: "Starter",
  audience: "the first 50 eligible survey respondents",
  duration: "their first 12 paid months",
  priceAfter: "After that, standard Starter pricing applies.",
  pricingHeadline: "₱65/month on Starter for your first 12 paid months.",
  pricingSummary:
    "Planned for the first 50 eligible survey respondents. Eligibility and redemption details will be confirmed before launch; standard Starter pricing applies after the first year.",
  finalSummary:
    "Join early access and help shape the first release. The planned ₱65/month founding Starter offer is for the first 50 eligible survey respondents during their first 12 paid months. Eligibility and redemption details will be confirmed before launch.",
  mockupEligibility: "Planned for first 50 eligible survey respondents.",
  mockupScope: "Starter only · first 12 paid months.",
} as const;

export const painPoints = [
  {
    number: "01",
    title: "Update stock while the sale is still fresh.",
    copy: "Move a pair from available to reserved or sold in a few focused taps—not across a wide spreadsheet row.",
  },
  {
    number: "02",
    title: "Know the money behind every pair.",
    copy: "Keep capital, target price, actual sale price, and profit visible without rebuilding formulas on mobile.",
  },
  {
    number: "03",
    title: "Installments stop living in chat threads.",
    copy: "See what was collected, what remains, and which sale needs attention in the same workflow as inventory.",
  },
] as const;

export const featureProof = [
  { label: "Active stock", value: "84 pairs", tone: "brand" },
  { label: "Monthly profit", value: "₱31,240", tone: "citrus" },
  { label: "Unpaid balance", value: "₱42,600", tone: "ink" },
] as const;

export const webQuickAddContent = {
  label: "Growth · Web Inventory",
  heading: "Your stockroom. One clear table.",
  positioning:
    "Manage the same SoleSheet inventory from your browser. Fixed columns keep it simple, while adding rows makes encoding multiple pairs faster. Planned for Growth.",
  disclosure: "Planned Growth feature · Static product preview",
  imageDescription:
    "Product preview of the planned Growth Web Inventory workspace showing a fixed-column SoleSheet inventory table, two emerald-highlighted New rows, Add row as pair creation, 12 pairs in inventory, 2 newly added on web, ₱53,200 inventory cost, and planned web changes appearing in mobile inventory.",
} as const;

export const plans = [
  {
    name: "Free",
    price: "₱0",
    description: "Run a small inventory properly on one device.",
    features: ["Up to 20 active pairs", "Search, filters, profit, and installments", "Local export"],
    featured: false,
  },
  {
    name: "Starter",
    price: "₱99",
    suffix: "/month",
    description: "Protect a growing inventory and stay ahead of payments.",
    features: ["Up to 150 active pairs", "Automatic cloud backup and restore", "Installment reminders and monthly summaries"],
    featured: true,
  },
  {
    name: "Growth",
    price: "₱349",
    suffix: "/month",
    description: "Save time operating larger inventory across phone and browser.",
    features: ["Up to 750 active pairs", "Web Inventory and spreadsheet import", "Cross-device sync and advanced reports"],
    featured: false,
  },
] as const;

export const starterPlan = plans[1];

type PlanComparisonState = "included" | "excluded" | "limit";

type PlanComparisonCell = {
  state: PlanComparisonState;
  value?: string;
};

type PlanComparisonRow = {
  category: "Core workflow" | "Protection" | "Scale";
  feature: string;
  free: PlanComparisonCell;
  starter: PlanComparisonCell;
  growth: PlanComparisonCell;
};

export const planComparisonRows: readonly PlanComparisonRow[] = [
  {
    category: "Core workflow",
    feature: "Active pairs",
    free: { state: "limit", value: "20" },
    starter: { state: "limit", value: "150" },
    growth: { state: "limit", value: "750" },
  },
  {
    category: "Core workflow",
    feature: "Core inventory",
    free: { state: "included" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Core workflow",
    feature: "Search and filters",
    free: { state: "included" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Core workflow",
    feature: "Profit tracking",
    free: { state: "included" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Core workflow",
    feature: "Installment tracking",
    free: { state: "included" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Core workflow",
    feature: "Sold history",
    free: { state: "included" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Core workflow",
    feature: "Local export",
    free: { state: "included" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Protection",
    feature: "Automatic cloud backup and restore",
    free: { state: "excluded" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Protection",
    feature: "Installment reminders and monthly summaries",
    free: { state: "excluded" },
    starter: { state: "included" },
    growth: { state: "included" },
  },
  {
    category: "Scale",
    feature: "Web Inventory",
    free: { state: "excluded" },
    starter: { state: "excluded" },
    growth: { state: "included" },
  },
  {
    category: "Scale",
    feature: "Spreadsheet import",
    free: { state: "excluded" },
    starter: { state: "excluded" },
    growth: { state: "included" },
  },
  {
    category: "Scale",
    feature: "Cross-device sync",
    free: { state: "excluded" },
    starter: { state: "excluded" },
    growth: { state: "included" },
  },
  {
    category: "Scale",
    feature: "Advanced reports",
    free: { state: "excluded" },
    starter: { state: "excluded" },
    growth: { state: "included" },
  },
] as const;

export const faqs = [
  {
	id: "faq-founding-offer",
	question: "How does the founding Starter offer work?",
	answer:
		"The planned ₱65/month rate applies only to Starter for the first 50 eligible survey respondents during their first 12 paid months. Eligibility and redemption details will be confirmed before launch, and standard Starter pricing applies after that first year.",
  },
  {
    id: "faq-active-pairs",
    question: "What counts as an active pair?",
    answer:
      "An active pair is any pair marked Available or Reserved. Sold pairs do not count toward your plan limit, but they stay in sold history. If a sold pair still has an installment balance, SoleSheet continues tracking the balance without making the pair active again.",
  },
  {
    id: "faq-availability",
    question: "Is the app available now?",
    answer:
      "Not yet. We are validating the core workflow with real resellers before deciding the first release platform and final feature mix.",
  },
  {
    id: "faq-web-inventory",
    question: "What is Web Inventory, and is it available now?",
    answer:
      "Web Inventory is an intended Growth feature for managing the same SoleSheet inventory from a browser. Its fixed columns keep the table structured; adding a row means adding a pair, and completed row edits are intended to appear in mobile inventory. It is not live yet—the page shows a static preview—and adding one pair from your phone remains part of the core product. Spreadsheet import is another intended Growth feature.",
  },
  {
    id: "faq-installment-plan",
    question: "Will installment tracking be paid-only?",
    answer:
      "The current plan includes installment tracking in the free tier because it is part of the everyday local reseller workflow.",
  },
  {
    id: "faq-launch-platform",
    question: "Will it launch on Android or iPhone?",
    answer:
      "Android is the likely first launch, but qualified waitlist and interview responses will guide the final platform decision.",
  },
  {
    id: "faq-sold-pairs",
    question: "What happens to sold pairs?",
    answer:
      "Sold records stay in history. They are not planned to disappear automatically, so profit and payment context remains available.",
  },
] as const;

export const surveyQuestions = {
  phone: {
    label: "What phone do you mainly use for your reseller business?",
    options: ["Android", "iPhone", "Both", "Not sure"],
  },
  plan: {
    label: "Based on what you’ve seen, what would you be willing to pay for SoleSheet?",
    options: ["Free only", "Up to ₱65/month", "Up to ₱99/month", "Up to ₱349/month", "Not sure yet"],
  },
  inventorySize: {
    label: "How many active pairs do you usually manage?",
    options: ["1–20", "21–50", "51–150", "151–750", "750+"],
  },
  installments: {
    label: "How often do you sell through installments?",
    options: ["Often", "Sometimes", "Rarely", "Never"],
  },
  currentTool: {
    label: "What do you use to track inventory today?",
    options: ["Google Sheets", "Excel", "Notes app", "Messenger", "Notebook", "Memory only", "Other"],
    otherDetailLabel: "Other inventory method",
  },
  priority: {
    label: "Which feature matters most?",
    options: ["Fast inventory updates", "Profit tracking", "Installment tracking", "Web inventory", "Cloud backup", "Reports", "Other"],
    otherDetailLabel: "Other feature",
  },
  backup: {
    label: "Would you want cloud backup and sync?",
    options: ["Yes", "Maybe", "Only if affordable", "No"],
  },
  channels: {
    label: "Where do you usually sell?",
    options: ["Facebook Marketplace", "Facebook groups", "Instagram", "TikTok", "Shopee / Lazada", "Direct messages", "Physical store", "Other"],
    otherDetailLabel: "Other sales channel",
  },
  interview: {
    label: "Would you be open to a 15-minute follow-up interview about how you manage your shoe inventory?",
    description: "We’ll message you using the contact details you joined with.",
    options: [
      "Yes — within the next 2 weeks",
      "Yes — next month or later",
      "Maybe — send me more details first",
      "No, thank you",
    ],
  },
} as const;
