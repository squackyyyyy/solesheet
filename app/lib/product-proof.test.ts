import { describe, expect, it } from "vitest";
import {
  createInitialProductProofState,
  productProofFixtures,
  productProofReducer,
  selectActivePairs,
  selectCollected,
  selectInventoryCapital,
  selectPaymentProgress,
  selectPaymentStatus,
  selectPotentialMargin,
  selectRemainingBalance,
} from "@/app/lib/product-proof";

describe("product proof model", () => {
  it("derives the documented initial stockroom", () => {
    const state = createInitialProductProofState();
    expect(selectActivePairs(state)).toBe(12);
    expect(selectInventoryCapital(state)).toBe(53200);
    expect(selectCollected(state)).toBe(4000);
    expect(selectRemainingBalance(state)).toBe(2500);
  });

  it("adds the Quick Log pair once and derives its totals", () => {
    const initial = createInitialProductProofState();
    const saved = productProofReducer(initial, {
      type: "SAVE_QUICK_LOG_PAIR",
      pair: productProofFixtures.quickLogExample,
    });
    const duplicate = productProofReducer(saved, {
      type: "SAVE_QUICK_LOG_PAIR",
      pair: productProofFixtures.quickLogExample,
    });

    expect(selectActivePairs(saved)).toBe(13);
    expect(selectInventoryCapital(saved)).toBe(57400);
    expect(selectPotentialMargin(saved.quickLogPair)).toBe(1400);
    expect(duplicate).toBe(saved);
  });

  it("does not invent a margin when target price is omitted", () => {
    expect(
      selectPotentialMargin({
        ...productProofFixtures.quickLogExample,
        target: null,
      }),
    ).toBeNull();
  });

  it("supports partial and full payment outcomes", () => {
    const initial = createInitialProductProofState();
    const partial = productProofReducer(initial, {
      type: "ADD_INSTALLMENT_PAYMENT",
      amount: 1500,
    });
    const paid = productProofReducer(initial, {
      type: "ADD_INSTALLMENT_PAYMENT",
      amount: 2500,
    });

    expect(selectCollected(partial)).toBe(5500);
    expect(selectRemainingBalance(partial)).toBe(1000);
    expect(selectPaymentStatus(partial)).toBe("Partially paid");
    expect(selectPaymentProgress(partial)).toBeCloseTo(84.615, 2);
    expect(selectRemainingBalance(paid)).toBe(0);
    expect(selectPaymentStatus(paid)).toBe("Paid");
    expect(selectPaymentProgress(paid)).toBe(100);
  });

  it("rejects invalid payments and resets to a fresh exact state", () => {
    const initial = createInitialProductProofState();
    expect(
      productProofReducer(initial, {
        type: "ADD_INSTALLMENT_PAYMENT",
        amount: 2501,
      }),
    ).toBe(initial);
    expect(
      productProofReducer(initial, {
        type: "ADD_INSTALLMENT_PAYMENT",
        amount: 0,
      }),
    ).toBe(initial);

    const changed = productProofReducer(initial, {
      type: "SAVE_QUICK_LOG_PAIR",
      pair: productProofFixtures.quickLogExample,
    });
    const reset = productProofReducer(changed, { type: "RESET_DEMO" });
    expect(reset).toEqual(createInitialProductProofState());
    expect(reset).not.toBe(initial);
  });
});
