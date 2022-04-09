const pack = require("../../package.json")

/////////////////////////////////////////////////////////
// preload process 运行于与 Chrome 扩展相同的安全沙箱环境
/////////////////////////////////////////////////////////////

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app-name')!.innerText = pack.name
  document.getElementById('app-version')!.innerText = pack.version
  const replaceText = (selector: string, text: string | undefined) => {
    const element = document.getElementById(selector)
    if (element && text) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})