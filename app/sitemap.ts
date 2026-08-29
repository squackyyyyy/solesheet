import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/app/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
	return [{ url: canonicalUrl() }, { url: canonicalUrl("/privacy") }];
}
