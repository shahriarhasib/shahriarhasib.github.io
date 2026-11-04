/* Builds the home page (brief data, home=1) or a detail page (all data) from data/portfolio.db */
const PAGE=document.body.dataset.page||'';
let S={},HERO={};
const T=k=>esc((S[k]||{}).title),ST=k=>esc((S[k]||{}).subtitle),PT=k=>esc((S[k]||{}).page_title||(S[k]||{}).title),PST=k=>esc((S[k]||{}).page_subtitle||(S[k]||{}).subtitle);
const IM=n=>`assets/img/${esc(n)}`;
const ic=(cls,img,base)=>img?`<img src="${IM(img)}" alt="" class="${base}-img">`:`<i class="uil ${esc(cls)} ${base}"></i>`;
const logo=e=>e.image?`<img src="${IM(e.image)}" alt="" class="experience__logo">`:'';
const tlH=(r,full)=>`<div class="tl-wrap container">${r.map((e,i)=>`<div class="tl-item ${i%2?'left':'right'}"${full?` id="e${e.id}"`:''}><span class="tl-dot"><i class="uil uil-briefcase-alt"></i></span><div class="tl-card">${e.image?`<img src="${IM(e.image)}" alt="" class="tl-logo">`:''}<h3 class="tl-org">${esc(e.org)}</h3><div class="tl-role">${esc(e.title)}</div><div class="tl-date">${esc(e.start)} - ${esc(e.end)}</div>${full?`<p class="tl-key">${esc(e.key_role)}</p><details class="tl-more"><summary>Details</summary><ul class="tl-list">${li(e.details)}</ul></details>`:`<ul class="tl-list">${li(e.brief)}</ul>`}</div></div>`).join('')}</div>`;
const eduH=(r,full)=>`<div class="edu-list container">${r.map(e=>`<div class="edu-box"${full?` id="d${e.id}"`:''}><div class="edu-img">${e.image?`<img src="${IM(e.image)}" alt="" draggable="false">`:'<div class="edu-ph"><i class="uil uil-graduation-cap"></i></div>'}</div><div class="edu-body"><h3>${esc(e.title)}</h3><p>${esc(e.org)}</p>${full?(e.dept?`<p class="edu-dept">${esc(e.dept)}</p>`:'')+(e.details?`<p class="edu-txt">${esc(e.details)}</p>`:''):(e.brief?`<p class="edu-dept">${esc(e.brief)}</p>`:'')}<h4>${esc([e.year,e.duration].filter(Boolean).join(' | '))}</h4></div></div>`).join('')}</div>`;
const more=(h,t)=>`<a href="${h}" class="button button--flex button--small">${t}<i class="uil uil-arrow-right button__icon"></i></a>`;
const MORE=(...a)=>`<div class="section__more">${a.join('')}</div>`;
const li=s=>lines(s).map(x=>`<li>${esc(x)}</li>`).join('');
const fill=(s,o)=>s.replace(/\{\{(\w+)\}\}/g,(m,k)=>esc(o[k]==null?'':o[k]));
const statsH=db=>tbl(db,'stats').map(s=>`<div><span class="about__info-title">${esc(s.value)}</span><span class="about__info-name">${esc(s.label)}</span></div>`).join('');
const skillsH=(g,all)=>Object.entries(g).map(([n,v],i)=>`<div><div class="skills__content skills__${i&&!all?'close':'open'}"><div class="skills__header">${ic(v.icon,v.gimg,'skills__icon')}<div><h1 class="skills__title">${esc(n)}</h1><span class="skills__subtitle">${esc(v.years)}</span></div><i class="uil uil-angle-down skills__arrow"></i></div><div class="skills__list grid">${v.items.map(x=>`<div class="skills__data"><div class="skills__titles"><h3 class="skills__name">${x.logo?`<img src="${IM(x.logo)}" class="skills__logo" width="20" alt=""> `:''}${esc(x.name)}</h3><span class="skills__number">${x.value}%</span></div><div class="skills__bar"><span class="skills__percentage" style="width:${x.value}%"></span></div></div>`).join('')}</div></div></div>`).join('');
const svcH=r=>r.map(s=>`<div class="services__content"><div>${ic(s.icon,s.image,'services__icon')}<h3 class="services__title">${titleHTML(s.title)}</h3></div><span class="button button--flex button--small button--link services__button">View More<i class="uil uil-arrow-right button__icon"></i></span><div class="services__modal"><div class="services__modal-content"><h4 class="services__modal-title">${titleHTML(s.title)}</h4><i class="uil uil-times services__modal-close"></i><ul class="services__modal-services grid">${lines(s.brief).map(x=>`<li class="services__modal-service"><i class="uil uil-check-circle services__modal-icon"></i><p>${esc(x)}</p></li>`).join('')}</ul></div></div></div>`).join('');
const sec=(cls,id,t,sub,body)=>`<section class="${cls} section" id="${id}"><h2 class="section__title">${t}</h2><span class="section__subtitle">${sub}</span>${body}</section>`;
const card=(inner,id)=>`<div class="experience__card"${id?` id="${id}"`:''}>${inner}</div>`;
const cform=`<form action="https://formsubmit.co/EMAIL" method="POST" class="contact__form grid"><div class="contact__inputs grid"><div class="contact__content"><label class="contact__label">Name</label><input name="name" type="text" class="contact__input" required></div><div class="contact__content"><label class="contact__label">Email</label><input name="email" type="email" class="contact__input" required></div></div><div class="contact__content"><label class="contact__label">Subject</label><input name="subject" type="text" class="contact__input"></div><div class="contact__content"><label class="contact__label">Message</label><textarea name="message" rows="7" class="contact__input" required></textarea></div><div><button type="submit" class="button button--flex">Send Message<i class="uil uil-message button__icon"></i></button></div></form>`;
const cinfo=r=>r.map(c=>`<div class="contact__information"><i class="uil ${esc(c.icon)} contact__icon"></i><div><h3 class="contact__title">${esc(c.label)}</h3><span class="contact__subtitle">${c.link?`<a href="${esc(c.link)}" target="_blank">${esc(c.value)}</a>`:esc(c.value)}</span></div></div>`).join('');
const BACK=MORE(more('index.html#home','Back to home'));
const pj=r=>r.map(x=>`<div class="portfolio__content grid swiper-slide"><img src="${IM(x.image||'project.png')}" alt="" class="portfolio__img"><div class="portfolio__data"><h3 class="portfolio__title">${esc(x.title)}</h3><p class="portfolio__description">${esc(x.brief)}</p><a href="portfolio.html#p${x.id}" class="button button--flex button--small portfolio_-button">More details<i class="uil uil-arrow-right button__icon"></i></a></div></div>`).join('');

