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
        <div v-if="props.cover" v-html="coverImgHtml"></div>
        <div v-if="!props.cover" class="dropzone" @dragover="ondragover" @drop="ondrop">
          <img />
        </div>
        <BaseButton v-if="props.cover" class="add-btn" @click="changeCover">更换</BaseButton>
        <BaseButton v-if="!props.cover" class="add-btn" @click="changeCover">添加封面</BaseButton>
      </div>
    </template>
  </FolderPanel>
</template>

<style scoped>
.wrapper {
  padding: 10px;
  background-color: darkgrey;
}
img {
  width: 100px;
}
.dropzone {
  border: 2px dotted silver;
  border-radius: 5px;
  width: 100px;
  height: 60px;
  text-align: center;
}
.add-btn {
  margin: 10px 0 0;
}
</style>