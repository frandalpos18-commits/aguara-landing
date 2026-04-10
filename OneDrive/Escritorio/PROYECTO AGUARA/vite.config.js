import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
  },
})
