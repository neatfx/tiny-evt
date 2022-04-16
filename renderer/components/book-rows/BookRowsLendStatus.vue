<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';
import FolderPanel from '@comps/FolderPanel.vue'

const props = defineProps(['lend', 'rowId'])
const emit = defineEmits<{
  (event: 'update-lend:reset', rowId: number, info: string): void;
}>()

function reset() {
  emit('update-lend:reset', props.rowId, '')
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
      <div v-if="lend" class="wrapper">
        <span class="info-text">{{ lend }}</span>
        <BaseButton class="reset-btn" @click="reset">确认归还</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.outside {
  display: inline;
  background-color: indianred;
  border-radius: 50rem 50rem 50rem 0;
}

.outside:hover {
  background-color: indianred;
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

.reset-btn,
.reset-btn:hover {
  margin: 0 0 0 5px;
  background-color: cornflowerblue;
}
</style>