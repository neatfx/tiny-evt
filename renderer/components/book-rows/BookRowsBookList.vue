<script setup lang="ts">
import { useBooksStore, useBooklistStore } from '@stores/index'
import { onMounted } from 'vue';

import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';
import { computed } from '@vue/reactivity';

const props = defineProps(['bookId', 'booklists']);
// const emit = defineEmits<{
//   (e: 'action-show-cover-uploader'): Promise<void>
//   (e: 'action-delete-cover'): Promise<void>
//   (e: 'action-add-note'): Promise<void>
//   (e: 'action-add-to-collection'): Promise<void>
//   (e: 'action-delete-book'): Promise<void>
// }>()
const booksStore = useBooksStore()
const booklistsStore = useBooklistStore()
const availableBooklists = computed(() => {
  const restBooklists: any[] = []
  booklistsStore.items.map((v, k) => {
    if (!props.booklists.has(v?.id)) {
      restBooklists.push(v)
    }
  })

  return restBooklists
})

function getBooklistName(id: number) {
  let name = ''

  booklistsStore.items.map((v, k) => {
    if (v?.id === id) {
      name = v.name
    }
  })

  return name
}
// 细粒度更新，暂无批量操作
async function addBookToBooklist(booklistId: number) {
  await booksStore.addToBooklist(props.bookId, booklistId)
}

async function removeBookFromBooklist(booklistId: number) {
  await booksStore.removeFromBooklist(props.bookId, booklistId)
}

onMounted(() => {
  booklistsStore.list()
})
</script>

<template>
  <FolderPanel :is-inline-panel="true" position="right">
    <template #header>
      <BaseButton class="btn-actions">#</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <!-- 书籍所属书单列表 -->
        <ul class="curr-booklists">
          <li v-if="!props.booklists?.size">尚未加入任何书单</li>
          <li v-for="(v, k) in booklists" key="k" @click="removeBookFromBooklist(v)">
            <span class="mark-select"></span>
            {{ getBooklistName(v) }}
          </li>
        </ul>
        <!-- 现有书单列表与书籍所属书单列表的差集（派生计算数据） -->
        <ul>
          <li v-if="availableBooklists.length === 0">暂无书单可供选择</li>
          <li v-for="(v, k) in availableBooklists" @click="addBookToBooklist(v.id)">
            <span class="mark-select mark-select-unselected"></span>
            {{ v?.name }}
          </li>
        </ul>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 5px;
}

.curr-booklists {
  margin: 0 0 5px 0;
}

.mark-select {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px 0 0;
  background-color: chartreuse;
}

.mark-select-unselected {
  background-color: darkgrey;
}

.btn-actions {
  background-color: #777;
}

.btn-actions:hover {
  background-color: #777;
}

.btn-confirm {
  margin: 5px 0 0;
}

.btn-confirm:hover {
  background-color: cornflowerblue;
}

ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  font-size: small;
  padding: 5px 10px 5px;
  background-color: #777;
}

li:hover {
  background-color: dimgrey;
  cursor: default;
}
</style>