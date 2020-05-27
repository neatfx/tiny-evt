<template>
  <div id="container">
    <button @click="openPreferenceWindow"> Open Preferences Window </button>
  </div>
</template>

<script lang="ts">
const { ipcApi } = window

export default {
  setup(props) {
    async function openPreferenceWindow() {
      const returnValue = ipcApi.sendSync('open-preference-window', 'ping')
      console.log('[@vue -> value returned in the sync message sent to main process]', returnValue)
    }
    return {
      openPreferenceWindow,
    }
  }
}
</script>

<style scoped>
#container {
  display: grid;
}
button {
  display: grid;
  background-color:dimgrey;
  border: none;
  padding: 7px 10px;
  outline: none;
}
button:hover {
  background-color:lightgrey;
}
</style>