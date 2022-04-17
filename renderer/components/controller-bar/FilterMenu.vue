<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import FolderPanel from '../FolderPanel.vue';
import BaseButton from '../BaseButton.vue';

import { useFilter } from './filter'
import { trans } from './translate'
import { useBooksStore } from '../../stores';

const { filter, filtersCount, resetFilter } = useFilter()
const props = defineProps(['items'])
const seletedFilter = ref('')
const filtersMenu = ref<EventTarget | null>()
const currentSubMenuData = ref({})
const booksStore = useBooksStore()

// 显示二级菜单
function showFinalFilter(e: MouseEvent, filterType: string, subData: object) {
  seletedFilter.value = filterType
  filtersMenu.value = e.target
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
  // 对单选、多选进行区分处理
  if (filterType === 'lend') {
    filter(filterType, filterValue, false)
  } else {
    filter(filterType, filterValue)
  }
  seletedFilter.value = ''
}
</script>

<template>
  <div class="wrapper">
    <FolderPanel title="Filter" :isPopMenu="true">
      <template #header>
        <BaseButton>{{ (filtersCount ? filtersCount : '') + ' 过滤器' }}</BaseButton>
      </template>
      <template #body>
        <ul class="filters-list">
          <li v-for="(v, k) in props.items" :key="k" @click="showFinalFilter($event, k.toString(), v)">{{
            trans(k.toString())
          }}</li>
        </ul>
      </template>
      <template #menu>
        <div>
          <ul v-if="Object.keys(items).includes(seletedFilter)" class="final-filter">
            <li v-for="(v, k) in currentSubMenuData" :key="k" @click="onFilterItemClick($event, seletedFilter, v)">
              {{ ((['lend', 'readingStatus'].indexOf(seletedFilter) !== -1) ? trans(v) : v) || '-- 未知 --' }}
            </li>
          </ul>
        </div>
      </template>
    </FolderPanel>
    <BaseButton class="btn-toggle" @click="() => {
      if (filtersCount) booksStore.showFilterTagsZone = !booksStore.showFilterTagsZone
    }">
      {{ booksStore.showFilterTagsZone && filtersCount ? '^' : '+' }}
    </BaseButton>
    <BaseButton v-if="filtersCount" class="btn-toggle" @click="resetFilter">重置</BaseButton>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline-block;
}

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
  font-size: small;
}

li:hover {
  background-color: dimgray;
  cursor: default;
}

.btn-toggle {
  background-color: #777;
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