import Image from "next/image";

export function BrandLogo({
  background = "light",
  className = "",
  priority = false,
}: {
  background?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const horizontal = `/svg/solesheet-horizontal-on-${background}.svg`;

  return (
    <picture className={className}>
      <Image
        src={horizontal}
        alt="SoleSheet"
        width={1200}
        height={320}
        priority={priority}
        className="block h-auto w-[180px]"
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
