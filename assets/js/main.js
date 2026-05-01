(function () {
  "use strict";

  // THEME TOGGLE
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;

  const applyTheme = (mode) => {
    root.classList.toggle("light-mode", mode === "light");
    localStorage.setItem("theme", mode);
  };

  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.classList.contains("light-mode") ? "dark" : "light";
      applyTheme(next);
    });
  }

  // CUSTOM CURSOR
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });

  // LOADING SCREEN
  window.addEventListener("load", () => {
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.innerHTML = "<div class='loader-ring'></div>";
    document.body.appendChild(loader);

    setTimeout(() => {
      loader.classList.add("hide");
      setTimeout(() => loader.remove(), 600);
    }, 800);
  });

  // PARALLAX SCROLL
  const parallax = document.querySelectorAll(".premium-hero-mesh");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    parallax.forEach(el => {
      el.style.transform = `translateY(${y * 0.2}px)`;
    });
  });

})();