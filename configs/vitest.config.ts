/// <reference types="vitest" />

import { UserConfig } from 'vitest'
import Vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"

export default {
  plugins: [
    Vue(),
    // vueJsx()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/renderer/e2e/**'
    ]
  },
}