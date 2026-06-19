import { flushSync } from "react-dom";

type ToggleThemeOptions = {
  nextTheme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  origin?: { x: number; y: number };
};

const TRANSITION_MS = 520;

function getRevealRadius(x: number, y: number) {
  return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
}

export function toggleThemeWithTransition({
  nextTheme,
  setTheme,
  origin,
}: ToggleThemeOptions) {
  const applyTheme = () => {
    flushSync(() => {
      setTheme(nextTheme);
    });
  };

  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    applyTheme();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const radius = getRevealRadius(x, y);

  const transition = document.startViewTransition(applyTheme);

  transition.ready
    .then(() => {
      const goingDark = nextTheme === "dark";

      document.documentElement.animate(
        {
          clipPath: goingDark
            ? [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
            : [`circle(${radius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
        },
        {
          duration: TRANSITION_MS,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: goingDark ? "::view-transition-new(root)" : "::view-transition-old(root)",
        },
      );
    })
    .catch(() => {
      /* Transition cancelled — theme already applied */
    });
}

export function getToggleOrigin(element: HTMLElement | null) {
  if (!element) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}
