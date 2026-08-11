import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SocialComposition } from "@/app/components/social/social-composition";
import { getSocialAsset } from "@/app/lib/social-assets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SoleSheet social asset studio",
  robots: { index: false, follow: false },
};

export default async function SocialAssetPage({
  params,
}: {
  params: Promise<{ asset: string }>;
}) {
  if (process.env.SHOETRACK_ENABLE_SOCIAL_STUDIO !== "1") notFound();

  const { asset: assetId } = await params;
  const asset = getSocialAsset(assetId);
  if (!asset) notFound();

  return <SocialComposition asset={asset} />;
}
