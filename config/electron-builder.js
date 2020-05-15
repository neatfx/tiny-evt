const config = {
  productName: 'TinyEvt',
  appId: 'com.tinyevt.org',
  copyright: 'Copyright © 2020',
  electronVersion: '8.2.5',
  nodeGypRebuild: false,
  compression: 'store',
  files: [
    'build',
    {
      "from": "resources",
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
    icon: 'resources/icons/icon.icns',
    identity: 'The name of certificate to use when signing',
    extendInfo: {}
  }
}

module.exports = config