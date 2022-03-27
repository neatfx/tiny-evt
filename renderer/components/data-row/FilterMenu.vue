<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import FolderPanel from '../FolderPanel.vue';
import BaseButton from '../BaseButton.vue';

import { useFilter } from './filter'

const { filter, trans } = useFilter()
const props = defineProps(['items'])
const seletedFilter = ref('')
const filtersMenu = ref<EventTarget | null>()
const currentSubMenuData = ref({})

// 显示二级菜单
function showFinalFilter(e: MouseEvent, filterType: string, subData: object) {
  seletedFilter.value = filterType
  filtersMenu.value = e.target
  // console.log(subData)
  currentSubMenuData.value = subData
}

// 隐藏二级菜单
watchEffect(() => {
  window.addEventListener("click", (e) => {
    if (e.target !== filtersMenu.value) {
      seletedFilter.value = ''
    }
  })
})

// 处理二级菜单点击事件
function onFilterItemClick(e: MouseEvent, filterType: string, filterValue: string) {
  filter(filterType, filterValue)
  seletedFilter.value = ''
}
</script>

<template>
  <FolderPanel title="Filter" :isPopMenu="true">
    <template #header>
      <BaseButton>Filter</BaseButton>
    </template>
    <template #body>
      <ul class="filters-list">
        <li
          v-for="(v, k) in props.items"
          :key="k"
          @click="showFinalFilter($event, k.toString(), v)"
        >{{ trans(k.toString()) }}</li>
      </ul>
    </template>
    <template #menu>
      <div>
        <ul v-if="Object.keys(items).includes(seletedFilter)" class="final-filter">
          <li
            v-for="(v, k) in currentSubMenuData"
            :key="k"
            @click="onFilterItemClick($event, seletedFilter, v)"
          >{{ v }}</li>
        </ul>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
ul {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 900;
}
li {
  padding: 5px 15px;
  background-color: grey;
}

li:hover {
  background-color: lightgray;
  cursor: default;
}
/*  */
.filters-list {
  z-index: 990;
}
.final-filter {
  position: absolute;
  background-color: lightgray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
</style>