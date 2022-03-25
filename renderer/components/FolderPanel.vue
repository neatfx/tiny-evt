<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  title?: string;
  isInlineFixed?: boolean;
  isActionMenu?: boolean;
  defaultExpanded?: boolean;
}>()
const expanded = ref(true);
const expandedAsActionMenu = ref(false);
const target = ref<EventTarget | null>(null)
const defaultPanelBodyClass = ref('default-panel-body')
const inlinePanelClass = ref('inline-panel')
const fixedPanelBodyClass = ref('fixed-panel-body')

function toggle(e: MouseEvent) {
  if (props.isActionMenu) {
    target.value = e.target
    expandedAsActionMenu.value = !expandedAsActionMenu.value
  } else {
    expanded.value = !expanded.value
  }
}

watchEffect(() => {
  window.addEventListener("click", (e) => {
    if (e.target !== target.value) expandedAsActionMenu.value = false
  })
})
</script>

<template>
  <div :class="[isInlineFixed ? inlinePanelClass : '']">
    <!-- panel-header -->
    <div v-if="isActionMenu" @click="toggle" class="header">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <div v-else @click="toggle" class="header">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <!-- panel-body -->
    <Transition name="panel-body">
      <div>
        <div
          v-if="isActionMenu ? expandedAsActionMenu : expanded"
          :class="[defaultPanelBodyClass, isInlineFixed ? fixedPanelBodyClass : '']"
        >
          <slot name="body"></slot>
        </div>
        <slot name="menu"></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.inline-panel {
  display: inline-block;
}
.header {
  display: inline-block;
}
.default-panel-body {
  background-color: grey;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.fixed-panel-body {
  position: absolute;
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