const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const menuToggle=$("#menuToggle"),nav=$("#nav");
menuToggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
$$('#nav a').forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>revealObserver.observe(el));

const glow=$(".cursor-glow");
if(matchMedia("(pointer:fine)").matches){document.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";glow.style.opacity=".8"});document.addEventListener("pointerleave",()=>glow.style.opacity="0")}
if(matchMedia("(hover:hover) and (pointer:fine)").matches){
  $$("[data-tilt]").forEach(card=>{const image=$(".project-image",card);card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;image.style.transform=`perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-2px)`});card.addEventListener("pointerleave",()=>image.style.transform="")});
}

const details={
 crypto:{kicker:"FINTECH / DESKTOP TOOL",title:"SUIAnalyzer",text:"ابزار دسکتاپ تحلیل رمزارز با نمودارهای قیمت و اندیکاتورهای تکنیکال مانند RSI، میانگین متحرک، MACD، Bollinger Bands و ATR. پروژه با C# و WPF توسعه داده شده و از داده‌های بازار برای نمایش تحلیلی‌تر استفاده می‌کند.",tags:["C#","WPF",".NET Framework","OxyPlot","CoinGecko"]},
 shop:{kicker:"BUSINESS SOFTWARE",title:"PoyaShop",text:"پروژه اپلیکیشن حسابداری فروشگاهی با معماری لایه‌ای، SQLite و EF Core؛ شامل کالاها، دسته‌بندی‌ها، اشخاص، فاکتور خرید و فروش، کنترل موجودی، بهای تمام‌شده، دفتر مالی و ثبت رویدادهای مهم.",tags:[".NET MAUI","C#","SQLite","EF Core","Clean Architecture"]},
 game:{kicker:"INTERACTIVE / GAME",title:"Game Project",text:"پروژه بازی شخصی در حال معرفی. در نسخه فعلی از تصویر هنری مفهومی استفاده شده؛ با ارسال نام بازی و چند اسکرین‌شات واقعی، این بخش را با ژانر، گیم‌پلی و جزئیات دقیق پروژه جایگزین می‌کنیم.",tags:["GAME DEV","GAMEPLAY","PERSONAL PROJECT"]}
};
const modal=$("#projectModal");
function openModal(key){const d=details[key];if(!d)return;$("#modalKicker").textContent=d.kicker;$("#modalTitle").textContent=d.title;$("#modalText").textContent=d.text;$("#modalTags").innerHTML=d.tags.map(t=>`<span>${t}</span>`).join("");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$(".modal-close").focus()}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
$$("[data-open]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.open)));
$$("[data-close]").forEach(b=>b.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#modalContact").addEventListener("click",closeModal);

$("#copyEmail")?.addEventListener("click",async()=>{const email="poyapanahi.dev@gmail.com",status=$("#copyStatus");try{await navigator.clipboard.writeText(email);status.textContent="ایمیل کپی شد ✓"}catch{status.textContent=email}setTimeout(()=>status.textContent="برای کپی‌کردن ایمیل لمس کن",2200)});

const sections=$$("main section[id]"),links=$$("#nav a");
const activeObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>activeObserver.observe(s));
