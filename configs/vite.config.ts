import type { UserConfig } from 'vite'
import vueSFCCompiler from '@vitejs/plugin-vue'

const serverConfig: UserConfig = {
  plugins: [vueSFCCompiler()],
  root: 'renderer',
  server: {
    port: 3000
  }
}

const serveConfig: UserConfig = {
  plugins: [vueSFCCompiler()],
  root: 'renderer',
  server: {
    port: 3000,
    open: true
  }
}

const buildConfig: UserConfig = {
  mode: 'production',
  plugins: [vueSFCCompiler()],
  base: './',
  root: 'renderer',
  build: {
    outDir: '../build/renderer',
    emptyOutDir: true,
    assetsDir: './',
    rollupOptions: {}
  },
}

export default {
  serveConfig,
  serverConfig,
  buildConfig
}
