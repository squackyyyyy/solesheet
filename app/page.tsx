import {
	DashboardScreen,
	DeviceFrame,
	mockupMeta,
} from "@/app/components/mockups/app-screens";
import { BrandLogo } from "@/app/components/brand/brand-logo";
import { formatPeso, recordedInstallmentPayment } from "@/app/lib/mock-data";
import { MockupShowcase } from "@/app/components/mockups/mockup-showcase";
import { ActivePairsText } from "@/app/components/active-pairs-link";
import { PricingFeatureComparison } from "@/app/components/pricing/pricing-feature-comparison";
import { WebQuickAddSection } from "@/app/components/web-quick-add/web-quick-add-section";
import {
	WaitlistCta,
	WaitlistExperience,
} from "@/app/components/waitlist/waitlist-experience";
import { WaitlistJourneyProvider } from "@/app/components/waitlist/waitlist-journey";
import {
	faqs,
	featureProof,
	foundingOffer,
	painPoints,
	plans,
	siteContent,
} from "@/app/lib/site-content";

function BrandMark({
	compactOnMobile = false,
	priority = false,
}: {
	compactOnMobile?: boolean;
	priority?: boolean;
}) {
	return (
		<a
			href="#top"
			aria-label="SoleSheet home"
			className="inline-flex items-center"
		>
			<BrandLogo compactOnMobile={compactOnMobile} priority={priority} />
		</a>
	);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--brand-action)]">
			<span aria-hidden="true" className="h-px w-7 bg-current" />
			{children}
		</p>
	);
}

