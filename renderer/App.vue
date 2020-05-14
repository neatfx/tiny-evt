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
  }
}
</script>

<style scoped>
#root {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  background-color: #b8beca;
}
#content {
  display: grid;
  padding: 15px;
  color: #666666;
}
</style>
