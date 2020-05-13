<template>
  <div id='root'>
    <div id='nav'>
      <router-link to='/'> NavA </router-link>
      <router-link to='/b'> NavB </router-link>
      <router-link to='/c'> NavC </router-link>
      <router-link to='/d'> NavD </router-link>
    </div>
    <router-view id='content' />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#root {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
  row-gap: 1px;
  background-color:darkgrey;
}
#nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1px;
}
#nav a {
  text-align: center;
  color: #666666;
  background-color: lightgrey;
  text-decoration-line: none;
  padding: 10px;
}
#nav a:hover {
   background-color: #bcc2c6;
   color:ghostwhite;
}
#content {
  display: grid;
  background-color: lightgrey;
  padding: 15px;
  margin: 0 0px;
  color: #666666;
}
</style>
