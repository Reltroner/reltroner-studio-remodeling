# Content architecture — Reltroner Studio Remodeling

This directory contains source articles, not the numeric canon ledger. These collection catalogs improve navigation **without moving or rewriting existing content**.

## Collections

| Collection | Purpose | Source documents |
|---|---|---:|
| [Blog](blog/README.md) | Essays, reflections, and publishing notes | 84 |
| [Characters](characters/README.md) | Character profiles and narrative agents | 25 |
| [Cultures](cultures/README.md) | Languages, customs, arts, and social practices | 28 |
| [Events](events/README.md) | Timelines, historical events, and incidents | 30 |
| [Factions](factions/README.md) | Nations, institutions, and civilization profiles | 26 |
| [Items](items/README.md) | Artifacts, objects, and story-world resources | 4 |
| [Laws](laws/README.md) | Legal frameworks, regulations, and civic rules | 33 |
| [Music](music/README.md) | Musical concepts and compositions | 30 |
| [Myths](myths/README.md) | Legends, beliefs, and mythological narratives | 16 |
| [Organizations](organizations/README.md) | Institutions and enterprises | 20 |
| [Philosophies](philosophies/README.md) | Civilizational ideas and interpretive frameworks | 27 |
| [Places](places/README.md) | Geography, cities, and spatial worldbuilding | 34 |
| [Principles](principles/README.md) | Governance rules and thematic world principles | 32 |
| [Remodeling (internal)](remodeling/README.md) | Drafting methodology, revision records, and templates | 6 |
| [Research](research/README.md) | Exploratory reference studies | 2 |
| [Series](series/README.md) | Narrative series and publishing roadmaps | 6 |
| [Statistics](statistics/README.md) | World and national statistical references | 27 |
| [Technologies](technologies/README.md) | Fictional technologies and technical systems | 14 |
| [Video](video/README.md) | Video-related editorial content | 1 |

## Canonical Asthortera entry points

- [19 national profiles](factions/README.md) — profiles identified from the active 19-country ledger.
- [Asthortera statistics](statistics/README.md) — current references with historical and supporting studies separated.
- [History and events](events/README.md) — chronology and event documentation.
- [Cross-domain statistical reference](statistics/asthortera-nccm-v6-active-cross-domain.md) — explanatory Year 0 canon report.
- [Machine-readable canon ledger](../data/asthortera/nccm-v6-active-cross-domain.json) — source of numeric values, outside the content collection.
- [Remodeling internal policy](remodeling/README.md) — source records not intended for direct publication.

## Editorial boundaries

1. Keep all existing content paths, slugs, headings, frontmatter, and generated national-profile blocks unchanged unless a separately validated migration authorizes the difference.
2. Nation and planetary numerical facts come from the active ledger; a navigational index never creates or revises canon.
3. Separate current Canon C references from historical or exploratory material. A catalog listing is not publication approval.
4. Do not move internal remodeling methods into a public statistics collection.
5. Use deterministic indexing from files and ledger source pointers. Check for catalog drift in CI.

## Existing unclassified source

The standalone draft at [unwritten-ideas.md](unwritten-ideas.md) remains at its original path for link compatibility. It is not a canonical statistical source.

## Maintain these catalogs

Run `npm run content:catalog:check` to verify navigation or `npm run content:catalog:write` to regenerate only README catalogs. Both leave the canonical datasets and existing articles intact.

