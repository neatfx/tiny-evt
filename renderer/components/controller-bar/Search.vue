<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'
import { books } from '@/services/mock-suggested-books'

// import { mande } from 'mande'
// import axios from 'axios'

// const { electronDouban } = window
const store = useBooksStore()
const search = ref('')
const ifShowDouban = ref(false)
const isShowSuggestItems = ref(false)

// const doubanBook = mande('/api/j')
// doubanBook.options.headers.origon = 'https://book.douban.com'
// doubanBook.options.headers.crossOrigin = 'no-cors'

watch(search, async (newKeyWords) => {
  if (search.value.length) {
    await store.search(newKeyWords)

    if (store.items.length === 0) {
      // await electronDouban.suggestBook(newKeyWords)
      console.log(books)
      ifShowDouban.value = true
    }
  } else {
    ifShowDouban.value = false
    isShowSuggestItems.value = false
    await store.list()
  }
})

async function suggestBooks() {
  // if (search.value) search.value = ''
  isShowSuggestItems.value = true

  // const x = await doubanBook.get('subject_suggest?q=三体')
  // console.log(x)

  // axios.get('/api/movie/in_theaters').then((res) => {
  //   console.log(res);
  // })
}

function coverHtml(src: string) {
  return '<img src="' + src + '" style="display: block; max-height: 150px; margin:0;" />'
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
        published: book.year,
        douban: book.url
      })
    });
}

onMounted(()=>{

  // fetch(new Request('https://book.douban.com/j/subject_suggest?q=中国近代史'))
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(async function (books) {
  //     console.log('douban',books)
  //   })

})
</script>

<template>
  <div class="wrapper">
    <BaseInput v-model="search" class="input-zone" />
    <BaseButton v-if="ifShowDouban" @click="suggestBooks">搜索豆瓣图书</BaseButton>
    <div v-if="isShowSuggestItems" class="suggest-list">
      <img>
      <ul v-for="(v, k) in books" key="k">
        <li>
          <!-- <div> -->
          <!-- <img src="blob:http://127.0.0.1:3000/40c4f408-3453-4769-b3a1-ffd7aee4a8c3" /> -->
          <div v-html="coverHtml(v.pic)"></div>
          <div class="info">
            <div>{{ v.title }}</div>
            <div>{{ v.author_name || '暂无作者信息' }}</div>
            <div>{{ v.year }}</div>
            <BaseButton class="btn" @click="addBook(v)">
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

.btn {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px 0 0;
}

.btn-text {
  padding: 5px;
}
</style>