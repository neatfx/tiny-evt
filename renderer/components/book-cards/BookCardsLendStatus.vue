<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import BaseInputVue from '../BaseInput.vue';
import FolderPanel from '@comps/FolderPanel.vue'
import { ref } from 'vue';

const props = defineProps(['lend', 'rowId'])
const emit = defineEmits<{
  (event: 'reset-lend', rowId: number): void;
  (event: 'add-lend', rowId: number, info: string): void
}>()
const lendInfo = ref('')

function reset() {
  emit('reset-lend', props.rowId)
}

function add() {
  emit('add-lend', props.rowId, lendInfo.value)
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton :class="[lend ? 'outside' : 'in']">{{ '01-0' + rowId }}</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <span v-if="lend" class="info-text">{{ lend }}</span>
        <BaseButton v-if="lend" class="reset-btn" @click="reset">确认归还</BaseButton>
        <BaseInputVue v-if="!lend" class="input-zone" v-model="lendInfo"></BaseInputVue>
        <BaseButton v-if="!lend" class="add-btn" @click="add">添加借出备注</BaseButton>
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
  padding: 5px;
}

.info-text {
  padding: 5px 10px;
  background-color: antiquewhite;
}

.reset-btn {
  margin: 0 0 0 5px;
  background-color: lightcoral;
}

.input-zone {
  background-color: antiquewhite;
}

.add-btn {
  margin: 0 0 0 5px;
}
</style>