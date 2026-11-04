/* Shared SQLite (sql.js) helpers: loads data/portfolio.db in the browser */
window.BASE=window.BASE||'';
const SQLCDN='https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lines=s=>String(s||'').split('\n').map(x=>x.trim()).filter(Boolean);
const plain=s=>String(s||'').replace(/<br\s*\/?>/g,' ').replace(/\s+/g,' ').trim();
const titleHTML=s=>esc(s).replace(/&lt;br&gt;/g,'<br>');
const loadScript=s=>new Promise(r=>{const e=document.createElement('script');e.src=s;e.async=false;e.onload=e.onerror=r;document.body.appendChild(e)});
async function openDB(){await loadScript(SQLCDN+'sql-wasm.js');const SQL=await initSqlJs({locateFile:f=>SQLCDN+f});
const r=await fetch(BASE+'data/portfolio.db?v='+Date.now());if(!r.ok)throw new Error('db');const db=new SQL.Database(new Uint8Array(await r.arrayBuffer()));migrate(db);return db}
function rows(db,sql,p=[]){const st=db.prepare(sql);st.bind(p);const o=[];while(st.step())o.push(st.getAsObject());st.free();return o}
const tbl=(db,t,w='')=>rows(db,`SELECT * FROM ${t} ${w} ORDER BY sort,id`);
const prof=db=>Object.fromEntries(rows(db,'SELECT key,value FROM profile').map(r=>[r.key,r.value]));
const SEC=[['about','About Me','Professional profile','About Me','Full profile'],['skills','Skills','My technical expertise','Skills','All technical expertise'],['experience','Experience & Education','16+ years in telecom and IT','Experience','Career history'],['education','','','Education','Degrees, certifications and training'],['services','Services','What I deliver','Services','What I deliver'],['portfolio','Portfolio','Selected work from 150+ projects','Portfolio','Projects and solutions'],['strengths','Strengths','Highlights from supervisor reviews','',''],['contact','Contact Me','Get in touch','Contact Me','Get in touch'],['project','Need a voice or Linux expert?',"Open to international opportunities. Let's talk.",'','']];
/* Upgrades older databases in memory (idempotent): adds new tables, columns and default rows */
function migrate(db){const has=(t,c)=>rows(db,`PRAGMA table_info(${t})`).some(x=>x.name===c),X=" TEXT DEFAULT ''";
db.run(`CREATE TABLE IF NOT EXISTS home_hero(id INTEGER PRIMARY KEY,greeting${X},name_line${X},subprefix${X},typed_roles${X},description${X},button_text${X},photo${X},about_photo${X},sort INTEGER DEFAULT 99)`);
db.run(`CREATE TABLE IF NOT EXISTS sections(id INTEGER PRIMARY KEY,key${X},title${X},subtitle${X},page_title${X},page_subtitle${X},button${X},image${X},sort INTEGER DEFAULT 99)`);
[['experience','image'],['education','image'],['services','image'],['skills','group_image']].forEach(([t,c])=>has(t,c)||db.run(`ALTER TABLE ${t} ADD COLUMN ${c}${X}`));
if(!rows(db,'SELECT id FROM home_hero').length)db.run('INSERT INTO home_hero(greeting,name_line,subprefix,typed_roles,description,button_text,photo,about_photo,sort) VALUES(?,?,?,?,?,?,?,?,1)',['Hi!',"I'm Shahriar","and I'm",'an IP Telephony Expert\na Linux Administrator\nan ITSP Specialist\na VoIP Solutions Architect','Linux, ITSP and IP telephony expert with 16+ years and 150+ projects delivering carrier-grade voice and infrastructure.','Contact Me','perfil.png','about.jpg']);
const have=new Set(rows(db,'SELECT key FROM sections').map(r=>r.key));
SEC.forEach((s,i)=>{if(!have.has(s[0]))db.run('INSERT INTO sections(key,title,subtitle,page_title,page_subtitle,button,image,sort) VALUES(?,?,?,?,?,?,?,?)',[s[0],s[1],s[2],s[3],s[4],s[0]=='project'?'Contact Me':'',s[0]=='project'?'project.png':'',i+1])})}
function groups(db,home){const g={};tbl(db,'skills',home?'WHERE home=1':'').forEach(x=>{(g[x.group_name]=g[x.group_name]||{icon:x.group_icon,gimg:x.group_image,years:x.group_years,items:[]}).items.push(x)});return g}
/* data object consumed by the PDF CV generator (cv.js) */
function buildPD(db){const p=prof(db),g=groups(db,false),hh=tbl(db,'home_hero')[0]||{};return{...p,photo:hh.photo||'perfil.png',stats:tbl(db,'stats').map(s=>[s.value,s.label]),
skills:Object.entries(g).map(([n,v])=>[n,v.icon,v.years,v.items.map(i=>[i.name,i.value])]),
exp:tbl(db,'experience').map(e=>[e.start+' - '+e.end,e.title,e.org,lines(e.details)]),
edu:tbl(db,'education').map(e=>[e.title,[e.org,e.year].filter(Boolean).join(', ')+(e.dept?' ('+e.dept+')':'')]),
projects:tbl(db,'portfolio').map(x=>[x.title,x.details||x.brief]),services:tbl(db,'services').map(s=>[s.icon,s.title,lines(s.details)])}}
