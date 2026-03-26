import gsap from "gsap";

export class HoverAnimation {
  constructor({ element, onHover, onLeave }) {
    if (!element) return;
    this.element = element;
    this.onHover = onHover;
    this.onLeave = onLeave;
    this.init();
  }

  init() {
    this.element.addEventListener(
      "mouseenter",
      () => this.onHover && this.onHover(this.element),
    );
    this.element.addEventListener(
      "mouseleave",
      () => this.onLeave && this.onLeave(this.element),
    );
  }
}