function home(db,p){const H=n=>tbl(db,n,'WHERE home=1');
return [
sec('about','about',T('about'),ST('about'),`<div data-aos="fade-left" class="about__container container grid"><img src="${IM(HERO.about_photo||'about.jpg')}" alt="${esc(p.name)}" class="about__img"/><div class="about__data"><p class="about__description">${esc(p.about_brief)}</p><div class="about_info">${statsH(db)}</div><div class="about__buttons"><a href="#" id="cv-btn" class="button button--flex">Download CV <i class="uil uil-download-alt button__icon"></i></a>${more('about.html','More details')}</div></div></div>`),
sec('skills','skills',T('skills'),ST('skills'),`<div data-aos="fade-up" class="skills__container container grid">${skillsH(groups(db,true))}</div>${MORE(more('skills.html','More details'))}`),
sec('experience','experience',T('experience'),ST('experience'),`<div data-aos="fade-up">${tlH(H('experience'))}</div>${MORE(more('experience.html','More details'))}`),
sec('education','education',T('education'),ST('education'),`<div data-aos="fade-up">${eduH(H('education'))}</div>${MORE(more('education.html','More details'))}`),
sec('services','services',T('services'),ST('services'),`<div data-aos="fade-right" class="services__container container grid">${svcH(H('services'))}</div>${MORE(more('services.html','More details'))}`),
sec('portfolio','portfolio',T('portfolio'),ST('portfolio'),`<div data-aos="fade-right" class="portfolio__container container swiper-container"><div class="swiper-wrapper">${pj(H('portfolio'))}</div><div class="swiper-button-next"><i class="uil uil-angle-right-b swiper-portfolio-icon"></i></div><div class="swiper-button-prev"><i class="uil uil-angle-left-b swiper-portfolio-icon"></i></div><div class="swiper-pagination"></div></div>${MORE(more('portfolio.html','More details'))}`),
'@project',
sec('testimonial','strengths',T('strengths'),ST('strengths'),`<div data-aos="fade-in" class="testimonial__container container swiper-container"><div class="swiper-wrapper">${H('highlights').map(h=>`<div class="testimonial__content swiper-slide"><div class="testimonial__data"><div class="testimonial__header"><div><h3 class="testimonial__name">${esc(h.title)}</h3><span class="testimonial__client">Annual performance review</span></div></div></div><p class="testimonial__description">${esc(h.brief)}</p></div>`).join('')}</div><div class="swiper-pagination swiper-pagination-testimonial"></div></div>`),
sec('contact','contact',T('contact'),ST('contact'),`<div data-aos="fade-in" class="contact__container container grid"><div>${cinfo(H('contact'))}</div>${cform}</div>${MORE(more('contact.html','More details'))}`)]}

