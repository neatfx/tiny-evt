<template>
  <div id='root'>
    <Navbar></Navbar>
    <router-view id='content' />
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const { ipcApi } = window

import Navbar from '../components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup(props) {
    const router = useRouter()
    onMounted(() => {
      ipcApi.receive('ipc_from_main', (res) => {
        console.log('[@vue -> message from main]', res)
        router.push(res[0]) // res[0] === '/c'
      })
    })
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
