import type { BuildOptions } from 'esbuild'

const dev: BuildOptions = {
  platform: 'node',
  entryPoints: ['main/main.ts', 'main/preload.ts'],
  outdir: 'build/',
  minify: false,
  bundle: true,
  external: ['electron', 'path', 'fs']
}

const spectron: BuildOptions = {
  entryPoints: ['tests/spectron/main-window.spec.ts'],
  outdir: 'tests/spectron',
  minify: false,
  bundle: true,
  external: ['path', 'spectron', 'assert']
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
  spectron,
  dist
}
