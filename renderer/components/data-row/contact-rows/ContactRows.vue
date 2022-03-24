<script setup lang="ts">
import DataRowEditButton from '../../EditButton.vue'
import BaseButton from '../../BaseButton.vue';
import DataRowStatus from './ContactRowStatus.vue'
import BaseDataRows from '../BaseRows.vue'
import ContextMenu from "../RowContextMenu.vue"

import router from '../../../router'
import { useContactsStore } from '../../../stores'

defineProps(['items'])
// const emit = defineEmits<{
//   (e: 'delete', id: number | undefined): void
//   (e: 'open-detail', id: number | undefined): void
// }>()
const store = useContactsStore()

// async function addItem(data: any) {
//   await store.add(data.friendName, data.friendAge, 'F', 'user')
// }

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}
</script>

<template>
  <BaseDataRows :items="$props.items">
    <template #item="{ id, name, age, sex, role }">
      <div class="row">
        <div class="left">
          <div class="id">{{ id }}</div>
          <DataRowStatus></DataRowStatus>
          <div class="title" @click="openDetail(id)">{{ name }} - {{ age }} - {{ sex }} - {{ role }}</div>
        </div>
        <div class="right">
          <DataRowEditButton></DataRowEditButton>
          <BaseButton @click="deleteItem(id)" text="Delete">
            <span>Delete</span>
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseDataRows>
  <ContextMenu @delete="deleteItem"></ContextMenu>
</template>

<style scoped>
.row {
  display: grid;
  grid-auto-flow: column;
  justify-items: left;
}
.id {
  text-align: center;
  padding: 2px 10px 0 5px;
}
.left {
  display: grid;
  grid-auto-flow: column;
  /* border: 1px solid red; */
}
.title {
  background-color: blanchedalmond;
  padding: 2px 10px;
}
.right {
  display: grid;
  grid-auto-flow: column;
  justify-self: right;
  /* border: 1px solid red; */
}
</style>