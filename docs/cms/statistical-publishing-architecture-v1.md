# Reltroner Studio — Statistical Publishing CMS Architecture v1

**Design status: ADR PROPOSED / NO FULL RUNTIME MIGRATION.** Date: 2026-10-31. This proposal defines a **headless, Git-based, canon-first statistical publishing system** using established Reltroner Studio Next.js Markdown collections. It is deliberately limited to the `reltroner-studio-remodeling` repository; the production app stays untouched.

## 1. Product definition and inspiration

**Editorial mission:** data-driven creative worldbuilding: every fictional indicator has an explicit source, unit, fictional reference period, revision vintage, methodology, and evidence status. Canon C is creator ratification, **not empirical validation**.

- **UN DESA WPP 2024** inspires published *revisions*, documentation, definitions, country/region classifications, detailed source records, separation of historical estimates from forward projections, multiple scenarios, validated aggregates, and CSV/data-portal outputs. WPP relies on censuses, vital registration, surveys and cohort-component methods; NCCM currently does **not** possess those observations.
- **Trading Economics** inspires a user-oriented indicator hub: stable indicator/series identity, country, category, observation timestamp/reference period, numeric value, frequency, last update, historical revision views, charts and downloads. Never claim to use or redistribute its proprietary market data or official sourcing.

External methodological references: https://population.un.org/wpp/ ; https://www.un.org/development/desa/pd/content/world-population-prospects-2024-methodology-report ; https://docs.tradingeconomics.com/indicators/historical/.

## 2. Architectural boundary

```text
reltroner-studio-remodeling/   (authoring, datasets, canonical tests, private history)
  content/remodeling/          (internal-only methods, logs, reusable templates)
  content/statistics/          (public-facing *release articles* only)
  content/factions/            (narrative profiles: render approved facts only)
  data/asthortera/             (NCCM V6.5 machine canon and dataset)
  data/cms/                    (series registry and release metadata, optional v1)
  tools/ & tests/              (deterministic verification, no Next build required)
  docs/cms/                    (contracts, ADRs, promotion policy)

reltroner-studio/              (production read-only presentation runtime)
  app/statistics/[slug]/       (current SSR/static article route: PRESERVE)
  lib/constants/collections.js (statistics already registered)
  lib/utils/content.js         (publication filtering currently in place)
  lib/content/taxonomy.ts      (FICTION_CANON distinct from actual measurements)
  content/statistics/          (allowlisted validated publications only)
  data/asthortera/             (approved version-pinned public datasets)
```

**No public `/remodeling` collection or route.** `content/remodeling/**` is excluded *by directory allowlist* from production sync; `published:false` is a second guard and not a permission boundary on raw GitHub-accessible public repository files. Private drafts with genuine secrets or personally identifying data must not be committed to a public GitHub repository at all.

The production app must not fetch `main` of the remodeling repo at build/runtime. It consumes a reviewed immutable release artifact snapshot; no network at rendering time, no additional Cloudflare asset build work. Relative local references must resolve in each promoted package.

## 3. Logical CMS entities (no relational DB needed at v1)

| Entity | Primary key | Required relationships |
|---|---|---|
| **World / Geography** | `geo_id` | hierarchical planet > country > region; exactly one population denominator per territorial unit and period |
| **Indicator Definition** | `indicator_id` | label, definition, unit, statistical unit, aggregation rules, denominator and domain |
| **Series** | `series_id` | stable `geo_id + indicator_id + variant`, not a human title |
| **Observation** | `series_id + reference_period + release_id` | numeric/null value, quality class, uncertainty, derivation, source id |
| **Statistical Source** | `source_id` | creator decision or archived model path, Git SHA, authority type, methods |
| **Methodology** | `methodology_id + version` | definitions, assumptions, formulas, limitations, provenance |
| **Release / Vintage** | `release_id` | published timestamp, NCCM version, immutable ledger commit/hash, compatible series set |
| **Revision Event** | `event_id` | old value/source/status → new, reason, approver, timestamp, affected outputs |
| **Article / Lore Entry** | `content_id` | points to one current release/series and must not own new source numbers |

**Never** use random UUIDs as the only human-facing identifier: maintain stable, readable IDs. Every published observation is associated with a specific model revision; Git SHA and dataset content hash record *which bytes* were approved.

## 4. Versioning: two clocks + quality dimension

1. **Fictional clock:** `Year 0`, BAC dates or other canon timeline. This is *not* an ISO Gregorian observation.
2. **Editorial release clock:** real-world `2026-10-31`, updated timestamp and Git commit SHA. Revisions may change an earlier fictional Year 0 observation without rewriting the world timeline.
3. **Statistical quality:** `C` = creator-ratified fiction; `D` = deterministic derivation; `S` = scenario; `A` = superseded archive; `null/unassigned` = unmeasured. This is **orthogonal** to `FICTION_CANON` / `FICTION_SPECULATIVE` editorial taxonomy and to `published` visibility.
4. Future estimates/projections must be marked `estimate` or `projection`, with assumptions/variant ID; a population-weighted TFR *proxy* must not be labeled an independently measured fertility rate.

**Release is append-only in the public provenance registry:** Never silently replace versioned `release_id` outputs. The `current` pointer can advance after approval, retaining archived snapshots for auditing.

