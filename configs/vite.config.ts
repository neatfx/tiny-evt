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

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
import path from 'path'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetAttributify({ /* preset options */ }),
        presetUno(),
      ],
      rules:[

      ],
      shortcuts: [
        [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2px px-4px`],
      ]
    }),
  ],
  root: 'renderer',
  server: {
    proxy: {
      '/api': {
        target: 'https://search.douban.com/book',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    port: 3000
  },
  resolve: {
    alias: {
      '@': _resolve('../renderer'),
      '@assets': _resolve('../renderer/assets'),
      '@comps': _resolve('../renderer/components'),
      '@utils': _resolve('../renderer/utils'),
      '@router': _resolve('../renderer/router'),
      '@stores': _resolve('../renderer/stores'),
    }
  }
});
