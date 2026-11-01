#!/usr/bin/env node
// Inventory and prevent economic drafting labels from leaking into presentable Asthortera material.
// --report is nonblocking discovery; --check enforces zero present-day terminology leaks.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const roots=['content','docs','data','tools','tests'];
const matches=[];
const rules=[
  {name:'lettered economic approach label', re:new RegExp('\\bmodel[\\s\\-–—]*b\\b','gi')},
  {name:'lettered integrated uplift shorthand',re:new RegExp('\\b(?:integrated[ -]?income[ -]?output|income[ -]?output[ -]?uplift)[\\s\\-–—]*b\\b','gi')}
];
function scan(dir){
  if(!fs.existsSync(dir))return;
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(ent.name.startsWith('.'))continue;
    const full=path.join(dir,ent.name);
    if(ent.isDirectory()){scan(full);continue;}
    if(!ent.isFile()||!/\.(?:md|mdx|json|js|mjs|ts|tsx)$/.test(ent.name))continue;
    if(path.resolve(full)===path.resolve(fileURLToPath(import.meta.url)))continue;
    const lines=fs.readFileSync(full,'utf8').split(/\r?\n/);
    for(let i=0;i<lines.length;i++){
      const rulesHit=rules.filter(r=>{r.re.lastIndex=0;return r.re.test(lines[i]);});
      if(rulesHit.length)matches.push({path:path.relative(root,full).split(path.sep).join('/'),line:i+1,kind:rulesHit.map(r=>r.name).join(','),text:lines[i].trim().slice(0,240)});
    }
  }
}
for(const dir of roots)scan(path.join(root,dir));
const files=[...new Set(matches.map(x=>x.path))];
console.log('ECONOMIC_PRESENTATION_TERMINOLOGY_AUDIT: '+matches.length+' lines, '+files.length+' files');
for(const m of matches)console.log(JSON.stringify(m));
if(process.argv.includes('--check')&&matches.length)process.exitCode=1;
