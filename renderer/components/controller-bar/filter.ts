import { reactive, ref } from "vue"

const filtersCount = ref(0)
const workingFilters = reactive<Map<string, Set<string>>>(new Map())

function filter(type: string, value: string, multiSelection: boolean = true) {
  if (!workingFilters.get(type)) {
    workingFilters.set(type, new Set())
    if (!multiSelection) filtersCount.value = filtersCount.value + 1
  }
  if (multiSelection === false) workingFilters.get(type)?.clear()
  workingFilters.get(type)?.add(value)
  if (multiSelection) filtersCount.value = filtersCount.value + 1
}

function removeFilter(type: string, value: string, multiSelection: boolean = true) {
  if (workingFilters.get(type)) {
    workingFilters.get(type)?.delete(value)
    if (workingFilters.get(type)?.size === 0) workingFilters.delete(type)
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
