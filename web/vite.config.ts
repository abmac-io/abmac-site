import { cloudflare } from '@cloudflare/vite-plugin'
import path from 'path'
import { defineConfig } from 'vite'
import ssrPlugin from 'vite-ssr-components/plugin'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@assets": path.resolve(__dirname, './public/assets'),
      "@templates": path.resolve(__dirname, './public/templates'),
      "@scripts": path.resolve(__dirname, './public/scripts'),
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/index.tsx'
    }
  },
  plugins: [cloudflare(), ssrPlugin()],
})
