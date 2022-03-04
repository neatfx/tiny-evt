import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const serverConfig: UserConfig = {
  plugins: [vue()],
  root: 'renderer',
  server: {
    port: 3000
  }
}

const serveConfig: UserConfig = {
  plugins: [vue()],
  root: 'renderer',
  server: {
    port: 3000,
    open: true
  }
}

const buildConfigVtu: UserConfig = {
  plugins: [vue()],
  root: '.',
  build: {
    outDir: 'vtu/build',
    assetsDir: './',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: './vtu/Navbar.spec.ts',

      external: [
        // path.resolve( __dirname, 'src/some-local-file-that-should-not-be-bundled.js' ),
        // /node_modules/
      ],
      output: {
        format: 'cjs' // related to issue
      }
    }
  }
}

const buildConfig: UserConfig = {
  mode: 'production',
  plugins: [vue()],
  base: './',
  root: 'renderer',
  build: {
    outDir: '../build/renderer',
    emptyOutDir: true,
    assetsDir: './',
    rollupOptions: {}
  }
}

export default {
  serveConfig,
  serverConfig,
  buildConfig,
  buildConfigVtu
}
