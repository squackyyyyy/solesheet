import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MockupShowcase } from "@/app/components/mockups/mockup-showcase";
import {
  getFlowMockupPreloadPaths,
  flowMockupMobileMediaQuery,
} from "@/app/components/mockups/use-flow-mockup-preload";

type MediaQueryFixture = {
  emitChange: (matches: boolean) => void;
  paths: string[];
  runIdle: () => void;
};

function installBrowserFixture({
  mobile = false,
  saveData = false,
  withIdleCallback = false,
}: {
  mobile?: boolean;
  saveData?: boolean;
  withIdleCallback?: boolean;
} = {}): MediaQueryFixture {
  let matches = mobile;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    get matches() {
      return matches;
    },
    media: flowMockupMobileMediaQuery,
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener);
    }),
    removeEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener);
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => mediaQuery),
  });
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: { saveData },
  });

  const paths: string[] = [];
  vi.stubGlobal(
    "Image",
    class {
      decoding = "";
      fetchPriority = "";

      set src(path: string) {
        paths.push(path);
      }
    },
  );

  let runIdle = () => {};
  if (withIdleCallback) {
    let nextHandle = 1;
    const callbacks = new Map<number, () => void>();
    Object.defineProperty(window, "requestIdleCallback", {
      configurable: true,
      value: vi.fn((callback: () => void) => {
        const handle = nextHandle++;
        callbacks.set(handle, callback);
        return handle;
      }),
    });
    Object.defineProperty(window, "cancelIdleCallback", {
      configurable: true,
      value: vi.fn((handle: number) => callbacks.delete(handle)),
    });
    runIdle = () => {
      for (const callback of callbacks.values()) callback();
      callbacks.clear();
    };
  } else {
    Object.defineProperty(window, "requestIdleCallback", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "cancelIdleCallback", {
      configurable: true,
      value: undefined,
    });
  }

  return {
    paths,
    runIdle,
    emitChange(nextMatches) {
      matches = nextMatches;
      for (const listener of listeners) {
        listener({ matches } as MediaQueryListEvent);
      }
    },
  };
}

function markQuickSaleReady() {
  fireEvent.load(
    screen.getByRole("img", { name: /paid Nike Dunk Low sale found by model/i }),
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("flow mockup background warming", () => {
  it("derives only non-default paths for one art direction", () => {
    expect(getFlowMockupPreloadPaths("desktop")).toEqual([
      "/flow-mockups/quick-actions-desktop.webp",
      "/flow-mockups/search-stock-desktop.webp",
      "/flow-mockups/add-stock-desktop.webp",
      "/flow-mockups/installments-desktop.webp",
      "/flow-mockups/payments-desktop.webp",
      "/flow-mockups/backup-desktop.webp",
    ]);
    expect(getFlowMockupPreloadPaths("mobile")).toEqual([
      "/flow-mockups/quick-actions-mobile.webp",
      "/flow-mockups/search-stock-mobile.webp",
      "/flow-mockups/add-stock-mobile.webp",
      "/flow-mockups/installments-mobile.webp",
      "/flow-mockups/payments-mobile.webp",
      "/flow-mockups/backup-mobile.webp",
    ]);
  });

  it("waits for Quick Sale and idle fallback before warming the current layout", () => {
    vi.useFakeTimers();
    const browser = installBrowserFixture();
    render(<MockupShowcase />);

    expect(browser.paths).toEqual([]);
    markQuickSaleReady();
    expect(browser.paths).toEqual([]);

    act(() => vi.advanceTimersByTime(250));
    expect(browser.paths).toEqual(getFlowMockupPreloadPaths("desktop"));
  });

  it("uses browser idle time when it is available", () => {
    const browser = installBrowserFixture({ withIdleCallback: true });
    render(<MockupShowcase />);
    markQuickSaleReady();
    expect(browser.paths).toEqual([]);

    act(() => browser.runIdle());
    expect(browser.paths).toEqual(getFlowMockupPreloadPaths("desktop"));
  });

  it("cancels pending idle warming when the gallery unmounts", () => {
    const browser = installBrowserFixture({ withIdleCallback: true });
    const view = render(<MockupShowcase />);
    markQuickSaleReady();
    view.unmount();

    act(() => browser.runIdle());
    expect(browser.paths).toEqual([]);
  });

  it("uses the mobile source set and respects data saving", () => {
    vi.useFakeTimers();
    const mobileBrowser = installBrowserFixture({ mobile: true });
    const mobileView = render(<MockupShowcase />);
    markQuickSaleReady();
    act(() => vi.advanceTimersByTime(250));
    expect(mobileBrowser.paths).toEqual(getFlowMockupPreloadPaths("mobile"));

    mobileView.unmount();
    const savingBrowser = installBrowserFixture({ saveData: true });
    render(<MockupShowcase />);
    markQuickSaleReady();
    act(() => vi.advanceTimersByTime(250));
    expect(savingBrowser.paths).toEqual([]);
  });

  it("warms a newly applicable source set once after a breakpoint change", () => {
    vi.useFakeTimers();
    const browser = installBrowserFixture();
    render(<MockupShowcase />);
    markQuickSaleReady();
    act(() => vi.advanceTimersByTime(250));

    act(() => browser.emitChange(true));
    act(() => vi.advanceTimersByTime(250));
    expect(browser.paths).toEqual([
      ...getFlowMockupPreloadPaths("desktop"),
      ...getFlowMockupPreloadPaths("mobile"),
    ]);

    act(() => browser.emitChange(false));
    act(() => vi.advanceTimersByTime(250));
    expect(browser.paths).toHaveLength(12);
  });

  it("keeps early selections usable without adding a visible loader", () => {
    installBrowserFixture();
    render(<MockupShowcase />);

    fireEvent.click(screen.getByRole("button", { name: "Quick Actions" }));
    expect(
      screen.getByRole("img", { name: /menu anchored above Quick Log/i }),
    ).toBeVisible();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
