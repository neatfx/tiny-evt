<script setup lang="ts">
import ContextMenu from '@comps/ContextMenu.vue'

const emit = defineEmits<{
  (e: 'view'): void
  (e: 'delete'): void
}>()
const menuData = {
  详情: () => emit('view'),
  删除: () => emit('delete')
}
</script>

<template>
  <ContextMenu :menu-data="menuData"></ContextMenu>
</template>
