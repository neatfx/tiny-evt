<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
  isInlineFixed: boolean;
}>()
const expanded = ref(true);
const inlinePanelClass = ref('inline-panel')
const defaultPanelClass = ref('panel')
const fixedPanelBodyClass = ref('fixed-panel-body')
const defaultPanelBodyClass = ref('panel-body')
const basePanelBodyClass = ref('base-panel-body')
</script>

<template>
  <div class="panel" :class="isInlineFixed ? inlinePanelClass : defaultPanelClass">
    <div class="panel-bar" @click="expanded = !expanded">{{ title }}</div>
    <Transition name="list">
      <div
        v-if="expanded"
        :class="[basePanelBodyClass, isInlineFixed ? fixedPanelBodyClass : defaultPanelBodyClass]"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.panel {
  margin-bottom: 10px;
}
.inline-panel {
  display: inline-block;
  margin-bottom: 10px;
}
.panel-bar {
  display: inline-block;
  padding: 4px 20px;
  background-color: darkgray;
}

.fixed-panel-body {
  position: fixed;
}
.panel-body {
  position: static;
}
.base-panel-body {
  padding: 15px;
  background-color: grey;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

/*  */
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