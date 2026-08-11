import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = new URL(
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://solesheet.ph",
);

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: siteUrl,
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
				url: "/opengraph-image",
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
		images: ["/opengraph-image"],
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: [
			{ url: "/web/favicon.svg", type: "image/svg+xml" },
			{ url: "/web/favicon-32.png", sizes: "32x32", type: "image/png" },
			{ url: "/web/favicon.ico" },
		],
		apple: [{ url: "/web/apple-touch-icon.png" }],
	},
	manifest: "/web/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
