// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Fix for __dirname in ES Modules

// Fix __dirname (since Vite uses ES Modules, not CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ allows "@/components/..."
    },
  },
  build: {
    outDir: "dist", // ✅ Vercel expects frontend build here
    sourcemap: mode === "development", // only include sourcemaps in dev
    chunkSizeWarningLimit: 1000, // silence large bundle warnings
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"], // optional: bundle MUI separately
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
}));
