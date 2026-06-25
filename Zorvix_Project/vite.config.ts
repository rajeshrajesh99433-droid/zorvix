import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'zorvix_colorful_logo.png'],
      manifest: {
        name: 'Zorvix E-Commerce',
        short_name: 'Zorvix',
        description: 'Premium multi-vendor marketplace',
        theme_color: '#5b4ef8',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/zorvix_colorful_logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/zorvix_colorful_logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/zorvix_colorful_logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
