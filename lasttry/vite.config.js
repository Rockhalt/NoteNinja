import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Catches your '/api/resend/emails' call cleanly
      '/api/resend': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        // Chops off '/api/resend' so it passes just '/emails' to the target URL
        rewrite: (path) => path.replace(/^\/api\/resend/, ''),
      },
    },
  },
});