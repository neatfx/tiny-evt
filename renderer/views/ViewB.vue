<script setup lang="ts">
import { onMounted, reactive, watch } from "vue"
import type Contact from "@/db/tables/Contact"
import { useTestingStore } from '../stores/testing'

import DataRows from "../components/DataRows.vue"
import ViewBAddFormVue from "../components/ViewBAddForm.vue"
import type IFormFields from "../components/ViewBAddForm.vue"

const store = useTestingStore()
const state = reactive({
  items: [] as Contact[]
})

async function addNew(data: typeof IFormFields) {
  await store.add(data.friendName, data.friendAge)

  data.status = `Friend ${data.friendName} successfully added.`;
  data.friendName = '';
  data.friendAge = data.defaultAge;
}

async function deleteItem(key: number | undefined) {
  if (key) await store.delete(key)
}

onMounted(async () => {
  await store.list()

  state.items = store.items
  // console.log(state)
})

watch(
  () => store.items,
  (newValue, oldValue) => {
    console.log('view-b')
    state.items = store.items
  },
  { deep: true }
)
</script>

<template>
  <ViewBAddFormVue @add="addNew"></ViewBAddFormVue>
  <DataRows :items="state.items" @delete="deleteItem"></DataRows>
</template>

<style>
button {
  display: inline-block;
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
}
button:hover {
  background-color: lightgrey;
}
#data-form {
  border: 1px sold lightgrey;
  padding: 5px;
}
</style>