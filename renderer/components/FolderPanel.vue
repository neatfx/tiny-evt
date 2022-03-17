<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
}>()
const expanded = ref(true);
</script>

<template>
  <div class="panel-wrapper">
    <div class="panel-bar" @click="expanded = !expanded">{{ title }}</div>
    <Transition name="list">
      <div v-if="expanded" class="content-wrapper">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.panel-wrapper {
  margin-bottom: 10px;
}
.panel-bar {
  display: inline-block;
  padding: 4px 20px;
  background-color: darkgray;
}
.content-wrapper {
  padding: 15px;
  background-color: grey;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateY(2px);
  opacity: 0;
}
</style>