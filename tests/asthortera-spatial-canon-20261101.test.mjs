import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const v=JSON.parse(read('data/asthortera/nccm-v6-active-cross-domain.json'));
const all=[...v.countries_14,...v.countries_5];
const nation=n=>all.find(c=>c.name===n);
test('Creator-ratified terrestrial footprints supersede old Beluftner and three unassigned Eastern areas',()=>{
 for(const [n,a] of Object.entries({Beluftner:363,Calespia:120,Ethaptoria:110,Mapether:91})){
  assert.equal(nation(n)?.land_area_million_km2,a,n);
  assert.equal(nation(n).canon_status,'C');
  assert.match(read(nation(n).source),new RegExp('\\| Land area \\| \\*\\*'+a+' million km²\\*\\*'));
 }
 assert.equal(nation('Scenrepolia').land_area_million_km2,null);
 assert.equal(nation('Krisberia').land_area_million_km2,null);
 assert.equal(v.planet.land_area_million_km2,4503);
 assert.equal(v.countries_14.reduce((s,c)=>s+c.land_area_million_km2,0),2176);
 assert.equal(v.countries_5.reduce((s,c)=>s+(c.land_area_million_km2||0),0),321);
});
test('Hargenbor civic urban underwater ends at one kilometer; sovereign ocean extends to 36 km',()=>{
 const h=nation('Hargenbor');const s=h.maritime_spatial_canon;
 assert.equal(s.status,'C_creator_ratified_2026-11-01');
 assert.equal(s.civilian_public_underwater_urban_z_min_m,-1000);
 assert.equal(s.civilian_public_underwater_urban_z_max_m,0);
 assert.equal(s.deepest_maritime_sovereignty_z_m,-36000);
 assert.equal(s.civilian_underwater_population_pct,null);
 assert.match(read(h.source),/−1,000 m/);
 assert.match(read(h.source),/−36,000 m/);
 assert.match(read(h.source),/−36 km/);
});
test('Historical area is recorded as superseded, not rewritten in earlier census dataset',()=>{
 const history=JSON.parse(read('data/asthortera/national-cross-domain-audit-2026-10-30.json'));
 const old=history.countries.find(x=>x.name==='Beluftner');
 assert.equal(old.census.land_area_million_km2,88);
 assert.equal(v.provenance.spatial_national_area_ratification_2026_11_01.amendments.Beluftner.current,363);
 assert.match(read('content/remodeling/asthortera-spatial-canon-2026-11-01.md'),/published: false/);
});
