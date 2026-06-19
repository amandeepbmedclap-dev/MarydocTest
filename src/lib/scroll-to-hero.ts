const HEADER_OFFSET = 96;

function unlockPageScroll() {
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
}

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function forceScrollTo(top: number) {
  const y = Math.max(0, Math.round(top));
  window.scrollTo(0, y);
  document.documentElement.scrollTop = y;
  document.body.scrollTop = y;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function waitForScrollEnd(targetTop: number, maxWaitMs = 2200) {
  return new Promise<void>((resolve) => {
    const startedAt = performance.now();

    const tick = () => {
      const current = getScrollY();
      const atTarget = Math.abs(current - targetTop) <= 6;
      const timedOut = performance.now() - startedAt >= maxWaitMs;

      if (atTarget || timedOut) {
        if (!atTarget) forceScrollTo(targetTop);
        resolve();
        return;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

export async function scrollToHeroSection(preferInstant = false): Promise<void> {
  window.dispatchEvent(new CustomEvent("marydoc:close-scroll-lock"));
  unlockPageScroll();

  // Let promo/modal close and restore scrolling before we measure + scroll.
  await wait(180);
  unlockPageScroll();

  const hero =
    document.getElementById("about") ??
    document.getElementById("hero-evaluation") ??
    document.getElementById("main-content");

  const behavior: ScrollBehavior = preferInstant ? "auto" : "smooth";
  const targetTop = hero
    ? hero.getBoundingClientRect().top + getScrollY() - HEADER_OFFSET
    : 0;
  const top = Math.max(0, targetTop);

  if (hero) {
    hero.scrollIntoView({ behavior, block: "start" });
  }

  window.scrollTo({ top, left: 0, behavior });
  document.documentElement.scrollTo({ top, left: 0, behavior });

  if (preferInstant) {
    forceScrollTo(top);
    return;
  }

  await waitForScrollEnd(top);

  if (Math.abs(getScrollY() - top) > 6) {
    forceScrollTo(top);
  }
}
