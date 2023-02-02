import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: 'localhost',
    proxy: {
      '/api/gateway/v1/song/upload_song': 'http://127.0.0.1:8011',
      '/api': 'http://127.0.0.1:8000',
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      {
        find: 'src',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
});
