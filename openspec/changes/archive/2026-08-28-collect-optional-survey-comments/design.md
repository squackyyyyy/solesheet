## Context

See `proposal.md` for motivation. The survey is a client-side one-question wizard that constructs an allow-listed JSON request, validates it again in the server route, and writes one `survey_responses` row plus zero or more normalized channel rows through a D1 batch. One response per signup and nullable response columns are deliberate existing constraints. The dialog also maintains one stable responsive height, so the new open-text control must fit the scrollable question body without resizing the outer surface.

## Goals / Non-Goals

**Goals:**

- Collect one useful qualitative comment without making survey completion harder.
- Bound and normalize the value consistently in the browser, API, and database.
- Preserve existing idempotency, atomic persistence, privacy, and logging behavior.
- Make the schema addition safe for existing production responses.

**Non-Goals:**

- Moderation, automated classification, sentiment analysis, or notifications.
- Multiple comment entries, threaded follow-up, editing a submitted response, or autosaving drafts.
- Detecting sensitive information inside arbitrary text beyond clearly warning respondents not to provide it.

## Decisions

### Add a sixth and final optional follow-up

The additional-comment question follows interview availability and becomes **Optional question 6 of 6**. It uses an explicit navigation step and primary completion action because a textarea cannot safely auto-advance. The respondent may still finish from any earlier optional question, so the new field does not increase the minimum survey burden.

Alternative considered: place the comment on the thank-you state. That would require a second authorized write after the response is already complete and would complicate idempotency, so it is rejected.

### Use a bounded nullable text value

The client keeps `additionalComments` in temporary page memory, limits it to 500 characters, shows a character count, and trims it when building the request. The API allow-lists the property, requires a string when supplied, repeats the trim and length validation, and omits whitespace-only content. Five hundred characters is enough for a concise concern or idea while limiting layout, storage, and manual-review burden.

Alternative considered: reuse `priority_other`. That field is conditional on selecting Other for one structured question and cannot accurately represent independent general feedback.

### Store the comment on `survey_responses`

A versioned D1 migration adds nullable `additional_comments TEXT` with a database length check. The repository binds the optional value in the existing response insert, so the response, channel rows, and completion timestamp retain their current atomic batch behavior. Existing rows remain valid with `NULL`; no backfill or new relation is needed because each signup has at most one survey response and one general comment.

Alternative considered: a separate comments table. It adds a relationship and another write without supporting a real one-to-many requirement.

### Treat open text as potentially sensitive

The field helper asks respondents not to include sensitive or customer information. The privacy notice explicitly identifies the optional comment and its product-research purpose. Operational logs remain outcome-only and never include request bodies or answer values.

## Risks / Trade-offs

- [Respondents may still enter sensitive material] → Minimize solicitation, show contextual guidance, retain existing deletion procedures, and never log the value.
- [A longer optional flow may reduce final-question completion] → Keep **Finish this survey** available throughout optional questions and make the field skippable.
- [Client and server limits can drift] → Use the shared text-limit constant and cover normalization, omission, and over-limit rejection in focused tests.
- [Deployment order can expose a request field before the column exists] → Apply and verify the additive D1 migration before deploying the application build that writes the new column.

## Migration Plan

1. Add and test the additive migration against the local D1 database.
2. Apply and verify the migration against production D1 before application deployment.
3. Deploy the updated UI, validator, repository, and privacy notice together.
4. Submit one controlled response with and without a comment and verify aggregate/schema state without printing the comment in logs.
5. Roll back the application build if needed; leave the nullable column in place because it is backward-compatible and removing it would be more destructive than retaining it unused.
