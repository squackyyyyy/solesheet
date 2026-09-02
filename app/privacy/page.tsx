import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/app/components/brand/brand-logo";
import { privacyContactEmail, privacyNotice } from "@/app/lib/privacy";

export const metadata: Metadata = {
	title: "Privacy Notice",
	description:
		"How SoleSheet collects, uses, shares, protects, and retains waitlist, product-research, interview-outreach, and optional appointment information.",
	alternates: {
		canonical: "/privacy",
	},
	openGraph: {
		url: "/privacy",
	},
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
					<li>
						four core survey answers about your phone platform, active inventory,
						what you would be willing to pay based on the demo, and preferred
						feature when you choose to finish the survey;
					</li>
					<li>
						optional follow-up answers about your current tracking method,
						installment sales, cloud backup, sales channels, and interview
						availability;
					</li>
					<li>optional Other details you enter for supported survey questions;</li>
					<li>
						an optional additional comment about SoleSheet, such as feedback,
						concerns, feature ideas, or questions;
					</li>
					<li>messages or requests you send to our privacy contact.</li>
				</ul>
				<p>
					Survey answers remain only in the open page until you select Finish this
					survey. Finished surveys are linked to your waitlist signup and stored in
					Cloudflare D1. Closing the survey without finishing does not submit its
					answers.
				</p>
				<p>
					Please do not include passwords, payment information, customer details,
					or other sensitive information in an optional survey comment.
				</p>
				<p>
					Waitlist and finished survey submissions are processed by Cloudflare
					Workers and stored in Cloudflare D1. We also use Cloudflare Turnstile
					to protect the form from spam and automated misuse. For that security
					check, Cloudflare may process limited technical information such as your
					IP address, browser and device characteristics, requested page,
					referring page, request time, and the verification result. SoleSheet does
					not store the Turnstile response token or Cloudflare’s verification
					response in D1.
				</p>
				<p>
					SoleSheet uses Cloudflare Web Analytics to measure aggregate visits,
					page views and paths, referring websites, country, device class such as
					mobile, tablet, or desktop, browser, operating system, and website
					performance such as Core Web Vitals. This configuration does not use
					analytics cookies. We do not use it to collect your email, name, survey
					answers, exact device model, custom behavioral events, or session
					recordings, and we do not join its measurements to your waitlist or
					survey submission.
				</p>
				<p>
					If your finished survey says that you are open to an interview or
					would like details first, SoleSheet may use a private, owner-operated
					dashboard to send the corresponding research message through Resend.
					Resend processes your recipient email address, SoleSheet&apos;s sender and
					reply addresses, the message subject and body, send time, a provider
					message identifier, and delivery, bounce, complaint, failure, or
					suppression outcomes. Messages are individually addressed. SoleSheet
					does not enable open tracking or link-click tracking for this outreach.
				</p>
				<p>
					An interview or details message may offer an optional public Google
					Calendar booking page. If you choose to book, you submit the name fields,
					an email address you can access, and your selected time directly through
					Google. SoleSheet does not require your legal name: you may use an alias
					or shop name in Google&apos;s required first-name and last-name fields. Google
					Calendar then creates the appointment event and handles its confirmation,
					cancellation or rescheduling path, and Google Meet details when enabled.
					Booking is not anonymous because the accessible email address and event
					remain identifiable. The dashboard does not use the Google Calendar API,
					prefill your identity, create appointments automatically, or synchronize
					the respondent list with Google.
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
						to send an interview invitation or requested interview details that
						match the follow-up option you selected;
					</li>
					<li>
						to understand waitlist demand and prioritize product, platform, and
						pricing decisions using structured survey answers, optional comments,
						individual signups, or aggregated counts;
					</li>
					<li>
						to understand how people find and use our public pages, improve website
						performance and device compatibility, and estimate waitlist conversion
						using separate aggregate visit and signup counts;
					</li>
					<li>
						to offer optional appointment booking, arrange a follow-up interview,
						and provide confirmation and meeting details when you choose to book;
					</li>
					<li>
						to prevent duplicate outreach and handle delivery failures, complaints,
						and provider suppression;
					</li>
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
					contacting you about early access or product research. Survey
					participation is optional, and you may join the waitlist without answering
					the survey. If you choose to finish it, the four core questions are
					required—including what you would be willing to pay based on the demo—while
					your current tracking method, the other follow-up questions, Other-detail
					fields, and additional comment remain optional. Answers are submitted only when you select Finish this survey;
					closing an unfinished survey does not submit them.
				</p>
				<p>
					You may withdraw consent or ask us to stop contacting you at any time by
				emailing <a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>. Withdrawal
					does not affect processing that was lawful before it was withdrawn.
				</p>
				<p>
					If you selected an interview option, a message may invite you to choose
					a time. If you selected “send me more details first,” the message will
					explain the interview before offering optional booking and will not treat
					you as already committed. You do not have to book. If you do, you may use
					an alias or shop name instead of a legal name, but should use an email
					address you can access for confirmation and meeting details. You may also
					stop follow-up contact by replying to an outreach message or emailing{" "}
					<a href={`mailto:${privacyContactEmail}`}>{privacyContactEmail}</a>.
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
						Cloudflare, which hosts the Worker, stores waitlist and finished survey
						submissions in D1, provides Turnstile to help secure the form, and
						provides cookie-free Web Analytics for aggregate traffic and website
						performance reporting;
					</li>
					<li>
						Resend, which sends individually addressed interview or requested-details
						messages for SoleSheet and reports limited delivery and suppression
						outcomes;
					</li>
					<li>
						Google Calendar, which provides the optional public booking page and,
						when you choose to book, processes the submitted booking fields,
						appointment event, confirmations, cancellations or rescheduling, and
						Google Meet details;
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
					Service providers may process information outside the Philippines.
					Resend states that its account data, including message content and
					delivery logs, is stored in the United States even when a different
					sending region is selected. Google operates servers around the world.
					When international processing occurs, we remain responsible for data
					minimization, access limits, appropriate provider terms and safeguards,
					and an effective way to exercise your rights.
				</p>
			</>
		),
	},
	{
		title: "6. Retention and deletion",
		body: (
			<>
				<p>
					We retain stored waitlist and finished survey information only while it
					is needed for early-access planning and product research. Unless a
					longer period is required by law or you ask to remain informed, we
					delete inactive waitlist information before it exceeds 12 months since
					your last recorded interaction.
				</p>
				<p>
					For this waitlist database, the last recorded interaction is the latest
					of the stored signup creation or update time and any finished survey’s
					submission, update, or completion time. We review retention during the
					first five days of each month and include records that would reach the
					12-month limit before the following monthly review.
				</p>
				<p>
					Deleting a signup also deletes its linked finished survey and selected
					sales-channel records. Cloudflare’s automatic recovery history, or a
					protected SQL snapshot created for a specific recovery operation, may
					temporarily contain an earlier copy. These copies are restricted to
					recovery, are not used for ordinary research or contact, and any
					deletion is applied again if an earlier state is restored. An
					operation-specific SQL snapshot is removed within seven days, and
					sooner when it is no longer needed.
				</p>
				<p>
					For the planned standard Resend configuration, Resend documents a
					30-day retention period for email data. The local owner dashboard keeps
					no second raw contact list: its pseudonymous campaign and delivery-control
					metadata is removed within 90 days, or sooner when configured. A limited
					suppression or stop-contact record may be kept only as needed to avoid
					contacting you again, handle a privacy request, recover safely, or comply
					with law.
				</p>
				<p>
					A booked appointment remains in the applicable Google Calendars until it
					is cancelled or deleted under the account&apos;s controls. Google Calendar
					normally keeps a deleted event in the calendar bin for 30 days before
					permanent deletion; Google&apos;s broader deletion process may take longer
					for active and backup systems. Cancellation or deletion cannot remove
					confirmation emails or calendar copies already held by a participant or
					another provider.
				</p>
				<p>
					If you unsubscribe or make a privacy request, we may retain the minimum
					request information needed during the recovery window to honor it after
					a restore, avoid contacting you again, or meet a legal obligation.
					Security records may be retained for a limited period appropriate to
					preventing abuse and investigating incidents.
				</p>
			</>
		),
	},
	{
		title: "7. How we protect information",
		body: (
			<>
				<p>
					We use reasonable organizational and technical safeguards appropriate to
					the nature of the information, including limiting access to people and
					providers that need it, protecting data in transit, and reviewing access
					and retention practices. No method of transmission or storage is
					completely secure, but we work to reduce foreseeable risks.
				</p>
				<p>
					Interview outreach is limited to fixed survey-answer cohorts, sent one
					recipient at a time without CC or BCC, and tested before live delivery.
					The local journal excludes raw email addresses, names, survey answers,
					message text, and D1 identifiers. The dashboard keeps D1 access read-only
					and does not override provider bounce or complaint suppression.
				</p>
			</>
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
					on a request. A verified deletion request removes the matching waitlist
					signup and its linked finished survey and sales-channel information. We
					do not confirm whether an address was previously registered. You can
					learn more from the{" "}
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
						Waitlist details and deliberately finished surveys are stored with
						Cloudflare D1. We also use cookie-free aggregate website analytics.
						If you select an interview or details option, SoleSheet may send the
						matching individually addressed research message through Resend and
						offer optional booking through Google Calendar. Open and click tracking
						are disabled. We do not sell personal information, and you may withdraw
						consent or ask us to delete your information.
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
							<li>✓ Optional survey participation</li>
							<li>✓ Optional interview scheduling</li>
							<li>✓ No outreach open or click tracking</li>
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
