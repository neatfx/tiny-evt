<script setup lang="ts">
import { ref, watchEffect, type Ref } from 'vue';

const props = defineProps<{
  title?: string;
  isPopMenu?: boolean;
  isInlinePanel?: boolean;
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
    <Transition name="panel-body">
      <div>
        <div v-if="switchShowRefForBody().value" :class="['default-panel-body', switchClassRefForBody().value]">
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