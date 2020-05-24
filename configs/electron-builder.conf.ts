import { Configuration } from 'electron-builder'

const conf: Configuration = {
  productName: 'TinyEvt',
  appId: 'com.tinyevt.org',
  copyright: 'Copyright © 2020',
  electronVersion: '9.0.0',
  nodeGypRebuild: false,
  compression: 'store',
  files: [
    'build',
    {
      "from": "main/resources",
      "to": "build/resources",
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
    category: 'public.app-category.utilities', // Apple 官方预定义
    target: 'dmg',
    type: 'distribution',
    icon: 'main/resources/icons/icon.icns',
    identity: 'The name of certificate to use when signing',
    extendInfo: {}
  }
}

export default conf