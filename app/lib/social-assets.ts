import registry from "@/app/lib/social-assets.json";
import {
  dashboard,
  formatPeso,
  installmentSale,
  quickLogExample,
  recordedInstallmentPayment,
  stockroomShoes,
} from "@/app/lib/mock-data";

export type SocialAssetSnapshot =
  | "dashboard"
  | "quick-before"
  | "quick-after"
  | "payment-before"
  | "payment-after"
  | "feature-preview"
  | "survey";

export type SocialAssetDefinition = {
  id: string;
  filename: string;
  width: number;
  height: number;
  group: "quick-log" | "installment" | "feature-preview" | "survey" | "link-preview";
  sequence: number;
  variant: string;
  headline: string;
  subhead: string;
  caption: string;
  snapshot: SocialAssetSnapshot;
};

export const socialAssets = registry as SocialAssetDefinition[];

export const socialProductContent = {
  brand: "SoleSheet",
  disclosure: "Product preview",
  audience: "Built for Philippine shoe resellers",
  status: "Upcoming product",
  dashboard,
  quickLog: {
    pair: quickLogExample,
    beforePairs: dashboard.activePairs,
    afterPairs: dashboard.activePairs + 1,
    beforeCapital: dashboard.inventoryCost,
    afterCapital: dashboard.inventoryCost + quickLogExample.cost,
    margin:
      quickLogExample.target == null
        ? null
        : quickLogExample.target - quickLogExample.cost,
  },
  sale: {
    pair: stockroomShoes[0],
    price: installmentSale.salePrice,
    soldDate: "Aug 11, 2026",
  },
  installment: {
    ...installmentSale,
    examplePayment: recordedInstallmentPayment.amount,
    afterCollected: recordedInstallmentPayment.collectedAfter,
    afterRemaining: recordedInstallmentPayment.remainingAfter,
  },
  formatted: {
    inventoryBefore: formatPeso(dashboard.inventoryCost),
    inventoryAfter: formatPeso(dashboard.inventoryCost + quickLogExample.cost),
    paymentBefore: formatPeso(recordedInstallmentPayment.collectedBefore),
    paymentAfter: formatPeso(recordedInstallmentPayment.collectedAfter),
    balanceBefore: formatPeso(recordedInstallmentPayment.remainingBefore),
    balanceAfter: formatPeso(recordedInstallmentPayment.remainingAfter),
  },
} as const;

export function getSocialAsset(id: string) {
  return socialAssets.find((asset) => asset.id === id);
}
