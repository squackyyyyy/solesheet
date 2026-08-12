import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebQuickAddComposition } from "@/app/components/web-quick-add/web-quick-add-composition";
import { getWebQuickAddCapture } from "@/app/lib/web-quick-add-assets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SoleSheet Web Quick-Add studio",
  robots: { index: false, follow: false },
};

export default async function WebQuickAddStudioPage({
  params,
}: {
  params: Promise<{ asset: string }>;
}) {
  if (process.env.SHOETRACK_ENABLE_WEB_QUICK_ADD_STUDIO !== "1") notFound();

  const { asset: assetId } = await params;
  const capture = getWebQuickAddCapture(assetId);
  if (!capture) notFound();

  return <WebQuickAddComposition capture={capture} />;
}
