import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isLib = process.env.BUILD_LIB === 'true';

export default defineConfig({
  plugins: [react()],
  build: isLib
    ? {
        lib: {
          entry: path.resolve(__dirname, 'index.js'),  // <-- here
          name: 'AutoAwayNavbar',
          fileName: 'index',
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
      }
    : undefined
});
