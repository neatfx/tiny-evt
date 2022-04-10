<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import EditableText from '@comps/EditableText.vue'
import BaseButton from '@comps/BaseButton.vue';

const props = defineProps(['rowId', 'text', 'isName', 'cover'])
const emit = defineEmits<{
  (event: 'update-cover', rowId: number, cover: File | undefined): void
  (event: 'update', rowId: number, payload: string): void
}>()
const coverHtml = computed(() => {
  let binaryData = []
  let url = ''

  if (fileData.value) {
    binaryData.push(fileData.value)
    url = window.URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }))
    return '<img src="' + url + '" style="max-width: 160px; max-height: 222px; display: block;" />'
  }
})
const fileData = ref<File | undefined>()
const showAddBtn = ref(true)
const showChangeBtn = ref(false)
const showCover = ref(false)
const showCoverUploader = ref(false)

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
    emit("update-cover", props.rowId, fileData.value)
  }
}

async function changeCover() {
  if (fileData.value) {
    emit("update-cover", props.rowId, fileData.value)
    showAddBtn.value = true
    showChangeBtn.value = false
    fileData.value = undefined
  }
}

onMounted(() => {
  fileData.value = props.cover
  // if (props.cover) {
  //   showAddBtn.value = false
  //   showChangeBtn.value = true
  // } else {
  //   showAddBtn.value = true
  //   showChangeBtn.value = false
  // }
})
</script>

<template>
  <div @mouseover="showCover = true" @mouseleave="showCover = false" class="wrapper">
    <EditableText
      :rowId="rowId"
      :text="text"
      :isName="isName"
      @mouseover="showCover = true"
      @mouseleave="showCover = false"
      @update="(rowId, payload) => { emit('update', rowId, payload) }"
    ></EditableText>
    <!-- Cover -->
    <div v-if="showCover" class="pop-cover-wrapper">
      <div v-html="coverHtml" class="cover-base"></div>
      <BaseButton v-if="cover" class="delete-btn">删除封面</BaseButton>
    </div>
    <!-- Add Cover Btn -->
    <BaseButton
      v-if="!cover && !showCoverUploader"
      class="add-btn"
      @click="() => {
        showCoverUploader = true
      }"
    >添加封面</BaseButton>
    <!-- Cover Uploader -->
    <div v-if="showCoverUploader" class="pop-cover-uplaoder-wrapper">
      <div v-if="!fileData" class="drop-zone" @dragover="ondragover" @drop="ondrop"></div>
      <!-- <div> -->
      <BaseButton v-if="!fileBlob" class="upload-btn">确认添加</BaseButton>
      <BaseButton class="cancel-btn" @click="showCoverUploader = false">取消</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  background-color: brown;
}
.pop-cover-wrapper {
  position: fixed;
  display: inline-block;
}
.cover-base {
  float: left;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.delete-btn {
  display: block;
  margin-right: 0;
  background-color: indianred;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.delete-btn:hover {
  background-color: indianred;
}
.add-btn {
  margin-right: 0;
  background-color: teal;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.add-btn:hover {
  background-color: teal;
}
.pop-cover-uplaoder-wrapper {
  position: fixed;
  padding: 5px;
  background-color: gray;
}
.drop-zone {
  margin-bottom: 5px;
  background-color: darkgray;
  height: 60px;
}
.cancel-btn {
  margin-right: 0;
}
</style>