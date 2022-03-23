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

function removeFilter(key: string) {
  let obj: {
    sex?: string
    role?: string
  } = {}

  if (filterRef.value.sex) obj['sex'] = filterRef.value.sex
  if (filterRef.value.role) obj['role'] = filterRef.value.role

  switch (key) {
    case 'sex':
      delete obj.sex
      break;
    case 'role':
      delete obj.role
      break;
  }

  // console.log(obj)
  filterRef.value = obj
}

function resetFilter() {
  filterRef.value = {}
}

export function useFilter() {
  return { filterRef, removeFilter, resetFilter, filterSex, filterRole }
}
