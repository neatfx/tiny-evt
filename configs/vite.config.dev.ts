export default {
  root: 'renderer',
  cssCodeSplit:false,
  minify: false,
  optimizeDeps: {
    auto: false // FIXME: 默认值 undefined 会引发 package.json 未找到错误
  },
  port: 3000,
}