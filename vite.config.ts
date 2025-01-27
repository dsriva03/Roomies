import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'; //!install 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: { port: 3000 },
});
