import { ref } from "vue"

const workingFilters = ref<Map<string, string>>(new Map())

function filter(type: string, value: string) {
  workingFilters.value.set(type, value)
}

function removeFilter(key: string) {
  workingFilters.value.delete(key)
}

function resetFilter() {
  workingFilters.value.clear()
}

export function useFilter() {
  return { workingFilters, removeFilter, resetFilter, filter }
}
