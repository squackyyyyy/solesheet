import registry from "@/app/lib/flow-mockup-assets.json";

export type FlowMockupId =
  | "quick-sale"
  | "quick-actions"
  | "search-stock"
  | "add-stock"
  | "installments"
  | "payments"
  | "backup";

export type FlowMockupLayout = "desktop" | "mobile";

export type FlowMockupSource = {
  captureId: string;
  masterFilename: string;
  publicFilename: string;
  width: 3200 | 1600;
  height: 2400;
  sourceWidth: 1600 | 800;
  sourceHeight: 1200;
};

export type FlowMockupAsset = {
  id: FlowMockupId;
  label: string;
  title: string;
  fastestPath: boolean;
  description: string;
  desktop: FlowMockupSource;
  mobile: FlowMockupSource;
};

export type FlowMockupCapture = FlowMockupSource & {
  destination: FlowMockupAsset;
  layout: FlowMockupLayout;
};

export const flowMockupAssets = registry as FlowMockupAsset[];

export function getFlowMockupAsset(id: string) {
  return flowMockupAssets.find((asset) => asset.id === id);
}

export function getFlowMockupCapture(captureId: string): FlowMockupCapture | undefined {
  for (const destination of flowMockupAssets) {
    for (const layout of ["desktop", "mobile"] as const) {
      const source = destination[layout];
      if (source.captureId === captureId) {
        return { ...source, destination, layout };
      }
    }
  }
}

export function publicFlowMockupPath(filename: string) {
  return `/flow-mockups/${filename}`;
}
