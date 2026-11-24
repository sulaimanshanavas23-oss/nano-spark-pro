import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nanoSparkCertificateApi } from './server/vite-plugin.js'

export default defineConfig({
  plugins: [react(), nanoSparkCertificateApi()],
  server: {
    port: 5173,
    open: false,
  },
})
