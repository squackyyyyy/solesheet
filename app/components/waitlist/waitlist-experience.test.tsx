import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WaitlistExperience } from "@/app/components/waitlist/waitlist-experience";

describe("WaitlistExperience", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "setItem");
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows accessible contact and consent feedback", () => {
    render(<WaitlistExperience />);

    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    expect(
      screen.getByText(/enter a valid email address or philippine mobile number/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/agree to the privacy notice/i),
    ).toBeInTheDocument();
  });

  it("moves through signup and survey without network or storage writes", async () => {
    render(<WaitlistExperience />);

    fireEvent.change(
      screen.getByRole("textbox", { name: /email or philippine mobile/i }),
      { target: { value: "seller@example.com" } },
    );
    fireEvent.click(
      screen.getByRole("checkbox", { name: /i agree to the collection/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    await waitFor(
      () => expect(screen.getByText(/part of the first look/i)).toBeInTheDocument(),
      { timeout: 1500 },
    );

    fireEvent.click(screen.getByRole("button", { name: /answer the quick survey/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: "Android" }));
    expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
    fireEvent.click(screen.getByRole("button", { name: /answer the quick survey/i }));
    expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /finish quick survey/i }));
    expect(screen.getByText(/that’s the full flow/i)).toBeInTheDocument();
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
  });

  it("starts clean when remounted", async () => {
    const view = render(<WaitlistExperience />);
    fireEvent.change(
      screen.getByRole("textbox", { name: /email or philippine mobile/i }),
      { target: { value: "09171234567" } },
    );
    view.unmount();

    await act(async () => {
      render(<WaitlistExperience />);
    });

    expect(
      screen.getByRole("textbox", { name: /email or philippine mobile/i }),
    ).toHaveValue("");
  });
});
