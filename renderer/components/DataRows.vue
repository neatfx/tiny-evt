<script setup lang="ts">
import ActionButton from './DataRowEditButton.vue'
import BaseButton from './BaseButton.vue';
import ActionPanel from './FolderPanelX.vue'
import BaseDataRows from './BaseDataRows.vue'

defineProps(['items'])

const emit = defineEmits<{
  (e: 'delete', id: number | undefined): void
  (e: 'open-detail', id: number | undefined): void
}>()
</script>

<template>
  <BaseDataRows :items="$props.items">
    <template #item="{ id, name, age }">
      <BaseButton class text="Type"></BaseButton>
      <BaseButton class text="Progress"></BaseButton>
      <ActionPanel></ActionPanel>
      <div class="title" @click="emit('open-detail', id)">{{ id }} - {{ name }} @ {{ age }}</div>
      <BaseButton @click="emit('delete', id)" class="right" text="Delete"></BaseButton>
      <ActionButton></ActionButton>
    </template>
  </BaseDataRows>
</template>

<style scoped>
.title {
  display: inline-block;
  /* position: fixed; */
  /* width: 100%; */
  /* border: 1px solid red; */
}
.right {
  float: right;
}
</style>