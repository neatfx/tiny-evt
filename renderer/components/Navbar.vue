<template>
  <div id='nav'>
    <router-link to='/' :class="['/' === activeNav ? 'active' : '']"> NavA </router-link>
    <router-link to='/b' :class="['/b' === activeNav ? 'active' : '']"> NavB </router-link>
    <router-link to='/c' :class="['/c' === activeNav ? 'active' : '']"> NavC </router-link>
    <router-link to='/d' :class="['/d' === activeNav ? 'active' : '']"> NavD </router-link>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup(props) {
    const route = useRoute()
    const currentLocation = computed(() => {
      const { matched, ...rest } = route
      return rest.fullPath
    })
    watch(() => currentLocation, path => {
      console.log('watch', path)
    })

    return {
      activeNav: currentLocation,
    }
  }
}
</script>

<style scoped>
#nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* column-gap: 1px; */
  background-color: #21252b;
}
#nav a {
  text-align: center;
  color: #666666;
  /* background-color: #21252b; */
  text-decoration-line: none;
  padding: 10px;
}
#nav a:hover {
   background-color: #282c34;
   color:ghostwhite;
}
.active {
  background-color: #282c34;
}
/* .router-link-exact-active {
    color: ghostwhite; 
    background-color: #282c34;
} */
</style>
