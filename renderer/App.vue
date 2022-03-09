<template>
  <div id="root">
    <nav>
      <RouterLink to="/" :class="['/' === activeNav ? 'active' : '']" data-test-id="/">NavA</RouterLink>
      <RouterLink to="/b" :class="['/b' === activeNav ? 'active' : '']" data-test-id="/b">NavB</RouterLink>
      <RouterLink to="/c" :class="['/c' === activeNav ? 'active' : '']" data-test-id="/c">NavC</RouterLink>
      <RouterLink to="/d" :class="['/d' === activeNav ? 'active' : '']" data-test-id="/d">NavD</RouterLink>
    </nav>
    <RouterView id="content" />
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { RouterLink, RouterView } from "vue-router"
// import Navbar from './components/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    // Navbar,
  },
  // setup() {
  //   onMounted(() => {
  //   })
  //   return {
  //     activeNav: '/'
  //   }
  // }
})
</script>

<style scoped>
/* @import "@/assets/base.css"; */
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