export default function Home() {
	return (
		<WaitlistJourneyProvider>
			<main
				id="top"
				className="overflow-hidden bg-[var(--brand-soft)] text-[var(--brand-ink)]"
			>
				<header className="relative z-30 border-b border-[#14213d]/10 bg-[#f7faf5]/92 backdrop-blur-lg">
					<div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
						<BrandMark compactOnMobile priority />
						<nav
							aria-label="Primary navigation"
							className="hidden items-center gap-7 text-sm font-medium text-[#14213d]/70 md:flex"
						>
							<a
								href="#product"
								className="transition hover:text-[var(--brand-action)]"
							>
								Product
							</a>
							<a
								href="#installments"
								className="transition hover:text-[var(--brand-action)]"
							>
								Installments
							</a>
							<a
								href="#pricing"
								className="transition hover:text-[var(--brand-action)]"
							>
								Pricing
							</a>
							<a
								href="#faq"
								className="transition hover:text-[var(--brand-action)]"
							>
								FAQ
							</a>
						</nav>
						<WaitlistCta className="min-h-10 px-4 text-xs sm:min-h-11 sm:px-5 sm:text-sm" />
					</div>
				</header>

				<section className="relative border-b border-[#14213d]/10">
					<div
						aria-hidden="true"
						className="absolute -right-52 -top-40 size-[620px] rounded-full border border-[#22c55e]/20"
					/>
					<div
						aria-hidden="true"
						className="absolute -right-24 top-8 size-[380px] rounded-full bg-[#dcfce7] blur-3xl"
					/>
					<div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[minmax(0,.92fr)_minmax(380px,.68fr)] lg:items-center lg:gap-16 lg:px-10 lg:pb-24 lg:pt-18">
						<div className="relative z-10 max-w-3xl">
							<div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/65 shadow-sm">
								<span className="size-2 rounded-full bg-[var(--brand-green)]" />
								{siteContent.eyebrow}
							</div>
							<h1 className="mt-7 text-[clamp(3.15rem,8.8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
								Your shoe business,
								<span className="mt-1 block font-normal italic text-[var(--brand-action)]">
									out of the sheet.
								</span>
							</h1>
							<p className="mt-7 max-w-xl text-base leading-7 text-black/65 sm:text-lg sm:leading-8">
								{siteContent.heroCopy}
							</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row">
								<WaitlistCta className="sm:min-w-48" />
								<a
									href="#product"
									className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#14213d]/15 bg-white px-5 text-sm font-semibold transition hover:border-[var(--brand-action)] hover:bg-[var(--brand-mist)]"
								>
									Explore the app
									<span aria-hidden="true">↓</span>
								</a>
							</div>
							<div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-black/10 pt-5 text-xs font-medium text-black/65">
								<span>✓ Fast inventory updates</span>
								<span>✓ Profit clarity</span>
								<span>✓ Installments included</span>
							</div>
						</div>

						<div className="relative mx-auto w-full max-w-[430px] lg:justify-self-end">
							<div
								aria-hidden="true"
								className="absolute -left-8 top-24 z-10 hidden rotate-[-7deg] rounded-2xl bg-[#e8ff9f] px-4 py-3 text-xs font-bold shadow-xl sm:block"
							>
								Monthly profit
								<br />
								<span className="text-xl">₱8,950</span>
							</div>
							<div
								aria-hidden="true"
								className="absolute -right-4 bottom-28 z-10 hidden rotate-[6deg] rounded-2xl bg-white px-4 py-3 text-xs font-bold shadow-xl sm:block"
							>
								12 active pairs
								<br />
								<span className="font-medium text-black/65">
									all in one place
								</span>
							</div>
							<DeviceFrame
								label={mockupMeta[0].label}
								description={mockupMeta[0].description}
								className="hero-device"
							>
								<DashboardScreen />
							</DeviceFrame>
						</div>
					</div>
				</section>

				<section
					aria-labelledby="problem-title"
					className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
				>
					<div className="grid gap-8 lg:grid-cols-[.65fr_1fr] lg:gap-20">
						<div>
							<SectionLabel>The everyday problem</SectionLabel>
							<h2
								id="problem-title"
								className="mt-5 max-w-lg text-4xl font-semibold tracking-[-0.045em] sm:text-5xl"
							>
								A spreadsheet was never built for a seller on the move.
							</h2>
						</div>
						<div className="grid border-t border-black/12 sm:grid-cols-3 lg:border-t-0">
							{painPoints.map((point) => (
								<article
									key={point.number}
									className="border-b border-black/12 py-6 sm:border-b-0 sm:border-l sm:px-5 sm:py-1 first:sm:border-l-0 lg:first:border-l"
								>
									<p className="text-xs font-bold text-[var(--brand-action)]">
										{point.number}
									</p>
									<h3 className="mt-7 text-xl font-semibold leading-7 tracking-tight">
										{point.title}
									</h3>
									<p className="mt-3 text-sm leading-7 text-black/65">
										{point.copy}
									</p>
								</article>
							))}
						</div>
					</div>
					<div className="mt-14 grid gap-3 sm:grid-cols-3">
						{featureProof.map((proof) => (
							<div
								key={proof.label}
								className={`rounded-[1.6rem] p-5 ${
									proof.tone === "brand"
										? "bg-[var(--brand-action)] text-white"
										: proof.tone === "citrus"
											? "bg-[#e8ff9f]"
											: "bg-[var(--brand-ink)] text-white"
								}`}
							>
								<p className="text-xs">{proof.label}</p>
								<p className="mt-3 text-3xl font-semibold tracking-tight">
									{proof.value}
								</p>
							</div>
						))}
					</div>
				</section>

				<section
					id="product"
					aria-labelledby="product-title"
					className="border-y border-[#14213d]/10 bg-[var(--brand-mist)]"
				>
					<div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
						<div className="mb-12 grid gap-5 lg:grid-cols-[1fr_.65fr] lg:items-end">
							<div>
								<SectionLabel>Inside SoleSheet</SectionLabel>
								<h2
									id="product-title"
									className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl"
								>
									See the workflows we’re building for everyday reselling.
								</h2>
							</div>
							<p className="max-w-xl text-sm leading-7 text-black/65 lg:justify-self-end">
								Browse seven static product previews—from logging a sale to
								recording installment payments and protecting your records. These
								screens illustrate the planned app; they are not a live demo.
							</p>
						</div>
						<MockupShowcase />
						<section
							aria-labelledby="product-waitlist-title"
							data-product-waitlist-cta="true"
							className="mt-10 grid gap-5 rounded-[2rem] border border-[#14213d]/10 bg-white p-6 shadow-[0_18px_55px_rgba(20,33,61,.08)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
						>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-action)]">
									Seen enough to have an opinion?
								</p>
								<h3
									id="product-waitlist-title"
									className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl"
								>
									Help shape what we build first.
								</h3>
								<p className="mt-2 max-w-xl text-sm leading-6 text-black/65">
									Join the waitlist, then answer four quick questions if you’d like.
								</p>
							</div>
							<WaitlistCta className="w-full sm:w-auto sm:min-w-52" />
						</section>
					</div>
				</section>

				<section
					id="installments"
					aria-labelledby="installment-title"
					className="border-b border-[#14213d]/10 bg-[var(--brand-soft)]"
				>
					<div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
						<div
							data-installment-state-callout="true"
							className="rounded-[2rem] bg-[var(--brand-ink)] px-6 py-8 text-white shadow-[0_24px_70px_rgba(20,33,61,.16)] sm:px-9 sm:py-10"
						>
							<div>
								<p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#86efac]">
									The local differentiator
								</p>
								<h2
									id="installment-title"
									className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl"
								>
									Sold doesn’t always mean settled.
								</h2>
								<p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
									SoleSheet keeps inventory state and payment state separate, so a
									sold pair can still show exactly what was collected and what remains.
								</p>
								<div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
								{[
									[
										"Cash collected",
										formatPeso(recordedInstallmentPayment.collectedAfter),
									],
									[
										"Balance remaining",
										formatPeso(recordedInstallmentPayment.remainingAfter),
									],
									["Inventory state", "Sold"],
									["Payment state", "Partially paid"],
								].map(([label, value]) => (
									<div
										key={label}
										className="rounded-2xl border border-white/12 bg-white/5 p-4"
									>
										<p className="text-xs text-white/70">{label}</p>
										<p className="mt-2 text-lg font-semibold">{value}</p>
									</div>
								))}
								</div>
								<p className="mt-5 text-xs leading-6 text-white/70">
									Seller-managed tracking only. No lending, interest, late fees,
									collections, or payment processing.
								</p>
							</div>
						</div>
					</div>
				</section>

				<WebQuickAddSection />

				<section
					id="pricing"
					aria-labelledby="pricing-title"
					className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
				>
					<div className="grid gap-5 lg:grid-cols-[1fr_.6fr] lg:items-end">
						<div>
							<SectionLabel>Pricing preview</SectionLabel>
							<h2
								id="pricing-title"
								className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl"
							>
								Free for the core work. Pay for protection, scale, and speed.
							</h2>
						</div>
						<p className="text-sm leading-7 text-black/65 lg:justify-self-end">
							{siteContent.pricingNote}
						</p>
					</div>
					<div className="mt-12 grid gap-4 lg:grid-cols-3">
						{plans.map((plan) => (
							<article
								key={plan.name}
								className={`relative rounded-[2rem] border p-6 sm:p-7 ${plan.featured ? "border-[var(--brand-action)] bg-[var(--brand-mist)] shadow-[0_24px_70px_rgba(4,120,87,.13)]" : "border-[#14213d]/10 bg-white"}`}
							>
								{plan.featured ? (
									<span className="absolute right-5 top-5 rounded-full bg-[var(--brand-action)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
										Main paid plan
									</span>
								) : null}
								<p className="text-sm font-semibold">{plan.name}</p>
								<p className="mt-7 text-5xl font-semibold tracking-[-0.05em]">
									{plan.price}
									<span className="ml-1 text-sm font-medium tracking-normal text-black/65">
										{"suffix" in plan ? plan.suffix : ""}
									</span>
								</p>
								<p className="mt-4 min-h-12 text-sm leading-6 text-black/65">
									{plan.description}
								</p>
								<div className="my-6 h-px bg-black/10" />
								<ul className="grid gap-3 text-sm text-black/68">
									{plan.features.map((feature) => (
										<li key={feature} className="flex gap-2">
											<span className="text-[var(--brand-action)]">✓</span>
											<span>
												<ActivePairsText text={feature} />
											</span>
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
					<PricingFeatureComparison />
					<div className="mt-4 grid gap-5 rounded-[2rem] bg-[#e8ff9f] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-black/65">
								Founding seller offer
							</p>
							<h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
								{foundingOffer.pricingHeadline}
							</h3>
							<p className="mt-2 text-sm text-black/65">
								{foundingOffer.pricingSummary}
							</p>
						</div>
						<WaitlistCta variant="secondary" />
					</div>
				</section>

				<section
					id="faq"
					aria-labelledby="faq-title"
					className="border-y border-[#14213d]/10 bg-[var(--brand-mist)]"
				>
					<div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[.55fr_1fr] lg:px-10">
						<div>
							<SectionLabel>FAQ</SectionLabel>
							<h2
								id="faq-title"
								className="mt-5 text-4xl font-semibold tracking-[-0.045em]"
							>
								Before you join.
							</h2>
						</div>
						<div className="border-t border-black/12">
							{faqs.map((faq, index) => (
								<details
									key={faq.id}
									id={faq.id}
									className="group scroll-mt-24 border-b border-black/12 py-5"
									open={index === 0 || faq.id === "faq-active-pairs"}
								>
									<summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-4">
										{faq.question}
										<span
											aria-hidden="true"
											className="text-xl font-normal transition group-open:rotate-45"
										>
											＋
										</span>
									</summary>
									<p className="max-w-2xl pb-2 pt-4 text-sm leading-7 text-black/65">
										{faq.answer}
									</p>
								</details>
							))}
						</div>
					</div>
				</section>

				<div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
					<WaitlistExperience />
				</div>

				<footer id="privacy" className="border-t border-black/10">
					<div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-8 text-sm text-black/65 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
						<BrandMark />
						<nav
							aria-label="Footer navigation"
							className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-semibold"
						>
							<a
								href="#top"
								className="inline-flex min-h-11 items-center rounded-sm outline-none hover:text-[var(--brand-action)] focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
							>
								Back to top
							</a>
							<a
								href="#faq"
								className="inline-flex min-h-11 items-center rounded-sm outline-none hover:text-[var(--brand-action)] focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
							>
								FAQ
							</a>
							<a
								href="/privacy"
								className="inline-flex min-h-11 items-center rounded-sm outline-none hover:text-[var(--brand-action)] focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
							>
								Privacy
							</a>
							<span className="inline-flex min-h-11 items-center">
								© 2026 SoleSheet concept
							</span>
						</nav>
					</div>
				</footer>
			</main>
		</WaitlistJourneyProvider>
	);
}
