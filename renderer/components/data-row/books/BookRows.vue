<script setup lang="ts">
import router from '@/router'
import { useBooksStore } from '@/stores'

import BaseDataRows from '@comps/data-row/BaseRows.vue'
import DataRowStatus from '@comps/data-row/contacts/ContactRowStatus.vue'
import DataRowEditButton from '@comps/EditButton.vue'
import BaseButton from '@comps/BaseButton.vue';
import ContextMenu from "@/components/data-row/contacts/ContactRowsContextMenu.vue"
import { vContextMenu, useContextMenu } from '@comps/contextMenu'

defineProps(['items'])
const store = useBooksStore()
const { targetId } = useContextMenu();

function openDetail(rowId: number | undefined) {
  router.push('/data-row-detail/' + rowId)
}

async function deleteItem(key: number | undefined) {
  // console.log('Delete item by ID ', key)
  if (key) await store.delete(key)
}
</script>

<template>
  <BaseDataRows :items="$props.items">
    <template #item="{ id, name, author, categories, publishing }">
      <div class="row" v-context-menu="id">
        <div class="left">
          <div class="id">{{ id }}</div>
          <DataRowStatus></DataRowStatus>
          <div class="title" @click="openDetail(id)">{{ '《 ' + name + ' 》' }}</div>
          <div class="title">{{ author }}</div>
          <div class="title">{{ categories }}</div>
          <div class="title">{{ publishing || "N" }}</div>
        </div>
        <div class="right">
          <DataRowEditButton v-if="store.view.edit"></DataRowEditButton>
          <BaseButton v-if="store.view.delete" @click="deleteItem(id)" text="Delete">
            <span>Delete</span>
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseDataRows>
  <ContextMenu @view="openDetail(targetId)" @delete="deleteItem(targetId)"></ContextMenu>
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
  /* grid-template-columns: 1fr 1fr 160px 150px 1fr ; */
  justify-self: left;
  grid-auto-flow: column;
  /* border: 1px solid red; */
}
.title {
  background-color: bisque;
  padding: 2px;
  margin-right: 5px;
}
.right {
  display: grid;
  grid-auto-flow: column;
  justify-self: right;
  /* border: 1px solid red; */
}
</style>