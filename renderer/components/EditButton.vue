<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

const dataRowState = ref('saved')
</script>

<template>
  <Transition name="slide-up" mode="out-in" class="right">
    <BaseButton v-if="dataRowState === 'saved'" @click="dataRowState = 'edited'">Edit</BaseButton>
    <BaseButton v-else-if="dataRowState === 'edited'" @click="dataRowState = 'editing'">Save</BaseButton>
    <BaseButton v-else-if="dataRowState === 'editing'" @click="dataRowState = 'saved'">Cancel</BaseButton>
  </Transition>
</template>

<style scoped>
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