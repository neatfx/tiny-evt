<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '@comps/BaseInput.vue';
import { ref } from 'vue';

const props = defineProps(['views'])
const on = ref('on')
const off = ref('off')
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton>Tags</BaseButton>
    </template>
    <template #body>
      <div class="wrapper">
        <ul>
          <li v-for="(value, key) in props.views" :key="key">{{ value }}</li>
        </ul>
        <div class="add">
          <BaseInput class="input-zone" />
          <BaseButton class="add-btn">添加新标签</BaseButton>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 5px 5px 10px 10px;
  background-color: darkgrey;
}
ul {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  justify-content: left;
  list-style: none;
  padding: 0px;
  margin: 0;
}
li {
  padding: 5px 10px; 
  text-align: center;
  background-color: khaki;
  margin: 5px;
}
.add {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}
.input-zone {
  display: block;
  margin: 5px;
}
.add-btn {
  margin: 5px;
}
</style>