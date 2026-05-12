/* =========================================================================
   O2F.life — Main JS
   Mobile menu + language switcher + scroll polish + stat animations
   ========================================================================= */

(function () {
  "use strict";

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
      @media(max-width:720px){.o2f-v2 .dock,.o2f-v2-ar .dock,.dock{top:auto!important;bottom:calc(18px + env(safe-area-inset-bottom))!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;width:calc(100vw - 18px)!important;max-width:470px!important;overflow:visible!important;}.o2f-v2 .hero,.o2f-v2-ar .hero{padding-top:64px!important;padding-bottom:120px!important;}.o2f-v2 .final,.o2f-v2-ar .final{padding-bottom:160px!important;}.o2f-v2 .social-panel,.o2f-v2-ar .social-panel{top:auto!important;bottom:calc(88px + env(safe-area-inset-bottom))!important;}}
    `;
    document.head.appendChild(style);
  }

  injectHomeV2StabilityPatch();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHomeV2StabilityPatch, { once: true });
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
  // Adds the animate-number-pop class when the stat cards scroll into view
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
