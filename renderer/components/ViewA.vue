<template>
  <div id="container">
    <button @click="openPreferenceWindow"> Open Preferences Window - send message from renderer process to main process </button>
  </div>
</template>

<script lang="ts">
const { ipcApi } = window

export default {
  setup(props) {
    async function openPreferenceWindow() {
      const returnValue = ipcApi.sendSync('open-preference-window', 'ping')
      console.log('returnValue in a synchronous message sent to the main process: ', returnValue)
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