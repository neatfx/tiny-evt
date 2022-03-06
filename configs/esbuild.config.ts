import type { BuildOptions } from 'esbuild'

const dev: BuildOptions = {
  platform: 'node',
  entryPoints: ['main/main.ts', 'main/window/main-preload.ts', 'main/window/about-preload.ts'],
  outdir: 'build/',
  minify: false,
  bundle: true,
  external: ['electron', 'path', 'fs']
}

const dist: BuildOptions = {
  platform: 'node',
  entryPoints: ['main/main.ts', 'main/preload.ts'],
  outdir: 'build/',
  minify: true,
  bundle: true,
  external: ['electron', 'path', 'fs']
}

export default {
  dev,
  dist
}
