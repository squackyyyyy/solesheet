import { describe, expect, it } from "vitest";
import { isValidWaitlistContact } from "@/app/lib/validation";

describe("isValidWaitlistContact", () => {
  it.each([
    "seller@example.com",
    "name+reseller@shop.ph",
    "09171234567",
    "+639171234567",
    "0917 123 4567",
  ])("accepts %s", (value) => {
    expect(isValidWaitlistContact(value)).toBe(true);
  });

  it.each(["", "seller", "0917123", "+631234", "seller@invalid"])(
    "rejects %s",
    (value) => {
      expect(isValidWaitlistContact(value)).toBe(false);
    },
  );
});
