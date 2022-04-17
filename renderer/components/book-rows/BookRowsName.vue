<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { onMounted, onUnmounted } from 'vue';

import EditableText from '@comps/EditableText.vue'
import BaseButton from '@comps/BaseButton.vue';
import BaseInput from '../BaseInput.vue';

import BookRowsReadingStatusVue from './BookRowsReadingStatus.vue';
import BookRowsMenu from './BookRowsMenu.vue';
import BookRowsBooklist from './BookRowsBooklist.vue';

const props = defineProps(['rowId', 'name', 'isName', 'cover', 'readingStatus', 'booklists', 'viewOption'])
const emit = defineEmits<{
  (event: 'mark-reading-status', rowId: number, readingStatus: string): void
  (event: 'update-cover', rowId: number, cover: File | undefined): void
  (event: 'add-lend-note', rowId: number, note: string): void
  (event: 'update', rowId: number, payload: string): void
  (event: 'delete-book'): void
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
const showConfirmCoverDeletion = ref(false)
const showConfirmBookDeletion = ref(false)
const showBooklist = ref(false)
const showLendNoteAdder = ref(false)
const lendInfo = ref('')

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
    showConfirmCoverDeletion.value = false
  }
}

function addLendNote() {
  emit('add-lend-note', props.rowId, lendInfo.value)
}

function markReadingStatus(readingStatus: string) {
  emit('mark-reading-status', props.rowId, readingStatus)
}

onMounted(() => {
  fileData.value = props.cover
})

// TDOO: 清理内存，是否必要 ？
onUnmounted(() => {
  blobUrls.map((v, k) => {
    URL.revokeObjectURL(v)
  })
})
</script>

<template>
  <div class="wrapper">
    <div class="inner-wrapper">
      <!-- 操作菜单 -->
      <BookRowsMenu v-if="viewOption.control.varyCardMenu" :hasCover="cover" @action-show-cover-uploader="() => {
        showCoverUploader = true
      }" @action-delete-cover="showConfirmCoverDeletion = true" @action-show-lend-note-adder="showLendNoteAdder = true"
        @action-delete-book="showConfirmBookDeletion = true"></BookRowsMenu>

      <!-- 阅读状态 -->
      <BookRowsReadingStatusVue v-if="viewOption.fields.varyCardReadingStatus" class="reading-status"
        :readingStatus="readingStatus" @mark-reading-status="markReadingStatus">
      </BookRowsReadingStatusVue>

      <!-- 书单 -->
      <BookRowsBooklist v-if="viewOption.fields.varyCardBooklist" :bookId="rowId" :booklists="booklists"
        @click="showBooklist = !showBooklist"></BookRowsBooklist>

      <!-- 书名 -->
      <div v-if="viewOption.fields.varyCardName" class="book-name" @mouseover="showCover = true"
        @mouseleave="showCover = false">
        <!-- Cover 状态显示 -->
        <span :class="['circle', cover ? 'has-cover' : '']"></span>
        <EditableText :rowId="rowId" :text="name || '--no-name--'" :isName="isName"
          @update="(rowId, payload) => { emit('update', rowId, payload) }"></EditableText>
        <!-- 封面（浮动显示） -->
        <div v-if="showCover" class="pop-cover-wrapper">
          <div v-if="showCover" v-html="coverHtml" class="cover-base"></div>
        </div>
      </div>
    </div>

    <!-- 拖放添加封面图片区域（浮动显示） -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="showCoverUploader && !cover" class="pop-cover-uplaoder-wrapper">
        <div v-if="!fileData" class="drop-zone" @dragover="ondragover" @drop="ondrop">
          <span class="tip">拖放图片至此区域</span>
        </div>
        <BaseButton v-if="fileData && !cover" class="btn-confirm" @click="addCover">确认添加</BaseButton>
        <BaseButton v-if="!cover && fileData" class="btn-cancel" @click="() => {
          showCoverUploader = false
          fileData = undefined
        }">取消</BaseButton>
        <BaseButton v-if="!fileData" class="btn-hide-cover-uploader" @click="showCoverUploader = false">取消</BaseButton>
      </div>
    </Transition>

    <!-- 删除封面二次确认（浮动显示） -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="showConfirmCoverDeletion" class="pop-cover-uplaoder-wrapper">
        <BaseButton class="btn-confirm" @click="deleteCover">确认移除
        </BaseButton>
        <BaseButton class="btn-cancel" @click="showConfirmCoverDeletion = false">取消</BaseButton>
      </div>
    </Transition>

    <!-- 删除书籍二次确认（浮动显示） -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="showConfirmBookDeletion" class="pop-cover-uplaoder-wrapper">
        <BaseButton class="btn-confirm" @click="emit('delete-book')">确认删除
        </BaseButton>
        <BaseButton class="btn-cancel" @click="showConfirmBookDeletion = false">取消</BaseButton>
      </div>
    </Transition>

    <!-- 添加出借备注 -->
    <Transition name="slide-up" mode="out-in">
      <div v-if="showLendNoteAdder" class="pop-cover-uplaoder-wrapper">
        <BaseInput class="input-zone" v-model="lendInfo"></BaseInput>
        <BaseButton class="btn-confirm" @click="addLendNote">确认添加</BaseButton>
        <BaseButton class="btn-cancel" @click="showLendNoteAdder = false">取消</BaseButton>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline;
}

.inner-wrapper {
  display: grid;
  grid-template-columns: auto;
  grid-auto-flow: column;
}

.circle {
  display: inline-block;
  position: absolute;
  width: 5px;
  height: 5px;
  margin: 3px;
  /* border-radius: 50rem; */
  background-color: grey;
}

.has-cover {
  background-color:greenyellow;
}

/* .book-name {
  margin-left: 1px;
} */

.reading-status {
  margin: 0 1px;
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

.pop-cover-uplaoder-wrapper {
  z-index: 9000;
  position: fixed;
  padding: 5px;
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
  margin-top: 5px;
  background-color: goldenrod;
}

.tip {
  display: block;
  text-align: center;
  padding-top: 27px;
}
.input-zone {
  display: inline-block;
  background-color:darkgrey;
  margin: 0 5px 0 0;
  padding: 7px 10px 7px;
  vertical-align: middle;
}

.btn-confirm,
.btn-confirm:hover {
  margin-right: 5px;
  background-color: cornflowerblue;
    vertical-align: middle;
}

.btn-cancel,
.btn-cancel:hover {
  margin-right: 0;
  background-color: goldenrod;
    vertical-align: middle;
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