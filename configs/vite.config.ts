import type { UserConfig } from 'vite'
import vueSFCCompiler from '@vitejs/plugin-vue'

const serverConfig: UserConfig = {
  plugins: [vueSFCCompiler()],
  root: 'renderer',
  server: {
    port: 3000
  }
}

const serveConfig: UserConfig = {
  plugins: [vueSFCCompiler()],
  root: 'renderer',
  server: {
    port: 3000,
    open: true
  }
}

const buildConfigVtu: UserConfig = {
  plugins: [vueSFCCompiler()],
  root: '.',
  build: {
    outDir: 'renderer/components/__tests__/build',
    assetsDir: './',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      // 
      input: {
        'Navbar': 'renderer/components/__tests__/Navbar.spec.ts'
      },
      external: [
        '@vue/test-utils',
        'vue',
        'vue-router'  
      ],
      output: {
        entryFileNames: '[name].spec.[hash].js',
        format: 'commonjs'
      }
    }
  }
}

const buildConfig: UserConfig = {
  mode: 'production',
  plugins: [vueSFCCompiler()],
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
