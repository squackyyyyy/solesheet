export type InventoryStatus = "Available" | "Reserved" | "Sold";
export type PaymentStatus = "Unpaid" | "Partially paid" | "Paid";

export type ShoeRecord = {
  id: string;
  brand: string;
  model: string;
  colorway: string;
  size: string;
  cost: number;
  target: number;
  status: InventoryStatus;
  buyer?: string;
};

export const shoes: ShoeRecord[] = [
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
    id: "nb-530-7",
    brand: "New Balance",
    model: "530",
    colorway: "White / Silver",
    size: "US 7",
    cost: 4200,
    target: 5600,
    status: "Available",
  },
  {
    id: "samba-og-9",
    brand: "adidas",
    model: "Samba OG",
    colorway: "Core Black",
    size: "US 9",
    cost: 5700,
    target: 7200,
    status: "Sold",
    buyer: "Carlo D.",
  },
];

export const dashboard = {
  activePairs: 84,
  inventoryCost: 318400,
  expectedRevenue: 426800,
  monthlyProfit: 31240,
  unpaidBalance: 42600,
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

export const formatPeso = (amount: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
