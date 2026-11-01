# Reltroner Studio — Private Remodeling Workspace

**Release boundary: INTERNAL. This entire directory must not be synchronized to the production `reltroner-studio/content` collection.** It is a reusable editorial and statistical modeling workspace. No `/remodeling` public website route should exist.

[Content architecture](../README.md) — navigation index. This workspace remains internal-only.

## Conventions

- `kalgered-consumption-methodology-v65.md` — an existing Kalgered-specific **reference implementation** of the reusable methodology format; its numeric observations are only for Kalgered.
- `kalgered-remodeling-history-log.md` — a Kalgered-specific historical log retained in full, never surfaced by public collection routes.
- `templates/statistical-release-methodology.template.md` — reusable, parameterized template for *any* country, territory, fictional planet, and series.
- `templates/remodeling-history-log.template.md` — reusable versioned archival log; old census values are stored here, not copied into public profiles.
- `../../docs/cms/statistical-publishing-architecture-v1.md` — overall WPP 2024 + Trading Economics-inspired CMS design and migration gates.

## Authoring contract

1. Create a **stable** `series_id` (e.g. `AST-KAL-PCEXP-Y0-01`) and a canonical dataset; do not edit literal values in published Markdown first.
2. Create a versioned methodology record using the template, with clear fictional model evidence status.
3. Record earlier assumptions and changes using the history template. Retired values belong only here.
4. Run numeric and provenance QA. Publish a separate brief indicator bulletin under `content/statistics/`, explicitly labeled *fictional*.
5. Promote through a deliberate **file allowlist** from remodeling to production. Exclude `content/remodeling/**`, historical ledgers, experimental proposals, tests/tools not required by the production build, and private drafting assets.
6. **Never use Git reset/clean to force promotion.** Compare Git blob SHA, verify dependencies, review the release diff and merge via PR.
7. Record `published: false` **and** `visibility: internal` for private documents. The directory-level exclusion is stronger than the frontmatter flag.
