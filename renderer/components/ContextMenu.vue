<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useContextMenu } from './contextMenu'

const props = defineProps<{
  menuData: { [x: string]: () => void; }
}>()
interface IMenuItem {
  text: string;
  handler: (payload?: any) => void
}
const contextMenuState = reactive({
  data: [] as IMenuItem[]
})
const { show, x, y } = useContextMenu();

function createMenu(data: { [x: string]: () => void; }) {
  for (const key in data) {
    contextMenuState.data.push({
      text: key,
      handler: data[key]
    })
  }
}

onMounted(() => {
  createMenu(props.menuData)
})
</script>

<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="context-menu"
    :style="{
      display: show,
      top: y + 'px',
      left: x + 'px'
    }"
  >
    <li v-for="item in contextMenuState.data" :key="item.text" @click="item.handler">{{ item.text }}</li>
  </TransitionGroup>
</template>

<style scoped>
.context-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 160px;
  height: auto;
  background-color: dimgray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

ul {
  padding: 0;
  margin: 0;
  font-size: 15px;
}
li {
  list-style: none;
  padding: 5px 10px 5px;
}

li:hover {
  background-color: lightgray;
  cursor: default;
}
</style>
