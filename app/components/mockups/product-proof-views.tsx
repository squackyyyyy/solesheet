import { formatPeso, type PaymentStatus, type ShoeRecord } from "@/app/lib/mock-data";

export function PreviewDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 font-bold uppercase tracking-[0.16em] text-emerald-800 ${compact ? "px-2.5 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]"}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-600" />
      Illustrative product preview
    </span>
  );
}

export function ProofMetric({
  label,
  value,
  previousValue,
  delta,
  changed = false,
  dark = false,
}: {
  label: string;
  value: string;
  previousValue?: string;
  delta?: string;
  changed?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative min-w-0 overflow-hidden rounded-2xl border p-4 transition duration-300 ${
        dark
          ? "border-stone-800 bg-stone-950 text-white"
          : changed
            ? "proof-changed border-[#bfd85b] bg-[#efffb8] text-stone-950"
            : "border-stone-200 bg-white text-stone-950"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`text-[11px] font-semibold ${dark ? "text-stone-400" : changed ? "text-stone-700" : "text-stone-500"}`}>
          {label}
        </p>
        {changed && delta ? (
          <span className="rounded-full bg-stone-950 px-2 py-1 text-[9px] font-bold text-white">
            {delta}
          </span>
        ) : null}
      </div>
      {previousValue ? (
        <p className={`mt-3 text-xs line-through ${dark ? "text-stone-500" : changed ? "text-stone-700" : "text-stone-500"}`}>
          {previousValue}
        </p>
      ) : null}
      <p className={`${previousValue ? "mt-0.5" : "mt-3"} text-xl font-bold tracking-[-0.05em] tabular-nums sm:text-3xl xl:text-[2.35rem]`}>
        {value}
      </p>
    </div>
  );
}

export function ProofInventoryRow({
  pair,
  isNew = false,
}: {
  pair: ShoeRecord;
  isNew?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border p-4 transition duration-300 ${
        isNew
          ? "proof-changed border-[#bfd85b] bg-[#efffb8] shadow-[0_14px_35px_rgba(105,130,26,.14)]"
          : "border-stone-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-stone-950">
            {pair.brand} {pair.model}
          </p>
          <p className="mt-1 text-xs text-stone-600">
            {pair.size} · {pair.colorway}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
          {isNew ? "Just added" : pair.status}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-stone-950/8 pt-3 text-xs">
        <span className="text-stone-600">Cost {formatPeso(pair.cost)}</span>
        <span className="font-bold text-stone-950">
          Target {pair.target == null ? "Not set" : formatPeso(pair.target)}
        </span>
      </div>
    </article>
  );
}

export function PaymentProgress({
  collected,
  total,
  status,
}: {
  collected: number;
  total: number;
  status: PaymentStatus;
}) {
  const progress = Math.min((collected / total) * 100, 100);
  return (
    <div className="rounded-2xl bg-stone-950 p-5 text-white">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-stone-400">Payment progress</p>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${status === "Paid" ? "bg-emerald-200 text-emerald-950" : "bg-amber-200 text-amber-950"}`}>
          {status}
        </span>
      </div>
      <div
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"
        role="progressbar"
        aria-label="Installment payment progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={collected}
      >
        <div
          className="h-full rounded-full bg-[#e8ff9f] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 flex justify-between gap-3 text-xs tabular-nums text-stone-300">
        <span>{formatPeso(collected)} collected</span>
        <span>{formatPeso(total)} total</span>
      </div>
    </div>
  );
}
