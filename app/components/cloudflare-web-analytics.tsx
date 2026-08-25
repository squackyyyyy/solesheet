"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const CLOUDFLARE_WEB_ANALYTICS_SCRIPT_URL =
	"https://static.cloudflareinsights.com/beacon.min.js";
const CLOUDFLARE_WEB_ANALYTICS_SCRIPT_ID =
	"cloudflare-web-analytics-beacon";

type CloudflareWebAnalyticsProps = {
	siteUrl?: string;
	token?: string;
};

type CloudflareWebAnalyticsConfig = {
	token: string;
};

function subscribeToHostname() {
	return () => {};
}

function getBrowserHostname() {
	return window.location.hostname;
}

function getServerHostname() {
	return "";
}

function isLocalHostname(hostname: string) {
	return (
		hostname === "localhost" ||
		hostname.endsWith(".localhost") ||
		hostname === "127.0.0.1" ||
		hostname === "::1" ||
		hostname === "[::1]"
	);
}

export function resolveCloudflareWebAnalyticsConfig({
	siteUrl,
	token,
	currentHostname,
}: CloudflareWebAnalyticsProps & { currentHostname: string }):
	| CloudflareWebAnalyticsConfig
	| null {
	const normalizedToken = token?.trim();
	const normalizedCurrentHostname = currentHostname.trim().toLowerCase();
	if (!normalizedToken || !normalizedCurrentHostname) return null;
	if (isLocalHostname(normalizedCurrentHostname)) return null;

	try {
		const configuredSite = new URL(siteUrl ?? "");
		if (!['http:', 'https:'].includes(configuredSite.protocol)) return null;
		if (configuredSite.hostname.toLowerCase() !== normalizedCurrentHostname) {
			return null;
		}
	} catch {
		return null;
	}

	return { token: normalizedToken };
}

export function CloudflareWebAnalytics({
	siteUrl,
	token,
}: CloudflareWebAnalyticsProps) {
	const currentHostname = useSyncExternalStore(
		subscribeToHostname,
		getBrowserHostname,
		getServerHostname,
	);
	const config = resolveCloudflareWebAnalyticsConfig({
		siteUrl,
		token,
		currentHostname,
	});

	if (!config) return null;

	return (
		<Script
			id={CLOUDFLARE_WEB_ANALYTICS_SCRIPT_ID}
			type="module"
			src={CLOUDFLARE_WEB_ANALYTICS_SCRIPT_URL}
			strategy="afterInteractive"
			data-cf-beacon={JSON.stringify({ token: config.token, spa: true })}
		/>
	);
}
