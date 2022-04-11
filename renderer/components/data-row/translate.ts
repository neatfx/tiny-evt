const dic: Map<string, string> = new Map([
  ['layout', '数据展现形式'],
  ['cards', '卡片'],
  ['rows', '列表'],

  ['fields', '字段'],
  ['id', 'ID'],
  ['status', '出借状态'],
  ['lend', '出借状态'],
  ['readingStatus', '阅读状态'],
  ['name', '书名'],
  ['cover', '封面'],
  ['author', '作者'],
  ['publishing', '出版社'],

  ['control', '操作控件'],
  ['categories', '分类标签'],
  ['delete', '删除'],

  ['想读', 'wanted'],
  ['未读', 'not-yet'],
  ['在读', 'reading'],
  ['已读', 'read'],

  ['已借出', 'true'],
  ['未借出', 'false']
])

export function trans(key: string) {
  const text = dic.get(key)
  if (!text) return key
  return text
}