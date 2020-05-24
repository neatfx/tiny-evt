export default {
  entryPoints: ['main/main.ts', 'main/preload.ts'],
  outdir: 'build/',
  minify: false,
  bundle: true,
  external: ['electron', 'path'],
}