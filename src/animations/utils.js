export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

export const lerp = (a, b, n) => (1 - n) * a + n * b;

export const clamp = (num, min, max) =>
  num <= min ? min : num >= max ? max : num;

export const getDistanceFromMidViewport = (element) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { x, y, width, height } = element.getBoundingClientRect();
  const yCenter = y + height / 2;
  const xCenter = x + width / 2;

  return {
    x: vw / 2 - xCenter,
    y: vh / 2 - yCenter,
  };
};

/**
 * Preload an image before animating it
 * @param {string} src
 * @returns {Promise<void>}
 */
export const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // resolve even if image fails
    img.src = src;
  });

/**
 * Preload multiple images
 * @param {string[]} srcArray
 * @returns {Promise<void[]>}
 */
export const preloadImages = (srcArray) =>
  Promise.all(srcArray.map((src) => preloadImage(src)));
