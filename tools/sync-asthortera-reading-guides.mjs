#!/usr/bin/env node
/** Editorial reading guides for 19 nation profiles and seven statistical articles.
 * No source heading, fact, frontmatter, generated canon block or path is rewritten.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ledger=JSON.parse(fs.readFileSync(path.join(root,'data/asthortera/nccm-v6-active-cross-domain.json'),'utf8'));
const nations=[...ledger.countries_14,...ledger.countries_5];
const reports=['asthortera-nccm-v6-active-cross-domain.md','asthortera-nccm-v65-spatial-composition.md','asthortera-vs-earth.md','asthortera_identity.md','kalgered-consumption-v65.md','sdi-report-asthortera.md','sentient-population.md'];
export const targets=[...nations.map(n=>n.source).sort(),...reports.map(p=>'content/statistics/'+p)];
const BEGIN='<!-- BEGIN ASTHORTERA_EDITORIAL_READING_GUIDE_V1 -->';
const END='<!-- END ASTHORTERA_EDITORIAL_READING_GUIDE_V1 -->';
const PATTERN=/\n\n<!-- BEGIN ASTHORTERA_EDITORIAL_READING_GUIDE_V1 -->\n[\s\S]*?\n<!-- END ASTHORTERA_EDITORIAL_READING_GUIDE_V1 -->\n\n/g;
const GATE_N='<!-- END NCCM_V65_FULL_PROFILE_INTEGRATION -->';
const GATE_P='<!-- END NCCM_V65_PLANETARY_CROSSDOC -->';
const plain=s=>s.replace(/<[^>]+>/g,'').replace(/!\[([^\]]*)\]\([^)]*\)/g,'$1')
 .replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[*_\x60~]/g,'').trim();
const slug=s=>plain(s).toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Zs}\t _-]/gu,'').replace(/ /g,'-');
function headings(text){
 const found=[],seen=new Map(),ls=text.split('\n');let fence=null;
 for(let i=0;i<ls.length;i++){
  const line=ls[i],f=line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
  if(f){const k=f[1][0],len=f[1].length;if(!fence)fence={k,len};else if(k===fence.k&&len>=fence.len)fence=null;continue;}
  if(fence)continue;
  const m=line.match(/^\s{0,3}(#{1,6})[ \t]+(.+?)\s*$/);
  if(!m)continue;
  const name=plain(m[2]),base=slug(m[2]);if(!name||!base)continue;
  const n=seen.get(base)||0;seen.set(base,n+1);
  found.push({line:i+1,level:m[1].length,name,anchor:base+(n?'-'+n:'')});
 }
 return found;
}
function select(headingsList,nation,cut){
 const e=headingsList.filter(h=>h.line>=cut&&!/^(table of contents|navigation links)$/i.test(h.name));
 const firstH1=nation?e.find(h=>h.level===1):null;
 const body=firstH1?e.filter(h=>h.line>firstH1.line):e;
 if(nation&&firstH1){
  const nextTitle=e.find(h=>h.level===1&&h.line>firstH1.line);
  if(nextTitle&&body.filter(h=>h.line<nextTitle.line&&h.level===3&&h.name.length>=8).length>=4){
   // The first descriptive chapter owns the overview; avoid sampling unrelated H3 appendices.
   const core=body.filter(h=>h.line<nextTitle.line&&h.level===3&&h.name.length>=8);
   return sample([...core,nextTitle]);
  }
 }
 for(const level of [1,2,3,4]){
  const c=body.filter(h=>h.level===level&&h.name.length>=8);
  if(c.length>=4)return sample(c);
 }
 for(const level of [2,3,1,4]){
  const c=body.filter(h=>h.level===level&&h.name.length>=6);
  if(c.length>=2)return sample(c);
 }
 return sample(body.filter(h=>h.name.length>=6));
}
function sample(a){if(a.length<=12)return a;return Array.from({length:12},(_,i)=>a[Math.round(i*(a.length-1)/11)]);}
function stripGuide(source){
 const count=source.split(BEGIN).length-1,ends=source.split(END).length-1;
 if(count!==ends||count>1)throw Error('Unbalanced/duplicated reading guide');
 if(count===0)return source;
 const hit=source.match(PATTERN);if(hit?.length!==1)throw Error('Reading guide whitespace format changed');
 return source.replace(PATTERN,'\n\n');
}
export function renderGuide(raw,p){
 const text=stripGuide(raw),nation=p.startsWith('content/factions/'),all=headings(text);
 let idx;
 if(nation||text.includes(GATE_P)){
  const marker=nation?GATE_N:GATE_P;
  if(text.split(marker).length!==2)throw Error('Canonical section boundary missing/duplicated: '+p);
  idx=text.indexOf(marker)+marker.length;
 }else{
  const h1=all.find(h=>h.level===1),lines=text.split('\n');
  const position=h=>lines.slice(0,h.line-1).join('\n').length+1;
  const next=all.find(h=>h1&&h.line>h1.line&&(text.slice(0,position(h)).endsWith('\n\n')||text.slice(position(h)).startsWith('\n\n')));
  if(!h1||!next)throw Error('No readable insertion boundary: '+p);
  idx=position(next);
 }
 const before=text.slice(0,idx),after=text.slice(idx);
 if(!before.endsWith('\n\n')&&!after.startsWith('\n\n'))throw Error('Unsafe layout insertion: '+p);
 const selected=select(all,nation,before.split('\n').length);
 if(selected.length<2)throw Error('Not enough navigable sections: '+p);
 const name=nation?nations.find(n=>n.source===p)?.name:'Asthortera reference';
 const content=[
  BEGIN,
  '### Reading guide — '+name,
  '',
  '> **Purpose:** Follow selected original sections in reading order. This is an editorial navigation aid; it does not add facts, replace canonical data, or promote proposals to Canon C.',
  '',
  '**Sections in this document**',
  '',
  ...selected.map(h=>'- ['+h.name.replace(/[\[\]]/g,'')+'](#'+h.anchor+')'),
  '',
  nation?'**Canonical reference:** The generated Year 0 tables above retain precedence over historical illustrations and narrative proposals.':'**Source boundary:** Existing numerical indicators, limitations, and evidence statuses remain unchanged.',
  END
 ].join('\n');
 const output=before.endsWith('\n\n')?before+content+'\n\n'+after:before+'\n\n'+content+after;
 if(stripGuide(output)!==text)throw Error('Guide altered original source bytes: '+p);
 return output;
}
export function checkGuides(){
 if(nations.length!==19||targets.length!==26||new Set(targets).size!==26)throw Error('Invalid target set');
 const drift=[];
 for(const p of targets){
  const old=fs.readFileSync(path.join(root,p),'utf8'),expected=renderGuide(old,p);
  if(old!==expected)drift.push({path:p,content:expected});
 }
 return drift;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const drift=checkGuides(),write=process.argv.includes('--write');
 if(write)for(const p of drift)fs.writeFileSync(path.join(root,p.path),p.content,'utf8');
 console.log((drift.length?(write?'READING_GUIDES_UPDATED':'READING_GUIDES_DRIFT'):'PASS_READING_GUIDES')+': '+drift.length+' of 26 files'+(drift.length?' ['+drift.map(x=>x.path).join(', ')+']':''));
 if(drift.length&&!write)process.exitCode=1;
}
