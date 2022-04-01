<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'

const store = useBooksStore()
const search = ref('')
const showInput = ref(false)

watch(search, async (newKeyWords) => {
  if (search.value.length) {
    await store.search(newKeyWords)
  } else {
    await store.list()
  }
})

function clear() {
  if (search.value) search.value = ''
  showInput.value = !showInput.value
}
</script>
<template>
  <BaseButton @click="clear">搜索</BaseButton>
  <BaseInput v-if="showInput" v-model="search" />
</template>
<style scoped>
button{
  margin-right: 0;
}
</style>