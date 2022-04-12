const dic: Map<string, string> = new Map([
  // View
  ['layout', '数据展现形式'],
  ['cards', '卡片'],
  ['rows', '列表'],
  ['control', '操作控件'],
  ['delete', '删除'],
  ['fields', '字段'],

  // 数据库字段
  ['id', 'ID'],
  ['status', '出借状态'],
  ['lend', '出借状态'],
  ['readingStatus', '阅读状态'],
  ['name', '书名'],
  ['cover', '封面'],
  ['author', '作者'],
  ['publishing', '出版发行'],
  ['published', '版次'],
  ['categories', '分类标签'],

  // FilterMenu
  ['wanted', '想读'],
  ['not-yet', '未读'],
  ['reading', '在读'],
  ['read', '已读'],
  ['true', '已借出'],
  ['false', '未借出']
])

export function trans(key: string) {
  const text = dic.get(key)
  if (!text) return key
  return text
}