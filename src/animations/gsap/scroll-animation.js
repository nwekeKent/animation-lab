import { gsap } from "./runtime.js";

export const createScrollAnimation = ({
  element,
  from = {},
  to = {},
  start = "top 80%",
  end = "bottom 20%",
  scrub = false,
  trigger,
}) => {
  if (!element) return () => {};

  const context = gsap.context(() => {
    gsap.set(element, from);
    gsap.to(element, {
      ...to,
      scrollTrigger: {
        trigger: trigger || element,
        start,
        end,
        scrub,
      },
    });
  }, element);

  return () => context.revert();
};
