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
      plans.insertAdjacentHTML('beforebegin','<div class="pricing-region" data-auto-region="detecting"><button type="button" data-region="eg">Egypt / EGP</button><button type="button" data-region="gulf">Gulf / SAR</button><button type="button" data-region="int">International / USD</button></div>');
    }

    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    var currency='USD',region='int';

    function regionFromCountry(c){
      c=String(c||'').toUpperCase();
      if(c==='EG')return 'eg';
      if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return 'gulf';
      return 'int';
    }
    function setButtons(){
      var box=document.querySelector('.pricing-region');
      if(box)box.setAttribute('data-auto-region',region);
      document.querySelectorAll('.pricing-region button').forEach(function(b){b.classList.toggle('active',b.dataset.region===region)});
    }
    function setRegion(r){
      region=r||'int';
      currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';
      setButtons();
      cards.forEach(function(plan){updatePlan(plan,plan.querySelector('.month-picker button.active')||plan.querySelector('.month-picker button'))});
    }
    function updatePlan(plan,btn){
      if(!plan||!btn)return;
      plan.querySelectorAll('.month-picker button').forEach(function(x){x.classList.toggle('active',x===btn)});
      var months=btn.dataset.months||'1';
      var key=region+'M'+months;
      var raw=Number(plan.dataset[key]||plan.dataset['intM'+months]||0);
      var monthly=Math.round(raw/Number(months));
      var price=plan.querySelector('.plan-price');
      var cur=plan.querySelector('.plan-currency');
      var saving=plan.querySelector('.saving');
      if(price)price.textContent=monthly.toLocaleString('en-US');
      if(cur)cur.textContent=currency+' / month';
      if(saving)saving.textContent='Total: '+raw.toLocaleString('en-US')+' '+currency+(btn.dataset.save?' - save '+btn.dataset.save:'');
    }

    // Manual buttons remain only as an immediate fallback for the visitor, but auto IP detection is never skipped.
    document.querySelectorAll('.pricing-region button').forEach(function(btn){btn.onclick=function(){setRegion(btn.dataset.region)}});
    document.querySelectorAll('#plans .month-picker button').forEach(function(btn){btn.onclick=function(){updatePlan(btn.closest('.plan'),btn)}});

    try{localStorage.removeItem('o2f_region_manual');localStorage.removeItem('o2f_region_auto')}catch(e){}
    setRegion('int');

    function withTimeout(promise,ms){
      return new Promise(function(resolve,reject){
        var done=false;
        var t=setTimeout(function(){if(!done){done=true;reject(new Error('timeout'))}},ms);
        promise.then(function(v){if(!done){done=true;clearTimeout(t);resolve(v)}}).catch(function(e){if(!done){done=true;clearTimeout(t);reject(e)}});
      });
    }
    function getJson(url,parser){
      return withTimeout(fetch(url,{cache:'no-store'}),4500).then(function(r){return r.ok?r.json():null}).then(parser);
    }
    function detectCountry(){
      var services=[
        function(){return getJson('https://ipapi.co/json/',function(d){return d&&(d.country_code||d.country)?(d.country_code||d.country):null})},
        function(){return getJson('https://ipwho.is/',function(d){return d&&d.success!==false&&(d.country_code||d.country_code===0)?d.country_code:null})},
        function(){return getJson('https://get.geojs.io/v1/ip/country.json',function(d){return d&&(d.country||d.country_code)?(d.country||d.country_code):null})},
        function(){return withTimeout(fetch('https://www.cloudflare.com/cdn-cgi/trace',{cache:'no-store'}),4500).then(function(r){return r.ok?r.text():''}).then(function(t){var m=t.match(/loc=([A-Z]{2})/);return m?m[1]:null})}
      ];
      return services.reduce(function(chain,fn){
        return chain.catch(function(){return fn().then(function(code){if(code)return code;throw new Error('no country')})});
      },Promise.reject());
    }

    detectCountry().then(function(code){setRegion(regionFromCountry(code))}).catch(function(){setRegion('int')});
  })
})();
