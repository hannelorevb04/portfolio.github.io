import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Use relative paths instead of absolute paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original names for specific assets
          if (assetInfo.name && (assetInfo.name.endsWith('.glb') || assetInfo.name.endsWith('.hdr'))) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  publicDir: 'public', // Ensure public directory is copied
  assetsInclude: ['**/*.glb', '**/*.hdr'] // Include these file types as assets
})
