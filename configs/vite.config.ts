import type { ServerConfig, BuildConfig } from 'vite'

const buildConfig: BuildConfig = {
  root: 'renderer',
  outDir: 'build/renderer',
  base: '.'
}

const serverConfig: ServerConfig = {
  root: 'renderer',
  optimizeDeps: {
    auto: false // FIXME: 默认值 undefined 会引发 package.json 未找到错误
  },
  port: 3000,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    APP_ENV: process.env.NODE_ENV || 'development'
  }
}

const buildConfigVtu: BuildConfig = {
  root: 'tests/vtu',
  outDir: 'tests/vtu/build',
  // base: '.',
  assetsDir: '.',
  emitIndex: false,
  emitAssets: false,
  rollupInputOptions: {
    input: 'tests/vtu/Navbar.spec.ts',
    external: ['assert', 'path', 'fs', 'util', 'stream', 'os', 'constants', 'tty', 'module'],
  },
  rollupOutputOptions: {
    format: 'cjs', // related to issue
  }
}

export default {
  buildConfig,
  serverConfig,
  buildConfigVtu
}