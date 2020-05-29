import type { BuildOptions } from 'esbuild'

const config: BuildOptions = {
  entryPoints: ['tests/spec.ts'],
  outdir: 'tests/',
  minify: false,
  bundle: true,
  external: ['path', 'spectron', 'assert'],
}

export default config