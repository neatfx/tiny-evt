<template>
  <div id="container">
    <button @click="callMainProcess"> Open BrowserWindow </button>
    <br>
    <div id="graph">
      <div class="week" v-for="week in weeks" :key="week.contributionDays.length">
        <div v-for="day in week.contributionDays" :key="day.date">
          <a v-bind:style="{ background: day.color === '#ebedf0'? 'lightgrey' : day.color }"></a>
        </div>
      </div>
      <!-- <input v-model="inputs.github_user_name"> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive, watch } from 'vue'
const { electronAPI } = window
import { GithubGraphqlApi } from '../services/github-graphql-api'

type Contribute = {
  contributionDays:{
      color: string,
      contributionCount: number,
      date: string
  }[]}[]

export default defineComponent({
  props: {
    github_user_name: String || undefined
  },
  setup(props) {
    const weeks= ref({} as Contribute)

    const inputs = reactive({
      github_user_name: 'neatfx'
    })
    watch(() => props.github_user_name, async (id) => {
      fetchData(inputs.github_user_name)
    })
    watch(() => inputs.github_user_name, async () => {
      console.log(inputs.github_user_name)
      // fetchData(inputs.github_user_name)
    })
    async function callMainProcess() {
      const returnValue = electronAPI.send('reset-testi-db', 'ping')
      console.log('[vue -> main-process]', returnValue)
    }
    onMounted(() => {
      console.log(`mounted`)
      // fetchData(props.github_user_name || 'neatfx')
    })
    async function fetchData(github_user_name: string) {
      const result = await new GithubGraphqlApi().getContribution(github_user_name)
      weeks.value = result.data.user.contributionsCollection.contributionCalendar.weeks
    }
    return {
      callMainProcess,
      weeks,
      inputs
    }
  }
})
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