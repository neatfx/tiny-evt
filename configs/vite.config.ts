import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const serverConfig: UserConfig = {
  plugins: [vue()],
  root: 'renderer',
  server: {
    port: 3000,
  }
}

const buildConfigVtu: UserConfig = {
  plugins: [vue()],
  root: 'tests/vtu',
  base: './',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: 'tests/vtu/Navbar.spec.ts',
      output: {
        format: 'cjs' // related to issue
      },
    },
  },
}

const buildConfig: UserConfig = {
  mode: 'production',
  plugins: [vue()],
  base: './',
  root: 'renderer',
  build: {
    outDir: '../build/renderer',
    assetsDir: './',
    rollupOptions: {
      external: []
    },
  }
}

export default {
  serverConfig,
  buildConfig,
  buildConfigVtu
}

