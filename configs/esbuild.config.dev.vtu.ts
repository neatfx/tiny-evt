import type { BuildConfig } from 'vite'

const config: BuildConfig = {
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

export default config