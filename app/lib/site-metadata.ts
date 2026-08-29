import type { Metadata } from "next";
import { canonicalSiteUrl } from "@/app/lib/site-url";

const brandIconVersion = "2026-08-29";

export const rootMetadata: Metadata = {
	metadataBase: canonicalSiteUrl,
	title: {
		default: "SoleSheet — Inventory for Philippine shoe resellers",
		template: "%s · SoleSheet",
	},
	description:
		"A faster mobile inventory, profit, and installment tracker being shaped with Filipino shoe resellers.",
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Your shoe business, out of the spreadsheet.",
		description:
			"Explore the planned mobile inventory, profit, and installment workflow for Filipino shoe resellers.",
		url: "/",
		siteName: "SoleSheet",
		locale: "en_PH",
		type: "website",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "SoleSheet mobile inventory dashboard concept",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "SoleSheet — built for Filipino shoe resellers",
		description:
			"A faster way to track pairs, profit, and installment payments from your phone.",
		images: ["/opengraph-image.png"],
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [
			{
				url: `/web/favicon.svg?v=${brandIconVersion}`,
				type: "image/svg+xml",
			},
			{
				url: `/web/favicon-16.png?v=${brandIconVersion}`,
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: `/web/favicon-32.png?v=${brandIconVersion}`,
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: `/web/favicon-48.png?v=${brandIconVersion}`,
				sizes: "48x48",
				type: "image/png",
			},
			{ url: `/favicon.ico?v=${brandIconVersion}` },
		],
		apple: [
			{ url: `/web/apple-touch-icon.png?v=${brandIconVersion}` },
		],
	},
	manifest: `/web/site.webmanifest?v=${brandIconVersion}`,
};
