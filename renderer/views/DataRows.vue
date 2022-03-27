<script setup lang="ts">
import { useBooksStore } from '../stores'
import { useDataRowsController } from '@/components/data-row/controller'

import ControllerBar from '@comps/data-row/ControllerBar.vue';
import BookRows from "@comps/data-row/books/BookRows.vue"

const store = useBooksStore()
const { workingFilters } = useDataRowsController(store)
</script>

<template>
  <ControllerBar :views="store.view" :filters="store.filters" :workingFilters="workingFilters"></ControllerBar>
  <BookRows :items="store.items"></BookRows>
</template>

<style scoped>
</style>