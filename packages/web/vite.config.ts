import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the web client.
export default defineConfig({
  plugins: [react()],
  server: {
    // Assuming the backend services are served from the same origin.
    // Proxy can be configured here if needed.
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});