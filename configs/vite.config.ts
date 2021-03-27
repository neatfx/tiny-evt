import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const buildConfig: UserConfig = {
  root: 'renderer',
  build: {
    outDir: 'build/renderer',
  },
  base: '.'
}

const serverConfig: UserConfig = {
  plugins: [ vue()],
  root: 'renderer',
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: []
  }
  // env: {
  //   GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  //   APP_ENV: process.env.NODE_ENV || 'development'
  // }
}

const buildConfigVtu: UserConfig = {
  root: 'tests/vtu',
  build: {
    outDir: 'tests/vtu/build',
    assetsDir: '.',

  },
  base: '.',
  // emitAssets: false,
  // emitIndex: false,
  // rollupInputOptions: {
  //   input: 'tests/vtu/Navbar.spec.ts',
  //   external: [
  //     'assert',
  //     'path',
  //     'fs',
  //     'util',
  //     'stream',
  //     'os',
  //     'constants',
  //     'tty',
  //     'module'
  //   ]
  // },
  // rollupOutputOptions: {
  //   format: 'cjs' // related to issue
  // }
}

export default {
  serverConfig,
  buildConfig,
  buildConfigVtu
}

