import type { ServerConfig } from 'vite'

const config: ServerConfig = {
  root: 'renderer',
  optimizeDeps: {
    auto: false // FIXME: 默认值 undefined 会引发 package.json 未找到错误
  },
  port: 3000,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    APP_ENV: process.env.NODE_ENV || 'development'
  }
}

export default config