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

const buildConfig: UserConfig = {
  root: 'renderer',
  build: {
    outDir: 'build/renderer',
  },
  base: '.'
}

export default {
  serverConfig,
  buildConfig,
  buildConfigVtu
}

