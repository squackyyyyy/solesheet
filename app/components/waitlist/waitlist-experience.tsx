"use client";

import { Form } from "react-aria-components/Form";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
	Button,
	CheckField,
	DialogSheet,
	RadioCards,
	SelectField,
	TextInput,
} from "@/app/components/ui/aria";
import { useWaitlistJourney } from "@/app/components/waitlist/waitlist-journey";
import { foundingOffer, surveyQuestions } from "@/app/lib/site-content";
import { isValidWaitlistEmail } from "@/app/lib/validation";

type SignupState = "form" | "pending";
type SurveyAnswers = Record<string, string | string[]>;
type SingleOtherAnswerKey = "currentTool" | "priority";
type OtherDetailKey =
	| "currentToolOther"
	| "priorityOther"
	| "channelsOther";

const OTHER_OPTION = "Other";

export function WaitlistCta({
	variant = "primary",
	className,
}: {
	variant?: "primary" | "secondary" | "quiet";
	className?: string;
}) {
	const { activateCta, journeyState } = useWaitlistJourney();
	const isComplete = journeyState === "survey-complete";
	const label =
		journeyState === "not-joined"
			? "Join the waitlist"
			: journeyState === "survey-incomplete"
				? "Answer the quick survey"
				: "You’re all set — thank you";

	return (
		<Button
			variant={variant}
			onPress={activateCta}
			isDisabled={isComplete}
			className={className}
		>
			{label}
			<span aria-hidden="true">
				{isComplete ? "✓" : journeyState === "not-joined" ? "↗" : "→"}
			</span>
		</Button>
	);
}

function SurveyForm({
	answers,
	setAnswers,
	onComplete,
}: {
	answers: SurveyAnswers;
	setAnswers: React.Dispatch<React.SetStateAction<SurveyAnswers>>;
	onComplete: () => void;
}) {
	const setAnswer = (key: string, value: string | string[]) => {
		setAnswers((current) => ({ ...current, [key]: value }));
	};

	const setSingleOtherAnswer = (
		key: SingleOtherAnswerKey,
		detailKey: Exclude<OtherDetailKey, "channelsOther">,
		value: string,
	) => {
		setAnswers((current) => {
			const next = { ...current, [key]: value };
			if (value !== OTHER_OPTION) delete next[detailKey];
			return next;
		});
	};

	const toggleChannel = (channel: string, isSelected: boolean) => {
		setAnswers((current) => {
			const channels = Array.isArray(current.channels) ? current.channels : [];
			const next: SurveyAnswers = {
				...current,
				channels: isSelected
					? [...channels, channel]
					: channels.filter((item) => item !== channel),
			};
			if (channel === OTHER_OPTION && !isSelected) delete next.channelsOther;
			return next;
		});
	};

	return (
		<Form
			onSubmit={(event) => {
				event.preventDefault();
				onComplete();
			}}
			className="grid gap-7"
		>
			<RadioCards
				label={surveyQuestions.phone.label}
				options={surveyQuestions.phone.options}
				value={String(answers.phone ?? "")}
				onChange={(value) => setAnswer("phone", value)}
			/>
			<SelectField
				label={surveyQuestions.plan.label}
				options={surveyQuestions.plan.options}
				placeholder="Choose an option"
				selectedKey={String(answers.plan ?? "") || null}
				onSelectionChange={(key) => setAnswer("plan", String(key))}
			/>
			<RadioCards
				label={surveyQuestions.inventorySize.label}
				options={surveyQuestions.inventorySize.options}
				value={String(answers.inventorySize ?? "")}
				onChange={(value) => setAnswer("inventorySize", value)}
			/>
			<RadioCards
				label={surveyQuestions.installments.label}
				options={surveyQuestions.installments.options}
				value={String(answers.installments ?? "")}
				onChange={(value) => setAnswer("installments", value)}
			/>
			<div className="grid gap-3">
				<SelectField
					label={surveyQuestions.currentTool.label}
					options={surveyQuestions.currentTool.options}
					placeholder="Choose your current tool"
					selectedKey={String(answers.currentTool ?? "") || null}
					onSelectionChange={(key) =>
						setSingleOtherAnswer(
							"currentTool",
							"currentToolOther",
							key == null ? "" : String(key),
						)
					}
				/>
				{answers.currentTool === OTHER_OPTION ? (
					<TextInput
						label={surveyQuestions.currentTool.otherDetailLabel}
						description="Optional — tell us what you use."
						value={String(answers.currentToolOther ?? "")}
						onChange={(value) => setAnswer("currentToolOther", value)}
						inputId="survey-current-tool-other"
						autoComplete="off"
					/>
				) : null}
			</div>
			<div className="grid gap-3">
				<SelectField
					label={surveyQuestions.priority.label}
					options={surveyQuestions.priority.options}
					placeholder="Choose one feature"
					selectedKey={String(answers.priority ?? "") || null}
					onSelectionChange={(key) =>
						setSingleOtherAnswer(
							"priority",
							"priorityOther",
							key == null ? "" : String(key),
						)
					}
				/>
				{answers.priority === OTHER_OPTION ? (
					<TextInput
						label={surveyQuestions.priority.otherDetailLabel}
						description="Optional — tell us what would help most."
						value={String(answers.priorityOther ?? "")}
						onChange={(value) => setAnswer("priorityOther", value)}
						inputId="survey-priority-other"
						autoComplete="off"
					/>
				) : null}
			</div>
			<RadioCards
				label={surveyQuestions.backup.label}
				options={surveyQuestions.backup.options}
				value={String(answers.backup ?? "")}
				onChange={(value) => setAnswer("backup", value)}
			/>
			<div className="grid gap-3">
				<p className="text-sm font-semibold text-[var(--brand-ink)]">
					{surveyQuestions.channels.label}
				</p>
				<div className="grid gap-2 rounded-2xl border border-black/10 bg-white p-4 sm:grid-cols-2">
					{surveyQuestions.channels.options.map((channel) => (
						<CheckField
							key={channel}
							isSelected={
								Array.isArray(answers.channels) &&
								answers.channels.includes(channel)
							}
							onChange={(selected) => toggleChannel(channel, selected)}
						>
							{channel}
						</CheckField>
					))}
				</div>
				{Array.isArray(answers.channels) &&
				answers.channels.includes(OTHER_OPTION) ? (
					<TextInput
						label={surveyQuestions.channels.otherDetailLabel}
						description="Optional — tell us where else you sell."
						value={String(answers.channelsOther ?? "")}
						onChange={(value) => setAnswer("channelsOther", value)}
						inputId="survey-channels-other"
						autoComplete="off"
					/>
				) : null}
			</div>
			<RadioCards
				label={surveyQuestions.interview.label}
				options={surveyQuestions.interview.options}
				value={String(answers.interview ?? "")}
				onChange={(value) => setAnswer("interview", value)}
			/>
			<div className="sticky bottom-0 -mx-5 border-t border-[#14213d]/10 bg-[#f7faf5]/95 px-5 pb-1 pt-4 backdrop-blur sm:-mx-7 sm:px-7">
				<Button type="submit" className="w-full">
					Finish quick survey
					<span aria-hidden="true">→</span>
				</Button>
				<p className="mt-2 text-center text-[11px] text-black/65">
					Every question is optional.
				</p>
			</div>
		</Form>
	);
}

