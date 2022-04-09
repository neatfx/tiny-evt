<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'
import { books } from '@/services/mock-suggested-books'

// import { mande } from 'mande'
// import axios from 'axios'

const { electronDouban } = window
const store = useBooksStore()
const search = ref('')
const ifShowDouban = ref(false)
const isShowSuggestItems = ref(false)
// const doubanBook = mande('https://book.douban.com/j')
// doubanBook.options.mode = 'no-cors'

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

function suggestBooks() {
  // if (search.value) search.value = ''
  isShowSuggestItems.value = true
}

function coverHtml(src: string) {
  return '<img src="' + src + '" style="display: block; max-width: 80px; margin:0;" />'
}

async function addBook(book: any) {
  ifShowDouban.value = false
  isShowSuggestItems.value = false
  await store.list()
  search.value = ''
  console.log(book)
}

</script>

<template>
  <div class="wrapper">
    <BaseInput v-model="search" class="input-zone" />
    <BaseButton v-if="ifShowDouban" @click="suggestBooks">搜索豆瓣图书</BaseButton>
    <div v-if="isShowSuggestItems" class="suggest-list">
      <ul v-for="(v, k) in books" key="k">
        <li>
          <!-- <div> -->
          <!-- <img src="blob:http://127.0.0.1:3000/40c4f408-3453-4769-b3a1-ffd7aee4a8c3" /> -->
          <div v-html="coverHtml(v.pic)"></div>
          <div class="info">
            <div>{{ v.title }}</div>
            <div>{{ v.author_name || '暂无作者信息' }}</div>
            <div>{{ v.year }}</div>
            <BaseButton class="btn" @click="addBook(v)">+</BaseButton>
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
  padding: 8px 10px 6px;
}
.suggest-list {
  position: fixed;
  /* background-color: grey; */
  overflow: scroll;
}
ul {
  display: grid;
  padding: 0;
  margin: 0;
}
li {
  display: grid;
  grid-template-columns: auto auto;
  justify-self: left;
  border: 2px solid darkgrey;
  padding: 0px;
  background-color: grey;
  margin: 5px 0 0;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
img {
  display: block;
  width: 80px;
  height: 120px;
  margin: 0;
}
.info {
  padding: 15px 15px;
  /* border: 1px solid blue; */
}

.btn {
  margin: 10px 0 0;
}
</style>