import type { ReactNode } from "react";
import Image from "next/image";
import type { FlowMockupCapture, FlowMockupId } from "@/app/lib/flow-mockup-assets";
import { formatPeso, installmentSale, quickLogExample, recordedInstallmentPayment, stockroomShoes } from "@/app/lib/mock-data";
import { starterPlan } from "@/app/lib/site-content";

const saleShoe = stockroomShoes[0];

function Logo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <Image
      src={`/svg/solesheet-horizontal-on-${inverse ? "dark" : "light"}.svg`}
      alt=""
      aria-hidden="true"
      width={1200}
      height={320}
      className={`h-auto ${compact ? "w-[210px]" : "w-[250px]"}`}
    />
  );
}

function ProductPreview({ inverse = false }: { inverse?: boolean }) {
  return <span className={`rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] ${inverse ? "border-white/20 bg-white/10 text-white/75" : "border-stone-950/15 bg-white/65 text-stone-700"}`}>Product preview</span>;
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-5 text-[15px] font-bold text-stone-950">
      <span>9:41</span>
      <div className="flex items-center gap-2 text-[13px]"><span className="tracking-[-0.25em]">▮▮▮</span><span>⌁</span><span className="h-[11px] w-[22px] rounded-[3px] border-2 border-stone-950 p-[1px]"><span className="block h-full w-[13px] bg-stone-950" /></span></div>
    </div>
  );
}

function Phone({ children, mobile }: { children: ReactNode; mobile: boolean }) {
  return (
    <div data-phone-shell={mobile ? "mobile" : "desktop"} className={`relative rounded-[76px] border-[15px] border-[#111211] bg-[#111211] p-[6px] shadow-[0_80px_150px_rgba(0,0,0,.42),0_20px_40px_rgba(0,0,0,.25)] ${mobile ? "h-[1050px] w-[560px]" : "h-[1020px] w-[500px]"}`}>
      <div className="absolute left-1/2 top-[16px] z-30 h-[35px] w-[132px] -translate-x-1/2 rounded-full bg-[#111211]" />
      <div className="relative h-full overflow-hidden rounded-[55px] bg-[#f7f6f2] text-stone-950">
        <StatusBar />
        {children}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-[linear-gradient(105deg,transparent_5%,rgba(255,255,255,.13)_42%,rgba(255,255,255,.02)_72%)]" />
        <div className="absolute bottom-[12px] left-1/2 h-[5px] w-[145px] -translate-x-1/2 rounded-full bg-stone-950/90" />
      </div>
    </div>
  );
}

function ScreenHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-[12px] font-black uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p><h2 className="mt-2 text-[30px] font-black tracking-[-0.045em] text-stone-950">{title}</h2></div>
      <Image src="/svg/solesheet-mark-on-light.svg" alt="" aria-hidden="true" width={520} height={320} className="h-12 w-[68px] object-contain" />
    </div>
  );
}

function SearchField({ value }: { value?: string }) {
  return <div className={`mt-6 flex h-[62px] items-center gap-3 rounded-2xl border-2 bg-white px-5 text-[15px] shadow-[0_8px_24px_rgba(17,17,17,.04)] ${value ? "border-emerald-600 font-bold text-stone-900 ring-4 ring-emerald-600/10" : "border-stone-200 text-stone-500"}`}><span className="text-[22px]">⌕</span>{value ?? "Search model, size, or colorway"}</div>;
}

