import type { BuildOptions } from 'esbuild'

const config: BuildOptions = {
  entryPoints: ['tests/spectron/spec.ts'],
  outdir: 'tests/spectron',
  minify: false,
  bundle: true,
  external: ['path', 'spectron', 'assert'],
}

export default config