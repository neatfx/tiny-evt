<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseInput from '@comps/BaseInput.vue'
import { vFocus } from '@comps/focus'

const props = defineProps(['rowId', 'text', 'isName'])
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
  <div class="name-wrapper" v-if="!showInput" @dblclick="edit">
    <span v-if="isName" class="name">{{ '《 ' + sourceContent + ' 》' }}</span>
    <span v-else-if="!isName" class="name">{{ sourceContent }}</span>
  </div>
  <BaseInput class="input-zone" v-if="showInput" v-model="contentInput" @blur="save" :content="sourceContent" v-focus>
    </BaseInput>
</template>

<style scoped>
.name-wrapper {
  display: inline-grid;
  padding: 0 10px;
  background-color: darkgray;
}

.name {
  padding: 3px 0 4px 0;
  background-color: cornflowerblue;
}
.input-zone {
  display: inline-block;
  height: 100%;
}
.input-zone:focus {
  display: inline-block;
  height: 100%;
}
</style>