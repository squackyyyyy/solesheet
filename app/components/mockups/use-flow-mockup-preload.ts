import { useEffect, useRef, useState } from "react";
import {
  flowMockupAssets,
  publicFlowMockupPath,
  type FlowMockupLayout,
} from "@/app/lib/flow-mockup-assets";

export const flowMockupMobileMediaQuery = "(max-width: 639px)";

type IdleCallbackHandle = number;

type IdleWindow = Window &
  typeof globalThis & {
    cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
    requestIdleCallback?: (callback: () => void) => IdleCallbackHandle;
  };

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

function getCurrentLayout(): FlowMockupLayout {
  if (typeof window === "undefined") return "desktop";
  return window.matchMedia(flowMockupMobileMediaQuery).matches
    ? "mobile"
    : "desktop";
}

export function getFlowMockupPreloadPaths(layout: FlowMockupLayout) {
  return flowMockupAssets
    .filter((asset) => !asset.fastestPath)
    .map((asset) => publicFlowMockupPath(asset[layout].publicFilename));
}

function prefersDataSaving() {
  return Boolean((navigator as NavigatorWithConnection).connection?.saveData);
}

export function useFlowMockupPreload(initialPreviewReady: boolean) {
  const [layout, setLayout] = useState<FlowMockupLayout>(getCurrentLayout);
  const warmedPaths = useRef(new Set<string>());
  const preloaders = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(flowMockupMobileMediaQuery);
    const updateLayout = () => {
      setLayout(mediaQuery.matches ? "mobile" : "desktop");
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  useEffect(
    () => () => {
      for (const image of preloaders.current) {
        image.onload = null;
        image.onerror = null;
        image.src = "";
      }
      preloaders.current = [];
    },
    [],
  );

  useEffect(() => {
    if (!initialPreviewReady || prefersDataSaving()) return;

    const browserWindow = window as IdleWindow;
    let idleHandle: IdleCallbackHandle | undefined;
    let fallbackTimer: number | undefined;
    let cancelled = false;

    const warmCurrentLayout = () => {
      if (cancelled) return;

      for (const path of getFlowMockupPreloadPaths(layout)) {
        if (warmedPaths.current.has(path)) continue;
        warmedPaths.current.add(path);

        const image = new Image();
        image.decoding = "async";
        image.fetchPriority = "low";
        const removePreloader = () => {
          preloaders.current = preloaders.current.filter(
            (preloader) => preloader !== image,
          );
        };
        image.onload = removePreloader;
        image.onerror = removePreloader;
        preloaders.current.push(image);
        image.src = path;
      }
    };

    if (browserWindow.requestIdleCallback) {
      idleHandle = browserWindow.requestIdleCallback(warmCurrentLayout);
    } else {
      fallbackTimer = window.setTimeout(warmCurrentLayout, 250);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) browserWindow.cancelIdleCallback?.(idleHandle);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
    };
  }, [initialPreviewReady, layout]);
}
