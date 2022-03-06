<template>
  <div id='root'>
    <Navbar></Navbar>
    <router-view id='content' />
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    onMounted(() => {
    })
    return {}
  }
}
</script>

<style scoped>
#root {
  display: grid;
  height: 100vh;
  grid-template-columns: 150px 1fr;
  background-color: #282c34;
}
#content {
    margin-top: 50px;
  border: 1px solid red;
  padding: 15px;
  color: #666666;
}
</style>
