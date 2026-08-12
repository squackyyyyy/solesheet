import registry from "@/app/lib/web-quick-add-assets.json";

export type WebQuickAddLayout = "desktop" | "mobile";

export type WebQuickAddSource = {
  captureId: string;
  masterFilename: string;
  publicFilename: string;
  width: 3200 | 1600;
  height: 2400;
  sourceWidth: 1600 | 800;
  sourceHeight: 1200;
};

export type WebQuickAddAsset = {
  id: "growth-web-quick-add";
  label: string;
  title: string;
  description: string;
  desktop: WebQuickAddSource;
  mobile: WebQuickAddSource;
};

export type WebQuickAddCapture = WebQuickAddSource & {
  destination: WebQuickAddAsset;
  layout: WebQuickAddLayout;
};

export const webQuickAddAssets = registry as WebQuickAddAsset[];
export const webQuickAddAsset = webQuickAddAssets[0];

export function getWebQuickAddCapture(captureId: string): WebQuickAddCapture | undefined {
  for (const destination of webQuickAddAssets) {
    for (const layout of ["desktop", "mobile"] as const) {
      const source = destination[layout];
      if (source.captureId === captureId) {
        return { ...source, destination, layout };
      }
    }
  }
}

export function publicWebQuickAddPath(filename: string) {
  return `/web-quick-add/${filename}`;
}
