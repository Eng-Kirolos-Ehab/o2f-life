(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
  ready(function(){
    var bg=document.getElementById('o2fBg');
    if(bg){
      var ticking=false,lastY=0;
      function apply(){ticking=false;var y=Math.max(-180,Math.min(0,-window.scrollY*0.08));if(Math.abs(y-lastY)>0.5){lastY=y;bg.style.setProperty('--bg-y',y+'px');}bg.style.setProperty('--bg-s','1.14')}
      window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(apply)}},{passive:true});apply();
    }
    document.addEventListener('click',function(e){
      var toggle=e.target.closest('#socialToggle');
      var menu=document.getElementById('socialMenu');
      if(toggle&&menu){e.preventDefault();e.stopPropagation();menu.classList.toggle('open');return;}
      if(menu&&!e.target.closest('#socialMenu')) menu.classList.remove('open');
    },true);
    document.querySelectorAll('.comment-card[dir="rtl"] .comment-person').forEach(function(el){el.style.flexDirection='row';el.style.direction='rtl';el.style.textAlign='right'});
    document.querySelectorAll('.comment-card:not([dir="rtl"]) .comment-person').forEach(function(el){el.style.flexDirection='row';el.style.direction='ltr';el.style.textAlign='left'});
    var plans=document.querySelector('#plans .plans');
    if(plans&&!document.querySelector('.pricing-region')){
      plans.insertAdjacentHTML('beforebegin','<div class="pricing-region"><button type="button" data-region="eg">Egypt / EGP</button><button type="button" data-region="gulf">Gulf / SAR</button><button type="button" data-region="int">International / USD</button></div>');
    }
    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    var currency='USD',region='int';
    function regionFromCountry(c){if(c==='EG')return 'eg';if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return 'gulf';return 'int'}
    function setButtons(){document.querySelectorAll('.pricing-region button').forEach(function(b){b.classList.toggle('active',b.dataset.region===region)})}
    function setRegion(r){region=r||'int';currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';setButtons();cards.forEach(function(plan){updatePlan(plan,plan.querySelector('.month-picker button.active')||plan.querySelector('.month-picker button'))})}
    function updatePlan(plan,btn){if(!plan||!btn)return;plan.querySelectorAll('.month-picker button').forEach(function(x){x.classList.toggle('active',x===btn)});var months=btn.dataset.months||'1',key=region+'M'+months,raw=Number(plan.dataset[key]||plan.dataset['intM'+months]||0),monthly=Math.round(raw/Number(months));var price=plan.querySelector('.plan-price'),cur=plan.querySelector('.plan-currency'),saving=plan.querySelector('.saving');if(price)price.textContent=monthly.toLocaleString('en-US');if(cur)cur.textContent=currency+' / month';if(saving)saving.textContent='Total: '+raw.toLocaleString('en-US')+' '+currency+(btn.dataset.save?' - save '+btn.dataset.save:'')}
    document.querySelectorAll('.pricing-region button').forEach(function(btn){btn.addEventListener('click',function(){try{localStorage.setItem('o2f_region_manual',btn.dataset.region)}catch(e){}setRegion(btn.dataset.region)})});
    document.querySelectorAll('#plans .month-picker button').forEach(function(btn){btn.onclick=function(){updatePlan(btn.closest('.plan'),btn)}});
    try{var manual=localStorage.getItem('o2f_region_manual');if(manual){setRegion(manual);return;}}catch(e){}
    setRegion('int');
    try{fetch('https://ipapi.co/json/').then(function(r){return r.ok?r.json():null}).then(function(d){setRegion(regionFromCountry(d&&d.country_code?d.country_code:''))}).catch(function(){setRegion('int')})}catch(e){setRegion('int')}
  })
})();
