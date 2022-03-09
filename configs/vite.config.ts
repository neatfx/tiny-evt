// const serveConfig: UserConfig = {
//   plugins: [vueSFCCompiler()],
//   root: 'renderer',
//   server: {
//     port: 3000,
//     open: true
//   }
// }

// const buildConfig: UserConfig = {
//   mode: 'production',
//   plugins: [vueSFCCompiler()],
//   base: './',
//   root: 'renderer',
//   build: {
//     outDir: '../build/renderer',
//     emptyOutDir: true,
//     assetsDir: './',
//     brotliSize: false, // 加速
//     rollupOptions: {
//     }
//   },
// }

import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'renderer',
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("renderer", import.meta.url)),
    },
  },
});
