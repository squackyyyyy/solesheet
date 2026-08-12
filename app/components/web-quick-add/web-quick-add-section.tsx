import {
  publicWebQuickAddPath,
  webQuickAddAsset,
} from "@/app/lib/web-quick-add-assets";
import { webQuickAddContent } from "@/app/lib/site-content";

export function WebQuickAddSection() {
  return (
    <section
      id="web-quick-add"
      aria-labelledby="web-quick-add-title"
      className="border-b border-[#14213d]/10 bg-[var(--brand-soft)]"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_.68fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[var(--brand-action)]">
              <span aria-hidden="true" className="h-px w-7 bg-current" />
              {webQuickAddContent.label}
            </p>
            <h2
              id="web-quick-add-title"
              className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl"
            >
              {webQuickAddContent.heading}
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-7 text-black/65">
              {webQuickAddContent.positioning}
            </p>
            <p className="mt-4 inline-flex rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
              {webQuickAddContent.disclosure}
            </p>
          </div>
        </div>

        <figure
          data-testid="web-quick-add-figure"
          className="mt-10 aspect-[2/3] overflow-hidden rounded-[1.4rem] bg-stone-100 shadow-[0_28px_80px_rgba(20,33,61,.14)] sm:aspect-[4/3] sm:rounded-[2rem]"
        >
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={publicWebQuickAddPath(webQuickAddAsset.mobile.publicFilename)}
              type="image/webp"
              width={webQuickAddAsset.mobile.width}
              height={webQuickAddAsset.mobile.height}
            />
            <img
              src={publicWebQuickAddPath(webQuickAddAsset.desktop.publicFilename)}
              width={webQuickAddAsset.desktop.width}
              height={webQuickAddAsset.desktop.height}
              alt={webQuickAddContent.imageDescription}
              className="block h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </figure>
      </div>
    </section>
  );
}
