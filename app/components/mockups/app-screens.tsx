import {
  dashboard,
  formatPeso,
  installmentSale,
  shoes,
} from "@/app/lib/mock-data";

export type MockupId =
  | "dashboard"
  | "inventory"
  | "add"
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
      "Dashboard showing 84 active pairs, ₱318,400 inventory cost, ₱31,240 monthly profit, and a ₱42,600 unpaid balance.",
  },
  {
    id: "inventory",
    shortLabel: "Stock",
    label: "Inventory list",
    description:
      "Searchable inventory list with available, reserved, and sold shoe records using Philippine peso prices and common US sizes.",
  },
  {
    id: "add",
    shortLabel: "Add pair",
    label: "Add shoe flow",
    description:
      "Focused add-shoe form with brand, model, size, colorway, cost, target price, and inventory status fields.",
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
      "Payment tracker showing ₱4,000 collected, ₱2,500 remaining, payment history, and a partially paid state.",
  },
  {
    id: "upgrade",
    shortLabel: "Backup",
    label: "Upgrade and backup",
    description:
      "Upgrade screen comparing local-only free storage with the planned Starter cloud-backup plan at ₱99 per month.",
  },
];

function AppIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-8 place-items-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">
      {children}
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
      <AppIcon>ST</AppIcon>
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "stock" | "sales" | "more" }) {
  return (
    <div className="mt-auto grid grid-cols-4 gap-1 border-t border-stone-200 pt-3 text-center text-[8px] font-semibold text-stone-600">
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
      <BottomNav active="home" />
    </>
  );
}

export function InventoryScreen() {
  return (
    <>
      <ScreenHeader eyebrow="84 active pairs" title="Inventory" />
      <div className="mt-4 flex h-9 items-center rounded-xl border border-stone-200 bg-white px-3 text-[9px] text-stone-600">
        ⌕&nbsp;&nbsp;Search model, size, colorway
      </div>
      <div className="mt-3 flex gap-1.5 text-[8px] font-semibold">
        <span className="rounded-full bg-stone-950 px-2.5 py-1.5 text-white">All 84</span>
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
              <span className="font-bold">Target {formatPeso(shoe.target)}</span>
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
      <ScreenHeader eyebrow="Installment sale" title="Payment progress" />
      <div className="mt-4 rounded-2xl bg-stone-950 p-4 text-white">
        <div className="flex items-center justify-between">
          <p className="text-[8px] text-stone-300">Remaining balance</p>
          <StatusPill status="Partially paid" />
        </div>
        <p className="mt-2 text-[25px] font-bold">{formatPeso(installmentSale.remaining)}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[61.5%] rounded-full bg-[#e8ff9f]" />
        </div>
        <div className="mt-2 flex justify-between text-[8px] text-stone-300">
          <span>{formatPeso(installmentSale.collected)} collected</span>
          <span>{formatPeso(installmentSale.salePrice)} total</span>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-stone-200 bg-white p-3">
        <p className="text-[10px] font-bold">{installmentSale.buyer}</p>
        <p className="mt-0.5 text-[8px] text-stone-600">{installmentSale.shoe}</p>
        <p className="mt-2 text-[8px] font-semibold text-amber-700">Next due · {installmentSale.dueDate}</p>
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-bold">Payment history</p>
        <div className="mt-2 grid gap-2">
          {[
            ["Down payment", installmentSale.downPayment, "Jul 12"],
            ["Payment #2", installmentSale.secondPayment, "Jul 28"],
          ].map(([label, amount, date]) => (
            <div key={String(label)} className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 ring-1 ring-stone-200">
              <div>
                <p className="text-[9px] font-bold">{label}</p>
                <p className="text-[8px] text-stone-600">{date}</p>
              </div>
              <p className="text-[10px] font-bold text-emerald-700">+{formatPeso(Number(amount))}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto grid h-10 place-items-center rounded-xl bg-emerald-700 text-[10px] font-bold text-white">＋ Add payment</div>
      <BottomNav active="sales" />
    </>
  );
}

export function UpgradeScreen() {
  return (
    <>
      <ScreenHeader eyebrow="Protect your records" title="Backup & sync" />
      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
        <p className="text-[9px] font-bold text-amber-900">Your free plan is local-only</p>
        <p className="mt-1 text-[8px] leading-4 text-amber-800">Export anytime. Upgrade later if you want automatic cloud backup.</p>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-emerald-700 bg-white p-4 shadow-[0_10px_30px_rgba(4,120,87,.12)]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold">Starter</p>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[8px] font-bold text-emerald-800">Planned</span>
        </div>
        <p className="mt-2 text-[24px] font-bold">₱99<span className="text-[9px] font-medium text-stone-600"> / month</span></p>
        <div className="mt-3 grid gap-2 text-[9px] text-stone-600">
          <p>✓ Up to 150 active pairs</p>
          <p>✓ Automatic cloud backup</p>
          <p>✓ Search, filters, and CSV export</p>
          <p>✓ Full installment tracking</p>
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-[#e8ff9f] p-3.5">
        <p className="text-[9px] font-bold">Founding seller rate</p>
        <p className="mt-1 text-[15px] font-bold">₱65 / month</p>
        <p className="mt-1 text-[8px] leading-4 text-stone-600">Planned for the first 50–100 paying users while active.</p>
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
    case "add":
      return <AddShoeScreen />;
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
