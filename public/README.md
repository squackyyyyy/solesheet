# SoleSheet logo kit — Grid Shoe

## Recommended files

- Website header on light backgrounds: `svg/solesheet-horizontal-on-light.svg`
- Website header on dark backgrounds: `svg/solesheet-horizontal-on-dark.svg`
- Centered or square layouts: the matching `solesheet-stacked-*` file
- Standalone product mark: the matching `solesheet-mark-*` file
- Browser favicon: the responsive S-over-grid micro-mark in `web/favicon.svg`, with PNG and `favicon.ico` fallbacks in `web/`
- App/PWA icons: `web/icon-192.png`, `web/icon-512.png`, and `web/apple-touch-icon.png`
- Single-color production: `svg/solesheet-monochrome-navy.svg` or `svg/solesheet-monochrome-white.svg`

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| SoleSheet Green | `#22C55E` | Primary brand color |
| Deep Ink | `#14213D` | Light-mode wordmark and outlines |
| Soft White | `#F7FAF5` | Dark-mode wordmark and grid |

## Usage rules

- Keep clear space around the logo equal to roughly the height of the wordmark's lowercase letters.
- Use the horizontal logo at 180 px wide or larger. Below that, use the standalone mark.
- Use the detailed mark at 48 px or larger; use the simplified favicon exports below 48 px. The source for larger app icons is `web/app-icon.svg`.
- Do not stretch, rotate, recolor individual pieces, add shadows, or place the logo on visually busy imagery.
- The SVG wordmark uses Arial Bold with Helvetica and sans-serif fallbacks. Preserve the font stack when embedding the SVG.

## Folder structure

- `svg/` — scalable master artwork and logo variants
- `png/` — transparent raster exports for presentations and general use
- `web/` — favicon, Apple touch icon, and PWA-ready assets
