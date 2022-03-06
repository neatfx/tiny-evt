/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('router-link')
      }
    }
  })],
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/renderer/e2e/**'
    ]
  },
})