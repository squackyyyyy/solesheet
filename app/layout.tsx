import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = new URL(
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://shoetrack.ph",
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
		default: "ShoeTrack — Inventory for Philippine shoe resellers",
		template: "%s · ShoeTrack",
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
		siteName: "ShoeTrack",
		locale: "en_PH",
		type: "website",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "ShoeTrack mobile inventory dashboard concept",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "ShoeTrack — built for Filipino shoe resellers",
		description:
			"A faster way to track pairs, profit, and installment payments from your phone.",
		images: ["/opengraph-image"],
	},
	robots: {
		index: true,
		follow: true,
	},
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
