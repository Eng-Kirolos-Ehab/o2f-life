(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Theme toggle
  const applyTheme = (mode) => {
    root.classList.toggle("light-mode", mode === "light");
    localStorage.setItem("theme", mode);
  };
  applyTheme(localStorage.getItem("theme") || "dark");
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => applyTheme(root.classList.contains("light-mode") ? "dark" : "light"));
  });

  // Mobile menu
  const menuBtn = document.querySelector("[data-menu-btn]");
  const menuPanel = document.querySelector("[data-menu-panel]");
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", () => {
      const open = menuPanel.classList.toggle("hidden") === false;
      menuBtn.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    menuPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuPanel.classList.add("hidden");
        menuBtn.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header scroll state
  const header = document.querySelector("[data-site-header]");
  const onScrollHeader = () => header && header.classList.toggle("is-scrolled", window.scrollY > 12);
  document.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // Language switcher keeps current path
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

  // Cinematic reveal for existing sections/cards
  const revealItems = document.querySelectorAll(".premium-section, .glass-feature-card, .premium-hero-shell, .premium-image-frame");
  revealItems.forEach((el) => el.classList.add("cinema-reveal"));
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach((el) => revealIO.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  // Desktop-only cursor glow + trail
  if (canHover && !reduceMotion) {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const trail = [];
    for (let i = 0; i < 8; i += 1) {
      const dot = document.createElement("span");
      dot.className = "cursor-trail";
      document.body.appendChild(dot);
      trail.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function animateTrail() {
      let x = mouseX;
      let y = mouseY;
      trail.forEach((p, i) => {
        p.x += (x - p.x) * 0.24;
        p.y += (y - p.y) * 0.24;
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${1 - i * 0.07})`;
        p.el.style.opacity = String(0.32 - i * 0.03);
        x = p.x;
        y = p.y;
      });
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    document.querySelectorAll("a, button, .glass-feature-card").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("active"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
  }

  // Magnetic buttons desktop only
  if (canHover && !reduceMotion) {
    document.querySelectorAll(".btn-primary, .premium-icon-btn, .premium-lang").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.18;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  // 3D card tilt desktop only
  if (canHover && !reduceMotion) {
    document.querySelectorAll(".glass-feature-card, .premium-image-frame").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  // Smooth anchor scroll
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

})();
