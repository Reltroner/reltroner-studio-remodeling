---
title: "Kalgered Year 0 Consumption — Statistical Release, Sources and Glossary (NCCM V6.5)"
description: "Internal reusable reference implementation for a fictional statistical bulletin with creator-adopted daily spending brackets, transparent in-universe model provenance, denominators and limitations."
author: "Reltroner Studio"
date: "2026-10-31"
lastUpdated: "2026-10-31"
published: false
visibility: internal
epistemicClassification: CREATIVE_FRAMEWORK
canonStatus: "C — fictional modeled category shares and boundaries; no empirical household survey"
category: "Worldbuilding · Statistical Methodology"
tags: ["Kalgered", "NCCM V6.5", "Data-Driven Worldbuilding", "Methodology"]
---

# Kalgered — Daily Private Expenditure, Year 0

**Statistical release:** NCCM V6.5 · **Country:** Kalgered · **Reference period:** Year 0 (Asthortera timeline) · **Frequency:** cross-sectional model (spending denominated KAL per person per day) · **Currency:** KAL · **Release:** 2026-10-31 · **Evidence:** C = creator-ratified *fictional statistical model*, not independent empirical household-census observations.

## Current Canon C series

| Daily resident private-expenditure class | Modeled share of residents | Derived residents |
|---|---:|---:|
| KAL 0–999.99 | **2%** | **2.16 billion** |
| KAL 1,000–4,999.99 | **18%** | **19.44 billion** |
| KAL 5,000–19,999.99 | **45%** | **48.60 billion** |
| KAL 20,000–59,999.99 | **30%** | **32.40 billion** |
| KAL 60,000+ | **5%** | **5.40 billion** |
| **Total** | **100%** | **108.00 billion** |

**Exactly what was ratified:** Option C's *five category shares and daily spending ranges*; their population counts are deterministically derived using the existing 108B residents. They are not an individual-income distribution; the labels denote expenditure levels, not dignity, rights, employment or wealth status. Minimum/maximum boundaries are **category definitions**, not actual observed minimum or maximum spending.

**What remains a scenario:** The inherited representative points KAL 500 / 3,000 / 12,000 / 37,000 / 120,000 give a *hypothetical* population-weighted mean **KAL 23,050 per person per day**, **not** a surveyed or creator-ratified national mean. Actual within-band means, sample size, uncertainty, age/species detail and household microdata remain **unassigned**. A 5% top bracket does not cap spending at KAL 120,000.

**Macroeconomic guardrails:** Kalgered SDI **0.979**, income Gini **0.210**, Year 0 nominal GDP (Model B) **USD 3.164530663053e+21**, GDP/GNI bridge and KAL exchange quotation remain separate indicators. **GDP/GNI per person is not disposable household income**, and spending categories cannot be used to recompute income Gini or GDP without an expenditure-account model.

## Where does this fictional census data come from?

| Evidence field | Actual source inside Reltroner Studio | Meaning and limitations |
|---|---|---|
| Resident population denominator (108B) | [NCCM V6.5 canonical national ledger](../../data/asthortera/nccm-v6-active-cross-domain.json), Kalgered entry | Creator-approved worldbuilding population baseline; not a real census conducted on Asthortera |
| Five expenditure class shares and boundaries | [Year 0 consumption release](../../data/asthortera/kalgered-consumption-v65.json) | Creator-selected option C, model inputs classed **C** |
| Derived persons in each class | Population × adopted class share | Algebraic model result, **D**, not a count from enumerators |
| Scenario reference spending values / derived mean | [Original exploratory candidate](../../data/asthortera/kalgered-remodeling-candidate-v1.json) + [current model](../../data/asthortera/kalgered-consumption-v65.json) | Illustrative within-band inputs, **S**, not empirical data |
| Income Gini, SDI, GDP, GDP growth | Current [V6.5 national ledger](../../data/asthortera/nccm-v6-active-cross-domain.json) | Other independently adopted *fictional national model* indicators; do not derive from these bands |
| Earlier 99% tally, old denominators and version history | [Kalgered historical statistical log](./kalgered-remodeling-history-log.md) | Archival-only, **A**; does not represent current Year 0 C |
| Actual sampling frame, microdata or observed uncertainty | **Not available** | `null` / not measured; no invented official survey agency |

