import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Copy index.html to 404.html so Vercel (and other hosts) serve the SPA for unknown routes (fix refresh 404)
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const outDir = join(process.cwd(), 'dist')
      const index = join(outDir, 'index.html')
      const notFound = join(outDir, '404.html')
      if (existsSync(index)) {
        copyFileSync(index, notFound)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyIndexTo404()],
})
