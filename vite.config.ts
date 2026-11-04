import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repositório "Brunera17.github.io" → base '/'.
// Se publicar em outro repositório (ex.: "portfolio"), troque para '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
