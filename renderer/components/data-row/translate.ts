const dic: Map<string, string | boolean> = new Map([
  ['categories', '分类'],
  ['author', '作者'],
  ['publishing', '出版社'],
  ['lend', '是否借出'],

  ['id', 'ID'],
  ['status', '借出状态'],
  ['read', '阅读状态'],
  ['name', '书名'],
  ['delete', '删除'],

  ['fields', '字段'],
  ['control', '操作按钮'],

  ['layout', '数据展现形式'],
  ['cards', '卡片'],
  ['rows', '列表']
])

export function trans(key: string) {
  // console.log(key)
  const text = dic.get(key)
  if (!text) return key
  return text
}