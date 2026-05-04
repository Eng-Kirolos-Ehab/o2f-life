module.exports = function(eleventyConfig) {
  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // Prevent duplicate output conflict: Home V2 is owned only by src/en/home-v2/index.njk
  eleventyConfig.ignores.add("src/en/index.njk");

  // Hotfix Home V2 without touching the current stable page file directly
  eleventyConfig.addTransform("home-v2-hotfix", function(content, outputPath) {
    if (!outputPath || !outputPath.replace(/\\/g, "/").endsWith("/en/home-v2/index.html")) return content;

    const patch = String.raw`
<style id="home-v2-hotfix">
.o2f-v2 h1,.o2f-v2 h2,.o2f-v2 h3{overflow:visible!important;word-break:normal!important;hyphens:none!important}.o2f-v2 h1{line-height:1.02!important;letter-spacing:-.055em!important}.o2f-v2 h2{line-height:1.06!important;letter-spacing:-.038em!important}.o2f-v2 h3{line-height:1.18!important;letter-spacing:-.02em!important}.o2f-v2 .btn{white-space:normal!important;line-height:1.2!important;text-align:center!important;min-height:48px!important}.o2f-v2 .stories-section{padding-left:0!important;padding-right:0!important;overflow:hidden!important}.o2f-v2 .stories-section .section-head{padding:0 16px!important}.o2f-v2 .marquee{width:100vw!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important;display:grid!important;gap:18px!important;overflow:hidden!important}.o2f-v2 .marquee-row{display:flex!important;gap:18px!important;width:max-content!important;will-change:transform}.o2f-v2 .marquee-row.row-a{animation:moveLeft 54s linear infinite!important}.o2f-v2 .marquee-row.row-b{animation:moveRight 64s linear infinite!important;transform:translateX(-50%)}.o2f-v2 .comment-card{flex:0 0 430px!important;width:auto!important;min-height:230px!important;padding:26px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}.o2f-v2 .comment-card[dir="rtl"]{text-align:right!important;font-family:Inter,"Segoe UI",Tahoma,Arial,sans-serif!important}.o2f-v2 .price{font-size:clamp(34px,4vw,46px)!important;line-height:1.05!important}.o2f-v2 .month-picker{grid-template-columns:repeat(3,1fr)!important}@media(max-width:1050px){.o2f-v2 .dock{top:auto!important;bottom:18px!important}}@media(max-width:720px){.o2f-v2 .hero{padding-bottom:110px!important}.o2f-v2 .dock{top:auto!important;bottom:12px!important;left:50%!important;transform:translateX(-50%)!important;width:calc(100vw - 18px)!important;max-width:calc(100vw - 18px)!important;overflow-x:auto!important;overflow-y:visible!important;justify-content:flex-start!important;border-radius:24px!important;scrollbar-width:none!important}.o2f-v2 .dock::-webkit-scrollbar{display:none!important}.o2f-v2 .social-panel{position:fixed!important;left:12px!important;right:12px!important;bottom:76px!important;top:auto!important;width:auto!important;min-width:0!important;grid-template-columns:1fr 1fr!important;padding:12px!important;border-radius:24px!important}.o2f-v2 .social-menu.open .social-panel{display:grid!important}.o2f-v2 .social-panel a{min-height:48px!important;align-items:center!important;justify-content:center!important;text-align:center!important}.o2f-v2 .comment-card{flex-basis:315px!important;min-height:250px!important;padding:22px!important}.o2f-v2 h1{font-size:clamp(42px,13vw,66px)!important;line-height:1.04!important;letter-spacing:-.04em!important}.o2f-v2 h2{font-size:clamp(32px,11vw,50px)!important;line-height:1.08!important;letter-spacing:-.03em!important}.o2f-v2 .final{padding-bottom:130px!important}}
</style>
<script id="home-v2-hotfix-js">
(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
  ready(function(){
    var stories=document.getElementById('stories');
    if(stories){stories.classList.add('stories-section');var old=stories.querySelector('.container');if(old){old.classList.remove('container')}var m=stories.querySelector('.marquee');if(m){m.innerHTML='<div class="marquee-row row-a"><article class="comment-card"><div><div class="quote">“</div><h3>Visible progress</h3><p>The follow-up made the difference. The plan changed when my body changed.</p></div><span class="avatar">M</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Clear system</h3><p>I stopped guessing and started following simple weekly steps.</p></div><span class="avatar">R</span></article><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>متابعة حقيقية</h3><p>أكتر حاجة فرقت معايا إن الخطة كانت بتتعدل حسب تقدمي مش كلام ثابت.</p></div><span class="avatar">س</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Better energy</h3><p>The lifestyle changes improved my day, not just my workouts.</p></div><span class="avatar">Y</span></article><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>نظام واضح</h3><p>كنت عارف أعمل إيه كل أسبوع، وده خلاني ألتزم من غير توتر.</p></div><span class="avatar">م</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Practical nutrition</h3><p>The nutrition direction was realistic and easy to apply with my routine.</p></div><span class="avatar">H</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Visible progress</h3><p>The follow-up made the difference. The plan changed when my body changed.</p></div><span class="avatar">M</span></article><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>متابعة حقيقية</h3><p>أكتر حاجة فرقت معايا إن الخطة كانت بتتعدل حسب تقدمي مش كلام ثابت.</p></div><span class="avatar">س</span></article></div><div class="marquee-row row-b"><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>نتيجة منظمة</h3><p>التمرين والأكل كانوا ماشيين مع بعض، فالتغيير كان مفهوم ومريح.</p></div><span class="avatar">ع</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Premium guidance</h3><p>Training, nutrition, and support were connected in one simple system.</p></div><span class="avatar">S</span></article><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>التزام أسهل</h3><p>المتابعة الأسبوعية خلتني أحس إن فيه حد فاهم هدفي وماشي معايا.</p></div><span class="avatar">ن</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Real support</h3><p>I felt guided, not left alone with a random plan.</p></div><span class="avatar">N</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Stronger routine</h3><p>The weekly structure made training easier to stick to.</p></div><span class="avatar">K</span></article><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>خطة مناسبة</h3><p>الخطة كانت ماشية مع يومي ومش محتاجة تعقيد عشان ألتزم.</p></div><span class="avatar">ه</span></article><article class="comment-card" dir="rtl"><div><div class="quote">“</div><h3>نتيجة منظمة</h3><p>التمرين والأكل كانوا ماشيين مع بعض، فالتغيير كان مفهوم ومريح.</p></div><span class="avatar">ع</span></article><article class="comment-card"><div><div class="quote">“</div><h3>Real support</h3><p>I felt guided, not left alone with a random plan.</p></div><span class="avatar">N</span></article></div>'}}
    var planData=[{title:'Full Transformation Plan',kicker:'Complete',desc:'Complete transformation program combining personalized nutrition, training, and daily follow-up.',eg:[5000,13500,24000],gulf:[1200,3060,5400],intl:[320,816,1440]},{title:'Therapeutic Nutrition Plan',kicker:'Therapeutic',desc:'Specialized nutrition plan with clear weekly follow-up.',eg:[2400,6480,11520],gulf:[600,1530,2700],intl:[160,408,720]},{title:'Anti-Aging Guidance',kicker:'Wellness',desc:'Holistic route focused on recovery, vitality, sustainable habits, and long-term consistency.',eg:[5000,13500,24000],gulf:[1200,3060,5400],intl:[320,816,1440]}];
    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    cards.forEach(function(card,i){var d=planData[i]||planData[0];card.dataset.egM1=d.eg[0];card.dataset.egM3=d.eg[1];card.dataset.egM6=d.eg[2];card.dataset.gulfM1=d.gulf[0];card.dataset.gulfM3=d.gulf[1];card.dataset.gulfM6=d.gulf[2];card.dataset.intM1=d.intl[0];card.dataset.intM3=d.intl[1];card.dataset.intM6=d.intl[2];var k=card.querySelector('.kicker'),h=card.querySelector('h3'),p=card.querySelector('p');if(k)k.textContent=d.kicker;if(h)h.textContent=d.title;if(p)p.textContent=d.desc;var picker=card.querySelector('.month-picker');if(picker){picker.innerHTML='<button type="button" class="active" data-months="1" data-save="">1M</button><button type="button" data-months="3" data-save="15%">3M</button><button type="button" data-months="6" data-save="25%">6M</button>'}var cur=card.querySelector('.price small');if(cur)cur.className='plan-currency';var saving=card.querySelector('.saving');if(saving)saving.textContent='Total: --';});
    var region='int',currency='USD';function regionFromCountry(c){if(c==='EG')return 'eg';if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return 'gulf';return 'int'}function setRegion(r){region=r||'int';currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';cards.forEach(function(plan){updatePlan(plan,plan.querySelector('.month-picker button.active')||plan.querySelector('.month-picker button'))})}function updatePlan(plan,btn){if(!plan||!btn)return;plan.querySelectorAll('.month-picker button').forEach(function(x){x.classList.toggle('active',x===btn)});var months=btn.dataset.months,key=region+'M'+months,raw=Number(plan.dataset[key]||plan.dataset['intM'+months]||0),monthly=Math.round(raw/Number(months)),price=plan.querySelector('.plan-price'),cur=plan.querySelector('.plan-currency'),saving=plan.querySelector('.saving');if(price)price.textContent=monthly.toLocaleString('en-US');if(cur)cur.textContent=currency+' / month';if(saving)saving.textContent='Total: '+raw.toLocaleString('en-US')+' '+currency+(btn.dataset.save?' — save '+btn.dataset.save:'')}
    document.querySelectorAll('#plans .month-picker button').forEach(function(btn){btn.onclick=function(){updatePlan(btn.closest('.plan'),btn)}});try{var cached=localStorage.getItem('o2f_region_auto');if(cached){setRegion(cached)}else{setRegion('int');fetch('https://ipapi.co/json/').then(function(r){return r.ok?r.json():null}).then(function(d){var reg=regionFromCountry(d&&d.country_code?d.country_code:'');localStorage.setItem('o2f_region_auto',reg);setRegion(reg)}).catch(function(){setRegion('int')})}}catch(e){setRegion('int')}
  })
})();
</script>`;
    return content + patch;
  });

  // Watch Tailwind + JS
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/js/");

  // Filter: current year (for footer)
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Filter: dir based on language
  eleventyConfig.addFilter("dir", (lang) => lang === "ar" ? "rtl" : "ltr");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/"
  };
};
