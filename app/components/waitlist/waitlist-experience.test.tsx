import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  WaitlistCta,
  WaitlistExperience,
} from "@/app/components/waitlist/waitlist-experience";
import { WaitlistJourneyProvider } from "@/app/components/waitlist/waitlist-journey";

function renderExperience({ withPageCtas = false } = {}) {
  return render(
    <WaitlistJourneyProvider>
      {withPageCtas ? (
        <>
          <WaitlistCta />
          <WaitlistCta variant="secondary" />
          <WaitlistCta variant="quiet" />
        </>
      ) : null}
      <WaitlistExperience />
    </WaitlistJourneyProvider>,
  );
}

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
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    expect(
      screen.getByText(/enter a valid email address or philippine mobile number/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/agree to the privacy notice/i),
    ).toBeInTheDocument();
  });

  it("moves through signup and survey without network or storage writes", async () => {
    renderExperience({ withPageCtas: true });

    fireEvent.change(
      screen.getByRole("textbox", { name: /email or philippine mobile/i }),
      { target: { value: "seller@example.com" } },
    );
    fireEvent.click(
      screen.getByRole("checkbox", { name: /i agree to the collection/i }),
    );
    fireEvent.click(
      screen.getAllByRole("button", { name: /join the waitlist/i }).at(-1)!,
    );

    await waitFor(
      () => expect(screen.getByText(/part of the first look/i)).toBeInTheDocument(),
      { timeout: 1500 },
    );

    expect(
      screen.getAllByRole("button", { name: /answer the quick survey/i }),
    ).toHaveLength(4);
    expect(
      screen.getByText(/you’re on the waitlist\. help shape what we build first/i),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByRole("button", { name: /answer the quick survey/i })[0],
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: "Android" }));
    expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
    fireEvent.click(
      screen.getAllByRole("button", { name: /answer the quick survey/i })[1],
    );
    expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /finish quick survey/i }));
    expect(screen.getByText(/that’s the full flow/i)).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: /close survey/i })[0]);
    expect(
      screen.getByText(/thanks for helping shape solesheet/i),
    ).toBeInTheDocument();
    for (const cta of screen.getAllByRole("button", {
      name: /you’re all set — thank you/i,
    })) {
      expect(cta).toBeDisabled();
      expect(cta).toHaveTextContent("✓");
    }
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
  });

  it("starts clean when remounted", async () => {
    const view = renderExperience({ withPageCtas: true });
    fireEvent.change(
      screen.getByRole("textbox", { name: /email or philippine mobile/i }),
      { target: { value: "09171234567" } },
    );
    view.unmount();

    await act(async () => {
      renderExperience({ withPageCtas: true });
    });

    expect(
      screen.getByRole("textbox", { name: /email or philippine mobile/i }),
    ).toHaveValue("");
    expect(
      screen.getAllByRole("button", { name: /join the waitlist/i }),
    ).toHaveLength(4);
  });
});
