<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';

const props = defineProps(['lend'])
const emit = defineEmits<{
  (event: 'delete-tag', tags: string[], rowId: number): void
}>()

function mark() {
}
</script>

<template>
  <BaseButton v-if="lend">已借出</BaseButton>
  <BaseButton v-if="!lend">未借出</BaseButton>
  <!-- <div v-if="props.cover"></div> -->
</template>

<style scoped>
.add-btn {
  margin: 10px 0 0;
}
</style>