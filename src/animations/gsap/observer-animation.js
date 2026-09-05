import { gsap } from "./runtime.js";

export const createObserverAnimation = ({
  element,
  from = {},
  to = {},
  options = {},
  once = true,
}) => {
  if (!element || typeof IntersectionObserver === "undefined") return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        gsap.to(element, to);
        if (once) observer.unobserve(element);
      });
    },
    { threshold: 0.5, ...options },
  );

  gsap.set(element, from);
  observer.observe(element);

  return () => {
    observer.disconnect();
    gsap.killTweensOf(element);
  };
};
