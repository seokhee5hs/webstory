import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('./pages', import.meta.url)),
  base: '/webstory/',
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom'] },
  build: { outDir: '../github-dist', emptyOutDir: true },
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
});
