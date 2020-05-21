<template>
  <div id='root'>
    <Navbar></Navbar>
    <router-view id='content' />
  </div>
</template>

<script lang="ts">
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup(props) {
    return {}
  }
}
</script>

<style scoped>
#root {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  background-color: #282c34;
}
#content {
  padding: 15px;
  color: #666666;
}
</style>
