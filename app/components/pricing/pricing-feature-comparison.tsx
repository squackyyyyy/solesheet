import { Fragment } from "react";
import { ActivePairsText } from "@/app/components/active-pairs-link";
import { planComparisonRows } from "@/app/lib/site-content";

type ComparisonCell = (typeof planComparisonRows)[number]["free"];

function FeatureState({ cell }: { cell: ComparisonCell }) {
  if (cell.state === "limit") {
    return <span className="font-semibold tabular-nums text-[var(--brand-ink)]">{cell.value} <span className="sr-only">active pairs</span></span>;
  }

  if (cell.state === "included") {
    return <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--brand-action)]"><span aria-hidden="true">✓</span><span className="sr-only">Included</span></span>;
  }

  return <span className="text-black/45"><span aria-hidden="true">—</span><span className="sr-only">Not included</span></span>;
}

function ComparisonTable() {
  return (
    <table data-pricing-comparison-table="true" className="w-full min-w-[38rem] border-separate border-spacing-0 text-left text-sm">
      <caption className="sr-only">Compare every SoleSheet plan feature</caption>
      <thead>
        <tr className="text-xs font-bold uppercase tracking-[0.12em] text-black/55">
          <th scope="col" className="sticky left-0 z-20 w-[34%] border-b border-black/12 bg-white px-4 py-4 sm:w-[40%]">Feature</th>
          <th scope="col" className="border-b border-black/12 px-4 py-4 text-center">Free</th>
          <th scope="col" className="border-b border-black/12 bg-[var(--brand-mist)] px-4 py-4 text-center text-[var(--brand-action)]">Starter</th>
          <th scope="col" className="border-b border-black/12 px-4 py-4 text-center">Growth</th>
        </tr>
      </thead>
      <tbody>
        {planComparisonRows.map((row, index) => {
          const showCategory = row.category !== planComparisonRows[index - 1]?.category;

          return (
            <Fragment key={row.feature}>
              {showCategory ? (
                <tr>
                  <th colSpan={4} scope="colgroup" className="border-b border-black/10 bg-[#f7faf5] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black/55">{row.category}</th>
                </tr>
              ) : null}
              <tr>
                <th scope="row" className="sticky left-0 z-10 border-b border-black/10 bg-white px-4 py-3.5 font-semibold text-[var(--brand-ink)]"><ActivePairsText text={row.feature} /></th>
                <td className="border-b border-black/10 px-4 py-3.5 text-center"><FeatureState cell={row.free} /></td>
                <td className="border-b border-black/10 bg-[var(--brand-mist)] px-4 py-3.5 text-center"><FeatureState cell={row.starter} /></td>
                <td className="border-b border-black/10 px-4 py-3.5 text-center"><FeatureState cell={row.growth} /></td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

function ComparisonIntro() {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--brand-ink)]">Compare every feature.</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-black/65">Starter includes the Free core. Growth includes Starter and Free benefits, then adds scale benefits.</p>
    </>
  );
}

export function PricingFeatureComparison() {
  return (
    <section aria-label="Plan feature comparison" className="mt-8">
      <div className="hidden rounded-[2rem] border border-[#14213d]/10 bg-white p-6 sm:block sm:p-8">
        <div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-action)]">Plan comparison</p>
            <div className="mt-2"><ComparisonIntro /></div>
          </div>
        </div>
        <div className="mt-7 overflow-x-auto"><ComparisonTable /></div>
      </div>

      <details className="rounded-[1.5rem] border border-[#14213d]/10 bg-white p-5 sm:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-4">
          Compare every feature
          <span aria-hidden="true" className="text-xl font-normal">＋</span>
        </summary>
        <div className="pt-5">
          <ComparisonIntro />
          <p className="mt-4 text-xs font-medium text-black/55">Swipe to compare plans →</p>
          <div role="region" aria-label="Feature comparison table. Swipe horizontally to compare plans." tabIndex={0} className="mt-3 overflow-x-auto rounded-xl border border-black/10 outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-green)] focus-visible:ring-offset-2">
            <ComparisonTable />
          </div>
        </div>
      </details>
    </section>
  );
}
