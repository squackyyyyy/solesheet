"use client";

import { Form } from "react-aria-components/Form";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
	Button,
	CheckField,
	DialogSheet,
	RadioCards,
	TextInput,
} from "@/app/components/ui/aria";
import { useWaitlistJourney } from "@/app/components/waitlist/waitlist-journey";
import { ActivePairsLink } from "@/app/components/active-pairs-link";
import { foundingOffer, surveyQuestions } from "@/app/lib/site-content";
import { isValidWaitlistEmail } from "@/app/lib/validation";

type SignupState = "form" | "pending";
type SurveyGroup = "core" | "optional";
type SurveyDirection = "forward" | "backward";
type SurveyPosition = { group: SurveyGroup; index: number };
type SurveyAnswers = Record<string, string | string[]>;
type SingleOtherAnswerKey = "currentTool" | "priority";
type SingleAnswerKey = Exclude<keyof typeof surveyQuestions, "channels">;
type OtherDetailKey =
	| "currentToolOther"
	| "priorityOther"
	| "channelsOther";

const OTHER_OPTION = "Other";
const AUTO_ADVANCE_DELAY = 230;

const surveyQuestionGroups = {
	core: [
		{ key: "phone", kind: "single" },
		{ key: "inventorySize", kind: "single" },
		{ key: "currentTool", kind: "single-other" },
		{ key: "priority", kind: "single-other" },
	],
	optional: [
		{ key: "plan", kind: "single" },
		{ key: "installments", kind: "single" },
		{ key: "backup", kind: "single" },
		{ key: "channels", kind: "multi" },
		{ key: "interview", kind: "single" },
	],
} as const;

type SurveyQuestionDescriptor =
	(typeof surveyQuestionGroups)[SurveyGroup][number];

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

