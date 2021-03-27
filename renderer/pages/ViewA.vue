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
      <!-- <input v-model="inputs.github_user_name"> -->
    </div>
  </div>
</template>

<script lang='jsx'>
import { onMounted, ref, reactive, watch } from 'vue'
const { ipcApi } = window
import { GithubGraphqlApi } from '../services/github-graphql-api'

export default {
  props: {
    github_user_name: String
  },
  setup(props) {
    const weeks = ref({})
    const inputs = reactive({
      github_user_name: 'neatfx'
    })
    watch(() => props.github_user_name, async (id) => {
      fetchData(props.github_user_name)
    })
    watch(() => inputs.github_user_name, async () => {
      console.log(inputs.github_user_name)
      // fetchData(inputs.github_user_name)
    })
    async function openPreferenceWindow() {
      const returnValue = ipcApi.sendSync('open-preference-window', 'ping')
      console.log('[@vue -> value returned in the sync message sent to main process]', returnValue)
    }
    onMounted(() => {
      console.log(`mounted`)
      fetchData(props.github_user_name || 'neatfx')
    })
    async function fetchData(github_user_name) {
      const result = await new GithubGraphqlApi().getContribution(github_user_name)
      weeks.value = result.data.user.contributionsCollection.contributionCalendar.weeks
    }
    return {
      openPreferenceWindow,
      weeks,
      inputs
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