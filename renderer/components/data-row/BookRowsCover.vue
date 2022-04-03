<script setup lang="ts">
import FolderPanel from '@comps/FolderPanel.vue';
import BaseButton from '@comps/BaseButton.vue';
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';

const props = defineProps(['rowId', 'cover'])
const emit = defineEmits<{
  (event: 'add-cover', rowId: number, cover: File | undefined): void
}>()
const coverHtml = computed(() => {
  let binaryData = []
  let url = ''

  if (fileData.value) {
    binaryData.push(fileData.value)
    url = window.URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }))
    return '<img src="' + url + '" style="width: 300px;"/>'
  }
})
const fileData = ref<File | undefined>()
const showAddBtn = ref(true)
const showChangeBtn = ref(true)

function ondragover(event: any) {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
};

async function ondrop(ev: any) {
  ev.stopPropagation();
  ev.preventDefault();

  fileData.value = ev.dataTransfer.files[0];
  if (!fileData.value) throw new Error(`Only files can be dropped here`);

  // document.querySelector("img")?.setAttribute('src', URL.createObjectURL(new Blob([fileData.value])))
}

async function addCover() {
  emit("add-cover", props.rowId, fileData.value)
  // showAddBtn.value = false
  // showChangeBtn.value = true
}

async function changeCover() {
  // emit("add-cover", props.rowId, fileData.value)
  showAddBtn.value = true
  showChangeBtn.value = false
  fileData.value = undefined
}

onMounted(() => {
  fileData.value = props.cover
  if (props.cover) {
    showAddBtn.value = false
    showChangeBtn.value = true
  } else {
    showAddBtn.value = true
    showChangeBtn.value = false
  }
})
</script>

<template>
  <FolderPanel :isInlinePanel="true">
    <template #header>
      <BaseButton>Cover</BaseButton>
    </template>
    <template #body>
      <div class="wrapper" ref="coverRef">
        <div v-if="fileData" v-html="coverHtml"></div>
        <div v-if="!fileData" class="dropzone" @dragover="ondragover" @drop="ondrop">
          <img />
        </div>
        <BaseButton v-if="showChangeBtn" class="change-btn" @click="changeCover">更换</BaseButton>
        <BaseButton v-if="showAddBtn" class="add-btn" @click="addCover">添加封面</BaseButton>
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
  width: 130px;
}
.dropzone {
  border: 2px dotted silver;
  border-radius: 5px;
  width: 130px;
  text-align: center;
}
.add-btn {
  margin: 10px 0 0;
}
</style>