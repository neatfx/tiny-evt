<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useCurrentExpandedPanel } from './folderPanel'

defineProps<{
  title?: string;
  isInlineFixed?: boolean;
  isActionMenu?: boolean;
}>()

const emit = defineEmits<{
  (e: 'menu-expanded'): void
}>()

const expanded = ref(true);
const expandedAsActionMenu = ref(false);
const inlinePanelClass = ref('inline-panel')
const defaultPanelBodyClass = ref('default-panel-body')
const fixedPanelBodyClass = ref('fixed-panel-body')
const menuPanelBodyClass = ref('menu-panel-body')
const notMenuPanelBodyClass = ref('not-menu-panel-body')
const panel = ref<HTMLElement>()
const body = ref(null)
const { currentExpandedPanel } = useCurrentExpandedPanel()

function toggle(e: Event) {
  //  currentExpandedPanel.get(panel.value).status = false
  expandedAsActionMenu.value = !expandedAsActionMenu.value
  // currentExpandedPanel.forEach((v,key)=>{

  // })
  // if (currentExpandedPanel.get(e.target)) {
  //   currentExpandedPanel.set(panel.value, expandedAsActionMenu)
  // }

}
watch(expandedAsActionMenu, () => {
  if (expandedAsActionMenu.value) emit('menu-expanded')
})
onMounted(() => {
  window.addEventListener("click", (e) => {
    e.stopPropagation()
    // console.log(e.target, currentExpandedPanel.value.el)
    // currentExpandedPanel.value.el = panel.value
    // currentExpandedPanel.value.status = expandedAsActionMenu
    expandedAsActionMenu.value = false
  })
})
</script>

<template>
  <div :class="[isInlineFixed ? inlinePanelClass : '']">
    <!-- panel-header -->
    <div v-if="isActionMenu" @click.stop="toggle" class="header" ref="panel">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <div v-else @click="expanded = !expanded" class="header">
      <slot name="header">{{ title || 'Panel' }}</slot>
    </div>
    <!-- panel-body -->
    <Transition name="panel-body">
      <div
        ref="body"
        v-if="isActionMenu ? expandedAsActionMenu : expanded"
        :class="[defaultPanelBodyClass, isInlineFixed ? fixedPanelBodyClass : '', isActionMenu ? menuPanelBodyClass : notMenuPanelBodyClass]"
      >
        <slot name="body"></slot>
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