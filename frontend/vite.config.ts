import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/subscriptions': 'http://localhost:5197',
      '/gyms': 'http://localhost:5197',
    },
  },
})
