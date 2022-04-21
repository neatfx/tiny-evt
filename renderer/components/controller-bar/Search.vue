<script setup lang="ts">
import { ref, watch, computed, onMounted, reactive } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'

const store = useBooksStore()
const search = ref('')
const ifShowDouban = ref(false)
const isShowSuggestItems = ref(false)
const books = reactive([])

watch(search, async (newKeyWords) => {
  if (search.value.length) {
    await store.search(newKeyWords)
    // 本地搜索无结果时显示豆瓣推荐搜索按钮
    if (store.items.length === 0) ifShowDouban.value = true
  } else {
    ifShowDouban.value = false
    isShowSuggestItems.value = false
    await store.list()
  }
})

// 豆瓣图书搜索推荐服务
async function suggestBooks() {
  const request = new Request('http://127.0.0.1:8080/suggest/' + search.value);

  const resp = await fetch(request)
  const result = JSON.parse(await resp.json())
  books.values = result

  isShowSuggestItems.value = true
}

function coverHtml(src: string) {
  return '<img src="' + src + '" style="display: block; max-height: 150px; margin:0;" />'
}

async function addBook(book: any) {
  ifShowDouban.value = false
  isShowSuggestItems.value = false
  await store.list()
  search.value = ''

  // 导入选中的豆瓣图书条目（书名、封面图片、作者、出版年份、豆瓣图书链接）
  const myRequest = new Request(book.pic);
  const resp = await fetch(myRequest)

  await store.add({
    name: book.title,
    cover: await resp.blob(),
    author: book.author_name,
    readingStatus: 'read',
    published: book.year,
    douban: book.url,
  })
}
</script>

<template>
  <div class="wrapper">
    <div class="search-bar">
      <BaseInput v-model="search" class="input-zone" />
      <BaseButton class="btn-search-douban" v-if="ifShowDouban" @click="suggestBooks">搜索豆瓣图书</BaseButton>
    </div>
    <div v-if="isShowSuggestItems" class="suggest-list">
      <ul v-for="(v, k) in books.values" key="k">
        <li>
          <div v-html="coverHtml(v.pic)"></div>
          <div class="info">
            <div>{{ v.title }}</div>
            <div>{{ v.author_name || '暂无作者信息' }}</div>
            <div>{{ v.year }}</div>
            <BaseButton class="btn-import" @click="addBook(v)">+</BaseButton>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}

.input-zone{
  padding: 7px 10px 7px;
  background-color: #999;
  vertical-align: middle;
}
.btn-search-douban {
  font-size: small;
}

.suggest-list {
  position: fixed;
}

ul {
  display: grid;
  padding: 0;
  margin: 0;
  float: left;
}

li {
  display: grid;
  grid-template-columns: auto auto;
  background-color: grey;
  margin: 5px 5px 0px 0;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.info {
  position: relative;
  padding: 15px;
}

.btn-import {
  position: absolute;
  right: 10px;
  bottom: 10px;
  margin: 10px 0 0;
  padding: 5px 11px;
  background-color: #999;
  border-radius: 1rem;
}

.btn-import:hover {
  background-color: dimgrey;
}
</style>