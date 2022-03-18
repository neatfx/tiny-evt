<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';

defineProps<{
  title?: string;
  isInlineFixed?: boolean;
  isActionMenu?: boolean;
}>()
const expanded = ref(true);
const expandedAsActionMenu = ref(false);
const defaultPanelClass = ref('default-panel')
const inlinePanelClass = ref('inline-panel')
const defaultPanelBodyClass = ref('default-panel-body')
const fixedPanelBodyClass = ref('fixed-panel-body')
const menuPanelBodyClass = ref('menu-panel-body')
const notMenuPanelBodyClass = ref('not-menu-panel-body')

watchEffect(() => {
  if (expandedAsActionMenu.value) {
    window.addEventListener("click", toggle)
  } else {
    window.removeEventListener("click", toggle)
  }
})

function toggle() {
  expandedAsActionMenu.value = !expandedAsActionMenu.value
}
</script>

<template>
  <div
    class="panel"
    :class="[defaultPanelClass, isInlineFixed ? inlinePanelClass : '']"
    @click.stop
  >
    <!-- panel-header -->
    <div
      v-if="isActionMenu"
      class="panel-bar"
      @click="expandedAsActionMenu = !expandedAsActionMenu"
    >{{ title || 'Panel' }}</div>
    <div v-else class="panel-bar" @click="expanded = !expanded">{{ title || 'Panel' }}</div>
    <!-- panel-body -->
    <Transition name="panel-body">
      <div
        v-if="isActionMenu ? expandedAsActionMenu : expanded"
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
  position: absolute;
}
.menu-panel-body {
  padding: 0px;
}
.not-menu-panel-body {
  padding: 0px;
}

/* Transition */
.panel-body-enter-active,
.panel-body-leave-active {
  transition: all 0.2s ease;
}

.panel-body-enter-from,
.panel-body-leave-to {
  transform: translateY(2px);
  opacity: 0;
}
</style>