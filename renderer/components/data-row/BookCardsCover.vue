<script setup lang="ts">
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
    return '<img src="' + url + '" style="max-width: 160px; max-height: 222px;"/>'
  }
})
const fileData = ref<File | undefined>()
const showAddBtn = ref(true)
const waitForChange = ref(false)
const showChangeBtn = ref(false)

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
}

async function addCover() {
  if (fileData.value) {
    emit("add-cover", props.rowId, fileData.value)
  }
}

async function changeCover() {
  if (fileData.value) {
    emit("add-cover", props.rowId, fileData.value)
    showAddBtn.value = true
    showChangeBtn.value = false
    fileData.value = undefined
  }
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
  <div v-if="fileData" v-html="coverHtml"></div>
  <div v-if="!fileData" class="dropzone" @dragover="ondragover" @drop="ondrop">
    <!-- <img /> -->
  </div>
  <slot></slot>
  <!-- <BaseButton v-if="showAddBtn" class="add-btn" @click="addCover">添加封面</BaseButton> -->
  <!-- <BaseButton v-if="showChangeBtn" class="change-btn" @click="changeCover">更换封面</BaseButton> -->
</template>

<style scoped>
.dropzone {
  border: 2px dotted silver;
  border-radius: 5px;
  text-align: center;
  margin: 0;
}
.add-btn {
  margin: 10px 0 0;
}
</style>