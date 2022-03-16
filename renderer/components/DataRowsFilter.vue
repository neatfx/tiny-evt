<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import BaseButton from './BaseButton.vue';

defineEmits<{
  (e: 'add'): void
}>()

const showDataRowAdder = ref(false);
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
    "Status",
    "DeleteDeleteDeleteDeleteDelete",
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
  <BaseButton @click="showDataRowAdder = !showDataRowAdder" text="Filter"></BaseButton>
  <Transition name="list">
    <div v-if="showDataRowAdder" class="form-wrapper inner">
      <ul v-for="item in contextMenuState.data" :key="item.id">
        <li @click="item.handler">{{ item.text }}</li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
.form-wrapper {
  position: fixed;
  margin: 0px 0 10px 0;
  background-color: #708090;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1)
}
ul {
  font-size: 15px;
}
li {
  /* list-style: none; */
  padding: 5px 10px 5px;
  /* text-align: left; */
}

li:hover {
  background-color: #0070f5;
  cursor: default;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  transform: translateY(2px);
  opacity: 0;
}
</style>