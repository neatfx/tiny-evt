<script setup lang="ts">
import BaseButton from '@comps/BaseButton.vue';

const props = defineProps(['show', 'item'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <BaseButton class="modal-default-button" @click="$emit('close')">关闭</BaseButton>
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  /* display: table; */
  transition: opacity 0.2s ease;
}

.modal-wrapper {
  /* display: table-cell; */
  /* vertical-align:middle; */
  /* margin-top: 100px; */
  /* right: 0; */
}

.modal-container {
  width: 500px;
  height: 100vh;
  position: absolute;
  right: 0;
  padding: 30px;
  background-color: gray;
  transition: all 0.3s ease;
}

.modal-header {
  border: 1px solid ghostwhite;
}

.modal-body {
  margin: 20px 0;
  border: 1px solid ghostwhite;
}

.modal-footer {
  border: 1px solid ghostwhite;
}

.modal-default-button {
  float: right;
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