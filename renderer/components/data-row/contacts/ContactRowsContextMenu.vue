<script setup lang="ts">
import ContextMenu from '@comps/ContextMenu.vue'

const emit = defineEmits<{
  (e: 'delete'): void
}>()
const menuData = {
  text: [
    "Delete",
  ],
  handler: {
    deleteById() {
      emit('delete')
    }
  }
}
</script>

<template>
  <ContextMenu :menu-data="menuData"></ContextMenu>
</template>
