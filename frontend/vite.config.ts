import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** Same default as `src/app/lib/api.ts` — used when local backend (:5000) is not running */
const DEFAULT_REMOTE_API = 'https://ecommerce-api-6y9p.onrender.com'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Prefer explicit dev proxy; else use VITE_API_BASE_URL if it points to a real server; else remote API
  const fromBase = env.VITE_API_BASE_URL?.trim()
  const devProxyTarget =
    env.VITE_DEV_PROXY_TARGET?.trim() ||
    (fromBase && !fromBase.includes('localhost') && !fromBase.includes('127.0.0.1') ? fromBase : '') ||
    DEFAULT_REMOTE_API

  const isHttps = devProxyTarget.startsWith('https')

  return {
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Listen on all network interfaces so phones on same Wi‑Fi can open http://<your-ip>:5173
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: devProxyTarget,
        changeOrigin: true,
        secure: isHttps,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})