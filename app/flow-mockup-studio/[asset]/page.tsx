import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlowMockupComposition } from "@/app/components/flow-mockups/flow-mockup-composition";
import { getFlowMockupCapture } from "@/app/lib/flow-mockup-assets";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SoleSheet flow mockup studio",
  robots: { index: false, follow: false },
};

export default async function FlowMockupPage({
  params,
}: {
  params: Promise<{ asset: string }>;
}) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.SHOETRACK_ENABLE_FLOW_STUDIO !== "1"
  ) {
    notFound();
  }

  const { asset: assetId } = await params;
  const capture = getFlowMockupCapture(assetId);
  if (!capture) notFound();

  return <FlowMockupComposition capture={capture} />;
}
