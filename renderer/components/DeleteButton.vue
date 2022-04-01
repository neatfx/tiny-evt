<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

const dataRowState = ref('normal');
const emit = defineEmits<{
  (event: 'click'): void
}>()

function onClick() {
  dataRowState.value = 'normal';
  emit('click');
}
</script>

<template>
  <Transition name="slide-up" mode="out-in">
    <BaseButton v-if="dataRowState === 'normal'" @click="dataRowState = 'confirm'">删除</BaseButton>
    <BaseButton
      v-else-if="dataRowState === 'confirm'"
      @click="onClick"
      @mouseleave="dataRowState = 'normal'"
      :class="[dataRowState === 'confirm' ? 'btn-confirm' : '']"
    >确认</BaseButton>
  </Transition>
</template>

<style scoped>
.btn-confirm {
  color: black;
  background-color: tomato;
}
.btn-confirm:hover {
  background-color: tomato;
}
/* Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0.2;
  transform: translateX(2px);
}
</style>