function detail(db,p){const A=n=>tbl(db,n);
const D={
about:()=>sec('about','about',PT('about'),PST('about'),`<div class="about__container container grid"><img src="${IM(HERO.about_photo||'about.jpg')}" alt="${esc(p.name)}" class="about__img"/><div class="about__data">${lines(p.about).map(x=>`<p class="about__description">${esc(x)}</p>`).join('')}<p class="about__description"><b>Languages:</b> ${esc(p.langs)}</p><div class="about_info">${statsH(db)}</div><div class="about__buttons"><a href="#" id="cv-btn" class="button button--flex">Download CV <i class="uil uil-download-alt button__icon"></i></a></div></div></div>${BACK}`),
skills:()=>sec('skills','skills',PT('skills'),PST('skills'),`<div class="skills__container container grid">${skillsH(groups(db,false),true)}</div>${BACK}`),
experience:()=>sec('experience','experience',PT('experience'),PST('experience'),`${tlH(A('experience'),1)}${BACK}`),
education:()=>sec('education','education',PT('education'),PST('education'),`${eduH(A('education'),1)}${BACK}`),
services:()=>sec('services','services',PT('services'),PST('services'),`<div class="experience__container container grid">${A('services').map(s=>card(`${ic(s.icon,s.image,'services__icon')}<h3 class="experience__role">${plain(esc(s.title))}</h3><ul class="experience__list">${li(s.details)}</ul>`,'s'+s.id)).join('')}</div>${BACK}`),
portfolio:()=>sec('portfolio','portfolio',PT('portfolio'),PST('portfolio'),`<div class="experience__container container grid">${A('portfolio').map(x=>card(`<img src="${IM(x.image||'project.png')}" alt="" class="experience__img"><h3 class="experience__role">${esc(x.title)}</h3><p class="experience__txt">${esc(x.brief)}</p><p class="experience__txt">${esc(x.details)}</p>${x.link?`<a href="${esc(x.link)}" target="_blank" class="button button--flex button--small">Visit<i class="uil uil-arrow-right button__icon"></i></a>`:''}`,'p'+x.id)).join('')}</div>${BACK}`),
contact:()=>sec('contact','contact',PT('contact'),PST('contact'),`<div class="contact__container container grid"><div>${cinfo(A('contact'))}</div>${cform}</div>${BACK}`)};
return D[PAGE]()}

(async()=>{const root=document.getElementById('app-main');try{
const db=await openDB(),p=prof(db);
S=Object.fromEntries(tbl(db,'sections').map(r=>[r.key,r]));HERO=tbl(db,'home_hero')[0]||{};
const need=['header','footer'].concat(PAGE?[]:['home','project']);
const t=Object.fromEntries(await Promise.all(need.map(async f=>[f,await fetch(BASE+'sections/'+f+'.html').then(r=>{if(!r.ok)throw 0;return r.text()})])));
let hd=t.header;if(PAGE)hd=hd.replace(/href="#/g,'href="index.html#');
document.getElementById('app-header').innerHTML=hd;
const pr=S.project||{};
const hero=PAGE?'':fill(t.home,{photo:HERO.photo||'perfil.png',greeting:HERO.greeting,name_line:HERO.name_line,subprefix:HERO.subprefix,desc:HERO.description,button:HERO.button_text});
const proj=PAGE?'':fill(t.project,{ptitle:pr.title,pdesc:pr.subtitle,pbutton:pr.button,pimage:pr.image||'project.png'});
const body=PAGE?[detail(db,p)]:[hero].concat(home(db,p).map(x=>x=='@project'?proj:x));
root.innerHTML=body.join('\n').replace('formsubmit.co/EMAIL','formsubmit.co/'+p.email);
document.getElementById('app-footer').innerHTML=t.footer;
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
window.PD=buildPD(db);window.AWAY=p.away_title||'Come back to my portfolio 👋';window.TYPED=lines(HERO.typed_roles);
}catch(e){root.innerHTML='<div class="load-error"><h2>Could not load data</h2><p>Serve this site through a web server or GitHub Pages (not file://). Locally: run <code>python3 -m http.server</code> in this folder.</p></div>';return}
for(const s of ['assets/js/swiper-bundle.min.js','assets/js/main.js','https://cdn.jsdelivr.net/npm/typed.js@2.0.12','https://unpkg.com/aos@next/dist/aos.js','https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js','assets/js/cv.js'])await loadScript(BASE+s.replace(/^(?!http)/,''));
if(window.Typed&&document.querySelector('.auto-input'))new Typed('.auto-input',{strings:TYPED.length?TYPED:['an IP Telephony Expert'],typeSpeed:80,backSpeed:60,loop:true});
{const f=document.getElementById('favicon'),t0=document.title,i0=f&&f.getAttribute('href');document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){document.title=t0;f&&f.setAttribute('href',i0)}else{document.title=window.AWAY;f&&f.setAttribute('href','assets/img/favicon-away.png')}})}
if(window.AOS)AOS.init({offset:150,duration:1200});
if(location.hash.length>1){const e=document.querySelector(location.hash);e&&e.scrollIntoView()}
})();
