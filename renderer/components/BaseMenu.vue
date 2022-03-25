<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useContextMenu } from './contextMenu'

interface IMenuItem {
  id: number;
  text: string;
  handler: (payload?: any) => void
}
const { show, x, y } = useContextMenu();
const props = defineProps(['menuData'])
const contextMenuState = reactive({
  data: {} as IMenuItem[]
})

function createMenu(binding: { text: any; handler: any; }) {
  const textArray = binding.text;
  const handlerObj = binding.handler;
  const handlerArray = [];
  const menuList = [];

  for (const key in handlerObj) {
    handlerArray.push(handlerObj[key]);
  }
  for (let i = 0; i < textArray.length; i++) {
    const menuObj = {
      text: textArray[i],
      handler: handlerArray[i],
      id: i + 1
    };
    menuList.push(menuObj);
  }

  contextMenuState.data = menuList
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
    <li v-for="item in contextMenuState.data" :key="item.id" @click="item.handler">{{ item.text }}</li>
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
  background-color: #0070f5;
  cursor: default;
}
</style>
