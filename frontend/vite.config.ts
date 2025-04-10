import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
        "img-src 'self' data: https://blobintex.blob.core.windows.net https://cdn.builder.io; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://localhost:5000 http://localhost:5000 http://localhost:4000 https://blobintex.blob.core.windows.net https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net; " +
        "frame-src 'self';",
    },

    proxy: {
      "/api": {
        target:
          "https://intexbackenddeployment-dzebbsdtf7fkapb7.westus2-01.azurewebsites.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
