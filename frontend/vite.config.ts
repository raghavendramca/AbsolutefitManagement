import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth':          'http://localhost:5215',
      '/subscriptions': 'http://localhost:5215',
      '/gyms':          'http://localhost:5215',
      '/navigation':    'http://localhost:5215',
    },
  },
})
