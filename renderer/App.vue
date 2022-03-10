<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
// import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" data-test-id="/">NavA</RouterLink>
        <RouterLink to="/b" data-test-id="/b">NavB</RouterLink>
        <RouterLink to="/c" data-test-id="/c">NavC</RouterLink>
        <RouterLink to="/d" data-test-id="/d">NavD</RouterLink>
      </nav>
    </div>
    <RouterView></RouterView>
  </header>>
</template>

<!-- <script lang="ts">
import { defineComponent } from 'vue'
// import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    // RouterView
  }
})
</script> -->

<style scoped>
@import "assets/base.css";
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
