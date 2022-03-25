<script setup lang="ts">
import { useContactsStore } from '../stores'
import { useDataRowsOpt } from '@comps/data-row/data-rows-controller'

import ControllerBar from '@comps/data-row/ControllerBar.vue';
import ContactRows from "@comps/data-row/contacts/ContactRows.vue"

const store = useContactsStore()
const { workingFilters } = useDataRowsOpt(store)
</script>

<template>
  <ControllerBar :filters="store.filters" :workingFilters="workingFilters"></ControllerBar>
  <ContactRows :items="store.items"></ContactRows>
</template>

<style scoped>
</style>