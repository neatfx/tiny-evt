<script setup lang="ts">
import { onMounted, reactive, watch } from "vue"
import type Contact from "@/db/tables/Contact"
import { useTestingStore } from '../stores/testing'

import DataRows from "../components/DataRows.vue"
import ViewBAddFormVue from "../components/ViewBAddForm.vue"

const store = useTestingStore()
const state = reactive({
  showForm: true,
  items: [] as Contact[]
})

function toggle() {
  state.showForm = !state.showForm
}

async function addItem(data: any) {
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
  <button class="btn-add" @click="toggle">Add New</button>

  <Transition name="nested" :duration="550">
    <div v-if="state.showForm" class="outer">
      <div class="inner">
        <ViewBAddFormVue @add="addItem"></ViewBAddFormVue>
      </div>
    </div>
  </Transition>
  <Transition type="transition" :duration="550">
    <DataRows :items="state.items" @delete="deleteItem"></DataRows>
  </Transition>
</template>

<style scoped>
button {
  background-color: dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
}
button:hover {
  background-color: lightgrey;
}
.btn-add {
  margin-bottom: 10px;
}

/* Transition */
/* rules that target nested elements */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(10px);
  opacity: 0;
}

/* delay enter of nested element for staggered effect */
.nested-enter-active .inner {
  transition-delay: 0.25s;
}
</style>