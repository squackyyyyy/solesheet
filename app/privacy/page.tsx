import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/app/components/brand/brand-logo";
import { privacyContactEmail, privacyNotice } from "@/app/lib/privacy";

export const metadata: Metadata = {
	title: "Privacy Notice",
	description:
		"How SoleSheet collects, uses, protects, and retains waitlist and product-research information.",
};

const noticeSections = [
	{
		title: "1. Who is responsible for your information",
		body: (
			<p>
				SoleSheet is responsible for the personal information described in this
				notice. Questions, requests, and withdrawals of consent can be sent to{" "}
				<a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>.
			</p>
		),
	},
	{
		title: "2. Information we collect",
		body: (
			<>
				<p>We may collect information that you choose to provide, including:</p>
				<ul>
					<li>your email address;</li>
					<li>an optional name, reseller name, or alias;</li>
					<li>the time you consented and the privacy-notice version you accepted;</li>
					<li>messages or requests you send to our privacy contact.</li>
				</ul>
				<p>
					Optional survey answers about your reseller workflow currently remain
					in the open page only. They are not sent to or stored in our database in
					this version of the website.
				</p>
				<p>
					Waitlist submissions are processed by Cloudflare Workers and stored in
					Cloudflare D1. Cloudflare may also process limited technical information
					such as your IP address, browser type, device type, requested page,
					referring page, and request time to host and protect the website.
				</p>
			</>
		),
	},
	{
		title: "3. Why we use your information",
		body: (
			<>
				<p>We use personal information only for the following purposes:</p>
				<ul>
					<li>to register and manage your waitlist interest;</li>
					<li>
						to contact you about early access, product updates, and product
						research you agreed to receive;
					</li>
					<li>
						to understand waitlist demand and prioritize product, platform, and
						pricing decisions using individual signups or aggregated counts;
					</li>
					<li>to arrange an optional follow-up interview;</li>
					<li>to prevent duplicate submissions, spam, fraud, and misuse; and</li>
					<li>to protect the website and comply with applicable law.</li>
				</ul>
				<p>
					We do not sell your personal information. We do not use waitlist
					information for lending, credit scoring, or automated decisions that
					produce legal or similarly significant effects.
				</p>
			</>
		),
	},
	{
		title: "4. Consent and your choices",
		body: (
			<>
				<p>
					We ask for your consent before registering your waitlist interest and
					contacting you about early access or product research. Your survey
					answers are optional, and you may join the waitlist without answering
					the survey. Survey answers are not submitted or stored in D1 in this
					version of the website.
				</p>
				<p>
					You may withdraw consent or ask us to stop contacting you at any time by
				emailing <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>. Withdrawal
					does not affect processing that was lawful before it was withdrawn.
				</p>
			</>
		),
	},
	{
		title: "5. When information is shared",
		body: (
			<>
				<p>We may share information only with:</p>
				<ul>
					<li>
						Cloudflare, which hosts the Worker, stores waitlist submissions in D1,
						and helps secure and operate the website;
					</li>
					<li>
						professional advisers when reasonably necessary to obtain legal,
						security, or compliance advice; and
					</li>
					<li>
						public authorities when disclosure is required by applicable law or a
						valid legal process.
					</li>
				</ul>
				<p>
					Service providers may process information outside the Philippines. When
					that occurs, we remain responsible for using providers and safeguards
					appropriate to the information and processing involved.
				</p>
			</>
		),
	},
	{
		title: "6. Retention and deletion",
		body: (
			<>
				<p>
					We retain stored waitlist information only while it is needed for
					early-access planning and product research. Unless a longer period is
					required by law or you ask to remain informed, we delete or anonymize
					inactive waitlist information within 12 months after your last
					interaction with SoleSheet.
				</p>
				<p>
					If you unsubscribe, we may retain the minimum information necessary to
					honor that request and avoid contacting you again. Security records may
					be retained for a limited period appropriate to preventing abuse and
					investigating incidents.
				</p>
			</>
		),
	},
	{
		title: "7. How we protect information",
		body: (
			<p>
				We use reasonable organizational and technical safeguards appropriate to
				the nature of the information, including limiting access to people and
				providers that need it, protecting data in transit, and reviewing access
				and retention practices. No method of transmission or storage is
				completely secure, but we work to reduce foreseeable risks.
			</p>
		),
	},
	{
		title: "8. Your privacy rights",
		body: (
			<>
				<p>
					Subject to applicable law, you may have the right to be informed, access
					and correct your personal information, object to processing, withdraw
					consent, request erasure or blocking, obtain data portability, claim
					damages, and file a complaint.
				</p>
				<p>
					To exercise a right, email <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>.
					 We may ask for information needed to verify your identity before acting
					on a request. You can learn more from the{" "}
					<a
						href="https://privacy.gov.ph/data-subject-rights/"
						target="_blank"
						rel="noreferrer"
					>
						National Privacy Commission’s guide to data-subject rights
						<span className="sr-only"> (opens in a new tab)</span>
					</a>
					.
				</p>
			</>
		),
	},
	{
		title: "9. Children’s information",
		body: (
			<p>
				The waitlist is intended for people who are at least 18 years old. If you
				are under 18, please do not submit personal information without the
				involvement and consent of a parent or legal guardian. If we learn that
				we collected information from a child without appropriate consent, we
				will take reasonable steps to delete it.
			</p>
		),
	},
	{
		title: "10. Changes and complaints",
		body: (
			<>
				<p>
					We may update this notice when our data practices or legal obligations
					change. Material changes will be communicated through the website or an
					appropriate direct notice before they take effect when required.
				</p>
				<p>
					Please contact us first at <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a> so
					we can try to address your concern. You also have the right to file a
					complaint with the{" "}
					<a href="https://privacy.gov.ph/" target="_blank" rel="noreferrer">
						National Privacy Commission
						<span className="sr-only"> (opens in a new tab)</span>
					</a>
					.
				</p>
			</>
		),
	},
] as const;

