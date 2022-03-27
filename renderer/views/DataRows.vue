<script setup lang="ts">
import { useBooksStore } from '../stores'
import { useDataRowsController } from '@/components/data-row/controller'

// ControllerBar 主要由通用组件构成，BookRowAdder & BookRows 为专有组件
import BookRowAdder from '@comps/data-row/BookRowAdder.vue'
import ControllerBar from '@comps/data-row/ControllerBar.vue';
import BookRows from "@/components/data-row/BookRows.vue"

const store = useBooksStore()
const { workingFilters } = useDataRowsController(store)
</script>

<template>
  <ControllerBar :views="store.view" :filters="store.filters" :workingFilters="workingFilters">
    <template #adder>
      <BookRowAdder></BookRowAdder>
    </template>
  </ControllerBar>
  <BookRows :items="store.items"></BookRows>
</template>

<style scoped>
</style>