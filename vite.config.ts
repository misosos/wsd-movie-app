import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // dev(serve)일 때는 "/", build할 때만 "/wsd-movie-app/" 사용
  base: command === 'build' ? '/wsd-movie-app/' : '/',
}))
