import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:5000', // 👈 your ASP.NET Core backend
        changeOrigin: true,
        secure: false, // 👈 allow self-signed dev cert
      }
    }
  },
});
