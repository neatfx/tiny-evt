<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';

const props = defineProps(['show', 'item'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <BaseButton class="close-btn" @click="$emit('close')">X</BaseButton>
      <div class="modal-header">
        <slot name="msg-type">default header</slot>
      </div>
      <div class="modal-body">
        <slot name="msg-body">default body default body</slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  bottom: 0;
  left: 0;
  width: 250px;
  margin: 10px;
  padding: 2px;
  background-color: darkgray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease;
}

.modal-header {
  padding: 3px 10px 3px;
  background-color: slategray;
}

.modal-body {
  padding: 10px;
  background-color: darkgray;
}

.close-btn {
  position: absolute;
  right: 0;
  margin-right: 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateX(20px);
}
</style>