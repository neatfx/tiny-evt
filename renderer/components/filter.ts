import { ref } from "vue"

const filterRef = ref<{
  sex?: string
  role?: string
}>({})

function filterSex(sex: string) {
  filterRef.value.sex = sex
}

function filterRole(role: string) {
  filterRef.value.role = role
}

function resetFilter() {
  filterRef.value = {}
}

export function useFilter() {
  return { filterRef, resetFilter, filterSex, filterRole }
}
