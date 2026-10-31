# Statistical Indicator Methodology — Reusable Template

**INTERNAL TEMPLATE. Copy for one dataset; never publish this template itself. Do not replace unknown values with zero.**

| Metadata key | Required input |
|---|---|
| series_id | `{{SERIES_ID}}` — stable across renames |
| entity_id | `{{ENTITY_ID}}` — country/planet canonical key |
| indicator_id | `{{INDICATOR_ID}}` — definition independent of country |
| reference_period | `{{ASHTORTERA_PERIOD}}` (e.g. Year 0), separate from UTC release date |
| vintage / release_id | `{{RELEASE_ID}}` (immutable published snapshot) |
| frequency | annual, daily-denominated cross-section, quarterly, event |
| unit | `{{UNIT}}`; local currency code and base-year if relevant |
| statistical_population | `{{DENOMINATOR}}`; e.g. *residents*, not households |
| statistical_nature | creator assigned (C), mathematically derived (D), scenario (S), archived (A), unassigned |
| source lineage | `{{SOURCE_LEDGER_PATH}}`, `{{DATASET_PATH}}`, revision SHA, creator approval |
| uncertainty | numeric intervals only if modeled and justified; otherwise `null` |
| comparability | `{{COMPARABILITY_NOTES}}` across vintages/migrations |
| quality checks | `{{INVARIANTS}}`; formulas, units, boundary tests |
| limitations | `{{NOT_OBSERVED_FIELDS}}`; no fabricated bureau or real census evidence |

## Definition of this indicator

`{{PLAIN_LANGUAGE_EXPLANATION}}`

## Intended published audience

A fictional statistical release should state **the worldbuilding model that created the data**, separate from real-world evidence. It must never claim UN, Trading Economics or government certification.

## Methodology and derivations

1. Provide exactly one canonical dataset key and one population denominator.
2. Document inclusive versus exclusive classes and how each class sums or overlaps.
3. Define mathematical operations and units, numeric tolerance, rounding, GDP/GNI bridges, TFR proxy status, and migration conservation where applicable.
4. Distinguish effective fictional period from publication timestamp and revision date.
5. Document historical comparability breaks and why older releases cannot be joined naively.

## Source registry and reproducibility

`{{SOURCE_REGISTRY}}`

## Glossary and citations

`{{INDICATOR_GLOSSARY}}`

### Reference systems (methods only)

- UN DESA World Population Prospects 2024: revisions, separate estimates/projections, census and vital-data provenance, cohorts and assumptions.
- Trading Economics API: stable series symbol, country, category, frequency, period, value and last-update metadata.

**Status:** Internal methodology; publish **a separately authored indicator bulletin** under `content/statistics/`.
