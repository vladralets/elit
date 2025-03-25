import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                cart: path.resolve(__dirname, 'cart.html'),
                product: path.resolve(__dirname, 'product.html'),
                chat: path.resolve(__dirname, 'chat.html'),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "src/variables.scss";`
            },
        },
    },
});