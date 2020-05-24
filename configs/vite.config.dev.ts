import { ServerConfig } from 'vite'

const config: ServerConfig = {
  root: 'renderer',
  optimizeDeps: {
    auto: false // FIXME: 默认值 undefined 会引发 package.json 未找到错误
  },
  port: 3000,
}

export default config