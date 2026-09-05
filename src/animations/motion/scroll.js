import { motionValue } from "motion";

export const lenisScrollY = motionValue(0);
export const lenisScrollProgress = motionValue(0);

export const connectLenisToMotion = (lenis) => {
  if (!lenis) return () => {};

  const handleScroll = ({ scroll, limit }) => {
    lenisScrollY.set(scroll);
    lenisScrollProgress.set(limit ? scroll / limit : 0);
  };

  lenis.on("scroll", handleScroll);

  return () => lenis.off("scroll", handleScroll);
};
