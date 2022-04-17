import { computed } from "@vue/reactivity"
import { reactive } from "vue"

const workingFilters = reactive<Map<string, Set<string>>>(new Map())
const filtersCount = computed(() => {
  let count = 0

  workingFilters.forEach((v, k) => {
    count += v.size
  })

  return count
})

function filter(type: string, value: string, multiSelection: boolean = true) {
  if (!workingFilters.get(type)) {
    workingFilters.set(type, new Set())
  }
  if (multiSelection === false) workingFilters.get(type)?.clear()
  workingFilters.get(type)?.add(value)
}

function removeFilter(type: string, value: string, multiSelection: boolean = true) {
  if (workingFilters.get(type)) {
    workingFilters.get(type)?.delete(value)
    if (workingFilters.get(type)?.size === 0) workingFilters.delete(type)
  }
}

function resetFilter() {
  workingFilters.clear()
}

export function useFilter() {
  return { workingFilters, filtersCount, removeFilter, resetFilter, filter }
}
