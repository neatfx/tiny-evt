<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import { computed } from '@vue/reactivity';

const props = defineProps(['cover'])
const emit = defineEmits<{
  (event: 'delete-tag', tags: string[], rowId: number): void
}>()
const decodeCover = computed(() => {
  let binaryData = []
  binaryData.push(props.cover)
  return window.URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }))
})
const coverImgHtml = '<img src="' + decodeCover.value + '" style="width: 300px;"/>'

function changeCover() {
}
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton>Cover</BaseButton>
    </template>
    <template #body>
      <div class="wrapper" ref="coverRef">
        <div v-html="coverImgHtml"></div>
        <div class="add">
          <BaseButton class="add-btn" @click="changeCover">更换</BaseButton>
        </div>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  background-color: darkgrey;
}
img{
  width: 100px;
}
.add-btn {
  margin: 5px;
}
</style>