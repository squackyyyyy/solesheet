import { Geist, Geist_Mono } from "next/font/google";
import { CloudflareWebAnalytics } from "@/app/components/cloudflare-web-analytics";
import { canonicalSiteUrl } from "@/app/lib/site-url";
import { rootMetadata } from "@/app/lib/site-metadata";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = rootMetadata;

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
			<body className="min-h-full flex flex-col">
				{children}
				<CloudflareWebAnalytics
					siteUrl={canonicalSiteUrl.href}
					token={process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN}
				/>
			</body>
		</html>
	);
}
