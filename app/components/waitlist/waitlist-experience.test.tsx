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
	fireEvent.click(
		screen.getAllByRole("button", { name: /join the waitlist/i }).at(-1)!,
	);
	await waitFor(
		() => expect(screen.getByText(/part of the first look/i)).toBeInTheDocument(),
		{ timeout: 1500 },
	);
	fireEvent.click(
		screen.getAllByRole("button", { name: /answer the quick survey/i })[0],
	);
	expect(screen.getByRole("dialog")).toBeInTheDocument();
}

function skipQuestion() {
	fireEvent.click(screen.getByRole("button", { name: /skip question/i }));
}

async function expectQuestion(name: RegExp, progress: string) {
	const heading = await screen.findByRole("heading", { name });
	expect(heading).toHaveFocus();
	expect(screen.getByText(progress)).toBeInTheDocument();
	return heading;
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
		expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
		expect(email).toHaveAttribute("aria-invalid", "true");
		expect(
			screen.getByText(/agree to the privacy policy/i),
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

	it("walks through the four core questions and completes without writes", async () => {
		renderExperience({ withPageCtas: true });
		await joinAndOpenSurvey();
		await expectQuestion(/what phone do you mainly use/i, "Question 1 of 4");
		const progress = screen.getByRole("progressbar", {
			name: "Question 1 of 4",
		});
		expect(progress).toHaveAttribute("aria-valuenow", "1");
		expect(progress).toHaveAttribute("aria-valuemax", "4");
		const progressFill = progress.querySelector(
			'[data-survey-progress-fill="true"]',
		);
		expect(progressFill).toHaveStyle({ width: "25%" });

		fireEvent.click(screen.getByRole("radio", { name: "Android" }));
		expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();
		await expectQuestion(/how many active pairs/i, "Question 2 of 4");
		expect(
			screen
				.getByRole("progressbar", { name: "Question 2 of 4" })
				.querySelector('[data-survey-progress-fill="true"]'),
		).toBe(progressFill);
		expect(progressFill).toHaveStyle({ width: "50%" });
		const help = screen.getByRole("link", {
			name: /what pairs count as active/i,
		});
		expect(help).toHaveAttribute("href", "/#faq-active-pairs");
		expect(help).toHaveAttribute("target", "_blank");

		fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
		fireEvent.click(
			screen.getAllByRole("button", { name: /answer the quick survey/i })[0],
		);
		await expectQuestion(/how many active pairs/i, "Question 2 of 4");
		skipQuestion();
		await expectQuestion(/what do you use to track inventory today/i, "Question 3 of 4");
		fireEvent.click(screen.getByRole("radio", { name: "Other" }));
		fireEvent.change(
			screen.getByRole("textbox", { name: "Other inventory method" }),
			{ target: { value: "Airtable" } },
		);
		fireEvent.click(screen.getByRole("button", { name: /next question/i }));
		await expectQuestion(/which feature matters most/i, "Question 4 of 4");
		fireEvent.click(screen.getByRole("button", { name: /finish this survey/i }));

		expect(screen.getByText(/that’s the full flow/i)).toBeInTheDocument();
		fireEvent.click(screen.getAllByRole("button", { name: /close survey/i })[0]);
		expect(screen.getByText(/thanks for helping shape solesheet/i)).toBeInTheDocument();
		for (const cta of screen.getAllByRole("button", {
			name: /you’re all set — thank you/i,
		})) {
			expect(cta).toBeDisabled();
			expect(cta).toHaveTextContent("✓");
		}
		expect(globalThis.fetch).not.toHaveBeenCalled();
		expect(Storage.prototype.setItem).not.toHaveBeenCalled();
	});

	it("cancels pending auto-advance on close and advances only once", async () => {
		renderExperience();
		await joinAndOpenSurvey();
		fireEvent.click(screen.getByRole("radio", { name: "Android" }));
		fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
		await act(async () => new Promise((resolve) => setTimeout(resolve, 280)));
		fireEvent.click(
			screen.getByRole("button", { name: /answer the quick survey/i }),
		);
		await expectQuestion(/what phone do you mainly use/i, "Question 1 of 4");
		expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();

		fireEvent.click(screen.getByRole("radio", { name: "iPhone" }));
		fireEvent.click(screen.getByRole("radio", { name: "Both" }));
		await expectQuestion(/how many active pairs/i, "Question 2 of 4");
		await act(async () => new Promise((resolve) => setTimeout(resolve, 280)));
		expect(screen.getByText("Question 2 of 4")).toBeInTheDocument();
	});

	it("preserves Other details and answers across optional navigation", async () => {
		renderExperience();
		await joinAndOpenSurvey();
		skipQuestion();
		skipQuestion();
		fireEvent.click(screen.getByRole("radio", { name: "Other" }));
		fireEvent.change(
			screen.getByRole("textbox", { name: "Other inventory method" }),
			{ target: { value: "Airtable" } },
		);
		fireEvent.click(screen.getByRole("radio", { name: "Excel" }));
		await expectQuestion(/which feature matters most/i, "Question 4 of 4");
		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		fireEvent.click(screen.getByRole("radio", { name: "Other" }));
		expect(
			screen.getByRole("textbox", { name: "Other inventory method" }),
		).toHaveValue("");
		fireEvent.change(
			screen.getByRole("textbox", { name: "Other inventory method" }),
			{ target: { value: "Notebook plus tags" } },
		);
		fireEvent.click(screen.getByRole("button", { name: /next question/i }));
		fireEvent.click(screen.getByRole("radio", { name: "Other" }));
		fireEvent.change(screen.getByRole("textbox", { name: "Other feature" }), {
			target: { value: "Supplier purchase tracking" },
		});
		fireEvent.click(screen.getByRole("button", { name: /continue survey/i }));

		await expectQuestion(/which planned option feels closest/i, "Optional question 1 of 5");
		fireEvent.click(screen.getByRole("radio", { name: "Free" }));
		await expectQuestion(/how often do you sell through installments/i, "Optional question 2 of 5");
		fireEvent.click(screen.getByRole("radio", { name: "Often" }));
		await expectQuestion(/would you want cloud backup and sync/i, "Optional question 3 of 5");
		fireEvent.click(screen.getByRole("radio", { name: "Yes" }));
		await expectQuestion(/where do you usually sell/i, "Optional question 4 of 5");
		fireEvent.click(screen.getByRole("checkbox", { name: "Instagram" }));
		fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
		fireEvent.change(
			screen.getByRole("textbox", { name: "Other sales channel" }),
			{ target: { value: "Weekend pop-ups" } },
		);

		fireEvent.click(screen.getByRole("button", { name: /close survey/i }));
		fireEvent.click(
			screen.getByRole("button", { name: /answer the quick survey/i }),
		);
		await expectQuestion(/where do you usually sell/i, "Optional question 4 of 5");
		expect(screen.getByRole("checkbox", { name: "Instagram" })).toBeChecked();
		expect(screen.getByRole("textbox", { name: "Other sales channel" })).toHaveValue(
			"Weekend pop-ups",
		);

		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		expect(screen.getByRole("radio", { name: "Yes" })).toBeChecked();
		fireEvent.click(screen.getByRole("button", { name: /next question/i }));
		fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
		expect(
			screen.queryByRole("textbox", { name: "Other sales channel" }),
		).not.toBeInTheDocument();
		expect(screen.getByRole("checkbox", { name: "Instagram" })).toBeChecked();
		fireEvent.click(screen.getByRole("checkbox", { name: "Other" }));
		expect(screen.getByRole("textbox", { name: "Other sales channel" })).toHaveValue("");
		fireEvent.click(screen.getByRole("button", { name: /next question/i }));

		await expectQuestion(/15-minute follow-up interview/i, "Optional question 5 of 5");
		fireEvent.click(
			screen.getByRole("radio", { name: "Yes — within the next 2 weeks" }),
		);
		expect(
			screen.getByRole("radio", { name: "Yes — within the next 2 weeks" }),
		).toBeChecked();
		fireEvent.click(screen.getByRole("button", { name: /finish this survey/i }));
		expect(screen.getByText(/that’s the full flow/i)).toBeInTheDocument();
		expect(globalThis.fetch).not.toHaveBeenCalled();
		expect(Storage.prototype.setItem).not.toHaveBeenCalled();
	});

	it("moves backward across the optional boundary without losing core answers", async () => {
		renderExperience();
		await joinAndOpenSurvey();
		fireEvent.click(screen.getByRole("radio", { name: "Android" }));
		await expectQuestion(/how many active pairs/i, "Question 2 of 4");
		skipQuestion();
		skipQuestion();
		fireEvent.click(screen.getByRole("radio", { name: "Reports" }));
		await expectQuestion(/which planned option feels closest/i, "Optional question 1 of 5");
		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		await expectQuestion(/which feature matters most/i, "Question 4 of 4");
		expect(screen.getByRole("radio", { name: "Reports" })).toBeChecked();
		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		await expectQuestion(/what phone do you mainly use/i, "Question 1 of 4");
		expect(screen.getByRole("radio", { name: "Android" })).toBeChecked();
	});

	it("uses immediate navigation in reduced-motion mode", async () => {
		Object.defineProperty(window, "matchMedia", {
			configurable: true,
			value: vi.fn().mockReturnValue({ matches: true }),
		});
		renderExperience();
		await joinAndOpenSurvey();
		fireEvent.click(screen.getByRole("radio", { name: "Android" }));
		await expectQuestion(/how many active pairs/i, "Question 2 of 4");
	});

	it("starts the survey and its answers clean when remounted", async () => {
		const view = renderExperience();
		await joinAndOpenSurvey();
		fireEvent.click(screen.getByRole("radio", { name: "Android" }));
		await expectQuestion(/how many active pairs/i, "Question 2 of 4");
		view.unmount();

		renderExperience();
		await joinAndOpenSurvey();
		await expectQuestion(/what phone do you mainly use/i, "Question 1 of 4");
		expect(screen.queryByRole("radio", { checked: true })).not.toBeInTheDocument();
	});

	it("starts the signup form clean when remounted", async () => {
		const view = renderExperience({ withPageCtas: true });
		fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
			target: { value: "seller@example.com" },
		});
		view.unmount();
		await act(async () => {
			renderExperience({ withPageCtas: true });
		});
		expect(screen.getByRole("textbox", { name: "Email address" })).toHaveValue("");
		expect(
			screen.getAllByRole("button", { name: /join the waitlist/i }),
		).toHaveLength(4);
	});
});
