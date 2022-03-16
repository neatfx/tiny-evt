<template>
  <div id="graph">
    <div class="week" v-for="week in weeks" :key="week.contributionDays.length">
      <div v-for="day in week.contributionDays" :key="day.date">
        <a v-bind:style="{ background: day.color === '#ebedf0' ? 'lightgrey' : day.color }"></a>
      </div>
    </div>
    <BaseInput v-model="inputs.github_user_name"></BaseInput>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref, reactive, watch } from 'vue'
import { GithubGraphqlApi } from '../services/github-graphql-api'
import BaseInput from '../components/BaseInput.vue';

type Contribute = {
  contributionDays: {
    color: string,
    contributionCount: number,
    date: string
  }[]
}[]

export default defineComponent({
  props: {
    github_user_name: String || undefined
  },
  data() {
    return {
      themeSource: ''
    }
  },
  setup(props) {
    const weeks = ref({} as Contribute)
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
    onMounted(() => {
      // fetchData(props.github_user_name || 'neatfx')
    })
    async function fetchData(github_user_name: string) {
      const result = await new GithubGraphqlApi().getContribution(github_user_name)
      weeks.value = result.data.user.contributionsCollection.contributionCalendar.weeks
    }
    return {
      weeks,
      inputs,
    }
  }
})
</script>

<style scoped>
#graph {
  display: inline;
}
.week {
  /* float: left; */
  margin-right: 1px;
}
#graph a {
  /* display: block; */
  padding: 6px;
  margin-bottom: 1px;
}
</style>