## 1. Worker Tooling and Configuration

- [x] 1.1 Add and lock the Cloudflare OpenNext adapter and Wrangler dependencies without adding Firebase Admin or paid-service SDKs.
- [x] 1.2 Add `open-next.config.ts` and a minimal `wrangler.jsonc` with Node compatibility and static-assets bindings only.
- [x] 1.3 Add separately named Worker build, preview, deploy, and type-generation scripts while preserving the existing development and standard build scripts.
- [x] 1.4 Declare and document the Node.js 22-or-newer requirement for Worker tooling and ignore generated `.open-next` and `.wrangler` output.

## 2. Worker-Compatible Metadata Asset

- [x] 2.1 Replace the filesystem-dependent generated Open Graph route with the existing 1200×630 static link-preview image and an accompanying alt-text metadata file.
- [x] 2.2 Document how the static Open Graph image is regenerated from the existing social-asset source so future social-content updates remain synchronized.

## 3. Local Compatibility Verification

- [x] 3.1 Run the existing typecheck, unit tests, lint, and standard Next.js production build to confirm the normal workflow still passes.
- [x] 3.2 Run the OpenNext build and Wrangler dry-run, record the compressed Worker size, and confirm it remains within the active Workers Free bundle limit without Images or R2 bindings.
- [x] 3.3 Exercise the Worker preview for `/`, `/privacy`, the metadata image, representative SVG/WebP/PNG assets, the manifest and icons, and production-disabled studio routes.
- [x] 3.4 Verify the waitlist and survey interactions at representative desktop and mobile sizes against the Worker preview.

## 4. Deployment and Rollback Documentation

- [x] 4.1 Expand the project README with the Worker toolchain, local preview, candidate deployment, required environment configuration, and free-plan verification steps.
- [x] 4.2 Document the custom-domain preflight, DNS cutover, rollback window, rollback procedure, and the instruction to retain the Vercel deployment until verification completes.
- [x] 4.3 Document that later persistence work must use a Worker-compatible integration and must not assume Firebase Admin compatibility.

## 5. Candidate Deployment

- [x] 5.1 After explicit user authorization, deploy a candidate Worker to its provider URL and verify public routes, assets, metadata, responsive interactions, and free-plan configuration.

Custom-domain purchase and attachment, DNS cutover, and Vercel detachment are deferred to a separate future change after the website is otherwise finished.
