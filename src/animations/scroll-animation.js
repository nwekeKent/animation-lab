import { gsap } from "./index.js";

export class ScrollAnimation {
  constructor({ element, animation }) {
    if (!element) return;
    this.element = element;
    this.animation = animation;
    this.init();
  }

  init() {
    const {
      from = {},
      to = {},
      start = "top 80%",
      scrub = 0.7,
      trigger,
    } = this.animation;

    // Set initial state
    gsap.set(this.element, from);

    // Scroll-triggered animation
    gsap.to(this.element, {
      ...to,
      scrollTrigger: {
        trigger: trigger || this.element,
        start,
        scrub,
      },
    });
  }
}
