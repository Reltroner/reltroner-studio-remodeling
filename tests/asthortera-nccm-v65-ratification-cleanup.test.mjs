import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const m=JSON.parse(read('data/asthortera/nccm-v6-active-cross-domain.json'));
test('KRF and MWV are sole active codes in law, country profiles, report and ledger',()=>{
 assert.equal(m.countries_5.find(c=>c.name==='Krisberia').fx.code,'KRF');
 assert.equal(m.countries_5.find(c=>c.name==='Mapether').fx.code,'MWV');
 assert.equal(m.provenance.current_currency_codes.Krisberia,'KRF');
 assert.equal(m.provenance.current_currency_codes.Mapether,'MWV');
 assert.ok(!m.open_issues.some(x=>x.code==='FX_LOCAL_CODE_CROSSWALK'));
 for(const p of ['content/laws/alreo.md','content/factions/krisberia.md','content/factions/mapether.md','content/statistics/asthortera-nccm-v6-active-cross-domain.md'])assert.doesNotMatch(read(p),/\b(?:KRB|MPT)\b/,p);
 assert.match(read('content/laws/alreo.md'),/75 MWV\/hour/);
 assert.match(read('content/laws/alreo.md'),/78 KRF\/hour/);
});
test('Published planetary census follows six-class and 14+5+18 Canon C',()=>{
 const s=read('content/statistics/sentient-population.md');
 for(const v of ['47.511618%','19.859641%','16.210462%','11.352281%','2.221411%','2.844586%','3,213 billion','395 billion','804 billion'])assert.ok(s.includes(v),v);
 assert.doesNotMatch(s,/58% Humans of Depeisit|23 hold 1\.124 trillion/);
});
test('Old dev papers are archives and empty stub files are deleted',()=>{
 for(const p of ['content/blog/how-i-built-249k-startup-idea.md','content/statistics/sdi-character.md'])assert.ok(!fs.existsSync(path.join(root,p)),p);
 for(const p of ['content/statistics/asthortera-nccm-remodeling.md','content/statistics/asthortera-phantomkind-demography-v4.md','content/statistics/asthortera-37-country-lineage-and-kalgered-remodeling.md'])assert.match(read(p),/ARCHIVED — V[234]/);
});
test('Kalgered spending is separately ratified while sector accounts remain proposals',()=>{
 const s=read('docs/nccm-v65-open-modeling-decisions.md');
 for(const t of ['NONCANONICAL','RATIFIED CANON C','NOT RATIFIED','gross output − intermediate consumption'])assert.ok(s.includes(t),t);
 assert.match(read('content/statistics/kalgered-remodeling-history-log.md'),/99% classified/);
 assert.doesNotMatch(read('content/factions/kalgered.md'),/ARCHIVED UNRECONCILED 99%|NCCM V3 — Cross-Domain Benchmark/);
 for(const c of m.countries_5)assert.equal(c.sectors_value_added_pct.reduce((n,x)=>n+x.share,0),100);
 assert.equal(m.planet.year0.tfr,1.63);assert.equal(m.planet.year0.real_gdp_growth,.04);
});
