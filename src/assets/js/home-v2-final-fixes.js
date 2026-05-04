(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
  ready(function(){
    function prepareMobileNav(){
      var dock=document.querySelector('.dock');
      var menu=document.getElementById('socialMenu');
      var panel=menu&&menu.querySelector('.social-panel');
      var toggle=document.getElementById('socialToggle');
      if(!dock||!menu||!panel||!toggle)return;
      toggle.type='button';
      toggle.setAttribute('aria-label','Open menu');
      toggle.textContent='Menu';
      dock.querySelectorAll('a').forEach(function(a){
        var href=a.getAttribute('href')||'';
        var keep=['#hero','#coach','#programs','#plans','#stories'].indexOf(href)!==-1;
        a.classList.toggle('mobile-primary',keep);
        a.classList.toggle('mobile-secondary',!keep);
      });
      var oldLinks=panel.querySelector('.mobile-menu-links');
      if(oldLinks) oldLinks.remove();
      var links=document.createElement('div');
      links.className='mobile-menu-links';
      var items=[['Experience','#osama-experience'],['Gallery','#gallery'],['Contact','#contact']];
      items.forEach(function(item){var a=document.createElement('a');a.href=item[1];a.textContent=item[0];links.appendChild(a)});
      panel.insertBefore(links,panel.firstChild);
      panel.querySelectorAll('a').forEach(function(a){
        var txt=(a.textContent||'').toLowerCase();
        var href=(a.getAttribute('href')||'').toLowerCase();
        if(href.indexOf('wa.me')>-1||href.indexOf('whatsapp')>-1||txt.indexOf('whatsapp')>-1){a.classList.add('social-icon','whatsapp-icon');a.innerHTML='<span>WhatsApp</span>'}
        if(txt.indexOf('instagram')>-1||href.indexOf('instagram')>-1){a.classList.add('social-icon','instagram-icon');a.innerHTML='<span>Instagram</span>'}
        if(txt.indexOf('facebook')>-1||href.indexOf('facebook')>-1){a.classList.add('social-icon','facebook-icon');a.innerHTML='<span>Facebook</span>'}
        if(txt.indexOf('chatbot')>-1||txt.indexOf('chat')>-1||href.indexOf('chat')>-1){a.classList.add('social-icon','chatbot-icon');a.innerHTML='<span>Chatbot</span>'}
        a.addEventListener('click',function(){menu.classList.remove('open')});
      });
    }
    function bindSocialMenu(){
      prepareMobileNav();
      var toggle=document.getElementById('socialToggle');
      var menu=document.getElementById('socialMenu');
      if(!toggle||!menu)return;
      toggle.onclick=function(e){e.preventDefault();e.stopPropagation();menu.classList.toggle('open');};
      var panel=menu.querySelector('.social-panel');
      if(panel){panel.onclick=function(e){e.stopPropagation();};}
      document.addEventListener('click',function(e){if(!e.target.closest('#socialMenu'))menu.classList.remove('open')});
      document.addEventListener('touchstart',function(e){if(!e.target.closest('#socialMenu'))menu.classList.remove('open')},{passive:true});
    }
    bindSocialMenu();setTimeout(bindSocialMenu,600);setTimeout(prepareMobileNav,1200);
    document.querySelectorAll('.comment-card[dir="rtl"] .comment-person').forEach(function(el){el.style.flexDirection='row';el.style.direction='rtl';el.style.textAlign='right'});
    document.querySelectorAll('.comment-card:not([dir="rtl"]) .comment-person').forEach(function(el){el.style.flexDirection='row';el.style.direction='ltr';el.style.textAlign='left'});

    document.querySelectorAll('.pricing-region').forEach(function(el){el.remove()});

    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    var currency='USD',region='int';

    function regionFromCountry(c){
      c=String(c||'').toUpperCase();
      if(c==='EG')return 'eg';
      if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return 'gulf';
      return 'int';
    }
    function setRegion(r){
      region=r||'int';
      currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';
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
