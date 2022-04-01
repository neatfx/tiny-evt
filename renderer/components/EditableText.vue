<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseInput from '@comps/BaseInput.vue'
import { vFocus } from '@comps/focus'

const props = defineProps(['rowId', 'text'])
const emit = defineEmits<{
  (event: 'update', rowId: number, payload: string): void
}>()
const showInput = ref(false)
const sourceContent = ref('')
const contentInput = ref('')

function edit(this: any) {
  if (sourceContent.value === '') sourceContent.value = props.text
  showInput.value = true
}

function save() {
  if (contentInput.value !== '' && contentInput.value !== props.text) {
    sourceContent.value = contentInput.value
    emit('update', props.rowId, contentInput.value)
  } else {
    sourceContent.value = props.text
  }
  showInput.value = false
}

onMounted(() => {
  sourceContent.value = props.text
})
</script>

<template>
  <span class="name" v-if="!showInput" @dblclick="edit">{{ sourceContent }}</span>
  <BaseInput
    class="input-zone"
    v-if="showInput"
    v-model="contentInput"
    @blur="save"
    :content="sourceContent"
    v-focus
  ></BaseInput>
</template>

<style scoped>
.name {
  /* padding: 3px 10px; */
    background-color: darkgray;
  padding: 4px 10px;
  margin-right: 5px;
}
.input-zone {
  margin: 0px 5px 0 0;
}
</style>