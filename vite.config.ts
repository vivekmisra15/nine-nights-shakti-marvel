import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" lets the built app run from any folder.
export default defineConfig({
  plugins: [react()],
  base: "/nine-nights-shakti-marvel/",
});
