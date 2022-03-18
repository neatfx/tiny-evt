<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
  title?: string;
  isInlineFixed?: boolean;
  isActionMenu?:boolean;
  // isExpanded: boolean;
}>()
const expanded = ref(true);
const defaultPanelClass = ref('default-panel')
const inlinePanelClass = ref('inline-panel')
const defaultPanelBodyClass = ref('default-panel-body')
const fixedPanelBodyClass = ref('fixed-panel-body')
const menuPanelBodyClass = ref('menu-panel-body')
const notMenuPanelBodyClass = ref('not-menu-panel-body')
onMounted(()=>{

})
</script>

<template>
  <div class="panel" :class="[defaultPanelClass, isInlineFixed ? inlinePanelClass : '']">
    <div class="panel-bar" @click="expanded = !expanded">{{ title || 'Panel' }}</div>
    <Transition name="list">
      <div
        v-if="expanded"
        :class="[defaultPanelBodyClass, isInlineFixed ? fixedPanelBodyClass : '', isActionMenu ? menuPanelBodyClass : notMenuPanelBodyClass]"
      >
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.default-panel {
  margin-bottom: 10px;
}
.inline-panel {
  display: inline-block;
  margin-bottom: 10px;
}
/*  */
.panel-bar {
  display: inline-block;
  padding: 4px 20px;
  background-color: darkgray;
}
/*  */
.default-panel-body {
  background-color: grey;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.fixed-panel-body {
  position: fixed;
}
.menu-panel-body {
  padding: 0px;
}
.not-menu-panel-body {
  padding: 15px;
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