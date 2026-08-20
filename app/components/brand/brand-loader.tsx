import { useId } from "react";
import styles from "@/app/components/brand/brand-loader.module.css";

type SharedBrandLoaderProps = {
  state?: "loading" | "success";
  background?: "light" | "dark";
  className?: string;
};

export type BrandLoaderProps = SharedBrandLoaderProps &
  (
    | { decorative: true; label?: never }
    | { decorative?: false; label: string }
  );

const SHOE_PATH =
  "M48 288c0-28 20-52 54-65 57 0 98-8 136-34l37-26c16-11 39-8 50 9l29 40c9 13 22 22 37 25l61 18c25 8 39 24 39 47 0 24-19 42-46 42H114c-42 0-66-22-66-53Z";

export function BrandLoader({
  state = "loading",
  background = "light",
  decorative = false,
  label,
  className = "",
}: BrandLoaderProps) {
  const instanceId = useId().replaceAll(":", "");
  const shoeClipId = `solesheet-loader-shoe-${instanceId}`;

  return (
    <div
      role={decorative ? undefined : "status"}
      aria-hidden={decorative || undefined}
      data-state={state}
      data-background={background}
      className={`${styles.root} ${styles[background]} ${styles[state]} ${className}`.trim()}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 512 512"
        className={styles.mark}
        data-testid="brand-loader-mark"
      >
        <defs>
          <clipPath id={shoeClipId}>
            <path d={SHOE_PATH} />
          </clipPath>
        </defs>

        <g className={styles.sheetIntro} data-layer="sheet-intro">
          <rect
            x="151"
            y="112"
            width="210"
            height="250"
            rx="12"
            pathLength="1"
          />
          <path
            pathLength="1"
            d="M203 112v250M256 112v250M309 112v250M151 174h210M151 237h210M151 300h210"
          />
        </g>

        <path
          d={SHOE_PATH}
          className={styles.shoeFill}
          data-layer="shoe-fill"
        />
        <path
          d={SHOE_PATH}
          pathLength="1"
          className={styles.shoeOutline}
          data-layer="shoe-outline"
        />

        <g
          clipPath={`url(#${shoeClipId})`}
          className={styles.shoeGrid}
          data-layer="shoe-grid"
        >
          <path
            pathLength="1"
            d="M98 140v230M160 140v230M222 140v230M284 140v230M346 140v230M408 140v230"
          />
          <path pathLength="1" d="M28 217h490M28 261h490M28 305h490" />
        </g>

        <path
          d="M52 299h435"
          pathLength="1"
          className={styles.sole}
          data-layer="sole"
        />

        <g className={styles.eyelets} data-layer="eyelets">
          <circle cx="271" cy="184" r="6" />
          <circle cx="296" cy="193" r="6" />
          <circle cx="321" cy="202" r="6" />
          <circle cx="271" cy="212" r="6" />
          <circle cx="296" cy="221" r="6" />
          <circle cx="321" cy="230" r="6" />
        </g>
        <path
          d="M271 184l25 37M271 212l25-19M296 193l25 37M296 221l25-19"
          pathLength="1"
          className={styles.laces}
          data-layer="laces"
        />

        <g className={styles.successCue} data-layer="success-cue">
          <circle cx="417" cy="137" r="40" />
          <path pathLength="1" d="m396 137 14 14 28-31" />
        </g>
      </svg>
      {decorative ? null : <span className="sr-only">{label}</span>}
    </div>
  );
}
