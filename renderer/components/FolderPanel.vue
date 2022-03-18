<script setup lang="ts">
import { ref, watchEffect } from 'vue';

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
    :class="[defaultPanelClass, isInlineFixed ? inlinePanelClass : '']"
    @click.stop
  >
    <!-- panel-header -->
    <div v-if="isActionMenu" @click="toggle" class="header">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <div v-else @click="expanded = !expanded" class="header">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <!-- panel-body -->
    <Transition name="panel-body">
      <div
        v-if="isActionMenu ? expandedAsActionMenu : expanded"
        :class="[defaultPanelBodyClass, isInlineFixed ? fixedPanelBodyClass : '', isActionMenu ? menuPanelBodyClass : notMenuPanelBodyClass]"
      >
        <slot name="body"></slot>
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
.header{
  display: inline-block;
}
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