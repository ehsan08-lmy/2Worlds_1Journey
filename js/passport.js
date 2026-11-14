(() => {
  "use strict";
  const { places, $, escapeHTML } = window.TW;
  let firstRender = true;
  let previous = new Set();
  const animationTimers = new WeakMap();
  let bookAnimationTimer = 0;
  const jq = window.jQuery;
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function stampMarkup(place, index, collected) {
    const side = place.country === "Afghanistan" ? "afg" : "kaz";
    const short = place.country === "Afghanistan" ? "AFG" : "KAZ";
    const action = collected ? "Remove this place from your route" : "Add this place to your route";
    return `<button class="passport-stamp ${collected ? "is-collected" : "is-awaiting"} passport-stamp--${side}"
        type="button" data-passport-stop="${escapeHTML(place.id)}" aria-pressed="${String(collected)}"
        aria-label="${escapeHTML(place.name)}. ${collected ? "Collected" : "Awaiting"}. ${action}." title="${action}" style="--stamp-order:${index}">
      <img class="passport-stamp-photo" src="${escapeHTML(place.image)}" alt="" loading="lazy" decoding="async">
      <span class="passport-stamp-wash" aria-hidden="true"></span>
      <span class="passport-stamp-top"><span class="passport-stamp-no">${String(index + 1).padStart(2, "0")}</span><span class="passport-stamp-mark" aria-hidden="true">${collected ? "✳" : "+"}</span></span>
      <span class="passport-stamp-country">${short} · ${collected ? "COLLECTED" : "AWAITING"}</span>
      <strong>${escapeHTML(place.name)}</strong>
      <small>${escapeHTML(place.region)}</small>
      <span class="passport-stamp-action" aria-hidden="true">${collected ? "REMOVE MARK" : "COLLECT MARK"}</span>
    </button>`;
  }

  function animateStamp(stamp, collected) {
    if (!stamp) return;
    if (animationTimers.has(stamp)) window.clearTimeout(animationTimers.get(stamp));
    stamp.classList.remove("is-new-stamp", "is-unmarked-stamp");
    if (calm) return;
    // .stop(true, true) clears queued jQuery effects so rapid taps never build an animation queue.
    if (jq) {
      const $stamp = jq(stamp);
      $stamp.stop(true, true);
      $stamp.find(".passport-stamp-mark").stop(true, true).css("opacity", 0.38).animate({ opacity: 1 }, 300);
    }
    void stamp.offsetWidth;
    stamp.classList.add(collected ? "is-new-stamp" : "is-unmarked-stamp");
    const timer = window.setTimeout(() => stamp.classList.remove("is-new-stamp", "is-unmarked-stamp"), 900);
    animationTimers.set(stamp, timer);
  }

  function updateStamp(stamp, place, index, collected, changed) {
    const side = place.country === "Afghanistan" ? "afg" : "kaz";
    const short = place.country === "Afghanistan" ? "AFG" : "KAZ";
    const action = collected ? "Remove this place from your route" : "Add this place to your route";
    stamp.classList.toggle("is-collected", collected);
    stamp.classList.toggle("is-awaiting", !collected);
    stamp.classList.toggle("passport-stamp--afg", side === "afg");
    stamp.classList.toggle("passport-stamp--kaz", side === "kaz");
    stamp.setAttribute("aria-pressed", String(collected));
    stamp.setAttribute("aria-label", `${place.name}. ${collected ? "Collected" : "Awaiting"}. ${action}.`);
    stamp.title = action;
    stamp.style.setProperty("--stamp-order", index);
    const mark = stamp.querySelector(".passport-stamp-mark");
    const country = stamp.querySelector(".passport-stamp-country");
    const actionText = stamp.querySelector(".passport-stamp-action");
    if (mark) mark.textContent = collected ? "✳" : "+";
    if (country) country.textContent = `${short} · ${collected ? "COLLECTED" : "AWAITING"}`;
    if (actionText) actionText.textContent = collected ? "REMOVE MARK" : "COLLECT MARK";
    if (changed) animateStamp(stamp, collected);
  }

  const render = () => {
    const grid = $("#passportStamps");
    if (!grid || !window.TW.route) return;

    const saved = new Set(window.TW.route.get());
    const earned = places.filter((place) => saved.has(place.id)).length;
    const total = places.length;
    const progressText = $("#passportProgressText");
    const progress = $("#passportProgress");
    const fill = $("#passportProgressFill");

    if (progressText) progressText.textContent = `${earned} / ${total}`;
    if (progress) {
      progress.setAttribute("aria-valuemax", String(total));
      progress.setAttribute("aria-valuenow", String(earned));
    }
    if (fill) fill.style.width = `${total ? earned / total * 100 : 0}%`;

    if (firstRender) {
      grid.innerHTML = places.map((place, index) => stampMarkup(place, index, saved.has(place.id))).join("");
      firstRender = false;
    } else {
      places.forEach((place, index) => {
        const stamp = grid.querySelector(`[data-passport-stop="${CSS.escape(place.id)}"]`);
        if (stamp) updateStamp(stamp, place, index, saved.has(place.id), saved.has(place.id) !== previous.has(place.id));
      });
    }
    previous = saved;
  };

  document.addEventListener("tw:routechange", render);

  // The passport is also an interactive route control: click a stamp to collect/remove it.
  const grid = $("#passportStamps");
  if (grid) {
    if (jq) {
      jq(grid).on("click.twPassport", ".passport-stamp", function () {
        const id = this.dataset.passportStop;
        if (!id || !window.TW.route) return;
        const book = this.closest(".passport-book");
        if (book) {
          window.clearTimeout(bookAnimationTimer);
          jq(book).stop(true, true).removeClass("is-stamping");
          void book.offsetWidth;
          jq(book).addClass("is-stamping");
          bookAnimationTimer = window.setTimeout(() => jq(book).removeClass("is-stamping"), 720);
        }
        window.TW.route.toggle(id);
      });
      jq(grid).on("mouseenter.twPassport focusin.twPassport", ".passport-stamp", function () {
        jq(this).find(".passport-stamp-action").stop(true, true).fadeTo(calm ? 0 : 140, 1);
      }).on("mouseleave.twPassport focusout.twPassport", ".passport-stamp", function () {
        jq(this).find(".passport-stamp-action").stop(true, true).fadeTo(calm ? 0 : 140, 0.78);
      });
    } else {
      grid.addEventListener("click", (event) => {
        const stamp = event.target.closest("[data-passport-stop]");
        if (stamp && window.TW.route) window.TW.route.toggle(stamp.dataset.passportStop);
      });
    }
  }

  $("#printPassport")?.addEventListener("click", () => {
    document.body.classList.add("print-passport");
    window.print();
  });
  window.addEventListener("afterprint", () => document.body.classList.remove("print-passport"));
  window.TW.passport = { render };
  render();
})();
