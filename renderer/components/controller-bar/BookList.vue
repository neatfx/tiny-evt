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

function selectBooklist(listID: number, list: any) {
  console.log(listID, name)
  // 设置选定书单置顶显示
  curBooklist.id = list.id
  curBooklist.name = list.name
  // emit('booklist:select')
}

function deleteBooklist() {
  // console.log('ss')
  curBooklist.id = 0
  curBooklist.name = ''
  emit('booklist:delete')
}

onMounted(() => {
  booklistStore.list()
})
</script>

<template>
  <FolderPanel :is-inline-panel="true">
    <template #header>
      <BaseButton class="btn-actions"><span>书单</span></BaseButton>
    </template>
    <template #body>
      <!-- 当前书单 -->
      <ul v-if="curBooklist.name" class="cur-list">
        <li @click="">{{ curBooklist.name }}</li>
      </ul>
      <!-- 动态列表 -->
      <ul class="all-list">
        <li v-if="true" v-for="(v, k) in booklistStore.items" key="k">
          <span @click="selectBooklist(k, v)">{{ v?.name }}</span>
          <div class="btn-delete" @click="deleteBooklist">
            <span class="cross"></span>
          </div>
        </li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  font-size: small;
  padding: 5px 15px 5px;
  background-color: #777;
}

li:hover {
  background-color: lightgrey;
  cursor: default;
}

.cur-list {
  border-bottom: 2px solid dimgray;
}

.btn-delete {
  display: inline-block;
  position: relative;
  top: 2px;
  margin: 0px 10px;
  width: 15px;
  height: 15px;
  padding: 0px 0px 0px 0px;
  background-color: indianred;
  border-radius: 1em;
  text-align: center;
}

.cross {
  display: inline-block;
  position: relative;
  width: 7px;
  height: 1px;
  top: -7px;
  background-color: #555;
}
</style>