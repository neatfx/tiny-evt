import { ref } from "vue"

const workingFilters = ref<{
  sex?: string
  role?: string
}>({})

function filterSex(sex: string) {
  workingFilters.value.sex = sex
}

function filterRole(role: string) {
  workingFilters.value.role = role
}

function removeFilter(key: string) {
  let obj: {
    sex?: string
    role?: string
  } = {}

  if (workingFilters.value.sex) obj['sex'] = workingFilters.value.sex
  if (workingFilters.value.role) obj['role'] = workingFilters.value.role

  switch (key) {
    case 'sex':
      delete obj.sex
      break;
    case 'role':
      delete obj.role
      break;
  }

  // console.log(obj)
  workingFilters.value = obj
}

function resetFilter() {
  workingFilters.value = {}
}

export function useFilter() {
  return { workingFilters, removeFilter, resetFilter, filterSex, filterRole }
}
