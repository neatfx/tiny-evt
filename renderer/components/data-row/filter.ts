import { reactive, ref } from "vue"

const filtersCount = ref(0)
const workingFilters = reactive<Map<string, Set<string>>>(new Map())

function filter(type: string, value: string) {
  if (!workingFilters.get(type)) {
    workingFilters.set(type, new Set())
  }
  workingFilters.get(type)?.add(value)
  filtersCount.value = filtersCount.value + 1
}

function removeFilter(type: string, value: string) {
  if (workingFilters.get(type)) {
    workingFilters.get(type)?.delete(value)
    filtersCount.value = filtersCount.value - 1
  }
}

function resetFilter() {
  workingFilters.clear()
  filtersCount.value = 0
}

export function useFilter() {
  return { workingFilters, filtersCount, removeFilter, resetFilter, filter }
}
