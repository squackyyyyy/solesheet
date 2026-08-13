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
  webInventoryNewRowIds,
  webInventoryRows,
  webInventorySummary,
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
        app.solesheet.com/inventory
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside aria-label="Browser app navigation" className="w-[178px] shrink-0 border-r border-stone-200 bg-white px-4 py-5">
      <Image src="/svg/solesheet-horizontal-on-light.svg" alt="SoleSheet" width={1200} height={320} className="h-auto w-[122px]" />
      <nav aria-label="Web Inventory preview navigation" className="mt-7 grid gap-1.5 text-[12px] font-semibold text-stone-500">
        {["Overview", "Inventory", "Transactions", "Analytics", "Settings"].map((item) => (
          <span key={item} className={`flex min-h-10 items-center rounded-xl px-3 ${item === "Inventory" ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100" : ""}`}>
            {item}
          </span>
        ))}
      </nav>
    </aside>
  );
}

function InventoryRow({ shoe }: { shoe: ShoeRecord }) {
  const name = `${shoe.brand} ${shoe.model}`;
  const isNew = webInventoryNewRowIds.some((id) => id === shoe.id);
  const newRowCell = "border-y border-emerald-400 bg-emerald-50/35";
  return (
    <BrowserAppRow
      data-new-inventory-row={isNew ? "true" : undefined}
      id={shoe.id}
      textValue={`${name} ${shoe.size} ${shoe.colorway}`}
      className={isNew ? "relative z-10 outline outline-1 outline-emerald-400 shadow-[0_0_18px_rgba(16,185,129,.24)]" : undefined}
    >
      <BrowserAppCell className={isNew ? `${newRowCell} border-l rounded-l-xl` : undefined}>
        <div className="relative">
          <BrowserAppTextField aria-label={`${name} brand and model`} value={name} className={isNew ? "pl-11" : undefined} />
          {isNew ? <span className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-emerald-700 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[.08em] text-white">New</span> : null}
        </div>
      </BrowserAppCell>
      <BrowserAppCell className={isNew ? newRowCell : undefined}><BrowserAppSelect aria-label={`${name} size`} value={shoe.size} options={[shoe.size]} /></BrowserAppCell>
      <BrowserAppCell className={isNew ? newRowCell : undefined}><BrowserAppTextField aria-label={`${name} colorway`} value={shoe.colorway} /></BrowserAppCell>
      <BrowserAppCell className={isNew ? newRowCell : undefined}><BrowserAppTextField aria-label={`${name} cost`} value={formatPeso(shoe.cost)} className="tabular-nums" /></BrowserAppCell>
      <BrowserAppCell className={isNew ? newRowCell : undefined}><BrowserAppTextField aria-label={`${name} target price`} value={formatPeso(shoe.target ?? 0)} className="tabular-nums" /></BrowserAppCell>
      <BrowserAppCell className={isNew ? `${newRowCell} border-r rounded-r-xl` : undefined}><BrowserAppSelect aria-label={`${name} status`} value={shoe.status} options={statusOptions} /></BrowserAppCell>
    </BrowserAppRow>
  );
}

function InventoryTable() {
  const rows = webInventoryRows.slice(0, 4);
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_12px_36px_rgba(20,33,61,.07)]">
      <BrowserAppTable aria-label="Web Inventory table">
        <BrowserAppTableHeader>
          <BrowserAppColumn id="model" isRowHeader className="w-[24%]">Brand / model</BrowserAppColumn>
          <BrowserAppColumn id="size" className="w-[11%]">Size</BrowserAppColumn>
          <BrowserAppColumn id="colorway" className="w-[20%]">Colorway</BrowserAppColumn>
          <BrowserAppColumn id="cost" className="w-[14%]">Cost</BrowserAppColumn>
          <BrowserAppColumn id="target" className="w-[14%]">Target</BrowserAppColumn>
          <BrowserAppColumn id="status" className="w-[17%]">Status</BrowserAppColumn>
        </BrowserAppTableHeader>
        <BrowserAppTableBody>
          {rows.map((shoe) => <InventoryRow key={shoe.id} shoe={shoe} />)}
        </BrowserAppTableBody>
      </BrowserAppTable>
      <div className="p-2.5">
        <BrowserAppButton tone="quiet" className="w-full">+ Add row</BrowserAppButton>
        <p className="mt-2 text-center text-[10px] font-semibold text-stone-500">Each row is one pair.</p>
      </div>
    </div>
  );
}

function SummaryCards() {
  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-[21px] font-black tracking-[-.04em]">{webInventorySummary.pairCount} pairs</p>
          <p className="mt-1 text-[11px] text-stone-500">in inventory</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
          <p className="text-[21px] font-black tracking-[-.04em] text-emerald-900">{webInventorySummary.newlyAddedCount} newly added</p>
          <p className="mt-1 text-[11px] text-emerald-800">on web</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] text-stone-500">Inventory cost</p>
          <p className="mt-2 text-[24px] font-black tracking-[-.04em] tabular-nums">{formatPeso(webInventorySummary.inventoryCost)}</p>
        </div>
      </div>
      <div
        data-mobile-inventory-outcome="planned"
        className="mt-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-[11px] font-semibold text-emerald-900"
      >
        <span className="font-black">Planned:</span> web changes appear in mobile inventory.
      </div>
    </>
  );
}

function BrowserWorkspace() {
  return (
    <div data-browser-workspace="true" className="overflow-hidden rounded-[28px] border-[9px] border-[#111] bg-white shadow-[0_45px_110px_rgba(20,33,61,.27)]">
      <BrowserChrome />
      <div className="flex h-[765px]">
        <Sidebar />
        <section aria-labelledby="web-inventory-workspace-title" className="min-w-0 flex-1 bg-[#f7f6f2] p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-emerald-700">Growth workspace</p>
              <h2 id="web-inventory-workspace-title" className="mt-1.5 text-[28px] font-black tracking-[-.045em] text-stone-950">Inventory</h2>
              <p className="mt-1 text-[12px] text-stone-500">Manage your SoleSheet inventory from your browser.</p>
            </div>
            <span className="rounded-full bg-emerald-800 px-3 py-2 text-[10px] font-black text-white">Growth plan · Planned</span>
          </div>
          <div className="mt-5"><InventoryTable /></div>
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
        <p className="text-[14px] font-black uppercase tracking-[.24em] text-emerald-700">Growth · Web Inventory</p>
        <h1 className={`${mobile ? "mt-4 text-[60px] leading-[.92]" : "mt-6 text-[66px] leading-[.93]"} font-black tracking-[-.07em] text-stone-950`}>Your stockroom.<br />One clear table.</h1>
        <p className={`${mobile ? "mt-5 max-w-[650px] text-[19px] leading-[1.38]" : "mt-7 max-w-[450px] text-[21px] leading-[1.45]"} text-stone-600`}>Manage the same SoleSheet inventory from your browser. Planned for Growth.</p>
      </div>
      <div className={`absolute z-10 ${mobile ? "left-[46px] top-[410px] w-[920px] origin-top-left [transform:scale(.76)]" : "right-[20px] top-[170px] w-[930px] [transform:rotateZ(-1.2deg)]"}`}>
        <BrowserWorkspace />
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