export default function PrivacyPage() {
	return (
		<main className="min-h-screen bg-[var(--brand-soft)] text-[var(--brand-ink)]">
			<header className="border-b border-[#14213d]/10 bg-[#f7faf5]/92 backdrop-blur-lg">
				<div className="mx-auto flex min-h-18 max-w-[1120px] items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-10">
					<Link href="/" aria-label="SoleSheet home" className="inline-flex">
						<BrandLogo priority />
					</Link>
					<Link
						href="/"
						className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#14213d]/15 bg-white px-4 text-sm font-semibold transition hover:border-[var(--brand-action)] hover:bg-[var(--brand-mist)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2"
					>
						← Back to home
					</Link>
				</div>
			</header>

			<div className="mx-auto max-w-[1120px] px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
				<div className="max-w-3xl">
					<p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--brand-action)]">
						<span aria-hidden="true" className="h-px w-7 bg-current" />
						Privacy
					</p>
					<h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
						Privacy Notice
					</h1>
					<p className="mt-6 max-w-2xl text-base leading-8 text-black/65 sm:text-lg">
						This notice explains how SoleSheet collects, uses, shares, protects, and
						retains information submitted through our waitlist and product-research
						experience.
					</p>
					<p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-black/50">
						Effective <time dateTime={privacyNotice.effectiveDate}>{privacyNotice.effectiveDateLabel}</time>
						<span aria-hidden="true"> · </span>Version {privacyNotice.version}
					</p>
				</div>

				<section
					aria-labelledby="notice-summary-title"
					className="mt-10 rounded-[2rem] bg-[var(--brand-ink)] p-6 text-white shadow-[0_24px_70px_rgba(20,33,61,.15)] sm:p-8"
				>
					<p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#86efac]">
						At a glance
					</p>
					<h2 id="notice-summary-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
						Your information is for early access and product research.
					</h2>
					<p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">
						Waitlist details are stored with Cloudflare D1. Survey questions are
						optional and are not submitted yet. We do not sell personal information,
						and you may withdraw consent or ask us to delete your information.
					</p>
				</section>

				<div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] lg:gap-12">
					<aside className="h-fit rounded-[1.5rem] border border-[#14213d]/10 bg-white p-5 lg:sticky lg:top-6">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-action)]">
							Privacy contact
						</p>
						<a
							href={`mailto:${privacyContactEmail}`}
							className="mt-3 block break-all text-sm font-semibold text-[var(--brand-action)] underline decoration-[#22c55e]/60 underline-offset-4"
						>
							{privacyContactEmail}
						</a>
						<ul className="mt-5 grid gap-3 border-t border-black/10 pt-5 text-sm leading-6 text-black/68">
							<li>✓ Waitlist and research use only</li>
							<li>✓ Optional survey answers</li>
							<li>✓ No sale of personal information</li>
							<li>✓ Withdrawal and deletion requests supported</li>
						</ul>
					</aside>

					<div className="divide-y divide-black/10 border-t border-black/10">
						{noticeSections.map((section) => (
							<section key={section.title} className="py-8 first:pt-0">
								<h2 className="text-2xl font-semibold tracking-[-0.035em]">
									{section.title}
								</h2>
								<div className="mt-4 grid gap-4 text-sm leading-7 text-black/68 [&_a]:font-semibold [&_a]:text-[var(--brand-action)] [&_a]:underline [&_a]:decoration-[#22c55e]/60 [&_a]:underline-offset-4 [&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_li]:list-disc">
									{section.body}
								</div>
							</section>
						))}
					</div>
				</div>
			</div>

			<footer className="border-t border-black/10">
				<div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-4 py-8 text-xs text-black/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
					<span>© 2026 SoleSheet</span>
					<Link href="/" className="font-semibold hover:text-[var(--brand-action)]">
						Return to the waitlist page
					</Link>
				</div>
			</footer>
		</main>
	);
}
