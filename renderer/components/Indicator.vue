<script setup lang="ts">
defineProps(['show'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="wrapper">
      <div class="roll-icon">加载中...</div>
    </div>
  </Transition>
</template>

<style scoped>
.wrapper {
  position: fixed;
  z-index: 9998;
  top: 7px;
  left: 30%;
  margin: 0px;
  padding: 3px 10px;
  background-color: dimgray;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease;
}

.roll-icon {
  padding: 1px 10px;
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