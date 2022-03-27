<script setup lang="ts">
import router from '@/router'
import { useContactsStore } from '@/stores'

import BaseDataRows from '@comps/data-row/BaseRows.vue'
import DataRowStatus from '@comps/data-row/contacts/ContactRowStatus.vue'
import DataRowEditButton from '@comps/EditButton.vue'
import BaseButton from '@comps/BaseButton.vue';
import ContextMenu from "@/components/data-row/RowsContextMenu.vue"
import { vContextMenu, useContextMenu } from '@comps/contextMenu'

defineProps(['items'])
const store = useContactsStore()
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
    <template #item="{ id, name, age, sex, role }">
      <div class="row" v-context-menu="id">
        <div class="left">
          <div class="id">{{ id }}</div>
          <DataRowStatus></DataRowStatus>
          <div class="title" @click="openDetail(id)">{{ name }} - {{ age }} - {{ sex }} - {{ role }}</div>
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
  grid-template-columns: 1fr 1fr auto;
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