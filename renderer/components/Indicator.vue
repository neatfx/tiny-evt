<script setup lang="ts">
defineProps(['show'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="roll-icon"></div>
  </Transition>
</template>

<style scoped>
.roll-icon {
  width: 6px;
  height: 6px;
  display: inline-block;
  border: 3px solid grey;
  border-top: 3px solid silver;
  border-radius: 50%;
  animation: changeDeg 0.5s linear 0.2s infinite;
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

@keyframes changeDeg {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>