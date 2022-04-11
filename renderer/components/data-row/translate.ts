const dic: Map<string, string | boolean> = new Map([
  ['layout', '数据展现形式'],
  ['cards', '卡片'],
  ['rows', '列表'],

  ['fields', '字段'],
  ['id', 'ID'],
  ['lend', '是否借出'],
  ['status', '借出状态'],
  ['read', '阅读状态'],
  ['name', '书名'],
  ['cover', '封面'],
  ['author', '作者'],
  ['publishing', '出版社'],

  ['control', '操作控件'],
  ['categories', '标签'],
  ['delete', '删除'],

  ['wanted', '想读'],
  ['not-yet', '未读'],
  ['reading', '在读'],
  ['read', '已读']
])

export function trans(key: string) {
  const text = dic.get(key)
  if (!text) return key
  return text
}