function SurveyQuestion({
	answers,
	position,
	direction,
	onSelectSingle,
	onSetAnswer,
	onToggleChannel,
}: {
	answers: SurveyAnswers;
	position: SurveyPosition;
	direction: SurveyDirection;
	onSelectSingle: (key: SingleAnswerKey, value: string) => void;
	onSetAnswer: (key: string, value: string | string[]) => void;
	onToggleChannel: (channel: string, isSelected: boolean) => void;
}) {
	const questionHeadingRef = useRef<HTMLHeadingElement | null>(null);
	const group = surveyQuestionGroups[position.group];
	const descriptor = group[position.index] ?? group[0];
	const question = surveyQuestions[descriptor.key];
	const total = group.length;
	const positionNumber = position.index + 1;
	const progressText =
		position.group === "core"
			? `Question ${positionNumber} of ${total}`
			: `Optional question ${positionNumber} of ${total}`;
	const progress = positionNumber / total;
	const animationClass =
		direction === "forward"
			? "wizard-question-forward"
			: "wizard-question-backward";

	useEffect(() => {
		questionHeadingRef.current?.focus();
	}, [position.group, position.index]);

	return (
		<div className="grid gap-6">
			<div className="grid gap-2" data-survey-progress={position.group}>
				<p
					id="survey-progress-label"
					aria-live="polite"
					aria-atomic="true"
					className="text-[10px] font-bold uppercase tracking-[0.2em]"
					style={{
						color:
							position.group === "optional"
								? "#2563eb"
								: "var(--brand-action)",
					}}
				>
					{progressText}
				</p>
				<div
					role="progressbar"
					aria-labelledby="survey-progress-label"
					aria-valuemin={1}
					aria-valuemax={total}
					aria-valuenow={positionNumber}
					aria-valuetext={progressText}
					className="h-2 overflow-hidden rounded-full bg-[#14213d]/10"
				>
					<span
						aria-hidden="true"
						data-survey-progress-fill="true"
						className="wizard-progress-fill block h-full rounded-full"
						style={{
							width: `${progress * 100}%`,
							backgroundColor:
								position.group === "optional"
									? "#2563eb"
									: "var(--brand-action)",
						}}
					/>
				</div>
			</div>

			<div
				key={`${position.group}-${descriptor.key}`}
				data-survey-question={descriptor.key}
				data-survey-direction={direction}
				className={`grid gap-5 ${animationClass}`}
			>
				<div>
					{position.group === "core" && position.index === 0 ? (
						<p className="mb-2 text-xs leading-5 text-black/60">
							About 30 seconds. Choose an answer, or skip any question.
						</p>
					) : null}
					<h3
						id="survey-question-heading"
						ref={questionHeadingRef}
						tabIndex={-1}
						className="rounded-sm text-xl font-semibold leading-7 tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2 sm:text-2xl"
					>
						{question.label}
					</h3>
					{descriptor.key === "interview" ? (
						<p
							id="survey-interview-helper"
							className="mt-2 text-xs leading-5 text-black/60"
						>
							{surveyQuestions.interview.description}
						</p>
					) : null}
				</div>

				{descriptor.key === "channels" ? (
					<div className="grid gap-3">
						<div
							role="group"
							aria-labelledby="survey-question-heading"
							className="grid grid-cols-2 gap-2 rounded-2xl border border-black/10 bg-white p-4"
						>
							{surveyQuestions.channels.options.map((channel) => (
								<CheckField
									key={channel}
									isSelected={
										Array.isArray(answers.channels) &&
										answers.channels.includes(channel)
									}
									onChange={(selected) =>
										onToggleChannel(channel, selected)
									}
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
								onChange={(value) => onSetAnswer("channelsOther", value)}
								inputId="survey-channels-other"
								autoComplete="off"
							/>
						) : null}
					</div>
				) : (
					<div className="grid gap-3">
						<RadioCards
							label={question.label}
							labelClassName="sr-only"
							options={question.options}
							value={String(answers[descriptor.key] ?? "")}
							onChange={(value) =>
								onSelectSingle(descriptor.key as SingleAnswerKey, value)
							}
							aria-labelledby="survey-question-heading"
							aria-describedby={
								descriptor.key === "interview"
									? "survey-interview-helper"
									: undefined
							}
						/>

						{descriptor.key === "inventorySize" ? (
							<a
								href="/#faq-active-pairs"
								target="_blank"
								rel="noreferrer"
								className="standard-link inline-flex min-h-11 w-fit items-center rounded-sm text-xs"
							>
								What pairs count as active?
								<span className="sr-only"> (opens in a new tab)</span>
							</a>
						) : null}

						{descriptor.key === "currentTool" &&
						answers.currentTool === OTHER_OPTION ? (
							<TextInput
								label={surveyQuestions.currentTool.otherDetailLabel}
								description="Optional — tell us what you use."
								value={String(answers.currentToolOther ?? "")}
								onChange={(value) => onSetAnswer("currentToolOther", value)}
								inputId="survey-current-tool-other"
								autoComplete="off"
							/>
						) : null}

						{descriptor.key === "priority" &&
						answers.priority === OTHER_OPTION ? (
							<TextInput
								label={surveyQuestions.priority.otherDetailLabel}
								description="Optional — tell us what would help most."
								value={String(answers.priorityOther ?? "")}
								onChange={(value) => onSetAnswer("priorityOther", value)}
								inputId="survey-priority-other"
								autoComplete="off"
							/>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
}

function SurveyFooter({
	answers,
	position,
	onAdvance,
	onBack,
	onComplete,
}: {
	answers: SurveyAnswers;
	position: SurveyPosition;
	onAdvance: () => void;
	onBack: () => void;
	onComplete: () => void;
}) {
	const group = surveyQuestionGroups[position.group];
	const descriptor = group[position.index] ?? group[0];
	const answer = answers[descriptor.key];
	const hasAnswer = Array.isArray(answer) ? answer.length > 0 : Boolean(answer);
	const canGoBack = position.group === "optional" || position.index > 0;
	const isCoreFinal = position.group === "core" && position.index === group.length - 1;
	const isOptionalFinal =
		position.group === "optional" && position.index === group.length - 1;
	const needsExplicitAdvance =
		descriptor.kind === "multi" || answer === OTHER_OPTION;

	return (
		<div data-survey-footer="true">
			{isCoreFinal ? (
				<div className="grid gap-2">
					<div className="grid grid-cols-[auto_1fr] gap-2">
						<Button variant="secondary" onPress={onBack}>
							<span aria-hidden="true">←</span>
							Back
						</Button>
						<Button onPress={onAdvance} className="w-full">
							Continue survey
							<span aria-hidden="true">→</span>
						</Button>
					</div>
					<Button variant="quiet" onPress={onComplete} className="w-full">
						Finish this survey
					</Button>
				</div>
			) : isOptionalFinal ? (
				<div className="grid grid-cols-[auto_1fr] gap-2">
					<Button variant="secondary" onPress={onBack}>
						<span aria-hidden="true">←</span>
						Back
					</Button>
					<Button onPress={onComplete} className="w-full">
						Finish this survey
						<span aria-hidden="true">✓</span>
					</Button>
				</div>
			) : (
				<div className="grid gap-2">
					<div className={`grid gap-2 ${canGoBack ? "grid-cols-[auto_1fr]" : "grid-cols-1"}`}>
						{canGoBack ? (
							<Button variant="secondary" onPress={onBack}>
								<span aria-hidden="true">←</span>
								Back
							</Button>
						) : null}
						<Button
							variant={needsExplicitAdvance ? "primary" : "quiet"}
							onPress={onAdvance}
							className="w-full"
						>
							{hasAnswer ? "Next question" : "Skip question"}
							<span aria-hidden="true">→</span>
						</Button>
					</div>
					{position.group === "optional" ? (
						<Button variant="quiet" onPress={onComplete} className="w-full">
							Finish this survey
						</Button>
					) : null}
				</div>
			)}
			<p className="mt-2 text-center text-[11px] text-black/65">
				Every question is optional.
			</p>
		</div>
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
	const [surveyPosition, setSurveyPosition] = useState<SurveyPosition>({
		group: "core",
		index: 0,
	});
	const [surveyDirection, setSurveyDirection] =
		useState<SurveyDirection>("forward");
	const signupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const surveyAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
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
			if (signupTimerRef.current) clearTimeout(signupTimerRef.current);
			if (surveyAdvanceTimerRef.current) {
				clearTimeout(surveyAdvanceTimerRef.current);
			}
		};
	}, []);

	function cancelSurveyAdvance() {
		if (!surveyAdvanceTimerRef.current) return;
		clearTimeout(surveyAdvanceTimerRef.current);
		surveyAdvanceTimerRef.current = null;
	}

	function setAnswer(key: string, value: string | string[]) {
		setAnswers((current) => ({ ...current, [key]: value }));
	}

	function otherDetailKeyFor(key: SingleOtherAnswerKey): OtherDetailKey {
		return key === "currentTool" ? "currentToolOther" : "priorityOther";
	}

	function setSingleAnswer(key: SingleAnswerKey, value: string) {
		setAnswers((current) => {
			if (key !== "currentTool" && key !== "priority") {
				return { ...current, [key]: value };
			}

			const detailKey = otherDetailKeyFor(key);
			const next = { ...current, [key]: value };
			if (value !== OTHER_OPTION) delete next[detailKey];
			return next;
		});
	}

	function toggleChannel(channel: string, isSelected: boolean) {
		setAnswers((current) => {
			const selected = Array.isArray(current.channels)
				? current.channels
				: [];
			const channels = isSelected
				? [...new Set([...selected, channel])]
				: selected.filter((item) => item !== channel);
			const next: SurveyAnswers = { ...current, channels };
			if (!channels.includes(OTHER_OPTION)) delete next.channelsOther;
			return next;
		});
	}

	function moveTo(position: SurveyPosition, direction: SurveyDirection) {
		cancelSurveyAdvance();
		setSurveyDirection(direction);
		setSurveyPosition(position);
	}

	function advanceQuestion() {
		const group = surveyQuestionGroups[surveyPosition.group];
		if (
			surveyPosition.group === "core" &&
			surveyPosition.index === group.length - 1
		) {
			moveTo({ group: "optional", index: 0 }, "forward");
			return;
		}
		if (surveyPosition.index >= group.length - 1) return;
		moveTo(
			{ group: surveyPosition.group, index: surveyPosition.index + 1 },
			"forward",
		);
	}

	function backQuestion() {
		if (surveyPosition.group === "optional" && surveyPosition.index === 0) {
			moveTo(
				{ group: "core", index: surveyQuestionGroups.core.length - 1 },
				"backward",
			);
			return;
		}
		if (surveyPosition.index === 0) return;
		moveTo(
			{ group: surveyPosition.group, index: surveyPosition.index - 1 },
			"backward",
		);
	}

	function finishSurvey() {
		cancelSurveyAdvance();
		completeSurvey();
	}

	function selectSingleAnswer(key: SingleAnswerKey, value: string) {
		cancelSurveyAdvance();
		setSingleAnswer(key, value);

		const group = surveyQuestionGroups[surveyPosition.group];
		const descriptor = group[surveyPosition.index] as SurveyQuestionDescriptor;
		const canContinue =
			surveyPosition.group === "core" || surveyPosition.index < group.length - 1;
		if (
			descriptor.key !== key ||
			value === OTHER_OPTION ||
			!canContinue
		) {
			return;
		}

		const origin = surveyPosition;
		const reduceMotion = window.matchMedia?.(
			"(prefers-reduced-motion: reduce)",
		).matches;
		surveyAdvanceTimerRef.current = setTimeout(
			() => {
				surveyAdvanceTimerRef.current = null;
				setSurveyDirection("forward");
				setSurveyPosition((current) => {
					if (current.group !== origin.group || current.index !== origin.index) {
						return current;
					}
					return origin.group === "core" &&
						origin.index === surveyQuestionGroups.core.length - 1
						? { group: "optional", index: 0 }
						: { group: origin.group, index: origin.index + 1 };
				});
			},
			reduceMotion ? 0 : AUTO_ADVANCE_DELAY,
		);
	}

	function setSurveyDialogOpen(isOpen: boolean) {
		if (!isOpen) cancelSurveyAdvance();
		setSurveyOpen(isOpen);
	}

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextContactError = isValidWaitlistEmail(contact)
			? ""
			: "Enter a valid email address.";
		const nextConsentError = consent
			? ""
			: "Please agree to the Privacy Policy to continue.";

		setContactError(nextContactError);
		setConsentError(nextConsentError);

		if (nextContactError || nextConsentError) return;

		setSignupState("pending");
		signupTimerRef.current = setTimeout(() => {
			signupTimerRef.current = null;
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
							free{" "}
							<ActivePairsLink className="text-white decoration-[#86efac] hover:text-[#86efac] focus-visible:ring-[#86efac] focus-visible:ring-offset-[var(--brand-ink)]">
								active pairs
							</ActivePairsLink>
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
								supportingContent={
									<>
										Read how we handle your information in the{" "}
										<a
											href="/privacy"
											target="_blank"
											rel="noreferrer"
											className="standard-link inline-flex min-h-11 items-center rounded-sm"
										>
											Privacy Policy
											<span className="sr-only"> (opens in a new tab)</span>
										</a>
										.
									</>
								}
							>
								I agree to the collection and use of my information, including
								contact about early access.
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
				onOpenChange={setSurveyDialogOpen}
				layout="wizard"
				footer={
					journeyState !== "survey-complete" ? (
						<SurveyFooter
							answers={answers}
							position={surveyPosition}
							onAdvance={advanceQuestion}
							onBack={backQuestion}
							onComplete={finishSurvey}
						/>
					) : undefined
				}
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
								onPress={() => setSurveyDialogOpen(false)}
								className="mt-6"
							>
								Close survey
							</Button>
						</div>
					</div>
					) : (
					<SurveyQuestion
						answers={answers}
						position={surveyPosition}
						direction={surveyDirection}
						onSelectSingle={selectSingleAnswer}
						onSetAnswer={setAnswer}
						onToggleChannel={toggleChannel}
					/>
				)}
			</DialogSheet>
		</section>
	);
}
