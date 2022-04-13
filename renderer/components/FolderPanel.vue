<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';

const props = defineProps<{
  title?: string;
  isPopMenu?: boolean;
  isInlinePanel?: boolean;
  position?: string;
}>()
const showPanel = ref(true);
const showMenu = ref(false);
const showInlinePanel = ref(false);

const inlinePanelClass = ref('inline-panel')
const defaultPanelBodyClass = ref('default-panel-body')
const fixedPanelBodyClass = ref('fixed-panel-body')

const target = ref<EventTarget | null>(null)

function toggle(e: MouseEvent) {
  if (props.isPopMenu) {
    target.value = e.target
    showMenu.value = !showMenu.value
  } else {
    showPanel.value = !showPanel.value
    showInlinePanel.value = !showInlinePanel.value
  }
}

function switchShowRefForBody(): Ref<boolean> {
  if (props.isPopMenu) {
    return showMenu
  } else if (props.isInlinePanel) {
    return showInlinePanel
  } else {
    return showPanel
  }
}

function switchClassRefForBody(): Ref<string> {
  if (props.isPopMenu) {
    return fixedPanelBodyClass
  } else if (props.isInlinePanel) {
    return fixedPanelBodyClass
  } else {
    return defaultPanelBodyClass
  }
}

function switchPositonClassRefForBody(): string {
  if (props.isPopMenu || props.isInlinePanel) {
    return props.position || 'bottom';
  }
  return 'bottom'
}

watchEffect(() => {
  window.addEventListener("click", (e) => {
    if (e.target !== target.value) {
      showMenu.value = false
    }
  })
})
</script>

<template>
  <div :class="[(isPopMenu || isInlinePanel) ? inlinePanelClass : '']">
    <!-- panel-header -->
    <div @click="toggle" class="header">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <!-- panel-body -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="switchShowRefForBody().value" :class="['default-panel-body', switchClassRefForBody().value, switchPositonClassRefForBody()]">
        <slot name="body" class="panel-container"></slot>
      </div>
    </Transition>
    <slot name="menu"></slot>
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
  position: fixed;
}

.right {
  display: inline-block;
}

/* Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(2px);
}
</style>