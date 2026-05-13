/* =========================================================================
   O2F.life — Main JS
   Mobile menu + language switcher + scroll polish + stat animations
   ========================================================================= */

(function () {
  "use strict";

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
