"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/aria";
import {
  DeviceFrame,
  mockupMeta,
  ScreenForId,
  type MockupId,
} from "@/app/components/mockups/app-screens";

export function MockupShowcase() {
  const [selectedId, setSelectedId] = useState<MockupId>("dashboard");
  const selected = mockupMeta.find((screen) => screen.id === selectedId) ?? mockupMeta[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(330px,.72fr)] lg:items-center">
      <div className="min-w-0">
        <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-3 lg:grid lg:grid-cols-2 lg:overflow-visible">
          {mockupMeta.map((screen, index) => {
            const isSelected = selectedId === screen.id;
            return (
              <Button
                key={screen.id}
                variant="quiet"
                aria-pressed={isSelected}
                onPress={() => setSelectedId(screen.id)}
                className={`min-w-[155px] snap-start justify-start rounded-2xl border px-4 py-3 text-left lg:min-w-0 ${
                  isSelected
                    ? "border-[#2457ff] bg-[#2457ff] text-white data-[hovered]:bg-[#1747e8]"
                    : "border-black/10 bg-white/70 text-[#171717] data-[hovered]:bg-white"
                }`}
              >
                <span className={`text-[10px] ${isSelected ? "text-white" : "text-black/65"}`}>
                  0{index + 1}
                </span>
                <span>{screen.shortLabel}</span>
              </Button>
            );
          })}
        </div>

        <div className="mt-5 hidden rounded-[2rem] border border-black/10 bg-white/70 p-6 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2457ff]">Selected flow</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#171717]">{selected.label}</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-black/65">{selected.description}</p>
          <p aria-live="polite" className="sr-only">Showing {selected.label}</p>
        </div>
      </div>

      <div className="relative min-h-[660px] overflow-hidden rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_20%,#dce5ff_0%,#f7f3e9_48%,#e8ff9f_120%)] px-4 py-8 sm:px-8">
        <div aria-hidden="true" className="absolute -right-10 top-16 size-28 rounded-full border border-[#2457ff]/20" />
        <div aria-hidden="true" className="absolute -left-10 bottom-24 size-32 rounded-full bg-[#e8ff9f]/70 blur-xl" />
        <DeviceFrame label={selected.label} description={selected.description}>
          <ScreenForId id={selected.id} />
        </DeviceFrame>
        <div className="mx-auto mt-5 max-w-sm text-center lg:hidden">
          <p className="text-sm font-semibold text-[#171717]">{selected.label}</p>
          <p className="mt-1 text-xs leading-5 text-black/65">{selected.description}</p>
          <p aria-live="polite" className="sr-only">Showing {selected.label}</p>
        </div>
      </div>
    </div>
  );
}
