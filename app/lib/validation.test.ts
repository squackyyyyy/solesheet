import { describe, expect, it } from "vitest";
import { isValidWaitlistEmail } from "@/app/lib/validation";

describe("isValidWaitlistEmail", () => {
  it.each([
    "seller@example.com",
    "name+reseller@shop.ph",
    " seller@example.com ",
  ])("accepts %s", (value) => {
    expect(isValidWaitlistEmail(value)).toBe(true);
  });

  it.each([
    "",
    "seller",
    "seller@invalid",
    "09171234567",
    "+639171234567",
    "0917 123 4567",
  ])("rejects %s", (value) => {
    expect(isValidWaitlistEmail(value)).toBe(false);
  });
});
