"use client";

import Image from "next/image";
import {
  BrowserAppButton,
  BrowserAppCell,
  BrowserAppColumn,
  BrowserAppRow,
  BrowserAppSelect,
  BrowserAppTable,
  BrowserAppTableBody,
  BrowserAppTableHeader,
  BrowserAppTextField,
} from "@/app/components/web-quick-add/browser-app-primitives";
import {
  formatPeso,
  webQuickAddBatch,
  webQuickAddSummary,
  type ShoeRecord,
} from "@/app/lib/mock-data";
import type { WebQuickAddCapture } from "@/app/lib/web-quick-add-assets";

const statusOptions = ["Available", "Reserved"] as const;

function BrowserChrome() {
  return (
    <div aria-hidden="true" className="flex h-11 items-center gap-3 border-b border-stone-200 bg-stone-50 px-4">
      <span className="size-2.5 rounded-full bg-red-400" />
      <span className="size-2.5 rounded-full bg-amber-400" />
      <span className="size-2.5 rounded-full bg-emerald-500" />
      <span className="ml-2 text-stone-400">←</span>
      <span className="text-stone-400">→</span>
      <span className="text-stone-400">↻</span>
      <div className="ml-2 flex h-7 flex-1 items-center rounded-lg bg-white px-3 text-[10px] text-stone-400 ring-1 ring-stone-200">
        app.solesheet.com/quick-add
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside aria-label="Browser app navigation" className="w-[178px] shrink-0 border-r border-stone-200 bg-white px-4 py-5">
      <Image src="/svg/solesheet-horizontal-on-light.svg" alt="SoleSheet" width={1200} height={320} className="h-auto w-[122px]" />
      <nav aria-label="Web Quick-Add preview navigation" className="mt-7 grid gap-1.5 text-[12px] font-semibold text-stone-500">
        {["Overview", "Quick-Add", "Inventory", "Transactions", "Analytics", "Settings"].map((item) => (
          <span key={item} className={`flex min-h-10 items-center gap-3 rounded-xl px-3 ${item === "Quick-Add" ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100" : ""}`}>
            <span aria-hidden="true" className="grid size-5 place-items-center rounded-md border border-current text-[10px]">{item === "Quick-Add" ? "+" : "·"}</span>
            {item}
          </span>
        ))}
      </nav>
    </aside>
  );
}

function BatchRow({ shoe }: { shoe: ShoeRecord }) {
  const name = `${shoe.brand} ${shoe.model}`;
  return (
    <BrowserAppRow id={shoe.id} textValue={`${name} ${shoe.size} ${shoe.colorway}`}>
      <BrowserAppCell><BrowserAppTextField aria-label={`${name} brand and model`} value={name} /></BrowserAppCell>
      <BrowserAppCell><BrowserAppSelect aria-label={`${name} size`} value={shoe.size} options={[shoe.size]} /></BrowserAppCell>
      <BrowserAppCell><BrowserAppTextField aria-label={`${name} colorway`} value={shoe.colorway} /></BrowserAppCell>
      <BrowserAppCell><BrowserAppTextField aria-label={`${name} cost`} value={formatPeso(shoe.cost)} className="tabular-nums" /></BrowserAppCell>
      <BrowserAppCell><BrowserAppTextField aria-label={`${name} target price`} value={formatPeso(shoe.target ?? 0)} className="tabular-nums" /></BrowserAppCell>
      <BrowserAppCell><BrowserAppSelect aria-label={`${name} starting status`} value={shoe.status} options={statusOptions} /></BrowserAppCell>
    </BrowserAppRow>
  );
}

function QuickAddTable({ mobile }: { mobile: boolean }) {
  const rows = webQuickAddBatch.slice(0, mobile ? 3 : 4);
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_12px_36px_rgba(20,33,61,.07)]">
      <BrowserAppTable aria-label="Web Quick-Add inventory batch">
        <BrowserAppTableHeader>
          <BrowserAppColumn id="model" isRowHeader className="w-[24%]">Brand / model</BrowserAppColumn>
          <BrowserAppColumn id="size" className="w-[11%]">Size</BrowserAppColumn>
          <BrowserAppColumn id="colorway" className="w-[20%]">Colorway</BrowserAppColumn>
          <BrowserAppColumn id="cost" className="w-[14%]">Cost</BrowserAppColumn>
          <BrowserAppColumn id="target" className="w-[14%]">Target</BrowserAppColumn>
          <BrowserAppColumn id="status" className="w-[17%]">Status</BrowserAppColumn>
        </BrowserAppTableHeader>
        <BrowserAppTableBody>
          {rows.map((shoe) => <BatchRow key={shoe.id} shoe={shoe} />)}
        </BrowserAppTableBody>
      </BrowserAppTable>
      <div className="p-2.5">
        <BrowserAppButton tone="quiet" className="w-full">＋ Add row</BrowserAppButton>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-stone-100 bg-stone-50/70 p-3">
        <div className="flex gap-2">
          <BrowserAppButton>▣ Duplicate</BrowserAppButton>
          <BrowserAppButton>⌫ Delete</BrowserAppButton>
        </div>
        <BrowserAppButton tone="primary">Save {webQuickAddSummary.readyCount} pairs</BrowserAppButton>
      </div>
    </div>
  );
}

