(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
  ready(function(){
    function bindSocialMenu(){
      var toggle=document.getElementById('socialToggle');
      var menu=document.getElementById('socialMenu');
      if(!toggle||!menu)return;
      toggle.type='button';
      toggle.onclick=function(e){e.preventDefault();e.stopPropagation();menu.classList.toggle('open');};
      var panel=menu.querySelector('.social-panel');
      if(panel){panel.onclick=function(e){e.stopPropagation();};}
      document.addEventListener('click',function(e){if(!e.target.closest('#socialMenu'))menu.classList.remove('open')});
      document.addEventListener('touchstart',function(e){if(!e.target.closest('#socialMenu'))menu.classList.remove('open')},{passive:true});
    }
    bindSocialMenu();setTimeout(bindSocialMenu,600);
    document.querySelectorAll('.comment-card[dir="rtl"] .comment-person').forEach(function(el){el.style.flexDirection='row';el.style.direction='rtl';el.style.textAlign='right'});
    document.querySelectorAll('.comment-card:not([dir="rtl"]) .comment-person').forEach(function(el){el.style.flexDirection='row';el.style.direction='ltr';el.style.textAlign='left'});
    var plans=document.querySelector('#plans .plans');
    if(plans&&!document.querySelector('.pricing-region')){
      plans.insertAdjacentHTML('beforebegin','<div class="pricing-region"><button type="button" data-region="eg">Egypt / EGP</button><button type="button" data-region="gulf">Gulf / SAR</button><button type="button" data-region="int">International / USD</button></div>');
    }
    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    var currency='USD',region='int';
    function regionFromCountry(c){c=String(c||'').toUpperCase();if(c==='EG')return 'eg';if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return 'gulf';return 'int'}
    function setButtons(){document.querySelectorAll('.pricing-region button').forEach(function(b){b.classList.toggle('active',b.dataset.region===region)})}
    function setRegion(r){region=r||'int';currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';setButtons();cards.forEach(function(plan){updatePlan(plan,plan.querySelector('.month-picker button.active')||plan.querySelector('.month-picker button'))})}
    function updatePlan(plan,btn){if(!plan||!btn)return;plan.querySelectorAll('.month-picker button').forEach(function(x){x.classList.toggle('active',x===btn)});var months=btn.dataset.months||'1',key=region+'M'+months,raw=Number(plan.dataset[key]||plan.dataset['intM'+months]||0),monthly=Math.round(raw/Number(months));var price=plan.querySelector('.plan-price'),cur=plan.querySelector('.plan-currency'),saving=plan.querySelector('.saving');if(price)price.textContent=monthly.toLocaleString('en-US');if(cur)cur.textContent=currency+' / month';if(saving)saving.textContent='Total: '+raw.toLocaleString('en-US')+' '+currency+(btn.dataset.save?' - save '+btn.dataset.save:'')}
    document.querySelectorAll('.pricing-region button').forEach(function(btn){btn.onclick=function(){try{localStorage.setItem('o2f_region_manual',btn.dataset.region)}catch(e){}setRegion(btn.dataset.region)}});
    document.querySelectorAll('#plans .month-picker button').forEach(function(btn){btn.onclick=function(){updatePlan(btn.closest('.plan'),btn)}});
    try{var manual=localStorage.getItem('o2f_region_manual');if(manual){setRegion(manual);return;}}catch(e){}
    setRegion('int');
    function detectByIpApi(){return fetch('https://ipapi.co/json/').then(function(r){return r.ok?r.json():null}).then(function(d){return d&&d.country_code?d.country_code:null})}
    function detectByIpWho(){return fetch('https://ipwho.is/').then(function(r){return r.ok?r.json():null}).then(function(d){return d&&d.country_code?d.country_code:null})}
    function detectByCloudflare(){return fetch('https://www.cloudflare.com/cdn-cgi/trace').then(function(r){return r.ok?r.text():''}).then(function(t){var m=t.match(/loc=([A-Z]{2})/);return m?m[1]:null})}
    detectByIpApi().catch(function(){return detectByIpWho()}).catch(function(){return detectByCloudflare()}).then(function(code){setRegion(regionFromCountry(code))}).catch(function(){setRegion('int')});
  })
})();
