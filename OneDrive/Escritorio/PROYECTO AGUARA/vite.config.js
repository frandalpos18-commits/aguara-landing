import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
  server: {
    port: 3000,
    open: true,
  },
})
