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
    // 本地搜索无结果时调用豆瓣推荐服务 API
    if (store.items.length === 0) {
      // await suggestBooks(newKeyWords)
      ifShowDouban.value = true
    }
  } else {
    ifShowDouban.value = false
    isShowSuggestItems.value = false
    await store.list()
  }
})

async function suggestBooks() {
  const request = new Request('http://127.0.0.1:8080/suggest/' + search.value);

  fetch(request).then(async function (response) {
    const reader = response.body?.getReader();
    let text = '';
    const decoder = new TextDecoder('utf-8');

    reader?.read().then(({ value, done }) => {
      text += decoder.decode(value, { stream: true });
      const data = JSON.parse(text)

      books.values = data

      console.log(data, books)
    })
  });

  isShowSuggestItems.value = true
}

function coverHtml(src: string) {
  return '<img src="' + src + '" style="display: block; max-height: 120px; margin:0;" />'
}

async function addBook(book: any) {
  ifShowDouban.value = false
  isShowSuggestItems.value = false
  await store.list()
  search.value = ''
  console.log(book)

  // 导入选中的豆瓣图书条目（书名、封面图片、作者、出版年份、豆瓣图书链接）
  const myRequest = new Request(book.pic);

  fetch(myRequest)
    .then(function (response) {
      return response.blob();
    })
    .then(async function (myBlob) {
      console.log(myBlob)
      let objectURL = URL.createObjectURL(myBlob);
      console.log('haha', objectURL)
      // myImage.src = objectURL;

      await store.add({
        name: book.title,
        cover: myBlob,
        author: book.author_name,
        readingStatus: 'read',
        published: book.year,
        douban: book.url,
      })
    });
}
</script>

<template>
  <div class="wrapper">
    <BaseInput v-model="search" class="input-zone" />
    <BaseButton v-if="ifShowDouban" @click="suggestBooks">搜索豆瓣图书</BaseButton>
    <div v-if="isShowSuggestItems" class="suggest-list">
      <ul v-for="(v, k) in books.values" key="k">
        <li>
          <!-- <div> -->
          <!-- <img src="blob:http://127.0.0.1:3000/40c4f408-3453-4769-b3a1-ffd7aee4a8c3" /> -->
          <div v-html="coverHtml(v.pic)"></div>
          <div class="info">
            <div>{{ v.title }}</div>
            <div>{{ v.author_name || '暂无作者信息' }}</div>
            <div>{{ v.year }}</div>
            <BaseButton class="btn-import" @click="addBook(v)">
              <span class="btn-text">+</span>
            </BaseButton>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline-block;
  /* border: 1px solid rebeccapurple; */
}

.input-zone {
  /* height: auto; */
  padding: 8px 10px 6px;
  /* vertical-align: middle; */
}

.suggest-list {
  position: fixed;
  /* background-color: grey; */
}

ul {
  display: grid;
  padding: 0;
  margin: 0;
  float: left;
  /* grid-auto-flow: column; */
}

li {
  display: grid;
  grid-template-columns: auto auto;
  /* grid-auto-flow: column; */
  justify-self: left;
  border: 2px solid darkgrey;
  padding: 0px;
  background-color: grey;
  margin: 5px 5px 0px 0;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

img {
  display: block;
  width: 80px;
  height: 120px;
  margin: 0;
}

.info {
  position: relative;
  padding: 15px 15px;
  /* border: 1px solid blue; */
}

.btn-import,
.btn-import:hover {
  position: absolute;
  right: 10px;
  bottom: 10px;
  margin: 10px 0 0;
  padding: 5px;
  background-color: cornflowerblue;
  border-radius: 1rem;
}

.btn-text {
  padding: 5px;
  color: #333;
}
</style>