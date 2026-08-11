import {
  dashboard,
  formatPeso,
  quickLogExample,
} from "@/app/lib/mock-data";
import {
  PreviewDisclosure,
  ProofInventoryRow,
  ProofMetric,
} from "@/app/components/mockups/product-proof-views";

const updatedCapital = dashboard.inventoryCost + quickLogExample.cost;
const potentialMargin = (quickLogExample.target ?? 0) - quickLogExample.cost;

function Stage({
  number,
  eyebrow,
  title,
  copy,
  children,
  className = "",
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative min-w-0 overflow-hidden rounded-[1.6rem] border border-stone-950/10 bg-[#f7f6f2] p-4 shadow-[0_18px_45px_rgba(17,17,17,.07)] sm:p-5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-stone-950 text-[11px] font-black text-white">
          {number}
        </span>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700">
            {eyebrow}
          </p>
          <h5 className="mt-1 text-lg font-bold tracking-tight text-stone-950">
            {title}
          </h5>
          <p className="mt-1 text-xs leading-5 text-stone-600">{copy}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function StaticField({
  label,
  value,
  optional = false,
}: {
  label: string;
  value: string;
  optional?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2 text-[10px] font-bold text-stone-600">
        <span>{label}</span>
        {optional ? (
          <span className="font-semibold text-stone-600">Optional</span>
        ) : null}
      </div>
      <div className="flex min-h-11 items-center rounded-xl border border-stone-200 bg-white px-3 text-sm font-bold text-stone-950">
        {value}
      </div>
    </div>
  );
}

export function QuickLogStory() {
  const description =
    "Quick Log illustrative product preview. Step 1: tap the labeled Home shortcut. Step 2: choose Add a pair, Mark a pair sold, or Record a payment; sale and payment paths select an existing record. Step 3: the Add a pair example uses New Balance 530, US 7, ₱4,200 cost, and an optional ₱5,600 target. Step 4: the same record becomes available, active pairs change from 12 to 13, inventory capital changes from ₱53,200 to ₱57,400, and ₱1,400 potential margin is shown separately.";

  return (
    <figure
      role="img"
      aria-label={description}
      className="overflow-hidden rounded-[2rem] border border-stone-950/10 bg-white/75 shadow-[0_28px_80px_rgba(17,17,17,.1)]"
    >
      <div aria-hidden="true">
        <div className="flex flex-col gap-4 border-b border-stone-200 bg-white px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7 sm:py-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
              Quick Log · Fastest path
            </p>
            <h4 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-stone-950 sm:text-3xl">
              This can be as quick as this.
            </h4>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              One shortcut, four essentials, and the important stockroom numbers move together.
            </p>
          </div>
          <PreviewDisclosure compact />
        </div>

        <div className="grid gap-4 bg-[#e8e3d8] p-4 sm:p-6 lg:grid-cols-3 lg:p-7">
          <Stage
            number="01"
            eyebrow="One tap"
            title="Start from Home."
            copy="The shortcut sits above navigation, ready for the next stockroom update."
          >
            <div className="relative min-h-48 overflow-hidden rounded-2xl bg-emerald-900 p-4 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                    Your stockroom
                  </p>
                  <p className="mt-2 text-3xl font-black">12</p>
                  <p className="text-[10px] text-emerald-100">active pairs</p>
                </div>
                <span className="grid size-8 place-items-center rounded-xl bg-white/12 text-[10px] font-black">
                  ST
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="rounded-full bg-white px-3 py-2 text-[10px] font-black text-stone-900 shadow-sm">
                  Quick Log
                </span>
                <span className="grid size-12 place-items-center rounded-full bg-[#e8ff9f] text-2xl font-medium text-emerald-950 shadow-lg">
                  +
                </span>
              </div>
            </div>
          </Stage>

          <Stage
            number="02"
            eyebrow="Choose"
            title="Name the update."
            copy="Quick Log routes stock, sales, and collections from one obvious place."
          >
            <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
              {[
                ["＋", "Add a pair", "Four essentials first"],
                ["↗", "Mark a pair sold", "Choose an existing pair"],
                ["₱", "Record a payment", "Choose an existing sale"],
              ].map(([icon, label, detail], index) => (
                <div
                  key={label}
                  className={`flex min-h-14 items-center gap-3 px-2 ${index > 0 ? "border-t border-stone-100" : ""}`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-sm font-black text-emerald-800">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-stone-950">{label}</p>
                    <p className="mt-0.5 text-[10px] text-stone-500">{detail}</p>
                  </div>
                  <span className="ml-auto text-sm text-stone-400">→</span>
                </div>
              ))}
            </div>
          </Stage>

          <Stage
            number="03"
            eyebrow="Four essentials"
            title="Add only what matters now."
            copy="The rest can wait. The target stays optional and separate from inventory capital."
          >
            <div className="grid gap-3 rounded-2xl bg-white p-3 ring-1 ring-stone-200">
              <StaticField
                label="Brand and model"
                value={`${quickLogExample.brand} ${quickLogExample.model}`}
              />
              <div className="grid grid-cols-2 gap-2.5">
                <StaticField label="Size" value={quickLogExample.size} />
                <StaticField label="Cost price" value={formatPeso(quickLogExample.cost)} />
              </div>
              <StaticField
                label="Target price"
                value={formatPeso(quickLogExample.target ?? 0)}
                optional
              />
              <div className="grid min-h-11 place-items-center rounded-xl bg-emerald-700 text-xs font-black text-white">
                Save pair →
              </div>
            </div>
          </Stage>

          <Stage
            number="04"
            eyebrow="Already connected"
            title="Pair added. Your stockroom is already updated."
            copy="The new pair, count, and capital all come from the same fictional record."
            className="lg:col-span-3"
          >
            <div className="grid gap-3 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
              <ProofInventoryRow pair={quickLogExample} isNew />
              <div className="grid grid-cols-2 gap-3">
                <ProofMetric
                  label="Active pairs"
                  previousValue={String(dashboard.activePairs)}
                  value={String(dashboard.activePairs + 1)}
                  delta="+1"
                  changed
                />
                <ProofMetric
                  label="Inventory capital"
                  previousValue={formatPeso(dashboard.inventoryCost)}
                  value={formatPeso(updatedCapital)}
                  delta={`+${formatPeso(quickLogExample.cost)}`}
                  changed
                />
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="text-stone-600">Optional target stays separate from capital</span>
              <span className="font-black tabular-nums text-emerald-800">
                {formatPeso(potentialMargin)} potential margin
              </span>
            </div>
          </Stage>
        </div>
      </div>
    </figure>
  );
}
