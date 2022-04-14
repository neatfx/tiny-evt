<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import { ref } from 'vue';
import { trans } from './translate'

const props = defineProps(['views'])
const on = ref('on')
const off = ref('off')

function switchView(key: string, value: any) {
  if (key === 'cards') value['rows'] = !value['rows']
  if (key === 'rows') value['cards'] = !value['cards']
  value[key] = !value[key]
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton class="btn">视图</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <div v-for="(v, k) in props.views" :key="k">
          <div class="view-type">{{ trans(k.toString()) }}</div>
          <ul v-for="(value, key) in v">
            <li :key="key">
              <div :class="['status-color-base', value ? on : off]"></div>
              <BaseButton class="btn" @click="switchView(key.toString(), v)">{{ trans(key.toString()) }}</BaseButton>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.btn{
  border-radius: 1em 0 0 0;
}
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
.btn:hover{
  background-color: dimgray;
}
.on {
  background-color: greenyellow;
}

.off {
  background-color: dimgrey;
}
</style>