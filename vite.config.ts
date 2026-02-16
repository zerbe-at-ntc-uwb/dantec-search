import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: ["relay"] } })
  ],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:5432', // Your backend server
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
