import type { Configuration } from 'electron-builder'

const conf: Configuration = {
  productName: 'TinyEvt',
  electronVersion: '9.0.0',
  compression: 'store',
  files: [
    "package.json",
    {
      "from": "build",
      "to": "build",
      "filter": ["!dev-runner.js", "!app-builder.js"]
    },
    {
      "from": "main/resources",
      "to": "resources",
      "filter": ["**/*"]
    }
  ],
  dmg: {
    contents: [{
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
    }, {
        x: 130,
        y: 150,
        type: 'file',
    }]
  },
  mac: {
    category: 'public.app-category.developer-tools', // Apple 官方预定义
    target: 'dmg',
    type: 'distribution',
    icon: 'main/resources/icons/icon.icns',
    publish: [{
      provider: 'github',
      releaseType: 'release'
    }]
  }
}

export default conf