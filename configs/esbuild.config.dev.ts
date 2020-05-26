import { BuildOptions } from 'esbuild'

const config: BuildOptions = {
  entryPoints: ['main/main.ts', 'main/preload.ts'],
  outdir: 'build/',
  minify: false,
  bundle: true,
  external: ['electron', 'path', 'fs'],
}

export default config