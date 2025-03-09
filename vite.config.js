import { defineConfig } from 'vite'

export default defineConfig({
  base: '/game-of-life/',
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  }
})