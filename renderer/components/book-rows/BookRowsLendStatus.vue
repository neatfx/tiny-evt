<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import BaseInputVue from '../BaseInput.vue';
import FolderPanel from '@comps/FolderPanel.vue'
import { ref } from 'vue';

const props = defineProps(['lend', 'rowId'])
const emit = defineEmits<{
  (event: 'update-lend:reset', rowId: number, info: string): void;
  (event: 'update-lend:add', rowId: number, info: string): void
}>()
const lendInfo = ref('')

function reset() {
  emit('update-lend:reset', props.rowId, '')
}

function add() {
  emit('update-lend:add', props.rowId, lendInfo.value)
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton :class="[lend ? 'outside' : 'in']">{{
        props.position || ('01-' + (rowId < 10 ? '0' + rowId : rowId))
      }}</BaseButton>
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
  background-color: coral;
  border-radius: 50rem 50rem 50rem 0;
}

.outside:hover {
  border-radius: 50rem 50rem 50rem 0;
  background-color: coral;
}

.in,
.in:hover {
  border-radius: 50rem 50rem 50rem 0;
  background-color: darkgray;
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