import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      '/api': {
        target: "https://www.swiggy.com",
        changeOrigin: true,
        secure: false,
           headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
      },
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
