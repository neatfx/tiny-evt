<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'

// import { mande } from 'mande'
// import axios from 'axios'

const store = useBooksStore()
const search = ref('')
// const doubanBook = mande('https://book.douban.com/j')
// doubanBook.options.mode = 'no-cors'

watch(search, async (newKeyWords) => {
  if (search.value.length) {
    await store.search(newKeyWords)
    if (store.items.length === 0) {
      // suggestBook()
      // doubanBook.get('subject_suggest?q=' + search.value).then(books => {
      //   console.log(books)
      // })


      // fetch('https://book.douban.com/j/subject_suggest?q=球状闪电', {
      // fetch('https://www.baidu.com/').then((response) => {
      //   console.log(response);
      //   // if (response.status >= 200 && response.status < 300) {
      //   //   console.log(response.json())
      //   // }
      //   // reject if the response is not 2xx
      //   // throw new Error(response.statusText) 
      // }).then((books) => {
      //   console.log(books);
      // })

      // const options = {
      //   method: 'get',
      //   headers: {
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'Access-Control-Allow-Origin': 'https://book.douban.com',
      //   },
      //   url: 'https://book.douban.com/j/subject_suggest?q=球状闪电',
      // };
      // const { data } = await axios(options)
      // console.log(data)
    }
  } else {
    await store.list()
  }
})

function clear() {
  if (search.value) search.value = ''
}
</script>

<template>
  <div class="wrapper">
    <BaseInput v-model="search" class="input-zone" />
    <BaseButton @click="clear">搜索</BaseButton>
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
button {
  margin-right: 0;
}
</style>