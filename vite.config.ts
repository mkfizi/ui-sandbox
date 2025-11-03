import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';
import tailwindcss from '@tailwindcss/vite';
import shiki from './vite.plugins/shiki.ts';

export default defineConfig({
    base: '/ui-sandbox/',
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: glob.sync(resolve(__dirname, 'src/**/*.html'))
        }
    },
    plugins: [
        tailwindcss(),
        shiki(),
    ],
})