/* Shared SQLite (sql.js) helpers: loads data/portfolio.db in the browser */
window.BASE=window.BASE||'';
const SQLCDN='https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lines=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const plain=s=>String(s||'').replace(/<br\s*\/?>/g,' ').replace(/\s+/g,' ').trim();
const titleHTML=s=>esc(s).replace(/&lt;br&gt;/g,'<br>');
const loadScript=s=>new Promise(r=>{const e=document.createElement('script');e.src=s;e.async=false;e.onload=e.onerror=r;document.body.appendChild(e)});
async function openDB(){await loadScript(SQLCDN+'sql-wasm.js');const SQL=await initSqlJs({locateFile:f=>SQLCDN+f});
const r=await fetch(BASE+'data/portfolio.db?v='+Date.now());if(!r.ok)throw new Error('db');return new SQL.Database(new Uint8Array(await r.arrayBuffer()))}
function rows(db,sql,p=[]){const st=db.prepare(sql);st.bind(p);const o=[];while(st.step())o.push(st.getAsObject());st.free();return o}
const tbl=(db,t,w='')=>rows(db,`SELECT * FROM ${t} ${w} ORDER BY sort,id`);
const prof=db=>Object.fromEntries(rows(db,'SELECT key,value FROM profile').map(r=>[r.key,r.value]));
function groups(db,home){const g={};tbl(db,'skills',home?'WHERE home=1':'').forEach(x=>{(g[x.group_name]=g[x.group_name]||{icon:x.group_icon,years:x.group_years,items:[]}).items.push(x)});return g}
/* data object consumed by the PDF CV generator (cv.js) */
function buildPD(db){const p=prof(db),g=groups(db,false);return{...p,stats:tbl(db,'stats').map(s=>[s.value,s.label]),
skills:Object.entries(g).map(([n,v])=>[n,v.icon,v.years,v.items.map(i=>[i.name,i.value])]),
exp:tbl(db,'experience').map(e=>[e.start+' - '+e.end,e.title,e.org,lines(e.details)]),
edu:tbl(db,'education').map(e=>[e.title,[e.org,e.year].filter(Boolean).join(', ')+(e.dept?' ('+e.dept+')':'')]),
projects:tbl(db,'portfolio').map(x=>[x.title,x.details||x.brief]),services:tbl(db,'services').map(s=>[s.icon,s.title,lines(s.details)])}}
