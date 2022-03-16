<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

defineEmits<{
  (e: 'add'): void
}>()

const showDataRowAdder = ref(false)

</script>

<template>
  <BaseButton @click="showDataRowAdder = !showDataRowAdder" text="Add"></BaseButton>
  <div v-if="showDataRowAdder" class="form-wrapper">

  </div>
</template>

<style scoped>
.form-wrapper {
  position: fixed;
  padding: 15px;
  margin: 10px 0 10px 0;
  background-color:slategray;
}
.btn-submit {
  margin-top: 15px;
}
</style>