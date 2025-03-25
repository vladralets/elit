import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "src/variables.scss";`
      }
    }
  }
});