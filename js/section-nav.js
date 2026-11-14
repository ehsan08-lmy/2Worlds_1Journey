(() => {
  "use strict";

  const routeSection = document.getElementById("route-builder");
  const routeLink = document.querySelector('.route-nav-link[href*="#route-builder"]');
  const header = document.querySelector(".site-header");
  if (!routeSection || !routeLink) return;

  let frame = 0;
  const updateActiveSection = () => {
    frame = 0;
    const sectionRect = routeSection.getBoundingClientRect();
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
    // The active line sits just below the sticky navigation. The link stays
    // highlighted while that line is inside the My Route section.
    const activeLine = headerBottom + 34;
    const isCurrent = sectionRect.top <= activeLine && sectionRect.bottom > activeLine;
    routeLink.classList.toggle("is-section-current", isCurrent);
    if (isCurrent) routeLink.setAttribute("aria-label", "My route, current section of My Journey");
    else routeLink.removeAttribute("aria-label");
  };

  const scheduleUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);
  routeLink.addEventListener("click", () => window.setTimeout(scheduleUpdate, 80));
  window.addEventListener("load", scheduleUpdate, { once: true });
  scheduleUpdate();
})();
