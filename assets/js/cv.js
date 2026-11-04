/* PDF CV styled like the website (same palette, Poppins, rounded cards, gradient skill bars) */
const D=window.PD;
(function(){const hue=225,F=`hsl(${hue},69%,61%)`,F2=`hsl(${hue},57%,53%)`,T=`hsl(${hue},8%,15%)`,X=`hsl(${hue},8%,45%)`,BG=`hsl(${hue},60%,97%)`,BD=`hsl(${hue},25%,90%)`;
const e=window.esc||(s=>s),L=s=>String(s||'').split('\n').filter(Boolean);
const title=(sub,t)=>`<div class="cvk" style="margin:22px 0 12px"><div style="font-size:10px;color:${F};letter-spacing:.14em;text-transform:uppercase;font-weight:500">${sub}</div><div style="font-size:18px;font-weight:600;color:${T};margin-top:2px">${t}</div><div style="width:38px;height:3px;background:${F};border-radius:3px;margin-top:5px"></div></div>`;
const card=h=>`<div class="cvk" style="background:#fff;border:1px solid ${BD};border-radius:12px;padding:12px 14px;margin-bottom:9px;page-break-inside:avoid">${h}</div>`;
const bar=(n,v)=>`<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-size:11px;color:${T};font-weight:500"><span>${e(n)}</span><span>${v}%</span></div><div style="height:6px;background:${BD};border-radius:6px;margin-top:3px"><div style="height:6px;width:${v}%;background:linear-gradient(90deg,${F2},${F});border-radius:6px"></div></div></div>`;
function build(){const c=document.createElement('div');
c.style.cssText=`width:794px;font:12px/1.55 Poppins,Arial,sans-serif;color:${X};background:hsl(${hue},60%,99%)`;
c.innerHTML=`<div style="background:linear-gradient(135deg,${F2},${F});padding:30px 40px;display:flex;align-items:center;gap:24px;color:#fff">
<div style="width:112px;height:112px;border-radius:50%;border:4px solid #fff;background:#fff url('assets/img/${D.photo}') center/cover no-repeat;flex:none"></div>
<div><div style="font-size:27px;font-weight:600;line-height:1.2">${e(D.name)}</div><div style="font-size:13px;opacity:.95;margin-top:3px">${e(D.role)}</div>
<div style="font-size:10.5px;margin-top:10px;opacity:.95">${e(D.email)} &nbsp;|&nbsp; ${e(D.phone)} &nbsp;|&nbsp; ${e(D.phone2)}<br>${e(D.location)} &nbsp;|&nbsp; ${e(D.linkedin)}</div></div></div>
<div style="padding:8px 40px 30px">
<div class="cvk" style="display:flex;gap:10px;margin-top:18px">${D.stats.map(s=>`<div style="flex:1;background:${BG};border:1px solid ${BD};border-radius:12px;text-align:center;padding:10px"><div style="font-size:20px;font-weight:600;color:${F}">${e(s[0])}</div><div style="font-size:10px">${e(s[1])}</div></div>`).join('')}</div>
${title('Professional profile','About Me')}<div class="cvk" style="font-size:11.5px">${L(D.about).map(x=>`<p style="margin:0 0 6px">${e(x)}</p>`).join('')}</div>
${title('Technical expertise','Skills')}<div style="display:flex;flex-wrap:wrap;gap:10px">${D.skills.map(g=>`<div class="cvk" style="width:calc(50% - 5px);background:#fff;border:1px solid ${BD};border-radius:12px;padding:10px 14px;box-sizing:border-box"><div style="font-weight:600;color:${T};font-size:12.5px">${e(g[0])} <span style="font-weight:400;font-size:10px;color:${X}">${e(g[2])}</span></div>${g[3].map(i=>bar(i[0],i[1])).join('')}</div>`).join('')}</div>
${title('Career history','Experience')}${D.exp.map(x=>card(`<div style="font-size:10px;color:${F};font-weight:600">${e(x[0])}</div><div style="font-size:13px;color:${T};font-weight:600">${e(x[1])}</div><div style="font-size:11px;margin-bottom:4px">${e(x[2])}</div><ul style="margin:0;padding-left:16px;font-size:11px">${x[3].map(y=>`<li>${e(y)}</li>`).join('')}</ul>`)).join('')}
${title('Selected work from 150+ projects','Portfolio')}${D.projects.map(x=>card(`<div style="font-size:12.5px;color:${T};font-weight:600">${e(x[0])}</div><div style="font-size:11px">${e(x[1])}</div>`)).join('')}
${title('What I deliver','Services')}<div style="display:flex;flex-wrap:wrap;gap:9px">${D.services.map(s=>`<div class="cvk" style="width:calc(50% - 5px);background:#fff;border:1px solid ${BD};border-radius:12px;padding:10px 14px;box-sizing:border-box"><div style="font-weight:600;color:${T};font-size:12px">${e(String(s[1]).replace(/<br\s*\/?>/g,' '))}</div><ul style="margin:4px 0 0;padding-left:15px;font-size:10.5px">${s[2].map(y=>`<li>${e(y)}</li>`).join('')}</ul></div>`).join('')}</div>
${title('Degrees, certifications and training','Education')}${D.edu.map(x=>card(`<div style="font-size:12px;color:${T};font-weight:600">${e(x[0])}</div><div style="font-size:11px">${e(x[1])}</div>`)).join('')}
${title('Communication','Languages')}<div class="cvk">${e(D.langs)}</div></div>`;return c}
const b0=document.getElementById('cv-btn');if(!b0)return;
b0.addEventListener('click',async function(ev){ev.preventDefault();const b=this,t=b.innerHTML;b.textContent='Generating PDF...';
await new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src='assets/img/'+D.photo});
try{await html2pdf().set({margin:[0,0,0,0],filename:'Hasan_Shahriar_Kabir_CV.pdf',image:{type:'jpeg',quality:.96},html2canvas:{scale:2,useCORS:true,backgroundColor:`hsl(${hue},60%,99%)`},jsPDF:{unit:'mm',format:'a4'},pagebreak:{mode:['css','legacy'],avoid:'.cvk'}}).from(build()).save()}catch(x){alert('PDF library failed to load. Check your connection and retry.')}b.innerHTML=t})})();
