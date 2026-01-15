import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure proper routing for SPA
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: '/' // Use absolute paths for AWS S3/CloudFront hosting
})
