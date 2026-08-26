import Image from "next/image";
import {
  DashboardScreen,
  DeviceFrame,
  mockupMeta,
} from "@/app/components/mockups/app-screens";
import { FlowSocialProof } from "@/app/components/flow-mockups/flow-mockup-composition";
import {
  PaymentProgress,
  PreviewDisclosure,
  ProofInventoryRow,
  ProofMetric,
} from "@/app/components/mockups/product-proof-views";
import { WebInventorySocialProof } from "@/app/components/web-quick-add/web-quick-add-composition";
import {
  socialProductContent,
  type SocialAssetDefinition,
} from "@/app/lib/social-assets";
import { formatPeso } from "@/app/lib/mock-data";

const content = socialProductContent;

function BrandBand({ sequence }: { sequence?: number }) {
  return (
    <div className="flex items-center justify-between gap-8">
      <Image src="/svg/solesheet-horizontal-on-light.svg" alt="SoleSheet" width={1200} height={320} className="h-auto w-[245px]" />
      <div className="flex items-center gap-4">
        <PreviewDisclosure />
        {sequence ? (
          <span className="text-[18px] font-bold tabular-nums text-stone-500">
            {String(sequence).padStart(2, "0")}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function StaticField({ label, value, optional = false }: { label: string; value: string; optional?: boolean }) {
  return (
    <div>
      <p className="mb-2 text-[16px] font-bold text-stone-600">
        {label}{optional ? <span className="ml-2 font-medium text-stone-400">Optional</span> : null}
      </p>
      <div className="flex h-[68px] items-center rounded-2xl border-2 border-stone-200 bg-white px-5 text-[20px] font-bold text-stone-950">
        {value}
      </div>
    </div>
  );
}

function QuickForm() {
  return (
    <div className="rounded-[32px] border border-stone-200 bg-[#f7f6f2] p-7 shadow-[0_24px_70px_rgba(17,17,17,.12)]">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-2"><StaticField label="Search stock" value="Nike Dunk 8.5 cacao" /></div>
        <StaticField label="Size · prefilled" value={content.sale.pair.size} />
        <StaticField label="Cost · prefilled" value={formatPeso(content.sale.pair.cost)} />
        <div className="col-span-2"><StaticField label="Selling price" value={formatPeso(content.sale.price)} /></div>
        <StaticField label="Sold date" value={content.sale.soldDate} />
        <StaticField label="Payment" value="Paid in full" />
      </div>
      <div className="mt-6 grid h-[72px] place-items-center rounded-2xl bg-emerald-700 text-[22px] font-black text-white">
        Save sale →
      </div>
    </div>
  );
}

function DashboardPhone({ scale = 0.94 }: { scale?: number }) {
  const dashboardMeta = mockupMeta[0];
  return (
    <div
      className="mx-auto origin-top"
      style={{ width: 330 * scale, height: 680 * scale }}
    >
      <div className="w-[330px] origin-top-left" style={{ transform: `scale(${scale})` }}>
        <DeviceFrame label={dashboardMeta.label} description={dashboardMeta.description}>
          <DashboardScreen />
        </DeviceFrame>
      </div>
    </div>
  );
}

function QuickUpdate() {
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-2 gap-5">
        <ProofMetric label="Inventory status" previousValue="Reserved" value="Sold" delta="Updated" changed />
        <ProofMetric label="Payment status" value="Paid in full" delta={formatPeso(content.sale.price)} changed />
      </div>
      <ProofInventoryRow pair={{ ...content.sale.pair, status: "Sold" }} isNew />
      <div className="rounded-2xl bg-emerald-800 px-6 py-5 text-[18px] font-bold text-white">
        Sale saved. Stock and payment status are already updated.
      </div>
    </div>
  );
}

function PaymentState({ after = false }: { after?: boolean }) {
  const collected = after ? content.installment.afterCollected : content.installment.collected;
  const remaining = after ? content.installment.afterRemaining : content.installment.remaining;
  return (
    <div className="grid gap-5">
      <PaymentProgress collected={collected} total={content.installment.salePrice} status="Partially paid" />
      <div className="grid grid-cols-2 gap-5">
        <ProofMetric label="Collected" value={formatPeso(collected)} changed={after} delta={after ? "+₱1,500" : undefined} />
        <ProofMetric label="Remaining" value={formatPeso(remaining)} changed={after} delta={after ? "−₱1,500" : undefined} />
      </div>
    </div>
  );
}

function SurveyCallToAction() {
  return (
    <div className="relative overflow-hidden rounded-[42px] bg-emerald-950 px-10 py-10 text-white shadow-[0_30px_80px_rgba(6,78,59,.24)]">
      <div className="absolute -right-20 -top-24 size-72 rounded-full bg-[#e8ff9f]/12 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-6">
          <span className="rounded-full bg-[#e8ff9f] px-5 py-2 text-[14px] font-black uppercase tracking-[.14em] text-emerald-950">Quick survey</span>
          <span className="text-[16px] font-bold text-emerald-100">About 2 minutes</span>
        </div>
        <p className="mt-9 max-w-[760px] text-[39px] font-black leading-[1.02] tracking-[-.045em]">What would make stock, sales, and installment tracking easier for you?</p>
        <div className="mt-9 grid grid-cols-3 gap-4">
          {["Stock", "Sales", "Payments"].map((label, index) => (
            <div key={label} className="rounded-[24px] border border-white/10 bg-white/8 px-5 py-6">
              <p className="text-[13px] font-black text-[#e8ff9f]">0{index + 1}</p>
              <p className="mt-3 text-[20px] font-black">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between gap-6 rounded-[26px] bg-white px-7 py-6 text-stone-950">
          <div>
            <p className="text-[22px] font-black">Answer the quick survey</p>
            <p className="mt-1 text-[15px] font-medium text-stone-500">Survey link in the post caption</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-emerald-700 text-[28px] font-black text-white">→</span>
        </div>
      </div>
    </div>
  );
}

function MainProof({ variant }: { variant: string }) {
  switch (variant) {
    case "quick-problem":
    case "quick-close":
      return <DashboardPhone scale={variant === "quick-close" ? 0.98 : 0.9} />;
    case "quick-fields":
      return <QuickForm />;
    case "quick-update":
      return <QuickUpdate />;
    case "pay-state":
      return (
        <div className="grid gap-5">
          <div className="grid grid-cols-2 gap-5">
            <ProofMetric label="Inventory status" value="Sold" dark />
            <ProofMetric label="Payment status" value="Partially paid" />
          </div>
          <PaymentState />
        </div>
      );
    case "pay-start":
      return <PaymentState />;
    case "pay-action":
      return (
        <div className="grid grid-cols-[.8fr_1.2fr] items-center gap-6">
          <div className="rounded-[28px] bg-white p-6 ring-1 ring-stone-200">
            <StaticField label="Payment amount" value="₱1,500" />
            <div className="mt-5 grid h-[68px] place-items-center rounded-2xl bg-emerald-700 text-[20px] font-black text-white">Add payment →</div>
          </div>
          <PaymentState after />
        </div>
      );
    case "pay-update":
      return <PaymentState after />;
    case "quick-story":
      return (
        <div className="grid gap-8">
          <QuickForm />
          <QuickUpdate />
        </div>
      );
    case "pay-story":
      return (
        <div className="grid gap-8">
          <div className="rounded-[28px] bg-white p-6 ring-1 ring-stone-200"><StaticField label="Payment amount" value="₱1,500" /></div>
          <PaymentState after />
        </div>
      );
    case "feature-quick-actions":
      return <FlowSocialProof feature="quick-actions" />;
    case "feature-search-stock":
      return <FlowSocialProof feature="search-stock" />;
    case "feature-add-stock":
      return <FlowSocialProof feature="add-stock" />;
    case "feature-quick-sale":
      return <FlowSocialProof feature="quick-sale" />;
    case "feature-installments":
      return <FlowSocialProof feature="installments" />;
    case "feature-payments":
      return <FlowSocialProof feature="payments" />;
    case "feature-backup":
      return <FlowSocialProof feature="backup" />;
    case "feature-web-inventory":
      return <WebInventorySocialProof />;
    case "survey-cta":
      return <SurveyCallToAction />;
    default:
      return null;
  }
}

function LinkPreview({ asset }: { asset: SocialAssetDefinition }) {
  const isLongHeadline = asset.headline.length > 40;

  return (
    <div className="flex h-full items-center justify-between gap-12 px-[76px] py-[58px]">
      <div className="w-[650px]">
        <BrandBand />
        <p className={`mt-12 ${isLongHeadline ? "text-[56px]" : "text-[64px]"} font-black leading-[.94] tracking-[-0.065em] text-stone-950`}>{asset.headline}</p>
        <p className="mt-6 text-[22px] leading-8 text-stone-600">{asset.subhead}</p>
        <p className="mt-7 text-[17px] font-bold uppercase tracking-[.14em] text-emerald-800">{asset.caption}</p>
      </div>
      <div className="grid h-[510px] w-[410px] place-items-center overflow-hidden pt-1"><DashboardPhone scale={0.72} /></div>
    </div>
  );
}

export function SocialComposition({ asset }: { asset: SocialAssetDefinition }) {
  const isStory = asset.height === 1920;
  const isLink = asset.variant === "link-preview";
  return (
    <main
      id="social-composition"
      data-capture-ready="true"
      data-asset-id={asset.id}
      className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#fffdf6_0%,#f8f5ed_54%,#e7ede5_100%)] font-sans text-stone-950"
      style={{ width: asset.width, height: asset.height }}
    >
      {isLink ? <LinkPreview asset={asset} /> : (
        <div
          className="flex h-full flex-col"
          style={{ padding: isStory ? "170px 74px 240px" : "68px 72px 64px" }}
        >
          <BrandBand sequence={asset.sequence} />
          <div className={isStory ? "mt-20" : "mt-14"}>
            <h1 className={`${isStory ? "text-[76px]" : "text-[66px]"} max-w-[930px] font-black leading-[.94] tracking-[-0.065em]`}>{asset.headline}</h1>
            <p className={`mt-6 max-w-[850px] ${isStory ? "text-[28px] leading-10" : "text-[24px] leading-9"} text-stone-600`}>{asset.subhead}</p>
          </div>
          <div className={`social-product-ui flex min-h-0 flex-1 items-center ${isStory ? "py-16" : "py-8"}`}>
            <div className="w-full"><MainProof variant={asset.variant} /></div>
          </div>
          <div className="flex items-end justify-between gap-8 border-t border-stone-950/15 pt-5">
            <p className="max-w-[760px] text-[18px] font-bold leading-7 text-stone-700">{asset.caption}</p>
            <p className="shrink-0 text-[15px] font-black uppercase tracking-[.16em] text-emerald-800">{content.status}</p>
          </div>
        </div>
      )}
    </main>
  );
}
