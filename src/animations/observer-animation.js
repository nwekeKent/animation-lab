import gsap from "gsap";

export class ObserverAnimation {
  constructor({ element, from, to, options }) {
    if (!element) return;
    this.element = element;
    this.from = from || {};
    this.to = to || {};
    this.options = options || { threshold: 0.5 };
    this.init();
  }

  init() {
    gsap.set(this.element, this.from);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(this.element, this.to);
        }
      });
    }, this.options);

    observer.observe(this.element);
  }
}
