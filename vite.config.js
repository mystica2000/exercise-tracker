import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa';

// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'service-worker.js',
    devOptions: {
      enabled: true
    },
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    manifest: {
      name: 'Jump Rope Tracker',
      description: 'App that tracks jump rope stats',
      short_name: 'Jump Rope Tracker',
      theme_color: '#1867C0',
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          "src": "assets/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "assets/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "assets/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "assets/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
    },
  })],
})
