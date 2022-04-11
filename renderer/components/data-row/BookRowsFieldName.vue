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
    showCoverUploader.value = false
  }
}

async function deleteCover() {
  if (fileData.value) {
    emit("update-cover", props.rowId, undefined)
    fileData.value = undefined
  }
}

onMounted(() => {
  fileData.value = props.cover
})
</script>

<template>
  <div @mouseover="showCover = true" @mouseleave="showCover = false" class="wrapper">
    <!-- 书名 -->
    <EditableText class="name" :rowId="rowId" :text="text" :isName="isName" @mouseover="showCover = true"
      @mouseleave="showCover = false" @update="(rowId, payload) => { emit('update', rowId, payload) }"></EditableText>
    <!-- 封面（浮动显示） -->
    <div v-if="showCover" class="pop-cover-wrapper">
      <div v-if="showCover" v-html="coverHtml" class="cover-base"></div>
      <BaseButton v-if="showCover && cover" class="delete-btn" @click="deleteCover">删除封面</BaseButton>
    </div>
    <!-- 添加封面按钮(无封面状态下显示) -->
    <BaseButton v-if="!cover" class="add-btn" @click="() => {
      showCoverUploader = !showCoverUploader
      fileData = undefined
    }">{{ showCoverUploader ? '取消' : '封面' }}</BaseButton>
    <!-- 拖放添加封面图片区域（浮动显示） -->
    <div v-if="showCoverUploader && !cover" class="pop-cover-uplaoder-wrapper">
      <div v-if="!fileData" class="drop-zone" @dragover="ondragover" @drop="ondrop"><span class="tip">拖放图片至此区域添加封面</span>
      </div>
      <BaseButton v-if="fileData && !cover" class="upload-btn" @click="addCover">确认添加</BaseButton>
      <BaseButton v-if="!cover && fileData" class="cancel-btn" @click="() => {
        showCoverUploader = false
        fileData = undefined
      }">取消</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  background-color: grey;
}

.pop-cover-wrapper {
  position: fixed;
  display: inline-grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
  align-items: flex-start;
  /* border: 1px solid red; */
}

.cover-base {
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.delete-btn {
  margin-right: 0;
  background-color: indianred;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.delete-btn:hover {
  background-color: indianred;
}

.add-btn {
  display: inline-block;
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
  background-color: lightgray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.drop-zone {
  background-color: lightgray;
  width: 200px;
  height: 80px;
}

.tip {
  display: block;
  text-align: center;
  padding-top: 27px;
  /* border: 1px solid red; */
}

.upload-btn,
.upload-btn:hover {
  margin-right: 0;
  background-color: cornflowerblue;
}

.cancel-btn,
.cancel-btn:hover {
  margin-right: 0;
  background-color: indianred;
}
</style>