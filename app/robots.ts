import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/app/lib/site-url";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/api/",
				"/flow-mockup-studio/",
				"/social-studio/",
				"/web-quick-add-studio/",
			],
		},
		sitemap: canonicalUrl("/sitemap.xml"),
	};
}
