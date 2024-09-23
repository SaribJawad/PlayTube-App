import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://i1jo9yqnk3.execute-api.ap-south-1.amazonaws.com",
    },
  },
  plugins: [react()],
});
