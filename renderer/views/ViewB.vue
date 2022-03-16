<script setup lang="ts">
import { onMounted, ref } from "vue"

import { useTestingStore, } from '../stores/testing'

import DataRows from "../components/DataRows.vue"
import DataRowAdder from "../components/DataRowAdder.vue"
import ContextMenu from "../components/DataRowContextMenu.vue"
import DataRowsFilter from '../components/DataRowsFilter.vue'

const store = useTestingStore()
const showDataRowAdder = ref(false)

function toggleDataRowAdder() {
  showDataRowAdder.value = !showDataRowAdder.value
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

function filterDataRows(e) {
  console.log(e.target.value)
}

onMounted(async () => {
  await store.list()
})
</script>

<template>
  <button class="btn-add" @click="toggleDataRowAdder">Add New</button>
  <DataRowsFilter @change="filterDataRows"></DataRowsFilter>
  <Transition name="nested" :duration="500">
    <div v-if="showDataRowAdder" class="outer">
      <div class="inner">
        <DataRowAdder @add="addItem"></DataRowAdder>
      </div>
    </div>
  </Transition>
  <DataRows :items="store.items" @delete="deleteItem"></DataRows>
  <ContextMenu @delete="deleteItem"></ContextMenu>
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
  transition: all 0.25s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(20px);
  opacity: 0;
}

/* delay enter of nested element for staggered effect */
.nested-enter-active .inner {
  transition-delay: 0.2s;
}
</style>