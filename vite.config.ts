import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Gunakan process.cwd() dengan casting any untuk menghindari error TypeScript saat build
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Mengganti process.env.API_KEY dengan nilai string sebenarnya saat build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Mencegah crash "ReferenceError: process is not defined" jika ada library pihak ketiga mengakses process.env
      'process.env': {} 
    }
  };
});