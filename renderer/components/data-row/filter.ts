import { reactive, ref } from "vue"

const workingFilters = reactive<{
  categories: Set<String>,
  publishing: Set<String>,
}>({
  categories: new Set(),
  publishing: new Set()
})

function filter(type: string, value: string) {
  switch (type) {
    case 'categories':
      workingFilters.categories.add(value)
      break;
    case 'publishing':
      workingFilters.publishing.add(value);
      break;
  }
}

function removeFilter(type: string, value: string) {
  switch (type) {
    case 'categories':
      workingFilters.categories.delete(value)
      break;
    case 'publishing':
      workingFilters.publishing.delete(value);
      break;
  }
}

function resetFilter() {
  workingFilters.categories.clear()
  workingFilters.publishing.clear()
}

export function useFilter() {
  return { workingFilters, removeFilter, resetFilter, filter }
}
