#!/usr/bin/env node
/**
 * Regenerate path-based navigation only. No article/frontmatter/model writes.
 * Existing source slugs, markdown bodies, and national Canon C data remain untouched.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const meta={
  "blog": [
    "Blog",
    "Essays, reflections, and publishing notes"
  ],
  "characters": [
    "Characters",
    "Character profiles and narrative agents"
  ],
  "cultures": [
    "Cultures",
    "Languages, customs, arts, and social practices"
  ],
  "events": [
    "Events",
    "Timelines, historical events, and incidents"
  ],
  "factions": [
    "Factions",
    "Nations, institutions, and civilization profiles"
  ],
  "items": [
    "Items",
    "Artifacts, objects, and story-world resources"
  ],
  "laws": [
    "Laws",
    "Legal frameworks, regulations, and civic rules"
  ],
  "music": [
    "Music",
    "Musical concepts and compositions"
  ],
  "myths": [
    "Myths",
    "Legends, beliefs, and mythological narratives"
  ],
  "organizations": [
    "Organizations",
    "Institutions and enterprises"
  ],
  "philosophies": [
    "Philosophies",
    "Civilizational ideas and interpretive frameworks"
  ],
  "places": [
    "Places",
    "Geography, cities, and spatial worldbuilding"
  ],
  "principles": [
    "Principles",
    "Governance rules and thematic world principles"
  ],
  "remodeling": [
    "Remodeling (internal)",
    "Drafting methodology, revision records, and templates"
  ],
  "research": [
    "Research",
    "Exploratory reference studies"
  ],
  "series": [
    "Series",
    "Narrative series and publishing roadmaps"
  ],
  "statistics": [
    "Statistics",
    "World and national statistical references"
  ],
  "technologies": [
    "Technologies",
    "Fictional technologies and technical systems"
  ],
  "video": [
    "Video",
    "Video-related editorial content"
  ]
};
const keyStats=["asthortera-nccm-v6-active-cross-domain.md","asthortera-nccm-v65-spatial-composition.md","asthortera-vs-earth.md","asthortera_identity.md","kalgered-consumption-v65.md","sdi-report-asthortera.md","sentient-population.md"];
const cats=Object.keys(meta).sort();
const items=c=>{
  const results=[];
  function scan(dir,rel=''){
    for(const e of fs.readdirSync(dir,{withFileTypes:true})){
      const name=rel?rel+'/'+e.name:e.name;
      if(e.isDirectory())scan(path.join(dir,e.name),name);
      else if(e.isFile()&&e.name.endsWith('.md')&&e.name!=='README.md')results.push(name);
    }
  }
  scan(path.join(root,'content',c));
  return results.sort();
};
const ledger=JSON.parse(fs.readFileSync(path.join(root,'data/asthortera/nccm-v6-active-cross-domain.json'),'utf8'));
const nationNames=[...ledger.countries_14,...ledger.countries_5]
  .map(c=>({name:c.name,filename:c.source.split('/').pop()}))
  .sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);
if(nationNames.length!==19||new Set(nationNames.map(n=>n.filename)).size!==19||
   [...ledger.countries_14,...ledger.countries_5].some(c=>!c.source.startsWith('content/factions/'))){
  throw Error('Exactly 19 unique nation profiles in factions are required');
}
function renderCatalogs(){
  const docs=new Map();
  const lead=['# Content architecture — Reltroner Studio Remodeling','','This directory contains source articles, not the numeric canon ledger. These collection catalogs improve navigation **without moving or rewriting existing content**.','','## Collections','','| Collection | Purpose | Source documents |','|---|---|---:|'];
  for(const c of cats)lead.push('| ['+meta[c][0]+']('+c+'/README.md) | '+meta[c][1]+' | '+items(c).length+' |');
  lead.push('','## Canonical Asthortera entry points','','- [19 national profiles](factions/README.md) — profiles identified from the active 19-country ledger.','- [Asthortera statistics](statistics/README.md) — current references with historical and supporting studies separated.','- [History and events](events/README.md) — chronology and event documentation.','- [Cross-domain statistical reference](statistics/asthortera-nccm-v6-active-cross-domain.md) — explanatory Year 0 canon report.','- [Machine-readable canon ledger](../data/asthortera/nccm-v6-active-cross-domain.json) — source of numeric values, outside the content collection.','- [Remodeling internal policy](remodeling/README.md) — source records not intended for direct publication.','','## Editorial boundaries','','1. Keep all existing content paths, slugs, headings, frontmatter, and generated national-profile blocks unchanged unless a separately validated migration authorizes the difference.','2. Nation and planetary numerical facts come from the active ledger; a navigational index never creates or revises canon.','3. Separate current Canon C references from historical or exploratory material. A catalog listing is not publication approval.','4. Do not move internal remodeling methods into a public statistics collection.','5. Use deterministic indexing from files and ledger source pointers. Check for catalog drift in CI.','','## Existing unclassified source','','The standalone draft at [unwritten-ideas.md](unwritten-ideas.md) remains at its original path for link compatibility. It is not a canonical statistical source.','','## Maintain these catalogs','','Run '+String.fromCharCode(96)+'npm run content:catalog:check'+String.fromCharCode(96)+' to verify navigation or '+String.fromCharCode(96)+'npm run content:catalog:write'+String.fromCharCode(96)+' to regenerate only README catalogs. Both leave the canonical datasets and existing articles intact.','');
  docs.set('content/README.md',lead.join('\n')+'\n');
  for(const c of cats.filter(x=>x!=='remodeling')){
    const es=items(c),out=['# '+meta[c][0]+' — content catalog','','**Purpose:** '+meta[c][1]+'.','**Entries:** '+es.length+' Markdown source files. Listed by file path; content and Canon C values are unchanged.','','[Content architecture](../README.md)','','**Navigation only.** Entries do not certify publication status.',''];
    if(c==='factions'){
      const known=new Set(nationNames.map(n=>n.filename));
      for(const n of nationNames)if(!es.includes(n.filename))throw Error('Country source absent: '+n.name);
      out.push('## Canonical national profiles (19)','');
      for(const n of nationNames)out.push('- ['+n.name+'](./'+n.filename+')');
      out.push('','## Other factions and comparative references','');
      for(const p of es.filter(x=>!known.has(x)))out.push('- ['+p+'](./'+p+')');
    }else if(c==='statistics'){
      for(const p of keyStats)if(!es.includes(p))throw Error('Missing key report '+p);
      out.push('## Key planetary and current national references','');
      for(const p of keyStats)out.push('- ['+p+'](./'+p+')');
      out.push('','## Additional indicators, studies, and historical references','');
      for(const p of es.filter(x=>!keyStats.includes(x)))out.push('- ['+p+'](./'+p+')');
    }else if(c==='events'){
      if(!es.includes('history-timeline.md'))throw Error('Missing timeline');
      out.push('## Primary historical timeline','','- [history-timeline.md](./history-timeline.md)','','## Other event records','');
      for(const p of es.filter(x=>x!=='history-timeline.md'))out.push('- ['+p+'](./'+p+')');
    }else{
      out.push('## Documents','');
      for(const p of es)out.push('- ['+p+'](./'+p+')');
    }
    docs.set('content/'+c+'/README.md',out.join('\n')+'\n');
  }
  return docs;
}
export {renderCatalogs};
export function checkCatalogs(){
  const wrong=[];
  for(const [p,expected] of renderCatalogs()){
    const full=path.join(root,p);
    if(!fs.existsSync(full)||fs.readFileSync(full,'utf8')!==expected)wrong.push(p);
  }
  return wrong;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const out=renderCatalogs(),wrong=checkCatalogs(),write=process.argv.includes('--write');
  if(write)for(const p of wrong)fs.writeFileSync(path.join(root,p),out.get(p),'utf8');
  console.log((wrong.length?(write?'CONTENT_CATALOG_UPDATED':'CONTENT_CATALOG_DRIFT'):'PASS_CONTENT_CATALOG')+': '+wrong.length+' of '+out.size+' generated indexes'+(wrong.length?' ['+wrong.join(', ')+']':''));
  if(wrong.length&&!write)process.exitCode=1;
}
