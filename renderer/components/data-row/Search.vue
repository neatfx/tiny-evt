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
</script>
<template>
  <BaseInput v-model="search" />
  <BaseButton>搜索</BaseButton>
</template>
<style scoped>
input {
  padding: 7px;
  border-radius: 0;
  border-style: none;
  background-color: grey;
}
input:focus {
  outline: none;
}
</style>