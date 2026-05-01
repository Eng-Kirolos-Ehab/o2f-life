(function () {
  "use strict";

  const page = document.querySelector('.cmd-page');
  const zones = document.querySelectorAll('.dumbbell-zone');

  if (page && zones.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const zone = Array.from(entry.target.classList).find((c) => c.startsWith('zone-'));
          if (zone) page.setAttribute('data-dumbbell-zone', zone);
        }
      });
    }, { threshold: 0.36, rootMargin: '-12% 0px -38% 0px' });

    zones.forEach((zone) => io.observe(zone));
    page.setAttribute('data-dumbbell-zone', 'zone-hero');
  }
})();
