<script setup lang="ts">
defineProps(['items'])

function coverHtml(cover: Blob) {
  let binaryData = []
  let url = ''

  binaryData.push(cover)
  url = window.URL.createObjectURL(new Blob(binaryData, { type: 'image/jpeg' }))
  return '<img src="' + url + '" style="max-width: 160px; max-height: 222px;" />'
}
</script>

<template>
  <TransitionGroup name="list">
      <div
        class="card-wrapper"
        v-for="item in items" :key="item.id"
        @click="() => {
          // currentItem = id
          // showModal = true
        }"
      >
        <!-- <BookCardCover :rowId="id" :cover="cover" @add-cover="addCover"></BookCardCover> -->
        <div v-if="item.cover" v-html="coverHtml(item.cover)" class="img-wrapper"></div>
      </div>
  </TransitionGroup>
</template>

<style scoped>
.img-wrapper{
  float: left;
  background-color: blue;
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