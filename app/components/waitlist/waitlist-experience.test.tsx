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

async function finishSurveyThroughTestDelay() {
	vi.useFakeTimers();
	const finishButton = screen.getByRole("button", {
		name: /finish this survey/i,
	});

	fireEvent.click(finishButton);

	const loadingStatus = screen.getByRole("status");
	expect(loadingStatus).toHaveAttribute("data-state", "loading");
	expect(loadingStatus).toHaveAttribute("data-background", "light");
	expect(screen.getByText("Submitting survey")).toHaveClass("sr-only");
	expect(
		screen.getByRole("heading", { name: /thank you for the signal/i }),
	).toBeInTheDocument();
	expect(
		screen.queryByRole("button", { name: /finish this survey/i }),
	).not.toBeInTheDocument();
	expect(
		document.querySelector('[data-survey-footer="true"]'),
	).not.toBeInTheDocument();
	const outcomeStage = document.querySelector(
		'[data-survey-outcome-stage="true"]',
	);
	expect(outcomeStage).toHaveAttribute("aria-busy", "true");
	expect(
		document.querySelector('[data-survey-completion-content="true"]'),
	).not.toBeInTheDocument();

	await act(async () => {
		await vi.advanceTimersByTimeAsync(4_999);
	});
	expect(screen.getByRole("status")).toHaveAttribute("data-state", "loading");
	expect(screen.queryByText(/that’s the full flow/i)).not.toBeInTheDocument();

	await act(async () => {
		await vi.advanceTimersByTimeAsync(1);
	});
	vi.useRealTimers();

	const successStatus = screen.getByRole("status");
	expect(successStatus).toBe(loadingStatus);
	expect(
		document.querySelector('[data-survey-outcome-stage="true"]'),
	).toBe(outcomeStage);
	expect(outcomeStage).not.toHaveAttribute("aria-busy");
	expect(successStatus).toHaveAttribute("data-state", "success");
	expect(successStatus).toHaveAttribute("data-background", "light");
	expect(screen.getByText("Survey submitted successfully")).toHaveClass(
		"sr-only",
	);
	expect(
		successStatus.querySelector('[data-layer="shoe-fill"]'),
	).toBeInTheDocument();
	expect(
		successStatus.querySelector('[data-layer="shoe-grid"]'),
	).toBeInTheDocument();
	expect(
		successStatus.querySelector('[data-layer="sole"]'),
	).toBeInTheDocument();
	expect(
		successStatus.querySelector('[data-layer="success-cue"]'),
	).toBeInTheDocument();
	expect(
		document.querySelector('[data-survey-completion-content="true"]'),
	).toHaveClass("survey-completion-content");
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
		vi.useRealTimers();
	});

	it("shows accessible contact and consent feedback", () => {
		renderExperience();
		const name = screen.getByRole("textbox", { name: "Name" });
		const email = screen.getByRole("textbox", { name: "Email address" });
		expect(name).toHaveAttribute("maxlength", "60");
		expect(email).toHaveAttribute("type", "email");
		expect(email).toHaveAttribute("maxlength", "254");
		expect(email).toHaveAttribute("autocomplete", "email");
		expect(email).toHaveAttribute("placeholder", "you@email.com");
		fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));
		expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
		expect(email).toHaveAttribute("aria-invalid", "true");
		expect(
			screen.getByText(/agree to the privacy policy/i),
		).toBeInTheDocument();
	});

	it("bounds and normalizes the optional signup name", async () => {
		renderExperience();
		const name = screen.getByRole("textbox", { name: "Name" });
		const email = screen.getByRole("textbox", { name: "Email address" });

		fireEvent.change(name, { target: { value: "x".repeat(70) } });
		expect(name).toHaveValue("x".repeat(60));

		fireEvent.change(name, { target: { value: "   " } });
		fireEvent.blur(name);
		expect(name).toHaveValue("");

		fireEvent.change(name, { target: { value: "  Sapatos ni José 👟  " } });
		fireEvent.change(email, { target: { value: " seller@example.com " } });
		fireEvent.click(
			screen.getByRole("checkbox", { name: /i agree to the collection/i }),
		);
		fireEvent.click(screen.getByRole("button", { name: /join the waitlist/i }));

		const confirmation = await screen.findByRole(
			"heading",
			{ name: "Thanks, Sapatos ni José 👟." },
			{ timeout: 1500 },
		);
		expect(confirmation).toHaveClass("break-words");
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

	it("uses native pending feedback while joining and the full success mark afterward", async () => {
		renderExperience();
		fireEvent.change(screen.getByRole("textbox", { name: "Email address" }), {
			target: { value: "seller@example.com" },
		});
		fireEvent.click(
			screen.getByRole("checkbox", { name: /i agree to the collection/i }),
		);
		const submitButton = screen.getByRole("button", {
			name: /join the waitlist/i,
		});

		vi.useFakeTimers();
		fireEvent.click(submitButton);

		const pendingButton = screen.getByRole("button", {
			name: /joining waitlist/i,
		});
		expect(pendingButton).toBe(submitButton);
		expect(pendingButton).not.toBeDisabled();
		expect(pendingButton).toHaveAttribute("aria-disabled", "true");
		expect(pendingButton).toHaveAttribute("data-pending", "true");
		expect(pendingButton).toHaveAttribute("type", "button");
		expect(pendingButton).toHaveClass("min-h-12", "w-full");
		expect(
			screen.getByRole("progressbar", { name: "Joining waitlist" }),
		).toBeInTheDocument();
		expect(pendingButton.querySelector('[data-state="loading"]')).not.toBeInTheDocument();

		await act(async () => {
			await vi.advanceTimersByTimeAsync(649);
		});
		expect(
			screen.getByRole("button", { name: /joining waitlist/i }),
		).toHaveAttribute("data-pending", "true");

		await act(async () => {
			await vi.advanceTimersByTimeAsync(1);
		});
		vi.useRealTimers();

		expect(screen.getByText(/part of the first look/i)).toBeInTheDocument();
		const successMark = document.querySelector('[data-state="success"]');
		expect(successMark).toHaveAttribute("data-background", "light");
		expect(successMark).toHaveAttribute("aria-hidden", "true");
		expect(screen.getByRole("button", { name: /answer the quick survey/i })).toBeInTheDocument();
		expect(globalThis.fetch).not.toHaveBeenCalled();
		expect(Storage.prototype.setItem).not.toHaveBeenCalled();
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
		await finishSurveyThroughTestDelay();

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
		const currentToolOther = screen.getByRole("textbox", {
			name: "Other inventory method",
		});
		expect(currentToolOther).toHaveAttribute("maxlength", "100");
		fireEvent.change(
			currentToolOther,
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
		const priorityOther = screen.getByRole("textbox", {
			name: "Other feature",
		});
		expect(priorityOther.tagName).toBe("TEXTAREA");
		expect(priorityOther).toHaveAttribute("maxlength", "300");
		expect(priorityOther).toHaveAttribute("rows", "4");
		expect(priorityOther).toHaveClass("h-28", "resize-none", "overflow-y-auto");
		expect(screen.getByText("0 / 300")).toBeInTheDocument();
		fireEvent.change(priorityOther, {
			target: { value: "Supplier purchase tracking" },
		});
		expect(screen.getByText("26 / 300")).toBeInTheDocument();
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
		const channelsOther = screen.getByRole("textbox", {
			name: "Other sales channel",
		});
		expect(channelsOther).toHaveAttribute("maxlength", "100");
		fireEvent.change(
			channelsOther,
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
		await finishSurveyThroughTestDelay();
		expect(screen.getByText(/that’s the full flow/i)).toBeInTheDocument();
		expect(globalThis.fetch).not.toHaveBeenCalled();
		expect(Storage.prototype.setItem).not.toHaveBeenCalled();
	});

	it("bounds and trims optional Other details without requiring them", async () => {
		renderExperience();
		await joinAndOpenSurvey();
		skipQuestion();
		skipQuestion();
		fireEvent.click(screen.getByRole("radio", { name: "Other" }));

		const currentToolOther = screen.getByRole("textbox", {
			name: "Other inventory method",
		});
		fireEvent.change(currentToolOther, {
			target: { value: `  ${"x".repeat(110)}` },
		});
		expect(currentToolOther).toHaveValue(`  ${"x".repeat(98)}`);
		fireEvent.change(currentToolOther, { target: { value: "   " } });
		fireEvent.blur(currentToolOther);
		expect(currentToolOther).toHaveValue("");
		fireEvent.click(screen.getByRole("button", { name: /next question/i }));

		fireEvent.click(screen.getByRole("radio", { name: "Other" }));
		const priorityOther = screen.getByRole("textbox", {
			name: "Other feature",
		});
		const longMultilineAnswer = `${"a".repeat(180)}\n${"b".repeat(130)}`;
		fireEvent.change(priorityOther, {
			target: { value: longMultilineAnswer },
		});
		expect(priorityOther).toHaveValue(longMultilineAnswer.slice(0, 300));
		expect(screen.getByText("300 / 300")).toBeInTheDocument();

		fireEvent.change(priorityOther, {
			target: { value: "  Supplier notes\nand purchase tracking  " },
		});
		fireEvent.blur(priorityOther);
		expect(priorityOther).toHaveValue(
			"Supplier notes\nand purchase tracking",
		);
		fireEvent.click(screen.getByRole("radio", { name: "Reports" }));
		await expectQuestion(
			/which planned option feels closest/i,
			"Optional question 1 of 5",
		);
		fireEvent.click(screen.getByRole("button", { name: "Back" }));
		fireEvent.click(screen.getByRole("radio", { name: "Other" }));
		expect(
			screen.getByRole("textbox", { name: "Other feature" }),
		).toHaveValue("");
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

	it("clears the test submission timer when the survey unmounts", async () => {
		const view = renderExperience();
		await joinAndOpenSurvey();
		skipQuestion();
		skipQuestion();
		skipQuestion();
		await expectQuestion(/which feature matters most/i, "Question 4 of 4");

		vi.useFakeTimers();
		const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
		const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
		fireEvent.click(screen.getByRole("button", { name: /finish this survey/i }));
		expect(screen.getByRole("status")).toHaveAttribute("data-state", "loading");
		const submissionTimer = setTimeoutSpy.mock.results.at(-1)?.value;
		expect(submissionTimer).toBeDefined();

		view.unmount();

		expect(clearTimeoutSpy).toHaveBeenCalledWith(submissionTimer);
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
