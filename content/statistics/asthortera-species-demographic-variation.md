---
title: "ASDVM V1.0 — Species Demographic Variation Overlay"
description: "Country-anchored proposed deviations in SDI, TFR, life expectancy, economic outcomes and reproductive timing."
author: "Reltroner Studio"
date: "2026-11-17"
published: true
---

# ASDVM V1.0 — Species Demographic Variation Overlay
**ID:** AST-SDV-001 | **Status:** Proposed factors (P), not NCCM Canon C.

## 1. Fixed numerical authority
[NCCM V6.5](./asthortera-nccm-v6-active-cross-domain.md): planet **4,412 billion**, SDI **0.947**, period life expectancy **475 years**, TFR **1.63**; primary groups Depeisit **47.511618%**, Cistheta **19.859641%**, Cosmeilian **16.210462%**, Native **11.352281%**, Phantomkind/Spiritual Hybrid **2.221411%**, Other **2.844586%** approximately. If rounding differs, the [ledger](../../data/asthortera/nccm-v6-active-cross-domain.json) wins.

**Creator direction:** species-associated group means typically differ by **−10% to +10%**. Depeisit and Cistheta have small comparative advantages for individual development, economy, education, leadership and communication; Cosmeilian fertility is highest; Phantomkind life expectancy highest; Native has Depeisit/Cistheta baseline longevity; Other begins reproduction earlier, has relatively higher TFR but lower other indices. National institutions and individual variability matter enormously.

## 2. Proposed relative factors (P)
These are **relative percentages**, not SDI-point differences.

| Primary group | Individual SDI | Life exp. | TFR | Reproductive onset |
| --- | ---: | ---: | ---: | ---: |
| Depeisit | +0.3% | 0% | 0% | 0% |
| Cistheta | +0.5% | 0% | 0% | 0% |
| Cosmeilian | 0% | 0% | **+9%** | 0% |
| Native Asthorteran | 0% | 0% | 0% | 0% |
| Phantomkind/Spiritual Hybrid* | 0% | **+9%** | 0% | 0% |
| Other (composite) | −3% | −6% | +6% | −6% |

| Group | Economy | Education | Leadership | Communication |
| --- | ---: | ---: | ---: | ---: |
| Depeisit | +4% | +4% | +5% | +4% |
| Cistheta | +5% | +5% | +4% | +5% |
| Cosmeilian | 0% | 0% | 0% | 0% |
| Native Asthorteran | 0% | 0% | 0% | 0% |
| Phantomkind/Spiritual Hybrid* | 0% | 0% | 0% | 0% |
| Other | −6% | −6% | −6% | −6% |

*The current composite census class does not provide separate pure-Phantomkind measurements; +9% is a temporary modeling proxy, not a finding about all hybrids. The Other class is likewise heterogeneous.*

## 3. Country-preserving **linear indicator** overlay
For a baseline B(country, indicator), exclusive group share w(country, group), and proposed fractional effect d(group, indicator):

- factor = 1 + d
- normalizer = SUM(w × factor)
- scenario_outcome = B × factor / normalizer

For linear measurable averages this reconciles weighted scenario values back to national B. **Do not use it as a scientific life-table or TFR calculation**: actual TFR depends on age-specific eligible cohorts, and life expectancy on a mortality/survival schedule. These need independent cohort equations plus reconciliation to national canon.

National values such as Reltronland SDI **0.984**, life expectancy **498 years** and TFR **1.15** do not change. For SDI, proposed adjustment applies at most to the **individual component**, not to national institutional effectiveness; validate that computed SDI components remain 0–1.

## 4. Reproduction, measurement and uncertainty
Distinguish onset_age, end_age, reproductive_eligible_population, age_specific_birth_rate and new_sentient_birth_count. **No absolute reproductive age has been creator-ratified.** The earlier '60 years baseline → Other 56.4 years' is a **math illustration only**. Earlier onset alone does not causally produce greater TFR. Cosmeilian and Phantomkind biology may require other-than-mammalian definitions of reproduction.

Statistical fields: group_id, country_id, active_nccm_population_share, indicator, relative_coefficient, method, version, evidence_status, uncertainty, denominator and reconciliation_result. Species is not a job assignment, social rank or legal-rights class.

## 5. Release gate
Require cohort/denominator and current national source for any real observation. Reject invented counts, primary ancestry double counting, new national rates from old simulations, hybrid-as-pure-Phantomkind inference and biological determinism. See [life-course rules](./asthortera-cosmeilian-phantomkind-life-course.md) and [national civic identity](../principles/asthortera-nationality-centered-citizenship.md).
