import { defineConfig } from 'vite'
import ssrPlugin from 'vite-ssr-components/plugin'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: './src/index.tsx'
    }
  },
  plugins: [cloudflare(), ssrPlugin()],
})
