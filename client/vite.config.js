import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // Any call to /api goes to the Express server (no CORS problems in development)
      '/api': 'http://localhost:5000',
    },
  },
});