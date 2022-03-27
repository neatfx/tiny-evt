<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import FolderPanel from '@comps/FolderPanel.vue';

import BaseButton from "@comps/BaseButton.vue";

defineEmits<{
  (e: 'add'): void
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
    "已读",
    "未读",
  ],
  handler: {
    checkingData() {
      console.log("item-1");
    },
    deleteById() {
      console.log("item-2");
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
  <FolderPanel :isPopMenu="true">
    <template #header>
      <!-- <EcosystemIcon class="icon"/> -->
      <BaseButton>已读</BaseButton>
    </template>
    <template #body>
      <ul v-for="item in contextMenuState.data" :key="item.id">
        <li @click="item.handler">{{ item.text }}</li>
      </ul>
    </template>
  </FolderPanel>
</template>

<style scoped>
.icon {
  position: static;
  /* margin-top: 15px; */
}
ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 5px 10px;
}

li:hover {
  background-color: #0070f5;
  cursor: default;
}
</style>