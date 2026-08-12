"use client";

import {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from "react";

export type WaitlistJourneyState =
	| "not-joined"
	| "survey-incomplete"
	| "survey-complete";

type WaitlistJourneyContextValue = {
	journeyState: WaitlistJourneyState;
	isSurveyOpen: boolean;
	supportCopy: string;
	activateCta: () => void;
	completeSignup: () => void;
	completeSurvey: () => void;
	setSurveyOpen: (isOpen: boolean) => void;
};

const WaitlistJourneyContext = createContext<WaitlistJourneyContextValue | null>(
	null,
);

export function WaitlistJourneyProvider({ children }: { children: ReactNode }) {
	const [journeyState, setJourneyState] =
		useState<WaitlistJourneyState>("not-joined");
	const [isSurveyOpen, setSurveyOpen] = useState(false);
	const [announcement, setAnnouncement] = useState("");

	const supportCopy =
		journeyState === "survey-incomplete"
			? "You’re on the waitlist. Help shape what we build first."
			: journeyState === "survey-complete"
				? "Thanks for helping shape SoleSheet."
				: "";

	function activateCta() {
		if (journeyState === "not-joined") {
			document.getElementById("waitlist-email")?.focus();
			return;
		}

		if (journeyState === "survey-incomplete") {
			setSurveyOpen(true);
		}
	}

	function completeSignup() {
		setJourneyState("survey-incomplete");
		setAnnouncement(
			"You’re on the waitlist. You can answer the optional quick survey.",
		);
	}

	function completeSurvey() {
		setJourneyState("survey-complete");
		setAnnouncement("You’re all set — thank you for helping shape SoleSheet.");
	}

	return (
		<WaitlistJourneyContext.Provider
			value={{
				journeyState,
				isSurveyOpen,
				supportCopy,
				activateCta,
				completeSignup,
				completeSurvey,
				setSurveyOpen,
			}}
		>
			<p aria-atomic="true" aria-live="polite" className="sr-only">
				{announcement}
			</p>
			{children}
		</WaitlistJourneyContext.Provider>
	);
}

export function useWaitlistJourney() {
	const context = useContext(WaitlistJourneyContext);
	if (!context) {
		throw new Error(
			"Waitlist journey components must be rendered inside WaitlistJourneyProvider.",
		);
	}

	return context;
}
