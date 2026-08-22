## Why

SoleSheet needs a publicly accessible waitlist deployment that can validate demand without a recurring hosting fee or a personal-use restriction. The current Vercel Hobby deployment is technically sufficient but does not permit the intended commercial waitlist use, so production hosting should move before real contact-data collection begins.

## What Changes

- Add a Cloudflare Workers deployment path for the existing Next.js landing site using the OpenNext adapter.
- Preserve the current homepage, privacy page, responsive behavior, static assets, and disabled production-only studio routes.
- Replace the Open Graph image route's runtime filesystem read with a Worker-compatible asset-loading approach.
- Keep local Next.js development unchanged while adding production-like Worker preview and deployment commands.
- Configure a free-plan-safe Worker bundle and direct asset delivery without requiring paid Cloudflare Images.
- Document environment configuration and quota checks while retaining the existing Vercel deployment as an independent fallback.
- Defer purchasing or attaching a custom domain, changing DNS, and detaching Vercel until the website is otherwise finished and a separate change is approved.
- Do not add analytics, form persistence, survey-flow changes, or a database in this change.

## Capabilities

### New Capabilities

- `zero-cost-production-hosting`: Covers a free-tier-compatible public deployment on the Cloudflare provider URL, route and asset parity, production-like previewing, and fallback readiness.

### Modified Capabilities

None.

## Impact

- Adds Cloudflare/OpenNext deployment dependencies, scripts, and root-level configuration.
- Updates the Open Graph image implementation for a filesystem-free runtime.
- Adds build and runtime verification for Cloudflare Workers while preserving the existing Next.js development workflow.
- Establishes the verified Cloudflare provider URL as the current public hosting target without purchasing a domain or changing DNS; it does not change waitlist or survey data handling.
- Establishes a Worker runtime constraint for later backend work. Firebase Admin is not included because the compatibility spike produced a runtime failure; a later persistence change must select a Worker-compatible database integration.
