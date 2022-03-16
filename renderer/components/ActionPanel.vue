<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useContextMenu } from './contextMenu'

// const { show, x, y, targetId } = useContextMenu();
const emit = defineEmits<{
  (e: 'delete', id: number | undefined): void
}>()
interface IMenuItem {
  id: number;
  text: string;
  handler: (payload: MouseEvent) => void
}[]

const contextMenuState = reactive({
  data: {} as IMenuItem[]
})

const menuData = {
  text: [
    "f-1",
    "f-2",
  ],
  handler: {
    checkingData() {
      console.log("设置状态");
    },
    deleteById() {
      console.log("从数据库中删除数据");
      // emit('delete', targetId.value)
    }
  }
}

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
  // console.log(menuList)
  contextMenuState.data = menuList
}

onMounted(() => {
  createMenu(menuData)
})
</script>

<template>
  <div class="context-menu"></div>
  <ul v-for="item in contextMenuState.data" :key="item.id">
    <li @click="item.handler">{{ item.text }}</li>
  </ul>
</template>

<style>
.context-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 160px;
  height: auto;
  background-color: dimgray;
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
