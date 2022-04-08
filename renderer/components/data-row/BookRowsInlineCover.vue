<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import EditableText from '@comps/EditableText.vue'

const props = defineProps(['rowId', 'text', 'isName', 'cover'])
const emit = defineEmits<{
  // (event: 'add-cover', rowId: number, cover: File | undefined): void
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
// const waitForChange = ref(false)
const showChangeBtn = ref(false)

// function ondragover(event: any) {
//   event.stopPropagation();
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'copy';
// };

// async function ondrop(ev: any) {
//   ev.stopPropagation();
//   ev.preventDefault();

//   fileData.value = ev.dataTransfer.files[0];
//   if (!fileData.value) throw new Error(`Only files can be dropped here`);
// }

// async function addCover() {
//   if (fileData.value) {
//     emit("add-cover", props.rowId, fileData.value)
//   }
// }

// async function changeCover() {
//   if (fileData.value) {
//     emit("add-cover", props.rowId, fileData.value)
//     showAddBtn.value = true
//     showChangeBtn.value = false
//     fileData.value = undefined
//   }
// }

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

const showCover = ref(false)
</script>

<template>
  <div @mouseover="showCover = true" @mouseleave="showCover = false">
    <EditableText
      :rowId="rowId"
      :text="text"
      :isName="isName"
      @update="(rowId, payload) => { emit('update', rowId, payload) }"
    ></EditableText>
    <div v-if="showCover" v-html="coverHtml" class="img-wrapper"></div>
  </div>
  <!-- <div v-if="!fileData" class="dropzone" @dragover="ondragover" @drop="ondrop"> -->
  <!-- <img /> -->
  <!-- </div> -->
  <!-- <slot></slot>
  <BaseButton v-if="showAddBtn" class="add-btn" @click="addCover">添加封面</BaseButton>
  <BaseButton v-if="showChangeBtn" class="change-btn" @click="changeCover">更换封面</BaseButton>-->
</template>

<style scoped>
.img-wrapper {
  position: fixed;
  display: inline-block;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

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