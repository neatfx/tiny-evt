<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import { ref } from 'vue';
import BaseInputVue from '../BaseInput.vue';
import FolderPanel from '@comps/FolderPanel.vue'

const props = defineProps(['lend'])
const emit = defineEmits<{
  (event: 'delete-tag', tags: string[], rowId: number): void
}>()
const showInfo = ref(false)

function mark() {
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton v-if="lend" class="outside">已</BaseButton>
      <BaseButton v-if="!lend" class="in">未</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <span v-if="lend" class="info-text">{{ lend }}</span>
        <BaseButton v-if="lend" class="reset-btn">清除借阅信息</BaseButton>
        <BaseInputVue v-if="!lend" class="input-zone"></BaseInputVue>
        <BaseButton v-if="!lend" class="add-btn">添加借阅信息</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.outside {
  display: inline;
  background-color: lightcoral;
}
.outside:hover {
  background-color: lightcoral;
}
.wrapper {
  padding: 10px;
}
.info-text {
  padding: 5px 10px;
  background-color: antiquewhite;
}
.reset-btn {
  margin: 0 0 0 5px;
}
.input-zone {
  background-color: antiquewhite;
}
.add-btn {
  margin: 0 0 0 5px;
}
</style>