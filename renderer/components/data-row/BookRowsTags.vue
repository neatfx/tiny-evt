<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import { ref } from 'vue';

const props = defineProps(['categories', 'rowId'])
const emit = defineEmits<{
  (event: 'add-tag', tags: string[], rowId: number): void
}>()
const tagInput = ref('')
const showInput = ref(false)

function addTag() {
  if (tagInput.value === '') {
    showInput.value = false
    return
  }
  const arr: string[] = Array.from(props.categories)
  if (!arr.includes(tagInput.value)) {
    arr.push(tagInput.value)
  }
  emit('add-tag', arr, props.rowId)
  tagInput.value = ''
  showInput.value = false
}
</script>

<template>
  <BaseInput v-if="showInput" class="input-zone" v-model="tagInput" />
  <BaseButton v-if="showInput" class="add-btn" @click="addTag">添加</BaseButton>
  <BaseButton v-if="!showInput" @click="showInput = !showInput">标签</BaseButton>
</template>

<style scoped>
.input-zone {
  width: 80px;
  margin: 0;
  padding: 2px 0 3px 10px;
  vertical-align: middle;
}
.add-btn {
  margin: 0 5px 0 0;
}
</style>