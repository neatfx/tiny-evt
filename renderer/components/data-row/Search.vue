<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'

const store = useBooksStore()
const search = ref('')

watch(search, async (newKeyWords) => {
  if (search.value.length) {
    await store.search(newKeyWords)
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
  <BaseInput v-model="search" class="input-zone"/>
  <BaseButton @click="clear">搜索</BaseButton>
  </div>
</template>
<style scoped>
.wrapper{
  display: inline-block;
  /* border: 1px solid rebeccapurple; */
}
.input-zone{
  padding: 8px 10px 6px;
}
button {
  margin-right: 0;
}
</style>