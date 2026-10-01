/* Assembles the page from separate section files, in this order. Edit ORDER to reorder/add/remove sections. */
const ORDER=['home','about','skills','experience','services','portfolio','project','strengths','contact'];
const SCRIPTS=['assets/js/swiper-bundle.min.js','assets/js/main.js','https://cdn.jsdelivr.net/npm/typed.js@2.0.12','https://unpkg.com/aos@next/dist/aos.js','https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js','assets/js/cv.js'];
const get=async f=>{const r=await fetch('sections/'+f+'.html');if(!r.ok)throw new Error(f);return r.text()};
const load=s=>new Promise(res=>{const e=document.createElement('script');e.src=s;e.async=false;e.onload=e.onerror=res;document.body.appendChild(e)});
(async()=>{try{
const [h,f,...p]=await Promise.all([get('header'),get('footer'),...ORDER.map(get)]);
document.getElementById('app-header').innerHTML=h;
document.getElementById('app-main').innerHTML=p.join('\n');
document.getElementById('app-footer').innerHTML=f;
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
}catch(e){document.getElementById('app-main').innerHTML='<div class="load-error"><h2>Could not load page sections</h2><p>Open this site through a web server (hosting, or run <code>python3 -m http.server</code> in this folder). Browsers block loading section files from file://.</p></div>';return}
for(const s of SCRIPTS)await load(s);
if(window.Typed)new Typed('.auto-input',{strings:['an IP Telephony Expert','a Linux Administrator','an ITSP Specialist','a VoIP Solutions Architect'],typeSpeed:80,backSpeed:60,loop:true});
if(window.AOS)AOS.init({offset:150,duration:1200});
if(location.hash){const t=document.querySelector(location.hash);t&&t.scrollIntoView()}
})();
