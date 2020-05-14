<template>
  <div id='nav'>
    <router-link to='/'> NavA </router-link>
    <router-link to='/b'> NavB </router-link>
    <router-link to='/c'> NavC </router-link>
    <router-link to='/d'> NavD </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Navbar'
}
</script>

<style scoped>
#nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* column-gap: 1px; */
}
#nav a {
  text-align: center;
  color: #666666;
  background-color: #1c202b;
  text-decoration-line: none;
  padding: 10px;
}
#nav a:hover {
   background-color: #b8beca;
   color:ghostwhite;
}
</style>
