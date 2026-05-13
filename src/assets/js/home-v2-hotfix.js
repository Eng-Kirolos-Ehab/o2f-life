(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
  ready(function(){
    var isAr=!!document.querySelector('.o2f-v2-ar');

    /* ── Experience timeline — EN only ── */
    if(!isAr){
      var coach=document.getElementById('coach');
      if(coach&&!document.getElementById('osama-experience')){
        coach.insertAdjacentHTML('afterend','<section class="section osama-timeline" id="osama-experience"><div class="container timeline-wrap"><article class="glass timeline-intro"><span class="kicker">Osama Omran Experience</span><h2>A career built through international fitness experience.</h2><p>Certified expert in nutrition and body transformation, with a strong record in integrated training and nutrition programs for transformation, performance, and competition preparation.</p><div class="achievement-grid"><div class="achievement-card"><strong>1st</strong><span>15th Men Arab Bodybuilding Championship</span></div><div class="achievement-card"><strong>11</strong><span>Medals with a professional team in 2018</span></div><div class="achievement-card"><strong>8</strong><span>Athletes led in Shawn Rhoden Classic</span></div></div></article><div class="timeline-list"><div class="timeline-item"><span class="timeline-year">2008</span><div class="timeline-card"><b>Lara Health and Strength Center - Saudi Arabia</b><p>Started a strong international coaching path focused on training quality and body transformation.</p></div></div><div class="timeline-item"><span class="timeline-year">2010</span><div class="timeline-card"><b>Champions Corner - Saudi Arabia</b><p>Expanded experience in advanced training environments and client-focused development.</p></div></div><div class="timeline-item"><span class="timeline-year">2013</span><div class="timeline-card"><b>Fitness First - Saudi Arabia</b><p>Worked within a global fitness brand, refining structured programs for different goals.</p></div></div><div class="timeline-item"><span class="timeline-year">2015</span><div class="timeline-card"><b>Golds Gym - Saudi Arabia</b><p>Strengthened expertise in performance training, physique development, and professional coaching.</p></div></div><div class="timeline-item"><span class="timeline-year">2017</span><div class="timeline-card"><b>Maxima Gym - Thailand</b><p>Added wider international exposure and practical experience in a different training culture.</p></div></div><div class="timeline-item"><span class="timeline-year">2018</span><div class="timeline-card"><b>Shawn Rhoden Classic - Philippines</b><p>Led a professional team of 8 athletes who achieved 11 medals, with 3 athletes winning multiple medals across categories.</p></div></div><div class="timeline-item"><span class="timeline-year">Now</span><div class="timeline-card"><b>Transformation and Competition Preparation</b><p>Provides customized nutrition and training plans, weekly progress tracking, continuous support, and advanced competition preparation.</p></div></div></div></div></section>');
      }
      var dock=document.querySelector('.dock');
      if(dock&&!dock.querySelector('a[href="#osama-experience"]')){var link=document.createElement('a');link.href='#osama-experience';link.textContent='Experience';var plans=dock.querySelector('a[href="#plans"]');dock.insertBefore(link,plans||dock.lastChild)}
    }

    /* ── Stories / comments section ── */
    var stories=document.getElementById('stories');
    if(stories){
      stories.classList.add('stories-section');
      var old=stories.querySelector('.container');if(old){old.classList.remove('container')}
      var m=stories.querySelector('.marquee');
      if(m){
        var photos=['https://randomuser.me/api/portraits/women/44.jpg','https://randomuser.me/api/portraits/men/32.jpg','https://randomuser.me/api/portraits/women/65.jpg','https://randomuser.me/api/portraits/men/41.jpg','https://randomuser.me/api/portraits/men/52.jpg','https://randomuser.me/api/portraits/women/68.jpg','https://randomuser.me/api/portraits/men/76.jpg','https://randomuser.me/api/portraits/women/12.jpg','https://randomuser.me/api/portraits/women/22.jpg','https://randomuser.me/api/portraits/men/64.jpg','https://randomuser.me/api/portraits/men/11.jpg','https://randomuser.me/api/portraits/women/29.jpg','https://randomuser.me/api/portraits/women/18.jpg','https://randomuser.me/api/portraits/men/85.jpg','https://randomuser.me/api/portraits/women/37.jpg','https://randomuser.me/api/portraits/men/73.jpg','https://randomuser.me/api/portraits/women/71.jpg','https://randomuser.me/api/portraits/men/49.jpg','https://randomuser.me/api/portraits/women/50.jpg','https://randomuser.me/api/portraits/women/75.jpg'];
        var commentsA=[['Mariam Adel','Full Transformation','The follow-up made the difference. The plan changed when my body changed.','ltr',0],['Omar Khaled','Training Plan','I stopped guessing and started following simple weekly steps.','ltr',1],['سارة محمود','برنامج التحول','أكتر حاجة فرقت معايا إن الخطة كانت بتتعدل حسب تقدمي مش كلام ثابت.','rtl',2],['Youssef Amin','Wellness','The lifestyle changes improved my day, not just my workouts.','ltr',3],['مينا سامي','متابعة تدريب','كنت عارف أعمل إيه كل أسبوع، وده خلاني ألتزم من غير توتر.','rtl',4],['Hana Mostafa','Nutrition','The nutrition direction was realistic and easy to apply with my routine.','ltr',5],['عبدالله ناصر','خطة تغذية','التمرين والأكل كانوا ماشيين مع بعض، فالتغيير كان مفهوم ومريح.','rtl',6],['Nour Ibrahim','Coaching','I felt guided, not left alone with a random plan.','ltr',7],['ريم خالد','تحسين نمط الحياة','المتابعة الأسبوعية خلتني أحس إن فيه حد فاهم هدفي وماشي معايا.','rtl',8],['Karim Samir','Body Recomp','My routine became cleaner and the progress was easy to track.','ltr',9]];
        var commentsB=[['Ahmed Tarek','Competition Prep','Training, nutrition, and support were connected in one simple system.','ltr',10],['ليلى حسن','Anti-Aging','الخطة كانت ماشية مع يومي ومش محتاجة تعقيد عشان ألتزم.','rtl',11],['Salma Nabil','Therapeutic Nutrition','The weekly structure made training easier to stick to.','ltr',12],['يوسف عادل','تحول جسم','حسيت إن فيه نظام واضح مش مجرد نصائح عامة.','rtl',13],['Nada Fouad','Lifestyle Plan','The plan was practical and still felt premium.','ltr',14],['أحمد مصطفى','إعداد بطولة','المتابعة كانت دقيقة وخلتني أجهز بشكل أقوى.','rtl',15],['Mona Zaki','Weight Loss','I liked that the plan was simple enough to continue.','ltr',16],['خالد سامح','برنامج تدريبي','كل أسبوع كان فيه تعديل واضح على حسب النتيجة.','rtl',17],['Farah Magdy','Wellness Support','It helped me build habits instead of chasing motivation.','ltr',18],['نورهان علي','متابعة مستمرة','الدعم المستمر خلاني أكمل حتى لما الحماس قل.','rtl',19]];
        function mkCard(c){return '<article class="comment-card" dir="'+c[3]+'"><div><div class="quote">"</div><h3>'+c[1]+'</h3><p>'+c[2]+'</p></div><div class="comment-person"><img class="comment-photo" src="'+photos[c[4]]+'" alt="'+c[0]+'"><div><span class="comment-name">'+c[0]+'</span><span class="comment-service">'+c[1]+'</span></div></div></article>'}
        m.innerHTML='<div class="marquee-row row-a">'+commentsA.concat(commentsA).concat(commentsA).map(mkCard).join('')+'</div><div class="marquee-row row-b">'+commentsB.concat(commentsB).concat(commentsB).map(mkCard).join('')+'</div>';
      }

      /* Add comment card — language aware */
      if(!document.getElementById('home-v2-add-comment')){
        var addCommentHtml = isAr
          ? '<div class="glass add-comment-card" id="home-v2-add-comment" dir="rtl"><div><h3>شارك تجربتك</h3><p>التعليق ينتقل للمراجعة أولًا، ثم يمكن قبوله من لوحة الإدارة.</p><form class="add-comment-form" id="ar-comment-form"><div class="form-row"><input type="text" id="ar-cname" placeholder="الاسم" maxlength="40"><input type="text" id="ar-cservice" placeholder="الخدمة / الباقة" maxlength="60"></div><textarea id="ar-ctext" rows="4" placeholder="اكتب تعليقك هنا..." maxlength="320"></textarea><button type="button" class="btn primary" onclick="arSubmitComment()">إرسال للمراجعة</button><p id="ar-cstatus" style="font-size:13px;color:var(--mint);margin-top:8px;display:none"></p></form></div><div class="add-comment-note"><h3>كيف يعمل؟</h3><ul><li>✓ العميل يرسل اسمه وتعليقه.</li><li>✓ الأدمن يراجع من لوحة الإدارة.</li><li>✓ التعليق يظهر بعد القبول.</li></ul></div></div>'
          : '<div class="glass add-comment-card" id="home-v2-add-comment"><div><h3>Share your experience</h3><p>The comment goes to review first, then it can be approved from the admin panel.</p><form class="add-comment-form" id="en-comment-form"><div class="form-row"><input type="text" id="en-cname" placeholder="Name" maxlength="40"><input type="text" id="en-cservice" placeholder="Service / plan" maxlength="60"></div><textarea id="en-ctext" rows="4" placeholder="Write your comment here..." maxlength="320"></textarea><button type="button" class="btn primary" onclick="enSubmitComment()">Submit for review</button><p id="en-cstatus" style="font-size:13px;color:var(--mint);margin-top:8px;display:none"></p></form></div><div class="add-comment-note"><h3>Comment moderation</h3><ul><li>✓ Client submits name and comment.</li><li>✓ Admin reviews comments in the admin panel.</li><li>✓ Comment appears after approval.</li></ul></div></div>';
        stories.insertAdjacentHTML('beforeend', addCommentHtml);
      }
    }

    /* ── Plan pricing data — both languages ── */
    var planData=[
      {title:'Full Transformation Plan',kicker:'Complete',desc:'Complete transformation program combining personalized nutrition, training, and daily follow-up.',eg:[5000,13500,24000],gulf:[1200,3060,5400],intl:[320,816,1440]},
      {title:'Therapeutic Nutrition Plan',kicker:'Therapeutic',desc:'Specialized nutrition plan with clear weekly follow-up and lifestyle support.',eg:[2400,6480,11520],gulf:[600,1530,2700],intl:[160,408,720]},
      {title:'Anti-Aging Guidance',kicker:'Wellness',desc:'Holistic route focused on recovery, vitality, sustainable habits, and long-term consistency.',eg:[5000,13500,24000],gulf:[1200,3060,5400],intl:[320,816,1440]}
    ];
    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    cards.forEach(function(card,i){
      var d=planData[i]||planData[0];
      /* Pricing data attributes — always inject */
      card.dataset.egM1=d.eg[0];card.dataset.egM3=d.eg[1];card.dataset.egM6=d.eg[2];
      card.dataset.gulfM1=d.gulf[0];card.dataset.gulfM3=d.gulf[1];card.dataset.gulfM6=d.gulf[2];
      card.dataset.intM1=d.intl[0];card.dataset.intM3=d.intl[1];card.dataset.intM6=d.intl[2];
      /* Month picker — 1M/3M/6M only — always */
      var picker=card.querySelector('.month-picker');
      if(picker){picker.innerHTML='<button type="button" class="active" data-months="1" data-save="">1M</button><button type="button" data-months="3" data-save="15%">3M</button><button type="button" data-months="6" data-save="25%">6M</button>'}
      /* Currency class on small — always */
      var cur=card.querySelector('.price small');if(cur)cur.className='plan-currency';
      /* Text override — EN only */
      if(!isAr){var k=card.querySelector('.kicker'),h=card.querySelector('h3'),p=card.querySelector('p');if(k)k.textContent=d.kicker;if(h)h.textContent=d.title;if(p)p.textContent=d.desc;}
    });

    var region='int',currency='USD';
    function regionFromCountry(c){c=String(c||'').toUpperCase();if(c==='EG')return'eg';if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return'gulf';return'int'}
    function setRegion(r){
      region=r||'int';
      currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';
      cards.forEach(function(plan){updatePlan(plan,plan.querySelector('.month-picker button.active')||plan.querySelector('.month-picker button'))});
    }
    function updatePlan(plan,btn){
      if(!plan||!btn)return;
      plan.querySelectorAll('.month-picker button').forEach(function(x){x.classList.toggle('active',x===btn)});
      var months=btn.dataset.months||'1',key=region+'M'+months;
      var raw=Number(plan.dataset[key]||plan.dataset['intM'+months]||0);
      var monthly=Math.round(raw/Number(months));
      var price=plan.querySelector('.plan-price'),cur=plan.querySelector('.plan-currency'),saving=plan.querySelector('.saving');
      if(price)price.textContent=monthly.toLocaleString('en-US');
      if(cur)cur.textContent=currency+(isAr?' / شهر':' / month');
      var saveTxt=btn.dataset.save?(' — '+(isAr?'وفّر ':'save ')+btn.dataset.save):'';
      if(saving)saving.textContent=(isAr?'الإجمالي: ':'Total: ')+raw.toLocaleString('en-US')+' '+currency+saveTxt;
    }
    document.querySelectorAll('#plans .month-picker button').forEach(function(btn){btn.onclick=function(){updatePlan(btn.closest('.plan'),btn)}});
    try{localStorage.removeItem('o2f_region_auto')}catch(e){}
    setRegion('int');
    try{fetch('https://ipapi.co/json/').then(function(r){return r.ok?r.json():null}).then(function(d){setRegion(regionFromCountry(d&&d.country_code?d.country_code:''))}).catch(function(){setRegion('int')})}catch(e){setRegion('int')}
  });

  /* Comment submit handlers */
  window.arSubmitComment=function(){
    var name=document.getElementById('ar-cname'),svc=document.getElementById('ar-cservice'),txt=document.getElementById('ar-ctext'),st=document.getElementById('ar-cstatus');
    if(!name||!txt)return;
    st.style.display='block';st.textContent='جاري الإرسال...';
    var item={name:(name.value||'').trim(),service:(svc&&svc.value||'O2F').trim(),comment:(txt.value||'').trim(),status:'pending',rating:5};
    if(!item.name||!item.comment){st.textContent='الرجاء إدخال الاسم والتعليق.';return}
    fetch('https://qalzanmeusuqssrgxumg.supabase.co/rest/v1/comments',{method:'POST',headers:{'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbHphbm1ldXN1cXNzcmd4dW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjAxMDMsImV4cCI6MjA5MzE5NjEwM30.PHP_zC5firTlCfA9zFLXO1iqzUXMbiTsM6-7wKsDPOU','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbHphbm1ldXN1cXNzcmd4dW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjAxMDMsImV4cCI6MjA5MzE5NjEwM30.PHP_zC5firTlCfA9zFLXO1iqzUXMbiTsM6-7wKsDPOU','Content-Type':'application/json','Prefer':'return=representation'},body:JSON.stringify(item)}).then(function(r){if(r.ok){document.getElementById('ar-comment-form').reset();st.textContent='تم إرسال تعليقك للمراجعة. شكرًا!'}else{st.textContent='تعذر الإرسال. حاول مرة أخرى.'}}).catch(function(){st.textContent='تعذر الإرسال. حاول مرة أخرى.'});
  };
  window.enSubmitComment=function(){
    var name=document.getElementById('en-cname'),svc=document.getElementById('en-cservice'),txt=document.getElementById('en-ctext'),st=document.getElementById('en-cstatus');
    if(!name||!txt)return;
    st.style.display='block';st.textContent='Submitting...';
    var item={name:(name.value||'').trim(),service:(svc&&svc.value||'O2F').trim(),comment:(txt.value||'').trim(),status:'pending',rating:5};
    if(!item.name||!item.comment){st.textContent='Please enter your name and comment.';return}
    fetch('https://qalzanmeusuqssrgxumg.supabase.co/rest/v1/comments',{method:'POST',headers:{'apikey':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbHphbm1ldXN1cXNzcmd4dW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjAxMDMsImV4cCI6MjA5MzE5NjEwM30.PHP_zC5firTlCfA9zFLXO1iqzUXMbiTsM6-7wKsDPOU','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbHphbm1ldXN1cXNzcmd4dW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjAxMDMsImV4cCI6MjA5MzE5NjEwM30.PHP_zC5firTlCfA9zFLXO1iqzUXMbiTsM6-7wKsDPOU','Content-Type':'application/json','Prefer':'return=representation'},body:JSON.stringify(item)}).then(function(r){if(r.ok){document.getElementById('en-comment-form').reset();st.textContent='Your comment was submitted for review. Thank you!'}else{st.textContent='Could not submit. Please try again.'}}).catch(function(){st.textContent='Could not submit. Please try again.'});
  };
})();