export function WaitlistExperience() {
	const [name, setName] = useState("");
	const [contact, setContact] = useState("");
	const [consent, setConsent] = useState(false);
	const [contactError, setContactError] = useState("");
	const [consentError, setConsentError] = useState("");
	const [signupState, setSignupState] = useState<SignupState>("form");
	const [answers, setAnswers] = useState<SurveyAnswers>({});
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const {
		completeSignup,
		completeSurvey,
		isSurveyOpen,
		journeyState,
		setSurveyOpen,
		supportCopy,
	} = useWaitlistJourney();

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextContactError = isValidWaitlistEmail(contact)
			? ""
			: "Enter a valid email address.";
		const nextConsentError = consent
			? ""
			: "Please agree to the privacy notice to continue.";

		setContactError(nextContactError);
		setConsentError(nextConsentError);

		if (nextContactError || nextConsentError) return;

		setSignupState("pending");
		timerRef.current = setTimeout(() => {
			setSignupState("form");
			completeSignup();
		}, 650);
	}

	return (
		<section
			id="waitlist"
			aria-labelledby="waitlist-title"
			className="relative overflow-hidden rounded-[2.5rem] bg-[var(--brand-ink)] text-white"
		>
			<div
				aria-hidden="true"
				className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10"
			/>
			<div
				aria-hidden="true"
				className="absolute -bottom-24 -left-20 size-72 rounded-full bg-[#22c55e]/30 blur-3xl"
			/>
			<div className="relative grid gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[.82fr_1fr] lg:gap-16 lg:px-12 lg:py-14">
				<div className="self-center">
					<p className="text-xs font-bold uppercase tracking-[0.28em] text-[#86efac]">
						Founding seller list
					</p>
					<h2
						id="waitlist-title"
						className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl"
					>
						Help build the stockroom you actually want to use.
					</h2>
					<p className="mt-5 max-w-lg text-base leading-7 text-white/62">
						{foundingOffer.finalSummary}
					</p>
					<div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/12 pt-5 text-xs text-white/70">
						<p>
							<span className="block text-xl font-semibold text-white">20</span>
							free active pairs
						</p>
						<p>
							<span className="block text-xl font-semibold text-white">
								₱99
							</span>
							planned Starter
						</p>
						<p>
							<span className="block text-xl font-semibold text-white">
								₱65
							</span>
							founding rate
						</p>
					</div>
				</div>

				<div className="rounded-[2rem] bg-[var(--brand-soft)] p-5 text-[var(--brand-ink)] shadow-[0_30px_100px_rgba(0,0,0,.28)] sm:p-7">
					{journeyState !== "not-joined" ? (
						<div
							aria-live="polite"
							className="flex min-h-[430px] flex-col justify-center text-center"
						>
							<span
								aria-hidden="true"
								className="mx-auto grid size-16 place-items-center rounded-full bg-[#e8ff9f] text-2xl"
							>
								✓
							</span>
							<p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-action)]">
								{journeyState === "survey-complete"
									? "Your early-access flow is complete"
									: "You’re part of the first look"}
							</p>
							<h3 className="mx-auto mt-3 max-w-sm text-3xl font-semibold tracking-tight">
								Thanks, {name.trim() || "seller"}.
							</h3>
							<p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/65">
								{supportCopy}
							</p>
							{journeyState === "survey-incomplete" ? (
								<WaitlistCta className="mx-auto mt-7" />
							) : (
								<WaitlistCta variant="secondary" className="mx-auto mt-7" />
							)}
						</div>
					) : (
						<Form
							action="#waitlist"
							onSubmit={submit}
							className="grid gap-5"
							validationBehavior="aria"
						>
							<div>
								<p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-action)]">
									Get early access
								</p>
								<h3 className="mt-2 text-2xl font-semibold tracking-tight">
									Join the waitlist
								</h3>
								<p className="mt-2 text-sm leading-6 text-black/65">
									One quick step now. Product questions come after.
								</p>
							</div>
							<TextInput
								label="Name"
								description="Optional — a first name or reseller alias is enough."
								value={name}
								onChange={setName}
								placeholder="e.g. Jules or Sole Supply MNL"
								autoComplete="name"
							/>
							<TextInput
								label="Email address"
								value={contact}
								onChange={(value) => {
									setContact(value);
									if (contactError) setContactError("");
								}}
								errorMessage={contactError}
								placeholder="you@email.com"
								type="email"
								name="email"
								inputId="waitlist-email"
								autoComplete="email"
							/>
							<CheckField
								isSelected={consent}
								onChange={(selected) => {
									setConsent(selected);
									if (consentError) setConsentError("");
								}}
								errorMessage={consentError}
							>
								I agree to the collection and use of my information as described
								in the{" "}
								<a
									href="#privacy"
									className="font-semibold underline underline-offset-2"
								>
									Privacy Notice
								</a>
								, including contact about early access.
							</CheckField>
							<Button
								type="submit"
								isDisabled={signupState === "pending"}
								className="mt-1 w-full"
							>
								{signupState === "pending" ? "Joining…" : "Join the waitlist"}
								{signupState !== "pending" ? (
									<span aria-hidden="true">↗</span>
								) : null}
							</Button>
							<p aria-live="polite" className="sr-only">
								{signupState === "pending" ? "Joining the waitlist" : ""}
							</p>
							<p className="text-center text-[11px] leading-5 text-black/65">
								No payment today. Survey questions are optional.
							</p>
						</Form>
					)}
				</div>
			</div>

			<DialogSheet
				title={
					journeyState === "survey-complete"
						? "Thank you for the signal"
						: "A few quick questions"
				}
				description={
					journeyState === "survey-complete"
						? "Your perspective helps keep the first release focused on real reseller work."
						: "Answer what you can. You can close this anytime and return while this page stays open."
				}
				isOpen={isSurveyOpen}
				onOpenChange={setSurveyOpen}
			>
				{journeyState === "survey-complete" ? (
					<div
						aria-live="polite"
						className="grid min-h-80 place-items-center text-center"
					>
						<div>
							<span
								aria-hidden="true"
								className="mx-auto grid size-16 place-items-center rounded-full bg-[#e8ff9f] text-2xl"
							>
								✓
							</span>
							<h3 className="mt-5 text-2xl font-semibold tracking-tight">
								That’s the full flow.
							</h3>
							<p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/65">
								Thanks for helping us prioritize speed, clarity, and the
								features that matter in a real reseller workflow.
							</p>
							<Button
								variant="secondary"
								onPress={() => setSurveyOpen(false)}
								className="mt-6"
							>
								Close survey
							</Button>
						</div>
					</div>
				) : (
					<SurveyForm
						answers={answers}
						setAnswers={setAnswers}
						onComplete={completeSurvey}
					/>
				)}
			</DialogSheet>
		</section>
	);
}
