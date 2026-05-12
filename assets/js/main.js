/* =========================================================================
   O2F.life — Main JS
   Mobile menu + language switcher + scroll polish + stat animations
   ========================================================================= */

(function () {
  "use strict";

  function normalizeHomeV2Dock() {
    const root = document.querySelector('.o2f-v2, .o2f-v2-ar');
    if (!root || root.dataset.dockNormalized === '1') return;
    const isAr = root.classList.contains('o2f-v2-ar');
    const dock = root.querySelector('.dock');
    if (!dock) return;

    dock.innerHTML = isAr
      ? `<a href="#hero" class="active">الرئيسية</a><a href="#coach">المدرب</a><a href="#programs">البرامج</a><a href="#gallery">المعرض</a><a href="#plans">الباقات</a><a href="/en/">EN</a><div class="social-menu" id="socialMenu"><button type="button" id="socialToggle">☰</button><div class="social-panel"><a href="https://wa.me/201000000000">واتساب <span>↗</span></a><a href="#contact">الشات <span>→</span></a><a href="https://www.facebook.com/">فيسبوك <span>↗</span></a><a href="https://www.instagram.com/">إنستجرام <span>↗</span></a></div></div>`
      : `<a href="#hero" class="active">Home</a><a href="#coach">Coach</a><a href="#programs">Programs</a><a href="#gallery">Gallery</a><a href="#plans">Plans</a><a href="/ar/">AR</a><div class="social-menu" id="socialMenu"><button type="button" id="socialToggle">☰</button><div class="social-panel"><a href="https://wa.me/201000000000">WhatsApp <span>↗</span></a><a href="#contact">Chatbot <span>→</span></a><a href="https://www.facebook.com/">Facebook <span>↗</span></a><a href="https://www.instagram.com/">Instagram <span>↗</span></a></div></div>`;

    const toggle = dock.querySelector('#socialToggle');
    const menu = dock.querySelector('#socialMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        menu.classList.toggle('open');
      });
      document.addEventListener('click', function (event) {
        if (!menu.contains(event.target)) menu.classList.remove('open');
      });
    }
    root.dataset.dockNormalized = '1';
  }

  // ---------- Home V2 published-page stability hotfix ----------
  // gh-pages currently contains older inline Home V2 CSS. Inject this after load
  // so it wins over the inline rules without replacing the built HTML file.
  function injectHomeV2StabilityPatch() {
    if (!document.querySelector('.o2f-v2, .o2f-v2-ar')) return;
    if (document.getElementById('o2f-v2-runtime-stability-patch')) return;

    const style = document.createElement('style');
    style.id = 'o2f-v2-runtime-stability-patch';
    style.textContent = `
      body:has(.o2f-v2),body:has(.o2f-v2-ar){overflow-x:hidden!important;background:#06110d!important;scroll-behavior:smooth!important;}
      .o2f-v2,.o2f-v2-ar{overflow:visible!important;contain:none!important;transform:none!important;filter:none!important;perspective:none!important;}
      .o2f-bg,#o2fBg{position:fixed!important;inset:-14%!important;z-index:0!important;display:block!important;opacity:1!important;visibility:visible!important;background-position:center top!important;background-size:cover!important;background-repeat:no-repeat!important;filter:saturate(1.08) contrast(1.05)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;will-change:transform!important;transform:translate3d(0,var(--bg-y,0),0) scale(var(--bg-s,1.14))!important;backface-visibility:hidden!important;pointer-events:none!important;}
      .o2f-v2:before,.o2f-v2-ar:before{position:fixed!important;pointer-events:none!important;}
      .o2f-v2 .dock,.o2f-v2-ar .dock,.dock{position:fixed!important;top:auto!important;bottom:18px!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;z-index:9999!important;contain:none!important;}
      .o2f-v2 .v2-footer,.o2f-v2-ar .v2-footer{position:relative!important;z-index:3!important;}
      .o2f-v2 .social-menu,.o2f-v2-ar .social-menu{position:relative!important;}
      .o2f-v2 .social-panel,.o2f-v2-ar .social-panel{position:absolute!important;right:0!important;bottom:48px!important;display:none!important;min-width:190px!important;padding:10px!important;border-radius:22px!important;background:rgba(6,17,13,.86)!important;border:1px solid rgba(255,255,255,.26)!important;backdrop-filter:blur(20px)!important;box-shadow:0 20px 60px rgba(0,0,0,.35)!important;}
      .o2f-v2 .social-menu.open .social-panel,.o2f-v2-ar .social-menu.open .social-panel{display:grid!important;gap:7px!important;}
      .o2f-v2 .social-panel a,.o2f-v2-ar .social-panel a{display:flex!important;width:100%!important;justify-content:space-between!important;background:rgba(255,255,255,.1)!important;}

      /* Arabic Home V2 visual alignment: match the polished EN layout but keep RTL text */
      .o2f-v2-ar{direction:rtl!important;text-align:right!important;}
      .o2f-v2-ar .container{width:min(1220px,100%)!important;margin-inline:auto!important;}
      .o2f-v2-ar .grid2{display:grid!important;grid-template-columns:minmax(320px,.9fr) minmax(520px,1.1fr)!important;gap:clamp(22px,5vw,68px)!important;align-items:center!important;}
      .o2f-v2-ar #coach .coach-photo{order:1!important;min-height:660px!important;}
      .o2f-v2-ar #coach .panel{order:2!important;}
      .o2f-v2-ar .journey,.o2f-v2-ar .cards3,.o2f-v2-ar .steps,.o2f-v2-ar .plans{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;align-items:stretch!important;}
      .o2f-v2-ar .journey-card,.o2f-v2-ar .steps .glass,.o2f-v2-ar .plan,.o2f-v2-ar .mini{height:100%!important;min-height:unset!important;}
      .o2f-v2-ar .tab-panel{grid-template-columns:1.05fr .95fr!important;gap:18px!important;align-items:stretch!important;}
      .o2f-v2-ar .tab-panel.active{display:grid!important;}
      .o2f-v2-ar .tab-copy{order:1!important;}
      .o2f-v2-ar .visual{order:2!important;min-height:500px!important;}
      .o2f-v2-ar .before-wrap{display:grid!important;grid-template-columns:1.15fr .85fr!important;gap:22px!important;align-items:center!important;}
      .o2f-v2-ar .ba{min-height:540px!important;grid-template-columns:1fr 1fr!important;}
      .o2f-v2-ar .gallery-grid{display:grid!important;grid-template-columns:1.2fr .8fr 1fr!important;grid-auto-rows:190px!important;gap:14px!important;}
      .o2f-v2-ar .gallery-item.big{grid-row:span 2!important;}
      .o2f-v2-ar .result-card{grid-template-columns:auto 1fr!important;}
      .o2f-v2-ar .features li{padding-right:14px!important;padding-left:0!important;}
      .o2f-v2-ar .features li:before{right:0!important;left:auto!important;}
      .o2f-v2-ar .label{right:16px!important;left:auto!important;}
      .o2f-v2-ar .gallery-item span{right:14px!important;left:auto!important;}
      .o2f-v2-ar .kicker{letter-spacing:.05em!important;}
      .o2f-v2-ar h1,.o2f-v2-ar h2,.o2f-v2-ar h3{font-family:Tajawal,Inter,system-ui,sans-serif!important;}
      .o2f-v2-ar .comment-card{direction:rtl!important;text-align:right!important;}

      @media(max-width:1050px){
        .o2f-v2-ar .grid2,.o2f-v2-ar .tab-panel,.o2f-v2-ar .before-wrap{grid-template-columns:1fr!important;}
        .o2f-v2-ar .plans,.o2f-v2-ar .steps,.o2f-v2-ar .cards3{grid-template-columns:1fr 1fr!important;}
        .o2f-v2-ar .gallery-grid{grid-template-columns:1fr 1fr!important;}
        .o2f-v2-ar #coach .coach-photo{order:-1!important;min-height:520px!important;}
      }
      @media(max-width:720px){
        .o2f-v2 .dock,.o2f-v2-ar .dock,.dock{top:auto!important;bottom:calc(18px + env(safe-area-inset-bottom))!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;width:calc(100vw - 18px)!important;max-width:470px!important;overflow-x:auto!important;overflow-y:visible!important;justify-content:flex-start!important;}
        .o2f-v2 .hero,.o2f-v2-ar .hero{padding-top:64px!important;padding-bottom:120px!important;}
        .o2f-v2 .final,.o2f-v2-ar .final{padding-bottom:160px!important;}
        .o2f-v2 .social-panel,.o2f-v2-ar .social-panel{top:auto!important;bottom:calc(52px + env(safe-area-inset-bottom))!important;right:0!important;}
        .o2f-v2-ar .journey,.o2f-v2-ar .plans,.o2f-v2-ar .steps,.o2f-v2-ar .cards3,.o2f-v2-ar .ba,.o2f-v2-ar .gallery-grid{grid-template-columns:1fr!important;}
        .o2f-v2-ar .tab-panel.active{display:flex!important;flex-direction:column!important;}
        .o2f-v2-ar .visual{order:-1!important;min-height:320px!important;}
        .o2f-v2-ar .coach-photo{min-height:430px!important;}
        .o2f-v2-ar .stats{grid-template-columns:1fr 1fr!important;}
        .o2f-v2-ar .result-card{grid-template-columns:1fr!important;}
        .o2f-v2-ar .gallery-item,.o2f-v2-ar .gallery-item.big{grid-row:auto!important;height:260px!important;}
        .o2f-v2-ar .btns{flex-direction:column!important;}
        .o2f-v2-ar .btn{width:100%!important;}
        .o2f-v2-ar h1{font-size:clamp(42px,13vw,66px)!important;}
      }
    `;
    document.head.appendChild(style);
  }

  injectHomeV2StabilityPatch();
  normalizeHomeV2Dock();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectHomeV2StabilityPatch();
      normalizeHomeV2Dock();
    }, { once: true });
  }

  // ---------- Mobile menu toggle ----------
  const menuBtn   = document.querySelector("[data-menu-btn]");
  const menuPanel = document.querySelector("[data-menu-panel]");

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", () => {
      const open = menuPanel.classList.toggle("hidden") === false;
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  // ---------- Smooth scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---------- Header shadow on scroll ----------
  const header = document.querySelector("[data-site-header]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------- Language switcher (preserves current path) ----------
  document.querySelectorAll("[data-lang-switch]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-lang-switch");
      if (!target) return;
      const other = target === "ar" ? "en" : "ar";
      const path = window.location.pathname.replace(`/${other}/`, `/${target}/`);
      e.preventDefault();
      window.location.href = path === window.location.pathname
        ? window.location.pathname.replace(/\/(en|ar)\/.*/, `/${target}/`)
        : path;
    });
  });

  // ---------- Stat card entrance animation ----------
  const statCards = document.querySelectorAll(".card-hover .glow-text-mint");
  if (statCards.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-number-pop");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statCards.forEach((el) => io.observe(el));
  }

  // ---------- Parallax-lite on hero orbs ----------
  const orbs = document.querySelectorAll(".hero-orb");
  if (orbs.length) {
    let ticking = false;
    document.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.04;
            orb.style.transform = `translateY(${y * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
