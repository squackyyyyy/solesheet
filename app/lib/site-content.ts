export const siteContent = {
  brand: "ShoeTrack",
  eyebrow: "Built with Filipino resellers",
  heroTitle: "Your shoe business, out of the spreadsheet.",
  heroCopy:
    "A faster way to track pairs, profit, and installment payments—designed for resellers who run their business from a phone.",
  pricingNote: "Planned pricing — core work stays free; paid plans add protection, scale, and time savings.",
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
  surveyOption:
    "Founding Starter — ₱65/month (planned; first 12 paid months)",
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
  { label: "Active stock", value: "84 pairs", tone: "blue" },
  { label: "Monthly profit", value: "₱31,240", tone: "citrus" },
  { label: "Unpaid balance", value: "₱42,600", tone: "ink" },
] as const;

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
    features: ["Up to 750 active pairs", "Web quick-add and spreadsheet import", "Cloud sync and advanced reports"],
    featured: false,
  },
] as const;

export const faqs = [
  {
	question: "How does the founding Starter offer work?",
	answer:
		"The planned ₱65/month rate applies only to Starter for the first 50 eligible survey respondents during their first 12 paid months. Eligibility and redemption details will be confirmed before launch, and standard Starter pricing applies after that first year.",
  },
  {
    question: "Is the app available now?",
    answer:
      "Not yet. We are validating the core workflow with real resellers before deciding the first release platform and final feature mix.",
  },
  {
    question: "Will installment tracking be paid-only?",
    answer:
      "The current plan includes installment tracking in the free tier because it is part of the everyday local reseller workflow.",
  },
  {
    question: "Will it launch on Android or iPhone?",
    answer:
      "Android is the likely first launch, but qualified waitlist and interview responses will guide the final platform decision.",
  },
  {
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
    label: "Which planned option feels closest to what you would consider?",
    options: ["Free", "Starter — ₱99/month", "Growth — ₱349/month", foundingOffer.surveyOption, "Not sure yet"],
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
  },
  priority: {
    label: "Which feature matters most?",
    options: ["Fast inventory updates", "Profit tracking", "Installment tracking", "Web quick-add", "Cloud backup", "Reports"],
  },
  backup: {
    label: "Would you want cloud backup and sync?",
    options: ["Yes", "Maybe", "Only if affordable", "No"],
  },
  channels: {
    label: "Where do you usually sell?",
    options: ["Facebook Marketplace", "Facebook groups", "Instagram", "TikTok", "Shopee / Lazada", "Direct messages", "Physical store"],
  },
  interview: {
    label: "Can we message you for a short follow-up interview?",
    options: ["Yes, happy to help", "Maybe later", "Not right now"],
  },
} as const;
