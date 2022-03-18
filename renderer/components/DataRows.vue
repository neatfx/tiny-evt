<script setup lang="ts">
import DataRowEditButton from './DataRowEditButton.vue'
import BaseButton from './BaseButton.vue';
import DataRowStatus from './DataRowStatus.vue'
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
      <DataRowStatus></DataRowStatus>
      <DataRowStatus></DataRowStatus>
      <span class="title" @click="emit('open-detail', id)">{{ id }} - {{ name }} @ {{ age }}</span>
      <BaseButton @click="emit('delete', id)" class="right" text="Delete"></BaseButton>
      <DataRowEditButton></DataRowEditButton>
    </template>
  </BaseDataRows>
</template>

<style scoped>
.title {
  /* width: 100%; */
  /* border: 1px solid red; */
}
.right {
  float: right;
}
</style>