function SummaryCards() {
  return (
    <div className="mt-4 grid grid-cols-[1fr_.8fr] gap-3">
      <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-xl bg-[#e8ff9f] text-2xl">□</span>
        <div><p className="text-[22px] font-black tracking-[-.04em]">{webQuickAddSummary.readyCount} pairs ready</p><p className="mt-1 text-[11px] text-stone-500">Review and save to inventory.</p></div>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div><p className="text-[11px] text-stone-500">Inventory cost</p><p className="mt-2 text-[27px] font-black tracking-[-.04em] tabular-nums">{formatPeso(webQuickAddSummary.inventoryCost)}</p></div>
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-xl bg-emerald-50 text-xl text-emerald-700">▦</span>
      </div>
    </div>
  );
}

function BrowserWorkspace({ mobile }: { mobile: boolean }) {
  return (
    <div data-browser-workspace="true" className="overflow-hidden rounded-[28px] border-[9px] border-[#111] bg-white shadow-[0_45px_110px_rgba(20,33,61,.27)]">
      <BrowserChrome />
      <div className="flex h-[765px]">
        <Sidebar />
        <section aria-labelledby="web-quick-add-workspace-title" className="min-w-0 flex-1 bg-[#f7f6f2] p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-700">Growth workspace</p>
              <h2 id="web-quick-add-workspace-title" className="mt-1.5 text-[28px] font-black tracking-[-.045em] text-stone-950">Quick-Add</h2>
              <p className="mt-1 text-[12px] text-stone-500">Encode a full delivery from your browser.</p>
            </div>
            <span className="rounded-full bg-emerald-800 px-3 py-2 text-[10px] font-black text-white">Growth plan · Planned</span>
          </div>
          <div className="mt-5"><QuickAddTable mobile={mobile} /></div>
          <SummaryCards />
        </section>
      </div>
    </div>
  );
}

function CompositionBoard({ capture }: { capture: WebQuickAddCapture }) {
  const mobile = capture.layout === "mobile";
  return (
    <div className={`relative h-full overflow-hidden bg-[radial-gradient(circle_at_12%_88%,#dbe9d8_0%,#f7f4ec_32%,#fbfaf7_72%)] text-[#14213d] ${mobile ? "px-[42px] py-[40px]" : "px-[82px] py-[68px]"}`}>
      <div className="relative z-20 flex items-center justify-between gap-4">
        <Image src="/svg/solesheet-horizontal-on-light.svg" alt="SoleSheet" width={1200} height={320} className={`h-auto ${mobile ? "w-[190px]" : "w-[230px]"}`} />
        <span className="rounded-full border border-stone-950/15 bg-white/75 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em] text-stone-600">Product preview</span>
      </div>
      <div className={`relative z-20 ${mobile ? "mt-16 max-w-[670px]" : "mt-[138px] w-[550px]"}`}>
        <p className="text-[14px] font-black uppercase tracking-[.24em] text-emerald-700">Growth · Web Quick-Add</p>
        <h1 className={`${mobile ? "mt-4 text-[60px] leading-[.92]" : "mt-6 text-[66px] leading-[.93]"} font-black tracking-[-.07em] text-stone-950`}>A full delivery.<br />One clean batch.</h1>
        <p className={`${mobile ? "mt-5 max-w-[650px] text-[19px] leading-[1.38]" : "mt-7 max-w-[450px] text-[21px] leading-[1.45]"} text-stone-600`}>Web Quick-Add is planned for Growth sellers who manage inventory at scale.</p>
      </div>
      <div className={`absolute z-10 ${mobile ? "left-[46px] top-[410px] w-[920px] origin-top-left [transform:scale(.76)]" : "right-[20px] top-[170px] w-[930px] [transform:rotateZ(-1.2deg)]"}`}>
        <BrowserWorkspace mobile={mobile} />
      </div>
      <div className={`absolute z-30 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white/92 px-4 py-3 shadow-xl ${mobile ? "bottom-7 left-10" : "bottom-[72px] left-[82px]"}`}>
        <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-xl text-emerald-800">▯</span>
        <div><p className="text-[11px] font-black text-stone-900">Available in mobile inventory</p><p className="mt-1 text-[10px] text-stone-500">Planned cloud connection</p></div>
      </div>
    </div>
  );
}

export function WebQuickAddComposition({ capture }: { capture: WebQuickAddCapture }) {
  return (
    <main
      data-capture-ready="true"
      data-asset-id={capture.captureId}
      data-layout={capture.layout}
      className="overflow-hidden font-sans antialiased"
      style={{ width: capture.sourceWidth, height: capture.sourceHeight }}
    >
      <CompositionBoard capture={capture} />
    </main>
  );
}
