/* 
 * Just for code completion and compilation
 * defines the interface of objects stored in the table.
 */

// 图书
export interface IBook {
  id?: number; // 自增主键
  lend?: string; // 出借状态（不为空即表明状态为“已借出”）
  read?: string; // 阅读状态【已读、未读、在读、想读】
  name: string; // 书名
  cover?: Blob | null | undefined; // 封面图片
  author: string; // 作者
  publishing?: string; // 出版社
  categories?: string[]; // 分类标签
  published?: string; // 出版时间
  douban?: string; // 豆瓣图书链接
  nameTokens?: string[]; // 书名分词
  created: Date; // 数据创建时间

  subname?: string; // 副标题
  translator?: string; // 译者信息
  designed?: string; //
  price?: number; // 价格
  from?: string; // 购买地点
  position?: string; // 书架位置
  description?: string; // 内容简介（豆瓣）
}

// 书单
export interface IBookList {
  id?: number; // Primary key. Optional (autoincremented)
  name: string;
  age: number;
  emails: IEmailAddress[];
  phones: IPhoneNumber[];
}

export interface IContact {
  id?: number; // Primary key. Optional (autoincremented)
  name: string;
  age: number;
  emails: IEmailAddress[];
  phones: IPhoneNumber[];
}

export interface IEmailAddress {
  id?: number;
  contactId: number; // "Foreign key" to an IContact
  type: string;
  email: string;
}

export interface IPhoneNumber {
  id?: number;
  contactId: number;
  type: string;
  phone: string;
}