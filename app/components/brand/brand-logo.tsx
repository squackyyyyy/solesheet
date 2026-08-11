import Image from "next/image";

export function BrandLogo({
  background = "light",
  compactOnMobile = false,
  className = "",
  priority = false,
}: {
  background?: "light" | "dark";
  compactOnMobile?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const horizontal = `/svg/solesheet-horizontal-on-${background}.svg`;
  const mark = `/svg/solesheet-mark-on-${background}.svg`;

  return (
    <picture className={className}>
      {compactOnMobile ? <source media="(max-width: 639px)" srcSet={mark} /> : null}
      <Image
        src={horizontal}
        alt="SoleSheet"
        width={1200}
        height={320}
        priority={priority}
        className={`block h-auto ${compactOnMobile ? "w-12 sm:w-[180px]" : "w-[180px]"}`}
      />
    </picture>
  );
}

export function BrandShoeMark({ className = "size-12" }: { className?: string }) {
  return (
    <Image
      src="/svg/solesheet-mark-on-light.svg"
      alt=""
      aria-hidden="true"
      width={520}
      height={320}
      className={`object-contain ${className}`}
    />
  );
}
