# SoleSheet

SoleSheet is a product-validation landing site for a planned mobile stockroom built for Philippine shoe resellers.

## Local development

Install dependencies and start the standard Next.js development server:

```sh
bun install
bun run dev
```

The existing `bun run build`, `bun run typecheck`, `bun run lint`, and `bun run test` commands remain independent of the Cloudflare production preview. The project standardizes local and hosted tooling on Node.js 24; run `nvm use` from the repository root to select it.

## Cloudflare Worker workflow

Production uses the Cloudflare OpenNext adapter. Its configuration stays at the repository root:

- `open-next.config.ts` contains OpenNext configuration.
- `wrangler.jsonc` declares the Worker, Node compatibility, static assets, and the server-only D1 binding.
- `.open-next/` and `.wrangler/` are generated and ignored.

The Worker uses one D1 database for waitlist contacts. It intentionally has no Cloudflare Images, R2, analytics, or other paid or potentially billable binding. See [docs/d1-operations.md](docs/d1-operations.md) for the local-versus-remote model and safe migration commands.

Run a production Worker build:

```sh
bun run build:worker
```

Run the generated bundle in the production-like Workerd runtime:

```sh
bun run preview:worker
```

Generate Cloudflare binding types when the bindings change:

```sh
bun run types:worker
```

Measure the upload without deploying:

```sh
bunx wrangler deploy --dry-run
```

The dry-run output reports both uncompressed and gzip sizes. The gzip size must remain below the active Workers Free upload limit before a deployment is approved. Also confirm in the Cloudflare dashboard that the project is on Workers Free and that no paid Images or R2 bindings have been enabled.

Last verified on August 23, 2026: 93 static files, 6,262.68 KiB uncompressed, and 1,540.83 KiB gzip, with only the approved `ASSETS` and `DB` bindings configured. The compressed Worker remains below the current 3 MiB Workers Free limit. D1 remains subject to its Free-plan row and storage quotas; reaching a Free quota causes queries to fail rather than creating paid overage. Recheck the official [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) and [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) before a production release.

### Environment configuration

Set build variables in the Cloudflare project rather than committing `.env` files:

- `NEXT_PUBLIC_SITE_URL` — `https://solesheet.app`, the permanent public origin used for canonical metadata and the analytics hostname gate. Preview and provider-hosted copies retain this canonical origin.
- `SHOETRACK_ENABLE_FLOW_STUDIO` — leave unset in production.
- `SHOETRACK_ENABLE_SOCIAL_STUDIO` — leave unset in production.
- `SHOETRACK_ENABLE_WEB_QUICK_ADD_STUDIO` — leave unset in production.

The D1 database is exposed to server code through a Worker binding and does not require a browser-visible credential or committed secret.

## Open Graph image

`app/opengraph-image.png` is a static Next.js metadata asset generated from the `solesheet-link-preview` entry in `app/lib/social-assets.json`. `app/opengraph-image.alt.txt` provides its social-image alternative text.

To regenerate the social assets and synchronize the Open Graph file:

1. Start the authoring server on port 3200:

   ```sh
   SHOETRACK_ENABLE_SOCIAL_STUDIO=1 bun run dev -- --port 3200
   ```

2. In another terminal, run:

   ```sh
   bun run assets:social
   ```

The capture script writes the complete social set to `artifacts/social/` and copies the link-preview result to `app/opengraph-image.png`. Commit both copies together when the link preview changes.

## Candidate deployment

Deploying creates or updates external Cloudflare resources and requires explicit approval plus an authenticated Wrangler session:

```sh
bunx wrangler whoami
bun run deploy:worker
```

Before attaching the production domain, verify the candidate provider URL:

- `/` and `/privacy` return successful responses.
- The Open Graph image URL emitted in the homepage metadata returns a 1200×630 PNG.
- Representative SVG, WebP, PNG, icon, and manifest requests succeed.
- All workflow tabs load their corresponding desktop and mobile preview images.
- Waitlist and survey interactions work at desktop and mobile viewport sizes.
- Capture-studio routes return not found while their enablement flags are unset.
- The compressed Worker is below the active Free upload limit.
- The Worker has only the approved static-assets and D1 bindings, with no paid Images or R2 binding.

Do not point the custom domain at the candidate if any critical check fails.

## Custom-domain cutover and rollback

1. Keep the existing Vercel deployment and its configuration intact.
2. Record the current DNS records and Vercel target before changing anything.
3. Lower DNS TTL in advance when the DNS provider permits it.
4. Add the custom domain to the verified Worker and confirm its required DNS records.
5. Set `NEXT_PUBLIC_SITE_URL=https://solesheet.app`, rebuild, and deploy the candidate.
6. Switch DNS only after the provider URL passes every candidate check.
7. Verify HTTPS, homepage metadata, public routes, assets, waitlist, and survey behavior through the custom domain.
8. Monitor for at least 48 hours before removing the custom domain from Vercel.

Rollback immediately for persistent 5xx responses, TLS or DNS failures, missing critical assets, or broken waitlist/survey interactions:

1. Restore the recorded Vercel DNS target.
2. Confirm the homepage and privacy page through the custom domain.
3. Leave the Cloudflare candidate available for diagnosis.
4. Do not delete either project or its deployment history during rollback.

After the rollback window passes without a critical regression, the custom domain can be removed from Vercel. Do not delete the Vercel project unless that separate destructive action is explicitly requested.

## Persistence boundary

Waitlist persistence uses Cloudflare D1 through the server-only `DB` binding. Firebase Admin remains incompatible with this Worker bundle and must not be added unless a separate runtime compatibility test proves otherwise. Browser code must never receive privileged database credentials.
