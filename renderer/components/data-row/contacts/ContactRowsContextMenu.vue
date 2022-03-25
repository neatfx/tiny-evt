<script setup lang="ts">
import ContextMenu from '@comps/ContextMenu.vue'

const emit = defineEmits<{
  (e: 'view'): void
  (e: 'delete'): void
}>()
const menuData = {
  View: () => emit('view'),
  Delete: () => emit('delete')
}
</script>

<template>
  <ContextMenu :menu-data="menuData"></ContextMenu>
</template>
