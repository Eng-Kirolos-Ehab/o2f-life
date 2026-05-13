(function(){
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn):fn()}
  ready(function(){
    var isAr=!!document.querySelector('.o2f-v2-ar');

    /* ── Experience / timeline section ── */
    var coach=document.getElementById('coach');
    if(coach&&!document.getElementById('osama-experience')){
      var expHtml = isAr
        ? '<section class="section osama-timeline" id="osama-experience"><div class="container timeline-wrap"><article class="glass timeline-intro"><span class="kicker">خبرة أسامة عمران</span><h2>مسيرة مبنية على خبرة فتنس دولية.</h2><p>خبير معتمد في التغذية وتحول الجسم، بسجل قوي في برامج التدريب والتغذية المتكاملة للتحول والأداء والتحضير للبطولات.</p><div class="achievement-grid"><div class="achievement-card"><strong>1st</strong><span>بطولة العرب للبودي بيلدينج — الرجال</span></div><div class="achievement-card"><strong>11</strong><span>ميدالية مع فريق محترف في 2018</span></div><div class="achievement-card"><strong>8</strong><span>رياضيون قادهم في بطولة Shawn Rhoden Classic</span></div></div></article><div class="timeline-list"><div class="timeline-item"><span class="timeline-year">2008</span><div class="timeline-card"><b>Lara Health and Strength Center — السعودية</b><p>بداية مسيرة تدريبية دولية قوية تركز على جودة التدريب وتحول الجسم.</p></div></div><div class="timeline-item"><span class="timeline-year">2010</span><div class="timeline-card"><b>Champions Corner — السعودية</b><p>توسيع الخبرة في بيئات تدريب متقدمة وتطوير موجه للعملاء.</p></div></div><div class="timeline-item"><span class="timeline-year">2013</span><div class="timeline-card"><b>Fitness First — السعودية</b><p>العمل ضمن علامة فتنس عالمية وتطوير برامج منظمة لأهداف متنوعة.</p></div></div><div class="timeline-item"><span class="timeline-year">2015</span><div class="timeline-card"><b>Golds Gym — السعودية</b><p>تعميق الخبرة في تدريب الأداء وتطوير القوام والتدريب الاحترافي.</p></div></div><div class="timeline-item"><span class="timeline-year">2017</span><div class="timeline-card"><b>Maxima Gym — تايلاند</b><p>انكشاف دولي أوسع وخبرة عملية في ثقافة تدريب مختلفة.</p></div></div><div class="timeline-item"><span class="timeline-year">2018</span><div class="timeline-card"><b>Shawn Rhoden Classic — الفلبين</b><p>قيادة فريق محترف من 8 رياضيين حققوا 11 ميدالية، منهم 3 رياضيين فازوا بميداليات متعددة.</p></div></div><div class="timeline-item"><span class="timeline-year">الآن</span><div class="timeline-card"><b>التحول وإعداد البطولات</b><p>خطط تغذية وتدريب مخصصة، متابعة أسبوعية لتقدم الأداء، دعم مستمر، وإعداد متقدم للبطولات.</p></div></div></div></div></section>'
        : '<section class="section osama-timeline" id="osama-experience"><div class="container timeline-wrap"><article class="glass timeline-intro"><span class="kicker">Osama Omran Experience</span><h2>A career built through international fitness experience.</h2><p>Certified expert in nutrition and body transformation, with a strong record in integrated training and nutrition programs for transformation, performance, and competition preparation.</p><div class="achievement-grid"><div class="achievement-card"><strong>1st</strong><span>15th Men Arab Bodybuilding Championship</span></div><div class="achievement-card"><strong>11</strong><span>Medals with a professional team in 2018</span></div><div class="achievement-card"><strong>8</strong><span>Athletes led in Shawn Rhoden Classic</span></div></div></article><div class="timeline-list"><div class="timeline-item"><span class="timeline-year">2008</span><div class="timeline-card"><b>Lara Health and Strength Center - Saudi Arabia</b><p>Started a strong international coaching path focused on training quality and body transformation.</p></div></div><div class="timeline-item"><span class="timeline-year">2010</span><div class="timeline-card"><b>Champions Corner - Saudi Arabia</b><p>Expanded experience in advanced training environments and client-focused development.</p></div></div><div class="timeline-item"><span class="timeline-year">2013</span><div class="timeline-card"><b>Fitness First - Saudi Arabia</b><p>Worked within a global fitness brand, refining structured programs for different goals.</p></div></div><div class="timeline-item"><span class="timeline-year">2015</span><div class="timeline-card"><b>Golds Gym - Saudi Arabia</b><p>Strengthened expertise in performance training, physique development, and professional coaching.</p></div></div><div class="timeline-item"><span class="timeline-year">2017</span><div class="timeline-card"><b>Maxima Gym - Thailand</b><p>Added wider international exposure and practical experience in a different training culture.</p></div></div><div class="timeline-item"><span class="timeline-year">2018</span><div class="timeline-card"><b>Shawn Rhoden Classic - Philippines</b><p>Led a professional team of 8 athletes who achieved 11 medals, with 3 athletes winning multiple medals across categories.</p></div></div><div class="timeline-item"><span class="timeline-year">Now</span><div class="timeline-card"><b>Transformation and Competition Preparation</b><p>Provides customized nutrition and training plans, weekly progress tracking, continuous support, and advanced competition preparation.</p></div></div></div></div></section>';
      coach.insertAdjacentHTML('afterend', expHtml);
    }

    /* Add Experience link to dock */
    var dock=document.querySelector('.dock');
    if(dock&&!dock.querySelector('a[href="#osama-experience"]')){
      var expLink=document.createElement('a');
      expLink.href='#osama-experience';
      expLink.textContent=isAr?'الخبرة':'Experience';
      var plansLink=dock.querySelector('a[href="#plans"]');
      dock.insertBefore(expLink,plansLink||dock.lastChild);
    }

    /* ── Stories / comments section ── */
    var stories=document.getElementById('stories');
    if(stories){
      stories.classList.add('stories-section');
      var old=stories.querySelector('.container');if(old){old.classList.remove('container')}
      var m=stories.querySelector('.marquee');
      if(m){
        function mkAvatar(name){
          return '<div class=”comment-avatar”>'+((name||'?')[0].toUpperCase())+'</div>';
        }
        /* c = [name, service, text, dir, colorIdx] */
        var commentsA=[
          ['Mariam Adel','Full Transformation','The follow-up made the difference. The plan changed when my body changed.','ltr',0],
          ['سارة محمود','برنامج التحول','أكتر حاجة فرقت معايا إن الخطة كانت بتتعدل حسب تقدمي مش كلام ثابت.','rtl',1],
          ['Omar Khaled','Training Plan','I stopped guessing and started following simple weekly steps.','ltr',2],
          ['مينا سامي','متابعة تدريب','كنت عارف أعمل إيه كل أسبوع، وده خلاني ألتزم من غير توتر.','rtl',3],
          ['Hana Mostafa','Nutrition','The nutrition direction was realistic and easy to apply with my routine.','ltr',4],
          ['عبدالله ناصر','خطة تغذية','التمرين والأكل كانوا ماشيين مع بعض، فالتغيير كان مفهوم ومريح.','rtl',5],
          ['Nour Ibrahim','Coaching','I felt guided, not left alone with a random plan.','ltr',0],
          ['ريم خالد','تحسين نمط الحياة','المتابعة الأسبوعية خلتني أحس إن فيه حد فاهم هدفي وماشي معايا.','rtl',1],
          ['Karim Samir','Body Recomp','My routine became cleaner and the progress was easy to track.','ltr',2],
          ['فريدة سليم','Anti-Aging','شعرت بفرق حقيقي في طاقتي اليومية بعد ما بدأت الخطة.','rtl',3],
          ['Dina Youssef','Weight Loss','Clear weekly targets helped me stay on track without overthinking.','ltr',4],
          ['لمياء حسين','تحول كامل','المتابعة الأسبوعية غيرت طريقة تفكيري في الصحة والالتزام.','rtl',5],
          ['Maged Fathy','Strength Plan','The progress was measurable and the system made sense from day one.','ltr',0],
          ['Youssef Amin','Wellness','The lifestyle changes improved my day, not just my workouts.','ltr',1],
          ['نورهان علي','متابعة مستمرة','الدعم المستمر خلاني أكمل حتى لما الحماس قل.','rtl',2],
          ['Sherif Nour','Nutrition Plan','Having a structure that adapts to my schedule made it sustainable.','ltr',3],
          ['هدى إبراهيم','برنامج صحي','الخطة كانت واضحة ومش معقدة، وده خلاني أستمر من غير ضغط.','rtl',4],
          ['Rami Hassan','Competition Prep','Every week felt like a clear step forward, not just hard work.','ltr',5],
          ['منى فاروق','إنقاص وزن','شعرت إن فيه اهتمام فعلي بوضعي، مش مجرد برنامج جاهز.','rtl',0],
          ['Ahmed Saber','Training','The simplicity of the weekly structure made everything manageable.','ltr']
        ];
        var commentsB=[
          ['Ahmed Tarek','Competition Prep','Training, nutrition, and support were connected in one simple system.','ltr'],
          ['ليلى حسن','Anti-Aging','الخطة كانت ماشية مع يومي ومش محتاجة تعقيد عشان ألتزم.','rtl'],
          ['Salma Nabil','Therapeutic Nutrition','The weekly structure made training easier to stick to.','ltr'],
          ['يوسف عادل','تحول جسم','حسيت إن فيه نظام واضح مش مجرد نصائح عامة.','rtl'],
          ['Nada Fouad','Lifestyle Plan','The plan was practical and still felt premium.','ltr'],
          ['أحمد مصطفى','إعداد بطولة','المتابعة كانت دقيقة وخلتني أجهز بشكل أقوى.','rtl'],
          ['Mona Zaki','Weight Loss','I liked that the plan was simple enough to continue.','ltr'],
          ['خالد سامح','برنامج تدريبي','كل أسبوع كان فيه تعديل واضح على حسب النتيجة.','rtl'],
          ['Farah Magdy','Wellness Support','It helped me build habits instead of chasing motivation.','ltr'],
          ['هاني طارق','تحضير بطولة','النظام والدقة في المتابعة جعلاني أصل لأفضل حالاتي.','rtl'],
          ['Yasmine Gamal','Wellness','The holistic approach to health was exactly what I needed.','ltr'],
          ['محمود رضا','إنقاص وزن','وضوح الخطة من البداية جعل الالتزام أمراً طبيعياً.','rtl'],
          ['Rasha Salem','Body Transformation','Every week brought visible progress and renewed motivation.','ltr'],
          ['كريمة فؤاد','متابعة تغذية','الاهتمام بالتفاصيل الشخصية جعل الخطة مناسبة تماماً لي.','rtl'],
          ['Ibrahim Nour','Nutrition','The approach connected food and training in a way that actually worked.','ltr'],
          ['نجلاء سعيد','صحة عامة','أول مرة أحس إن برنامج صحي ماشي مع أسلوب حياتي فعلاً.','rtl'],
          ['Tarek Fathy','Strength','Consistent follow-up kept me on track even during busy weeks.','ltr'],
          ['داليا وليد','تغذية علاجية','التفاصيل الدقيقة في الخطة أثرت فرقاً واضحاً في نتيجتي.','rtl'],
          ['Omar Essam','Recomposition','Seeing measurable results weekly kept my motivation high throughout.','ltr'],
          ['سلمى عماد','Anti-Aging','المتابعة المستمرة جعلتني أفهم جسمي أكثر وأتعامل معه بشكل أذكى.','rtl']
        ];
        function mkCard(c){
          return '<article class=”comment-card” dir=”'+c[3]+'”>'
            +'<div class=”comment-body”><div class=”quote”>”</div><p>'+c[2]+'</p></div>'
            +'<div class=”comment-person”>'
              +mkAvatar(c[0])
              +'<div><span class=”comment-name”>'+c[0]+'</span><span class=”comment-service”>'+c[1]+'</span></div>'
            +'</div>'
          +'</article>';
        }
        m.innerHTML='<div class=”marquee-row row-a”>'+commentsA.concat(commentsA).map(mkCard).join('')+'</div>'
          +'<div class=”marquee-row row-b”>'+commentsB.concat(commentsB).map(mkCard).join('')+'</div>';
        m.style.visibility='visible';
      }

      /* Add comment card — language aware */
      if(!document.getElementById('home-v2-add-comment')){
        var addCommentHtml = isAr
          ? '<div class="glass add-comment-card" id="home-v2-add-comment" dir="rtl"><div><h3>شارك تجربتك</h3><p>التعليق ينتقل للمراجعة أولًا، ثم يمكن قبوله من لوحة الإدارة.</p><form class="add-comment-form" id="ar-comment-form"><div class="form-row"><input type="text" id="ar-cname" placeholder="الاسم" maxlength="40"><input type="text" id="ar-cservice" placeholder="الخدمة / الباقة" maxlength="60"></div><textarea id="ar-ctext" rows="4" placeholder="اكتب تعليقك هنا..." maxlength="320"></textarea><button type="button" class="btn primary" onclick="arSubmitComment()">إرسال للمراجعة</button><p id="ar-cstatus" style="font-size:13px;color:var(--mint);margin-top:8px;display:none"></p></form></div><div class="add-comment-note"><h3>كيف يعمل؟</h3><ul><li>✓ العميل يرسل اسمه وتعليقه.</li><li>✓ الأدمن يراجع من لوحة الإدارة.</li><li>✓ التعليق يظهر بعد القبول.</li></ul></div></div>'
          : '<div class="glass add-comment-card" id="home-v2-add-comment"><div><h3>Share your experience</h3><p>The comment goes to review first, then it can be approved from the admin panel.</p><form class="add-comment-form" id="en-comment-form"><div class="form-row"><input type="text" id="en-cname" placeholder="Name" maxlength="40"><input type="text" id="en-cservice" placeholder="Service / plan" maxlength="60"></div><textarea id="en-ctext" rows="4" placeholder="Write your comment here..." maxlength="320"></textarea><button type="button" class="btn primary" onclick="enSubmitComment()">Submit for review</button><p id="en-cstatus" style="font-size:13px;color:var(--mint);margin-top:8px;display:none"></p></form></div><div class="add-comment-note"><h3>Comment moderation</h3><ul><li>✓ Client submits name and comment.</li><li>✓ Admin reviews in the admin panel.</li><li>✓ Comment appears after approval.</li></ul></div></div>';
        stories.insertAdjacentHTML('beforeend', addCommentHtml);
      }
    }

    /* ── Plan pricing data ── */
    var planData=[
      {title:'Full Transformation Plan',kicker:'Complete',desc:'Complete transformation combining personalized nutrition, training, and daily follow-up.',eg:[5000,13500,24000],gulf:[1200,3060,5400],intl:[320,816,1440]},
      {title:'Therapeutic Nutrition Plan',kicker:'Therapeutic',desc:'Specialized nutrition plan with clear weekly follow-up and lifestyle support.',eg:[2400,6480,11520],gulf:[600,1530,2700],intl:[160,408,720]},
      {title:'Anti-Aging Guidance',kicker:'Wellness',desc:'Holistic route focused on recovery, vitality, sustainable habits, and long-term consistency.',eg:[5000,13500,24000],gulf:[1200,3060,5400],intl:[320,816,1440]}
    ];
    var cards=[].slice.call(document.querySelectorAll('#plans .plan'));
    cards.forEach(function(card,i){
      var d=planData[i]||planData[0];
      card.dataset.egM1=d.eg[0];card.dataset.egM3=d.eg[1];card.dataset.egM6=d.eg[2];
      card.dataset.gulfM1=d.gulf[0];card.dataset.gulfM3=d.gulf[1];card.dataset.gulfM6=d.gulf[2];
      card.dataset.intM1=d.intl[0];card.dataset.intM3=d.intl[1];card.dataset.intM6=d.intl[2];
      var picker=card.querySelector('.month-picker');
      if(picker){picker.innerHTML='<button type="button" class="active" data-months="1" data-save="">1M</button><button type="button" data-months="3" data-save="15%">3M</button><button type="button" data-months="6" data-save="25%">6M</button>'}
      var cur=card.querySelector('.price small');if(cur)cur.className='plan-currency';
      if(!isAr){var k=card.querySelector('.kicker'),h=card.querySelector('h3'),p=card.querySelector('p');if(k)k.textContent=d.kicker;if(h)h.textContent=d.title;if(p)p.textContent=d.desc;}
    });

    var region='int',currency='USD';
    function regionFromCountry(c){c=String(c||'').toUpperCase();if(c==='EG')return'eg';if(['SA','AE','KW','QA','BH','OM'].indexOf(c)!==-1)return'gulf';return'int'}
    function setRegion(r){
      region=r||'int';currency=region==='eg'?'EGP':region==='gulf'?'SAR':'USD';
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
      var sv=btn.dataset.save?(' — '+(isAr?'وفّر ':'save ')+btn.dataset.save):'';
      if(saving)saving.textContent=(isAr?'الإجمالي: ':'Total: ')+raw.toLocaleString('en-US')+' '+currency+sv;
    }
    document.querySelectorAll('#plans .month-picker button').forEach(function(btn){btn.onclick=function(){updatePlan(btn.closest('.plan'),btn)}});
    setRegion('int');
    try{fetch('https://ipapi.co/json/').then(function(r){return r.ok?r.json():null}).then(function(d){setRegion(regionFromCountry(d&&d.country_code?d.country_code:''))}).catch(function(){setRegion('int')})}catch(e){setRegion('int')}
  });

  var SUPA_URL='https://qalzanmeusuqssrgxumg.supabase.co';
  var SUPA_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbHphbm1ldXN1cXNzcmd4dW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MjAxMDMsImV4cCI6MjA5MzE5NjEwM30.PHP_zC5firTlCfA9zFLXO1iqzUXMbiTsM6-7wKsDPOU';
  function supaPost(item,onOk,onErr){
    fetch(SUPA_URL+'/rest/v1/comments',{method:'POST',headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY,'Content-Type':'application/json','Prefer':'return=representation'},body:JSON.stringify(item)}).then(function(r){r.ok?onOk():onErr()}).catch(onErr);
  }
  window.arSubmitComment=function(){
    var n=document.getElementById('ar-cname'),s=document.getElementById('ar-cservice'),t=document.getElementById('ar-ctext'),st=document.getElementById('ar-cstatus');
    if(!n||!t)return;st.style.display='block';st.textContent='جاري الإرسال...';
    var item={name:n.value.trim(),service:(s&&s.value.trim())||'O2F',comment:t.value.trim(),status:'pending',rating:5};
    if(!item.name||!item.comment){st.textContent='الرجاء إدخال الاسم والتعليق.';return}
    supaPost(item,function(){document.getElementById('ar-comment-form').reset();st.textContent='تم الإرسال! سيظهر بعد المراجعة. شكرًا ✓'},function(){st.textContent='تعذر الإرسال. حاول مرة أخرى.'});
  };
  window.enSubmitComment=function(){
    var n=document.getElementById('en-cname'),s=document.getElementById('en-cservice'),t=document.getElementById('en-ctext'),st=document.getElementById('en-cstatus');
    if(!n||!t)return;st.style.display='block';st.textContent='Submitting...';
    var item={name:n.value.trim(),service:(s&&s.value.trim())||'O2F',comment:t.value.trim(),status:'pending',rating:5};
    if(!item.name||!item.comment){st.textContent='Please enter your name and comment.';return}
    supaPost(item,function(){document.getElementById('en-comment-form').reset();st.textContent='Submitted! Will appear after review. Thank you ✓'},function(){st.textContent='Could not submit. Please try again.'});
  };
})();
