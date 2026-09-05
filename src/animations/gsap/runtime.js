import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { prefersReducedMotion } from "../motion/reduced-motion.js";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const createSmoothScroll = ({
  lerp = 0.1,
  reducedMotion,
  onScroll,
} = {}) => {
  const shouldReduceMotion = reducedMotion ?? prefersReducedMotion();

  if (typeof window === "undefined" || shouldReduceMotion) {
    return { lenis: null, destroy: () => {} };
  }

  const lenis = new Lenis({ lerp, autoRaf: false });
  const handleScroll = (event) => {
    ScrollTrigger.update();
    onScroll?.(event);
  };
  const tick = (time) => lenis.raf(time * 1000);

  lenis.on("scroll", handleScroll);
  gsap.ticker.add(tick);

  return {
    lenis,
    destroy: () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.refresh();
    },
  };
};

export const refreshScrollTrigger = () => ScrollTrigger.refresh();
