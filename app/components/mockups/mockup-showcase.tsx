"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/aria";
import {
  flowMockupAssets,
  publicFlowMockupPath,
  type FlowMockupId,
} from "@/app/lib/flow-mockup-assets";

export function MockupShowcase() {
  const [selectedId, setSelectedId] = useState<FlowMockupId>("quick-sale");
  const selected = flowMockupAssets.find((asset) => asset.id === selectedId) ?? flowMockupAssets[0];

  return (
    <section aria-labelledby="planned-flow-title">
      <div className="grid gap-3 sm:grid-cols-[1fr_.8fr] sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/65">
            Product preview gallery
          </p>
          <h3 id="planned-flow-title" className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-[#171717] sm:text-3xl">
            Seven everyday workflows, shown clearly.
          </h3>
        </div>
        <p className="max-w-md text-xs leading-6 text-black/55 sm:justify-self-end">
          Select a moment to switch the preview image. Controls pictured inside the phone are illustrative and do not operate here.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-label="Planned product screen selector">
        {flowMockupAssets.map((asset, index) => {
          const isSelected = selectedId === asset.id;
          return (
            <Button
              key={asset.id}
              variant="quiet"
              aria-pressed={isSelected}
              aria-label={asset.fastestPath ? `${asset.label}, fastest path` : asset.label}
              onPress={() => setSelectedId(asset.id)}
              className={`min-h-12 min-w-0 justify-start rounded-xl border px-3 py-3 text-left ${
                isSelected
                  ? asset.fastestPath
                    ? "border-emerald-900 bg-emerald-900 text-white data-[hovered]:bg-emerald-800"
                    : "border-[var(--brand-ink)] bg-[var(--brand-ink)] text-white data-[hovered]:bg-[#233353]"
                  : asset.fastestPath
                    ? "border-emerald-700 bg-[#e8ff9f] text-emerald-950 data-[hovered]:bg-[#ddfa7b]"
                    : "border-black/10 bg-white/70 text-[#171717] data-[hovered]:bg-white"
              }`}
            >
              <span aria-hidden="true" className={`text-[9px] ${isSelected ? "text-white/75" : asset.fastestPath ? "text-emerald-800" : "text-black/55"}`}>0{index + 1}</span>
              <span className="min-w-0">
                <span className="block truncate text-xs">{asset.label}</span>
                {asset.fastestPath ? <span className={`mt-0.5 block text-[8px] font-black uppercase tracking-[0.12em] ${isSelected ? "text-[#e8ff9f]" : "text-emerald-800"}`}>Fastest path</span> : null}
              </span>
              {isSelected ? <span className="sr-only">Selected</span> : null}
            </Button>
          );
        })}
      </div>

      <figure
        data-testid="planned-flow-figure"
        className="mt-5 aspect-[2/3] overflow-hidden rounded-[1.4rem] bg-stone-900 shadow-[0_24px_70px_rgba(23,23,23,.16)] sm:aspect-[4/3] sm:rounded-[2rem]"
      >
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={publicFlowMockupPath(selected.mobile.publicFilename)}
            type="image/webp"
            width={selected.mobile.width}
            height={selected.mobile.height}
          />
          <img
            key={selected.id}
            src={publicFlowMockupPath(selected.desktop.publicFilename)}
            width={selected.desktop.width}
            height={selected.desktop.height}
            alt={selected.description}
            className="block h-full w-full object-cover"
            loading={selected.fastestPath ? "eager" : "lazy"}
            fetchPriority={selected.fastestPath ? "high" : "auto"}
          />
        </picture>
      </figure>

      <p aria-live="polite" className="sr-only">Showing {selected.label} product preview</p>
    </section>
  );
}
