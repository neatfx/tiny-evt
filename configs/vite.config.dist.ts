import { BuildConfig } from 'vite'

const config: BuildConfig = {
  root: 'renderer',
  base: '.',
  outDir: 'build/renderer',
  assetsDir: '.',
  cssCodeSplit: false,
}

export default config