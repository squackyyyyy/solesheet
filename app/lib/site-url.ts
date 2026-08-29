export const canonicalSiteOrigin = "https://solesheet.app";

/**
 * Resolves the one public URL SoleSheet wants crawlers to index.
 *
 * Preview and provider hosts intentionally fall back to this origin so they
 * cannot publish competing canonical URLs.
 */
export function resolveCanonicalSiteUrl(
	configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL,
) {
	const canonicalSiteUrl = new URL(canonicalSiteOrigin);

	if (!configuredSiteUrl?.trim()) return canonicalSiteUrl;

	try {
		const configuredUrl = new URL(configuredSiteUrl);
		if (configuredUrl.origin !== canonicalSiteUrl.origin) return canonicalSiteUrl;
		return new URL("/", configuredUrl);
	} catch {
		return canonicalSiteUrl;
	}
}

export const canonicalSiteUrl = resolveCanonicalSiteUrl();

export function canonicalUrl(pathname = "/") {
	return new URL(pathname, canonicalSiteUrl).toString();
}
