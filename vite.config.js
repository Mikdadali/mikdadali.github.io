import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Repo name is "mikdadali.github.io" (a user site), so it is served from the root.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