The **fictional author/creator's ratification**, not a real-world statistics office, is the authoritative input. No imaginary government census bureau, field survey, primary questionnaire, ministry survey or external dataset is claimed as real evidence.

## Glossary — reference implementation for all Reltroner Studio releases

| Term | Definition |
|---|---|
| **NCCM** | Narrative-Constrained Civilizational Modeling, the versioned rule system connecting fictional canon and deterministic accounting |
| **Canon C** | Creator-ratified fictional input or modeled output; accepted for Asthortera Year 0, **not** proof of empirical measurement |
| **Derived D** | Value calculated from ratified inputs by a documented formula; e.g. 108B × 0.18 = 19.44B |
| **Scenario S** | Hypothetical input for analysis, not independently ratified or observed; e.g. representative within-band expenditure |
| **Archive A** | Superseded historical model/claim, retained for reproducibility but never reported as current |
| **Missing / null** | No assigned value; not the number zero, and not evidence that an event or group does not exist |
| **Reference period / vintage** | Fictional Year 0 observation target versus the real-world publication/revision date of the model |
| **Population denominator** | All 108B fictional Kalgered residents, not only employed adults, households, taxpayers or income earners |
| **Primary ancestry** | Mutually exclusive classification of each sentient once; inclusive lineage is a different overlapping register |
| **Expenditure bracket** | A daily spending interval in KAL per resident; not a quintile, social rights category or salary tier |
| **Representative spending** | Illustrative model value chosen inside a class; a class range does not determine its actual mean |
| **Income Gini** | Income inequality metric; cannot be inferred from five private-expenditure classes |
| **GDP vs GNI** | GDP represents production value added (+ net product taxes); GNI = GDP + net foreign primary income, modeled with a zero bridge here |
| **SDI** | Sentient Development Index, combining individual capability and institutional quality; not an income-only ranking |
| **Internal migration** | Movement between Asthorteran countries, not growth in planetary residents |
| **Statistical revision** | New model release changing classifications or assumptions while preserving prior versions in historical records |

## Methodology and verification contract

1. Read the machine record from `data/asthortera/kalgered-consumption-v65.json` and reference population from the NCCM V6.5 ledger.
2. Assert exactly five **nonoverlapping** KAL/day bands, final bracket open-ended, all shares in [0,1], and sum = 1.000000.
3. Multiply shares by 108 billion; derived group populations must sum back to 108 billion without population creation.
4. Keep **income Gini 0.210** and other Kalgered national canon anchors unchanged; do not derive income statistics from consumption without additional data.
5. Display `null` for measured means, sample counts, time series, species-specific data and uncertainty when not assigned.
6. Treat archived 1/30/45/18/5 = 99% exclusively as **historical A**; never join its rows with the active C denominator.
7. Every future update must specify source path, model vintage, reference period, statistical unit, methodology status and which canon facts have been expressly ratified.

## Real-world methodology references (inspiration only; not Asthortera data)

**[UN DESA — World Population Prospects 2024](https://population.un.org/wpp/):** the UN distinguishes population *estimates* and *projections*, documents source census/vital statistics/survey evidence, and publishes successive methodology revisions. Asthortera's NCCM uses this release-discipline as a **worldbuilding analogy** but does **not** reproduce UN cohort-component empirical methods or claims of United Nations affiliation.

**[Trading Economics — Historical Indicators Documentation](https://docs.tradingeconomics.com/indicators/historical/):** indicator series identify country, category, date/frequency and update metadata. Reltroner Studio follows the **metadata/traceability concept**, not its proprietary datasets, branding or official-source credentials.

**Editorial principle:** This is **fictional data-driven worldbuilding with explicit epistemic labels**. A canonized invented number is valuable for narrative consistency, while statistical validity requires honest disclosure of the generating assumptions and missing evidence.
