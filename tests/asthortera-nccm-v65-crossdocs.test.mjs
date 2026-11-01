import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {verify,render,patch} from '../tools/sync-asthortera-nccm-crossdocs.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const m=JSON.parse(fs.readFileSync(path.join(root,'data/asthortera/nccm-v6-active-cross-domain.json'),'utf8'));
const files=[['identity','content/statistics/asthortera_identity.md'],['comparison','content/statistics/asthortera-vs-earth.md'],['immigration','content/philosophies/why-immigrants-choose-asthortera.md']];
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('NCCM V6.5 Canon C planetary population, migration, TFR and real GDP weighted closure',()=>{assert.doesNotThrow(()=>verify(m));assert.equal(m.planet.population_billion,4412);assert.equal(m.canon_ratification.status,'C');});
test('All three crossdocs are ledger-generated, single-marker and idempotent',()=>{for(const [kind,p] of files){const s=read(p);assert.equal(s.split('<!-- BEGIN NCCM_V65_PLANETARY_CROSSDOC -->').length,2,p);assert.ok(s.includes(render(m,kind==='immigration'?'short':'full')),p);assert.equal(patch(kind,s,m),s,'Drift '+p);}});
test('Six-way ancestry and current 3213+395+804 and residual18 govern all documents',()=>{for(const [,p]of files){const s=read(p);for(const n of ['47.511618%','19.859641%','16.210462%','11.352281%','2.221411%','2.844586%','3,213B','395B','804B','1.63','4.00%'])assert.ok(s.includes(n),p+': '+n);assert.doesNotMatch(s,/58% Humans of Depeisit planetary descent|the 23 not yet represented in the 14-country audit account/,p);}});
test('Both planetary statistical references do not still claim candidate TFR 1.70 for Year 0',()=>{for(const [,p]of files.slice(0,2)){const s=read(p);assert.doesNotMatch(s,/~1\.70 at Year 0/);assert.match(s,/1\.63 at Year 0 \(NCCM V6\.5 canon C\)/);}});
test('Migration philosophy distinguishes narrative comparisons from archived balancing mechanisms',()=>{const s=read(files[2][1]);assert.match(s,/comparative narrative overview of four named worlds/);assert.match(s,/does \*\*not\*\* establish an independently measured galaxy-wide SDI ranking/);assert.doesNotMatch(s,/\*\*Internal Year 0 transfer:|75B moved from Astrostelia|Seven ratified internal routes/);assert.match(s,/five profiled Eastern nations.*whole-population ancestry/);});

test('Countrywide ancestry overview distinguishes the fourteen assigned national censuses from five unassigned nations',()=>{
 const keys=['depeisit','cistheta','cosmeilian','native','phantomkind','other'];
 const nation14=m.countries_14;
 const denom=nation14.reduce((s,c)=>s+c.population_billion,0);
 assert.equal(denom,3213);
 const counts=keys.map(k=>nation14.reduce((s,c)=>s+c.population_billion*c.ancestry_primary_pct[k]/100,0));
 assert.ok(Math.abs(counts.reduce((a,b)=>a+b,0)-3213)<1e-9);
 for(const [,p] of files.slice(0,2)){
  const doc=read(p);
  assert.match(doc,/Year 0 national six-class primary ancestry — 19-country coverage/);
  assert.match(doc,/Current 14-country weighted composition — recalculated from 3,213B residents/);
  for(const c of m.countries_5)assert.ok(doc.includes('| '+c.name+' | '+c.population_billion+' | — | — | — | — | — | — | Unassigned (not zero) |'),c.name);
  assert.ok(doc.includes('| Reltronland | 855 | 64% | 22% | 4% | 5% | 2% | 3% | Canon C |'));
  assert.ok(doc.includes('| Depeisit | 1549.032 | 48.211391% |'));
  assert.ok(doc.includes('| Cosmeilian | 495.400 | 15.418612% |'));
  assert.doesNotMatch(doc,/Seven ratified internal routes|75B internal movement|moving 75B/);
 }
});
