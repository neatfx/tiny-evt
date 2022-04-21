<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import FolderPanel from '../FolderPanel.vue';
import BaseButton from '../BaseButton.vue';

import { useFilter } from './filter'
import { trans } from './translate'
import { useBooksStore } from '../../stores';

const { filter, filtersCount, resetFilter, workingFilters, removeFilter } = useFilter()
const props = defineProps(['items'])
const seletedFilter = ref('')
const filtersMenu = ref<EventTarget | null>()
const currentSubMenuData = ref({})
const booksStore = useBooksStore()
const showActiveFilterZone = ref(false)

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
        <BaseButton>+</BaseButton>
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
    <BaseButton class="btn-toggle-active-filter-zone" @click="() => {
      if (filtersCount === 0) {
        showActiveFilterZone = false
      } else {
        showActiveFilterZone = !showActiveFilterZone
      }
    }">过滤器</BaseButton>
    <BaseButton v-if="filtersCount" class="btn-reset" @click="() => {
      resetFilter();
      showActiveFilterZone = false;
    }"><span class="cross">+</span></BaseButton>
    <!-- 活动过滤器显示区域 -->
    <div v-if="showActiveFilterZone && filtersCount" class="active-filter-zone">
      <ul class="filter-tags-wrapper" v-for="key in workingFilters.keys()" :key="key">
        <li>
          <span class="filter-type">{{ trans(key) }}</span>
        </li>
        <li v-for="v in workingFilters.get(key)" :key="key + v">
          <span class="btn-delete" @click="removeFilter(key, v)">
            <span class="cross">+</span>
          </span>
          <span class="filter-value">{{ v }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline-block;
}

.filters-list,
.final-filter {
  font-size: 15px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 900;
}

.filters-list li,
.final-filter li {
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

.btn-reset {
  background-color: gray;
}

.filters-list {
  z-index: 990;
}

.final-filter {
  position: absolute;
  background-color: lightgray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

/*  */
.active-filter-zone {
  position: absolute;
  padding: 5px;
  background-color: #777;
  z-index: 9000;
}

.filter-tags-wrapper {
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
  list-style: none;
  justify-content: left;
  padding: 0px;
  margin: 0;
}

.filter-tags-wrapper li {
  position: relative;
  padding: 2px 2px 2px;
}

.filter-tags-wrapper li:hover {
  background: none;
}

.type-li {
  padding: 0;
  border: 0;
}

.filter-type {
  display: inline-block;
  padding: 2px 10px 2px 6px;
  background-color: cornflowerblue;
  border-radius: 0 1em 1em 0;
}

.filter-value {
  display: inline-block;
  padding: 2px 10px 2px 30px;
  background-color: cadetblue;
  border-radius: 1rem 1rem 1rem 1rem;
}

.btn-delete {
  position: absolute;
  padding: 0px 8px 0px 8px;
  margin-left: 2px;
  margin-top: 2px;
  background-color: coral;
  border-radius: 1rem;
}

.cross {
  font-size: small;
  display: inline-block;
  transform: rotate(45deg);
}
</style>