# SoleSheet

SoleSheet is a product-validation landing site for a planned mobile stockroom built for Philippine shoe resellers.

## Local development

Install dependencies and start the standard Next.js development server:

```sh
bun install
bun run dev
```

The existing `bun run build`, `bun run typecheck`, `bun run lint`, and `bun run test` commands remain independent of the Cloudflare production preview. Node.js 22 or newer is required for current Wrangler-based Worker tooling.

## Cloudflare Worker workflow

Production uses the Cloudflare OpenNext adapter. Its configuration stays at the repository root:

- `open-next.config.ts` contains OpenNext configuration.
- `wrangler.jsonc` declares the Worker, Node compatibility, and static asset binding.
- `.open-next/` and `.wrangler/` are generated and ignored.

The Worker configuration intentionally has no Cloudflare Images, R2, D1, or other paid or potentially billable binding. Database and analytics work belongs to later changes.

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

Last verified on August 22, 2026: 93 static files, 6,239.84 KiB uncompressed, and 1,533.50 KiB gzip, with only the `ASSETS` binding configured.

### Environment configuration

Set build variables in the Cloudflare project rather than committing `.env` files:

- `NEXT_PUBLIC_SITE_URL` — the candidate `workers.dev` URL during preview verification, then `https://solesheet.ph` for the custom-domain release.
- `SHOETRACK_ENABLE_FLOW_STUDIO` — leave unset in production.
- `SHOETRACK_ENABLE_SOCIAL_STUDIO` — leave unset in production.
- `SHOETRACK_ENABLE_WEB_QUICK_ADD_STUDIO` — leave unset in production.

There are no production secrets required by the landing site in this change.

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
- The Worker has no paid Images or R2 bindings.

Do not point the custom domain at the candidate if any critical check fails.

## Custom-domain cutover and rollback

1. Keep the existing Vercel deployment and its configuration intact.
2. Record the current DNS records and Vercel target before changing anything.
3. Lower DNS TTL in advance when the DNS provider permits it.
4. Add the custom domain to the verified Worker and confirm its required DNS records.
5. Set `NEXT_PUBLIC_SITE_URL=https://solesheet.ph`, rebuild, and deploy the candidate.
6. Switch DNS only after the provider URL passes every candidate check.
7. Verify HTTPS, homepage metadata, public routes, assets, waitlist, and survey behavior through the custom domain.
8. Monitor for at least 48 hours before removing the custom domain from Vercel.

Rollback immediately for persistent 5xx responses, TLS or DNS failures, missing critical assets, or broken waitlist/survey interactions:

1. Restore the recorded Vercel DNS target.
2. Confirm the homepage and privacy page through the custom domain.
3. Leave the Cloudflare candidate available for diagnosis.
4. Do not delete either project or its deployment history during rollback.

After the rollback window passes without a critical regression, the custom domain can be removed from Vercel. Do not delete the Vercel project unless that separate destructive action is explicitly requested.

## Constraint for later persistence work

The Cloudflare compatibility spike showed that Firebase Admin's Firestore module does not execute in this Worker bundle. A later persistence change should prefer a Worker-native server binding such as Cloudflare D1 or deliberately design and test a Firestore REST integration. It must not add `firebase-admin` unless a new runtime compatibility test proves the failure has been resolved. Browser code must not receive privileged database credentials.
