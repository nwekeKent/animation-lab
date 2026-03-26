import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis({
  lerp: 0.1,
  smooth: true,
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

export const refreshScrollTrigger = () => ScrollTrigger.refresh();

export { gsap };
