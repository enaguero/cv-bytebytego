import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

// Vercel sets VERCEL=1 in its build environment automatically, so the same
// codebase deploys two ways:
//   - on Vercel    -> @astrojs/vercel (serverless functions)
//   - everywhere   -> @astrojs/node   (Docker, `make dev`, `npm run dev`)
const isVercel = !!process.env.VERCEL;

export default defineConfig({
  output: "server",
  adapter: isVercel ? vercel() : node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
