import {
  dashboard,
  formatPeso,
  installmentSale,
  recordedInstallmentPayment,
  shoes,
} from "@/app/lib/mock-data";
import { foundingOffer, starterPlan } from "@/app/lib/site-content";
import { BrandShoeMark } from "@/app/components/brand/brand-logo";

export type MockupId =
  | "dashboard"
  | "quick-log"
  | "inventory"
  | "sold"
  | "installment"
  | "payments"
  | "upgrade";

export const mockupMeta: Array<{
  id: MockupId;
  shortLabel: string;
  label: string;
  description: string;
}> = [
  {
    id: "dashboard",
    shortLabel: "Overview",
    label: "Inventory dashboard",
    description:
      "Product preview of the basic Home dashboard showing 12 active pairs, ₱53,200 inventory cost, ₱8,950 monthly profit, a Stock mix of 9 available and 3 reserved pairs, a ₱2,500 unpaid balance, and the floating Quick Log shortcut.",
  },
  {
    id: "quick-log",
    shortLabel: "Quick Log",
    label: "Quick Log — fastest path",
    description:
      "An extensive illustrative sequence showing the Home Quick Log shortcut, its Add a pair, Mark a pair sold, and Record a payment choices, the four essential add-pair fields, and the connected stockroom result: New Balance 530 available, active pairs changing from 12 to 13, inventory capital changing from ₱53,200 to ₱57,400, and ₱1,400 potential margin shown separately.",
  },
  {
    id: "inventory",
    shortLabel: "Stock",
    label: "Inventory list",
    description:
      "Searchable inventory list with available, reserved, and sold shoe records using Philippine peso prices and common US sizes.",
  },
  {
    id: "sold",
    shortLabel: "Sell",
    label: "Mark as sold",
    description:
      "Mark-as-sold screen for a Nike Dunk Low with sale price, buyer nickname, and fully paid or installment options.",
  },
  {
    id: "installment",
    shortLabel: "Terms",
    label: "Installment setup",
    description:
      "Installment setup separating the ₱6,500 sale price, ₱2,500 down payment, ₱4,000 starting balance, and first due date.",
  },
  {
    id: "payments",
    shortLabel: "Payments",
    label: "Payment tracking",
    description:
      "Recorded-payment view showing a ₱1,500 payment, collected changing from ₱4,000 to ₱5,500, remaining changing from ₱2,500 to ₱1,000, 85% progress, payment history, and a Partially paid state.",
  },
  {
    id: "upgrade",
    shortLabel: "Backup",
    label: "Upgrade and backup",
    description:
      "Upgrade screen comparing local-only free storage with the planned Starter cloud-backup plan at ₱99 per month.",
  },
];

function AppIcon() {
  return (
    <span className="grid h-8 w-11 place-items-center">
      <BrandShoeMark className="h-8 w-11" />
    </span>
  );
}

function ScreenHeader({ title, eyebrow }: { title: string; eyebrow: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-stone-600">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-[17px] font-bold tracking-tight text-stone-950">
          {title}
        </h3>
      </div>
      <AppIcon />
    </div>
  );
}

