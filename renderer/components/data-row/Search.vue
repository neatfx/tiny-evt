<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseInput from '../BaseInput.vue';
import BaseButton from '../BaseButton.vue';
import { useBooksStore } from '@/stores'
import FolderPanel from '../FolderPanel.vue';

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
  if(search.value) search.value = ''
}
</script>
<template>
  <FolderPanel title="Add" :isInlinePanel="true">
    <template #header>
      <BaseButton @click="clear">搜索</BaseButton>
    </template>
    <template #body>
      <div class="panel-body">
        <BaseInput v-model="search" />
      </div>
    </template>
  </FolderPanel>
</template>
<style scoped>
.panel-body {
  padding: 2px;
  background-color: lightgrey;
}
</style>