## 5. File classification and moving the Kalgered examples

| Artifact | Intended destination | Publish? |
|---|---|---|
| Kalgered detailed source methodology | `content/remodeling/kalgered-consumption-methodology-v65.md` | No: internal case reference |
| Kalgered forensic remodeling history | `content/remodeling/kalgered-remodeling-history-log.md` | No: internal archive |
| Reusable universal method template | `content/remodeling/templates/statistical-release-methodology.template.md` | No |
| Reusable universal history template | `content/remodeling/templates/remodeling-history-log.template.md` | No |
| Kalgered release bulletin | `content/statistics/kalgered-consumption-v65.md` | Yes: FICTION_CANON, direct figures and caveats only |
| NCCM national ledger | `data/asthortera/nccm-v6-active-cross-domain.json` | Validated released dataset, unchanged canon values |
| Current five-class dataset | `data/asthortera/kalgered-consumption-v65.json` | Validated released dataset |

**No copying the historical 99% survey or obsolete GNI into a published article**. Kalgered's public faction profile should point to `/statistics/kalgered-consumption-v65`, never private remodeling files. Preserve redirect compatibility for old statistical methodology URLs using the existing `aliases` convention only if/when the approved publication reaches production.

## 6. Release workflow: source → QA → publication

```text
Creator decision / baseline lore
  → Authoring draft (modeling repo, content/remodeling)
  → Input schema/unit/denominator validation
  → Numeric reconciliation across 37-state and crossdomain ledgers
  → Versioned release manifest (canonical hash, provenance & creator approval)
  → Generate public JSON/CSV and separate Markdown release notes
  → Static article + indicator-card consumer (existing Next.js routes)
  → Review/PR & independent QA on modeling repo
  → Explicit allowlisted release promotion to production
  → Existing Next.js build and Cloudflare deploy
```

**CMS editing UI (future)**: a form-based, local-first headless editor reading structured datasets (not arbitrary Markdown mass editing); preview impacted indicators; disallow publishing without passing QA; creator approval gate. No database migrations or hosted CMS vendor required to establish the v1 workflow. Later UI can show revision diffs, time series, country/indicator filters, historical changes and CSV export.

## 7. The public reader experience

Use the existing `/statistics` collection as an initial collection index; *future* indicator landing routes can become `/statistics/indicators/[id]` and `/statistics/countries/[geo]`, with static generation and canonical URL redirects. Do not add them until routing/SEO and collection contract regression tests pass.

Each bulletin must display: fictional-data notice → value and units → reference period → country/region → status C/D/S → source definition and methodology → release vintage / updated UTC → comparable series list → caveats → data access links. Side-by-side historical releases may be shown only where definitions and reference denominators remain comparable. Charts MUST display the exact base interval and status; no fake time series invented from a single Year 0 observation.

**Optional readers later:** bulk CSV, JSON static extracts, separate navigation for *Actual Canon*, *Hypothetical Scenario*, *Superseded Historical*. Download exports are generated from validated tables; never parsed by scraping rendered Markdown.

## 8. Invariants / quality gates

- Planet 4,412B = 3,213B + 395B + 804B; 37 countries, 75B internal migration zero net; SDI 0.947; modeled TFR proxy 1.63; 4.00% GDP-weighted real growth; no fabricated details for residual 18.
- Kalgered 108B, 0.979 SDI, 0.210 income Gini; five Canon C spending classes sum 100%, derived headcounts sum 108B; observed mean `null`; hypothetical 23,050/day remains Scenario.
- One source of truth per series and release; no conflicting hardcoded value outside renderer-generated/public approved summaries.
- Source file paths exist; all published Markdown links resolve or are approved website paths; no published-page link to internal-only source.
- No unpublished file in sitemap/static params/public index; in particular `content/remodeling/**` never promoted.
- The 19 deterministic national profiles and 3 planetary crossdocs remain zero drift; automated strict audit remains PASS_P0; missing measurements remain missing.
- Backwards-compatible redirects when an existing published statistic path moves; no 404 introduced in production. Release promotion only after QA and successful production build.
- Freeze protected canonical fields. When a change genuinely alters an approved value, require creator decision, revision event, valid dataset hash and passing tests before it becomes `current`.

## 9. Incremental delivery, with no production performance regression

**P0 (this repo only):** relocate private documents, add universal reusable templates, publish clean Kalgered series bulletin, update all internal references, preserve current numeric dataset, adapt QA tests, add documentation, verify CI.

**P1 (separately approved production PR):** copy only public bulletin + compatible canonical datasets from modeled release, add routing alias if needed, add source metadata to the existing article UI without changing legacy routes. No Next dependency expansion.

**P2 (future):** static indicator catalog + downloadable JSON/CSV, per-country comparison and simple charts with release selector.

**P3 (only if scale justifies it):** optional editor dashboard, authenticated drafts, materialized SQL indices; keep Git snapshots as canonical archive.

**Explicit non-goals:** cloning Trading Economics UI, claiming UN data provenance, hiring a real census bureau for fiction, inventing cohort microdata, adding hosted CMS to production, changing Cloudflare asset flow, or changing any ratified NCCM V6.5 numeric anchor without a creator-approved release.