function BottomNav({
  active,
  showQuickLog = false,
}: {
  active: "home" | "stock" | "sales" | "more";
  showQuickLog?: boolean;
}) {
  return (
    <div className="relative mt-auto">
      {showQuickLog ? (
        <div className="absolute bottom-11 right-0 flex items-center gap-2">
          <span className="rounded-full border border-stone-200 bg-white/95 px-2.5 py-1.5 text-[8px] font-bold text-stone-800 shadow-sm">
            Quick log
          </span>
          <span className="grid size-12 place-items-center rounded-full bg-emerald-700 text-[24px] font-medium leading-none text-white shadow-[0_9px_24px_rgba(4,120,87,.34)]">
            +
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-4 gap-1 border-t border-stone-200 pt-3 text-center text-[8px] font-semibold text-stone-600">
        {[
          ["home", "⌂", "Home"],
          ["stock", "▦", "Stock"],
          ["sales", "↗", "Sales"],
          ["more", "•••", "More"],
        ].map(([id, icon, label]) => (
          <div key={id} className={id === active ? "text-emerald-700" : ""}>
            <span className="block text-sm leading-4">{icon}</span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "Available" | "Reserved" | "Sold" | "Partially paid" }) {
  const className =
    status === "Available"
      ? "bg-emerald-100 text-emerald-800"
      : status === "Reserved" || status === "Partially paid"
        ? "bg-amber-100 text-amber-800"
        : "bg-stone-200 text-stone-600";

  return (
    <span className={`rounded-full px-2 py-1 text-[8px] font-bold ${className}`}>
      {status}
    </span>
  );
}

function FieldPreview({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-[8px] font-semibold text-stone-700">{label}</p>
      <div className="flex h-9 items-center rounded-xl border border-stone-200 bg-white px-3 text-[10px] font-medium text-stone-800">
        {value}
      </div>
    </div>
  );
}

function DashboardStockMix() {
  const availablePercent =
    (dashboard.stockMix.available / dashboard.activePairs) * 100;
  const reservedPercent =
    (dashboard.stockMix.reserved / dashboard.activePairs) * 100;

  return (
    <div className="mt-2 rounded-2xl border border-stone-200 bg-white p-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[8px] font-bold text-stone-800">Stock mix</p>
        <div className="flex gap-2 text-[7px] font-semibold">
          <span className="text-emerald-700">{dashboard.stockMix.available} available</span>
          <span className="text-amber-700">{dashboard.stockMix.reserved} reserved</span>
        </div>
      </div>
      <div
        aria-hidden="true"
        data-stock-mix-bar="true"
        className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-stone-100"
      >
        <span
          data-stock-mix-segment="available"
          className="h-full bg-emerald-600"
          style={{ width: `${availablePercent}%` }}
        />
        <span
          data-stock-mix-segment="reserved"
          className="h-full bg-amber-300"
          style={{ width: `${reservedPercent}%` }}
        />
      </div>
    </div>
  );
}

export function DeviceFrame({
  label,
  description,
  children,
  className = "",
}: {
  label: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}. ${description}`}
      className={`device-frame relative mx-auto w-full max-w-[330px] rounded-[2.7rem] border-[7px] border-[#171717] bg-[#171717] p-1 shadow-[0_35px_90px_rgba(17,17,17,.24)] ${className}`}
    >
      <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#171717]" />
      <div
        aria-hidden="true"
        className="flex aspect-[9/18.5] min-h-0 flex-col overflow-hidden rounded-[2.15rem] bg-[#f7f6f2] px-4 pb-3 pt-9 font-sans text-stone-950"
      >
        {children}
      </div>
    </div>
  );
}

export function DashboardScreen() {
  return (
    <>
      <ScreenHeader eyebrow="Good morning, Jules" title="Your stockroom" />
      <div className="mt-4 rounded-2xl bg-emerald-800 p-3.5 text-white">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-200">
            Active inventory
          </p>
          <span className="rounded-full bg-white/12 px-2 py-1 text-[8px]">Live</span>
        </div>
        <p className="mt-2 text-[25px] font-bold tracking-tight">{dashboard.activePairs}</p>
        <p className="text-[9px] text-emerald-100">pairs ready to manage</p>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-3">
          <p className="text-[8px] text-stone-600">Inventory cost</p>
          <p className="mt-1 text-[12px] font-bold">{formatPeso(dashboard.inventoryCost)}</p>
        </div>
        <div className="rounded-2xl bg-[#e8ff9f] p-3">
          <p className="text-[8px] text-stone-600">Monthly profit</p>
          <p className="mt-1 text-[12px] font-bold">{formatPeso(dashboard.monthlyProfit)}</p>
        </div>
      </div>
      <DashboardStockMix />
      <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] text-amber-700">Unpaid installments</p>
            <p className="mt-1 text-[14px] font-bold">{formatPeso(dashboard.unpaidBalance)}</p>
          </div>
          <span className="text-lg text-amber-600">→</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10px] font-bold">Recently updated</p>
        <p className="text-[8px] text-emerald-700">View all</p>
      </div>
      <div className="mt-2 rounded-2xl bg-white p-3 ring-1 ring-stone-200">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold">Nike Dunk Low</p>
            <p className="mt-0.5 text-[8px] text-stone-600">US 8.5 · Cacao Wow</p>
          </div>
          <StatusPill status="Reserved" />
        </div>
      </div>
      <BottomNav active="home" showQuickLog />
    </>
  );
}

export function InventoryScreen() {
  return (
    <>
      <ScreenHeader eyebrow="12 active pairs" title="Inventory" />
      <div className="mt-4 flex h-9 items-center rounded-xl border border-stone-200 bg-white px-3 text-[9px] text-stone-600">
        ⌕&nbsp;&nbsp;Search model, size, colorway
      </div>
      <div className="mt-3 flex gap-1.5 text-[8px] font-semibold">
        <span className="rounded-full bg-stone-950 px-2.5 py-1.5 text-white">All 12</span>
        <span className="rounded-full bg-white px-2.5 py-1.5 ring-1 ring-stone-200">Available</span>
        <span className="rounded-full bg-white px-2.5 py-1.5 ring-1 ring-stone-200">Reserved</span>
      </div>
      <div className="mt-3 grid gap-2">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="rounded-2xl border border-stone-200 bg-white p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold">{shoe.brand} {shoe.model}</p>
                <p className="mt-0.5 text-[8px] text-stone-600">{shoe.size} · {shoe.colorway}</p>
              </div>
              <StatusPill status={shoe.status} />
            </div>
            <div className="mt-2 flex justify-between border-t border-stone-100 pt-2 text-[8px]">
              <span className="text-stone-600">Cost {formatPeso(shoe.cost)}</span>
              <span className="font-bold">Target {shoe.target == null ? "Not set" : formatPeso(shoe.target)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">＋ Add a pair</div>
      <BottomNav active="stock" />
    </>
  );
}

export function AddShoeScreen() {
  return (
    <>
      <ScreenHeader eyebrow="New inventory" title="Add a pair" />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <FieldPreview label="Brand" value="Nike" />
        <FieldPreview label="Size" value="US 8.5" />
      </div>
      <div className="mt-2 grid gap-2">
        <FieldPreview label="Model" value="Dunk Low" />
        <FieldPreview label="Colorway" value="Cacao Wow" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <FieldPreview label="Cost price" value="₱4,800" />
        <FieldPreview label="Target price" value="₱6,200" />
      </div>
      <div className="mt-3">
        <p className="mb-1.5 text-[8px] font-semibold text-stone-700">Starting status</p>
        <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-bold">
          <div className="rounded-xl border border-emerald-600 bg-emerald-50 py-2.5 text-emerald-800">Available</div>
          <div className="rounded-xl border border-stone-200 bg-white py-2.5 text-stone-700">Reserved</div>
        </div>
      </div>
      <div className="mt-auto rounded-2xl bg-stone-100 p-3 text-[8px] leading-4 text-stone-700">
        Add only the details you use. You can edit this pair anytime.
      </div>
      <div className="mt-3 grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">Save pair</div>
    </>
  );
}

export function SoldScreen() {
  return (
    <>
      <ScreenHeader eyebrow="Update status" title="Mark as sold" />
      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-3.5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold">Nike Dunk Low</p>
            <p className="mt-0.5 text-[8px] text-stone-600">US 8.5 · Cacao Wow</p>
          </div>
          <span className="text-[9px] font-bold text-stone-700">₱4,800 cost</span>
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        <FieldPreview label="Actual selling price" value="₱6,500" />
        <FieldPreview label="Buyer name or nickname" value="Mika R." />
      </div>
      <div className="mt-3">
        <p className="mb-1.5 text-[8px] font-semibold text-stone-700">Payment setup</p>
        <div className="grid gap-2">
          <div className="rounded-xl border border-stone-200 bg-white p-3">
            <p className="text-[9px] font-bold">Fully paid</p>
            <p className="mt-0.5 text-[8px] text-stone-600">Record sale and close the balance</p>
          </div>
          <div className="rounded-xl border border-emerald-600 bg-emerald-50 p-3">
            <p className="text-[9px] font-bold text-emerald-900">Installment</p>
            <p className="mt-0.5 text-[8px] text-emerald-700">Track down payment and remaining balance</p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between rounded-xl bg-[#e8ff9f] px-3 py-2.5">
        <span className="text-[8px] text-stone-600">Expected profit</span>
        <span className="text-[13px] font-bold">₱1,700</span>
      </div>
      <div className="mt-3 grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">Continue</div>
    </>
  );
}

export function InstallmentScreen() {
  return (
    <>
      <ScreenHeader eyebrow="Sale terms" title="Set up installment" />
      <div className="mt-4 rounded-2xl bg-emerald-800 p-3.5 text-white">
        <p className="text-[8px] text-emerald-200">{installmentSale.shoe}</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[23px] font-bold">{formatPeso(installmentSale.salePrice)}</p>
          <p className="text-[8px]">Buyer · {installmentSale.buyer}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <FieldPreview label="Down payment" value={formatPeso(installmentSale.downPayment)} />
        <FieldPreview label="Starting balance" value={formatPeso(installmentSale.salePrice - installmentSale.downPayment)} />
      </div>
      <div className="mt-2 grid gap-2">
        <FieldPreview label="First due date" value="August 18, 2026" />
        <FieldPreview label="Payment note" value="GCash or cash meetup" />
      </div>
      <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3">
        <p className="text-[8px] font-bold text-amber-800">Separate states, clearer numbers</p>
        <div className="mt-2 flex items-center justify-between text-[8px] text-amber-700">
          <span>Inventory: Sold</span>
          <span>Payment: Partially paid</span>
        </div>
      </div>
      <p className="mt-auto text-center text-[8px] leading-4 text-stone-600">Tracking only — no interest, fees, or payment processing.</p>
      <div className="mt-3 grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">Confirm sale</div>
    </>
  );
}

export function PaymentsScreen() {
  return (
    <>
      <ScreenHeader eyebrow="Installments" title="Record payment" />
      <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold">{installmentSale.shoe}</p>
            <p className="mt-0.5 text-[8px] text-stone-600">US 8.5 · Buyer {installmentSale.buyer}</p>
          </div>
          <span className="text-[9px] font-bold">{formatPeso(installmentSale.salePrice)}</span>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-emerald-900 p-3.5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[8px] text-emerald-200">Payment received</p>
            <p className="mt-1 text-[23px] font-bold">{formatPeso(recordedInstallmentPayment.amount)}</p>
          </div>
          <StatusPill status="Partially paid" />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-3">
          <p className="text-[8px] text-stone-600">Collected</p>
          <p className="mt-1 text-[8px] text-stone-600 line-through">{formatPeso(recordedInstallmentPayment.collectedBefore)}</p>
          <p className="text-[15px] font-bold text-emerald-700">{formatPeso(recordedInstallmentPayment.collectedAfter)}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-3">
          <p className="text-[8px] text-stone-600">Remaining</p>
          <p className="mt-1 text-[8px] text-stone-600 line-through">{formatPeso(recordedInstallmentPayment.remainingBefore)}</p>
          <p className="text-[15px] font-bold">{formatPeso(recordedInstallmentPayment.remainingAfter)}</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-[8px] font-bold">
          <span>Payment progress</span>
          <span>{recordedInstallmentPayment.progress}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-stone-200">
          <div className="h-full rounded-full bg-emerald-600" style={{ width: `${recordedInstallmentPayment.progress}%` }} />
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold">Payment history</p>
          <span className="text-[8px] text-stone-600">2 entries</span>
        </div>
        <div className="mt-1 grid">
          {[
            ["Down payment", installmentSale.downPayment, "Aug 11"],
            ["Payment", recordedInstallmentPayment.amount, "Today"],
          ].map(([label, amount, date]) => (
            <div key={String(label)} className="flex items-center justify-between border-t border-stone-100 py-2">
              <div>
                <p className="text-[9px] font-bold">{label}</p>
                <p className="text-[8px] text-stone-600">{date}</p>
              </div>
              <p className="text-[10px] font-bold text-emerald-700">+{formatPeso(Number(amount))}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">Payment recorded ✓</div>
    </>
  );
}

export function UpgradeScreen() {
  return (
    <>
      <ScreenHeader eyebrow="Protect your records" title="Backup & sync" />
      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
        <p className="text-[9px] font-bold text-amber-900">Your free plan is local-only</p>
        <p className="mt-1 text-[8px] leading-4 text-amber-800">Search, filter, and export anytime. Upgrade later if you want automatic cloud backup.</p>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-emerald-700 bg-white p-4 shadow-[0_10px_30px_rgba(4,120,87,.12)]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold">{starterPlan.name}</p>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[8px] font-bold text-emerald-800">Planned</span>
        </div>
        <p className="mt-2 text-[24px] font-bold">{starterPlan.price}<span className="text-[9px] font-medium text-stone-600"> {starterPlan.suffix}</span></p>
        <div className="mt-3 grid gap-2 text-[9px] text-stone-600">
          {starterPlan.features.map((feature) => <p key={feature}>✓ {feature}</p>)}
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-[#e8ff9f] p-3.5">
        <p className="text-[9px] font-bold">Founding seller rate</p>
        <p className="mt-1 text-[15px] font-bold">{foundingOffer.price}</p>
        <p className="mt-1 text-[8px] leading-4 text-stone-600">{foundingOffer.mockupEligibility}</p>
        <p className="text-[8px] leading-4 text-stone-600">{foundingOffer.mockupScope}</p>
      </div>
      <div className="mt-auto grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">Join early access</div>
      <p className="mt-2 text-center text-[8px] text-stone-600">No charge today · pricing is being validated</p>
    </>
  );
}

export function ScreenForId({ id }: { id: MockupId }) {
  switch (id) {
    case "inventory":
      return <InventoryScreen />;
    case "sold":
      return <SoldScreen />;
    case "installment":
      return <InstallmentScreen />;
    case "payments":
      return <PaymentsScreen />;
    case "upgrade":
      return <UpgradeScreen />;
    default:
      return <DashboardScreen />;
  }
}
