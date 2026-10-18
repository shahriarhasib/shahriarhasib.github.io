const D=window.PD;
;(function(){const h=t=>`<div style="color:#0b6fb8;font-weight:700;letter-spacing:.1em;border-bottom:2px solid #4a6cf7;margin:16px 0 8px;padding-bottom:3px">${t}</div>`;
const sk=D.skills.map(s=>`<div><b>${s[0]}:</b> ${s[3].map(i=>i[0]+" ("+i[1]+"%)").join(", ")}</div>`).join('');
function build(){const c=document.createElement('div');c.style.cssText='width:794px;padding:36px 44px;font:13px/1.5 Arial,sans-serif;color:#1a2433;background:#fff';
c.innerHTML=`<div style="border-bottom:4px solid #4a6cf7;padding-bottom:10px"><div style="font-size:26px;font-weight:800">${D.name}</div><div style="color:#4a6cf7;font-weight:700">${D.role}</div><div style="color:#5b6b80;margin-top:4px">${D.email} | ${D.phone} | ${D.phone2} | ${D.location}<br>${D.linkedin}</div></div>
${h("PROFESSIONAL SUMMARY")}<div>${D.about}</div>${h("KEY METRICS")}<div>${D.stats.map(s=>`<b>${s[0]}</b> ${s[1]}`).join(" &nbsp;|&nbsp; ")}</div>
${h("TECHNICAL SKILLS")}${sk}${h("WORK EXPERIENCE")}${D.exp.map(e=>`<div style="page-break-inside:avoid;margin-bottom:9px"><b>${e[1]}</b>, ${e[2]}<span style="float:right;color:#4a6cf7">${e[0]}</span><ul style="margin:3px 0 0 18px;padding:0">${e[3].map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}
${h("SELECTED PROJECTS (150+ DELIVERED)")}${D.projects.map(p=>`<div style="page-break-inside:avoid;margin-bottom:5px"><b>${p[0]}:</b> ${p[1]}</div>`).join('')}
${h("SERVICES")}${D.services.map(s=>`<div><b>${s[1].replace(/<br>/g,'')}:</b> ${s[2].join(' ')}</div>`).join('')}
${h("EDUCATION & TRAINING")}${D.edu.map(e=>`<div><b>${e[0]}</b>, ${e[1]}</div>`).join('')}${h("LANGUAGES")}<div>${D.langs}</div>`;return c}
(document.getElementById('cv-btn')||document.createElement('a')).addEventListener('click',async function(e){e.preventDefault();const b=this,t=b.innerHTML;b.textContent='Generating PDF...';
try{await html2pdf().set({margin:[8,0,8,0],filename:'Hasan_Shahriar_Kabir_CV.pdf',image:{type:'jpeg',quality:.95},html2canvas:{scale:2},jsPDF:{unit:'mm',format:'a4'},pagebreak:{mode:['css','legacy']}}).from(build()).save()}catch(x){alert('PDF library failed to load. Check your connection and retry.')}b.innerHTML=t});})();