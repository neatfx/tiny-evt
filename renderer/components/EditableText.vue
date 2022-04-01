<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseInput from '@comps/BaseInput.vue'
import { vFocus } from '@comps/focus'

const props = defineProps(['rowId', 'text'])
const emit = defineEmits<{
  (event: 'update', rowId: number, fieldName: string, payload: string): void
}>()
const showInput = ref(false)
const sourceContent = ref('')
const contentInput = ref('')
const inputRef = ref()

function edit(this: any) {
  sourceContent.value = props.text
  showInput.value = true
}

function save(source: string) {
  console.log(contentInput.value, '+', source)
  if (contentInput.value !== '' &&  contentInput.value !== props.text) {
    sourceContent.value = contentInput.value
    emit('update', props.rowId, 'name', contentInput.value)
  } else {
    console.log('n')
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
    @blur="save(props.text)"
    :content="sourceContent"
    v-focus
  ></BaseInput>
</template>

<style scoped>
.name {
  padding: 3px 10px;
}
.input-zone {
  margin: 0px 5px 0 0;
}
</style>