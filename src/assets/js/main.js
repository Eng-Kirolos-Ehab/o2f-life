/* =========================================================================
   O2F.life — Main JS
   Mobile menu toggle + language switcher helpers + subtle scroll polish
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
  // <a data-lang-switch="ar"> will rewrite /en/foo → /ar/foo and vice-versa
  document.querySelectorAll("[data-lang-switch]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-lang-switch"); // "ar" or "en"
      if (!target) return;
      const other = target === "ar" ? "en" : "ar";
      const path = window.location.pathname.replace(
        `/${other}/`,
        `/${target}/`
      );
      e.preventDefault();
      window.location.href = path === window.location.pathname
        ? window.location.pathname.replace(/\/(en|ar)\/.*/, `/${target}/`)
        : path;
    });
  });
})();
