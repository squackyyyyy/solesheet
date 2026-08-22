## Context

The site is a Next.js 16.2.12 App Router project currently deployed on Vercel. Its public pages are mostly statically rendered, while capture-studio routes are dynamic and disabled in production unless explicitly enabled. The project uses local SVG and pre-optimized WebP assets, `next/image` for brand assets, Google fonts during the build, and a generated Open Graph route that currently reads a PNG with `readFileSync(process.cwd())`.

An isolated compatibility spike used `@opennextjs/cloudflare` 1.20.2 and Wrangler 4.125.0. The standard site built successfully, produced a 2.04 MiB compressed Worker against the current 3 MiB free-plan limit, and served `/`, `/privacy`, representative SVG/WebP assets, and a representative `/_next/image` request. `/opengraph-image` returned 500 because the Worker could not read the expected `/bundle/public/...` filesystem path.

The same spike imported Firebase Admin 14.3.0 into a temporary Route Handler. Although the compressed bundle remained under the limit, the endpoint failed at runtime while loading the Firestore module. Firebase Admin is therefore not a supported assumption for later Worker-hosted persistence.

## Goals / Non-Goals

**Goals:**

- Make Cloudflare Workers the production target while keeping ordinary local Next.js development intact.
- Keep the deployment inside the Workers Free limits at the point of release.
- Verify route, asset, metadata, and responsive parity before relying on the Cloudflare provider URL as the public waitlist deployment.
- Retain the previous Vercel deployment as an independent fallback without changing its domain configuration.

**Non-Goals:**

- Adding analytics, form persistence, a database, email delivery, or survey-flow changes.
- Deploying Firebase Admin in the Worker.
- Adding R2 caching, Cloudflare Images, or another paid or potentially billable add-on.
- Purchasing or attaching a custom domain, changing DNS, or detaching the existing domain from Vercel.
- Reworking the landing-page design or capture-studio architecture unless required to meet the Worker bundle limit.

## Decisions

### Use Cloudflare Workers with the OpenNext adapter

Add `@opennextjs/cloudflare` and Wrangler using the versions resolved during implementation, an `open-next.config.ts`, and a `wrangler.jsonc` with `nodejs_compat`, a current compatibility date, and the generated static-assets binding. Add separately named Worker build, preview, deploy, and type-generation scripts.

Cloudflare Workers was selected because the current application passed a real adapter build and runtime preview, the bundle fits the free limit, its free plan supports the intended public use, and the platform supports App Router and Route Handlers needed by later changes. Netlify remains a fallback only if an implementation-time Cloudflare regression invalidates the spike; changing providers would require updating this design rather than silently substituting one.

### Require Node.js 22 for Worker tooling

Document and declare Node.js 22 or newer for Cloudflare tooling because current Wrangler and Firebase Admin releases no longer support Node.js 20. The normal Bun-based project scripts remain available, but Worker preview and deployment must execute with a compatible Node runtime in local and hosted build environments.

### Use a static Next.js metadata image

Replace the runtime-generated `app/opengraph-image.tsx` route with the existing 1200×630 link-preview composition as a static Next.js metadata image plus an alt-text metadata file. The current social content is constant, so runtime generation provides no user benefit and introduces a filesystem dependency that the Worker cannot satisfy. The existing social-asset source and capture command remain the source for regenerating the image when its content changes.

Fetching the public logo from the application during image generation was rejected because it makes metadata generation depend on a self-request and deployment origin. Embedding a second base64 copy in TypeScript was rejected because it obscures asset ownership and increases maintenance cost.

### Avoid paid image and cache bindings

Do not configure Cloudflare Images or R2 for this migration. The visible gallery assets are already WebP files served directly, and brand SVGs can be delivered as static assets. The production-like checks will confirm that the current `next/image` uses remain functional without a paid image binding.

### Defer the custom-domain cutover

Repository changes establish a reproducible Worker build, preview, and deployment on the assigned `workers.dev` provider URL. That verified provider URL is sufficient for the current waitlist release. Purchasing or attaching a custom domain, switching DNS, and detaching Vercel are deferred until the website is otherwise finished and must be handled through a separate, explicitly approved change. Keep the Vercel project and its current configuration intact in the meantime.

### Keep future persistence Worker-native

This change adds no database. The later persistence proposal must evaluate Cloudflare D1 as the preferred zero-cost, server-only binding or a carefully scoped Firestore REST integration. It must not introduce `firebase-admin` into the Worker unless a new compatibility test demonstrates that the runtime failure has been resolved.

## Risks / Trade-offs

- [The Worker bundle grows beyond the free-plan limit] → Run an OpenNext build and Wrangler dry-run in verification, record compressed size, and avoid large server dependencies; reconsider disabled studio routes if headroom becomes insufficient.
- [OpenNext behavior changes with dependency updates] → Commit the lockfile, verify the production-like preview on upgrades, and keep adapter configuration minimal.
- [Static social artwork becomes stale] → Treat the existing link-preview capture as its source and regenerate the static metadata image whenever corresponding social content changes.
- [Google font fetching makes builds depend on network access] → Ensure the hosted build permits the current font download and consider self-hosting in a separate reliability change if this becomes unstable.
- [Free-tier limits cause downtime during unexpected traffic] → Monitor request and bundle usage; crossing meaningful traffic limits is a deliberate trigger to evaluate paid hosting rather than enabling automatic charges in this change.
- [The provider URL is less polished than a custom domain] → Accept the temporary branding trade-off while validating the product, then handle domain purchase and cutover in a separate change after the website is finished.

## Migration Plan

1. Add and lock the Cloudflare/OpenNext tooling and Worker configuration without changing existing domain or DNS settings.
2. Replace the filesystem-dependent Open Graph route with the static metadata image and verify metadata locally.
3. Run the standard build, Worker build, typecheck, focused tests, Wrangler dry-run, and production-like route and asset checks.
4. Create a candidate Cloudflare Worker deployment on its provider URL and configure only required environment values.
5. Verify the homepage, privacy page, responsive interactions, workflow images, metadata image, disabled studio routes, and free-plan usage on the candidate deployment.
6. Use the verified provider URL for the current waitlist release and retain the existing Vercel deployment unchanged as a fallback.
7. Defer custom-domain purchase, DNS cutover, and Vercel detachment to a separate future change after the website is finished.
