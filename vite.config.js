import { glob } from 'glob';
import { resolve, relative } from 'path';

const outDir = '../docs';

module.exports = {
    root: 'src',
    assetsPublicPath: 'src/assets',
    build: {
        outDir: outDir,
        emptyOutDir: true,
        rollupOptions: {
			input: glob
				.sync(resolve(__dirname, '**/*.html'))
				.filter((path) => !path.startsWith(resolve(__dirname, outDir)))
				.reduce((entries, path) => {
					entries[relative(__dirname, path).replace(/\.[^/.]+$/, '')] = path;
					return entries;
				}, {}),
			output: {
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]'
			},
		},
    },
    server: {
        open: "/index.html",
    }
}