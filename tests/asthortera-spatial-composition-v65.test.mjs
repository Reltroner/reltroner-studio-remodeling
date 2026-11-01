import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {renderNational,patchNational} from '../tools/asthortera-canon-profile-renderer.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(path.join(root,p),'utf8');
const m=JSON.parse(read('data/asthortera/nccm-v6-active-cross-domain.json'));
const countries=[...m.countries_14,...m.countries_5];
test('19-state spatial C surface and resident matrices sum to 100 independently',()=>{
 assert.equal(countries.length,19);
 assert.equal(m.spatial_volumetric_canon.status,'C_creator_ratified_2026-11-01');
 for(const c of countries){
  const s=c.spatial_3d_canon;
  assert.equal(s.status,'C_creator_ratified_2026-11-01',c.name);
  assert.equal(Object.values(s.land_surface_pct).reduce((a,b)=>a+b),100,c.name);
  assert.equal(Object.values(s.principal_habitat_pct).reduce((a,b)=>a+b),100,c.name);
  assert.ok(Math.abs(Object.values(s.principal_habitat_pct).reduce((a,b)=>a+c.population_billion*b/100,0)-c.population_billion)<1e-8);
  assert.equal(s.constructed_volume_km3,null);
  assert.equal(s.habitable_volume_km3,null);
  const page=read(c.source);
  assert.match(page,/### NCCM V6\.5 — Spatial 3D composition \(Canon C, Year 0\)/);
  assert.equal(patchNational(page,c,m),page,'Generator drift '+c.name);
  assert.ok(page.includes(renderNational(c,m)),'Renderer full block '+c.name);
 }
});
test('Geographical area lock and residual 18 census remain intact',()=>{
 const lock={Beluftner:363,Calespia:120,Ethaptoria:110,Mapether:91,Scenrepolia:null,Krisberia:null};
 for(const [n,a] of Object.entries(lock))assert.equal(countries.find(c=>c.name===n).land_area_million_km2,a,n);
 assert.equal(countries.reduce((a,c)=>a+(c.land_area_million_km2||0),0),2497);
 assert.equal(m.spatial_volumetric_canon.unallocated_terrestrial_envelope_million_km2,2006);
 assert.equal(countries.reduce((a,c)=>a+c.population_billion,0),3608);
 assert.equal(m.planet.population_billion,4412);
 assert.equal(m.aggregate_remaining_18.population_billion,804);
});
test('Hargenbor 42% underwater does not imply 36km civilian residential rights',()=>{
 const h=countries.find(c=>c.name==='Hargenbor');
 assert.equal(h.spatial_3d_canon.principal_habitat_pct.underwater,42);
 assert.equal(h.population_billion*.42,55.86);
 assert.equal(h.maritime_spatial_canon.civilian_public_underwater_urban_z_min_m,-1000);
 assert.equal(h.maritime_spatial_canon.deepest_maritime_sovereignty_z_m,-36000);
 assert.equal(h.spatial_3d_canon.marine_vertical_resident_distribution,null);
 assert.match(read(h.source),/55\.86 billion derived/);
});
test('Release metadata and source methodology are separated from archive',()=>{
 assert.match(read('content/statistics/asthortera-nccm-v65-spatial-composition.md'),/published: true/);
 assert.match(read('content/remodeling/asthortera-volumetric-spatial-methodology-v65.md'),/published: false/);
 assert.match(read('content/remodeling/asthortera-spatial-canon-2026-11-01.md'),/Expanded 3D spatial Canon C/);
 assert.match(read('content/statistics/asthortera-nccm-v65-spatial-composition.md'),/Hargenbor \| 133 \| 46% \| 8% \| 42% \| 4%/);
});
