<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue';
import { onMounted, reactive, ref } from 'vue';
import { useBooklistStore } from '@stores/index'

const props = defineProps([]);
const emit = defineEmits<{
  (e: 'booklist:select'): Promise<void>
  (e: 'booklist:delete'): Promise<void>
}>()
const curBooklist = reactive({
  id: 0,
  name: ''
})
const booklistStore = useBooklistStore()
const currId = ref(1000)
const confirmDelete = ref(false)

function selectBooklist(listID: number, list: any) {
  console.log('选中 ', listID, list)
  // 设置选定书单置顶显示
  curBooklist.id = list.id
  curBooklist.name = list.name
  // emit('booklist:select')
}

function deleteBooklist(booklistId: number | undefined) {
  console.log('删除书单 ', booklistId)
  if (booklistId !== undefined) {
    booklistStore.delete(booklistId)
    confirmDelete.value = false
    // emit('booklist:delete')
  }
}

function unselectBooklist() {
  curBooklist.id = 0
  curBooklist.name = ''
}

onMounted(async () => {
  await booklistStore.list()
  await booklistStore.count()
})
</script>

<template>
  <FolderPanel :is-inline-panel="true">
    <template #header>
      <BaseButton class="btn-actions"><span>{{ '书单 ' + booklistStore.total }}</span></BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <!-- 当前书单 -->
        <div class="cur-list" @click="unselectBooklist">
          <span v-if="curBooklist.name" class="currIndicator"></span>
          {{ curBooklist.name || '尚未选择任何书单' }}
        </div>
        <!-- 动态列表 -->
        <ul class="all-list">
          <li v-for="(v, k) in booklistStore.items" :key="k" @mouseenter="() => currId = k"
            @mouseleave="() => currId = 1000">
            <div class="booklist-wrapper" @click="selectBooklist(k, v)">
              <span class="list-books-count">{{ '共 ' + v?.books?.size + ' 本' }}</span>
              <span class="list-name">{{ v?.name }}</span>
            </div>
            <div v-if="currId === k && !confirmDelete" class="btn-confirm-delete" @click="confirmDelete = true">
              <span class="cross"></span>
            </div>
            <div v-if="v && (currId === k) && confirmDelete" class="confirm-wrapper">
              <div class="btn-delete" @click="deleteBooklist(v.id)">
                删除
              </div>
              <div class="btn-cancel" @click="confirmDelete = false">
                取消
              </div>
            </div>
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

ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  font-size: small;
  background-color: #777;
  cursor: default;
}

li:hover {
  background-color: dimgray;
}


.cur-list {
  padding: 2px 10px;
  font-size: small;
  margin-bottom: 5px;
  background-color: #777;
}

.currIndicator {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: greenyellow;
}

.booklist-wrapper {
  padding: 2px 0px;
}

.list-name {
  padding: 2px 15px 2px 10px;
}

.list-books-count {
  padding: 2px 15px;
}

.btn-confirm-delete {
  position: absolute;
  top: 0px;
  left: -20px;
  width: 25px;
  height: 100%;
  padding: 0px 0px 0px 0px;
  background-color: indianred;
  text-align: center;
}

.cross {
  display: inline-block;
  position: relative;
  width: 9px;
  height: 1px;
  top: -2px;
  left: 0px;
  background-color: #555;
}

.confirm-wrapper {
  position: absolute;
  top: 0px;
  left: 0px;
}

.btn-delete {
  display: inline-block;
  padding: 2px 10px;
  background-color: cornflowerblue;
}

.btn-cancel {
  display: inline-block;
  padding: 2px 10px;
  background-color: darkgoldenrod;
}
</style>