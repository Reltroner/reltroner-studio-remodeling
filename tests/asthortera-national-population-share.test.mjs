import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const m=JSON.parse(read('data/asthortera/nccm-v6-active-cross-domain.json'));
const countries=[...m.countries_14,...m.countries_5];
const ratified=[
 ['Reltronland',855],['Depcutland',343],['Kalgered',108],['Aurastelia',164],
 ['Astrostelia',185],['Lenternow',174],['Taramistry',242],['Moreg',205],
 ['Pencilfania',182],['Stelpadland',141],['Pasgerflit',279],['Hargenbor',133],
 ['Beluftner',91],['Cenrestier',111],['Scenrepolia',88],['Krisberia',58],
 ['Mapether',74],['Ethaptoria',84],['Calespia',91]
];
test('Year 0 19-country resident counts remain unchanged, with 18-state residual conserved',()=>{
 assert.equal(m.planet.population_billion,4412);
 assert.deepEqual(countries.map(c=>[c.name,c.population_billion]),ratified);
 assert.equal(countries.reduce((a,c)=>a+c.population_billion,0),3608);
 assert.equal(m.aggregate_remaining_18.population_billion,804);
 assert.equal(3608+804,4412);
 assert.equal(m.migration_year0.ratification_status,'archived_statistical_reconciliation_only_not_a_canon_migration_event');
});
test('Every national profile exposes the exact computed planet resident share, independently from GDP share',()=>{
 const identity=read('content/statistics/asthortera_identity.md');
 const seen=new Set();
 for(const c of countries){
  const expected=(100*c.population_billion/4412).toFixed(4)+'%';
  const profile=read(c.source);
  const row="| Share of Asthortera's 4,412B residents | **"+expected+"** |";
  assert.ok(profile.includes(row),c.name+': national resident percentage mismatch');
  assert.ok(profile.includes('share of planetary residents **'+expected+'**'),c.name+': summary gate mismatch');
  assert.ok(identity.includes('| '+c.name+' | '+c.population_billion+' | '+expected+' |'),c.name+': planetary identity not synchronized');
  assert.ok(!seen.has(c.name),c.name+' duplicate');seen.add(c.name);
  assert.doesNotMatch(profile,/Year 0 internal migration provenance|seven ratified Astrostelia–Lenternow redistribution routes|The 75B internal movement|NCCM V6\.2 migration-adjusted national anchors/);
 }
 assert.equal(seen.size,19);
 assert.ok(identity.includes('| **Residual 18 — one aggregate only** | **804** | **18.2230%** |'));
 assert.equal((100*3608/4412).toFixed(4),'81.7770');
 assert.equal((100*804/4412).toFixed(4),'18.2230');
 assert.equal((3608+804)/4412,1);
});
test('No invented 75B transfer event remains in the public national and planetary presentation documents',()=>{
 const docs=['content/statistics/asthortera_identity.md','content/statistics/asthortera-vs-earth.md','content/statistics/asthortera-nccm-v6-active-cross-domain.md','content/philosophies/why-immigrants-choose-asthortera.md',...countries.map(c=>c.source)];
 for(const p of docs){
  const s=read(p);
  assert.doesNotMatch(s,/75B internal (movement|migration)|75 billion people.*Astrostelia|Seven ratified internal routes|Source populations Astrostelia \(220B→185B\)|Internal Year 0 transfer|Exact internal migration routes|Year 0 internal migration provenance/i,p);
 }
});
