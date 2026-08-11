import {
  installmentSale,
  quickLogExample,
  stockroomShoes,
  type PaymentStatus,
  type ShoeRecord,
} from "@/app/lib/mock-data";

export type DemoPayment = {
  id: string;
  label: string;
  amount: number;
  date: string;
};

export type ProductProofState = {
  inventory: ShoeRecord[];
  quickLogPair: ShoeRecord | null;
  payments: DemoPayment[];
};

export type ProductProofAction =
  | { type: "SAVE_QUICK_LOG_PAIR"; pair: ShoeRecord }
  | { type: "ADD_INSTALLMENT_PAYMENT"; amount: number }
  | { type: "RESET_DEMO" };

const initialPayments: DemoPayment[] = [
  {
    id: "down-payment",
    label: "Down payment",
    amount: installmentSale.downPayment,
    date: "Jul 12",
  },
  {
    id: "payment-2",
    label: "Payment #2",
    amount: installmentSale.secondPayment,
    date: "Jul 28",
  },
];

export function createInitialProductProofState(): ProductProofState {
  return {
    inventory: stockroomShoes.map((shoe) => ({ ...shoe })),
    quickLogPair: null,
    payments: initialPayments.map((payment) => ({ ...payment })),
  };
}

export function selectActiveInventory(state: ProductProofState) {
  return state.inventory.filter((shoe) => shoe.status !== "Sold");
}

export function selectActivePairs(state: ProductProofState) {
  return selectActiveInventory(state).length;
}

export function selectInventoryCapital(state: ProductProofState) {
  return selectActiveInventory(state).reduce((total, shoe) => total + shoe.cost, 0);
}

export function selectPotentialMargin(pair: ShoeRecord | null) {
  return pair?.target == null ? null : pair.target - pair.cost;
}

export function selectCollected(state: ProductProofState) {
  return state.payments.reduce((total, payment) => total + payment.amount, 0);
}

export function selectRemainingBalance(state: ProductProofState) {
  return Math.max(installmentSale.salePrice - selectCollected(state), 0);
}

export function selectPaymentProgress(state: ProductProofState) {
  return Math.min((selectCollected(state) / installmentSale.salePrice) * 100, 100);
}

export function selectPaymentStatus(state: ProductProofState): PaymentStatus {
  const collected = selectCollected(state);
  if (collected <= 0) return "Unpaid";
  if (collected >= installmentSale.salePrice) return "Paid";
  return "Partially paid";
}

export function productProofReducer(
  state: ProductProofState,
  action: ProductProofAction,
): ProductProofState {
  switch (action.type) {
    case "SAVE_QUICK_LOG_PAIR":
      if (state.quickLogPair) return state;
      return {
        ...state,
        inventory: [...state.inventory, { ...action.pair }],
        quickLogPair: { ...action.pair },
      };
    case "ADD_INSTALLMENT_PAYMENT": {
      const remaining = selectRemainingBalance(state);
      if (!Number.isFinite(action.amount) || action.amount <= 0 || action.amount > remaining) {
        return state;
      }
      return {
        ...state,
        payments: [
          ...state.payments,
          {
            id: `demo-payment-${state.payments.length + 1}`,
            label: `Payment #${state.payments.length + 1}`,
            amount: action.amount,
            date: "Today",
          },
        ],
      };
    }
    case "RESET_DEMO":
      return createInitialProductProofState();
  }
}

export const productProofFixtures = {
  initialActivePairs: stockroomShoes.length,
  initialInventoryCapital: stockroomShoes.reduce(
    (total, shoe) => total + shoe.cost,
    0,
  ),
  quickLogExample,
  installmentSale,
  suggestedPayment: 1500,
};
