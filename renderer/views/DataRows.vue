<script setup lang="ts">
import { useBooksStore } from '../stores'

import { useDataRowsController } from '@/components/controller-bar/controller'
import ControllerBar from '@comps/controller-bar/ControllerBar.vue';
import BookRows from "@/components/book-rows/BookRows.vue"
import BookCards from "@/components/book-cards/BookCards.vue"

const store = useBooksStore()
const { workingFilters } = useDataRowsController(store)
</script>

<template>
  <ControllerBar :views="store.view" :filters="store.filters" :workingFilters="workingFilters"></ControllerBar>
  <BookRows v-if="store.view.layout.rows" :items="store.items"></BookRows>
  <BookCards v-if="store.view.layout.cards" :items="store.items"></BookCards>
</template>

<style scoped>
</style>