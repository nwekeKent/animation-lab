import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "motion/react";

/* ---------------------------------- data ---------------------------------- */

const articles = [
  {
    id: "01",
    date: "02.02",
    year: "2019",
    title: "A Cruelty-Free Makeup Challenge",
    tag: "My latest story",
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=600&auto=format&fit=crop",
    alt: "Hand holding a grapefruit slice",
  },
  {
    id: "02",
    date: "02.02",
    year: "2019",
    title: "The Beekeeper",
    tag: "Beauty notes",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=600&auto=format&fit=crop",
    alt: "Close-up beauty portrait",
  },
  {
    id: "03",
    date: "01.26",
    year: "2019",
    title: "Rituals for Glowing Skin",
    tag: "Editors' pick",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
      alt: "Skincare products on a pink background",
  },
];

/* -------------------------------- variants -------------------------------- */

const heroVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 20 },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } },
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.35 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 70 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 22 },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.25 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* -------------------------------- preloader ------------------------------- */

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);
  const counter = useTransform(progress, (v) => `${Math.round(v)}/100`);
  // Fade the counter in once the panel is wide enough to hold it, out before reveal
  const counterOpacity = useTransform(progress, [3, 10, 90, 98], [0, 1, 1, 0]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => setTimeout(onComplete, 450),
    });
    return () => controls.stop();
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-avst-pink"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Wordmark on the pink side — the growing red panel swallows it */}
      <div className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-center">
        <span className="font-display text-4xl tracking-[0.08em] text-avst-red md:text-6xl">
          AVST
        </span>
      </div>

      {/* Red panel grows 0% → 100% with the count */}
      <motion.div
        className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden bg-avst-red"
        style={{ width }}
      >
        <motion.span
          className="font-display text-4xl text-white tabular-nums whitespace-nowrap md:text-6xl"
          style={{ opacity: counterOpacity }}
        >
          {counter}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

/* ---------------------------------- hero ---------------------------------- */

const Hero = () => {
  return (
    <motion.main
      variants={heroVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-avst-red text-white"
    >
      {/* Header */}
      <motion.header
        variants={fadeUp}
        className="flex items-center justify-between px-6 pt-8 text-[11px] uppercase tracking-[0.22em] md:px-14"
      >
        <a href="#" className="font-medium">
          AVST
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          <a href="#" className="transition-opacity hover:opacity-70">
            Shop +
          </a>
          <a href="#" className="transition-opacity hover:opacity-70">
            About
          </a>
          <a href="#" className="relative px-1 py-0.5">
            Blog
            <span className="pointer-events-none absolute -inset-x-2.5 -inset-y-1 -rotate-6 rounded-[50%] border border-white/80" />
          </a>
        </nav>

        <a href="#" className="transition-opacity hover:opacity-70">
          Contact Us
        </a>
      </motion.header>

      {/* Intro row */}
      <motion.section className="mt-14 grid grid-cols-1 items-end gap-8 px-6 md:grid-cols-3 md:px-14">
        <motion.div variants={fadeUp}>
          <p className="font-display text-lg italic">BY NEWEST</p>
          <span className="mt-1 inline-block text-2xl leading-none">→</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl italic md:text-center md:text-5xl"
        >
          Your weekly digest
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-[240px] text-[11px] leading-relaxed text-white/80 md:justify-self-end"
        >
          Imperfection is beauty, madness is genius and it&rsquo;s better to be
          absolutely ridiculous than absolutely boring
        </motion.p>
      </motion.section>

      {/* Divider */}
      <motion.div
        variants={lineGrow}
        className="mx-6 mt-10 h-px origin-left bg-white/30 md:mx-14"
      />

      {/* Article list */}
      <motion.section variants={listVariants} className="mt-6 md:mt-10">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            variants={rowVariants}
            className="group grid cursor-pointer grid-cols-2 gap-x-6 gap-y-4 border-t border-white/25 px-6 py-8 last:border-b md:grid-cols-[150px_190px_70px_1fr_110px] md:px-14 md:py-10"
          >
            {/* Index number */}
            <motion.span
              variants={cellVariants}
              className="self-center font-display text-7xl leading-none md:text-9xl"
            >
              {index + 1}
            </motion.span>

            {/* Thumbnail — reveal animates the wrapper, hover zooms the img */}
            <motion.div variants={imageVariants} className="overflow-hidden">
              <img
                src={article.image}
                alt={article.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-40 w-36 object-cover transition-transform duration-700 ease-out group-hover:scale-110 md:h-48 md:w-44"
              />
            </motion.div>

            {/* Date */}
            <motion.div
              variants={cellVariants}
              className="col-span-2 self-center text-[11px] leading-relaxed text-white/70 md:col-span-1"
            >
              {article.date}
              <br />
              {article.year}
            </motion.div>

            {/* Title */}
            <motion.div variants={cellVariants} className="col-span-2 self-center md:col-span-1">
              <h2 className="font-display text-3xl leading-[1.1] md:text-[3.25rem]">
                {article.title}
              </h2>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/60">
                {article.tag}
              </p>
            </motion.div>

            {/* Expand control — stretches full row height for the hairline */}
            <motion.div
              variants={cellVariants}
              className="col-span-2 flex items-center md:col-span-1 md:justify-center md:border-l md:border-white/25"
            >
              <motion.button
                type="button"
                aria-label={`Open ${article.title}`}
                whileHover={{ rotate: 90, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="text-3xl font-light leading-none"
              >
                +
              </motion.button>
            </motion.div>
          </motion.article>
        ))}
      </motion.section>

      {/* Scroll hint — aligned under the + column */}
      <motion.div variants={fadeUp} className="flex justify-end px-6 md:px-14">
        <div className="flex w-[110px] justify-center border-l border-white/25 py-10">
          <motion.span
            className="inline-block font-display text-3xl"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </motion.main>
  );
};

/* ------------------------------ orchestration ----------------------------- */

export const AvstLoader = () => {
  const [loaded, setLoaded] = useState(false);
  const [runId, setRunId] = useState(0);

  const handleComplete = useCallback(() => setLoaded(true), []);

  const replay = () => {
    setLoaded(false);
    setRunId((n) => n + 1);
  };

  return (
    <div className="min-h-screen bg-avst-red">
      <div key={runId}>
        <AnimatePresence>
          {!loaded && <Preloader onComplete={handleComplete} />}
        </AnimatePresence>

        {loaded && <Hero />}
      </div>

      {loaded && (
        <motion.button
          type="button"
          onClick={replay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.4 } }}
          className="fixed bottom-6 left-6 z-40 rounded-full border border-white/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:bg-white hover:text-avst-red"
        >
          ↺ Replay intro
        </motion.button>
      )}
    </div>
  );
};
