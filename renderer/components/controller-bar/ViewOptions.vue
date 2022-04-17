<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import { onMounted, ref, watch, watchEffect } from 'vue';
import { trans } from './translate'
import { useBooksStore } from '@stores/index'

const props = defineProps(['views'])
const on = ref('on')
const off = ref('off')
const booksStore = useBooksStore()
const watchEnable = ref(false)

function switchView(key: string, value: any) {
  if (key === 'cards') value['rows'] = !value['rows']
  if (key === 'rows') value['cards'] = !value['cards']
  value[key] = !value[key]
}

watchEffect(() => {
  if (watchEnable.value) {
    console.log('booksStore.view <set>')
    localStorage.setItem('app-view-options', JSON.stringify(props.views))
  }
})

onMounted(() => {
  const viewConf = localStorage.getItem('app-view-options')
  if (viewConf) booksStore.view = JSON.parse(viewConf)
  watchEnable.value = true
})
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton class="btn-view-opt">视图</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <div v-for="(v, k) in props.views" :key="k">
          <div class="view-type">{{ trans(k.toString()) }}</div>
          <ul v-for="(value, key) in v">
            <li :key="key">
              <BaseButton class="btn" @click="switchView(key.toString(), v)">{{ trans(key.toString()) }}</BaseButton>
              <div :class="['status-color-base', value ? on : off]"></div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.btn-view-opt {
  border-radius: 0 0 0 0;
}

.wrapper {
  padding: 0px 10px 10px 15px;
  font-size: small;
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
  /* display: grid;
  grid-template-columns: auto; */
  position: relative;
  border: 1px solid d;
  padding: 2px;
}

.btn {
  display: inline-block;
  font-size: small;
  padding: 3px 10px 3px 15px;
}

.btn:hover {
  background-color: dimgray;
}

.status-color-base {
  position: absolute;
  width: 5px;
  height: 5px;
  top: 5px;
  left: 5px;
}

.on {
  background-color: greenyellow;
}

.off {
  background-color: grey;
}
</style>