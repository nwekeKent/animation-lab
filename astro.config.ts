import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ["**/*.{ts,tsx}"],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["react", "react-dom", "react/jsx-runtime"],
    },
    ssr: {
      noExternal: ["clsx", "tailwind-merge"],
    },
  },
});
