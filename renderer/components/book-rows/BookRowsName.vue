<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { onMounted, onUnmounted } from 'vue';
import EditableText from '@comps/EditableText.vue'
import BaseButton from '@comps/BaseButton.vue';
import BookRowsReadingStatusVue from './BookRowsReadingStatus.vue';
import BookRowsMenuVue from './BookRowsMenu.vue';

const props = defineProps(['rowId', 'name', 'isName', 'cover', 'readingStatus'])
const emit = defineEmits<{
  (event: 'update-cover', rowId: number, cover: File | undefined): void
  (event: 'update', rowId: number, payload: string): void
  (event: 'mark-reading-status', rowId: number, readingStatus: string): void
}>()
const blobUrls: string[] = []
const coverHtml = computed(() => {
  let binaryData = []
  let url = ''

  if (fileData.value) {
    binaryData.push(fileData.value)
    url = window.URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }))
    blobUrls.push(url)
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

async function markReadingStatus(rowId: number, readingStatus: string) {
  emit('mark-reading-status', props.rowId, readingStatus)
}

onMounted(() => {
  fileData.value = props.cover
})
onUnmounted(() => {
  blobUrls.map((v, k) => {
    URL.revokeObjectURL(v)
  })
})
</script>

<template>
  <div class="wrapper">
    <div class="inner-wrapper">
      <!-- 综合菜单(总是显示) -->
      <BookRowsMenuVue :hasCover="cover ? 't' : 'f'" @action-show-cover-uploader="() => {
        showCoverUploader = true
        // fileData = undefined
      }"></BookRowsMenuVue>
      <!-- 阅读状态 -->
      <BookRowsReadingStatusVue class="reading-status" :readingStatus="readingStatus"
        @mark-reading-status="markReadingStatus">
      </BookRowsReadingStatusVue>

      <!-- 书名 -->
      <div class="name-wrapper" @mouseover="showCover = true" @mouseleave="showCover = false">
        <EditableText class="name" :rowId="rowId" :text="name || '--no-name--'" :isName="isName"
          @update="(rowId, payload) => { emit('update', rowId, payload) }"></EditableText>
        <!-- 封面（浮动显示） -->
        <div v-if="showCover" class="pop-cover-wrapper">
          <div v-if="showCover" v-html="coverHtml" class="cover-base"></div>
          <!-- <BaseButton v-if="showCover && cover" class="delete-btn" @click="deleteCover">删除封面</BaseButton> -->
        </div>
      </div>
    </div>
    <!-- 拖放添加封面图片区域（浮动显示） -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="showCoverUploader && !cover" class="pop-cover-uplaoder-wrapper">
        <div v-if="!fileData" class="drop-zone" @dragover="ondragover" @drop="ondrop">
          <span class="tip">拖放图片至此区域</span>
        </div>
        <BaseButton v-if="fileData && !cover" class="upload-btn" @click="addCover">确认添加</BaseButton>
        <BaseButton v-if="!cover && fileData" class="cancel-btn" @click="() => {
          showCoverUploader = false
          fileData = undefined
        }">取消</BaseButton>
        <BaseButton v-if="!fileData" class="btn-hide-cover-uploader" @click="showCoverUploader = false">取消</BaseButton>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  /* display: inline; */
}

.inner-wrapper {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}

.reading-status {
  display: inline-grid;
}

.name-wrapper {
  /* display: block; */
}

.name {
  /* display: inline-block; */
}

.pop-cover-wrapper {
  display: inline-block;
  position: fixed;
  grid-template-columns: auto;
  grid-auto-flow: column;
  align-items: flex-start;
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
  display: inline-grid;
  margin-right: 0;
  background-color: steelblue;
}

.add-btn:hover {
  background-color: steelblue;
}

.pop-cover-uplaoder-wrapper {
  position: fixed;
  padding: 10px;
  background-color: gray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.drop-zone {
  background-color: gray;
  width: 180px;
  height: 80px;
  border: 2px dotted dimgray;
}

.btn-hide-cover-uploader,
.btn-hide-cover-uploader:hover {
  margin-top: 10px;
  background-color: indianred;
}

.tip {
  display: block;
  text-align: center;
  padding-top: 27px;
  /* border: 1px solid red; */
}

.upload-btn,
.upload-btn:hover {
  margin-right: 5px;
  background-color: cornflowerblue;
}

.cancel-btn,
.cancel-btn:hover {
  margin-right: 0;
  background-color: indianred;
}

/* Transition */
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(2px);
}
</style>