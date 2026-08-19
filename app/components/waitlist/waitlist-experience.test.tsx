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

async function joinAndOpenSurvey() {
  fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
    target: { value: "seller@example.com" },
  });
  fireEvent.click(
    screen.getByRole("checkbox", { name: /i agree to the collection/i }),
  );
  fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

  await waitFor(
    () => expect(screen.getByText(/part of the first look/i)).toBeInTheDocument(),
    { timeout: 1500 },
  );
  fireEvent.click(
    screen.getByRole("button", { name: /answer the quick survey/i }),
  );
  expect(screen.getByRole("dialog")).toBeInTheDocument();
}

function chooseSelectOption(question: RegExp, option: string) {
  fireEvent.click(screen.getByRole("button", { name: question }));
  fireEvent.click(screen.getByRole("option", { name: option }));
}

function continueToOptionalQuestions() {
	fireEvent.click(
		screen.getByRole("button", { name: /continue to optional questions/i }),
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

    const email = screen.getByRole("textbox", { name: "Email address" });
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("autocomplete", "email");
    expect(email).toHaveAttribute("placeholder", "you@email.com");

    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(
      screen.getByText(/agree to the privacy notice/i),
    ).toBeInTheDocument();
  });

  it("rejects a Philippine mobile number as a waitlist contact", () => {
    renderExperience();

    const email = screen.getByRole("textbox", { name: "Email address" });
    fireEvent.change(email, { target: { value: "09171234567" } });
    fireEvent.click(
      screen.getByRole("checkbox", { name: /i agree to the collection/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

    expect(email).toHaveValue("09171234567");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.queryByText(/part of the first look/i)).not.toBeInTheDocument();
  });

	it("moves through signup and survey without network or storage writes", async () => {
    renderExperience({ withPageCtas: true });

    fireEvent.change(
      screen.getByRole("textbox", { name: "Email address" }),
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
		expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
		expect(screen.getByText(/about 30 seconds/i)).toBeInTheDocument();
		expect(
			screen.queryByRole("button", {
				name: /which planned option feels closest/i,
			}),
		).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("radio", { name: "Android" }));
    expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
    fireEvent.click(
      screen.getAllByRole("button", { name: /answer the quick survey/i })[1],
    );
    expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

		fireEvent.click(screen.getByRole("button", { name: /finish survey now/i }));
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

	it("captures independent Other details and retains them while the page stays open", async () => {
    renderExperience();
    await joinAndOpenSurvey();

    chooseSelectOption(/what do you use to track inventory today/i, "Other");
    fireEvent.change(
      screen.getByRole("textbox", { name: "Other inventory method" }),
      { target: { value: "Airtable" } },
    );

    chooseSelectOption(/which feature matters most/i, "Other");
		fireEvent.change(screen.getByRole("textbox", { name: "Other feature" }), {
			target: { value: "Supplier purchase tracking" },
		});

		continueToOptionalQuestions();
		expect(screen.getByText("Step 2 of 2 · Optional")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox", { name: "Instagram" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
    fireEvent.change(
      screen.getByRole("textbox", { name: "Other sales channel" }),
      { target: { value: "Weekend pop-ups" } },
    );

		expect(
			screen.getByRole("textbox", { name: "Other sales channel" }),
		).toHaveValue("Weekend pop-ups");
		expect(screen.getByRole("checkbox", { name: "Instagram" })).toBeChecked();

		fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(
      screen.getByRole("textbox", { name: "Other inventory method" }),
    ).toHaveValue("Airtable");
    expect(screen.getByRole("textbox", { name: "Other feature" })).toHaveValue(
      "Supplier purchase tracking",
    );

		continueToOptionalQuestions();

    fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
		fireEvent.click(
			screen.getByRole("button", { name: /answer the quick survey/i }),
    );
		expect(screen.getByText("Step 2 of 2 · Optional")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Other sales channel" }),
    ).toHaveValue("Weekend pop-ups");
		expect(screen.getByRole("checkbox", { name: "Instagram" })).toBeChecked();

		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		expect(
			screen.getByRole("textbox", { name: "Other inventory method" }),
		).toHaveValue("Airtable");
		expect(screen.getByRole("textbox", { name: "Other feature" })).toHaveValue(
			"Supplier purchase tracking",
		);
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(Storage.prototype.setItem).not.toHaveBeenCalled();
  });

	it("clears only a deselected Other detail and permits blank Other completion", async () => {
    renderExperience();
    await joinAndOpenSurvey();

    chooseSelectOption(/what do you use to track inventory today/i, "Other");
    fireEvent.change(
      screen.getByRole("textbox", { name: "Other inventory method" }),
      { target: { value: "Airtable" } },
    );
    chooseSelectOption(/which feature matters most/i, "Other");
		fireEvent.change(screen.getByRole("textbox", { name: "Other feature" }), {
			target: { value: "Purchase orders" },
		});

		continueToOptionalQuestions();
		fireEvent.click(screen.getByRole("checkbox", { name: "Instagram" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
    fireEvent.change(
      screen.getByRole("textbox", { name: "Other sales channel" }),
      { target: { value: "Weekend pop-ups" } },
    );

		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		chooseSelectOption(/what do you use to track inventory today/i, "Excel");
    expect(
      screen.queryByRole("textbox", { name: "Other inventory method" }),
    ).not.toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: "Other feature" })).toHaveValue(
			"Purchase orders",
		);

		continueToOptionalQuestions();
		expect(
			screen.getByRole("textbox", { name: "Other sales channel" }),
		).toHaveValue("Weekend pop-ups");

		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		chooseSelectOption(/what do you use to track inventory today/i, "Other");
    expect(
      screen.getByRole("textbox", { name: "Other inventory method" }),
    ).toHaveValue("");

    chooseSelectOption(/which feature matters most/i, "Reports");
    expect(
      screen.queryByRole("textbox", { name: "Other feature" }),
    ).not.toBeInTheDocument();
    chooseSelectOption(/which feature matters most/i, "Other");
		expect(screen.getByRole("textbox", { name: "Other feature" })).toHaveValue(
			"",
		);

		continueToOptionalQuestions();
		fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
    expect(
      screen.queryByRole("textbox", { name: "Other sales channel" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Instagram" })).toBeChecked();
    fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
    expect(
      screen.getByRole("textbox", { name: "Other sales channel" }),
    ).toHaveValue("");

    fireEvent.click(screen.getByRole("button", { name: /finish quick survey/i }));
		expect(screen.getByText(/that’s the full flow/i)).toBeInTheDocument();
	});

	it("moves forward and back with blank answers while preserving core values", async () => {
		renderExperience();
		await joinAndOpenSurvey();

		fireEvent.click(screen.getByRole("radio", { name: "Android" }));
		const activeHelp = screen.getByRole("link", {
			name: /what counts as active/i,
		});
		expect(activeHelp).toHaveAttribute("href", "/#faq-active-pairs");
		expect(activeHelp).toHaveAttribute("target", "_blank");

		continueToOptionalQuestions();
		expect(screen.getByText("Step 2 of 2 · Optional")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /which planned option feels closest/i }),
		).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		expect(screen.getByText("Step 1 of 2")).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();
		expect(globalThis.fetch).not.toHaveBeenCalled();
		expect(Storage.prototype.setItem).not.toHaveBeenCalled();
	});

  it("resets Other details when the experience is remounted", async () => {
    const view = renderExperience();
    await joinAndOpenSurvey();

    chooseSelectOption(/what do you use to track inventory today/i, "Other");
    fireEvent.change(
      screen.getByRole("textbox", { name: "Other inventory method" }),
      { target: { value: "Airtable" } },
    );
    view.unmount();

    renderExperience();
    await joinAndOpenSurvey();
    chooseSelectOption(/what do you use to track inventory today/i, "Other");
    expect(
      screen.getByRole("textbox", { name: "Other inventory method" }),
    ).toHaveValue("");
  });

  it("starts clean when remounted", async () => {
    const view = renderExperience({ withPageCtas: true });
    fireEvent.change(
      screen.getByRole("textbox", { name: "Email address" }),
      { target: { value: "seller@example.com" } },
    );
    view.unmount();

    await act(async () => {
      renderExperience({ withPageCtas: true });
    });

    expect(
      screen.getByRole("textbox", { name: "Email address" }),
    ).toHaveValue("");
    expect(
      screen.getAllByRole("button", { name: /join the waitlist/i }),
    ).toHaveLength(4);
  });
});
