<template>
  <div id="container">
    <button @click="openPreferenceWindow"> Open BrowserWindow </button>
    <br>
    <div id="graph">
      <div class="week" v-for="week in weeks" :key="week.id">
        <div v-for="day in week.contributionDays" :key="day.id">
          <a v-bind:style="{ background: day.color === '#ebedf0'? 'lightgrey' : day.color }"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, onBeforeUpdate, ref } from 'vue'
const { ipcApi } = window
import { GithubGraphqlApi } from '../services/github-graphql-api'

export default {
  setup(props) {
    const weeks = ref({})
    async function openPreferenceWindow() {
      const returnValue = ipcApi.sendSync('open-preference-window', 'ping')
      console.log('[@vue -> value returned in the sync message sent to main process]', returnValue)
    }
    onMounted(() => {
      console.log(`mounted`)
      fetchData()
    })
    async function fetchData() {
      const result = await new GithubGraphqlApi().getContribution()
      weeks.value = result.data.user.contributionsCollection.contributionCalendar.weeks
    }
    return {
      openPreferenceWindow,
      weeks: weeks,
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
#graph {
  display: inline;
}
.week{
  float: left;
  margin-right: 1px;
}
#graph a{
  display: block;
  padding: 6px;
  margin-bottom: 1px;
}
</style>