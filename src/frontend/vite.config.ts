import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd() + '/env', '');

  return {
    envDir: './env',
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      open: '/',
      proxy: {
        
        '/api': {
          target: env.VITE_API,
          changeOrigin: true,
          secure:false,
          rewrite: path => path.replace(/^\/api/, '')
        }
        
      },
    },
    build: {
      sourcemap: true,
    },
  };
});
