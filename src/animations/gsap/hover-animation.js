export const createHoverAnimation = ({ element, onEnter, onLeave }) => {
  if (!element) return () => {};

  const enter = (event) => onEnter?.(element, event);
  const leave = (event) => onLeave?.(element, event);

  element.addEventListener("pointerenter", enter);
  element.addEventListener("pointerleave", leave);
  element.addEventListener("focusin", enter);
  element.addEventListener("focusout", leave);

  return () => {
    element.removeEventListener("pointerenter", enter);
    element.removeEventListener("pointerleave", leave);
    element.removeEventListener("focusin", enter);
    element.removeEventListener("focusout", leave);
  };
};
