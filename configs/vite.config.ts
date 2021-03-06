import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const serverConfig: UserConfig = {
  plugins: [vue()],
  root: 'renderer',
  server: {
    port: 3000
  }
}

const serveConfig: UserConfig = {
  plugins: [vue()],
  root: 'renderer',
  server: {
    port: 3000,
    open: true
  }
}

const buildConfigVtu: UserConfig = {
  plugins: [vue()],
  root: 'tests/vtu',
  base: './',
  build: {
    outDir: 'build',
    assetsDir: './',
    rollupOptions: {
      input: 'tests/vtu/Navbar.spec.ts',
      output: {
        format: 'cjs' // related to issue
      },
      external: []
    }
  }
}

const buildConfig: UserConfig = {
  mode: 'production',
  plugins: [vue()],
  base: './',
  root: 'renderer',
  build: {
    outDir: '../build/renderer',
    emptyOutDir: true,
    assetsDir: './',
    rollupOptions: {}
  }
}

export default {
  serveConfig,
  serverConfig,
  buildConfig,
  buildConfigVtu
}
