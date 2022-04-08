<script setup lang="ts">
const props = defineProps(['items'])
const emit = defineEmits<{
  (event: 'show-more', bookId: number, showModal: boolean): void
}>()

function coverHtml(cover: Blob) {
  let binaryData = []
  let url = ''

  binaryData.push(cover)
  url = window.URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }))
  return '<img src="' + url + '" style="max-width: 160px; max-height: 222px; display:block;" />'
}
</script>

<template>
  <TransitionGroup name="list" v-for="(v, k) in items" :key="k">
    <div
      v-if="v.cover"
      class="card-wrapper"
      v-html="coverHtml(v.cover)"
      @click="emit('show-more', k, true)"
    ></div>
    <div v-else-if="!v.cover" class="cover-placeholder" @click="emit('show-more', k, true)"></div>
  </TransitionGroup>
</template>

<style scoped>
.card-wrapper,
.cover-placeholder {
  float: left;
  margin: 10px 15px 0 0;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.3);
}
.card-wrapper:hover,
.cover-placeholder:hover {
  box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.3);
}
.cover-placeholder {
  width: 160px;
  height: 222px;
  background-color: grey;
}

/* Transition */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>