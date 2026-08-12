export type InventoryStatus = "Available" | "Reserved" | "Sold";
export type PaymentStatus = "Unpaid" | "Partially paid" | "Paid";

export type ShoeRecord = {
  id: string;
  brand: string;
  model: string;
  colorway: string;
  size: string;
  cost: number;
  target: number | null;
  status: InventoryStatus;
  buyer?: string;
};

export const stockroomShoes: ShoeRecord[] = [
  {
    id: "dunk-cacao-85",
    brand: "Nike",
    model: "Dunk Low",
    colorway: "Cacao Wow",
    size: "US 8.5",
    cost: 4800,
    target: 6200,
    status: "Reserved",
    buyer: "Mika R.",
  },
  {
    id: "samba-og-9",
    brand: "adidas",
    model: "Samba OG",
    colorway: "Core Black",
    size: "US 9",
    cost: 5700,
    target: 7200,
    status: "Available",
  },
  {
    id: "vomero-photon-8",
    brand: "Nike",
    model: "Zoom Vomero 5",
    colorway: "Photon Dust",
    size: "US 8",
    cost: 4200,
    target: 5900,
    status: "Available",
  },
  {
    id: "gel-1130-white-75",
    brand: "ASICS",
    model: "GEL-1130",
    colorway: "White / Clay Canyon",
    size: "US 7.5",
    cost: 3900,
    target: 5400,
    status: "Reserved",
  },
  {
    id: "forum-low-85",
    brand: "adidas",
    model: "Forum Low",
    colorway: "Cloud White",
    size: "US 8.5",
    cost: 4600,
    target: 6100,
    status: "Available",
  },
  {
    id: "air-force-white-9",
    brand: "Nike",
    model: "Air Force 1 '07",
    colorway: "Triple White",
    size: "US 9",
    cost: 5200,
    target: 6800,
    status: "Available",
  },
  {
    id: "550-sea-salt-7",
    brand: "New Balance",
    model: "550",
    colorway: "Sea Salt",
    size: "US 7",
    cost: 4300,
    target: 5900,
    status: "Reserved",
  },
  {
    id: "club-c-chalk-65",
    brand: "Reebok",
    model: "Club C 85",
    colorway: "Chalk / Green",
    size: "US 6.5",
    cost: 3800,
    target: 5100,
    status: "Available",
  },
  {
    id: "gel-kayano-silver-8",
    brand: "ASICS",
    model: "GEL-KAYANO 14",
    colorway: "White / Pure Silver",
    size: "US 8",
    cost: 5600,
    target: 7400,
    status: "Available",
  },
  {
    id: "mexico-66-75",
    brand: "Onitsuka Tiger",
    model: "Mexico 66",
    colorway: "White / Blue",
    size: "US 7.5",
    cost: 4100,
    target: 5600,
    status: "Available",
  },
  {
    id: "palermo-green-7",
    brand: "PUMA",
    model: "Palermo",
    colorway: "Vine / Gum",
    size: "US 7",
    cost: 3600,
    target: 4900,
    status: "Available",
  },
  {
    id: "japan-s-white-8",
    brand: "ASICS",
    model: "JAPAN S",
    colorway: "White / Black",
    size: "US 8",
    cost: 3400,
    target: 4700,
    status: "Available",
  },
];

export const shoes = stockroomShoes.slice(0, 3);

export const webQuickAddBatch: ShoeRecord[] = stockroomShoes.map((shoe) => ({
  ...shoe,
  status: "Available",
  buyer: undefined,
}));

export const webQuickAddSummary = {
  readyCount: webQuickAddBatch.length,
  inventoryCost: webQuickAddBatch.reduce((total, shoe) => total + shoe.cost, 0),
} as const;

const stockMix = stockroomShoes.reduce(
  (counts, shoe) => {
    if (shoe.status === "Available") counts.available += 1;
    if (shoe.status === "Reserved") counts.reserved += 1;
    return counts;
  },
  { available: 0, reserved: 0 },
);

export const dashboard = {
  activePairs: stockMix.available + stockMix.reserved,
  inventoryCost: stockroomShoes.reduce((total, shoe) => total + shoe.cost, 0),
  expectedRevenue: stockroomShoes.reduce(
    (total, shoe) => total + (shoe.target ?? 0),
    0,
  ),
  monthlyProfit: 8950,
  unpaidBalance: 2500,
  stockMix,
};

export const installmentSale = {
  buyer: "Mika R.",
  shoe: "Nike Dunk Low — Cacao Wow",
  salePrice: 6500,
  downPayment: 2500,
  secondPayment: 1500,
  collected: 4000,
  remaining: 2500,
  dueDate: "Aug 18",
  paymentStatus: "Partially paid" as PaymentStatus,
};

export const recordedInstallmentPayment = {
  amount: installmentSale.secondPayment,
  collectedBefore: installmentSale.collected,
  collectedAfter: installmentSale.collected + installmentSale.secondPayment,
  remainingBefore: installmentSale.remaining,
  remainingAfter: installmentSale.remaining - installmentSale.secondPayment,
  progress: Math.round(
    ((installmentSale.collected + installmentSale.secondPayment) /
      installmentSale.salePrice) *
      100,
  ),
} as const;

export const quickLogExample: ShoeRecord = {
  id: "nb-530-white-silver-7-demo",
  brand: "New Balance",
  model: "530",
  colorway: "White / Silver",
  size: "US 7",
  cost: 4200,
  target: 5600,
  status: "Available",
};

export const formatPeso = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
