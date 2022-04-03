<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import { ref } from 'vue';
import { trans } from './translate'

const props = defineProps(['views'])
const on = ref('on')
const off = ref('off')
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton>视图</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <div class="view-type">数据呈现形式</div>
        <BaseButton>卡片</BaseButton>
        <BaseButton>DataRows</BaseButton>
        <div v-for="(v, k) in props.views" :key="k">
          <div class="view-type">{{ trans(k.toString()) }}</div>
          <ul>
            <li v-for="(key, value) in v" :key="value">
              <div :class="['status-color-base', key ? on : off]"></div>
              <BaseButton @click="v[value] = !v[value]">{{ trans(value.toString()) }}</BaseButton>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 10px 10px 15px 15px;
}
.view-type {
  padding: 10px 10px 10px 0px;
}
ul {
  display: grid;
  grid-auto-flow: column;
  list-style: none;
  justify-content: left;
  padding: 0px;
  margin: 0;
}
li {
  display: grid;
  grid-template-columns: 5px auto;
  border: 1px solid d;
  padding: 2px;
}
.on {
  background-color: greenyellow;
}
.off {
  background-color: goldenrod;
}
</style>