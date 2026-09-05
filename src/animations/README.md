# Animation Workflow

This folder intentionally supports both Motion and GSAP.

## Choose the library

- Use Motion for React-local state, hover, press, presence, layout, springs, and drag.
- Use GSAP for DOM timelines, staggered sequences, SVG choreography, and ScrollTrigger.
- Use Lenis only for optional page-level smooth scrolling.
- Use `connectLenisToMotion` when a Motion component needs to respond to Lenis scroll values.
- Never animate the same property on the same element with both libraries.

## GSAP lifecycle

GSAP helpers return cleanup functions. Store and call the returned function when an
exploration unmounts or a page changes:

```js
const destroy = createScrollAnimation({ element, to: { opacity: 1 } });
destroy();
```

Smooth scrolling is opt-in:

```js
const smoothScroll = createSmoothScroll({ onScroll: updateMotionValues });
const disconnectMotion = connectLenisToMotion(smoothScroll.lenis);

// On teardown:
disconnectMotion();
smoothScroll.destroy();
```

## Motion presets

React components can share `motionPresets` from `./motion/presets.js` while keeping
their Motion API imports local to the component:

```tsx
import { motion } from "motion/react";
import { motionPresets } from "@/animations/motion/presets";

<motion.button whileTap={{ scale: 0.98 }} transition={motionPresets.fast} />;
```
