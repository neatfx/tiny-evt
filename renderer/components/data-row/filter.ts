import { reactive, ref } from "vue"

const workingFilters = reactive<{ type: string, value: string }[]>([])

function filter(obj: { type: string, value: string }) {
  workingFilters.push(obj)
}

function removeFilter(type: string, value: string) {
  const index = workingFilters.indexOf({ type: type, value: value })
  if (index) workingFilters.splice(index, 1)
}

function resetFilter() {
  workingFilters.length = 0
}

export function useFilter() {
  return { workingFilters, removeFilter, resetFilter, filter }
}
