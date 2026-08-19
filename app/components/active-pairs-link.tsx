import type { ReactNode } from "react";

const activePairsDestination = "#faq-active-pairs";

export function ActivePairsLink({
	children = "active pairs",
	className = "",
}: {
	children?: ReactNode;
	className?: string;
}) {
	return (
		<a
			href={activePairsDestination}
			className={`inline-flex min-h-11 items-center rounded-sm font-semibold underline decoration-[#22c55e]/65 underline-offset-4 outline-none hover:text-[var(--brand-action)] focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2 ${className}`}
		>
			{children}
		</a>
	);
}

export function ActivePairsText({ text }: { text: string }) {
	const marker = "active pairs";
	const start = text.toLowerCase().indexOf(marker);

	if (start === -1) return text;

	const linkedText = text.slice(start, start + marker.length);

	return (
		<>
			{text.slice(0, start)}
			<ActivePairsLink>{linkedText}</ActivePairsLink>
			{text.slice(start + marker.length)}
		</>
	);
}
