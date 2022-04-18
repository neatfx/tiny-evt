/* 
 * Just for code completion and compilation
 * defines the interface of objects stored in the table.
 */

// 书籍
export interface IBook {
  // 已使用字段
  id?: number;              // 自增主键

  name: string;             // 书名
  author?: string;          // 作者
  cover?: Blob | number;    // 封面图片
  publishing?: string;      // 出版发行
  published?: string;       // 版次
  isbn?: string;            // 书号

  categories?: string[];    // 分类标签

  lend?: string;            // 出借状态（ 不为空即表明状态为 “已借出” ）
  readingStatus?: string;   // 阅读状态（ 想读 、未读、在读、已读 ）
  position?: string;        // 书架存放位置

  booklists?: Set<number>;  // 书单

  douban?: string;          // 豆瓣图书链接

  nameTokens?: string[];    // 书名分词结果

  deleted?: boolean;        // 数据删除标识
  created?: Date;           // 数据创建时间

  // 暂未使用字段
  subname?: string;         // 副标题
  translator?: string;      // 译者信息
  price?: number;           // 价格
  from?: string;            // 购买地点
  summary?: string;         // 内容简介（ 豆瓣 ）
}

// 书籍封面
export interface ICover {
  id?: number;          // 自增主键

  data?: Blob | number;    // 图片数据

  deleted?: boolean;    // 数据删除标识
  created?: Date;       // 数据创建时间
}

// 书单
export interface IBooklist {
  id?: number;          // 自增主键

  name: string;         // 书单名
  books?: Set<number>;  // 书籍 IDs

  shared?: boolean;     // 是否公开数据（ 分享 ）

  deleted?: boolean;    // 数据删除标识
  created?: Date;       // 数据创建时间
}