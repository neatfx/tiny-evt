const config = {
  root: 'renderer',
  cssCodeSplit:false,
  minify: false,
  optimizeDeps: {
    auto: false // FIXME: 默认值 true 会引发 package.json 未找到错误
  }
}

module.exports = config