function SelectedShoe({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${compact ? "mt-4 p-4" : "mt-5 p-5"} rounded-[22px] border border-emerald-200 bg-emerald-50`}>
      <div className="flex items-start justify-between gap-4"><div><p className="text-[16px] font-black text-stone-950">{saleShoe.brand} {saleShoe.model}</p><p className="mt-1 text-[13px] font-medium text-stone-600">{saleShoe.size} · {saleShoe.colorway}</p></div><span className="rounded-full bg-emerald-700 px-3 py-1.5 text-[11px] font-black text-white">Selected</span></div>
      <div className="mt-4 flex items-center justify-between border-t border-emerald-200 pt-3 text-[13px]"><span className="text-stone-500">Cost price</span><span className="font-black text-stone-950">{formatPeso(saleShoe.cost)}</span></div>
    </div>
  );
}

function Field({ label, value, emphasis = false, optional = false }: { label: string; value: string; emphasis?: boolean; optional?: boolean }) {
  return (
    <div><div className="mb-2 flex items-center justify-between"><p className="text-[12px] font-bold text-stone-600">{label}</p>{optional ? <span className="text-[10px] font-bold text-stone-400">Optional</span> : null}</div><div className={`flex h-[58px] items-center rounded-2xl border bg-white px-4 font-bold text-stone-800 ${emphasis ? "border-2 border-emerald-600 text-[21px] font-black shadow-[0_0_0_4px_rgba(5,150,105,.10)]" : "border-stone-200 text-[14px]"}`}>{value}</div></div>
  );
}

function PaymentChoice({ installment = false }: { installment?: boolean }) {
  return <div><p className="mb-2 text-[12px] font-bold text-stone-700">Payment</p><div className="grid grid-cols-2 gap-2 rounded-2xl bg-stone-100 p-1.5 text-[13px] font-black"><div className={`grid h-[46px] place-items-center rounded-xl ${installment ? "text-stone-500" : "bg-stone-950 text-white"}`}>Paid in full</div><div className={`grid h-[46px] place-items-center rounded-xl ${installment ? "bg-stone-950 text-white" : "text-stone-500"}`}>Installment</div></div></div>;
}

function Action({ children }: { children: ReactNode }) {
  return <div className="grid h-[62px] place-items-center rounded-2xl bg-emerald-700 text-[16px] font-black text-white shadow-[0_16px_32px_rgba(4,120,87,.24)]">{children}</div>;
}

function SaleScreen({ mobile = false }: { mobile?: boolean }) {
  return <div className="px-7 pb-10 pt-8"><ScreenHeading eyebrow="Quick Sale" title="Sell a pair" /><SearchField /><SelectedShoe />{mobile ? null : <div className="mt-4 grid grid-cols-2 gap-3"><Field label="Size" value={saleShoe.size} /><Field label="Colorway" value={saleShoe.colorway} /></div>}<div className="mt-4"><Field label="Sale price" value={formatPeso(installmentSale.salePrice)} emphasis /></div><div className="mt-4"><Field label="Sold date" value="Today · Aug 11, 2026" /></div><div className="mt-4"><PaymentChoice /></div><div className="mt-5"><Action>Save sale →</Action></div></div>;
}

function BottomNavigation() {
  return <div className="absolute inset-x-6 bottom-8 grid grid-cols-4 border-t border-stone-200 pt-5 text-center text-[11px] font-bold text-stone-500"><div className="text-emerald-700"><span className="mb-1 block text-[21px]">⌂</span>Home</div><div><span className="mb-1 block text-[19px]">▦</span>Stock</div><div><span className="mb-1 block text-[20px]">↗</span>Sales</div><div><span className="mb-1 block text-[18px]">•••</span>More</div></div>;
}

function DashboardScreen() {
  return (
    <div className="relative h-[918px] px-7 pt-8"><ScreenHeading eyebrow="Good morning, Jules" title="Your stockroom" /><div className="mt-6 rounded-[28px] bg-emerald-800 p-6 text-white"><p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200">Active inventory</p><p className="mt-2 text-[46px] font-black">12</p><p className="text-[13px] text-emerald-100">pairs ready to manage</p></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-[22px] bg-white p-5 ring-1 ring-stone-200"><p className="text-[11px] text-stone-500">Inventory cost</p><p className="mt-2 text-[20px] font-black">₱53,200</p></div><div className="rounded-[22px] bg-[#e8ff9f] p-5"><p className="text-[11px] text-stone-600">Monthly profit</p><p className="mt-2 text-[20px] font-black">₱8,950</p></div></div><div className="absolute bottom-[108px] right-7 z-20 flex items-end gap-3"><div className="mb-2 rounded-full bg-white/95 px-4 py-2 text-[12px] font-black shadow-lg">Quick Log</div><div className="relative grid size-[74px] place-items-center rounded-full bg-emerald-700 text-[39px] text-white shadow-[0_20px_45px_rgba(4,120,87,.38)]"><span className="absolute -inset-3 rounded-full border-2 border-[#e8ff9f]" />+</div></div><div className="absolute bottom-[190px] right-8 z-10 w-[310px] overflow-hidden rounded-[26px] border border-stone-200 bg-white/96 p-2 shadow-[0_26px_70px_rgba(17,17,17,.24)]">{[["↗","Sell a pair","Record a completed sale"],["₱","Record a payment","Update an installment"],["＋","Add a pair","Add new inventory"]].map(([icon,label,detail], index)=><div key={label} className={`flex min-h-[76px] items-center gap-4 px-3 ${index ? "border-t border-stone-100" : ""}`}><span className="grid size-11 place-items-center rounded-2xl bg-emerald-100 text-[18px] font-black text-emerald-800">{icon}</span><div><p className="text-[14px] font-black">{label}</p><p className="mt-1 text-[11px] text-stone-500">{detail}</p></div></div>)}</div><BottomNavigation /></div>
  );
}

function StockSearchScreen() {
  return <div className="px-7 pt-8"><ScreenHeading eyebrow="Stockroom" title="Find a pair" /><SearchField value="530 7 silver" /><div className="mt-4 flex items-center justify-between text-[12px]"><strong>1 exact match</strong><span className="text-stone-500">model · size · colorway</span></div><div className="mt-4 rounded-[25px] border-2 border-emerald-500 bg-white p-5 shadow-[0_18px_45px_rgba(4,120,87,.12)]"><div className="flex justify-between"><div><p className="text-[18px] font-black">{quickLogExample.brand} {quickLogExample.model}</p><p className="mt-1 text-[13px] text-stone-500">{quickLogExample.size} · {quickLogExample.colorway}</p></div><span className="h-fit rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-black text-emerald-800">Available</span></div><div className="mt-5 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4"><div><p className="text-[10px] text-stone-500">Cost</p><p className="mt-1 text-[17px] font-black">{formatPeso(quickLogExample.cost)}</p></div><div><p className="text-[10px] text-stone-500">Target</p><p className="mt-1 text-[17px] font-black">{formatPeso(quickLogExample.target ?? 0)}</p></div></div></div><div className="mt-4 space-y-3 opacity-55"><div className="rounded-[20px] border border-stone-200 bg-white p-4"><strong>New Balance 550</strong><p className="mt-1 text-[11px] text-stone-500">US 7 · Sea Salt · Reserved</p></div><div className="rounded-[20px] border border-stone-200 bg-white p-4"><strong>ASICS GEL-KAYANO 14</strong><p className="mt-1 text-[11px] text-stone-500">US 8 · White / Pure Silver · Available</p></div></div><div className="mt-5 rounded-[20px] bg-[#e8ff9f] p-4 text-[13px] font-bold text-emerald-950">One search checks model, size, and colorway.</div></div>;
}

function AddStockScreen() {
  return <div className="px-7 pt-8"><ScreenHeading eyebrow="Stockroom" title="Add a pair" /><p className="mt-4 text-[13px] leading-5 text-stone-500">Start with the essentials. Add the rest later.</p><div className="mt-5 space-y-4"><Field label="Brand and model" value={`${quickLogExample.brand} ${quickLogExample.model}`} /><div className="grid grid-cols-2 gap-3"><Field label="Size" value={quickLogExample.size} /><Field label="Colorway" value={quickLogExample.colorway} /></div><Field label="Cost price" value={formatPeso(quickLogExample.cost)} emphasis /><Field label="Target price" value={formatPeso(quickLogExample.target ?? 0)} optional /></div><div className="mt-6"><Action>Add pair →</Action></div><p className="mt-4 text-center text-[11px] font-bold text-stone-400">Photos, notes, and supplier can wait.</p></div>;
}

function InstallmentScreen() {
  return <div className="px-7 pt-8"><div className="flex items-center gap-4"><span className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-stone-200">←</span><div><p className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-700">Quick Sale</p><h2 className="mt-1 text-[27px] font-black">Installment terms</h2></div></div><SelectedShoe compact /><div className="mt-4 grid grid-cols-2 gap-3"><Field label="Sale price" value={formatPeso(installmentSale.salePrice)} /><Field label="Sold date" value="Aug 11, 2026" /></div><div className="mt-4"><PaymentChoice installment /></div><div className="mt-5 rounded-[24px] bg-white p-5 ring-1 ring-stone-200"><div className="flex justify-between"><strong className="text-[12px] uppercase tracking-[.16em] text-stone-500">Set the terms</strong><span className="rounded-full bg-[#e8ff9f] px-3 py-1 text-[10px] font-black">Step 2 of 2</span></div><div className="mt-4"><Field label="Down payment" value={formatPeso(installmentSale.downPayment)} emphasis /></div><div className="mt-4 grid grid-cols-2 gap-3"><Field label="Starting balance" value={formatPeso(installmentSale.salePrice - installmentSale.downPayment)} /><Field label="First due date" value={installmentSale.dueDate} /></div></div><div className="mt-5"><Action>Save installment sale →</Action></div></div>;
}

function PaymentsScreen() {
  return <div className="px-7 pt-8"><ScreenHeading eyebrow="Installments" title="Record payment" /><SelectedShoe compact /><div className="mt-4 rounded-[24px] bg-emerald-900 p-5 text-white"><div className="flex items-center justify-between"><div><p className="text-[11px] text-emerald-200">Payment received</p><p className="mt-2 text-[34px] font-black">{formatPeso(recordedInstallmentPayment.amount)}</p></div><span className="rounded-full bg-amber-300 px-3 py-1.5 text-[10px] font-black text-amber-950">Partially paid</span></div></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-[20px] bg-white p-4 ring-1 ring-stone-200"><p className="text-[10px] text-stone-500">Collected</p><p className="mt-2 text-[12px] text-stone-400 line-through">{formatPeso(recordedInstallmentPayment.collectedBefore)}</p><p className="text-[22px] font-black text-emerald-700">{formatPeso(recordedInstallmentPayment.collectedAfter)}</p></div><div className="rounded-[20px] bg-white p-4 ring-1 ring-stone-200"><p className="text-[10px] text-stone-500">Remaining</p><p className="mt-2 text-[12px] text-stone-400 line-through">{formatPeso(recordedInstallmentPayment.remainingBefore)}</p><p className="text-[22px] font-black">{formatPeso(recordedInstallmentPayment.remainingAfter)}</p></div></div><div className="mt-5"><div className="flex justify-between text-[11px] font-bold"><span>Payment progress</span><span>{recordedInstallmentPayment.progress}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-stone-200"><div className="h-full rounded-full bg-emerald-600" style={{ width: `${recordedInstallmentPayment.progress}%` }} /></div></div><div className="mt-5 rounded-[22px] bg-white p-5 ring-1 ring-stone-200"><div className="flex justify-between"><strong>Payment history</strong><span className="text-[11px] text-stone-400">2 entries</span></div><div className="mt-4 flex justify-between border-t border-stone-100 pt-4 text-[13px]"><span>Aug 11 · Down payment</span><strong>{formatPeso(installmentSale.downPayment)}</strong></div><div className="mt-4 flex justify-between border-t border-stone-100 pt-4 text-[13px]"><span>Today · Payment</span><strong className="text-emerald-700">+{formatPeso(recordedInstallmentPayment.amount)}</strong></div></div><div className="mt-5"><Action>Payment recorded ✓</Action></div></div>;
}

function BackupScreen() {
  return <div className="px-7 pt-8"><ScreenHeading eyebrow="Data and backup" title="Keep your records safe" /><div className="mt-6 rounded-[24px] border border-stone-200 bg-white p-5"><div className="flex justify-between"><div><p className="text-[11px] font-black uppercase tracking-[.14em] text-stone-400">Local only</p><h3 className="mt-2 text-[21px] font-black">On this device</h3></div><span className="grid size-11 place-items-center rounded-2xl bg-stone-100 text-[21px]">▣</span></div><p className="mt-3 text-[13px] leading-5 text-stone-500">Your records stay on this phone. No account required.</p><span className="mt-4 inline-block rounded-full bg-stone-100 px-3 py-1.5 text-[10px] font-black">Current preview</span></div><div className="mt-4 rounded-[25px] bg-emerald-900 p-5 text-white shadow-[0_20px_45px_rgba(4,120,87,.22)]"><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-black uppercase tracking-[.14em] text-[#e8ff9f]">Paid plan</p><h3 className="mt-2 text-[22px] font-black">{starterPlan.name}</h3></div><span className="inline-flex shrink-0 items-center rounded-full bg-[#e8ff9f] px-3 py-1.5 text-[10px] font-black leading-none text-emerald-950">Planned</span></div><p className="mt-4 text-[36px] font-black">{starterPlan.price}<span className="text-[14px] font-medium text-white/60"> {starterPlan.suffix}</span></p><div className="mt-4 space-y-3 border-t border-white/10 pt-4 text-[13px]">{starterPlan.features.map((feature) => <p key={feature}>✓ {feature}</p>)}</div></div><div className="mt-5 rounded-[20px] bg-amber-50 p-4 text-[12px] leading-5 text-amber-900 ring-1 ring-amber-200"><strong>Product preview:</strong> Starter features are planned and are not available today.</div></div>;
}

const content: Record<FlowMockupId, { eyebrow: string; headline: ReactNode; mobileHeadline: ReactNode; body: string; dark: boolean; screen: (mobile: boolean) => ReactNode }> = {
  "quick-sale": { eyebrow: "Quick Sale · One tap", headline: <>Sell a pair<br />in seconds.</>, mobileHeadline: <>Sell a pair<br />in seconds.</>, body: "Find the shoe by model, size, or colorway. Everything known is filled in—enter the sale price and save.", dark: true, screen: (mobile) => <SaleScreen mobile={mobile} /> },
  "quick-actions": { eyebrow: "Quick Log · Press and hold", headline: <>One button.<br />Three shortcuts.</>, mobileHeadline: <>Hold for<br />quick actions.</>, body: "Tap starts a sale. Hold the same button for payments or new stock—the menu stays anchored to your thumb.", dark: false, screen: DashboardScreen },
  "search-stock": { eyebrow: "Stock search · All details", headline: <>Find the exact<br />pair, quickly.</>, mobileHeadline: <>Search all stock<br />at once.</>, body: "One compact search checks the model, size, and colorway, then keeps the exact variant and status visible.", dark: true, screen: StockSearchScreen },
  "add-stock": { eyebrow: "Inventory · Essentials first", headline: <>Add stock<br />without the admin.</>, mobileHeadline: <>Add only<br />what matters.</>, body: "Model, size, colorway, and cost are enough to start. Target price is useful, clearly optional, and easy to add.", dark: false, screen: AddStockScreen },
  installments: { eyebrow: "Quick Sale · Only when needed", headline: <>Installment?<br />Continue once.</>, mobileHeadline: <>Set terms<br />only if needed.</>, body: "Paid-in-full sales finish immediately. Choose installment and SoleSheet asks only for the payment terms next.", dark: true, screen: InstallmentScreen },
  payments: { eyebrow: "Installments · Connected totals", headline: <>Record a payment.<br />See balances move.</>, mobileHeadline: <>Every payment<br />updates the total.</>, body: "Add one payment and collected, remaining, progress, history, and status stay aligned automatically.", dark: false, screen: PaymentsScreen },
  backup: { eyebrow: "Data · Honest by design", headline: <>Local today.<br />Starter when ready.</>, mobileHeadline: <>Your records,<br />safer over time.</>, body: "Use SoleSheet locally without an account. Starter adds automatic cloud backup and restore for ₱99 a month.", dark: true, screen: BackupScreen },
};

function Board({ capture }: { capture: FlowMockupCapture }) {
  const item = content[capture.destination.id];
  const mobile = capture.layout === "mobile";
  return (
    <div className={`relative h-full overflow-hidden ${item.dark ? "bg-[radial-gradient(circle_at_76%_22%,#356345_0%,#173522_34%,#0d2116_72%,#09150f_100%)] text-white" : "bg-[radial-gradient(circle_at_18%_18%,#fffdf5_0%,#f2eee4_46%,#dce8d7_100%)] text-stone-950"} ${mobile ? "px-[45px] py-[42px]" : "px-[92px] py-[76px]"}`}>
      <div className={`absolute rounded-full blur-[18px] ${mobile ? "-right-[170px] top-[300px] size-[520px]" : "-left-[190px] bottom-[-310px] size-[710px]"} ${item.dark ? "bg-[#e8ff9f]/10" : "bg-emerald-700/8"}`} />
      <div className="relative z-20 flex items-center justify-between"><Logo inverse={item.dark} compact={mobile} /><ProductPreview inverse={item.dark} /></div>
      <div className={`relative z-20 ${mobile ? "mt-[64px] w-[710px]" : "mt-[126px] w-[650px]"}`}>
        <p className={`${mobile ? "text-[14px]" : "text-[17px]"} font-black uppercase tracking-[0.24em] ${item.dark ? "text-[#e8ff9f]" : "text-emerald-700"}`}>{item.eyebrow}</p>
        <h1 className={`${mobile ? "mt-5 text-[62px] leading-[.91]" : "mt-7 text-[88px] leading-[.9]"} font-black tracking-[-0.075em]`}>{mobile ? item.mobileHeadline : item.headline}</h1>
        {!mobile ? <p className={`mt-8 max-w-[610px] text-[25px] leading-[1.4] ${item.dark ? "text-white/70" : "text-stone-600"}`}>{item.body}</p> : <p className={`mt-5 max-w-[650px] text-[20px] leading-[1.35] ${item.dark ? "text-white/70" : "text-stone-600"}`}>{item.body}</p>}
      </div>
      <div data-phone-placement={mobile ? "mobile-cropped-tilted" : "desktop-tilted"} className={`absolute z-10 [perspective:1600px] ${mobile ? "left-[185px] top-[410px] origin-top-left [transform:rotateZ(3deg)_scale(.74)]" : "bottom-[-105px] right-[140px] [transform:rotateY(-8deg)_rotateZ(4deg)]"}`}><Phone mobile={mobile}>{item.screen(mobile)}</Phone></div>
      {capture.destination.id === "quick-actions" ? <div className={`absolute z-30 flex items-center gap-3 rounded-[20px] border border-emerald-900/10 bg-white/90 px-5 py-4 text-stone-900 shadow-xl ${mobile ? "bottom-[26px] left-[45px]" : "bottom-[80px] left-[92px]"}`}><span className="grid size-10 place-items-center rounded-full bg-emerald-700 text-[23px] text-white">+</span><div><p className="text-[12px] font-black uppercase tracking-[.13em] text-emerald-800">Hold + for more</p><p className="mt-1 text-[12px] text-stone-500">Anchored to the same button.</p></div></div> : null}
    </div>
  );
}

export function FlowMockupComposition({ capture }: { capture: FlowMockupCapture }) {
  return <main data-capture-ready="true" data-asset-id={capture.captureId} className="overflow-hidden font-sans antialiased" style={{ width: capture.sourceWidth, height: capture.sourceHeight }}><Board capture={capture} /></main>;
}
