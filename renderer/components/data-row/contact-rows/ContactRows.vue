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
      <div class="left">
        <div class="id">{{ id }}</div>
        <DataRowStatus></DataRowStatus>
        <div class="title" @click="openDetail(id)">{{ name }} - {{ age }} - {{ sex }} - {{ role }}</div>
      </div>
      <div class="right">
        <BaseButton @click="deleteItem(id)" text="Delete">
          <span>Delete</span>
        </BaseButton>
        <DataRowEditButton class></DataRowEditButton>
      </div>
    </template>
  </BaseDataRows>
  <ContextMenu @delete="deleteItem"></ContextMenu>
</template>

<style scoped>
.id {
  width: 25px;
  text-align: center;
  padding: 2px 10px 0 5px;
}
.left {
  display: grid;
  grid-template-columns: auto 1fr auto;
  justify-self: left;
}
.icon {
  /* margin-top: 15px; */
  display: inline-block;
  padding: 0;
  width: 15px;
  position: relative;
  top: -12px;
}
.title {
  background-color: blanchedalmond;
  padding: 2px 10px;
}
.right {
  justify-self: end;
}
</style>