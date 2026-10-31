import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const release=JSON.parse(read('data/asthortera/kalgered-consumption-v65.json'));
const bullet='content/statistics/kalgered-consumption-v65.md';
const old=['kalgered-consumption-methodology-v65.md','kalgered-remodeling-history-log.md'];
test('Remodeling statistical method and historical log are private, reusable and not present in public statistics folder',()=>{
 for(const slug of old){
  assert.ok(!exists('content/statistics/'+slug),'Public statistics must not store '+slug);
  const p='content/remodeling/'+slug;
  assert.ok(exists(p),p);
  assert.match(read(p),/^published: false$/m);
  assert.match(read(p),/^visibility: internal$/m);
 }
 for(const p of ['content/remodeling/templates/statistical-release-methodology.template.md','content/remodeling/templates/remodeling-history-log.template.md','content/remodeling/README.md','docs/cms/statistical-publishing-architecture-v1.md'])assert.ok(exists(p),p);
});
test('Public Kalgered bulletin contains canonical C values and stable route alias only',()=>{
 const pub=read(bullet);
 assert.match(pub,/^published: true$/m);
 assert.match(pub,/^epistemicClassification: FICTION_CANON$/m);
 assert.match(pub,/^aliases: \[kalgered-consumption-methodology-v65\]$/m);
 assert.match(pub,/fictional/i);
 assert.ok(pub.includes('108.00 billion'));
 const rows=[['KAL 0–999.99','2%','2.16 billion'],['KAL 1,000–4,999.99','18%','19.44 billion'],['KAL 5,000–19,999.99','45%','48.60 billion'],['KAL 20,000–59,999.99','30%','32.40 billion'],['KAL 60,000+','5%','5.40 billion']];
 rows.forEach(([unit,rate,pop],i)=>{
  assert.equal(release.bands[i].population_share,parseFloat(rate)/100);
  assert.equal(release.bands[i].population_billion.toFixed(2)+' billion',pop);
  assert.ok(pub.includes(unit),unit);
  assert.ok(pub.includes('**'+rate+'**'),rate);
  assert.ok(pub.includes(pop),pop);
 });
 const profile=read('content/factions/kalgered.md');
 assert.ok(profile.includes('../statistics/kalgered-consumption-v65.md'));
 assert.ok(!profile.includes('kalgered-remodeling-history-log.md'));
 assert.ok(!profile.includes('kalgered-consumption-methodology-v65.md'));
});
test('Structured source pointers use internal remodeling paths; no stale relocated source identifiers',()=>{
 const data=JSON.parse(read('data/asthortera/nccm-v6-active-cross-domain.json'));
 const oldPaths=old.map(p=>'content/statistics/'+p);
 for(const p of ['data/asthortera/kalgered-consumption-v65.json','data/asthortera/nccm-v6-active-cross-domain.json','data/asthortera/kalgered-remodeling-candidate-v1.json','docs/nccm-v65-open-modeling-decisions.md','tools/audit-asthortera-cross-domain.mjs']){
  const s=read(p);
  oldPaths.forEach(stale=>assert.ok(!s.includes(stale),'Stale source in '+p+': '+stale));
 }
 assert.equal(release.methodology,'content/remodeling/kalgered-consumption-methodology-v65.md');
 assert.equal(release.historical_provenance,'content/remodeling/kalgered-remodeling-history-log.md');
 assert.equal(data.kalgered_year0_private_consumption.historical_log,'content/remodeling/kalgered-remodeling-history-log.md');
});
